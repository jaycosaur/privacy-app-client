import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'

import CardContent from '@material-ui/core/CardContent'

export default class SpamNews extends React.Component{
  state = {
    body: "",
    numberOfSentences: 5
  }

  handleBodyChange = (body) => {
    this.setState({
      body: body.target.value
    })
  }
  handleNumberOfSentencesChange = (numberOfSentences) => {
    this.setState({
      numberOfSentences: numberOfSentences.target.value
    })
  }
  handleSubmit = () => {
    this.props.handleSubmit({body: this.state.body, numberOfSentences: this.state.numberOfSentences})
  }

  render(){
    const { isLoading, summary:{ array, newChars, oldChars, result } } = this.props.state

    return (
     <Card square>
        <CardContent>
        <TextField
            id="multiline-static"
            label="Auto-summariser"
            multiline
            rowsMax={5}
            margin="normal"
            fullWidth
            onChange={this.handleBodyChange}
            value={this.state.body}
          />
        <div style={{display: "flex"}}>
          <TextField
              id="number"
              label="Number Of Sentences"
              value={this.state.numberOfSentences}
              onChange={this.handleNumberOfSentencesChange}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
            />
          <div style={{flex: 1}}/>
          <Button variant="contained" color="primary" style={{color: "white"}} disabled={isLoading} onClick={()=>this.handleSubmit()}>{isLoading?"Crunching the numbers":"Summarise Now"}</Button>
        </div>
        </CardContent>
        <CardContent>
        {array&&<Card>
          <CardContent>
            {array.map(i=><Typography paragraph variant="body1">{i}</Typography>)}
            <Typography variant="caption" align="center">{result}</Typography>
          </CardContent>
        </Card>}
        </CardContent>
      </Card>
    )
  }
}
