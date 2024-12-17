import { ChangeEvent, InputHTMLAttributes } from "react";
import clsx from "clsx";
import "./styles.css";
import { TbCloudUpload } from "react-icons/tb";
import { MdOutlineFilterList } from "react-icons/md";
import { ButtonIcon } from "../ButtonIcon/ButtonIcon";
import { SearchInput } from "../SearchInput/SearchInput";
import { AddButton } from "../AddButton/AddButton";
import ToggleSwitch from "../ViewToggle";
import { Control, FieldValues, Path } from "react-hook-form";

export interface ActionBarProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  onSearchInput?: (value: string) => void;
  buttonLabel: string;
  onFilter?: () => void;
  onToggle?: () => void;
  onImport?: () => void;
  onAdd?: () => void;
  control: Control<T>;
  name: Path<T>;
}

export const ActionBar = <T extends FieldValues>({
  control,
  name,
  onSearchInput,
  buttonLabel,
  onFilter,
  onToggle,
  onImport,
  onAdd,
}: ActionBarProps<T>) => {
  return (
    <div className="container w-100">
      <div className="row mb-4">
        <div className="col-12 d-flex flex-column flex-md-row justify-content-md-between align-items-md-center p-0">
          <div className="d-flex mt-4 mt-md-0 gap-md-3 gap-1">
            {onFilter && (
              <ButtonIcon
                label="Filtrar"
                iconLeft={<MdOutlineFilterList />}
                className={clsx("btn-light", "import-button")}
                onClick={onFilter}
              />
            )}
            {onSearchInput && (
              <SearchInput
                type="text"
                name={name}
                control={control}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  onSearchInput(e.target.value);
                }}
              />
            )}
          </div>

          <div className="d-flex justify-content-center align-items-center mt-4 mt-md-0 gap-md-3 gap-1 ">
            {onToggle && <ToggleSwitch onClick={() => onToggle()} />}
            {onImport && (
              <ButtonIcon
                label="Importar"
                iconLeft={<TbCloudUpload />}
                className={clsx("btn-light", "import-button")}
                onClick={onImport}
              />
            )}
            {onAdd && (
              <AddButton
                className={clsx("btn-light")}
                label={buttonLabel}
                onClick={onAdd}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
