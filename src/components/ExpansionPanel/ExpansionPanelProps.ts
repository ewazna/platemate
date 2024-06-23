import { PropsWithChildren } from "react";

export type ExpansionPanelProps =
  PropsWithChildren<ExpansionPanelSpecificProps>;

interface ExpansionPanelSpecificProps {
  title: string;
}
