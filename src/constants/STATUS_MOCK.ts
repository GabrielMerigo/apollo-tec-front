export enum StatusTypeEnum {
  QUALIFIED = "Qualificado",
  REJECTED = "Rejeitado",
  PENDING = "Pendente",
}

export const statusTypeStyles = {
  [StatusTypeEnum.QUALIFIED]: {
    backgroundColor: "#EAFDEE",
    color: "#147129",
  },
  [StatusTypeEnum.REJECTED]: {
    backgroundColor: "#FFE0E0",
    color: "#CD0000",
  },
  [StatusTypeEnum.PENDING]: {
    backgroundColor: "#ECECEE",
    color: "#2A2A2A",
  },
};
