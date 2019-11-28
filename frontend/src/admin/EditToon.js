import React, { Component } from 'react';
import { Form, Button, Input, Upload, Icon, notification, Select } from 'antd';
import './EditToon.css';
import { fetchToonById, deleteToonThumbnail, fetchToonThumbnailById, uploadEditToon } from '../util/APIAdmin';
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
            this.onDayChange = this.onDayChange.bind(this);
            this.onGenreChange = this.onGenreChange.bind(this);
            this.onChangeTitle = this.onChangeTitle.bind(this);
            this.onChangeArtist = this.onChangeArtist.bind(this);
            this.onChange = this.onChange.bind(this);
            this.loadToon = this.loadToon.bind(this);
            this.loadToonThumbnail = this.loadToonThumbnail.bind(this);
            this.deleteFile = this.deleteFile.bind(this);
            this.uploadEditWebtoon = this.uploadEditWebtoon.bind(this);
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
        console.log(this.state)
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
    deleteToonThumbnail(id)
        .then(res => {
            this.setState({originFileName:null}, function(){
                console.log(this.state)
            })
        })
}


uploadEditWebtoon(){
    try {
        let file;
        if(this.state.originFileName !==null){
            file = this.state.originFileName;
        } else {
            file = this.state.fileList[0].originFileObj;
        }
        uploadEditToon(parseInt(this.props.match.params.id, 10), this.state.title, this.state.artist, this.state.day, this.state.genre, file)
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
            <div className="editToon-container">
                  <Form onSubmit={this.uploadEditWebtoon}>
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
                            {this.state.originFileName !== null &&
                            <div>
                            <span>{this.state.originFileName}&nbsp;</span> 
                            <Button type="primary" size="small" onClick={() => this.deleteFile(parseInt(this.props.match.params.id, 10))}>Delete</Button> 
                            </div>
                            }
                            <Dragger onChange={this.onChange} beforeUpload={() => false} >
                                <p className="ant-upload-drag-icon">
                                <Icon type="inbox" />
                                </p>
                                <p className="ant-upload-text">Click or Drag your image</p>
                                <p className="ant-upload-hint">
                                썸네일 권장 사이즈는 10 : 8 (비율) 입니다.
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