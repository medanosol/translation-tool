import * as Accordion from "@radix-ui/react-accordion";
import { MagicWandIcon, UpdateIcon } from "@radix-ui/react-icons";
import { saveAs } from "file-saver";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslations } from "../../hooks/useTranslations";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../accordion/Accordion";
import { useDeeplContext } from "../deeplContext/DeeplContext";
import ChangeFileAlert from "./ChangeFileAlert";
import { DeeplKeyHandler } from "./DeeplKeyHandler";
import TranslateAllAlert from "./TranslateAllAlert";

const TranslatorHandler = ({ text, lang }: { text: any; lang: string }) => {
  const { deeplApiKey } = useDeeplContext();
  const [isLoadingTranslations, setIsLoadingTranslations] = useState(false);
  const textWithoutValues: typeof text = useMemo(() => {
    const removeValues = (content: object): any => {
      return Object.entries(content).reduce((acc, [key, value]) => {
        if (typeof value === "object" && !Array.isArray(value)) {
          return { ...acc, [key]: removeValues(value) };
        }
        return { ...acc, [key]: "" };
      }, {});
    };
    return removeValues(text);
  }, [text]);

  const methods = useForm({
    defaultValues: {
      translations: { ...textWithoutValues },
      lang: lang,
    },
  });
  const handleSubmit = (data: any) => {
    const jsonData = JSON.stringify(data.translations, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    saveAs(blob, `${data.lang.toLowerCase()}.json`);
  };

  const selectedLang = methods.watch("lang");

  // when the language changes, reset the values
  useEffect(() => {
    methods.setValue("translations", { ...textWithoutValues });
  }, [selectedLang, textWithoutValues, methods]);

  const { translateText } = useTranslations({
    lang: selectedLang,
  });
  const handleTranslateAll = async () => {
    const translate = async (content: any): Promise<any> => {
      const translatedContent: any = {};
      for (const [key, value] of Object.entries(content)) {
        if (typeof value === "object" && !Array.isArray(value)) {
          translatedContent[key] = await translate(value);
        } else {
          translatedContent[key] = await translateText(value as string);
        }
      }
      return translatedContent;
    };
    setIsLoadingTranslations(true);
    const translatedText = await translate(text);
    setIsLoadingTranslations(false);
    methods.setValue("translations", { ...translatedText });
  };
  const renderInputFields = (content: any, path: string[] = []) => {
    return Object.entries(content).map(([key, value]) => {
      const newPath = [...path, key];

      if (typeof value === "object" && !Array.isArray(value)) {
        return (
          <AccordionItem value={key} key={key}>
            <AccordionTrigger className="flex">
              <h4 className="text-xl font-medium text-slate-500">{key}</h4>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              {renderInputFields(value, newPath)}
            </AccordionContent>
          </AccordionItem>
        );
      }

      return (
        <li key={key}>
          <span className="font-medium">{key}:</span>
          <div className="flex gap-2">
            {value && value.toString().split(" ").length > 10 ? (
              <textarea
                {...methods.register(`translations.${newPath.join(".")}`)}
                className="w-full px-2 py-1 mx-2 rounded-md bg-sky-100"
                placeholder={value as string}
              />
            ) : (
              <input
                {...methods.register(`translations.${newPath.join(".")}`)}
                type="text"
                className="w-full px-2 py-1 mx-2 rounded-md bg-sky-100"
                placeholder={value as string}
              />
            )}

            <button
              title={
                import.meta.env.VITE_DEEPL_API_KEY
                  ? "Translate"
                  : "You haven't set a deepl api key yet"
              }
              type="button"
              className="flex items-center justify-center px-2 py-1 mx-2 rounded-md bg-sky-200 disabled:bg-gray-200"
              onClick={async () => {
                if (!deeplApiKey) return;
                const value = newPath.reduce((acc, key) => acc[key], text);
                const translatedValue = await translateText(value);
                methods.setValue(
                  `translations.${newPath.join(".")}`,
                  translatedValue
                );
              }}
              disabled={!deeplApiKey}
            >
              <MagicWandIcon />
            </button>
          </div>
        </li>
      );
    });
  };

  return (
    <FormProvider {...methods}>
      {isLoadingTranslations && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
          <div className="flex flex-col items-center justify-center gap-4 p-4 bg-white rounded-md">
            <UpdateIcon className="w-10 h-10 animate-spin" />
            <p>Translating. This might take some time...</p>
          </div>
        </div>
      )}

      <form
        className="flex flex-col w-full gap-4 p-4"
        onSubmit={methods.handleSubmit(handleSubmit)}
      >
        <select
          className="h-10 py-2 pl-4 text-white rounded-md bg-cyan-500"
          {...methods.register("lang")}
        >
          <option value="EN">English</option>
          <option value="FR">French</option>
          <option value="ES">Spanish</option>
          <option value="DE">German</option>
          <option value="IT">Italian</option>
          <option value="PT">Portuguese</option>
          <option value="RU">Russian</option>
        </select>
        <TranslateAllAlert
          onAccept={handleTranslateAll}
          isLoading={isLoadingTranslations}
        />
        {renderInputFields(text)}
        <button type="submit" className="px-2 py-1 mx-2 bg-blue-200 rounded-md">
          Save Translations
        </button>
      </form>
    </FormProvider>
  );
};

