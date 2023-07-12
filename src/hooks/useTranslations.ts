import { UseMutateAsyncFunction, useMutation } from "react-query";
import { toast } from "react-toastify";
import { useDeeplContext } from "../components/deeplContext/DeeplContext";

type IUseTranslations = ({
  sourceLang,
  lang,
}: {
  sourceLang: string;
  lang: string;
}) => {
  translateText: UseMutateAsyncFunction<any, unknown, string, unknown>;
};

export const useTranslations: IUseTranslations = ({
  sourceLang,
  lang = "EN",
}) => {
  const { deeplApiKey } = useDeeplContext();
  const DEEPL_KEY = deeplApiKey;

  async function translateText(text: string) {
    try {
      const urlDeepL =
        "https://api-free.deepl.com/v2/translate?auth_key=" +
        DEEPL_KEY +
        "&text=" +
        text +
        "&source_lang=" +
        sourceLang +
        "&target_lang=" +
        lang +
        "&preserve_formatting=1";
      const responseDeepL = await fetch(urlDeepL);
      const dataDeepL = await responseDeepL.json();
      const translatedText = dataDeepL.translations[0].text;
      return translatedText;
    } catch (error) {
      toast.error("Error while translating text");
    }
  }

  const { mutateAsync } = useMutation(translateText);

  return { translateText: mutateAsync };
};
