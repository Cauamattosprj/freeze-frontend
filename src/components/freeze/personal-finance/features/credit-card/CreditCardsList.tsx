import { useGetCreditCardsQuery } from '#/hooks/creditCardsHooks'
import CreateCreditCard from './CreateCreditCard'
import CreditCard from './CreditCard'

export default function CreditCardsList() {
  const allCreditCardsQuery = useGetCreditCardsQuery()

  if (!allCreditCardsQuery.data) {
    return (
      <div>
        <p className="text-slate-400">Nenhum cartão cadastrado</p>
        <CreateCreditCard />
      </div>
    )
  }

  return allCreditCardsQuery.data?.map((creditCard) => (
    <CreditCard card={creditCard} />
  ))
}
