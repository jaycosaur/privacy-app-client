import React from 'react'
import { Route, Switch } from 'react-router-dom'
import SearchView from './views/SearchView'
import ItemView from './views/ItemView'
import OnboardingSelectType from './views/OnboardingSelectType'
import ProfileView from './views/ProfileView'
import Signin from './views/Signin'
import ResetPassword from './views/ResetPassword'
import ConfirmResetPassword from './views/ConfirmResetPassword'
import AuthHome from './views/AuthHome'

import { connect } from 'react-redux'

import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

import { ConnectedRouter } from 'react-router-redux'
import { history } from './store/'


const Routes = (props) => {
  return (
    <Switch>
        <UnauthenticatedRoute exact key="unauthlanding" path='/' props={{isSignedIn: props.isSignedIn}} component={Signin}/>
        <UnauthenticatedRoute exact key="signin" path='/signin' props={{isSignedIn: props.isSignedIn}} component={Signin}/>
        <UnauthenticatedRoute key="signin" path='/signin/resetpassword' props={{isSignedIn: props.isSignedIn}} component={ResetPassword}/>
        <UnauthenticatedRoute key="signin" path='/signin/confirmcode' props={{isSignedIn: props.isSignedIn}} component={ConfirmResetPassword}/>
        <AuthenticatedRoute key="1" path='/accountsetup/createaccount' props={{isSignedIn: props.isSignedIn}} component={OnboardingSelectType}/>
        <AuthenticatedRoute key="12" path='/accountsetup/tellusaboutyourself' props={{isSignedIn: props.isSignedIn}} component={OnboardingSelectType}/>
        <AuthenticatedRoute key="123" path='/accountsetup/selectyourtopics' props={{isSignedIn: props.isSignedIn}} component={OnboardingSelectType}/>
        <AuthenticatedRoute key="1234" path='/accountsetup/youreallsetup' props={{isSignedIn: props.isSignedIn}} component={OnboardingSelectType}/>
        <AuthenticatedRoute key="12345" path='/home' props={{isSignedIn: props.isSignedIn}} component={AuthHome}/>
        <AuthenticatedRoute key="policy-tracker" path='/policy-tracker' props={{isSignedIn: props.isSignedIn}} component={SearchView}/>
        <AuthenticatedRoute key="123456" path='/item' props={{isSignedIn: props.isSignedIn}} component={ItemView}/>
        <AuthenticatedRoute key="profile-page" path='/myaccount' props={{isSignedIn: props.isSignedIn}} component={ProfileView}/>
    </Switch>
  )
}

export default Routes