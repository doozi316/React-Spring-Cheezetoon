import React, { Component } from 'react';
import axios from 'axios';
import Header from "../component/Header";
import Gnb from "../component/Gnb";
import Footer from "../component/Footer";
import WebtoonList from "../component/WebtoonList";

class Main extends Component{
    constructor(props){
        super(props);

        const query = new URLSearchParams(props.location.search); //URLSearchParmas : URL의 Query 문자열을 다루는 메소드
        const day = query.get('day'); //query 주소의 params 중 day를 가져온다 (/?day=)

        this.state = {
            day : day || 'mon', //디폴트로 월요일
            webtoonList : [] //초기 리스트는 비어있음
        };
    }

    componentDidMount(){
        this._getList();
    }

    //요일이 바뀌면 다시 setState 처리
    componentDidUpdate(prevProps){
        //라우터 마라미터 읽어오기
        let prevQuery = new URLSearchParams(prevProps.location.search);
        let prevDay = prevQuery.get('day');

        let query = new URLSearchParams(this.props.location.search);
        let day = query.get('day');

        if(prevDay !== day){
            this.setState({
                day
            })
        };
    }

    _getList(){
        //webtoon_list를 가지고 옴
        const apiUrl = '/dummy/webtoon_list.json';

        axios.get(apiUrl)
            .then(data => {
                //가지고 온 리스트를 state에 저장
                this.setState({
                    webtoonList : data.data.webtoonList
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    

    render(){

        const list = this.state.webtoonList.filter(webtoon => ( //filter 함수 : 아래의 함수에 만족하는 결과 도출
            webtoon.day === this.state.day
        ));

        
        return (
            <div>
                <Header />
                <Gnb day={this.state.day} />
                <main>
                { this.state.webtoonList.length > 0 ? (
                    <WebtoonList 
                    list={list} />
                ) : (
                    <span>
                        LOADING...
                    </span>
                )}
                </main>
                <Footer />
            </div>
        )
    }
}

export default Main;