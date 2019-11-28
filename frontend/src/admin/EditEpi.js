import React, { Component } from 'react';
import { Form, Button, Input, Upload, Icon, notification, Select } from 'antd';
import { fetchToonById, deleteFile, fetchToonThumbnailById } from '../util/APIAdmin';
const { Dragger } = Upload;
const { Option } = Select;

class EditEpi extends Component {
    constructor(props) {
        super(props)
        this.state = {
            toons: [],
            epiTitle :'',
            thumbnail : [],
            main : [],
            selectedToonID : ''
        }
        this.onChangeToon = this.onChangeToon.bind(this);
        this.loadToonInfo = this.loadToonInfo.bind(this);
        this.onChangeThumbnail = this.onChangeThumbnail.bind(this);
        this.onChangeMain = this.onChangeMain.bind(this);
        this.uploadNewEpi = this.uploadNewEpi.bind(this);
        this.onChangeEpiTitle = this.onChangeEpiTitle.bind(this);
    }
    

    // 기존 만화 id 선택 시
    onChangeToon = value => {
        this.setState({selectedToonID : value}, function(){
            console.log(this.state.selectedToonID)
        })
    }

    // 기존 만화 id, name 가져오기 
    componentDidMount() {
        this.loadToonInfo();
    }

    // loadToonInfo() {
    //     fetchToonInfo()
    //         .then((res) => {
    //             this.setState({toons: res}, function(){
    //                 console.log(this.state)
    //             })
    //         });
    // }

    //thumbnail 선택 시
    onChangeThumbnail=({ fileList })=> {
        this.setState({ thumbnail:fileList }, function(){
            console.log(this.state)
        })
    }


    //main 선택 시
    onChangeMain=({ fileList })=> {
        this.setState({ main : fileList }, function(){
            console.log(this.state)
        })
    }

    // // submit
    // uploadNewEpi() {
    //     try {
    //         uploadEpi(this.state.selectedToonID, this.state.epiTitle, this.state.thumbnail[0].originFileObj, this.state.main[0].originFileObj)
            
    //         this.props.history.push("/adminmenu");
    //         notification.success({
    //             message: 'Cheeze Toon',
    //             description: "정상적으로 저장되었습니다.",
    //         });

    //     } catch(error) {
    //             notification.error({
    //                 message: 'Cheeze Toon',
    //                 description: error.message || '다시 시도해주세요.'
    //             });
    //         }
    //     }


    // 회차 제목 입력 시
    onChangeEpiTitle = (e) => {
        this.setState({epiTitle: e.target.value}, function(){
            console.log(this.state)
        })
      }

    
    render() {
        return (
            <div className="newEpi-container">
                <Form onSubmit={this.uploadNewEpi}>
                        <Form.Item label="연재 만화">
                            <Select name="toon" size="large" onChange={this.onChangeToon}>
                               
                                {this.state.toons.map(function(toon) {
                                    return (
                                        <Option key = {toon.tno} value = {toon.tno}> {toon.title} </Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item label="회차 제목">
                            <Input type="text" name="epiTitle" size="large" placeholder="Ex) 1화" value={this.state.epiTitle} onChange={this.onChangeEpiTitle}></Input>
                        </Form.Item>
                        <Form.Item label="회차 썸네일">
                            <Dragger onChange={this.onChangeThumbnail} beforeUpload={() => false} >
                                <p className="ant-upload-drag-icon">
                                <Icon type="inbox" />
                                </p>
                                <p className="ant-upload-text">Click or Drag your image</p>
                                <p className="ant-upload-hint">
                                회차 썸네일 권장 사이즈는 10 : 8 (비율) 입니다.
                                </p>
                            </Dragger>
                        </Form.Item>
                        <Form.Item label="회차 본편">
                            <Dragger onChange={this.onChangeMain} beforeUpload={() => false} multiple={true}>
                                <p className="ant-upload-drag-icon">
                                <Icon type="inbox" />
                                </p>
                                <p className="ant-upload-text">Click or Drag your image</p>
                                <p className="ant-upload-hint">
                                회차 본편 권장 사이즈는 900 * ∞ (픽셀) 입니다. 
                                </p>
                            </Dragger>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" className="newEpiAddButton" size="large" htmlType="submit">Save</Button>
                        </Form.Item>
                </Form>
            </div>
        );
    }
}
export default EditEpi;