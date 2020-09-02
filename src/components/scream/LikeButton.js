import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../../redux/actions/dataActions';


export class LikeButton extends Component {

    likedScream = () => {
        if(this.props.user.likes && this.props.user.likes.find(like => like.screamId === this.props.screamId)){
            return true;
        } else {
            return false;
        }
    }

    likeScream = () => {
        this.props.likeScream(this.props.screamId)
    }

    unlikeScream = () => {
        this.props.unlikeScream(this.props.screamId)
    }

    render() {
        const { authenticated } = this.props.user;

        const likeButton = !authenticated ? (
            <Tooltip title="Like">
                <IconButton>
                    <Link to="/login">
                        <FavoriteBorder color="primary" />
                    </Link>
                </IconButton>
            </Tooltip>
        ) : (
            this.likedScream() ? (
                <Tooltip title="Undo Like" onClick={this.unlikeScream} >
                    <IconButton>
                        <FavoriteIcon color="primary" />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Like" onClick={this.likeScream} >
                    <IconButton>
                        <FavoriteBorder color="primary" />
                    </IconButton>
                </Tooltip>
            )
        )
        return likeButton;
    }
}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired
  };

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    likeScream,
    unlikeScream
}

export default connect(
    mapStateToProps,
    mapActionsToProps
  )(LikeButton);