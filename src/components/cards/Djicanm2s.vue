<template>
  <el-form size="small" label-width="50%" label-position="left">
    <el-form-item v-show="info.motor1_enable" :label="name + 'Motor1 Out'" style="margin: 0" class="havetag">
      <el-tag size="small">Int16</el-tag>
      <el-tag size="small" type="warning">[-32767,32767]</el-tag>
    </el-form-item>
    <el-form-item v-show="info.motor2_enable" :label="name + 'Motor2 Out'" style="margin: 0" class="havetag">
      <el-tag size="small">Int16</el-tag>
      <el-tag size="small" type="warning">[-32767,32767]</el-tag>
    </el-form-item>
    <el-form-item v-show="info.motor3_enable" :label="name + 'Motor3 Out'" style="margin: 0" class="havetag">
      <el-tag size="small">Int16</el-tag>
      <el-tag size="small" type="warning">[-32767,32767]</el-tag>
    </el-form-item>
    <el-form-item v-show="info.motor4_enable" :label="name + 'Motor4 Out'" style="margin: 0" class="havetag">
      <el-tag size="small">Int16</el-tag>
      <el-tag size="small" type="warning">[-32767,32767]</el-tag>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'djicanm2s',
  props: ['info', 'name']
}
</script>