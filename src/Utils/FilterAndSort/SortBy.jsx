import React from "react";
import { Select, OutlinedInput, MenuItem, ListItemText, FormControl, InputLabel } from "@mui/material";
import styles from '../../Components/Components.module.css';


const SortBy = ({ fields, selectedSort, onChange }) => {
    return (
        <FormControl className={styles.formControlSelect}>
            <InputLabel>Sort by</InputLabel>
            <Select
                value={selectedSort}
                onChange={onChange}
                input={
                    <OutlinedInput
                        label="Tag"
                        sx={{
                            '& .css-14lo706': {
                                width: '4em',
                            },
                        }}
                    />
                }
            >
                {
                    fields.map(field => (
                        <MenuItem
                            key={field.id}
                            value={field.label}
                        >
                            <ListItemText
                                style={{ margin: '0' }}
                                primary={field.label}
                            />
                        </MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    );
};

export default SortBy;