<template>
  <div class="text item" style="margin: 30px">
    <el-divider content-position="left">Slave -> Master</el-divider>
    <el-form size="small" label-width="50%" label-position="left">
      <el-form-item label="Left x%" style="margin: 0" class="havetag">
        <el-tag size="small">Float</el-tag>
        <el-tag size="small" type="warning">[-1, 1]</el-tag>
      </el-form-item>
      <el-form-item label="Left y%" style="margin: 0" class="havetag">
        <el-tag size="small">Float</el-tag>
        <el-tag size="small" type="warning">[-1, 1]</el-tag>
      </el-form-item>
      <el-form-item label="Right x%" style="margin: 0" class="havetag">
        <el-tag size="small">Float</el-tag>
        <el-tag size="small" type="warning">[-1, 1]</el-tag>
      </el-form-item>
      <el-form-item label="Right y%" style="margin: 0" class="havetag">
        <el-tag size="small">Float</el-tag>
        <el-tag size="small" type="warning">[-1, 1]</el-tag>
      </el-form-item>
      <el-form-item label="Dial %" style="margin: 0" class="havetag">
        <el-tag size="small">Float</el-tag>
        <el-tag size="small" type="warning">[-1, 1]</el-tag>
      </el-form-item>
      <el-form-item label="Left switcher" style="margin: 0" class="havetag">
        <el-tag size="small">UInt8</el-tag>
        <el-tag size="small" type="warning">{1, 3, 2}</el-tag>
      </el-form-item>
      <el-form-item label="Right switcher" style="margin: 0" class="havetag">
        <el-tag size="small">UInt8</el-tag>
        <el-tag size="small" type="warning">{1, 3, 2}</el-tag>
      </el-form-item>

      <el-form-item label="Qw" style="margin: 0" class="havetag">
        <el-tag size="small">Float</el-tag>
        <el-tag size="small" type="warning">[-1, 1]</el-tag>
      </el-form-item>
      <el-form-item label="Qx" style="margin: 0" class="havetag">
        <el-tag size="small">Float</el-tag>
        <el-tag size="small" type="warning">[-1, 1]</el-tag>
      </el-form-item>
      <el-form-item label="Qy" style="margin: 0" class="havetag">
        <el-tag size="small">Float</el-tag>
        <el-tag size="small" type="warning">[-1, 1]</el-tag>
      </el-form-item>
      <el-form-item label="Qz" style="margin: 0" class="havetag">
        <el-tag size="small">Float</el-tag>
        <el-tag size="small" type="warning">[-1, 1]</el-tag>
      </el-form-item>

      <el-form-item label="Gyro X" style="margin: 0" class="havetag">
        <el-tag size="small">Float</el-tag>
        <el-tag size="small" type="success">rad/s</el-tag>
      </el-form-item>
      <el-form-item label="Gyro Y" style="margin: 0" class="havetag">
        <el-tag size="small">Float</el-tag>
        <el-tag size="small" type="success">rad/s</el-tag>
      </el-form-item>
      <el-form-item label="Gyro Z" style="margin: 0" class="havetag">
        <el-tag size="small">Float</el-tag>
        <el-tag size="small" type="success">rad/s</el-tag>
      </el-form-item>

      <el-form-item label="Accel X" style="margin: 0" class="havetag">
        <el-tag size="small">Float</el-tag>
        <el-tag size="small" type="success">m/s^2</el-tag>
      </el-form-item>
      <el-form-item label="Accel Y" style="margin: 0" class="havetag">
        <el-tag size="small">Float</el-tag>

        <el-tag size="small" type="success">m/s^2</el-tag>
      </el-form-item>
      <el-form-item label="Accel Z" style="margin: 0" class="havetag">
        <el-tag size="small">Float</el-tag>
        <el-tag size="small" type="success">m/s^2</el-tag>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
export default {
  name: 'DJIRC_IMU',
  data() {
    return {
      task_id: 0
    }
  },
  mounted() {
    this.task_id = 0x00
  }
}
</script>

<style>
.el-tag {
  margin-right: 15px;
}
</style>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
</style>