<template>
  <div>
    <h1>Neuen Kurs hochladen</h1>

    <form @submit.prevent="onSubmit">
      <el-row :gutter="40">

        <!----------------------------------------------------- File Upload -->
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
              :auto-upload="false"
            >

              <el-button>Datei hochladen</el-button>
              <div class="el-upload__tip" slot="tip">CodeTask-Kurs im JSON-Format</div>
            </el-upload>
          </el-row>

          <!-- el-input will compile to input, so the label will find its input element after compilation -->
          <!----------------------------------------------------- Title and description -->
          <el-row class="form-row">
            <label for="title">Titel</label>
            <el-input
              id="title"
              placeholder="Titel deines neuen Kurses"
              :maxlength="42"
              v-model="course.title"
              @input="$v.course.title.$touch()"
            />
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

      <!----------------------------------------------------- Submit -->
      <el-col>
        <el-row type="flex" justify="end">
          <el-button
            @click="onSubmit"
            :disabled="$v.$invalid || this.$refs.upload.uploadFiles.length === 0"
            native-type="submit"
            type="primary"
          >
            Kurs anlegen
          </el-button>
        </el-row>
      </el-col>

    </form>

    <p style="white-space: pre; display: none">{{ course }}</p>

    <div style="font-size: x-small; white-space: pre; display: none;">
      {{ course.title }}
      {{ $v }}
    </div>

  </div>
</template>

<script>
  import { required, minLength, maxLength } from 'vuelidate/lib/validators'

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

      onSubmit (e) {
        const course = {...this.course, ...this.additional}
        this.transformCourse(course)

        this.$store.dispatch('ADD_NEW_COURSE', course)
          .then(() => {
            this.$notify({
              title: 'Kurs angelegt',
              message: `Der Kurs "${course.title}" wurde erfolgreich angelegt.`,
              type: 'success',
              offset: 61
            })
            this.$refs.upload.clearFiles()
            this.course = {}
            this.additional = {}
          })
      },

      // Adjustments to the old data model
      transformCourse (course) {
        course.chapters.forEach(chapter => {
          chapter.tasks = chapter.tasks
          // NOTE: Filtering code-tasks because of currently broken backend functionality
            .filter(task => task.tag !== 'code-task')
            // Numeric indices starting at 1 instead of task-specific strings
            .map((task, index) => {
              task.id = index + 1
              return task
            })
        })
        // Use unique ids
        course.id = Date.now()
      }
    },

    validations: {
      course: {
        title: {
          required,
          minLength: minLength(6),
          maxLength: maxLength(42)
        }
      },
      additional: {
        description: {
          required,
          minLength: minLength(15),
          maxLength: maxLength(150)
        }
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
