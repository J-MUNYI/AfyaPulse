CREATE DATABASE IF NOT EXISTS health_app;
USE health_app;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email_or_phone VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  age_range VARCHAR(20),
  sex VARCHAR(10),
  relationship VARCHAR(50),
  county VARCHAR(100),
  subcounty VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_profiles_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
);

CREATE TABLE checkins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  profile_id INT NOT NULL,
  checkin_date DATE NOT NULL,
  energy INT,
  sleep_quality VARCHAR(20),
  appetite VARCHAR(20),
  medications TEXT,           -- store JSON string here
  risk_level VARCHAR(10),
  recommendation_summary TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_checkins_profile
    FOREIGN KEY (profile_id) REFERENCES profiles(id)
    ON DELETE CASCADE,
  CONSTRAINT uq_profile_date UNIQUE (profile_id, checkin_date)
);

CREATE TABLE checkin_symptoms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  checkin_id INT NOT NULL,
  symptom_code VARCHAR(50) NOT NULL,
  CONSTRAINT fk_symptoms_checkin
    FOREIGN KEY (checkin_id) REFERENCES checkins(id)
    ON DELETE CASCADE
);

CREATE TABLE vitals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  checkin_id INT NOT NULL,
  weight_kg DECIMAL(5,2),
  bp_systolic INT,
  bp_diastolic INT,
  blood_sugar DECIMAL(5,2),
  blood_sugar_type VARCHAR(20),
  CONSTRAINT fk_vitals_checkin
    FOREIGN KEY (checkin_id) REFERENCES checkins(id)
    ON DELETE CASCADE
);