import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { FilterMenuProvider } from "../../shared/lib/filterMenuContext";
import { store } from "../store/store";

export type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <FilterMenuProvider>{children}</FilterMenuProvider>
      </BrowserRouter>
    </Provider>
  );
}
