<template>
  <div>
    <!-- 顶部区域 -->
    <el-card>
      <el-form :inline="true" :model="obj" class="demo-form-inline">
        <el-form-item label="企业编号">
          <el-input class="short" v-model="obj.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input class="long" v-model="obj.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input class="short" v-model="obj.username"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select class="long" v-model="obj.status">
            <el-option label="所有" value=""></el-option>
            <el-option label="禁用" :value="0"></el-option>
            <el-option label="启用" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="clearSearch">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="openAdd" type="primary">
            <i class="el-icon-plus"></i>&nbsp;新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格区域 -->
    <el-card class="card">
      <el-table :data="entList" style="width: 100%">
        <el-table-column type="index" label="序号">
        </el-table-column>
        <el-table-column prop="eid" label="企业编号" width="150">
        </el-table-column>
        <el-table-column prop="name" label="企业名称" width="150">
        </el-table-column>
        <el-table-column prop="username" label="创建者" width="150">
        </el-table-column>
        <el-table-column label="创建日期" width="200">
          <template slot-scope="scope">
            {{ scope.row.create_time | mytime }}
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{ scope.row.status === 0 ? '禁用' : `启用` }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-link @click="edit(scope.row)" type="primary">编辑</el-link>&nbsp;
            <el-link @click="diable(scope.row)" type="primary">
              {{ scope.row.status === 0 ? '启用' : '禁用' }}
            </el-link>&nbsp;
            <el-link @click="del(scope.row)" type="primary">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination @size-change="sizeChange" @current-change="currentChange" class="mypagintation" background :current-page="obj.page" :page-sizes="sizesArr" :page-size="obj.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <!-- 新增面板 -->
    <!-- <AddDialog ref="addDailog" /> -->
    <!-- <entAdd ref="entAdd" /> -->
    <!-- 修改面板 -->
    <!-- <editEnt ref="editEnt" /> -->
    <!-- 新增 & 修改面板 -->
    <processEnt ref="processEnt" /> {{ obj }}
  </div>
</template>
<script>
// 导入请求服务器的接口
import { apiGetList, apiDelEnt, apiEditEnt } from '../../api/enterprise.js'
// 导入新增面板
// import entAdd from './com/entAdd.vue'
// import editEnt from './com/editEnt.vue'
// 导入新增 & 修改面板
import processEnt from './com/processEnt.vue'
export default {
  data() {
    return {
      // 请求列表中的参数
      obj: {
        page: 1, // 当前页
        limit: 4, // 页容量
        name: '', // 企业名称
        eid: '', // 企业编号
        username: '', // 创建者
        status: '', // 状态
      },
      // 页容量的数组
      sizesArr: [2, 4, 8],
      // 企业数据的总条数
      total: 0,
      // 企业列表数据源
      entList: []
    }
  },
  methods: {
    // 打开编辑框
    edit(row) {
      // // 打开 
      // this.$refs.editEnt.dialogFormVisible = true
      // // 赋值数据
      // this.$refs.editEnt.form = JSON.parse(JSON.stringify(row))
      // 打开面板
      this.$refs.processEnt.dialogFormVisible = true
      // 修改面板状态
      this.$refs.processEnt.isEdit = true
      // 给编辑面板添加默认的值
      this.$refs.processEnt.form = JSON.parse(JSON.stringify(row))
    },
    // 打开新增面板
    openAdd() {
      // 打开新增面板
      // this.$refs.entAdd.dialogFormVisible = true
      this.$refs.processEnt.dialogFormVisible = true
      // 将状态改为新增状态
      this.$refs.processEnt.isEdit = false
      // 将输入框中的内容清空
      this.$refs.processEnt.$refs.form.resetFields()
    },
    // 禁用和启用
    diable(row) { // row.id
      apiEditEnt(row.id).then(res => {
        if (res.data.code === 200) {
          // 提示用户修改状态成功
          if (row.status === 0) {
            this.$message.success('启用成功')
          } else {
            this.$message.success('禁用成功')
          }
          // 手动更新数据
          this.getEntList()
        }
      })
    },
    // 删除企业数据
    del(row) { // row.id
      this.$confirm('是否确定删除数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 将数据提交到服务器
        apiDelEnt(row.id).then(res => {
          if (res.data.code === 200) {
            this.$message.success('删除成功')
            // 更新数据
            this.getEntList()
          } else {
            this.$message.error(res.data.message)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 数据的筛选
    search() {
      this.getEntList()
    },
    // 清除筛选数据
    clearSearch() {
      this.obj.name = ''
      this.obj.eid = ''
      this.obj.username = ''
      this.obj.status = ''
    },
    // 当前页发生改变时会触发
    currentChange(index) {
      // 改变当前页
      this.obj.page = index
      // 重新请求数据
      this.getEntList()
    },
    // 页容量发生改变时会触发
    sizeChange(index) {
      // 改变当前的页容量
      this.obj.limit = index
      // 重新请求数据
      this.getEntList()
    },
    // 得到数据源
    getEntList() {
      apiGetList(this.obj).then(res => {
        // 赋值
        if (res.data.code === 200) {
          // 保存数据源
          this.entList = res.data.data.items
          // 给总条数赋值
          this.total = res.data.data.pagination.total
        }
      })
    }
  },
  created() {
    // 得到企业模块的数据
    this.getEntList()
  },
  components: {
    // entAdd,
    // editEnt
    processEnt
  }
}
</script>

<style>

</style>
