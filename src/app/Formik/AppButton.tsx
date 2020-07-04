import * as React from "react";
import { useFormikContext } from "formik";
import { Button } from "rsuite";

const AppButton: React.FC<{ title: string, onClick: any, loader?: boolean }> = ({ title, onClick, loader = false }) => {

    const { handleSubmit, dirty } = useFormikContext();

    return (
        <Button
            loading={loader}
            appearance="primary"
            onClick={onClick}
            style={{ width: 100 }}
        >
            {title}

        </Button>
    )
}

export default AppButton;