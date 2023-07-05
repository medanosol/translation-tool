import * as RadixCollapsible from "@radix-ui/react-collapsible";
import { Cross2Icon, RowSpacingIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import React, { ReactNode } from "react";

interface CollapsibleProps {
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const Collapsible: React.FC<CollapsibleProps> = ({
  children,
  open,
  onOpenChange,
}) => {
  return (
    <RadixCollapsible.Root
      className={clsx(open ? "w-full" : "w-[30px]")}
      open={open}
      onOpenChange={onOpenChange}
    >
      <div
        className={clsx(
          "flex w-full my-2",
          open ? "justify-end" : "justify-center"
        )}
      >
        <RadixCollapsible.Trigger asChild>
          <button className="rounded-full rotate-90 h-[25px] w-[25px] inline-flex items-center justify-center text-sky-500 shadow-blackA7 outline-none data-[state=closed]:bg-sky-200 data-[state=open]:bg-sky-200 hover:bg-sky-300">
            {open ? <Cross2Icon /> : <RowSpacingIcon />}
          </button>
        </RadixCollapsible.Trigger>
      </div>
      <RadixCollapsible.Content>{children}</RadixCollapsible.Content>
    </RadixCollapsible.Root>
  );
};

export default Collapsible;
