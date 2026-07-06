<template>
  <section class="mini-page gov-page">
    <div class="gov-hero">
      <span>实时数据 · 今日 14:30 更新</span>
      <strong>一屏掌握养老关怀和邻里互助态势</strong>
      <p>按小区汇总红黄绿等级老人、服务次数、志愿者力量和互助单数。</p>
    </div>

    <div class="data-grid">
      <div v-for="item in govKpis" :key="item.label" class="data-tile">
        <strong>{{ item.value }}</strong>
        <span>{{ item.label }}</span>
        <em>{{ item.note }}</em>
      </div>
    </div>

    <section class="panel">
      <div class="panel-head">
        <strong>各小区老人等级</strong>
        <van-tag plain type="primary">红黄绿</van-tag>
      </div>
      <div v-for="item in communities" :key="item.name" class="community-card">
        <div class="community-title">
          <strong>{{ item.name }}</strong>
          <span>{{ item.total }} 人 · {{ item.status }}</span>
        </div>
        <div class="level-stack">
          <div class="level-line">
            <span>红</span>
            <van-progress :percentage="percent(item.red, item.total)" color="var(--van-danger-color)" stroke-width="7" pivot-text="" />
            <b>{{ item.red }}</b>
          </div>
          <div class="level-line">
            <span>黄</span>
            <van-progress :percentage="percent(item.yellow, item.total)" color="var(--van-warning-color)" stroke-width="7" pivot-text="" />
            <b>{{ item.yellow }}</b>
          </div>
          <div class="level-line">
            <span>绿</span>
            <van-progress :percentage="percent(item.green, item.total)" color="var(--van-success-color)" stroke-width="7" pivot-text="" />
            <b>{{ item.green }}</b>
          </div>
        </div>
        <div class="row-stats">
          <span>{{ item.service }} 次服务</span>
          <span>{{ item.volunteers }} 名志愿者</span>
          <span>{{ item.mutual }} 互助单</span>
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-head">
        <strong>重点关注</strong>
        <van-tag type="danger">实时待办</van-tag>
      </div>
      <div class="focus-list">
        <article v-for="item in elderFocus" :key="item.title" class="focus-item">
          <div>
            <strong>{{ item.title }}</strong>
            <span>{{ item.desc }}</span>
          </div>
          <van-tag :color="item.color">{{ item.status }}</van-tag>
        </article>
      </div>
    </section>

    <section class="panel">
      <div class="panel-head">
        <strong>邻里互助结构</strong>
        <van-tag plain type="primary">本月 318 单</van-tag>
      </div>
      <div v-for="item in volunteerMix" :key="item.label" class="mix-row">
        <span>{{ item.label }}</span>
        <van-progress :percentage="item.percent" stroke-width="8" pivot-text="" :color="item.color" />
        <strong>{{ item.value }}</strong>
      </div>
    </section>
  </section>
</template>

<script setup>
import { communities, elderFocus, govKpis, volunteerMix } from '../data/community';

function percent(value, total) {
  return Math.round((value / total) * 100);
}
</script>
