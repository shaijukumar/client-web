import React, { useContext, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Link, useHistory } from "react-router-dom";
import { Table, Button } from "rsuite";

import { RootStoreContext } from "../../app/store/rootStore";
import ButtonGroup from "semantic-ui-react/dist/commonjs/elements/Button/ButtonGroup";
import { AppButton } from "../../app/Formik";


const StockManagemntList: React.FC = () => {

    const rootStore = useContext(RootStoreContext);
    const { loadingInitial, submitting, loadItem, createItem, editItem, getList, itemList } = rootStore.stockManagemntStore;

    const [items, setItems] = useState([]);

    let history = useHistory();

    useEffect(() => {
        getList();
    }, [getList])

    return (
        <>
            <ButtonGroup>
                <Button appearance="link" onClick={() => { history.push("/StockManagemntItemEdit"); }} >Add New</Button>
                <Button appearance="link" onClick={() => { history.push("/"); }} >Home</Button>
            </ButtonGroup>
            <Table
                height={400}
                data={itemList}
                loading={loadingInitial}
                onRowClick={(data) => {
                    //console.log(data);
                    history.push(`/StockManagemntItemEdit/${data.Id}`);
                }}
            >
                
				<Table.Column align='left' fixed>
					<Table.HeaderCell>Title</Table.HeaderCell>
					<Table.Cell dataKey='Title' />
				</Table.Column>
				<Table.Column align='left' fixed>
					<Table.HeaderCell>Category</Table.HeaderCell>
					<Table.Cell dataKey='Category' />
				</Table.Column>
				<Table.Column align='left' fixed>
					<Table.HeaderCell>QtyType</Table.HeaderCell>
					<Table.Cell dataKey='QtyType' />
				</Table.Column>
				<Table.Column align='left' fixed>
					<Table.HeaderCell>RequiredStock</Table.HeaderCell>
					<Table.Cell dataKey='RequiredStock' />
				</Table.Column>
				<Table.Column align='left' fixed>
					<Table.HeaderCell>CurrentStock</Table.HeaderCell>
					<Table.Cell dataKey='CurrentStock' />
				</Table.Column>
				<Table.Column align='left' fixed>
					<Table.HeaderCell>ShopTag</Table.HeaderCell>
					<Table.Cell dataKey='ShopTag' />
				</Table.Column>

            </Table>
        </>
    );
}

export default observer(StockManagemntList);
