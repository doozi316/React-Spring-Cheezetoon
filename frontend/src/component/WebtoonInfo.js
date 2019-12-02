
import React, { Component } from 'react';
import "./WebtoonInfo.css";
import {Button, notification} from 'antd';
import {saveFav, deleteFav, fetchFav } from '../util/APIAdmin';

class WebtoonInfo extends Component {
    constructor(props){
        super(props);

        this.state = {
            webtoon : this.props.webtoon,
            username : this.props.username,
            fav:null
        };
        this.uploadFav = this.uploadFav.bind(this);
        this.loadFav = this.loadFav.bind(this);
        this.deleteFav = this.deleteFav.bind(this);
    }

    uploadFav(){
            try{
                saveFav(this.state.webtoon.tno, this.state.username, this.state.webtoon.title)
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
    
    componentDidMount(){
        this.loadFav();
    }

    loadFav(){
        fetchFav(this.state.webtoon.tno, this.state.username)
            .then(res => {
                this.setState({
                fav : res
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    deleteFav(){
        try{
        deleteFav(this.state.webtoon.tno, this.state.username)
            .then(res => {
                this.setState({
                fav : null
                });
            })
            notification.success({
                message: 'Cheeze Toon',
                description: "정상적으로 삭제되었습니다.",
            });
        } catch(error){
            notification.error({
                message: 'Cheeze Toon',
                description: error.message || '다시 시도해주세요.'
            });
        }
    }

    render() {
        console.log(this.state.username);
        return (
            <div className="wrap_webtoon">
                <img src={this.state.webtoon.toonThumbnail.fileUri} className="img_webtoon" alt={this.state.webtoon.title} />
                <div className="info_webtoon">
                    <strong className="tit_webtoon">{this.state.webtoon.title}</strong>
                    <span className="txt_genre">{this.state.webtoon.genre}</span>
                    <div className="favButton_container">
                        {this.state.fav ? 
                        <Button type="primary" onClick={this.deleteFav}>선호작 해제</Button> :
                        <Button type="primary" onClick={this.uploadFav}>선호작 등록</Button>}
                    </div>
                </div>
                
            </div>
        );
    }
}

export default WebtoonInfo;

