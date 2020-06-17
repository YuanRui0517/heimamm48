<template>
  <div>
    <!-- 顶部区域 -->
    <el-card>
      <el-form :inline="true" :model="obj" class="demo-form-inline">
        <el-form-item label="学科编号">
          <el-input class="short" v-model="obj.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
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
            <i class="el-icon-plus"></i>&nbsp;新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格区域 -->
    <el-card class="card">
      <el-table :data="subjectList" style="width: 100%">
        <el-table-column type="index" label="序号">
        </el-table-column>
        <el-table-column prop="rid" label="学科编号" width="150">
        </el-table-column>
        <el-table-column prop="name" label="学科名称" width="150">
        </el-table-column>
        <el-table-column prop="short_name" label="简称" width="150">
        </el-table-column>
        <el-table-column prop="username" label="创建者" width="150">
        </el-table-column>
        <el-table-column prop="create_time" label="创建日期" width="200">
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
            <el-link @click="delSubject(scope.row)" type="primary">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination @size-change="sizeChange" @current-change="currentChange" class="mypagintation" background :current-page="obj.page" :page-sizes="sizesArr" :page-size="obj.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <!-- 新增面板 -->
    <AddDialog ref="addDailog" />
    <!-- 修改面板 -->
    <EditDialog ref="editDailog" /> {{ obj }}
  </div>
</template>

<script>
// 导入操作学科数据的方法
import { apiGetSubject, apiChangeStatus, apiDelSubject } from '@/api/subject.js'
// 导入新增面板
import AddDialog from './com/addDialog.vue'
import EditDialog from './com/editDialog.vue'

export default {
  data() {
    return {
      // 页容量的数组
      sizesArr: [2, 4, 8],
      // 数据的总条数
      total: 0,
      // 学科列表
      subjectList: [],
      // 请求列表的参数对象
      obj: {
        name: '', // 学科名称
        page: 1, // 当前页
        limit: 4, // 页容量
        rid: '', // 当前学科编号
        username: '', // 创建者的名称
        status: '' // 状态
      }
    }
  },
  methods: {
    // 删除学科
    delSubject(row) {
      // 添加一个提示框
      this.$confirm('是否删除当前数据', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 1.0 得到要删除的学科的标识： row.idN
        // 2.0 请求服务器接口
        apiDelSubject(row.id).then(res => {
          // 判断删除的状态
          if (res.data.code === 200) {
            // 判断当前页是否只剩下最后一条数据
            if (this.subjectList.length === 1) {
              // 删除之后需要将当前页修改为上一页
              this.obj.page = this.obj.page - 1
            }
            // 3.0 提示删除成功
            this.$message.success('删除成功')
            // 4.0 更新数据
            this.getSubjectData()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 点击编辑按钮触发
    edit(row) {
      // 1.0 得到当前行数据 // window.console.log(row)
      // 2.0 打开编辑面板
      this.$refs.editDailog.dialogFormVisible = true
      // 3.0 将当前行数据渲染到编辑面板中
      // 在 row 中添加一个 shortname
      row.shortname = row.short_name
      // // 解决同步修改的 bug
      // let str = JSON.stringify(row)
      // let objStr = JSON.parse(str)
      // // 重新赋值
      // this.$refs.editDailog.form = objStr
      // 判断：当前编辑的数据是否是上一次打开的数据
      if (row.id !== this.$refs.editDailog.form.id) {
        // 重新赋值
        this.$refs.editDailog.form = JSON.parse(JSON.stringify(row))
      }
    },
    // 清除筛选数据
    clearSearch() {
      this.obj.name = ''
      this.obj.rid = ''
      this.obj.username = ''
      this.obj.status = ''
    },
    // 得学科的数据
    getSubjectData() {
      // 调用这个接口暂时不传任何参数：因为现在用不上
      apiGetSubject(this.obj).then(res => {
        // 保存学科列表
        this.subjectList = res.data.data.items
        // 将数据的总条数保存起来
        this.total = res.data.data.pagination.total
      })
    },
    // 禁用方法
    diable(row) {
      // 1.0 得到当前要禁用的学科的信息: id
      let id = row.id
      // 2.0 将学科信息提交到服务器
      apiChangeStatus(id).then(res => {
        // 3.0 接收返回的结果：由于返回的结果中没有任何有用信息暂时不用理会
        // 4.0 重新请求学科数据
        if (res.data.code === 200) {
          this.getSubjectData()
          // 判断当前的操作
          if (row.status === 0) {
            this.$message.success('启用成功')
          } else {
            this.$message.success('禁用成功')
          }
        }
      })
    },
    // 打开新增面板
    openAdd() {
      this.$refs.addDailog.dialogFormVisible = true
    },
    // 当前页改变时触发的方法
    currentChange(index) { // index：当前选中的页面
      // 将当前页进行重新赋值
      this.obj.page = index
      // 重新请求数据
      this.getSubjectData()
    },
    // 当页容量发生改变时会触发
    sizeChange(index) {
      // 给页容量重新赋值
      this.obj.limit = index
      // 重新请求数据
      this.getSubjectData()
    },
    // 筛选数据
    search() {
      // 重新请求数据
      this.getSubjectData()
    }
  },
  created() {
    // 得到学科的列表
    this.getSubjectData()
  },
  components: {
    AddDialog: AddDialog,
    EditDialog: EditDialog
  }
}
</script>

<style lang="less">
.demo-form-inline {
  .short {
    width: 80px;
  }
  .long {
    width: 130px;
  }
  .el-form-item {
    margin-bottom: 0px;
  }
}

.mypagintation {
  text-align: center;
  margin-top: 30px;
}

.card {
  margin-top: 20px;
}
</style>
