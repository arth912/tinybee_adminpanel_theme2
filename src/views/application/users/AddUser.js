import PropTypes from 'prop-types';
import { forwardRef, useEffect, useRef, useState } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import {
    Button,
    CardMedia,
    Chip,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    Grid,
    Avatar,
    Input,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    Slide,
    TextField,
    Typography
} from '@mui/material';


// project imports
import { gridSpacing } from 'store/constant';
import AnimateButton from 'ui-component/extended/AnimateButton';
import SubCard from 'ui-component/cards/SubCard';

// assets
import Avatar1 from 'assets/images/users/avatar-1.png';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';

import Product1 from 'assets/images/widget/prod1.jpg';
import Product2 from 'assets/images/widget/prod2.jpg';
import Product3 from 'assets/images/widget/prod3.jpg';
import Product4 from 'assets/images/widget/prod4.jpg';

// styles
const ImageWrapper = styled('div')(({ theme }) => ({
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '4px',
    cursor: 'pointer',
    width: 55,
    height: 55,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.background.default,
    '& > svg': {
        verticalAlign: 'sub',
        marginRight: 6
    }
}));

// product category options
const categories = [
    {
        value: 'male',
        label: 'male'
    },
    {
        value: 'female',
        label: 'female'
    },
    {
        value: 'others',
        label: 'others'
    }
];

// animation
const Transition = forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    },
    chip: {
        margin: 2
    }
};

// tags list & style
const tagNames = ['Html', 'Scss', 'Js', 'React', 'Ionic', 'Angular', 'css', 'Php', 'View'];

function getStyles(name, personName, theme) {
    return {
        fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
    };
}

// ==============================|| PRODUCT ADD DIALOG ||============================== //

const AddUser = ({ open, handleCloseDialog }) => {
    const theme = useTheme();

    const [addUserData, setAddUserData] = useState({
        'username': '',
        'fullname': '',
        'address': '',
        'mobileno': '',
        'email': '',
        'gender': ''
    })
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setAddUserData({ ...addUserData, [name]: value })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(addUserData);
    }

    // handle category change dropdown
    const [currency, setCurrency] = useState('2');
    const handleSelectChange = (event) => {
        setCurrency(event?.target.value);
    };

    // set image upload progress
    const [progress, setProgress] = useState(0);
    const progressRef = useRef(() => { });
    useEffect(() => {
        progressRef.current = () => {
            if (progress > 100) {
                setProgress(0);
            } else {
                const diff = Math.random() * 10;
                setProgress(progress + diff);
            }
        };
    });

    useEffect(() => {
        const timer = setInterval(() => {
            progressRef.current();
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);

    // handle tag select
    const [personName, setPersonName] = useState([]);
    const handleTagSelectChange = (event) => {
        setPersonName(event?.target.value);
    };

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseDialog}
            sx={{
                '&>div:nth-of-type(3)': {
                    justifyContent: 'flex-end',
                    '&>div': {
                        m: 0,
                        borderRadius: '0px',
                        maxWidth: 450,
                        maxHeight: '100%'
                    }
                }
            }}
        >
            {open && (
                <>
                    <DialogTitle>Add User</DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent >
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12}>
                                    <SubCard contentSX={{ textAlign: 'center' }}>
                                        <TextField type="file" id="file-upload" fullWidth label="Enter SKU" sx={{ display: 'none' }} />
                                        <InputLabel
                                            htmlFor="file-upload">
                                            <Grid container spacing={1} >
                                                <Grid item xs={12} >
                                                    <Avatar alt="User 1" align="center" src={Avatar1} sx={{ width: 100, height: 100, margin: '0 auto' }} />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="subtitle2" align="center">
                                                        Upload/Change Your Profile Image
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </InputLabel>
                                    </SubCard>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField id="outlined-basic1"
                                        fullWidth
                                        label="Enter User Name"
                                        name="username"
                                        value={addUserData.username}
                                        onChange={handleInputChange}
                                         />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="outlined-basic2"
                                        fullWidth
                                        name="fullname"
                                        value={addUserData.fullname}
                                        onChange={handleInputChange}
                                        label="Enter Full Name"
                                        
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="outlined-basic2"
                                        fullWidth
                                        multiline
                                        rows={3}
                                        label="Enter Address"
                                        value={addUserData.address}
                                        name="address"
                                        onChange={handleInputChange}
                                        
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField id="outlined-basic3" fullWidth label="Mobile No"
                                        name="mobileno"
                                        value={addUserData.mobileno}
                                        onChange={handleInputChange}
                                        />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField id="outlined-basic4" fullWidth label="email"
                                        name="email"
                                        value={addUserData.email}
                                        onChange={handleInputChange}
                                       />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="standard-select-currency"
                                        select
                                        label="Select Gender"
                                        value={addUserData.gender}
                                        fullWidth
                                        onChange={handleSelectChange}                                        
                                    // helperText="Please select Category"
                                    >
                                        {categories.map((option) => (
                                            <MenuItem key={option.value} value={option.value} name="gender">
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <AnimateButton>
                                <Button variant="contained" type='submit' >Add User</Button>
                            </AnimateButton>
                            <Button variant="text" color="error" onClick={handleCloseDialog}>
                                Close
                            </Button>
                        </DialogActions>
                    </form>
                </>
            )}
        </Dialog>
    );
};

AddUser.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func
};

export default AddUser;
