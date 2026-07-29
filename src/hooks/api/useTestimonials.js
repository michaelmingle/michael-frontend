import { createResourceHooks } from "@/lib/apiResource";

const { useList } = createResourceHooks("testimonials");

export const useTestimonials = useList;
