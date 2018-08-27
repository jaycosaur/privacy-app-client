import React from 'react'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import CircularProgress from '@material-ui/core/CircularProgress'

import { withStyles } from '@material-ui/core/styles';
import Container from './../containers/Container'
import { Field, reduxForm } from 'redux-form'
import TextField from '@material-ui/core/TextField'
import * as accountActions from './../../../store/actions/accountActions'
import * as teamActions from './../../../store/actions/teamActions'

import { connect } from 'react-redux'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete'
import EmailIcon from '@material-ui/icons/Email'

const ButtonTag = (props) => {
    const { classes, isSelected } = props
    return (
        <Button 
            variant="extendedFab" 
            aria-label="delete" 
            onClick={()=>props.onClick()} 
            className={isSelected?classes.buttonChecked:classes.buttonDefault}
            >
            {props.tag}
        </Button>
    )
}

const buttonStyles = theme => ({
    buttonDefault: {
        margin: 0.5*theme.spacing.unit,
        minWidth: 100
    },
    buttonChecked: {
        minWidth: 100,
        background: "linear-gradient(45deg, rgba(98,58,162,1) 0%, rgba(249,119,148,1) 100%)",
        color: "white",
        margin: 0.5*theme.spacing.unit,
        '&:hover': {
            background: "linear-gradient(0deg, rgba(98,58,162,1) 0%, rgba(249,119,148,1) 100%)",
        },
    }
});

const ButtonTagWithStyles = withStyles(buttonStyles)(ButtonTag)

class ButtonSelectContainer extends React.Component {
    selectTag = (key) => {
        this.props.onSelect(key)
    }

    render(){
        const { info, selected } = this.props
        return (
            info.map((tag,i)=><ButtonTagWithStyles isSelected={selected===tag.key} onClick={()=>this.selectTag(tag.key)} key={tag.key} tag={tag.value}/>)
        )
    }
}

const styles = theme => ({
    root: {
        height: "92vh",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(45deg, rgba(98,58,162,1) 0%, rgba(249,119,148,1) 100%)"
    },
    backButton: {
      marginRight: theme.spacing.unit,
    },
    instructions: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit,
    },
    flexCenter: {
        display: "flex", justifyContent: "space-around",
    },
    centerText: {
        textAlign: "center"
    },
    progressButton: {
        width: "40%",
    },
    containerCard: {
        width: 500,
        height: "75vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 0
    },
    upperCard: {
        marginBottom: 2*theme.spacing.unit,
        marginTop: 2*theme.spacing.unit,
    },
    middleCard: {
        paddingBottom: 2*theme.spacing.unit,
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        width: "100%",
        height: "100%"
    },
    bottomCard: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 2*theme.spacing.unit,
    }
  })

const validate = values => {
    const errors = {}
    const requiredFields = [ 'email']
    requiredFields.forEach(field => {
        if (!values[ field ]) {
            errors[ field ] = 'Required'
        }
    })
    return errors
}

const renderTextField = ({ input: { value, onChange }, label, meta: { touched, error } }) => (
    <TextField 
    label={(touched && error)?error:label}
    error={touched && error}
    value={value}
    onChange={onChange}
    fullWidth
    />
)

const teamSizeOptions = [
    {key: "1", value: "ONLY ME"},
    {key: "2", value: "2 to 5"},
    {key: "5", value: "5 to 15"},
    {key: "15", value: "15 to 25"},
    {key: "25", value: "25 to 100"},
    {key: "100", value: "100 +"},
]

class MaterialUiForm extends React.Component {
    render(){
        const { handleSubmit, pristine, reset, submitting, isLoading, hasCreatedNewTeam } = this.props
        return (
            <form onSubmit={handleSubmit} style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: 16}}>
                <div style={{marginBottom: 40, paddingLeft: 16, paddingRight: 16, width: "100%", display: "flex"}}>
                    <div style={{flex: 1}}><Field name="email" component={renderTextField} label="Add Email"/></div><Button style={{color: "#fff"}} type="submit" variant="extendedFab" aria-label="delete" color="secondary" disabled={pristine || submitting}>ADD</Button>
                </div>
            </form>
        )

    }
    
}

const WrappedForm = reduxForm({form: 'email-invite-form',validate})(MaterialUiForm)

class View extends React.Component {
    state = {
        emails: []
    }

    addEmail = ({email}) => {
        this.setState(state=>({emails: [...state.emails, email]}))
    }

    removeEmail = (email) => {
        this.setState(state=>({emails: state.emails.filter(i=>i!==email)}))

    }

    handleSubmit = (e) => {
        //this.props.createOrganisationFromFields({name: e.name, website: e.website, companySize: this.state.selected})
        this.props.inviteMultipleUsersToOrganisation({emails: this.state.emails})
        this.redirectToWorkspace()
    }

    redirectToWorkspace = () => {
        this.props.redirectToWorkspace()
    }

    render(){
        const { classes, isSubmittingCreateTeam,hasCreatedNewTeam, organisation } = this.props
        return (
            <Container>
                {organisation.name&&<CardContent className={classes.containerCard}>
                    <Typography variant="display1" gutterBottom className={classes.centerText} color="primary">
                        Invite users to join {organisation.name} team
                    </Typography>
                    <List style={{width: "100%"}}>
                    {this.state.emails.map(email => (
                        <ListItem key={email}>
                            <Avatar><EmailIcon /></Avatar>
                            <ListItemText primary={email} />
                            <ListItemSecondaryAction>
                                <IconButton onClick={()=>this.removeEmail(email)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                    </List>
                    <WrappedForm key={this.state.emails.length} completed={hasCreatedNewTeam} isLoading={isSubmittingCreateTeam} onSubmit={this.addEmail} onSelect={this.onSelect} selected={this.state.selected}/>
                    <div style={{width: "100%", display: "flex", justifyContent: "space-between"}}>
                        <Button onClick={this.redirectToWorkspace}>
                            I'LL DO THIS LATER
                        </Button>
                        <Button variant="contained" disabled={this.state.emails.length===0} color="secondary" style={{color: "white"}} onClick={this.handleSubmit}>
                            SEND INVITES
                        </Button>
                    </div>
                </CardContent>}
            </Container>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        prop: state.prop,
        isSubmittingCreateTeam: state.organisation.isSubmittingCreateTeam,
        hasCreatedNewTeam: state.organisation.hasCreatedNewTeam,
        organisation: state.organisation
    }
}

export default connect(mapStateToProps, {...teamActions, ...accountActions})(withStyles(styles)(View))
