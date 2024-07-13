import { ReactNode } from "react";

export type TableColumn<T> = {
  label: string;
  dataKey: keyof T | "";
  customRender?: (row: T) => ReactNode;
};

interface TableProps<T> {
  columns: TableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  className?: string;
  headerCellClassName?: string;
  rowCellClassName?: (row: T) => string;
  emptyRowRender?: ReactNode;
  emptyRowCellClassName?: string;
}

const RowCellRender = <T,>({
  column,
  row,
}: {
  column: TableColumn<T>;
  row: T;
}) => {
  return column.customRender?.(row) ?? row[column.dataKey as keyof T] + "";
};

const Table = <T,>({
  columns,
  rows,
  rowKey,
  className = "",
  headerCellClassName = "",
  rowCellClassName = () => "",
  emptyRowRender = "Nothing here Chief",
  emptyRowCellClassName = "",
}: TableProps<T>) => {
  return (
    <table className={className}>
      <thead>
        <tr>
          {columns.map((column, idx) => (
            <th
              className={headerCellClassName}
              key={`header-cell-${idx}${column.dataKey.toString()}`}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 && (
          <tr>
            <td colSpan={columns.length} className={emptyRowCellClassName}>
              {emptyRowRender}
            </td>
          </tr>
        )}
        {rows.map((row) => (
          <tr key={rowKey(row)}>
            {columns.map((column, idx) => (
              <td
                className={rowCellClassName(row)}
                key={`body-cell-${idx}${column.dataKey.toString()}`}
              >
                <RowCellRender column={column} row={row} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
