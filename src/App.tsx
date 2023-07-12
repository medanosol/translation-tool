import clsx from "clsx";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
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
  const [hideHeader, setHideHeader] = useState(false);
  return (
    <div className="container flex flex-col items-center justify-center w-screen min-h-screen gap-10 px-10 py-10 mx-auto md:px-20">
      <header className="flex flex-col items-center justify-center">
        <img
          src="https://github.com/medanosol/translation-tool/assets/71669730/fa23f864-de8f-4de1-8c93-1d341b87078e"
          alt="translation-tool"
          width={hideHeader ? 150 : 300}
          height={hideHeader ? 150 : 300}
          className={clsx(hideHeader ? "absolute top-0 left-0" : "block")}
        />
        {!hideHeader && (
          <span className="text-2xl font-bold text-center text-sky-600">
            A simple tool to translate your i18n files
          </span>
        )}
      </header>
      <main
        className={clsx(
          "flex justify-center flex-grow w-full",
          hideHeader ? "items-center" : "items-start"
        )}
      >
        <DeeplContextProvider>
          <QueryClientProvider client={queryClient}>
            <ManualTranslator setHideHeader={setHideHeader} />
            <ToastContainer toastClassName="top-10" theme="colored" />
          </QueryClientProvider>
        </DeeplContextProvider>
      </main>
    </div>
  );
}

export default App;
