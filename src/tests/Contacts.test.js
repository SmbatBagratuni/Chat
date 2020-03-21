import React from 'react';
import {shallow} from 'enzyme';
import FirebaseApi from "../api";
import Contacts from "../components/Contacts";

describe("<Contact/> Component in render", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Contacts/>);
        wrapper.setProps({
            currentUser: {email: "test@gmsil.com"},
            users: [{
                createdAt: {seconds: 1584650691, nanoseconds: 22600000},
                email: "bagratunismbat@gmail.com",
                isOnline: false
            }],
        })
    });

    it('send messages', () => {
        expect(wrapper.find(".name").at(0).text()).toEqual("bagratunismbat@gmail.com");
    });

    it('should log out when we click in logout button', () => {
        const getSpy = jest.spyOn(FirebaseApi, 'signOut');
        wrapper.find(".log-out").simulate("click");
        expect(getSpy).toBeCalled();

    });
});
