import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from 'pages/Login/Login';

import NominationForm from 'pages/USER/NominationForm/NominationForm';
import Home from 'pages/USER/Home/Home';
import Objection from 'pages/USER/Objection/Objection'
import Profile from 'pages/USER/Profile/Profile'

import Admin_home from 'pages/ADMIN/Home/Home'
import Admin_CallElection from 'pages/ADMIN/Call-election/Call-election'
import Admin_CandidateConfig from 'pages/ADMIN/Candidate-config/Candidate-config'
import Admin_ElectionConfig from 'pages/ADMIN/Election-config/Election-config'
import Admin_NominationProcessConfig from 'pages/ADMIN/NominationProcess-config/NominationProcess-config'
import ActiveElectionForm from 'pages/ADMIN/ActiveElectionForm/ActiveElectionForm';
import AllowNomination from 'pages/ADMIN/Nomination/AllowNomination';

import NominationReview from 'pages/ADMIN/Nomination_review/Nomination_review';
import PaymentReview from 'pages/ADMIN/Payment_review/Payment_review';
import ObjectionReview from 'pages/ADMIN/Objection_review/Objection_review';
import ElectionReview from 'pages/ADMIN/Election_review/Election_review';



export default class Protected extends Component {

    constructor(props){
        super(props);

        this.state = {
            isLoggedIn: false,
        }
        
        // dummy login process just to determine the logged in user role as 'user' or 'admin'
        if (sessionStorage.getItem('role') !== null){
            if (sessionStorage.getItem('role').includes('user')){
                this.state.isLoggedIn = true;
            } else if (sessionStorage.getItem('role').includes('admin')){
                this.state.isLoggedIn = true;
            }
        }
    }

    isAdmin = () => {
        if (sessionStorage.getItem('role') !== null){
            if (sessionStorage.getItem('role').includes('admin')){
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    render() {
        return (
            /* app level routers needs to handle here*/
            <div>
                <Switch>
                    <Redirect exact from='/' to='/home' />
                    <Route path='/home' component={(this.state.isLoggedIn) ? Home : Login} />
                    <Route path='/login' component={Login} />
                    <Route path='/objection' component={(this.state.isLoggedIn) ? Objection : Login} />
                    <Route path='/profile' component={(this.state.isLoggedIn) ? Profile : Login} />
                    <Route path='/nomination' component={(this.state.isLoggedIn) ? NominationForm : Login} />
                    
                    <Redirect exact from='/admin' to='/admin/home' />
                    <Route path='/admin/home' component={(this.state.isLoggedIn) ? Admin_home : Login} />
                    <Route path='/admin/call-election' component={(this.state.isLoggedIn) ? Admin_CallElection : Login} />
                    <Route path='/admin/candidate-config' component={(this.state.isLoggedIn) ? Admin_CandidateConfig : Login} />
                    <Route path='/admin/election-config' component={(this.state.isLoggedIn) ? Admin_ElectionConfig : Login} />

                    <Route path='/admin/nominationProcess-config' component={(this.state.isLoggedIn) ? Admin_NominationProcessConfig : Login} />
                    <Route path='/admin/active-election' component={(this.state.isLoggedIn) ? ActiveElectionForm : Login} />
                    <Route path='/admin/allow-nomination' component={(this.state.isLoggedIn) ? AllowNomination : Login} />

                    <Route path='/admin/nomination-review' component={(this.state.isLoggedIn) ? NominationReview : Login} />
                    <Route path='/admin/payment-review' component={(this.state.isLoggedIn) ? PaymentReview : Login} />
                    <Route path='/admin/objection-review' component={(this.state.isLoggedIn) ? ObjectionReview : Login} />
                    <Route path='/admin/election-review' component={(this.state.isLoggedIn) ? ElectionReview : Login} />



                    {/* <Route path='/nomination' component={(this.state.isLoggedIn) ? NominationForm : Login}/>
                    <Route path='/objection' component={(this.state.isLoggedIn) ? Objection : Login} />
                    <Route path='/profile' component={(this.state.isLoggedIn) ? Profile : Login} />
                    <Route path='/allow-nomination' component={(this.state.isLoggedIn) ? AllowNomination : Login} />
                    <Route path='/election' component={(this.state.isLoggedIn) ? ElectionHome : Login}} /> */}

                </Switch>
            </div>
        );

    }
}
