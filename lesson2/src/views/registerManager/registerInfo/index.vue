<template>
  <div class="registerInfo z-h-100">
    <div class="registerInfo-header">
      <div class="left">
      <div class="searchFrom">
        <el-input v-model="listQuery.registerUser" debounce clearable  placeholder="请输入姓名" style="width: 200px;" class="mt-right" size="mini" @change="changFormFun" />
          <el-select v-model="listQuery.registerSex" placeholder="请选择性别" clearable size="mini" @change="changFormFun" class="mt-right">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input v-model="listQuery.registerPhone" debounce clearable  placeholder="请输入电话号码" style="width: 200px;"  size="mini" @change="changFormFun" />
      </div>
    </div>

    <div class="right leftBtn">
      <toolBtn></toolBtn>
    </div>
    </div>

    <div class="table-wrapper">
      <el-table
      :data="tableData"
      border
      style="width: 100%;"
      :height="height"
      highlight-current-row show-overflow-tooltip
      v-loading="loading">
        <el-table-column
          type="index"
          label="序号"
          width="50"
          align="center"
          >
        </el-table-column>
        <el-table-column
          v-for="item in columnData"
          :prop="item.prop"
          :key="item.prop"
          :label="item.label"
          align="center"
          >
          <template slot-scope="scope">
            <template  v-if="isTranslate(item.prop)">

              <template v-if="item.prop === 'registerSex'">
                <el-tag
                :type="scope.row[item.prop] === '1' ? 'primary' : 'success'"
                disable-transitions>{{scope.row[item.prop] === "1"?"男":"女" }}</el-tag>
              </template>
              <template v-if="item.prop === 'registerIsWork'">
                {{changeRegisterIsWork(scope.row[item.prop])}}
              </template>
            </template>
            <template v-else>
              {{scope.row[item.prop]}}
            </template>
          </template>
      </el-table-column>
      </el-table>
    </div>
    <div class="paginationWrapper">
      <Pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList"></Pagination>
    </div>
  </div>
</template>

<script>
import {registerInfo} from '@/api/register'
import {registerCol} from './columnData/columnData'
import Pagination from '@/components/Pagination'
import toolBtn from './components/toolBtn'
export default {
  name: 'registerInfo',
  methods: {
    changFormFun() {
      this.listQuery.page = 1
      this.registerInfoFun(this.listQuery)
      // clearTimeout(this.timer)
      // this.timer = setTimeout(() => {
      //   console.log(this.listQuery)
      //   this.registerInfoFun(this.listQuery)
      // }, 200)

    },
    registerInfoFun(params) {
      this.loading = true
      registerInfo(params).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.tableData = res.data.data
          this.total = res.data.size
        }
        this.loading = false
      })
    },
    getList() {
      this.registerInfoFun(this.listQuery)
    },
    isTranslate(prop) {
      let target = ['registerSex', 'registerIsWork']
      return target.includes(prop)
    },
    changeRegisterIsWork(status) {
      let map = {
        '1': '未就业',
        '2': '已入职企业',
        '3': '实习期'
      }
      return map[status] || ''
    }
  },
  components: {
    Pagination,
    toolBtn
  },
  data() {
    return {
      tableData: [],
      columnData: registerCol,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10

      },
      loading: false,
      height: window.innerHeight - 100 - 40,
      timer: null,
      options: [
        {label: '男', value: '1'},
        {label: '女', value: '2'}
      ]
    }
  },
  created() {
    this.registerInfoFun(this.listQuery)
  }
}
</script>

<style lang="scss" scoped>
.registerInfo-header{
  height:40px;
  overflow: hidden;
}
.left{
  float: left;
}
.right{
  float: right;
}
.leftBtn{
  height:40px;
  padding:0 10px;
}
.mt-right{
  margin-right: 5px;
}
.searchFrom{
  height:40px;
  display: flex;
  align-items: center;
  padding: 0 10px;
}
/* .table-wrapper{
  height: calc(100% - 50px - 40px);
} */
  .paginationWrapper{
    width: 100%;
    padding: 10px;
    height: 30px;
  }
</style>
