import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Message from "./Message";

configure({ adapter: new Adapter() });

describe("<Message />", () => {
    // let wrapper;

    // beforeEach(() => {
    //     wrapper = shallow(<Message enableInput={true} />);
    // });
    it("Enable button only when something is typed in Input field", () => {
        //wrapper.setProps({ enableInput: true });
        const wrapper = shallow(<Message sendTextMsg={[]} />);
        const button = wrapper.find("button");
        console.dir(button);
        expect(button.prop("disabled")).to.have.length(1);
    });
});
