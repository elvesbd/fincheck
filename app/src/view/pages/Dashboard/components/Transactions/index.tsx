import { Swiper, SwiperSlide } from "swiper/react";

import { MONTHS } from "../../../../../app/config/constants";
import { SliderOptions } from "./SliderOptions";
import { SliderNavigation } from "./SliderNavigation";
import { cn, formatCurrency } from "../../../../../app/utils";
import { FilterIcon } from "../../../../Components/icons";
import { CategoryIcon } from "../../../../Components/icons/categories/CategoryIcon";
import { useTransactions } from "./useTransactions";
import { Spinner } from "../../../../Components/Spinner";
import emptyStateImage from '../../../../../assets/empty-state.svg'
import { TransactionDropDown } from "./TransactionDropDown";


export function Transactions() {
  const {
    areValuesVisible,
    isInitialLoading,
    transactions,
    isLoading
  } = useTransactions();

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
          <header className="">
            <div className="flex items-center justify-between">
              <TransactionDropDown />

              <button>
                <FilterIcon />
              </button>
            </div>

            <div className="mt-6 relative">
              <Swiper
                slidesPerView={3}
                centeredSlides
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
              <div className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4">
                <div className="flex-1 flex items-center gap-3">
                  <CategoryIcon type="expense" />

                  <div>
                    <strong className="font-bold tracking-[-0.5px] block">Almoço</strong>
                    <data className="text-sm text-gray-600">04/08/2023</data>
                  </div>
                </div>

                <span
                  className={cn(
                    "text-red-800 tracking-[-0.5px] font-medium",
                    !areValuesVisible && 'blur-sm'
                  )}
                >{formatCurrency(123)}</span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
