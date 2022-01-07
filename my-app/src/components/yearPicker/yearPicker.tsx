import { ChangeEvent, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import { ITruck } from "../../types/type";
import { FormikTouched, FormikErrors } from "formik";
import Stack from "@mui/material/Stack";

interface IProps {
  name: string;
  handleOnChange: (e: ChangeEvent<any>) => void;
  touched?: boolean | FormikTouched<Date>;
  error?: string | string[] | FormikErrors<Date>;
  type: string;
  setValue: (
    field: string,
    value: Date,
    shouldValidate?: boolean | undefined
  ) => Promise<void> | Promise<FormikErrors<ITruck>>;
  value?: string | number | string[] | Date;
}
const YearPicker = ({
  name,
  touched,
  error,
  type,
  setValue,
  value,
}: IProps) => {
  const [date, setDate] = useState<Date>();

  const convertCapitalize = (str: string) => {
    let newStr = str.charAt(0).toUpperCase() + str.slice(1);
    if (newStr.includes("_")) return newStr.replace("_", " ");
    return newStr;
  };
  useEffect(() => {
    if (value) setDate(value as Date);
  }, [value]);
  return (
    <Grid item xs={6}>
      <InputLabel>{convertCapitalize(name)} :</InputLabel>
      <Stack>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            views={["year"]}
            value={date}
            onChange={(newValue) => {
              if (newValue) {
                setValue(name, newValue);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                error={touched && Boolean(error)}
                helperText={touched && error}
              />
            )}
          />
        </LocalizationProvider>
      </Stack>
    </Grid>
  );
};
export default YearPicker;
