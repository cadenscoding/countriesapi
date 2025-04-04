CREATE TABLE user_data (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR (25) NOT NULL,
    user_email VARCHAR(100) NOT NULL,
    user_country VARCHAR(25) NOT NULL,
    bio VARCHAR(500),
);

CREATE TABLE user_saved_countries (
    user_id SERIAL PRIMARY KEY,
    country_code VARCHAR (20),
    country_name VARCHAR (100),
    flag VARCHAR(255),
    region VARCHAR(255),
    capital VARCHAR(255),
    population INT,
);

CREATE TABLE country_clicks (
    click_id SERIAL PRIMARY KEY,
    country_code VARCHAR(20),
    country_count INT
);

-- TRUNCATE table to remove and reset auto-increment 
--added test data using postman while checking endpoints 
--but if i were to add it in using commands it would look like this 

INSERT INTO user_data (user_name, user_email, user_country, bio) VALUES
('testing', 'test@test.com', 'USA', 'this is a bio');

INSERT INTO user_saved_countries (country_code,country_name,flag,region,capital,population ) VALUES
('SGS', 'South Georgia', 'exampleurl', 'Antarctic', 'King Edward Point', 0);

INSERT INTO country_clicks (country_code,country_count ) VALUES
('SGS', 15)

--user info and saved countries
SELECT 
    ud.user_name,
    usc.country_name,
    usc.capital,
    usc.region
FROM 
    user_data ud
JOIN 
    user_saved_countries usc ON ud.user_id = usc.user_id;

--most clicked 
SELECT 
    usc.country_name,
    cc.country_code,
    cc.country_count
FROM 
    country_clicks cc
JOIN 
    user_saved_countries usc ON cc.country_code = usc.country_code
ORDER BY 
    cc.country_count DESC
LIMIT 1;