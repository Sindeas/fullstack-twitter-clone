import React from "react";
import ReactDOM from "react-dom";
import Navbar from "../feedsComponents/navbar";
import ProfileCard from "../feedsComponents/profileCard";
import UserFeedbox from "../userFeedComponents/userFeedbox";


const UserFeed = () => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="main container">
        <div className="row">
          <div className="profile-trends col-3">
            <ProfileCard />
          </div>
          <UserFeedbox />
        </div>
      </div>
    </React.Fragment>
  )
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <UserFeed />,
    document.body.appendChild(document.createElement("div"))
  )
})


