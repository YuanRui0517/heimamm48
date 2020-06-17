<template>
    <el-dialog class="adddialog" :fullscreen="true" title="新增题库" :visible.sync="dialogFormVisible">
        <el-form label-position="left" class="addform" :model="form">

            <!-- 学科 -->
            <el-form-item class="itemform" label="学科" :label-width="formLabelWidth">
                <subjectcom v-model="form.subject" />
            </el-form-item>
            <!-- 阶段 -->
            <el-form-item class="itemform" label="阶段" :label-width="formLabelWidth">
                <el-select class="formitem" v-model="form.step" placeholder="请选择阶段">
                    <el-option label="请选择" value=""></el-option>
                    <el-option label="初级" :value="1"></el-option>
                    <el-option label="中级" :value="2"></el-option>
                    <el-option label="高级" :value="3"></el-option>
                </el-select>
            </el-form-item>
            <!-- 企业 -->
            <el-form-item class="itemform" label="企业" :label-width="formLabelWidth">
                <entcom v-model="form.enterprise" />
            </el-form-item>
            <!-- 城市 -->
            <el-form-item class="itemform" label="城市" :label-width="formLabelWidth">
                <mycity v-model="form.city" /> {{ form.city }}
            </el-form-item>
            <!-- 题型 -->
            <el-form-item class="itemform" label="题型" :label-width="formLabelWidth">
                <el-radio-group v-model="form.type">
                    <el-radio :label="1">单选</el-radio>
                    <el-radio :label="2">多选</el-radio>
                    <el-radio :label="3">简答</el-radio>
                </el-radio-group>
            </el-form-item>
            <!-- 难度 -->
            <el-form-item class="itemform" label="难度" :label-width="formLabelWidth">
                <el-radio-group v-model="form.difficulty">
                    <el-radio :label="1">简单</el-radio>
                    <el-radio :label="2">一般</el-radio>
                    <el-radio :label="3">困难</el-radio>
                </el-radio-group>
            </el-form-item>
            <!-- 分割线 -->
            <el-divider></el-divider>
            <!-- 试题标题区域 -->
            <el-form-item label="试题标题" :label-width="formLabelWidth">
                <!-- 富文本编辑框 -->
                <quill-editor @change="titleChange($event)" :content="form.title" />{{ form.title }}
            </el-form-item>
            <!-- 出题区 -->
            <el-form-item v-if="form.type === 1" label="单选" :label-width="formLabelWidth">
                <el-radio-group v-model="form.single_select_answer">
                    <myradio :label="item.label" :text="item.text" @changetext="v=>{item.text=v}" :image="item.image" @changeImg="v=>item.image=v" v-for="(item, index) in form.select_options" :key="index" />
                </el-radio-group>
                {{ form.single_select_answer }}
            </el-form-item>
            <el-form-item v-if="form.type === 2" label="多选" :label-width="formLabelWidth">
                <el-checkbox-group v-model="form.multiple_select_answer">
                    <!-- 分别传入 label text image -->
                    <mycheckbox :label="item.label" :text="item.text" @changetext="v=>item.text=v" :image="item.image" @changeimage="v=>item.image=v" v-for="(item, index) in form.select_options" :key="index" />
                </el-checkbox-group>
                {{ form.multiple_select_answer }}
            </el-form-item>
            <el-form-item v-if="form.type === 3" label="简答" :label-width="formLabelWidth">
                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.short_answer">
                </el-input>
            </el-form-item>
            <!-- 分割线 -->
            <el-divider></el-divider>
            <!-- 解析视频 -->
            <el-form-item label="解析视频" :label-width="formLabelWidth">
                <uploadvideo v-model="form.video" />
            </el-form-item>
            <!-- 分割线 -->
            <el-divider></el-divider>
            <!-- 答案解析 -->
            <el-form-item label="答案解析" :label-width="formLabelWidth">
                <!-- 富文本编辑框 -->
                <quill-editor :content="form.answer_analyze" @change="changeans($event)" />
            </el-form-item>
            <!-- 分割线 -->
            <el-divider></el-divider>
            <!-- 试题备注 -->
            <el-form-item label="试题备注" :label-width="formLabelWidth">
                <!-- 富文本编辑框 -->
                <el-input v-model="form.remark" />
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addQ">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
// 导入单选框组件
import myradio from './myradio.vue'
// 导入多选框组件
import mycheckbox from './mycheckbox.vue'
// 导入视频上传组件
import uploadvideo from './uploadvideo'
// 导入新增的方法
import { apiAddQuestion } from '../../../api/question.js'
export default {
    data() {
        return {
            dialogFormVisible: false,
            // 定义需要新增的数据
            form: {
                title: '我是标题', // 试题的标题
                subject: 97, // 所属学科
                step: '', // 阶段： 1 初级 2 中级 3 高级
                enterprise: '', // 企业标识
                city: [], // 城市
                type: 1, // 类型
                difficulty: 1, // 难度 1简单 、2一般 、3困难
                single_select_answer: '', // 单选题答案
                multiple_select_answer: [], // 多选题答案
                short_answer: '', // 简答
                video: '', // 视频路径
                answer_analyze: '', // 答案解析
                remark: '', // 答案备注
                select_options: [
                    {
                        "label": "A",
                        "text": "狗不理",
                        "image": "upload/20191129/fd5f03a07d95e3948860240564b180e4.jpeg"
                    },
                    {
                        "label": "B",
                        "text": "猫不理",
                        "image": "upload/20191129/e93e7bb72accda7f3159cdabc4203991.jpeg"
                    },
                    {
                        "label": "C",
                        "text": "麻花",
                        "image": "upload/20191129/b7caf98be9d0aa6764b0112ba0dfa19e.jpeg"
                    },
                    {
                        "label": "D",
                        "text": "炸酱面",
                        "image": "upload/20191129/4067f19ab53a5e8388ad3459e23110f0.jpeg"
                    }
                ] // 这个数据是单选 & 多选中的数据源：选项，介绍，图片介绍
            },
            formLabelWidth: '120px',
        }
    },
    methods: {
        // 添加题库
        addQ() {
            apiAddQuestion(this.form).then(res => {
                if (res.data.code === 200) {
                    this.$message.success('新增成功')
                    this.dialogFormVisible = false
                    this.$parent.getQuestionList()
                }
            })
        },
        // 标题富文本框改变时触发
        titleChange(e) {
            // 当富文本编辑框中的内容改变时，应该修改 title 属性
            this.form.title = e.text
        },
        // 答案改时会触发
        changeans(e) {
            this.form.answer_analyze = e.text
        }
    },
    components: {
        myradio,
        mycheckbox,
        uploadvideo
    }
}
</script>

<style lang="less">
.adddialog {
    .addform {
        width: 835px;
        margin: 0 auto;
    }
    .itemform {
        .el-form-item__content {
            .formitem {
                width: 375px;
            }
        }
    }
    .el-dialog__header {
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
