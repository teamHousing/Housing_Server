
## 🏠 Housing : 하버드(Server)
<img style="border: 1px solid black !important; border-radius:20px;" src="https://user-images.githubusercontent.com/60912550/103667314-1aacac00-4fb9-11eb-9035-50c6df179898.png?raw=true" width="200px" />

<br />

* <b> SOPT 27th APPJAM - Team **HOUSING** </b>
    
* <b> 프로젝트 기간: 2020.12.26 ~ 2021.01.16 </b>

<br>

## 📍 Housing service

 <b>집주인과 자취생의 원활한 소통을 위한 서비스, 하우징 </b>

 하우징은 집주인과 자취생이 동등한 위치에서 상호 소통할 수 있도록 도와주는 어플리케이션입니다. 

 **Service key Feature**
  * 누구에게만 전달되는 공지가 아닌, 모두에게 표시되는 우리집 공지사항!

  * 인증번호를 입력하면 자동으로 주소등록이 되는 쉽고 편한 가입방식!

  * 소통하기에서 집주인과 자취생간의 문의등록과 수정, 그리고 문의 해결까지의 흐름

<br />

### 🔝 App Jam Goal
* 자취생에게 꼭 필요한, 우리도 쓰고싶은 서비스 구현

### 👥우리가 추구하는 가치
* TRY 
* WITH
* IMPACT
* PRIDE on Housing✨
* 하우징의 슬로건 : 기분 좋은 문의 요청, 부담 없는 문제 해결! 방구석 소통의 시작

<br />

## 🖥 Code convention
 
- **git branch**

```
master
   |
   |--- main
   |--- hyunjong
   |--- jinho
```

- **git commit message rule** 
```
[Add] 파일 추가

[Update] 파일 수정

[Delete] 파일 삭제

```

<br />


## 🤝Team role
  
> 💻 HOUSING's server developer 

| **🙋 [이진호](https://github.com/dk-master)** | **🙋‍ [이현종](https://github.com/dudgns3tp)** |
| :---: |:---:|
| [![FVCproductions](https://user-images.githubusercontent.com/60912550/103666972-ab36bc80-4fb8-11eb-8797-0582a92c292c.png)]() | [![FVCproductions](https://user-images.githubusercontent.com/60912550/103666986-af62da00-4fb8-11eb-9daf-c57cb3603a4c.jpg)]() |
| 서버 개발자 | 서버 개발자|
| 배포 환경 구축 <br /> 회원가입 <br /> 캘린더 <br /> 우리집소식  <br /> 인증번호 생성 <br />| 배포 환경 구축 <br /> rdb설계 <br /> 로그인 <br /> 소통하기 <br /> 홈 |




| ERD |
| ----------------------------------------------------------------------------------------- |
![image](https://user-images.githubusercontent.com/57162257/103644770-3ce30180-4f9a-11eb-9376-5b9a0453c7c4.png)


## 🖥 Dependencies module
 
- **package.json**
```
{
  "name": "housing-server",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "nodemon ./bin/www"
  },
  "dependencies": {
    "aws-sdk": "^2.818.0",
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "express": "~4.16.1",
    "http-errors": "~1.6.3",
    "jade": "~1.11.0",
    "jsonwebtoken": "^8.5.1",
    "moment": "^2.29.1",
    "morgan": "~1.9.1",
    "multer": "^1.4.2",
    "multer-s3": "^2.9.0",
    "mysql2": "^2.2.5",
    "nodemon": "^2.0.6",
    "sequelize": "^6.3.5",
    "sequelize-cli": "^6.2.0"
  }
}
```
