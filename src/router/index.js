import { createRouter, createWebHistory } from 'vue-router';
import OverviewPage from '../views/OverviewPage.vue';
import StakeholderLoopPage from '../views/StakeholderLoopPage.vue';
import WorkbenchPage from '../views/WorkbenchPage.vue';
import GovScreenPage from '../views/GovScreenPage.vue';
import ElderDevicePage from '../views/ElderDevicePage.vue';
import CarePointsPage from '../views/CarePointsPage.vue';
import AiGovernancePage from '../views/AiGovernancePage.vue';
import PilotMetricsPage from '../views/PilotMetricsPage.vue';

export const routes = [
  { path: '/', redirect: '/overview' },
  { path: '/overview', component: OverviewPage, meta: { title: '项目总览' } },
  { path: '/stakeholders', component: StakeholderLoopPage, meta: { title: '五类主体闭环' } },
  { path: '/workbench', component: WorkbenchPage, meta: { title: '管家工作台' } },
  { path: '/gov-screen', component: GovScreenPage, meta: { title: '政府数据大屏' } },
  { path: '/elder-device', component: ElderDevicePage, meta: { title: '4G智能主机呼叫' } },
  { path: '/care-points', component: CarePointsPage, meta: { title: '关怀积分与保障' } },
  { path: '/ai-governance', component: AiGovernancePage, meta: { title: 'AI 与治理闭环' } },
  { path: '/pilot', component: PilotMetricsPage, meta: { title: '试点指标' } },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
