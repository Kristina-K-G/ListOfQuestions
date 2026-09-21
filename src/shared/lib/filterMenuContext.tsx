import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type FilterMenuContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const FilterMenuContext = createContext<FilterMenuContextValue | null>(null);

export type FilterMenuProviderProps = {
  children: ReactNode;
};

export function FilterMenuProvider({ children }: FilterMenuProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  const value = useMemo(
    () => ({ isOpen, open, close, toggle }),
    [isOpen, open, close, toggle],
  );

  return (
    <FilterMenuContext.Provider value={value}>
      {children}
    </FilterMenuContext.Provider>
  );
}

export function useFilterMenu() {
  const context = useContext(FilterMenuContext);
  if (!context) {
    throw new Error("useFilterMenu must be used within FilterMenuProvider");
  }
  return context;
}
