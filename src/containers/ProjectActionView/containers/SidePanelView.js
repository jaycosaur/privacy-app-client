import React from 'react'
import {Progress} from 'antd'
import SidePanelNotesTab from './../components/SidePanelNotesTab'
import SidePanelInfoTab from './../components/SidePanelInfoTab'
import * as reduxActions from './../../../store/actions/actionManagerActions'
import { connect } from 'react-redux'
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import HotIcon from '@material-ui/icons/Whatshot';
import DeleteIcon from '@material-ui/icons/Delete';
import ChevronIcon from '@material-ui/icons/ChevronRight';
import CheckIcon from '@material-ui/icons/CheckCircle'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InfoIcon from '@material-ui/icons/Info';
import NotesIcon from '@material-ui/icons/Note';
import FolderIcon from '@material-ui/icons/Folder';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import SidePanelFilesTab from './../components/SidePanelFilesTab'

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { CardContent } from '../../../../node_modules/@material-ui/core';
import Paper from '@material-ui/core/Paper';

import TaskInput from './../components/TaskInput'

import SelectActionStatus from './../components/SelectActionStatus'
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment'

class TasksView extends React.Component {
    state = {
        tasks: [],
        showDummy: false,
        numberOfChildren: null
    }

    static getDerivedStateFromProps(props, state){
        const tasks = props.data.tasks&&Object.keys(props.data.tasks).map(k=>props.data.tasks[k])
        return {numberOfChildren: tasks?tasks.length:0, showDummy: state.showDummy&&(state.numberOfChildren===tasks?tasks.length:0)}
    }

    addTaskToState = () => {
        this.setState(() => ({ showDummy: true }))
        this.props.addTask()
        this.setState(() => ({ showDummy: true }))
    }

    handleMarkAsComplete = (id) => {
        const tasks = [...this.state.tasks]
        tasks[id].isDone = !tasks[id].isDone
        this.setState({ tasks: tasks })
    }

    handleChangeTitle = (e, id) => {
        const tasks = [...this.state.tasks]
        tasks[id].description = e.target.value
        this.setState({ tasks: tasks })
    }

    deleteTask = (id) => {
        this.props.deleteTask({taskId: id})
    }

