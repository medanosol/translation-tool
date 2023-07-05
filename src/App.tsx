import { QueryClient, QueryClientProvider } from "react-query";
import { DeeplContextProvider } from "./components/deeplContext/DeeplContext";
import ManualTranslator from "./components/manualTranslator/ManualTranslator";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
function App() {
  return (
    <div className="container flex flex-col items-center justify-center w-screen min-h-screen px-20 py-10 mx-auto">
      <header className="fixed top-0 flex flex-col gap-2 p-4">
        <span className="text-6xl font-bold text-center text-sky-600">
          medsol-i18n
        </span>
        <span className="text-2xl font-bold text-center text-sky-600">
          A simple tool to translate your i18n files
        </span>
      </header>
      <main className="w-full">
        <DeeplContextProvider>
          <QueryClientProvider client={queryClient}>
            <ManualTranslator />
          </QueryClientProvider>
        </DeeplContextProvider>
      </main>
    </div>
  );
}

export default App;
