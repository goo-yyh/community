<template>
  <section class="mini-page order-detail-page">
    <template v-if="order">
      <section class="panel order-detail-head">
        <div class="detail-topline">
          <span>{{ order.id }} · {{ order.category }}</span>
          <van-tag type="primary">{{ getCurrentStep(order).title }}</van-tag>
        </div>
        <strong>{{ order.title }}</strong>
        <p>{{ order.content }}</p>
        <div class="detail-meta-grid">
          <span>
            <van-icon name="location-o" />
            {{ order.address }}
          </span>
          <span>
            <van-icon name="contact-o" />
            {{ order.contact }}
          </span>
        </div>
      </section>

      <section class="panel">
        <div class="panel-head">
          <strong>办理流程</strong>
          <van-tag plain type="primary">持续更新</van-tag>
        </div>
        <OrderTimeline :steps="getOrderSteps(order)" />
      </section>

      <van-button block round type="primary" :disabled="order.currentStep >= 4" @click="advance">
        {{ order.currentStep >= 4 ? '订单已完成' : '更新下一步状态' }}
      </van-button>
    </template>

    <section v-else class="panel empty-state">
      <van-icon name="warning-o" />
      <strong>没有找到订单</strong>
      <p>可能订单已被清空，请从订单列表重新进入。</p>
      <router-link to="/orders">返回订单列表</router-link>
    </section>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { showToast } from 'vant';
import OrderTimeline from '../components/OrderTimeline.vue';
import { useOrders } from '../stores/orders';

const route = useRoute();
const { findOrder, advanceOrder, getCurrentStep, getOrderSteps } = useOrders();
const order = computed(() => findOrder(route.params.id));

function advance() {
  const nextOrder = advanceOrder(route.params.id);
  if (nextOrder) {
    showToast(`已更新为：${getCurrentStep(nextOrder).title}`);
  }
}
</script>