    render() {
        const InfoItem = (props) => (
            <div style={{ textAlign: "center", width: 100, height: 100, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <h1 style={{ margin: 0 }}>{props.number}</h1>
                <p style={{ margin: 0, color: "rgba(0, 0, 0, 0.65)" }}>{props.text}</p>
            </div>
        )
        const { hasFetched, data: { tasks={} } } = this.props
        const tasksArr = tasks&&Object.keys(tasks).map(k=>tasks[k])
        const Placeholder = (props) => <div {...props} style={{...props.style, background: "#ddd"}}/>
        return (
            hasFetched?<CardContent>
                    <h1 style={{ textAlign: "center", marginTop: 16 }}>Your Tasks</h1>
                    <div style={{ width: "100%", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                        <InfoItem number={tasksArr.length} text={"Tasks"} />
                        <Progress width={80} type="dashboard" percent={Math.round(tasksArr.filter(i => i.isDone).length * 100 / tasksArr.length)} size="small" />
                        <InfoItem number={tasksArr.filter(i => i.isDone).length} text={"Done"} />
                    </div>
                        <List>
                            {tasksArr.map((task)=>(
                                [<ListItem key={task.id} style={{paddingLeft: 8, paddingRight: 8, background: task.isDeleting&&"#eee", opacity: task.isDeleting&&0.6}} >
                                    <ListItemAvatar>
                                        <IconButton style={{marginRight: 8}} onClick={() => this.props.updateTask({taskId: task.id, val: {isDone: !task.isDone}})}>
                                            <CheckIcon style={{color: task.isDone ? "#52c41a" : "#ccc" }} />
                                        </IconButton>
                                    </ListItemAvatar>
                                    <TaskInput 
                                        updateTask={this.props.updateTask} 
                                        placeholder="Describe your task" 
                                        isDone={task.isDone} 
                                        value={task.description} 
                                        handleChangeTitle={this.handleChangeTitle} id={task.id} />
                                    <ListItemSecondaryAction>
                                        <IconButton onClick={()=>this.deleteTask(task.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>,
                                <Divider />]
                            ))}
                            {this.state.showDummy?tasksArr.filter(i=>i.isDeleting).length===0&&<ListItem key="dummy" style={{paddingLeft: 8, paddingRight: 4, opacity: 0.6}}>
                                <Placeholder style={{width: 48, height: 48, borderRadius: 50, marginRight: 8}}/>
                                <Placeholder style={{flexGrow: 1, height: 48, borderRadius: 4, marginRight: 8}}/>
                                <Placeholder style={{width: 48, height: 48, borderRadius: 50}}/>
                            </ListItem>:null}
                        </List>
                    <div style={{ textAlign: "center", marginTop: 16 }}><a onClick={this.addTaskToState}>Add new task</a></div>
                </CardContent>:null
        )
    }
}

class SidePanelView extends React.Component {
    state = {
        value: 0,
    };

    handleTabChange = (_, value) => {
        this.setState({ value });
    };
    updateInfo = (vals) => this.props.updateActionInProjectFocused(vals)
    addTask = () => this.props.createTaskInAction()
    updateTask = ({taskId, val}) => this.props.updateTaskInAction({taskId, val})
    deleteTask = ({taskId}) => this.props.deleteTaskInAction({taskId})
    addNote = (val) => this.props.createNoteInAction(val)
    updateNote = ({noteId, val}) => this.props.updateNoteInAction({noteId, val})
    deleteNote = () => null
    deleteAction = () => null
    addFile = ({ files }) => this.props.uploadNewFilesToAction({ files })
    updateFile = () => null
    deleteFile =({fileId}) => this.props.deleteFileInAction({fileId})
    onUrgentClick= ({actionId}) => this.props.handleToggleActionUrgency({actionId})
    render() {
        const data = this.props.data
        const { value } = this.state
        return (
            <React.Fragment>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <IconButton aria-label="Close" onClick={() => this.props.deselectActionInProject()}>
                            <ChevronIcon/>
                        </IconButton>
                        <div style={{flexGrow: 1}} />
                        <Tooltip title={data.isUrgent?"Clear urgent":"Mark as urgent"}>
                            <IconButton aria-label="Hot" disabled={!data.title} color={data.isUrgent?"secondary":"default"} onClick={()=>this.onUrgentClick({actionId: this.props.actionId})}>
                                <HotIcon />
                            </IconButton>
                        </Tooltip>
                        <SelectActionStatus 
                            isDue={moment().isAfter(data.dueDate)} 
                            isUrgent={data.isUrgent} 
                            isStarted={data.isStarted} 
                            isDone={data.countTasks>0&&data.countTasks===data.countTasksCompleted}
                            handleChange={({status})=>this.updateInfo({status})} 
                            value={data.status||"TODO"}
                            />
                        <Tooltip title={"Delete Obligation"}>
                            <IconButton aria-label="Delete" disabled color="primary" style={{color: false&&"red"}} onClick={(e) => {e.preventDefault(); this.props.handleDelete(this.props.actionId)}} >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </Toolbar>
                </AppBar>
                {/*<LinearProgress color="primary" variant="query" />*/}
                <div style={{height: "84%", overflow:"scroll", marginBottom: 120}}>
                    {value === 0 && <SidePanelInfoTab
                                key="info-tab"
                                data={data}
                                updateInfo={this.updateInfo}
                                deleteAction={this.deleteAction}
                            />}
                    {value === 1 && <TasksView 
                                key="tasks-tab"
                                data={data}
                                hasFetched={data.hasFetchedTasks}
                                updateTask={this.updateTask}
                                addTask={this.addTask}
                                deleteTask={this.deleteTask}
                            />}
                    {value === 2 && <SidePanelNotesTab 
                                key="notes-tab"
                                data={data}
                                hasFetched={data.hasFetchedNotes}
                                updateNote={this.updateNote}
                                addNote={this.addNote}
                                deleteNote={this.deleteNote}
                            />}
                    {value === 3 && <SidePanelFilesTab
                                key="files-tab"
                                data={data}
                                hasFetched={data.hasFetchedFiles}
                                updateFile={this.updateFile}
                                addFile={this.addFile}
                                deleteFile={this.deleteFile}
                            />}
                </div>
                <Paper elevation={10} style={{borderRadius: 0, position: "absolute", bottom: 0, right: 0, width: "100%"}}>
                    <BottomNavigation value={value} onChange={this.handleTabChange} style={{}}>
                        <BottomNavigationAction label="INFO" value={0} icon={<InfoIcon />} />
                        <BottomNavigationAction label="TASKS" value={1} icon={<DoneAllIcon />} />
                        <BottomNavigationAction label="NOTES" value={2} icon={<NotesIcon />} />
                        <BottomNavigationAction label="FILES" value={3} icon={<FolderIcon />} />
                    </BottomNavigation>
                </Paper>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    const projectId = state.actionManager.selectedProject.projectId
    const actionId = state.actionManager.selectedProject.actionId
    return {
        actionId,
        projectId,
        updateProjectIsOpen: state.actionManager.dialogs.updateProject.isOpen,
        data: projectId&&actionId&&state.actionManager.projects[projectId].actions[actionId]
    }
}

export default connect(mapStateToProps, {...reduxActions})(SidePanelView)