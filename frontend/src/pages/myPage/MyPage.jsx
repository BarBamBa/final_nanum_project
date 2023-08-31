import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FiExternalLink } from "react-icons/fi";
import "/src/scss/myPage/MyPage.scss";
import VolunteerHeaders from "./VolunteerHeaders";

function MyPage() {
	const [userInfo, setUserInfo] = useState({});

	//===== 유저 정보 호출==============================================
	async function fetchProfile() {
		if (!localStorage.getItem("accessToken")) {
			alert("로그인을 해주세요.");
			navigate("/login");
			return;
		}

		fetch("/api/user/me", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("accessToken"),
			},
		})
			.then((response) => response.json())

			.then((data) => {
				setUserInfo(data);

				console.log(data);
				console.log(localStorage);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	useEffect(() => {
		fetchProfile();
	}, []);

	const navigate = useNavigate();

	const handleAuthEmail = (e) => {
		e.preventDefault();

		fetch("/api/verify", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: userInfo.email,
			}),
		}).then((res) => {
			if (!res.ok) {
				alert("일치하는 계정을 찾을 수 없습니다.");
			} else {
				console.log("서버 응답:", res);
				alert("인증링크를 이메일로 발송하였습니다.");
			}
		});
	};

	const myPageModify = () => {
		navigate("/MypageModify");
	};

	return (
		<>
			<VolunteerHeaders />

			<form className="mypage-form">
				<div className="myPage-Container">
					{/* ==이름========== */}
					<div className="myPage-category">이름</div>
					<div className="myPage-textBox">{userInfo.name}</div>

					{/* ==이메일========== */}
					<div className="myPage-category">이메일</div>
					<div className="myPage-textBox">
						{userInfo.email}
						{userInfo.emailVerify == "N" ? (
							<button
								type="button"
								className="emailAuth"
								onClick={handleAuthEmail}
							>
								이메일 인증
							</button>
						) : <span className="emailAuth2">인증완료</span>}
					</div>

					{/* ==닉네임 전화번호========== */}
					<div className="myPage-category">닉네임</div>
					<div className="myPage-textBox">{userInfo.nickname}</div>
					<div className="myPage-category">전화번호</div>
					<div className="myPage-textBox">{userInfo.phone}</div>

					{/* ==주소========== */}
					<div className="myPage-category">주소</div>
					<div className="myPage-textBox">{userInfo.address}</div>

					{/* ==나의 자원봉사 및 정보수정 버튼========== */}

					<div className="buttonBox">
						<Link to={`/PasswordConfirm`}>
							<button type="button" className="myPage-password-btn">
								비밀번호 변경
							</button>
						</Link>
						<div className="myPage-btn-div">
							<Link to={`/MypageModify`}>
								<button className="myPage-btn">정보수정하기</button>
							</Link>
						</div>
					</div>
				</div>
			</form>
		</>
	);
}

export default MyPage;
