import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { editUserDetails } from '../redux/actions/userActions';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = {
    button: {
        float: 'right'
    }
}

class EditDetails extends Component {
    state = {
        bio: '',
        location: '',
        website: '',
        open: false
    }
    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            location: credentials.location? credentials.location : '',
            website: credentials.website ? credentials.website : ''
        })
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleOpen = () => {
        this.setState({ open: true });
        this.mapUserDetailsToState(this.props.credentials)
    }
    handleClose = () => {
        this.setState({ open: false })
    }

    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location
        }
        this.props.editUserDetails(userDetails);
        this.handleClose();
    }
    componentDidMount() {
        const {credentials} = this.props
        this.mapUserDetailsToState(credentials)
    }

    render() {
        const {classes} = this.props
        return (
            <Fragment>
                <Tooltip title="Edit details" placement="top">
                    <IconButton onClick={this.handleOpen} className={classes.button}>
                        <EditIcon color="primary" />
                    </IconButton>
                </Tooltip>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxwidth = 'sm'>
                    <DialogTitle>Edit your details</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField 
                                name="bio" 
                                type="text" 
                                label="Bio" 
                                multiline 
                                rows="3" 
                                placeholder="A short bio" 
                                className={classes.textField}
                                value={this.state.bio}
                                onChange={this.handleChange}
                                fullWidth />
                            <TextField 
                                name="location" 
                                type="text" 
                                label="Location" 
                                placeholder="Location" 
                                className={classes.textField}
                                value={this.state.location}
                                onChange={this.handleChange}
                                fullWidth />
                            <TextField 
                                name="website" 
                                type="text" 
                                label="Website"  
                                placeholder="Website" 
                                className={classes.textField}
                                value={this.state.website}
                                onChange={this.handleChange}
                                fullWidth />                                                                
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
})

export default connect(mapStateToProps, { editUserDetails } )(withStyles(styles)(EditDetails));
