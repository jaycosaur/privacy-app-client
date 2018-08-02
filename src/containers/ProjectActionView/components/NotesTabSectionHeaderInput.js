import React from 'react'
import { Icon, Input } from 'antd'
import HandleHover from './HandleHover'

export default class SectionHeaderInput extends React.Component {
    state = {
        isFocused: false,
        isSelected: false
    }
    toggleSelect = () => {
        this.setState((state) => ({
            isSelected: !state.isSelected
        }))
    }

    toggleFocus = () => {
        this.setState((state) => ({
            isFocused: !state.isFocused
        }))
    }

    handleEnter = (e) => {
        if (e.key === 'Enter') {
            this.toggleSelect()
        }
    }

    render() {
        return (
            <div>
                {!this.state.isSelected ?
                    <HandleHover render={(isHovered) => (
                        <h2 onClick={this.toggleSelect} style={{ width: "100%", color: isHovered && "#1890ff" }}>{this.props.value || this.props.placeholder}</h2>
                    )} />
                    : <Input.TextArea autosize autoFocus suffix={<Icon type="edit" />} onKeyPress={this.handleEnter} onFocus={this.toggleFocus} onBlur={this.toggleSelect} placeholder={this.props.placeholder} value={this.props.value} onChange={e => this.props.handleChange(e.target.value, this.props.id)} />}
            </div>
        )
    }
}