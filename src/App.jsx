import { QueryClient, QueryClientProvider } from "react-query";
// import Translator from "./components/Translator";
import ManualTranslator from "./components/ManualTranslator";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});
function App() {
  return (
    <div className="container w-screen mx-auto">
      <header className="text-xl">i18n medanosol</header>
      <main>
        <QueryClientProvider client={queryClient}>
          {/* <Translator /> */}
          <ManualTranslator />
        </QueryClientProvider>
      </main>
    </div>
  );
}

export default App;
