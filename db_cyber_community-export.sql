-- -------------------------------------------------------------
-- TablePlus 6.6.2(622)
--
-- https://tableplus.com/
--
-- Database: db_cyber_community
-- Generation Time: 2025-06-30 20:44:38.3730
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP TABLE IF EXISTS `Articles`;
CREATE TABLE `Articles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` text,
  `imageUrl` varchar(500) DEFAULT NULL,
  `views` int NOT NULL DEFAULT '0',
  `userId` int NOT NULL,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `Articles_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `ChatGroupMembers`;
CREATE TABLE `ChatGroupMembers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `chatGroupId` int DEFAULT NULL,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `chatGroupId` (`chatGroupId`),
  CONSTRAINT `ChatGroupMembers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`),
  CONSTRAINT `ChatGroupMembers_ibfk_2` FOREIGN KEY (`chatGroupId`) REFERENCES `ChatGroups` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `ChatGroups`;
CREATE TABLE `ChatGroups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `ownerId` int DEFAULT NULL,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `ownerId` (`ownerId`),
  CONSTRAINT `ChatGroups_ibfk_1` FOREIGN KEY (`ownerId`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `ChatMessages`;
CREATE TABLE `ChatMessages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `chatGroupId` int NOT NULL,
  `userIdSender` int NOT NULL,
  `messageText` text,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `chatGroupId` (`chatGroupId`),
  KEY `userIdSender` (`userIdSender`),
  CONSTRAINT `ChatMessages_ibfk_1` FOREIGN KEY (`chatGroupId`) REFERENCES `ChatGroups` (`id`),
  CONSTRAINT `ChatMessages_ibfk_2` FOREIGN KEY (`userIdSender`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Permissions`;
CREATE TABLE `Permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `endpoint` varchar(255) NOT NULL,
  `method` varchar(100) NOT NULL,
  `module` varchar(100) NOT NULL,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `RolePermission`;
CREATE TABLE `RolePermission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `roleId` int NOT NULL,
  `permissionId` int NOT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `roleId` (`roleId`),
  KEY `permissionId` (`permissionId`),
  CONSTRAINT `RolePermission_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `Roles` (`id`),
  CONSTRAINT `RolePermission_ibfk_2` FOREIGN KEY (`permissionId`) REFERENCES `Permissions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Roles`;
CREATE TABLE `Roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `deletedBy` int DEFAULT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `facebookId` varchar(255) DEFAULT NULL,
  `googleId` varchar(255) DEFAULT NULL,
  `roleId` int NOT NULL DEFAULT '2',
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `totpSecret` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `facebookId` (`facebookId`),
  UNIQUE KEY `googleId` (`googleId`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `Users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `Roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Articles` (`id`, `title`, `content`, `imageUrl`, `views`, `userId`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, NULL, 'Content about learning NextJS...', 'https://picsum.photos/seed/1/600/400', 15, 1, 0, 0, NULL, '2024-01-01 08:00:00', '2024-01-01 08:00:00'),
(2, NULL, 'Content about mastering React Query...', 'https://picsum.photos/seed/2/600/400', 32, 2, 0, 0, NULL, '2024-01-02 09:00:00', '2024-01-02 09:00:00'),
(3, NULL, 'Content about JavaScript tips...', 'https://picsum.photos/seed/3/600/400', 45, 1, 0, 0, NULL, '2024-01-03 10:00:00', '2024-01-03 10:00:00'),
(4, NULL, 'Comparison content...', 'https://picsum.photos/seed/4/600/400', 27, 3, 0, 0, NULL, '2024-01-04 11:00:00', '2024-01-04 11:00:00'),
(5, NULL, 'Content about TypeScript...', 'https://picsum.photos/seed/5/600/400', 12, 2, 0, 0, NULL, '2024-01-05 12:00:00', '2024-01-05 12:00:00'),
(6, NULL, 'Content about SQL joins...', 'https://picsum.photos/seed/6/600/400', 15, 3, 0, 0, NULL, '2024-01-06 13:00:00', '2025-05-23 04:10:47'),
(7, NULL, 'Extensions content...', 'https://picsum.photos/seed/7/600/400', 60, 1, 0, 0, NULL, '2024-01-07 14:00:00', '2024-01-07 14:00:00'),
(8, NULL, 'Content about React optimization...', 'https://picsum.photos/seed/8/600/400', 33, 2, 0, 0, NULL, '2024-01-08 15:00:00', '2024-01-08 15:00:00'),
(9, NULL, 'Content about API design...', 'https://picsum.photos/seed/9/600/400', 18, 3, 0, 0, NULL, '2024-01-09 16:00:00', '2024-01-09 16:00:00'),
(10, NULL, 'Predictions about web development...', 'https://picsum.photos/seed/10/600/400', 21, 1, 0, 0, NULL, '2024-01-10 17:00:00', '2024-01-10 17:00:00'),
(12, '', 'Content about learning NextJS...', 'https://picsum.photos/seed/1/600/400', 15, 1, 2, 1, '2025-05-28 15:09:52', '2025-05-28 15:07:18', '2025-05-28 08:09:52');

INSERT INTO `ChatGroupMembers` (`id`, `userId`, `chatGroupId`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(31, 1, 17, 0, 0, NULL, '2025-06-16 18:16:54', '2025-06-16 18:16:54'),
(32, 8, 17, 0, 0, NULL, '2025-06-16 18:16:54', '2025-06-16 18:16:54'),
(33, 2, 18, 0, 0, NULL, '2025-06-16 18:17:58', '2025-06-16 18:17:58'),
(34, 8, 18, 0, 0, NULL, '2025-06-16 18:17:58', '2025-06-16 18:17:58'),
(41, 1, 21, 0, 0, NULL, '2025-06-16 18:46:12', '2025-06-16 18:46:12'),
(42, 2, 21, 0, 0, NULL, '2025-06-16 18:46:12', '2025-06-16 18:46:12'),
(43, 8, 21, 0, 0, NULL, '2025-06-16 18:46:12', '2025-06-16 18:46:12'),
(44, 5, 22, 0, 0, NULL, '2025-06-16 19:09:03', '2025-06-16 19:09:03'),
(45, 4, 22, 0, 0, NULL, '2025-06-16 19:09:03', '2025-06-16 19:09:03'),
(46, 3, 23, 0, 0, NULL, '2025-06-17 06:39:09', '2025-06-17 06:39:09'),
(47, 8, 23, 0, 0, NULL, '2025-06-17 06:39:09', '2025-06-17 06:39:09'),
(48, 1, 24, 0, 0, NULL, '2025-06-17 13:47:42', '2025-06-17 13:47:42'),
(49, 2, 24, 0, 0, NULL, '2025-06-17 13:47:42', '2025-06-17 13:47:42'),
(50, 3, 24, 0, 0, NULL, '2025-06-17 13:47:42', '2025-06-17 13:47:42'),
(51, 4, 24, 0, 0, NULL, '2025-06-17 13:47:42', '2025-06-17 13:47:42'),
(52, 5, 24, 0, 0, NULL, '2025-06-17 13:47:42', '2025-06-17 13:47:42'),
(53, 7, 24, 0, 0, NULL, '2025-06-17 13:47:42', '2025-06-17 13:47:42'),
(54, 8, 24, 0, 0, NULL, '2025-06-17 13:47:42', '2025-06-17 13:47:42'),
(55, 8, 27, 0, 0, NULL, '2025-06-17 15:53:45', '2025-06-17 15:53:45'),
(56, 8, 27, 0, 0, NULL, '2025-06-17 15:53:45', '2025-06-17 15:53:45');

INSERT INTO `ChatGroups` (`id`, `name`, `ownerId`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(17, NULL, 8, 0, 0, NULL, '2025-06-16 18:16:54', '2025-06-16 18:16:54'),
(18, NULL, 8, 0, 0, NULL, '2025-06-16 18:17:58', '2025-06-16 18:17:58'),
(21, 'nhom 3 thành viên', 8, 0, 0, NULL, '2025-06-16 18:46:12', '2025-06-16 18:46:12'),
(22, NULL, 4, 0, 0, NULL, '2025-06-16 19:09:03', '2025-06-16 19:09:03'),
(23, NULL, 8, 0, 0, NULL, '2025-06-17 06:39:09', '2025-06-17 06:39:09'),
(24, 'tổng chỉ huy', 8, 0, 0, NULL, '2025-06-17 13:47:42', '2025-06-17 13:47:42'),
(27, NULL, 8, 0, 0, NULL, '2025-06-17 22:53:45', '2025-06-17 22:53:45');

INSERT INTO `ChatMessages` (`id`, `chatGroupId`, `userIdSender`, `messageText`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(4, 17, 8, '1', 0, 0, NULL, '2025-06-16 18:53:37', '2025-06-16 18:53:37'),
(5, 17, 8, '2', 0, 0, NULL, '2025-06-16 18:53:39', '2025-06-16 18:53:39'),
(6, 17, 8, 'hello', 0, 0, NULL, '2025-06-16 19:22:42', '2025-06-16 19:22:42'),
(7, 22, 4, '5', 0, 0, NULL, '2025-06-16 19:32:56', '2025-06-16 19:32:56'),
(8, 22, 4, '5', 0, 0, NULL, '2025-06-16 19:32:56', '2025-06-16 19:32:56'),
(9, 18, 8, '2', 0, 0, NULL, '2025-06-16 19:40:43', '2025-06-16 19:40:43'),
(10, 18, 8, '222', 0, 0, NULL, '2025-06-16 19:40:47', '2025-06-16 19:40:47'),
(11, 18, 2, 'hello long 2', 0, 0, NULL, '2025-06-16 19:41:58', '2025-06-16 19:41:58'),
(12, 21, 8, 'hello nhóm 3 thành viên', 0, 0, NULL, '2025-06-16 19:42:27', '2025-06-16 19:42:27'),
(13, 21, 8, 'hellong long 2', 0, 0, NULL, '2025-06-16 19:43:54', '2025-06-16 19:43:54'),
(14, 21, 1, 'hello admin', 0, 0, NULL, '2025-06-16 19:44:05', '2025-06-16 19:44:05'),
(15, 21, 2, 'em ăn cơm chưa', 0, 0, NULL, '2025-06-16 19:44:13', '2025-06-16 19:44:13'),
(16, 23, 8, '3333', 0, 0, NULL, '2025-06-17 06:39:11', '2025-06-17 06:39:11'),
(17, 17, 8, '1', 0, 0, NULL, '2025-06-17 06:39:44', '2025-06-17 06:39:44'),
(18, 18, 8, '2', 0, 0, NULL, '2025-06-17 07:09:17', '2025-06-17 07:09:17'),
(19, 17, 8, '1', 0, 0, NULL, '2025-06-17 07:09:20', '2025-06-17 07:09:20'),
(20, 17, 8, '1', 0, 0, NULL, '2025-06-17 07:09:23', '2025-06-17 07:09:23'),
(21, 17, 8, '1', 0, 0, NULL, '2025-06-17 10:22:56', '2025-06-17 10:22:56'),
(22, 17, 8, '1', 0, 0, NULL, '2025-06-17 10:33:25', '2025-06-17 10:33:25'),
(23, 17, 8, 'helong long 1', 0, 0, NULL, '2025-06-17 10:33:30', '2025-06-17 10:33:30'),
(24, 18, 8, 'helo long 2', 0, 0, NULL, '2025-06-17 10:33:37', '2025-06-17 10:33:37'),
(25, 18, 8, '2', 0, 0, NULL, '2025-06-17 10:33:39', '2025-06-17 10:33:39'),
(26, 18, 8, '2', 0, 0, NULL, '2025-06-17 10:33:39', '2025-06-17 10:33:39'),
(27, 18, 8, '3', 0, 0, NULL, '2025-06-17 10:33:39', '2025-06-17 10:33:39'),
(28, 17, 8, '1', 0, 0, NULL, '2025-06-17 10:33:42', '2025-06-17 10:33:42'),
(29, 17, 8, '1', 0, 0, NULL, '2025-06-17 10:33:42', '2025-06-17 10:33:42'),
(30, 17, 8, '1', 0, 0, NULL, '2025-06-17 10:33:43', '2025-06-17 10:33:43'),
(31, 18, 8, '2', 0, 0, NULL, '2025-06-17 10:42:40', '2025-06-17 10:42:40'),
(32, 18, 8, '2', 0, 0, NULL, '2025-06-17 10:46:16', '2025-06-17 10:46:16'),
(33, 18, 8, '2', 0, 0, NULL, '2025-06-17 10:46:18', '2025-06-17 10:46:18'),
(34, 17, 8, '1', 0, 0, NULL, '2025-06-17 10:46:21', '2025-06-17 10:46:21'),
(35, 17, 8, '1', 0, 0, NULL, '2025-06-17 10:46:22', '2025-06-17 10:46:22'),
(36, 17, 8, '1', 0, 0, NULL, '2025-06-17 10:46:23', '2025-06-17 10:46:23'),
(37, 18, 8, '2', 0, 0, NULL, '2025-06-17 13:46:22', '2025-06-17 13:46:22'),
(38, 18, 8, '222222222', 0, 0, NULL, '2025-06-17 13:46:27', '2025-06-17 13:46:27'),
(39, 18, 8, '22222', 0, 0, NULL, '2025-06-17 13:46:45', '2025-06-17 13:46:45'),
(40, 23, 8, '33333', 0, 0, NULL, '2025-06-17 13:46:50', '2025-06-17 13:46:50'),
(41, 18, 8, '3', 0, 0, NULL, '2025-06-17 13:46:59', '2025-06-17 13:46:59'),
(42, 18, 8, '2', 0, 0, NULL, '2025-06-17 13:47:01', '2025-06-17 13:47:01'),
(43, 24, 8, 'hello', 0, 0, NULL, '2025-06-17 13:47:57', '2025-06-17 13:47:57'),
(44, 21, 1, 'oke', 0, 0, NULL, '2025-06-17 13:50:48', '2025-06-17 13:50:48'),
(45, 17, 8, 'ê', 0, 0, NULL, '2025-06-17 14:08:33', '2025-06-17 14:08:33'),
(46, 17, 1, 'nhắn gì mà nhắn hoài zị', 0, 0, NULL, '2025-06-17 14:09:02', '2025-06-17 14:09:02'),
(47, 17, 8, 'thích đó được khong bạn êy', 0, 0, NULL, '2025-06-17 14:09:10', '2025-06-17 14:09:10');

INSERT INTO `Permissions` (`id`, `name`, `endpoint`, `method`, `module`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 'READ ARTICLE', '/article', 'GET', 'Article', 0, 0, '2025-06-02 12:13:47', '2025-06-02 12:13:47', '2025-06-24 15:18:20'),
(2, 'CREATE ARTICLE', '/article/', 'POST', 'Article', 0, 0, '2025-06-02 12:13:47', '2025-06-02 12:13:47', '2025-06-02 12:13:47'),
(3, 'UPDATE ARTICLE', '/article/', 'PATCH', 'Article', 0, 0, '2025-06-02 12:13:47', '2025-06-02 12:13:47', '2025-06-02 12:13:47'),
(4, 'DELETE ARTICLE', '/article/', 'DELETE', 'Article', 0, 0, '2025-06-02 12:13:47', '2025-06-02 12:13:47', '2025-06-02 12:13:47'),
(5, 'READ ARTICLE', '/role/', 'GET', 'Role', 0, 0, '2025-06-02 12:13:47', '2025-06-02 12:13:47', '2025-06-02 12:13:47'),
(6, 'CREATE ARTICLE', '/role/', 'POST', 'Role', 0, 0, '2025-06-02 12:13:47', '2025-06-02 12:13:47', '2025-06-02 12:13:47'),
(7, 'UPDATE ARTICLE', '/role/', 'PATCH', 'Role', 0, 0, '2025-06-02 12:13:47', '2025-06-02 12:13:47', '2025-06-02 12:13:47'),
(8, 'DELETE ARTICLE', '/role/', 'DELETE', 'Role', 0, 0, '2025-06-02 12:13:47', '2025-06-02 12:13:47', '2025-06-02 12:13:47'),
(9, 'GET INFO', '/auth/get-info', 'GET', 'Auth', 0, 0, '2025-06-22 17:45:20', '2025-06-22 17:45:20', '2025-06-22 17:47:04'),
(10, 'ABC', '/auth/user/:id', 'GET', 'Auth', 0, 0, '2025-06-22 18:00:39', '2025-06-22 18:00:39', '2025-06-22 18:00:39');

INSERT INTO `RolePermission` (`id`, `roleId`, `permissionId`, `isActive`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 2, 1, 1, 0, 0, NULL, '2025-06-02 12:26:00', '2025-06-23 10:16:49'),
(2, 2, 2, 1, 0, 0, NULL, '2025-06-02 12:26:55', '2025-06-02 12:26:55'),
(3, 2, 3, 1, 0, 0, NULL, '2025-06-02 14:48:40', '2025-06-10 05:09:02'),
(4, 2, 4, 1, 0, 0, NULL, '2025-06-07 19:11:31', '2025-06-07 19:11:39'),
(5, 2, 9, 1, 0, 0, NULL, '2025-06-22 17:45:40', '2025-06-22 17:45:40'),
(6, 2, 10, 1, 0, 0, NULL, '2025-06-22 18:00:50', '2025-06-22 18:00:50');

INSERT INTO `Roles` (`id`, `name`, `description`, `isActive`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 'ROLE_ADMIN', 'Quản Trị Hệ Thống', 1, NULL, 0, NULL, '2025-05-09 13:59:17', '2025-06-02 02:42:56'),
(2, 'ROLE_USER', 'Người Dùng Hệ Thống', 1, NULL, 0, NULL, '2025-05-09 13:59:17', '2025-06-02 13:11:16');

INSERT INTO `Users` (`id`, `email`, `fullName`, `avatar`, `password`, `facebookId`, `googleId`, `roleId`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`, `totpSecret`) VALUES
(1, 'long1@gmail.com', 'long1', 'local-1750999656578-790838642.jpg', '$2a$10$.xjfr9Mzwj0fh.PJtDJwFuCX5zHdD3i5XGUrm545KXcQrh2LWSBOy', NULL, NULL, 2, 0, 0, NULL, '2025-06-10 18:09:13', '2025-06-27 04:47:36', NULL),
(2, 'long2@gmail.com', 'long2', NULL, '$2a$10$.xjfr9Mzwj0fh.PJtDJwFuCX5zHdD3i5XGUrm545KXcQrh2LWSBOy', NULL, NULL, 2, 0, 0, NULL, '2025-06-10 18:09:29', '2025-06-10 15:17:40', NULL),
(3, 'long3@gmail.com', 'long3', NULL, '$2a$10$.xjfr9Mzwj0fh.PJtDJwFuCX5zHdD3i5XGUrm545KXcQrh2LWSBOy', NULL, NULL, 2, 0, 0, NULL, '2025-06-10 18:09:35', '2025-06-10 15:17:40', NULL),
(4, 'long4@gmail.com', 'long4', NULL, '$2a$10$.xjfr9Mzwj0fh.PJtDJwFuCX5zHdD3i5XGUrm545KXcQrh2LWSBOy', NULL, NULL, 2, 0, 0, NULL, '2025-06-10 18:09:40', '2025-06-10 15:17:40', NULL),
(5, 'long5@gmail.com', 'long5', NULL, '$2a$10$.xjfr9Mzwj0fh.PJtDJwFuCX5zHdD3i5XGUrm545KXcQrh2LWSBOy', NULL, NULL, 2, 0, 0, NULL, '2025-06-10 18:09:44', '2025-06-10 15:17:40', NULL),
(7, 'long7@gmail.com', 'long7', NULL, '$2a$10$.xjfr9Mzwj0fh.PJtDJwFuCX5zHdD3i5XGUrm545KXcQrh2LWSBOy', NULL, NULL, 2, 0, 0, NULL, '2025-06-10 22:17:06', '2025-06-11 09:37:20', NULL),
(8, 'vulebaolong@gmail.com', 'Bảo Long Vũ Lê', 'local-1751029276788-394992860.jpeg', '$2a$10$.xjfr9Mzwj0fh.PJtDJwFuCX5zHdD3i5XGUrm545KXcQrh2LWSBOy', NULL, '100424098984127389694', 2, 0, 0, NULL, '2025-06-16 12:54:41', '2025-06-30 03:24:28', ''),
(9, 'long12@gmail.com', 'long12', NULL, '$2a$10$tbjfi9Amf3ArOuCEWUkvmuAashqzW46vt/vPgvFi7ZN5s3W4MZiIq', NULL, NULL, 2, 0, 0, NULL, '2025-06-22 20:47:29', '2025-06-22 20:47:29', NULL);



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;