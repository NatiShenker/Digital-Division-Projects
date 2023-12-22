import React, { useState } from "react";
import { Table, TableHead, TableCell, TableRow, TableBody, Dialog, DialogTitle } from "@mui/material";
import styles from '../../Components/Components.module.css';


const ProjectsTable = ({ projectsList, tableHeaders }) => {

    const [dialogOpen, setDialogOpen] = useState(false)
    const [rowToOpen, setRowToOpen] = useState(null)

    const handleDialog = () => {
        setDialogOpen(open => !open)
    }

    const handleRowToOpen = (e, row) => {
        setRowToOpen(prevRow => row)
        handleDialog()
    }

    return (
        <Table>
            <TableHead>
                <TableRow style={{ display: 'flex' }}>
                    {
                        tableHeaders.map(header => (
                            <TableCell
                                key={header.Id}
                                className={styles.tableCell}
                            >
                                <h3>{header.label}</h3>
                            </TableCell>
                        ))
                    }
                </TableRow>
            </TableHead>
                
            <TableBody>
                {
                    projectsList.length > 0
                    ? projectsList.map(project => (
                        <div>
                            <TableRow
                                key={projectsList[project]}
                                onClick={(e) => handleRowToOpen(e, project)}
                                style={{ display: 'flex' }}
                            >
                                {
                                    Object.values(project).map(projectDetail => (
                                        <TableCell
                                            className={styles.tableCell}
                                            key={projectDetail}
                                        >
                                            {projectDetail}
                                        </TableCell>
                                    ))
                                }
                            </TableRow>
                            <Dialog
                                key={projectsList[project]}
                                open={dialogOpen}
                                onClose={() => handleRowToOpen()}
                                sx={{
                                    '& .css-yiavyu-MuiBackdrop-root-MuiDialog-backdrop': {
                                        backgroundColor: 'unset',
                                    },
                                }}
                            >
                                {
                                    rowToOpen &&
                                    Object.values(rowToOpen).map(rowDetail => (
                                        <DialogTitle
                                            key={rowDetail}
                                            style={{ margin: '2em' }}
                                        >
                                            {rowDetail}
                                        </DialogTitle>
                                    ))
                                }
                            </Dialog>
                        </div>
                    ))
                    : <h2>Nothing Matched Your Search</h2>
                }
            </TableBody>

        </Table>
    );

};

export default ProjectsTable;