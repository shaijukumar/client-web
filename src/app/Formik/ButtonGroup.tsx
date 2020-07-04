

import * as React from "react";
import { ButtonToolbar } from "rsuite";

const ButtonGroup: React.FC<{ children: any }> = ({ children }) => {

    return (
        <ButtonToolbar style={{ padding: 10 }} >
            {children}
        </ButtonToolbar>
    )
}

export default ButtonGroup;