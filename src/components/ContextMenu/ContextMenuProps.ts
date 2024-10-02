import { PropsWithChildren } from "react";

export type ContextMenuProps = PropsWithChildren<ContextMenuSpecificProps>;

interface ContextMenuSpecificProps {
  id: string;
  className?: string;
}
