import React, { useState } from 'react';
import {  useDispatch } from "react-redux";
import { Navigate } from 'react-router-dom';

import { TextField, Grid, Button } from "@mui/material"
import { Box } from '@mui/system';
import { loginWithEmail } from '../../actions/auth';

export default function Login({ loggedIn }) {

    const dispatch = useDispatch();

    const [data, setData] = useState({ email: "", password: "" });
    const onInputChange = (e) => {
        setData(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        dispatch(loginWithEmail(data))
    }

    return (
        loggedIn ? <Navigate to="/" replace/> :
        <div className='page d-flex bg-info'>
            <div className="card col-11 col-sm-9 col-md-8 col-lg-5 col-xl-4 card-body m-auto bg-white">
                <div className="text-center">
                    <h3>Login</h3>
                </div>
                <br />
                <form onSubmit={onFormSubmit}>
                    <Grid container direction='column' spacing={2}>
                        <Grid item>
                            <TextField variant='outlined' fullWidth label="Email" type="email" name='email' required value={data.email} onChange={onInputChange} />
                        </Grid>
                        <Grid item>
                            <TextField variant='outlined' fullWidth label="Password" type="password" name='password' required value={data.password} onChange={onInputChange} />
                        </Grid>
                        <Grid item>
                            <Box textAlign='center'>
                                <Button type='submit' variant='contained'>Log In</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </div>
    )
}
