<template>
  <div class="ques">
    <!-- 头部区域 -->
    <el-card>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科">
          <!-- <subjectcom :value="formInline.subject" @input="changesubject" /> -->
          <subjectcom v-model="formInline.subject" />
          <!-- <el-select class="formitem" v-model="formInline.subject" placeholder="请选择学科">
            <el-option v-for="(item, index) in subjectList" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="阶段">
          <el-select class="formitem" v-model="formInline.step" placeholder="请选择阶段">
            <el-option label="请选择" value=""></el-option>
            <el-option label="初级" :value="1"></el-option>
            <el-option label="中级" :value="2"></el-option>
            <el-option label="高级" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业">
          <entcom v-model="formInline.enterprise" />
          <!-- <el-select class="formitem" v-model="formInline.enterprise" placeholder="请选择企业">
                    <el-option v-for="(item, index) in enterpriseList" :key="index" :label="item.name" :value="item.id"></el-option>
                  </el-select> -->
        </el-form-item>
        <el-form-item label="题型">
          <el-select class="formitem" v-model="formInline.type" placeholder="请选择题型">
            <el-option label="请选择" value=""></el-option>
            <el-option label="单选" :value="1"></el-option>
            <el-option label="多选" :value="2"></el-option>
            <el-option label="简答" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <br/>
        <el-form-item label="难度">
          <el-select class="formitem" v-model="formInline.difficulty" placeholder="请选择难度">
            <el-option label="请选择" value=""></el-option>
            <el-option label="简单" :value="1"></el-option>
            <el-option label="一般" :value="2"></el-option>
            <el-option label="困难" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者">
          <el-input class="formitem" v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select class="formitem" v-model="formInline.status" placeholder="请选择状态">
            <el-option label="请选择" value=""></el-option>
            <el-option label="禁用" :value="0"></el-option>
            <el-option label="启用" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker style="width: 150px" v-model="formInline.create_date" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <br/>
        <el-form-item label="标题">
          <el-input class="mytitle" v-model="formInline.title"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="openadd">
            <i class="el-icon-plus"></i>新增试题</el-button>
        </el-form-item>
        <el-button @click="formInline.subject=''">清空学科数据</el-button>
      </el-form>
    </el-card>
    <!-- 表格区域 -->
    <el-card style="margin-top: 20px">
      <el-table :data="questionList" style="width: 100%">
        <el-table-column label="序号" type="index">
        </el-table-column>
        <el-table-column label="题目" width="200">
          <template slot-scope="scope">
            <span v-html="scope.row.answer_analyze"></span>
          </template>
        </el-table-column>
        <el-table-column label="学科.阶段">
          <template slot-scope="scope">
            {{ scope.row.subject_name }} .
            <span v-if="scope.row.step === 1">初级</span>
            <span v-if="scope.row.step === 2">中级</span>
            <span v-if="scope.row.step === 3">高级</span>
          </template>
        </el-table-column>
        <el-table-column label="题型">
          <template slot-scope="scope">
            <span v-if="scope.row.step === 1">单选</span>
            <span v-if="scope.row.step === 2">多选</span>
            <span v-if="scope.row.step === 3">简答</span>
          </template>
        </el-table-column>
        <el-table-column prop="enterprise_name" label="企业">
        </el-table-column>
        <el-table-column prop="username" label="创建者">
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{ scope.row.status === 0 ? '禁用' : '启用' }}
          </template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量">
        </el-table-column>
        <el-table-column label="操作" width="200px">
          <template>
            <el-link type="primary">编辑</el-link>&nbsp;&nbsp;
            <el-link type="primary">启用</el-link>&nbsp;&nbsp;
            <el-link type="primary">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="formInline.page" :page-sizes="pagesizes" :page-size="formInline.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    {{ formInline }}
    <!-- 题库添加面板 -->
    <questionadd ref="questionadd" />
  </div>
</template>

<script>
// // 导入得到学科数据的方法
// import { apiGetSubject } from '../../api/subject.js'
// // 导入得到企业数据的方法
// import { apiGetList } from '../../api/enterprise.js'
// 导入得到问答的方法
import { apiGetQuestionList } from '../../api/question.js'
// // 导入学科组件
// import subjectcom from '../../components/subjectcom'
// // 导入企业组件
// import ent from '../../components/ent'
// 导入新增面板
import questionadd from './com/questionadd.vue'
export default {
  data() {
    return {
      formInline: {
        title: '',
        subject: 97,
        enterprise: '',
        type: '',
        step: '',
        username: '',
        status: '',
        difficulty: '',
        create_date: '',
        page: 1,
        limit: 4
      },
      // 学科数据
      subjectList: [],
      // 企业数据
      enterpriseList: [],
      // 表格的数据源
      questionList: [],
      // 页容量
      pagesizes: [2, 4, 8],
      // 总条数据
      total: 0
    }
  },
  methods: {
    // 打开新增面板
    openadd() {
      this.$refs.questionadd.dialogFormVisible = true
    },
    // getSubject() {
    //   apiGetSubject({
    //     page: 1,
    //     limit: 10
    //   }).then(res => {
    //     this.subjectList = res.data.data.items
    //   })
    // },
    // 得到企业数据
    // getenterprise() {
    //   apiGetList({
    //     page: 1,
    //     limit: 10
    //   }).then(res => {
    //     this.enterpriseList = res.data.data.items
    //   })
    // },
    // 得到问答列表
    getQuestionList() {
      apiGetQuestionList(this.formInline).then(res => {
        if (res.data.code === 200) {
          this.questionList = res.data.data.items
        }
      })
    },
    onSubmit() { },
    // 当学科发生改变时会触发
    changesubject(value) {
      // 将改变之后的值赋值给 formInline.subject
      this.formInline.subject = value
    }
  },
  // 得到所有学科的数据，并且渲染到页面上
  created() {
    // // 得到所有学科数据
    // this.getSubject()
    // 得到所有企业数据
    this.getenterprise()
    // 得到问答列表
    this.getQuestionList()
  },
  components: {
    questionadd
    //   subjectcom,
    //   ent
  }
}
</script>

<style lang="less">
.ques {
  .el-form-item {
    padding-bottom: 24px;
    .el-form-item__label {
      padding-left: 21px;
      padding-right: 31px;
    }
  }
  .formitem {
    width: 150px;
  }
  .mytitle {
    width: 388px;
  }
  .el-pagination {
    text-align: center;
  }
}
</style>
