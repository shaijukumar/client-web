import * as React from "react";
import { useFormikContext } from "formik";
import { Button } from "rsuite";

const AppButton: React.FC<{ title: string, onClick: any, loader?: boolean, disabled?: boolean }>
    = ({ title, onClick, loader = false, disabled = false }) => {

        const { handleSubmit, dirty } = useFormikContext();

        return (
            <Button
                disabled={disabled}
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