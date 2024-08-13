import Login from "./Login.js";
import Home from "./Home.js";
import UserInfo from "./UserInfo.js"
import Pingpong from "./Pingpong.js"

const $app = document.querySelector(".App");

const routes = {
    "/" : Home,
    "/login" : Login,
    "/userinfo/:id" : UserInfo,
    "/pingpong" : Pingpong //여기서 추가 url이 있다면..? 그 안에서 처리를 해야겠는데...?
}

function parseUrl(url) {
    const routeNames = Object.keys(routes);
    for (let route of routeNames) {
        const match = matchRoute(route, url);
        if (match) {
            return { route, params: match };
        }
    }
    return null;
}

function matchRoute(route, url) {
    const routeParts = route.split('/').filter(Boolean);
    const urlParts = url.split('/').filter(Boolean);

    if (routeParts.length !== urlParts.length) {
        return null;
    }

    const params = {};

    for (let i = 0; i < routeParts.length; i++) {
        if (routeParts[i].startsWith(':')) {
            const paramName = routeParts[i].slice(1);
            params[paramName] = urlParts[i];
        } else if (routeParts[i] !== urlParts[i]) {
            return null;
        }
    }

    return params;
}


function changeUrl(url) {
    history.pushState(null, null, url);
    renderPage();
};

/*[page rendering]*/
function renderPage() {
    const path = window.location.pathname;
    const parsed = parseUrl(path);

    if (parsed) {
        console.log(parsed);
        const {route , params} = parsed;
        $app.innerHTML = routes[route] ? routes[route].template() : "404 - Page Not Found";
        if (routes[route].run !== undefined) {
            routes[route].run();
        }
    }
}

// 초기 로드 시 페이지 렌더링
document.addEventListener("DOMContentLoaded", renderPage);

// URL 변경 시(뒤로가기, 앞으로가기 포함) 페이지 렌더링
window.addEventListener("popstate", renderPage);

window.addEventListener("click", (e) => {
    // onclick 메서드라고 할 수 있음.@
    if (e.target.classList.contains("clickLoginBtn")) {
        changeUrl("/login"); // -> 로그인하고, 다시 리다이렉트. 로그인했을때와 안했을때의 홈 화면이 달라야함.
    } else if (e.target.classList.contains("clickMyPage")){
        changeUrl("/userinfo/1213");
    } else if (e.target.classList.contains("clickPingPong")){
        changeUrl("/pingpong");
    }
})

renderPage();