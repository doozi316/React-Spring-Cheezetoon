import React, { Component } from 'react';
import { Form, Button, Input, Upload, Icon, message, Select } from 'antd';
import './NewAdd.css';
import {addNewWebtoon} from "../util/APIUtils";

const { Option } = Select;


class NewAdd extends Component {
    constructor(props){
        super(props);
    this.state = {
            title:'',
            artist:'',
            day:'',
            genre:'',
            thumbnail:'',
            message: null        
            };
        }

    onChange = (event) =>{
            this.setState({ [event.target.name]: event.target.value});
        }
    onFileChange = (e) => {
        this.setState({
            thumbnail: e.target.files[0]
        });
    }
    

    uploadNewWebtoon = (e) => {
        e.preventDefault();

        let data = new FormData();
        data.append('title', this.state.title);
        data.append('artist', this.state.artist);
        data.append('day', this.state.day);
        data.append('genre', this.state.genre);
        data.append('thumbnail', this.state.file);
        addNewWebtoon(data)
            .then(res => {
                this.setState({messgae : 'New Webtoon uploaded successfully.'});
                this.props.history.push('/');
                console.log(res.data);
            })
    }
        
    render() {
        
        return (
            <div className="newAdd-container">
                <h2>새 웹툰 등록</h2>
                <Form>
                    <Form.Item label="작품 제목">
                        <Input type="text" name="title" size="large" placeholder="Title" onChange={this.onChange}></Input>
                    </Form.Item>
                    <Form.Item label="작가">
                        <Input type="text" name="artist" size="large" placeholder="Artist" onChange={this.onChange}></Input>
                    </Form.Item>
                    <Form.Item label="연재 요일">
                        <Select name="day" defaultValue="월요일" size="large" onChange={this.onChange}>
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
                        <Select name="genre" defaultValue="로맨스" size="large" onChange={this.onChange}>
                            <Option value="로맨스">로맨스</Option>
                            <Option value="일상">일상</Option>
                            <Option value="공포">공포</Option>
                            <Option value="공포">판타지</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="썸네일">
                        <Input type="file" size="large" namge="thumbnail"></Input>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" className="newAddButton" size="large" onClick={this.uploadNewWebtoon}>Save</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}


export default NewAdd;