const frontend_base_url = "http://127.0.0.1:5500";
const backend_base_url = "http://127.0.0.1:8000";
// const backend_base_url = "http://13.209.68.214:8000";

// 로그인 상태에서 로그인, 회원가입 페이지 접속 시 홈으로 이동하는 함수
function checkLogin() {
	const payload = localStorage.getItem("payload");
	if (payload) {
		window.location.replace(`${frontend_base_url}/`);
	}
}


// 회원가입
async function handleSignin() {
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
	const passwordCheck = document.getElementById("password-check").value;

	// 비밀번호 일치 판별
	if (password === passwordCheck) {
		const response = await fetch(`${backend_base_url}/users/signup/`, {
			headers: {
				"content-type": "application/json"
			},
			method: "POST",
			body: JSON.stringify({
				email: email,
				password: password,
				password2: passwordCheck,
			})
		});
		return response;
	} else {
		alert("비밀번호가 일치하지 않습니다.");
	}
}

// 로그인
async function handleLogin() {
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;

	const response = await fetch(`${backend_base_url}/users/login/`, {
		headers: {
			"content-type": "application/json"
		},
		method: "POST",
		body: JSON.stringify({
			email: email,
			password: password
		})
	});

	return response;
}

// 로그아웃
function handleLogout() {
	localStorage.removeItem("access");
	localStorage.removeItem("refresh");
	localStorage.removeItem("payload");
	window.location.replace(`${frontend_base_url}/`);
}

// 강제 로그아웃
function forceLogout() {
	const payload = localStorage.getItem("payload");
	let current_time = String(new Date().getTime()).substring(0, 10)
	if (payload) {
		const payload_parse = JSON.parse(payload).exp;
		if (payload_parse < current_time) {
			handleLogout();
		}
		else {
			return
		}
	}
}


// 특정 유저 정보 조회
async function getOtherUser(user_id) {
	const response = await fetch(
		`${backend_base_url}/api/users/profile/${user_id}/`,
		{
			method: "GET"
		}
	);
	if (response.status == 200) {
		response_json = await response.json();
		return response_json;
	} else {
		alert(response.statusText);
	}
}

// 로그인 한 로그인 한 유저 정보 조회
async function getLoginUser() {
	const payload = localStorage.getItem("payload");
	if (payload) {
		const payload_parse = JSON.parse(payload);
		const response = await fetch(
			`${backend_base_url}/api/users/profile/${payload_parse.user_id}/`,
			{
				method: "GET"
			}
		);
		if (response.status == 200) {
			response_json = await response.json();
			return response_json;
		} else {
			alert(response.statusText);
		}
	}
}