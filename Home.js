import Header  from "./Header.js";

class Home {
    template() {
        return Header.template() +  `
            this is home
        `
    }
}

export default new Home();