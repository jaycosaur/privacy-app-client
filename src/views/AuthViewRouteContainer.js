import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Scrollbars } from 'react-custom-scrollbars';
import Typography from '@material-ui/core/Typography';

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
            height: `calc(100vh-${theme.mixins.toolbar.minHeight})`,
            paddingBottom: `2vh`,
            overflowX: "hidden",
            zIndex: 1,
            maxWidth: "100vw"
        },
        title: {
            paddingTop: theme.spacing.unit*2,
            paddingLeft: theme.spacing.unit*4,
            paddingRight: theme.spacing.unit*4
        },
    })
}
  

const AuthView = (props) => {
    const { classes, children, topbar, textHeader } = props
    return (
        <Scrollbars className={classes.root}>
            <div style={{flexGrow: 1}}>
                {topbar}
                {textHeader&&<Typography className={classes.title} variant="display1" color="textPrimary" style={{fontWeight: 800}}>{textHeader}</Typography>}
                <main className={classes.content}>
                    {children}
                </main>
            </div>
        </Scrollbars>
    )
}

const AuthViewWithStyles = withStyles(styles)(AuthView)

export default AuthViewWithStyles