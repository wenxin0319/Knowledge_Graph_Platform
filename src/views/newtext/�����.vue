<template>
  <div style="width: 1600px; height: 800px">
    <el-input
      v-model="input"
      placeholder="请输入内容"
      style="width: 600px; height: 1800px"
    ></el-input>
    <p v-text="input"></p>
  </div>
</template>



<script>
export default {
  data() {
    return {
      input: "",
    };
  },
};
</script>