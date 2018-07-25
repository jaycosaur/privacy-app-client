import React from 'react'
import { Card, Avatar, Icon, Button, Input, List, Progress, DatePicker, Tabs } from 'antd'
import { themeColors, highlightThemeShades, primaryThemeShades } from './../theme'
import moment from 'moment';
import AuthViewRouteContainer from './AuthViewRouteContainer'
import MainViewTopActionBarContainer from './../containers/MainViewTopActionBarContainer'
import Typography from '@material-ui/core/Typography';

import ButtonMD from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';


import { connect } from 'react-redux'
import * as projectActions from './../store/actions/actionManagerActions'

class HandleHover extends React.Component {
    state = {
        isHovered: false
    }
    toggleState = (state) => {
        this.setState(() => ({ isHovered: state }))
    }
    render() {
        return (
            <div onMouseEnter={() => this.toggleState(true)} onMouseLeave={() => this.toggleState(false)}>
                {this.props.render(this.state.isHovered)}
            </div>
        )
    }
}

const avatarImgs = [
    "https://mdbootstrap.com/img/Photos/Avatars/img%20(1).jpg",
    "https://mdbootstrap.com/img/Photos/Avatars/img%20(2).jpg",
    "https://mdbootstrap.com/img/Photos/Avatars/img%20(3).jpg",
    "https://mdbootstrap.com/img/Photos/Avatars/img%20(4).jpg",
    "https://mdbootstrap.com/img/Photos/Avatars/img%20(5).jpg",
    "https://mdbootstrap.com/img/Photos/Avatars/img%20(6).jpg",
    "https://mdbootstrap.com/img/Photos/Avatars/img%20(7).jpg",
    "https://mdbootstrap.com/img/Photos/Avatars/img%20(8).jpg",
    "https://mdbootstrap.com/img/Photos/Avatars/img%20(9).jpg",
    "https://mdbootstrap.com/img/Photos/Avatars/img%20(10).jpg",
    "https://mdbootstrap.com/img/Photos/Avatars/img%20(11).jpg",
    "https://mdbootstrap.com/img/Photos/Avatars/img%20(12).jpg",
    "https://mdbootstrap.com/img/Photos/Avatars/img%20(13).jpg",
    "https://mdbootstrap.com/img/Photos/Avatars/img%20(14).jpg",
    "https://mdbootstrap.com/img/Photos/Avatars/img%20(15).jpg",
    "https://mdbootstrap.com/img/Photos/Avatars/img%20(16).jpg",
    "https://mdbootstrap.com/img/Photos/Avatars/img%20(17).jpg",
    "https://mdbootstrap.com/img/Photos/Avatars/img%20(18).jpg",
    "https://mdbootstrap.com/img/Photos/Avatars/img%20(19).jpg",
    "https://mdbootstrap.com/img/Photos/Avatars/img%20(20).jpg",
]

const UserAvatars = (props) => (
    <HandleHover render={
        (isHovered) => (
            <div style={{ margin: "0 8px", height: 40, overflowX: "scoll" }}>
                <Avatar src={avatarImgs[Math.round(Math.random() * 19)]} icon="user" size="large" style={{ marginLeft: 0 }} />
                <Avatar src={avatarImgs[Math.round(Math.random() * 19)]} icon="user" size="large" style={{ marginLeft: isHovered ? -1 : -12 }} />
                <Avatar src={avatarImgs[Math.round(Math.random() * 19)]} icon="user" size="large" style={{ marginLeft: isHovered ? -1 : -12 }} />
                <Avatar src={avatarImgs[Math.round(Math.random() * 19)]} icon="user" size="large" style={{ marginLeft: isHovered ? -1 : -12 }} />
                <Avatar size="large" style={{ marginLeft: isHovered ? -1 : -12 }}>+{Math.round(Math.random() * 5 + 1)}</Avatar>
                {isHovered && <Avatar icon="user-add" style={{ marginLeft: isHovered ? -1 : -12 }} />}
            </div>
        )
    } />)

const InputItem = (props) => (
    <HandleHover render={
        (isHovered) => (
            !isHovered ? <span style={{ fontSize: "1.1em", paddingLeft: 12 }}>{props.text || "Basic usage"}</span> : <Input placeholder="Enter some content here..." size="large" style={{ width: "100%" }} />
        )
    } />)

const ButtonItem = (props) => (
    <Button ghost={props.ghost} style={{ margin: "0 8px", ...props.style }} size="large" type={props.type} shape={props.shape}>
        {props.children}
    </Button>
)

