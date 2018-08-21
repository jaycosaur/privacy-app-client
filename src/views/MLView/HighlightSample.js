import React from 'react'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import Popover from '@material-ui/core/Popover';
import Tooltip from '@material-ui/core/Tooltip';

class Hel extends React.Component {
    state = {
        anchorEl: null,
        hovered: false
      };
    
      handleClick = event => {
        this.setState({
          anchorEl: event.currentTarget,
          hovered: true
        });
      };

      handleHover = event => {
        this.setState({
            anchorEl: event.currentTarget,
            hovered: true
        });
      }
    
      handleClose = () => {
        this.setState({
          anchorEl: null,
          hovered: false
        });
      };

    render(){
        const { anchorEl, hovered } = this.state;
        return [
            <Tooltip title="Click for info." placement="top">
                <a style={{color: "#f97794"}} onClick={this.handleClick}>{this.props.children}</a>
            </Tooltip>,
            <Popover
                id="simple-popper"
                open={hovered}
                anchorEl={anchorEl}
                onClose={this.handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
            >
                <CardContent style={{maxWidth: 400}}>
                    {this.props.content}
                </CardContent>
            </Popover>
            ]
    }
}

const FirstContent = (
    <div>
        <Typography variant="subheading" marginBottom><strong>officer</strong> of a corporation means:</Typography>
        <Typography variant="body1" paragraph>(a)	 A director or secretary of the corporation;</Typography>
        <Typography variant="body2" paragraph>   or</Typography>
        <Typography variant="body1" paragraph>    (b) a person: (i) who makes or participates in making, decisions that affect the whole, or a substantial part of the business of the corporation; or
            (ii) who has the capacity to significantly affect the corporation’s financial standing. </Typography>
            <Typography variant="caption">S9 Corporations Act</Typography>
    </div>
)

const SecondContent = (
    <div>
        <Typography variant="body1">See an example: <a href="https://asic.gov.au/about-asic/media-centre/find-a-media-release/2018-releases/18-081mr-directors-of-storm-financial-penalised-for-breach-of-duties/" target="_blank">https://asic.gov.au/about-asic/media-centre/find-a-media-release/2018-releases/18-081mr-directors-of-storm-financial-penalised-for-breach-of-duties/</a></Typography>
    </div>
)

const ThirdContent = (
    <div>
        <Typography variant="body1" paragraph> Cassimatis contravened s 180(1) of the Corporations Act by exercising their powers in a way which caused or “permitted” (by omission to prevent) inappropriate advice to be given to the relevant investors advised by Storm Financial. </Typography>
        <Typography variant="body1" paragraph>Those relevant investors were retired or close to retirement, had few assets, little income, and little or no prospect of rebuilding their financial position in the event of suffering significant loss.</Typography>
        <Typography variant="body2"><strong>The maximum penalty for a breach of directors' duties (s180) is $200,000.</strong></Typography>

    </div>
)

export default () => {
    return (
        <Card>
            <CardContent>
                <Typography variant="title">S180 – Corporations Act</Typography>
                <Typography variant="subheading">Care and Diligence – Directors and other <Hel content={FirstContent}>Officers</Hel></Typography>

                
                    (1)	A director or other officer of a corporation must exercise their powers and discharge their duties with the <Hel content={SecondContent}>degree of care and diligence that a reasonable person</Hel> would exercise if they:
                    (a)	Were a director or officer of a corporation in the corporation’s circumstances; and

                    (b) occupied the office held by and had the same responsibilities within the corporation as the director or officer.
                    <Typography paragraph variant="body1">This subsection is a <Hel content={ThirdContent}>civil penalty provision (see 1317E)</Hel>.</Typography>
            </CardContent>
        </Card>
    )
}
