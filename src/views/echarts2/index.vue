<template>
  <div class="Echarts">
    <div :id="main" :style="{width:width, height:height}"></div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import echarts from 'echarts'
  echarts.dataTool = require('echarts/extension/dataTool')

  export default {
    name: 'Echarts',

    data() {
      return{
        data:[]
      }
    },

    mounted() {
      this.myEcharts();
    },

    methods: {
      myEcharts() {
        // dom = document.getElementById(this.main);
        // mychart = this.$refs.chart;
        this.myChart = echarts.init(document.getElementById(this.main))
        // var app = {};
        // this.option = null;
        $.get(
          "/Users/mr.salt/Downloads/les-miserables.gexf",
          function (xml) {
            myChart.hideLoading();

            this.graph = echarts.dataTool.gexf.parse(xml);
            this.ategories = [];
            for (let i = 0; i < 9; i++) {
              categories[i] = {
                name: "类目" + i,
              };
            }
            this.graph.nodes.forEach(function (node) {
              node.itemStyle = null;
              node.symbolSize = 10;
              node.value = node.symbolSize;
              node.category = node.attributes.modularity_class;
              // Use random x, y
              node.x = node.y = null;
              node.draggable = true;
            });
            option = {
              title: {
                text: "Les Miserables",
                subtext: "Default layout",
                top: "bottom",
                left: "right",
              },
              tooltip: {},
              legend: [
                {
                  // selectedMode: 'single',
                  data: categories.map(function (a) {
                    return a.name;
                  }),
                },
              ],
              animation: false,
              series: [
                {
                  name: "Les Miserables",
                  type: "graph",
                  layout: "force",
                  data: graph.nodes,
                  links: graph.links,
                  categories: categories,
                  roam: true,
                  label: {
                    position: "right",
                  },
                  force: {
                    repulsion: 100,
                  },
                },
              ],
            };

            this.myChart.setOption(option);
          },
          "xml"
        );
        if (option && typeof option === "object") {
          this.myChart.setOption(option, true);
        }
      },
    },
  };
</script>


<style></style>
