import { Header } from "../../components/Header"
import { Summary } from "../../components/Summary"
import { SearchForm } from "./components/SearchForm"
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from "./styles"
import { TransactionContext } from "../../contexts/TransactionContext"
import { dateFormater, priceFormater } from "../../utils/formatter"
import { useContextSelector } from "use-context-selector"

export function Transactions() {
  const transactions = useContextSelector(TransactionContext, (context) => {
    return context.transactions
  })

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
                  <td width={"45%"}>{transaction.description}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      {/* && é para condicionais sem else */}
                      {transaction.type === "outcome" && "- "}
                      {priceFormater.format(transaction.price)}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>
                    {dateFormater.format(new Date(transaction.createdAt))}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}
