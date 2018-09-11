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
import { homedir } from 'os';
import { accountSignedIn } from './store/actions/authActions';

const Loading = (props) => {
  if (props.error){
    return <div>Error! <button onClick={props.retry}>Retry</button></div>
  } else if (props.pastDelay) {
    return <LinearProgress />;
  } else {
    return null;
  }}

const TrackView = Loadable({
  loader: () => import('./views/TrackView'),
  loading: Loading,
});

const IntegrationsView = Loadable({
  loader: () => import('./views/IntegrationsView'),
  loading: Loading,
});

const ConfigureView = Loadable({
  loader: () => import('./views/ConfigureView'),
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

const HelpView = Loadable({
  loader: () => import('./views/HelpView'),
  loading: Loading,
});

const NoOrganisationView = Loadable({
  loader: () => import('./views/NoOrganisationView'),
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
        <AuthenticatedRoute key="create-new-team" path='/create-new-team' props={{isSignedIn: props.isSignedIn}} component={AccountSetup}/>
        <AuthenticatedRoute key="awaiting-invite" path='/awaiting-invite' props={{isSignedIn: props.isSignedIn}} component={AccountSetup}/>
        <AuthenticatedRoute key="invite-users" path='/invite-users' props={{isSignedIn: props.isSignedIn}} component={AccountSetup}/>
        <AuthenticatedRoute key="home-landing" path='/home' props={{isSignedIn: props.isSignedIn}} component={AuthHome}/>
        <AuthenticatedRoute key="sites" path='/sites' props={{isSignedIn: props.isSignedIn}} component={AuthHome}/>
        <AuthenticatedRoute key="track" path='/track' props={{isSignedIn: props.isSignedIn}} component={TrackView}/>
        <AuthenticatedRoute key="integrations" path='/integrations' props={{isSignedIn: props.isSignedIn}} component={IntegrationsView}/>
        <AuthenticatedRoute key="configure" path='/configure' props={{isSignedIn: props.isSignedIn}} component={ConfigureView}/>

        <AuthenticatedRoute key="team-manager-view" exact path='/team' props={{isSignedIn: props.isSignedIn}} component={TeamManagerView}/>
        <AuthenticatedRoute key="accept-invite-to-team" exact path='/invite' props={{isSignedIn: props.isSignedIn}} component={TeamInviteAccept}/>
        <AuthenticatedRoute key="invitation-success" exact path='/invite-accepted' props={{isSignedIn: props.isSignedIn}} component={TeamInviteSuccess}/>
        {/* <AuthenticatedRoute key="team-accept-invite-to-team" exact path='/team/invite/:invitetoken' props={{isSignedIn: props.isSignedIn}} component={TeamInviteAccept}/>
        <AuthenticatedRoute key="team-invitation-success" exact path='/team/success' props={{isSignedIn: props.isSignedIn}} component={TeamInviteSuccess}/> */}
        <AuthenticatedRoute key="watchlist" path='/watchlist' props={{isSignedIn: props.isSignedIn}} component={Watchlist}/>
        {/* <AuthenticatedRoute key="news" path='/news' props={{isSignedIn: props.isSignedIn}} component={AggregatedNews}/>
        <AuthenticatedRoute key="123456" path='/item' props={{isSignedIn: props.isSignedIn}} component={ItemView}/> */}
        <AuthenticatedRoute key="profile-page" path='/myaccount' props={{isSignedIn: props.isSignedIn}} component={ProfileView}/>
        <AuthenticatedRoute exact key="compliance-manager" path='/compliance-workspace' props={{isSignedIn: props.isSignedIn}} component={ActionManager}/>
        <AuthenticatedRoute key="project-view" exact path='/compliance-workspace/:projectId' props={{isSignedIn: props.isSignedIn}} component={Tasklist}/>
        <AuthenticatedRoute key="project-view" path='/compliance-workspace/:projectId/:actionId' props={{isSignedIn: props.isSignedIn}} component={Tasklist}/>
        {/* <AuthenticatedRoute key="reading-list" path="/reading-list" props={{isSignedIn: props.isSignedIn}} component={ReadingList}/>
        <AuthenticatedRoute key="mailing-list" path="/mailing-list" props={{isSignedIn: props.isSignedIn}} component={MailingList}/>
        <AuthenticatedRoute key="mailing-list" path="/ML" props={{isSignedIn: props.isSignedIn}} component={MLView}/> */}
        <AuthenticatedRoute key="help-view" exact path='/help' props={{isSignedIn: props.isSignedIn}} component={HelpView}/>
        <AuthenticatedRoute key="no-organisation-view" exact path='/no-organisation' props={{isSignedIn: props.isSignedIn}} component={NoOrganisationView}/>
        {/* <AuthenticatedRoute key="contacts" path='/contacts' exact props={{isSignedIn: props.isSignedIn}} component={ContactsView}/>
        <AuthenticatedRoute key="contacts-id" path='/contacts/{cid}/' props={{isSignedIn: props.isSignedIn}} component={ContactsView}/> */}
        <Route key="not-found" component={NotFound}/>
    </Switch>
  )
}

export default Routes