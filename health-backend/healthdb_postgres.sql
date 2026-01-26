-- PostgreSQL schema for health_app database

-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email_or_phone VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Profiles table
CREATE TABLE profiles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
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

-- Checkins table
CREATE TABLE checkins (
  id SERIAL PRIMARY KEY,
  profile_id INTEGER NOT NULL,
  checkin_date DATE NOT NULL,
  energy INTEGER,
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

-- Checkin symptoms table
CREATE TABLE checkin_symptoms (
  id SERIAL PRIMARY KEY,
  checkin_id INTEGER NOT NULL,
  symptom_code VARCHAR(50) NOT NULL,
  CONSTRAINT fk_symptoms_checkin
    FOREIGN KEY (checkin_id) REFERENCES checkins(id)
    ON DELETE CASCADE
);

-- Vitals table
CREATE TABLE vitals (
  id SERIAL PRIMARY KEY,
  checkin_id INTEGER NOT NULL,
  weight_kg DECIMAL(5,2),
  bp_systolic INTEGER,
  bp_diastolic INTEGER,
  blood_sugar DECIMAL(5,2),
  blood_sugar_type VARCHAR(20),
  CONSTRAINT fk_vitals_checkin
    FOREIGN KEY (checkin_id) REFERENCES checkins(id)
    ON DELETE CASCADE
);
