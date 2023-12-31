-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 06 Lis 2023, 17:59
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
-- Baza danych: `node_students_subjects`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `name` text DEFAULT NULL,
  `email` text DEFAULT NULL,
  `subject` text DEFAULT NULL,
  `message` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `messages`
--

INSERT INTO `messages` (`id`, `name`, `email`, `subject`, `message`) VALUES
(4, 'Jan', 'jan.kowalski@gmail.com', 'Temat 2', 'Wiadomość testowa');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `name` text DEFAULT NULL,
  `surname` text DEFAULT NULL,
  `email` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `students`
--

INSERT INTO `students` (`id`, `name`, `surname`, `email`) VALUES
(1, 'Anastazy', 'Wrona', 'anastazy.wrona@gmail.com'),
(2, 'Wiktoria', 'Nowicka', 'wika@nowicka.pl'),
(3, 'Milena', 'Wiśniewska', 'wisniewska.milena@yahoo.com'),
(4, 'Gustaw', 'Czarniecki', 'czarniecki12@gmail.com'),
(5, 'Błażej', 'Grabowski', 'grabowski.blazej@gmail.com'),
(6, 'Sara', 'Sawicka', 'sarka.sawka@gmail.com'),
(7, 'Michalina', 'Maciejewska', 'misia.maciej@gmail.com'),
(8, 'Krystian', 'Laskowski', 'krzychu.laska@gmail.com'),
(9, 'Kamil', 'Ostrowski', 'kamilo11@gmail.com'),
(10, 'Izabela', 'Mróz', 'belamroz23@gmail.com');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `subjects`
--

CREATE TABLE `subjects` (
  `id` int(11) NOT NULL,
  `name` text DEFAULT NULL,
  `hoursAWeek` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `subjects`
--

INSERT INTO `subjects` (`id`, `name`, `hoursAWeek`) VALUES
(1, 'Matematyka', 4),
(2, 'Język Polski', 3),
(3, 'Język Angielski', 2),
(4, 'Programowanie Aplikacji Webowych', 2),
(5, 'Pracownia Programowania Aplikacji Webowych', 2),
(6, 'Wiedza O Społeczeństwie', 1),
(7, 'Chemia', 1),
(8, 'Historia', 1),
(9, 'Pracownia Programowania Aplikacji Mobilnych', 1),
(10, 'Programowanie Aplikacji Mobilnych', 1);

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
('42ab5ab6-79e0-4bcd-9e62-86d070c7005e', '977b5dd02c41d092ffdd96e344cb182b65375a7838fa0c7716c924cce31df1c0', '2023-11-06 16:55:16.685', '0_init', '', NULL, '2023-11-06 16:55:16.685', 0);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT dla tabeli `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT dla tabeli `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
