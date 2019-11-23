import React, { Component } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import './AdminMenu.css';

class AdminMenu extends Component {
    render() {
        return (
            <div className="admin-menu-container">
                <h2>관리자님, 환영합니다</h2>
                <Button type="primary" block size="large">
                    <Link to="/newAdd">
                        새 웹툰 등록
                    </Link>
                </Button>
                <Button type="primary" block size="large">
                    <Link to="/newEpi">
                    에피소드 업로드
                    </Link>
                </Button>
                <Button type="primary" block size="large">
                    <Link to="/editList">
                    기존 웹툰 수정
                    </Link>
                </Button>
            </div>
        );
    }
}

export default AdminMenu;