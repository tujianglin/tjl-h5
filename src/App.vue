<template>
  <RouterView />
</template>
<script lang="tsx" setup>
  import { getCurrentInstance, watchEffect } from 'vue';
  import { useDingStore } from '/@/store/modules/ding';

  const instance = getCurrentInstance();

  const dingStore = useDingStore();

  watchEffect(async () => {
    // 钉钉登录
    if (instance?.proxy?.$dd) {
      const res = await instance?.proxy?.$dd.runtime.permission.requestAuthCode({
        corpId: 'ding648462dcbd460319acaaa37764f94726',
      });
      dingStore.dingLogin(res.code);
    }
  });
</script>
<style lang="less"></style>
