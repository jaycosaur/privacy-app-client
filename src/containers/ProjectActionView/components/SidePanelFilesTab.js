import React from 'react'
import Dropzone from 'react-dropzone'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudIcon from '@material-ui/icons/Cloud';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import moment from 'moment'
import ButtonBase from '@material-ui/core/ButtonBase';

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

class Basic extends React.Component {
    constructor() {
      super()
      this.state = { 
          files: [],
          dragOver: false
         }
    }
  
    onDrop = (files) => {
      this.setState({
        files,
        dragOver: false
      });
      this.props.addFile({files})
    }

    onDragOver = (e) => {
        console.log(e)
        this.setState({
            dragOver: true
        })
    }

    onDragLeave = (e) => {
        console.log(e)
        this.setState({
            dragOver: false
        })
    }
  
    render() {
        const { isUploading } = this.props
        return (
            <div>
                <CardContent>
                    <Card>
                        <ButtonBase style={{width: "100%", display: "flex", alignItems: "stretch"}}>
                            <CardContent style={{width: "100%"}}>
                                <Dropzone onDrop={this.onDrop} disabled={isUploading} onDragOver={this.dragOver} onDragLeave={this.onDragLeave} style={{borderRadius: 5, padding: 48, flexGrow: 1, height: 300,alignSelf: "stretch", border: "dashed 1px grey", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                                    {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
                                        if (isDragActive) {
                                        return [<CloudUploadIcon color="secondary" style={{fontSize: "4em"}}/>,<p>Release to upload your files!</p>];
                                        }
                                        if (isDragReject) {
                                        return "This file is not authorized";
                                        }
                                        return acceptedFiles.length || rejectedFiles.length
                                        ? `Uploading ${acceptedFiles.length} files!`
                                        : [<CloudIcon color="secondary" style={{fontSize: "4em"}}/>,<p>Try dropping some files here, or click to select files to upload.{this.state.dragOver&&"HERE WE GO!"}</p>];
                                    }}
                                </Dropzone>
                            </CardContent>
                        </ButtonBase>
                    </Card>
                </CardContent>
                <CardContent>
                    <Card>
                        {this.props.files&&this.props.files.length>0?<List>
                            {this.props.files.sort((a,b)=>moment(a.createdOn).isBefore(b.createdOn)).map((f)=>(
                                <ListItem key={f.id} style={{background: f.isDeleting&&"#eee", opacity: f.isDeleting&&0.6}}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <FolderIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={f.name}
                                            secondary={`${moment(f.createdOn).fromNow()} - ${Math.round(f.fileByteSize/1024)} KB`}
                                        />
                                    <ListItemSecondaryAction>
                                        <a href={f.downloadUrl} target="_blank" download={f.name}>
                                            <IconButton aria-label="Download">
                                                <CloudDownloadIcon />
                                            </IconButton>
                                        </a>
                                        <IconButton aria-label="Delete">
                                            <DeleteIcon onClick={()=>this.props.deleteFile({fileId: f.id})}/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>:<CardContent>
                            You have no files attached to this action.
                        </CardContent>}
                    </Card>
                </CardContent>
            </div>
        );
        }
    }

export default (props) => {
    const { files } = props
    return (
        <div>
            <Basic addFile={props.addFile} deleteFile={props.deleteFile} files={files}/>
        </div>
    )
}
