# Hakbah Assessment

The aim of this assessment is to provide the following endpoints :
  1. Signup new USER (POST)
  2. Create a Login API (POST)
  3. Get User Profile (GET)
  4. Change Password (PUT)

The assessment was implemented using ExpressJS, MongoDB and Passport for authentication.


These 4 endpoints are available with the following structure 
```
POST {{host}}:{{port}}/signup

request body :
{
    "username":"string",
    "email":"correct@format.com",
    "password":"string",
    "age":number,
    "gender":"string"
}


POST {{host}}:{{port}}/login

request body :
{
    "username":"string",
    "password":"string",
}

GET {{host}}:{{port}}/users/id ( where id is a dynamic value ) 

PUT {{host}}:{{port}}/reset-password 
request body : 
{
        "oldpassword":"string",
        "newpassword":"string"
}

```

So in order for these endpoint to be usable there were multiple endpoints implemented which are :
```
GET {{host}}:{{port}}/logout -- to logout from the authentication session
GET {{host}}:{{port}}/users/  -- To get all values
PUT {{host}}:{{port}}/users/id ( where id is a dynamic value ) to put a value into the model
DELETE {{host}}:{{port}}/users/id -- to delete a specific user
```

To start using the project do the one of the following methods : 

#1 Easy Installment Method : 

You need to download docker from the official website 
use the docker image with the following command 
https://docs.docker.com/get-docker/

then you need to clone the repo on your workspace

```
git clone https://github.com/MahmoudAli1/hakbah_assessment.git

```

after that you need to move to the project directory using 
```
cd hakbah_assessment
```

after that you need to run 
```
docker build -t hakbah .
```
then run 
```
docker run -d --restart unless-stopped -p 1234:1234 --name hakbah hakbah
```
after that you'll be able to see the logs through the following command 
```
docker logs -f hakbah -n 1000
```




## if you want to stop the application from being running you can use the following command 
```
docker rm -f hakbah
```


# Classic Method : 

you need first to download mongodb using the following link 
https://docs.mongodb.com/manual/installation/ depending on your machine 

after that you need to make sure that mongo is running successfully on port 27017 ( default port )

then 
```
git clone https://github.com/MahmoudAli1/hakbah_assessment.git

```
Then run 
```
npm i
```

Then run 
```
npm run start:prod --> for production
```

in case you want to run in locallay [ dev ] you need to add the env variables in the following manner 
```
PORT= //default -> 6666
HOST= //default -> localhost 
SECRET= //add any value to generate secret 
MONGO_URI= mongodb://localhost/hakbah
```

and then run 
```
npm run dev --> for dev 
```


## Future Improvements :
  - Implementation of OAuth Strategy / Bearer Token Strategy.
  - MakeFile to make the steps less complex and easier.
