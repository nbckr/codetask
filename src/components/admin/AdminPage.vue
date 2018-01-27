<template>
  <div>
    <h1>Neue Kurse hochladen</h1>

    <input type="text" v-model="course.title">
    <p>{{ course }}</p>

    <el-upload
      ref="upload"
      accept="application/json"
      action="#"
      :multiple="false"
      :show-file-list="true"
      :on-change="onCourseFileChange"
      :auto-upload="false">

      <el-button size="small" type="primary">Datei auswählen</el-button>
      <div class="el-upload__tip" slot="tip">CodeTask-Kurs im JSON-Format</div>
    </el-upload>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        course: {}
      }
    },

    methods: {
      onCourseFileChange (e) {
        const file = e.raw
        if (!file) {
          return
        }

        // new file automatically bound to value, but to also update visual file-list
        if (this.$refs.upload.uploadFiles.length > 1) {
          this.$refs.upload.uploadFiles = [ this.$refs.upload.uploadFiles[1] ]
        }

        this.uploadCourse(file)
      },

      uploadCourse (file) {
        const reader = new FileReader()
        const vm = this

        reader.onload = (e) => {
          const resultBase64 = e.target.result.split(',')[1]
          vm.course = JSON.parse(atob(resultBase64))
        }
        reader.readAsDataURL(file)
      },

      removeCourse: function (e) {
        this.course = {}
      }
    }
  }
</script>

<style scoped>
</style>
