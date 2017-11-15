import React from 'react';
import {
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import Layout from './layout';
import IndexPage from './pages/indexPage';
import DetailsPage from './pages/detailsPage';
import NotFoundPage from './pages/notFound';

export default class AppRouter extends React.Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path="/views" component={IndexPage} />
          <Route path="/views/details" component={DetailsPage} />
          <Route path="/views/*" component={NotFoundPage} />
        </Switch>
      </Layout>
    );
  }
}
