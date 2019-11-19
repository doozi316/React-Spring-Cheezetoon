import React, { Component } from 'react';
import { Form, Button, Input, Upload, Icon, notification, Select } from 'antd';
import './NewAdd.css';
import {uploadFile} from '../util/APITest';
const { Dragger } = Upload;
const { Option } = Select;

class NewAdd extends Component {
    constructor(props){
        super(props);
    this.state = {
        title:{
            value:''
        },
        artist:{
            value:''
        },
        day:'mon',
        genre:'',
        fileList:[]
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.uploadNewWebtoon = this.uploadNewWebtoon.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onDayChange = this.onDayChange.bind(this);
        this.onGenreChange = this.onGenreChange.bind(this);
}

onDayChange = value =>{
    this.setState({ day: value}, function () {
        console.log(this.state.day);
    });
}
onGenreChange = value =>{
    this.setState({ genre: value}, function () {
        console.log(this.state.genre);
    });
}
    
handleInputChange(event){
    const target = event.target;
    const inputName=target.name;
    const inputValue = target.value;

    this.setState({
        [inputName] : {
            value : inputValue
        }
    }, function(){
        console.log(this.state);
    })
}

onChange=({ fileList })=> {
    this.setState({ fileList }, function(){
        console.log(this.state.fileList[0].originFileObj)
     })
 }

 uploadNewWebtoon() {
    try {
        uploadFile(this.state.title.value, this.state.artist.value, this.state.day, this.state.genre, this.state.fileList[0].originFileObj)
        this.props.history.push("/adminmenu");
        notification.success({
            message: 'Cheeze Toon',
            description: "정상적으로 저장되었습니다.",
          });

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
                    <Form.Item label="작품 제목">
                            <Input type="text" name="title" size="large" placeholder="Title" value={this.state.title.value} onChange={this.handleInputChange}></Input>
                        </Form.Item>
                        <Form.Item label="작가">
                            <Input type="text" name="artist" size="large" placeholder="Artist" value={this.state.artist.value} onChange={this.handleInputChange}></Input>
                        </Form.Item>
                        <Form.Item label="연재 요일">
                            <Select name="day" defaultValue="월요일" size="large" onChange={this.onDayChange}>
                                <Option value="mon">월요일</Option>
                                <Option value="tue">화요일</Option>
                                <Option value="wed">수요일</Option>
                                <Option value="thu">목요일</Option>
                                <Option value="fri">금요일</Option>
                                <Option value="sat">토요일</Option>
                                <Option value="sun">일요일</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="장르">
                            <Select name="genre" defaultValue="로맨스" size="large" onChange={this.onGenreChange}>
                                <Option value="로맨스">로맨스</Option>
                                <Option value="일상">일상</Option>
                                <Option value="공포">공포</Option>
                                <Option value="판타지">판타지</Option>
                            </Select>
                        </Form.Item>
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

export default NewAdd;