<template>
  <van-config-provider :theme-vars="themeVars">
    <main class="page-shell">
      <section class="preview-stage" aria-label="未来小区综合服务小程序预览">
        <div class="preview-copy">
          <p class="eyebrow">未来小区综合服务</p>
          <h1>小区管家移动端</h1>
          <p class="lead">
            统一承接业主报修、老人呼叫、志愿服务、便民商户和技工派单，沉淀政府可看的民生服务台账。
          </p>
          <div class="stage-stats">
            <div v-for="item in platformStats" :key="item.label" class="stage-stat">
              <strong>{{ item.value }}</strong>
              <span>{{ item.label }}</span>
            </div>
          </div>
        </div>

        <div class="phone-frame" role="application" aria-label="小区管家小程序">
          <div class="device-bezel">
            <div class="status-bar">
              <span>14:30</span>
              <div class="status-icons">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>

            <header class="mini-nav">
              <button class="nav-icon" type="button" aria-label="返回">
                <van-icon name="arrow-left" />
              </button>
              <div>
                <strong>{{ currentTitle }}</strong>
                <span>新城市花园 · 李管家值班</span>
              </div>
              <div class="capsule" aria-label="小程序菜单">
                <span></span>
                <i></i>
              </div>
            </header>

            <div class="screen-body">
              <section v-if="activeTab === 0" class="tab-page home-page">
                <div class="home-hero">
                  <div>
                    <span class="hero-chip">民生服务闭环</span>
                    <h2>老人有需求，管家有响应</h2>
                    <p>热线、前台、小程序、4G 主机和上门探访统一进工单。</p>
                  </div>
                  <button class="hero-action" type="button" @click="triggerSos">
                    <van-icon name="phone-circle-o" />
                    呼叫
                  </button>
                </div>

                <van-notice-bar
                  left-icon="volume-o"
                  color="#0f4e9a"
                  background="#eaf4ff"
                  text="3 栋 602 王阿姨触发红色呼叫，物业巡逻已先行上门。"
                />

                <div class="metric-grid">
                  <div v-for="item in quickStats" :key="item.label" class="metric-tile">
                    <strong>{{ item.value }}</strong>
                    <span>{{ item.label }}</span>
                  </div>
                </div>

                <section class="panel">
                  <div class="panel-head">
                    <strong>服务入口</strong>
                    <van-tag plain type="primary">五类主体</van-tag>
                  </div>
                  <van-grid :border="false" :column-num="3" square>
                    <van-grid-item
                      v-for="entry in serviceEntries"
                      :key="entry.key"
                      :text="entry.label"
                      @click="selectScenario(entry.key)"
                    >
                      <template #icon>
                        <span class="entry-icon" :style="{ color: entry.color, background: entry.bg }">
                          <van-icon :name="entry.icon" />
                        </span>
                      </template>
                    </van-grid-item>
                  </van-grid>
                </section>

                <section class="panel scenario-panel">
                  <div class="panel-head">
                    <strong>{{ activeScenario.title }}</strong>
                    <van-tag :color="activeScenario.color">{{ activeScenario.risk }}</van-tag>
                  </div>
                  <p class="panel-copy">{{ activeScenario.desc }}</p>
                  <van-steps direction="vertical" :active="activeScenario.steps.length - 1">
                    <van-step v-for="step in activeScenario.steps" :key="step.title">
                      <strong>{{ step.title }}</strong>
                      <p>{{ step.detail }}</p>
                    </van-step>
                  </van-steps>
                </section>
              </section>

              <section v-else-if="activeTab === 1" class="tab-page">
                <van-search v-model="orderQuery" placeholder="搜索工单、楼栋、服务对象" shape="round" />

                <div class="order-list">
                  <button
                    v-for="order in filteredOrders"
                    :key="order.id"
                    class="order-card"
                    :class="{ active: order.id === selectedOrderId }"
                    type="button"
                    @click="openOrder(order)"
                  >
                    <div>
                      <span class="order-source">{{ order.source }}</span>
                      <strong>{{ order.title }}</strong>
                      <p>{{ order.desc }}</p>
                    </div>
                    <van-tag :color="order.color">{{ order.status }}</van-tag>
                  </button>
                </div>

                <section class="panel sticky-detail">
                  <div class="panel-head">
                    <strong>{{ selectedOrder.title }}</strong>
                    <van-tag :color="selectedOrder.color">{{ selectedOrder.status }}</van-tag>
                  </div>
                  <div class="detail-grid">
                    <div>
                      <span>响应</span>
                      <strong>{{ selectedOrder.response }}</strong>
                    </div>
                    <div>
                      <span>派单</span>
                      <strong>{{ selectedOrder.assignee }}</strong>
                    </div>
                  </div>
                  <van-steps direction="vertical" :active="selectedOrder.trace.length - 1">
                    <van-step v-for="item in selectedOrder.trace" :key="item.time">
                      <strong>{{ item.time }} · {{ item.title }}</strong>
                      <p>{{ item.text }}</p>
                    </van-step>
                  </van-steps>
                  <van-button block type="primary" round @click="assignOrder">
                    同步家属并回访
                  </van-button>
                </section>
              </section>

              <section v-else-if="activeTab === 2" class="tab-page">
                <section class="care-summary">
                  <div>
                    <span>重点老人</span>
                    <strong>500</strong>
                    <p>红 42 · 黄 156 · 绿 302</p>
                  </div>
                  <van-circle
                    v-model:current-rate="careRate"
                    :rate="92"
                    :speed="60"
                    :stroke-width="80"
                    color="#0f6bdc"
                    layer-color="#d7e9ff"
                    text="覆盖率"
                  />
                </section>

                <van-tabs v-model:active="activeCareLevel" color="#0f6bdc" shrink>
                  <van-tab name="red" title="红色">
                    <div class="elder-list">
                      <article v-for="elder in elderGroups.red" :key="elder.name" class="elder-card">
                        <div>
                          <strong>{{ elder.name }}</strong>
                          <span>{{ elder.address }}</span>
                          <p>{{ elder.note }}</p>
                        </div>
                        <van-button size="small" type="primary" plain round @click="callElder(elder.name)">
                          联系
                        </van-button>
                      </article>
                    </div>
                  </van-tab>
                  <van-tab name="yellow" title="黄色">
                    <div class="elder-list">
                      <article v-for="elder in elderGroups.yellow" :key="elder.name" class="elder-card">
                        <div>
                          <strong>{{ elder.name }}</strong>
                          <span>{{ elder.address }}</span>
                          <p>{{ elder.note }}</p>
                        </div>
                        <van-button size="small" type="primary" plain round @click="callElder(elder.name)">
                          联系
                        </van-button>
                      </article>
                    </div>
                  </van-tab>
                  <van-tab name="green" title="绿色">
                    <div class="elder-list">
                      <article v-for="elder in elderGroups.green" :key="elder.name" class="elder-card">
                        <div>
                          <strong>{{ elder.name }}</strong>
                          <span>{{ elder.address }}</span>
                          <p>{{ elder.note }}</p>
                        </div>
                        <van-button size="small" type="primary" plain round @click="callElder(elder.name)">
                          联系
                        </van-button>
                      </article>
                    </div>
                  </van-tab>
                </van-tabs>

                <section class="panel community-panel">
                  <div class="panel-head">
                    <strong>小区覆盖</strong>
                    <van-tag plain type="primary">街道视图</van-tag>
                  </div>
                  <div v-for="item in communities" :key="item.name" class="community-row">
                    <div>
                      <strong>{{ item.name }}</strong>
                      <span>{{ item.count }} 人 · {{ item.status }}</span>
                    </div>
                    <van-progress :percentage="item.cover" stroke-width="8" pivot-text="" color="#0f6bdc" />
                  </div>
                </section>
              </section>

              <section v-else-if="activeTab === 3" class="tab-page device-page">
                <section class="device-card">
                  <div class="device-screen">
                    <strong>{{ sosActive ? '红色呼叫中' : '4G智能主机' }}</strong>
                    <span>{{ sosActive ? '王阿姨 · 3 栋 602 · 已接通管家中心' : '王阿姨 · 3 栋 602 · 红色老人 · 设备在线' }}</span>
                  </div>
                  <img :src="deviceImage" alt="4G智能主机" />
                  <van-button block round type="danger" icon="phone-circle-o" @click="triggerSos">
                    一键呼叫小区管家
                  </van-button>
                </section>

                <section class="panel">
                  <div class="panel-head">
                    <strong>处置时间线</strong>
                    <van-tag :type="sosActive ? 'danger' : 'primary'">
                      {{ sosActive ? '处理中' : '待机' }}
                    </van-tag>
                  </div>
                  <van-steps direction="vertical" :active="deviceTimeline.length - 1">
                    <van-step v-for="item in deviceTimeline" :key="item.time">
                      <strong>{{ item.time }} · {{ item.title }}</strong>
                      <p>{{ item.text }}</p>
                    </van-step>
                  </van-steps>
                </section>

                <section class="panel tag-cloud">
                  <div class="panel-head">
                    <strong>设备能力</strong>
                    <van-tag plain type="primary">无手机可用</van-tag>
                  </div>
                  <span v-for="tag in deviceTags" :key="tag">{{ tag }}</span>
                </section>
              </section>

              <section v-else class="tab-page data-page">
                <section class="gov-hero">
                  <span>政府领导数据屏</span>
                  <strong>服务态势平稳</strong>
                  <p>今日更新 14:30 · 5 个小区全部在线</p>
                </section>

                <div class="data-grid">
                  <div v-for="item in govMetrics" :key="item.label" class="data-tile">
                    <strong>{{ item.value }}</strong>
                    <span>{{ item.label }}</span>
                    <em>{{ item.trend }}</em>
                  </div>
                </div>

                <section class="panel">
                  <div class="panel-head">
                    <strong>邻里互助结构</strong>
                    <van-tag plain type="primary">本月 318 单</van-tag>
                  </div>
                  <div v-for="item in volunteerMix" :key="item.label" class="mix-row">
                    <span>{{ item.label }}</span>
                    <van-progress :percentage="item.percent" stroke-width="8" pivot-text="" :color="item.color" />
                    <strong>{{ item.value }}</strong>
                  </div>
                </section>

                <section class="panel rewards-panel">
                  <div class="panel-head">
                    <strong>积分兑换</strong>
                    <van-tag plain type="primary">志愿激励</van-tag>
                  </div>
                  <div class="reward-list">
                    <button
                      v-for="item in rewards"
                      :key="item.name"
                      class="reward-item"
                      type="button"
                      @click="redeem(item.name)"
                    >
                      <van-icon :name="item.icon" />
                      <span>{{ item.name }}</span>
                      <strong>{{ item.points }} 分</strong>
                    </button>
                  </div>
                </section>
              </section>
            </div>

            <van-tabbar v-model="activeTab" active-color="#0f6bdc" inactive-color="#8091a8">
              <van-tabbar-item icon="wap-home-o">首页</van-tabbar-item>
              <van-tabbar-item icon="todo-list-o" :badge="3">工单</van-tabbar-item>
              <van-tabbar-item icon="friends-o">关怀</van-tabbar-item>
              <van-tabbar-item icon="phone-circle-o">设备</van-tabbar-item>
              <van-tabbar-item icon="bar-chart-o">数据</van-tabbar-item>
            </van-tabbar>
          </div>
        </div>
      </section>
    </main>
  </van-config-provider>
