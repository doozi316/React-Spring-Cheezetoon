import React, { Component } from 'react';
import WebtoonList from "../component/WebtoonList";
import {fetchToon} from "../util/APIAdmin";

class Main extends Component{
    constructor(props){
        super(props);

        const query = new URLSearchParams(props.location.search); //URLSearchParmas : URL의 Query 문자열을 다루는 메소드
        const day = query.get('day'); //query 주소의 params 중 day를 가져온다 (/?day=)

        this.state = {
            day : day || 'mon', 
            webtoonList : [] 
          
        };
    }

    componentDidMount(){
        this._getList();
    }

    
    componentDidUpdate(prevProps){
        
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

        fetchToon()
            .then((res) => {
                this.setState({
                    webtoonList : res
                })
        });
    }

    

    render(){
        const list = this.state.webtoonList.filter(webtoon => ( 
            webtoon.day === this.state.day 
        ));
        
        console.log("list :");
        console.log(list);

        return (
            <div>
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
            </div>
        )
    }
}

export default Main;