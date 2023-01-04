<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <div id="main" style="width: 1200px;height: 700px;"></div>
</template>
<script>
  import echarts from 'echarts'
  export default {
    name: '',
    data() {
      return {
        charts: '',
        opinionData: data [120, 200, 150, 80, 70, 110, 130]
      }
    },
    methods: {
      drawLine(id) {
        this.charts = echarts.init(document.getElementById(id))
        this.charts.setOption({
          title: {
            text: '关系类别统计',
            subtext: '一共有48种类型',
            left: 'center'
          },
          xAxis: {
            type: 'category',
            data: ['毕业院校', '嘉宾', '配音', '主题曲', '代言人', '所属专辑', '父亲', '作者', '上映时间', '母亲', '专业代码', '占地面积', '邮政编码', '票房', '注册资本', '主角', '妻子', '编剧', '气候', '歌手', '获奖', '校长', '创始人', '首都', '丈夫', '朝代', '饰演', '面积', '总部地点', '祖籍', '人口数量', '制片人', '修业年限', '所在城市', '董事长', '作词', '改编自', '出品公司', '导演', '作曲', '主演', '主持人', '成立日期', '简称', '海拔', '号', '国籍', '官方语言']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [3028,2178,1720,1540,1029,632,606,576,505,214,193,179,154,140,136,135,134,128,108,104,101,93,84,77,77,62,60,58,56,54,52,50,49,43,42,42,40,40,38,37,37,37,34,34,34,33,33,33,33,32,31,30,29,28],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(220, 220, 220, 0.8)'
            }
          }]
        })
      }
    },
    //调用
    mounted() {
      this.$nextTick(function() {
        this.drawLine('main')
      })
    }
  }
</script>
<style scoped>
  * {
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>
