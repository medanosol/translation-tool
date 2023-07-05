import Select, { SelectItem } from '../Select';

interface ILanguageSelect {
  placeholder?: string;
  name: string;
}
export const LanguageSelect: React.FC<ILanguageSelect> = ({
  name,
  placeholder,
}) => {
  return (
    <Select placeholder={placeholder || 'Select a language...'} name={name}>
      <SelectItem value="EN">English</SelectItem>
      <SelectItem value="FR">French</SelectItem>
      <SelectItem value="ES">Spanish</SelectItem>
      <SelectItem value="DE">German</SelectItem>
      <SelectItem value="IT">Italian</SelectItem>
      <SelectItem value="PT">Portuguese</SelectItem>
      <SelectItem value="RU">Russian</SelectItem>
    </Select>
  );
};