class TaskItem extends React.Component {
    state = {
        showChildren: true
    }
    toggleChildren = (e) => {
        e.preventDefault()
        this.setState((state) => ({ showChildren: !state.showChildren }))
    }
    render() {
        return (
            <div style={{ marginTop: this.props.child ? 8 : 32 }}>
                <HandleHover render={
                    (isHovered) => (
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                            {this.props.child && <Button type={isHovered?"primary":"default"} shape="circle" icon="ellipsis" style={{ marginRight: 20, marginLeft: 4 }} />}
                            <Card onClick={() => this.props.handleClick(this.props.id)} style={{ flexGrow: 1, borderRadius: 10, background: isHovered && primaryThemeShades[1] }} bodyStyle={{ height: 56, display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", padding: "8px 16px", overflowX: "scroll" }}>
                                <div onClick={this.toggleChildren} style={{ background: isHovered ? (this.props.children ? highlightThemeShades[1] : "white") : (this.props.children ? themeColors[1] : themeColors[0]), width: 8, height: 40, borderRadius: 4, marginRight: 20 }} />
                                <div style={{ width: 200 }}><InputItem /></div>
                                <div style={{ flexGrow: 1 }}>

                                </div>
                                <DatePicker style={{ width: 140 }} size="large" defaultValue={moment('2015/01/01')} />
                                <ButtonItem style={{ borderRadius: 50 }}><Avatar src="https://mdbootstrap.com/img/Photos/Avatars/img%20(12).jpg" size="small" icon="user" /> J. Thompson </ButtonItem>
                                <div style={{ width: 120 }}><Progress strokeWidth={20} percent={Math.round(Math.random() * 100)} size="small" /></div>
                                <HandleHover render={
                                    (isHovered) => (
                                        !isHovered ? <ButtonItem type="dashed" style={{ borderRadius: 50 }} shape="circle"><Icon type="clock-circle-o" /></ButtonItem> : <ButtonItem style={{ borderRadius: 50 }}>Mark as urgent</ButtonItem>
                                    )
                                } />

                                <UserAvatars />
                                <HandleHover render={
                                    (hovered) => (
                                        !hovered ? <div style={{ background: isHovered ? "red" : null, width: 8, height: 40, borderRadius: 4, marginRight: -8 }} /> : <Button onClick={(e) => {e.preventDefault(); this.props.handleDelete(this.props.id)}} type="danger" size="large" icon="delete" shape="square" />
                                    )
                                } />

                            </Card>
                        </div>
                    )
                } />
                <div style={{ marginLeft: this.props.child && 60 }}>
                    <HandleHover render={
                        (isHovered) => (
                            <div onClick={() => this.props.handleAdd(this.props.id)} style={{ minHeight: 8, marginBottom: -8, background: isHovered && themeColors[1], opacity: 0.5, marginLeft: 8, marginRight: 8 }} />
                        )
                    } />
                    {this.state.showChildren && this.props.children}
                </div>
            </div>
        )
    }
}

const computeProjectActionTree = (input, handleAdd, handleDelete, handleClick) => (
    input.filter(i => i.parentActionId === null).map(task => (
        <TaskItem key={task.actionId} id={task.actionId} handleAdd={handleAdd} handleDelete={handleDelete} handleClick={handleClick}>
            {getProjectActionChildren(task.actionId, input, handleAdd, handleDelete, handleClick)}
        </TaskItem>
    ))
)

const getProjectActionChildren = (id, input, handleAdd, handleDelete, handleClick) =>
    input.filter(i => i.parentActionId === id).length > 0 && input.filter(i => i.parentActionId === id).map(task => (
        <TaskItem key={task.actionId} id={task.actionId} handleAdd={handleAdd} handleDelete={handleDelete} handleClick={handleClick} child>
            {getProjectActionChildren(task.actionId, input, handleAdd, handleDelete, handleClick)}
        </TaskItem>)
    )

class SidePanelView extends React.Component {
    state = {
        tasks: []
    }

    addTaskToState = () => {
        const defaultTaskState = {
            description: null,
            isDone: false,
            created: Date.now(),
            assignedTo: null
        }
        this.setState((state) => ({ tasks: [...state.tasks, defaultTaskState] }))
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

    render() {
        const InfoItem = (props) => (
            <div style={{ textAlign: "center", width: 100, height: 100, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <h1 style={{ margin: 0 }}>{props.number}</h1>
                <p style={{ margin: 0, color: "rgba(0, 0, 0, 0.65)" }}>{props.text}</p>
            </div>
        )
        return (
            <div style={{ padding: "0px 16px 32px" }}>
                <Tabs defaultActiveKey="3" size="small" tabBarGutter={12}>
                    <Tabs.TabPane tab={<span><Icon type="info" />Info</span>} key="1">
                        Tab 1
                </Tabs.TabPane>
                    <Tabs.TabPane tab={<span><Icon type="bars" />Tasks</span>} key="2">
                        <h1 style={{ textAlign: "center", marginTop: 16 }}>Your Tasks</h1>
                        <div style={{ width: "100%", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                            <InfoItem number={this.state.tasks.length} text={"Tasks"} />
                            <Progress width={80} type="dashboard" percent={Math.round(this.state.tasks.filter(i => i.isDone).length * 100 / this.state.tasks.length)} size="small" />
                            <InfoItem number={this.state.tasks.filter(i => i.isDone).length} text={"Done"} />
                        </div>
                        {this.state.tasks.length > 0 && <List
                            dataSource={this.state.tasks}
                            renderItem={(task, id) => (
                                <List.Item style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <div style={{ flexGrow: 1 }}>
                                        <TaskInput placeholder="Describe your task" isDone={task.isDone} value={task.description} handleChangeTitle={this.handleChangeTitle} id={id} />
                                    </div>
                                    <Avatar icon="check-circle-o" style={{ marginLeft: 16, background: task.isDone ? "#52c41a" : "#ccc" }} onClick={() => this.handleMarkAsComplete(id)} />
                                </List.Item>
                            )}
                        />}
                        <div style={{ textAlign: "center", marginTop: 16 }}><a onClick={this.addTaskToState}>Add new task</a></div>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={<span><Icon type="book" />Notes</span>} key="3">
                        <NotesTab />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={<span><Icon type="folder" />Files</span>} key="4">
                        Tab 2
                </Tabs.TabPane>
                </Tabs>
            </div>
        )
    }
}

class NotesTab extends React.Component {
    state = {
        sections: []
    }

    renderSection = ({ header, body }, number) => {
        return (
            <HandleHover render={(isHovered) => (
                <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "stretch", marginBottom: 12 }}>
                    <div style={{ width: 4, background: isHovered ? primaryThemeShades[1] : "#ccc", margin: "4px 0", marginRight: 30, marginLeft: 5, alignSelf: "stretch", borderRadius: 2 }} />
                    <div style={{ flex: 1 }}>
                        <div style={{ borderBottom: "1px solid #ccc", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <SectionHeaderInput value={header} placeholder={"Untitled Section"} handleChange={(e, _) => this.handleSectionChange(e, 'header', number)} />
                            <HandleHover render={(isHovered) => (<div>
                                {!isHovered && <Button shape="circle" type="dashed" size="small" icon="ellipsis" style={{ color: isHovered && themeColors[0] }} />}
                                {isHovered && (this.state.sections.length > 1) && (number !== 0) && <Button onClick={() => this.moveSectionUp(number)} shape="circle" type="dashed" size="small" icon="arrow-up" style={{ color: isHovered && themeColors[0], marginRight: 4 }} />}
                                {isHovered && (this.state.sections.length > 1) && (number !== this.state.sections.length - 1) && <Button onClick={() => this.moveSectionDown(number)} shape="circle" type="dashed" size="small" icon="arrow-down" style={{ color: isHovered && themeColors[0], marginRight: 4 }} />}
                                {isHovered && <Button onClick={() => this.removeSection(number)} shape="circle" type="dashed" size="small" icon="delete" style={{ color: isHovered && themeColors[0] }} />}
                            </div>)} />
                        </div>
                        <div style={{ padding: "8px 0px" }}>
                            <SectionBodyInput value={body} placeholder={"Your content goes here..."} handleChange={(e, _) => this.handleSectionChange(e, 'body', number)} />
                            {/*<Input.TextArea autosize autoFocus suffix={<Icon type="edit"/>} />*/}
                        </div>
                    </div>
                </div>)} />)
    }

    addNewSection = () => {
        const defaultSection = {
            header: null,
            body: null
        }
        this.setState((state) => ({
            sections: [...state.sections, { ...defaultSection }]
        }))
    }

    removeSection = (id) => {
        this.setState((state) => ({
            sections: [
                ...state.sections.slice(0, id),
                ...state.sections.slice(id + 1)
            ]
        }))
    }

    moveSectionUp = (id) => {
        if (id !== 0) {
            this.setState((state) => ({
                sections: [
                    ...state.sections.slice(0, id - 1),
                    state.sections[id],
                    state.sections[id - 1],
                    ...state.sections.slice(id + 1)
                ]
            }))
        }
    }

    moveSectionDown = (id) => {
        if (id !== this.state.sections.length - 1) {
            this.setState((state) => ({
                sections: [
                    ...state.sections.slice(0, id),
                    state.sections[id + 1],
                    state.sections[id],
                    ...state.sections.slice(id + 2)
                ]
            }))
        }
    }

    handleSectionChange = (payload, type, id) => {
        this.setState((state) => {
            state.sections[id][type] = payload
            return ({ sections: [...state.sections] })
        }
        )
    }
    //this.props.handleChange
    render() {
        return (
            <div>
                {this.state.sections.map((section, number) => this.renderSection(section, number))}
                <HandleHover render={
                    (isHovered) => (
                        !isHovered ? <div><Icon type="plus-circle-o" /></div> : (
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} onClick={this.addNewSection}>
                                <Icon type="plus-circle" style={{ marginRight: 8 }} />
                                <div style={{ flex: 1, borderBottom: "1px solid #000" }}>
                                    Add new section ...
                                </div>
                            </div>)
                    )
                } />
            </div>
        )
    }
}

class SectionBodyInput extends React.Component {
    state = {
        isFocused: false,
        isSelected: false
    }
    toggleSelect = () => {
        this.setState((state) => ({
            isSelected: !state.isSelected
        }))
    }

    toggleFocus = () => {
        this.setState((state) => ({
            isFocused: !state.isFocused
        }))
    }

    handleEnter = (e) => {
        if (e.key === 'Enter') {
            this.toggleSelect()
        }
    }

    render() {
        return (
            <div>
                {!this.state.isSelected ?
                    <HandleHover render={(isHovered) => (
                        <p onClick={this.toggleSelect} style={{ width: "100%", margin: 0, padding: "5px 11px", color: isHovered && "#1890ff" }}>{this.props.value || this.props.placeholder}{isHovered && <Icon style={{ marginLeft: 4 }} type="edit" />}</p>
                    )} />
                    : <Input.TextArea autosize autoFocus suffix={<Icon type="edit" />} onKeyPress={this.handleEnter} onFocus={this.toggleFocus} onBlur={this.toggleSelect} placeholder={this.props.placeholder} value={this.props.value} onChange={e => this.props.handleChange(e.target.value, this.props.id)} />}
            </div>
        )
    }
}

class SectionHeaderInput extends React.Component {
    state = {
        isFocused: false,
        isSelected: false
    }
    toggleSelect = () => {
        this.setState((state) => ({
            isSelected: !state.isSelected
        }))
    }

    toggleFocus = () => {
        this.setState((state) => ({
            isFocused: !state.isFocused
        }))
    }

    handleEnter = (e) => {
        if (e.key === 'Enter') {
            this.toggleSelect()
        }
    }

    render() {
        return (
            <div>
                {!this.state.isSelected ?
                    <HandleHover render={(isHovered) => (
                        <h2 onClick={this.toggleSelect} style={{ width: "100%", color: isHovered && "#1890ff" }}>{this.props.value || this.props.placeholder}</h2>
                    )} />
                    : <Input.TextArea autosize autoFocus suffix={<Icon type="edit" />} onKeyPress={this.handleEnter} onFocus={this.toggleFocus} onBlur={this.toggleSelect} placeholder={this.props.placeholder} value={this.props.value} onChange={e => this.props.handleChange(e.target.value, this.props.id)} />}
            </div>
        )
    }
}

class TaskInput extends React.Component {
    state = {
        isFocused: false,
        isSelected: false
    }
    toggleSelect = (e) => {
        e.preventDefault()
        this.setState((state) => ({
            isSelected: !state.isSelected
        }))
    }

    toggleFocus = (e) => {
        e.preventDefault()
        this.setState((state) => ({
            isFocused: !state.isFocused
        }))
    }

    handleEnter = (e) => {
        if (e.key === 'Enter') {
            this.toggleSelect()
        }
    }

    render() {
        return (
            <div>
                {!this.state.isSelected ? <HandleHover render={(isHovered) => (
                    <p onClick={this.toggleSelect} style={{ margin: 0, padding: "5px 11px", color: isHovered && "#1890ff", textDecoration: this.props.isDone && "line-through" }}>{this.props.value || this.props.placeholder}{isHovered && <Icon style={{ marginLeft: 4 }} type="edit" />}</p>
                )} />
                    : <Input 
                        autoFocus 
                        suffix={<Icon type="edit" />} 
                        onKeyPress={this.handleEnter} 
                        onFocus={this.toggleFocus} 
                        onBlur={this.toggleSelect} 
                        placeholder={this.props.placeholder} 
                        value={this.props.value} 
                        onChange={e => this.props.handleChangeTitle(e, this.props.id)} />}
            </div>
        )
    }
}

class ProjectTaskList extends React.Component {
    state = {
        selectedItemId: null
    }

    handleAdd = (id=null) => {
        this.props.createActionInProject({parentActionId: id, form:{title: null}})
    }

    handleDelete = (actionId) => {
        this.props.deleteActionInProject({actionId})
    }

    handleClick = (id) => {
        this.setState({ selectedItemId: id })
    }

    deselectItem = () => {
        this.setState({ selectedItemId: null })
    }

    componentDidMount(){
        const { match: { params }, location: { search }, project } = this.props
        this.props.getProjectInManager({ projectId: params.id })
        this.props.selectProjectInManager({ projectId: params.id })
        if(project){
            this.props.getActionsInProject()
        }
    }

    render() {
        const actions = [
            <Button.Group>
                <Button size="large" icon="layout" />
                <Button size="large" icon="database" />
                <Button size="large" icon="table" />
                <Button size="large" icon="profile" />
            </Button.Group>,
            <ButtonMD 
                variant="fab" 
                color="secondary" 
                aria-label="Add" 
                mini
                onClick={()=>this.props.createActionInProject({form:{title: "Test!"}})}
                >
                <AddIcon />
            </ButtonMD>
        ]

        const { projectRefId, project } = this.props
        const projectActions = project&&project.actions&&Object.keys(project.actions).map(key=>project.actions[key])
        const hasLoadedActions = project&&project.hasLoadedActions
        const hasProjectActions = projectActions&&projectActions.length>0

        const TopBar = (attr) => <MainViewTopActionBarContainer color="primary" actions={actions}>
            <div style={{ marginRight: 32 }}>
                
            </div>
            <Typography style={{color: "white", flex: 1}} variant="title">{project&&project.title}</Typography>
            </MainViewTopActionBarContainer>

        return (
            project?<AuthViewRouteContainer topbar={<TopBar attr={project}/>}>
                <div>
                    {this.state.selectedItemId !== null ? <div style={{ position: "absolute", right: 0, top: 0, height: "92vh", width: "30vw", background: "white", zIndex: 100, opacity: 0.98, boxShadow: "-2px 0 1px -1px #aaa" }}>
                        <div style={{ zIndex: 100, width: "100%", background: themeColors[0], display: "flex", justifyContent: "space-between", alignItems: "center", padding: 16, position: "absolute", top: 0, left: 0, boxShadow: "0 4px 1px -1px #ddd" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", }}>
                                <Button onClick={this.deselectItem} icon="cross" shape="circle" />
                                <h3 style={{ color: "white", fontWeight: 300, margin: 0, marginLeft: 8 }}>Some project item!</h3>
                            </div>
                            <div>
                                <Button shape="circle" ghost icon="setting" />
                            </div>
                        </div>
                        <div style={{ paddingTop: 64, overflow: "scroll", height: "92vh" }}>
                            <SidePanelView />
                        </div>

                    </div> : null}
                    <div style={{}}>
                        <div style={{ padding: 32, paddingTop: 0 }}>
                            {hasProjectActions&&computeProjectActionTree(projectActions, this.handleAdd, this.handleDelete, this.handleClick)}

                            {hasLoadedActions?<Card><Button onClick={()=>this.handleAdd()}>Click here to add {hasProjectActions?"another":"your first"} action!</Button></Card>:"Loading Actions!"}
                        </div>
                    </div>
                </div>
            </AuthViewRouteContainer>:null
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        projectRefId: state.actionManager.selectedProject.projectId,
        project: state.actionManager.selectedProject&&state.actionManager.projects[state.actionManager.selectedProject.projectId]
    }
}

export default connect(mapStateToProps, projectActions)(ProjectTaskList)