const ManualTranslator = () => {
  const [files, setFiles] = useState<{ file: File; content: object }[]>([]);
  const [fileAsJson, setFileAsJson] = useState<object>({});
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        const content = JSON.parse(reader.result as string);
        setFiles((prevFiles) => [...prevFiles, { file, content }]);
        setFileAsJson(content);
      };
      reader.readAsText(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  const renderOriginalValues = (content: object, path: string[] = []) => {
    return Object.entries(content).map(([key, value]) => {
      const newPath = [...path, key];
      if (typeof value === "object" && !Array.isArray(value)) {
        return (
          <AccordionItem value={key} key={key}>
            <AccordionTrigger className="flex">
              <h4 className="text-xl font-medium text-slate-500">{key}</h4>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              {renderOriginalValues(value, newPath)}
            </AccordionContent>
          </AccordionItem>
        );
      }

      return (
        <li key={key}>
          <span className="font-medium">{key}:</span>
          <span className="px-2 py-1 mx-2 leading-loose rounded-md bg-sky-200">
            {value}
          </span>
        </li>
      );
    });
  };

  return (
    <>
      {files.length === 0 && (
        <div className="flex flex-col gap-2">
          <div
            {...getRootProps()}
            className={`p-4 border-2 border-dashed ${
              isDragActive ? "bg-gray-200" : ""
            }`}
          >
            <>
              <input {...getInputProps()} />
              <p>Drag 'n' drop your i18n file here</p>
            </>
          </div>
          <DeeplKeyHandler />
        </div>
      )}
      {files.length > 0 && (
        <div className="relative grid w-full grid-cols-12 gap-4">
          <Accordion.Root
            className="w-full flex flex-col space-y-4 rounded-md shadow-[0_2px_10px] shadow-black/5 col-span-6 h-max p-4"
            type="multiple"
            defaultValue={[...Object.keys(files[0].content).map((key) => key)]}
          >
            {renderOriginalValues(files[0].content)}
          </Accordion.Root>
          <Accordion.Root
            className="w-full rounded-md shadow-[0_2px_10px] shadow-black/5 col-span-6 h-max"
            type="multiple"
            defaultValue={[...Object.keys(files[0].content).map((key) => key)]}
          >
            <TranslatorHandler text={fileAsJson} lang="EN" />
          </Accordion.Root>
          <ChangeFileAlert onAccept={() => setFiles([])} />
        </div>
      )}
    </>
  );
};

export default ManualTranslator;
