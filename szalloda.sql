-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Nov 10. 22:11
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `szalloda`
--
CREATE DATABASE IF NOT EXISTS `szalloda` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `szalloda`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile_number` varchar(255) NOT NULL,
  `is_banned` tinyint(1) NOT NULL DEFAULT 0,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `customers`
--

INSERT INTO `customers` (`id`, `fullname`, `email`, `mobile_number`, `is_banned`, `user_id`) VALUES
(1, 'John Doe', 'john.doe@example.com', '+36123456789', 0, 1),
(2, 'Jane Smith', 'jane.smith@example.com', '+36701234567', 0, 12),
(3, 'Alice Johnson', 'alice.johnson@example.com', '+36301234567', 0, NULL),
(4, 'Bob Brown', 'bob.brown@example.com', '+36706543210', 1, 15),
(5, 'Catherine Green', 'catherine.green@example.com', '+36112233445', 0, NULL),
(6, 'David White', 'david.white@example.com', '+36901234567', 0, 14),
(7, 'Eva Black', 'eva.black@example.com', '+36202345678', 0, 12),
(8, 'George King', 'george.king@example.com', '+36401234567', 1, 12),
(9, 'Hannah Baker', 'hannah.baker@example.com', '+36701112233', 0, NULL),
(10, 'Ian Wilson', 'ian.wilson@example.com', '+36803456789', 0, 16);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `reservations`
--

CREATE TABLE `reservations` (
  `id` int(11) NOT NULL,
  `requested_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `start_date` datetime(3) NOT NULL,
  `end_date` datetime(3) NOT NULL,
  `price` int(11) DEFAULT NULL,
  `customer_id` int(11) NOT NULL,
  `room_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `reservations`
--

INSERT INTO `reservations` (`id`, `requested_at`, `start_date`, `end_date`, `price`, `customer_id`, `room_id`) VALUES
(26, '2024-11-01 10:30:25.000', '2024-11-10 14:00:00.000', '2024-11-15 10:00:00.000', 6000, 1, 1),
(27, '2024-11-02 11:45:00.000', '2024-11-12 14:00:00.000', '2024-11-18 10:00:00.000', 7200, 2, 2),
(28, '2024-11-03 09:25:00.000', '2024-11-20 14:00:00.000', '2024-11-25 10:00:00.000', 4500, 3, 3),
(29, '2024-11-04 15:00:00.000', '2024-11-22 14:00:00.000', '2024-11-27 10:00:00.000', 7500, 4, 4),
(30, '2024-11-05 16:40:00.000', '2024-12-01 14:00:00.000', '2024-12-06 10:00:00.000', 8000, 5, 5),
(31, '2024-11-06 14:10:00.000', '2024-12-03 14:00:00.000', '2024-12-07 10:00:00.000', 6400, 1, 6),
(32, '2024-11-07 17:20:00.000', '2024-12-04 14:00:00.000', '2024-12-09 10:00:00.000', 6900, 2, 7),
(33, '2024-11-08 12:15:00.000', '2024-12-05 14:00:00.000', '2024-12-10 10:00:00.000', 5000, 3, 8),
(34, '2024-11-09 18:30:00.000', '2024-12-06 14:00:00.000', '2024-12-12 10:00:00.000', 7600, 4, 9),
(35, '2024-11-10 09:45:00.000', '2024-12-08 14:00:00.000', '2024-12-13 10:00:00.000', 5600, 5, 10),
(36, '2024-11-11 11:00:00.000', '2024-12-10 14:00:00.000', '2024-12-15 10:00:00.000', 6500, 1, 11),
(37, '2024-11-12 10:50:00.000', '2024-12-11 14:00:00.000', '2024-12-16 10:00:00.000', 7000, 2, 12),
(38, '2024-11-13 13:35:00.000', '2024-12-12 14:00:00.000', '2024-12-17 10:00:00.000', 5300, 3, 13),
(39, '2024-11-14 15:10:00.000', '2024-12-14 14:00:00.000', '2024-12-19 10:00:00.000', 6100, 4, 14),
(40, '2024-11-15 18:40:00.000', '2024-12-15 14:00:00.000', '2024-12-20 10:00:00.000', 8000, 5, 15),
(41, '2024-11-16 08:20:00.000', '2024-12-16 14:00:00.000', '2024-12-21 10:00:00.000', 5200, 1, 16),
(42, '2024-11-17 10:25:00.000', '2024-12-17 14:00:00.000', '2024-12-22 10:00:00.000', 7300, 2, 17),
(43, '2024-11-18 12:50:00.000', '2024-12-18 14:00:00.000', '2024-12-23 10:00:00.000', 5600, 3, 18),
(44, '2024-11-19 14:15:00.000', '2024-12-20 14:00:00.000', '2024-12-25 10:00:00.000', 6700, 4, 19),
(45, '2024-11-20 09:35:00.000', '2024-12-21 14:00:00.000', '2024-12-26 10:00:00.000', 7100, 5, 20),
(46, '2024-11-21 08:40:00.000', '2024-12-22 14:00:00.000', '2024-12-27 10:00:00.000', 5500, 1, 1),
(47, '2024-11-22 11:15:00.000', '2024-12-23 14:00:00.000', '2024-12-28 10:00:00.000', 6000, 2, 2),
(48, '2024-11-23 13:30:00.000', '2024-12-24 14:00:00.000', '2024-12-29 10:00:00.000', 4800, 3, 3),
(49, '2024-11-24 15:45:00.000', '2024-12-26 14:00:00.000', '2024-12-31 10:00:00.000', 6900, 4, 4),
(50, '2024-11-25 17:05:00.000', '2024-12-28 14:00:00.000', '2024-12-30 10:00:00.000', 8100, 5, 5);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL,
  `room_number` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `custom_price` int(11) DEFAULT NULL,
  `room_type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `rooms`
