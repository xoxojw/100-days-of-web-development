# NoSQL - MongoDB

## NoSQL DB의 특징

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/c69f3ca6-a562-4da9-8e18-46d528e337fa)

- 데이터를 저장할 때 엄격한 스키마나 데이터 구조, 여러 테이블 간의 관계에 의존하지 않는다.
- 테이블 대신 ‘컬렉션’에 데이터를 저장
- 유연성 : 다양한 데이터 타입과 구조를 쉽게 저장하고 변경할 수 있음

<br>

### 컬렉션과 문서

**컬렉션**

- 테이블과 비슷하지만 테이블과 달리 고정된 구조가 없음
- 데이터 컨테이너의 개념
- DB에는 하나 이상의 컬렉션이 있고, 컬렉션 내부에는 ‘문서’들이 있다.

**문서**

- 자바스크립트 객체 형태처럼 생김
- key-value pair
- 같은 컬렉션 안의 문서들은 같은 형태를 가질 필요가 없다.
    - ex. Collection 1의 두 문서 `{”id”: “abc”, “name”: “Max”}`, `{”id”: “cde”, “title”: “Book”}`
    - 한 문서는 `“name”: “Max”`, 다른 문서는 `“title”: “Book”`처럼 다른 key-value 형태를 가지고 있음을 알 수 있음

NoSQL은 JavaScript의 객체, JavaScript에서의 데이터 관리 방법과 많은 유사점이 있다.

하지만 JavaScript는 프로그래밍 언어이고 프로그램이 실행되는 동안에만 메모리에서 관리된다. 반면에 MongoDB와 같은 NoSQL 데이터베이스는 데이터가 파일에 저장되어 지속된다는 점에서 차이가 있다.

> ✏️ 문서는 객체처럼 보일 수 있으나 프로그래밍 언어가 아닌 데이터베이스 시스템이라는 점을 기억하자!
> 

<br>
<br>

## NoSQL에서의 관계 데이터

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/ebf9f758-a1b4-4056-8fd0-de4be58df1bc)

- 관계 데이터를 정규화하여 여러 테이블에 나누어 저장하는 SQL과는 달리, NoSQL은 관계 데이터를 하나의 문서에 함께 저장하는 경우가 많음
- `Books` 컬렉션의 문서에서 `“author”` 항목을 보면 **중첩된 형태**로 저장되어있는 것을 확인할 수 있음
- 자주 사용하는 관계 데이터는 중첩된 형태로 저장해서 사용할 수도 있지만, `Movies` 컬렉션처럼 별개의 컬렉션으로 나누어서 저장할 수도 있음

<br>

### 데이터베이스 쿼리 계획하기

- NoSQL에서는 쿼리가 가능한 효율적이 되도록 데이터베이스 레이아웃을 최적화 해야함
- 자주 함께 조회되는 데이터는 일반적으로 함께 저장 (서로 다른 컬렉션에서 데이터를 머지하고자 하는 상황은 최소화해야함)

<br>
<br>

## MongoDB 설치

### brew로 설치

[Install MongoDB Community Edition on macOS](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/)

```bash
brew tap mongodb/brew
brew update
brew install mongodb-community
```

<br>

### mongod, mongosh 실행

> mongod : 데이터베이스 서버
mongosh : MongoDB 서버에 명령을 보내기 위한 셸(도구)
> 

먼저 원하는 곳에 MongoDB의 data와 log 파일을 저장해둘 로컬 폴더를 각각 만든다.

- ex. `mongodb/data`, `mongodb/logs`

위에서 만든 로컬 폴더 경로를 아래처럼 설정하여 MongoDB 서버를 실행한다.

```bash
// MongoDB 서버 실행, 데이터 경로 설정(실행마다 path 커맨드 입력해야함)
mongod --dbpath /Users/jiwon/mongodb/data --logpath /Users/jiwon/mongodb/logs/mongo.log

// 위의 mongod 실행 중인 터미널이 아닌 새 터미널 창에서 몽고디비 셸 실행
mongosh

// 종료 - Ctrl+C (Cmd+C 아님)
```

