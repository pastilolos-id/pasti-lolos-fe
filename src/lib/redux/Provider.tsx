"use client";

import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { SessionProvider } from "@/providers/session-provider";
import { store } from "./store";

interface Props {
  children: ReactNode;
}

export function ReduxProvider({ children }: Props) {
  return (
    <Provider store={store}>
      <SessionProvider>{children}</SessionProvider>
    </Provider>
  );
}
