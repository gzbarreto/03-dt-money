import { useEffect, useState } from "react"
import { Header } from "../../components/Header"
import { Summary } from "../../components/Summary"
import { SearchForm } from "./components/SearchForm"
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from "./styles"

interface Transaction {
  id: number
  description: string
  type: "income" | "outcome"
  price: number
  category: string
  createdAt: string
}

export function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function fetchTransactions() {
    //fetch é uma API nativa do JavaScript para fazer requisições HTTP
    //await espera a resposta da requisição antes de continuar a execução do código
    //fetch retorna uma Promise, por isso usamos o await
    //o fetch por padrão faz uma requisição GET
    const response = await fetch("http://localhost:3333/transactions")
    const data = await response.json()
    setTransactions(data)
  }

  useEffect(() => {
    fetchTransactions()
  }, []) //ao passar um array vazio, o useEffect só é executado uma vez, quando o componente é montado na tela

  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td width={"50%"}>{transaction.description}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      R$ {transaction.price}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>{transaction.createdAt}</td>
                </tr>
              )
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}
