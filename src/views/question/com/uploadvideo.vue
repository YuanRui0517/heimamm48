<template>
    <div>
        <el-upload class="upload-demo" :action="moviePath" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传视频格式文件</div>
        </el-upload>
        <!-- 添加一个容器用来显示将来上传好的视频 -->
        <video style="width: 300px; height: 150px;" v-if="videoURL" :src="videoURL" controls loop></video>
    </div>
</template>

<script>
export default {
    props: ['value'],
    data() {
        return {

            // 上传视频的路径
            moviePath: process.env.VUE_APP_URL + `/question/upload`,
            // 视频路径
            videoURL: ''
        }
    },
    methods: {
        // 上传成功后的回调
        handleAvatarSuccess(res, file) {
            // 将上传好的视频文件赋值给 videoURL
            this.videoURL = URL.createObjectURL(file.raw);
            // 将视频的路径返回
            this.$emit('input', res.data.url)
        },
        // 上传之前的回调
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'video/mp4';
            const isLt2M = file.size / 1024 / 1024 < 8;
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

<style>

</style>
