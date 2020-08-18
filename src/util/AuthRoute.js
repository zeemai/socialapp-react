import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import PropType from 'prop-types';

const AuthRoute = ({ component: Component, authenticated, ...rest}) => (
    <Route  
    {...rest}
    render = { (props) => authenticated === true ? <Redirect to='/' /> : <Component {...props} />} />
)

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

AuthRoute.PropType = {
    user: PropType.object.isRequired
}

export default connect(mapStateToProps)(AuthRoute);
