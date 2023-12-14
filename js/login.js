checkLogin();

// 로그인 폼 다 쓰고 로그인 눌렀을 때 실행되는 함수
async function handleLoginBtn() {
    const response = await handleLogin();

    if (response.status == 200) {
        const response_json = await response.json()

        localStorage.setItem("access", response_json.access);
        localStorage.setItem("refresh", response_json.refresh);

        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        localStorage.setItem("payload", jsonPayload)
        alert("환영합니다!")
        window.location.replace(`${frontend_base_url}/`)
    } else {
        alert("회원정보가 일치하지 않습니다!")
    }
}


// 로그인 버튼 클릭 시 해당 auth에 코드 요청, redirect_uri로 URL 파라미터와 함께 이동

async function googleLoginBtn() {
    const response = await fetch(`${backend_base_url}/users/google/`, { method: 'GET' })
    const google_id = await response.json()
    const redirect_uri = `${frontend_base_url}/login.html`
    const scope = 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile'
    const param = `scope=${scope}&include_granted_scopes=true&response_type=token&state=pass-through value&prompt=consent&client_id=${google_id}&redirect_uri=${redirect_uri}`
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${param}`
}
