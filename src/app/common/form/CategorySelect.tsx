import React, { useState } from 'react'
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label, Select, Search, SearchProps, Dropdown } from 'semantic-ui-react';
import _ from 'lodash'
import { observer } from 'mobx-react-lite';




interface IProps
  extends FieldRenderProps<string, HTMLElement>,
    FormFieldProps {}

const CategorySelect: React.FC<IProps> = ({
    input,
    width,
    options,
    placeholder,
    meta: { touched, error },
    selectedValue,
    selectedId,
    disabled,
    catOnChange,
    ...rest
  }) => {

    // const [results, setresults ] = useState([]);
    // const [isLoading, setLoading] = useState(false);
    // const [value, setValue] = useState('');
    // const [key, setKey] = useState('');

    
   
    // const handleResultSelect = (e:React.MouseEvent<HTMLElement, MouseEvent>, result:SearchProps) => {
    //     debugger;
    //     setValue(result.result.title);
    //     setKey(result.result.key);
    //     selectedId = result.result.key;
        
    //     //input.name = result.result.title;
    //     //input.value = result.result.id;
    //     //this.setState({ value: result.result.name })         
    // }  

    // const  handleSearchChange = (e:React.MouseEvent<HTMLElement, MouseEvent>,  searchProps:SearchProps ) => {
      
    //   debugger;
    //   const value1:string = searchProps.value ? searchProps.value : '';
    //   setValue(searchProps.value ? searchProps.value : '');

    //   setLoading(true);

    //   setTimeout(() => {
    //     debugger;
    //     if (value1.length < 1){
    //       setresults([]);
    //       setLoading(false);
    //       setValue('');
    //       return;
    //     }  

    //     const re = new RegExp(_.escapeRegExp(value1), 'i')
    //     const isMatch = (result:SearchProps) => re.test(result.title);
    //     setLoading(false);
       
    //      const res = _.filter(options, isMatch) as any ;
    //     //debugger;
    //     setresults( res );
    //     //setresults(options);
    //     //console.log( options );
    // }, 300)

    // }

   //this.setState({ value: result.title }
    return (
        <Form.Field error={touched && !!error} width={width}   >
          
          <label>{placeholder}</label>

          {/* <Search
            loading={isLoading}
            onResultSelect={handleResultSelect}
            onSearchChange={_.debounce(handleSearchChange, 500, {
                leading: true,
              })}
            results={results}
            value={input.value} 
            //selectedId={key}            
          /> */}

        <Dropdown selection 
          search
          value={input.value} 
          onChange={(param,data) => {
            input.onChange(data.value); 
            //catOnChange(data.value); 
            //debugger; 
          } }          
          placeholder={placeholder}             
          options={options}
          disabled={disabled}          
        />

        {/* <Select 
            value={input.value}
            onChange={(e, data) => input.onChange(data.value)}
            placeholder={placeholder}
            options={options}
        /> */}

          {touched && error && (
            <Label basic color='red'>
              {error}
            </Label>
          )}

         

       </Form.Field>
    )
}

//export default CategorySelect
export default observer(CategorySelect);