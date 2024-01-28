# 데이터베이스

## What & Why?

### 지금까지는?

> 아래처럼 데이터 파일 ‘전체’를 다루어옴
> 
- Create data: Replace entire content in file with new content
- Read data: Always read entire file (= all the content)
- Update data: Read entire content, find content to update, replace entire content
- Delete data: Read entire content, find content to update, replace entire content

→ 데이터 크기가 커지고 많아지고, 서버에 더 많은 요청이 들어오면 문제 발생

<br>

### DBMS (DataBase Management Sysyems)

DBMS는 Data storage tasks를 최적화하는 소프트웨어 시스템이다.

- read, write 액세스 최적화
- 저장 및 검색 최적화
- 데이터 쿼리 최적화

DBMS는 크게 `RDBMS`와 `NoSQL DB` 두 가지로 나뉜다.

- **관계형 DB** (Relational DBMS, RDBMS 또는 SQL Databases)
    - 데이터를 테이블로 구성하며, 테이블 간 관계를 맺음
    - `SQL(Structured Query Language)` 사용 *SQL은 이전에 ‘Sequel’이라고 불림*
        - 관계형 데이터베이스 관리 시스템의 데이터를 관리하기 위해 설계한 특수 목적의 프로그래밍 언어
    - ex. MySQL, PostgreSQL, Oracle, Supabase Database 등
- **비관계형 DB (NoSQL)**
    - 다양한 데이터 모델 지원, 주로 키-값, 문서, 열 지향, 그래프 등 다양한 형태의 데이터를 다룸
    - 각자의 쿼리 언어 또는 API를 사용
    - ex. MongoDB, Firebase Realtime Database 등

[RDBMS와 NoSQL의 차이](https://www.whatap.io/ko/blog/173/)

<br>
<br>

## SQL & NoSQL

### SQL

- SQL DB에서는 여러 테이블에 걸쳐 정규화된 데이터를 저장한다.

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/f40ae142-4b72-4d1e-ad05-6f9f84aff6f4)

두 테이블은 서로 완전히 독립적이지만, 한 테이블의 ID를 다른 테이블의 열에 있는 값으로 사용하여 관계를 맺는다.

DB 데이터에 접근할 때, 데이터 파일의 저장에 관여하는 것이 아니고 DB 및 해당 테이블과 상호작용한다.

- SQL DB는 실제 스키마와 데이터 유형을 명확하게 정의해야 한다.

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/c9eef08a-1ed3-4948-9a48-98f56bc7246d)

위의 예시를 보면, 공항의 ID는 고유한 문자열이어야 하고, 도시와 국가는 일부 텍스트 데이터를 보유하고 문자열을 제공하며, 항공편의 ID는 고유한 정수이다. 여기서 고유성이 핵심인데, 각 행에 존재하는 고유 식별자를 통해 테이블 간의 관계를 설정하기 때문이다.

- SQL DB에서는 관련 데이터를 쿼리할 수 있다.

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/8c29c27c-6e61-456a-b62a-ce368021c1ae)

예를 들어, 뮌헨에서 시작하는 모든 항공편을 가져오려고 하는 상황이다. Flights 테이블의 Start 열에서 쿼리하여 MUC 식별자를 검색하고 해당 식별자가 있는 모든 항목을 가져올 수 있다.

또한 출발지인 뮌헨 공항에 대한 모든 데이터도 가져오고자 한다면 Flights 테이블의 Start 열이 Airports 테이블의 ID을 외래키로 참조하여 Airports 테이블로부터 MUC 공항에 대한 모든 데이터를 가져올 수 있다.

<br>

### No SQL

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/105a9c56-8d78-46a7-b21e-0726fd671434)

SQL DB와 달리 NoSQL에서는 열과 행으로 생각하지 않고, 테이블에 저장되는 객체 또는 문서가 있으며 명확하게 스키마도 설정하지 않는다.

더 적은 수의 테이블에 더 많은 정보를 저장할 수 있어 더 적은 쿼리로 더 많은 정보를 얻을 수 있다.

여러 테이블에서 복잡한 쿼리를 실행할 필요가 없다. 즉, 쿼리를 단순화하여 DB 성능을 향상시킬 수 있다는 것이 장점이다.

<br>
<br>