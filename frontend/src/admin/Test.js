import React, { Component } from 'react';
import { Form, Button, Input, Upload, Icon, notification, Select } from 'antd';
import './NewAdd.css';
import {uploadFile} from '../util/APITest';

const { Dragger } = Upload;

class Test extends Component {
    constructor(props){
        super(props);
    this.state = {
        fileList:[]
    };
    this.uploadNewWebtoon = this.uploadNewWebtoon.bind(this);
            this.onChange = this.onChange.bind(this);
}

onChange=({ fileList })=> {
    this.setState({ fileList }, function(){
        console.log(this.state.fileList[0].originFileObj)
     })
 }

 uploadNewWebtoon() {
    try {
        uploadFile(this.state.fileList[0].originFileObj)
        

    } catch(error) {
            notification.error({
                message: 'Cheeze Toon',
                description: error.message || '다시 시도해주세요.'
            });
        }
    }
    render() {
        return (
            <div className="newAdd-container">
                <Form onSubmit={this.uploadNewWebtoon}>
                <Form.Item label="썸네일">
                        <Dragger onChange={this.onChange} beforeUpload={() => false} >
                            <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                            band files
                            </p>
                        </Dragger>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" className="newAddButton" size="large" htmlType="submit">Save</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default Test;