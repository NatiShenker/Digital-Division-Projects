import React, { useMemo, useState } from "react";
import { Navigate } from 'react-router-dom';
import { Button, TextField, OutlinedInput } from '@mui/material';
import styles from '../../Components/Components.module.css';
import SelectFilter from "../../Utils/FilterAndSort/SelectFilter";
import SortBy from "../../Utils/FilterAndSort/SortBy";
import ProjectsTable from "./ProjectsTable";
import Projects from '../../StoredData/Projects.json';


const TableContainer = ({ currentUser, onSignOut }) => {

    const [...projectsList] = JSON.parse(JSON.stringify(Projects.projects));
    console.log('Projects list fetched')
    const [searchStr, setSearchStr] = useState('');
    const [manager, setManager] = useState([]);
    
    const tableHeaders = [
        {
            label: 'Project Name',
            keyText: 'projectName',
            id: 1
        },
        {
            label: 'Date Started',
            keyText: 'dateStarted',
            id: 2
        },
        {
            label: 'Project Manager',
            keyText: 'projectManager',
            id: 3
        }
    ];
    const defaultSort = tableHeaders[0];
    const [selectedSort, setSelectedSort] = useState(defaultSort)

    const handleSelect = (e) => {
        const {
            target: { value },
        } = e;
        setManager(typeof value === 'string' ? value.split(',') : value);
    }

    const handleSortField = (e) => {

        const {
            target: { value },
        } = e;

        if (selectedSort.label === value) return;
        setSelectedSort(tableHeaders.find(header => header.label === value));

    }

    const handleSearchStr = (e) => {
        setSearchStr(prevStr => e.target.value)
    }

    const filteredProjects = useMemo(() => {
        return (
            projectsList.filter(obj => (
                Object.values(obj).find(i => (
                    i.toLowerCase().includes(searchStr.toLowerCase())
                ))
            ))
        );
    }, [searchStr, projectsList])

    const selectedManagers = filteredProjects.filter(proj => {
        if (!manager.length) return true;
        for (let i = 0; i < manager.length; i++) {
            if (proj[tableHeaders[2].keyText] === manager[i])
                return true;
        }
        return false;
    })

    const sortProjets = selectedManagers.sort((a, b) => {
        return a[selectedSort.keyText].localeCompare(b[selectedSort.keyText])
    })
    

    return (
        currentUser
        ? <div className={styles.tableContainer}>
            <div style={{ marginBottom: '10em' }} className={styles.header}>
                <Button
                    variant='contained'
                    onClick={() => onSignOut(false)}
                >
                    Sign Out
                </Button>
                <TextField
                    id="outlined-basic"
                    label='Search'
                    variant="outlined"
                    value={searchStr}
                    onChange={(e) => handleSearchStr(e)}
                />
            </div>

            <div className={styles.header}>
                <SelectFilter
                    array={filteredProjects}
                    textForSelect={tableHeaders[2].keyText}
                    manager={manager}
                    onChange={handleSelect}
                    value={manager}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    checked={manager}
                />
                <SortBy
                    fields={tableHeaders}
                    selectedSort={selectedSort.label}
                    onChange={handleSortField}
                />
            </div>

            <ProjectsTable
                projectsList={sortProjets}
                tableHeaders={tableHeaders}
            />
        </div>
        : <Navigate to="/" />
    );

};

export default TableContainer;