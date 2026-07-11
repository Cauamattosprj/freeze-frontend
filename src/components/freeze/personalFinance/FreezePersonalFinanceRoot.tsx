import FreezePersonalFinanceBalance from './FreezePersonalFinanceBalance'
import FreezePersonalFinanceBalanceTabs from './FreezePersonalFinanceTabs'

export function FreezePersonalFinanceRoot() {


  return (
    <section className="surface-card surface-card-strong min-h-150">
      <div className="flex flex-col gap-6">
        <FreezePersonalFinanceBalance />
        <FreezePersonalFinanceBalanceTabs />        
      </div>
    </section>
  )
}
