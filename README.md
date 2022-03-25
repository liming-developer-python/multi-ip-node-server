# multi-ip-2

Run ```npm install```

- DB install
```const db = mysql.createConnection({
      host: "localhost",
      user: "username(Ex: root)",
      password: "yourpassword",
      database: "multi_ip",
  });
```
Create database named "multi_ip"
Change this also in ```server.js```
Execute "db.sql" file to the database.

- Part Servers

You should run part servers first.
```node test_1.js```  Run ```127.0.0.1:4000``` Server to connect from Main Server.
```node test_2.js```  Run ```127.0.0.1:5000``` Server to connect from Main Server.


Finally, ```node server.js```
Check http://localhost:3000/

![image](https://user-images.githubusercontent.com/75870530/160172762-68f71f61-79e5-45ae-87b6-9b866b7c0d53.png)


