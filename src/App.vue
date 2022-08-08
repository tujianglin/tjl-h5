<template>
  <RouterView />
</template>
<script lang="tsx" setup>
  import { watchEffect } from 'vue';
  import { useDingStore } from '/@/store/modules/login';
  import { useInstance } from '/@/hooks/web/useInstance';
  import { EnvEnum } from '/@/enums/storageEnum';
  import { checkRedirect } from '/@/utils/wx';

  const dingStore = useDingStore();

  const { $dd, $wx } = useInstance();

  watchEffect(async () => {
    // 钉钉登录
    if ($dd) {
      const res = await $dd.runtime.permission.requestAuthCode({
        corpId: 'ding648462dcbd460319acaaa37764f94726',
      });
      const params = {
        code: res.code,
        state: '',
        source: EnvEnum.DD,
      };
      dingStore.dingLogin(params);
    }
    // 企微登录
    if ($wx) {
      const res = checkRedirect();
      console.log(res);
      const params = {
        ...res,
        source: EnvEnum.WX,
      };
      dingStore.dingLogin(params);
    }
  });
</script>
<style lang="less"></style>
