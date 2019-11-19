import React, { Component } from 'react';
import {
  Route,
  withRouter,
  Switch
} from 'react-router-dom';

import { getCurrentUser } from './util/APIUtils';
import { ACCESS_TOKEN } from './constants';

import './App.css';
import Main from "./container/Main";
import WebtoonHome from "./container/WebtoonHome";
import Viewer from "./container/Viewer";

import Login from "./user/login/Login";
import Signup from "./user/signup/Signup";
import Profile from './user/profile/Profile';
import AppHeader from './common/AppHeader';
import NotFound from './common/NotFound';
import LoadingIndicator from './common/LoadingIndicator';
import AdminMenu from './admin/AdminMenu';
import PrivateRoute from './common/PrivateRoute';
import NewAdd from './admin/NewAdd';

import { Layout, notification } from 'antd';
const { Content } = Layout;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          currentUser: null,
          isAuthenticated: false,
          isLoading: false
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.loadCurrentUser = this.loadCurrentUser.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

        notification.config({
            placement: 'topRight',
            top: 70,
            duration: 3,
        });    
    }

    loadCurrentUser() {
        this.setState({
          isLoading: true
        });
        getCurrentUser()
        .then(response => {
          this.setState({
            currentUser: response,
            isAuthenticated: true,
            isLoading: false
          });
        }).catch(error => {
          this.setState({
            isLoading: false
          });  
        });
      }

      componentDidMount() {
        this.loadCurrentUser();
      }
    
      handleLogout(redirectTo="/", notificationType="success", description="로그아웃 되었습니다.") {
        localStorage.removeItem(ACCESS_TOKEN);
    
        this.setState({
          currentUser: null,
          isAuthenticated: false
        });
    
        this.props.history.push(redirectTo);
        
        notification[notificationType]({
          message: 'Cheeze Toon',
          description: description,
        });
      }

      handleLogin() {
        notification.success({
          message: 'Cheeze Toon',
          description: "로그인 되었습니다.",
        });
        this.loadCurrentUser();
        this.props.history.push("/");
      }

    render() {
        if(this.state.isLoading) {
            return <LoadingIndicator />
          }
        return (
            <Layout className="app-container">
                <AppHeader isAuthenticated={this.state.isAuthenticated} 
                    currentUser={this.state.currentUser} 
                    onLogout={this.handleLogout} />

            <Content className="app-content">
                <div className="container">
                  <Switch>
                        <Route exact path="/" component={Main} />
                        {/* ":" 뒤에 있는 것은 prams */}
                        <Route path="/webtoon/:webtoonId" component={WebtoonHome} /> 
                        <Route path="/viewer/:episodeId" component={Viewer} />
                        <Route path="/login" 
                        render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
                        <Route path="/signup" component={Signup}></Route>
                        <Route path="/users/:username" 
                        render={(props) => <Profile isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} {...props}  />}>
                        </Route>
                        <PrivateRoute authenticated={this.state.isAuthenticated} path="/newAdd" component={NewAdd} handleLogout={this.handleLogout}></PrivateRoute>
                        <PrivateRoute authenticated={this.state.isAuthenticated} path="/adminmenu" component={AdminMenu} handleLogout={this.handleLogout}></PrivateRoute>
                        <Route component={NotFound}></Route>
                  </Switch>
                </div>
            </Content>
        </Layout>);
    }
}
export default withRouter(App);

