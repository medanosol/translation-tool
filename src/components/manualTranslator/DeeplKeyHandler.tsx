import CryptoJS from "crypto-js";
import { useState } from "react";
import { Button } from "../button/Button";
import { useDeeplContext } from "../deeplContext/DeeplContext";

export const DeeplKeyHandler = () => {
  const { deeplApiKey, setDeeplApiKey } = useDeeplContext();
  const [saveKeyInBrowser, setSaveKeyInBrowser] = useState(false);

  if (deeplApiKey) {
    return (
      <div className="flex flex-col gap-2 w-max">
        <span className="text-sm font-medium text-sky-500">The key is set</span>
        <Button
          className="!text-red11 !bg-red4 hover:!bg-red5 !focus:shadow-red7"
          onClick={() => {
            setDeeplApiKey("");
            localStorage.removeItem("deeplAPIKey");
          }}
        >
          Remove the key
        </Button>
      </div>
    );
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const key = formData.get("key") as string;
    setDeeplApiKey(key);
    if (saveKeyInBrowser) {
      localStorage.setItem(
        "deeplAPIKey",
        CryptoJS.AES.encrypt(key, import.meta.env.VITE_ENCRYPT_KEY).toString()
      );
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <label className="flex flex-col w-full gap-1">
          <span>
            Insert your deepl API key.{" "}
            <span className="text-sm">
              Don't have one?{" "}
              <a
                href="https://www.deepl.com/pro-api?cta=header-pro-api/"
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 underline"
              >
                Get one here
              </a>
            </span>
          </span>
          <input
            required
            className="w-full px-2 py-1 rounded-md outline-none focus:ring-1 focus:ring-sky-200 bg-sky-100 placeholder:text-sky-900/50"
            type="text"
            name="key"
            placeholder="Deepl key"
          />
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="accent-sky-500"
            onChange={(e) => {
              setSaveKeyInBrowser(e.target.checked);
              if (deeplApiKey && e.target.checked) {
                localStorage.setItem(
                  "deeplAPIKey",
                  CryptoJS.AES.encrypt(
                    deeplApiKey,
                    import.meta.env.VITE_ENCRYPT_KEY
                  ).toString()
                );
              } else {
                localStorage.removeItem("deeplAPIKey");
              }
            }}
          />
          <span>Save the key for future use</span>
        </label>
        <Button className="w-max" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
};
