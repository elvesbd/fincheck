import { useState } from "react";

import { useBankAccounts } from "../../../../../../app/hooks/useBankAccounts";


export function useFiltersModal() {
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<undefined | string>(undefined);
  const [selectYear, setSelectYear] = useState(new Date().getFullYear());
  const { accounts } = useBankAccounts();

  function handleSelectBankAccount(bankAccountId: string) {
    setSelectedBankAccountId(prevState => (
      prevState === bankAccountId ? undefined : bankAccountId
    ))
  }

  function handleChangeYear(step: number) {
    setSelectYear(prevState => prevState + step)
  }

  return {
    selectedBankAccountId,
    selectYear,
    accounts,
    handleSelectBankAccount,
    handleChangeYear
  }
}
