-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 23 Mar 2024, 16:40
-- Wersja serwera: 10.4.25-MariaDB
-- Wersja PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `apicardealers`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `adresses`
--

CREATE TABLE `adresses` (
  `id` int(11) NOT NULL,
  `adress` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `adresses`
--

INSERT INTO `adresses` (`id`, `adress`) VALUES
(1, 'Ptasia 4, 60-319 Poznań'),
(2, 'Bolesława Krzywoustego 71, 61-144 Poznań');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `cars`
--

CREATE TABLE `cars` (
  `id` int(11) NOT NULL,
  `brand` text DEFAULT NULL,
  `model` text DEFAULT NULL,
  `productionYear` int(11) DEFAULT NULL,
  `registrationNumber` text DEFAULT NULL,
  `dealer` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `cars`
--

INSERT INTO `cars` (`id`, `brand`, `model`, `productionYear`, `registrationNumber`, `dealer`) VALUES
(2, 'Mercedes-Benz', 'GLB', 2020, 'PO9TJ75', 1),
(12, 'Mercedes-Benz', 'GLB', 2020, 'PO9TJ76', NULL),
(14, 'Mercedes-Benz', 'GLB', 2020, 'PO9TJ77', NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `name` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `clients`
--

INSERT INTO `clients` (`id`, `name`) VALUES
(1, 'Grzegorz Brzozowski'),
(5, 'Marian Tarkowski');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `dealers`
--

CREATE TABLE `dealers` (
  `id` int(11) NOT NULL,
  `name` text DEFAULT NULL,
  `adress` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `dealers`
--

INSERT INTO `dealers` (`id`, `name`, `adress`) VALUES
(1, 'Duda-Cars Autoryzowany Dealer Mercedes-Benz', 1),
(3, 'Mercedes-Benz MB Motors', 2);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `sales`
--

CREATE TABLE `sales` (
  `id` int(11) NOT NULL,
  `client` int(11) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `dealer` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `sales`
--

INSERT INTO `sales` (`id`, `client`, `price`, `dealer`) VALUES
(2, 1, 46500, 1),
(11, 1, 5499.99, 1),
(12, 1, 99.98, 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `testdrives`
--

CREATE TABLE `testdrives` (
  `id` int(11) NOT NULL,
  `clientsId` int(11) DEFAULT NULL,
  `carsId` int(11) DEFAULT NULL,
  `drivesDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `testdrives`
--

INSERT INTO `testdrives` (`id`, `clientsId`, `carsId`, `drivesDate`) VALUES
(3, 1, 12, '2024-02-29'),
(11, 1, 12, '1999-12-31');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('8d79256e-fb34-4112-9464-c2e075b721c9', 'd82d913f849be0a6e9b080dbdce0dd3269866f3ca1f3b1fe870eaff4d9e5b29e', '2023-11-25 14:54:30.324', '0_init', '', NULL, '2023-11-25 14:54:30.324', 0);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `adresses`
--
ALTER TABLE `adresses`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dealer` (`dealer`);

--
-- Indeksy dla tabeli `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `dealers`
--
ALTER TABLE `dealers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `adress` (`adress`);

--
-- Indeksy dla tabeli `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dealer` (`dealer`),
  ADD KEY `client` (`client`);

--
-- Indeksy dla tabeli `testdrives`
--
ALTER TABLE `testdrives`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clientsId` (`clientsId`),
  ADD KEY `carsId` (`carsId`);

--
-- Indeksy dla tabeli `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `adresses`
--
ALTER TABLE `adresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT dla tabeli `cars`
--
ALTER TABLE `cars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT dla tabeli `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT dla tabeli `dealers`
--
ALTER TABLE `dealers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT dla tabeli `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT dla tabeli `testdrives`
--
ALTER TABLE `testdrives`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `cars`
--
ALTER TABLE `cars`
  ADD CONSTRAINT `cars_ibfk_1` FOREIGN KEY (`dealer`) REFERENCES `dealers` (`id`);

--
-- Ograniczenia dla tabeli `dealers`
--
ALTER TABLE `dealers`
  ADD CONSTRAINT `dealers_ibfk_1` FOREIGN KEY (`adress`) REFERENCES `adresses` (`id`);

--
-- Ograniczenia dla tabeli `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`dealer`) REFERENCES `dealers` (`id`),
  ADD CONSTRAINT `sales_ibfk_2` FOREIGN KEY (`client`) REFERENCES `clients` (`id`);

--
-- Ograniczenia dla tabeli `testdrives`
--
ALTER TABLE `testdrives`
  ADD CONSTRAINT `testdrives_ibfk_1` FOREIGN KEY (`clientsId`) REFERENCES `clients` (`id`),
  ADD CONSTRAINT `testdrives_ibfk_2` FOREIGN KEY (`carsId`) REFERENCES `cars` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
