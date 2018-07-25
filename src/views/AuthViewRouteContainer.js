import React from 'react'
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
    root: {
        flexGrow: 1,
        height: "92vh",
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        minWidth: 0,
        height: "87vh", overflowY: "scroll",
        zIndex: 1
    },
});
  

const SearchView = (props) => {
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

const SearchViewWithStyles = withStyles(styles)(SearchView)

export default SearchViewWithStyles