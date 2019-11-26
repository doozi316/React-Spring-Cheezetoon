import React, { Component } from 'react';
import { fetchToon, deleteToon } from '../util/APIAdmin';
import { Table, Divider, Button } from 'antd';
import {Link} from "react-router-dom";
import './EditToonList.css';

const columns = [
    {
      title: '제목',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => <Link to={'editEpiList/' + record.id}>{text}</Link>,
    },
    {
      title: '작가',
      dataIndex: 'artist',
      key: 'artist',
    },
    {
        title: '요일',
        dataIndex: 'day',
        key: 'day',
    },
    {
        title: '장르',
        dataIndex: 'genre',
        key: 'genre',
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
            <Button>
                <Link to={'editToon/' + record.id}>수정</Link>
            </Button>
            <Divider type="vertical" />
            <Button onClick={(e) => { this.onDelete(record.id, e); }}>
                삭제
            </Button>
          </span>
        ),
      }
  ];


class EditToonList extends Component {


    constructor(props) {
        super(props)
        this.state = {
            webtoons: []
        }

        this.loadToon = this.loadToon.bind(this);
        this.onDelete = this.onDelete.bind(this);

    }


    // 기존 만화 가져오기 
    componentDidMount() {
        this.loadToon();
    }

    loadToon() {
        fetchToon()
            .then((res) => {
                this.setState({webtoons: res}, function(){
                    console.log(this.state)
                })
            });
    }

    onDelete = (id, e) =>{
        e.preventDefault();
        deleteToon(id)
            .then(res => {
                this.setState({webtoons:this.state.webtoons.filter(webtoon => webtoon.id !== id)}, function(){
                    console.log(this.state)
                })
            })
    }

    render() {
        return (
            <div className="editList-container">
                <Table dataSource={this.state.webtoons} columns={columns} pagination={{ pageSize: 8 }}/>;
            </div>
        );
    }
}

export default EditToonList;