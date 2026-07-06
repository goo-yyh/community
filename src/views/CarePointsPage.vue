<template>
  <section class="mini-page care-page">
    <section class="care-hero">
      <div>
        <span>关怀积分</span>
        <strong>{{ profileInfo.points }}</strong>
        <p>{{ profileInfo.community }} · {{ profileInfo.name }}</p>
      </div>
      <van-tag type="primary">可用积分</van-tag>
    </section>

    <div class="care-stats">
      <article v-for="item in careCards" :key="item[0]">
        <span>{{ item[0] }}</span>
        <strong>{{ item[1] }}</strong>
      </article>
    </div>

    <section class="panel">
      <div class="panel-head">
        <strong>服务保障</strong>
        <van-tag plain type="primary">逐单留痕</van-tag>
      </div>
      <div class="care-ledger-list">
        <article v-for="(item, index) in settlementRows" :key="item[0]" class="care-ledger-item">
          <i>{{ index + 1 }}</i>
          <div>
            <strong>{{ item[0] }}</strong>
            <span>{{ item[1] }}</span>
          </div>
          <van-tag :type="index === 0 ? 'success' : 'primary'" plain>{{ item[2] }}</van-tag>
        </article>
      </div>
    </section>

    <section class="panel">
      <div class="panel-head">
        <strong>暖心兑换</strong>
        <van-tag type="success">积分可用</van-tag>
      </div>
      <div class="care-reward-list">
        <button v-for="item in rewards" :key="item.name" class="care-reward-item" type="button" @click="redeem(item.name)">
          <van-icon :name="item.icon" />
          <div>
            <span>{{ item.name }}</span>
            <em>{{ item.desc }}</em>
          </div>
          <strong>{{ item.points }} 分</strong>
        </button>
      </div>
    </section>
  </section>
</template>

<script setup>
import { showToast } from 'vant';
import { careCards, profileInfo, settlementRows } from '../data/community';

const rewards = [
  { name: '米面油', points: 360, icon: 'gift-o', desc: '生活物资' },
  { name: '纸巾', points: 80, icon: 'bag-o', desc: '日用消耗' },
  { name: '理发券', points: 120, icon: 'coupon-o', desc: '上门服务' },
  { name: '助洁券', points: 240, icon: 'records-o', desc: '家庭清洁' },
];

function redeem(name) {
  showToast(`${name}兑换申请已记录`);
}
</script>
