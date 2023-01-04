<template>
  <div :id="id" :class="className" style="width: 1000px; height: 100px">
    <el-button
      type="primary"
      icon="el-icon-upload"
      style="position: absolute; top: 20px; margin-left: 40px"
      @click="imagecropperShow = true"
    >
      Upload
    </el-button>

    <image-cropper
      v-show="imagecropperShow"
      :key="imagecropperKey"
      :width="300"
      :height="300"
      url="https://httpbin.org/post"
      lang-type="en"
      @close="close"
      @crop-upload-success="cropSuccess"
    />
  </div>
</template>

<script>
import ImageCropper from "@/components/ImageCropper";

export default {
  name: "AvatarUploadDemo",
  components: { ImageCropper },
  props: {
    className: {
      type: String,
      default: "upload",
    },
    id: {
      type: String,
      default: "upload",
    },
    width: {
      type: String,
      default: "200px",
    },
    height: {
      type: String,
      default: "200px",
    },
  },
  data() {
    return {
      imagecropperShow: false,
      imagecropperKey: 0,
      image: "https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191",
    };
  },
  methods: {
    cropSuccess(resData) {
      this.imagecropperShow = false;
      this.imagecropperKey = this.imagecropperKey + 1;
      this.image = resData.files.avatar;
    },
    close() {
      this.imagecropperShow = false;
    },
  },
};
</script>

<style scoped>
.avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
</style>

