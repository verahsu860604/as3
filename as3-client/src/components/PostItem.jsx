import React from 'react';
import PropTypes from 'prop-types';
import {
    Tooltip
} from 'reactstrap';
import {connect} from 'react-redux';
import moment from 'moment';

import {getMoodIcon} from 'utilities/weather.js';
import {createVote, setTooltipToggle, toggleTooltip} from 'states/post-actions.js';

import './PostItem.css';

class PostItem extends React.Component {
    static propTypes = {
        id: PropTypes.number,
        mood: PropTypes.string,
        text: PropTypes.string,
        clearVotes: PropTypes.number,
        cloudsVotes: PropTypes.number,
        drizzleVotes: PropTypes.number,
        rainVotes: PropTypes.number,
        thunderVotes: PropTypes.number,
        snowVotes: PropTypes.number,
        windyVotes: PropTypes.number,
        tooltipOpen: PropTypes.bool,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleTooltipToggle = this.handleTooltipToggle.bind(this);
        this.handleVote = this.handleVote.bind(this);
    }

    render() {
        const {id, mood, text, ts, clearVotes, cloudsVotes, drizzleVotes, rainVotes, thunderVotes, snowVotes, windyVotes, tooltipOpen} = this.props;

        return (
            <div className='post-item d-flex flex-column' onClick={this.handleClick}>
                <div className='post d-flex'>
                    <div className='mood'><i className={getMoodIcon(mood)}></i></div>
                    <div className='wrap'>
                        <div className='ts'>{moment(ts * 1000).calendar()}</div>
                        <div className='text'>{text}</div>
                    </div>
                </div>
                <div className='vote d-flex justify-content-end'>
                    <div className='vote-results'>
                        {clearVotes > 0 && (<span><i className={getMoodIcon('Clear')}></i>&nbsp;{clearVotes}&nbsp;&nbsp;</span>)}
                        {cloudsVotes > 0 && <span><i className={getMoodIcon('Clouds')}></i>&nbsp;{cloudsVotes}&nbsp;&nbsp;</span>}
                        {drizzleVotes > 0 && <span><i className={getMoodIcon('Drizzle')}></i>&nbsp;{drizzleVotes}&nbsp;&nbsp;</span>}
                        {rainVotes > 0 && <span><i className={getMoodIcon('Rain')}></i>&nbsp;{rainVotes}&nbsp;&nbsp;</span>}
                        {thunderVotes > 0 && <span><i className={getMoodIcon('Thunder')}></i>&nbsp;{thunderVotes}&nbsp;&nbsp;</span>}
                        {snowVotes > 0 && <span><i className={getMoodIcon('Snow')}></i>&nbsp;{snowVotes}&nbsp;&nbsp;</span>}
                        {windyVotes > 0 && <span><i className={getMoodIcon('Windy')}></i>&nbsp;{windyVotes}&nbsp;&nbsp;</span>}
                    </div>
                    <div className='vote-plus'>
                        <i id={`post-item-vote-${id}`} className='fa fa-plus'></i>
                    </div>
                </div>
                <Tooltip placement='left' isOpen={tooltipOpen} autohide={false} target={`post-item-vote-${id}`} toggle={this.handleTooltipToggle}>
                    <i className={`vote-tooltip ${getMoodIcon('Clear')}`} onClick={() => this.handleVote('Clear')}></i>&nbsp;
                    <i className={`vote-tooltip ${getMoodIcon('Clouds')}`} onClick={() => this.handleVote('Clouds')}></i>&nbsp;
                    <i className={`vote-tooltip ${getMoodIcon('Drizzle')}`} onClick={() => this.handleVote('Drizzle')}></i>&nbsp;
                    <i className={`vote-tooltip ${getMoodIcon('Rain')}`} onClick={() => this.handleVote('Rain')}></i>&nbsp;
                    <i className={`vote-tooltip ${getMoodIcon('Thunder')}`} onClick={() => this.handleVote('Thunder')}></i>&nbsp;
                    <i className={`vote-tooltip ${getMoodIcon('Snow')}`} onClick={() => this.handleVote('Snow')}></i>&nbsp;
                    <i className={`vote-tooltip ${getMoodIcon('Windy')}`} onClick={() => this.handleVote('Windy')}></i>
                </Tooltip>
            </div>
        );
    }

    handleClick() {
        this.props.dispatch(setTooltipToggle(this.props.id, true));
    }

    handleTooltipToggle() {
        this.props.dispatch(toggleTooltip(this.props.id));
    }

    handleVote(vote) {
        this.props.dispatch(createVote(this.props.id, vote));
        this.props.dispatch(setTooltipToggle(this.props.id, false));
    }
}

export default connect((state, ownProps) => ({
    tooltipOpen: state.postItem.tooltipOpen[ownProps.id] ? true : false
}))(PostItem);
