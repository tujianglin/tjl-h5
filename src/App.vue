<template>
  <RouterView />
</template>
<script lang="tsx" setup>
  import { watchEffect } from 'vue';
  import { useLoginStore } from '/@/store/modules/login';

  const loginStore = useLoginStore();

  watchEffect(async () => {
    loginStore.Login();
  });
</script>
<style lang="less"></style>
