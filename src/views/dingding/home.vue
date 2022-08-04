<script lang="tsx">
  import { defineComponent } from 'vue';
  import { Button } from 'vant';
  import { useDingStore } from '/@/store/modules/ding';
  export default defineComponent({
    setup() {
      const dingStore = useDingStore();
      return () => (
        <div>
          <Button
            type={'primary'}
            onClick={() => {
              dingStore.dingLogout();
            }}
          >
            跳转登录页
          </Button>
        </div>
      );
    },
  });
</script>
<style lang="less" scoped></style>
