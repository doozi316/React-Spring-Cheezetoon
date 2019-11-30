import React, { Component } from 'react';
import {fetchEpiById} from '../util/APIAdmin';
import "./Viewer.css";

class Viewer extends Component{
    constructor(props){
        super(props)

        this.state = {
            episode : {}
        };
    }

    componentDidMount(){
        this._getEpisodeList();
    }

    _getEpisodeList(){
    
        fetchEpiById(parseInt(this.props.match.params.episodeId, 10))
            .then(res => {
                this.setState({
                    episode : res
                }, function(){
                    console.log(this.state.episode);
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render(){
        const episode = this.state.episode;
        return (

            <div className="wrap_viewer">
            { episode.eno ? (
                <div>
                    <div className="top_viewer">
                        {episode.epiTitle}
                        
                    </div>
                    <div className="wrap_images">
                        <img src={episode.epiToon.fileUri} alt={episode.epiTitle} />
                    </div>
                </div>
            ) : (
                <span>LOADING...</span>
            ) }
            </div>

        )
    }
}

export default Viewer;