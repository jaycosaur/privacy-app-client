import React from 'react'
import { Card, Row, Col, List, Avatar, Button, Icon } from 'antd'
import contactData from './../sampledata/contactData'
import { themeColors, highlightThemeShades, primaryThemeShades } from './../theme'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default (props) => {
    return (
        <div style={{height: "92vh", padding: 32}}>
            <Row gutter={16}>
                <Col span={15}>
                    <Card style={{height: 700, overflow: "scroll"}}>
                        <div>
                            <h2  style={{fontWeight: 300}}>My Contacts</h2>
                        </div>
                        <Table dataSource={contactData} size="middle">
                            <TableHead>
                                <TableRow>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Company</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {contactData.map(n => {
                                    return (
                                    <TableRow key={n.id}>
                                        <TableCell component="th" scope="row">
                                        {n.firstName}
                                        </TableCell>
                                        <TableCell>{n.lastName}</TableCell>
                                        <TableCell>{n.email}</TableCell>
                                        <TableCell>{n.company}</TableCell>
                                    </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </Card>
                </Col>
                <Col span={9}>
                    <Card style={{height: 700, boxShadow: "0 -7px 5px -5px #ccc inset"}} bodyStyle={{padding: 0}}>
                        <div style={{zIndex: 100, width: "100%", background: themeColors[0], display: "flex", justifyContent: "space-between", alignItems: "center", padding: 16, position: "absolute", top: 0, left: 0, boxShadow: "0 5px 5px -2px #333"}}>
                            <h3 style={{color: "white", fontWeight: 300, margin: 0}}><Icon type="user" /> Cara Josefina</h3>
                            <div>
                                <Button shape="circle" ghost icon="arrows-alt" style={{marginRight: 8}}/>
                                <Button shape="circle" ghost icon="edit" style={{marginRight: 8}}/>
                                <Button shape="circle" ghost icon="setting" />
                            </div>
                        </div>
                        <div style={{height: 700, position: "absolute", top: 0, left: 0, width: "100%", overflow: "scroll", paddingTop: 60}}>
                            <div style={{background: themeColors[0], color: "white", padding: 24}}>
                                <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                                    <div style={{
                                        backgroundImage: "url(http://www.sardiniauniqueproperties.com/wp-content/uploads/2015/10/Square-Profile-Pic-1-1.jpg)",
                                        backgroundSize: "contain",
                                        backgroundPosition: "center",
                                        backgroundRepeat: "no-repeat",
                                        height: 200,
                                        width: 200,
                                        borderRadius: "100%"}}>
                                    </div>
                                    <h1 style={{color: "white", fontSize: "3em"}}>Cara Josefina</h1>
                                    <h3 style={{color: "white", fontWeight: 300}}>PRINTSPAN</h3>
                                    <h3 style={{color: "white", fontWeight: 300}}>josefinamcknight@printspan.com</h3>
                                </div>
                            </div>
                            <div style={{padding: 24}}>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={contactData}
                                    renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                        title={<a href="https://ant.design"><small>{item.name}</small></a>}
                                        description={<small>Ant Design, a design language for background applications, is refined by Ant UED Team</small>}
                                        />
                                    </List.Item>
                                    )}
                                />
                            </div>
                            <div style={{background: themeColors[0], padding: 8, height: 48, display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
