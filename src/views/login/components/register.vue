<template>
    <el-dialog :close-on-click-modal="false" class="reg_dialog" title="用户注册" :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="form" :rules="rules">
            <!-- 上传组件 -->
            <el-form-item prop="avator" label="头像" :label-width="formLabelWidth">
                <el-upload class="avatar-uploader" :action="imgUpload" name="image" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item prop="nickname" label="昵称" :label-width="formLabelWidth">
                <el-input v-model="form.nickname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="email" label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="phone" label="手机" :label-width="formLabelWidth">
                <el-input v-model="form.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码" :label-width="formLabelWidth">
                <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="code" label="图形码" :label-width="formLabelWidth">
                <el-row>
                    <el-col :span="17">
                        <el-input v-model="form.code" autocomplete="off"></el-input>
                    </el-col>
                    <el-col class="imgbox" :span="7">
                        <img @click="changeImg" class="codeimg" :src="imgUrl" alt="">
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item prop="logincode" label="验证码" :label-width="formLabelWidth">
                <el-row>
                    <el-col :span="17">
                        <el-input v-model="form.logincode" autocomplete="off"></el-input>
                    </el-col>
                    <el-col class="imgbox" :span="7">
                        <el-button :disabled="time !== 0" @click="getCode" class="reg_bnt">
                            {{ time === 0 ? '获取用户验证码' : time }}
                        </el-button>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancle">取 消</el-button>
            <el-button type="primary" @click="onsubmit">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
// 导入 得到手机验证码的方法
// import { apiGetCode, apiRegister } from '../../../api/register'
import { apiGetCode, apiRegister } from '@/api/register.js'
// 导入自定义校验方法
import { checkphone, checkemail } from '@/utils/mycheck.js'

// 定义校验方法
// var checkphone = function(rule, value, callback) {
//     // 定义一个手机的正则
//     var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
//     // 验证参数的合汉
//     if (reg.test(value)) {
//         callback()
//     } else {
//         callback(new Error('手机号不正确'))
//     }
// }
// var checkemail = function(rule, value, callback) {
//     // 定义一个邮箱的正则
//     var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
//     // 验证参数的合汉
//     if (reg.test(value)) {
//         callback()
//     } else {
//         callback(new Error('邮箱不合法'))
//     }
// }

