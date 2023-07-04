import CryptoJS from "crypto-js";
import React, { createContext, useContext, useEffect, useState } from "react";
const DeeplContext = createContext<{
  deeplApiKey: string;
  setDeeplApiKey: (deeplApiKey: string) => void;
}>({
  deeplApiKey: "",
  setDeeplApiKey: () => {},
});
export const DeeplContextProvider: React.FC<{ children: any }> = ({
  children,
}) => {
  const [deeplApiKey, setDeeplApiKey] = useState("");
  useEffect(() => {
    const encryptedKey = localStorage.getItem("deeplAPIKey");
    if (encryptedKey) {
      const bytes = CryptoJS.AES.decrypt(
        encryptedKey.toString(),
        import.meta.env.VITE_ENCRYPT_KEY
      );
      const decryptedKey = bytes.toString(CryptoJS.enc.Utf8);
      setDeeplApiKey(decryptedKey);
    }
  }, []);

  return React.createElement(
    DeeplContext.Provider,
    { value: { deeplApiKey, setDeeplApiKey } },
    children
  );
};
export const useDeeplContext = () => {
  const { deeplApiKey, setDeeplApiKey } = useContext(DeeplContext);
  return { deeplApiKey, setDeeplApiKey };
};

// test key 5608b95c-8518-1c51-488a-b10b6e6cbb39:fx
