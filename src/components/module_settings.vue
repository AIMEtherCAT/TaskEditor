<template>
  <div>
    <el-divider><span>Add Module</span></el-divider>
    <div style="text-align: center">
      <!-- TODO: finish flight module -->
      <!--      <el-button @click="modules.push({type: 0x01, task: []})">Flight Module</el-button>-->
      <el-button @click="modules.push({type: 0x02, task: [], latency_topic: '', sn: ''})">Motor Module</el-button>
    </div>

    <el-divider>
      <span>
        Module List
      </span>
    </el-divider>
    <div>

      <el-table
          :data="modules"
          border
          style="width: 100%">

        <el-table-column type="expand">
          <template slot-scope="props">
            <!-- Flight Module -->
            <div v-if="props.row.type === 0x01">

            </div>

            <!-- Motor Module -->
            <div v-if="props.row.type === 0x02">
              <div class="text item" style="margin: 30px">
                <el-divider content-position="left">Add Task</el-divider>
                <el-button @click="props.row.task.push(deepClone(examples.lktech))">LkTech Motor</el-button>
                <el-button @click="props.row.task.push(deepClone(examples.djican))">DJI Motor</el-button>

                <el-divider content-position="left">Module Task Detail Configuration</el-divider>
                <el-table
                    :data="props.row.task"
                    border
                    style="width: 100%">

                  <el-table-column type="expand">
                    <template slot-scope="props2">
                      <!-- LkTech Motor -->
                      <div v-if="props2.row.type === 0x02">
                        <div class="text item" style="margin: 30px">
                          <el-form label-position="left" label-width="50%" size="small">

                            <el-divider content-position="left">Task Configuration</el-divider>
                            <el-form-item label="Control Period">
                              <el-input-number v-model="props2.row.control_period" :max="16384" :min="1"/>
                              ms
                            </el-form-item>

                            <el-divider content-position="left">CAN Configuration</el-divider>
                            <el-form-item label="CAN" style="margin: 0">
                              <el-radio-group v-model="props2.row.can_inst">
                                <el-radio :label="1">CAN1</el-radio>
                                <el-radio :label="2">CAN2</el-radio>
                              </el-radio-group>
                            </el-form-item>
                            <el-form-item label="CAN Baudrate" style="margin: 0">
                              <el-tag>1 Mbit/s</el-tag>
                            </el-form-item>
                            <el-form-item label="CAN Packet ID">
                              <el-input v-model="props2.row.can_packet_id">
                                <template slot="prefix">
                                  0x
                                </template>
                              </el-input>
                            </el-form-item>

                            <el-divider content-position="left">Motor Configuration</el-divider>
                            <el-alert
                                :closable="false"
                                style="margin-bottom: 20px;"
                                type="info"
                            >
                              <template slot="title">
                                More information about LkTech Motor Protocol can be cound at <a
                                  href="http://www.lkmotor.cn/Download.aspx?ClassID=47">http://www.lkmotor.cn/Download.aspx?ClassID=47</a>
                              </template>
                            </el-alert>
                            <el-form-item label="Control Type" style="margin: 0">
                              <el-radio-group v-model="props2.row.control_type">
                                <el-radio :label="0x01">Openloop Current</el-radio>
                                <el-radio :label="0x02">Torque</el-radio>
                                <el-radio :label="0x03">Speed With Torque Limit</el-radio>
                                <el-radio :label="0x04">Multi-Round Position</el-radio>
                                <el-radio :label="0x05">Multi-Round Position With Speed Limit</el-radio>
                                <el-radio :label="0x06">Single-Round Position</el-radio>
                                <el-radio :label="0x07">Single-Round Position With Speed Limit</el-radio>
                              </el-radio-group>
                            </el-form-item>

                            <el-divider content-position="left">ROS2 Configuration</el-divider>
                            <el-form-item label="Motor Feedback Publisher Topic Name" style="margin: 0">
                              <el-input v-model="props2.row.read_topic"
                                        :placeholder="`/ecat/sn${props.row.sn}/app${props2.$index+1}/read`"></el-input>
                            </el-form-item>
                            <el-form-item label="Motor Command Subscriber Topic Name" style="margin: 0">
                              <el-input v-model="props2.row.write_topic"
                                        :placeholder="`/ecat/sn${props.row.sn}/app${props2.$index+1}/write`"></el-input>
                            </el-form-item>

                            <el-divider content-position="left">ROS2 Message Definition - Motor Feedback</el-divider>
                            <el-form-item label="Message Type" style="margin: 0">
                              <el-tag>custom_msgs/ReadLkMotor</el-tag>
                            </el-form-item>
                            <el-divider/>
                            <el-form-item class="havetag" label="header" style="margin: 0">
                              <el-tag size="small">std_msgs/Header</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="current" style="margin: 0">
                              <el-tag size="small">int16</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="rpm" style="margin: 0">
                              <el-tag size="small">int16</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="encoder" style="margin: 0">
                              <el-tag size="small">uint16</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="temperature" style="margin: 0">
                              <el-tag size="small">uint8</el-tag>
                            </el-form-item>

                            <el-divider content-position="left">ROS2 Message Definition - Motor Control Command
                            </el-divider>
                            <div v-show="props2.row.control_type === 0x01">
                              <el-form-item label="Message Type" style="margin: 0">
                                <el-tag>custom_msgs/WriteLkMotorOpenloopControl</el-tag>
                              </el-form-item>
                              <el-divider/>
                              <el-form-item class="havetag" label="enable" style="margin: 0">
                                <el-tag size="small">uint8</el-tag>
                              </el-form-item>
                              <el-form-item class="havetag" label="torque" style="margin: 0">
                                <el-tag size="small">int16</el-tag>
                              </el-form-item>
                            </div>

                            <div v-show="props2.row.control_type === 0x02">
                              <el-form-item label="Message Type" style="margin: 0">
                                <el-tag>custom_msgs/WriteLkMotorTorqueControl</el-tag>
                              </el-form-item>
                              <el-divider/>
                              <el-form-item class="havetag" label="enable" style="margin: 0">
                                <el-tag size="small">uint8</el-tag>
                              </el-form-item>
                              <el-form-item class="havetag" label="torque" style="margin: 0">
                                <el-tag size="small">int16</el-tag>
                              </el-form-item>
                            </div>

                            <div v-show="props2.row.control_type === 0x03">
                              <el-form-item label="Message Type" style="margin: 0">
                                <el-tag>custom_msgs/WriteLkMotorSpeedControlWithTorqueLimit</el-tag>
                              </el-form-item>
                              <el-divider/>
                              <el-form-item class="havetag" label="enable" style="margin: 0">
                                <el-tag size="small">uint8</el-tag>
                              </el-form-item>
                              <el-form-item class="havetag" label="torque_limit" style="margin: 0">
                                <el-tag size="small">int16</el-tag>
                              </el-form-item>
                              <el-form-item class="havetag" label="speed" style="margin: 0">
                                <el-tag size="small">int32</el-tag>
                              </el-form-item>
                            </div>
                            <div v-show="props2.row.control_type === 0x04">
                              <el-form-item label="Message Type" style="margin: 0">
                                <el-tag>custom_msgs/WriteLkMotorMultiRoundPositionControl</el-tag>
                              </el-form-item>
                              <el-divider/>
                              <el-form-item class="havetag" label="enable" style="margin: 0">
                                <el-tag size="small">uint8</el-tag>
                              </el-form-item>
                              <el-form-item class="havetag" label="angle" style="margin: 0">
                                <el-tag size="small">int32</el-tag>
                              </el-form-item>
                            </div>
                            <div v-show="props2.row.control_type === 0x05">
                              <el-form-item label="Message Type" style="margin: 0">
                                <el-tag>custom_msgs/WriteLkMotorMultiRoundPositionControlWithSpeedLimit</el-tag>
                              </el-form-item>
                              <el-divider/>
                              <el-form-item class="havetag" label="enable" style="margin: 0">
                                <el-tag size="small">uint8</el-tag>
                              </el-form-item>
                              <el-form-item class="havetag" label="speed_limit" style="margin: 0">
                                <el-tag size="small">int16</el-tag>
                              </el-form-item>
                              <el-form-item class="havetag" label="angle" style="margin: 0">
                                <el-tag size="small">int32</el-tag>
                              </el-form-item>
                            </div>
                            <div v-show="props2.row.control_type === 0x06">
                              <el-form-item label="Message Type" style="margin: 0">
                                <el-tag>custom_msgs/WriteLkMotorSingleRoundPositionControl</el-tag>
                              </el-form-item>
                              <el-divider/>
                              <el-form-item class="havetag" label="enable" style="margin: 0">
                                <el-tag size="small">uint8</el-tag>
                              </el-form-item>
                              <el-form-item class="havetag" label="direction" style="margin: 0">
                                <el-tag size="small">uint8</el-tag>
                              </el-form-item>
                              <el-form-item class="havetag" label="angle" style="margin: 0">
                                <el-tag size="small">uint32</el-tag>
                              </el-form-item>
                            </div>
                            <div v-show="props2.row.control_type === 0x07">
                              <el-form-item label="Message Type" style="margin: 0">
                                <el-tag>custom_msgs/WriteLkMotorSingleRoundPositionControlWithSpeedLimit</el-tag>
                              </el-form-item>
                              <el-divider/>
                              <el-form-item class="havetag" label="enable" style="margin: 0">
                                <el-tag size="small">uint8</el-tag>
                              </el-form-item>
                              <el-form-item class="havetag" label="direction" style="margin: 0">
                                <el-tag size="small">uint8</el-tag>
                              </el-form-item>
                              <el-form-item class="havetag" label="speed_limit" style="margin: 0">
                                <el-tag size="small">int16</el-tag>
                              </el-form-item>
                              <el-form-item class="havetag" label="angle" style="margin: 0">
                                <el-tag size="small">uint32</el-tag>
                              </el-form-item>
                            </div>
                          </el-form>
                        </div>
                      </div>
                      <!-- DJI Motor -->
                      <div v-if="props2.row.type === 0x05">
                        <div class="text item" style="margin: 30px">
                          <el-form label-position="left" label-width="50%" size="small">

                            <el-divider content-position="left">Task Configuration</el-divider>
                            <el-form-item label="Control Period">
                              <el-input-number v-model="props2.row.control_period" :max="16384" :min="1"/>
                              ms
                            </el-form-item>

                            <el-divider content-position="left">CAN Configuration</el-divider>
                            <el-form-item label="CAN" style="margin: 0">
                              <el-radio-group v-model="props2.row.can_inst">
                                <el-radio :label="1">CAN1</el-radio>
                                <el-radio :label="2">CAN2</el-radio>
                              </el-radio-group>
                            </el-form-item>
                            <el-form-item label="CAN Baudrate" style="margin: 0">
                              <el-tag>1 Mbit/s</el-tag>
                            </el-form-item>

                            <el-form-item class="havetag" label="Motor Control Packet ID" style="margin: 0;">
                              <el-radio-group v-model="props2.row.can_packet_id">
                                <el-radio :label="0x200" style="padding-bottom: 5px">0x200
                                  <el-tag size="small" style="margin-left: 10px">3508 ID1-4</el-tag>
                                  <el-tag size="small">2006 ID1-4</el-tag>
                                </el-radio>
                                <br/>

                                <el-radio :label="0x1ff" style="padding-bottom: 5px">0x1ff
                                  <el-tag size="small" style="margin-left: 18px">3508 ID5-8</el-tag>
                                  <el-tag size="small">2006 ID5-8</el-tag>
                                  <el-tag size="small" type="success">6020 VOLT_CTRL ID1-4</el-tag>
                                </el-radio>
                                <br/>

                                <el-radio :label="0x2ff" style="padding-bottom: 5px">0x2ff
                                  <el-tag size="small" style="margin-left: 18px" type="success">6020 VOLT_CTRL ID5-7
                                  </el-tag>
                                </el-radio>
                                <br/>

                                <el-radio :label="0x1fe" style="padding-bottom: 5px">0x1fe
                                  <el-tag size="small" style="margin-left: 13.5px" type="warning">6020 CURR_CTRL ID1-4
                                  </el-tag>
                                </el-radio>
                                <br/>

                                <el-radio :label="0x2fe" style="padding-bottom: 5px">0x2fe
                                  <el-tag size="small" style="margin-left: 13.5px" type="warning">6020 CURR_CTRL ID5-7
                                  </el-tag>
                                </el-radio>
                              </el-radio-group>
                            </el-form-item>

                            <div v-for="i in [1, 2, 3, 4]" :key="i">
                              <el-form-item :label="`Motor${i} Enable`" style="margin: 0">
                                <el-switch v-model="props2.row.motor_enable[i-1]"/>
                              </el-form-item>
                              <el-form-item v-show="props2.row.motor_enable[i-1]" :label="`Motor${i} ID`"
                                            style="margin: 0">
                                <el-radio-group v-model="props2.row.motor_id[i-1]">
                                  <el-radio :label="1">1</el-radio>
                                  <el-radio :label="2">2</el-radio>
                                  <el-radio :label="3">3</el-radio>
                                  <el-radio :label="4">4</el-radio>
                                  <el-radio :label="5">5</el-radio>
                                  <el-radio :label="6">6</el-radio>
                                  <el-radio :label="7">7</el-radio>
                                  <el-radio :label="8">8</el-radio>
                                </el-radio-group>
                              </el-form-item>
                            </div>

                            <el-divider content-position="left">Motor Configuration</el-divider>
                            <el-alert
                                :closable="false"
                                style="margin-bottom: 20px;"
                                type="info"
                            >
                              <template slot="title">
                                More information about DJI Motor Protocol can be cound at <a
                                  href="https://www.robomaster.com/zh-CN/products/components/general">https://www.robomaster.com/zh-CN/products/components/general</a>
                              </template>
                            </el-alert>
                            <div v-for="i in [1, 2, 3, 4]" :key="i*5">
                              <el-form-item v-show="props2.row.motor_enable[i-1]" :label="`Motor${i} Control Type`"
                                            style="margin: 0">
                                <el-radio-group v-model="props2.row.motor_control_type[i-1]">
                                  <el-radio :label="0x01">Closeloop Current</el-radio>
                                  <el-radio :label="0x02">Speed</el-radio>
                                  <el-radio :label="0x03">Single-Round Position</el-radio>
                                </el-radio-group>
                              </el-form-item>

                              <el-form-item
                                  v-show="props2.row.motor_enable[i-1] && props2.row.motor_control_type[i-1] > 1"
                                  :label="`Motor${i} Speed PID Parameters`"
                                  style="margin: 0">
                                <el-form class="no_margin_bottom" label-position="left" label-width="50%" size="small">
                                  <el-form-item label="Speed PID Kp">
                                    <el-input v-model="props2.row.motor_speed_pid_param[i-1].kp"
                                              @input="(v)=>(props2.row.motor_speed_pid_param[i-1].kp=v.replace(/^\D*(\d*(?:\.\d{0,})?).*$/g, '$1'))"/>
                                  </el-form-item>

                                  <el-form-item label="Speed PID Ki">
                                    <el-input v-model="props2.row.motor_speed_pid_param[i-1].ki"
                                              @input="(v)=>(props2.row.motor_speed_pid_param[i-1].ki=v.replace(/^\D*(\d*(?:\.\d{0,})?).*$/g, '$1'))"/>
                                  </el-form-item>

                                  <el-form-item label="Speed PID Kd">
                                    <el-input v-model="props2.row.motor_speed_pid_param[i-1].kd"
                                              @input="(v)=>(props2.row.motor_speed_pid_param[i-1].kd=v.replace(/^\D*(\d*(?:\.\d{0,})?).*$/g, '$1'))"/>
                                  </el-form-item>

                                  <el-form-item label="Speed PID Max Out">
                                    <el-input v-model="props2.row.motor_speed_pid_param[i-1].maxout"
                                              @input="(v)=>(props2.row.motor_speed_pid_param[i-1].maxout=v.replace(/^\D*(\d*(?:\.\d{0,})?).*$/g, '$1'))"/>
                                  </el-form-item>
                                  <el-form-item label="Speed PID Max IOut">
                                    <el-input v-model="props2.row.motor_speed_pid_param[i-1].maxiout"
                                              @input="(v)=>(props2.row.motor_speed_pid_param[i-1].maxiout=v.replace(/^\D*(\d*(?:\.\d{0,})?).*$/g, '$1'))"/>
                                  </el-form-item>
                                </el-form>
                              </el-form-item>

                              <el-form-item
                                  v-show="props2.row.motor_enable[i-1] && props2.row.motor_control_type[i-1] > 2"
                                  :label="`Motor${i} Angle PID Parameters`"
                                  style="margin: 0">
                                <el-form class="no_margin_bottom" label-position="left" label-width="50%" size="small">
                                  <el-form-item label="Angle PID Kp">
                                    <el-input v-model="props2.row.motor_angle_pid_param[i-1].kp"
                                              @input="(v)=>(props2.row.motor_angle_pid_param[i-1].kp=v.replace(/^\D*(\d*(?:\.\d{0,})?).*$/g, '$1'))"/>
                                  </el-form-item>

                                  <el-form-item label="Angle PID Ki">
                                    <el-input v-model="props2.row.motor_angle_pid_param[i-1].ki"
                                              @input="(v)=>(props2.row.motor_angle_pid_param[i-1].ki=v.replace(/^\D*(\d*(?:\.\d{0,})?).*$/g, '$1'))"/>
                                  </el-form-item>

                                  <el-form-item label="Angle PID Kd">
                                    <el-input v-model="props2.row.motor_angle_pid_param[i-1].kd"
                                              @input="(v)=>(props2.row.motor_angle_pid_param[i-1].kd=v.replace(/^\D*(\d*(?:\.\d{0,})?).*$/g, '$1'))"/>
                                  </el-form-item>

                                  <el-form-item label="Angle PID Max Out">
                                    <el-input v-model="props2.row.motor_angle_pid_param[i-1].maxout"
                                              @input="(v)=>(props2.row.motor_angle_pid_param[i-1].maxout=v.replace(/^\D*(\d*(?:\.\d{0,})?).*$/g, '$1'))"/>
                                  </el-form-item>
                                  <el-form-item label="Angle PID Max IOut">
                                    <el-input v-model="props2.row.motor_angle_pid_param[i-1].maxiout"
                                              @input="(v)=>(props2.row.motor_angle_pid_param[i-1].maxiout=v.replace(/^\D*(\d*(?:\.\d{0,})?).*$/g, '$1'))"/>
                                  </el-form-item>
                                </el-form>
                              </el-form-item>
                            </div>

                            <el-divider content-position="left">ROS2 Configuration</el-divider>
                            <el-form-item label="Motor Feedback Publisher Topic Name" style="margin: 0">
                              <el-input v-model="props2.row.read_topic"
                                        :placeholder="`/ecat/sn${props.row.sn}/app${props2.$index+1}/read`"></el-input>
                            </el-form-item>
                            <el-form-item label="Motor Command Subscriber Topic Name" style="margin: 0">
                              <el-input v-model="props2.row.write_topic"
                                        :placeholder="`/ecat/sn${props.row.sn}/app${props2.$index+1}/write`"></el-input>
                            </el-form-item>

                            <el-divider content-position="left">ROS2 Message Definition - Motor Feedback</el-divider>

                            <el-form-item label="Message Type" style="margin: 0">
                              <el-tag>custom_msgs/ReadDJICAN</el-tag>
                            </el-form-item>
                            <el-divider/>
                            <el-form-item class="havetag" label="header" style="margin: 0">
                              <el-tag size="small">std_msgs/Header</el-tag>
                            </el-form-item>
                            <div v-for="i in [1, 2, 3, 4]" :key="i*6">
                              <el-form-item :label="`motor${i}_ecd`" class="havetag" style="margin: 0">
                                <el-tag size="small">uint16</el-tag>
                              </el-form-item>
                              <el-form-item :label="`motor${i}_rpm`" class="havetag" style="margin: 0">
                                <el-tag size="small">int16</el-tag>
                              </el-form-item>
                              <el-form-item :label="`motor${i}_current`" class="havetag" style="margin: 0">
                                <el-tag size="small">int16</el-tag>
                              </el-form-item>
                              <el-form-item :label="`motor${i}_temperature`" class="havetag" style="margin: 0">
                                <el-tag size="small">uint8</el-tag>
                              </el-form-item>
                            </div>

                            <el-divider content-position="left">ROS2 Message Definition - Motor Control Command
                            </el-divider>
                            <el-form-item label="Message Type" style="margin: 0">
                              <el-tag>custom_msgs/WriteDJICAN</el-tag>
                            </el-form-item>
                            <el-divider/>
                            <div v-for="i in [1, 2, 3, 4]" :key="i*7">
                              <el-form-item :label="`motor${i}_enable`" class="havetag" style="margin: 0">
                                <el-tag size="small">uint8</el-tag>
                              </el-form-item>
                              <el-form-item :label="`motor${i}_cmd`" class="havetag" style="margin: 0">
                                <el-tag size="small">int16</el-tag>
                              </el-form-item>
                            </div>

                          </el-form>
                        </div>
                      </div>
                    </template>
                  </el-table-column>

                  <el-table-column
                      label="Module Type">
                    <template slot-scope="props2">
                      {{ getAppTypeFriendlyName(props2.row.type) }}
                    </template>
                  </el-table-column>

                  <el-table-column
                      label="Operations">
                    <template slot-scope="props2">
                      <el-button @click="props.row.task.splice(props2.$index, 1)">Remove</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
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
            <el-input v-model="props.row.sn" @input="(val) => {props.row.latency_topic = `/ecat/sn${val}/latency`}"/>
          </template>
        </el-table-column>

        <el-table-column
            label="Module Latency Topic">
          <template slot-scope="props">
            <el-input v-model="props.row.latency_topic"/>
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

