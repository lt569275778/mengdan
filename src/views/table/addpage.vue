<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :show="show"
    :close-on-click-modal="false"
    :show-close="false"
    :title="title"
    center
    width="30%"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="页面类型">
        <el-radio v-model="form.table" label="1">form+table</el-radio>
        <el-radio v-model="form.table" label="2">form+chart</el-radio>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="form.title"/>
      </el-form-item>
      <el-form-item label="页面状态">
        <el-radio v-model="form.loading" label="1">上线</el-radio>
        <el-radio v-model="form.loading" label="2">开发</el-radio>
        <el-radio v-model="form.loading" label="3">下线</el-radio>

      </el-form-item>
      <el-form-item label="是否等待超链接">
        <el-radio v-model="form.radio" label="1">是</el-radio>
        <el-radio v-model="form.radio" label="2">否</el-radio>
      </el-form-item>
      <el-form-item label="目录">
        <el-select v-model="value8" filterable clearable placeholder="请选择">
          <el-option
            v-for="item in muluoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="渠道">
        <el-select v-model="value9" filterable clearable placeholder="请选择">
          <el-option
            v-for="item in judaooptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="时间">
        <el-radio v-model="form.time" label="1">时间选择器</el-radio>
        <el-radio v-model="form.time" label="2">时间范围选择器</el-radio>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          :rows="2"
          v-model="form.textarea"
          type="textarea"
          placeholder="请输入内容"/>
      </el-form-item>
      <el-form-item label="过往数据对比">
        <el-checkbox v-model="form.checked">昨日数据</el-checkbox>
        <el-checkbox v-model="form.checked">7日前数据</el-checkbox>
      </el-form-item>
      <el-form-item label="默认展示时间天数">
        <el-input v-model="form.daytime" placeholder="请输入内容"/>
      </el-form-item>
      <el-form-item label="表名">
        <el-select v-model="value9" filterable clearable placeholder="请选择">

          <el-option
            v-for="item in tableoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>

      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitform">确 定</el-button>
      <el-button @click="cancle">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    },
    formdata: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      form: {
        name: ''
      },
      muluoptions: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }],
      judaooptions: [{
        value: '选项1',
        label: '黄金糕'
      }],
      value9: '',
      value8: '',
      value7: '',

      tableoptions: [{

        value: '选项2',
        label: '双皮奶'

      }]
    }
  },
  computed: {
    dialogVisible() {
      return this.show
    }
  },
  watch: {
    formdata() {
      if (this.formdata) {
        this.modifyform()
      }
    },
    deep: true
  },
  created() {
  },
  methods: {
    cancle() {
      this.$emit('listencancle', this.dialogVisible)
    },
    submitform() {
      this.$emit('listencancle', this.dialogVisible)
    },
    modifyform() {
      this.form = this.formdata
    }

  }
}
</script>

