import React, { Component } from 'react';
import { fetchEpi } from '../util/APIAdmin';
import { Table, Divider, Button } from 'antd';
import {Link} from "react-router-dom";
import './EditEpiList.css';



class EditEpiList extends Component {
    constructor(props){
        super(props);

        this.state = {
            epiList : [] //에피소드 리스트
        };
        this.loadEpi = this.loadEpi.bind(this);
    }



    // 에피소드 가져오기 
    componentDidMount() {
        this.loadEpi();
    }

    loadEpi() {
        fetchEpi(parseInt(this.props.match.params.id, 10))
            .then((res) => {
                this.setState({
                    epiList : res
                }, function(){
                    console.log(this.state.epiList)
                })
            });
    }


    render() {
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
        return (
            <div className="editEpiList-container">
                 <Table dataSource={this.state.epiList} columns={columns} />
            </div>
        );
    }
}

export default EditEpiList;