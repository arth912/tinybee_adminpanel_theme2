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
import { getCategories } from 'store/slices/product';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';

import Product1 from 'assets/images/widget/prod1.jpg';
import Product2 from 'assets/images/widget/prod2.jpg';
import Product3 from 'assets/images/widget/prod3.jpg';
import Product4 from 'assets/images/widget/prod4.jpg';
import { useSelector,useDispatch } from 'store';

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
// const categories = [
//     {
//         value: '1',
//         label: 'Iphone 12 Pro Max'
//     },
//     {
//         value: '2',
//         label: 'Iphone 11 Pro Max'
//     },
//     {
//         value: '3',
//         label: 'Nokia'
//     },
//     {
//         value: '4',
//         label: 'Samsung'
//     }
// ];

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

const ProductEdit = ({ open, handleCloseDialog, data }) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    let { categories } = useSelector((state) => state.product);
    // console.log(categories)

    // // handle category change dropdown
    // const [currency, setCurrency] = useState('2');
    // const handleSelectChange = (event) => {
    //     setCurrency(event?.target.value);
    // };

    const [formData, setFormData] = useState({
        'product_name': data ? data.product_name : '',
        'product_desc': data ? data.product_desc : '',
        'product_category': data ? data.product_category : '',
        'product_code': data ? data.product_code : '',
        'salesPrice': data ? data.salePrice : '',
        'offerprice': data ? data.offerprice : '',
        'product_stock': data ? data.product_stock : '',
        'age_group': data ? data.age_group : '',
        'product_material': data ? data.product_material : '',
        'product_dimension': data ? data.product_dimension : ''
    })

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

    useEffect(() => {
        dispatch(getCategories())
    }, [])

    // // handle tag select
    // const [personName, setPersonName] = useState([]);
    // const handleTagSelectChange = (event) => {
    //     setPersonName(event?.target.value);
    // };

    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(formData)
    }

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
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Edit Product</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
                            <Grid item xs={12}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" align="left">
                                            Product Images*
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div>
                                            <TextField type="file" id="file-upload" fullWidth label="Enter SKU" sx={{ display: 'none' }} />
                                            <InputLabel
                                                htmlFor="file-upload"
                                                sx={{
                                                    background: theme.palette.background.default,
                                                    py: 3.75,
                                                    px: 0,
                                                    textAlign: 'center',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer',
                                                    mb: 3,
                                                    '& > svg': {
                                                        verticalAlign: 'sub',
                                                        mr: 0.5
                                                    }
                                                }}
                                            >
                                                <CloudUploadIcon /> Drop file here to upload
                                            </InputLabel>
                                        </div>
                                        <Grid container spacing={1}>
                                            <Grid item>
                                                <ImageWrapper>
                                                    <CardMedia component="img" image={Product1} title="Product" />
                                                </ImageWrapper>
                                            </Grid>
                                            <Grid item>
                                                <ImageWrapper>
                                                    <CardMedia component="img" image={Product2} title="Product" />
                                                </ImageWrapper>
                                            </Grid>
                                            <Grid item>
                                                <ImageWrapper>
                                                    <CardMedia component="img" image={Product3} title="Product" />
                                                </ImageWrapper>
                                            </Grid>
                                            <Grid item>
                                                <ImageWrapper>
                                                    <CardMedia component="img" image={Product4} title="Product" />
                                                    <CircularProgress
                                                        variant="determinate"
                                                        value={progress}
                                                        color="secondary"
                                                        sx={{
                                                            position: 'absolute',
                                                            left: '0',
                                                            top: '0',
                                                            background: 'rgba(255, 255, 255, .8)',
                                                            width: '100% !important',
                                                            height: '100% !important',
                                                            p: 1.5
                                                        }}
                                                    />
                                                </ImageWrapper>
                                            </Grid>
                                            <Grid item>
                                                <ImageWrapper>
                                                    <Fab color="secondary" size="small">
                                                        <CloseIcon />
                                                    </Fab>
                                                </ImageWrapper>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField id="outlined-basic1"
                                    fullWidth
                                    label="Enter Product Name*"
                                    name="product_name"
                                    value={formData.product_name}
                                    onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-basic2"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    label="Enter Product Description"
                                    name="product_desc"
                                    value={formData.product_desc}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="standard-select-currency"
                                    select
                                    label="Select Category*"
                                    fullWidth
                                    name="product_category"
                                    value={formData.product_category}
                                    onChange={handleInputChange}
                                    helperText="Please select Category"
                                >
                                    {categories.map((option) => (
                                        <MenuItem key={option.product_category} value={option.product_category}>
                                            {option.product_category}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField id="outlined-basic3"
                                    fullWidth
                                    label="Product Code"
                                    name="product_code"
                                    value={formData.product_code}
                                    onChange={handleInputChange} />
                            </Grid>
                            {/* <Grid item xs={12}>
                                <TextField id="outlined-basic4" 
                                fullWidth
                                label="SKU*" 
                                defaultValue="H8J702729P" />
                            </Grid> */}
                            <Grid item md={6} xs={12}>
                                <TextField
                                    label="Sales Price*"
                                    id="filled-start-adornment1"
                                    name="salesPrice"
                                    value={formData.salesPrice}
                                    onChange={handleInputChange}
                                    InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    label="Offer Price"
                                    id="filled-start-adornment2"
                                    name="offerprice"
                                    value={formData.offerprice}
                                    onChange={handleInputChange}
                                    InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField type="number"
                                    id="outlined-basic5"
                                    fullWidth
                                    label="Quantity*"
                                    name="product_stock"
                                    value={formData.product_stock}
                                    onChange={handleInputChange} />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField id="outlined-basic6"
                                    fullWidth
                                    label="Material"
                                    name="product_material"
                                    value={formData.product_material}
                                    onChange={handleInputChange} />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    label="Dimention"
                                    name="product_dimension"
                                    value={formData.product_dimension.replace('cm', '')}
                                    onChange={handleInputChange}
                                    InputProps={{ endAdornment: <InputAdornment position="end">cm</InputAdornment> }}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    id="outlined-basic7"
                                    fullWidth
                                    label="Age Group"
                                    name="age_group"
                                    value={formData.age_group}
                                    onChange={handleInputChange} />
                            </Grid>
                            {/* <Grid item xs={12}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" align="left">
                                            Tags
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div>
                                            <Select
                                                id="demo-multiple-chip"
                                                multiple
                                                fullWidth
                                                value={personName}
                                                onChange={handleTagSelectChange}
                                                input={<Input id="select-multiple-chip" />}
                                                renderValue={(selected) => (
                                                    <div>
                                                        {typeof selected !== 'string' &&
                                                            selected.map((value) => <Chip key={value} label={value} />)}
                                                    </div>
                                                )}
                                                MenuProps={MenuProps}
                                            >
                                                {tagNames.map((name) => (
                                                    <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                                                        {name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid> */}
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <AnimateButton>
                            <Button variant="contained">Save</Button>
                        </AnimateButton>
                        <Button variant="text" color="error" onClick={handleCloseDialog}>
                            Close
                        </Button>
                    </DialogActions>
                </form>
            )}
        </Dialog>
    );
};

ProductEdit.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func
};

export default ProductEdit;
