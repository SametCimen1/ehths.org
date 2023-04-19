CREATE DATABASE ehths 

CREATE TABLE whitelist(
  id SERIAL PRIMARY KEY,
  email varchar(200) NOT NULL UNIQUE,
  name varchar(200) NOT NULL
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email varchar(255) UNIQUE NOT NULL,
    password varchar(255) NOT NULL,
    role varchar(10),
    active boolean NOT NULL,
    activeCode varchar(255),
    name varchar(255) NOT NULL,
    friends integer[],
    add_id varchar(50) NOT NULL UNIQUE,
    about varchar(255),
    ownimg boolean,
    image varchar(255),
    friendrequests integer[],
    points integer,
    grade integer
);


CREATE TABLE chat(
    id SERIAL PRIMARY KEY,
    sender integer NOT NULL,
    reciever integer NOT NULL,
    content varchar(255) NOT NULL
);

CREATE TABLE groups(
    id SERIAL PRIMARY KEY,
    groupName varchar(255) NOT NULL,
    members integer[],
    groupTitle varchar(2000)  NOT NULL,
    groupDescription varchar(5000) NOT NULL,
    postsid integer[],
    groupimage varchar(2000),
    createdby integer REFERENCES users(id)
);


CREATE TABLE groupposts(  
    id SERIAL PRIMARY KEY,
    groupid integer REFERENCES groups(id),
    groupName varchar(255) NOT NULL,
    userid integer REFERENCES users(id),
    title varchar(255) NOT NULL,
    text varchar(1000) NOT NULL,
    uploadtime timestamp,
    commentby integer[],
    likedby integer[],
    likes integer,
    comments integer
);


CREATE TABLE posts(
    id SERIAL PRIMARY KEY,
    userId integer REFERENCES users(id),
    title varchar(255) NOT NULL,
    text varchar(1000) NOT NULL,
    uploadtime timestamp,
    commentby integer[],
    likedby integer[],
    likes integer,
    comments integer
);

CREATE TABLE friendposts(  
    id SERIAL PRIMARY KEY,
    userid integer REFERENCES users(id),
    title varchar(255) NOT NULL,
    text varchar(1000) NOT NULL,
    uploadtime timestamp,
    commentby integer[],
    likedby integer[],
    likes integer,
    comments integer
);

