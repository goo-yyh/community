<template>
  <section class="mini-page">
    <van-search v-model="query" placeholder="搜索工单、楼栋、服务对象" shape="round" />

    <div class="metric-grid">
      <div v-for="item in workbenchMetrics" :key="item.label" class="metric-tile">
        <strong>{{ item.value }}</strong>
        <span>{{ item.label }}</span>
      </div>
    </div>

    <div class="order-list">
      <button
        v-for="order in filteredOrders"
        :key="order.id"
        class="order-card"
        :class="{ active: order.id === selectedOrderId }"
        type="button"
        @click="selectedOrderId = order.id"
      >
        <div>
          <span class="order-source">{{ order.source }}</span>
          <strong>{{ order.title }}</strong>
          <p>{{ order.desc }}</p>
        </div>
        <van-tag :color="order.color">{{ order.status }}</van-tag>
      </button>
    </div>

    <section class="panel">
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
        <van-step v-for="item in selectedOrder.trace" :key="item[0]">
          <strong>{{ item[0] }} · {{ item[1] }}</strong>
          <p>{{ item[2] }}</p>
        </van-step>
      </van-steps>
      <van-button block type="primary" round @click="syncFamily">同步家属并回访</van-button>
    </section>

    <section class="panel">
      <div class="panel-head">
        <strong>管家动作</strong>
        <van-tag plain type="primary">受理 · 派单 · 监督 · 回访</van-tag>
      </div>
      <div class="action-list">
        <div v-for="(item, index) in stewardActions" :key="item[0]" class="action-item">
          <i>{{ index + 1 }}</i>
          <div>
            <strong>{{ item[0] }}</strong>
            <span>{{ item[1] }}</span>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue';
import { showToast } from 'vant';
import { stewardActions, workOrders } from '../data/community';

const query = ref('');
const selectedOrderId = ref('sos');
const workbenchMetrics = [
  { value: '42', label: '受理工单' },
  { value: '38', label: '已完成' },
  { value: '12m', label: '紧急响应' },
  { value: '4.8', label: '满意度' },
];

const filteredOrders = computed(() => {
  const keyword = query.value.trim();
  if (!keyword) {
    return workOrders;
  }

  return workOrders.filter((order) => `${order.source}${order.title}${order.desc}`.includes(keyword));
});
const selectedOrder = computed(() => workOrders.find((order) => order.id === selectedOrderId.value) ?? workOrders[0]);

function syncFamily() {
  showToast('已同步家属并加入回访清单');
}
</script>
