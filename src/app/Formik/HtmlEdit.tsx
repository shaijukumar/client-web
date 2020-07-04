import React, { EventHandler, useRef, useState } from 'react';
import { FieldRenderProps } from 'react-final-form';

import JoditEditor from 'jodit-react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'rsuite';
import ErrorMessage from "./ErrorMessage";
import { useFormikContext } from 'formik';



const HtmlEdit: React.FC<{
    value?: any,
    name: string,
    required?: boolean,
    placeholder?: string,
}> = ({
    value,
    name,
    required = false,
    placeholder
}) => {

        const { setFieldTouched, handleChange, errors, touched, values } = useFormikContext();

        const editor = useRef(null)
        const [content, setContent] = useState('')
        const config = {
            readonly: false, // all options from https://xdsoft.net/jodit/doc/
            height: 600
        }

        const handleEditorChange = (content: any, editor: any) => {
            console.log('Content was updated:', content);
        }

        return (

            <FormGroup>
                <ControlLabel>{placeholder}</ControlLabel>

                <JoditEditor
                    ref={editor}
                    value={String((values as any)[name])}
                    config={config}
                    onBlur={handleChange(name)}

                />

                {required && <HelpBlock>Required</HelpBlock>}
                <ErrorMessage error={(errors as any)[name]} visible={(touched as any)[name]} />

            </FormGroup>

            // <Form.Field error={touched && !!error} width={width}>
            //     {/* <textarea rows={rows} {...input} placeholder={placeholder} /> */}

            // <JoditEditor
            //     ref={editor}
            //     value={input.value}
            //     config={config}
            //     // tabIndex={1} // tabIndex of textarea
            //     //onBlur={htmlOnChnage}
            //     //onBlur={newContent => {setContent(newContent); }}
            //     onBlur={newContent => {
            //         debugger;
            //         setContent(newContent); htmlOnChnage(newContent)
            //     }} // preferred to use only this option to update the content for performance reasons      
            // //onChange={htmlOnChnage}
            // />

            //     {content}

            //     {touched && error && (
            //         <Label basic color='red'>
            //             {error}
            //         </Label>
            //     )}
            // </Form.Field>
        );
    };

export default HtmlEdit;
