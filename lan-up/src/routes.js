import React from 'react'
import { Switch, Route, Redirect } from 'react-router';
import Ranking from './Ranking';
import NotFound from './NotFound';
import ProfileSearch from './ProfileSearch';
import PlayerProfile from './PlayerProfile';

/*============================================ 
    Redirect route allows NotFound component
    to re-render root component in case of internal load.
==============================================*/

const routes = (
	<div>
		<Switch>
	  		<Route path="/" exact component={Ranking} />
	  		<Route path="/ranking/:server" exact component={Ranking} />
	  		<Route path="/ranking/:server/:game" component={Ranking} />
	  		<Route path="/search" exact component={ProfileSearch} />
	  		<Route path="/player-profile/:user" component={PlayerProfile} />
	  		<Redirect from="/redirect" to="/" />
	  		<Route component={NotFound} />
	    </Switch>
	</div>
);

export default routes;