import { useState } from "react";

export function useFiltersModal() {
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<null | string>(null);
  const [selectYear, setSelectYear] = useState(new Date().getFullYear());

  function handleSelectBankAccount(bankAccountId: string) {
    setSelectedBankAccountId(prevState => (
      prevState === bankAccountId ? null : bankAccountId
    ))
  }

  function handleChangeYear(step: number) {
    setSelectYear(prevState => prevState + step)
  }

  return {
    selectedBankAccountId,
    handleSelectBankAccount,
    selectYear,
    handleChangeYear
  }
}
