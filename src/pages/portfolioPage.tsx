import { useState } from "react";
import usePortfolio from "../hooks/usePortfolio";
import { DashboardLayout } from "../components/layout/dashboardLayout";
import { DashboardSkeleton } from "../components/ui/skeleton";
import { ErrorState } from "../components/ui/errorState";
import { NetWorthCard } from "../components/dashboard/netWorthCard";
import { AllocationCard } from "../components/dashboard/allocationCard";
import { AccountCards } from "../components/dashboard/accountCards";
import { TabbedPanel } from "../components/dashboard/tabbedPanel";

const PortfolioPage = () => {
  const { data, loading, error, refetch } = usePortfolio();

  const [balanceHidden, setBalanceHidden] = useState(false);

  return (
    <DashboardLayout user={data?.user} holdings={data?.holdings}>
      {loading ? (
        <DashboardSkeleton />
      ) : error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : (
        data && (
          <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
              <NetWorthCard
                holdings={data.holdings}
                currency={data.summary.currency}
                hidden={balanceHidden}
                onToggleHidden={() => setBalanceHidden((h) => !h)}
              />
              <AllocationCard holdings={data.holdings} />
            </div>

            <AccountCards
              holdings={data.holdings}
              currency={data.summary.currency}
              hidden={balanceHidden}
            />

            <TabbedPanel
              holdings={data.holdings}
              transactions={data.transactions}
              currency={data.summary.currency}
            />
          </div>
        )
      )}
    </DashboardLayout>
  );
};

export default PortfolioPage;
