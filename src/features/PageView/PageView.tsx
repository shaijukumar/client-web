import React, { useState, useRef, Fragment, useEffect } from 'react'
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';


interface PageParms {
    id: string
}

const PageView: React.FC<RouteComponentProps<PageParms>> = ({ match, history }) => {


    useEffect(() => {
        if (match.params.id) {

        }
        else {

        }
    }, [
        match.params.id,
    ]);


    return (
        <Fragment><h1>PageView  {match.params.id} </h1></Fragment>
    );
}

export default observer(PageView);