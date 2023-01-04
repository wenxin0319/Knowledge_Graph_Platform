<template>
  <div v-bind:style="style_up">
    <editor v-model="value" @send_data_parent="send_data_parent" />
    <div v-bind:style="style_down" >
      <chart :RealData="RealData" />
    </div>
  </div>
</template>

<script>
import Editor from "@/components/editor/editor";
import NodePermission from "@/components/NodePermission/NodePermission";
import Chart from "@/components/charts/KnowledgeGraph";
import NodeList from '@/components/NodeList/NodeList'

export default {
  name: "CreateArticle",
  components: { Editor, Chart, NodeList },

  data() {
    return {
      msg_parent:'',
      RealData: {},
      style_up: {
        position: "relative",
        top: "30px",
        left: "50px",
      },
      style_down: {
        width: "1200px",
        position: "relative",
        top: "20px",
        left: "0px",
      },
    };
  },

  methods: {
    get_data: function () {
      this.axios({
        method: "get",
        url: "http://127.0.0.1:5000/data",
      }).then((response) => {
        this.RealData = response.data;
        console.log(response.data);
      });
    },

    send_data_parent(msg_child) {
      this.msg_parent = msg_child,
      this.axios({
        method: "post",
        url: "http://127.0.0.1:5000/data",
        data: this.msg_parent,
      }).then((response) => {
        this.RealData = response.data;
        console.log(response.data);
      });
    }
  },

  mounted() {
  },
};
</script>

<style scoped>
.whole {
  width: 1000px;
  height: 1000px;
  border: 1px solid #c3c3c3;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-align-content: center;
  align-content: flex-start;
  flex-direction: column;
}

.lay1 {
  width: 200px;
  height: 20px;
  border: 1px solid #FF6699;
}
.lay2 {
  width: 200px;
  height: 20px;
  border: 1px solid #FF6699;
}
.lay3 {
  width: 200px;
  height: 20px;
  border: 1px solid #FF6699;
}
</style>
