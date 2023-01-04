  <template>
  <div>
    <el-table :data="dataRel" border>
        <el-table-column prop="name" label="姓名" width="100"> </el-table-column>
    </el-table>
  </div>
</template>

  <script>
export default {
  data() {
    return {
        dataRel: [
        {
          name: "程雯鑫",
          draggable: false,
          category: 0,
          number: 0,
          value: [300, 45],
          symbolSize: 80,
          showNum: 25,
        },
        {
          name: "算法工程师",
          number: 1,
          category: 1,
          draggable: true,
          value: 40,
          showNum: 35,
        },
      ],
    };
  },
};
</script>