import { Header } from "../widgets/header/ui/Header";
import { AppRouter } from "./router/AppRouter";
import { Providers } from "./providers/Providers";

export function App() {
  return (
    <Providers>
      <Header />
      <AppRouter />
    </Providers>
  );
}
