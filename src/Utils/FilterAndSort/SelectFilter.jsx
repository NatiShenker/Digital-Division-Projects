import React from "react";
import { Select, OutlinedInput, MenuItem, ListItemText, Checkbox, FormControl, InputLabel } from "@mui/material";
import styles from '../../Components/Components.module.css';


const SelectFilter = ({ array, textForSelect, manager, onChange, checked }) => {

    const [ ...managers ] = new Set(array.map(obj => (
        obj[textForSelect]
        ))
    )


    return (
        <FormControl className={styles.formControlSelect}>
            <InputLabel>Select</InputLabel>
            <Select
                multiple
                value={manager}
                onChange={onChange}
                input={
                    <OutlinedInput
                        label="Tag"
                        sx={{
                            '& .css-14lo706': {
                                width: '3.5em',
                            },
                        }}
                    />
                }
                renderValue={(selected) => selected.join(', ')}
            >
                {
                    managers.map(man => (
                        <MenuItem
                            key={man}
                            value={man}
                        >
                            <Checkbox
                                key={man}
                                checked={man === checked.find(m => m.includes(man))}
                            />
                            <ListItemText primary={man} />
                        </MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    );
};

export default SelectFilter;