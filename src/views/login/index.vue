<script lang="tsx">
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';
  import { Button } from 'vant';
  import { useCounterStore } from '/@/store/modules';
  export default defineComponent({
    setup() {
      const router = useRouter();
      const store = useCounterStore();
      return () => (
        <div>
          <Button
            type={'primary'}
            onClick={() => {
              router.push({ path: '/home' });
            }}
          >
            跳转首页
          </Button>
          <br />
          <Button
            onClick={() => {
              store.increment();
            }}
          >
            数据 + 1
          </Button>
          <br />
          {store.count}
        </div>
      );
    },
  });
</script>
<style lang="less" scoped></style>
