import React, { Component } from 'react';
import { Form, Button, Input, Upload, Icon, notification, Select } from 'antd';
import './EditToon.css';
import { fetchToonById, deleteFile, fetchToonThumbnailById } from '../util/APIAdmin';
const { Dragger } = Upload;
const { Option } = Select;


class EditToon extends Component {
    constructor(props){
        super(props);
        this.state ={
            title:'',
            artist:'',
            day:'mon',
            genre:'',
            fileList:[],
            originFileName:''
            };
            
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
    
onChangeTitle = (e) => {
    this.setState({title: e.target.value}, function(){
        console.log(this.state)
    })
  }


onChangeArtist = (e) => {
    this.setState({artist: e.target.value}, function(){
        console.log(this.state)
    })
  }



onChange=({ fileList })=> {
    this.setState({ fileList }, function(){
        console.log(this.state.fileList[0].originFileObj)
     })
 }

 // 기존 특정 만화 가져오기 
 componentDidMount() {
    this.loadToon();
    this.loadToonThumbnail();
}

loadToon() {
    fetchToonById(parseInt(this.props.match.params.id, 10))
        .then((res) => {
            this.setState({
                title : res.title,
                artist : res.artist,
                day : res.day,
                genre : res.genre
                }, function(){
                console.log(this.state)
            })
        });
}

loadToonThumbnail() {
    fetchToonThumbnailById(parseInt(this.props.match.params.id, 10))
        .then((res) => {
            this.setState({
                originFileName : res.fileName
            }, function(){
                console.log(this.state)
            })
        });
}

deleteFile(id){
    deleteFile(id);
}
    render() {
        return (
            <div className="editToon-container">
                  <Form onSubmit={this.uploadNewWebtoon}>
                    <Form.Item label="작품 제목">
                            <Input type="text" name="title" size="large" placeholder="Title" value={this.state.title} onChange={this.onChangeTitle}></Input>
                        </Form.Item>
                        <Form.Item label="작가">
                            <Input type="text" name="artist" size="large" placeholder="Artist" value={this.state.artist} onChange={this.onChangeArtist}></Input>
                        </Form.Item>
                        <Form.Item label="연재 요일">
                            <Select name="day" value={this.state.day} size="large" onChange={this.onDayChange}>
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
                            <Select name="genre" value={this.state.genre} size="large" onChange={this.onGenreChange}>
                                <Option value="로맨스">로맨스</Option>
                                <Option value="일상">일상</Option>
                                <Option value="공포">공포</Option>
                                <Option value="판타지">판타지</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="썸네일">
                            <span>{this.state.originFileName}&nbsp;</span> 
                            <Button type="primary" size="small" onClick={() => this.deleteFile(parseInt(this.props.match.params.id, 10))}>Delete</Button>
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
                            <Button type="primary" className="editToonButton" size="large" htmlType="submit">Save</Button>
                        </Form.Item>
                </Form>
            </div>
        );
    }
}

export default EditToon;