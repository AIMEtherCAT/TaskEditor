<template>
  <div>
    <el-divider><span>Add Module</span></el-divider>
    <div style="text-align: center">
      <el-button @click="modules.push(deepClone(examples.djican))">DJI CAN Module</el-button>
      <el-button @click="modules.push({type:0x99,sn:''})">DJIRC&IMU Module (Temporary)</el-button>
    </div>

    <el-divider><span>Module List</span></el-divider>
    <div>

      <el-table
          border
          :data="modules"
          style="width: 100%">

        <el-table-column type="expand">
          <template slot-scope="props">
            <div v-if="props.row.type === 0x01">
              <div class="text item" style="margin: 30px">
                <el-divider content-position="left">Module Arg</el-divider>
                <el-form size="small" label-width="50%" label-position="left">
                  <el-form-item label="Task Amount [1, 4]" style="margin: 0">
                    <el-input-number :min="1" :max="4" v-model="props.row.taskamount"/>
                  </el-form-item>
                </el-form>

                <div v-if="props.row.taskamount >= 1">
                  <el-divider content-position="left">Task 1 Configuration</el-divider>
                  <djican2 :task_info="props.row.task_1"/>
                </div>

                <div v-if="props.row.taskamount >= 2">
                  <el-divider content-position="left">Task 2 Configuration</el-divider>
                  <djican2 :task_info="props.row.task_2"/>
                </div>

                <div v-if="props.row.taskamount >= 3">
                  <el-divider content-position="left">Task 3 Configuration</el-divider>
                  <djican2 :task_info="props.row.task_3"/>
                </div>

                <div v-if="props.row.taskamount >= 4">
                  <el-divider content-position="left">Task 4 Configuration</el-divider>
                  <djican2 :task_info="props.row.task_4"/>
                </div>

                <el-divider content-position="left">Master -> Slave</el-divider>
                <djicanm2s :info="props.row.task_1" :name="'Task 1 '" v-if="props.row.taskamount >= 1"/>
                <djicanm2s :info="props.row.task_2" :name="'Task 2 '" v-if="props.row.taskamount >= 2"/>
                <djicanm2s :info="props.row.task_3" :name="'Task 3 '" v-if="props.row.taskamount >= 3"/>
                <djicanm2s :info="props.row.task_4" :name="'Task 4 '" v-if="props.row.taskamount >= 4"/>

                <el-divider content-position="left">Slave -> Master</el-divider>
                <djicans2m :info="props.row.task_1" :name="'Task 1 '" v-if="props.row.taskamount >= 1"/>
                <djicans2m :info="props.row.task_2" :name="'Task 2 '" v-if="props.row.taskamount >= 2"/>
                <djicans2m :info="props.row.task_3" :name="'Task 3 '" v-if="props.row.taskamount >= 3"/>
                <djicans2m :info="props.row.task_4" :name="'Task 4 '" v-if="props.row.taskamount >= 4"/>

              </div>
            </div>
            <rcimu v-if="props.row.type === 0x99"/>
          </template>
        </el-table-column>

        <el-table-column
            label="Module Type">
          <template slot-scope="props">
            {{ getTypeFriendlyName(props.row.type) }}
          </template>
        </el-table-column>

        <el-table-column
            label="Module SN">
          <template slot-scope="props">
            <el-input v-model="props.row.sn" />
          </template>
        </el-table-column>

        <el-table-column
            label="Operations">
          <template slot-scope="props">
            <el-button @click="removeModule(props.$index)">Remove</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
  </div>
</template>

<script>

import rcimu from '@/components/cards/djirc_imu.vue'
import djican2 from '@/components/cards/djican2.vue'
import Djicanm2s from "@/components/cards/Djicanm2s.vue";
import Djicans2m from "@/components/cards/Djicans2m.vue";

