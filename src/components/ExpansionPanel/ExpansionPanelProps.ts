import { PropsWithChildren } from "react";

export type ExpansionPanelProps = PropsWithChildren<ExpansionPanelSpecificProps>;

interface ExpansionPanelSpecificProps {
  className: string;
  title: string;
  isExpanded: boolean;
}
