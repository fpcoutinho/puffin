<script setup lang="ts">
import { onBeforeMount, computed, ref } from 'vue'
import { api } from '../utils/api'


const tableData = ref()
onBeforeMount(async () => {
  try {
    const response = await api.login()
    const dados = await api.get('relatorios/', response?.token)
    tableData.value = dados.results
  } catch (error) {
    console.log(error)
  }
})

const search = ref('')
const filterTableData = computed(() =>
  tableData.value.filter(
    (data: { local: string }) =>
      !search.value ||
      data.local.toLowerCase().includes(search.value.toLowerCase())
  )
)
const handleEdit = (index: number, row: object) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: object) => {
  console.log(index, row)
}

const dataFormatter = (row: { data: string }) => {
  const dataFormatada = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'America/Bahia'
  }).format(new Date(row.data))

  return dataFormatada
}
</script>

<template>
  <div class="about">
    <el-table :data="filterTableData" :default-sort="{ prop: 'data', order: 'descending' }" style="width: 100%">
      <el-table-column label="Local" prop="local" sortable />
      <el-table-column label="Data" prop="data" :formatter="dataFormatter" sortable />
      <el-table-column label="Responsáveis" prop="responsaveis" sortable />
      <el-table-column label="Clima" prop="clima" sortable />
      <el-table-column label="Temperatura" prop="temperatura" sortable />
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="small" placeholder="Type to search" />
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
