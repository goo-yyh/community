<template>
  <section class="mini-page">
    <div class="blue-hero">
      <span>小区管家为中心 · 民生服务闭环</span>
      <h1>老人有需求，管家有响应，政府有数据</h1>
      <p>服务系统联动社区、物业、志愿者、商户和技工，形成可追踪、可监管的小区综合服务平台。</p>
    </div>

    <div class="metric-grid">
      <div v-for="item in overviewMetrics" :key="item.label" class="metric-tile">
        <strong>{{ item.value }}</strong>
        <span>{{ item.label }}</span>
      </div>
    </div>

    <section class="panel">
      <div class="panel-head">
        <strong>演示路径</strong>
        <van-tag plain type="primary">8 个模块</van-tag>
      </div>
      <div class="route-grid">
        <router-link v-for="item in routeItems.slice(1)" :key="item.path" :to="item.path" class="route-card">
          <van-icon :name="item.icon" />
          <span>{{ item.title }}</span>
        </router-link>
      </div>
    </section>

    <section class="panel">
      <div class="panel-head">
        <strong>今日运行</strong>
        <van-tag color="#11875d">实时演示数据</van-tag>
      </div>
      <div class="notice-list">
        <router-link to="/elder-device" class="notice-item urgent">
          <span>红色呼叫</span>
          <strong>3 栋 602 王阿姨已接通管家中心</strong>
        </router-link>
        <router-link to="/workbench" class="notice-item">
          <span>工单派发</span>
          <strong>厨房漏水已派认证水电工，预计 18 分钟到达</strong>
        </router-link>
        <router-link to="/gov-screen" class="notice-item">
          <span>街道视图</span>
          <strong>5 个小区全部在线，本月互助完成率 96.5%</strong>
        </router-link>
      </div>
    </section>
  </section>
</template>

<script setup>
import { overviewMetrics, routeItems } from '../data/community';
</script>
