import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import * as reduxActions from './../../../store/actions/actionManagerActions'
import StorageIcon from '@material-ui/icons/Cloud'
import Dropzone from 'react-dropzone'

import CardContent from '@material-ui/core/CardContent'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudIcon from '@material-ui/icons/Cloud';
import CloudOffIcon from '@material-ui/icons/CloudOff';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

import moment from 'moment'
import { connect } from 'react-redux'

class DialogContents extends React.Component {
    state = {
        open: false,
      };
    
      handleClose = () => {
          if(this.props.dialogOnly){
            this.props.onClose()
          }else{
            this.props.closeFileExplorerInProjectView()
          }
      };
    
      onDrop = (files) => {
        this.props.uploadNewFilesToProject({ files })
      }

      componentDidMount(){
          if(this.props.dialogOnly){
              this.props.onStorageGetFiles()
          }
      }
    
      render() {
        const { classes, isUploading } = this.props;
        const files = this.props.storage&&Object.keys(this.props.storage).map(k=>this.props.storage[k])
        return (
                [<AppBar className={classes.appBar} color="secondary">
                    <Toolbar>
                        <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            STORAGE
                        </Typography>
                        <div style={{flex: 1}}/>
                        <Dropzone onDrop={this.onDrop} disabled={isUploading} style={{padding:0, margin:0, border: "none"}}>
                            <Button color="inherit" variant="contained">
                                   {isUploading?"UPLOADING...":"UPLOAD"} {isUploading?<CloudOffIcon style={{marginLeft: 4}} />:<CloudUploadIcon style={{marginLeft: 4}} />}
                            </Button>
                        </Dropzone>
                    </Toolbar>
                </AppBar>,
                files&&files.length>0?<List>
                    {files.sort((a,b)=>moment(a.createdOn).isBefore(b.createdOn)).map((f)=>(
                        <ListItem key={f.id} style={{background: f.isDeleting&&"#eee", opacity: f.isDeleting&&0.6}} button={this.props.dialogOnly} onClick={()=>{this.props.dialogOnly?this.props.onSelect(f.id):null}}>
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
                                    <DeleteIcon onClick={()=>this.props.deleteFileInAction({fileId: f.id})}/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>:<CardContent>
                    {this.props.project.hasSyncedStorage?"You have no files that have been added to this projects storage.":"...Loading"}
                </CardContent>]
        );
      }
}

const mapStateToProps2 = (state, ownProps) => {
    const { projectId } = state.actionManager.selectedProject
    return {
        storage: state.actionManager.projects[projectId]&&state.actionManager.projects[projectId].storage,
        projectId: projectId,
        project: state.actionManager.projects[projectId],
        isUploading: state.actionManager.projectsStatus.isUploadingToStorage
    }
}

const DialogContentsWithStore = connect(mapStateToProps2, reduxActions)(withStyles(styles)(DialogContents))

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {
  handleClose = () => {
      if(this.props.dialogOnly){
        this.props.onClose()
      } else {
        this.props.closeFileExplorerInProjectView()
      }
  }

  shouldComponentUpdate(nextProps, nextState){
      return this.props.dialog.isOpen !== nextProps.dialog.isOpen || this.props.isOpen !== nextProps.isOpen
  }

  render() {
      const { dialogOnly } = this.props
    return (
      <div>
        {!this.props.dialogOnly&&<Button
            onClick={()=>this.props.openFileExplorerInProjectView()}
            color="secondary" 
            variant="outlined"
            size="small" 
            style={{display: "flex", alignItems: "center",color: "#fff", borderColor: "#fff"}}>
            <StorageIcon style={{marginRight: 4, fontSize: 20}}/>FILES
        </Button>}
        <Dialog
          fullScreen
          open={this.props.dialogOnly?this.props.isOpen:this.props.dialog.isOpen}
          onClose={this.props.dialogOnly?this.props.onClose:this.handleClose}
        >
            <DialogContentsWithStore onSelect={this.props.onSelect} dialogOnly={dialogOnly} onClose={this.props.onClose}/>
        </Dialog>
      </div>
    );
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        dialog: state.actionManager.dialogs.projectStorage,
    }
}

export default connect(mapStateToProps, reduxActions)(withStyles(styles)(FullScreenDialog))