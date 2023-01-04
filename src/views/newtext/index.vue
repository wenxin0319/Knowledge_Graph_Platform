<template>
  <div id="app" v-bind:style="style_div">
    <textarea
      cols="100"
      rows="10"
      v-model="msg"
      class="align-center"
      style="
        border: 0;
        border-radius: 10px;
        background-color: rgba(241, 241, 241, 0.98);
        width: 80%;
        height: 100%;
        padding: 10px;
        resize: none;
      "
      placeholder="请输入文档"
    ></textarea>
    <p style="white-space: pre">{{ msg }}</p>
    <el-button>提交文本</el-button>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      msg: "",
      style_div: {
        width: "1200px",
        height: "300px",
        position: "absolute",
        top: "80px",
        left: "140px",
        right: "200px",
      },
    };
  },
};
</script>

<style scoped>
/* class="textarea" */

.textarea {
  width: 1200px;
  height: 60px;
  position: absolute;
  top: 80px;
  left: 140px;
  right: 200px;
  /* margin-left: 60px;
  margin-right: 50px;
  margin-top: 50px;
  margin-bottom: 500px; */
}
</style>