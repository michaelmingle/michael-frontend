import { createResourceHooks } from "@/lib/apiResource";

const { useList, useOne } = createResourceHooks("projects");

export const useProjects = useList;
export const useProject = useOne;
