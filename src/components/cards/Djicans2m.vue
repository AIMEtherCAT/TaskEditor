<template>
  <el-form size="small" label-width="50%" label-position="left">
    <el-form-item v-show="info.motor1_enable" :label="name + 'Motor1 ecd'" style="margin: 0" class="havetag">
      <el-tag size="small">Int16</el-tag>
      <el-tag size="small" type="warning">[0,8191]</el-tag>
    </el-form-item>
    <el-form-item v-show="info.motor1_enable" :label="name + 'Motor1 rpm'" style="margin: 0" class="havetag">
      <el-tag size="small">Int16</el-tag>
      <el-tag size="small" type="warning">[-32767,32767]</el-tag>
      <el-tag size="small" type="success">round per minute</el-tag>
    </el-form-item>
    <el-form-item v-show="info.motor1_enable" :label="name + 'Motor1 temperature'" style="margin: 0" class="havetag">
      <el-tag size="small">UInt8</el-tag>
      <el-tag size="small" type="warning">[0,255]</el-tag>
      <el-tag size="small" type="success">°C</el-tag>
    </el-form-item>

    <el-form-item v-show="info.motor2_enable" :label="name + 'Motor2 ecd'" style="margin: 0" class="havetag">
      <el-tag size="small">Int16</el-tag>
      <el-tag size="small" type="warning">[0,8191]</el-tag>
    </el-form-item>
    <el-form-item v-show="info.motor2_enable" :label="name + 'Motor2 rpm'" style="margin: 0" class="havetag">
      <el-tag size="small">Int16</el-tag>
      <el-tag size="small" type="warning">[-32767,32767]</el-tag>
      <el-tag size="small" type="success">round per minute</el-tag>
    </el-form-item>
    <el-form-item v-show="info.motor2_enable" :label="name + 'Motor2 temperature'" style="margin: 0" class="havetag">
      <el-tag size="small">UInt8</el-tag>
      <el-tag size="small" type="warning">[0,255]</el-tag>
      <el-tag size="small" type="success">°C</el-tag>
    </el-form-item>

    <el-form-item v-show="info.motor3_enable" :label="name + 'Motor3 ecd'" style="margin: 0" class="havetag">
      <el-tag size="small">Int16</el-tag>
      <el-tag size="small" type="warning">[0,8191]</el-tag>
    </el-form-item>
    <el-form-item v-show="info.motor3_enable" :label="name + 'Motor3 rpm'" style="margin: 0" class="havetag">
      <el-tag size="small">Int16</el-tag>
      <el-tag size="small" type="warning">[-32767,32767]</el-tag>
      <el-tag size="small" type="success">round per minute</el-tag>
    </el-form-item>
    <el-form-item v-show="info.motor3_enable" :label="name + 'Motor3 temperature'" style="margin: 0" class="havetag">
      <el-tag size="small">UInt8</el-tag>
      <el-tag size="small" type="warning">[0,255]</el-tag>
      <el-tag size="small" type="success">°C</el-tag>
    </el-form-item>

    <el-form-item v-show="info.motor4_enable" :label="name + 'Motor4 ecd'" style="margin: 0" class="havetag">
      <el-tag size="small">Int16</el-tag>
      <el-tag size="small" type="warning">[0,8191]</el-tag>
    </el-form-item>
    <el-form-item v-show="info.motor4_enable" :label="name + 'Motor4 rpm'" style="margin: 0" class="havetag">
      <el-tag size="small">Int16</el-tag>
      <el-tag size="small" type="warning">[-32767,32767]</el-tag>
      <el-tag size="small" type="success">round per minute</el-tag>
    </el-form-item>
    <el-form-item v-show="info.motor4_enable" :label="name + 'Motor4 temperature'" style="margin: 0" class="havetag">
      <el-tag size="small">UInt8</el-tag>
      <el-tag size="small" type="warning">[0,255]</el-tag>
      <el-tag size="small" type="success">°C</el-tag>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'djicans2m',
  props: ['info', 'name']
}
</script>