import { PropsWithChildren } from "react";

export type CardProps = PropsWithChildren<CardSpecificProps>;

interface CardSpecificProps {
  className?: string;
  popover?: "" | "auto" | "manual" | undefined;
}
