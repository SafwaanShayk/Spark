import React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useController } from "react-hook-form";
function AppCheckbox(props) {
  const { field } = useController({ ...props, defaultValue: false });

  return (
    <FormControlLabel
      control={
        <Checkbox
          {...field}
          checked={field.value}
          color="secondary"
          disabled={props.disabled}
        />
      }
      label={props.label}
    />
  );
}

export default AppCheckbox;
