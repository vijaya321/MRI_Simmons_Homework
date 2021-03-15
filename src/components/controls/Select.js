import { FormControl, InputLabel, Select as MuiSelect, MenuItem } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    dropDown: {
    width: '95%',
    margin: '2% 2%'
  }
})

function Select(props) {
    const { label, onChange, name, value, options } = props
    const classes = useStyles();

    return (
        <FormControl variant = 'outlined' className={classes.dropDown}>
            <InputLabel>{label}</InputLabel>
            <MuiSelect label={label} name={name} value={value} onChange={onChange}>
                {
                    options.map(
                        item => (<MenuItem key={item} value={item.id}>{item.name}</MenuItem>)
                    )
                }
            </MuiSelect>
        </FormControl>
    )
}

export default Select