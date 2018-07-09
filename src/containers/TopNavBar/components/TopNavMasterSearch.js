import React from 'react'

import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search'
import { connect } from 'react-redux'

import { globalSearch } from './../../../store/actions/searchActions'

const TopNavMasterSearch = (props) => (
    <FormControl>
        <Input
            id="input-with-icon-adornment"
            placeholder="Looking for something?"
            onKeyPress={e=>{
                if(e.key==="Enter"){
                    props.globalSearch(e.target.value)
                }
            }}
            style={{width: 400}}
            startAdornment={
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
            }
        />
    </FormControl>
)

const mapStateToProps = (state, ownProps) => {
    return {
        prop: state.prop
    }
}

export default connect(mapStateToProps, { globalSearch })(TopNavMasterSearch)