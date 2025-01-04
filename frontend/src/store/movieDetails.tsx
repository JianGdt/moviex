import { create } from "zustand";

export const useContentStore = create<ComponentProps.ContentStoreState>((set) => ({
	contentType: "movie",
	setContentType: (type) => set({ contentType: type }),
}));