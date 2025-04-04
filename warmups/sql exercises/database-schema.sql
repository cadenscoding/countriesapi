--this creates the table to store our userdata. 
--VARCHAR means variable charcter and stores text. 
--INT means integer. 
--need to include to tell the database what kind of data each column should store


CREATE TABLE Users (
  user_id INT,
  fullname VARCHAR(100),
  email VARCHAR(150),
  country VARCHAR(100)
  bio VARCHAR(500),
  );
  
 
  --idk how to handle user_id so left it off. this inserts data into the table created above--
  
  INSERT INTO Users (fullname,email,country,bio)
  VALUES
    ('caden','email1@test.com','usa','test bio'),
    ('bello','email2@test.com','usa','test bio'),
    ('sample','email3@test.com', 'mexico', 'test bio');
    
    
CREATE TABLE SavedCountries (
  user_id INT REFERENCES Users(user_id) --?--
  country_code VARCHAR(10),  
  );
  
  INSERT INTO SavedCountries (user_id,country_code)
  VALUES
  --idk for id so using 0 as value--
    (0,'US')
    (0,'US')
    (0,'MX')

	CREATE TABLE views(
	country_code VARCHAR,
	view_count INT,
	)

	INSERT INTO views(
		('MX',3)
		('US',6)
	)
    --queries 
    --update view count



UPDATE SavedCountries
SET view_count = view_count + 1
WHERE user_id = 1 AND country_code = 'MX';

--display saved countries
SELECT u.fullname, u.email, sc.country_code, sc.view_count
FROM SavedCountries sc
JOIN Users u ON sc.user_id = u.user_id
WHERE u.user_id = 1;


--above code i wrote as an example to bello, below is what we worked to collab on. including both to show progression 

CREATE TABLE userprofile (
	user_id INT PRIMARY KEY,
	user_name VARCHAR(100),
	email VARCHAR(255),
	country_name VARCHAR(100),
	bio TEXT
);
CREATE TABLE country_count (
	country_name VARCHAR(100) PRIMARY KEY,
	times_clicked INT DEFAULT 0
);
CREATE TABLE country_stats (
	country_name VARCHAR(100) PRIMARY KEY,
	number INT,
	user_id INT,
	FOREIGN KEY (user_id) REFERENCES userprofile(user_id),
	FOREIGN KEY (country_name) REFERENCES country_count(country_name)
);
CREATE TABLE saved_countries (
	country_name VARCHAR(100),
	times_clicked INT DEFAULT 0,
	user_id INT,
	PRIMARY KEY (country_name, user_id),
	FOREIGN KEY (user_id) REFERENCES userprofile(user_id),
	FOREIGN KEY (country_name) REFERENCES country_count(country_name)
);

INSERT INTO userprofile (user_id, user_name, email, country_name, bio)
VALUES (
		1,
		'Bello Carrington',
		'belloaise@carringtondesigns.com',
		'Sweden',
		'Bello Carrington is a software developer with over 10 years of experience in full-stack web development.  
    She specializes in React.js, HTML, CSS, and forum-structured design as well.
    In her free time, she enjoys crocheting, reading about historical events, and baking.'
	),
	(
		2,
		'Sammie A.',
		'sam@sammiea.com',
		'United States',
		'Sammie A. is a digital marketing strategist with a passion for e-commerce and SEO.  
    With years of experience in brand development, Sammie helps businesses grow their online presence.  
    Outside of work, she enjoys traveling, photography, and exploring the latest tech trends.'
	),
	(
		3,
		'Candance Arring',
		'candance@arring.com',
		'United States',
		'Candance Arring is a UX/UI designer with a focus on creating intuitive and aesthetically pleasing digital experiences.  
    With a background in graphic design, she bridges the gap between art and functionality.  
    Outside of work, Candance enjoys painting, playing the piano, and mentoring aspiring designers.'
	);

INSERT INTO country_count (country_name, times_clicked)
VALUES ('United States', 0),
	('Canada', 0),
	('Sweden', 0);

INSERT INTO saved_countries (country_name, times_clicked, user_id)
VALUES ('United States', 5, 1),
	('Canada', 3, 2),
	('Sweden', 2, 3);

INSERT INTO country_stats (country_name, number, user_id)
VALUES ('United States', 100, 1),
	('Canada', 75, 2),
	('Sweden', 50, 3);
	
	
	