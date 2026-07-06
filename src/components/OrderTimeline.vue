<template>
  <div class="order-flow">
    <div
      v-for="step in steps"
      :key="step.key"
      class="order-flow-step"
      :class="flowClass(step.status)"
    >
      <span class="flow-icon">
        <van-icon :name="step.icon" />
      </span>
      <div class="flow-copy">
        <strong>{{ step.title }}</strong>
        <p>{{ step.desc }}</p>
        <em>{{ step.time || '待更新' }}</em>
      </div>
      <van-tag :type="statusType(step.status)">{{ step.status }}</van-tag>
    </div>
  </div>
</template>

<script setup>
defineProps({
  steps: {
    type: Array,
    required: true,
  },
});

function flowClass(status) {
  return {
    done: status === '已完成',
    current: status === '进行中',
  };
}

function statusType(status) {
  if (status === '已完成') {
    return 'success';
  }
  if (status === '进行中') {
    return 'primary';
  }
  return 'default';
}
</script>