export default {
  name: 'NewTaskAssignment',
  components: {},
  data() {
    return {
      examples: {
        lktech: {
          type: 0x02,
          can_inst: 1,
          can_packet_id: 0x141,
          control_period: 1,
          control_type: 0x01,
          read_topic: '',
          write_topic: ''
        },
        djican: {
          type: 0x05,
          can_inst: 1,
          can_packet_id: 0x200,
          control_period: 1,
          motor_enable: [true, true, true, true],
          motor_id: [1, 2, 3, 4],
          motor_control_type: [0x01, 0x01, 0x01, 0x01],
          motor_speed_pid_param: [
            {
              kp: 1,
              ki: 0,
              kd: 0,
              maxout: 10000,
              maxiout: 1000
            },
            {
              kp: 1,
              ki: 0,
              kd: 0,
              maxout: 10000,
              maxiout: 1000
            },
            {
              kp: 1,
              ki: 0,
              kd: 0,
              maxout: 10000,
              maxiout: 1000
            },
            {
              kp: 1,
              ki: 0,
              kd: 0,
              maxout: 10000,
              maxiout: 1000
            }
          ],
          motor_angle_pid_param: [
            {
              kp: 1,
              ki: 0,
              kd: 0,
              maxout: 10000,
              maxiout: 1000
            },
            {
              kp: 1,
              ki: 0,
              kd: 0,
              maxout: 10000,
              maxiout: 1000
            },
            {
              kp: 1,
              ki: 0,
              kd: 0,
              maxout: 10000,
              maxiout: 1000
            },
            {
              kp: 1,
              ki: 0,
              kd: 0,
              maxout: 10000,
              maxiout: 1000
            }
          ],
          read_topic: '',
          write_topic: '',
        }
      },
      modules: [],
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
  methods: {
    getTypeFriendlyName(hexId) {
      switch (hexId) {
        case 0x01:
          return "Flight Module"
        case 0x02:
          return "Motor Module"
      }
    },
    getAppTypeFriendlyName(hexId) {
      switch (hexId) {
        case 0x01:
          return "DJI RC"
        case 0x02:
          return "LkTech Motor"
        case 0x03:
          return "Hipnuc IMU CAN Version"
        case 0x04:
          return "DSHOT600"
        case 0x05:
          return "DJI Motor"
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

<style>
.no_margin_bottom > .el-form-item {
  margin-bottom: 0 !important;
}
</style>