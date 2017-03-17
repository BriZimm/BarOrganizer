-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 17, 2017 at 05:55 AM
-- Server version: 5.6.16
-- PHP Version: 5.5.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `barinventory`
--

-- --------------------------------------------------------

--
-- Table structure for table `glass`
--

CREATE TABLE IF NOT EXISTS `glass` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `ounces` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ingredient`
--

CREATE TABLE IF NOT EXISTS `ingredient` (
  `id` int(11) NOT NULL,
  `amount` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ingredient`
--

INSERT INTO `ingredient` (`id`, `amount`, `name`) VALUES
(1, '1.5 oz', 'Vodka'),
(2, '1.5 oz', 'Cranberry Juice'),
(3, '1 oz', 'Creme De Cacao ');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE IF NOT EXISTS `product` (
  `id` int(8) NOT NULL,
  `name` varchar(255) NOT NULL,
  `size` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `price` decimal(8,0) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `made_in` varchar(255) DEFAULT NULL,
  `distillery` varchar(150) DEFAULT NULL,
  `description` varchar(800) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `size`, `location`, `price`, `status`, `category`, `made_in`, `distillery`, `description`) VALUES
(1, 'Sapphire Gin', '750ml', 'Speed Rack', '40', 'Good', 'Gin', 'London, England', 'Laverstoke Mill', 'A Dry Gin');

-- --------------------------------------------------------

--
-- Table structure for table `recipe`
--

CREATE TABLE IF NOT EXISTS `recipe` (
  `id` int(11) NOT NULL,
  `name` varchar(300) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `glass` int(11) DEFAULT NULL,
  `ing1` varchar(150) NOT NULL,
  `ing2` varchar(150) NOT NULL,
  `ing3` varchar(150) DEFAULT NULL,
  `ing4` varchar(150) DEFAULT NULL,
  `ing5` varchar(150) DEFAULT NULL,
  `ing6` varchar(150) DEFAULT NULL,
  `ing7` varchar(150) DEFAULT NULL,
  `ing8` varchar(150) DEFAULT NULL,
  `ing9` varchar(150) DEFAULT NULL,
  `ing10` varchar(150) DEFAULT NULL,
  `ing11` varchar(150) DEFAULT NULL,
  `ing12` varchar(150) DEFAULT NULL,
  `ing13` varchar(150) DEFAULT NULL,
  `ing14` varchar(150) DEFAULT NULL,
  `ing15` varchar(150) DEFAULT NULL,
  `instructions` varchar(255) NOT NULL,
  `rating` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `recipe`
--

INSERT INTO `recipe` (`id`, `name`, `description`, `image`, `glass`, `ing1`, `ing2`, `ing3`, `ing4`, `ing5`, `ing6`, `ing7`, `ing8`, `ing9`, `ing10`, `ing11`, `ing12`, `ing13`, `ing14`, `ing15`, `instructions`, `rating`) VALUES
(1, 'Robin''s Nest', 'This drink is a classic and tastes like mild chocolate covered cranberries. However, this drink is not very sweet.', 'https://mixthatdrink.com/wp-content/uploads/2011/02/robins-nest-cocktail-2.jpg', 3, '1.5oz Vodka', '1.5oz Cranberry Juice', '1oz Creme De Cacao', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Shake all ingredients and strain into glass.', 3),
(2, 'Alabama Slammer', 'A staple shot that''s not too sweet.', 'images/drinks/alabamaSlammer.jpg', 34, '1/2oz Sloe Gin', '1oz Amaretto', '1oz Southern Comfort peach liquor', 'Dash of Lemon', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Shake all ingredients with ice and strain into shot glass.', 3);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