성공적으로 실행된 터미널 모습은 아래와 같다.

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/a9726bac-75e9-4adf-8b1b-9fdca2fe0610)

<br>
<br>

## MongoDB 데이터베이스 조작하기

### 데이터베이스/컬렉션 전환, 생성

- `use databasename`
    
    ```bash
    use ratingportal
    ```
    
    - `ratingportal`이라는 데이터베이스로 전환
        - 만약 이 데이터베이스가 존재하지 않는 경우, 바로 이 데이터베이스를 자동 생성하지는 않으나 이 데이터베이스 내에 새로운 데이터를 삽입하는 순간 데이터베이스가 자동으로 생성됨

- `db.collections`
    
    ```bash
    db.restaurants
    ```
    
    - `restaurants`라는 컬렉션 참조
        - 이 컬렉션이 존재하지 않으면, `use`와 마찬가지로 이 컬렉션에 새 데이터를 삽입하면 컬렉션이 자동 생성됨
    - 자바스크립트 객체 속성에 액세스 하는 것과 유사

<br>

### 데이터 Create

- `db.collections.insertOne` : 단일 삽입
    
    ```bash
    db.restaurants.insertOne({ name: "아웃백 스테이크하우스", address: { street: "어떤대로 1", streetNumber: "23" } })
    db.restaurants.insertOne({ name: "버거 하우스", address: { street: "다른로", streetNumber: "2" } })
    ```
    

- `db.collections.insertMany` : 다수 삽입
    
    ```bash
    db.restaurants.insertMany([
    	{
    		name: "아웃백 스테이크하우스",
    		address: { street: "어떤대로 1", streetNumber: "23" },
    	},
    	{
    		name: "버거 하우스",
    		address: { street: "다른로", streetNumber: "2" },
    	},
    ])
    ```
    
<br>

### 데이터 Read

- `db.collections.find()`
    
    ```bash
    db.restaurants.find() // 전체 데이터 조회
    
    [
      {
        _id: ObjectId('65cb1fcf30268aa2a2f2fed5'),
        name: '아웃백 스테이크하우스',
        address: { street: '어떤대로 1', streetNumber: '23' }
      },
      {
        _id: ObjectId('65cb204c30268aa2a2f2fed6'),
        name: '버거 하우스',
        address: { street: '다른로', streetNumber: '2' }
      }
    ]
    ```
    
    ```bash
    db.restaurants.find({ name: "아웃백 스테이크하우스" }) // 조건을 충족하는 데이터 조회
    
    [
      {
        _id: ObjectId('65cb1fcf30268aa2a2f2fed5'),
        name: '아웃백 스테이크하우스',
        address: { street: '어떤대로 1', streetNumber: '23' }
      }
    ]
    ```
    

- `db.collections.findOne({ condition })`
    - 일치하는 문서 중 첫번째 일치하는 문서 반환

<br>

### 데이터 Update

- `db.collections.updateOne({})` : 단일 업데이트
- `db.collections.updateMany({})` : 다수 업데이트
- `$set` : 문서 내의 특정 필드를 업데이트할 때 사용하는 연산자
    
    ```bash
    ratingportal> db.restaurants.find()
    [
      {
        _id: ObjectId('65cb1fcf30268aa2a2f2fed5'),
        name: '아웃백 스테이크하우스',
        address: { street: '어떤대로 1', streetNumber: '23' }
      },
      {
        _id: ObjectId('65cb204c30268aa2a2f2fed6'),
        name: '버거 하우스',
        address: { street: '어떤대로', streetNumber: '2' }
      }
    ]
    
    // $set을 사용하여 업데이트
    ratingportal> db.restaurants.updateOne(
      { _id: ObjectId('65cb204c30268aa2a2f2fed6') },
      { $set: { name: "New 버거 하우스" } }
    )
    
    // $set으로 업데이트 할 때 중첩 필드도 가능
    db.restaurants.updateOne(
      { _id: ObjectId('65cb1fcf30268aa2a2f2fed5')},
      { $set: { "address.street": "어떤대로" } }
    )
    
    ratingportal> db.restaurants.find()
    [
      {
        _id: ObjectId('65cb1fcf30268aa2a2f2fed5'),
        name: '아웃백 스테이크하우스',
        address: { street: '어떤대로', streetNumber: '23' }
      },
      {
        _id: ObjectId('65cb204c30268aa2a2f2fed6'),
        name: 'New 버거 하우스',
        address: { street: '다른로', streetNumber: '2' }
      }
    ]
    ```

