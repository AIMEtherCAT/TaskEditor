<template>
  <div>
    <el-divider><span>Add Module</span></el-divider>
    <div style="text-align: center">
      <!-- TODO: finish flight module -->
      <!--      <el-button @click="modules.push({type: 0x01, task: []})">Flight Module</el-button>-->
      <!--      <el-button @click="modules.push({type: 0x02, task: [], latency_topic: '', sn: ''})" disabled>Motor Module</el-button>-->
      <el-button @click="modules.push({type: 0x03, task: [], latency_topic: '', sn: ''})">H750 Universal Module
      </el-button>
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
            <div>
              <div class="text item with_margin_bottom" style="margin: 30px">
                <el-divider content-position="left">Add Task</el-divider>
                <el-button @click="props.row.task.push(deepClone(examples.djirc))">DJI RC</el-button>
                <el-button @click="props.row.task.push(deepClone(examples.sbus_rc))">SBUS RC</el-button>

                <el-divider direction="vertical"/>
                <el-button @click="props.row.task.push(deepClone(examples.hipnucimu_can))">HIPNUC IMU(CAN)</el-button>
                <el-button @click="props.row.task.push(deepClone(examples.ms5837_30ba))">MS5837(30BA) *UNTESTED</el-button>
                <el-button @click="props.row.task.push(deepClone(examples.adc))">OnBoard ADC *UNTESTED</el-button>
                <el-button @click="props.row.task.push(deepClone(examples.can_pmu))">PMU(CAN) *UNTESTED</el-button>

                <el-divider direction="vertical"/>
                <el-button @click="props.row.task.push(deepClone(examples.dshot))">DSHOT600</el-button>
                <el-button @click="props.row.task.push(deepClone(examples.djican))">DJI Motor</el-button>
                <el-button @click="props.row.task.push(deepClone(examples.dm_motor))">DM Motor</el-button>

                <el-button @click="props.row.task.push(deepClone(examples.lktech))">LkTech Motor</el-button>
                <el-button @click="props.row.task.push(deepClone(examples.vanilla_pwm))">OnBoard PWM</el-button>
                <el-button @click="props.row.task.push(deepClone(examples.external_pwm))">ExternalBoard PWM</el-button>

                <el-divider content-position="left">Module Task Detail Configuration</el-divider>
                <el-table
                    :data="props.row.task"
                    border
                    style="width: 100%">

                  <el-table-column type="expand">
                    <template slot-scope="props2">

                      <!-- DJI RC -->
                      <div v-if="props2.row.type === 1">
                        <div class="text item" style="margin: 30px">
                          <el-form label-position="left" label-width="50%" size="small">
                            <el-divider content-position="left">ROS2 Configuration</el-divider>
                            <el-form-item label="DJI RC Publisher Topic Name" style="margin: 0">
                              <el-input v-model="props2.row.read_topic"
                                        :placeholder="`/ecat/sn${props.row.sn}/app${props2.$index+1}/read`"></el-input>
                            </el-form-item>

                            <el-divider content-position="left">ROS2 Message Definition - DJI RC</el-divider>
                            <el-form-item label="Message Type" style="margin: 0">
                              <el-tag>custom_msgs/ReadDJIRC</el-tag>
                            </el-form-item>
                            <el-divider/>
                            <el-form-item class="havetag" label="header" style="margin: 0">
                              <el-tag size="small">std_msgs/Header</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="online" style="margin: 0">
                              <el-tag size="small">uint8</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="left_x" style="margin: 0">
                              <el-tag size="small">float32</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="left_y" style="margin: 0">
                              <el-tag size="small">float32</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="right_x" style="margin: 0">
                              <el-tag size="small">float32</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="right_y" style="margin: 0">
                              <el-tag size="small">float32</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="dial" style="margin: 0">
                              <el-tag size="small">float32</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="left_switch" style="margin: 0">
                              <el-tag size="small">uint8</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="right_switch" style="margin: 0">
                              <el-tag size="small">uint8</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="w" style="margin: 0">
                              <el-tag size="small">uint8</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="s" style="margin: 0">
                              <el-tag size="small">uint8</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="a" style="margin: 0">
                              <el-tag size="small">uint8</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="d" style="margin: 0">
                              <el-tag size="small">uint8</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="q" style="margin: 0">
                              <el-tag size="small">uint8</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="e" style="margin: 0">
                              <el-tag size="small">uint8</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="r" style="margin: 0">
                              <el-tag size="small">uint8</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="f" style="margin: 0">
                              <el-tag size="small">uint8</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="g" style="margin: 0">
                              <el-tag size="small">uint8</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="z" style="margin: 0">
                              <el-tag size="small">uint8</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="x" style="margin: 0">
                              <el-tag size="small">uint8</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="c" style="margin: 0">
                              <el-tag size="small">uint8</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="v" style="margin: 0">
                              <el-tag size="small">uint8</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="b" style="margin: 0">
                              <el-tag size="small">uint8</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="shift" style="margin: 0">
                              <el-tag size="small">uint8</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="ctrl" style="margin: 0">
                              <el-tag size="small">uint8</el-tag>
                            </el-form-item>

                            <el-form-item class="havetag" label="mouse_x" style="margin: 0">
                              <el-tag size="small">int16</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="mouse_y" style="margin: 0">
                              <el-tag size="small">int16</el-tag>
                            </el-form-item>

                            <el-form-item class="havetag" label="mouse_left_clicked" style="margin: 0">
                              <el-tag size="small">uint8</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="mouse_right_clicked" style="margin: 0">
                              <el-tag size="small">uint8</el-tag>
                            </el-form-item>
                          </el-form>
                        </div>
                      </div>

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

                      <!-- HIPNUC IMU (CAN) -->
                      <div v-if="props2.row.type === 3">
                        <div class="text item" style="margin: 30px">
                          <el-form label-position="left" label-width="50%" size="small">
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
                            <el-form-item label="Packet1 ID">
                              <el-input v-model="props2.row.packet1_id">
                                <template slot="prefix">
                                  0x
                                </template>
                              </el-input>
                            </el-form-item>
                            <el-form-item label="Packet2 ID">
                              <el-input v-model="props2.row.packet2_id">
                                <template slot="prefix">
                                  0x
                                </template>
                              </el-input>
                            </el-form-item>
                            <el-form-item label="Packet3 ID">
                              <el-input v-model="props2.row.packet3_id">
                                <template slot="prefix">
                                  0x
                                </template>
                              </el-input>
                            </el-form-item>

                            <el-divider content-position="left">ROS2 Configuration</el-divider>
                            <el-form-item label="Frame name" style="margin: 0">
                              <el-input v-model="props2.row.frame_name"></el-input>
                            </el-form-item>
                            <el-form-item label="HIPNUC IMU Publisher Topic Name" style="margin: 0">
                              <el-input v-model="props2.row.read_topic"
                                        :placeholder="`/ecat/sn${props.row.sn}/app${props2.$index+1}/read`"></el-input>
                            </el-form-item>

                            <el-divider content-position="left">ROS2 Message Definition - HIPNUC IMU</el-divider>
                            <el-form-item label="Message Type" style="margin: 0">
                              <el-tag>sensor_msgs/Imu</el-tag>
                            </el-form-item>
                            <el-divider/>
                          </el-form>
                        </div>
                      </div>

                      <!-- DSHOT -->
                      <div v-if="props2.row.type === 4">
                        <div class="text item" style="margin: 30px">
                          <el-form label-position="left" label-width="50%" size="small">

                            <el-divider content-position="left">TIM Configuration</el-divider>
                            <el-form-item label="TIM" style="margin: 0">
                              <el-radio-group v-model="props2.row.dshot_id">
                                <el-radio :label="1">DSHOT1</el-radio>
                                <el-radio :label="2">DSHOT2</el-radio>
                              </el-radio-group>
                            </el-form-item>

                            <el-form-item label="Initial Value" style="margin: 0">
                              <el-input v-model="props2.row.init_value"
                                        @input="(v)=>(props2.row.init_value=v.replace(/^\D*(\d*(?:\.\d{0,})?).*$/g, '$1'))">
                              </el-input>
                            </el-form-item>

                            <el-divider content-position="left">ROS2 Configuration</el-divider>
                            <el-form-item label="Motor Command Subscriber Topic Name" style="margin: 0">
                              <el-input v-model="props2.row.write_topic"
                                        :placeholder="`/ecat/sn${props.row.sn}/app${props2.$index+1}/write`"></el-input>
                            </el-form-item>

                            <el-divider content-position="left">ROS2 Message Definition - Motor Control Command
                            </el-divider>
                            <el-form-item label="Message Type" style="margin: 0">
                              <el-tag>custom_msgs/WriteDSHOT</el-tag>
                            </el-form-item>
                            <el-divider/>
                            <el-form-item class="havetag" label="channel1" style="margin: 0">
                              <el-tag size="small">uint16</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="channel2" style="margin: 0">
                              <el-tag size="small">uint16</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="channel3" style="margin: 0">
                              <el-tag size="small">uint16</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="channel4" style="margin: 0">
                              <el-tag size="small">uint16</el-tag>
                            </el-form-item>
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
                                  <el-radio :label="0x01">Openloop Current</el-radio>
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

                      <!-- OnBoard PWM -->
                      <div v-if="props2.row.type === 6">
                        <div class="text item" style="margin: 30px">
                          <el-form label-position="left" label-width="50%" size="small">

                            <el-divider content-position="left">TIM Configuration</el-divider>
                            <el-form-item label="Port" style="margin: 0">
                              <el-radio-group v-model="props2.row.port_id">
                                <el-radio :label="1">Port1</el-radio>
                                <el-radio :label="2">Port2</el-radio>
                              </el-radio-group>
                            </el-form-item>

                            <el-form-item label="Period" style="margin: 0">
                              <el-input v-model="props2.row.expected_period"
                                        @input="(v)=>(props2.row.expected_period=v.replace(/^\D*(\d*(?:\.\d{0,})?).*$/g, '$1'))">
                                <template slot="append">
                                  us
                                </template>
                              </el-input>
                            </el-form-item>

                            <el-form-item label="Initial Value" style="margin: 0">
                              <el-input v-model="props2.row.init_value"
                                        @input="(v)=>(props2.row.init_value=v.replace(/^\D*(\d*(?:\.\d{0,})?).*$/g, '$1'))">
                                <template slot="append">
                                  us
                                </template>
                              </el-input>
                            </el-form-item>

                            <el-divider content-position="left">ROS2 Configuration</el-divider>
                            <el-form-item label="Motor Command Subscriber Topic Name" style="margin: 0">
                              <el-input v-model="props2.row.write_topic"
                                        :placeholder="`/ecat/sn${props.row.sn}/app${props2.$index+1}/write`"></el-input>
                            </el-form-item>

                            <el-divider content-position="left">ROS2 Message Definition - Motor Control Command
                            </el-divider>
                            <el-form-item label="Message Type" style="margin: 0">
                              <el-tag>custom_msgs/WriteVanillaPWM</el-tag>
                            </el-form-item>
                            <el-divider/>
                            <el-form-item class="havetag" label="channel1" style="margin: 0">
                              <el-tag size="small">uint16</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="channel2" style="margin: 0">
                              <el-tag size="small">uint16</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="channel3" style="margin: 0">
                              <el-tag size="small">uint16</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="channel4" style="margin: 0">
                              <el-tag size="small">uint16</el-tag>
                            </el-form-item>
                          </el-form>
                        </div>
                      </div>

                      <!-- ExternalBoard PWM -->
                      <div v-if="props2.row.type === 7">
                        <div class="text item" style="margin: 30px">
                          <el-form label-position="left" label-width="50%" size="small">

                            <el-divider content-position="left">Task Configuration</el-divider>
                            <el-form-item label="UART" style="margin: 0">
                              <el-radio-group v-model="props2.row.uart_id">
                                <el-radio :label="1">UART1</el-radio>
                                <el-radio :label="4">UART4</el-radio>
                              </el-radio-group>
                            </el-form-item>

                            <el-form-item label="Enabled Channel Count" style="margin: 0">
                              <el-input-number v-model="props2.row.enabled_channel_count" :min="1" :max="16"/>
                            </el-form-item>

                            <el-form-item label="Period" style="margin: 0">
                              <el-input v-model="props2.row.expected_period"
                                        @input="(v)=>(props2.row.expected_period=v.replace(/^\D*(\d*(?:\.\d{0,})?).*$/g, '$1'))">
                                <template slot="append">
                                  us
                                </template>
                              </el-input>
                            </el-form-item>

                            <el-form-item label="Initial Value" style="margin: 0">
                              <el-input v-model="props2.row.init_value"
                                        @input="(v)=>(props2.row.init_value=v.replace(/^\D*(\d*(?:\.\d{0,})?).*$/g, '$1'))">
                                <template slot="append">
                                  us
                                </template>
                              </el-input>
                            </el-form-item>

                            <el-divider content-position="left">ROS2 Configuration</el-divider>
                            <el-form-item label="Motor Command Subscriber Topic Name" style="margin: 0">
                              <el-input v-model="props2.row.write_topic"
                                        :placeholder="`/ecat/sn${props.row.sn}/app${props2.$index+1}/write`"></el-input>
                            </el-form-item>

                            <el-divider content-position="left">ROS2 Message Definition - Motor Control Command
                            </el-divider>
                            <el-form-item label="Message Type" style="margin: 0">
                              <el-tag>custom_msgs/WriteExternalPWM</el-tag>
                            </el-form-item>
                            <el-divider/>
                            <el-form-item class="havetag" label="channels" style="margin: 0">
                              <el-tag size="small">uint16[]</el-tag>
                            </el-form-item>
                          </el-form>
                        </div>
                      </div>

                      <!-- MS5837(30BA) -->
                      <div v-if="props2.row.type === 8">
                        <div class="text item" style="margin: 30px">
                          <el-form label-position="left" label-width="50%" size="small">

                            <el-divider content-position="left">Task Configuration</el-divider>
                            <el-form-item label="I2C" style="margin: 0">
                              <el-radio-group v-model="props2.row.i2c_id">
                                <el-radio :label="3">I2C3</el-radio>
                              </el-radio-group>
                            </el-form-item>

                            <el-form-item label="OSR ID" style="margin: 0">
                              <el-input-number v-model="props2.row.osr_id" :min="1" :max="6"/>
                            </el-form-item>

                            <el-divider content-position="left">ROS2 Configuration</el-divider>
                            <el-form-item label="MS5837(30BA) Publisher Topic Name" style="margin: 0">
                              <el-input v-model="props2.row.read_topic"
                                        :placeholder="`/ecat/sn${props.row.sn}/app${props2.$index+1}/read`"></el-input>
                            </el-form-item>

                            <el-divider content-position="left">ROS2 Message Definition - MS5837(30BA)</el-divider>
                            <el-form-item label="Message Type" style="margin: 0">
                              <el-tag>custom_msgs/ReadMS5837BA30</el-tag>
                            </el-form-item>
                            <el-divider/>
                            <el-form-item class="havetag" label="header" style="margin: 0">
                              <el-tag size="small">std_msgs/Header</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="temperature" style="margin: 0">
                              <el-tag size="small">float64</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="pressure" style="margin: 0">
                              <el-tag size="small">float64</el-tag>
                            </el-form-item>
                          </el-form>
                        </div>
                      </div>

                      <!-- OnBoard ADC -->
                      <div v-if="props2.row.type === 9">
                        <div class="text item" style="margin: 30px">
                          <el-form label-position="left" label-width="50%" size="small">

                            <el-divider content-position="left">ADC Configuration</el-divider>

                            <el-form-item label="Coefficient for channel 1" style="margin: 0">
                              <el-input v-model="props2.row.coefficient0"
                                        @input="(v)=>(props2.row.coefficient0=v.replace(/^\D*(\d*(?:\.\d{0,})?).*$/g, '$1'))"/>
                            </el-form-item>

                            <el-form-item label="Coefficient for channel 2" style="margin: 0">
                              <el-input v-model="props2.row.coefficient1"
                                        @input="(v)=>(props2.row.coefficient1=v.replace(/^\D*(\d*(?:\.\d{0,})?).*$/g, '$1'))"/>
                            </el-form-item>

                            <el-divider content-position="left">ROS2 Configuration</el-divider>
                            <el-form-item label="Onboard ADC Publisher Topic Name" style="margin: 0">
                              <el-input v-model="props2.row.read_topic"
                                        :placeholder="`/ecat/sn${props.row.sn}/app${props2.$index+1}/read`"></el-input>
                            </el-form-item>

                            <el-divider content-position="left">ROS2 Message Definition - Onboard ADC
                            </el-divider>
                            <el-form-item label="Message Type" style="margin: 0">
                              <el-tag>custom_msgs/ReadADC</el-tag>
                            </el-form-item>
                            <el-divider/>
                            <el-form-item class="havetag" label="header" style="margin: 0">
                              <el-tag size="small">std_msgs/Header</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="channel1" style="margin: 0">
                              <el-tag size="small">float32</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="channel2" style="margin: 0">
                              <el-tag size="small">float32</el-tag>
                            </el-form-item>
                          </el-form>
                        </div>
                      </div>

                      <!-- PMU (CAN) -->
                      <div v-if="props2.row.type === 10">
                        <div class="text item" style="margin: 30px">
                          <el-form label-position="left" label-width="50%" size="small">
                            <el-divider content-position="left">ROS2 Configuration</el-divider>
                            <el-form-item label="PMU(CAN) Publisher Topic Name" style="margin: 0">
                              <el-input v-model="props2.row.read_topic"
                                        :placeholder="`/ecat/sn${props.row.sn}/app${props2.$index+1}/read`"></el-input>
                            </el-form-item>

                            <el-divider content-position="left">ROS2 Message Definition - PMU</el-divider>
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
                          </el-form>
                        </div>
                      </div>

                      <!-- SBUS RC -->
                      <div v-if="props2.row.type === 11">
                        <div class="text item" style="margin: 30px">
                          <el-form label-position="left" label-width="50%" size="small">
                            <el-divider content-position="left">ROS2 Configuration</el-divider>
                            <el-form-item label="SBUS RC Publisher Topic Name" style="margin: 0">
                              <el-input v-model="props2.row.read_topic"
                                        :placeholder="`/ecat/sn${props.row.sn}/app${props2.$index+1}/read`"></el-input>
                            </el-form-item>

                            <el-divider content-position="left">ROS2 Message Definition - SBUS RC</el-divider>
                            <el-form-item label="Message Type" style="margin: 0">
                              <el-tag>custom_msgs/ReadSBUSRC</el-tag>
                            </el-form-item>
                            <el-divider/>
                            <el-form-item class="havetag" label="header" style="margin: 0">
                              <el-tag size="small">std_msgs/Header</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="online" style="margin: 0">
                              <el-tag size="small">uint8</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="channels" style="margin: 0">
                              <el-tag size="small">uint16[16]</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="ch17" style="margin: 0">
                              <el-tag size="small">uint8</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="ch18" style="margin: 0">
                              <el-tag size="small">uint8</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="fail_safe" style="margin: 0">
                              <el-tag size="small">uint8</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="frame_lost" style="margin: 0">
                              <el-tag size="small">uint8</el-tag>
                            </el-form-item>
                          </el-form>
                        </div>
                      </div>

                      <!-- DM MOTOR -->
                      <div v-if="props2.row.type === 12">
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
                            <el-form-item label="CAN ID">
                              <el-input v-model="props2.row.can_id">
                                <template slot="prefix">
                                  0x
                                </template>
                              </el-input>
                            </el-form-item>
                            <el-form-item label="Master ID">
                              <el-input v-model="props2.row.master_id">
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
                                More information about DM Motor Protocol can be cound at <a
                                  href="https://gl1po2nscb.feishu.cn/wiki/MZ32w0qnnizTpOkNvAZcJ9SlnXb">https://gl1po2nscb.feishu.cn/wiki/MZ32w0qnnizTpOkNvAZcJ9SlnXb</a>
                              </template>
                            </el-alert>
                            <el-form-item label="Control Type" style="margin: 0">
                              <el-radio-group v-model="props2.row.control_type">
                                <el-radio :label="0x01">MIT</el-radio>
                                <el-radio :label="0x02">Position With Speed Limit</el-radio>
                                <el-radio :label="0x03">Speed</el-radio>
                              </el-radio-group>
                            </el-form-item>
                            <el-form-item label="P Max">
                              <el-input v-model="props2.row.pmax"/>
                            </el-form-item>
                            <el-form-item label="V Max">
                              <el-input v-model="props2.row.vmax"/>
                            </el-form-item>
                            <el-form-item label="T Max">
                              <el-input v-model="props2.row.tmax"/>
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
                              <el-tag>custom_msgs/ReadDmMotor</el-tag>
                            </el-form-item>
                            <el-divider/>
                            <el-form-item class="havetag" label="header" style="margin: 0">
                              <el-tag size="small">std_msgs/Header</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="disabled" style="margin: 0">
                              <el-tag size="small">uint8</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="enabled" style="margin: 0">
                              <el-tag size="small">uint8</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="overvoltage" style="margin: 0">
                              <el-tag size="small">uint8</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="overcurrent" style="margin: 0">
                              <el-tag size="small">uint8</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="mos_overtemperature" style="margin: 0">
                              <el-tag size="small">uint8</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="rotor_overtemperature" style="margin: 0">
                              <el-tag size="small">uint8</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="communication_lost" style="margin: 0">
                              <el-tag size="small">uint8</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="overload" style="margin: 0">
                              <el-tag size="small">uint8</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="ecd" style="margin: 0">
                              <el-tag size="small">uint16</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="velocity" style="margin: 0">
                              <el-tag size="small">float32</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="torque" style="margin: 0">
                              <el-tag size="small">float32</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="mos_temperature" style="margin: 0">
                              <el-tag size="small">uint8</el-tag>
                            </el-form-item>
                            <el-form-item class="havetag" label="rotor_temperature" style="margin: 0">
                              <el-tag size="small">uint8</el-tag>
                            </el-form-item>

                            <el-divider content-position="left">ROS2 Message Definition - Motor Control Command
                            </el-divider>
                            <div v-show="props2.row.control_type === 0x01">
                              <el-form-item label="Message Type" style="margin: 0">
                                <el-tag>custom_msgs/WriteDmMotorMITControl</el-tag>
                              </el-form-item>
                              <el-divider/>
                              <el-form-item class="havetag" label="enable" style="margin: 0">
                                <el-tag size="small">uint8</el-tag>
                              </el-form-item>
                              <el-form-item class="havetag" label="p_des" style="margin: 0">
                                <el-tag size="small">float32</el-tag>
                              </el-form-item>
                              <el-form-item class="havetag" label="v_des" style="margin: 0">
                                <el-tag size="small">float32</el-tag>
                              </el-form-item>
                              <el-form-item class="havetag" label="kp" style="margin: 0">
                                <el-tag size="small">float32</el-tag>
                              </el-form-item>
                              <el-form-item class="havetag" label="kd" style="margin: 0">
                                <el-tag size="small">float32</el-tag>
                              </el-form-item>
                              <el-form-item class="havetag" label="torque" style="margin: 0">
                                <el-tag size="small">float32</el-tag>
                              </el-form-item>
                            </div>

                            <div v-show="props2.row.control_type === 0x02">
                              <el-form-item label="Message Type" style="margin: 0">
                                <el-tag>custom_msgs/WriteDmMotorPositionControlWithSpeedLimit</el-tag>
                              </el-form-item>
                              <el-divider/>
                              <el-form-item class="havetag" label="enable" style="margin: 0">
                                <el-tag size="small">uint8</el-tag>
                              </el-form-item>
                              <el-form-item class="havetag" label="position" style="margin: 0">
                                <el-tag size="small">float32</el-tag>
                              </el-form-item>
                              <el-form-item class="havetag" label="speed" style="margin: 0">
                                <el-tag size="small">float32</el-tag>
                              </el-form-item>
                            </div>

                            <div v-show="props2.row.control_type === 0x03">
                              <el-form-item label="Message Type" style="margin: 0">
                                <el-tag>custom_msgs/WriteDmMotorSpeedControl</el-tag>
                              </el-form-item>
                              <el-divider/>
                              <el-form-item class="havetag" label="enable" style="margin: 0">
                                <el-tag size="small">uint8</el-tag>
                              </el-form-item>
                              <el-form-item class="havetag" label="speed" style="margin: 0">
                                <el-tag size="small">float32</el-tag>
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
        djirc: {
          type: 0x01,
          read_topic: ''
        },
        sbus_rc: {
          type: 11,
          read_topic: ''
        },
        lktech: {
          type: 0x02,
          can_inst: 1,
          can_packet_id: 0x141,
          control_period: 1,
          control_type: 0x01,
          read_topic: '',
          write_topic: ''
        },
        hipnucimu_can: {
          type: 0x03,
          read_topic: '',
          frame_name: 'imu_link',
          can_inst: 1,
          packet1_id: 0x01,
          packet2_id: 0x02,
          packet3_id: 0x03,
        },
        dshot: {
          type: 0x04,
          dshot_id: 1,
          write_topic: '',
          read_topic: '',
          init_value: 0
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
        },
        vanilla_pwm: {
          type: 6,
          port_id: 1,
          expected_period: 0,
          init_value: 0,
          write_topic: '',
          read_topic: ''
        },
        external_pwm: {
          type: 7,
          uart_id: 1,
          expected_period: 0,
          enabled_channel_count: 1,
          init_value: 0,
          write_topic: '',
          read_topic: ''
        },
        ms5837_30ba: {
          type: 8,
          i2c_id: 3,
          osr_id: 1,
          read_topic: ''
        },
        adc: {
          type: 9,
          coefficient0: 0,
          coefficient1: 0,
          read_topic: ''
        },
        can_pmu: {
          type: 10,
          read_topic: ''
        },
        dm_motor: {
          type: 12,
          can_inst: 1,
          can_id: '01',
          master_id: '11',
          control_period: 1,
          control_type: 1,
          pmax: 12.5,
          vmax: 30,
          tmax: 10
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
        case 0x03:
          return "H750 Universal Module"
      }
    },
    getAppTypeFriendlyName(hexId) {
      switch (hexId) {
        case 0x01:
          return "DJI RC"
        case 0x02:
          return "LkTech Motor"
        case 0x03:
          return "HIPNUC IMU(CAN)"
        case 0x04:
          return "DSHOT600"
        case 0x05:
          return "DJI Motor"
        case 6:
          return "OnBoard PWM"
        case 7:
          return "External PWM"
        case 8:
          return "MS5837(30BA)"
        case 9:
          return "ADC"
        case 10:
          return "PMU(CAN)"
        case 11:
          return "SBUS RC"
        case 12:
          return "DM Motor"
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

.with_margin_bottom > .el-button {
  margin-bottom: 10px;
}
</style>
