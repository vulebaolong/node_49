-- CSDL


-- Tạo database
CREATE DATABASE db_demo123
CREATE DATABASE IF NOT EXISTS db_demo123

-- Xoá database
DROP DATABASE db_demo123
DROP DATABASE IF EXISTS db_demo123

-- Chọn database
USE db_demo

-- TABLE

-- Tạo table
CREATE TABLE IF NOT EXISTS `users` (
	`id` INT,
	`fullName` VARCHAR(255),
	`email` VARCHAR(255),
	`isActive` BOOLEAN
)

-- Xoá table
DROP TABLE `users`


-- Ràng buộc
-- NOT NULL: cột không được NULL, bắt buộc phải có dữ liệu
CREATE TABLE `not_null`(
	id INT NOT NULL
)

-- UNIQUE: duy nhất, dữ liệu ở cột đó không được trùng nhau
CREATE TABLE `unique` (
	id INT NOT NULL UNIQUE
)

-- PRIMARY KEY: kết hợp của NOT NULL và UNIQUE
-- AUTO_INCREMENT: tăng số tự động, tránh bị trùng lặp 
CREATE TABLE `primary_key` (
	id INT PRIMARY KEY AUTO_INCREMENT
)

INSERT INTO `users` (email, fullName) VALUES ("long@gmail.com", "longlonglong")









