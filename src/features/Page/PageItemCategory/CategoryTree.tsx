import React, { useState, useContext, useEffect } from 'react'

import { IPageItemCategory, IPageItemCategoryTree, PageItemCategoryFormValues } from "../../../app/models/PageItemCategory";
import { Tree, ButtonToolbar, Button, Modal, TreePicker, Panel, Grid, Row, Col, Message, Divider } from 'rsuite';
import * as Yup from "yup";

import AppForm from '../../../app/Formik/AppForm';
import { RootStoreContext } from '../../../app/store/rootStore';
import AppSelector from '../../../app/Formik/AppSelector';
import AppFormField from '../../../app/Formik/AppFormField';
import ButtonGroup from '../../../app/Formik/ButtonGroup';
import SubmitButton from '../../../app/Formik/SubmitButton';
import AppButton from '../../../app/Formik/AppButton';
import { observer } from 'mobx-react-lite';


const CategoryTree: React.FC<{ setParentList: any }> = ({ setParentList }) => {



    const rootStore = useContext(RootStoreContext);
    const {
        loadPageItemCategory,
        loadingInitial,
        UpdateCategoryList,
        catTree,
        createPageItemCategory,
        editPageItemCategory,
        submitting }
        = rootStore.pageItemCategoryStore;


    const [show, setShow] = useState(false);
    const [catList, setCatList] = useState([]);
    const [cat, setCat] = useState(new PageItemCategoryFormValues());

    useEffect(() => {
        UpdateCategoryList().then((ct) => {
            setCatList((ct as any));
        });
    }, [UpdateCategoryList])

    const validationSchema = Yup.object().shape({
        ParentId: Yup.string().required().min(1).label("Title"),
        Name: Yup.string().required().min(1).label("Category"),
    });

    const onSubmit = (values: any) => {
        debugger;
        if (!cat.Id) {
            createPageItemCategory(values);
        } else {
            editPageItemCategory(values).then(() => {
                UpdateCategoryList().then((ct) => {
                    setCatList((ct as any));
                    setParentList((ct as any));
                });
            });
        }
    }


    const styles = { width: 400, display: 'block', marginBottom: 10 };
    return (
        <>
            <Button style={{ padding: 0 }} appearance="link" onClick={() => setShow(true)}>Manage Category</Button>

            <Modal show={show} onHide={() => setShow(false)} backdrop={false}>
                <Modal.Header>
                    <Modal.Title>Modal Title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <Tree data={data} defaultExpandAll /> */}
                    <Grid fluid>
                        <Row className="show-grid">
                            <Col xs={18}>
                                <TreePicker
                                    size="lg"
                                    placeholder=" Select Category to edit"
                                    data={catList}
                                    style={styles}
                                    onChange={(catId) => {
                                        loadPageItemCategory(catId).then((c) => {
                                            setCat(c);
                                        })
                                        debugger;
                                    }}
                                    defaultExpandAll
                                />
                            </Col>
                            <Col xs={6}>
                                <AppButton title="Add new " onClick={() => { setCat(new PageItemCategoryFormValues()) }} />
                            </Col>
                        </Row>

                        <Row className="show-grid">
                            <Col xs={18}>

                            </Col>
                        </Row>

                    </Grid>


                    <Panel bordered  >
                        <div style={{ padding: 2 }}>
                            <h4>{cat.Id == undefined ? "Add New Category" : "Edit Category"}</h4>
                        </div>
                        <Divider style={{ margin: 2 }} />
                        <AppForm
                            initialValues={cat}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                            loadingInitial={loadingInitial}
                        >
                            <AppSelector name="ParentId" placeholder="Parent" data={catList} />
                            <AppFormField name="Name" placeholder="Name" />
                            <AppFormField name="Description" placeholder="Description" />

                            <ButtonGroup>
                                <SubmitButton title={cat.Id == undefined ? "Submit" : "Update"} loader={submitting} />
                                <AppButton title="Cancel" onClick={() => setShow(false)} loader={submitting} />
                            </ButtonGroup>

                        </AppForm>
                    </Panel>
                </Modal.Body>
            </Modal>

        </>
    )
}

export default observer(CategoryTree)
