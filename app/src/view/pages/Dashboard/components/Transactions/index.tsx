import { Swiper, SwiperSlide } from "swiper/react";

import { FiltersModal } from "./FiltersModal";
import { SliderOptions } from "./SliderOptions";
import { SliderNavigation } from "./SliderNavigation";
import { TransactionDropDown } from "./TransactionDropDown";
import { useTransactionsController } from "./useTransactions";
import { MONTHS } from "../../../../../app/config/constants";
import { cn, formatCurrency } from "../../../../../app/utils";
import { formatDate } from "../../../../../app/utils/formatDate";
import emptyStateImage from '../../../../../assets/empty-state.svg'
import { EditTransactionModal } from "../../modals/EditTransactionModal";
import { FilterIcon } from "../../../../Components/icons";
import { Spinner } from "../../../../Components/Spinner";
import { CategoryIcon } from "../../../../Components/icons/categories/CategoryIcon";


export function Transactions() {
  const {
    isFiltersModalOpen,
    isEditModalOpen,
    transactionBeingEdited,
    filters,
    areValuesVisible,
    transactions,
    isLoading,
    isInitialLoading,
    handleChangeFilters,
    handleApplyFilters,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    handleOpenEditModal,
    handleCloseEditModal
  } = useTransactionsController();

  const hasTransactions = transactions.length > 0;

  return (
    <div
      className="bg-gray-100 rounded-2xl w-full h-full md:p-10 px-4 py-8 flex flex-col"
    >
      {isInitialLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner className="w-10 h-10" />
        </div>
      )}

      {!isInitialLoading && (
        <>
          <FiltersModal
            open={isFiltersModalOpen}
            onClose={handleCloseFiltersModal}
            onApplyFilters={handleApplyFilters}
          />

          <header className="">
            <div className="flex items-center justify-between">
              <TransactionDropDown
                onSelect={handleChangeFilters('type')}
                selectedType={filters.type}
              />

              <button onClick={handleOpenFiltersModal}>
                <FilterIcon />
              </button>
            </div>

            <div className="mt-6 relative">
              <Swiper
                slidesPerView={3}
                centeredSlides
                initialSlide={filters.month}
                onSlideChange={swiper => {
                  handleChangeFilters('month')(swiper.realIndex);
                }}
              >
                <SliderNavigation />
                {MONTHS.map((month, index) => (
                  <SwiperSlide key={month}>
                    {({ isActive }) => (
                      <SliderOptions
                        isActive={isActive}
                        month={month}
                        index={index}
                      />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </header>

          <div className="mt-4 space-y-2 flex-1 overflow-y-auto">
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-full">
                <Spinner className="w-10 h-10" />
              </div>
            )}

            {(!hasTransactions && !isLoading) && (
              <div className="flex flex-col items-center justify-center h-full">
                <img
                  src={emptyStateImage}
                  alt="Imagem de uma mulher com uma lupa informando que não foi encontrado nenhuma transação"
                />
                <p className="text-gray-700">Não encontramos nenhuma transação!</p>
              </div>
            )}

            {(hasTransactions && !isLoading) && (
              <>
                {transactionBeingEdited && (
                  <EditTransactionModal
                    open={isEditModalOpen}
                    onClose={handleCloseEditModal}
                    transaction={transactionBeingEdited}
                  />
                )}

                {transactions.map(transaction => (
                  <div
                    key={transaction.id}
                    className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4"
                    role="button"
                    onClick={() => handleOpenEditModal(transaction)}
                  >
                    <div className="flex-1 flex items-center gap-3">
                      <CategoryIcon
                        type={transaction.type === 'EXPENSE' ? 'expense' : 'income'}
                        category={transaction.category?.icon}
                      />

                      <div>
                        <strong className="font-bold tracking-[-0.5px] block">
                          {transaction.name}
                        </strong>

                        <data className="text-sm text-gray-600">
                          {formatDate(transaction.date)}
                        </data>
                      </div>
                    </div>

                    <span
                      className={cn(
                        "tracking-[-0.5px] font-medium",
                        transaction.type === 'EXPENSE' ? 'text-red-800' : 'text-green-800',
                        !areValuesVisible && 'blur-sm'
                      )}
                    >
                      {transaction.type === 'EXPENSE' ? '-' : '+'}  {formatCurrency(transaction.value)}
                    </span>
                  </div>
                ))}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
