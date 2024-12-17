import { InputHTMLAttributes } from "react";
import { Form } from "react-bootstrap";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

export interface SearchInputProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  control: Control<T>;
  onSearchInput?: (value: string) => void;
}

export const SearchInput = <T extends FieldValues>({
  name,
  control,
  onSearchInput,
}: SearchInputProps<T>) => {
  return (
    <Form.Group className="position-relative" style={{ maxWidth: "25rem" }}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Form.Control
            {...field}
            placeholder="Buscar"
            type="text"
            id="search"
            aria-describedby="search"
            style={{
              width: "400px",
              paddingLeft: "2.6rem",
              borderRadius: "8px",
            }}
            onChange={(e) => {
              field.onChange(e);
              if (onSearchInput) {
                onSearchInput(e.target.value);
              }
            }}
          />
        )}
      />
      <HiOutlineMagnifyingGlass
        style={{
          fontSize: "24px",
          position: "absolute",
          top: "50%",
          left: "0.75rem",
          transform: "translateY(-50%)",
          color: "#6c757d",
          pointerEvents: "none",
        }}
      />
    </Form.Group>
  );
};
