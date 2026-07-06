<template>
  <section class="mini-page profile-page">
    <section class="profile-card">
      <div class="avatar">李</div>
      <div>
        <strong>{{ profileInfo.name }}</strong>
        <span>{{ profileInfo.community }} · {{ profileInfo.address }}</span>
        <p>{{ profileInfo.phone }}</p>
      </div>
    </section>

    <div class="profile-stats">
      <div>
        <strong>{{ orders.length }}</strong>
        <span>服务订单</span>
      </div>
      <div>
        <strong>{{ profileInfo.points }}</strong>
        <span>关怀积分</span>
      </div>
      <div>
        <strong>{{ profileInfo.steward }}</strong>
        <span>专属管家</span>
      </div>
    </div>

    <section class="panel mine-actions">
      <router-link to="/orders">
        <van-icon name="orders-o" />
        <span>我的订单</span>
        <van-icon name="arrow" />
      </router-link>
      <router-link to="/publish">
        <van-icon name="add-o" />
        <span>发布服务需求</span>
        <van-icon name="arrow" />
      </router-link>
      <router-link to="/care-points">
        <van-icon name="gift-o" />
        <span>关怀积分与保障</span>
        <van-icon name="arrow" />
      </router-link>
    </section>
  </section>
</template>

<script setup>
import { profileInfo } from '../data/community';
import { useOrders } from '../stores/orders';

const { orders } = useOrders();
</script>
