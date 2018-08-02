import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from '@material-ui/core/TextField';
import ListItemText from '@material-ui/core/ListItemText';

const validate = values => {
    const errors = {}
    if (!values.description) {
        errors.description = 'Required'
    } else if (values.description.length === 0) {
        errors.description = 'Required'
    }
    return errors
  }
  
const renderTextField = ({ input: { value, onChange, onBlur }, label,multiline, meta: { touched, error } }) => (
    <TextField 
        label={label}
        errorText={touched && error}
        value={value}
        onChange={onChange}
        fullWidth
        error={error}
        multiline={multiline}
        onBlur={onBlur}
        autoFocus
    />
)
  
const MaterialUiForm = props => {
    const { handleSubmit } = props
    return (
        <form onSubmit={handleSubmit}>
            <Field name="description" component={renderTextField} onBlur={handleSubmit}/>
        </form>
    )
}

export default class TaskInput extends React.Component {
    state = {
        isFocused: false,
        isSelected: false,
        cacheString: null
    }

    toggleSelect = (e) => {
        e.preventDefault()
        this.setState((state) => ({
            isSelected: !state.isSelected,
        }))
    }


    handleSubmit = (val) => {
        this.setState((state) => ({
            isSelected: !state.isSelected,
        }))
        this.props.updateTask({taskId: this.props.id, val})
    }

    render() {
        const WrappedForm = reduxForm({form: `taskInputForm_${this.props.id}`, validate})(MaterialUiForm)

        return (
            <div>
                {!this.state.isSelected 
                    ? <ListItemText 
                            onClick={this.toggleSelect}
                            primary={this.props.value || this.props.placeholder} 
                            style={{
                                textDecoration: this.props.isDone && "line-through" 
                            }}/>
                    :<WrappedForm onSubmit={this.handleSubmit} initialValues={{description: this.props.value}}/> }
            </div>
        )
    }
}

/*

<ListItemText primary={task.description} />


*/