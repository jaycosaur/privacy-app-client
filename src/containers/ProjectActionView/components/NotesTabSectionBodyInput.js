import React from 'react'
import { Icon, Input } from 'antd'
import HandleHover from './HandleHover'

export default class SectionBodyInput extends React.Component {
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
                        <p onClick={this.toggleSelect} style={{ width: "100%", margin: 0, padding: "5px 11px", color: isHovered && "#1890ff" }}>{this.props.value || this.props.placeholder}{isHovered && <Icon style={{ marginLeft: 4 }} type="edit" />}</p>
                    )} />
                    : <Input.TextArea autosize autoFocus suffix={<Icon type="edit" />} onKeyPress={this.handleEnter} onFocus={this.toggleFocus} onBlur={this.toggleSelect} placeholder={this.props.placeholder} value={this.props.value} onChange={e => this.props.handleChange(e.target.value, this.props.id)} />}
            </div>
        )
    }
}