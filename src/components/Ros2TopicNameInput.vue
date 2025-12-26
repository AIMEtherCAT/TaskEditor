<template>
  <div>
    <el-form-item :label="`${pubLabel} Publisher Topic Name`" v-if="pub">
      <el-input v-model="row.row.read_topic"
                :placeholder="`/ecat/sn${sn}/app${row.$index+1}/read`"></el-input>
    </el-form-item>

    <el-form-item :label="`${subLabel} Subscriber Topic Name`" v-if="sub">
      <el-input v-model="row.row.write_topic"
                :placeholder="`/ecat/sn${sn}/app${row.$index+1}/write`"></el-input>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: "Ros2TopicNameInput",
  props: {
    row: {type: Object, required: true},
    sn: {type: String, required: true},
    pub: {type: Boolean, required: true},
    sub: {type: Boolean, required: true},
    pubLabel: {type: String},
    subLabel: {type: String},
  }
}
</script>
