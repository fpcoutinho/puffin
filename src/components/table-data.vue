<script async setup lang="ts">
import { computed, ref, onBeforeMount } from 'vue'
import { api } from '@/utils/api'
import { format } from '@/utils/format'

const tableData = ref()
const loading = ref(true)

onBeforeMount(async () => {
  const dados = await api.get('relatorios/')
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
</script>

<template>
  <div class="overflow-x-auto mt-14">
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
              <input type="checkbox" class="checkbox" :value="relatorio.id" :title="'relatorio ' + relatorio.id" />
            </label>
          </th>
          <td>
            {{ relatorio.local }}
          </td>
          <td>
            {{ format.data(relatorio.data) }}
          </td>
          <td>{{ relatorio.responsaveis }}</td>
          <td>{{ relatorio.clima }}</td>
          <td>{{ relatorio.temperatura }}</td>
          <th>
            <router-link :to="'/relatorios/' + relatorio.id" class="btn btn-ghost btn-xs">detalhes</router-link>
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