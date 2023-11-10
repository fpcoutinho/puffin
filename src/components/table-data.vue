<script async setup lang="ts">
import { computed, ref, onBeforeMount } from 'vue'
import { api } from '../utils/api'

const tableData = ref()
const loading = ref(true)

onBeforeMount(async () => {
  const response = await api.login()
  const dados = await api.get('relatorios/', response?.token, response?.refreshToken)
  tableData.value = dados?.data.results
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

const dataFormatter = (data: string) => {
  const dataFormatada = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'America/Bahia'
  }).format(new Date(data))

  return dataFormatada
}
</script>

<template>
  <div class="overflow-x-auto">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th>
            <label>
              <input type="checkbox" class="checkbox" />
            </label>
          </th>
          <th>Local</th>
          <th>Data</th>
          <th>Responsaveis</th>
          <th>Clima</th>
          <th>Temperatura</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(relatorio, index) in filterTableData" :key="index" class="hover">
          <th>
            <label>
              <input type="checkbox" class="checkbox" />
            </label>
          </th>
          <td>
            {{ relatorio.local }}
          </td>
          <td>
            {{ dataFormatter(relatorio.data) }}
          </td>
          <td>{{ relatorio.responsaveis }}</td>
          <td>{{ relatorio.clima }}</td>
          <td>{{ relatorio.temperatura }}</td>
          <th>
            <button class="btn btn-ghost btn-xs">details</button>
          </th>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th></th>
          <th>Local</th>
          <th>Data</th>
          <th>Responsaveis</th>
          <th>Clima</th>
          <th>Temperatura</th>
          <th></th>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<style lang="scss">
@import '@/assets/component-styles/table-data.scss';
</style>