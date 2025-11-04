import {
  Item,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item.tsx";
import { Spinner } from "@/components/ui/spinner.tsx";

export const LoadingIndicator = ({ text }: { text?: string }) => (
  <Item variant="muted">
    <ItemMedia>
      <Spinner />
    </ItemMedia>
    <ItemContent>
      <ItemTitle className="line-clamp-1">{text || "Loading"}</ItemTitle>
    </ItemContent>
  </Item>
);
