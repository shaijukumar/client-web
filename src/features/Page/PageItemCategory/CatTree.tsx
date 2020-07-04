import React from 'react'
import { IPageItemCategory, IPageItemCategoryTree } from "../../../app/models/PageItemCategory";
import { List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

interface IProps {
    treeNode: IPageItemCategoryTree[]
}


const CatTree: React.FC<IProps> = ({ treeNode }) => {

    return (
        <List as='ul'>
            {treeNode.map((cat) => (
                <List.Item as='li' key={cat.item.Id} >
                    <Link to={`/PageItemCategoryEdit/:${cat.item.Id}`}> {cat.item.Name}</Link>
                    {cat.children.length > 0 && <CatTree treeNode={cat.children} />}
                </List.Item>

            ))}
        </List>



    )
}

export default CatTree
