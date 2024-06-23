import { PropsWithChildren } from "react";

export type CardProps = PropsWithChildren<CardSpecificProps>;

interface CardSpecificProps {
  className?: string;
}
