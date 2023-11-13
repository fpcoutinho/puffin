export const format = {
  data: (date: string) => {
    const dataFormatada = new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'long',
      timeStyle: 'short',
      timeZone: 'America/Bahia'
    }).format(new Date(date))

    return dataFormatada
  },
}