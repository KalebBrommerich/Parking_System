CREATE DATABASE IF NOT EXISTS `Parking`;
use `Parking`;

drop table if exists `login`;
create table `login`(
`username` varchar(50) not null,
`password` varchar(30) not null,
primary key(`username`)
);

drop table if exists `carInfo`;
create table `carInfo`(
`username` varchar(50) not null,
`plate` varchar(8) not null,
`make` varchar(20) not null,
`model` varchar(15) not null,
`color` varchar(15) not null,
`state` varchar(2) not null,
primary key(`plate`,`username`)

);




