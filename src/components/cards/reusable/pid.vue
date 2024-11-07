<template>
  <el-form size="small" label-width="50%" label-position="left" class="no_margin_bottom">
    <el-form-item label="Out Type">
      <el-radio-group v-model="pid_info.out_type">
        <el-radio label="0x00" style="margin-bottom: 5px">Open Loop</el-radio> <br/>
        <el-radio label="0x01" style="margin-bottom: 5px">Single PID</el-radio> <br/>
        <el-radio label="0x02">Double PID</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="PID 1 Feed Type" v-show="pid_info.out_type !== '0x00'">
      <el-radio-group v-model="pid_info.pid1_feed_type">
        <el-radio label="0x01" style="margin-bottom: 5px">ECD</el-radio> <br/>
        <el-radio label="0x02">RPM</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="PID 1 Kp" v-show="pid_info.out_type !== '0x00'">
      <el-input v-model="pid_info.pid1_kp" @input="(v)=>(pid_info.pid1_kp=v.replace(/^\D*(\d*(?:\.\d{0,})?).*$/g, '$1'))"/>
    </el-form-item>

    <el-form-item label="PID 1 Ki" v-show="pid_info.out_type !== '0x00'">
      <el-input v-model="pid_info.pid1_ki" @input="(v)=>(pid_info.pid1_ki=v.replace(/^\D*(\d*(?:\.\d{0,})?).*$/g, '$1'))"/>
    </el-form-item>

    <el-form-item label="PID 1 Kd" v-show="pid_info.out_type !== '0x00'">
      <el-input v-model="pid_info.pid1_kd" @input="(v)=>(pid_info.pid1_kd=v.replace(/^\D*(\d*(?:\.\d{0,})?).*$/g, '$1'))"/>
    </el-form-item>

    <el-form-item label="PID 1 Max Out" v-show="pid_info.out_type !== '0x00'">
      <el-input v-model="pid_info.pid1_maxout" @input="(v)=>(pid_info.pid1_maxout=v.replace(/^\D*(\d*(?:\.\d{0,})?).*$/g, '$1'))"/>
    </el-form-item>

    <el-form-item label="PID 1 Deadband" v-show="pid_info.out_type !== '0x00'">
      <el-input v-model="pid_info.pid1_deadband" @input="(v)=>(pid_info.pid1_deadband=v.replace(/^\D*(\d*(?:\.\d{0,})?).*$/g, '$1'))"/>
    </el-form-item>

    <el-form-item label="PID 1 Max IOut" v-show="pid_info.out_type !== '0x00'">
      <el-input v-model="pid_info.pid1_maxiout" @input="(v)=>(pid_info.pid1_maxiout=v.replace(/^\D*(\d*(?:\.\d{0,})?).*$/g, '$1'))"/>
    </el-form-item>

    <el-form-item label="PID 2 Feed Type" v-show="pid_info.out_type === '0x02'">
      <el-radio-group v-model="pid_info.pid2_feed_type">
        <el-radio label="0x01" style="margin-bottom: 5px">ECD</el-radio> <br/>
        <el-radio label="0x02">RPM</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="PID 2 Kp" v-show="pid_info.out_type === '0x02'">
      <el-input v-model="pid_info.pid2_kp" @input="(v)=>(pid_info.pid2_kp=v.replace(/^\D*(\d*(?:\.\d{0,})?).*$/g, '$1'))"/>
    </el-form-item>

    <el-form-item label="PID 2 Ki" v-show="pid_info.out_type === '0x02'">
      <el-input v-model="pid_info.pid2_ki" @input="(v)=>(pid_info.pid2_ki=v.replace(/^\D*(\d*(?:\.\d{0,})?).*$/g, '$1'))"/>
    </el-form-item>

    <el-form-item label="PID 2 Kd" v-show="pid_info.out_type === '0x02'">
      <el-input v-model="pid_info.pid2_kd" @input="(v)=>(pid_info.pid2_kd=v.replace(/^\D*(\d*(?:\.\d{0,})?).*$/g, '$1'))"/>
    </el-form-item>

    <el-form-item label="PID 2 Max Out" v-show="pid_info.out_type === '0x02'">
      <el-input v-model="pid_info.pid2_maxout" @input="(v)=>(pid_info.pid2_maxout=v.replace(/^\D*(\d*(?:\.\d{0,})?).*$/g, '$1'))"/>
    </el-form-item>

    <el-form-item label="PID 2 Deadband" v-show="pid_info.out_type === '0x02'">
      <el-input v-model="pid_info.pid2_deadband" @input="(v)=>(pid_info.pid2_deadband=v.replace(/^\D*(\d*(?:\.\d{0,})?).*$/g, '$1'))"/>
    </el-form-item>

    <el-form-item label="PID 2 Max IOut" v-show="pid_info.out_type === '0x02'">
      <el-input v-model="pid_info.pid2_maxiout" @input="(v)=>(pid_info.pid2_maxiout=v.replace(/^\D*(\d*(?:\.\d{0,})?).*$/g, '$1'))"/>
    </el-form-item>

  </el-form>
</template>

<script>
export default {
  name: 'Pid',
  data() {
    return {

    }
  },
  props: ['pid_info']
}
</script>

<style>
.no_margin_bottom > .el-form-item {
  margin-bottom: 0!important;
}
</style>