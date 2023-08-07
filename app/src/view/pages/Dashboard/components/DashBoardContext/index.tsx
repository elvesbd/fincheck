import React, { createContext, useCallback, useMemo, useState } from "react";


interface DashboardContextValue {
  areValuesVisible: boolean;
  toggleValueVisibility: () => void;
  isNewAccountModalOpen: boolean;
  openNewAccountModal: () => void;
  closeNewAccountModal: () => void;
  isNewTransactionModalOpen: boolean;
  openNewTransactionModal: () => void;
  closeNewTransactionModal: () => void;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = useState(true);
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(true);

  const toggleValueVisibility = useCallback(() => {
    setAreValuesVisible(prevState => !prevState)
  }, []);

  const openNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(true)
  }, []);

  const closeNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(false)
  }, []);

  const openNewTransactionModal = useCallback(() => {
    setIsNewTransactionModalOpen(true)
  }, []);

  const closeNewTransactionModal = useCallback(() => {
    setIsNewTransactionModalOpen(false)
  }, []);

  const contextValue = useMemo(() => ({
    areValuesVisible,
    toggleValueVisibility,
    isNewAccountModalOpen,
    openNewAccountModal,
    closeNewAccountModal,
    isNewTransactionModalOpen,
    openNewTransactionModal,
    closeNewTransactionModal
  }), [
    areValuesVisible,
    toggleValueVisibility,
    isNewAccountModalOpen,
    openNewAccountModal,
    closeNewAccountModal,
    isNewTransactionModalOpen,
    openNewTransactionModal,
    closeNewTransactionModal
  ]);

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  )
}
