import React, { EventHandler, useRef, useState } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label } from 'semantic-ui-react';

import { Editor } from '@tinymce/tinymce-react';
import JoditEditor from 'jodit-react';
import { values } from 'mobx';


interface IProps
  extends FieldRenderProps<string, HTMLElement>,
  FormFieldProps { }

const HtmlEdit_old: React.FC<IProps> = ({
  input,
  width,
  rows,
  placeholder,
  newHtml,
  htmlOnChnage,
  meta: { touched, error }
}) => {

  const editor = useRef(null)
  const [content, setContent] = useState('')
  const config = {
    readonly: false // all options from https://xdsoft.net/jodit/doc/
  }

  const handleEditorChange = (content: any, editor: any) => {
    console.log('Content was updated:', content);
  }

  return (
    <Form.Field error={touched && !!error} width={width}>
      {/* <textarea rows={rows} {...input} placeholder={placeholder} /> */}

      <JoditEditor
        ref={editor}
        value={input.value}
        config={config}
        // tabIndex={1} // tabIndex of textarea
        //onBlur={htmlOnChnage}
        //onBlur={newContent => {setContent(newContent); }}
        onBlur={newContent => {
          debugger;
          setContent(newContent); htmlOnChnage(newContent)
        }} // preferred to use only this option to update the content for performance reasons      
      //onChange={htmlOnChnage}
      />

      {content}

      {touched && error && (
        <Label basic color='red'>
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default HtmlEdit_old;
