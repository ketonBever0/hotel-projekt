-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: szalloda
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `mobile_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `is_banned` tinyint(1) NOT NULL DEFAULT '0',
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'John Doe','john.doe@example.com','+36123456789',0,1),(2,'Jane Smith','jane.smith@example.com','+36701234567',0,12),(3,'Alice Johnson','alice.johnson@example.com','+36301234567',0,1),(4,'Bob Brown','bob.brown@example.com','+36706543210',1,15),(5,'Catherine Green','catherine.green@example.com','+36112233445',0,1),(6,'David White','david.white@example.com','+36901234567',0,14),(7,'Eva Black','eva.black@example.com','+36202345678',0,12),(8,'George King','george.king@example.com','+36401234567',1,12),(9,'Hannah Baker','hannah.baker@example.com','+36701112233',0,1),(13,'TesztVendeg 1','tesztvendeg1@example.me','+06123',0,1),(16,'Teszt Vendég 2','tesztvendeg2@example.me','+361325',0,NULL);
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `requested_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `start_date` datetime(3) NOT NULL,
  `end_date` datetime(3) NOT NULL,
  `price` int DEFAULT NULL,
  `customer_id` int DEFAULT NULL,
  `room_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_fk` (`customer_id`),
  KEY `room_fk` (`room_id`),
  CONSTRAINT `customer_fk` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT,
  CONSTRAINT `room_fk` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
