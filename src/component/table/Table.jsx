import { faFileCsv, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox } from "antd";
import { useRef } from "react";
import { Button } from "react-bootstrap";
import { CSVLink } from "react-csv";
import { useGlobalFilter, usePagination, useTable } from "react-table";
import { useReactToPrint } from "react-to-print";
import { GlobalFiltering } from "./tableHelpers/GlobalFiltering";
import PaginationTable from "./tableHelpers/PaginationTable";
import "./Table.css"; // Ensure your styles are defined here

const TableComponent = ({ columns, data }) => {
  const tableRef = useRef(null);
  const tableInstance = useTable(
    { columns, data },
    useGlobalFilter,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    getToggleHideAllColumnsProps,
    allColumns,
    state,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter } = state;

  const generatePDF = useReactToPrint({
    content: () => tableRef.current,
    documentTitle: "MemberData",
  });

  return (
    <div className="table-container">
      <div className="button-group">
        <GlobalFiltering filter={globalFilter} setFilter={setGlobalFilter} />
        <div className="toggle-container">
          <Checkbox {...getToggleHideAllColumnsProps()} />
          <span className="toggle-label">Toggle All</span>
          <div className="toggle-columns">
            {allColumns.map((column) => (
              <label key={column.id} className="toggle-column-label">
                <input type="checkbox" {...column.getToggleHiddenProps()} />
                {column.Header}
              </label>
            ))}
          </div>
        </div>
        <CSVLink data={data} className="csv-link">
          <Button variant="success" className="export-button">
            <FontAwesomeIcon icon={faFileCsv} />  CSV
          </Button>
        </CSVLink>

        <Button
          variant="success"
          className="export-button"
          onClick={generatePDF}
        >
          <FontAwesomeIcon icon={faFilePdf} />  PDF
        </Button>
      </div>

      <table
        {...getTableProps()}
        className="table table-striped table-hover table-bordered"
        ref={tableRef}
      >
        <thead className="table-header">
          {headerGroups.map((headerGroup) => (
            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                const { key, ...rest } = column.getHeaderProps();
                return (
                  <th key={column.id} {...rest} className="table-header-cell">
                    {column.render("Header")}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className="table-body" {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr key={row.id} {...row.getRowProps()} className="table-row">
                {row.cells.map((cell) => {
                  const { key, ...rest } = cell.getCellProps();
                  return (
                    <td key={cell.column.id} {...rest} className="table-cell">
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination-container">
        <PaginationTable previousPage={previousPage} nextPage={nextPage} />
      </div>
    </div>
  );
};

export default TableComponent;
