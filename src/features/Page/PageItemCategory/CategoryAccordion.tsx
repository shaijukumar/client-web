import React, { Fragment } from 'react'
import { IPageItemCategory, IPageItemCategoryTree } from '../../../app/models/PageItemCategory'
import { Accordion, AccordionTitleProps, Menu, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

interface IProps {
    treeNode: IPageItemCategoryTree[]
}


const CategoryAccordion: React.FC<IProps> = ({ treeNode }) => {



    function getChild(node: IPageItemCategoryTree[], root: boolean, parentCat?: IPageItemCategory): any {
        //debugger;

        function editLink(cat: IPageItemCategory): any {
            const link = (
                <Menu>
                    <Button primary
                        as={Link}
                        to={`/editCategory/${cat.Id}`}
                    >Edit {cat.Name}
                    </Button>

                    <Button primary
                        as={Link}
                        to={`/createCategory/${cat.Id}`}
                    >Create under {cat.Name}
                    </Button>
                </Menu>
            )
            return link;
        }

        let rootPanels: AccordionTitleProps[] = [];
        node.forEach((cat) => {

            rootPanels.push({
                key: cat.item.Id,
                title: cat.item.Name,
                content: { content: cat.children.length > 0 ? getChild(cat.children, false, cat.item) : editLink(cat.item) }
            })
        })
        // getChild(cat.children) 
        const rootNode = (
            <div>
                <Accordion panels={rootPanels} styled />
            </div>
        )

        const childNode = (
            <div>
                {/* <Link to={`/PageItemCategoryEdit/${ parentCat?.id}`}> Edit-{parentCat?.name}</Link>*/}
                <Menu>
                    <Button primary
                        as={Link}
                        to={`/editCategory/${parentCat?.Id}`}
                    >Edit {parentCat?.Name}</Button>

                    <Button primary
                        as={Link}
                        to={`/createCategory/${parentCat?.Id}`}
                    >Create under {parentCat?.Name}</Button>
                </Menu>
                <Accordion.Accordion panels={rootPanels} />
            </div>
        )

        return root ? rootNode : childNode;
    }

    return (
        <Fragment>
            {getChild(treeNode, true)}

            {/* <Accordion  panels={pannel} styled />  */}

        </Fragment>
    )
}
//defaultActiveIndex={0}
export default CategoryAccordion
