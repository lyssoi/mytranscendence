import Login from "./Login.js";
import Home from "./Home.js";
import UserInfo from "./UserInfo.js"
import Pingpong from "./Pingpong.js"
import run from "./game/run.js";

const $app = document.querySelector(".App");

const routes = {
    "/" : Home,
    "/login" : Login,
    "/user" : UserInfo, // 유저정보를 아이디로 받아와서, 정보를 넣어주어야함.
    "/pingpong" : Pingpong // 엔드포인트에 따라서 추가 라우팅을 해주어야함.
}

$app.innerHTML = routes["/"].template();


function changeUrl(url) {
    history.pushState(null, null, url);
    $app.innerHTML = routes[url].template();
};

function renderPage() {
    const path = window.location.pathname;
    $app.innerHTML = routes[path] ? routes[path].template() : "404 - Page Not Found";
}

// 초기 로드 시 페이지 렌더링
document.addEventListener("DOMContentLoaded", renderPage);

// URL 변경 시(뒤로가기, 앞으로가기 포함) 페이지 렌더링
window.addEventListener("popstate", renderPage);

window.addEventListener("click", (e) => {
    //혹은 각 코드안에서 해도되고, 클릭하는 애들만 모아놓은 코드를 작성해도 됨.
    if (e.target.classList.contains("clickLoginBtn")) {
        changeUrl("/login"); // -> 로그인하고, 다시 리다이렉트. 로그인했을때와 안했을때의 홈 화면이 달라야함.
    } else if (e.target.classList.contains("clickMyPage")){
        changeUrl("/user:id");
    } else if (e.target.classList.contains("clickPingPong")){
        changeUrl("/pingpong");
        run();
    }
})

renderPage();