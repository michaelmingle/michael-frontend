import { createResourceHooks } from "@/lib/apiResource";

const { useList, useOne } = createResourceHooks("blog");

export const useBlogPosts = useList;
export const useBlogPost = useOne;
