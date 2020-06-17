<template>
    <div class="oneradio">
        <el-radio :label="label">
            <span class="span">{{label}}</span>
            <el-input class="ipt" :value="text" @input="v=>$emit('changetext', v)"></el-input>
            <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-radio>
    </div>
</template>

<script>
export default {
    // 接收参数
    props: ['label', 'text', 'image'],
    data() {
        return {
            // 图片上传的路径
            uploadUrl: process.env.VUE_APP_URL + `/question/upload`,
            // 上传后的图片信息
            imageUrl: process.env.VUE_APP_URL + this.image
        }
    },
    methods: {
        // 上传成功后的回调函数
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            // 得到修改后的图片地址
            var imgPath = res.data.url
            // 当图片上传成功之后，应该将修改后的图片数据发送给外界的 select_options 中的 images 里
            this.$emit('changeImg', imgPath)
        },
        // 上传之前的回复调用函数
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg' || 'image/png' || 'image/gif';
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
.oneradio {
    .el-radio {
        display: flex;
        align-items: center;
    }
    .el-radio__label {
        display: flex;
        align-items: center;
    }
    .span {
        margin: 0px 30px 0 10px;
    }
    .ipt {
        margin-right: 20px;
        width: 450px;
    }
    .upload {}
}
</style>
