-- SQLBook: Code
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
	`id` INT PRIMARY KEY AUTO_INCREMENT,
	`fullName` VARCHAR(255),
	`email` VARCHAR(255),
	`password` VARCHAR(255),
	`isActive` BOOLEAN
)

-- Xoá table
DROP TABLE `users`

-- Thêm cột sau khi đã có table
ALTER TABLE `users`
ADD `password` VARCHAR(255)

-- Chỉnh sửa cột sau khi đã có table
ALTER TABLE `users`
MODIFY COLUMN `isActive` BOOLEAN DEFAULT 1

ALTER TABLE `users`
MODIFY COLUMN `id` INT PRIMARY KEY AUTO_INCREMENT

-- Xoá tất cả dữ liệu bên trong bảng, nhưng không xoá bảng đó
TRUNCATE TABLE `users`


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

INSERT INTO `users` (`id`, `email`, `fullName`, `password`) VALUES 
(1, "a@gmail.com", "Nguyen van A", "1234"),
(2, "b@gmail.com", "Nguyen van B", "1234"),
(3, "c@gmail.com", "Nguyen van C", "1234"),
(4, "d@gmail.com", "Nguyen van D", "1234")

CREATE TABLE `foods` (
	`id` INT PRIMARY KEY AUTO_INCREMENT,
	`foodName` VARCHAR(255),
	`description` VARCHAR(255)
)

INSERT INTO `foods` (`id`, `foodName`, `description`) VALUES
(1, "su kem", "bánh được làm từ kem"),
(2, "gỏi gà", "gỏi được làm từ gà"),
(3, "gỏi vịt", "gỏi được làm từ vịt"),
(4, "gỏi cá", "gỏi được làm từ cá"),
(5, "gỏi heo", "gỏi được làm từ heo")

CREATE TABLE orders (
	`id` INT PRIMARY KEY AUTO_INCREMENT,
	`userId` INT,
	`foodId` INT,
	
	FOREIGN KEY (userId) REFERENCES `users`(id),
	FOREIGN KEY (foodId) REFERENCES `foods`(id)
)

INSERT INTO `orders` (`userId`, `foodId`) VALUES
(1, 2),
(3, 1),
(2, 5),
(1, 3),
(3, 2)

-- QUERY

SELECT * FROM `orders` WHERE `id` = 3


-- INNER JOIN
-- lấy thêm dữ liệu từ id
SELECT * 
FROM `orders` 
INNER JOIN `users` ON `orders`.userId = `users`.id

-- LEFT JOIN: table bên trái làm chuẩn
-- trả về tắt cả các hàng từ bảng bên trái, ngay cả khi không có bản ghi khớp với bảng bên phải
SELECT * 
FROM `orders`
LEFT JOIN `users` ON `orders`.userId = `users`.id

SELECT * 
FROM `users`
LEFT JOIN `orders` ON `orders`.userId = `users`.id

-- RIGHT JOIN: ngược lại với LEFT JOIN

-- CROSS JOIN: lấy tất cả
SELECT * 
FROM `users`
CROSS JOIN `orders`


-- Tìm người đã đặt hàng nhiều

-- Bước 1: lấy ra tất cả bảng orders, vì khi người dùng mua sẽ được thêm vào bảng orders
SELECT *
FROM `orders`

-- Bước 2: 
SELECT *
FROM `orders`
INNER JOIN `users` ON `orders`.userId = `users`.id

-- Bước 3: nhóm và đếm
-- GROUP BY: nhóm những record giống nhau, và có thể dùng thêm các hàm tổng hợp: COUNT(), MAX(), MIN(), SUM(), AVG()
SELECT `userId`, `users`.`id`, `fullName`, `email`, `isActive`, `password`, COUNT(`userId`) AS "Số lần mua"
FROM `orders`
INNER JOIN `users` ON `orders`.userId = `users`.id
GROUP BY  `userId`

-- Bước 4: sắp từ lớn tới bé => giảm dần
-- ORDER BY: 
-- DESC: giảm dần
-- ASC: tăng dần
SELECT `userId`, `users`.`id`, `fullName`, `email`, `isActive`, `password`, COUNT(`userId`) AS "Số lần mua"
FROM `orders`
INNER JOIN `users` ON `orders`.userId = `users`.id
GROUP BY  `userId`
ORDER BY COUNT(`userId`) DESC

-- Bước 5: lấy ra người đầu tiên
SELECT `userId`, `users`.`id`, `fullName`, `email`, `isActive`, `password`, COUNT(`userId`) AS "Số lần mua"
FROM `orders`
INNER JOIN `users` ON `orders`.userId = `users`.id
GROUP BY  `userId`
ORDER BY COUNT(`userId`) DESC
LIMIT 1










