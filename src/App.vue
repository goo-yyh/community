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

          <header class="mini-nav" :class="{ 'mini-nav--no-back': !showBackButton }">
            <button v-if="showBackButton" class="nav-icon" type="button" aria-label="返回" @click="goBack">
              <van-icon name="arrow-left" />
            </button>
            <div>
              <strong>{{ currentTitle }}</strong>
              <span>新城市花园 · 李管家值班</span>
            </div>
            <button class="capsule" type="button" aria-label="小程序菜单" @click="showMenu = true">
              <span></span>
              <i></i>
            </button>
          </header>

          <div class="screen-body">
            <router-view />
          </div>

          <nav class="route-dock" aria-label="小程序模块导航">
            <router-link
              v-for="item in leftTabs"
              :key="item.path"
              :to="item.path"
              class="route-dock-item"
              :class="{ active: isTabActive(item) }"
              :aria-label="item.title"
            >
              <van-icon :name="item.icon" />
              <span>{{ item.short }}</span>
            </router-link>
            <router-link
              to="/publish"
              class="publish-dock-button"
              :class="{ active: route.path === '/publish' }"
              aria-label="一键发布订单"
            >
              <van-icon name="plus" />
              <span>发布</span>
            </router-link>
            <router-link
              v-for="item in rightTabs"
              :key="item.path"
              :to="item.path"
              class="route-dock-item"
              :class="{ active: isTabActive(item) }"
              :aria-label="item.title"
            >
              <van-icon :name="item.icon" />
              <span>{{ item.short }}</span>
            </router-link>
          </nav>

          <div id="miniapp-portal" class="miniapp-portal" aria-live="polite"></div>

          <teleport v-if="portalReady" :to="miniappPortalSelector">
            <transition name="miniapp-layer">
              <div v-if="showMenu" class="miniapp-local-layer" role="presentation" @click.self="showMenu = false">
                <div class="miniapp-menu-popup" role="dialog" aria-modal="true" aria-label="选择模块">
                  <div class="miniapp-menu">
                    <strong>选择模块</strong>
                    <div class="miniapp-menu-grid">
                      <router-link
                        v-for="item in routeItems"
                        :key="item.path"
                        :to="item.path"
                        class="miniapp-menu-item"
                        @click="showMenu = false"
                      >
                        <van-icon :name="item.icon" />
                        <span>{{ item.title }}</span>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </teleport>
        </div>
      </div>
    </main>
  </van-config-provider>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import {
  resetDialogDefaultOptions,
  resetToastDefaultOptions,
  setDialogDefaultOptions,
  setToastDefaultOptions,
} from 'vant';
import { useRoute, useRouter } from 'vue-router';
import { routeItems, serviceRolePages } from './data/community';

const route = useRoute();
const router = useRouter();
const showMenu = ref(false);
const portalReady = ref(false);
const miniappPortalSelector = '#miniapp-portal';
const leftTabs = computed(() => routeItems.slice(0, 2));
const rightTabs = computed(() => routeItems.slice(2));

const themeVars = {
  radiusMd: '8px',
};

const currentTitle = computed(() => {
  const role = serviceRolePages[route.params.role];
  if (role) {
    return `${role.title}服务`;
  }

  return route.meta.title ?? '小区管家';
});
const showBackButton = computed(() => route.path !== '/overview');

onMounted(() => {
  portalReady.value = true;

  const scopedLayerOptions = {
    teleport: miniappPortalSelector,
    overlayClass: 'miniapp-overlay',
    overlayStyle: {
      position: 'fixed',
    },
  };

  setToastDefaultOptions({
    ...scopedLayerOptions,
    className: 'miniapp-toast',
    zIndex: 5000,
  });
  setDialogDefaultOptions({
    ...scopedLayerOptions,
    className: 'miniapp-dialog',
  });
});

onBeforeUnmount(() => {
  resetToastDefaultOptions();
  resetDialogDefaultOptions();
});

function goBack() {
  if (route.path === '/overview') {
    return;
  }

  if (window.history.state?.back) {
    router.back();
    return;
  }

  router.push(route.meta.tab ?? '/overview');
}

function isTabActive(item) {
  return route.meta.tab === item.path || route.path === item.path;
}
</script>
