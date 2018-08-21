import React from 'react'
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => {
    return ({
        root: {
            flexGrow: 1,
            maxHeight: `calc(100vh-${theme.mixins.toolbar.minHeight})`,
            zIndex: 1,
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            maxWidth: "100vw",
        },
        content: {
            flexGrow: 1,
            minWidth: 0,
            overflowY: "auto",
            height: `87vh`,
            paddingBottom: `2vh`,
            overflowX: "hidden",
            zIndex: 1,
            maxWidth: "100vw"
        },
    })
}
  

const AuthView = (props) => {
    const { classes, children, topbar } = props
    return (
        <div className={classes.root}>
            <div style={{flexGrow: 1}}>
                {topbar}
                <main className={classes.content}>
                    {children}
                </main>
            </div>
        </div>
    )
}

const AuthViewWithStyles = withStyles(styles)(AuthView)

export default AuthViewWithStyles