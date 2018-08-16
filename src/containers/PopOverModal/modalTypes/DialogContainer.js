import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class DialogContainer extends React.Component {
  render() {
        const { isLoading } = this.props
        return (
            <Dialog
                open={this.props.isShowing}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
                maxWidth="sm"
                fullWidth
                >
                <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
                <DialogContent>
                    {this.props.children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.props.handleOk} disabled={this.props.submitDisabled} color="primary">
                        {this.props.submitTitle}
                    </Button>
                </DialogActions>
            </Dialog>
        );
  }
}