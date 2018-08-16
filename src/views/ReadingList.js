import React, { Component } from 'react'
import moment from 'moment'
import AuthViewRouteContainer from './AuthViewRouteContainer'
import TopBar from './../containers/ReadingListTopBar'

import { connect } from 'react-redux'
import * as watchlistActions from './../store/actions/watchlistActions'

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import EmailIcon from '@material-ui/icons/Email';
import DeleteIcon from '@material-ui/icons/Delete';


class ReadingListItem extends Component {
    componentDidMount() {
        !this.props.record&&this.props.getRecord()
    }
    render(){
        const classes = {}
        const { record } = this.props
        const bg = "#ddd"
        const Mock = (style) => <div style={{background: bg, ...style}}/>

        const Loading = () => (
            <Card style={{marginBottom: 8}}>
                <CardHeader
                    avatar={<Mock width={48} height={48} borderRadius={50}/>}
                    action={<Mock width={24} height={24} margin={12} borderRadius={50}/>}
                    title={<Mock width={400} height={20} marginBottom={4} borderRadius={5}/>}
                    subheader={<Mock width={300} height={20} borderRadius={5}/>}
                />
                <CardContent>
                    <Mock width={600} height={40} marginBottom={4} borderRadius={5}/>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                    <Mock width={24} height={24} margin={12}  borderRadius={50}/>
                    <Mock width={24} height={24} margin={12}  borderRadius={50}/>
                    <div style={{flex: 1}}/>
                    <Mock width={24} height={24} margin={12}  borderRadius={50}/>
                </CardActions>
          </Card>

        )
        return (
            record&&!record.isLoading?<Card style={{marginBottom: 8}}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="Recipe" className={classes.avatar}>
                            E
                        </Avatar>
                    }
                    action={
                        <IconButton>
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={record?record.title:"loading..."}
                    subheader={`You saved this on: ${this.props.addedOn?moment(this.props.addedOn).format("LLLL"):"Pending"}`}
                />
                <CardContent>
                    <Typography component="p">
                        {record?record.title:"loading..."}
                    </Typography>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                    <IconButton aria-label="Share">
                        <ShareIcon />
                    </IconButton>
                    <IconButton aria-label="Email">
                        <EmailIcon />
                    </IconButton>
                    <div style={{flex: 1}}/>
                    <IconButton aria-label="Delete" onClick={this.props.handleDelete}>
                        <DeleteIcon style={{color: red[500]}}/>
                    </IconButton>

                </CardActions>
          </Card>:<Loading />
        )
    }
}

class ReadingList extends Component {
    render() {
        const EmptyScreen = () => (
            <div style={{width: "100%", height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div>
                    <img src={require("./../assets/RocketWide.png")} alt="" width="600px"/>
                    <Typography variant="headline" align="center" style={{color: "rgb(158, 158, 158)", marginTop: 32}}>You have no saved items in your reading list.</Typography>
                </div>
            </div>
        )
        return (
            <AuthViewRouteContainer topbar={<TopBar/>}>
                {this.props.readLater.items.length>0?(
                    <div style={{padding: "32px 25%"}}>
                        {this.props.readLater.items.sort((a,b)=>moment(a.addedOn).isBefore(b.addedOn)).map(i=><ReadingListItem key={i.id} getRecord={()=>this.props.getItemInReadLaterList(i.id)} record={this.props.readLater.records[i.id]} handleDelete={()=>this.props.removeFromReadLaterList(i.id)} {...i}/>)}
                    </div>
                ):<EmptyScreen />}
            </AuthViewRouteContainer>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        readLater: state.readLater
    }
}



export default connect(mapStateToProps, { ...watchlistActions })(ReadingList)
