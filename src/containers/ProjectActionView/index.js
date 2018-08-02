import React from 'react'
import AuthViewRouteContainer from './../../views/AuthViewRouteContainer'
import MainViewTopActionBarContainer from './../MainViewTopActionBarContainer'
import Typography from '@material-ui/core/Typography';

import ButtonMD from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DoneAllIcon from '@material-ui/icons/DoneAll';

import { connect } from 'react-redux'
import SidePanelView from './containers/SidePanelView'
import TaskItem, { ListLoader } from './containers/ActionsListView'

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from 'react-router-dom'

import LinearProgress from '@material-ui/core/LinearProgress';

import * as reduxActions from './../../store/actions/actionManagerActions'

import { Field, reduxForm } from 'redux-form';

const validate = values => {
    const errors = {}
    if (!values.title) {
        errors.title = 'Required'
    } else if (values.title.length === 0) {
        errors.title = 'Required'
    }
    if (!values.description) {
        errors.description = 'Required'
    } else if (values.description.length === 0) {
        errors.description = 'Required'
    }
    return errors
  }
  
const renderTextField = ({ input: { value, onChange }, label, meta: { touched, error }, ...custom }) => (
    <TextField 
        label={label}
        errorText={touched && error}
        value={value}
        onChange={onChange}
        fullWidth
        margin="dense"
        error={error}
    />
)
  
const MaterialUiForm = props => {
    const { handleSubmit, pristine, reset, submitting, submitSucceeded } = props
    return (
        <form onSubmit={handleSubmit}>
        <DialogTitle id="form-dialog-title">Edit Project</DialogTitle>
        <DialogContent>
            <Field name="title" component={renderTextField} label="Project title"/>
            <Field name="description" component={renderTextField} label="Project description"/>
        </DialogContent>
        <DialogActions>
            <Link to="/action-manager">
                <ButtonMD variant="outlined" onClick={()=>props.handleDelete()} color="secondary">
                    Delete Project
                </ButtonMD>
            </Link>
            <ButtonMD onClick={()=>props.closeUpdateProjectsInManagerDialogue()} color="primary">
                Cancel
            </ButtonMD>
            <ButtonMD type="submit" color="primary" disabled={pristine || submitting}>
                Update
            </ButtonMD>
        </DialogActions>
        </form>
    )
}

const WrappedForm = reduxForm({form: 'updateProjectForm', validate})(MaterialUiForm)

