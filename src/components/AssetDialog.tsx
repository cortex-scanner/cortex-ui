import { z } from "zod/v4";
import { useForm } from "@tanstack/react-form";
import { forwardRef, useImperativeHandle, useState } from "react";
import type { Asset } from "@/types/asset.ts";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Spinner } from "@/components/ui/spinner.tsx";

const formSchema = z.object({
  endpoint: z.hostname({
    message: "Endpoint must be a valid hostname",
  }),
});

export interface AssetDialogRef {
  openDialog: (asset?: Asset) => void;
  closeDialog: () => void;
}

export type AssetDialogResult = z.infer<typeof formSchema>;

interface AssetDialogProps {
  onConfirm?: (values: AssetDialogResult) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

const AssetDialog = forwardRef<AssetDialogRef, AssetDialogProps>(
  ({ onConfirm, onCancel, isLoading }, ref) => {
    const [open, setOpen] = useState(false);

    // expose control methods to parent
    useImperativeHandle(ref, () => ({
      openDialog: (asset?: Asset) => {
        if (asset) {
          // TODO: set values
        } else {
          // clear fields
          form.reset();
        }
        setOpen(true);
      },
      closeDialog: () => setOpen(false),
    }));

    const form = useForm({
      defaultValues: {
        endpoint: "",
      },
      validators: { onSubmit: formSchema },
      onSubmit: ({ value }) => {
        if (onConfirm) {
          onConfirm(value);
        }
      },
    });

    const handleCancel = () => {
      if (onCancel) {
        onCancel();
      }
      setOpen(false);
    };

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Asset</DialogTitle>
            <DialogDescription>Edit asset properties</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <form
              id="asset-form"
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
            >
              <FieldGroup>
                <form.Field
                  name="endpoint"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Endpoint</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="Asset endpoint (hostname)"
                          autoComplete="off"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                ></form.Field>
              </FieldGroup>
            </form>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              onClick={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
            >
              {isLoading && <Spinner />}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
);
export default AssetDialog;
