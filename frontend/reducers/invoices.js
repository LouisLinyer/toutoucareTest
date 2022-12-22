import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // value: { email: null,  infoUser: "" },
  value: [],
};

export const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {


    collectData : (state,action )=>{

      state.value=action.payload
    },
    addPdf: (state, action) => {
      state.value.push(action.payload);
    },
    removePdf: (state, action) => {
      state.value = state.value.filter(pdfFile => pdfFile.title !== action.payload.title);
    },
  },
});

export const { addPdf, removePdf, collectData} = invoicesSlice.actions;
export default invoicesSlice.reducer;