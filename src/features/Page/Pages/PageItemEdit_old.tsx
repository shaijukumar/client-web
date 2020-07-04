import React, { useContext, useState, useEffect } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Grid, Form, Button, Label } from 'semantic-ui-react'
import { Form as FinalForm, Field } from 'react-final-form';
import { RootStoreContext } from '../../../app/store/rootStore';
import TextInput from '../../../app/common/form/TextInput';
import { PageItemCategoryFormValues } from '../../../app/models/PageItemCategory';
import { v4 as uuid } from 'uuid';
import { combineValidators, isRequired, createValidator, composeValidators, hasLengthLessThan, hasLengthGreaterThan } from 'revalidate';
import { observer } from 'mobx-react-lite';
import CategorySelect from '../../../app/common/form/CategorySelect';
import SelectInput from '../../../app/common/form/SelectInput';
import _ from 'lodash';
import { Page } from '../../../app/models/page';
import HtmlEdit from '../../../app/common/form/HtmlEdit';
import Parser from 'html-react-parser';
import JoditEditor from 'jodit-react';



const CheckValidURLTitle = (title: string) => {
    let res = false;
    title.length < 3 ? res = true : res = false;
    return res;
}

const isGreaterThan = () => createValidator(

    message => value => {
        const n: number = 10;
        if (value && CheckValidURLTitle(value)) {
            return message
        }
    },
    field => `${field} Sorry, url title already used`
)

const validate = combineValidators({
    title: isRequired({ message: 'Title is required' }),
    categoryId: isRequired({ message: 'Category is required' }),
    //pageHtml: isRequired({ message: 'PageHtml is required' }),            

    // urlTitle: composeValidators(        
    //     isRequired('URL Title'),
    //     isGreaterThan()({
    //         message: 'Sorry, URL Title already used'
    //       })
    // )(),

});



interface DetailParms {
    id: string
}

const PageItemEdit_old: React.FC<RouteComponentProps<DetailParms>> = ({ match, history }) => {

    const rootStore = useContext(RootStoreContext);
    const {
        createPageItem,
        editPageItem,
        submitting,
        loadPageItem,
        deletePageItem
    } = rootStore.pageStore;

    const {
        pageItemCategoryList,
        getPageItemCategoryList
    } = rootStore.pageItemCategoryStore;

    const [page, setPage] = useState(new Page());
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        debugger;
        getPageItemCategoryList().then(() => {
            debugger;
            console.log("useEffect");
            if (match.params.id) {
                setLoading(true);
                loadPageItem(match.params.id)
                    .then((page) => {
                        setPage(new Page(page))
                    })
                    .finally(() => setLoading(false));
            }
            else {
                setPage(new Page());
                setLoading(false)
            }
        });
        debugger;
    }, [
        loadPageItem,
        match.params.id,
        getPageItemCategoryList
    ]);


    const handleFinalFormSubmit = (values: any) => {
        const { ...page } = values;
        if (!page.id) {
            let newPage = {
                ...page,
                id: uuid()
            };
            createPageItem(newPage)
                .then(() => history.push(`/PageItemEdit/${newPage.id}`));
        } else {
            editPageItem(page)
            //.then( () => history.push('/PageItemList') );
        }
    }

    const onHtmlChangeHandler = (val: any) => {
        debugger;
        page.PageHtml = val;
        console.log(val);
    }


    return (
        <Grid>
            <Grid.Column width={10}>
                <h1>Page Edit</h1>
                <FinalForm
                    validate={validate}
                    initialValues={page}
                    onSubmit={handleFinalFormSubmit}
                    render={({ handleSubmit, invalid, pristine }) => (
                        <Form onSubmit={handleSubmit} loading={loading}>

                            <Field
                                name='title'
                                placeholder="Title"
                                value="{page.title}"
                                component={TextInput}
                            />

                            {/* <Field
                                     name='categoryId'
                                     placeholder="Category"
                                     value={page.categoryId}
                                     component={TextInput}
                                 /> */}

                            <Field
                                component={CategorySelect}
                                options={pageItemCategoryList}
                                name='categoryId'
                                placeholder="Category"
                                value={page.CategoryId}
                            //  catOnChange={(val: any) => { 
                            //     debugger;
                            //     page.categoryId = val; 
                            //     debugger;
                            //    } }                                  
                            />

                            <Field
                                name='description'
                                placeholder="Description"
                                value={page.Description}
                                component={TextInput}
                            />

                            <Field
                                name='urlTitle'
                                placeholder="URL Title"
                                value={page.URLTitle}
                                component={TextInput}
                            />

                            {/* <JoditEditor                                     
                                     value={page.pageHtml}
                                     config={{readonly: false}}                                     
                                     onBlur={(val: any) => { 
                                        debugger;
                                        page.pageHtml = val; 
                                        debugger;
                                       } }                                        
                                    //onChange={htmlOnChnage}
                                 /> */}

                            <Field
                                name='pageHtml'
                                placeholder="Page Html"
                                value={page.PageHtml}
                                component={HtmlEdit}
                                htmlOnChnage={(val: any) => {
                                    debugger;
                                    page.PageHtml = val;
                                    debugger;
                                }}
                            />

                            {/* pageHtml : {Parser(page.pageHtml)} */}

                            <Button
                                loading={submitting}
                                disabled={loading || invalid}
                                floated='right'
                                positive
                                type='submit'
                                content='Submit'
                            />

                            {page.Id &&
                                <Button
                                    type='button'
                                    loading={submitting}
                                    floated='right'
                                    content='Delete'
                                    onClick={(e) => {
                                        deletePageItem(page.Id ? page.Id : '')
                                            .then(() => { history.push('/PageItemList'); });
                                    }}
                                />
                            }

                            <Button
                                onClick={() => history.push('/PageItemList')}
                                disabled={loading}
                                floated='right'
                                content='Cancel'
                            />
                        </Form>
                    )}
                />


            </Grid.Column>
        </Grid>

    )
}

export default observer(PageItemEdit_old);
