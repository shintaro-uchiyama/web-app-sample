import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface RenderState {
  test: string;
  presentations: {
    id: string;
    renderedAts: number[];
  }[];
}

const initialState: RenderState = {
  test: "111",
  presentations: [],
};

export const renderSlice = createSlice({
  name: "render",
  initialState,
  reducers: {
    render: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const presentation = state.presentations.find(
        (presentation) => presentation.id === id
      );
      const now = Date.now();
      if (!presentation) {
        console.log("--new--");
        state.presentations.push({
          id,
          renderedAts: [now],
        });
      } else {
        console.log("--extend--");
        for (const presentation of state.presentations) {
          if (presentation.id === id) {
            presentation.renderedAts.push(now);
            break;
          }
        }
      }
    },
  },
});

export const { render } = renderSlice.actions;

export default renderSlice.reducer;
