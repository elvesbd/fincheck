import React, { createContext, useCallback, useMemo, useState } from "react";
import { BankAccount } from "../../../../../app/services/bankAccount/interfaces";


interface DashboardContextValue {
  areValuesVisible: boolean;
  isNewAccountModalOpen: boolean;
  isNewTransactionModalOpen: boolean;
  isEditAccountModalOpen: boolean;
  newTransactionType: 'INCOME' | 'EXPENSE' | null;
  accountBeingEdited: null | BankAccount;
  toggleValueVisibility: () => void;
  openNewAccountModal: () => void;
  closeNewAccountModal: () => void;
  openEditAccountModal: (bankAccount: BankAccount) => void;
  closeEditAccountModal: () => void;
  openNewTransactionModal: (type: 'INCOME' | 'EXPENSE') => void;
  closeNewTransactionModal: () => void;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = useState(true);
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
  const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false);
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
  const [newTransactionType, setNewTransactionType] = useState<'INCOME' | 'EXPENSE' | null>(null);
  const [accountBeingEdited, setAccountBeingEdited] = useState<null | BankAccount>(null);

  const toggleValueVisibility = useCallback(() => {
    setAreValuesVisible(prevState => !prevState)
  }, []);

  const openNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(true)
  }, []);

  const closeNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(false)
  }, []);

  const openEditAccountModal = useCallback((bankAccount: BankAccount) => {
    setAccountBeingEdited(bankAccount)
    setIsEditAccountModalOpen(true)
  }, []);

  const closeEditAccountModal = useCallback(() => {
    setAccountBeingEdited(null)
    setIsEditAccountModalOpen(false)
  }, []);

  const openNewTransactionModal = useCallback((type: 'INCOME' | 'EXPENSE') => {
    setNewTransactionType(type)
    setIsNewTransactionModalOpen(true)
  }, []);

  const closeNewTransactionModal = useCallback(() => {
    setNewTransactionType(null);
    setIsNewTransactionModalOpen(false)
  }, []);

  const contextValue = useMemo(() => ({
    areValuesVisible,
    isNewAccountModalOpen,
    isNewTransactionModalOpen,
    isEditAccountModalOpen,
    newTransactionType,
    accountBeingEdited,
    toggleValueVisibility,
    openNewAccountModal,
    closeNewAccountModal,
    openEditAccountModal,
    closeEditAccountModal,
    openNewTransactionModal,
    closeNewTransactionModal
  }), [
    areValuesVisible,
    isNewAccountModalOpen,
    isNewTransactionModalOpen,
    isEditAccountModalOpen,
    newTransactionType,
    accountBeingEdited,
    toggleValueVisibility,
    openNewAccountModal,
    closeNewAccountModal,
    openEditAccountModal,
    closeEditAccountModal,
    openNewTransactionModal,
    closeNewTransactionModal
  ]);

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  )
}
