<template>
  <div class="app-container">
    <div style="width:50%" class="container">
      <br>
      <br>
      <ul class="nav nav-tabs">
        <li class="active"><a href="#add_node" data-toggle="tab">添加节点</a></li>
        <li><a href="#get_node" data-toggle="tab">查询节点</a></li>
        <li><a href="#add_relationship" data-toggle="tab">添加关系</a></li>
      </ul>
      <div id="mytab-content" class="tab-content">
        <div class="tab-pane fade in active" id="add_node">
          <h3>添加节点</h3>
          <h5>节点类型</h5>
          <input type="text" class="form-control" v-model="label" /><br />
          <h5>节点属性1</h5>
          <form class="form-inline">
            <div class="form-group">
              <input type="text" class="form-control" v-model="Attribute_1" placeholder="属性">
            </div>
            <div class="form-group">
              <input type="email" class="form-control" v-model="Value_1" placeholder="属性的值">
            </div>
          </form>
          <br>
          <h5>节点属性2</h5>
          <form class="form-inline">
            <div class="form-group">
              <input type="text" class="form-control" v-model="Attribute_2" placeholder="属性">
            </div>
            <div class="form-group">
              <input type="email" class="form-control" v-model="Value_2" placeholder="属性的值">
            </div>
          </form>
          <br>
          <h5>节点属性3</h5>
          <form class="form-inline">
            <div class="form-group">
              <input type="text" class="form-control" v-model="Attribute_3" placeholder="属性">
            </div>
            <div class="form-group">
              <input type="email" class="form-control" v-model="Value_3" placeholder="属性的值">
            </div>
          </form>
          <br/>
          <button type="button" class="btn btn-success" @click="add_node">添加节点</button>
        </div>
        <div class="tab-pane fade" id="get_node">
          <h3>查询节点</h3>
          <h5>节点类型</h5>
          <input type="text" class="form-control" v-model="label" /><br />
          <h5>节点属性1</h5>
          <form class="form-inline">
            <div class="form-group">
              <input type="text" class="form-control" v-model="Attribute_1" placeholder="属性">
            </div>
            <div class="form-group">
              <input type="email" class="form-control" v-model="Value_1" placeholder="属性的值">
            </div>
          </form>
          <br>
          <h5>节点属性2</h5>
          <form class="form-inline">
            <div class="form-group">
              <input type="text" class="form-control" v-model="Attribute_2" placeholder="属性">
            </div>
            <div class="form-group">
              <input type="email" class="form-control" v-model="Value_2" placeholder="属性的值">
            </div>
          </form>
          <br>
          <h5>节点属性3</h5>
          <form class="form-inline">
            <div class="form-group">
              <input type="text" class="form-control" v-model="Attribute_3" placeholder="属性">
            </div>
            <div class="form-group">
              <input type="email" class="form-control" v-model="Value_3" placeholder="属性的值">
            </div>
          </form>
          <br/>
          <button type="button" class="btn btn-success" @click="get_node">查询节点</button>
        </div>
        <div class="tab-pane fade" id="add_relationship"></div>
      </div>
    </div>
    <br>
    <br>
    <br>
    <MyEcharts :MyData="mydata"></MyEcharts>
  </div>
</template>

<script>
import MyEcharts from './echarts_v1';
export default {
  data() {
    return {
      mydata: 'hello!!!!',
      label:'zuqiu',
      Attribute_1:'',
      Value_1:'',
      Attribute_2:'',
      Value_2:'',
      Attribute_3:'',
      Value_3:'',
    }
  },
  methods: {
    add_node: function () {
      this.axios({
        method: 'post',
        url: 'http://localhost:5000/v1/node/add',
        data: {
          label: this.label,
          Attribute_1: this.Attribute_1,
          Value_1: this.Value_1,
          Attribute_2: this.Attribute_2,
          Value_2: this.Value_2,
          Attribute_3: this.Attribute_3,
          Value_3: this.Value_3,
        },
      }).then(function (response) {
        console.log(response.data)
      });
    },
    get_node: function () {
      this.axios({
        method: 'post',
        url: 'http://localhost:5000/v1/node/get',
        data: {
          label: this.label,
          Attribute_1: this.Attribute_1,
          Value_1: this.Value_1,
          Attribute_2: this.Attribute_2,
          Value_2: this.Value_2,
          Attribute_3: this.Attribute_3,
          Value_3: this.Value_3,
        },
      }).then(response => {
        // this.mydata = response.data
        console.log(response)
      });
    },
  },
  components:{
    "MyEcharts":MyEcharts,
  },
}
</script>

