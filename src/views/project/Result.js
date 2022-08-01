import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import moment from 'moment';
import {
    Box,
    Card,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    
  } from '@mui/material';
  import data from './data';   

export const Result = () => {
    const dispatch = useDispatch();
    const {projects} = useSelector(state => state.project);
   

    const [selectedProjectIds, setselectedProjectIds] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
  
    if(projects!=null){
      const handleSelectAll = (event) => {
        let newSelectedProjectIds;
    
        if (event.target.checked) {
          newSelectedProjectIds = projects.map((project) => project.id);
        } else {
          newSelectedProjectIds = [];
        }
    
        setselectedProjectIds(newSelectedProjectIds);
      };
    
      const handleSelectOne = (event, id) => {
        const selectedIndex = selectedProjectIds.indexOf(id);
        let newSelectedProjectIds = [];
    
        if (selectedIndex === -1) {
          newSelectedProjectIds = newSelectedProjectIds.concat(selectedProjectIds, id);
        } else if (selectedIndex === 0) {
          newSelectedProjectIds = newSelectedProjectIds.concat(selectedProjectIds.slice(1));
        } else if (selectedIndex === selectedProjectIds.length - 1) {
          newSelectedProjectIds = newSelectedProjectIds.concat(selectedProjectIds.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelectedProjectIds = newSelectedProjectIds.concat(
            selectedProjectIds.slice(0, selectedIndex),
            selectedProjectIds.slice(selectedIndex + 1)
          );
        }
    
        setselectedProjectIds(newSelectedProjectIds);
      };
    
      const handleLimitChange = (event) => {
        setLimit(event.target.value);
      };
    
      const handlePageChange = (event, newPage) => {
        setPage(newPage);
      };
    
    
      return (
        <Card         
       
        >
          <PerfectScrollbar>
            <Box minWidth={1050}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedProjectIds.length === projects.length}
                        color="primary"
                        indeterminate={
                          selectedProjectIds.length > 0
                          && selectedProjectIds.length < projects.length
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>
                     Name
                    </TableCell>
                    <TableCell>
                      Desciption
                    </TableCell>
                    <TableCell>
                      Start Date
                    </TableCell>                  
                    <TableCell>
                      End Date
                    </TableCell>
                    <TableCell>
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {projects.slice(0, limit).map((project) => (
                    <TableRow
                      hover
                      key={project.id}
                      selected={selectedProjectIds.indexOf(project.id) !== -1}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedProjectIds.indexOf(project.id) !== -1}
                          onChange={(event) => handleSelectOne(event, project.id)}
                          value="true"
                        />
                      </TableCell>
                      <TableCell>
                        <Box
                          alignItems="center"
                          display="flex"
                        >                     
                          <Typography
                            color="textPrimary"
                            variant="body1"
                          >
                            {project.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>                      
                        {project.description}
                      </TableCell>
                      <TableCell>
                      {moment(project.startDate).format('DD/MM/YYYY')}
                      </TableCell> 
                      <TableCell>
                      {moment(project.EndDate).format('DD/MM/YYYY')}
                      </TableCell>                 
                      <TableCell>
                        {project.status}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </PerfectScrollbar>
          <TablePagination
            component="div"
            count={projects.length}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Card>
      );
    }
    else {
    return (<Card
     
    >
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell >              
                </TableCell>
                <TableCell>
                     Name
                    </TableCell>
                    <TableCell>
                      Desciption
                    </TableCell>
                    <TableCell>
                      Start Date
                    </TableCell>                  
                    <TableCell>
                      End Date
                    </TableCell>
                    <TableCell>
                      Status
                    </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>            
                <TableRow>
                <TableCell>                  
                  </TableCell>
                  <TableCell>
                    Upss!, No projects yet
                  </TableCell>
                </TableRow>            
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>    
    </Card>
  );
}
};  
