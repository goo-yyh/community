<template>
  <section class="mini-page">
    <div class="page-title">
      <span>用户入口</span>
      <h1>选择你的身份，进入对应服务</h1>
    </div>

    <div class="role-entry-grid">
      <router-link
        v-for="item in stakeholderCards"
        :key="item.key"
        :to="`/service/${item.key}`"
        class="role-entry-card"
      >
        <span class="entry-icon" :style="{ color: item.color, background: item.bg }">
          <van-icon :name="item.icon" />
        </span>
        <strong>{{ item.name }}</strong>
        <p>{{ item.summary }}</p>
        <em>进入办理</em>
      </router-link>
    </div>

    <section class="panel">
      <div class="panel-head">
        <strong>管家协同</strong>
        <van-tag plain type="primary">统一受理</van-tag>
      </div>
      <div class="service-flow">
        <span>提交需求</span>
        <van-icon name="arrow" />
        <span>管家派单</span>
        <van-icon name="arrow" />
        <span>服务处理</span>
        <van-icon name="arrow" />
        <span>评价回访</span>
      </div>
    </section>
  </section>
</template>

<script setup>
import { stakeholderCards } from '../data/community';
</script>
