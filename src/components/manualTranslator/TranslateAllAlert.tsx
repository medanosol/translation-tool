import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Button } from "../button/Button";
import { useDeeplContext } from "../deeplContext/DeeplContext";

interface ChangeFileAlertProps {
  onAccept: () => void;
  isLoading: boolean;
}

const TranslateAllAlert: React.FC<ChangeFileAlertProps> = ({
  onAccept,
  isLoading,
}) => {
  const { deeplApiKey } = useDeeplContext();
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <div>
          <Button disabled={isLoading || !deeplApiKey} type="button">
            {isLoading ? "Loading..." : "Translate all"}
          </Button>
        </div>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
        <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Are you sure?
          </AlertDialog.Title>
          <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
            This action might consume a lot of your Deepl API quota.
          </AlertDialog.Description>
          <div className="flex justify-end gap-[25px]">
            <AlertDialog.Cancel asChild>
              <div>
                <Button>Cancel</Button>
              </div>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <div>
                <Button
                  className="!text-red11 !bg-red4 hover:!bg-red5 focus:!shadow-red7"
                  onClick={onAccept}
                >
                  Yes, translate all
                </Button>
              </div>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default TranslateAllAlert;
