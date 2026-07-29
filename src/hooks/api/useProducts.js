import { createResourceHooks } from "@/lib/apiResource";

const { useList, useOne } = createResourceHooks("products");

export const useProducts = useList;
export const useProduct = useOne;