</template>

<script setup>
import { computed, ref } from 'vue';
import { showToast } from 'vant';
import deviceImage from '../demo/assets/4g-smart-host.png';

const activeTab = ref(0);
const selectedScenarioKey = ref('elder');
const selectedOrderId = ref('sos');
const orderQuery = ref('');
const sosActive = ref(false);
const activeCareLevel = ref('red');
const careRate = ref(92);

const themeVars = {
  primaryColor: '#0f6bdc',
  buttonPrimaryBackground: '#0f6bdc',
  buttonPrimaryBorderColor: '#0f6bdc',
  tabbarItemActiveColor: '#0f6bdc',
  radiusMd: '8px',
};

const titles = ['小区管家', '工单中心', '老人关怀', '智能主机', '治理数据'];

const platformStats = [
  { value: '5', label: '接入小区' },
  { value: '500', label: '老人建档' },
  { value: '318', label: '互助单数' },
];

const quickStats = [
  { value: '42', label: '今日工单' },
  { value: '12m', label: '紧急响应' },
  { value: '4.8', label: '满意度' },
  { value: '86', label: '志愿者' },
];

const serviceEntries = [
  { key: 'owner', label: '业主报修', icon: 'home-o', color: '#0f6bdc', bg: '#e8f2ff' },
  { key: 'elder', label: '老人呼叫', icon: 'phone-circle-o', color: '#d33f49', bg: '#ffecee' },
  { key: 'volunteer', label: '志愿探访', icon: 'friends-o', color: '#11875d', bg: '#e9f8f0' },
  { key: 'merchant', label: '便民助餐', icon: 'shop-o', color: '#b96f12', bg: '#fff5df' },
  { key: 'worker', label: '技工上门', icon: 'setting-o', color: '#6b5bd6', bg: '#f0edff' },
  { key: 'gov', label: '政府台账', icon: 'bar-chart-o', color: '#1362b7', bg: '#e8f2ff' },
];

