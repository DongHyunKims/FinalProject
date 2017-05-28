# jinniecast


서비스 설명
============

jinniecast는 Youtube에서 검색되어진 동영상을 자신만의 앨범별로 관리할 수 있는 웹서비스 입니다.

<img src="https://github.com/kimseyoon/blue/blob/master/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202017-05-28%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%206.44.23.png" width="40%">
<img src="https://github.com/kimseyoon/blue/blob/master/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202017-05-28%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%206.46.11.png" width="40%">

적용된 기술
============

### Front-End
* HTML5
* CSS3
* JavaScript
* React.js

### Back-End
* Node.js
* Express.js
* MongoDB

Git 관리
============

저희 프로젝트는 GitHub Flow를 참고하여 프로젝트를 관리하고 있습니다.

현재 저희 프로젝트의 branch 관리는 아래와 같습니다

             Master
               |
             Develop
               |
      -------------------
      |        |        |
    기능01    기능02    기능03

배포된 코드는 Master branch로 관리합니다.<br/>
그 밑에 Develop branch를 생성하여 Master branch를 배포하기 전의 코드를 관리합니다.<br/>
그리고 그 밑에 각각 팀원이 맡은 기능별로 branch를 만들어 해당 기능을 코딩합니다.<br/>
해당 기능별 branch에서 작업이끝나면 Pull request를 남기고 각 팀원은 해당코드를 리뷰하여 이상이 없는지 확인한 뒤 Merge합니다.

아래 URL에 있는 자료를 참고하였습니다.<br/>
https://guides.github.com/introduction/flow/

프로젝트 관리
============
### 일일단위 회의
매일 팀원들과 전날까지 각자 진행했던 업무와 겪은 문제점을 공유합니다.<br/>
그리고 오늘 하루 어떠한 업무를 진행할 예정인지도 파악한 후 Daily-Note에 기록을 저장하여 관리하고 있습니다.<br/>

https://github.com/DongHyunKims/jinniecast/wiki/Daily-Note

### 주단위 회의
한주간 진행할 업무의 내용을 milestones으로 미리 정해두었습니다.<br/>
매주 한주의 업무가 끝날때 마다 예정된 일정대로 업무가 제대로 진행되었는지 파악하고 한주를 되돌아보는 시간을 갖습니다.<br/>
그리고 차주에 진행할 업무사항을 금요일 오후 마다 논의하고 .<br/>

https://github.com/DongHyunKims/jinniecast/milestones

### Project management

1. versition control system
   github
2. Issue/Feature tracker
   github issue
3. Task manager
   github project
4. team communication
   slack
5. document
   google docs

### Common Rule

1. 매일 오전에 10분수준의 스탠드업 미팅. (업무보고가 아니다) 10시 30분, 최대한 개인 작업 전 진행 
   어제 한일 
   오늘 할일
2. 도움이 필요한 것을 짧게 공유.
3. 매일 오후에 회고(느낀점) 미팅. 6시
4. 우리팀 활동에 대해 잘한점, 개선할점을 이야기.
5. 팀이 모든 것을 변경할 수 있고, 지속적으로 개선하려고 노력.

### Team Rule

- 출석 : 참여 못할지 전날에 슬랙으로 알려준다. 
- daily note : 12시 전까지 작성해서 wiki daily note 페이지 업로드. 다음날 목표, done, ready, doing, 궁금한점, 회고 2~4줄
- 코드리뷰 : 3일에 한번은 코드리뷰를 진행 (리뷰 진행후 어느정도 완성 되었을때 서로의 코드를 바꾸어 구현한다)
- 힘든점 이야기 : 회고시 자신이 힘든 점을 이야기 하고 같이 공유
- working time : 6시 까지, 6시 이후 공부 수행 
- 공부 기록도 이슈로 남기기
- 일주일에 한번 외식(맛집 탐방) 및 카페코딩(즐거움은 더 생각 하도록) 

### Team code convention

- editor는 자유
- commit 로그 통일
- 메소드별 주석 작성
- github tag 정하기
- 기본 카멜케이스 작성, db는 _ 로 작성 ex) getName(), board_tb
- 변수는 명사, 메소드는 동사 + 명사
- CRUD 메소드 작성법 : get(검색), update(수정), delete(삭제), create(생성)
- 같은 라인의 statement에 {} 작성
- github flow를 따른다. 기본적인 develop branch에서 개발, branch의 name은 [이름]- [기능명]-implement로 작성 ex)login-implement tip. [https://ujuc.github.io/2015/12/16/git-flow-github-flow-gitlab-flow/](https://ujuc.github.io/2015/12/16/git-flow-github-flow-gitlab-flow/)
- 이슈 close 이후 완성된 내용 comment
- 백로그(엑셀) 있는 것을 GITHUB이슈에 작성한다. 설명에 기능, 소요시간, 완료조건등 작성

### Issue log Rule
- 제목 : [Common],[Study],[할일] ~ 구현 / 수정 / 추가 / 삭제
- 설명 : 
~~~
[설명]

사용자가 자신의 playlist를 control 할수 있는 menu
사용자는 앨범 안에 있는 동영상을 전체/하나씩 삭제 할수 있다.
[기간]
4/25 ~ 4/26

[소요시간]
8 hours

[완료조건]

playlist menu

 1. 왼쪽 부터 사용자가 선택한 태그를 제공.
 2. 오른쪽에는 수정모드로 전환할수 있는 'edit' 버튼 제공.
playlist 삭제

 -[] 1. 오른쪽 상단의 edit 버튼 클릭(수정 모드 전환)
 -[] 2. menu에 전체선택 버튼, 삭제 버튼 제공, 모든 playlist가 오른쪽으로 밀리고 삭제 버튼생성
 -[] 3-1. playlist click시 배경색이 바뀜. (checkbox 역할)
 -[] 3-2. 전체 선택 버튼 클릭시 모든 playlist의 배경색 전환.
 -[] 3-3. 왼쪽 -버튼클릭시 바로 삭제.
 -[] 4. 오른쪽 상단 '휴지통'아이콘 클릭시 선택된 playlist 삭제.
~~~

### Commit log Rule

- 제목과 본문을 모두 작성하여 commit한다
- commit -m 옵션을 사용하지 않고 vim등과 같은 에디터를 사용하여 작성한다
- 일반적인 git 작성 규칙을 사용한다
- 변경한 내용을 순서에 따라 적는다
- 목록형으로 작성 가능

~~~
ex)
Update communication Function

1) Add Bluetooth BLE 4.0 service
2) Remove WiFi Module
~~~

**제목**
- 50자를 넘지 않는다
- 대문자로 시작한다
- 마침표를 찍지 않는다
- 제목과 본문사이에 2번째 행은 비워둔다
- 제목은 영어로 작성
- Update : 폴더 단위 파일 변경
- Add : 파일이나 기능 추가
- Remove : 파일이나 기능 제거
- Modify : 파일이나 기능, 내용 수정

**본문**
- 72자를 넘지 않는다
- 명령형 어조를 사용한다(동사로 시작되며 현재형)
- 명시적으로 사용한다
- 본문은 한글로 작성
- 1,2,3 등의 개조식으로 표현

