<template>
    <div class="prouser">
        <el-dialog :title="isEdit ? '修改用户': '新增用户'" :visible.sync="dialogFormVisible">
            <el-form ref="form" :rules="rules" :model="form">
                <el-form-item prop="username" label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="email" label="邮箱" :label-width="formLabelWidth">
                    <el-input v-model="form.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="phone" label="电话" :label-width="formLabelWidth">
                    <el-input v-model="form.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="role_id" label="角色" :label-width="formLabelWidth">
                    <el-select v-model="form.role_id" placeholder="请选择">
                        <el-option label="管理员" :value="2"></el-option>
                        <el-option label="老师" :value="3"></el-option>
                        <el-option label="学生" :value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="status" label="状态" :label-width="formLabelWidth">
                    <el-select v-model="form.status" placeholder="请选择">
                        <el-option label="禁用" :value="0"></el-option>
                        <el-option label="启用" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="remark" label="用户备注" :label-width="formLabelWidth">
                    <el-input v-model="form.remark" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="sure">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
// 导入操作用户的方法
import { apiAddUser, apiUpdateUser } from '@/api/use'
export default {
    data() {
        return {
            // 控制面板显示和隐藏
            dialogFormVisible: false,
            // 区分新增与修改的功能
            isEdit: false,
            // 筛选的数据源
            form: {
                username: '',
                email: '',
                phone: '',
                role_id: '',
                status: '',
                remark: '',
                id: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入电话', trigger: 'blur' }
                ],
                role_id: [
                    { required: true, message: '请选择角色', trigger: 'change' }
                ],
                status: [
                    { required: true, message: '请选择状态', trigger: 'change' }
                ],
                remark: []
            },
            formLabelWidth: '100px'
        }
    },
    methods: {
        sure() {
            // 判断当前处理的逻辑
            if (this.isEdit) {
                // 编辑状态
                apiUpdateUser(this.form).then(res => {
                    if (res.data.code === 200) {
                        this.$message.success('用户修改成功')
                        // 关闭面板
                        this.dialogFormVisible = false
                        // 刷新数据
                        this.$parent.getUserList()
                    } else {
                        this.$message.error('用户修改失败')
                    }
                })
            } else {
                // 新增状态
                // 完成新增逻辑
                apiAddUser(this.form).then(res => {
                    // 判断是否成功
                    if (res.data.code === 200) {
                        this.$message.success('用户创建成功')
                        // 关闭面板
                        this.dialogFormVisible = false
                        // 刷新数据
                        this.$parent.getUserList()
                    } else {
                        this.$message.error('用户创建失败')
                    }
                })
            }
        }
    }
}
</script>

<style lang="less">
.prouser {
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
