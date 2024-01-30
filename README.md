# SQL

> Structured Query Language

MySQL, PostgreSQL, Microsoft SQL 등… 다양하지만 MySQL을 설치해서 사용해 볼 예정

## 📌 MySQL 설치

`MySQL`, `MySQL Workbench` 설치

[MySQL 설치(macOS) | 코드잇](https://www.codeit.kr/tutorials/5/MySQL-설치-macOS)

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/3530134b-baeb-4066-9086-20aea55745eb)

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/a052d954-38bd-4a7b-a467-e4b0e9752f7d)

설치 후 `시스템 설정 - MySQL`에서 서버를 켜고 끌 수 있다.

<br>
<br>

## 📌 Database System vs Database

MySQL은 소프트웨어 자체이다.

- 실제로 데이터베이스를 호스팅하는 데이터베이스 서버가 포함
- 저장된 데이터에 연결하거나 데이터를 가져오는데 사용
- `MySQL Workbench` : MySQL 소프트웨어 패키지의 일부인 UI 클라이언트

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/9be2a064-8eb4-4bcc-9587-8687e665fce6)

- MySQL : DB 서버와 워크벤치같은 UI 클라이언트를 포함한 전체 데이터베이스 시스템
- MySQL Server : 데이터베이스를 호스트하는 실제 DB 서버
- Schemas : 서버에 실제로 존재하는 데이터베이스들
    - 이 각각의 데이터베이스들이 테이블과 데이터를 가지고 있음

<br>
<br>

## 📌 SQL 코드 작성 & 데이터베이스 생성

### 데이터베이스 생성

```sql
CREATE SCHEMA `restaurant_finder` ;
```

```sql
CREATE DATABASE restaurant_finder ;
```

두 가지 모두 가능하다.

<br>

### 테이블 생성 및 구조 만들기

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/158c9b2a-12cd-4ffd-adb5-b88fe097c9b0)

```sql
CREATE TABLE restaurant_finder.restaurants (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`));
)
ENGINE = InnoDB;
```

<br>

### 테이블에 데이터 삽입

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/23573647-657c-41d5-89fa-a4c6412bf59d)

```sql
INSERT INTO restaurants (name, type) VALUES ('아웃백', '패밀리레스토랑')
```

<br>

### 테이블에서 데이터 읽기

- 현재 등록된 전체 데이터

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/91adaa07-363c-4f4a-8f7d-46632c32d405)

<br>

- 전체 레코드 가져오기

```sql
SELECT * FROM restaurants // 테이블명
```

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/4df8c6e0-d42c-4e65-9126-bbdfc5c4bc93)

<br>

- 레코드의 subset(하위집합) 가져오기

```sql
SELECT * FROM restaurants WHERE type = '멕시칸'
```

> 등호를 1개만 쓴다는 것에 유의한다.
> 
> - JavaScript 등 프로그래밍 언어에서는 보통 =가 값의 `할당`을 이야기하지만, SQL에서는 말 그대로 `같음`을 의미

<br>

- 해당 조건의 특정 열만 가져오기

```sql
SELECT name FROM restaurants WHERE type = '패밀리레스토랑'
SELECT id, name FROM restaurants WHERE type = '패밀리레스토랑'
```

<br>

- 조건 추가하기 (`AND` 또는 `OR`)

```sql
SELECT * FROM restaurants WHERE type = '패밀리레스토랑' OR name > 'ㅊ'
```

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/93dba128-b07f-4166-b66c-ef38ef17ee33)

<br>

- 개수 계산하기
```sql
SELECT COUNT(*) FROM restaurants WHERE name > 'ㅊ'
```

<br>

### 데이터 업데이트 및 삭제

- 업데이트

```sql
UPDATE restaurants SET name = '아웃백 스테이크 하우스' WHERE id = 1
```

<br>

- 삭제

```sql
DELETE FROM restaurants WHERE id = 1
```

<br>
<br>

## 조금 더 복잡한 DB 설계

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/fd1af89e-1791-4500-9874-c2c4c0b70968)

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/a40b951c-9bdf-4213-a765-4a0e8d0646d1)

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/8ea478be-7d46-4297-8bf1-e802af75e688)

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/64661e24-5720-42a6-8d83-3fdf0e4c1199)

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/32b9b9e7-408c-4253-8526-e87a5a394729)

<br>
<br>

## 관련 데이터 쿼리 및 테이블 조인하기

### `INNER JOIN` table_name `ON` condition

- restaurants 테이블의 address_id를 이용하여 addresses 테이블과 조인

```sql
SELECT * FROM restaurants
INNER JOIN addresses ON (restaurants.address_id = addresses.id);
```


- 조인하여 가져오고 싶은 정보(restaurants 테이블의 id, name)만 쿼리하기

```sql
SELECT restaurants.id, restaurants.name, addresses.* FROM restaurants
INNER JOIN addresses ON (restaurants.address_id = addresses.id);
```


- 여러 테이블을 조인할 수도 있다.

```sql
SELECT restaurants.id, restaurants.name, addresses.*, types.name AS type_name FROM restaurants
INNER JOIN addresses ON (restaurants.address_id = addresses.id)
INNER JOIN types ON (restaurants.type_id = types.id)
WHERE addresses.province = '서울특별시'
```

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/8233516f-7733-4a94-a871-7345c7b40ca0)

<br>

### 도전과제

1. 평점이 3보다 큰 리뷰를 모두 선택하는 쿼리 작성하기
    
    ```sql
    SELECT * FROM reviews WHERE rating > 3
    ```
    
2. 모든 레스토랑 데이터, 레스토랑의 전체 주소 데이터 및 전체 유형 데이터를 조인하여 result grid에 나타내보기
    
    ```sql
    SELECT * FROM reviews
    INNER JOIN restaurants ON reviews.restaurant_id = restaurants.id
    INNER JOIN addresses ON restaurants.address_id = addresses.id
    INNER JOIN types on restaurants.type_id = types.id
    WHERE rating > 3
    ```
    

- 조건 좀 더 추가해보기

  ```sql
  SELECT restaurants.name AS restaurant_name, types.name AS restaurant_type, reviews.reviewer_name, reviews.rating, reviews.text, addresses.*FROM reviews
  INNER JOIN restaurants ON reviews.restaurant_id = restaurants.id
  INNER JOIN addresses ON restaurants.address_id = addresses.id
  INNER JOIN types on restaurants.type_id = types.id
  WHERE rating > 3
  ```

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/178d453b-f00d-4ffa-9b6c-936d13729610)

<br>
<br>