export default {
    data() {
        return {
            // 控制对话框面板的打开和隐藏
            dialogFormVisible: false,
            // 说明说文本的宽度
            formLabelWidth: '67px',
            // form 的数据源
            form: {
                nickname: '',
                email: '',
                phone: '',
                password: '',
                code: '',
                logincode: '',
                avator: '' // 头像属性
            },
            rules: {
                avator: [
                    // 非空验证
                    { required: true, message: '头像不能为空', trigger: 'blur' },
                ],
                nickname: [
                    { required: true, message: '昵称不能为空', trigger: 'blur' },
                    { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '邮箱不能为空', trigger: 'blur' },
                    { validator: checkemail, trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '手机号不能为空', trigger: 'blur' },
                    { validator: checkphone, trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                ],
                code: [
                    { required: true, message: '图形码不能为空', trigger: 'blur' },
                    { min: 4, max: 4, message: '长度在 4 个字符', trigger: 'blur' }
                ],
                logincode: [
                    { required: true, message: '验证码不能为空', trigger: 'blur' },
                    { min: 4, max: 4, message: '长度在 4 个字符', trigger: 'blur' }
                ]
            },
            // 定义一个验证码图片的链接
            // imgUrl: 'http://127.0.0.1/heimamm/public' + '/captcha?type=sendsms&t=' + Math.random() // 随机数据
            imgUrl: process.env.VUE_APP_URL + '/captcha?type=sendsms&t=' + Date.now(), // 时间戳,
            // 定义一个定时器
            timer: null,
            // 禁用时间
            time: 0,
            // 上传的地址：
            imgUpload: process.env.VUE_APP_URL + `/uploads`,
            // 上传之后的图片内容
            imageUrl: null
        }
    },
    methods: {
        // 重置表单
        cancle() {
            // 得到 form 组件元素，用且调用 resetFields
            this.$refs.form.resetFields()
            // 手动清除图片
            this.imageUrl = ''
            // 关闭面板
            this.dialogFormVisible = false
        },
        onsubmit() {
            // 验证参数的合法性
            this.$refs.form.validate(valid => {
                if (valid) {
                    // 将注册的参数提交到服务器中
                    apiRegister({
                        username: this.form.nickname,
                        phone: this.form.phone,
                        email: this.form.email,
                        avatar: this.form.avator,
                        password: this.form.password,
                        rcode: this.form.logincode
                    }).then(res => {
                        // 判断注册是否成功
                        if (res.data.code === 200) {
                            // 提示用户注册成功
                            this.$message.success('注册成功')
                            // 关闭注册面板
                            this.dialogFormVisible = false
                            // 重新数据
                            this.$refs.form.resetFields()
                            this.imageUrl = ''
                        } else {
                            this.$message.error(res.data.message)
                        }
                    })
                } else {
                    this.$message.error('验证不通过')
                }
            })
        },
        // 点击切换验证码
        changeImg() {
            // 给验证码的地址重新设置路径
            this.imgUrl = process.env.VUE_APP_URL + `/captcha?type=sendsms&t=` + Date.now()
        },
        // 点击获取验证码按钮得到验证码
        getCode() {
            // 判断手机号是否合法
            // 定义一个手机号的正则：
            var phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
            // 判断手机号是否符合这个正则
            if (!phoneReg.test(this.form.phone)) {
                // 提示用户手机号不合法
                this.$message.error('手机号不合法')
                // 不执行后续的代码
                return
            }
            // 判断验证码是否合法
            if (this.form.code.trim().length !== 4) {
                return this.$message.error('验证码不合法')
            }
            // 判断验证码是否合法
            // 将时间设置为 60s
            this.time = 60
            // 添加一个定时器：判断当前按钮是否可以点击
            this.timer = setInterval(() => {
                if (this.time > 0) {
                    this.time--
                }
                // 当时间为0时，定时器清空
                if (this.time === 0) {
                    clearInterval(this.timer)
                }
            }, 100)
            // 得到手机验证码
            apiGetCode({
                code: this.form.code,
                phone: this.form.phone
            }).then(res => {
                // 判断：返回的状态是否为 200
                if (res.data.code === 200) {
                    // 将手机验证码输出
                    this.$message.success('手机验证码为：' + res.data.data.captcha)
                } else {
                    this.$message.error(res.data.message)
                }
            }).catch(() => {
                window.console.log('error')
            })
            // // 通过 axios 发送请求到服务器去接收手机验证码
            // axios({
            //     url: process.env.VUE_APP_ONLINEURL + '/sendsms',
            //     method: 'POST',
            //     data: {
            //         code: this.form.code,
            //         phone: this.form.phone
            //     },
            //     // 跨域时携带 cookie 
            //     withCredentials: true
            // }).then(res => {
            //     window.console.log(res)
            // }).catch(() => {
            //     window.console.log('出错啦')
            // })
        },
        // 上传成功后的回调函数
        //  res：服务器返回的信息
        //  file：上传的文件
        handleAvatarSuccess(res, file) {
            // 将已经上传好的图片显示到页面上: 
            // file.raw：上传的图片对象
            // URL.createObjectURL：
            this.imageUrl = URL.createObjectURL(file.raw);
            // 给 avator 赋值
            this.form.avator = res.data.file_path
            // console.log(res.data.file_path) // 上传过来的图片的路径
            // 单独给 avator 参数进行验证
            this.$refs.form.validateField('avator')
        },
        // 上传之前的回调函数
        //  file：上传的文件对象
        beforeAvatarUpload(file) {
            // 判断文件的类型是否是 image/jpeg
            const isJPG = file.type === 'image/jpeg' || 'image/png' || 'image/gif';
            // 判断文件的大小是否小于 2M
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    }
}
</script>

<style lang="less">
.reg_dialog {
    .el-dialog__header {
        text-align: center;
        padding: 0px;
        height: 53px;
        line-height: 53px; // 设置背景为渐变色
        background: linear-gradient(to right, #0dc1ef, #1394fc);
        .el-dialog__title {
            color: #fff;
        }
    }
    .imgbox {
        height: 41px;
        text-align: right;
        .codeimg {
            width: 143px;
            height: 41px;
        }
    }
    .reg_bnt {
        width: 143px;
        height: 41px;
    }
    .dialog-footer {
        text-align: center;
    }
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader {
    text-align: center;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
