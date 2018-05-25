import { auth } from './../../config/firebase';
import { push } from 'react-router-redux'

// Sign Up
export const doCreateUserWithEmailAndPassword = ({email, password}) => {
    return {
        type: 'CREATE_USER',
        payload: auth.createUserWithEmailAndPassword(email, password),
        meta: {email: email}
    }
}

export const signInWithEmailAndPassword = ({email, password}) => {
    return {
        type: 'SIGNIN_USER',
        payload: auth.signInWithEmailAndPassword(email, password),
        meta: {email: email}
    }
}

export const doFetchUserFromLocalStorage = () => {
    const currentUser = auth.currentUser
    return {
        type: 'FETCH_USER_FROM_LOCAL',
        payload: {
            userFound: currentUser?true:false,
            useritem: currentUser,
        }
    }
}

export const signInWithUserInfo = (info) => {
    return {
        type: 'SIGNIN_USER_FROM_LOCAL',
        payload: info,
    }
}

export const attemptingSignIn = () => {
    return {
        type: 'SIGNIN_USER_PENDING'
    }
}

export const failedSignIn = () => {
    return {
        type: 'SIGNIN_USER_REJECTED'
    }
}

export const doSignOut = () => {
    return {
        type: 'SIGNOUT_USER',
        payload: auth.signOut()
    }
}

export const doPasswordReset = ({email}) => {
    return {
        type: 'PASSWORD_RESET',
        payload: auth.sendPasswordResetEmail(email)
    }
}

export const doPasswordUpdate = ({password}) => {
    return {
        type: 'PASSWORD_UPDATE',
        payload: auth.currentUser.updatePassword(password)
    }
}