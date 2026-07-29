import { createResourceHooks } from "@/lib/apiResource";

const { useList } = createResourceHooks("services");

export const useServices = useList;