--

INSERT INTO `rooms` (`id`, `room_number`, `description`, `custom_price`, `room_type_id`) VALUES
(1, '101', 'Ocean view, double bed', 120, 1),
(2, '102', 'Garden view, double bed', 110, 1),
(3, '103', 'City view, single bed', 80, 2),
(4, '104', 'Mountain view, queen bed', 150, 1),
(5, '105', 'Ocean view, suite', 200, 3),
(6, '106', 'Garden view, twin beds', 130, 1),
(7, '107', 'City view, single bed', 75, 2),
(8, '108', 'Mountain view, king bed', 180, 3),
(9, '109', 'Ocean view, deluxe suite', 250, 4),
(10, '110', 'Garden view, queen bed', 140, 1),
(11, '111', 'City view, economy single', 60, 2),
(12, '112', 'Mountain view, king suite', 24000, 4),
(13, '113', 'Ocean view, economy double', 95, 1),
(14, '114', 'Garden view, economy twin', 85, 1),
(15, '115', 'City view, luxury suite', 220, 4),
(16, '116', 'Mountain view, queen suite', 190, 3),
(17, '117', 'Ocean view, single bed', 100, 2),
(18, '118', 'Garden view, deluxe suite', 230, 4),
(19, '119', 'City view, king bed', 160, 3),
(20, '120', 'Mountain view, standard room', 140, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `room_types`
--

CREATE TABLE `room_types` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `bedrooms` int(11) NOT NULL,
  `single_beds` int(11) NOT NULL,
  `double_beds` int(11) NOT NULL,
  `baby_beds` int(11) NOT NULL,
  `daily_price` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `room_types`
--

INSERT INTO `room_types` (`id`, `name`, `bedrooms`, `single_beds`, `double_beds`, `baby_beds`, `daily_price`, `description`) VALUES
(1, 'Family', 2, 1, 1, 0, 4000, 'First room type!'),
(2, 'Single Economy', 1, 1, 0, 0, 2500, 'Affordable single bed room for budget travelers'),
(3, 'Double Deluxe', 1, 0, 1, 0, 4500, 'Spacious room with a deluxe double bed and beautiful views'),
(4, 'Suite', 2, 1, 1, 1, 7000, 'Luxury suite with separate living area, ideal for families'),
(5, 'Twin Standard', 1, 2, 0, 0, 3000, 'Standard room with two single beds'),
(6, 'King Suite', 2, 0, 1, 1, 8000, 'Luxury king suite with high-end amenities'),
(7, 'Economy Single', 1, 1, 0, 0, 2000, 'Basic single room with minimal facilities for short stays'),
(8, 'Presidential Suite', 3, 0, 2, 2, 12000, 'Top-tier suite with multiple rooms, best for VIP guests');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('ADMIN','MODERATOR','NORMAL','') NOT NULL DEFAULT 'NORMAL',
  `enrolled_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `email`, `fullname`, `username`, `password`, `role`, `enrolled_by`) VALUES
(1, 'testuser1@example.me', 'Test User 1', 'test_user_1', '$argon2id$v=19$m=65536,t=3,p=4$2avr4FtQnABMMulaVH/pCA$GC+XUOcnmzLDMrKeHImtEpgsJOyYYCQNcAsttaCXTnQ', 'MODERATOR', NULL),
(12, 'testuser2@example.me', 'Test User 2', 'test_user_2', '$argon2id$v=19$m=65536,t=3,p=4$2avr4FtQnABMMulaVH/pCA$GC+XUOcnmzLDMrKeHImtEpgsJOyYYCQNcAsttaCXTnQ', 'ADMIN', NULL),
(14, 'testuser3@example.me', 'Test User 3', 'testuser03', '$argon2id$v=19$m=65536,t=3,p=4$2avr4FtQnABMMulaVH/pCA$GC+XUOcnmzLDMrKeHImtEpgsJOyYYCQNcAsttaCXTnQ', 'NORMAL', NULL),
(15, 'testrookie01@example.me', 'Test Rookie', 'tr01', '$argon2id$v=19$m=65536,t=3,p=4$RD1SCrP/D8HBAA7qo041Xg$F/5rX00mvZwbVXvAqHD15ftfUHUF4ND/ubwqUSmRYeU', 'NORMAL', 1),
(16, 'testrookie02@example.me', 'Test Rookie 2', 'tr02', '$argon2id$v=19$m=65536,t=3,p=4$AYW+NmyKNQdOzT7uompaTg$N0t/48mxtgOP8ZDE2EKr+gdMLqUUrqlsFw4bTDnrDvA', 'NORMAL', 12);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `user_id` (`user_id`);

--
-- A tábla indexei `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_fk` (`customer_id`),
  ADD KEY `room_fk` (`room_id`);

--
-- A tábla indexei `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `room_number` (`room_number`),
  ADD KEY `room_type_id` (`room_type_id`);

--
-- A tábla indexei `room_types`
--
ALTER TABLE `room_types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `number` (`name`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `enrolled_by_recursive` (`enrolled_by`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT a táblához `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT a táblához `room_types`
--
ALTER TABLE `room_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `customers`
--
ALTER TABLE `customers`
  ADD CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `customer_fk` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
  ADD CONSTRAINT `room_fk` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`);

--
-- Megkötések a táblához `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`room_type_id`) REFERENCES `room_types` (`id`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `enrolled_by_recursive` FOREIGN KEY (`enrolled_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
