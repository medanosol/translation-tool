import Select, { SelectItem } from "../Select";

interface ILanguageSelect {
  placeholder?: string;
  label?: string;
  name: string;
}

export const PARSED_LANGUAGES: Record<string, string> = {
  EN: "English",
  FR: "French",
  ES: "Spanish",
  DE: "German",
  IT: "Italian",
  PT: "Portuguese",
  RU: "Russian",
};

export const LanguageSelect: React.FC<ILanguageSelect> = ({
  name,
  label,
  placeholder,
}) => {
  return (
    <label className="block mb-2 text-sm font-bold text-gray-700">
      {label && <span className="block mb-1 text-sky-500">{label}</span>}
      <Select placeholder={placeholder || "Select a language..."} name={name}>
        <SelectItem value="EN">English</SelectItem>
        <SelectItem value="FR">French</SelectItem>
        <SelectItem value="ES">Spanish</SelectItem>
        <SelectItem value="DE">German</SelectItem>
        <SelectItem value="IT">Italian</SelectItem>
        <SelectItem value="PT">Portuguese</SelectItem>
        <SelectItem value="RU">Russian</SelectItem>
      </Select>
    </label>
  );
};
