<template>
      <el-form size="small" label-width="50%" label-position="left">
        <el-form-item label="CAN" style="margin: 0">
          <el-radio-group @input="change_can" v-model="task_info.can_no">
            <el-radio label="CAN1">CAN1</el-radio>
            <el-radio label="CAN2">CAN2</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="CAN Baudrate" style="margin: 0">
          1 Mbit/s
        </el-form-item>

        <el-form-item label="Motor control packet id" style="margin: 0;" class="havetag">
          <el-radio-group v-model="task_info.ctrl_id" @input="change_ctrl_id">
            <el-radio label="0x200" style="padding-bottom: 5px">0x200
              <el-tag size="small" style="margin-left: 10px">3508 ID1-4</el-tag>
              <el-tag size="small">2006 ID1-4</el-tag>
            </el-radio> <br/>

            <el-radio label="0x1ff" style="padding-bottom: 5px">0x1ff
              <el-tag size="small" style="margin-left: 18px">3508 ID5-8</el-tag>
              <el-tag size="small">2006 ID5-8</el-tag>
              <el-tag size="small" type="success">6020 VOLT_CTRL ID1-4</el-tag>
            </el-radio> <br/>

            <el-radio label="0x2ff" style="padding-bottom: 5px">0x2ff
              <el-tag size="small" type="success" style="margin-left: 18px">6020 VOLT_CTRL ID5-7</el-tag>
            </el-radio> <br/>

            <el-radio label="0x1fe" style="padding-bottom: 5px">0x1fe
              <el-tag size="small" type="warning" style="margin-left: 13.5px">6020 CURR_CTRL ID1-4</el-tag>
            </el-radio> <br/>

            <el-radio label="0x2fe" style="padding-bottom: 5px">0x2fe
              <el-tag size="small" type="warning" style="margin-left: 13.5px">6020 CURR_CTRL ID5-7</el-tag>
            </el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="Motor control period (us)" style="margin: 0">
          <el-input-number v-model="task_info.ctrl_period" :min="1" :max="16777215" />
        </el-form-item>

        <el-form-item label="Motor1 Enable" style="margin: 0">
          <el-switch v-model="task_info.motor1_enable" />
        </el-form-item>
        <el-form-item label="Motor1 ID" style="margin: 0" v-show="task_info.motor1_enable">
          <el-radio-group v-model="task_info.motor1_id" :class="is_disable(1, task_info.motor1_id) ? 'conflict' : ''">
            <el-radio :label="1" v-show="is_show_id(1)">1</el-radio>
            <el-radio :label="2" v-show="is_show_id(2)">2</el-radio>
            <el-radio :label="3" v-show="is_show_id(3)">3</el-radio>
            <el-radio :label="4" v-show="is_show_id(4)" :style="is_show_id(1) && is_show_id(5) ? 'margin-bottom: 5px' : ''">4</el-radio>
            <br/>
            <el-radio :label="5" v-show="is_show_id(5)">5</el-radio>
            <el-radio :label="6" v-show="is_show_id(6)">6</el-radio>
            <el-radio :label="7" v-show="is_show_id(7)">7</el-radio>
            <el-radio :label="8" v-show="is_show_id(8)">8</el-radio>
          </el-radio-group>
          <el-tag size="small" type="danger" v-show="is_disable(1, task_info.motor1_id)">ID conflict</el-tag>
        </el-form-item>
        <el-form-item label="Motor1 Out Settings" style="margin: 0" v-show="task_info.motor1_enable">
          <pid :pid_info="task_info.motor1_pid_info" />
        </el-form-item>

        <el-form-item label="Motor2 Enable" style="margin: 0">
          <el-switch v-model="task_info.motor2_enable"  />
        </el-form-item>
        <el-form-item label="Motor2 ID" style="margin: 0" v-show="task_info.motor2_enable">
          <el-radio-group v-model="task_info.motor2_id" :class="is_disable(2, task_info.motor2_id) ? 'conflict' : ''">
            <el-radio :label="1" v-show="is_show_id(1)">1</el-radio>
            <el-radio :label="2" v-show="is_show_id(2)">2</el-radio>
            <el-radio :label="3" v-show="is_show_id(3)">3</el-radio>
            <el-radio :label="4" v-show="is_show_id(4)" :style="is_show_id(1) && is_show_id(5) ? 'margin-bottom: 5px' : ''">4</el-radio>
            <br/>
            <el-radio :label="5" v-show="is_show_id(5)">5</el-radio>
            <el-radio :label="6" v-show="is_show_id(6)">6</el-radio>
            <el-radio :label="7" v-show="is_show_id(7)">7</el-radio>
            <el-radio :label="8" v-show="is_show_id(8)">8</el-radio>
          </el-radio-group>
          <el-tag size="small" type="danger" v-show="is_disable(2, task_info.motor2_id)">ID conflict</el-tag>
        </el-form-item>
        <el-form-item label="Motor2 Out Settings" style="margin: 0" v-show="task_info.motor2_enable">
          <pid :pid_info="task_info.motor2_pid_info" />
        </el-form-item>

        <el-form-item label="Motor3 Enable" style="margin: 0">
          <el-switch v-model="task_info.motor3_enable" />
        </el-form-item>
        <el-form-item label="Motor3 ID" style="margin: 0" v-show="task_info.motor3_enable">
          <el-radio-group v-model="task_info.motor3_id" :class="is_disable(3, task_info.motor3_id) ? 'conflict' : ''">
            <el-radio :label="1" v-show="is_show_id(1)">1</el-radio>
            <el-radio :label="2" v-show="is_show_id(2)">2</el-radio>
            <el-radio :label="3" v-show="is_show_id(3)">3</el-radio>
            <el-radio :label="4" v-show="is_show_id(4)" :style="is_show_id(1) && is_show_id(5) ? 'margin-bottom: 5px' : ''">4</el-radio>
            <br/>
            <el-radio :label="5" v-show="is_show_id(5)">5</el-radio>
            <el-radio :label="6" v-show="is_show_id(6)">6</el-radio>
            <el-radio :label="7" v-show="is_show_id(7)">7</el-radio>
            <el-radio :label="8" v-show="is_show_id(8)">8</el-radio>
          </el-radio-group>
          <el-tag size="small" type="danger" v-show="is_disable(3, task_info.motor3_id)">ID conflict</el-tag>
        </el-form-item>
        <el-form-item label="Motor3 Out Settings" style="margin: 0" v-show="task_info.motor3_enable">
          <pid :pid_info="task_info.motor3_pid_info" />
        </el-form-item>

        <el-form-item label="Motor4 Enable" style="margin: 0">
          <el-switch v-model="task_info.motor4_enable" :disabled="task_info.ctrl_id === '0x2ff' || task_info.ctrl_id === '0x2fe'"/>
          <span v-show="task_info.ctrl_id === '0x2ff' || task_info.ctrl_id === '0x2fe'" style="margin-left: 10px;position: absolute;top: 0.8px">This ctrl id only have 3 motors</span>
        </el-form-item>
        <el-form-item label="Motor4 ID" style="margin: 0" v-show="task_info.motor4_enable">
          <el-radio-group v-model="task_info.motor4_id" :class="is_disable(4, task_info.motor4_id) ? 'conflict' : ''">
            <el-radio :label="1" v-show="is_show_id(1)">1</el-radio>
            <el-radio :label="2" v-show="is_show_id(2)">2</el-radio>
            <el-radio :label="3" v-show="is_show_id(3)">3</el-radio>
            <el-radio :label="4" v-show="is_show_id(4)" :style="is_show_id(1) && is_show_id(5) ? 'margin-bottom: 5px' : ''">4</el-radio>
            <br/>
            <el-radio :label="5" v-show="is_show_id(5)">5</el-radio>
            <el-radio :label="6" v-show="is_show_id(6)">6</el-radio>
            <el-radio :label="7" v-show="is_show_id(7)">7</el-radio>
            <el-radio :label="8" v-show="is_show_id(8)">8</el-radio>
          </el-radio-group>
          <el-tag size="small" type="danger" v-show="is_disable(4, task_info.motor4_id)">ID conflict</el-tag>
        </el-form-item>
        <el-form-item label="Motor4 Out Settings" style="margin: 0" v-show="task_info.motor4_enable">
          <pid :pid_info="task_info.motor4_pid_info" />
        </el-form-item>
      </el-form>
