import React, { useContext, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../../app/store/rootStore';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table/Table';
import { Link } from 'react-router-dom';

const PageItemList: React.FC = () => {

  const rootStore = useContext(RootStoreContext);
  const { loadingInitial, getPageList, pageList } = rootStore.pageStore;

  useEffect(() => {
    getPageList().then(() => {
      //debugger;
      console.log(pageList);
    })
  }, [getPageList])

  return (
    <Fragment>
      <Link to={`/PageItemEdit/`}>Add new page</Link>

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Category</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Url</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {pageList.map(page => (
            <Table.Row key={page.Id}>
              <Table.Cell>{page.Category}</Table.Cell>
              <Table.Cell>
                <Link to={`/PageItemEdit/${page.Id}`}> {page.Title}</Link>
              </Table.Cell>
              <Table.Cell>
                <Link to={`/PageItemEdit/${page.Id}`}> {page.URLTitle}</Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Fragment>
  )
}

PageItemList.propTypes = {

}
export default observer(PageItemList);





