import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import InputLabel from "@mui/material/InputLabel";

export default function FormikTextField(props: any) {
  function convertCapitalize(str: string) {
    let newStr = str.charAt(0).toUpperCase() + str.slice(1);
    if (newStr.includes("_")) return newStr.replace("_", " ");
    return newStr;
  }
  function handleOnChangeAuto(event: any, value: any) {
    let data = {
      target: {
        name: props.name,
        value: value,
      },
    };
    props.handleOnChange(data);
  }
  switch (props.type) {
    case "input":
      return (
        <Grid className="form-formik" item xs={6}>
          <InputLabel>{convertCapitalize(props.name)} :</InputLabel>
          <TextField
            fullWidth
            size="small"
            name={props.name}
            type="text"
            value={props.value}
            onChange={props.handleOnChange}
            error={
              props.touched[props.name] && Boolean(props.error[props.name])
            }
            helperText={props.touched[props.name] && props.error[props.name]}
          />
        </Grid>
      );
    case "number":
      return (
        <Grid className="form-formik" item xs={6}>
          <InputLabel>{convertCapitalize(props.name)} :</InputLabel>
          <TextField
            fullWidth
            size="small"
            name={props.name}
            type="number"
            value={props.value}
            onChange={props.handleOnChange}
            error={
              props.touched[props.name] && Boolean(props.error[props.name])
            }
            helperText={props.touched[props.name] && props.error[props.name]}
          />
        </Grid>
      );
    case "password":
      return (
        <Grid className="form-formik" item xs={6}>
          <InputLabel>{convertCapitalize(props.name)} :</InputLabel>
          <TextField
            fullWidth
            size="small"
            name={props.name}
            type="password"
            value={props.value}
            onChange={props.handleOnChange}
            error={
              props.touched[props.name] && Boolean(props.error[props.name])
            }
            helperText={props.touched[props.name] && props.error[props.name]}
          />
        </Grid>
      );
    case "textarea":
      return (
        <Grid className="form-formik" item xs={6}>
          <InputLabel>{convertCapitalize(props.name)} :</InputLabel>
          <TextField
            fullWidth
            size="small"
            name={props.name}
            type="text"
            value={props.value}
            onChange={props.handleOnChange}
            error={
              props.touched[props.name] && Boolean(props.error[props.name])
            }
            helperText={props.touched[props.name] && props.error[props.name]}
            multiline={props.multi}
            rows={4}
          />
        </Grid>
      );
    case "select":
      return (
        <Grid className="form-formik" item xs={6}>
          <InputLabel>{convertCapitalize(props.name)} :</InputLabel>
          <Autocomplete
            onChange={handleOnChangeAuto}
            multiple={props.multi}
            options={props.listValues}
            getOptionLabel={(option) => option.name || option.status}
            defaultValue={props.value || null}
            filterSelectedOptions={true}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField
                {...params}
                error={
                  props.touched[props.name] && Boolean(props.error[props.name])
                }
                helperText={
                  props.touched[props.name] && props.error[props.name]
                }
              />
            )}
            value={props.value || null}
          />
        </Grid>
      );
    default:
      return <span>Some thing went wrong...</span>;
  }
}
