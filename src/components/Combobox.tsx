import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface ComboboxProps<T extends object> {
  idProp: string;
  labelProp: string;
  placeholder?: string;
  items: Array<T>;
  onSelect: (selection: T) => void;
}

function getStringProp(item: object | undefined, accessorKey: string): string {
  if (!item) return "";
  return item[accessorKey as keyof typeof item] as string;
}

export function Combobox<T extends object>({
  idProp,
  labelProp,
  placeholder = "Select",
  items,
  onSelect,
}: ComboboxProps<T>) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {id
            ? getStringProp(
                items.find((item) => getStringProp(item, idProp) === id),
                labelProp
              )
            : placeholder}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>No result</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={getStringProp(item, idProp)}
                  value={getStringProp(item, idProp)}
                  onSelect={(currentValue) => {
                    setId(currentValue === id ? "" : currentValue);
                    setOpen(false);
                    onSelect(item);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      id === getStringProp(item, id)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {getStringProp(item, labelProp)}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
