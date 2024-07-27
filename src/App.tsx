import AuthProvider from "./provider/AuthProvider";
import { QueryProvider } from "./provider/QueryProvider";
import Routes from "./routes";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <RecoilRoot>
          <Routes />
        </RecoilRoot>
      </AuthProvider>
    </QueryProvider>
  );
}

export default App;
