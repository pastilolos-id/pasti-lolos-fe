import { createSlice } from "@reduxjs/toolkit";

type SessionState = {
  isSessionExpiredModalOpen: boolean;
  isHandlingSessionExpiry: boolean;
  isVoluntaryLogout: boolean;
};

const initialState: SessionState = {
  isSessionExpiredModalOpen: false,
  isHandlingSessionExpiry: false,
  isVoluntaryLogout: false,
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
    setVoluntaryLogout: (state, action: { payload: boolean }) => {
      state.isVoluntaryLogout = action.payload;
    },
  },
});

export const {
  openSessionExpiredModal,
  closeSessionExpiredModal,
  setHandlingSessionExpiry,
  setVoluntaryLogout,
} = sessionSlice.actions;

export default sessionSlice.reducer;
