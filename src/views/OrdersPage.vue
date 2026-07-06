<template>
  <section class="mini-page orders-page">
    <div class="page-title compact-title">
      <span>我的订单</span>
      <h1>查看每笔服务的办理状态</h1>
    </div>

    <div v-if="orders.length" class="user-order-list">
      <router-link v-for="order in orders" :key="order.id" :to="`/orders/${order.id}`" class="user-order-card">
        <div class="order-card-main">
          <div class="order-card-meta">
            <span>{{ order.id }}</span>
            <em>{{ order.category }}</em>
          </div>
          <strong>{{ order.title }}</strong>
          <p>{{ order.content }}</p>
          <div class="order-card-foot">
            <van-icon name="location-o" />
            <span>{{ order.address }}</span>
          </div>
        </div>
        <div class="order-status-side">
          <van-tag :type="statusType(order.currentStep)">{{ getCurrentStep(order).title }}</van-tag>
          <em>{{ formatOrderTime(order.createdAt) }}</em>
        </div>
      </router-link>
    </div>

    <section v-else class="panel empty-state">
      <van-icon name="orders-o" />
      <strong>暂无订单</strong>
      <p>点击底部圆形按钮，用文字或语音发布你的第一个服务需求。</p>
      <router-link to="/publish">去发布</router-link>
    </section>
  </section>
</template>

<script setup>
import { useOrders } from '../stores/orders';

const { orders, getCurrentStep } = useOrders();

function statusType(currentStep) {
  if (currentStep >= 4) {
    return 'success';
  }
  if (currentStep >= 2) {
    return 'primary';
  }
  return 'warning';
}

function formatOrderTime(value) {
  return new Intl.DateTimeFormat('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}
</script>
