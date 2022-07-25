import React from "react";
import { Link } from "react-router-dom";
import "./css/List.css";
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
const List = ({ lists }) => {

    return (
        <TableContainer className="table-container" sx={{ width: "100vw", bgcolor: "#f9f9f9" }} component={Paper} >
            <Table>
                <TableHead className="head">
                    <TableRow >
                        <TableCell>ID</TableCell>
                        <TableCell>TITLE</TableCell>
                        <TableCell>TEXT</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {lists.map((value, index) =>
                        <TableRow key={value._id}>
                            <TableCell>{value.id}</TableCell>
                            <TableCell className="td">{value.title}</TableCell>
                            <TableCell className="td">{value.text}</TableCell>
                            <TableCell width="82">
                                <Link to={{
                                    pathname: `/view/${index + 1}`,
                                    state: {
                                        _id: value._id,
                                        id: value.id,
                                        title: value.title
                                    }
                                }}>
                                    <Button
                                        style={{
                                            backgroundColor: "#748DA6"
                                        }}
                                        className="mui-btn"
                                        variant="contained">
                                        DETAIL
                                    </Button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer >
    )
}

export default React.memo(List);
