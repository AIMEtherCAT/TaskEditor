<template>
  <div>
    <el-divider><span>Downloads</span></el-divider>
    <div style="text-align: center">
      <el-button @click="update">Refresh</el-button>
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

      <el-card v-for="module_configuration in module_configurations" :key="module_configuration.sn" class="box-card"
               shadow="hover">
        <div slot="header" class="clearfix">
          <div>
            Slave <b><u>{{ module_configurations.indexOf(module_configuration) + 1 }}</u></b> -
            SN <b><u>{{ module_configuration.sn }}</u></b> -
            <b><u>{{ getTypeFriendlyName(module_configuration.type) }}</u></b>
          </div>
          <div style="margin-top: 5px">
            TXPDO (slv to master) Len
            <b><u>{{ module_configuration.pdoread_offset }} / {{ getPdoLen(module_configuration.type)[0] }}</u></b> -

            RXPDO (master to slv) Len
            <b><u>{{ module_configuration.pdowrite_offset }} / {{ getPdoLen(module_configuration.type)[1] }}</u></b>

            <el-tag v-if="module_configuration.pdoread_offset > getPdoLen(module_configuration.type)[0]" type="danger"
                    size="small"
                    style="margin-left: 10px">TXPDO Overflow
            </el-tag>

            <el-tag v-if="module_configuration.pdowrite_offset > getPdoLen(module_configuration.type)[1]" type="danger"
                    size="small"
                    style="margin-left: 10px">RXPDO Overflow
            </el-tag>

            <el-tag
                v-if="module_configuration.pdoread_offset <= getPdoLen(module_configuration.type)[0]
                 && module_configuration.pdowrite_offset <= getPdoLen(module_configuration.type)[1]"
                type="success" size="small" style="margin-left: 10px">OK
            </el-tag>
          </div>

        </div>
        <div class="text item code" style="white-space: pre-wrap;">{{ module_configuration.configuration }}</div>
      </el-card>
    </div>

  </div>
</template>

<script>

import {generateModuleDef} from "@/utils/generate-module-def";

export default {
  name: 'Generator',
  data() {
    return {
      modules: [],
      module_configurations: [],
      header: 'slaves:\n',
    }
  },
  mounted() {
    this.update()
  },
  methods: {
    getTypeFriendlyName(hexId) {
      switch (hexId) {
          // deprecated
          // case 0x01:
          //   return "Flight Module"
          // case 0x02:
          //   return "Motor Module"
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
    downloadAll() {
      let textToSave = this.header
      this.module_configurations.forEach(module_configuration => {
        textToSave += module_configuration.configuration
      })

      const blob = new Blob([textToSave], {type: 'text/plain;charset=utf-8'})
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url;
      link.setAttribute('download', 'config.yaml');
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    },
    update() {
      if (localStorage.getItem("modules_info") != null) {
        this.modules = JSON.parse(localStorage.getItem("modules_info"));
        this.module_configurations = []
        this.modules.forEach(module => {
          this.module_configurations.push(generateModuleDef(module));
        })
      }
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
