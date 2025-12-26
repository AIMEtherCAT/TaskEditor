<template>
  <el-form-item label="Control Period">
    <el-input-number v-model="row.control_period" :max="65535" :min="1"/>
    ms
  </el-form-item>
</template>

<script>
export default {
  name: "NumberInput",
  props: {
    row: {type: Object, required: true},
  }
}
</script>
