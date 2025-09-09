import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CakeReport } from "../types";

interface ReportState {
  date: string;
  items: CakeReport[];
}

const initialState: ReportState = {
  date: "",
  items: [],
};

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    // Start new daily report
    startReport: (
      state,
      action: PayloadAction<{ date: string; items: CakeReport[] }>
    ) => {
      state.date = action.payload.date;
      state.items = action.payload.items;
    },

    // Update single cake inside report
    updateCake: (state, action: PayloadAction<CakeReport>) => {
      const index = state.items.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    changeDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    // Add a new cake manually (optional)
    addCake: (state, action: PayloadAction<CakeReport>) => {
      state.items.push(action.payload);
    },

    // Clear after submit or reset
    clearReport: (state) => {
      state.date = "";
      state.items = [];
    },
  },
});

export const { startReport, updateCake, addCake, clearReport, changeDate } =
  reportSlice.actions;
export default reportSlice.reducer;
