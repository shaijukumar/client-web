import * as React from "react";
import { useFormikContext } from "formik";
import ErrorMessage from "./ErrorMessage";
import { FormGroup, ControlLabel, FormControl, HelpBlock } from "rsuite";


const AppFormField: React.FC<{
    value?: any,
    name: string,
    required?: boolean,
    width?: number,
    autoCapitalize?: string,
    autoCorrect?: boolean,
    icon?: string,
    keyboardType?: string,
    placeholder?: string,
    textContentType?: string,
    secureTextEntry?: boolean,
    maxLength?: number,
    multiline?: boolean,
    numberOfLines?: number,

}> =
    ({
        value,
        name,
        required = false,
        width = 300,
        autoCapitalize,
        autoCorrect = true,
        icon,
        keyboardType,
        placeholder,
        textContentType,
        secureTextEntry,
        maxLength,
        multiline,
        numberOfLines = 1 }) => {

        const { setFieldTouched, handleChange, errors, touched, values } = useFormikContext();

        return (
            <div>
                {/* <TextField id="standard-basic"
                    value={String((values as any)[name])}
                    onBlur={() => setFieldTouched(name)}
                    onChange={handleChange(name)}
                    label={placeholder}
                    placeholder={placeholder}
                    style={{ width: width }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                /> */}

                <FormGroup>
                    <ControlLabel>{placeholder}</ControlLabel>
                    <FormControl
                        name={name}
                        value={String((values as any)[name])}
                        onChange={handleChange(name)}
                    />
                    {required && <HelpBlock>Required</HelpBlock>}
                    <ErrorMessage error={(errors as any)[name]} visible={(touched as any)[name]} />
                </FormGroup>




            </div>
        );
    }

export default AppFormField;
