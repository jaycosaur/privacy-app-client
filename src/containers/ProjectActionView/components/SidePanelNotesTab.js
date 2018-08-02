import React from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';

import moment from 'moment'
import UserName from './UserName'




import { Field, reduxForm } from 'redux-form';
import Item from '../../../../node_modules/antd/lib/list/Item';

const validate = values => {
    const errors = {}
    if (!values.body) {
        errors.body = 'Required'
    } else if (values.body.length === 0) {
        errors.body = 'Required'
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
        margin="normal"
        error={touched && error}
        {...custom}
    />
)
  
const MaterialUiForm = props => {
    const { handleSubmit, pristine, reset, submitting, submitSucceeded } = props
    return (
        <form style={{width: "100%"}} onSubmit={handleSubmit} onKeyDown={e=>{e.key==="Enter"&&handleSubmit()}}>
            <Field name="body" component={renderTextField} multiline label="Your Message"/>
            <Button
                variant="contained" 
                color="secondary"
                disabled={pristine || submitting || props.isLoading}
                type="submit"
                style={{float: "right", color: "white"}}
                >
                Send
                <SendIcon style={{marginLeft: 8, color: "white"}}/>
            </Button>
        </form>
    )
}

const WrappedForm = reduxForm({form: 'newMessageOnActionForm', validate})(MaterialUiForm)

const NoteBubble = (props) => (
    <Card style={{borderRadius: 16, marginBottom: 8, marginLeft: props.left&&16, marginRight: props.right&&16}}>
        <CardContent>
            <Typography variant="subheading" gutterBottom><UserName userId={props.data.createdBy}/> <small>{moment(props.data.createdOn).fromNow()}</small></Typography>
            <Typography variant="body1" style={{whiteSpace: "pre-wrap"}}>{props.data.body}</Typography>
        </CardContent>
    </Card>
)

export default class NotesTab extends React.Component {
    state = {
        showMessageForm: false
    }

    handleShowMessageForm = () => {
        this.setState({showMessageForm: true})
    }

    onSubmit = (v) => {
        this.setState({showMessageForm: false})
        this.props.addNote(v)
    }

    render() {
        const notes = this.props.data.notes&&Object.keys(this.props.data.notes).map(k=>this.props.data.notes[k]).sort((a,b)=>moment(a.createdOn).isBefore(b.createdOn))
        return (
            <div style={{height: "100%"}}>
                <div style={{height: "80%", overflow: "scroll"}}>
                    <CardContent>
                        {notes && notes.map((item, index)=>(
                            <NoteBubble key={item.id} data={item} right={index%2===0} left={index%2===1}/>
                        ))}
                    </CardContent>
                </div>
                <Card style={{height: "20%", bottom: 0, left: 0, right: 0, borderRadius: 0}} elevation={20}>
                    <CardContent style={{height: "100%", display: "flex", alignItems: "center"}}>
                        {!this.state.showMessageForm?<Button onClick={this.handleShowMessageForm} variant="fab" mini color="secondary" aria-label="Add New Message">
                            <AddIcon />
                        </Button>:
                        <WrappedForm onSubmit={this.onSubmit} />}
                    </CardContent>
                </Card>
            </div>
        )
    }
}