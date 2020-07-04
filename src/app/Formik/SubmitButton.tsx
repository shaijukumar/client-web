import * as React from "react";
import { useFormikContext } from "formik";
import { Button } from 'semantic-ui-react'
import AppButton from "./AppButton";


const SubmitButton: React.FC<{ title: string, loader?: boolean }> = ({ title, loader = false }) => {

    const { handleSubmit, dirty } = useFormikContext();

    return (
        <AppButton
            onClick={() => { handleSubmit() }}
            title={title}
            loader={loader} />
    )
}

export default SubmitButton; 