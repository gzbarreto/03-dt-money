import { useContext } from "react"
import { TransactionContext } from "../contexts/TransactionContext"

export function useSummary() {
  const { transactions } = useContext(TransactionContext)

  //reduce reduz um array a uma outra estrutura de dados
  //aqui, uma transaction se torna um objeto {income: number, outcome: number, total: number}
  //composto por uma função callback que recebe dois parâmetros: o acumulador e o valor atual; e um valor inicial para o acumulador,
  //que também vai representar a nova estrutura de dados
  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "income") {
        acc.income += transaction.price
        acc.total += transaction.price
      } else {
        acc.outcome += transaction.price
        acc.total -= transaction.price
      }

      return acc
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    }
  )

  return summary
}
