<script lang="tsx">
  import { defineComponent } from 'vue';
  import { Button } from 'vant';
  import { useLoginStore } from '/@/store/modules/login';

  export default defineComponent({
    setup() {
      const loginStore = useLoginStore();
      return () => (
        <div>
          <Button
            type={'primary'}
            onClick={() => {
              loginStore.Logout();
            }}
          >
            跳转登录页
          </Button>
          <Button>预览图片</Button>
        </div>
      );
    },
  });
</script>
<style lang="less" scoped></style>
