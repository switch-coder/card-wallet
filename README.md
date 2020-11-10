# 프로젝트 소개
-------
- myapplewallet 사이트을 모티브로 만든 웹사이트
- myapplewallet 사용시 멤버쉽 번호를 직접입력하는게 불편하다고 생각하여 바코드로 번호를 추출해서 자동으로 입력되게하는게 목표

&nbsp;

# 사용기술 
-----
- React React-hooks Javascript Styled-component Typescript
- Apollo Graphql Mongodb Nodejs

&nbsp;
-------

1.회원가입 / 로그인 /로그아웃

- 토큰기반 인증을 이용하여 로그인시 토큰이 발급되고 토큰값으로 수정 / 삭제 / 멤버십 생성

2. 멤버쉽 바코드 생성 / 조회

- 가지고 있는 멤버쉽 바코드(카드 번호) 를  입력하여 `Graphql` 이용하여 `MongoDB`에 저장
- `Graphql`를 이용하여 생성된 카드번호 조회후 바코드로 변환
- 수정시 동적으로 로고이미지 로드 후 수정창 띄움 수정후 `Graphql`  `useQuery-refetch`를 이용하여 데이터 다시 조회

4.반응형 웹 

- 모바일에서도 사용가능하도록 사이즈에 따른 반응형 웹 구현

3. back-end 

- `Apollo` 서버에 `MongoDB`를 연동하여 사용


&nbsp;
-------


# 프로젝트 구조

  index
    |
  App
    |
  userContext
    |        
  ApolloProvier
    |
  Router
    |
    |-----Header
    |
    |
    |
    |-----Switch
            |-----Home----card
            |
            |-----Loading
            |
            |-----Error
            |
            |
            |-----login
            |       |
            |       |-----Loading
            |       |
            |       |-----Error
            |
            |-----signup
            |       |
            |       |-----Loading
            |       |
            |       |-----Error
            |
            |-----edit
            |       |
            |       |-----Loading
            |       |
            |       |-----Error
            |
            |-----MyPage----MyCard
                    |
                    |-----Loading
                    |
                    |-----Error


 
 


