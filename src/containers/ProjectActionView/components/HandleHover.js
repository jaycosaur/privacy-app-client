import React from 'react'

export default class HandleHover extends React.Component {
    state = {
        isHovered: false
    }
    toggleState = (state) => {
        this.setState(() => ({ isHovered: state }))
    }
    render() {
        return (
            <div onMouseEnter={() => this.toggleState(true)} onMouseLeave={() => this.toggleState(false)}>
                {this.props.render(this.state.isHovered)}
            </div>
        )
    }
}