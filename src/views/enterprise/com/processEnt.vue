<template>
    <div class="dialog">
        <el-dialog :title="isEdit ? '修改企业': '新增企业'" :visible.sync="dialogFormVisible">
            <el-form ref="form" :model="form" :rules="rules">
                <el-form-item prop="eid" label="企业编号" :label-width="formLabelWidth">
                    <el-input v-model="form.eid" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="name" label="企业名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="short_name" label="企业简称" :label-width="formLabelWidth">
                    <el-input v-model="form.short_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="intro" label="企业介绍" :label-width="formLabelWidth">
                    <el-input v-model="form.intro" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="remark" label="企业备注" :label-width="formLabelWidth">
                    <el-input v-model="form.remark" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="proEnt">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
// 导入操作企业的方法
import { apiUpdateEnt, apiAddEnt } from '../../../api/enterprise'
export default {
    data() {
        return {
            // 控制面板的显示与隐藏
            dialogFormVisible: false,
            // 数据对象
            form: {
                eid: '',
                name: '',
                short_name: '',
                intro: '',
                remark: ''
            },
            rules: {
                eid: [{ required: true, message: '企业编号不能为空', trigger: 'blur' }],
                name: [{ required: true, message: '企业编号不能为空', trigger: 'blur' }],
                short_name: [{ required: true, message: '企业编号不能为空', trigger: 'blur' }],
                intro: [{ required: true, message: '企业编号不能为空', trigger: 'blur' }],
                remark: []
            },
            // 左侧标题的宽度
            formLabelWidth: '120px',
            // 判断当前逻辑
            isEdit: true  // true:说明面板用于修改 false：说明面板用于新增
        }
    },
    methods: {
        // 处理修改 & 新增的逻辑
        proEnt() {
            // 判断处理哪个逻辑
            if (this.isEdit) {
                // 处理修改逻辑
                apiUpdateEnt(this.form).then(res => {
                    if (res.data.code === 200) {
                        this.$message.success('修改成功')
                        // 更新数据
                        this.$parent.getEntList()
                        // 关闭面板
                        this.dialogFormVisible = false
                    } else {
                        this.$message.error(res.data.message)
                    }
                })
            } else {
                // 处理新增逻辑
                // 将新增的数据提交到服务器中
                apiAddEnt(this.form).then(res => {
                    // 判断是否成功
                    if (res.data.code === 200) {
                        // 提示新增成功
                        this.$message.success('新增成功')
                        // 刷新数据
                        this.$parent.getEntList()
                        // 关闭面板
                        this.dialogFormVisible = false
                        // 重置面板
                        this.$refs.form.resetFields()
                    } else {
                        // 当失败时，提示失败信息
                        this.$message.error(res.data.message)
                    }
                })
            }
        }
    }
}
</script>

<style lang="less">
.dialog {
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
