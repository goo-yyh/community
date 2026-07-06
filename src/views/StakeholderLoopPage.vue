<template>
  <section class="mini-page">
    <div class="page-title">
      <span>一个中心 · 五类主体</span>
      <h1>小区管家把分散资源组织成服务网络</h1>
    </div>

    <van-grid :border="false" :column-num="2">
      <van-grid-item
        v-for="item in stakeholderCards"
        :key="item.key"
        :text="item.name"
        @click="selectScenario(item.key)"
      >
        <template #icon>
          <span class="entry-icon" :style="{ color: item.color, background: item.bg }">
            <van-icon :name="item.icon" />
          </span>
        </template>
        <template #text>
          <strong>{{ item.name }}</strong>
          <small>{{ item.summary }}</small>
        </template>
      </van-grid-item>
    </van-grid>

    <section class="panel scenario-panel">
      <div class="panel-head">
        <strong>{{ activeScenario.title }}</strong>
        <van-tag :color="activeScenario.color">{{ activeScenario.risk }}</van-tag>
      </div>
      <p class="panel-copy">{{ activeScenario.desc }}</p>
      <van-steps direction="vertical" :active="activeScenario.steps.length - 1">
        <van-step v-for="step in activeScenario.steps" :key="step[0]">
          <strong>{{ step[0] }}</strong>
          <p>{{ step[1] }}</p>
        </van-step>
      </van-steps>
    </section>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue';
import { showToast } from 'vant';
import { scenarios, stakeholderCards } from '../data/community';

const scenarioKey = ref('owner');
const activeScenario = computed(() => scenarios[scenarioKey.value]);

function selectScenario(key) {
  scenarioKey.value = key;
  showToast(`${scenarios[key].risk}已打开`);
}
</script>
