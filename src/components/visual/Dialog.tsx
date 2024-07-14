import { ReactNode, useEffect, useRef } from "react";

interface DialogProps {
  open: boolean;
  isModal?: boolean;
  onClose: () => void;
  title?: string;
  className?: string;
  headerClassName?: string;
}

const Dialog = ({
  open,
  isModal = false,
  onClose,
  children,
  title = isModal ? "Modal" : "Dialog",
  className = "",
  headerClassName = "",
}: DialogProps & { children: ReactNode }) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    dialogRef.current?.close();
    if (open) {
      if (isModal) dialogRef.current?.showModal();
      else dialogRef.current?.show();
    }
  }, [open, isModal]);

  return (
    open && (
      <dialog
        ref={dialogRef}
        className={`${className} !z-max`}
        onClose={onClose}
      >
        <div className="flex flex-col">
          <div
            className={`${headerClassName} sticky top-0 flex justify-between`}
          >
            <span>{title}</span>
            <button type="button" onClick={onClose} className="px-1">
              X
            </button>
          </div>
          {children}
        </div>
      </dialog>
    )
  );
};

export default Dialog;
