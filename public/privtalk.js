const PrivTalkContainer = function(props) {
    return (
        <div style={{position: "absolute", bottom:0, right: 0, padding: 8, margin: 16, zIndex: 1000, background: "#f50057", width: 50, height: 50, borderRadius: 50}}>
            {props.children}
        </div>
    )
}

const PrivTalkOpenContainer = function(props) {
    return (
        <div style={{position: "absolute", bottom:0, right: 0, padding: 8, margin: 16, zIndex: 1000, background: "#f50057", width: 200, height: 500}}>
            {props.children}
        </div>
    )
}

class PrivTalk extends React.Component {
    state = {
        isOpen: true
    }

    toggleOpen=()=>{
        this.setState(state=>({
            isOpen: !state.isOpen     
        }))
    }

    render() {
        const { isOpen } = this.state
        return (
            !isOpen?<PrivTalkContainer>
                <p style={{color: "white"}} onClick={this.toggleOpen}>PT</p>
            </PrivTalkContainer>:<PrivTalkOpenContainer>
                <button onClick={this.toggleOpen}>Click me to close!</button>
            </PrivTalkOpenContainer>

        )
    }
}
ReactDOM.render(
    <PrivTalk />,
    document.getElementById('priv-talk-container')
);