import React from "react";
import {NO_AVATAR_IMAGE} from "../configs/constants";
import FirebaseApi from "../api";
import { FaSignOutAlt } from "react-icons/fa";

const Contacts = ({users, currentUser}) => {
    console.log(users,"users");
    return (
        <div id="sidepanel">
            {currentUser && <div onClick={() => FirebaseApi.signOut(currentUser)} className={"log-out"}>
                Log Out <FaSignOutAlt style={{marginLeft: 5}}/>
            </div>}
            <div id="profile">
                <div className="wrap">
                    <p>{currentUser && currentUser.email.slice(0,20)}</p>
                </div>
            </div>
            <div id="contacts">
                <div className={"online-now"}>
                    <span name="online">Users</span>
                    <ul>
                        {users && users.map(user => (
                            <li className="contact" key={user.email}>
                                <div className="wrap">
                                    <span className={`contact-status ${user.isOnline ? "online": "offline"}`}></span>
                                    <img src={user.imgUrl || NO_AVATAR_IMAGE}  alt=""/>
                                    <div className="meta">
                                        <p className="name">{user.email}</p>
                                        <p className="preview"></p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
};

export default Contacts;
