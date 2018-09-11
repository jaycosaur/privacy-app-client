
import React from 'react'
import { themeColors, } from './../../../theme'
import moment from 'moment';
import HandleHover from './../components/HandleHover'
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DatePickerMD from 'material-ui-pickers/DatePicker';

import EventIcon from '@material-ui/icons/Event';
import StarIcon from '@material-ui/icons/Star';
import HotIcon from '@material-ui/icons/Whatshot';
import PeopleIcon from '@material-ui/icons/People';
import { connect } from 'react-redux'


import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/PlaylistAdd';
import ExpandIcon from '@material-ui/icons/ExpandMore';
import HideIcon from '@material-ui/icons/ExpandLess';
import LeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import RightIcon from '@material-ui/icons/KeyboardArrowRight';
import EditIcon from '@material-ui/icons/Edit';

import Card from '@material-ui/core/Card';
import AvatarMD from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton';
import ButtonMD from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import SelectTeamMember from './../components/SelectTeamMember'
import SelectBaseItem from './../components/SelectBaseItem'
import SelectActionStatus from './../components/SelectActionStatus'
import SelectActionSchedule from './../components/SelectActionSchedule'
import SelectComplianceType from './../components/SelectComplianceType'


import Tooltip from '@material-ui/core/Tooltip';

import Hidden from '@material-ui/core/Hidden';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';



const getInitials = (fullName) => fullName.split(" ").map(n=>n[0]).join("")

const RenderUserAvatarAndName = (props) => {
    return <AvatarMD style={{fontSize: 14, fontWeight: 300, background: props.id&&"#623aa2"}}>{props.id&&props.team[props.id]&&props.team[props.id].displayName?getInitials(props.team[props.id].displayName):<PeopleIcon />}</AvatarMD>
}

const mstp = (state, ownProps) => {
    return {
        team: state.organisation.users.reduce((a,u)=>({...a, [u.userId]:{...u}}),{})
    }
}
    
const UserAvatarAndName = connect(mstp)(RenderUserAvatarAndName)

class DatePickerButton extends React.Component {
    openPicker = () => {
        this.picker.open();
    }
    render(){
        return (
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <ButtonMD size="small" onClick={this.openPicker} variant="outlined" style={{background: "white", marginLeft: 8}}>
                    {this.props.value?moment(this.props.value).format("DD MMM"):<span style={{color: "#bbb"}}>Select</span>} <EventIcon style={{fontSize: 20, marginLeft: 8, color: "#bbb"}} />
                </ButtonMD>
                <SelectActionSchedule
                    hasBeenCloned={this.props.hasBeenCloned}
                    handleChange={({schedule})=>this.props.handleChange({schedule})} 
                    value={this.props.scheduleValue}
                />
                <div style={{visibility: "hidden", width: 0, height: 0}}>
                    <DatePickerMD
                        value={this.props.value}
                        onChange={this.props.onChange}
                        leftArrowIcon={<LeftIcon />}
                        rightArrowIcon={<RightIcon />}
                        showTodayButton
                        clearable
                        emptyLabel="Select date"
                        ref={(node) => { this.picker = node; }}
                    />
                </div>
            </MuiPickersUtilsProvider>
        )
    }
}

class Item extends React.Component {
    state = {
        showChildren: true,
        dummyChild: false,
        isDeleting: false
        
    }
    toggleChildren = (e) => {
        e.preventDefault()
        this.setState((state) => ({ showChildren: !state.showChildren }))
    }

    handleAdd = (e) => {
        this.setState((state) => ({ dummyChild: true }))
        this.props.handleAdd(e)
    }

    handleDelete = (e) => {
        this.setState((state) => ({ isDeleting: true }))
        this.props.handleDelete(this.props.id)
    }

    

    static getDerivedStateFromProps(props, state){
        return {numberOfChildren: props.children.length, dummyChild: !state.numberOfChildren===props.children.length}
    }

