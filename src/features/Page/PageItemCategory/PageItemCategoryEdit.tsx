import React, { useContext, useState, useEffect } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Grid, Form, Button, Label } from 'semantic-ui-react'
import { Form as FinalForm, Field } from 'react-final-form';
import { RootStoreContext } from '../../../app/store/rootStore';
import TextInput from '../../../app/common/form/TextInput';
import { PageItemCategoryFormValues } from '../../../app/models/PageItemCategory';
import { v4 as uuid } from 'uuid';
import { combineValidators, isRequired } from 'revalidate';
import { observer } from 'mobx-react-lite';
import CategorySelect from '../../../app/common/form/CategorySelect';
import SelectInput from '../../../app/common/form/SelectInput';
import _ from 'lodash';

export const testList = [
    { key: 'music', text: 'Music', value: 'music' },
    { key: 'e641f27f-f993-4daa-891b-b1ec9046aaaa', text: 'e641f27f-f993-4daa-891b-b1ec9046aaaa', value: 'e641f27f-f993-4daa-891b-b1ec9046aaaa' },
    { key: 'culture', text: 'Culture', value: 'culture' },
    { key: 'film', text: 'Film', value: 'film' },
    { key: 'food', text: 'Food', value: 'food' },
    { key: 'travel', text: 'Travel', value: 'travel' }
];

export const categorylist = [
    { key: 'drinks', text: 'Drinks', value: 'drinks1111111111' },
    { key: 'culture111111111111', text: 'Culture', value: 'culture22222222' },
    { key: 'film', text: 'Film', value: 'film' },
    { key: 'food', text: 'Food', value: 'food' },
    { key: 'music', text: 'Music', value: 'music' },
    { key: 'travel', text: 'Travel', value: 'travel' }
];

const validate = combineValidators({
    name: isRequired({ message: 'The Category name is required' }),
    parentId: isRequired({ message: 'The parent name is required' }),

});

interface DetailParms {
    id: string,
    parent: string
}

const PageItemCategoryEdit: React.FC<RouteComponentProps<DetailParms>> = ({ match, history }) => {



    const rootStore = useContext(RootStoreContext);
    const {
        createPageItemCategory,
        editPageItemCategory,
        submitting,
        loadPageItemCategory,
        pageItemCategoryList,
        getPageItemCategoryList,
        deletePageItemCategory
    } = rootStore.pageItemCategoryStore;

    const [category, setCategory] = useState(new PageItemCategoryFormValues());

    const [loading, setLoading] = useState(false);

    const handleFinalFormSubmit = (values: any) => {
        debugger;
        const { ...category } = values;
        if (!category.id) {
            let newCategory = {
                ...category,
                id: uuid()
            };
            createPageItemCategory(newCategory)
                .then(() => history.push('/PageItemCategorys'));
        } else {
            editPageItemCategory(category)
                .then(() => history.push('/PageItemCategorys'));
        }
    }

    useEffect(() => {

        getPageItemCategoryList();

        if (match.params.parent) {
            setLoading(true);

            loadPageItemCategory(match.params.parent)
                .then((category) => {
                    category.parentId = match.params.parent;
                    category.name = '';
                    category.id = '';
                    setCategory(new PageItemCategoryFormValues(category));
                })
                .finally(() => setLoading(false));
        }

        if (match.params.id) {
            setLoading(true);
            loadPageItemCategory(match.params.id)
                .then((category) => setCategory(new PageItemCategoryFormValues(category)))
                .finally(() => setLoading(false));
        }
    }, [
        loadPageItemCategory,
        match.params.id,
        getPageItemCategoryList
    ]);


    return (
        <Grid>
            <Grid.Column width={10}>
                <h1>PageItemCategory Edit -name: {category.ParentId} - description - {category.Description} </h1>
                <FinalForm
                    validate={validate}
                    initialValues={category}
                    onSubmit={handleFinalFormSubmit}
                    render={({ handleSubmit, invalid, pristine }) => (
                        <Form onSubmit={handleSubmit} loading={loading}>

                            <Field
                                component={CategorySelect}
                                options={pageItemCategoryList}
                                name='parentId'
                                placeholder="Parent"
                                value={category.ParentId}
                                disabled={category.ParentId == category.Id}
                            />
                            {/* { category.parentId != category.id ? 
                                     
                                     :  
                                     <div>
                                         <label>Parent</label>
                                         <label>{category.name}</label>                                         
                                     </div>                              
                                 } */}



                            <Field
                                name='name'
                                placeholder="Name"
                                value={category.Name}
                                component={TextInput}
                            />

                            <Field
                                name='description'
                                placeholder="Description"
                                value={category.Description}
                                component={TextInput}
                            />

                            <Button
                                loading={submitting}
                                disabled={loading || invalid || pristine}
                                floated='right'
                                positive
                                type='submit'
                                content='Submit'
                            />

                            {/* {category.Id &&
                                <Button
                                    type='button'
                                    loading={submitting}
                                    floated='right'
                                    content='Delete'
                                    onClick={(e) => {
                                        deletePageItemCategory(e, category.Id ? category.Id : '')
                                            .then(() => { history.push('/PageItemCategorys'); });
                                    }}
                                />
                            } */}

                            <Button
                                onClick={() => history.push('/PageItemCategorys')}
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

export default observer(PageItemCategoryEdit);
