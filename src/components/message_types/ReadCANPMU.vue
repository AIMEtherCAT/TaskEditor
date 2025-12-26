<template>
  <div>
    <el-form-item label="Message Type" style="margin: 0">
      <el-tag>custom_msgs/ReadCANPMU</el-tag>
    </el-form-item>
    <el-divider/>
    <el-form-item class="havetag" label="header" style="margin: 0">
      <el-tag size="small">std_msgs/Header</el-tag>
    </el-form-item>
    <el-form-item class="havetag" label="temperature" style="margin: 0">
      <el-tag size="small">float32</el-tag>
    </el-form-item>
    <el-form-item class="havetag" label="voltage" style="margin: 0">
      <el-tag size="small">float32</el-tag>
    </el-form-item>
    <el-form-item class="havetag" label="current" style="margin: 0">
      <el-tag size="small">float32</el-tag>
    </el-form-item>
  </div>
</template>