    render() {
        const { actionData, id, onUrgentClick, isSelected, child } = this.props
        console.log(id, isSelected)
        const LargerView = () => (
            <div style={{marginTop: child ? 8 : 16, paddingLeft:child&&16, transition: "opacity 0.5s"}}>
                <HandleHover render={
                    (isHovered) => (
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                            <Card 
                                style={{ 
                                    border: isSelected?"1px solid #f97794":"1px solid #ddd",
                                    marginLeft: child&&16,
                                    flexGrow: 1, 
                                    borderRadius: 10, 
                                    background: this.state.isDeleting?"#ddd":null,//(isHovered && "#ffa9c4"), 
                                    opacity: this.state.isDeleting&&0.6,
                                    display: "flex", 
                                    justifyContent: "space-between", 
                                    alignItems: "center", 
                                    width: "100%",
                                    padding: "4px 16px", 
                                    overflowX: "hidden"  }} 
                                elevation={isHovered?3:0}
                                >
                                <HandleHover render={
                                    (hovered) => (
                                        !hovered ? 
                                        <div onClick={this.toggleChildren} style={{ background: isHovered ? (this.props.children ? themeColors[1] : themeColors[0]) : (this.props.children ? themeColors[1] : themeColors[0]), width: 8, height: 40, borderRadius: 4, marginRight: 16 }} /> : 
                                            <div>
                                                <Tooltip title="Add dependant obligation">
                                                    <IconButton aria-label="add-child" color="primary" onClick={() => this.handleAdd(this.props.id)} >
                                                        <AddIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title={`${!this.state.showChildren?"Show":"Hide"} dependants`}>
                                                    <IconButton aria-label="show-toggle" disabled={!this.props.children} color="primary" onClick={this.toggleChildren} style={{marginRight: 8}}>
                                                        {this.state.showChildren?<HideIcon />:<ExpandIcon/>}
                                                    </IconButton>
                                                </Tooltip>
                                            </div>
                                    )
                                } />
                                <SelectComplianceType
                                    handleChange={({complianceType})=>this.props.handleUpdate({complianceType})} 
                                    value={actionData.complianceType}
                                />
                                <Tooltip title={actionData.isUrgent?"Clear urgent":"Mark as urgent"}>
                                    <IconButton aria-label="Hot" disabled={!actionData.title} color={actionData.isUrgent?"secondary":"default"} onClick={()=>onUrgentClick({actionId: id})}>
                                        <HotIcon />
                                    </IconButton>
                                </Tooltip>
                                {!actionData.title&&<StarIcon/>}
                                <div onClick={() => this.props.handleClick(this.props.id)} >
                                    <Typography variant="subheading" style={{marginBottom: 0}}>{actionData.title||"New action!"}</Typography>
                                </div>
                                <div style={{flex: 1}}/>
                                <EditShow />
                                <SelectActionStatus 
                                    isDue={moment().isAfter(actionData.dueDate)} 
                                    isUrgent={actionData.isUrgent} 
                                    isStarted={actionData.isStarted} 
                                    isDone={actionData.countTasks>0&&actionData.countTasks===actionData.countTasksCompleted}
                                    handleChange={({status})=>this.props.handleUpdate({status})} 
                                    value={actionData.status||"TODO"}
                                    />
                                <SelectBaseItem 
                                    key="base-item-select"
                                    handleChange={({id})=>this.props.handleUpdate({linkedRecord: id})} 
                                    buttonContent={"Not Assigned"} 
                                    buttonStyle={{background: "white"}}
                                    hasValue={actionData.linkedRecord}
                                    />
                                <DatePickerButton
                                    hasBeenCloned={actionData.hasBeenCloned}
                                    cloneId={actionData.cloneId}
                                    handleChange={({ schedule })=>this.props.handleUpdate({ schedule })}
                                    scheduleValue={actionData.schedule}
                                    value={actionData.dueDate?moment(actionData.dueDate):null}
                                    onChange={(e)=>this.props.handleUpdate({dueDate: e?e.toISOString():null})}
                                />
                                <SelectTeamMember 
                                    key="team-member-select"
                                    handleChange={({userId})=>this.props.handleUpdate({ownerId: userId})} 
                                    buttonContent={<UserAvatarAndName id={actionData.ownerId} avatar/>} 
                                    buttonStyle={{marginRight: "8px"}}/>
                                <Hidden smDown>
                                    <HandleHover render={
                                        (hovered) => (
                                            !hovered ? 
                                                <div style={{ background: isHovered ? "red" : null, width: 8, height: 40, borderRadius: 4, marginRight: -8 }} /> : 
                                                <Tooltip title={"Delete Obligation"}>
                                                    <IconButton aria-label="Delete" disabled={this.props.children.length>0} color="primary" style={{color: !this.props.children.length>0&&"red"}} onClick={(e) => {e.preventDefault(); this.handleDelete(this.props.id)}} >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                        )
                                    } />
                                </Hidden>
                            </Card>
                        </div>
                    )
                } />
                <div style={{ marginLeft: this.props.child && 16 }}>
                    <HandleHover render={
                        (isHovered) => (
                            <div onClick={() => this.handleAdd(this.props.id)} style={{ minHeight: 8, marginBottom: -8, background: isHovered && themeColors[1], opacity: 0.5, marginLeft: 8, marginRight: 8 }} />
                        )
                    } />
                    {this.state.showChildren && this.props.children}
                    {this.state.dummyChild&&<ListLoader child/>}
                </div>
            </div>
        )

        const EditShow = () => <IconButton onClick={() => this.props.handleClick(this.props.id)}><EditIcon /></IconButton>

        const SmallView = () => (
            <div style={{ marginTop: child ? 8 : 32, marginBottom: !this.props.children&&24, transition: "opacity 0.5s"}}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                    <Card 
                        style={{ 
                            flexGrow: 1, 
                            borderRadius: 10, 
                            background: this.state.isDeleting&&"#ddd",
                            opacity: this.state.isDeleting&&0.6,
                            display: "flex", 
                            justifyContent: "space-between", 
                            alignItems: "center", 
                            width: "100%", 
                            overflowX: "hidden",
                            height: 150  }} 
                        elevation={
                            child?1:(isSelected?20:2)
                        }
                        >
                        <div style={{ background: (this.props.children ? themeColors[1] : themeColors[0]), width: 10, height: "100%"}} /> 
                        <div style={{height: "100%", flex: 1, display: "flex", flexDirection: "column", padding: "8px 16px", justifyContent: "space-between", alignContent: "space-between"}}>
                            <div style={{flex: 1, display: "flex"}}>
                                <div style={{flex: 2, display: "flex"}}>
                                    <EditShow/>
                                    <div onClick={() => this.props.handleClick(this.props.id)}>
                                        <Typography variant="subheading">{
                                            (actionData.title&&(actionData.title.length>85?`${[...actionData.title].slice(0,85).join("")}...`:actionData.title))||"New action!"
                                        }</Typography>
                                    </div>
                                </div>
                                <div style={{display: "flex", flex: 1, alignItems: "center", justifyContent: "center"}}>
                                    <SelectActionStatus 
                                        isDue={moment().isAfter(actionData.dueDate)} 
                                        isUrgent={actionData.isUrgent} 
                                        isStarted={actionData.isStarted} 
                                        isDone={actionData.countTasks>0&&actionData.countTasks===actionData.countTasksCompleted}
                                        handleChange={({status})=>this.props.handleUpdate({status})} 
                                        value={actionData.status||"TODO"}
                                    />
                                </div>
                            </div>
                            <div style={{flex: 1, display: "flex", alignItems: "flex-end"}}>
                                <Tooltip title="Add dependant obligation">
                                    <IconButton aria-label="add-child" color="primary" onClick={() => this.handleAdd(this.props.id)} >
                                        <AddIcon />
                                    </IconButton>
                                </Tooltip>
                                <SelectTeamMember 
                                    handleChange={({userId})=>this.props.handleUpdate({ownerId: userId})} 
                                    buttonContent={<UserAvatarAndName id={actionData.ownerId} avatar/>}
                                    />

                                <SelectBaseItem 
                                    handleChange={({id})=>this.props.handleUpdate({linkedRecord: id})} 
                                    buttonContent={"Not Assigned"} 
                                    buttonStyle={{background: "white"}}
                                    hasValue={actionData.linkedRecord}
                                    />
                                <div style={{flex: 1}}/>
                                <DatePickerButton
                                    value={actionData.dueDate?moment(actionData.dueDate):null}
                                    onChange={(e)=>this.props.handleUpdate({dueDate: e?e.toISOString():null})}
                                />
                            </div>
                        </div>
                    </Card>
                </div>
                <div>
                    {this.state.showChildren && this.props.children}
                    {this.state.dummyChild&&<ListLoader child/>}
                </div>
            </div>
        )

        return isWidthUp("md",this.props.width)?<LargerView />:<SmallView />
    }
}

