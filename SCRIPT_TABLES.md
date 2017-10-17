### Scripts de criação de tabela

- User
```sql
CREATE TABLE User (
 id INT NOT NULL AUTO_INCREMENT,
 phone VARCHAR(32),
 password VARCHAR(32),
 profile_picture MEDIUMBLOB,
 name VARCHAR(32),
 PRIMARY KEY (id)
);
```
```
ALTER TABLE User MODIFY profile_picture VARCHAR(120);
```

```sql
INSERT INTO User(phone,password, profile_picture, name) VALUES ("5511970691356","teste", "blooooob", "Marcelo");
```

- Message
```sql
 CREATE TABLE Message (
 id INT NOT NULL AUTO_INCREMENT,
 user_id INT REFERENCES User(id),
 content VARCHAR(256),
 towhom VARCHAR(32),
 hour INT,
 is_active INT NOT NULL,
 is_deleted INT NOT NULL,
 PRIMARY KEY (id)
);
```
```sql
INSERT INTO Message(user_id,content, towhom, hour, is_active, is_deleted) VALUES (1,"Mensagem customizada", "5511970691356", 10, 1, 0);
INSERT INTO Message(user_id,content, towhom, hour, is_active, is_deleted) VALUES (1,"Mensagem customizada 2", "5511970691356", 8, 1, 1);
INSERT INTO Message(user_id,content, towhom, hour, is_active, is_deleted) VALUES (1,"Mensagem customizada 3", "5511970691356", 10, 1, 0);
```
`
