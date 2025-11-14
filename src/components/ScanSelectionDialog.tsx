import { forwardRef, useImperativeHandle, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { ScanConfig } from "@/types/scan.ts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { listScanConfigs } from "@/api/scans.ts";
import { Combobox } from "@/components/Combobox.tsx";

export interface ScanSelectionDialogRef {
  openDialog: () => void;
  closeDialog: () => void;
}

interface ScanSelectionDialogProps {
  onConfirm?: (scanConfig: ScanConfig) => void;
  onCancel?: () => void;
}

const ScanSelectionDialog = forwardRef<
  ScanSelectionDialogRef,
  ScanSelectionDialogProps
>(({ onConfirm, onCancel }, ref) => {
  const query = useQuery({
    queryKey: ["scan-confis"],
    queryFn: listScanConfigs,
    initialData: [],
  });

  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState<ScanConfig | null>(null);

  // expose control methods to parent
  useImperativeHandle(ref, () => ({
    openDialog: () => {
      setSelection(null);
      setOpen(true);
    },
    closeDialog: () => setOpen(false),
  }));

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    setOpen(false);
  };

  const onSelect = (selected: ScanConfig) => {
    setSelection(selected);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Select Scan Configuration</DialogTitle>
          <DialogDescription>
            Select a scan configuration to run
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 w-full">
          <Combobox
            idProp="id"
            labelProp="name"
            items={query.data}
            onSelect={onSelect}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            disabled={selection === null || query.isLoading}
            onClick={(e) => {
              e.preventDefault();
              if (onConfirm && selection != null) {
                onConfirm(selection);
              }
              setOpen(false);
            }}
          >
            Run
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});
export default ScanSelectionDialog;
