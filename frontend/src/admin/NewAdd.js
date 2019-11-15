import React, { Component } from 'react';
import { Form, Button, Input, Upload, Icon, message, Select } from 'antd';
import './NewAdd.css';
import ApiService from '../service/ApiService';

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

    onChange = (e) =>
            this.setState({ [e.target.name]: e.target.value});
    
    onFileChange = (e) => {
        this.setState({
            thumbnail: e.target.files[0]
        });
    }
    

    uploadNewWebtoon = (e) => {
        e.preventDefault();;

        let data = new FormData();
        data.append('title', this.state.title);
        data.append('artist', this.state.artist);
        data.append('day', this.state.day);
        data.append('genre', this.state.genre);
        data.append('thumbnail', this.state.file);
        ApiService.addNewWebtoon(data)
            .then(res => {
                this.setState({messgae : 'New Webtoon uploaded successfully.'});
                this.props.history.push('/');
            })
    }
        
    render() {
        
        return (
            <div className="newAdd-container">
                <h2>새 웹툰 등록</h2>
                <Form>
                    <Form.Item label="작품 제목">
                        <Input type="text" namge="title" size="large" placeholder="Title" onChange={this.onChange}></Input>
                    </Form.Item>
                    <Form.Item label="작가">
                        <Input type="text" namge="artist" size="large" placeholder="Artist" onChange={this.onChange}></Input>
                    </Form.Item>
                    <Form.Item label="연재 요일">
                        <Input type="text" namge="day" size="large" placeholder="Day" onChange={this.onChange}></Input>
                    </Form.Item>
                    <Form.Item label="장르">
                        <Select defaultValue="로맨스" size="large" onChange={this.onChange}>
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