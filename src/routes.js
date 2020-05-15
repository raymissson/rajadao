import React from 'react';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Tempo from './pages/Tempo';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Tempo} />
            </Switch>
        </BrowserRouter>
    );
}