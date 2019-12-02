import React, { Component } from 'react';
import NotFound from '../../common/NotFound';
import ServerError from '../../common/ServerError';
import LoadingIndicator  from '../../common/LoadingIndicator';
import { Avatar, Table, Button } from 'antd';
import { getAvatarColor } from '../../util/Colors';
import { getUserProfile } from '../../util/APIUtils';
import {fetchFav, deleteFavById} from '../../util/APIAdmin';
import {Link} from "react-router-dom";
import "./Profile.css";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isLoading: false,
            favs:[]
        }
        this.loadUserProfile = this.loadUserProfile.bind(this);
        this.loadFav = this.loadFav.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    onDelete(fno){
        deleteFavById(fno)
            .then(res => {
                this.setState({favs:this.state.favs.filter(fav => fav.fno !== fno)})
            })
    }

    loadFav(username){
        fetchFav(username)
            .then(res => {
                this.setState({
                favs : res
                }, function(){
                    console.log(res)
                });
            })
            .catch(error => {
                console.log(error);
            });
    }


    loadUserProfile(username) {
        this.setState({
            isLoading: true
        });

        getUserProfile(username)
        .then(response => {
            this.setState({
                user: response,
                isLoading: false
            }, function(){
                console.log(response);
            });
        }).catch(error => {
            if(error.status === 404) {
                this.setState({
                    notFound: true,
                    isLoading: false
                });
            } else {
                this.setState({
                    serverError: true,
                    isLoading: false
                });        
            }
        });        
    }

    componentDidMount() {
        const username = this.props.match.params.username;
        this.loadUserProfile(username);
        this.loadFav(username);
    }

    componentDidUpdate(nextProps) {
        if(this.props.match.params.username !== nextProps.match.params.username) {
            this.loadUserProfile(nextProps.match.params.username);
        }        
    }

    render() {

        if(this.state.isLoading) {
            return <LoadingIndicator />;
        }

        if(this.state.notFound) {
            return <NotFound />;
        }

        if(this.state.serverError) {
            return <ServerError />;
        }

        const columns =[
            {
                title: '제목',
              dataIndex: 'title',
              key: 'title',
              render: (text, record) => <Link to={'/webtoon/' + record.webtoonId}>{text}</Link>
            },
            {
                title: 'Action',
                key: 'action',
                className: 'action',
                render: (text, record) => (
                  <span>
                    <Button onClick={()=>this.onDelete(record.fno)}>
                        삭제
                    </Button>
                  </span>
                ),
              }
        ]
        return (
            <div className="profile">
                { 
                    this.state.user ? (
                        <div className="profile_container">
                            <div className="user-profile">
                                <div className="user-details">
                                    <div className="user-avatar">
                                        <Avatar className="user-avatar-circle" style={{ backgroundColor: getAvatarColor(this.state.user.name)}}>
                                            {this.state.user.name[0].toUpperCase()}
                                        </Avatar>
                                    </div>
                                    <div className="user-summary">
                                        <div className="full-name">{this.state.user.name}</div>
                                        <div className="username">@{this.state.user.username}</div>
                                    </div>
                                </div> 
                            </div>  
                            <div className="favTable_container">
                                <div className="favTitle_container">
                                    <span className="favTitle">선호 작품 목록</span>
                                </div>
                                <Table dataSource={this.state.favs} columns={columns} pagination={{pageSize:10}}/>
                            </div>
                        </div>
                    ): null               
                }
            </div>
        );
    }
}

export default Profile;