const scenarios = {
  owner: {
    title: '普通业主：家中漏水报修',
    desc: '居民提交需求，管家派物业维修或认证技工上门。',
    risk: '普通工单',
    color: '#0f6bdc',
    steps: [
      { title: '业主发起', detail: '小程序、热线或物业前台提交漏水报修。' },
      { title: '管家识别', detail: '确认地址、紧急程度和是否影响邻居。' },
      { title: '派单上门', detail: '匹配物业维修或认证水电工，显示预计到达时间。' },
      { title: '评价回访', detail: '业主评价服务，管家复核并归档。' },
    ],
  },
  elder: {
    title: '老年人：不会用手机也能买药',
    desc: '老人按 4G 智能主机，管家代录工单并通知家属。',
    risk: '黄色工单',
    color: '#c98212',
    steps: [
      { title: '老人呼叫', detail: '按 4G 智能主机或拨打床头卡上的管家热线。' },
      { title: '自动弹屏', detail: '显示姓名、房号、风险等级、慢病备注和家属电话。' },
      { title: '安排代买', detail: '普通药品派志愿者代买，处方药联系药店或家属确认。' },
      { title: '完成同步', detail: '老人签收或语音确认，家属收到服务完成通知。' },
    ],
  },
  volunteer: {
    title: '志愿者：邻里探访助聊',
    desc: '管家发布探访任务，志愿者按权限接单，服务后获得积分。',
    risk: '公益互助',
    color: '#11875d',
    steps: [
      { title: '任务发布', detail: '管家按老人分级计划发布每周探访任务。' },
      { title: '志愿者接单', detail: '同楼栋志愿者报名，系统校验权限和时间。' },
      { title: '上门探访', detail: '记录老人状态和新增需求。' },
      { title: '积分激励', detail: '服务完成后发放积分/时间币。' },
    ],
  },
  merchant: {
    title: '便民商户：助餐与物资配送',
    desc: '合作餐饮商户供餐，保障老人和困难家庭日常需要。',
    risk: '便民服务',
    color: '#b96f12',
    steps: [
      { title: '需求汇总', detail: '管家统计老人助餐和居民团餐需求。' },
      { title: '助餐供给', detail: '商户提供套餐、配送时间和适老备注。' },
      { title: '配送确认', detail: '配送人员逐户确认，管家抽查质量。' },
      { title: '关怀归档', detail: '助餐、代购和物资配送进入民生服务台账。' },
    ],
  },
  worker: {
    title: '技工：适老化扶手安装',
    desc: '管家派认证技工评估、施工、验收、回访。',
    risk: '专业服务',
    color: '#6b5bd6',
    steps: [
      { title: '需求提出', detail: '老人、家属或管家提出卫生间扶手安装需求。' },
      { title: '上门评估', detail: '认证技工上门测量，给出方案和工期。' },
      { title: '验收留痕', detail: '安装完成后拍照、签字或家属远程确认。' },
      { title: '补贴归档', detail: '符合政策条件的进入补贴申报台账。' },
    ],
  },
  gov: {
    title: '政府视图：民生服务月报',
    desc: '服务过程、补贴使用、群众评价和回访结果统一留痕。',
    risk: '监管台账',
    color: '#1362b7',
    steps: [
      { title: '小区汇总', detail: '按红黄绿老人、工单类型、志愿力量形成统计。' },
      { title: '异常预警', detail: '超时、重复求助、投诉和低满意度自动归集。' },
      { title: '月度报表', detail: '街道、民政、物业和管家可按权限查看。' },
      { title: '复盘改进', detail: '形成服务短板和资源补位清单。' },
    ],
  },
};

