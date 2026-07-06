<template>
  <section class="mini-page mall-page">
    <div class="mall-hero">
      <div>
        <span>民生商城</span>
        <strong>社区严选商品，当日配送到家</strong>
      </div>
      <van-icon name="cart-o" />
    </div>

    <div class="mall-tabs" role="list" aria-label="商品分类">
      <span class="active">全部</span>
      <span>粮油副食</span>
      <span>生鲜</span>
      <span>日用品</span>
    </div>

    <div class="mall-grid">
      <article v-for="item in mallItems" :key="item.id" class="mall-card">
        <div class="mall-visual" :style="{ '--goods-color': item.color }">
          <van-tag plain type="primary">{{ item.tag }}</van-tag>
          <van-icon :name="item.icon" />
        </div>
        <div class="mall-info">
          <strong>{{ item.title }}</strong>
          <p>{{ item.desc }}</p>
          <div class="mall-price">
            <span>¥{{ item.price }}</span>
            <em>¥{{ item.originPrice }}</em>
          </div>
        </div>
        <button class="mall-buy" type="button" @click="orderItem(item)">
          <van-icon name="cart-o" />
          <span>购买</span>
        </button>
      </article>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { showToast } from 'vant';
import { mallItems } from '../data/community';
import { useOrders } from '../stores/orders';

const router = useRouter();
const { createOrder } = useOrders();

function orderItem(item) {
  const order = createOrder(item.orderText, '商城订单');
  showToast('商品订单已创建');
  router.push(`/orders/${order.id}`);
}
</script>
