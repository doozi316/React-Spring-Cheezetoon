import React, { Component } from 'react';
import {Link} from "react-router-dom";
import "./EpisodeList.css";


class EpisodeList extends Component {
    constructor(props){
        super(props);

        this.state = {
            episodes : this.props.episodes
        };
    }
    render() {
        
        return (
            <div className="wrap_episode">
                <ul className="list_episode">
                    { this.state.episodes.map((episode, index) => (
                        <div className="link_epi">
                            <li key={index} className="episode_line">
                                <Link to={`/viewer/${episode.eno}`} className="link_episode">
                                    <div className="img_episode">
                                        <img src={episode.epiThumbnail.fileUri} alt={episode.epiTitle} className="epi_img"/>
                                    </div>
                                    <div className="info_episode">
                                        <strong className="tit_episode">
                                            {episode.epiTitle}
                                        </strong>
                                        <span className="date_episode">
                                            {`${episode.createdAt.substr(0,10)}`}
                                        </span>
                                        <span className="avgStar">
                                            평점 : {Number((Object.values(episode.rate).reduce((acc, current)=> acc + current.rate, 0))/Object.values(episode.rate).length).toFixed(1)}
                                        </span>
                                    </div>
                                </Link>
                            </li>
                        </div>
                        )) }
                </ul>
            </div>
        );
    }
}

export default EpisodeList;