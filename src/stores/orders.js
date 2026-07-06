import { ref } from 'vue';

const STORAGE_KEY = 'community-miniapp-orders';

export const orderFlow = [
  { key: 'created', title: '订单创建', desc: '需求已提交到小区管家中心。', icon: 'records-o' },
  { key: 'assigned', title: '管家分配', desc: '管家确认需求并匹配服务人员。', icon: 'cluster-o' },
  { key: 'accepted', title: '服务接单', desc: '服务人员接单并确认上门时间。', icon: 'passed' },
  { key: 'processing', title: '上门处理', desc: '按约定时间上门服务并留痕。', icon: 'wap-home-o' },
  { key: 'completed', title: '完成回访', desc: '用户确认完成，管家回访归档。', icon: 'certificate' },
];

const orders = ref(readOrders());

export function useOrders() {
  return {
    orders,
    createOrder,
    findOrder,
    advanceOrder,
    getOrderSteps,
    getCurrentStep,
  };
}

function readOrders() {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const cached = window.localStorage.getItem(STORAGE_KEY);
    return cached ? JSON.parse(cached) : [];
  } catch {
    return [];
  }
}

function persistOrders() {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders.value));
}

function createOrder(content, source = '文字发布') {
  const now = new Date();
  const title = makeTitle(content);
  const order = {
    id: makeOrderId(),
    title,
    content,
    source,
    category: inferCategory(content),
    createdAt: now.toISOString(),
    currentStep: 1,
    contact: '李女士 · 13800008888',
    address: inferAddress(content),
    events: {
      created: formatTime(now),
      assigned: formatTime(now),
    },
  };

  orders.value = [order, ...orders.value];
  persistOrders();
  return order;
}

function findOrder(id) {
  return orders.value.find((order) => order.id === id);
}

function advanceOrder(id) {
  const order = findOrder(id);
  if (!order) {
    return undefined;
  }

  if (order.currentStep < orderFlow.length - 1) {
    order.currentStep += 1;
    order.events[orderFlow[order.currentStep].key] = formatTime(new Date());
    persistOrders();
  }

  return order;
}

function getCurrentStep(order) {
  return orderFlow[order.currentStep] ?? orderFlow[0];
}

function getOrderSteps(order) {
  return orderFlow.map((step, index) => {
    let status = '等待中';
    if (index < order.currentStep) {
      status = '已完成';
    }
    if (index === order.currentStep) {
      status = '进行中';
    }

    return {
      ...step,
      status,
      time: order.events[step.key] ?? '',
    };
  });
}

function makeOrderId() {
  return `OD${Date.now().toString(36).toUpperCase().slice(-6)}`;
}

function makeTitle(content) {
  const normalized = content.replace(/\s+/g, '');
  if (!normalized) {
    return '小区服务订单';
  }

  return normalized.length > 18 ? `${normalized.slice(0, 18)}...` : normalized;
}

function inferCategory(content) {
  if (/购买|大米|鸡蛋|牛奶|抽纸|纸巾|蔬菜|洗衣液|商品/.test(content)) {
    return '商城商品';
  }
  if (/药|买药|处方/.test(content)) {
    return '买药代办';
  }
  if (/餐|饭|午餐|晚餐/.test(content)) {
    return '助餐配送';
  }
  if (/保洁|清洁|打扫|收纳/.test(content)) {
    return '保洁家政';
  }
  if (/维修|漏水|水电|安装|疏通|扶手/.test(content)) {
    return '上门维修';
  }

  return '综合服务';
}

function inferAddress(content) {
  const matched = content.match(/(\d+\s*栋\s*\d+|\d+\s*号楼\s*\d+)/);
  return matched ? matched[1].replace(/\s+/g, ' ') : '新城市花园';
}

function formatTime(date) {
  return new Intl.DateTimeFormat('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}