const orders = [
  {
    id: 'sos',
    source: '4G智能主机',
    title: '3 栋 602 王阿姨红色呼叫',
    desc: '疑似摔倒，家属暂未接听。',
    status: '紧急上门',
    color: '#d33f49',
    response: '8 分钟',
    assignee: '物业巡逻 + 李管家',
    trace: [
      { time: '00:00', title: '设备触发', text: '4G 主机一键呼救，系统自动弹出老人档案。' },
      { time: '00:08', title: '管家接听', text: '确认房号、风险等级和既往健康备注。' },
      { time: '00:35', title: '家属同步', text: '发送电话和消息提醒，说明处置进展。' },
      { time: '03:10', title: '现场确认', text: '物业到达现场，管家协调是否拨打 120。' },
    ],
  },
  {
    id: 'repair',
    source: '业主小程序',
    title: '8 栋 1101 厨房漏水',
    desc: '已派认证水电工，预计 18 分钟到达。',
    status: '处理中',
    color: '#c98212',
    response: '18 分钟',
    assignee: '张师傅',
    trace: [
      { time: '14:02', title: '业主报修', text: '上传厨房漏水照片并填写门牌号。' },
      { time: '14:05', title: '智能派单', text: '按距离和技能匹配认证水电工。' },
      { time: '14:20', title: '上门维修', text: '预计 18 分钟内到达。' },
    ],
  },
  {
    id: 'visit',
    source: '探访计划',
    title: '黄爷爷每周探访',
    desc: '楼栋志愿者已接单，今日 16:30 上门。',
    status: '已接单',
    color: '#11875d',
    response: '今日完成',
    assignee: '楼栋志愿者陈阿姨',
    trace: [
      { time: '09:00', title: '任务发布', text: '管家按黄色老人探访计划发布任务。' },
      { time: '09:12', title: '志愿者接单', text: '同楼栋志愿者确认 16:30 上门。' },
      { time: '16:30', title: '待上门', text: '完成后记录老人状态和新增需求。' },
    ],
  },
  {
    id: 'meal',
    source: '便民商户',
    title: '独居老人午餐配送 28 份',
    desc: '餐饮商户已出餐，配送人员正在逐户确认。',
    status: '配送中',
    color: '#0f6bdc',
    response: '30 分钟',
    assignee: '安心助餐点',
    trace: [
      { time: '10:30', title: '助餐需求汇总', text: '管家确认今日助餐名单。' },
      { time: '11:10', title: '商户出餐', text: '餐品按适老备注打包。' },
      { time: '11:40', title: '逐户送达', text: '配送人员逐单确认，异常转管家。' },
    ],
  },
];

