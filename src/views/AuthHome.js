import React from 'react'
import { themeColors, highlightThemeShades, primaryThemeShades } from './../theme'
import { Card } from 'antd'

export default () => {
  return (
    <div style={{minHeight: "100vh", bottomPadding: 32}}>
        <div style={{height: 480,background: primaryThemeShades[3], padding: "70px 0", display: "flex", justifyContent: "center", alignItems:"center"}}>
            <div style={{width: "80%"}}>
                <p style={{color: "white", fontSize: "3em", fontWeight: 400, margin: 0}}>Welcome to Polity!</p>
                <p style={{color: "white", fontSize: "4em", fontWeight: 700}}>Here are a bunch of helpful resources to help get you started.</p>
            </div>
        </div>
        <div style={{width: "100%", marginTop: -40, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <div style={{display: "flex", width: "80%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 32}}>
                <Card bordered={false} hoverable style={{width: "30%", height: 300, background:  primaryThemeShades[1]}}/>
                <Card bordered={false} hoverable style={{width: "30%", height: 300, background:  primaryThemeShades[2]}}/>
                <Card bordered={false} hoverable style={{width: "30%", height: 300, background:  primaryThemeShades[4]}}/>
            </div>
            <div style={{display: "flex", width: "80%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 32}}>
                <Card bordered={false} hoverable style={{width: "30%", height: 300, background:  highlightThemeShades[1]}}/>
                <Card bordered={false} hoverable style={{width: "30%", height: 300, background:  highlightThemeShades[2]}}/>
                <Card bordered={false} hoverable style={{width: "30%", height: 300, background:  highlightThemeShades[4]}}/>
            </div>
        </div>
    </div>
  )
}
