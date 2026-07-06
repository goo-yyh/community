<template>
  <section class="mini-page mall-page">
    <div class="page-title">
      <span>民生商城</span>
      <h1>选择服务后直接发布订单</h1>
    </div>

    <div class="mall-list">
      <article v-for="item in mallItems" :key="item.id" class="mall-card">
        <span class="mall-icon" :style="{ color: item.color }">
          <van-icon :name="item.icon" />
        </span>
        <div>
          <strong>{{ item.title }}</strong>
          <p>{{ item.desc }}</p>
          <em>
            <template v-if="item.unit">¥{{ item.price }} / {{ item.unit }}</template>
            <template v-else>{{ item.price }}</template>
          </em>
        </div>
        <van-button round size="small" type="primary" @click="orderItem(item)">下单</van-button>
      </article>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { mallItems } from '../data/community';

const router = useRouter();

function orderItem(item) {
  router.push({
    path: '/publish',
    query: {
      text: item.orderText,
    },
  });
}
</script>
