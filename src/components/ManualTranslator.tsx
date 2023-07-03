import * as Accordion from "@radix-ui/react-accordion";
import { MagicWandIcon } from "@radix-ui/react-icons";
import { useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslations } from "../hooks/useTranslations";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion/Accordion";

const TranslatorHandler = ({ text, lang }: { text: any; lang: string }) => {
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
    const a = document.createElement("a");
    a.href = URL.createObjectURL(
      new Blob([JSON.stringify(data.translations, null, 2)], {
        type: "application/json",
      })
    );
    a.setAttribute("download", `${data.lang}.json`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const selectedLang = methods.watch("lang");

  const { translateText } = useTranslations({
    lang: selectedLang,
  });
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
            <input
              type="text"
              className="w-full px-2 py-1 mx-2 rounded-md bg-slate-200"
              {...methods.register(`translations.${newPath.join(".")}`)}
            />
            <button
              title="Translate"
              type="button"
              className="px-2 py-1 mx-2 rounded-md bg-sky-200"
              onClick={async () => {
                const value = newPath.reduce((acc, key) => acc[key], text);
                const translatedValue = await translateText(value);

                methods.setValue(
                  `translations.${newPath.join(".")}`,
                  translatedValue
                );
              }}
              // disabled if no deepl api key is set
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
      const indent = path.length;
      console.log(path);
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
          <span className="px-2 py-1 mx-2 rounded-md bg-slate-200">
            {value}
          </span>
        </li>
      );
    });
  };

  return (
    <>
      {files.length === 0 && (
        <div
          {...getRootProps()}
          className={`p-4 border-2 border-dashed ${
            isDragActive ? "bg-gray-200" : ""
          }`}
        >
          <>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </>
        </div>
      )}
      {files.length > 0 && (
        <div className="grid grid-cols-12 gap-4">
          <Accordion.Root
            className="w-full rounded-md shadow-[0_2px_10px] shadow-black/5 col-span-6 h-max p-4"
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
        </div>
      )}
    </>
  );
};

export default ManualTranslator;
