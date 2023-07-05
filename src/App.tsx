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
      <header className="mb-4 text-2xl font-bold text-center text-sky-600">
        i18n medanosol test
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
