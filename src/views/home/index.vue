<script lang="tsx">
  import { defineComponent } from 'vue';
  import { Button } from 'vant';
  import { useLoginStore } from '/@/store/modules/login';
  // import { useInstance } from '/@/hooks/web/useInstance';
  import wx from 'weixin-js-sdk';

  export default defineComponent({
    setup() {
      const loginStore = useLoginStore();
      // const { $dd, $wx } = useInstance();

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
          <Button
            onClick={() => {
              console.log(1);
              wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                  console.log(res);
                },
              });
            }}
          >
            预览图片
          </Button>
        </div>
      );
    },
  });
</script>
<style lang="less" scoped></style>
