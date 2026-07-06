<template>
  <section class="mini-page">
    <div class="page-title">
      <span>AI 赋能 · 民生服务闭环</span>
      <h1>AI 做提醒和计算，小区管家做人情和判断</h1>
    </div>

    <div class="card-grid">
      <article v-for="item in aiCards" :key="item[0]" class="summary-card">
        <span>{{ item[0] }}</span>
        <strong>{{ item[1] }}</strong>
        <p>{{ item[2] }}</p>
      </article>
    </div>

    <section class="panel">
      <div class="panel-head">
        <strong>闭环治理</strong>
        <van-tag plain type="primary">需求到数据</van-tag>
      </div>
      <div class="ledger-list">
        <article v-for="item in closureRows" :key="item[0]" class="ledger-item">
          <div>
            <strong>{{ item[0] }}</strong>
            <span>{{ item[1] }}</span>
          </div>
          <van-tag plain type="primary">{{ item[2] }}</van-tag>
        </article>
      </div>
    </section>
  </section>
</template>

<script setup>
import { aiCards, closureRows } from '../data/community';
</script>
