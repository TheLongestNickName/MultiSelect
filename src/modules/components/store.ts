import { create } from "zustand";

export interface DataType {
  name: string;
  category: string;
  value: number | string;
  id: string;
}

interface MultiSelectState {
  data: DataType[] | [];
  setData: (name: DataType[]) => void;
}

export const useMultiSelectStore = create<MultiSelectState>((set) => ({
  data: [],
  setData: (data: DataType[]) =>
    set((state) => ({
      data: [...state.data, ...data],
    })),
}));
