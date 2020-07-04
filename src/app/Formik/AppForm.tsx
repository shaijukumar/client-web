import * as React from "react";
import { Formik } from "formik";
import LoadingComponent from "../layouts/LoadingComponent";
import { Loader } from "semantic-ui-react";
import { Form } from "rsuite";

const AppForm: React.FC<{
    initialValues: any,
    onSubmit?: any,
    validationSchema?: any,
    children: any,
    loadingInitial: boolean,
}>
    = ({
        initialValues,
        onSubmit,
        validationSchema,
        children,
        loadingInitial = false,
    }) => {
        return (
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
                enableReinitialize

            >
                {() => {
                    if (loadingInitial) return (<div>Loading...</div>)
                    return (<Form>{children}</Form>)
                }}
            </Formik>
        );
    }

export default AppForm;