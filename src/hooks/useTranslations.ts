import { UseMutateAsyncFunction, useMutation } from "react-query";

type IUseTranslations = ({ lang }: { lang?: string }) => {
  translateText: UseMutateAsyncFunction<any, unknown, string, unknown>;
};

export const useTranslations: IUseTranslations = ({ lang = "EN" }) => {
  const DEEPL_KEY = "5608b95c-8518-1c51-488a-b10b6e6cbb39:fx";

  async function translateText(text: string) {
    const urlDeepL =
      "https://api-free.deepl.com/v2/translate?auth_key=" +
      DEEPL_KEY +
      "&text=" +
      text +
      "&target_lang=" +
      lang +
      "&preserve_formatting=1";
    const responseDeepL = await fetch(urlDeepL);
    const dataDeepL = await responseDeepL.json();
    const translatedText = dataDeepL.translations[0].text;
    return translatedText;
  }

  const { mutateAsync } = useMutation(translateText);

  return { translateText: mutateAsync };
};
