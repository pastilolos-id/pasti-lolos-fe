import { createSlice } from "@reduxjs/toolkit";

type SessionState = {
  isSessionExpiredModalOpen: boolean;
  isHandlingSessionExpiry: boolean;
};

const initialState: SessionState = {
  isSessionExpiredModalOpen: false,
  isHandlingSessionExpiry: false,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    openSessionExpiredModal: (state) => {
      state.isSessionExpiredModalOpen = true;
    },
    closeSessionExpiredModal: (state) => {
      state.isSessionExpiredModalOpen = false;
    },
    setHandlingSessionExpiry: (state, action: { payload: boolean }) => {
      state.isHandlingSessionExpiry = action.payload;
    },
  },
});

export const {
  openSessionExpiredModal,
  closeSessionExpiredModal,
  setHandlingSessionExpiry,
} = sessionSlice.actions;

export default sessionSlice.reducer;