const TaskItem = withWidth()(Item)

export default TaskItem 

export class ListLoader extends React.Component {
    render() {
        const { child } = this.props
        const col = "#ddd"
        const bg = "#eee"
        return (
            <div style={{marginTop: child ? 8 : 16, paddingLeft:child&&52 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", opacity: 0.6 }}>
                    <Card 
                        style={{ 
                            flexGrow: 1, 
                            borderRadius: 10,
                            display: "flex", 
                            justifyContent: "space-between", 
                            alignItems: "center", 
                            background: bg,
                            width: "100%", 
                            padding: "4px 16px", 
                            height: 56,
                        }} 
                        elevation={0}
                        >
                        <div style={{ background: col, width: 8, height: 40, borderRadius: 4, marginRight: 8 }} />
                        <div style={{height: 40, width: 40, borderRadius: 50, background: col}} />
                        <div style={{ flexGrow: 1 }}>
                        </div>
                        <div style={{height: 40, width: 120, borderRadius: 4, background: col, marginRight: 8}} />
                        <div style={{height: 40, width: 90, borderRadius: 4, background: col, marginRight: 8}} />
                        <div style={{height: 40, width: 90, borderRadius: 4, background: col, marginRight: 8}} />
                        <div style={{height: 40, width: 90, borderRadius: 4, background: col, marginRight: 8}} />
                        <div style={{height: 40, width: 90, borderRadius: 4, background: col, marginRight: 8}} />
                        <div style={{height: 40, width: 40, borderRadius: 50, background: col}} />
                    </Card>
                </div>
                <div style={{ marginLeft: this.props.child && 60 }}>
                    <div style={{ minHeight: 8, marginBottom: -8, opacity: 0.5, marginLeft: 8, marginRight: 8 }} />
                    {this.props.children}
                </div>
            </div>
        )
    }
}
