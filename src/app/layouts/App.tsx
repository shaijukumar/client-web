import React, { useContext, useEffect } from "react"
import { Fragment } from 'react'
import { Container } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';

import NavBar from "../../features/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { Route, withRouter, RouteComponentProps, Switch } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import NotFound from "./NotFound";
import { ToastContainer } from 'react-toastify';
import test from "../common/test/test";
import { RootStoreContext } from "../store/rootStore";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../common/models/ModalContainer";
import ProfilePage from "../../features/profile/ProfilePage";
import PageItemCategoryList from "../../features/Page/PageItemCategory/PageItemCategoryList";
import PageItemCategoryEdit from "../../features/Page/PageItemCategory/PageItemCategoryEdit";
import SearchExampleStandard from "../../features/Page/PageItemCategory/SearchExampleStandard";
import PageItemList from "../../features/Page/Pages/PageItemList";
import PageItemEdit from "../../features/Page/Pages/PageItemEdit";
import PageView from "../../features/PageView/PageView";
import AdminPannel from "../../features/Admin/AdminPannel";


export const App: React.FC<RouteComponentProps> = ({ location }) => {

  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
  const { getUser } = rootStore.userStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded())
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token])

  if (!appLoaded) return <LoadingComponent content='Loading app...' />

  return (
    <Fragment>
      <ModalContainer />
      <ToastContainer position='bottom-right' />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Switch>
                <Route exact path='/AdminPannel' component={AdminPannel} />
                <Route exact path='/test' component={test} />
                <Route path='/PageItemList' component={PageItemList} />
                <Route key={location.key} path={['/PageItemEdit/:id', '/PageItemEdit/']} component={PageItemEdit} />
                <Route key={location.key} path={['/Page/:id', '/Page/']} component={PageView} />



                {/* <Route exact path='/activities' component={ActivityDashboard} />
                        <Route path='/activities/:id' component={ActivityDetails} />
                        <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />                         
                        <Route path='/profile/:username' component={ProfilePage} />

                        <Route path='/PageItemCategorys' component={PageItemCategoryList} />                       
                        <Route key={location.key} path={['/createNewCategory/', '/createCategory/:parent', '/editCategory/:id']} component={PageItemCategoryEdit} /> 

                        

                        <Route key={location.key} path={['/Page/:id', '/Page/']} component={PageView} />  */}

                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />

    </Fragment>
  )
}

export default withRouter(observer(App))
