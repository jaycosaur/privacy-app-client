import React from 'react'
import { Layout, Menu, Breadcrumb, Button, Row, Col, Card, Avatar, Icon, Input, BackTop } from 'antd';
import ItemList from './../containers/ItemList'
import CardWrapper from './../components/CardWrapper'
import { themeColors, highlightThemeShades, primaryThemeShades } from './../theme'
import SearchFilter from './../components/SearchFilter'
import { connect } from 'react-redux'
import * as accountActions from './../store/actions/accountActions'

const SearchTopBar = (props) => (
    <Card bodyStyle={{padding: "4px 16px"}}>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <div style={{display: "flex", alignItems: "center"}}>
                <Button style={{marginRight: 8, background: highlightThemeShades[2], border: themeColors[2]}}><strong>Search Again</strong></Button>
                <div style={{fontWeight: 900,  color: primaryThemeShades[3]}}>244 Results</div>
            </div>
            <div style={{display: "flex", alignItems: "center"}}>
                <div><strong style={{color: highlightThemeShades[4]}}>12 NEW</strong></div>
                <Button 
                    style={{marginLeft: 8, color: highlightThemeShades[2], background: primaryThemeShades[3]}}
                    onClick={e => props.doSelectItem("create-watch")}
                    >
                    <strong>Create Watch</strong>
                </Button>
            </div>
            
        </div>
    </Card>
)

const mapStateToProps = (state, ownProps) => {
    return {
        prop: state.prop
    }
}
export default connect(mapStateToProps, accountActions)(SearchTopBar)
