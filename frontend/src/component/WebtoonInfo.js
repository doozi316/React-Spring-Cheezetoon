
import React, { Component } from 'react';
import "./WebtoonInfo.css";

class WebtoonInfo extends Component {
    constructor(props){
        super(props);

        this.state = {
            webtoon : this.props.webtoon
        };
    }
    render() {
        console.log(this.state.webtoon);
        return (
            <div className="wrap_webtoon">
                <img src={this.state.webtoon.toonThumbnail.fileUri} className="img_webtoon" alt={this.state.webtoon.title} />
                <div className="info_webtoon">
                    <strong className="tit_webtoon">{this.state.webtoon.title}</strong>
                    <span className="txt_genre">{this.state.webtoon.genre}</span>
                </div>
                
            </div>
        );
    }
}

export default WebtoonInfo;

