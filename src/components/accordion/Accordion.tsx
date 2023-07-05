import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import React from "react";

export const AccordionItem: React.FC<Accordion.AccordionItemProps> =
  React.forwardRef(({ children, className, ...props }, forwardedRef) => (
    <Accordion.Item
      className={clsx(
        "focus-within:shadow-sky-900 mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10",
        className
      )}
      {...props}
      ref={forwardedRef as any}
    >
      {children}
    </Accordion.Item>
  ));

export const AccordionTrigger: React.FC<Accordion.AccordionTriggerProps> =
  React.forwardRef(({ children, className, ...props }, forwardedRef) => (
    <Accordion.Header className="flex">
      <Accordion.Trigger
        className={clsx(
          "text-sky-400 cursor-pointer shadow-sky-200 bg-sky-50 rounded-t-md hover:bg-sky-200 group flex h-[45px] flex-1  items-center justify-between  px-5 text-[15px] leading-none shadow-[0_1px_0] outline-none",
          className
        )}
        {...props}
        ref={forwardedRef as any}
      >
        {children}
        <ChevronDownIcon
          className="ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
          aria-hidden
        />
      </Accordion.Trigger>
    </Accordion.Header>
  ));

export const AccordionContent: React.FC<Accordion.AccordionContentProps> =
  React.forwardRef(({ children, className, ...props }, forwardedRef) => {
    return (
      <Accordion.Content
        className={clsx(
          "overflow-hidden text-[15px] py-[15px] px-5",
          className
        )}
        {...props}
        ref={forwardedRef as any}
      >
        {children}
      </Accordion.Content>
    );
  });
