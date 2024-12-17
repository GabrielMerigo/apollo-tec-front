import { InputHTMLAttributes } from "react";
import "./styles.css";
import { ActionBar } from "../ActionBar/ActionBar";
import { Control, FieldValues, Path } from "react-hook-form";

export interface HeaderProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  name: Path<T>;
  control: Control<T>;
  onSearchInput?: (value: string) => void;
  buttonLabel: string;
  onAdd?: () => void;
  onFilter?: () => void;
  onToggle?: () => void;
  onImport?: () => void;
}

export const Header = <T extends FieldValues>({
  title,
  name,
  control,
  onSearchInput,
  buttonLabel,
  onAdd,
  onToggle,
  onFilter,
  onImport,
}: HeaderProps<T>) => {
  return (
    <header>
      <div className="container w-100">
        <h3 className="fw-semibold mb-4">{title}</h3>
        <div className="row mb-4">
          <ActionBar
            control={control}
            name={name}
            onImport={onImport}
            buttonLabel={buttonLabel}
            onAdd={onAdd}
            onToggle={onToggle}
            onFilter={onFilter}
            onSearchInput={onSearchInput}
          />
        </div>
      </div>
    </header>
  );
};
