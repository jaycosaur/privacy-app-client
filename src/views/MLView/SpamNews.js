import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

export default class SpamNews extends React.Component{
  state = {
    title: ""
  }

  handleTitleChange = (title) => {
    this.setState({
      title: title.target.value
    })
  }

  handleSubmit = () => {
    this.props.handleSubmit({title: this.state.title})
  }

  render(){
    return (
      <Card style={{marginBottom: 0}} square>
        <CardContent>
          <TextField
              id="multiline-static"
              label="News ML algorithim"
              multiline
              rows="2"
              margin="normal"
              fullWidth
              onChange={this.handleTitleChange}
              value={this.state.title}
            />
          <div style={{display: "flex"}}>
            {this.props.state.isLoading?"Loading...":this.props.state.isSpam&&(<Button variant="outlined" color="primary">{this.props.state.isSpam[0].isSpamTagged?"It's not relevant!":"It's relevant!"}</Button>)}
            <div style={{flex: 1}}/>
            <Button variant="contained" color="secondary" disabled={this.props.state.isLoading} onClick={()=>this.handleSubmit()}>{this.props.state.isLoading?"LOADING":"CHECK IF RELEVANT"}</Button>
          </div>
        </CardContent>
      </Card>
    )
  }
}
