<template>
    <div class="oneradio">
        <el-checkbox :label="label">
            <span class="span">{{ label }}</span>
            <el-input class="ipt" placeholder="请输入内容" :value="text" @input="v=>$emit('changetext', v)"></el-input>
            <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-checkbox>
    </div>
</template>

<script>
export default {
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
            // 将改变后的图片发送给外界
            this.$emit('changeimage', res.data.url)
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
    .el-checkbox {
        display: flex;
        align-items: center;
    }
    .el-checkbox__label {
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
}
</style>
