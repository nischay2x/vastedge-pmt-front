import React, { useEffect, useCallback, useState, useRef } from "react";

import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
// import "ag-grid-community/dist/styles/ag-theme-alpine.css";

// import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { actionCell } from "./GridCells";

const LoadingBlock = ({ getRows, pageSize, startRow, onLoaded }) => {
  const [rows, setRows] = useState();

  useEffect(() => {
    let cleaningUp;
    getRows(pageSize, startRow).then(rows => {
      if (cleaningUp) return;
      
      setRows(rows);
    });
    return () => {
      cleaningUp = true;
    };
  }, [getRows, pageSize, startRow]);

  useEffect(() => {
    if (!rows) {
      return;
    }
    onLoaded(rows, startRow);
  }, [onLoaded, rows, startRow]);

  return null;
};

function ControlledTable ({ 
    rows, totalCount, getRows, onChange, onApiAvailable, onPageNumberChange, 
    pagination, pageSize, pageNumber, components, columnDefs, getRowNodeId,
    hasActionButtons, setAction, refreshCounter
}) {
  const [gridApi, setGridApi] = useState();
  const gridRef = useRef();
  const [loadingBlocks, setLoadingBlocks] = useState([]);
  let paginationProps = {};

  if(hasActionButtons) {
    if(!columnDefs.some(c => c.headerName === 'Actions'))
    columnDefs.push({
      headerName: "Actions", resizable: true, minWidth: 150, 
      cellRenderer: (params) => actionCell(params, setAction)
    })
  }

  if (pagination) {
    paginationProps = {
      pagination,
      paginationPageSize: pageSize,
      cacheBlockSize: pageSize
    };
  }

  useEffect(() => {
    if(refreshCounter) {}
    // gridRef.current.api.refreshClientSide({ route: [], purge: true });
  }, [refreshCounter])

  const getPlaceholderItems = (startRow, length) => {
    const items = [];
    for (let index = startRow; index < length; index += 1) {
      items.push({ index, placeholder: true });
    }
    return items;
  };

  const isPlaceholder = useCallback((i) => !rows[i] || rows[i].placeholder, [rows]);

  const needsLoading = useCallback(
    (startRow) => {
      if (!rows?.length) {
        // We need to load if rows are completely empty
        return true;
      }
      const max = Math.min(startRow + pageSize, rows.length);
      for (let i = startRow; i < max; i += 1) {
        if (isPlaceholder(i)) {
          return true;
        }
      }
    },
    [rows, pageSize, isPlaceholder]
  );

  if (rows?.length < totalCount) {
    rows.splice(
      rows.length,
      0,
      ...getPlaceholderItems(rows.length, totalCount)
    );
  }

  useEffect(() => {
    if (!gridApi || isNaN(pageNumber)) {
      return;
    }
    const currentPage = gridApi.paginationGetCurrentPage();
    if (pageNumber === currentPage) {
      return;
    }
    gridApi.paginationGoToPage(pageNumber);
  }, [gridApi, pageNumber]);

  const onGridReady = useCallback(
    ({ api }) => {
      setGridApi(api);
      if (onApiAvailable) {
        onApiAvailable(api);
      }
    },
    [onApiAvailable]
  );

  const onLoaded = useCallback(
    (newRows, startRow) => {
      // We've loaded the block. Update the rows array
      let rowsCopy = [...rows];
      rowsCopy.splice(startRow, pageSize, ...newRows);
      const newLoadingBlocks = [...loadingBlocks];
      newLoadingBlocks.splice(newLoadingBlocks.indexOf(startRow), 1);
      setLoadingBlocks(newLoadingBlocks);
      onChange(rowsCopy);
    },
    [rows, pageSize, loadingBlocks, onChange]
  );

  const onPaginationChanged = useCallback(
    ({ newPage }) => {
      if (!gridApi || !newPage) {
        return;
      }
      const currentPage = gridApi.paginationGetCurrentPage();
      if (onPageNumberChange) {
        onPageNumberChange(currentPage);
      }
    },
    [gridApi, onPageNumberChange]
  );

  useEffect(() => {
    if (!gridApi) {
      return;
    }
    if (loadingBlocks.includes(pageNumber * pageSize)) {
      gridApi.showLoadingOverlay();
    } else {
      gridApi.hideOverlay();
    }
  }, [gridApi, pageNumber, pageSize, loadingBlocks]);

  useEffect(() => {
    const startRow = pageNumber * pageSize;
    if (!loadingBlocks.includes(startRow) && needsLoading(startRow)) {
      // We haven't started loading the block yet. Start loading it
      setLoadingBlocks([...loadingBlocks, startRow]);
    }
  }, [loadingBlocks, pageNumber, pageSize, needsLoading]);

  return (
    <div aria-live="polite" aria-busy={loadingBlocks.includes(pageNumber * pageSize)} 
        className="ag-theme-material" style={{ height: "500px" }}
    >
      <AgGridReact ref={gridRef} columnDefs={columnDefs} components={components} rowData={rows} 
        rowCount={totalCount} serverSideInfiniteScroll={true} rowModelType="clientSide"
        onPaginationChanged={onPaginationChanged} getRowId={getRowNodeId} onGridReady={onGridReady}
        {...paginationProps}
        defaultColDef={{
          flex: 1,
          minWidth: 100
        }}
      />
      {loadingBlocks.map((startRow) => (
        <LoadingBlock key={`loadingBlock:${startRow}`} getRows={getRows} startRow={startRow} 
            pageSize={pageSize} onLoaded={onLoaded}
        />
      ))}
    </div>
  );
};

export default ControlledTable;
