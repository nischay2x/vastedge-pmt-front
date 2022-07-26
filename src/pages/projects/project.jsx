import React, { useState, useEffect } from 'react'

import { Box, Typography, TextField, Grid, Button } from "@mui/material"
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CircularProgress } from '@material-ui/core';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useSelector } from "react-redux";

import { createProject, deleteProject, getProjects, updateProject } from '../../api/project';
import { handleAxiosError } from '../../config/action-config';

import { projectsTable as tableDef } from '../../config/grid-columns-defs';
import ControlledTable from '../../component/ControlledTable';
import DeleteAlertDialog from '../../component/DeleteAlertDialog';
import UpdateDialog from '../../component/UpdateDialog';
import CreateDialog from '../../component/CreateDialog';

const emptyUpdateData = {
    project_name: "", project_type: "", project_description: "", budget: "",
    start_date: "", end_date: "", status: ""
}

const emptyNewProjectData = {
    project_name: "", project_description: "", project_type: "", status: "",
    start_date: "", end_date: "", customer_id: "", budget: ""
}

export default function Project() {
    const user = useSelector(state => state.user);

    const [totalCount, setTotalCount] = useState(0);

    const [rows, setRows] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);

    const [refreshCounter, setRefreshCounter] = useState(0);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [updateDialogOpen, setUpdateDialogeOpen] = useState(false);
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(-1);
    const [updateId, setUpdateId] = useState(-1);

    const [action, setAction] = useState({ type: "", data: null });

    const [updateData, setUpdateData] = useState(emptyUpdateData);
    const [newProjectData, setNewProjectData] = useState(emptyNewProjectData);

    const onNewProjectSubmit = () => {
        createProject(newProjectData, user.token).then(res => {
            alert(res.data.msg);
            setNewProjectData(emptyNewProjectData);
            setCreateDialogOpen(false);
        }).catch(err => {
            handleAxiosError(err);
            setCreateDialogOpen(false);
        })
    }

    useEffect(() => {
        if (!action.type) return;
        switch (action.type) {
            case 'EDIT': {
                setUpdateDialogeOpen(true);
                const up = getUpdatableData(action.data);
                setUpdateData(up);
                break;
            }
            case 'DELETE': setDeleteDialogOpen(true); break;
            default: break;
        }
    }, [action]);

    useEffect(() => {
        if (deleteId === -1) return;
        deleteProject(deleteId, user.token).then((res) => {
            alert(res.data.msg);
            setDeleteId(-1);
            setDeleteDialogOpen(false);
            setRefreshCounter(prev => ++prev);
        }).catch((err) => { 
            handleAxiosError(err); 
            setDeleteId(-1); 
            setDeleteDialogOpen(false); 
        });
    }, [deleteId])

    useEffect(() => {
        if (updateId === -1) return;
        updateProject(updateId, updateData, user.token).then(res => {
            alert(res.data.msg);
            setUpdateId(-1);
            setUpdateData(emptyUpdateData);
            setUpdateDialogeOpen(false);
            setRefreshCounter(prev => ++prev);
        }).catch((err) => { 
            handleAxiosError(err); 
            setUpdateId(-1); 
            setUpdateDialogeOpen(false); 
        })
    }, [updateId])

    const getRows = async (numRows, startRow) => {
        return getProjects({ limit: numRows, offset: startRow, sort: 'creation_date' }, user.token)
            .then(res => {
                setTotalCount(res.data.total);
                return res.data.data
            })
            .catch((err) => { handleAxiosError(err); return [] })
    }

    
    const changeUpdateData = (e) => {
        setUpdateData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
    const changeNewProjectData = (e) => {
        setNewProjectData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    return (
        <Box sx={{ flexGrow: 1, p: 5 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between"}}>
                <Typography variant='h6'>Projects Running</Typography>
                <Button variant='contained' sx={{ px: 5, py: 3 }} 
                    onClick={() => { setCreateDialogOpen(true); }}
                >Add Project</Button>
            </Box>
            <br />
            <ControlledTable rows={rows} columnDefs={tableDef} getRows={getRows}
                totalCount={totalCount} onChange={setRows} onPageNumberChange={setPageNumber}
                pageSize={10} pageNumber={pageNumber} pagination={true}
                getRowNodeId={({ data }) => data?.id || data?.name}
                hasActionButtons={true} setAction={setAction} refreshCounter={refreshCounter}
            />
            <DeleteAlertDialog open={deleteDialogOpen} setOpen={setDeleteDialogOpen} setDeleteId={setDeleteId} rowId={action.data?.id} />
            <UpdateDialog open={updateDialogOpen} setOpen={setUpdateDialogeOpen} setUpdateId={setUpdateId} rowId={action.data?.id}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField margin="dense" name='project_name' fullWidth value={updateData.project_name}
                            onChange={changeUpdateData} label="Project Name" type="text" variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField margin="dense" name='project_type' fullWidth value={updateData.project_type}
                            onChange={changeUpdateData} label="Project Type" type="text" variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField margin="dense" name='budget' fullWidth value={updateData.budget}
                            onChange={changeUpdateData} label="Budget" type="number" variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField margin="dense" name='status' fullWidth value={updateData.status}
                            onChange={changeUpdateData} label="Project Status" type="text" variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField margin="dense" name='project_description' fullWidth value={updateData.project_description}
                            onChange={changeUpdateData} label="Project Description" type="text" variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Start Date"
                                value={updateData.start_date}
                                onChange={(newValue) => {
                                    changeUpdateData({ target: { name: 'start_date', value: newValue } })
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} helperText={params?.inputProps?.placeholder} />
                                )}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="End Date"
                                value={updateData.end_date}
                                onChange={(newValue) => {
                                    changeUpdateData({ target: { name: 'end_date', value: newValue } })
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} helperText={params?.inputProps?.placeholder} />
                                )}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
            </UpdateDialog>
            <CreateDialog open={createDialogOpen} setOpen={setCreateDialogOpen} onSubmit={onNewProjectSubmit} >
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField margin="dense" name='project_name' fullWidth value={newProjectData.project_name}
                            onChange={changeNewProjectData} label="Project Name" type="text" variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField margin="dense" name='project_type' fullWidth value={newProjectData.project_type}
                            onChange={changeNewProjectData} label="Project Type" type="text" variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField margin="dense" name='budget' fullWidth value={newProjectData.budget}
                            onChange={changeNewProjectData} label="Budget" type="number" variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField margin="dense" name='customer_id' fullWidth value={newProjectData.customer_id}
                            onChange={changeNewProjectData} label="Customer Id" type="number" variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField margin="dense" name='status' fullWidth value={newProjectData.status}
                            onChange={changeNewProjectData} label="Project Status" type="text" variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField margin="dense" name='project_description' fullWidth value={newProjectData.project_description}
                            onChange={changeNewProjectData} label="Project Description" type="text" variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Start Date"
                                value={newProjectData.start_date}
                                onChange={(newValue) => {
                                    changeNewProjectData({ target: { name: 'start_date', value: newValue } })
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} helperText={params?.inputProps?.placeholder} />
                                )}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="End Date"
                                value={newProjectData.end_date}
                                onChange={(newValue) => {
                                    changeNewProjectData({ target: { name: 'end_date', value: newValue } })
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} helperText={params?.inputProps?.placeholder} />
                                )}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
            </CreateDialog>
        </Box>
    )
}

// project_name, project_type, desc, budget, start_date, end, status
function getUpdatableData (data) {
    return {
        project_name : data.project_name,
        project_description: data.project_description,
        project_type: data.project_type,
        budget: data.budget,
        start_date: data.start_date,
        end_date: data.end_date,
        status: data.status
    }
}