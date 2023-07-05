import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import * as RadixSelect from "@radix-ui/react-select";
import clsx from "clsx";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

// extends the html native select element
interface SelectProps {
  placeholder?: string;
  children: React.ReactNode;
  name: string;
}

const Select: React.FC<SelectProps> = ({ placeholder, children, name }) => {
  const methods = useFormContext();
  return (
    <Controller
      control={methods.control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <RadixSelect.Root
          onValueChange={(value) => onChange?.(value as any)}
          value={value}
        >
          <RadixSelect.Trigger
            className="inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-sky-50 text-sky-500 shadow-[0_2px_10px] shadow-black/10 hover:bg-sky-50  data-[placeholder]:text-sky-200 outline-none"
            aria-label="Food"
          >
            <RadixSelect.Value placeholder={placeholder} />
            <RadixSelect.Icon className="text-sky-500">
              <ChevronDownIcon />
            </RadixSelect.Icon>
          </RadixSelect.Trigger>
          <RadixSelect.Portal>
            <RadixSelect.Content className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
              <RadixSelect.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-sky-500 cursor-default">
                <ChevronUpIcon />
              </RadixSelect.ScrollUpButton>
              <RadixSelect.Viewport className="p-[5px]">
                <RadixSelect.Group>
                  {/* <RadixSelect.Label className="px-[25px] text-xs leading-[25px] text-mauve11">
              Languages
            </RadixSelect.Label> */}
                  {children}
                </RadixSelect.Group>
              </RadixSelect.Viewport>
              <RadixSelect.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-sky-500 cursor-default">
                <ChevronDownIcon />
              </RadixSelect.ScrollDownButton>
            </RadixSelect.Content>
          </RadixSelect.Portal>
        </RadixSelect.Root>
      )}
    />
  );
};

export const SelectItem: React.FC<RadixSelect.SelectItemProps> =
  React.forwardRef(({ children, className, ...props }, forwardedRef) => {
    return (
      <RadixSelect.Item
        className={clsx(
          "text-[13px] leading-none text-sky-500 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-sky-200 data-[highlighted]:text-sky-900",
          className
        )}
        {...props}
        ref={forwardedRef as any}
      >
        <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
        <RadixSelect.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
          <CheckIcon />
        </RadixSelect.ItemIndicator>
      </RadixSelect.Item>
    );
  });

export default Select;