const elderGroups = {
  red: [
    { name: '王阿姨', address: '3 栋 602', note: '独居、慢病、已配置 4G 主机。' },
    { name: '陈伯伯', address: '5 栋 201', note: '近期重复求助，今日需电话回访。' },
  ],
  yellow: [
    { name: '黄爷爷', address: '2 栋 1203', note: '每周探访，志愿者今日上门。' },
    { name: '林阿姨', address: '7 栋 606', note: '助餐配送，子女异地。' },
  ],
  green: [
    { name: '赵奶奶', address: '1 栋 805', note: '日常关怀，参与积分兑换。' },
    { name: '吴爷爷', address: '4 栋 301', note: '低频服务，月度电话问候。' },
  ],
};

const communities = [
  { name: '新城市花园', count: 126, status: '运行平稳', cover: 96 },
  { name: '长新新村', count: 97, status: '需加强探访', cover: 82 },
  { name: '春晓花园', count: 99, status: '整体稳定', cover: 88 },
  { name: '都市明珠', count: 97, status: '助餐活跃', cover: 91 },
  { name: '星河小区', count: 81, status: '响应较快', cover: 93 },
];

const deviceTags = [
  '4G全网通',
  '一键呼救',
  '拉绳呼救',
  '双向通话',
  '语音提醒',
  '来电接听',
  '分组监护',
  '服务广播',
];

