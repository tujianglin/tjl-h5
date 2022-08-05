<template>
  <RouterView />
</template>
<script lang="tsx" setup>
  import { watchEffect } from 'vue';
  import { useDingStore } from '/@/store/modules/ding';
  import { useInstance } from '/@/hooks/web/useInstance';
  import { checkRedirect } from './utils/wxRedirct';

  const dingStore = useDingStore();

  const { $dd, $wx } = useInstance();

  watchEffect(async () => {
    // 钉钉登录
    if ($dd) {
      const res = await $dd.runtime.permission.requestAuthCode({
        corpId: 'ding648462dcbd460319acaaa37764f94726',
      });
      dingStore.dingLogin(res.code);
    }
    // 企微登录
    if ($wx) {
      const res = checkRedirect();
      console.log(res);
    }
  });
</script>
<style lang="less"></style>
