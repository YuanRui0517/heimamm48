<template>
    <el-cascader class="formitem" :value="value" :props="{ value: 'label' }" @input="v=>$emit('input', v)" :options="options">
    </el-cascader>
</template>

<script>
// 导入数据
import { regionDataPlus } from 'element-china-area-data'
export default {
    // 从外界接收 value:
    props: ['value'],
    data() {
        return {
            // 保存省市区数据
            options: regionDataPlus
        }
    }
}
</script>

<style>

</style>
