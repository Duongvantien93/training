import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import { ChangeEvent } from "react";
import { FormikTouched, FormikErrors } from "formik";

interface IProps {
  name: string;
  handleOnChange: (e: ChangeEvent<any>) => void;
  value?: string | number | string[] | Date;
  touched?: boolean | FormikTouched<Date>;
  error?: string | string[] | FormikErrors<Date>;
  type: string;
  multi?: boolean;
}
const FormikTextField = (props: IProps) => {
  const convertCapitalize = (str: string) => {
    let newStr = str.charAt(0).toUpperCase() + str.slice(1);
    if (newStr.includes("_")) return newStr.replace("_", " ");
    return newStr;
  };
  if (props.type === "textarea") {
    return (
      <Grid className="form-formik" item xs={6}>
        <InputLabel>{convertCapitalize(props.name)} :</InputLabel>
        <TextField
          fullWidth
          size="small"
          name={props.name}
          type={props.type}
          value={props.value}
          onChange={props.handleOnChange}
          error={props.touched && Boolean(props.error)}
          helperText={props.touched && props.error}
          multiline={props.multi}
          rows={2}
        />
      </Grid>
    );
  }

  return (
    <Grid className="form-formik" item xs={6}>
      <InputLabel>{convertCapitalize(props.name)} :</InputLabel>
      <TextField
        fullWidth
        size="small"
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={props.handleOnChange}
        error={props.touched && Boolean(props.error)}
        helperText={props.touched && props.error}
      />
    </Grid>
  );
};
export default FormikTextField;
