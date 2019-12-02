import React, { Component } from 'react';
import WebtoonInfo from "../component/WebtoonInfo";
import EpisodeList from "../component/EpisodeList";
import {fetchEpi, fetchToonById} from "../util/APIAdmin";

class WebtoonHome extends Component{
    constructor(props){
        super(props);

        this.state = {
            webtoon : {}, //웹툰 상세 객체
            episodeList : [], //에피소드 리스트
            username : this.props.username
        };
    }

    componentDidMount(){
        this._getWebtoon();
        this._getEpisodeList();
    }

    _getWebtoon(){
    
        fetchToonById(parseInt(this.props.match.params.webtoonId, 10))
            .then(res => {
                //웹툰들 중 ID가 일치하는 웹툰을 state.webtoon에 저장
                this.setState({
                    webtoon : res
                }, function(){
                    console.log(this.state);
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    _getEpisodeList(){

        fetchEpi(parseInt(this.props.match.params.webtoonId, 10))
            .then(res => {
                //웹툰ID가 일치하는 에피소들만 state.episodeList에 저장
                this.setState({
                    episodeList : res
                }, function(){
                    console.log(this.state);
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render(){
        return (
            <div>
                <main>
                { this.state.webtoon.tno ? (
                    <WebtoonInfo webtoon={this.state.webtoon} username={this.state.username}/>
                ) : (
                    <span>LOADING...</span>
                ) }

                { this.state.episodeList.length > 0 ? (
                    <EpisodeList episodes={this.state.episodeList} />
                ) : (
                    <span>LOADING...</span>
                ) }
                </main>
            </div>
        )
    }
}

export default WebtoonHome;