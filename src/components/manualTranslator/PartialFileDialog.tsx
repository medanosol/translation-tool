import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "../button/Button";

interface PartialFileDialogProps {
  onUpload: (file: object) => void;
  lang: string;
}

const PartialFileDialog: React.FC<PartialFileDialogProps> = ({
  onUpload,
  lang,
}) => {
  const [open, setOpen] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        const content = JSON.parse(reader.result as string);
        onUpload(content);
        setOpen(false);
      };
      reader.readAsText(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger asChild>
        <div>
          <Button type="button">Import partially translated file</Button>
        </div>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
        <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Import partially translated file <b>in {lang}</b>.
          </AlertDialog.Title>
          <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
            <div
              {...getRootProps()}
              className={`w-full cursor-pointer p-4 border-2 border-dashed border-sky-500 bg-sky-100 ${
                isDragActive ? "bg-gray-200" : ""
              }`}
            >
              <div>
                <input {...getInputProps()} />
                <span className="text-sky-500">
                  Drag 'n' drop your i18n file here
                </span>
              </div>
            </div>
          </AlertDialog.Description>
          <div className="flex justify-end gap-[25px]">
            <AlertDialog.Cancel asChild>
              <div>
                <Button>Cancel</Button>
              </div>
            </AlertDialog.Cancel>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default PartialFileDialog;
