<template>
  <div>
    <div class="contain-box">
      <div class="chart-box" ref="chartbox">

      </div>
      <div class="rank-box">
        <el-table :data="ranklist" style="width: 100%">
          <el-table-column prop="studentid" label="学号" min-width="100" align="center">
          </el-table-column>
          <el-table-column prop="name" label="姓名" min-width="100" align="center">
          </el-table-column>
          <!-- <el-table-column prop="address" label="地点" min-width="100" align="center">
          </el-table-column> -->
          <el-table-column prop="status" label="状态" min-width="100" align="center">
          </el-table-column>
          <el-table-column prop="weekTime" label="本周打卡时间" min-width="100" align="center">

          </el-table-column>
          <!-- <el-table-column prop="rank" label="排名" min-width="100" align="center">
          </el-table-column> -->

        </el-table>
      </div>
    </div>

  </div>
</template>

<script>
import { getranktop } from '@/api/getranktopAPI.js'
export default {
  name: 'oldrank',
  data() {
    return {
      ranklist: [],

    };
  },
  async created() {
    const { data: res } = await getranktop(20)
    console.log(res);
    // for (var i = 0; i < res.data.length; i++) {
    //   res.data[i].weekTime += "h"
    // }
    this.ranklist = res.data
  },
  computed: {
    coption() {
      return {
        title: {
          text: "本周打卡时长排行"
        },
        tooltip: {},
        legend: {
          // data: ["本周打卡时长"]
        },
        xAxis: {
          type: 'category',
          data: this.ranklist.map(d => d.name)
        },
        yAxis: {type: 'value'},
        series: [{
          name: '本周签到时长',
          type: "bar",
          data: this.ranklist.map(d => d.weekTime)
        }]
      }
    }
  },
  methods: {
    drawChart() {
      let myEchart = this.$echarts.init(this.$refs.chartbox);
      let option = this.coption
      myEchart.setOption(option);
    }
  },
  updated(){
    this.drawChart();
  },
  mounted() {
    this.drawChart();
  },

}

</script>


<style lang="less" scoped>
.rank-box {
  margin-top: 30px;
}

.chart-box {
  width: 100%;
  height: 300px;
  // background-color: green;
}

.contain-box {

  margin: auto;
  margin-top: 30px;
  width: 70%;
  display: flex;
  flex-direction: column;
}
</style>