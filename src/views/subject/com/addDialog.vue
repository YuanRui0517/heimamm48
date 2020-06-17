<template>
    <div class="addDialog">
        <el-dialog title="新增学科" :visible.sync="dialogFormVisible">
            <el-form ref="form" :model="form" :rules="rules">
                <el-form-item prop="rid" label="学科编号" :label-width="formLabelWidth">
                    <el-input v-model="form.rid" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="name" label="学科名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="学科简称" :label-width="formLabelWidth">
                    <el-input v-model="form.shortname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="学科介绍" :label-width="formLabelWidth">
                    <el-input v-model="form.intro" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="学科备注" :label-width="formLabelWidth">
                    <el-input v-model="form.remark" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addSubject">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
// 导入操作学科的接口
import { apiAddSubject } from '@/api/subject.js'
export default {
    data() {
        return {
            // 控制面板的显示和隐藏
            dialogFormVisible: false,
            // 表单元素中的数据源
            form: {
                rid: '', // 学科编号
                name: '', // 学科名称
                shortname: '', // 简称
                intro: '', // 介绍
                remark: '' // 备注
            },
            // 添加校验规则
            rules: {
                rid: [
                    { required: true, message: '请输入学科编号', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入学科名称', trigger: 'blur' }
                ]
            },
            // 标题文本的宽度：
            formLabelWidth: `120px`
        }
    },
    methods: {
        // 新增学科
        addSubject() {
            // 1.0 校验参数是否合法
            // this.$refs['form']
            this.$refs.form.validate((valid) => {
                if (valid) {
                    // 2.0 得到学科信息 window.console.log(this.form)
                    // 3.0 将数据提交到服务器
                    apiAddSubject(this.form).then(res => {
                        // 4.0 接收返回的结果
                        if (res.data.code === 200) {
                            // 5.0 提示用户新增成功
                            this.$message.success('学科添加成功')
                            // 6.0 关闭面板
                            this.dialogFormVisible = false
                            // 7.0 重置新增面板中的数据 // resetFields：只会重置设置过表单验证的属性
                            this.$refs.form.resetFields()
                            // 重新其它的数据
                            this.form.shortname = ''
                            this.form.intro = ''
                            this.form.remark = ''
                            // 8.0 刷新数据:调用父组件中的方法
                            this.$parent.getSubjectData()
                        }
                    })
                } else {
                    window.console.log('校验不通过')
                }
            })
        }
    }
}
</script>

<style lang="less">
.addDialog {
    .el-dialog__header {
        text-align: center;
        background: linear-gradient(to right, #00c6f7, #2194ec);
        .el-dialog__title {
            color: #fff;
        }
        .el-dialog__close {
            color: #fff;
        }
    }
    .dialog-footer {
        text-align: center;
    }
}
</style>
