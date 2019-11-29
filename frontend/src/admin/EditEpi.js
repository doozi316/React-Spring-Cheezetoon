import React, { Component } from 'react';
import { Form, Button, Input, Upload, Icon, notification, Select } from 'antd';
import { fetchEditEpi, fetchToonTitle, fetchEpiThumbnailById, deleteEpiThumbnail, deleteEpiToon, fetchEpiToon, uploadEditEpi, uploadEditEpiExceptM, uploadEditEpiExceptT, uploadEditEpiExceptTaM } from '../util/APIAdmin';
const { Dragger } = Upload;
const { Option } = Select;

class EditEpi extends Component {
    constructor(props) {
        super(props)
        this.state = {
            eno:0,
           epiTitle:'',
           webtoonId:0,
           toonTitle:'',
           originThumbnail:null,
           thumbnail:[],
           main:[],
           originMain:null
        }
       this.loadEditEpi = this.loadEditEpi.bind(this);
       this.loadToonTitle=this.loadToonTitle.bind(this);
       this.loadEpiToon= this.loadEpiToon.bind(this);
       this.uploadEditEpi=this.uploadEditEpi.bind(this);
    }
    

 
    componentDidMount() {
        this.loadEditEpi();
        this.loadEpiThumbnail();
        this.loadEpiToon();
    }

    // webtoonId 에 맞는 String 타이틀 가져오기
    componentDidUpdate(prevProps, prevState){
       if(prevState.webtoonId !==this.state.webtoonId){
            this.loadToonTitle();
        }
    }

    loadToonTitle(){
        fetchToonTitle(this.state.webtoonId)
            .then((res) => {
                this.setState({
                    toonTitle:res.title
                }, function(){
                    console.log(this.state);
                })
            });
    }

    loadEditEpi() {
        fetchEditEpi(parseInt(this.props.match.params.id, 10))
            .then((res) => {
                this.setState({
                    eno : res.eno,
                    epiTitle: res.epiTitle,
                    webtoonId : res.webtoonId
                }, function(){
                    console.log(this.state)
                })
            })
    }

    loadEpiThumbnail() {
        fetchEpiThumbnailById(parseInt(this.props.match.params.id, 10))
            .then((res) => {
                this.setState({
                    originThumbnail : res.fileName
                }, function(){
                    console.log(this.state)
                })
            });
    }

    loadEpiToon() {
        fetchEpiToon(parseInt(this.props.match.params.id, 10))
            .then((res) => {
                this.setState({
                    originMain : res.fileName
                }, function(){
                    console.log(this.state)
                })
            });
    }

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

    // submit
    uploadEditEpi() {
        try {
            if(this.state.originThumbnail !==null && this.state.originMain !== null) { // 썸네일, 웹툰 둘 다 바뀌지 않은 경우
                uploadEditEpiExceptTaM(this.state.eno, this.state.epiTitle)
            } else if(this.state.originThumbnail == null && this.state.originMain !== null) { // 썸네일 바뀐 경우
                uploadEditEpiExceptM(this.state.eno, this.state.epiTitle, this.state.thumbnail[0].originFileObj)
            } else if(this.state.originThumbnail !== null && this.state.originMain == null) {// 본 웹툰 바뀐 경우
                uploadEditEpiExceptT(this.state.eno, this.state.epiTitle, this.state.main[0].originFileObj)
            } else { // 전부 바뀐 경우
                uploadEditEpi(this.state.eno, this.state.epiTitle, this.state.thumbnail[0].originFileObj, this.state.main[0].originFileObj)
            }
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


    // 회차 제목 입력 시
    onChangeEpiTitle = (e) => {
        this.setState({epiTitle: e.target.value}, function(){
            console.log(this.state)
        })
      }

    // 에피소드 썸네일 삭제
    deleteEpiThumbnail(id){
        deleteEpiThumbnail(id)
            .then(res => {
                this.setState({originThumbnail:null}, function(){
                    console.log(this.state)
                })
            })
    }
    
    // 에피소드 메인 만화 삭제
    deleteEpiMain(id){
        deleteEpiToon(id)
            .then(res => {
                this.setState({originMain:null}, function(){
                    console.log(this.state)
                })
            })
    }

    render() {

        return (
            <div className="newEpi-container">
                <Form onSubmit={this.uploadEditEpi}>
                        <Form.Item label="연재 만화">
                            <Select name="toon" size="large"  value = {this.state.webtoonId}>
                                <Option key={1} value = {this.state.webtoonId}> {this.state.toonTitle} </Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="회차 제목">
                            <Input type="text" name="epiTitle" size="large" placeholder="Ex) 1화" value={this.state.epiTitle} onChange={this.onChangeEpiTitle}></Input>
                        </Form.Item>
                        <Form.Item label="회차 썸네일">
                            {this.state.originThumbnail !== null &&
                                <div>
                                    <span>{this.state.originThumbnail}&nbsp;</span> 
                                    <Button type="primary" size="small" onClick={() => this.deleteEpiThumbnail(parseInt(this.props.match.params.id, 10))}>Delete</Button> 
                                </div>
                            }
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
                            {this.state.originMain !== null &&
                                <div>
                                    <span>{this.state.originMain}&nbsp;</span> 
                                    <Button type="primary" size="small" onClick={() => this.deleteEpiMain(parseInt(this.props.match.params.id, 10))}>Delete</Button> 
                                </div>
                            }
                            <Dragger onChange={this.onChangeMain} beforeUpload={() => false}>
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