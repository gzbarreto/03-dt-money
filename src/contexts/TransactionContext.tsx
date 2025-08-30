import { createContext, useEffect, useState } from "react"

interface Transaction {
  id: number
  description: string
  type: "income" | "outcome"
  price: number
  category: string
  createdAt: string
}

interface TransactionContextType {
  transactions: Transaction[]
}

interface TransactionProviderProps {
  children: React.ReactNode
}

export const TransactionContext = createContext({} as TransactionContextType)

export function TransactionProvider({ children }: TransactionProviderProps) {
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
    <TransactionContext.Provider value={{ transactions }}>
      {children}
    </TransactionContext.Provider>
  )
}
