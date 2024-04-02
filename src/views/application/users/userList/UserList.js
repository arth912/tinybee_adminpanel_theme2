import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Chip,
    Grid,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography
} from '@mui/material';

// project imports
import Avatar from 'ui-component/extended/Avatar';

import { useDispatch, useSelector } from 'store';
import { getUsersListStyle1 } from 'store/slices/user';
import { getCustomers } from 'store/slices/customer';

// assets
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ChatBubbleTwoToneIcon from '@mui/icons-material/ChatBubbleTwoTone';
import BlockTwoToneIcon from '@mui/icons-material/BlockTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

import EditUser from '../EditUser';


const avatarImage = require.context('assets/images/users', true);

// ==============================|| USER LIST 1 ||============================== //

const UserList = () => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const [data, setData] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const { usersS1 } = useSelector((state) => state.user);

    const handleClickOpenDialog = () => {
        setOpen(true);
    };
    const handleCloseDialog = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        setData(usersS1);
    }, [usersS1]);

    React.useEffect(() => {
        dispatch(getUsersListStyle1());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ pl: 3 }}>#</TableCell>
                        <TableCell>User Profile</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Order</TableCell>
                        <TableCell>Registered</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="center" sx={{ pr: 3 }}>
                            Actions
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data &&
                        data.map((row, index) => (
                            <TableRow hover key={index}>
                                <TableCell sx={{ pl: 3 }}>{row.id}</TableCell>
                                <TableCell>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Avatar alt="User 1" src={avatarImage(`./${row.avatar}`)} />
                                        </Grid>
                                        <Grid item xs zeroMinWidth>
                                            <Typography align="left" variant="subtitle1" component="div">
                                                {row.name}{' '}
                                                {/* {row.status === 'Active' && (
                                                    <CheckCircleIcon sx={{ color: 'success.dark', width: 14, height: 14 }} />
                                                )} */}
                                            </Typography>
                                            <Typography align="left" variant="subtitle2" noWrap>
                                                {row.email}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                                <TableCell>{row.location}</TableCell>
                                <TableCell>{row.friends}</TableCell>
                                <TableCell>{row.followers}</TableCell>
                                <TableCell>
                                    {row.status === 'Active' && (
                                        <Chip
                                            label="Active"
                                            size="small"
                                            sx={{
                                                background:
                                                    theme.palette.mode === 'dark'
                                                        ? theme.palette.dark.main
                                                        : theme.palette.success.light + 60,
                                                color: theme.palette.success.dark
                                            }}
                                        />
                                    )}
                                    {row.status === 'Rejected' && (
                                        <Chip
                                            label="Rejected"
                                            size="small"
                                            sx={{
                                                background:
                                                    theme.palette.mode === 'dark'
                                                        ? theme.palette.dark.main
                                                        : theme.palette.orange.light + 80,
                                                color: theme.palette.orange.dark
                                            }}
                                        />
                                    )}
                                    {row.status === 'Pending' && (
                                        <Chip
                                            label="Pending"
                                            size="small"
                                            sx={{
                                                background:
                                                    theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.warning.light,
                                                color: theme.palette.warning.dark
                                            }}
                                        />
                                    )}
                                </TableCell>
                                <TableCell align="center" sx={{ pr: 3 }}>
                                    <Stack direction="row" justifyContent="center" alignItems="center">
                                        <Tooltip placement="top" title="Message">
                                            <IconButton color="secondary" size="large" aria-label="edit">
                                                <EditTwoToneIcon sx={{ fontSize: '1.3rem' }}
                                                    onClick={handleClickOpenDialog}
                                                />
                                                <EditUser open={open} handleCloseDialog={handleCloseDialog} />
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserList;
