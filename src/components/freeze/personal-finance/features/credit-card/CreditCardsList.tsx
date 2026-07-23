import { useGetCreditCardsQuery } from '#/hooks/creditCardsHooks'
import CreateCreditCard from './CreateCreditCard'
import CreditCard from './CreditCard'

export default function CreditCardsList() {
  const allCreditCardsQuery = useGetCreditCardsQuery()

  if (allCreditCardsQuery.data?.length == 0) {
    return (
      <div>
        <p className="text-slate-400">Nenhum cartão cadastrado</p>
        <CreateCreditCard />
      </div>
    )
  }

  return (
    <div>
      {allCreditCardsQuery.data?.map((creditCard) => (
        <CreditCard card={creditCard} />
      ))}

      <CreateCreditCard />
    </div>
  )
}
