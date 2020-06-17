<template>
    <div>
        <h1>使用Element</h1>
        <h3>1.0 使用输入框</h3>
        <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input1">
        </el-input>
        <h3>2.0 使用 element-china-area-data</h3>
        <el-cascader v-model="value" :props="{value: 'label'}" :options="optionsData"></el-cascader><br/> {{ value }}
        <h3>3.0 使用 vue-quill-editor</h3>
        <quill-editor :content="richContent"></quill-editor>
        <hr>
        <div>{{ richContent }}</div>
    </div>
</template>

<script>
// 导入省市区的数据
import { regionDataPlus } from 'element-china-area-data'
export default {
    data() {
        return {
            input1: '',
            // 级联框中绑定的数据
            value: '',
            // 保存省市区数据：级联框中的数据源
            optionsData: regionDataPlus,
            // 富文本编辑框中的内容
            richContent: 'abc'
        }
    }
}
</script>

<style>

</style>