const EmptyPlaceholder = (props) => (
    <div style={{height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
        <img src="https://exemetrics.com/img/rocket-inner.png" width="600px" />
        <Typography style={{margin: "32px 0 64px", color: "#9e9e9e"}} variant="headline">To get started and add a new action, click on the + button</Typography>
        {props.children}
    </div>
)

class ProjectTaskList extends React.PureComponent {
    handleAdd = (id=null) => {
        this.props.createActionInProject({parentActionId: id, form:{title: null}})
    }

    handleDelete = (actionId) => {
        this.props.deleteActionInProject({actionId})
    }

    handleUpdate = (vals) => {
        this.props.updateActionInProject(vals)
    }

    handleClick = (id) => {
        this.props.selectActionInProject({actionId: id})
    }

    deselectItem = () => {
        this.props.deselectActionInProject()
    }

    componentDidUpdate(prevProps){
        const { match: { params } } = this.props

        if(!prevProps.isLoggedIn&&this.props.isLoggedIn) {
            this.props.selectProjectInManager({ projectId: params.id })
        }

        if(!prevProps.projectRefId&&this.props.projectRefId) {
            this.props.getProjectInManager({ projectId: params.id })
        }

        if(!prevProps.project&&this.props.project) {
            this.props.getActionsInProject()
        }
    }

    componentWillMount(){
        if(this.props.project) {
            this.props.getActionsInProject()
        }
    }

    render() {
        const { projectRefId, project, actionRefId } = this.props
        const showActionInt = false
        const getProjectActionTree = (input, handleAdd, handleDelete, handleUpdate, handleClick, parentId=null, parentRef=null, child=false) => (
            input.filter(i => i.parentActionId === parentId).length > 0 && input.filter(i => i.parentActionId === parentId).map((task,num) => (
                <TaskItem 
                    key={task.actionId} 
                    actionData={task} 
                    id={task.actionId} 
                    handleAdd={handleAdd} 
                    handleDelete={handleDelete} 
                    handleClick={handleClick}
                    handleUpdate={(val)=>handleUpdate({toUpdate: val, actionId: task.actionId})}
                    onUrgentClick={this.props.handleToggleActionUrgency}
                    onDueDateChange={(e)=>console.log('date changed',e)}
                    isSelected={actionRefId===task.id}
                    child={child}
                    >{getProjectActionTree(input, handleAdd, handleDelete, handleUpdate, handleClick,task.actionId,(parentRef?`${parentRef}.${num+1}`:num+1),true)}
                </TaskItem>
            ))
        )
        //{showActionInt&&(parentRef?`${parentRef}.${num+1}`:num+1)}
        
        const actions = [
            <ButtonMD 
                variant="fab" 
                color="secondary" 
                aria-label="Add" 
                mini
                onClick={()=>this.props.openUpdateProjectsInManagerDialogue()}
                >
                <EditIcon />
            </ButtonMD>,
            <ButtonMD 
                variant="fab" 
                color="secondary" 
                aria-label="Add" 
                mini
                onClick={()=>this.props.createActionInProject({form:{title: null}})}
                style={{marginLeft: 8}}
                >
                <AddIcon />
            </ButtonMD>,
            <Dialog
                open={this.props.updateProjectIsOpen}
                onClose={()=>this.props.closeUpdateProjectsInManagerDialogue()}
                aria-labelledby="form-dialog-title"
                >
                <WrappedForm 
                    handleDelete={()=>this.props.deleteProjectInManager({projectId: projectRefId})} 
                    onSubmit={this.props.updateProjectInManager} 
                    {...this.props} 
                    initialValues={{title: this.props.project&&this.props.project.title, description: this.props.project&&this.props.project.description}}/>
            </Dialog>
        ]

        const loadingActions = [
            <div style={{height: 40, width: 40, borderRadius: 50, background: "#ddd", marginLeft: 8, opacity: 0.6}} />,
            <div style={{height: 40, width: 40, borderRadius: 50, background: "#ddd", marginLeft: 8, opacity: 0.6}} />
        ]

        const projectActions = project&&project.actions&&Object.keys(project.actions).map(key=>project.actions[key])
        const hasLoadedActions = this.props.hasLoadedActions
        const hasProjectActions = projectActions&&projectActions.length>0

        const TopBar = (attr) => <MainViewTopActionBarContainer color="primary" actions={actions}>
            <DoneAllIcon style={{color: "white", marginRight: 16}}/>
            <Typography style={{color: "white", fontWeight: 300}} variant="headline">{project&&project.title}</Typography>
            <Typography style={{color: "white", flex: 1, fontWeight: 300, marginLeft: 32, marginTop: 4}} variant="subheading">{project&&project.description}</Typography>
            </MainViewTopActionBarContainer>

        const LoadingTopBar = () => <MainViewTopActionBarContainer color="primary" actions={loadingActions}>
                <div style={{height: 24, width: 24, borderRadius: 50, background: "#ddd", marginRight: 16, opacity: 0.6}} />
                <div style={{height: 32, width: 300, borderRadius: 50, background: "#ddd", opacity: 0.6}} />
                <div style={{height: 24, width: 400, borderRadius: 50, marginLeft: 32, background: "#ddd", opacity: 0.6}} />
                <div style={{ flex: 1}} />
                </MainViewTopActionBarContainer>

        const LoadingDisplay = () => (
            <div>
                <ListLoader>
                    <ListLoader child/>
                    <ListLoader child>
                        <ListLoader child/>
                        <ListLoader child/>
                    </ListLoader>
                    <ListLoader child/>
                    <ListLoader child/>
                </ListLoader>
                <ListLoader>
                    <ListLoader child/>
                    <ListLoader child/>
                </ListLoader>
                <ListLoader />
            </div>
        )

        return (
            <AuthViewRouteContainer topbar={project?<TopBar attr={project}/>:<LoadingTopBar />}>
                {hasLoadedActions&&!hasProjectActions&&(
                    <EmptyPlaceholder>
                        <ButtonMD variant="extendedFab" color="secondary" onClick={()=>this.handleAdd()}><AddIcon /> add {hasProjectActions?"another":"your first"} action!</ButtonMD>
                    </EmptyPlaceholder>
                )}
                <div>
                    {this.props.actionRefId
                        ? 
                        <Paper 
                            style={{ 
                                position: "absolute", 
                                right: 0, 
                                top: 0, 
                                height: "92vh", 
                                width: 500, 
                                zIndex: 100,
                                }}>
                            <SidePanelView selectedActionId={this.props.actionRefId}/>
                        </Paper> 
                        : 
                        null}
                    <div style={{}}>
                        <div style={{ padding: 32, paddingTop: 0 }}>
                            {!hasLoadedActions&&!hasProjectActions&&<LoadingDisplay />}
                            {hasProjectActions&&getProjectActionTree(projectActions, this.handleAdd, this.handleDelete, this.handleUpdate, this.handleClick)}
                        </div>
                    </div>
                </div>
            </AuthViewRouteContainer>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.loginFlow.isComplete,
        projectRefId: state.actionManager.selectedProject.projectId,
        hasProjects: Object.keys(state.actionManager.projects).length>0,
        hasLoadedActions: state.actionManager.selectedProject&&state.actionManager.projects[state.actionManager.selectedProject.projectId]&&state.actionManager.projects[state.actionManager.selectedProject.projectId].hasLoadedActions,
        actionRefId: state.actionManager.selectedProject.actionId,
        project: state.actionManager.selectedProject&&state.actionManager.projects[state.actionManager.selectedProject.projectId],
        updateProjectIsOpen: state.actionManager.dialogs.updateProject.isOpen
    }
}

export default connect(mapStateToProps, {...reduxActions})(ProjectTaskList)