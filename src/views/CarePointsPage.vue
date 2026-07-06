<template>
  <section class="mini-page">
    <div class="page-title">
      <span>关怀与激励闭环</span>
      <h1>积分、荣誉和服务保障让邻里互助长期有人参与</h1>
    </div>

    <div class="card-grid">
      <article v-for="item in careCards" :key="item[0]" class="summary-card">
        <span>{{ item[0] }}</span>
        <strong>{{ item[1] }}</strong>
        <p>{{ item[2] }}</p>
      </article>
    </div>

    <section class="panel">
      <div class="panel-head">
        <strong>保障台账</strong>
        <van-tag plain type="primary">逐单留痕</van-tag>
      </div>
      <div class="ledger-list">
        <article v-for="item in settlementRows" :key="item[0]" class="ledger-item">
          <div>
            <strong>{{ item[0] }}</strong>
            <span>{{ item[1] }}</span>
          </div>
          <van-tag plain type="primary">{{ item[2] }}</van-tag>
        </article>
      </div>
    </section>

    <section class="panel">
      <div class="panel-head">
        <strong>暖心兑换</strong>
        <van-tag type="success">积分可用</van-tag>
      </div>
      <div class="reward-list">
        <button v-for="item in rewards" :key="item.name" class="reward-item" type="button" @click="redeem(item.name)">
          <van-icon :name="item.icon" />
          <span>{{ item.name }}</span>
          <strong>{{ item.points }} 分</strong>
        </button>
      </div>
    </section>
  </section>
</template>

<script setup>
import { showToast } from 'vant';
import { careCards, settlementRows } from '../data/community';

const rewards = [
  { name: '米面油', points: 360, icon: 'gift-o' },
  { name: '纸巾', points: 80, icon: 'bag-o' },
  { name: '理发券', points: 120, icon: 'coupon-o' },
  { name: '助洁券', points: 240, icon: 'records-o' },
];

function redeem(name) {
  showToast(`${name}兑换申请已记录`);
}
</script>
