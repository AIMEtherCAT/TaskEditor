<template>
  <div style="text-align: center">
    <el-button @click="$emit('add-module', 0x03)">H750 Universal Module</el-button>
    <el-button @click="$emit('add-module', 0x04)">H750 Universal Module (Large PDO V.)</el-button>
    <el-button @click="$emit('add-module', 0x05)">HPM6E80 Universal Module</el-button>
  </div>
</template>

<script>
export default {
  name: 'ModuleAddButtons',
  emits: ['add-module'],
};
</script>
