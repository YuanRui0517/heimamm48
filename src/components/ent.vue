<template>
    <div>
        <el-select class="formitem" :value="value" @input="v=>{$emit('input', v)}" placeholder="请选择企业">
            <el-option v-for="(item, index) in enterpriseList" :key="index" :label="item.name" :value="item.id"></el-option>
        </el-select> {{ value }}
    </div>
</template>

<script>
// 导入得到企业数据的方法
import { apiGetList } from '../api/enterprise.js'
export default {
    // 接收参数
    props: ['value'],
    data() {
        return {
            // 企业列表的数据源
            enterpriseList: []
        }
    },
    methods: {
        getenterprise() {
            apiGetList({
                page: 1,
                limit: 10
            }).then(res => {
                this.enterpriseList = res.data.data.items
            })
        },
    },
    created() {
        // 得到企业下拉框中的数据源
        this.getenterprise()
    }
}
</script>

<style>

</style>
