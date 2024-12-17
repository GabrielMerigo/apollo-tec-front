import { CardProps } from "./components/Card";

export type IdType = string | number;

export interface ColumnType {
  id: string;
  status: string;
  statusColor: string;
  boldColor: string;
  cards: CardProps[];
}
