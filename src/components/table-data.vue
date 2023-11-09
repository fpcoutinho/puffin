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

const dataFormatter = (row: { data: string }) => {
  const dataFormatada = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'America/Bahia'
  }).format(new Date(row.data))

  return dataFormatada
}
</script>

<template></template>

<style lang="scss">
@import '@/assets/component-styles/table-data.scss';
</style>