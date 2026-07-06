<template>
  <section class="mini-page service-page">
    <div class="service-hero" :style="{ '--role-color': page.color, '--role-bg': page.bg }">
      <span class="service-icon">
        <van-icon :name="page.icon" />
      </span>
      <div>
        <strong>{{ page.title }}</strong>
        <p>{{ page.subtitle }}</p>
      </div>
    </div>

    <section class="panel">
      <div class="panel-head">
        <strong>常用功能</strong>
        <van-tag plain type="primary">可直接办理</van-tag>
      </div>
      <div class="service-action-grid">
        <button
          v-for="item in page.actions"
          :key="item.key"
          class="service-action"
          :class="{ active: selectedAction === item.key }"
          type="button"
          @click="selectAction(item)"
        >
          <van-icon :name="item.icon" />
          <strong>{{ item.title }}</strong>
          <span>{{ item.desc }}</span>
        </button>
      </div>
    </section>

    <section class="panel">
      <div class="panel-head">
        <strong>{{ page.formTitle }}</strong>
        <van-tag type="primary">{{ activeActionTitle }}</van-tag>
      </div>
      <van-form class="service-form" @submit="submitRequest">
        <van-field v-model="form.type" name="type" label="事项" placeholder="请输入服务事项" />
        <van-field v-model="form.address" name="address" label="地址" placeholder="楼栋、门牌或服务范围" />
        <van-field v-model="form.phone" name="phone" label="联系" placeholder="手机号或联系人" />
        <van-field
          v-model="form.detail"
          name="detail"
          label="说明"
          type="textarea"
          rows="2"
          autosize
          placeholder="请补充服务要求"
        />
        <van-button block round type="primary" native-type="submit">{{ page.submitText }}</van-button>
      </van-form>
    </section>

    <section class="panel">
      <div class="panel-head">
        <strong>{{ taskTitle }}</strong>
        <van-tag plain type="primary">实时处理</van-tag>
      </div>
      <div class="task-list">
        <article v-for="task in page.tasks" :key="task.id" class="task-card">
          <div>
            <strong>{{ task.title }}</strong>
            <span>{{ task.desc }}</span>
          </div>
          <div class="task-actions">
            <van-tag :type="statusType(taskStatus(task))">{{ taskStatus(task) }}</van-tag>
            <van-button size="small" plain type="primary" round @click="handleTask(task)">
              {{ taskButtonText(task) }}
            </van-button>
          </div>
        </article>
      </div>
    </section>

    <section v-if="submittedRecords.length" class="panel">
      <div class="panel-head">
        <strong>我的提交</strong>
        <van-tag type="success">已记录</van-tag>
      </div>
      <div class="record-list">
        <article v-for="record in submittedRecords" :key="record.id" class="record-card">
          <strong>{{ record.type }}</strong>
          <span>{{ record.address }} · {{ record.phone }}</span>
          <p>{{ record.detail }}</p>
        </article>
      </div>
    </section>
  </section>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { showToast } from 'vant';
import { serviceRolePages } from '../data/community';

const route = useRoute();
const selectedAction = ref('');
const submittedRecords = ref([]);
const taskStatusMap = reactive({});
const form = reactive({
  type: '',
  address: '',
  phone: '',
  detail: '',
});

const page = computed(() => serviceRolePages[route.params.role] ?? serviceRolePages.owner);
const activeActionTitle = computed(() => page.value.actions.find((item) => item.key === selectedAction.value)?.title ?? page.value.actions[0].title);
const taskTitle = computed(() => {
  if (route.params.role === 'volunteer') {
    return '附近可接任务';
  }
  if (route.params.role === 'merchant') {
    return '待处理订单';
  }
  if (route.params.role === 'worker') {
    return '可接工单';
  }

  return '服务进度';
});

watch(
  page,
  (nextPage) => {
    selectedAction.value = nextPage.actions[0].key;
    Object.assign(form, nextPage.formDefaults);
    submittedRecords.value = [];
    Object.keys(taskStatusMap).forEach((key) => {
      delete taskStatusMap[key];
    });
  },
  { immediate: true },
);

function selectAction(item) {
  selectedAction.value = item.key;
  form.type = item.title;
}

function submitRequest() {
  submittedRecords.value.unshift({
    id: Date.now(),
    type: form.type,
    address: form.address,
    phone: form.phone,
    detail: form.detail,
  });
  showToast('已提交，小区管家将跟进处理');
}

function taskStatus(task) {
  return taskStatusMap[task.id] ?? task.status;
}

function taskButtonText(task) {
  const status = taskStatus(task);
  if (['可接单', '待接单', '待确认', '待处理', '待报价'].includes(status)) {
    return '接单';
  }
  if (['处理中', '配送中', '已安排', '已接单'].includes(status)) {
    return '完成';
  }

  return '跟进';
}

function handleTask(task) {
  const status = taskStatus(task);
  if (['可接单', '待接单', '待确认', '待处理', '待报价'].includes(status)) {
    taskStatusMap[task.id] = '已接单';
    showToast('已接单，任务进入处理中');
    return;
  }
  taskStatusMap[task.id] = '已完成';
  showToast('已完成，记录已同步给管家');
}

function statusType(status) {
  if (status === '已完成') {
    return 'success';
  }
  if (status === '已接单' || status === '处理中' || status === '配送中' || status === '已安排') {
    return 'primary';
  }
  return 'warning';
}
</script>