</template>

<script>

import Pid from '@/components/cards/reusable/pid.vue'

export default {
  name: 'Djican',
  components: {
    Pid,
  },
  props: ['task_info'],
  data() {
    return {
      ctrl_id: '0x200'
    }
  },
  methods: {
    toHexStringWithPrefix(num) {
      let hexStr = Number(num).toString(16);
      return hexStr.startsWith('0x') ? hexStr : '0x' + (hexStr.length === 1 ? '0' + hexStr : hexStr);
    },
    change_can() {

    },
    change_ctrl_id() {
      if (this.task_info.ctrl_id === '0x2ff' || this.task_info.ctrl_id === '0x2fe') {
        this.task_info.motor4_enable = false;
        this.task_info.motor4_id = -10;
        this.task_info.motor1_id = 5;
        this.task_info.motor2_id = 6;
        this.task_info.motor3_id = 7;
      }
      if (this.task_info.ctrl_id === '0x200' || this.task_info.ctrl_id === '0x1ff' || this.task_info.ctrl_id === '0x1fe') {
        this.task_info.motor1_id = 1;
        this.task_info.motor2_id = 2;
        this.task_info.motor3_id = 3;
        this.task_info.motor4_id = 4;
      }
    },
    is_show_id(id) {
      switch (this.task_info.ctrl_id) {
        case '0x200': {
          return id >= 1 && id <= 4;
        }
        case '0x1ff': {
          return true;
        }
        case '0x2ff': {
          return id >= 5 && id <= 7;
        }
        case '0x1fe': {
          return id >= 1 && id <= 4;
        }
        case '0x2fe': {
          return id >= 5 && id <= 7;
        }
      }
    },
    is_disable(motorid, id) {
      switch (motorid) {
        case 1:{
          return (this.task_info.motor2_id === id && this.task_info.motor2_enable)||
              (this.task_info.motor3_id === id && this.task_info.motor3_enable)||
              (this.task_info.motor4_id === id && this.task_info.motor4_enable) ||
              (this.task_info.motor2_id === id+4 && this.task_info.motor2_enable)||
              (this.task_info.motor3_id === id+4 && this.task_info.motor3_enable)||
              (this.task_info.motor4_id === id+4 && this.task_info.motor4_enable) ||
              (this.task_info.motor2_id === id-4 && this.task_info.motor2_enable)||
              (this.task_info.motor3_id === id-4 && this.task_info.motor3_enable)||
              (this.task_info.motor4_id === id-4 && this.task_info.motor4_enable)
        }
        case 2:{
          return (this.task_info.motor1_id === id && this.task_info.motor1_enable)||
              (this.task_info.motor3_id === id && this.task_info.motor3_enable)||
              (this.task_info.motor4_id === id && this.task_info.motor4_enable) ||
              (this.task_info.motor1_id === id+4 && this.task_info.motor1_enable)||
              (this.task_info.motor3_id === id+4 && this.task_info.motor3_enable)||
              (this.task_info.motor4_id === id+4 && this.task_info.motor4_enable) ||
              (this.task_info.motor1_id === id-4 && this.task_info.motor1_enable)||
              (this.task_info.motor3_id === id-4 && this.task_info.motor3_enable)||
              (this.task_info.motor4_id === id-4 && this.task_info.motor4_enable)
        }
        case 3:{
          return (this.task_info.motor1_id === id && this.task_info.motor1_enable)||
              (this.task_info.motor2_id === id && this.task_info.motor2_enable)||
              (this.task_info.motor4_id === id && this.task_info.motor4_enable) ||
              (this.task_info.motor1_id === id+4 && this.task_info.motor1_enable)||
              (this.task_info.motor2_id === id+4 && this.task_info.motor2_enable)||
              (this.task_info.motor4_id === id+4 && this.task_info.motor4_enable) ||
              (this.task_info.motor1_id === id-4 && this.task_info.motor1_enable)||
              (this.task_info.motor2_id === id-4 && this.task_info.motor2_enable)||
              (this.task_info.motor4_id === id-4 && this.task_info.motor4_enable)
        }
        case 4:{
          return (this.task_info.motor1_id === id && this.task_info.motor1_enable)||
              (this.task_info.motor2_id === id && this.task_info.motor2_enable)||
              (this.task_info.motor3_id === id && this.task_info.motor3_enable) ||
              (this.task_info.motor1_id === id+4 && this.task_info.motor1_enable)||
              (this.task_info.motor2_id === id+4 && this.task_info.motor2_enable)||
              (this.task_info.motor3_id === id+4 && this.task_info.motor3_enable) ||
              (this.task_info.motor1_id === id-4 && this.task_info.motor1_enable)||
              (this.task_info.motor2_id === id-4 && this.task_info.motor2_enable)||
              (this.task_info.motor3_id === id-4 && this.task_info.motor3_enable)
        }
      }
    }
  }
}
</script>

<style>

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

.conflict .el-radio__input.is-checked .el-radio__inner {
  border-color: orangered!important;
  background: orangered!important;
}

.conflict .el-radio__input.is-checked+.el-radio__label {
  color: orangered!important;
}

.box-card {
  margin: 20px;
}
.el-form-item {
  border-bottom: 1px solid #eceef4;
  padding-top: 5px;
  padding-bottom: 5px;
}
.no_border > .el-form-item {
  border-bottom: 0!important;
  padding-top: 0!important;
  padding-bottom: 0!important;
}
.el-form-item__content > .el-tag {
  margin-right: 15px!important;
}

.el-radio__label > .el-tag {
  margin-right: 15px!important;
}
</style>