export default {
  name: 'NewTaskAssignment',
  components: {
    Djicanm2s,
    Djicans2m,
    rcimu,
    djican2
  },
  data() {
    return {
      examples: {
        djican: {
          type: 0x01,
          sn: "",
          taskamount: 1,

          task_1: {
            can_no: 'CAN1',

            motor1_enable: true,
            motor2_enable: false,
            motor3_enable: true,
            motor4_enable: true,

            ctrl_id: '0x200',

            motor1_id: 1,
            motor2_id: 2,
            motor3_id: 3,
            motor4_id: 4,

            motor1_pid_info: {
              out_type: '0x00',
              pid1_feed_type: '0x01',
              pid1_kp: 1,
              pid1_ki: 0,
              pid1_kd: 0,
              pid1_maxout: 16384,
              pid1_deadband: 0,
              pid1_maxiout: 3000,
              pid2_feed_type: '0x01',
              pid2_kp: 1,
              pid2_ki: 0,
              pid2_kd: 0,
              pid2_maxout: 16384,
              pid2_deadband: 0,
              pid2_maxiout: 3000,
            },
            motor2_pid_info: {
              out_type: '0x00',
              pid1_feed_type: '0x01',
              pid1_kp: 1,
              pid1_ki: 0,
              pid1_kd: 0,
              pid1_maxout: 16384,
              pid1_deadband: 0,
              pid1_maxiout: 3000,
              pid2_feed_type: '0x01',
              pid2_kp: 1,
              pid2_ki: 0,
              pid2_kd: 0,
              pid2_maxout: 16384,
              pid2_deadband: 0,
              pid2_maxiout: 3000,
            },
            motor3_pid_info: {
              out_type: '0x00',
              pid1_feed_type: '0x01',
              pid1_kp: 1,
              pid1_ki: 0,
              pid1_kd: 0,
              pid1_maxout: 16384,
              pid1_deadband: 0,
              pid1_maxiout: 3000,
              pid2_feed_type: '0x01',
              pid2_kp: 1,
              pid2_ki: 0,
              pid2_kd: 0,
              pid2_maxout: 16384,
              pid2_deadband: 0,
              pid2_maxiout: 3000,
            },
            motor4_pid_info: {
              out_type: '0x00',
              pid1_feed_type: '0x01',
              pid1_kp: 1,
              pid1_ki: 0,
              pid1_kd: 0,
              pid1_maxout: 16384,
              pid1_deadband: 0,
              pid1_maxiout: 3000,
              pid2_feed_type: '0x01',
              pid2_kp: 1,
              pid2_ki: 0,
              pid2_kd: 0,
              pid2_maxout: 16384,
              pid2_deadband: 0,
              pid2_maxiout: 3000,
            },

            ctrl_period: 1000
          },
          task_2: {
            can_no: 'CAN1',

            motor1_enable: true,
            motor2_enable: false,
            motor3_enable: true,
            motor4_enable: true,

            ctrl_id: '0x200',

            motor1_id: 1,
            motor2_id: 2,
            motor3_id: 3,
            motor4_id: 4,

            motor1_pid_info: {
              out_type: '0x00',
              pid1_feed_type: '0x01',
              pid1_kp: 1,
              pid1_ki: 0,
              pid1_kd: 0,
              pid1_maxout: 16384,
              pid1_deadband: 0,
              pid1_maxiout: 3000,
              pid2_feed_type: '0x01',
              pid2_kp: 1,
              pid2_ki: 0,
              pid2_kd: 0,
              pid2_maxout: 16384,
              pid2_deadband: 0,
              pid2_maxiout: 3000,
            },
            motor2_pid_info: {
              out_type: '0x00',
              pid1_feed_type: '0x01',
              pid1_kp: 1,
              pid1_ki: 0,
              pid1_kd: 0,
              pid1_maxout: 16384,
              pid1_deadband: 0,
              pid1_maxiout: 3000,
              pid2_feed_type: '0x01',
              pid2_kp: 1,
              pid2_ki: 0,
              pid2_kd: 0,
              pid2_maxout: 16384,
              pid2_deadband: 0,
              pid2_maxiout: 3000,
            },
            motor3_pid_info: {
              out_type: '0x00',
              pid1_feed_type: '0x01',
              pid1_kp: 1,
              pid1_ki: 0,
              pid1_kd: 0,
              pid1_maxout: 16384,
              pid1_deadband: 0,
              pid1_maxiout: 3000,
              pid2_feed_type: '0x01',
              pid2_kp: 1,
              pid2_ki: 0,
              pid2_kd: 0,
              pid2_maxout: 16384,
              pid2_deadband: 0,
              pid2_maxiout: 3000,
            },
            motor4_pid_info: {
              out_type: '0x00',
              pid1_feed_type: '0x01',
              pid1_kp: 1,
              pid1_ki: 0,
              pid1_kd: 0,
              pid1_maxout: 16384,
              pid1_deadband: 0,
              pid1_maxiout: 3000,
              pid2_feed_type: '0x01',
              pid2_kp: 1,
              pid2_ki: 0,
              pid2_kd: 0,
              pid2_maxout: 16384,
              pid2_deadband: 0,
              pid2_maxiout: 3000,
            },

            ctrl_period: 1000
          },
          task_3: {
            can_no: 'CAN1',

            motor1_enable: true,
            motor2_enable: false,
            motor3_enable: true,
            motor4_enable: true,

            ctrl_id: '0x200',

            motor1_id: 1,
            motor2_id: 2,
            motor3_id: 3,
            motor4_id: 4,

            motor1_pid_info: {
              out_type: '0x00',
              pid1_feed_type: '0x01',
              pid1_kp: 1,
              pid1_ki: 0,
              pid1_kd: 0,
              pid1_maxout: 16384,
              pid1_deadband: 0,
              pid1_maxiout: 3000,
              pid2_feed_type: '0x01',
              pid2_kp: 1,
              pid2_ki: 0,
              pid2_kd: 0,
              pid2_maxout: 16384,
              pid2_deadband: 0,
              pid2_maxiout: 3000,
            },
            motor2_pid_info: {
              out_type: '0x00',
              pid1_feed_type: '0x01',
              pid1_kp: 1,
              pid1_ki: 0,
              pid1_kd: 0,
              pid1_maxout: 16384,
              pid1_deadband: 0,
              pid1_maxiout: 3000,
              pid2_feed_type: '0x01',
              pid2_kp: 1,
              pid2_ki: 0,
              pid2_kd: 0,
              pid2_maxout: 16384,
              pid2_deadband: 0,
              pid2_maxiout: 3000,
            },
            motor3_pid_info: {
              out_type: '0x00',
              pid1_feed_type: '0x01',
              pid1_kp: 1,
              pid1_ki: 0,
              pid1_kd: 0,
              pid1_maxout: 16384,
              pid1_deadband: 0,
              pid1_maxiout: 3000,
              pid2_feed_type: '0x01',
              pid2_kp: 1,
              pid2_ki: 0,
              pid2_kd: 0,
              pid2_maxout: 16384,
              pid2_deadband: 0,
              pid2_maxiout: 3000,
            },
            motor4_pid_info: {
              out_type: '0x00',
              pid1_feed_type: '0x01',
              pid1_kp: 1,
              pid1_ki: 0,
              pid1_kd: 0,
              pid1_maxout: 16384,
              pid1_deadband: 0,
              pid1_maxiout: 3000,
              pid2_feed_type: '0x01',
              pid2_kp: 1,
              pid2_ki: 0,
              pid2_kd: 0,
              pid2_maxout: 16384,
              pid2_deadband: 0,
              pid2_maxiout: 3000,
            },

            ctrl_period: 1000
          },
          task_4: {
            can_no: 'CAN1',

            motor1_enable: true,
            motor2_enable: false,
            motor3_enable: true,
            motor4_enable: true,

            ctrl_id: '0x200',

            motor1_id: 1,
            motor2_id: 2,
            motor3_id: 3,
            motor4_id: 4,

            motor1_pid_info: {
              out_type: '0x00',
              pid1_feed_type: '0x01',
              pid1_kp: 1,
              pid1_ki: 0,
              pid1_kd: 0,
              pid1_maxout: 16384,
              pid1_deadband: 0,
              pid1_maxiout: 3000,
              pid2_feed_type: '0x01',
              pid2_kp: 1,
              pid2_ki: 0,
              pid2_kd: 0,
              pid2_maxout: 16384,
              pid2_deadband: 0,
              pid2_maxiout: 3000,
            },
            motor2_pid_info: {
              out_type: '0x00',
              pid1_feed_type: '0x01',
              pid1_kp: 1,
              pid1_ki: 0,
              pid1_kd: 0,
              pid1_maxout: 16384,
              pid1_deadband: 0,
              pid1_maxiout: 3000,
              pid2_feed_type: '0x01',
              pid2_kp: 1,
              pid2_ki: 0,
              pid2_kd: 0,
              pid2_maxout: 16384,
              pid2_deadband: 0,
              pid2_maxiout: 3000,
            },
            motor3_pid_info: {
              out_type: '0x00',
              pid1_feed_type: '0x01',
              pid1_kp: 1,
              pid1_ki: 0,
              pid1_kd: 0,
              pid1_maxout: 16384,
              pid1_deadband: 0,
              pid1_maxiout: 3000,
              pid2_feed_type: '0x01',
              pid2_kp: 1,
              pid2_ki: 0,
              pid2_kd: 0,
              pid2_maxout: 16384,
              pid2_deadband: 0,
              pid2_maxiout: 3000,
            },
            motor4_pid_info: {
              out_type: '0x00',
              pid1_feed_type: '0x01',
              pid1_kp: 1,
              pid1_ki: 0,
              pid1_kd: 0,
              pid1_maxout: 16384,
              pid1_deadband: 0,
              pid1_maxiout: 3000,
              pid2_feed_type: '0x01',
              pid2_kp: 1,
              pid2_ki: 0,
              pid2_kd: 0,
              pid2_maxout: 16384,
              pid2_deadband: 0,
              pid2_maxiout: 3000,
            },

            ctrl_period: 1000
          }
        }
      },
      modules: [
      ],
    }
  },
  watch: {
    modules: {
      handler(newVal) {
        localStorage.setItem("modules_info", JSON.stringify(newVal));
      },
      deep: true
    }
  },
  mounted() {
    if (localStorage.getItem("modules_info") != null) {
      this.modules = JSON.parse(localStorage.getItem("modules_info"));
    }
  },
  methods:{
    getTypeFriendlyName(hexId) {
      switch (hexId) {
        case 0x01:
          return "DJI CAN"
        case 0x99:
          return "DJI RC & IMU"
      }
    },
    removeModule(idx) {
      this.modules.splice(idx, 1);
    },
    deepClone(source) {
      if (!source && typeof source !== 'object') {
        throw new Error('error arguments', 'deepClone')
      }
      const targetObj = source.constructor === Array ? [] : {}
      Object.keys(source).forEach(keys => {
        if (source[keys] && typeof source[keys] === 'object') {
          targetObj[keys] = this.deepClone(source[keys])
        } else {
          targetObj[keys] = source[keys]
        }
      })
      return targetObj
    }
  }
}
</script>