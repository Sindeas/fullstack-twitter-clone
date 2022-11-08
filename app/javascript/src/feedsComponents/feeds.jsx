import React from 'react'
import ReactDOM from 'react-dom'
import Navbar from './navbar';
import ProfileCard from './profileCard';
import TrendsCard from './trendsCard';
import Feedbox from './feedbox';

import './feeds.scss';


const Feeds = () => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="main container">
        <div className="row">
          <div className="profile-trends col-auto col-sm-3">
            <ProfileCard />
            <TrendsCard />
          </div>
          <Feedbox />
        </div>
      </div>
    </React.Fragment>
  )
} 

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Feeds />,
    document.body.appendChild(document.createElement('div')),
  )
})