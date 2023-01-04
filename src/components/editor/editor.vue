<template>
  <div id="editor" class="editor">
    <!-- v-bind:style="style_div" -->
    <textarea
      cols="100"
      rows="10"
      v-model="msg_child"
      class="align-center"
      style="
        border: 0;
        border-radius: 10px;
        background-color: rgba(241, 241, 241, 0.98);
        width: 1400px;
        height: 135px;
        padding: 10px;
        resize: none;
      "
      placeholder="请输入文档"
    ></textarea>
    <p style="white-space: pre"></p>
    <el-button v-on:click="send_data_child()">提交文本</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg_child: '',
      // style_div: {
      //   width: "1200px",
      //   height: "250px",
      //   position: "absolute",
      //   top: "25px",
      //   left: "0px",
      //   right: "200px",
      // },
    };
  },

  methods: {
    send_data_child() {
      this.$emit('send_data_parent', this.msg_child)
      // this.$parent.send_data_parent();
    },
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
  left: 0px;
  right: 200px;
  /* margin-left: 60px;
  margin-right: 50px;
  margin-top: 50px;
  margin-bottom: 500px; */
}
</style>
