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
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 10,
            data:['毕业院校', '嘉宾', '配音', '主题曲', '代言人', '所属专辑', '父亲', '作者', '上映时间', '母亲', '专业代码', '占地面积', '邮政编码', '票房', '注册资本', '主角', '妻子', '编剧', '气候', '歌手', '获奖', '校长', '创始人', '首都', '丈夫', '朝代', '饰演', '面积', '总部地点', '祖籍', '人口数量', '制片人', '修业年限', '所在城市', '董事长', '作词', '改编自', '出品公司', '导演', '作曲', '主演', '主持人', '成立日期', '简称', '海拔', '号', '国籍', '官方语言']
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: true,
              label: {
                show: true,
              },
              data: [{'value': 8319, 'name': '毕业院校'},{'value': 6136, 'name': '嘉宾'},{'value': 4209, 'name': '配音'},{'value': 3395, 'name': '主题曲'},{'value': 923, 'name': '代言人'},{'value': 7757, 'name': '所属专辑'},{'value': 15049, 'name': '父亲'},{'value': 29818, 'name': '作者'},{'value': 5665, 'name': '上映时间'},{'value': 9492, 'name': '母亲'},{'value': 24, 'name': '专业代码'},{'value': 666, 'name': '占地面积'},{'value': 26, 'name': '邮政编码'},{'value': 1929, 'name': '票房'},{'value': 978, 'name': '注册资本'},{'value': 2346, 'name': '主角'},{'value': 12500, 'name': '妻子'},{'value': 6057, 'name': '编剧'},{'value': 908, 'name': '气候'},{'value': 22065, 'name': '歌手'},{'value': 3404, 'name': '获奖'},{'value': 3015, 'name': '校长'},{'value': 2236, 'name': '创始人'},{'value': 435, 'name': '首都'},{'value': 12487, 'name': '丈夫'},{'value': 6689, 'name': '朝代'},{'value': 4894, 'name': '饰演'},{'value': 748, 'name': '面积'},{'value': 2807, 'name': '总部地点'},{'value': 1552, 'name': '祖籍'},{'value': 538, 'name': '人口数量'},{'value': 1736, 'name': '制片人'},{'value': 19, 'name': '修业年限'},{'value': 748, 'name': '所在城市'},{'value': 7446, 'name': '董事长'},{'value': 9204, 'name': '作词'},{'value': 441, 'name': '改编自'},{'value': 6092, 'name': '出品公司'},{'value': 20195, 'name': '导演'},{'value': 8789, 'name': '作曲'},{'value': 42196, 'name': '主演'},{'value': 4280, 'name': '主持人'},{'value': 14776, 'name': '成立日期'},{'value': 4645, 'name': '简称'},{'value': 382, 'name': '海拔'},{'value': 1616, 'name': '号'},{'value': 10912, 'name': '国籍'},{'value': 146, 'name': '官方语言'}
              ]
            }
          ]
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
