import { SpinnerLoader } from '../components/molecules/SpinnerLoader';
import { PageLock } from '../components/molecules/PageLock';
import { KardexTemplate } from '../components/templates/KardexTemplate';
import { useKardexStore } from '../store/KardexStore';
import { useKardex } from '../hooks/queries/useKardex';
import { useCurrentCompany, useHasPermission } from '../hooks/queries/useSession';

export function Kardex() {
  const hasPermission = useHasPermission('Kardex');
  const { search } = useKardexStore();
  const { data: company, isPending: isCompanyPending } = useCurrentCompany();
  // loaded here for the loading state; Tabs reads the same cached list
  const { isLoading, error } = useKardex(company?.id, search);

  // loading / error states
  if (isCompanyPending || isLoading) {
    return <SpinnerLoader />;
  }
  if (error) {
    return <span>Error...</span>;
  }
  if (hasPermission === false) return <PageLock state={hasPermission} />;
  return <KardexTemplate />;
}
