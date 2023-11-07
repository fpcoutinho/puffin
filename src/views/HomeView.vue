<script async setup lang="ts">
import { computed, ref, onBeforeMount } from 'vue'
import { api } from '../utils/api'

const tableData = ref()
const loading = ref(true)
onBeforeMount(async () => {
  const response = await api.login()
  const dados = await api.get('relatorios/', response?.token)
  tableData.value = dados.results
  loading.value = false
})

const search = ref('')
const filterTableData = computed(() => {
  if (!tableData.value) return []

  return tableData.value.filter(
    (data: { local: string }) =>
      !search.value ||
      data.local.toLowerCase().includes(search.value.toLowerCase())
  )
})

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
  <div class="home">
    <Transition name="slide-fade" mode="out-in">
      <el-table v-show="!loading" :data="filterTableData" :default-sort="{ prop: 'data', order: 'descending' }"
        style="width: 100%">
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
            <el-button size="small" type="success" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </Transition>
  </div>
</template>

<style>
.home {
  padding: 2rem;
}

@media (min-width: 1024px) {
  .home {
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 0;
  }
}
</style>
