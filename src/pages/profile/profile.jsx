import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    label: {
        color: "grey",
        fontWeight: "bold",
    },
    text: {
        color: "black"
    },
}));

export default function Profile() {

    const user = useSelector(state => state.user);
    const classes = useStyles();

    useEffect(() => {
        console.log(user);
    }, [user])

    return (
        <Box sx={{ flexGrow: 1, p: 5}}>
            <Typography className={classes.label}>Name</Typography>
            <Typography className={classes.text}>
                {user.firstname}
            </Typography>
            <Typography className={classes.label}>Email</Typography>
            <Typography className={classes.text}>
                {user.email}
            </Typography>
            <Typography className={classes.label}>Phone</Typography>
            <Typography className={classes.text}>
                {user.contact}
            </Typography>
            <Typography className={classes.label}>Address</Typography>
            <Typography className={classes.text}>
                {user.address}
            </Typography>
        </Box>
    )
}
