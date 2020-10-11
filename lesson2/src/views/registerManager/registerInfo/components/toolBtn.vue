<template>
  <div class="toolBtn">
    <el-button type="primary" size="mini" @click="handleDownload" :loading="downloadLoading">导出EXECL</el-button>
  </div>
</template>

<script>
// import { parseTime } from '@/utils'
import {registerCol} from '../columnData/columnData'
import {registerInfo} from '@/api/register'
export default {
  name: 'toolBtn',
  data() {
    return {
      downloadLoading: false
    }
  },
  methods: {
    getAllData() {
      return new Promise((resolve, reject) => {
        let params = {
          isAll: '1'
        }
        registerInfo(params).then(res => {
          console.log(res)
          if (res.code === 0) {
            resolve(res.data.data)
          }
        })
      })
    },

    async handleDownload() {
      this.downloadLoading = true
      const tHeader = registerCol.map(v => v.label)
      const filterVal = registerCol.map(v => v.prop)
      const data = await this.formatJson(filterVal)
      import('@/vendor/Export2Excel').then(excel => {
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    async formatJson(filterVal) {
      let data = await this.getAllData()
      console.log(data)
      return new Promise((resolve, reject) => {
        let registerSexMap = {
          '1': '男',
          '2': '女'
        }
        let registerIsWorkMap = {
          '1': '未就业',
          '2': '已入职企业',
          '3': '实习期'
        }
        let mapData = data.map(v => filterVal.map(j => {
          if (j === 'registerSex') {
            return registerSexMap[v[j]]
          } else if (j === 'registerIsWork') {
            return registerIsWorkMap[v[j]]
          } else {
            return v[j]
          }
        }))
        resolve(mapData)
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  .toolBtn{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }
</style>

