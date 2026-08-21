import { AlertTriangle } from "lucide-react";
import Modal from "./Modal";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  danger?: boolean;
}

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  danger = false,
}: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onClose} title={title} size="sm">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className={`p-3 rounded-full ${danger ? "bg-red-100" : "bg-amber-100"}`}>
          <AlertTriangle className={danger ? "text-red-500" : "text-amber-500"} size={24} />
        </div>
        <p className="text-slate-600 text-sm leading-relaxed">{message}</p>
        <div className="flex gap-3 w-full">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-slate-200 rounded-xl text-sm text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => { onConfirm(); onClose(); }}
            className={`flex-1 px-4 py-2 rounded-xl text-sm text-white font-medium transition-colors ${
              danger ? "bg-red-500 hover:bg-red-600" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
}
