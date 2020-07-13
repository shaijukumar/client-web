import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom'
import * as Yup from "yup";
import {
    Formik,
    FormikHelpers,
    FormikProps,
    Form,
    Field,
    FieldProps,
} from 'formik';

import { Page } from '../../../app/models/page';
import AppFormField from '../../../app/Formik/AppFormField';
import SubmitButton from '../../../app/Formik/SubmitButton';
import { RootStoreContext } from '../../../app/store/rootStore';
import AppForm from '../../../app/Formik/AppForm';
import AppButton from '../../../app/Formik/AppButton';
import AppSelector from '../../../app/Formik/AppSelector';
import ButtonGroup from '../../../app/Formik/ButtonGroup';
import HtmlEdit from '../../../app/Formik/HtmlEdit';
import CategoryTree from '../PageItemCategory/CategoryTree';
import { Uploader, Icon } from 'rsuite';
import PagePhotos from './PagePhotos';


const validationSchema = Yup.object().shape({
    Title: Yup.string().required().min(1).label("Title"),
    CategoryId: Yup.string().required().min(1).label("Category"),
    URLTitle: Yup.string().required().min(1).label("Page URL"),
    PageHtml: Yup.string().required().min(1).label("Page Content"),
});

interface DetailParms {
    id: string
}

const fileList = [
    {
        // name: 'a.png',
        fileKey: "1",
        url:
            'https://res.cloudinary.com/dzcblkurm/image/upload/v1594359825/bflqvdkbldgnf89q8tnm.jpg'
    },
    {
        //name: 'b.png',
        fileKey: "bflqvdkbldgnf89q8tnm",
        url:
            'https://user-images.githubusercontent.com/1203827/47638807-9d947980-db9a-11e8-9ee5-e0cc9cd7e8ad.png'
    }
];

const PageItemEdit: React.FC<RouteComponentProps<DetailParms>> = ({ match, history }) => {

    const rootStore = useContext(RootStoreContext);
    const {
        loadingInitial,
        createPageItem,
        editPageItem,
        submitting,
        loadPageItem,
        deletePageItem,

    } = rootStore.pageStore;

    const { UpdateCategoryList, catTree } = rootStore.pageItemCategoryStore;

    const [catList, setCatList] = useState([]);
    const [page, setPage] = useState(new Page());



    useEffect(() => {

        UpdateCategoryList().then((ct) => {
            setCatList((ct as any));
            //debugger;
        });

        //debugger;
        if (match.params.id) {
            loadPageItem(match.params.id)
                .then((page) => {
                    setPage(new Page(page))
                })
        }
        else {
            setPage(new Page());
        }

    }, [
        loadPageItem,
        match.params.id,
        UpdateCategoryList
    ]);


    const onPageSubmit = (values: any) => {
        debugger;
        if (!page.Id) {
            createPageItem(values);
        } else {
            editPageItem(values);
        }
    }




    return (
        <AppForm initialValues={page} validationSchema={validationSchema} onSubmit={onPageSubmit} loadingInitial={loadingInitial} >
            <CategoryTree setParentList={setCatList} />
            <AppSelector name="CategoryId" placeholder="Category" data={catList} />

            <AppFormField name="Title" placeholder="Title" />
            <AppFormField name="Description" placeholder="Description" />
            {/* <AppFormField name="CategoryId" placeholder="CategoryId" /> */}
            <AppFormField name="URLTitle" placeholder="Page URL" />

            <PagePhotos Id={page.Id} name="Photos" imageList={page.Photos} />

            <HtmlEdit name="PageHtml" placeholder="Page Content" />




            <ButtonGroup>
                <SubmitButton title="Submit" loader={submitting} />
                <AppButton title="Back" onClick={() => { history.push('/PageItemList'); }} loader={submitting} />
            </ButtonGroup>

        </AppForm>
    )
}

export default observer(PageItemEdit);
