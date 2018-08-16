import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import Loadable from 'react-loadable';
import Signin from './views/Signin'
import Signup from './views/Signup'
import LinearProgress from '@material-ui/core/LinearProgress';

import ResetPassword from './views/ResetPassword'
import ConfirmResetPassword from './views/ConfirmResetPassword'
import NotFound from './views/NotFound'

const Loading = (props) => {
  if (props.error){
    return <div>Error! <button onClick={props.retry}>Retry</button></div>
  } else if (props.pastDelay) {
    return <LinearProgress />;
  } else {
    return null;
  }}

const SearchView = Loadable({
  loader: () => import('./views/SearchView'),
  loading: Loading,
});
const ItemView = Loadable({
  loader: () => import('./views/ItemView'),
  loading: Loading,
});
const AccountSetup = Loadable({
  loader: () => import('./views/AccountSetup'),
  loading: Loading,
});
const ProfileView = Loadable({
  loader: () => import('./views/ProfileView'),
  loading: Loading,
});
const AuthHome = Loadable({
  loader: () => import('./views/AuthHome'),
  loading: Loading,
});
const AggregatedNews = Loadable({
  loader: () => import('./views/AggregatedNews'),
  loading: Loading,
});
const ActionManager = Loadable({
  loader: () => import('./views/ActionManager'),
  loading: Loading,
});
const Watchlist = Loadable({
  loader: () => import('./views/Watchlist'),
  loading: Loading,
});
const Tasklist = Loadable({
  loader: () => import('./views/ProjectTaskList'),
  loading: Loading,
});
const ContactsView = Loadable({
  loader: () => import('./views/ContactsView'),
  loading: Loading,
});
const TeamManagerView = Loadable({
  loader: () => import('./views/TeamManagerView'),
  loading: Loading,
});
const TeamInviteAccept = Loadable({
  loader: () => import('./views/TeamInviteAccept'),
  loading: Loading,
});
const TeamInviteSuccess = Loadable({
  loader: () => import('./views/TeamInviteSuccess'),
  loading: Loading,
});
const ReadingList = Loadable({
  loader: () => import('./views/ReadingList'),
  loading: Loading,
});
const MailingList = Loadable({
  loader: () => import('./views/MailingList'),
  loading: Loading,
});



const Routes = (props) => {
  return (
    <Switch>
        <UnauthenticatedRoute exact key="unauthlanding" path='/' props={{isSignedIn: props.isSignedIn}} component={Signin}/>
        <UnauthenticatedRoute exact key="signin" path='/signin' props={{isSignedIn: props.isSignedIn}} component={Signin}/>
        <UnauthenticatedRoute key="signin" path='/signin/resetpassword' props={{isSignedIn: props.isSignedIn}} component={ResetPassword}/>
        <UnauthenticatedRoute exact key="signup" path='/signin/signup' props={{isSignedIn: props.isSignedIn}} component={Signup}/>
        <UnauthenticatedRoute key="signin" path='/signin/confirmcode' props={{isSignedIn: props.isSignedIn}} component={ConfirmResetPassword}/>
        <AuthenticatedRoute key="1" path='/create-new-team' props={{isSignedIn: props.isSignedIn}} component={AccountSetup}/>
        <AuthenticatedRoute key="12345" path='/home' props={{isSignedIn: props.isSignedIn}} component={AuthHome}/>
        <AuthenticatedRoute key="master-search" exact path='/search' props={{isSignedIn: props.isSignedIn}} component={SearchView}/>
        <AuthenticatedRoute key="search-page" exact path='/search/:searchCategory' props={{isSignedIn: props.isSignedIn}} component={SearchView}/>
        <AuthenticatedRoute key="search-page-with-watchlist" exact path='/search/:searchCategory/:watchlistId' props={{isSignedIn: props.isSignedIn}} component={SearchView}/>
        <AuthenticatedRoute key="regulation-item-view" path='/regulation/:id' props={{isSignedIn: props.isSignedIn}} component={SearchView}/>
        <AuthenticatedRoute key="media-item-view" path='/media/:id' props={{isSignedIn: props.isSignedIn}} component={SearchView}/>
        <AuthenticatedRoute key="commentary-item-view" path='/commentary/:id' props={{isSignedIn: props.isSignedIn}} component={SearchView}/>
        <AuthenticatedRoute key="research-item-view" path='/research/:id' props={{isSignedIn: props.isSignedIn}} component={SearchView}/>
        <AuthenticatedRoute key="team-manager-view" exact path='/team' props={{isSignedIn: props.isSignedIn}} component={TeamManagerView}/>
        <AuthenticatedRoute key="team-accept-invite-to-team" exact path='/team/invite/:invitetoken' props={{isSignedIn: props.isSignedIn}} component={TeamInviteAccept}/>
        <AuthenticatedRoute key="team-invitation-success" exact path='/team/success' props={{isSignedIn: props.isSignedIn}} component={TeamInviteSuccess}/>
        <AuthenticatedRoute key="news" path='/news' props={{isSignedIn: props.isSignedIn}} component={AggregatedNews}/>
        <AuthenticatedRoute key="watchlist" path='/watchlist' props={{isSignedIn: props.isSignedIn}} component={Watchlist}/>
        <AuthenticatedRoute key="123456" path='/item' props={{isSignedIn: props.isSignedIn}} component={ItemView}/>
        <AuthenticatedRoute key="profile-page" path='/myaccount' props={{isSignedIn: props.isSignedIn}} component={ProfileView}/>
        <AuthenticatedRoute exact key="compliance-manager" path='/compliance-workspace' props={{isSignedIn: props.isSignedIn}} component={ActionManager}/>
        <AuthenticatedRoute key="project-view" path='/compliance-workspace/:id' props={{isSignedIn: props.isSignedIn}} component={Tasklist}/>
        <AuthenticatedRoute key="reading-list" path="/reading-list" props={{isSignedIn: props.isSignedIn}} component={ReadingList}/>
        <AuthenticatedRoute key="mailing-list" path="/mailing-list" props={{isSignedIn: props.isSignedIn}} component={MailingList}/>
        
        {/* <AuthenticatedRoute key="contacts" path='/contacts' exact props={{isSignedIn: props.isSignedIn}} component={ContactsView}/>
        <AuthenticatedRoute key="contacts-id" path='/contacts/{cid}/' props={{isSignedIn: props.isSignedIn}} component={ContactsView}/> */}
        <Route key="not-found" component={NotFound}/>
    </Switch>
  )
}

export default Routes