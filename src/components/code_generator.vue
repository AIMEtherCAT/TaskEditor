<template>
  <div>
    <el-divider><span>Downloads</span></el-divider>
    <div style="text-align: center">
      <el-button @click="loadAll">Refresh</el-button>
      <el-button @click="downloadAll">Download configuration file</el-button>
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
          <el-tag v-if="generateModuleDef(module)[2] > getPdoLen(module.type)[0]" type="danger" size="small" style="margin-left: 10px">TXPDO (slv to master) Overflow {{ generateModuleDef(module)[2] }} / 80</el-tag>
          <el-tag v-if="generateModuleDef(module)[3] > getPdoLen(module.type)[1]" type="danger" size="small" style="margin-left: 10px">RXPDO (master to slv) Overflow {{ generateModuleDef(module)[3] }} / 80</el-tag>
          <el-tag v-if="!(generateModuleDef(module)[3] > getPdoLen(module.type)[1] || generateModuleDef(module)[2] > getPdoLen(module.type)[0])" type="success" size="small" style="margin-left: 10px">OK</el-tag>
        </div>
        <div class="text item code" style="white-space: pre-wrap;">{{ generateModuleDef(module)[0] }}</div>
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
      header: 'slaves:\n',
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
        case 0x03:
          return "H750 Universal Module"
      }
    },
    // read, write
    getPdoLen(hexId) {
      switch (hexId) {
        case 0x03:
          return [80, 80]
      }
    },
    loadAll() {
      this.update()
      let textToSave = this.header
      this.modules.forEach(module => {
        textToSave += this.generateModuleDef(module)[0]
      })
      console.log(textToSave)
    },
    downloadAll() {
      let textToSave = this.header
      this.modules.forEach(module => {
        textToSave += this.generateModuleDef(module)[0]
      })

      // 创建一个Blob实例，类型为纯文本
      const blob = new Blob([textToSave], {type: 'text/plain;charset=utf-8'})
      // 创建一个指向Blob的URL
      const url = URL.createObjectURL(blob)
      // 创建一个a标签
      const link = document.createElement('a')
      link.href = url;
      // 指定下载的文件名
      link.setAttribute('download', 'config.yaml');
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

      res += `      task_count: !uint8_t ${module.task.length}\n`
      res += `      latency_pub_topic: !std::string '${module.latency_topic}'\n`
      res += '\n      tasks:\n'

      for (let i = 1; i <= module.task.length; i++) {
        res += `        - app_${i}:\n`
        res += `            sdowrite_task_type: !uint8_t ${module.task[i - 1].type}\n`

        switch (module.task[i - 1].type) {
          case 0x01: {
            res += `            pub_topic: !std::string '${module.task[i - 1].read_topic || `/ecat/sn${module.sn}/app${i}/read`}'\n`
            res += `            pdoread_offset: !uint16_t ${pdoread_offset}\n`

            sdo_length += 1
            pdoread_offset += 19
            break
          }
          case 0x02: {
            res += `            sdowrite_control_period: !uint16_t ${module.task[i - 1].control_period}\n`
            res += `            sdowrite_can_packet_id: !uint32_t ${this.toHexStringWithPrefix(module.task[i - 1].can_packet_id)}\n`
            res += `            sdowrite_can_inst: !uint8_t ${module.task[i - 1].can_inst}\n`
            res += `            sdowrite_control_type: !uint8_t ${module.task[i - 1].control_type}\n`
            res += `            pub_topic: !std::string '${module.task[i - 1].read_topic || `/ecat/sn${module.sn}/app${i}/read`}'\n`
            res += `            sub_topic: !std::string '${module.task[i - 1].write_topic || `/ecat/sn${module.sn}/app${i}/write`}'\n`
            res += `            pdoread_offset: !uint16_t ${pdoread_offset}\n`
            res += `            pdowrite_offset: !uint16_t ${pdowrite_offset}\n`

            sdo_length += 9
            pdoread_offset += 7
            pdowrite_offset += 7
            break
          }
          case 3: {
            res += `            pub_topic: !std::string '${module.task[i - 1].read_topic || `/ecat/sn${module.sn}/app${i}/read`}'\n`
            res += `            pdoread_offset: !uint16_t ${pdoread_offset}\n`

            sdo_length += 1
            pdoread_offset += (8+8+5)
            break
          }
          case 4: {
            res += `            sdowrite_dshot_id: !uint8_t ${module.task[i - 1].dshot_id}\n`
            res += `            sub_topic: !std::string '${module.task[i - 1].write_topic || `/ecat/sn${module.sn}/app${i}/write`}'\n`
            res += `            pdowrite_offset: !uint16_t ${pdowrite_offset}\n`

            sdo_length += 2
            pdowrite_offset += 8
            break
          }
          case 5: {
            let sub_res = ''
            let sub_sdo_len = 0

            sub_res += `            sdowrite_control_period: !uint16_t ${module.task[i - 1].control_period}\n`
            sub_res += `            sdowrite_can_packet_id: !uint32_t ${this.toHexStringWithPrefix(module.task[i - 1].can_packet_id)}\n`
            sub_res += `            sdowrite_motor1_can_id: !uint32_t ${module.task[i - 1].motor_enable[0] ? this.toHexStringWithPrefix(this.get_id(this.toHexStringWithPrefix(module.task[i - 1].can_packet_id), module.task[i - 1].motor_id[0])) : 0}\n`
            sub_res += `            sdowrite_motor2_can_id: !uint32_t ${module.task[i - 1].motor_enable[1] ? this.toHexStringWithPrefix(this.get_id(this.toHexStringWithPrefix(module.task[i - 1].can_packet_id), module.task[i - 1].motor_id[1])) : 0}\n`
            sub_res += `            sdowrite_motor3_can_id: !uint32_t ${module.task[i - 1].motor_enable[2] ? this.toHexStringWithPrefix(this.get_id(this.toHexStringWithPrefix(module.task[i - 1].can_packet_id), module.task[i - 1].motor_id[2])) : 0}\n`
            sub_res += `            sdowrite_motor4_can_id: !uint32_t ${module.task[i - 1].motor_enable[3] ? this.toHexStringWithPrefix(this.get_id(this.toHexStringWithPrefix(module.task[i - 1].can_packet_id), module.task[i - 1].motor_id[3])) : 0}\n`
            sub_res += `            sdowrite_can_inst: !uint8_t ${module.task[i - 1].can_inst}\n\n`
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
              sub_res += `            sdowrite_motor${j}_control_type: !uint8_t ${module.task[i - 1].motor_control_type[j - 1]}\n`
              if (module.task[i - 1].motor_control_type[j - 1] > 1) {
                sub_res += `            sdowrite_motor${j}_speed_pid_kp: !float ${module.task[i - 1].motor_speed_pid_param[j - 1].kp}\n`
                sub_res += `            sdowrite_motor${j}_speed_pid_ki: !float ${module.task[i - 1].motor_speed_pid_param[j - 1].ki}\n`
                sub_res += `            sdowrite_motor${j}_speed_pid_kd: !float ${module.task[i - 1].motor_speed_pid_param[j - 1].kd}\n`
                sub_res += `            sdowrite_motor${j}_speed_pid_max_out: !float ${module.task[i - 1].motor_speed_pid_param[j - 1].maxout}\n`
                sub_res += `            sdowrite_motor${j}_speed_pid_max_iout: !float ${module.task[i - 1].motor_speed_pid_param[j - 1].maxiout}\n`
                sub_sdo_len += (4 * 5)
              }

              if (module.task[i - 1].motor_control_type[j - 1] > 2) {
                sub_res += `            sdowrite_motor${j}_angle_pid_kp: !float ${module.task[i - 1].motor_angle_pid_param[j - 1].kp}\n`
                sub_res += `            sdowrite_motor${j}_angle_pid_ki: !float ${module.task[i - 1].motor_angle_pid_param[j - 1].ki}\n`
                sub_res += `            sdowrite_motor${j}_angle_pid_kd: !float ${module.task[i - 1].motor_angle_pid_param[j - 1].kd}\n`
                sub_res += `            sdowrite_motor${j}_angle_pid_max_out: !float ${module.task[i - 1].motor_angle_pid_param[j - 1].maxout}\n`
                sub_res += `            sdowrite_motor${j}_angle_pid_max_iout: !float ${module.task[i - 1].motor_angle_pid_param[j - 1].maxiout}\n`
                sub_sdo_len += (4 * 5)
              }
              sub_res += '\n'
            }


            sdo_length += sub_sdo_len
            res += sub_res
            res += `            pub_topic: !std::string '${module.task[i - 1].read_topic || `/ecat/sn${module.sn}/app${i}/read`}'\n`
            res += `            sub_topic: !std::string '${module.task[i - 1].write_topic || `/ecat/sn${module.sn}/app${i}/write`}'\n`
            res += `            pdoread_offset: !uint16_t ${pdoread_offset}\n`
            res += `            pdowrite_offset: !uint16_t ${pdowrite_offset}\n`
            pdoread_offset += pdoread_len
            pdowrite_offset += pdowrite_len
            break
          }
          case 6: {
            res += `            sdowrite_tim_id: !uint8_t ${module.task[i - 1].tim_id}\n`
            res += `            sdowrite_pwm_period: !uint16_t ${module.task[i - 1].expected_period}\n`
            res += `            sdowrite_init_value: !uint16_t ${module.task[i - 1].init_value}\n`
            res += `            sub_topic: !std::string '${module.task[i - 1].write_topic || `/ecat/sn${module.sn}/app${i}/write`}'\n`
            res += `            pdowrite_offset: !uint16_t ${pdowrite_offset}\n`

            sdo_length += 6
            pdowrite_offset += 8
            break
          }
          case 8: {
            res += `            pub_topic: !std::string '${module.task[i - 1].read_topic || `/ecat/sn${module.sn}/app${i}/read`}'\n`
            res += `            pdoread_offset: !uint16_t ${pdoread_offset}\n`

            sdo_length += 1
            pdoread_offset += 8
            break
          }
          case 9: {
            res += `            sdowrite_channel1_coefficient_per_volt: !float ${module.task[i - 1].coefficient0}\n`
            res += `            sdowrite_channel2_coefficient_per_volt: !float ${module.task[i - 1].coefficient1}\n`
            res += `            pub_topic: !std::string '${module.task[i - 1].read_topic || `/ecat/sn${module.sn}/app${i}/read`}'\n`
            res += `            pdoread_offset: !uint16_t ${pdoread_offset}\n`

            sdo_length += 9
            pdoread_offset += 8
            break
          }
          case 10: {
            res += `            pub_topic: !std::string '${module.task[i - 1].read_topic || `/ecat/sn${module.sn}/app${i}/read`}'\n`
            res += `            pdoread_offset: !uint16_t ${pdoread_offset}\n`

            sdo_length += 1
            pdoread_offset += 6
            break
          }
        }
      }

      res = res.replaceAll('\r', '')
      res = `      sdo_len: !uint16_t ${sdo_length + 1}\n` + res
      res = `  - sn${module.sn}:\n` + res
      return [(res + '\n'), sdo_length + 1, pdoread_offset, pdowrite_offset]
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