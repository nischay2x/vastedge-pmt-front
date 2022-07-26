import React, { useState } from 'react'
import { Box, Typography } from "@mui/material"
import { useSelector } from "react-redux";

import { getEmployees } from '../../api/employee';
import { handleAxiosError } from '../../config/action-config';

import { employeesTable as tableDef } from '../../config/grid-columns-defs';
import ControlledTable from '../../component/ControlledTable';

export default function Employee() {

  const user = useSelector(state => state.user);

  const [totalCount, setTotalCount] = useState(0);

  const [rows, setRows] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const getRows = async (numRows, startRow) => {
    return getEmployees({ limit: numRows, offset: startRow, sort: 'creation_date' }, user.token)
      .then(res => {
        setTotalCount(res.data.total);
        return res.data.data
      })
      .catch((err) => { handleAxiosError(err); return [] })
  }

  return (
    <Box sx={{ flexGrow: 1, p: 5 }}>
      <Typography variant='h6'>Employees In Company</Typography>
      <br />
      <ControlledTable rows={rows} columnDefs={tableDef} getRows={getRows}
        totalCount={totalCount} onChange={setRows} onPageNumberChange={setPageNumber}
        pageSize={10} pageNumber={pageNumber} pagination={true}
        getRowNodeId={(data) => data?.name || data?.index}
      />
    </Box>
  )
}

