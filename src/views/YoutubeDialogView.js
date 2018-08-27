import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Youtube from 'react-youtube'

class YoutubeDialogView extends React.Component {
    state = {
      open: false,
    };
  
    handleClickOpen = () => {
      this.setState({ open: true });
    };
  
    handleClose = () => {
      this.setState({ open: false });
    };
  
    render() {
      return (
        <div>
            <span onClick={this.handleClickOpen}>{this.props.children}</span>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
                <Youtube
                    videoId={this.props.videoId}
                    opts={{
                        height: '390',
                        width: '560',
                        playerVars: { // https://developers.google.com/youtube/player_parameters
                            autoplay: 1
                        }
                    }}   
                />
            </DialogContent>
          </Dialog>
        </div>
      );
    }
  }

  export default YoutubeDialogView
