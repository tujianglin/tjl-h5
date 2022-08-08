<script lang="tsx">
  import { defineComponent, reactive } from 'vue';
  import { Form, Field, CellGroup, Button } from 'vant';
  import { useLoginStore } from '/@/store/modules/login';
  import { useInstance } from '/@/hooks/web/useInstance';
  import { EnvEnum } from '/@/enums/storageEnum';
  export default defineComponent({
    setup() {
      const loginStore = useLoginStore();
      const { $dd, $wx } = useInstance();
      const formState = reactive({
        username: 'admin',
        password: '123456',
        source: $dd ? EnvEnum.DD : EnvEnum.WX,
      });
      const onSubmit = async () => {
        await loginStore.userLogin(formState);
        if ($wx) {
          await loginStore.getSign();
        }
      };
      return () => (
        <div class="login-form">
          <Form class="form" onSubmit={onSubmit}>
            <CellGroup inset>
              <Field
                v-model={formState.username}
                name="username"
                label="用户名"
                placeholder="用户名"
                rules={[{ required: true, message: '请填写用户名' }]}
              />
              <Field
                v-model={formState.password}
                type="password"
                name="password"
                label="密码"
                placeholder="密码"
                rules={[{ required: true, message: '请填写密码' }]}
              />
            </CellGroup>
            <div style="margin: 16px;">
              <Button round block type="primary" native-type="submit">
                登录
              </Button>
            </div>
          </Form>
        </div>
      );
    },
  });
</script>
<style lang="less" scoped>
  .login-form {
    background: pink;
    height: 100vh;

    .form {
      padding: 20px;
    }
  }
</style>
