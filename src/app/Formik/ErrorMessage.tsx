import * as React from "react";
import { useFormikContext } from "formik";

const ErrorMessage: React.FC<{
    error: string
    visible: boolean
    numberOfLines?: number,
}>
    = ({
        error,
        visible,
        numberOfLines = 1,
    }) => {

        const { setFieldTouched, handleChange, errors, touched } = useFormikContext();
        if (!visible || !error) return null;

        return <div style={{ color: "red" }} >{error}</div>;
    }

export default ErrorMessage;