<template>
  <section class="mini-page orders-page">
    <div class="page-title compact-title">
      <span>我的订单</span>
      <h1>查看每笔服务的办理状态</h1>
    </div>

    <div v-if="orders.length" class="user-order-list">
      <router-link v-for="order in orders" :key="order.id" :to="`/orders/${order.id}`" class="user-order-card">
        <div>
          <span>{{ order.id }} · {{ order.category }}</span>
          <strong>{{ order.title }}</strong>
          <p>{{ order.content }}</p>
        </div>
        <div class="order-status-side">
          <van-tag :color="statusColor(order.currentStep)">{{ getCurrentStep(order).title }}</van-tag>
          <em>{{ order.address }}</em>
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

function statusColor(currentStep) {
  if (currentStep >= 4) {
    return '#11875d';
  }
  if (currentStep >= 2) {
    return '#0f6bdc';
  }
  return '#c98212';
}
</script>
