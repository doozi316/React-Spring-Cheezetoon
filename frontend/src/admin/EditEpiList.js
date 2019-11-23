import React, { Component } from 'react';
import { fetchEpi } from '../util/APIAdmin';
import { Table, Divider, Button } from 'antd';
import {Link} from "react-router-dom";
import './EditEpiList.css';


const columns = [
    {
      title: '회차 제목',
      dataIndex: 'epiTitle',
      key: 'epiTitle',
      render: text => <a>{text}</a>,
    },
    {
        title: '업데이트',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Button>수정</Button>
            <Divider type="vertical" />
            <Button>삭제</Button>
          </span>
        ),
      }
  ];



class EditEpiList extends Component {
    constructor(props){
        super(props);

        this.state = {
            webtoonId : parseInt(props.match.params.id, 10), // webtoonId를 얻어서 숫자로 변환
            epiList : [] //에피소드 리스트
        };
        this.loadEpi = this.loadEpi.bind(this);
    }



    // 에피소드 가져오기 
    componentDidMount() {
        this.loadEpi();
    }

    loadEpi() {
        fetchEpi()
            .then((res) => {
                this.setState({epiList: res.filter(e=>(
                    e.webtoonId === this.state.webtoonId
                ))}, function(){
                    console.log(this.state)
                })
            });
    }


    render() {
        return (
            <div className="editEpiList-container">
                 <Table dataSource={this.state.epiList} columns={columns} />;
            </div>
        );
    }
}

export default EditEpiList;