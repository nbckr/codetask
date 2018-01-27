<template>
  <div>
    <h1>Neuen Kurs hochladen</h1>

    <form @submit.prevent="submit">
      <el-row :gutter="40">

        <el-col :xs="24" :md="12">
          <el-row class="form-row">
            <el-upload
              ref="upload"
              id="file"
              accept="application/json"
              action="#"
              :multiple="false"
              :show-file-list="true"
              :on-change="onCourseFileChange"
              :auto-upload="false">

              <el-button>Datei hochladen</el-button>
              <div class="el-upload__tip" slot="tip">CodeTask-Kurs im JSON-Format</div>
            </el-upload>
          </el-row>

          <!-- el-input will compile to input, so the label will find its input element after compilation -->
          <el-row class="form-row">
            <label for="title">Titel</label>
            <el-input id="title" placeholder="Titel deines neuen Kurses" v-model="course.title" :maxlength="42"/>
          </el-row>

          <el-row class="form-row">
            <label for="description">Beschreibung</label>
            <el-input
              id="description"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 10}"
              :maxlength="1000"
              placeholder="Eine kurze Beschreibung des Kursinhalts"
              v-model="additional.description"
            >
            </el-input>
          </el-row>
        </el-col>

      </el-row>
      <el-col>
        <el-row type="flex" justify="end">
          <el-button @click="submit" :disabled="false" type="primary">Kurs anlegen</el-button>
        </el-row>
      </el-col>

    </form>

    <p style="white-space: pre; display: none">{{ course }}</p>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        course: {},

        // Additional attributes that extend the original data model
        additional: {}
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
          this.$refs.upload.uploadFiles = [this.$refs.upload.uploadFiles[1]]
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
      },

      submit (e) {
        // TODO: new Course(), add to db, show success
        console.log(e)
        const course = {...this.course, ...this.additional}
        console.log(course)
        this.course = {}
        this.additional = {}
      }
    }
  }
</script>

<style scoped>
  label {
    display: inline-block;
    width: 11rem;
  }

  .form-row {
    display: flex;
    align-items: center;
    margin: 1rem 0;
  }
</style>
