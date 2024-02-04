# Node.js와 MySQL 함께 사용하기

MySQL 데이터베이스는 브라우저의 프론트엔드 자바스크립트 코드와 연결하면 안된다.

자바스크립트 코드는 브라우저의 개발자 도구에서 누구나 볼 수 있고 편집이 가능하다. 여기서 DB에 연결하는 코드를 수정하면 DB 자격 증명을 조회할 수 있음

→ 실제 데이터베이스 테이블을 삭제하거나 수정하는 것이 가능하다.

<br>

## 블로그 웹사이트 구축하기

- 게시글(posts)의 CRUD가 가능한 블로그 웹사이트
- DB와 테이블 설계 → DB와 테이블 생성 → MySQL Workbench로 DB 테이블에 초기 더미 데이터 추가 → DB와 Express.js 연결

<br>

### DB 및 테이블 설계, 생성

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/ab5e2ed4-b3dd-4f18-bac6-ea4ce733aea8)

```sql
CREATE SCHEMA blog;
```

<br>

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/d6cbeb6b-9509-451c-9bba-40a898b07f9f)

```sql
CREATE TABLE blog.authors (
	id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);
```

<br>

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/6e3ac938-bd20-4498-93dc-55aef3b223fe)

```sql
CREATE TABLE blog.posts (
	id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
	summary VARCHAR(255) NOT NULL,
	body TEXT NOT NULL,
	date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	author_id INT NOT NULL
	PRIMARY KEY (id)
);
```

지난 섹션에서 다뤘던 내용이다. MySQL 기본 명령어를 사용해 스키마를 생성하고 테이블을 생성한다.

<br>

### 초기 데이터 추가

```sql
INSERT INTO blog.authors (name, email) VALUES ('Jiwon Park', 'jiwon@test.com');
INSERT INTO blog.authors (name, email) VALUES ('Yujin An', 'yujin@test.com');
```

데이터 두 개는 넣어주려고 했는데 나말고 생각나는 이름이 없어서 아이브 유진이의 이름을 빌렸다,,^^

<br>

### node.js 프로젝트와 MySQL 연결

`mysql2` 패키지를 이용해서 연결

- 설치
    
    ```bash
    npm i mysql2
    ```

<br>    

- node.js 프로젝트에 `data/database.js` 생성
    
    ```jsx
    const mysql = require('mysql2');
    
    const pool = mysql.createPool({
      host: 'localhost',
      // port: postnumber,
      database: 'blog',
      user: 'user', // 예시
      password: 'password', // 예시
    });
    
    module.exports = pool;
    ```
    
<br>

이 때 user나 password 등을 포함한 민감한 정보는 환경변수로 설정해주는 것이 보안상 좋을 것 같았다. 그래서 `.env` 파일을 만들고 React나 Next.js에서 사용했던 것처럼 `proces.env.DB_USER` 처럼 바로 사용하려고 했더니 아래의 에러 메시지와 함께 비밀번호를 인식하지 못했다.

```
Error: Access denied for user 'user'@'localhost' (using password: NO)
```

이 때 사용하는 라이브러리가 `dotenv`이다. `dotenv` 패키지는 일일이 환경변수를 설정해줄 필요 없이, 프로젝트 시작 시 `.env` 파일의 내용을 자동으로 `process.env` 객체에 로드해주어 매우 간편하게 개발할 수 있다.

- `dotenv` 설치 및 환경변수 설정법
    
    ```bash
    npm i dotenv
    ```
    
    ```jsx
    // data/database.js
    require('dotenv').config();
    
    let host = process.env.DB_HOST
    let port = process.env.DB_PORT
    let user = process.env.DB_USER
    let password = process.env.DB_PASSWORD
    
    const mysql = require('mysql2');
    
    const pool = mysql.createPool({
      host,
      // port: 3306,
      database: 'blog',
      user,
      password,
    });
    
    module.exports = pool;
    ```
    
    프로젝트 root 경로에 `.env` 파일을 생성하여 해당 환경변수에 맞는 값을 설정해주면 된다.
    
    ```jsx
    DB_HOST=localhost
    DB_PORT=portnumber
    DB_USER=user
    DB_PASSWORD=password
    ```

<br>

- 참고: `createConnection` vs `createPool`
    
    MySQL 데이터베이스와 연결하는 방식에는 `createConnection`과 `createPool` 두 가지가 있다.
    
    ```jsx
    const mysql = require('mysql2');
    mysql.createPool({ // how to connect to db });
    mysql.createConnection({ // how to connect to db });
    ```
    
    ![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/da8de42a-0366-439f-8611-8164db645cab)
    
    1. `createConnection`
        - **단일 연결 생성**: MySQL DB에 대한 단일 연결을 생성하고 이 커넥션이 DB와의 모든 통신을 처리
        - **수동 관리**: 커넥션을 직접 열고 닫아야 함
        - **리소스 사용**: 커넥션이 활성화되어 있지 않을 때도 리소스 사용
    2. `createPool`
        - **커넥션 풀 생성**: 여러 DB 연결을 관리하는 연결 풀을 생성하고 이를 통해 여러 커넥션이 풀에서 관리되고 필요에 따라 재사용됨
        - **자동 관리**: 커넥션 풀은 사용 가능한 커넥션을 자동으로 관리하고, 필요에 따라 새 커넥션을 열거나 유휴 커넥션을 닫음
        - **성능 및 효율성**: 커넥션 풀을 사용하면 커넥션을 재사용함으로써 애플리케이션의 성능과 효율성이 향상됨

<br>

- MySQL DB에서 데이터 가져오기
    
    ```jsx
    const express = require('express');
    
    const db = require('../data/database');
    
    const router = express.Router();
    
    // ...
    
    router.get('/new-post', (req, res) => {
      db.query('SELECT * FROM authors'); // sql문 입력
      res.render('create-post');
    });
    
    module.exports = router;
    ```
    
    이 때, 데이터를 정상적으로 가져오지 못하는데, 그 이유는 비동기함수로 데이터를 가져와야 하는데 동기적으로 가져오고 있기 때문이다. mysql2가 자체적으로 프로미스를 지원하므로 database.js 파일에 promise를 추가한다.

    <br>