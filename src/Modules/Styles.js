import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    toolbarStyle: {
        backgroundColor: "#7cb342"
    },
    paper: {
        height: "450px",
        overflowY: "auto",
        [theme.breakpoints.down(650)]: {
            height: "450px",
        }
    },
    paper1: {
        height: "450px",
        overflowY: "auto",
        [theme.breakpoints.down(650)]: {
            height: "350px",
        }
    },
    paper2: {
        margin: "auto",
        padding: "20px",
        width: "50%",
        [theme.breakpoints.down(650)]: {
            width: "80%",
        }
    },
    imageStyle: {
        width: "15%",
        borderRadius: "20px",
        cursor: "pointer"
    },
    buttonStyle: {
        color: "white",
        backgroundColor: "#7cb342",
        '&:hover': {
            color: "white",
            backgroundColor: "#7cb342",
        }
    },
    buttonStyle1: {
        color: "white",
        backgroundColor: "#7cb342",
        margin: theme.spacing(1),
        textAlign: "left"
    },
    buttonStyle2: {
        color: "white",
        backgroundColor: "white",
        "&:hover":{
            color: "purple",
            backgroundColor: "white",
        },
        margin: theme.spacing(1),
        [theme.breakpoints.down(650)]: {
            margin: theme.spacing(0),
        }
    },
    InputStyle: {
        '& label.Mui-focused': {
            color: '#7cb342',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#7cb342',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#7cb342',
            },
            '&:hover fieldset': {
                borderColor: '#7cb342',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#7cb342',
            },
        },
        margin: theme.spacing(2, 2, 2, 2),
        width: "100%"
    },
    body1: {
        padding: "60px"
    },
    bodyStyle: {
        margin: theme.spacing(5, 0, 0, 0),
        [theme.breakpoints.down(650)]: {
            margin: theme.spacing(2, 0, 0, 0),
        },
    },
    Design: {
        padding: theme.spacing(2),
        cursor: "pointer",
        backgroundColor: "#f5f5f5",
        "&:hover": {
            backgroundColor: "white"
        }
    },
    Design1: {
        padding: theme.spacing(2),
        cursor: "pointer",
    },
    textStyle: {
        marginLeft: "5vmin"
    },
    TitleStyle:{
        textAlign:"center",
        fontSize:"3vmin",
        fontFamily:"timesnewroman",
        color:"grey",
        fontWeight:"800"
    }
}));

export default useStyles;