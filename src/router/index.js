import { createRouter, createWebHistory } from 'vue-router';
import OverviewPage from '../views/OverviewPage.vue';
import MallPage from '../views/MallPage.vue';
import OrdersPage from '../views/OrdersPage.vue';
import ProfilePage from '../views/ProfilePage.vue';
import PublishOrderPage from '../views/PublishOrderPage.vue';
import OrderDetailPage from '../views/OrderDetailPage.vue';
import StakeholderLoopPage from '../views/StakeholderLoopPage.vue';
import WorkbenchPage from '../views/WorkbenchPage.vue';
import GovScreenPage from '../views/GovScreenPage.vue';
import ElderDevicePage from '../views/ElderDevicePage.vue';
import CarePointsPage from '../views/CarePointsPage.vue';
import AiGovernancePage from '../views/AiGovernancePage.vue';
import PilotMetricsPage from '../views/PilotMetricsPage.vue';
import RoleServicePage from '../views/RoleServicePage.vue';

export const routes = [
  { path: '/', redirect: '/overview' },
  { path: '/overview', component: OverviewPage, meta: { title: '首页', tab: '/overview' } },
  { path: '/mall', component: MallPage, meta: { title: '商城', tab: '/mall' } },
  { path: '/orders', component: OrdersPage, meta: { title: '订单', tab: '/orders' } },
  { path: '/orders/:id', component: OrderDetailPage, meta: { title: '订单详情', tab: '/orders' } },
  { path: '/mine', component: ProfilePage, meta: { title: '我的', tab: '/mine' } },
  { path: '/publish', component: PublishOrderPage, meta: { title: '一键发布' } },
  { path: '/stakeholders', component: StakeholderLoopPage, meta: { title: '服务入口' } },
  { path: '/workbench', component: WorkbenchPage, meta: { title: '管家工作台' } },
  { path: '/gov-screen', component: GovScreenPage, meta: { title: '政府数据大屏' } },
  { path: '/elder-device', component: ElderDevicePage, meta: { title: '4G智能主机呼叫' } },
  { path: '/care-points', component: CarePointsPage, meta: { title: '关怀积分与保障' } },
  { path: '/ai-governance', component: AiGovernancePage, meta: { title: 'AI 与治理闭环' } },
  { path: '/pilot', component: PilotMetricsPage, meta: { title: '运营指标' } },
  { path: '/service/:role', component: RoleServicePage, meta: { title: '服务办理' } },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