<br>   

### 데이터 Delete

- `db.collections.deleteOne()` :  단일 삭제
    
    ```bash
    ratingportal> db.restaurants.find()
    [
      {
        _id: ObjectId('65cb1fcf30268aa2a2f2fed5'),
        name: '아웃백 스테이크하우스',
        address: { street: '어떤대로', streetNumber: '23' }
      },
      {
        _id: ObjectId('65cb204c30268aa2a2f2fed6'),
        name: 'New 버거 하우스',
        address: { street: '다른로', streetNumber: '2' }
      }
    ]
    ratingportal> db.restaurants.deleteOne({ _id: ObjectId('65cb204c30268aa2a2f2fed6') })
    { acknowledged: true, deletedCount: 1 }
    ratingportal> db.restaurants.find()
    [
      {
        _id: ObjectId('65cb1fcf30268aa2a2f2fed5'),
        name: '아웃백 스테이크하우스',
        address: { street: '어떤대로', streetNumber: '23' }
      }
    ]
    ```
    
- `db.collections.deleteMany()` : 다수 삭제
    - `db.collections.deleteMany({})` : 빈 객체를 전달하면 해당 컬렉션의 데이터 전체 삭제

<br>
<br>

## restaurants DB로 SQL과 NoSQL 비교

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/e3e8f7d5-e06b-4274-8bc1-81b563d5add8)

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/d0b57c14-ac14-440a-94b3-94076691e358)

SQL은 좀 더 정형화 되어있다면 NoSQL은 좀 더 유연적이라는 것이 특징이다.

<br>

```bash
ratingportal> db.types.insertOne({name: "양식" })
{
  acknowledged: true,
  insertedId: ObjectId('65ce2b041a15794c64a9fdf6')
}
ratingportal> db.types.insertOne({name: "한식"})
{
  acknowledged: true,
  insertedId: ObjectId('65ce2b0d1a15794c64a9fdf7')
}
ratingportal> db.types.insertOne({name:"중식"})
{
  acknowledged: true,
  insertedId: ObjectId('65ce2b151a15794c64a9fdf8')
}
ratingportal> db.types.insertOne({name: "일식"})
{
  acknowledged: true,
  insertedId: ObjectId('65ce2b1f1a15794c64a9fdf9')
}
ratingportal> db.types.find()
[
  { _id: ObjectId('65ce2b041a15794c64a9fdf6'), name: '양식' },
  { _id: ObjectId('65ce2b0d1a15794c64a9fdf7'), name: '한식' },
  { _id: ObjectId('65ce2b151a15794c64a9fdf8'), name: '중식' },
  { _id: ObjectId('65ce2b1f1a15794c64a9fdf9'), name: '일식' }
]
ratingportal> db.restaurants.insertOne(name: '맥도날드',
    address: {
      street: '강남대로',
      streetNumber: '30',
      postalCode: 80333,
      city: '서울시',
      country: '대한민국'
    },
    type: { typeId: ObjectId('65ce2b041a15794c64a9fdf6'), name: '양식' })
ratingportal> db.reviews.insertOne({reviewer: { firstName: 'Max', lastName: 'Schwarzmüller' }, rating: 5,
    text: '클래식해요',
    date: new Data('2024-02-15'),
    restaurant: {
      restaurantId: ObjectId('65ce2c191a15794c64a9fdfa'),
      name: '맥도날드'
    }
 })
```

<br>
<br>