use Parking;

insert into login values
  ('jp4356rt','password1'),
  ('at4466up','password2'),
  ('rt3221tp','password3'),
  ('qw4398tw','password4');

select * from login 
where (username = 'jp4356rt') and (password = 'password1');

insert into carInfo values
  ('at4466up','215BG2','Ford','Fusion','Black','MN'),
  ('rt3221tp','123ABC','Chevy','Impala','Gray','WI'),
  ('rt3221tp','100AFA','BMW','I8','White','NV'),
  ('jp4356rt','375PGR','Dodge','Viper','Red','ND');
  
/*
select * from carInfo  

where (username = 'jp4356rt') and (plate = '375PGR') and 
	  (make = 'Dodge') and (model = 'Viper') and 
      (color = 'Red') and (state = 'ND');
*/

select * from carInfo  
where (username = 'rt3221tp');
