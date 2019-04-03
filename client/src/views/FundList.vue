<template>
  <div class="fillContainer">
    <div>
      <el-form
        :inline='true'
        ref='add_data'
      >
        <el-form-item class="btnRight">
          <el-button
            type='primary'
            size="small"
            @click="handleAdd()"
          >添加</el-button>

        </el-form-item>
      </el-form>
    </div>
    <div class="table_container">
      <el-table
        v-if="tableData.length>0"
        :data="tableData"
        max-height=450px
        height=400px
        border
        style="width: 100%"
      >
        <el-table-column
          type='index'
          label="序号"
          align='center'
          width="70"
        > </el-table-column>
        <el-table-column
          prop='date'
          label="创建时间"
          align='center'
          width="250"
        >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop='type'
          label="收支类型"
          align='center'
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop='describe'
          label="收支描述"
          align='center'
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop='income'
          label="收入"
          align='center'
          width="100"
          style="color:#00d053"
        >
          <template slot-scope="scope">
            <span style="color:#00d053">{{ scope.row.income }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop='expend'
          label="支出"
          align='center'
          width="100"
          style="color:#f56767"
        >
          <template slot-scope="scope">
            <span style="color:#f56767">{{ scope.row.expend }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop='cash'
          label="账户现金"
          align='center'
          width="170"
          style="color:#4db3ff"
        >
          <template slot-scope="scope">
            <span style="color:#4db3ff">{{ scope.row.cash }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop='remark'
          label="备注"
          align='center'
          width="200"
        >
        </el-table-column>>

        <el-table-column
          prop='operation'
          label="操作"
          align='center'
          width='160px'
        >
          <template slot-scope="scope">
            <el-button
              size="small"
              type='warning'
              icon='edit'
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="small"
              type="danger"
              icon='delete'
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <!-- <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes= 
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        >
        </el-pagination>
      </div> -->
      <el-row>
        <el-col :span='24'>
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="paginations.currentPage"
              :page-sizes="paginations.pageSizes"
              :page-size="paginations.pageSize"
              :layout="paginations.layout"
              :total="paginations.total"
            >
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>

    <Dialog
      :dialog='dialog'
      :formData='formData'
      @update='getProfile'
    ></Dialog>

  </div>
</template>


<script>
import Dialog from "../components/Dialog.vue";
export default {
  data() {
    return {
      tableData: [],
      allTableData: [],
      formData: {
        id: "",
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: ""
      },
      dialog: {
        show: false,
        title: "",
        option: ""
      },
      paginations: {
        currentPage: 1, //当前页
        pageSizes: [6, 10, 20],
        pageSize: 6,
        layout: "total, sizes, prev, pager, next, jumper", //翻页属性
        total: 0 //总数
      }
    };
  },
  components: {
    Dialog
  },
  created() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      //获取表格数据/api/profiles
      this.$axios
        .get("/api/profiles")
        .then(res => {
          this.allTableData = res.data;
          //设置分页数据
          this.setPaginations();
        })
        .catch(err => console.log(err));
    },
    setPaginations() {
      this.paginations.total = this.allTableData.length;
      this.paginations.currentPage = 1;
      this.paginations.pageSize = 6;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.pageSize;
      });
    },
    handleEdit(index, row) {
      this.dialog = {
        show: true,
        title: "修改资金信息",
        option: "edit"
      };
      this.formData = {
        type: row.type,
        describe: row.describe,
        income: row.income,
        expend: row.expend,
        cash: row.cash,
        remark: row.remark,
        id: row._id
      };
    },
    handleDelete(index, row) {
      this.$axios
        .delete(`/api/profiles/del/${row._id}`)
        .then(res => {
          this.$message("删除成功");
          this.getProfile();
        })
        .catch(err => console.log(err));
    },
    handleAdd(index, row) {
      this.dialog = {
        show: true,
        title: "添加资金信息",
        option: "add"
      };
      this.formData = {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      };
    },
    handleSizeChange(pageSize) {
      this.paginations.currentPage = 1;
      this.paginations.pageSize = pageSize;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < pageSize;
      });
    },
    handleCurrentChange(page) {
      const start = this.paginations.pageSize * (page - 1);
      const final = this.paginations.pageSize * page;
      const tabels = [];
      for (let i = start + 1; i < final + 1; i++) {
        if (this.allTableData[i]) {
          tabels.push(this.allTableData[i]);
        }
      }
      this.tableData = tabels;
    }
  }
};
</script>

<style scoped>
.fillContainer {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
  padding-right: 263px;
}
.pagination {
  float: right;
  padding-right: 263px;
  padding-top: 10px;
}
</style>


