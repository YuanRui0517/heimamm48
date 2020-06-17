<template>
  <div>
    <!-- 顶部区域 -->
    <el-card>
      <el-form :inline="true" :model="obj" class="demo-form-inline">
        <el-form-item label="用户名称">
          <el-input class="short" v-model="obj.username"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱">
          <el-input class="long" v-model="obj.email"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select class="long" v-model="obj.role_id">
            <el-option label="请选择" value=""></el-option>
            <el-option label="管理员" :value="2"></el-option>
            <el-option label="老师" :value="3"></el-option>
            <el-option label="学生" :value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="clearSearch">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="openAdd" type="primary">
            <i class="el-icon-plus"></i>&nbsp;新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格区域 -->
    <el-card class="card">
      <el-table :data="userList" style="width: 100%" :border="true">
        <el-table-column type="index" label="序号">
        </el-table-column>
        <el-table-column prop="username" width="150" label="用户名">
        </el-table-column>
        <el-table-column prop="phone" width="150" label="电话">
        </el-table-column>
        <el-table-column prop="email" width="150" label="邮箱">
        </el-table-column>
        <el-table-column prop="role" width="150" label="角色">
        </el-table-column>
        <el-table-column prop="remark" width="150" label="备注">
        </el-table-column>
        <el-table-column width="150" label="状态">
          <template slot-scope="scope">
            {{ scope.row.status === 0 ? '禁用' : `启用` }}
          </template>
        </el-table-column>
        <el-table-column width="150" label="操作">
          <template slot-scope="scope">
            <el-link v-if="['管理员', '老师'].includes($store.state.role)" @click="edit(scope.row)" type="primary">编辑</el-link>&nbsp;
            <el-link v-if="['管理员', '老师'].includes($store.state.role)" @click="diable(scope.row)" type="primary">
              {{ scope.row.status === 0 ? '启用' : '禁用' }}
            </el-link>&nbsp;
            <el-link v-if="['管理员'].includes($store.state.role)" @click="deluse(scope.row)" type="primary">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination @size-change="sizeChange" @current-change="currentChange" class="mypagintation" background :current-page="obj.page" :page-sizes="sizesArr" :page-size="obj.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <!-- 新增 + 修改面板 -->
    <processuser ref="prouser" />
  </div>
</template>

<script>
// 导入操作用户列表的方法
import { apiGetUserList, apiDelUser, apiChangeStatus } from '../../api/use'
// 导入面板
import processuser from './com/processuser.vue'
export default {
  data() {
    return {
      // 筛选区域的数据源
      obj: {
        username: '',
        email: '',
        role_id: '',
        page: 1,
        limit: 4
      },
      // 用户列表的数据源
      userList: [],
      sizesArr: [2, 4, 8],
      // 保存总数据
      total: 0
    }
  },
  methods: {
    edit(row) {
      // 打开编辑面板
      this.$refs.prouser.dialogFormVisible = true // 1s
      this.$refs.prouser.isEdit = true
      // 下面的代码应该放到 dailog 渲染完成之后再执行，就不会把 row 当作默认参数了
      this.$refs.prouser.$nextTick(() => {
        // 将当前行的数据源添加到页面上
        this.$refs.prouser.form = JSON.parse(JSON.stringify(row))
      })
    },
    openAdd() {
      // 打开新增面板
      this.$refs.prouser.dialogFormVisible = true
      this.$refs.prouser.isEdit = false
      // 清除面板中的数据
      this.$refs.prouser.$refs.form.resetFields();
    },
    // 改变用户状态
    diable(row) {
      apiChangeStatus(row.id).then(res => {
        if (res.data.code === 200) {
          if (row.status === 0) {
            this.$message.success('启用成功')
          } else {
            this.$message.success('禁用成功')
          }
          this.getUserList()
        }
      })
    },
    // 删除用户
    deluse(row) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        apiDelUser(row.id).then(res => {
          if (res.data.code === 200) {
            this.$message.success('删除成功')
            this.getUserList()
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
    // 清除数据
    clearSearch() {
      this.obj.username = ''
      this.obj.email = ''
      this.obj.role_id = ''
    },
    // 搜索方法
    search() {
      this.getUserList()
    },
    // 当前页改变时触发
    currentChange(index) {
      this.obj.page = index
      this.getUserList()
    },
    // 页容量改变时触发
    sizeChange(index) {
      this.obj.limit = index
      // 重新请求数据
      this.getUserList()
    },
    getUserList() {
      // 请求接口得到数据
      apiGetUserList(this.obj).then(res => {
        this.userList = res.data.data.items
        this.total = res.data.data.pagination.total
      })
    }
  },
  created() {
    // 得到用户列表
    this.getUserList()
  },
  components: {
    processuser
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
