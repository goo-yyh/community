<template>
  <van-config-provider :theme-vars="themeVars">
    <main class="page-shell">
      <div class="phone-frame" role="application" aria-label="未来小区综合服务小程序">
        <div class="device-bezel">
          <div class="status-bar">
            <span>14:30</span>
            <div class="status-icons">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <header class="mini-nav">
            <button class="nav-icon" type="button" aria-label="返回" @click="goBack">
              <van-icon name="arrow-left" />
            </button>
            <div>
              <strong>{{ currentTitle }}</strong>
              <span>新城市花园 · 李管家值班</span>
            </div>
            <div class="capsule" aria-label="小程序菜单">
              <span></span>
              <i></i>
            </div>
          </header>

          <div class="screen-body">
            <router-view />
          </div>

          <nav class="route-dock" aria-label="小程序模块导航">
            <router-link
              v-for="item in routeItems"
              :key="item.path"
              :to="item.path"
              class="route-dock-item"
              :aria-label="item.title"
            >
              <van-icon :name="item.icon" />
              <span>{{ item.short }}</span>
            </router-link>
          </nav>
        </div>
      </div>
    </main>
  </van-config-provider>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { routeItems } from './data/community';

const route = useRoute();
const router = useRouter();

const themeVars = {
  primaryColor: '#0f6bdc',
  buttonPrimaryBackground: '#0f6bdc',
  buttonPrimaryBorderColor: '#0f6bdc',
  tabActiveTextColor: '#0f6bdc',
  tabLineColor: '#0f6bdc',
  radiusMd: '8px',
};

const currentTitle = computed(() => route.meta.title ?? '小区管家');

function goBack() {
  if (route.path === '/overview') {
    return;
  }

  router.push('/overview');
}
</script>
