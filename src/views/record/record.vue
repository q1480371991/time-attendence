<template>
  <div>
    <div class="contain-box box-shadow">
      <div class="tips">
        截至今日，你的所有的签到记录
      </div>
      <el-table :data="recordlist.slice((currentPage - 1) * pageSize, currentPage * pageSize)" style="width: 100%">
        <el-table-column prop="startTime" label="开始时间" min-width="100" align="center">
        </el-table-column>
        <el-table-column prop="endTime" label="结束时间" min-width="100" align="center">
        </el-table-column>
        <el-table-column prop="status" label="状态" min-width="100" align="center">
        </el-table-column>
        <el-table-column prop="duration" label="本次打卡时长" min-width="100" align="center">
        </el-table-column>
      </el-table>
      <div class="block block-add">
        <!-- <span class="demonstration">完整功能</span> -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-sizes="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper" :total="recordlist.length">

        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Inputbox from '../box/inputbox.vue';
import request from '@/utils/request.js'


export default {
  name: "record",
  data() {
    return {
      currentPage: 1,
      pageSize: 3, //每一页显示的数据量 此处每页显示6条数据

      recordlist: [1],
      currentPage: 1,
    }
  },
  async created() {
      var that = this
      const { data: res } = await request.get('/mytimerecored',{
      params:{userid:that.$store.state.id}
      })
      for(let i =0;i<res.data.length;i++)
      {
        if(res.data[i].status==1)res.data[i].status="有效"
        else if(res.data[i].status==0)res.data[i].status="无效"
        else res.data[i].status="被举报";
      }
      this.recordlist=res.data
  },
  methods: {
    handleSizeChange(val) {
      
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      
      this.currentPage = val
    }

  },
  components: { Inputbox }
}

</script>


<style lang="less" scoped>
.box-shadow {
  box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%);
}

.block-add {
  margin-left: 31px;
}

.contain-box {
  margin: auto;
  width: 70%;
  display: flex;
  flex-direction: column;
}

.tips {
  line-height: normal;
  letter-spacing: .009375rem;
  word-break: break-all;
  font-weight: 500;
  font-size: 1.25rem;
  margin-left: 30px;
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>