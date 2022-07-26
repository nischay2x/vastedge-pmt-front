import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { Button, IconButton } from '@mui/material';
import { Box } from '@mui/system';

export function actionCell(params, setAction) {
    return (
        <>
            <button className='btn btn-warning py-1 px-2 mr-1' onClick={() => { setAction({ type: "EDIT", data: params.data }) }}>
                <EditIcon fontSize='inherit' />
            </button>
            <button className='btn btn-danger py-1 px-2' onClick={() => { setAction({ type: "DELETE", data: params.data }) }} >
                <DeleteIcon fontSize='inherit' />
            </button>
        </>
    )
}