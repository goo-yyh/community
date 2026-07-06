<template>
  <section class="mini-page">
    <div class="page-title">
      <span>运营指标</span>
      <h1>跑通样板小区，做到模式可复制</h1>
    </div>

    <div class="card-grid">
      <article v-for="item in pilotMetrics" :key="item[0]" class="summary-card">
        <span>{{ item[0] }}</span>
        <strong>{{ item[1] }}</strong>
        <p>{{ item[2] }}</p>
      </article>
    </div>

    <section class="panel">
      <div class="panel-head">
        <strong>验收结论</strong>
        <van-tag color="#0f6bdc">可复制</van-tag>
      </div>
      <p class="panel-copy">
        服务平台统一受理，小区管家统一调配，从公益、低偿、有偿三个角度匹配不同服务人员，完成服务记录、回访和监督。
      </p>
      <div class="acceptance-list">
        <span>老人发需求</span>
        <van-icon name="arrow" />
        <span>管家派得出</span>
        <van-icon name="arrow" />
        <span>服务接得住</span>
        <van-icon name="arrow" />
        <span>政府看得到</span>
      </div>
    </section>
  </section>
</template>

<script setup>
import { pilotMetrics } from '../data/community';
</script>
