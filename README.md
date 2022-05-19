<div align="center">
  <br />
  <img src="/uploads/a019ce9609c884045d389159a10610fa/KakaoTalk_20220519_143430177.png" alt="milkmarket_logo" />
  <br />
  <h1>카트라이더 1대1 매칭과 전적검색을 위한 사이트 SABER</h1>
  <br />
</div>

## 목차

1. [**서비스 소개**](#---서비스-소개)
2. [**서비스 목표**](#2)
3. [**기술 스택**](#3)
4. [**시스템 아키텍처**](#---시스템-아키텍처)
5. [**주요기능 및 데모영상**](#5)
6. [**UCC 보러가기**](#6)
7. [**협업 관리**](#7)
8. [**개발 멤버 소개**](#8)
9. [**프로젝트 기간**](#9)
10. [**프로젝트 관련 문서**](#10)

<br/>

<div id="1"></div>

## 💡 서비스 소개

### 같이 게임하고 싶은 사람이 필요할때? 내 전적 검색을 하고 싶을 때, Saber!

> 체계화된 카트라이더 전적검색 사이트가 부실합니다. <br/> 전적검색 뿐 아니라 커뮤니티나 1대1 매칭을 할 수 있는 사이트가 없습니다. <br/> Saber 는 유저 수준별 1대1 매칭 기능을 통해 <br/> `수준별 유저간 1대1 매칭을` 지원합니다.

#### 수준별 1대1 매칭 서비스, Saber와 함께 하세요!

</br>

<div id="2"></div>

## 🥅 목표

1. 단순히 전적 검색을 하는 사이트에서 머무르는 것이 아닌, 자유로운 커뮤니티 활동을 통해 유저들간 게임에 대해 이야기할 수 있습니다. 이 과정에서 유저들 간의 수준별 1대1 매칭으로 자체 레이팅을 구현하는 서비스를 구축합니다.

2. 카트라이더 자체 API를 통해 구현한 전적검색 서비스를 적용하여 이를 통해 신뢰도가 높은 서비스를 구축합니다.


<br/>

<div id="3"></div>

## 🛠️ 기술 스택

<img src="https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=Java&logoColor=#007396" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=for-the-badge&logo=Spring Boot&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <img src="https://img.shields.io/badge/JSON Web Tokens-000000?style=for-the-badge&logo=JSON Web Tokens&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <img src="https://img.shields.io/badge/Spring Security-6DB33F?style=for-the-badge&logo=Spring Security&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <br>
<img src="https://img.shields.io/badge/Apache Maven-C71A36?style=for-the-badge&logo=Apache Maven&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=NGINX&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <img src="https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=Ubuntu&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/><br>
<img src="https://img.shields.io/badge/React-4FC08D?style=for-the-badge&logo=React&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <img src="https://img.shields.io/badge/Node.js-339939?style=for-the-badge&logo=Node.js&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <img src="https://img.shields.io/badge/Redux-FFCA28?style=for-the-badge&logo=Redux&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <br>
<img src="https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=Jira&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <img src="https://img.shields.io/badge/GitLab-FCA121?style=for-the-badge&logo=GitLab&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <br/>

<details><summary> <b> 상세 기술스택 및 버전</b> </summary>

| 구분       | 기술스택        | 상세내용           | 버전        |
| ---------- | --------------- | ------------------ | ----------- |
| 공통       | 형상관리        | Gitlab             | \-          |
|            | 이슈관리        | Jira               | \-          |
|            | 커뮤니케이션    | Mattermost, Notion | \-          |
| BackEnd    | DB              | MySQL              | 5.7         |
|            |                 | JPA                | \-          |
|            | Java            | JavaSE             | 11          |
|            | Spring          | Spring             | 5.3.6       |
|            |                 | Spring Boot        | 2.4.5       |
|            | IDE             | Eclipse            | JEE 2020-06 |
|            |                 | IntelliJ           | 2021.3.1    |
|            | Build           | Maven              | 4.0.0       |
|            | API Docs        | Swagger2           | 3.0.0       |
| FrontEnd   | HTML5           |                    | \-          |
|            | CSS3            |                    | \-          |
|            | JavaScript(ES6) |                    | \-          |
|            | IDE             | Visual Studio Code | 1.63.2      |
| Server     | 서버            | AWS EC2            | \-          |
|            | 플랫폼          | Ubuntu             | 20.04.3 LTS |
|            | 배포            | Docker             | 20.10.12    |

</details>

<br />

<div id="4"></div>

## 🗂️ 시스템 아키텍처

|            시스템 구성            |
| :-------------------------------: |
| ![흐름도](/uploads/07fc14f0a7df240f095117eb3df174f2/화면_캡처_2022-05-19_152655.jpg) |

| 디렉토리 구조                           |
| :-------------------------------------- |
| ![디렉토리구조](/uploads/33dce89057dbea1aaaba39e4859b7916/화면_캡처_2022-05-19_152801.jpg) |

<div id="5"></div>

## 🖥️ 주요기능

### [MyPage] 지갑

- 고유 비밀번호를 입력하여 지갑을 생성합니다. 블록체인의 복잡한 과정을 대신해 비밀번호만 기억하면 거래가능하게 하였습니다.
- ETH 충전을 통해 이더를 구매합니다.
- MILK 충전을 통해 이더로 MILK를 구매합니다. 1이더(ETH)당 1000밀크(MILK)를 나타냅니다.

|                      지갑 충전하기                      |
| :-----------------------------------------------------: |
| <img src="./readme_assets/wallet.gif" alt="지갑충전" /> |

### [Shop] 상품구매

- 구매자가 Shop에서 원하는 상품을 선택하고 구매하기를 누르면 보유 밀크(MILK)에서 해당 가격만큼의 밀크(MILK)를 차감합니다.
- 판매자와 거래가 완료되면 수령 확인을 통해 거래를 확정합니다. 수령 확인을 하지 않으면 밀크가 제공되지 않습니다.
- 판매자가 판매자 확인을 눌러 판매를 확정 짓게 되면 구매자가 차감한 밀크가 정상적으로 들어옵니다.

|                       상품 구매하기                       |
| :-------------------------------------------------------: |
| <img src="./readme_assets/purchase.gif" alt="상품구매" /> |

### [Shop] 상품등록

- 판매 혹은 대여하고자 하는 상품을 등록할 수 있습니다.
- 상품명, 설명, 카테고리, 가격 등을 입력할 수 있으며 상품 이미지는 다중파일 업로드가 가능합니다.

|                       상품 등록하기                       |
| :-------------------------------------------------------: |
| <img src="./readme_assets/register.gif" alt="상품등록" /> |

### [Shop] 상품검색

- 상단 검색기능에서 키워드 검색을 통해 해당하는 상품들을 보여줍니다.
- Elastic Search를 적용하여 찾고 싶은 상품은 필터링(판매상태, 카테고리, 우리동네 여부)을 통해 빠르게 찾을 수 있습니다.

|                        상품검색                         |
| :-----------------------------------------------------: |
| <img src="./readme_assets/search.gif" alt="상품검색" /> |

### [Shop] 상품 상세조회

- 상품 이미지, 판매 및 대여 정보를 확인할 수 있습니다.
- 판매자와 채팅, 관심상품 등록, 상품구매를 할 수 있습니다.
- 사용자가 선택한 상품과 관련있는 상품들을 하단에서 최대 4개까지 확인할 수 있습니다.
- 관련있는 상품들은 사용자가 선택한 상품의 카테고리와 지역이 같습니다.

|                        상품 상세조회                         |
| :----------------------------------------------------------: |
| <img src="./readme_assets/detail.gif" alt="상품 상세조회" /> |

### [Shop] 1:1 채팅

- 구매자와 판매자의 채팅이 가능해집니다.
- 구매자가 채팅을 요청하면 판매자에게 알림이 전달돼 수락, 거부를 할 수 있습니다.

|                       1:1 채팅                        |
| :---------------------------------------------------: |
| <img src="./readme_assets/chatting.gif" alt="채팅" /> |

### 메인페이지

- 우유마켓의 랜딩페이지입니다.
- Shop에 등록된 상품 중 관심등록이 많은 인기상품 최상위 5개를 보여주며 상품정보와 관심상품 등록 수, 등록시간을 확인할 수 있습니다.

|                          메인페이지                          |
| :----------------------------------------------------------: |
| <img src="./readme_assets/maingpage.gif" alt="메인페이지" /> |

### 커뮤니티

- 유아용품 관련 정보를 자유롭게 공유할 수 있는 커뮤니티입니다.
- 게시글에 대해 댓글을 남길 수 있습니다.

|                          커뮤니티                          |
| :--------------------------------------------------------: |
| <img src="./readme_assets/community.gif" alt="커뮤니티" /> |

<br/>

<div id="6"></div>

## 🎥 [UCC 보러가기](https://youtu.be/t1jL26PPLHM)

<br />

<div id="7"></div>

## 👥 협업 관리

|                         Jira BurnDown Chart                          |
| :------------------------------------------------------------------: |
| <img src="./readme_assets/burndown.png" alt="Jira BurnDown Chart" /> |

|                        Notion                         |
| :---------------------------------------------------: |
| <img src="./readme_assets/notion.PNG" alt="Notion" /> |

<br />

<div id="8"></div>

## 👪 개발 멤버 소개

<table>
    <tr>
        <td height="140px" align="center"> <a href="https://github.com/dev-yunhy96">
            <img src="https://avatars.githubusercontent.com/dev-yunhy96" width="140px" /> <br><br> 윤희영 <br>(Back-End) </a> <br></td>
        <td height="140px" align="center"> <a href="https://github.com/sahngrhee">
            <img src="https://avatars.githubusercontent.com/sahngrhee" width="140px" /> <br><br> 이상훈 <br>(Front-End) </a> <br></td>
        <td height="140px" align="center"> <a href="https://github.com/wjdtjq1121">
            <img src="https://avatars.githubusercontent.com/wjdtjq1121" width="140px" /> <br><br> 한정섭 <br>(Back-End) </a> <br></td>
        <td height="140px" align="center"> <a href="https://github.com/KwonDoHyuk">
            <img src="https://avatars.githubusercontent.com/KwonDoHyuk" width="140px" /> <br><br> 권도혁 <br>(Full-stack) </a> <br></td>
        <td height="140px" align="center"> <a href="https://github.com/namhoon21">
            <img src="https://avatars.githubusercontent.com/namhoon21" width="140px" /> <br><br> 김남훈 <br>(Back-End) </a> <br></td>
        <td height="140px" align="center"> <a href="https://github.com/kdyddd">
            <img src="https://avatars.githubusercontent.com/kdyddd" width="140px" /> <br><br> 김동영 <br>(Back-End) </a> <br></td>
    </tr>
    <tr>
        <td align="center">REST API<br/>DataBase</br></td>
        <td align="center">UI/UX<br/>React</td>
        <td align="center">Docker<br/>CI/CD<br/>NginX</td>
        <td align="center">REST API<br/>UI/UX<br/>React<br/></td>
        <td align="center">UI/UX<br/>React<br/></td>
        <td align="center">REST API<br/>Server</td>
    </tr>
</table>
<br />

<div id="9"></div>

## 📆 프로젝트 기간

### 22.2.21 ~ 22.4.8

- 기획 및 설계 : 22.2.21 ~ 3.2
- 프로젝트 구현 : 22.3.2 ~ 22.4.5
- 버그 수정 및 산출물 정리 : 22.4.6 ~ 8

<br />

<div id="10"></div>

## 📋 프로젝트 관련 문서

| 구분            |                                  링크                                   |
| :-------------- | :---------------------------------------------------------------------: |
| 공통코드        |                 [공통코드 바로가기](/docs/공통코드.md)                  |
| 컨벤션목록      |               [컨벤션목록 바로가기](/docs/컨벤션목록.md)                |
| 덤프파일        |                 [덤프파일 바로가기](/exec/03_DB덤프.md)                 |
| ERD             |                      [ERD 바로가기](/docs/ERD.JPG)                      |
| 빌드/배포       |       [빌드/배포 바로가기](/exec/01_서울_5반_A504_빌드및배포.pdf)       |
| 외부서비스 정보 | [외부서비스 정보 바로가기](/exec/02_서울_5반_A504_외부_서비스_정보.pdf) |
| 시연 시나리오   |    [시연 시나리오 바로가기](/exec/04_서울_5반_A504_시연시나리오.pdf)    |
| 발표자료        |                 [발표자료 바로가기](/docs/발표자료.pdf)                 |
