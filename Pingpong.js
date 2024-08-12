import Header from "./Header.js";


class PingPong {
    template() {
        return Header.template() +  `
        <canvas id="myCanvas" width="800" height="600"></canvas>
        `
    }
}

export default new PingPong();