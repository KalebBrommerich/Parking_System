CREATE DATABASE IF NOT EXISTS `Parking`;

use `Parking`;

drop table if exists `login`;

create table `login`(
`username` varchar(50) not null,
`password` varchar(30) not null,
primary key(`username`)
);
use Parking;

#This is so the backend can access the database
ALTER USER 'admin'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234';

insert into login values
  ('admin', 'admin'),
  ('jp4356rt','password1'),
  ('at4466up','password2'),
  ('rt3221tp','password3'),
  ('qw4398tw','password4'),
  ('wb8295nb', 'password');
  
select * from login
where (username = 'jp4356rt') and (password = 'password1');

drop table if exists `cars`;
create table `cars`(
`username` varchar(50) not null,
`plate` varchar(8) not null,
`make` varchar(20) not null,
`model` varchar(15) not null,
`color` varchar(15) not null,
`state` varchar(2) not null,
`permitNum` varchar(10) not null,
`status` varchar(10) not null,
primary key(`plate`,`username`,`make`,`model`,`color`,`state`,`permitNum`, `status`));,

