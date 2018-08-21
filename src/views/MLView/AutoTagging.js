import React from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Chip from '@material-ui/core/Chip'
import Dropzone from 'react-dropzone'
import Typography from '@material-ui/core/Typography'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

export default class AutoTagging extends React.Component {
    state ={
        files: []
    }

    onDrop = (files) => {
        this.setState({
          files
        });
        this.props.handleSubmit({title: files.map(i=>i.name.split('.')[0])})
      }

    render() {
        const { isLoading, tags } = this.props.state
        return (
            <Card style={{marginBottom: 16}}>
                <CardContent>
                    <Dropzone onDrop={this.onDrop.bind(this)} style={{width: "100%"}}>
                        <Card square>
                            <CardContent>
                                <Typography variant="subheading">
                                    {isLoading?"Loading...":<span><CloudUploadIcon style={{marginRight: 8}}/>
                                    Try dropping some files here, or click to select files to upload.</span>}
                                </Typography>
                            </CardContent>
                     </Card>
                    </Dropzone>
                    {!isLoading&&tags&&<Card square>
                        <CardContent>
                            {tags&&tags.map((tag,i)=>{
                                return (
                                    <Card  style={{marginBottom: 8}}>
                                        <CardContent>
                                            <Typography variant="subheading" style={{marginBottom: 16}}>{this.state.files[i].name.split('.')[0]}</Typography>
                                            {tag.map(i=><Chip label={i} style={{marginRight: 8}}/>)}
                                        </CardContent>
                                    </Card>
                                )
                            })}
                        </CardContent>
                    </Card>}
                </CardContent>
              </Card>
          )

    }
  
}
