<template>
    <div class="editDialog">
        <el-dialog title="修改企业" :visible.sync="dialogFormVisible">
            <el-form ref="form" :model="form" :rules="rules">
                <el-form-item prop="name" label="企业名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="企业简称" :label-width="formLabelWidth">
                    <el-input v-model="form.short_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="企业介绍" :label-width="formLabelWidth">
                    <el-input v-model="form.intro" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="企业备注" :label-width="formLabelWidth">
                    <el-input v-model="form.remark" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="所属行业" :label-width="formLabelWidth">
                    <el-select v-model="form.tag">
                        <el-option value="金融" label="金融"></el-option>
                        <el-option value="互联网" label="互联网"></el-option>
                        <el-option value="电商" label="电商"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editEnt">确 定</el-button>
            </div>
            {{ form }}
        </el-dialog>
    </div>
</template>

<script>
// 导入修改数据的接口
import { apiUpdateEnt } from '../../../api/enterprise.js'
export default {
    data() {
        return {
            // 控制面板的显示和隐藏
            dialogFormVisible: false,
            // 表单元素中的数据源
            form: {
                id: '',
                name: '',
                tag: '',
                short_name: '',
                intro: '',
                remark: ''
            },
            // 添加校验规则
            rules: {
            },
            // 标题文本的宽度：
            formLabelWidth: `120px`
        }
    },
    methods: {
        editEnt() {
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
        }
    }
}
</script>

<style lang="less">
.editDialog {
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
