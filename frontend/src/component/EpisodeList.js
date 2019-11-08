import React from 'react';
import {Link} from "react-router-dom";

const EpisodeList = (props) => {
    return (
        <div className="wrap_episode">
            <ul className="list_episode">
                { props.episodes.map((episode, index) => (
                    <li key={index} className="episode_line">
                        <Link to={`/viewer/${episode.id}`} className="link_episode">
                            <div className="img_episode">
                            <img src={episode.thumbnailImage.url} alt={episode.title} />
                            </div>
                            <div className="info_episode">
                                <strong className="tit_episode">
                                    {episode.title}
                                </strong>
                                <span className="date_episode">
                                    {`${episode.dateCreated.substr(0,4)}.${episode.dateCreated.substr(4,2)}.${episode.dateCreated.substr(6,2)}`}
                                </span>
                            </div>
                            <div className="test"></div>
                        </Link>
                    </li>
                )) }
            </ul>
        </div>
    )
}

export default EpisodeList;