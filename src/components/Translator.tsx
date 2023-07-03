import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useQuery } from "react-query";
const TranslatedText = ({ text, lang }: { text: string; lang: string }) => {
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
  const { isLoading, data } = useQuery(
    ["translateText", text],
    () => translateText(text),
    {
      enabled: !!text,
    }
  );
  if (isLoading)
    return <span className="px-2 py-1 bg-blue-200">Loading...</span>;
  return (
    <span
      data-json="inner-value"
      className="px-2 py-1 mx-2 bg-blue-200 rounded-md"
    >
      {data}
    </span>
  );
};

const renderTranslatedValues = (
  content: object,
  fileIndex: number,
  path: string[] = [],
  selectedLang: string
) => {
  return Object.entries(content).map(([key, value]) => {
    const newPath = [...path, key];
    const indent = path.length;

    if (typeof value === "object" && !Array.isArray(value)) {
      return (
        <li key={key}>
          <div className="flex">
            {Array.from({ length: indent }).map((_, i) => (
              <span key={i} className="px-2 text-blue-500">
                {"|"}
              </span>
            ))}
            <h4
              data-json="top-key"
              className="text-xl font-medium text-blue-500"
            >
              {key}
            </h4>
          </div>
          <ul className="flex flex-col gap-2">
            {renderTranslatedValues(value, fileIndex, newPath, selectedLang)}
          </ul>
        </li>
      );
    }

    return (
      <li key={key}>
        {Array.from({ length: indent }).map((_, i) => (
          <span key={i} className="px-2 text-blue-500">
            {"|"}
          </span>
        ))}
        <span data-json="inner-key" className="font-medium text-blue-400">
          {key}
        </span>
        :
        <TranslatedText text={value} lang={selectedLang} />
      </li>
    );
  });
};
const parseRenderedHTML = (parentElement: HTMLElement) => {
  if (!parentElement) return;
  const elements = parentElement.querySelectorAll("[data-json]");
  const result: any = {};
  elements.forEach((element) => {
    const key = element.getAttribute("data-json");
    if (key === "top-key") {
      const nextSibling = element.nextSibling as HTMLElement;
      const value = parseRenderedHTML(nextSibling);
      const nKey = element.textContent;
      if (!nKey) return;
      result[nKey] = value;
    } else if (key === "inner-key") {
      const value = element.textContent;
      const parent = element.parentElement;
      if (!parent) return;
      const innerValueElement = parent.querySelector("[data-json=inner-value]");
      if (!innerValueElement) return;
      const innerValue = innerValueElement.textContent;
      if (!value || !innerValue) return;
      Object.assign(result, { [value]: innerValue });
    }
    // remove "data-json" attribute from the element to avoid parsing it again
    element.removeAttribute("data-json");
  });
  return result;
};

const Translator = () => {
  const [files, setFiles] = useState<{ file: File; content: object }[]>([]);
  const [showTranslated, setShowTranslated] = useState(false);
  const [selectedLang, setSelectedLang] = useState("ES");
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        const content = JSON.parse(reader.result as string);
        setFiles((prevFiles) => [...prevFiles, { file, content }]);
      };
      reader.readAsText(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const renderOriginalValues = (
    content: object,
    fileIndex: number,
    path: string[] = []
  ) => {
    return Object.entries(content).map(([key, value]) => {
      const newPath = [...path, key];
      const indent = path.length;

      if (typeof value === "object" && !Array.isArray(value)) {
        return (
          <li key={key}>
            <div className="flex">
              {Array.from({ length: indent }).map((_, i) => (
                <span key={i} className="px-2 text-slate-500">
                  {"|"}
                </span>
              ))}
              <h4 className="text-xl font-medium text-slate-500">{key}</h4>
            </div>
            <ul className="flex flex-col gap-2">
              {renderOriginalValues(value, fileIndex, newPath)}
            </ul>
          </li>
        );
      }

      return (
        <li key={key}>
          {Array.from({ length: indent }).map((_, i) => (
            <span key={i} className="px-2 text-slate-500">
              {"|"}
            </span>
          ))}
          <span className="font-medium">{key}:</span>
          <span className="px-2 py-1 mx-2 rounded-md bg-slate-200">
            {value}
          </span>
        </li>
      );
    });
  };

  const handleGenerateJSON = () => {
    const parentElement = document.getElementById("parent-json");
    if (!parentElement) return;
    const result = parseRenderedHTML(parentElement);
    console.log(result);
    navigator.clipboard.writeText(JSON.stringify(result));
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
        <div className="flex w-full gap-4 justify-evenly">
          <ul>
            {files.map((file, index) => {
              return (
                <li key={index}>
                  <ul>{renderOriginalValues(file.content, index)}</ul>
                </li>
              );
            })}
          </ul>
          {showTranslated ? (
            <ul id="parent-json">
              <button
                className="fixed px-4 py-2 text-white bg-blue-500 rounded-md bottom-10 right-10 h-max"
                onClick={(e) => {
                  handleGenerateJSON();
                  const button = e.target as HTMLButtonElement;
                  button.textContent = "Copied! 🎉";
                  setTimeout(() => {
                    button.textContent = "Copy to clipboard";
                  }, 2000);
                }}
              >
                Copy to clipboard
              </button>
              {files.map((file, index) => {
                return (
                  <li key={index}>
                    <ul>
                      {renderTranslatedValues(
                        file.content,
                        index,
                        undefined,
                        selectedLang
                      )}
                    </ul>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="flex flex-col gap-4">
              <select
                className="py-2 pl-4 text-white rounded-md bg-cyan-500 h-max"
                onChange={(e) => {
                  setSelectedLang(e.target.value);
                }}
                defaultValue={selectedLang}
              >
                <option value="EN">English</option>
                <option value="FR">French</option>
                <option value="ES">Spanish</option>
                <option value="DE">German</option>
                <option value="IT">Italian</option>
                <option value="PT">Portuguese</option>
                <option value="RU">Russian</option>
              </select>
              <button
                className="self-start px-4 py-2 text-white bg-blue-500 rounded-md h-max"
                onClick={() => setShowTranslated(true)}
              >
                Translate
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Translator;
