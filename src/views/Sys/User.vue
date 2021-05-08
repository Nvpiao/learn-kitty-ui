<template>
  <div class="container">
    <!--    工具栏-->
    <div class="tool-bar">
      <el-form :inline="true" :model="filters" size="small">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="findPage(null)">查询</el-button>
        </el-form-item>
        <el-form-item>
          <kt-button label="新增" perms="sys:user:add" type="primary" @click="handleAdd"/>
        </el-form-item>
      </el-form>
    </div>
    <!--    表格内容-->
    <kt-table permsEdit="sys:user:edit" permsDelete="sys:user:delete"
              :data="pageResult" :columns="columns"
              @findPage="findPage" @handleEdit="handleEdit" @handleDelete="handleDelete">
    </kt-table>
    <!--    新增编辑界面-->
    <el-dialog :title="operation ? '新增' : '编辑'" :visible.sync="editDialogVisible"
               :close-on-click-modal='false' width="40%">
      <el-form :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm">
        <el-form-item label="ID" prop="id" v-if="false" >
          <el-input v-model="dataForm.id" :disabled="true" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="dataForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="dataForm.password" type="password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="机构" prop="deptName">
          <popup-tree-input
            :data="deptData"
            :props="deptTreeProps"
            :prop="dataForm.deptName"
            :nodeKey="'' + dataForm.deptId"
            :currentChangeHandle="deptTreeCurrentChangeHandle">
          </popup-tree-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="dataForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="dataForm.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native='editDialogVisible = false'>取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import PopupTreeInput from '@/components/PopupTreeInput'
  import KtTable from "@/views/Core/KtTable";
  import KtButton from "@/views/Core/KtButton";

  export default {
    name: 'User',
    components: {
      PopupTreeInput,
      KtTable,
      KtButton
    },
    data() {
      return {
        filters: {
          name: ''
        },
        columns: [
          {prop:'id', label: 'ID', minWidth:80, sortable:'false'},
          {prop: 'name', label: '用户名', minWidth: 200, sortable: 'true'},
          {prop: 'deptName', label: '用户名', minWidth: 200, sortable: 'true'},
          {prop: 'email', label: '邮箱', minWidth: 200, sortable: 'true'},
          {prop: 'mobile', label: '手机', minWidth: 200, sortable: 'true'}
        ],
        pageRequest: {pageNum: 1, pageSize: 8},
        pageResult: {},

        operation:false,
        editDialogVisible:false,
        editLoading: false,
        dataFormRules: {
          name: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ]
        },
        dataForm: {
          id:0,
          name:'',
          password: '123456',
          deptId: 1,
          deptName: '',
          email: 'test@gmail.com',
          status: 1
        },
        deptData: [],
        deptTreeProps: {
          label: 'name',
          children: 'children'
        }
      }
    },
    methods: {
      findPage(data) {
        if (data !== null) {
          this.pageRequest = data.pageRequest
        }
        this.pageRequest.columnFilters = {name: {name:'name', value: this.filters.name}}
        this.$api.user.findPage(this.pageRequest)
        .then(res => {
          this.pageResult = res.data
        })
      },
      handleDelete(data) {
        this.$api.user.del(data.params).then(data.callback)
      },
      handleAdd() {
        this.editDialogVisible = true
        this.operation = true
        this.dataForm = {
          id:0,
          name: '',
          password: "",
          deptName: '',
          email: "test@gmail.com",
          mobile:'13012345678',
          status: 1
        }
      },
      handleEdit(params) {
        this.editDialogVisible = true
        this.operation = false
        this.dataForm = Object.assign({}, params.row)
      },
      editSubmit() {
        this.$refs.dataForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {
              type:'info'
            }) .then(() => {
              this.editLoading = true
              let params = Object.assign({}, this.dataForm)
              this.$api.user.save(params).then(res => {
                this.editLoading = false
                this.$message({message:'提交成功', type: 'success'})
                this.$refs['dataForm'].resetFields()
                this.editDialogVisible = false
                this.findPage(null)
              })
            })
          }
        })
      },
      findDeptTree() {
        this.$api.dept.findDeptTree().then(res => {
          this.deptData = res.data
        })
      },
      deptTreeCurrentChangeHandle(data, node) {
        this.dataForm.deptId = data.id
        this.dataForm.deptName = data.name
      }
    },
    mounted() {
      this.findDeptTree()
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    .tool-bar {
      margin-left: 10px;
      float: left;
    }
  }

</style>
