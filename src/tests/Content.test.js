import React from 'react';
import {shallow} from 'enzyme';
import Content from "../components/Content";
import FirebaseApi from "../api";

describe("<Content/> Component in render", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Content/>);
        wrapper.setProps({
            currentUser: {email: "test@gmsil.com"},
            messages: [{
                from: "user@gmail.com",
                message: 'hello',
                createdAt: 'Sat Mar 21 2020 14:49:25'
            }]
        })
    });

    it('message-input and send button', () => {
        expect(wrapper.find("input")).toHaveLength(1);
        expect(wrapper.find("button")).toHaveLength(1);
    });

    it('send messages', () => {
        const getSpy = jest.spyOn(FirebaseApi, 'sendMessage');
        wrapper.find("input").simulate('change', { target: { value: 'tesssssssss' } });
        wrapper.find(".submit").simulate("click");
        expect(getSpy).toBeCalled();
    });

    it('should show message with right content', () => {
        expect(wrapper.find("#msg").text()).toEqual("hello");
    });

});
