import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontSize: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    margin: "10px 0",
                    textTransform: "capitalize"
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                input: {
                    padding: "8.5px 14px"
                },
            }
        },
        MuiTableCell: {
            styleOverrides: {
                head: {
                    fontWeight: 600,
                },
                root: {
                    padding: "10px 5px",
                    textAlign: "center"
                }
            }
        },
        MuiAutocomplete: {
            styleOverrides: {
                tag: {
                    margin: 0
                }
            }
        }
    },
});
export default theme;