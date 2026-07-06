<template>
  <section class="mini-page home-page">
    <div class="home-header">
      <div class="home-tabs">
        <span class="active">首页</span>
        <span>便民服务</span>
        <span>邻里互助</span>
      </div>
      <div class="home-search-row">
        <button class="location-pill" type="button">
          <van-icon name="location-o" />
          <span>新城市花园</span>
          <van-icon name="arrow-down" />
        </button>
        <router-link class="home-search" to="/publish">
          <span>搜索上门服务、技工、商户</span>
          <strong>搜索</strong>
        </router-link>
      </div>
    </div>

    <section class="service-grid-card">
      <router-link
        v-for="item in homeQuickActions"
        :key="item.title"
        class="home-service"
        :to="{ path: '/publish', query: { text: item.text } }"
      >
        <span>
          <van-icon :name="item.icon" />
        </span>
        <strong>{{ item.title }}</strong>
        <em>{{ item.desc }}</em>
      </router-link>
    </section>

    <router-link class="home-banner" to="/mall">
      <div>
        <span>民生商城</span>
        <strong>助餐、买药、维修服务都能直接下单</strong>
      </div>
      <van-icon name="arrow" />
    </router-link>

    <section class="panel">
      <div class="panel-head">
        <strong>最近订单</strong>
        <router-link to="/orders">查看全部</router-link>
      </div>
      <div v-if="latestOrder" class="home-order">
        <router-link :to="`/orders/${latestOrder.id}`">
          <strong>{{ latestOrder.title }}</strong>
          <span>{{ latestOrder.category }} · {{ currentStep.title }}</span>
          <p>{{ latestOrder.content }}</p>
        </router-link>
      </div>
      <div v-else class="empty-panel">
        <van-icon name="add-o" />
        <span>还没有订单，点击底部圆形按钮发布需求</span>
      </div>
    </section>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { homeQuickActions } from '../data/community';
import { useOrders } from '../stores/orders';

const { orders, getCurrentStep } = useOrders();
const latestOrder = computed(() => orders.value[0]);
const currentStep = computed(() => (latestOrder.value ? getCurrentStep(latestOrder.value) : undefined));
</script>
