import React, {useState, useRef, useEffect} from "react";
import { FaPaperPlane } from 'react-icons/fa';
import FirebaseApi from "../api";
import {UncontrolledTooltip} from "reactstrap";
import YouTube from 'react-youtube';
import moment from "moment";
import {NO_AVATAR_IMAGE} from "../configs/constants";

const Content = ({messages, currentUser}) => {
    const messagesEnd = useRef(null);
    const [message, setMessage] = React.useState("");


    const handleSendMessage = () => {
        if(!message){
            return
        }
        FirebaseApi.sendMessage(message, currentUser).then(() => {
            setMessage("")
            scrollToBottom()
        })
    };

    useEffect(()=> {
        scrollToBottom()
    }, );

    const scrollToBottom = () => {
        messagesEnd.current.scrollTop = messagesEnd.current.scrollHeight;
    };

    const getParameterByName = (query, name) => {
        const match = RegExp('[?&]' + name + '=([^&]*)').exec(query);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    };

    const getMessage = (message) => {
        if(message.includes("youtube")){
            const opts = {
                height: '240px',
                width: '360px',
                playerVars: {
                    autoplay: 0
                }
            };
            return <p>
                <YouTube
                    opts={opts}
                    videoId={getParameterByName(message, "v")}
                />
            </p>
        }
        return <p id="msg">{message}</p>
    };

    const getMessageSentTime = (time) => {
        return  moment.unix(time.seconds).startOf('minutes').fromNow();
    };

    return <div className="content">
        <div className="contact-profile">
            <div className="social-media">
                <i className="fa fa-facebook" aria-hidden="true"/>
                <i className="fa fa-twitter" aria-hidden="true"/>
                <i className="fa fa-instagram" aria-hidden="true"/>
            </div>
        </div>
        <div className="messages" ref={messagesEnd}>
            <ul>
                {currentUser && messages.map((message, index) => (
                    <li className={ message.from === currentUser.email ? "sent": "replies"} key={index}>
                        <span className={"time"}>{getMessageSentTime(message.createdAt)} </span>
                        <div className="user-chat clearfix">
                            <UncontrolledTooltip placement="top" target={`message${index}`}>
                                {message.from === currentUser.email ? "You": message.from}
                            </UncontrolledTooltip>
                            <img width={30} src={NO_AVATAR_IMAGE} alt="" id={`message${index}`}/>
                            {getMessage(message.message)}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        <div className="message-input">
            <div className="wrap">
                <input
                    name = "sendMessage"
                    value={message}
                    onChange={({target}) => setMessage(target.value)}
                    onKeyUp={({keyCode}) => keyCode === 13 && handleSendMessage()}
                    type="text"
                    placeholder="Write message..."
                />
                <i className="fa fa-paper-plane" aria-hidden="true"/>
                <button className="submit" onClick={handleSendMessage}><FaPaperPlane/></button>
            </div>
        </div>
    </div>
}

export default Content;
