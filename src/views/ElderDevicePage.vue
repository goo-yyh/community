<template>
  <section class="mini-page">
    <section class="device-card">
      <div class="device-screen">
        <strong>{{ sosActive ? '红色呼叫中' : '4G智能主机' }}</strong>
        <span>{{ sosActive ? '王阿姨 · 3 栋 602 · 已接通管家中心' : '王阿姨 · 3 栋 602 · 红色老人 · 待机中' }}</span>
      </div>
      <img :src="deviceImage" alt="4G智能主机" />
      <van-button block round type="danger" icon="phone-circle-o" @click="triggerSos">模拟呼叫</van-button>
      <p>一键或拉绳呼救 · 双向通话 · 自动接通管家中心</p>
    </section>

    <section class="panel">
      <div class="panel-head">
        <strong>管家处置时间线</strong>
        <van-tag :type="sosActive ? 'danger' : 'primary'">{{ sosActive ? '红色警报处理中' : '等待呼叫' }}</van-tag>
      </div>
      <van-steps direction="vertical" :active="timeline.length - 1">
        <van-step v-for="item in timeline" :key="item[0]">
          <strong>{{ item[0] }} · {{ item[1] }}</strong>
          <p>{{ item[2] }}</p>
        </van-step>
      </van-steps>
    </section>

    <section class="panel tag-cloud">
      <div class="panel-head">
        <strong>4G智能主机特点</strong>
        <van-tag plain type="primary">标 * 可选配</van-tag>
      </div>
      <span v-for="tag in deviceTags" :key="tag">{{ tag }}</span>
    </section>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue';
import { showToast } from 'vant';
import deviceImage from '../../demo/assets/4g-smart-host.png';
import { deviceTags, emergencyTimeline, standbyTimeline } from '../data/community';

const sosActive = ref(false);
const timeline = computed(() => (sosActive.value ? emergencyTimeline : standbyTimeline));

function triggerSos() {
  sosActive.value = true;
  showToast('红色呼叫工单已生成');
}
</script>
