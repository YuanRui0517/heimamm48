<template>
    <div>
        <!-- 这里的 value 是从父组件中传入的 -->
        <!-- 如果再在这里将 value 使用 v-model 传入到select 中-->
        <!-- 由于 v-model： 传入一个键为 value 的属性，
                接收一个函数名为 Input 的事件，这个事件会修改传入的值 -->
        <el-select class="formitem" :value="value" @input="v=>{$emit('input', v)}" placeholder="请选择学科">
            <el-option v-for="(item, index) in subjectList" :key="index" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <!-- <el-select class="formitem" v-model="value" placeholder="请选择学科">
            <el-option v-for="(item, index) in subjectList" :key="index" :label="item.name" :value="item.id"></el-option>
        </el-select>{{ subject }} -->
    </div>
</template>

<script>
// 导入得到学科数据的方法
import { apiGetSubject } from '../api/subject.js'
export default {
    props: ['value'],
    data() {
        return {
            // 选中学科的值
            // subject: '',
            // 学科的所有列表
            subjectList: []
        }
    },
    // watch: {
    //     subject: function() {
    //         // 当 subject 改变之后应该将数据交给外界
    //         this.$emit('input', this.subject)
    //     }
    // },
    methods: {
        // 得到所有学科的数据
        getSubject() {
            apiGetSubject({
                page: 1,
                limit: 10
            }).then(res => {
                this.subjectList = res.data.data.items
            })
        },
    },
    created() {
        // 将传入的学科的数据，赋值给 subject
        // this.subject = this.value
        // 得到学科的所有数据源
        this.getSubject()
    }
}
</script>

<style>

</style>
