import { useQuery } from "@tanstack/react-query";
import { categories } from "../services/categories";

export function useCategories() {
  const { data, isFetching } = useQuery({
    queryKey: ['categories'],
    queryFn: categories.getAll
  })

  return {
    categories: data ?? [],
    isFetching
  }
}
