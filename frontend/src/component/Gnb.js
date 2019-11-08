import React from 'react';
import {Link} from "react-router-dom";


const days = [ { eng :'mon', kor:'월요일'},
                    { eng:'tue', kor:'화요일'},
                    { eng:'wed', kor:'수요일'},
                    { eng:'thu', kor:'목요일'},
                    { eng:'fri', kor:'금요일'},
                    { eng:'sat', kor:'토요일'},
                    { eng:'sun', kor:'일요일'},
                ];

const genres = [{name : '로맨스'},
                {name : '스릴러'},
                {name : '판타지'}

];

const Submenu_day =(props) =>(
      <ul className="nav__submenu">
        {days.map((day, index)=>(
            <li key={index} className="nav__submenu-item">
                <Link to={"/?day=" + day.eng}
                      className="a"
                      
                >{day.kor}</Link>
            </li>
        )

        )}
    </ul>
)

const Submenu_genre =(props) =>(
  <ul className="nav__submenu">
    {genres.map((genre, index)=>(
        <li key={index} className="nav__submenu-item">
            <Link to="/" className="a">{genre.name}</Link>
        </li>
    )

    )}
</ul>
)


class Gnb extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        showAboutDay: false
      };
    }
    dayHandleHover = (event) => {
      this.setState({ showAboutDay: true });
    };
    
    dayHandleLeave = (event) => {
      this.setState({ showAboutDay: false });
    };
    
    genHandleHover = (event) => {
      this.setState({ showAboutGen: true });
    };
    
    genHandleLeave = (event) => {
      this.setState({ showAboutGen: false });
    };
    
    render() {
      return (
          <div id="menu-container">
        <nav className="nav">
          <ul className="nav__menu">
            <li className="nav__menu-item">
              <Link to="/" className="a">연재홈</Link>
            </li>
            <li className="nav__menu-item" onMouseLeave={this.dayHandleLeave}>
              <Link onMouseEnter={this.dayHandleHover} className="a">
                요일별
              </Link>
              <div className="submenu-container">
                
                  { this.state.showAboutDay && <Submenu_day /> }
                
              </div>
            </li>
  
            <li className="nav__menu-item" onMouseLeave={this.genHandleLeave}>
              <Link onMouseEnter={this.genHandleHover} className="a">
                장르별
              </Link>
              <div className="submenu-container">
                
                  { this.state.showAboutGen && <Submenu_genre /> }
                
              </div>
            </li>
            <li className="nav__menu-item">
              <Link className="a">선호작품</Link>
            </li>
          </ul>
        </nav></div>
      )
    }
  }


export default Gnb;



