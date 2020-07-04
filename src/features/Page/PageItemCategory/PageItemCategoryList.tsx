import React, { useContext, useEffect, Fragment } from 'react'
import { RootStoreContext } from '../../../app/store/rootStore';
import { observer } from 'mobx-react-lite';
import { Label, List, Accordion, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import CatTree from './CatTree';
import CategoryAccordion from './CategoryAccordion';



const PageItemCategoryList: React.FC = () => {

    const rootStore = useContext(RootStoreContext);
    const { loadingInitial, getPageItemCategoryList, CategoryTree } = rootStore.pageItemCategoryStore;
    
    useEffect( () => {    
        getPageItemCategoryList();
    }, [getPageItemCategoryList])

    return (        
        <CategoryAccordion treeNode={CategoryTree}/>        
    )
}
//CategoryAccordion
export default observer(PageItemCategoryList);
