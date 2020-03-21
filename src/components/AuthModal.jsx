import React, {useState, useEffect} from "react";
import { Button, Label, Input, FormGroup, Form, FormFeedback, FormText} from 'reactstrap';
import FirebaseApi from "../api";
import {useSession} from "../hooks/useSession";
import Modal from 'react-modal';

const AuthModal = () => {
    const { user } = useSession();
    const [open, setOpen] = React.useState(true);
    const [authMode, setAuthMode] = React.useState(1); // Show Sign up at first
    const [email, setEmail] = React.useState("");
    const [emailError, setEmailError] = React.useState(null);
    const [password, setPassword] = React.useState("");

    useEffect(() => {
        if(user && user.email && open){
            setOpen(false)
        }

    },[user]);

    const onAuth = () => {
        if(authMode){ // Register
            FirebaseApi.signUp({email, password })
                .then(() => setOpen(false))
                .catch(() => setEmailError(true) )
        } else {
            FirebaseApi.signIn({email, password })
                .then(() => setOpen(false))
                .catch(() => setEmailError(true) )
        }

    };

    const changeAuthMode = () => {
        setAuthMode(!authMode)
    };

    return (
        <div>
            <Modal isOpen={open}>
                <Form>
                    <div className="container-formGroup">
                        <h1 className="authText">{authMode ? "Register": "Login"}</h1>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input invalid={emailError} type="email" name="email" value={email} onChange={({target}) => setEmail(target.value)} />
                            <FormFeedback>Wrong Email</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input value={password}
                                   name="password"
                                   invalid={emailError}
                                   onChange={({target}) => setPassword(target.value)}
                                   type={"password"}
                            />
                            <FormFeedback>Wrong Password</FormFeedback>
                        </FormGroup>
                    </div>
                </Form>
                <div className="textDiv"
                    onClick={changeAuthMode}> {authMode ? "Already have an account ?" : "Don't have an account?"}
                </div>
                <div className="button-Container">
                    <Button color="primary" onClick={onAuth}>{authMode ? "Register": "Login"}</Button>
                </div>
            </Modal>
        </div>
    )
};

export default AuthModal
