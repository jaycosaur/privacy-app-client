import React from 'react'
import { Card, Avatar, Icon, Button, Input, Divider } from 'antd'
import { themeColors, highlightThemeShades, primaryThemeShades } from './../theme'

class HandleHover extends React.Component {
    state = {
        isHovered: false
    }
    toggleState = (state) => {
        this.setState(()=>({isHovered: state}))
    }
    render() {
        return (
            <div onMouseEnter={()=>this.toggleState(true)} onMouseLeave={()=>this.toggleState(false)}>
                {this.props.render(this.state.isHovered)}
            </div>
        )
    }
}

const UserAvatars = (props) => (
    <HandleHover render={
        (isHovered)=>(
            <div style={{margin: "0 8px"}}>
                <Avatar src="https://mdbootstrap.com/img/Photos/Avatars/img%20(9).jpg" icon="user" size="large" style={{marginLeft: 0}}/>
                <Avatar src="https://mdbootstrap.com/img/Photos/Avatars/img%20(4).jpg" icon="user" size="large" style={{marginLeft: isHovered?-1:-12}}/>
                <Avatar src="https://mdbootstrap.com/img/Photos/Avatars/img%20(20).jpg" icon="user" size="large" style={{marginLeft: isHovered?-1:-12}}/>
                <Avatar src="https://mdbootstrap.com/img/Photos/Avatars/img%20(2).jpg" icon="user" size="large" style={{marginLeft: isHovered?-1:-12}}/>
                {isHovered&&<Avatar icon="user-add" style={{marginLeft: isHovered?-1:-12}}/>}
            </div>
        )
    }/>) 

const InputItem = (props) => (
    <HandleHover render={
        (isHovered)=>(
            !isHovered?<span style={{fontSize: "1.1em", paddingLeft: 12}}>Basic usage</span>:<Input placeholder="Enter some content here..." size="large" style={{width: "100%"}}/>
        )
    }/>) 

const ButtonItem = (props) => (
    <Button style={{margin: "0 8px"}} size="large">
        {props.children}
    </Button>
)

class TaskItem extends React.Component {
    state = {
        showChildren: true
    }
    toggleChildren =() => {
        this.setState((state)=>({showChildren: !state.showChildren}))
    }
    render() {
        return (
            <div style={{marginTop: this.props.child?8:32}}>
                <HandleHover render={
                    (isHovered)=>(
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%"}}>
                            {this.props.child&&<Button type={isHovered&&"primary"} shape="circle" icon="ellipsis" style={{marginRight: 20, marginLeft: 4}}/>}
                            <Card style={{flexGrow: 1, borderRadius: 10, background: isHovered&&primaryThemeShades[1]}} bodyStyle={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", padding: "8px 16px", opacity: 0.8}}>
                                <div onClick={this.toggleChildren} style={{background: isHovered?(this.props.children?highlightThemeShades[1]:"white"):(this.props.children?themeColors[1]:themeColors[0]), width: 8, height: 40, borderRadius: 4, marginRight:20}} />
                                <div style={{width: 400}}><InputItem/></div>
                                <div style={{width: 300}}><InputItem/></div>
                                <div style={{flexGrow: 1}}>
                                    
                                </div>
                                <ButtonItem>PRIORITY</ButtonItem>
                                <ButtonItem>STATUS</ButtonItem>
                                <UserAvatars />
                                <HandleHover render={
                                    (hovered)=>(
                                        !hovered?<div style={{background: isHovered?"red":null, width: 8, height: 40, borderRadius: 4, marginRight: -8}} />:<Button onClick={()=>this.props.handleDelete(this.props.id)} type="danger" size="large" icon="delete" shape="square"/>
                                    )
                                }/>
                            
                            </Card>
                        </div>
                    )
                }/>
            <div style={{marginLeft: this.props.child&&60}}>
                <HandleHover render={
                    (isHovered)=>(
                        <div onClick={()=>this.props.handleAdd(this.props.id)} style={{minHeight: 8, marginBottom: -8, background: isHovered&&themeColors[1], opacity: 0.5, marginLeft: 8, marginRight: 8}} />
                    )
                }/>
                {this.state.showChildren&&this.props.children}
            </div>
        </div>
        )
    }
}

const DATA = [
    {
        id: 0,
        parent: null
    },
    {
        id: 1,
        parent: 0
    },
    {
        id: 2,
        parent: 0
    },
    {
        id: 3,
        parent: 0
    },
    {
        id: 4,
        parent: 3
    },
    {
        id: 5,
        parent: 3
    },
    {
        id: 6,
        parent: 3
    },
    {
        id: 7,
        parent: 6
    },
    {
        id: 8,
        parent: 6
    },
    {
        id: 9,
        parent: 0
    },
    {
        id: 10,
        parent: null
    },
    {
        id: 11,
        parent: 10
    },
    {
        id: 12,
        parent: 10
    },
]

const findChildren = (id) => DATA.filter(i=>i.parent===id)

const getTaskItemChildren = (id,input, handleAdd,handleDelete) => 
    input.filter(i=>i.parent===id).length>0&&input.filter(i=>i.parent===id).map(task=>(
        <TaskItem key={task.id} id={task.id} handleAdd={handleAdd} handleDelete={handleDelete} child>
            {getTaskItemChildren(task.id,input, handleAdd,handleDelete)}
        </TaskItem>)
)

const computeTaskTree = (input, handleAdd,handleDelete) => (
    input.filter(i=>i.parent===null).map(task=>(
    <TaskItem key={task.id} id={task.id} handleAdd={handleAdd} handleDelete={handleDelete}>
        {getTaskItemChildren(task.id,input, handleAdd,handleDelete)}
    </TaskItem>
    ))
)

export default class ProjectTaskList extends React.Component {
    state = {
        items: DATA
    }

    handleAdd = (id) => {
        const val = Math.max(this.state.items.map(i=>i.id))+1
        this.setState((state)=>({
            items: [...state.items,{id:val, parent: id}]
        }))
    }

    handleDelete = (id) => {
        this.setState((state)=>({
            items: state.items.filter(i=>i.id!==id)
        }))
    }

    render() {
        return (
            <div style={{minHeight: "100vh", background: "white"}}>
                <div style={{padding: "32px 32px 0px", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <div style={{flexGrow: 3}}>
                        <h1 style={{fontSize: "3em", fontWeight: 300, marginBottom: 8}}>Campaigns Management</h1>
                        <p style={{fontSize: "1.2em"}}>Some project description goes here.</p>
                    </div>
                    <Card style={{flexGrow: 1, borderRadius: 20,}} bodyStyle={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0"}}>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}><Button size="large" style={{margin: "0 4px"}} icon="layout" /><Button size="large" style={{margin: "0 4px"}} icon="database" /><Button size="large" style={{margin: "0 4px"}} icon="table" /><Button size="large" style={{margin: "0 4px"}} icon="profile" /></div>
                        <div style={{width: 1, height: "50px", background: "#000", opacity: 0.15}}/>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}><Avatar icon="team" size="large"/> <UserAvatars /></div>
                    </Card>
                </div>
                <div style={{padding: 32, paddingTop: 0}}>
                    {computeTaskTree(this.state.items, this.handleAdd, this.handleDelete)}
                </div>
            </div>  
        )
    }
}
