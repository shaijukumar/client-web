import React, { useContext, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Link, useHistory, useParams } from "react-router-dom";
import * as Yup from "yup";

import { AppForm, FormField, SubmitButton, AppButton, ButtonGroup } from "../../app/Formik";
import { RootStoreContext } from "../../app/store/rootStore";
import { StockManagemnt } from "./StockManagemnt";

const validationSchema = Yup.object().shape({
  Title: Yup.string().required().min(1).label('Title'),
  Category: Yup.string().required().min(1).label('Category'),
  QtyType: Yup.string().required().min(1).label('QtyType'),

});

interface DetailParms {
  id: string;
}

const StockManagemntItemEdit: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadingInitial, submitting, loadItem, createItem, editItem, getList, deleteItem } = rootStore.stockManagemntStore;

  const [stockManagemnt, setStockManagemnt] = useState(new StockManagemnt());

  let { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    if (id) {
      loadItem(id).then((stockManagemnt) => {
        setStockManagemnt(new StockManagemnt(stockManagemnt));
      });
    } else {
      setStockManagemnt(new StockManagemnt());
    }
  }, [loadItem, id]);

  const onStockManagemntSubmit = (values: any) => {
    debugger;
    editItem(values).then((stockManagemnt) => {
      setStockManagemnt(new StockManagemnt((stockManagemnt as any)));
    });
  };

  const onDelete = () => {
    deleteItem(stockManagemnt.Id).then(() => {
      history.push('/StockManagemntList');
    });
  };

  return (
    <AppForm
      initialValues={stockManagemnt}
      validationSchema={validationSchema}
      onSubmit={onStockManagemntSubmit}
      loadingInitial={loadingInitial}
    >

      <FormField maxLength={255} name='Title' placeholder='Title' />
      <FormField maxLength={255} name='Category' placeholder='Category' />
      <FormField maxLength={255} name='QtyType' placeholder='QtyType' />
      <FormField maxLength={255} name='RequiredStock' placeholder='RequiredStock' />
      <FormField maxLength={255} name='CurrentStock' placeholder='CurrentStock' />
      <FormField maxLength={255} name='ShopTag' placeholder='ShopTag' />

      <ButtonGroup>
        <SubmitButton title={stockManagemnt.Id === '' ? "Create" : "Update"} loader={submitting} />
        {stockManagemnt.Id && <AppButton title="Delete" onClick={() => onDelete()} loader={submitting} />}
        <AppButton title="Back" onClick={() => { history.push('/StockManagemntList'); }} loader={submitting} />
      </ButtonGroup>
    </AppForm>
  );
};

export default observer(StockManagemntItemEdit);

