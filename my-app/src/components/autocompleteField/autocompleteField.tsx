import { SyntheticEvent, ChangeEvent } from "react";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import { ICargo, IDriver, IStatus, ITruck } from "../../types/type";
import { FormikTouched, FormikErrors } from "formik";

interface IProps {
  name: string;
  handleOnChange: (e: ChangeEvent<any>) => void;
  value: any;
  listValues: ReadonlyArray<ICargo[] | IDriver[] | IStatus[]>;
  touched?: boolean | FormikTouched<Date>;
  error?: string | string[] | FormikErrors<Date>;
  type: string;
  multi: boolean;
  setValue: (
    field: string,
    value: ICargo | IStatus | IDriver,
    shouldValidate?: boolean | undefined
  ) => Promise<void> | Promise<FormikErrors<ITruck>>;
}

const AutocompleteField = (props: IProps) => {
  const convertCapitalize = (str: string) => {
    let newStr = str.charAt(0).toUpperCase() + str.slice(1);
    if (newStr.includes("_")) return newStr.replace("_", " ");
    return newStr;
  };

  return (
    <Grid item xs={6}>
      <InputLabel>{convertCapitalize(props.name)} :</InputLabel>
      <Autocomplete
        sx={{
          "& .MuiOutlinedInput-root": {
            padding: "1px 14px",
          },
        }}
        onChange={(
          e: SyntheticEvent<Element, Event>,
          value: ICargo | IStatus | IDriver
        ) => props.setValue(props.name, value)}
        multiple={props.multi}
        options={props.listValues || []}
        getOptionLabel={(option) => option.name}
        defaultValue={props.value || null}
        filterSelectedOptions={true}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => (
          <TextField
            {...params}
            error={props.touched && Boolean(props.error)}
            helperText={props.touched && props.error}
          />
        )}
        value={props.value || null}
      />
    </Grid>
  );
};
export default AutocompleteField;
