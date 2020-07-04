import React, { useContext, useEffect, Fragment } from 'react'
import { observer } from 'mobx-react-lite/dist/observer';
import { RootStoreContext } from '../../../app/store/rootStore';

const UserList: React.FC = () => {

    const rootStore = useContext(RootStoreContext);
    const { loadingInitial, getPageList, pageList } = rootStore.pageStore;

    useEffect(() => {
        getPageList().then(() => {
            debugger;
            console.log(pageList);
        })
    }, [getPageList])

    return (
        <Fragment>
            <div>User List</div>
        </Fragment>
    )
}

export default observer(UserList);