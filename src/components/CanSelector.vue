<template>
  <div>
    <el-form-item label="CAN Port">
      <el-radio-group v-model="row.can_inst" :disabled="isHpmSingleCan">
        <el-radio :label="1">{{ isHpmSingleCan ? 'CAN1 (JC6E80 MCAN6)' : 'CAN1' }}</el-radio>
        <el-radio v-if="!isHpmSingleCan" :label="2">CAN2</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="CAN Baudrate" v-if="showBaudrate">
      <el-tag>{{ baudrate }}</el-tag>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: "CanSelector",
  props: {
    row: {type: Object, required: true},
    moduleType: {type: Number, default: 0},
    showBaudrate: {type: Boolean, default: true},
    baudrate: {type: String, default: "1 Mbit/s"}
  },
  computed: {
    isHpmSingleCan() {
      return this.moduleType === 0x05;
    }
  },
  watch: {
    moduleType: {
      immediate: true,
      handler(val) {
        if (val === 0x05 && this.row.can_inst !== 1) {
          this.row.can_inst = 1;
        }
      }
    }
  }
}
</script>
