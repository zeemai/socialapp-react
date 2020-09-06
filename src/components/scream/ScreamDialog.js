import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import { connect } from 'react-redux';
import { getScream, clearErrors } from '../../redux/actions/dataActions';
import LikeButton from './LikeButton';
import ChatIcon from '@material-ui/icons/Chat';
import Comments from './Comments';
import CommentForm from './CommentForm';

const styles = {
    separator: {
        border: 'none',
        margin: 4
    },
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20
    },
    closeButton: {
        position: 'absolute',
        left: '90%',
        top: '4%'
    },
    expandButton: {
        position: 'absolute',
        left: '90%'
    },
    separatorComment: {
        width: '100%',
        borderBottom: '1px solid egba(0,0,0,0.1)',
        marginBottom: 20
    }
}

class ScreamDialog extends Component {
    state = {
        open: false
    }
    handleOpen = () => {
        this.setState({
            open: true
        })
        this.props.getScream(this.props.screamId)
    }
    handleClose = () => {
        this.setState({
            open: false
        })
        this.props.clearErrors();
    }
    render() {
        const { classes, scream: { screamId, body, createdAt, likeCount, commentCount, userImage, userHandle, comments}, UI: {loading} } = this.props;
        const dialogMarkup = loading ? (
            <CircularProgress size={150} thickness={2}/>
        ) : (
            <Grid container spacing={16}>
                <Grid item sm={5}>
                    <img src={userImage} alt="Profile" className={classes.profileImage} />
                </Grid>
                <Grid item sm={7}>
                    <Typography component={Link} color="primary" variant="h5" to={`users/${userHandle}`}>
                        @{userHandle}
                    </Typography>
                    <hr className={classes.separator} />
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.separator} />
                    <Typography variant="body1">
                        {body}
                    </Typography>
                    <LikeButton screamId={screamId} />
                    <span>{likeCount} Likes</span>
                    <Tooltip title="comments" >
                        <IconButton>
                            <ChatIcon color="primary" />
                        </IconButton>
                    </Tooltip>
                    <span>{commentCount} Comments</span>
                </Grid>
                <hr className={classes.separatorComment} />
                <CommentForm screamId={screamId} />
                <Comments comments={comments} />
            </Grid>
        )
        
        return (
            <Fragment>
                <Tooltip title="Expand post" onClick={this.handleOpen} className={classes.expandButton}>
                    <IconButton>
                        <UnfoldMoreIcon color="primary" />
                    </IconButton>
                </Tooltip>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <Tooltip title="Close" onClick={this.handleClose} className={classes.closeButton}>
                        <IconButton>
                            <CloseIcon />
                        </IconButton>
                    </Tooltip>
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>              
                </Dialog>
            </Fragment>
        )
    }
}

ScreamDialog.propTypes = {
    getScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    scream: state.data.scream,
    UI: state.UI
  });
  
const mapActionsToProps = {
    getScream,
    clearErrors
  };


export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ScreamDialog))