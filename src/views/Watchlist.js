import React from 'react'
import { connect } from 'react-redux'
import * as actions from './../store/actions/watchlistActions'
import { Row, List, Card, Popconfirm } from 'antd';
import Loader from './../components/FullPageLoader'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import Tooltip from '@material-ui/core/Tooltip';

import LoadingButton from './../components/loading/LoadingButton'
import AvatarWithBadge from './../components/avatars/AvatarWithBadge'
import LanguageIcon from '@material-ui/icons/Language'

const styles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    strongTitle: {
        fontWeight: 800,
        flex: 1
    }
})

class WatchlistView extends React.Component {
    componentDidMount(){
        this.props.getWatchlistItems()
      }
    render() {
        const { classes } = this.props
        return (
            !this.props.isFetching?<div style={{minHeight: "100vh"}}>
                <AppBar position="static" color="secondary">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <SettingsIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.strongTitle}>
                            WATCHLIST
                        </Typography>
                        <div>
                        <Tooltip id="tooltip-icon" title="Create new policy alert">
                            <Button 
                                variant="extendedFab"
                                component={Link}
                                to="/policy-tracker"
                                color="primary"
                                >
                                <AddIcon />
                            </Button>
                        </Tooltip>
                        </div>
                    </Toolbar>
                </AppBar>
                <Row style={{width: "100%", padding: "32px 140px"}}>
                    <Card style={{borderRadius: 8}}>
                    {this.props.watchlistItems.length>0?<List
                            itemLayout="horizontal"
                            dataSource={this.props.watchlistItems}
                            renderItem={item => (
                            <List.Item key={item.id} 
                                actions={
                                    [
                                        <Tooltip id="tooltip-icon" title="Alert settings">
                                            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                                                <SettingsIcon />
                                            </IconButton>
                                        </Tooltip>,
                                        <Tooltip id="tooltip-icon" title="Delete watch">
                                            <Popconfirm title="Are you sure delete this Watch?" onConfirm={e=> this.props.deleteWatchlistItem(item.id)} okText="Yes" cancelText="No">
                                                <LoadingButton isLoading={this.props.isDeleting} isIcon type={DeleteIcon} delete/>
                                            </Popconfirm>
                                        </Tooltip>
                                    ]}>
                                <List.Item.Meta 
                                    avatar={<AvatarWithBadge count={Math.round(Math.random()*20)} render={
                                        (()=><LanguageIcon />)
                                    }/>}
                                    title={<Link to={`/policy-tracker/${item.id}`}>{item.title}</Link>}
                                    description={<p><small><strong>Watching</strong> {item.watchedItemIds.length} items | <strong>Latest Update:</strong> 6 hours ago. </small></p>}
                                />
                            </List.Item>
                            )}
                        />: <p style={{textAlign: "center", margin: 0}}>Oh no! It looks like you haven't created any Watch Alerts yet. Add some then check back here.</p>}
                    </Card>
                </Row>
            </div>:<div style={{width: "100%", height: "90vh", display: "flex", justifyContent: "center", alignItems: "center"}}><Loader /></div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        /*isSaving: state.watchlist.isSaving,
        isUnsaved: state.watchlist.isUnsaved,*/
        isFetching: state.watchlist.isFetching,
        isDeleting: state.watchlist.isDeleting,
        watchlistItems: state.watchlist.watchlistItems
    }
}

export default connect(mapStateToProps, actions)(withStyles(styles)(WatchlistView))