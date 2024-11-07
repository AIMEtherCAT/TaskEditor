<template>
  <div>
    <el-divider><span>Downloads</span></el-divider>
    <div style="text-align: center">
      <el-button @click="loadAll">Refresh</el-button>
      <el-button @click="downloadAll">Download init.py file</el-button>
    </div>

    <el-divider><span>Split views</span></el-divider>

    <div>

      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          Header
        </div>
        <div class="text item code" style="white-space: pre-wrap;">
          {{ other }}
        </div>
      </el-card>
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          Sdo definition
          <el-divider direction="vertical"></el-divider>
          Length: {{sdo_length}}
        </div>
        <div class="text item code" style="white-space: pre-wrap;">
          {{ sdo }}
        </div>
      </el-card>
    </div>

    <div>
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          Sdo data
        </div>
        <div class="text item code" style="white-space: pre-wrap;">
          {{ sdo_data }}
        </div>
      </el-card>
    </div>

    <div>
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          Master to Slave Pdo
          <el-divider direction="vertical"></el-divider>
          Length: {{output_pdo_length}}
        </div>
        <div class="text item code" style="white-space: pre-wrap;">
          {{ output_pdo }}
        </div>
      </el-card>
    </div>

    <div>
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          Slave to Master Pdo
          <el-divider direction="vertical"></el-divider>
          Length: {{input_pdo_length}}
        </div>
        <div class="text item code" style="white-space: pre-wrap;">
          {{ input_pdo }}
        </div>
      </el-card>
    </div>

    <div>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        Ext
      </div>
      <div class="text item code" style="white-space: pre-wrap;">
        {{ ext }}
      </div>
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
      sdo: '',
      ext: '',
      sdo_data: '',
      output_pdo: '',
      input_pdo: '',
      sdo_length: '',
      sdo_data_length: '',
      output_pdo_length: '',
      input_pdo_length: '',
      other: "\n" +
          "import ctypes\n\n\n" +
          "class SdoLengthInformation(ctypes.LittleEndianStructure):\n" +
          "    _pack_ = 1\n" +
          "    _fields_ = [\n" +
          "        ('length', ctypes.c_int32)\n" +
          "    ]\n" +
          "\n" +
          "\n" +
          "class SdoWrite(ctypes.LittleEndianStructure):\n" +
          "    _pack_ = 1\n" +
          "    _fields_ = [\n" +
          "        ('type', ctypes.c_uint8),\n" +
          "        ('idx', ctypes.c_int32),\n" +
          "        ('data', ctypes.c_uint8)\n" +
          "    ]\n" +
          "\n" +
          "\n" +
          "class SdoWriteStatusFeedback(ctypes.LittleEndianStructure):\n" +
          "    _pack_ = 1\n" +
          "    _fields_ = [\n" +
          "        ('type', ctypes.c_uint8),\n" +
          "        ('idx', ctypes.c_int32),\n" +
          "        ('data', ctypes.c_uint8)\n" +
          "    ]\n" +
          "\n" +
          "\n" +
          "class Reset(ctypes.LittleEndianStructure):\n" +
          "    _pack_ = 1\n" +
          "    _fields_ = [\n" +
          "        ('type', ctypes.c_uint8)\n" +
          "    ]" +
          "\n" +
          "\n"
    }
  },
  mounted() {
    this.loadAll()
  },
  methods: {
    loadAll() {
      this.update()
      this.generateSdoData()
      this.generateSdoDetail()
      this.generateM2S()
      this.generateS2M()
      this.generateExt()
    },
    downloadAll() {
      const textToSave = this.other + this.sdo + this.sdo_data + this.input_pdo + this.output_pdo + this.ext
      // 创建一个Blob实例，类型为纯文本
      const blob = new Blob([textToSave], { type: 'text/plain;charset=utf-8' })
      // 创建一个指向Blob的URL
      const url = URL.createObjectURL(blob)
      // 创建一个a标签
      const link = document.createElement('a')
      link.href = url;
      // 指定下载的文件名
      link.setAttribute('download', 'init.py')
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
      return  this.countSubstrings(content, "float") * 4 +
          this.countSubstrings(content, "int8") * 1 +
          this.countSubstrings(content, "int16") * 2
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
    generateSdoData() {
      this.sdo = ""
      this.sdo_length = ""
      this.modules.forEach(module => {

        if (module.type === 0x99) {
          return
        }
        let tmp = "";

        tmp += `class Sdo_${module.sn}(ctypes.LittleEndianStructure):\n` +
            "    _pack_ = 1\n" +
            "    _fields_ = [\n" +
            "        ('task_num', ctypes.c_uint8),\n"

        switch (module.type) {
          case 0x01: {

            for (let i = 1;i<=module.taskamount;i++) {
              tmp += `        ('app_${i}_can_no', ctypes.c_uint8),\n` +
                  `        ('app_${i}_ctrl_id', ctypes.c_int16),\n` +
                  `        ('app_${i}_ctrl_period', ctypes.c_float),\n`
              for (let motor = 1;motor <= 4; motor++) {
                tmp += `        ('app_${i}_motor1_report_id', ctypes.c_int16),\n`
                if (!module[`task_${i}`][`motor${motor}_enable`]) {
                  continue
                }
                tmp += `        ('app_${i}_motor1_ctrl_type', ctypes.c_uint8),\n`

                if (module[`task_${i}`][`motor${i}_pid_info`]['out_type'] !== '0x00') {
                  tmp += `        ('app_${i}_motor${motor}_pid1_feed_type', ctypes.c_uint8),\n` +
                      `        ('app_${i}_motor${motor}_pid1_kp', ctypes.c_float),\n` +
                      `        ('app_${i}_motor${motor}_pid1_ki', ctypes.c_float),\n` +
                      `        ('app_${i}_motor${motor}_pid1_kd', ctypes.c_float),\n` +
                      `        ('app_${i}_motor${motor}_pid1_maxout', ctypes.c_float),\n` +
                      `        ('app_${i}_motor${motor}_pid1_deadband', ctypes.c_float),\n` +
                      `        ('app_${i}_motor${motor}_pid1_maxiout', ctypes.c_float),\n`
                }
                if (module[`task_${i}`][`motor${i}_pid_info`]['out_type'] === '0x02') {
                  tmp += `        ('app_${i}_motor${motor}_pid2_feed_type', ctypes.c_uint8),\n` +
                      `        ('app_${i}_motor${motor}_pid2_kp', ctypes.c_float),\n` +
                      `        ('app_${i}_motor${motor}_pid2_ki', ctypes.c_float),\n` +
                      `        ('app_${i}_motor${motor}_pid2_kd', ctypes.c_float),\n` +
                      `        ('app_${i}_motor${motor}_pid2_maxout', ctypes.c_float),\n` +
                      `        ('app_${i}_motor${motor}_pid2_deadband', ctypes.c_float),\n` +
                      `        ('app_${i}_motor${motor}_pid2_maxiout', ctypes.c_float),\n`
                }

              }
            }

            break
          }
        }
        this.sdo += tmp
        this.sdo = this.sdo.substring(0,this.sdo.length-2)
        this.sdo += '\n    ]\n\n'
        this.sdo_length += `${module.sn}->${this.get_length(tmp)} | `
      })
    },
    get_id(ctrl_id, id) {
      switch (ctrl_id) {
        case '0x200': {
          return 0x200+id
        }
        case '0x2ff':
        case '0x2fe':
        case '0x1fe': {
          return 0x204+id
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
    generateSdoDetail() {
      this.sdo_data = 'def generate_sdo_data(slv_sn):\n'
      let first = true
      this.modules.forEach(module => {

        if (first) {
          this.sdo_data += `    if slv_sn == ${module.sn}:\n`
          first = false
        } else {
          this.sdo_data += `    elif slv_sn == ${module.sn}:\n`
        }

        switch (module.type) {
          case 0x01: {

            this.sdo_data += `        sdo = Sdo_${module.sn}()\n` +
                `        sdo.task_num = ${module.taskamount}\n`

            for (let i = 1;i<=module.taskamount;i++) {
              this.sdo_data += `        sdo.app_${i}_can_no = ${module[`task_${i}`].can_no === 'CAN1' ? '0x01' : '0x02'}\n` +
                  `        sdo.app_${i}_ctrl_id = ${module[`task_${i}`].ctrl_id}\n` +
                  `        sdo.app_${i}_ctrl_period = ${module[`task_${i}`].ctrl_period}\n`
              for (let motor = 1;motor <= 4; motor++) {

                if (!module[`task_${i}`][`motor${motor}_enable`]) {
                  this.sdo_data += `        sdo.app_${i}_motor${motor}_report_id = 0x00\n`
                  continue
                } else {
                  this.sdo_data += `        sdo.app_${i}_motor${motor}_report_id = ${this.toHexStringWithPrefix(this.get_id(module[`task_${i}`].ctrl_id, module[`task_${i}`][`motor${motor}_id`]))}\n`
                }

                this.sdo_data += `        sdo.app_${i}_motor${motor}_ctrl_type = ${module[`task_${i}`][`motor${motor}_pid_info`].out_type}\n`

                if (module[`task_${i}`][`motor${i}_pid_info`]['out_type'] !== '0x00') {
                  this.sdo_data += `        sdo.app_${i}_motor${motor}_pid1_feed_type = ${module[`task_${i}`][`motor${i}_pid_info`].pid1_feed_type}\n` +
                      `        sdo.app_${i}_motor${motor}_pid1_kp = ${module[`task_${i}`][`motor${i}_pid_info`].pid1_kp}\n` +
                      `        sdo.app_${i}_motor${motor}_pid1_ki = ${module[`task_${i}`][`motor${i}_pid_info`].pid1_ki}\n` +
                      `        sdo.app_${i}_motor${motor}_pid1_kd = ${module[`task_${i}`][`motor${i}_pid_info`].pid1_kd}\n` +
                      `        sdo.app_${i}_motor${motor}_pid1_maxout = ${module[`task_${i}`][`motor${i}_pid_info`].pid1_maxout}\n` +
                      `        sdo.app_${i}_motor${motor}_pid1_deadband = ${module[`task_${i}`][`motor${i}_pid_info`].pid1_deadband}\n` +
                      `        sdo.app_${i}_motor${motor}_pid1_maxiout = ${module[`task_${i}`][`motor${i}_pid_info`].pid1_maxiout}\n`
                }
                if (module[`task_${i}`][`motor${i}_pid_info`]['out_type'] === '0x02') {
                  this.sdo_data += `        sdo.app_${i}_motor${motor}_pid2_feed_type = ${module[`task_${i}`][`motor${i}_pid_info`].pid2_feed_type}\n` +
                      `        sdo.app_${i}_motor${motor}_pid2_kp = ${module[`task_${i}`][`motor${i}_pid_info`].pid2_kp}\n` +
                      `        sdo.app_${i}_motor${motor}_pid2_ki = ${module[`task_${i}`][`motor${i}_pid_info`].pid2_ki}\n` +
                      `        sdo.app_${i}_motor${motor}_pid2_kd = ${module[`task_${i}`][`motor${i}_pid_info`].pid2_kd}\n` +
                      `        sdo.app_${i}_motor${motor}_pid2_maxout = ${module[`task_${i}`][`motor${i}_pid_info`].pid2_maxout}\n` +
                      `        sdo.app_${i}_motor${motor}_pid2_deadband = ${module[`task_${i}`][`motor${i}_pid_info`].pid2_deadband}\n` +
                      `        sdo.app_${i}_motor${motor}_pid2_maxiout = ${module[`task_${i}`][`motor${i}_pid_info`].pid2_maxiout}\n`
                }

              }
            }

            break
          }

          case 0x99: {
            this.sdo_data += '        return bytes([])\n\n'
            return
          }

        }
        this.sdo_data += '\n        return sdo\n\n'
      })
    },
    generateM2S() {
      this.output_pdo_length = ""
      this.output_pdo = ""
      this.modules.forEach(module => {
        let tmp = ""
        tmp += `class MstToSlv_${module.sn}(ctypes.LittleEndianStructure):\n` +
            '    _pack_ = 1\n' +
            '    _fields_ = [\n' +
            '        (\'type\', ctypes.c_uint8),\n'

        switch (module.type) {
          case 0x99: {

            break
          }
          case 0x01: {

            for (let i = 1;i<=module.taskamount;i++) {

              for (let motor = 1;motor <= 4; motor++) {
                if (module[`task_${i}`][`motor${motor}_enable`]) {
                  tmp += `        ('app_${i}_motor${motor}_out', ctypes.c_int16),\n`
                }


              }
            }

            break
          }
        }
        this.output_pdo += tmp
        this.output_pdo = this.output_pdo.substring(0,this.output_pdo.length-2)
        this.output_pdo += '\n    ]\n\n'
        this.output_pdo_length += `${module.sn}->${this.get_length(tmp) - 1} | `
      })
    },
    generateS2M() {
      this.input_pdo = ""
      this.input_pdo_length = ""
      this.modules.forEach(module => {

        let tmp = ""

        tmp += `class SlvToMst_${module.sn}(ctypes.LittleEndianStructure):\n` +
            '    _pack_ = 1\n' +
            '    _fields_ = [\n' +
            '        (\'type\', ctypes.c_uint8),\n'

        switch (module.type) {
          case 0x99: {
            tmp += '        (\'app_1_left_x\', ctypes.c_float),\n' +
                '        (\'app_1_left_y\', ctypes.c_float),\n' +
                '        (\'app_1_right_x\', ctypes.c_float),\n' +
                '        (\'app_1_right_y\', ctypes.c_float),\n' +
                '        (\'app_1_dial\', ctypes.c_float),\n' +
                '        (\'app_1_left_switch\', ctypes.c_uint8),\n' +
                '        (\'app_1_right_switch\', ctypes.c_uint8),\n' +
                '        (\'app_2_q0\', ctypes.c_float),\n' +
                '        (\'app_2_q1\', ctypes.c_float),\n' +
                '        (\'app_2_q2\', ctypes.c_float),\n' +
                '        (\'app_2_q3\', ctypes.c_float),\n' +
                '        (\'app_2_gyrox\', ctypes.c_float),\n' +
                '        (\'app_2_gyroy\', ctypes.c_float),\n' +
                '        (\'app_2_gyroz\', ctypes.c_float),\n' +
                '        (\'app_2_accelx\', ctypes.c_float),\n' +
                '        (\'app_2_accely\', ctypes.c_float),\n' +
                '        (\'app_2_accelz\', ctypes.c_float),\n'
            break
          }
          case 0x01: {

            for (let i = 1;i<=module.taskamount;i++) {

              for (let motor = 1;motor <= 4; motor++) {

                if (module[`task_${i}`][`motor${motor}_enable`]) {
                  tmp += `        ('app_${i}_motor${motor}_ecd', ctypes.c_int16),\n` +
                      `        ('app_${i}_motor${motor}_rpm', ctypes.c_int16),\n` +
                      `        ('app_${i}_motor${motor}_temperature', ctypes.c_uint8),\n`
                }

              }
            }

            break
          }
        }
        this.input_pdo += tmp
        this.input_pdo = this.input_pdo.substring(0,this.input_pdo.length-2)
        this.input_pdo += '\n    ]\n\n'
        this.input_pdo_length += `${module.sn}->${this.get_length(tmp) - 1} | `
      })
    },
    generateExt() {
      this.ext = 'class PDO:\n' +
          '    def __init__(self):\n'
      this.modules.forEach(module => {
        this.ext += `        self.slv2mst_${module.sn} = SlvToMst_${module.sn}()\n` +
            `        self.mst2slv_${module.sn} = MstToSlv_${module.sn}()\n\n`
      })
      this.modules.forEach(module => {
        this.ext += `    def load_slv2mst_${module.sn}(self, ref):\n` +
            `        self.slv2mst_${module.sn} = SlvToMst_${module.sn}.from_buffer_copy(ref)\n\n`
      })

      this.ext += '\ndef get_devices():\n    return [\n'
      this.modules.forEach(module => {
        this.ext += `        [${module.sn}, ${this.toHexStringWithPrefix(module.type)}],\n`
      })
      this.ext = this.ext.substring(0,this.ext.length-2)
      this.ext += '\n    ]\n\n'
    }
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=JetBrains+Mono");

.code {
  font-family: 'JetBrains Mono',serif;
  line-height: 23px!important;
}
</style>