INSERT INTO `reservations` VALUES (26,'2024-11-01 10:30:25.000','2024-11-10 14:00:00.000','2024-11-15 10:00:00.000',6000,1,1),(27,'2024-11-02 11:45:00.000','2024-11-12 14:00:00.000','2024-11-18 10:00:00.000',7200,2,2),(28,'2024-11-03 09:25:00.000','2024-11-20 14:00:00.000','2024-11-25 10:00:00.000',4500,3,3),(29,'2024-11-04 15:00:00.000','2024-11-22 14:00:00.000','2024-11-27 10:00:00.000',7500,4,4),(30,'2024-11-05 16:40:00.000','2024-12-01 14:00:00.000','2024-12-06 10:00:00.000',8000,5,5),(31,'2024-11-06 14:10:00.000','2024-12-03 14:00:00.000','2024-12-07 10:00:00.000',6400,1,6),(32,'2024-11-07 17:20:00.000','2024-12-04 14:00:00.000','2024-12-09 10:00:00.000',6900,2,7),(33,'2024-11-08 12:15:00.000','2024-12-05 14:00:00.000','2024-12-10 10:00:00.000',5000,3,8),(34,'2024-11-09 18:30:00.000','2024-12-06 14:00:00.000','2024-12-12 10:00:00.000',7600,4,9),(35,'2024-11-10 09:45:00.000','2024-12-08 14:00:00.000','2024-12-13 10:00:00.000',5600,5,10),(36,'2024-11-11 11:00:00.000','2024-12-10 14:00:00.000','2024-12-15 10:00:00.000',6500,1,11),(37,'2024-11-12 10:50:00.000','2024-12-11 14:00:00.000','2024-12-16 10:00:00.000',7000,2,12),(38,'2024-11-13 13:35:00.000','2024-12-12 14:00:00.000','2024-12-17 10:00:00.000',5300,3,13),(39,'2024-11-14 15:10:00.000','2024-12-14 14:00:00.000','2024-12-19 10:00:00.000',6100,4,14),(40,'2024-11-15 18:40:00.000','2024-12-15 14:00:00.000','2024-12-20 10:00:00.000',8000,5,15),(41,'2024-11-16 08:20:00.000','2024-12-16 14:00:00.000','2024-12-21 10:00:00.000',5200,1,16),(42,'2024-11-17 10:25:00.000','2024-12-17 14:00:00.000','2024-12-22 10:00:00.000',7300,2,17),(43,'2024-11-18 12:50:00.000','2024-12-18 14:00:00.000','2024-12-23 10:00:00.000',5600,3,18),(44,'2024-11-19 14:15:00.000','2024-12-20 14:00:00.000','2024-12-25 10:00:00.000',6700,4,19),(45,'2024-11-20 09:35:00.000','2024-12-21 14:00:00.000','2024-12-26 10:00:00.000',7100,5,20),(46,'2024-11-21 08:40:00.000','2024-12-22 14:00:00.000','2024-12-27 10:00:00.000',5500,1,1),(47,'2024-11-22 11:15:00.000','2024-12-23 14:00:00.000','2024-12-28 10:00:00.000',6000,2,2),(48,'2024-11-23 13:30:00.000','2024-12-24 14:00:00.000','2024-12-29 10:00:00.000',4800,3,3),(49,'2024-11-24 15:45:00.000','2024-12-26 14:00:00.000','2024-12-31 10:00:00.000',6900,4,4),(50,'2024-11-25 17:05:00.000','2024-12-28 14:00:00.000','2024-12-30 10:00:00.000',8100,5,5),(67,'2024-11-27 19:44:56.217','2024-11-28 00:00:00.000','2024-12-05 00:00:00.000',49000,16,18);
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_types`
--

DROP TABLE IF EXISTS `room_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `bedrooms` int NOT NULL,
  `single_beds` int NOT NULL,
  `double_beds` int NOT NULL,
  `baby_beds` int NOT NULL,
  `daily_price` int NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `number` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_types`
--

LOCK TABLES `room_types` WRITE;
/*!40000 ALTER TABLE `room_types` DISABLE KEYS */;
INSERT INTO `room_types` VALUES (1,'Family',2,1,1,0,4000,'Suitable for family'),(2,'Single Economy',1,1,0,0,2500,'Affordable single bed room for budget travelers'),(3,'Double Deluxe',1,0,1,0,4500,'Spacious room with a deluxe double bed and beautiful views'),(4,'Suite',2,1,1,1,7000,'Luxury suite with separate living area, ideal for families'),(5,'Twin Standard',1,2,0,0,3000,'Standard room with two single beds'),(6,'King Suite',2,0,1,1,8000,'Luxury king suite with high-end amenities'),(7,'Economy Single',1,1,0,0,2000,'Basic single room with minimal facilities for short stays'),(8,'Presidential Suite',3,0,2,2,12000,'Top-tier suite with multiple rooms, best for VIP guests'),(9,'Dorm Room',1,6,1,0,1200,'Affordable dorm-like room');
/*!40000 ALTER TABLE `room_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rooms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `room_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_in_order` tinyint(1) NOT NULL DEFAULT '1',
  `room_type_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `room_number` (`room_number`),
  KEY `room_type_id` (`room_type_id`),
  CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`room_type_id`) REFERENCES `room_types` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (1,'101',NULL,1,1),(2,'102',NULL,1,1),(3,'103',NULL,1,2),(4,'104',NULL,1,1),(5,'105',NULL,1,3),(6,'106',NULL,1,1),(7,'107',NULL,1,2),(8,'108',NULL,1,3),(9,'109',NULL,1,4),(10,'110',NULL,1,1),(11,'111','Rossz a zuhanyzó!',0,2),(12,'112',NULL,1,4),(13,'113',NULL,1,1),(14,'114',NULL,1,1),(15,'115',NULL,1,4),(16,'116',NULL,1,3),(17,'117',NULL,1,2),(18,'118',NULL,1,4),(19,'119',NULL,1,3),(20,'120',NULL,1,1),(21,'623',NULL,1,9);
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `fullname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `role` enum('ADMIN','MODERATOR','NORMAL','') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'NORMAL',
  `enrolled_by` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`),
  KEY `enrolled_by_recursive` (`enrolled_by`),
  CONSTRAINT `enrolled_by_recursive` FOREIGN KEY (`enrolled_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'testuser1@example.me','Test User 1','test_user_1','$argon2id$v=19$m=65536,t=3,p=4$2avr4FtQnABMMulaVH/pCA$GC+XUOcnmzLDMrKeHImtEpgsJOyYYCQNcAsttaCXTnQ','MODERATOR',NULL),(12,'testuser2@example.me','Test User 2','test_user_2','$argon2id$v=19$m=65536,t=3,p=4$2avr4FtQnABMMulaVH/pCA$GC+XUOcnmzLDMrKeHImtEpgsJOyYYCQNcAsttaCXTnQ','ADMIN',NULL),(14,'testuser3@example.me','Test User 3','testuser03','$argon2id$v=19$m=65536,t=3,p=4$2avr4FtQnABMMulaVH/pCA$GC+XUOcnmzLDMrKeHImtEpgsJOyYYCQNcAsttaCXTnQ','NORMAL',NULL),(15,'testrookie01@example.me','Test Rookie','tr01','$argon2id$v=19$m=65536,t=3,p=4$RD1SCrP/D8HBAA7qo041Xg$F/5rX00mvZwbVXvAqHD15ftfUHUF4ND/ubwqUSmRYeU','NORMAL',1),(16,'testrookie02@example.me','Test Rookie 2','tr02','$argon2id$v=19$m=65536,t=3,p=4$AYW+NmyKNQdOzT7uompaTg$N0t/48mxtgOP8ZDE2EKr+gdMLqUUrqlsFw4bTDnrDvA','NORMAL',12),(25,'testrookie03@example.me','Test Rookie 3','tr03','$argon2id$v=19$m=65536,t=3,p=4$+ko4xJvQ0sjFet89mP7hpg$ed5zxDcR+HjbfgoWP3lBwVumfkyQIoVgVjoa1rLE2MQ','NORMAL',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'szalloda'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-01 14:36:24
