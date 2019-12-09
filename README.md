# 프로젝트 소개
Spring boot, React.js 프레임워크를 활용한 웹툰 홈페이지 "Cheeze Toon" 입니다.<br/>
풀스택 개발을 경험해보고자 진행한 프로젝트입니다.<br/>
"Cheeze Toon"이라는 타이틀은 제가 즐겨봤던 웹툰인 '치즈인터트랩'에서 따온 명입니다.

<br/>
<br/>

# 개발 인원
1명(개인 프로젝트)

<br/>
<br/>

# 개발 기간
2019.10.25~ 2019.12.03 (약 6주)

<br/>
<br/>

# 핵심 기능
- 로그인, 회원가입 기능(Spring security + JWT)
- 별점 등록, 수정, 별점 평균 출력
- 선호작품 등록, 삭제
- 댓글 등록, 수정, 삭제
- 요일별 웹툰 출력
- 관리자 로그인 시, 관리자 메뉴 노출
- 웹툰 등록(첨부파일 - Drag&Drop : React UI library Ant Design 활용), 수정, 삭제
- 웹툰 별 에피소드 등록, 수정, 삭제

<br/>
<br/>

# 개발 환경
- 개발환경 : Windows 10 Enterprise x64
- 개발도구 : vscode, Github
- 구성환경 : Spring boot, Spring security, jwt, React.js, React-router, JPA, Hibernate, Mysql, Ant Design(React UI library)

<br/>
<br/>

# 실행 영상

<https://www.youtube.com/watch?v=x7mRTtjsYns&t=7s>

<br/>
<br/>

# 실행 스크린 샷

![](https://github.com/doozi316/React-Spring-Cheezetoon/메인화면.PNG)
메인 페이지 입니다.

<br/><br/>

![](https://github.com/doozi316/React-Spring-Cheezetoon/관리자페이지.PNG)
관리자 페이지 입니다.

<br/><br/>

![](https://github.com/doozi316/React-Spring-Cheezetoon/홈화면.PNG)
웹툰 홈화면 입니다.

<br/>
<br/>

# 프로젝트 진행 중 어려웠던 점
프레임워크를 활용한 첫 풀스택 개발이다보니, 부족한 지식으로 인해 마주하는 에러들이 어려웠던 점이었습니다. React.js는 노마드 코더의 무료강좌 2강을 듣고 바로 프로젝트에 활용하는 것이어서 깊이 있게 아는 것이 많이 없었습니다.<br/>
하지만 구현하고자하는 기능들에 대한 레퍼런스를 찾고 학습하다보니, 저절로 실력이 늘게 되었습니다.

<br/>
<br/>

### 기억에 남는 에러
- React Life Cycle 문제
- "Cannot read property..."
- Jpa 일대다 관계 엔티티 구현 중 무한 참조 현상 
<br/>
<br/>

오류를 마주하면 구글에 검색해보고, 검색만으론 해결할 수 없다면 stackoverflow나 Okky 사이트에 질문을 하였습니다.
마주한 에러들은 블로그에 기록하여 재발을 방지했습니다.

<br/>
<br/>

# Steps to Setup the Spring Boot Back end app
<br/>

1. Clone the application

```
git clone https://github.com/doozi316/React-Spring-Cheezetoon.git
```
<br/>

2. 데이터 베이스 생성

```
create database cheezetoon
```
<br/>

3. Mysql 설정
<br/>
```src/main/resources/application.properties``` 의 Mysql 설정을 수정하세요.

<br/>

4. Run the app

```
mvn spring-boot:run
```
<br/>

5. Default Roles 추가

```
INSERT IGNORE INTO roles(name) VALUES('ROLE_USER');
INSERT IGNORE INTO roles(name) VALUES('ROLE_ADMIN');
```
<Br/>
<br/>
<br/>

# Steps to Setup the React Front end app

<Br/>

1. frontend 디렉토리로 이동

```
cd frontend
```
<br/>

2. Run the app
```
npm install && npm start
```