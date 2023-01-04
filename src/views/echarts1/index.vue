<template>

  <div class="chart-container" style="display: flex">
    <div>
    <upload height=30px width=65% />
    <chart height=1200px width=65% />
    </div>
    <NodePermission height=1200px width=35% />
  </div>
</template>

<script>
import NodePermission from '@/components/NodePermission/NodePermission'
import Chart from '@/components/charts/KnowledgeGraph'
import Upload from '@/components/Upload/Upload'

export default {
  name: 'KnowledgeGraph',
  components: { Chart, Upload, NodePermission }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>

