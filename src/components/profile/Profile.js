import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import MuiLink from '@material-ui/core/Link';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import dayjs from 'dayjs';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Tooltip from '@material-ui/core/Tooltip';
import { logoutUser, uploadImage } from '../../redux/actions/userActions';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import EditDetails from './EditDetails';
import ProfileSkeleton from '../../util/ProfileSkeleton';

const styles = {
    paper: {
        padding: 20
      },
    profile: {
    '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%'
        }
    },
    '& .profile-image': {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
    },
    '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
        verticalAlign: 'middle'
        },
        '& a': {
        color: '#00bcd4'
        }
    },
    '& hr': {
        border: 'none',
        margin: '0 0 10px 0'
    },
    '& svg.button': {
        '&:hover': {
        cursor: 'pointer'
        }
    }
    },
    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px'
      }
    }
}

class Profile extends Component {

    handleImageChange = (event) => {
        const image = event.target.files[0];
        // send this pic to server
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);
    }

    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    }

    handleLogout = () => {
        this.props.logoutUser();
    }

    render() {
        const { classes, 
                user: { credentials: {handle, createdAt, bio, imageUrl, location, website }, 
                        loading,
                        authenticated
                        //test
                         }
                    } = this.props; 
        
        let profileMarkup = !loading ? (
            authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" className="profile-image"/>
                        <input type="file" id="imageInput" hidden="hidden" onChange={this.handleImageChange} />
                        <Tooltip title="Edit profile picture" placement="top">
                            <IconButton onClick={this.handleEditPicture} className="button">
                                <AddAPhotoIcon color="primary"/>
                            </IconButton>                            
                        </Tooltip>
                    </div>
                    <hr />
                    <div className="profile-details">
                        <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                            @{handle}
                        </MuiLink>
                        <hr />
                        {bio && <Typography variant="body2">{bio}</Typography>}
                        <hr />
                        {location && (
                            <Fragment>
                            <LocationOn color="primary" /> <span>{location}</span>
                            <hr />
                            </Fragment>
                        )}
                        {website && (
                            <Fragment>
                            <LinkIcon color="primary" />
                            <a href={website} target="_blank" rel="noopener noreferrer">
                                {' '}
                                {website}
                            </a>
                            <hr />
                            </Fragment>
                        )}                    
                        <CalendarToday color="primary" />{' '}
                        <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                    </div>

                    <Tooltip title="Logout" placement="top">
                        <IconButton onClick={this.handleLogout}>
                            <KeyboardReturn color="primary" />
                        </IconButton>
                    </Tooltip>
                    <EditDetails />
                </div>
            </Paper>
        ) : (

        <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
            No profile found, please login again
        </Typography>
        <div className={classes.buttons}>
            <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
            >
            Login
            </Button>
            <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/signup"
            >
            Signup
            </Button>
        </div>
        </Paper>

        )) : (
            <ProfileSkeleton />
        )

        return profileMarkup
    }
}

const mapStateToProps = (state) =>({
    user: state.user
})

const mapActionsToProps = {
    logoutUser,
    uploadImage
}

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired
  };

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));
