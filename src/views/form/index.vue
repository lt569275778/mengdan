<template>
  <div class="app-container">
    <el-button type="success" class="addm" @click="addsame">添加菜单</el-button>
    <el-table
      :data="gourplist"
      :highlight-current-row="true"
      border
      resizable
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table
            :data="props.row.children"
            border
            resizable
            style="width: 100%">
            <el-table-column
              prop="id"
              label="序号"/>
            <el-table-column
              prop="title"
              label="标题"
            />
            <el-table-column
              prop="level"
              label="级别"
            />
            <el-table-column
              prop="comment"
              label="备注"/>
            <el-table-column
              fixed="right"
              label="操作"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="addsame(scope.row.id,scope.row.level)">添加同级</el-button>
                <el-button type="text" size="small" @click="modify(scope.row.id)">编辑</el-button>
                <el-button type="text" size="small" @click="deletesame(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column
        prop="id"
        label="序号"/>
      <el-table-column
        prop="title"
        label="标题"
      />
      <el-table-column
        prop="level"
        label="级别"
      />
      <el-table-column
        prop="comment"
        label="备注"/>
      <el-table-column
        fixed="right"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addsame(scope.row.id,scope.row.level)">添加同级</el-button>
          <el-button type="text" size="small" @click="addchild(scope.row.id)">添加子级</el-button>
          <el-button type="text" size="small" @click="modify(scope.row.id)">编辑</el-button>
          <el-button type="text" size="small" @click="deletesame(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :visible.sync="dialogVisible"
      :title="title1"
      center
      width="30%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.title"/>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.comment"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitform">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.addm{
  margin: 20px
}
.line {
  text-align: center;
}
</style>

<script>
import { mapState } from 'vuex'
import { addmeunlist } from '../../api/api.js'
export default {
  data() {
    return {
      dialogVisible: false,
      form: {},
      title1: '',
      tablist: [],
      formparentid: {},
      menuid: '',
      numb: 0
    }
  },
  computed: {
    ...mapState({
      gourplist: state => state.group.gourplist
    })
  },
  mounted() {
    const ids = {
      subid: JSON.parse(localStorage.getItem('twoid')).subid,
      envid: JSON.parse(localStorage.getItem('twoid')).envid
    }
    this.$store.dispatch('getgrourplist', ids)
  },
  methods: {
    dialog() {
      this.dialogVisible = true
    },
    addsame(id, level) {
      console.log(id)
      this.form.parentID = id
      if (level === '0') {
        this.form.level = 0
      } else {
        this.form.level = 1
      }
      console.log(this.form)
      console.log(JSON.parse(localStorage.getItem('twoid')).subid)
      this.formparentid.subid = JSON.parse(localStorage.getItem('twoid')).subid
      this.formparentid.envid = JSON.parse(localStorage.getItem('twoid')).envid
      console.log(this.form)
      this.dialog()
      this.title1 = '添加同级'
    },
    submitform() {
      if (this.title1 === '添加同级') {
        const one1 = this.formparentid.subid
        const two2 = this.formparentid.envid
        addmeunlist(one1, two2, this.form).then(res => {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          const ids = {
            subid: JSON.parse(localStorage.getItem('twoid')).subid,
            envid: JSON.parse(localStorage.getItem('twoid')).envid
          }
          this.$store.dispatch('getgrourplist', ids)
          this.dialogVisible = false
        })
      } else if (this.title1 === '修改') {
        this.form.parentID = this.formparentid.parentID
        this.$store.dispatch('modifymenulist', this.form).then(res => {
          if (res.code === 500) {
            this.$message({
              type: 'success',
              message: res.msg
            })
          } else {
            const ids = {
              subid: JSON.parse(localStorage.getItem('twoid')).subid,
              envid: JSON.parse(localStorage.getItem('twoid')).envid
            }
            this.$store.dispatch('getgrourplist', ids)
            this.$message({
              type: 'success',
              message: '修改成功!'
            })

            this.dialogVisible = false
          }
        })
      } else if (this.title1 === '添加子级') {
        const one1 = this.formparentid.subid
        const two2 = this.formparentid.envid
        addmeunlist(one1, two2, this.form).then(res => {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          const ids = {
            subid: JSON.parse(localStorage.getItem('twoid')).subid,
            envid: JSON.parse(localStorage.getItem('twoid')).envid
          }
          this.$store.dispatch('getgrourplist', ids)
          this.dialogVisible = false
        })
      }

      // this.$store.dispatch('addmeun', JSON.stringify(this.form))
    },
    addchild(id) {
      this.dialog()
      this.title1 = '添加子级'
      this.form.level = 1

      this.form.parentID = id
      console.log(JSON.parse(localStorage.getItem('twoid')).subid)
      this.formparentid.subid = JSON.parse(localStorage.getItem('twoid')).subid
      this.formparentid.envid = JSON.parse(localStorage.getItem('twoid')).envid
    },
    modify(id) {
      console.log(id)

      this.formparentid.parentID = id
      this.dialog()
      this.title1 = '修改'
    },
    deletesame(id) {
      this.numb++
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store.dispatch('deletemenulist', id).then(res => {
            console.log(res)
            if (res.code === 500) {
              this.$message({
                type: 'success',
                message: res.msg
              })
            } else {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }
            const ids = {
              subid: JSON.parse(localStorage.getItem('twoid')).subid,
              envid: JSON.parse(localStorage.getItem('twoid')).envid
            }
            this.$store.dispatch('getgrourplist', ids)
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>
