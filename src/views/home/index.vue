<script lang="tsx">
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';
  import { Button } from 'vant';
  export default defineComponent({
    setup() {
      const router = useRouter();
      return () => (
        <div>
          <Button
            type={'primary'}
            onClick={() => {
              router.push({ path: '/login' });
            }}
          >
            home页
          </Button>
        </div>
      );
    },
  });
</script>
<style lang="less" scoped></style>
