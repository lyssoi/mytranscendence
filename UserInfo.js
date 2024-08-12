import Header from "./Header.js";

class UserInfo {
    template() {
        return Header.template() +  `
        <div>this is my page</div>
        `
    }
}

export default new UserInfo();