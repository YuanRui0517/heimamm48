<template>
    <div class="index">
        <el-container class="box">
            <!-- 头部 -->
            <el-header>
                <div class="left">
                    <i @click="iscollapse=!iscollapse" class="el-icon-s-fold"></i>
                    <img src="../../assets/index_logo.png" alt="">
                    <span>黑马面面</span>
                </div>
                <div class="right">
                    <!-- 图片 -->
                    <img :src="$store.state.userimg" alt="">
                    <!-- 名称 -->
                    <span class="word">{{ $store.state.username }}</span>
                    <el-button @click="logout" type="primary" size="mini">退出</el-button>
                </div>
            </el-header>
            <el-container class="contentbox">
                <!-- 菜单导航栏 -->
                <el-aside width="auto">
                    <!-- 开启路由模式 -->
                    <el-menu :router="true" :default-active="$route.path" class="el-menu-vertical-demo" :collapse="iscollapse">
                        <template v-for="(item, index) in child">
                            <!-- 
                                v-if="item.meta.roles.includes($store.state.role)"
                                // 判断：当前登录用户的角色是否被包含在 roles 中，如果被包含说明这个角色可以访问这个路由
                             -->
                            <el-menu-item :key="index" v-if="item.meta.roles.includes($store.state.role)" :index="item.meta.fullpath">
                                <i :class="item.meta.icon"></i>
                                <span slot="title">
                                    {{ item.meta.title }}
                                </span>
                            </el-menu-item>
                        </template>
                        <!-- <el-menu-item v-if="['管理员', '老师'].includes($store.state.role)" index="/index/user">
                                <i class="el-icon-user"></i>
                                <span slot="title">数据概览</span>
                            </el-menu-item>
                            <el-menu-item v-if="['管理员', '老师'].includes($store.state.role)" index="/index/user">
                                <i class="el-icon-user"></i>
                                <span slot="title">用户列表</span>
                            </el-menu-item>
                            <el-menu-item v-if="['管理员', '老师', '学生'].includes($store.state.role)" index="/index/question">
                                <i class="el-icon-edit"></i>
                                <span slot="title">题库列表</span>
                            </el-menu-item>
                            <el-menu-item v-if="['管理员'].includes($store.state.role)" index="/index/enterprise">
                                <i class="el-icon-office-building"></i>
                                <span slot="title">企业列表</span>
                            </el-menu-item>
                            <el-menu-item v-if="['管理员'].includes($store.state.role)" index="/index/subject">
                                <i class="el-icon-refrigerator"></i>
                                <span slot="title">学科列表</span>
                            </el-menu-item> -->
                    </el-menu>
                </el-aside>
                <!-- 内容区域 -->
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
// 导入方法
import { apiLogout } from '@/api/index.js'
// 导入操作 token 的方法
import { removeToken } from '@/utils/mytoken.js'
// 导入子路由
import child from '@/router/childRouter.js'
export default {
    data() {
        return {
            // 用户信息
            userInfo: {},
            // 用户头像
            imgUrl: '',
            // 是否折叠导航
            iscollapse: false,
            // 生成导航的数据源
            child: child
        }
    },
    methods: {
        // 退出登录
        logout() {
            // 弹出提示框
            this.$confirm('您确定要退出吗？', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 发送请求到服务器
                apiLogout().then(res => {
                    // 判断用户退出是否成功
                    if (res.data.code === 200) {
                        // 清除用户的 token 
                        removeToken()
                        // 跳转到登录页面
                        this.$router.push('/login')
                        // 提示用户退出成功
                        this.$message({
                            type: 'success',
                            message: '退出成功'
                        })
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消退出'
                })
            })
        }
    },
    // created() {
    //     // 登录是否存在 token(判断用户是否登录：)
    //     if (!getToken()) {
    //         // 如果没有 token 说明没有登录
    //         // 提示用户还未登录，
    //         this.$message.error('对不起，你还没有登录')
    //         // 跳转到登录页面
    //         this.$router.push('/login')
    //         // 中断后续代码的执行
    //         return
    //     }
    //     apiInfo().then(res => {
    //         // 判断 token 是否正确：状态为 200 说明请求成功
    //         if (res.data.code === 200) {
    //             // 将用户信息保存起来
    //             this.userInfo = res.data.data
    //             // 修改用户头像
    //             this.imgUrl = process.env.VUE_APP_URL + '/' + this.userInfo.avatar
    //         } else if (res.data.code === 206) {
    //             // 提示用户 token 错误
    //             this.$message.error('token错误')
    //             // 跳转到登录页面
    //             this.$router.push('/login')
    //         }
    //     })
    // }
}
</script>

<style lang="less">
.index,
.box,
.contentbox {
    height: 100%;
}

.el-header {
    background-color: #fff;
    color: #333;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
        display: flex;
        align-items: center;
        i {
            font-size: 24px;
            margin-right: 22px;
        }
        img {
            width: 33px;
            height: 28px;
            margin-right: 11px;
        }
        span {
            font-size: 22px;
            color: #49A1FF;
        }
    }
    .right {
        display: flex;
        align-items: center;
        img {
            width: 43px;
            height: 43px;
            border-radius: 50%;
            margin-right: 9px;
        }
        .word {
            font-size: 14px;
            margin-right: 38px;
        }
    }
}

.el-aside {
    background-color: #fff;
    color: #333;
}

.el-main {
    background-color: #E8E9EC;
    color: #333;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
</style>
