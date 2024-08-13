import Header from "./Header.js";
import run from "./game/run.js";


class PingPong {
    template() {
        // 하위 경로에 따라 렌더링
        return Header.template() +  `
        <canvas id="myCanvas" width="800" height="600"></canvas>
        `
    }
    run() {
        run() 
    }
}

export default new PingPong();