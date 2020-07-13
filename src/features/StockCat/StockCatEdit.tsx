import React, { useContext, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Link, useHistory, useParams } from "react-router-dom";
import * as Yup from "yup";

import { AppForm, FormField, SubmitButton, AppButton, ButtonGroup } from "../../app/Formik";
import { RootStoreContext } from "../../app/store/rootStore";
import { StockCat } from "./StockCat";

const validationSchema = Yup.object().shape({
  Title: Yup.string().required().min(1).label('Title'),
	
});

interface DetailParms {
  id: string;
}

const StockCatItemEdit: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadingInitial, submitting, loadItem, createItem, editItem, getList, deleteItem } = rootStore.stockCatStore;

  const [stockCat, setStockCat] = useState(new StockCat());

  let { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    if (id) {
      loadItem(id).then((stockCat) => {
        setStockCat(new StockCat(stockCat));
      });
    } else {
      setStockCat(new StockCat());
    }
  }, [loadItem, id]);

  const onStockCatSubmit = (values: any) => {
    editItem(values).then((stockCat) => {
      setStockCat(new StockCat((stockCat as any)));
    });
  };

  const onDelete = () => {
    deleteItem(stockCat.Id).then(() => {
      history.push('/StockCatList');
    });
  };

  return (
    <AppForm
      initialValues={stockCat}
      validationSchema={validationSchema}
      onSubmit={onStockCatSubmit}
      loadingInitial={loadingInitial}
    >
      
					<FormField maxLength={255} name='Title' placeholder='Title' />

      <ButtonGroup>
        <SubmitButton title={stockCat.Id === '' ? "Create" : "Update"} loader={submitting} />
        {stockCat.Id && <AppButton title="Delete" onClick={() => onDelete()} loader={submitting} />}
        <AppButton title="Back" onClick={() => { history.push('/StockCatList'); }} loader={submitting} />
      </ButtonGroup>
    </AppForm>
  );
};

export default observer(StockCatItemEdit);

