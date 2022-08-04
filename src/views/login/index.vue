<script lang="tsx">
  import { defineComponent, getCurrentInstance } from 'vue';

  export default defineComponent({
    setup() {
      const instance = getCurrentInstance();
      console.log(instance?.proxy?.$dd);
      return () => <div>11111</div>;
    },
  });
</script>
<style lang="less" scoped></style>
