import { ReactNode, useMemo } from "react";

interface ValuesProps<T> {
  values: T[];
  options: T[];
  valueRender?: (value: T) => ReactNode;
  valueId?: (value: T) => string;
  optionLabelRender?: (value: T) => ReactNode;
  defaultOptionLabel?: ReactNode;
  addValue: (values: T) => void;
  addButtonLabel?: ReactNode;
  limit?: number;
  title: ReactNode;
  headerClass?: string;
  className?: string;
  valueListClassName?: string;
  optionClassName?: string;
  selectClassName?: string;
}

const Values = <T,>({
  values,
  options,
  valueRender,
  valueId,
  optionLabelRender,
  addValue,
  defaultOptionLabel = "--Select--",
  limit = Number.POSITIVE_INFINITY,
  title,
  headerClass = "",
  className = "border-t border-slate-700",
  valueListClassName = "flex items-center",
  optionClassName = "capitalize",
  selectClassName = "",
}: ValuesProps<T>) => {
  const onOptionSelect = (optionKey: string) => {
    const selectedOption = options.find(
      (option) => (valueId?.(option) ?? option) === optionKey,
    );
    if (selectedOption) addValue(selectedOption);
  };

  const selectedKeys = useMemo(
    () => new Set(values.map((value) => valueId?.(value) ?? value + "")),
    [values, valueId],
  );

  const allOptionsSelected = useMemo(() => {
    return options.every((option) =>
      selectedKeys.has(valueId?.(option) ?? option + ""),
    );
  }, [valueId, options, selectedKeys]);

  return (
    <fieldset className={className}>
      <legend className={headerClass}>{title}</legend>
      <div className={valueListClassName}>
        {values.map(
          (value) => valueRender?.(value) ?? <span>{value + ""}</span>,
        )}
        <select
          onChange={(e) => onOptionSelect(e.target.value)}
          defaultValue="default"
          className={`${allOptionsSelected || values.length >= limit ? "opacity-0" : ""} border border-slate-700 outline-none ${selectClassName}`}
          disabled={allOptionsSelected || values.length >= limit}
        >
          <option value="default" disabled hidden>
            {defaultOptionLabel}
          </option>
          {options.map((option) => (
            <option
              value={valueId?.(option) ?? option + ""}
              disabled={selectedKeys.has(valueId?.(option) ?? option + "")}
              className={optionClassName}
            >
              {optionLabelRender?.(option) ?? option + ""}
            </option>
          ))}
        </select>
      </div>
    </fieldset>
  );
};

export default Values;
