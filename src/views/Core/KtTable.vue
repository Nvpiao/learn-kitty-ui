<template>
  <div>
    <!--    表格栏-->
    <el-table :data="data.content" stripe highlight-current-row @selection-change="selectionChange"
              :v-loading="loading" :max-height="maxHeight" :size="size" :align="align" style="width: 100%">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column v-for="column in columns"
                       :prop="column.prop" :label="column.label" :width="column.minWidth"
                       :sortable="column.sortable" :fixed="column.fixed" :key="column.prop" :type="column.type">
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template slot-scope="scope">
          <kt-button label="编辑" :perms="permsEdit" :size="size"
                     @click="handleEdit(scope.$index, scope.row)"/>
          <kt-button label="删除" :perms="permsDelete" :size="size" type="danger"
                     @click="handleDelete(scope.$index, scope.row)"/>
        </template>
      </el-table-column>
    </el-table>
    <!--    分页栏-->
    <div class="toolbar" style="padding:10px">
      <kt-button label="批量删除" :perms="permsDelete" :size="size" type="danger"
                 @click="handleBatchDelete()" :disabled="this.selections === undefined || this.selections.length === 0" style="float: left"/>
      <el-pagination layout="total, prev, pager, next, jumper" @current-change="refreshPageRequest"
                     :current-page="pageRequest.pageNum" :page-size="pageRequest.pageSize"
                     :total="data.totalSize" style="float: right">
      </el-pagination>
    </div>
  </div>
</template>

<script>

  import KtButton from "@/views/Core/KtButton";

  export default {
    name: "KtTable",
    components: {
      KtButton
    },
    props: {
      columns: Array,
      data: Object,
      permsEdit: String,
      permsDelete: String,
      size: {
        type: String,
        default: 'mini'
      },
      align: {
        type: String,
        default: 'left'
      },
      maxHeight: {
        type: Number,
        default: 420
      }
    },
    data() {
      return {
        pageRequest: {
          pageNum: 1,
          pageSize: 8
        },
        loading: false,
        selections: []
      }
    },
    methods: {
      findPage() {
        this.$emit('findPage', {pageRequest: this.pageRequest})
      },
      selectionChange(selections) {
        this.selections = selections
      },
      refreshPageRequest(pageNum) {
        this.pageRequest.pageNum = pageNum
        this.findPage()
      },
      handleEdit(index, row) {
        this.$emit('handleEdit', {index: index, row: row})
      },
      handleDelete(index, row) {
        this.delete(row.id)
      },
      handleBatchDelete() {
        let ids = this.selections.map(item => item.id).toString()
        this.delete(ids)
      },
      delete(ids) {
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          let params = []
          let idArray = (ids + '').split(',')
          for (let i = 0; i < idArray.length; ++i) {
            params.push({'id': idArray[i]})
          }

          let callback = res => {
            this.$message({message: '删除成功', type: 'success'})
            this.findPage()
          }
          this.$emit('handleDelete', {params: params, callback: callback})
            .catch(() => {
            })
        })
      }
    },
    mounted() {
      this.refreshPageRequest(1)
    }
  }
</script>

<style scoped>

</style>
