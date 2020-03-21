import React from 'react';
import {shallow} from 'enzyme';
import AuthModal from "../components/AuthModal";
import FirebaseApi from "../api";

describe("<AuthModal/> Component in render", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<AuthModal />);
  });

    it('It should find email and password inputs and signUp button', () => {
      expect(wrapper.find("Input[name='email']")).toHaveLength(1);
      expect(wrapper.find("Input[name='password']")).toHaveLength(1);
      expect(wrapper.find("Button")).toHaveLength(1);
    });

    it('It should simulate changes in registration form', () => {
      const getSpy = jest.spyOn(FirebaseApi, 'signUp');
      wrapper.find("Input[name='email']").simulate('change', { target: { value: 'bagratunismbat@g.com' } })
      wrapper.find("Input[name='password']").simulate('change', { target: { value: 'myPassword' } })
      wrapper.find("Button").simulate("click");
      expect(getSpy).toBeCalledWith({email: 'bagratunismbat@g.com', password: 'myPassword' } );
    });

    it('It should simulate changes in registration form', () => {
      const getSpy = jest.spyOn(FirebaseApi, 'signIn');
      wrapper.find(".textDiv").simulate("click");
      wrapper.find("Input[name='email']").simulate('change', { target: { value: 'bagratuni@mailg.com' } })
      wrapper.find("Input[name='password']").simulate('change', { target: { value: 'password' } })
      wrapper.find("Button").simulate("click");
      expect(getSpy).toBeCalledWith({email: 'bagratuni@mailg.com', password: 'password' } );
    });
});
