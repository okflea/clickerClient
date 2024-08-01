import AuthProvider from "./provider/AuthProvider";
import { QueryProvider } from "./provider/QueryProvider";
import { ThemeProvider } from "./provider/ThemeProvider";
import Routes from "./routes";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <RecoilRoot>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Routes />
          </ThemeProvider>
        </RecoilRoot>
      </AuthProvider>
    </QueryProvider>
  );
}

export default App;
