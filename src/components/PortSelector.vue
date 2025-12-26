<template>
  <div>
    <el-form-item label="Port">
      <el-radio-group v-model="row[field]">
        <el-radio :label="1">Port1</el-radio>
        <el-radio :label="2">Port2</el-radio>
      </el-radio-group>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: "PortSelector",
  props: {
    row: { type: Object, required: true },
    field: { type: String, default: "port_id" }
  }
}
</script>
