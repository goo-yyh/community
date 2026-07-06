<template>
  <section class="mini-page publish-page">
    <div v-if="!createdOrder" class="page-title compact-title">
      <span>一键发布</span>
      <h1>把你的需求告诉小区管家</h1>
    </div>

    <section v-if="!createdOrder" class="panel publish-panel">
      <van-field
        v-model="content"
        autosize
        class="publish-input"
        maxlength="160"
        placeholder="例如：厨房漏水，需要明天上午安排师傅上门"
        rows="5"
        show-word-limit
        type="textarea"
      />
      <div class="publish-tools">
        <button class="voice-button" :class="{ listening }" type="button" @click="startVoiceInput">
          <van-icon :name="listening ? 'volume-o' : 'phone-circle-o'" />
          <span>{{ listening ? '正在聆听' : '语音输入' }}</span>
        </button>
        <button class="clear-button" type="button" @click="content = ''">清空</button>
      </div>
      <div class="quick-texts">
        <button
          v-for="item in quickTexts"
          :key="item"
          type="button"
          @click="content = item"
        >
          {{ item }}
        </button>
      </div>
      <van-button block round type="primary" @click="submitOrder">创建订单</van-button>
    </section>

    <section v-if="createdOrder" class="panel created-order-panel">
      <div class="panel-head">
        <strong>订单已创建</strong>
        <van-tag type="primary">{{ createdOrder.id }}</van-tag>
      </div>
      <div class="created-summary">
        <strong>{{ createdOrder.title }}</strong>
        <span>{{ createdOrder.category }} · {{ getCurrentStep(createdOrder).title }}</span>
        <p>{{ createdOrder.content }}</p>
      </div>
      <OrderTimeline :steps="getOrderSteps(createdOrder)" />
      <div class="created-actions">
        <router-link :to="`/orders/${createdOrder.id}`">查看订单详情</router-link>
        <router-link to="/orders">进入订单列表</router-link>
      </div>
    </section>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { showToast } from 'vant';
import OrderTimeline from '../components/OrderTimeline.vue';
import { useOrders } from '../stores/orders';

const route = useRoute();
const { createOrder, findOrder, getCurrentStep, getOrderSteps } = useOrders();
const content = ref('');
const inputSource = ref('文字发布');
const listening = ref(false);
const createdOrderId = ref('');
let recognition;

const quickTexts = [
  '厨房漏水，需要明天上午安排师傅上门。',
  '帮老人预约今天午餐配送，送到 3 栋 602。',
  '需要代买常用药，请管家联系我确认。',
];

const createdOrder = computed(() => (createdOrderId.value ? findOrder(createdOrderId.value) : undefined));

watch(
  () => route.query.text,
  (text) => {
    if (typeof text === 'string' && text) {
      content.value = text;
      inputSource.value = '文字发布';
    }
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  if (recognition) {
    recognition.stop();
  }
});

function startVoiceInput() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  inputSource.value = '语音发布';

  if (!SpeechRecognition) {
    content.value = content.value || '帮我预约明天上午水电师傅处理厨房漏水，地址 8 栋 1101。';
    showToast('当前环境无法调用麦克风，已转为文字输入');
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = 'zh-CN';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  listening.value = true;
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    content.value = transcript;
    showToast('已识别语音内容');
  };
  recognition.onerror = () => {
    showToast('语音识别失败，请改用文字输入');
  };
  recognition.onend = () => {
    listening.value = false;
  };
  recognition.start();
}

function submitOrder() {
  const normalized = content.value.trim();
  if (!normalized) {
    showToast('请先输入服务需求');
    return;
  }

  const order = createOrder(normalized, inputSource.value);
  createdOrderId.value = order.id;
  showToast('订单已创建，管家正在分配');
}
</script>