const govMetrics = [
  { value: '1286', label: '本月老人服务', trend: '+18%' },
  { value: '73', label: '活跃志愿者', trend: '85%' },
  { value: '96.5%', label: '互助完成率', trend: '稳定' },
  { value: '11', label: '重复求助老人', trend: '跟进' },
];

const volunteerMix = [
  { label: '探访助聊', value: 118, percent: 92, color: '#0f6bdc' },
  { label: '助餐送达', value: 82, percent: 70, color: '#11875d' },
  { label: '代买代办', value: 64, percent: 54, color: '#c98212' },
  { label: '陪同维修', value: 54, percent: 46, color: '#6b5bd6' },
];

const rewards = [
  { name: '米面油', points: 360, icon: 'gift-o' },
  { name: '理发券', points: 120, icon: 'coupon-o' },
  { name: '助洁券', points: 240, icon: 'records-o' },
  { name: '荣誉徽章', points: 80, icon: 'medal-o' },
];

const standbyTimeline = [
  { time: '当前', title: '设备在线', text: '老人可通过一键或拉绳直接联系小区管家。' },
  { time: '每日', title: '按键保平安', text: '未按约定确认时，系统提醒管家电话核实。' },
];

const emergencyTimeline = [
  { time: '00:00', title: '4G 主机触发', text: '王阿姨按下一键或拉绳呼救。' },
  { time: '00:08', title: '管家接听', text: '确认老人档案、房号、风险等级和家属电话。' },
  { time: '00:20', title: '物业先到', text: '通知门岗和巡逻人员前往 3 栋 602 核实情况。' },
  { time: '00:35', title: '家属同步', text: '向家属发送电话和消息提醒。' },
  { time: '08:30', title: '工单闭环', text: '处置结果进入老人档案，管家安排事后回访。' },
];

const currentTitle = computed(() => titles[activeTab.value]);
const activeScenario = computed(() => scenarios[selectedScenarioKey.value]);
const filteredOrders = computed(() => {
  const keyword = orderQuery.value.trim();
  if (!keyword) {
    return orders;
  }

  return orders.filter((order) => `${order.source}${order.title}${order.desc}`.includes(keyword));
});
const selectedOrder = computed(() => orders.find((order) => order.id === selectedOrderId.value) ?? orders[0]);
const deviceTimeline = computed(() => (sosActive.value ? emergencyTimeline : standbyTimeline));

function selectScenario(key) {
  selectedScenarioKey.value = key;
  showToast(`${scenarios[key].risk}已打开`);
}

function openOrder(order) {
  selectedOrderId.value = order.id;
}

function triggerSos() {
  sosActive.value = true;
  selectedOrderId.value = 'sos';
  activeTab.value = 3;
  showToast('红色呼叫工单已生成');
}

function assignOrder() {
  showToast('已同步家属并加入回访清单');
}

function callElder(name) {
  showToast(`正在联系${name}`);
}

function redeem(name) {
  showToast(`${name}兑换申请已记录`);
}
</script>
