//arquivo para formatação de valores ao longo da aplicação
//Intl é uma API nativa do JavaScript para formatação de números, datas e moedas

export const dateFormater = new Intl.DateTimeFormat("pt-BR")

export const priceFormater = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
})