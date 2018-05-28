import React from 'react'
import { Modal, Button } from 'antd'
const ModalTemplate = (props) => (
    <Modal
      title={props.title}
      visible={props.isShowing}
      onOk={props.handleOk}
      onCancel={props.doCloseModal}
      closable
      footer={<Button key="submit" type="primary" onClick={props.handleOk}>{props.submitTitle}</Button>}
      style={{borderRadius: 0, top: 240}}
      confirmLoading={props.isLoading}
    >
      {props.children}
    </Modal>
  )

export default ModalTemplate