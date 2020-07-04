import React, { useContext, useEffect } from 'react'
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps} from 'react-router-dom';
import LoadingComponent from '../../../app/layouts/LoadingComponent';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';
import { RootStoreContext } from '../../../app/store/rootStore';

interface DetailParms{
    id:string
}
const ActivityDetails: React.FC<RouteComponentProps<DetailParms> > = ({match, history}) => {

    const rootStore = useContext(RootStoreContext)
    const {activity, loadActivity, loadingInitial } = rootStore.activityStore;

    useEffect( () => {
        loadActivity(match.params.id);
    }, [loadActivity, match.params.id, history])

    if(loadingInitial) return <LoadingComponent content='loading activity..' />
    
    if(!activity)
      return <h2>No Activity found</h2>

    return (
      <Grid>
          <Grid.Column width='10'>
            <ActivityDetailedHeader activity={activity}/>
            <ActivityDetailedInfo activity={activity}/>
            <ActivityDetailedChat/>
          </Grid.Column>

          <Grid.Column width='6'>
            <ActivityDetailedSidebar attendees={activity.attendees}/>
          </Grid.Column>
      </Grid>
    )
}

export default observer (ActivityDetails);
