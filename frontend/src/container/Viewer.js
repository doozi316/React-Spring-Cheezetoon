import React, { Component } from 'react';
import {fetchEpiById, uploadComment, uploadEditComment, uploadRate, uploadEditRate} from '../util/APIAdmin';
import { Form, Button, Input, Comment, List, Rate, notification} from 'antd';
import "./Viewer.css";
import { getComment, deleteComment, fetchRate, getAvgRate} from '../util/APIUtils';
const { TextArea } = Input;

class Viewer extends Component{
    constructor(props){
        super(props)

        this.state = {
            episode : {},
            comment : '',
            username : this.props.username,
            comments :[],
            cno:null,
            editComment:'',
            rate : null,
            fetchRate:null,
            avgRate:null,
            showInput:false
        }
        this.uploadComment = this.uploadComment.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onEditChange = this.onEditChange.bind(this);
        this.editComment = this.editComment.bind(this);
        this._getEpisodeList = this._getEpisodeList.bind(this);
        this.handleRate =  this.handleRate.bind(this);
        this.uploadRate = this.uploadRate.bind(this);
        this.loadRate= this.loadRate.bind(this);
        this.editRate = this.editRate.bind(this);
        this.handleFetchRate = this.handleFetchRate.bind(this);
        this.loadAvg = this.loadAvg.bind(this);
    }

    componentDidMount(){
        this._getEpisodeList();
        this.loadComment();
        this.loadRate();
        this.loadAvg();
    }

    loadAvg(){
        getAvgRate(parseInt(this.props.match.params.episodeId, 10))
            .then(res => {
                this.setState({
                   avgRate : res
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    _getEpisodeList(){
    
        fetchEpiById(parseInt(this.props.match.params.episodeId, 10))
            .then(res => {
                this.setState({
                    episode : res
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    onChange=(e)=>{
        this.setState({comment:e.target.value});
    }

    onEditChange=(e)=>{
        this.setState({editComment:e.target.value});
    }

    uploadComment(){
        uploadComment(parseInt(this.props.match.params.episodeId, 10), this.state.username, this.state.comment)
    }

    editComment(id){
        uploadEditComment(id, this.state.editComment)
            .then(res=>(
                this.setState({showInput:false}, function(){
                    window.location.reload();
                })
            ))
        
    }

    onEdit(){
        this.setState({
            showInput:true
        })
    }

    loadComment(){
        getComment(parseInt(this.props.match.params.episodeId, 10))
            .then((res) => {
                this.setState({
                    comments : res
                    })
        });
    }

    onDelete = (cno) =>{
        deleteComment(cno)
            .then(res => {
                this.setState({comments:this.state.comments.filter(comment => comment.cno !== cno)})
            })
    }

    handleRate = value =>{
        this.setState({rate:value});
    }

    handleFetchRate = value =>{
        this.setState({fetchRate:value});
    }
    uploadRate(){
        try{
            uploadRate(parseInt(this.props.match.params.episodeId, 10), this.state.username, this.state.rate)
                .then(function(){
                    window.location.reload();
                })
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
    
    editRate(){
        try{
            uploadEditRate(parseInt(this.props.match.params.episodeId, 10), this.state.username, this.state.fetchRate)
                .then(function(){
                    window.location.reload();
                })
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

    loadRate(){
        fetchRate(parseInt(this.props.match.params.episodeId, 10), this.state.username)
            .then(res => {
                this.setState({
                    fetchRate : res.rate
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render(){
        const episode = this.state.episode;
        var num = Number(this.state.avgRate);

        return (
            <div>
                <div className="wrap_viewer">
                    { episode.eno ? (
                        <div>
                            <div className="top_viewer">
                                {episode.epiTitle}
                                
                            </div>
                            <div className="wrap_images">
                                <img src={episode.epiToon.fileUri} alt={episode.epiTitle} />
                            </div>
                        </div>
                    ) : (
                        <span>LOADING...</span>
                    ) }
                </div>
                
                <div className="comment_container">
                    <div>
                        <span className="avgRate"> 평점 : </span>
                        <Rate disabled allowHalf style={{fontSize:36}} value={this.state.avgRate} className="avgStar"/>
                        {num.toFixed(1)}
                    </div>
                    <div className="rating_container">
                        {this.state.fetchRate!==null ? <Rate onChange={this.handleFetchRate} value={this.state.fetchRate}/> :
                        <Rate onChange={this.handleRate} value={this.state.rate}/>}
                        {this.state.fetchRate ? <Button type="primary" size="small" onClick={this.editRate}>별점 수정</Button> :
                        <Button type="primary" size="small" onClick={this.uploadRate}>별점 등록</Button>}
                    </div>
                    <Form onSubmit={this.uploadComment}>
                        <Form.Item>
                            <TextArea rows={4} onChange={this.onChange} value={this.state.comment} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" className="commentButton" htmlType="submit" type="primary">
                            Add Comment
                        </Button>
                        </Form.Item>
                    </Form>
                    <div>
                    <List
                        pagination={{pageSize: 10}}
                        className="comment-list"
                        header={`${this.state.comments.length} replies`}
                        itemLayout="horizontal"
                        dataSource={this.state.comments}
                        renderItem={item => (
                        <li>
                            <Comment
                            author={item.user}
                            content={item.comment}
                            datetime={item.updatedAt}
                            />
                            {item.user==this.state.username ? 
                            <div>
                                <Button onClick={this.onEdit}>수정</Button>
                                {/* 리스트 위치파악하기 */}
                                {this.state.showInput?
                                <div className="editForm-container">
                                    <Form>
                                        <Form.Item>
                                            <TextArea rows={4} onChange={this.onEditChange} defaultValue={item.comment} /> 
                                        </Form.Item>
                                        <Form.Item>
                                            <Button type="primary" className="commentButton" onClick={()=>this.editComment(item.cno)}>
                                            Add Comment
                                        </Button>
                                        </Form.Item>
                                    </Form>
                                </div> : null}
                                <Button onClick={()=>this.onDelete(item.cno)}>삭제</Button>
                            </div> : null}
                        </li>
                        )}
                    />
                    </div>

                </div>
            </div>
        )
    }
}

export default Viewer;