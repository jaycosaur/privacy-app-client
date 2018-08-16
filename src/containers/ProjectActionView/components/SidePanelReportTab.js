import React from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import { Field, reduxForm } from 'redux-form';

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
    const { handleSubmit, pristine, submitting} = props
    return (
        <form style={{width: "100%"}} onSubmit={handleSubmit} onKeyDown={e=>{e.key==="Enter"&&handleSubmit()}}>
            <Field name="message" component={renderTextField} multiline label="Description of breach"/>
            <Button
                variant="contained" 
                color="secondary"
                disabled={pristine || submitting || props.isLoading}
                type="submit"
                style={{float: "right", color: "white"}}
                >
                SUBMIT
                <SendIcon style={{marginLeft: 8, color: "white"}}/>
            </Button>
        </form>
    )
}

const WrappedForm = reduxForm({form: 'report-a-breach', validate})(MaterialUiForm)

export default class ReportTab extends React.Component {
    state = {
        submittedBreach: false
    }

    onSubmit = (v) => {
        this.setState({submittedBreach: true})
        this.props.submitBreachReport(v)
    }

    render() {
        return (
            <div style={{height: "100%"}}>
                <div style={{height: "100%", overflow: "scroll"}}>
                    <CardContent>
                        <Typography variant="headline" gutterBottom>Report a breach</Typography>
                        <Typography variant="subheading" gutterBottom>Have you noticed any activity that has or may result in a breach of this obligation and linked act or law? You can report it here to alert your manager.</Typography>
                        <Typography variant="caption">Once you submit a breach report your manager(s) will be notified immediately and a record of this breach shall be stored.</Typography>
                    </CardContent>
                    <CardContent style={{height: "100%"}}>
                        <Card elevation={20}>
                            <CardContent style={{height: "100%", display: "flex", alignItems: "center"}}>
                                {!this.state.submittedBreach&&<WrappedForm onSubmit={this.onSubmit} />}
                                {this.state.submittedBreach&&<Typography variant="subheading" style={{marginBottom: 0}}>Breach has been reported.</Typography>}
                            </CardContent>
                        </Card>
                    </CardContent>
                </div>
            </div>
        )
    }
}