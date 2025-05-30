<template>
  <div>
    <el-divider><span>Downloads</span></el-divider>
    <div style="text-align: center">
      <el-button @click="loadAll">Refresh</el-button>
      <el-button @click="downloadAll">Download dynamic_data_helper.cpp file</el-button>
    </div>

    <el-divider>
      <span>
        Split views
      </span>
    </el-divider>

    <div>

      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          Header
        </div>
        <div class="text item code" style="white-space: pre-wrap;">{{ header }}</div>
      </el-card>

      <el-card v-for="module in modules" :key="module.sn" class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          Slave <b><u>{{ modules.indexOf(module) }}</u></b> - sn <b><u>{{ module.sn }}</u></b> -
          <b><u>{{ getTypeFriendlyName(module.type) }}</u></b>
        </div>
        <div class="text item code" style="white-space: pre-wrap;">{{ generateModuleDef(module) }}</div>
      </el-card>

      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          Tail
        </div>
        <div class="text item code" style="white-space: pre-wrap;">{{ tail }}</div>
      </el-card>
    </div>

  </div>
</template>

<script>

export default {
  name: 'Generator',
  data() {
    return {
      modules: [],
      header: '#include "soem_wrapper/dynamic_data_helper.hpp"\n' +
          '\n' +
          'DynamicStruct sdo_data = {\n\n',
      tail: '};'
    }
  },
  mounted() {
    this.loadAll()

  },
  methods: {
    getTypeFriendlyName(hexId) {
      switch (hexId) {
        case 0x01:
          return "Flight Module"
        case 0x02:
          return "Motor Module"
      }
    },
    loadAll() {
      this.update()
    },
    downloadAll() {
      let textToSave = this.header
      this.modules.forEach(module => {
        textToSave += this.generateModuleDef(module)
      })
      textToSave += this.tail

      // 创建一个Blob实例，类型为纯文本
      const blob = new Blob([textToSave], {type: 'text/plain;charset=utf-8'})
      // 创建一个指向Blob的URL
      const url = URL.createObjectURL(blob)
      // 创建一个a标签
      const link = document.createElement('a')
      link.href = url;
      // 指定下载的文件名
      link.setAttribute('download', 'dynamic_data_helper.cpp');
      // 触发下载
      document.body.appendChild(link)
      link.click()
      // 清理并移除元素和对象URL
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    },
    update() {
      if (localStorage.getItem("modules_info") != null) {
        this.modules = JSON.parse(localStorage.getItem("modules_info"));
      }
    },
    toHexStringWithPrefix(num) {
      let hexStr = num.toString(16);
      return hexStr.startsWith('0x') ? hexStr : '0x' + (hexStr.length === 1 ? '0' + hexStr : hexStr);
    },
    getLkControlTypeEnumName(ctrl_type) {
      switch (ctrl_type) {
        case 0x01:
          return 'LK_CTRL_TYPE_OPENLOOP_CURRENT'
        case 0x02:
          return 'LK_CTRL_TYPE_TORQUE'
        case 0x03:
          return 'LK_CTRL_TYPE_SPEED_WITH_TORQUE_LIMIT'
        case 0x04:
          return 'LK_CTRL_TYPE_MULTI_ROUND_POSITION'
        case 0x05:
          return 'LK_CTRL_TYPE_MULTI_ROUND_POSITION_WITH_SPEED_LIMIT'
        case 0x06:
          return 'LK_CTRL_TYPE_SINGLE_ROUND_POSITION'
        case 0x07:
          return 'LK_CTRL_TYPE_SINGLE_ROUND_POSITION_WITH_SPEED_LIMIT'
      }
    },
    getDJIMotorEnumName(ctrl_type) {
      switch (ctrl_type) {
        case 0x01:
          return 'DJIMOTOR_CTRL_TYPE_CURRENT'
        case 0x02:
          return 'DJIMOTOR_CTRL_TYPE_SPEED'
        case 0x03:
          return 'DJIMOTOR_CTRL_TYPE_SINGLE_ROUND_POSITION'
      }
    },
    get_length(content) {
      return this.countSubstrings(content, "float") * 4 +
          this.countSubstrings(content, "int8") * 1 +
          this.countSubstrings(content, "int16") * 2 +
          this.countSubstrings(content, "int32") * 4
    },
    countSubstrings(target, subStr) {
      if (subStr.length === 0) {
        return 0;
      }

      let count = 0;
      let pos = target.indexOf(subStr);

      while (pos !== -1) {
        count++;
        pos = target.indexOf(subStr, pos + subStr.length);
      }

      return count;
    },
    get_id(ctrl_id, id) {
      switch (ctrl_id) {
        case '0x200': {
          return 0x200 + id
        }
        case '0x2ff':
        case '0x2fe':
        case '0x1fe': {
          return 0x204 + id
        }
        case '0x1ff': {
          if (id >= 1 && id <= 4) {
            return 0x204 + id
          } else {
            return 0x200 + id
          }
        }
      }
    },
    generateModuleDef(module) {
      let res = ''
      let sdo_length = 0
      let pdowrite_offset = 0
      let pdoread_offset = 0

      res += `{"sn${module.sn}_task_count", (uint8_t) ${module.task.length}},\n`
      res += `{"sn${module.sn}_latency_topic", std::string("${module.latency_topic}")},\n`
      res += '\n'

      for (let i = 1; i <= module.task.length; i++) {
        switch (module.task[i - 1].type) {
          case 0x02: {

            res += `{"sn${module.sn}_app_${i}_sdo_len", (uint16_t) 9},\n`
            res += `{"sn${module.sn}_app_${i}_sdowrite_task_type", (uint8_t) LK_APP_ID},\n`
            res += `{"sn${module.sn}_app_${i}_sdowrite_control_period", (uint16_t) ${module.task[i - 1].control_period}},\n`
            res += `{"sn${module.sn}_app_${i}_sdowrite_can_packet_id", (uint32_t) ${this.toHexStringWithPrefix(module.task[i - 1].can_packet_id)}},\n`
            res += `{"sn${module.sn}_app_${i}_sdowrite_can_inst", (uint8_t) CAN_PORT_${module.task[i - 1].can_inst}},\n`
            res += `{"sn${module.sn}_app_${i}_sdowrite_control_type", (uint8_t) ${this.getLkControlTypeEnumName(module.task[i - 1].control_type)}},\n`
            res += `{"sn${module.sn}_app_${i}_read_topic", std::string("${module.task[i - 1].read_topic || `/ecat/sn${module.sn}/app${i}/read`}")},\n`
            res += `{"sn${module.sn}_app_${i}_write_topic", std::string("${module.task[i - 1].write_topic || `/ecat/sn${module.sn}/app${i}/write`}")},\n`
            res += `{"sn${module.sn}_app_${i}_pdowrite_offset", (uint16_t) ${pdowrite_offset})},\n`
            res += `{"sn${module.sn}_app_${i}_pdoread_offset", (uint16_t) ${pdoread_offset})},\n`
            sdo_length += 9

            res += '\n'
            pdoread_offset += 7
            pdowrite_offset += 7
            break
          }

          case 0x05: {

            let sub_res = ''
            let sub_sdo_len = 0

            sub_res += `{"sn${module.sn}_app_${i}_sdowrite_task_type", (uint8_t) DJICAN_APP_ID},\n`
            sub_res += `{"sn${module.sn}_app_${i}_sdowrite_control_period", (uint16_t) ${module.task[i - 1].control_period}},\n`
            sub_res += `{"sn${module.sn}_app_${i}_sdowrite_can_packet_id", (uint32_t) ${this.toHexStringWithPrefix(module.task[i - 1].can_packet_id)}},\n`
            sub_res += `{"sn${module.sn}_app_${i}_sdowrite_motor1_can_id", (uint32_t) ${module.task[i - 1].motor_enable[0] ? this.toHexStringWithPrefix(this.get_id(this.toHexStringWithPrefix(module.task[i - 1].can_packet_id), module.task[i - 1].motor_id[0])) : 0}},\n`
            sub_res += `{"sn${module.sn}_app_${i}_sdowrite_motor2_can_id", (uint32_t) ${module.task[i - 1].motor_enable[1] ? this.toHexStringWithPrefix(this.get_id(this.toHexStringWithPrefix(module.task[i - 1].can_packet_id), module.task[i - 1].motor_id[1])) : 0}},\n`
            sub_res += `{"sn${module.sn}_app_${i}_sdowrite_motor3_can_id", (uint32_t) ${module.task[i - 1].motor_enable[2] ? this.toHexStringWithPrefix(this.get_id(this.toHexStringWithPrefix(module.task[i - 1].can_packet_id), module.task[i - 1].motor_id[2])) : 0}},\n`
            sub_res += `{"sn${module.sn}_app_${i}_sdowrite_motor4_can_id", (uint32_t) ${module.task[i - 1].motor_enable[3] ? this.toHexStringWithPrefix(this.get_id(this.toHexStringWithPrefix(module.task[i - 1].can_packet_id), module.task[i - 1].motor_id[3])) : 0}},\n`
            sub_res += `{"sn${module.sn}_app_${i}_sdowrite_can_inst", (uint8_t) CAN_PORT_${module.task[i - 1].can_inst}},\n`
            sub_sdo_len += (1 + 2 + 4 + 4 * 4 + 1)

            let pdoread_len = 0
            let pdowrite_len = 0
            for (let j = 1; j <= 4; j++) {
              if (!module.task[i - 1].motor_enable[j - 1]) {
                continue;
              }
              pdoread_len += 7
              pdowrite_len += 3
              sub_sdo_len += 1
              sub_res += `{"sn${module.sn}_app_${i}_sdowrite_motor${j}_control_type", (uint8_t) ${this.getDJIMotorEnumName(module.task[i - 1].motor_control_type[j - 1])}},\n`
              if (module.task[i - 1].motor_control_type[j - 1] > 1) {
                sub_res += `{"sn${module.sn}_app_${i}_sdowrite_motor${j}_speed_pid_kp", (float) ${module.task[i - 1].motor_speed_pid_param[j - 1].kp}},\n`
                sub_res += `{"sn${module.sn}_app_${i}_sdowrite_motor${j}_speed_pid_ki", (float) ${module.task[i - 1].motor_speed_pid_param[j - 1].ki}},\n`
                sub_res += `{"sn${module.sn}_app_${i}_sdowrite_motor${j}_speed_pid_kd", (float) ${module.task[i - 1].motor_speed_pid_param[j - 1].kd}},\n`
                sub_res += `{"sn${module.sn}_app_${i}_sdowrite_motor${j}_speed_pid_max_out", (float) ${module.task[i - 1].motor_speed_pid_param[j - 1].maxout}},\n`
                sub_res += `{"sn${module.sn}_app_${i}_sdowrite_motor${j}_speed_pid_max_iout", (float) ${module.task[i - 1].motor_speed_pid_param[j - 1].maxiout}},\n`
                sub_sdo_len += (4 * 5)
              }

              if (module.task[i - 1].motor_control_type[j - 1] > 2) {
                sub_res += `{"sn${module.sn}_app_${i}_sdowrite_motor${j}_angle_pid_kp", (float) ${module.task[i - 1].motor_angle_pid_param[j - 1].kp}},\n`
                sub_res += `{"sn${module.sn}_app_${i}_sdowrite_motor${j}_angle_pid_ki", (float) ${module.task[i - 1].motor_angle_pid_param[j - 1].ki}},\n`
                sub_res += `{"sn${module.sn}_app_${i}_sdowrite_motor${j}_angle_pid_kd", (float) ${module.task[i - 1].motor_angle_pid_param[j - 1].kd}},\n`
                sub_res += `{"sn${module.sn}_app_${i}_sdowrite_motor${j}_angle_pid_max_out", (float) ${module.task[i - 1].motor_angle_pid_param[j - 1].maxout}},\n`
                sub_res += `{"sn${module.sn}_app_${i}_sdowrite_motor${j}_angle_pid_max_iout", (float) ${module.task[i - 1].motor_angle_pid_param[j - 1].maxiout}},\n`
                sub_sdo_len += (4 * 5)
              }
            }

            sub_res += `{"sn${module.sn}_app_${i}_read_topic", std::string("${module.task[i - 1].read_topic || `/ecat/sn${module.sn}/app${i}/read`}")},\n`
            sub_res += `{"sn${module.sn}_app_${i}_write_topic", std::string("${module.task[i - 1].write_topic || `/ecat/sn${module.sn}/app${i}/write`}")},\n`
            sub_res += `{"sn${module.sn}_app_${i}_pdowrite_offset", (uint16_t) ${pdowrite_offset})},\n`
            sub_res += `{"sn${module.sn}_app_${i}_pdoread_offset", (uint16_t) ${pdoread_offset})},\n`

            res += `{"sn${module.sn}_app_${i}_sdo_len", (uint16_t) ${sub_sdo_len}},\n`
            sdo_length += sub_sdo_len
            res += sub_res
            res += '\n'
            pdoread_offset += pdoread_len
            pdowrite_offset += pdowrite_len
            break
          }
        }
      }

      res = res.replaceAll('\r', '')
      if (this.modules.indexOf(module) === this.modules.length - 1) {
        res = res.substring(0, res.length - 2)
        res += '\n'
      }
      return (`{"sn${module.sn}_sdo_len", (uint16_t) ${sdo_length + 1}},\n` + res + '\n')
    }
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=JetBrains+Mono");

.code {
  font-family: 'JetBrains Mono', serif;
  line-height: 23px !important;
}

.box-card {
  margin-bottom: 20px;
}
</style>