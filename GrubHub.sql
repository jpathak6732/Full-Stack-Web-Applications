-- MySQL dump 10.13  Distrib 5.7.27, for Linux (x86_64)
--
-- Host: localhost    Database: myschema
-- ------------------------------------------------------
-- Server version	5.7.27-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `buyer`
--

DROP TABLE IF EXISTS `buyer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `buyer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `password` varchar(400) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `profileimage` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`,`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buyer`
--

LOCK TABLES `buyer` WRITE;
/*!40000 ALTER TABLE `buyer` DISABLE KEYS */;
INSERT INTO `buyer` VALUES (1,'Nishit','Nishit','Nishit','777','myImage_1570214250136.png'),(2,'bb','bb','bbbb44','200','myImage_1570214167883.jpeg'),(3,'aaa','aaa','aaa',NULL,'d.jpeg'),(4,'qq','qq','qt','111','d.jpeg'),(6,'qw','qw','qw','1234','d.jpeg'),(7,'a','d','n',NULL,'d.jpeg'),(8,'hi','you','hey','111','d.jpeg'),(9,'poi','$2b$10$SRxc4rUsRmLxJg4sYnYU4eanAszJCkNAm9Mrw8CdfzszxO3x.KJ9u','poi',NULL,'d.jpeg'),(10,'kim@gmail.com','$2b$10$JEr46HkJkbrZAWm4AzOV1Oefg7tAm3khKtXR4zbGoCY/TJp.6pc2y','kim','112','myImage_1570413952498.jpeg');
/*!40000 ALTER TABLE `buyer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cart` (
  `cartid` int(11) NOT NULL AUTO_INCREMENT,
  `itemname` varchar(45) DEFAULT NULL,
  `quantity` varchar(45) DEFAULT NULL,
  `price` varchar(45) DEFAULT NULL,
  `buyerid` int(11) DEFAULT NULL,
  `itemid` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`cartid`),
  KEY `fk_cart_1_idx` (`buyerid`),
  CONSTRAINT `fk_cart_1` FOREIGN KEY (`buyerid`) REFERENCES `buyer` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `items` (
  `itemid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `itemimage` varchar(45) DEFAULT NULL,
  `price` varchar(45) DEFAULT NULL,
  `sectionid` int(11) DEFAULT NULL,
  `ownerid` int(11) DEFAULT NULL,
  PRIMARY KEY (`itemid`),
  KEY `fk_items_1_idx` (`sectionid`),
  KEY `fk_items_2_idx` (`ownerid`),
  CONSTRAINT `fk_items_1` FOREIGN KEY (`sectionid`) REFERENCES `sections` (`sectionid`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_items_2` FOREIGN KEY (`ownerid`) REFERENCES `owner` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (1,'Undhiyu','Chatakedar','','5',1,1),(9,'poo','po','d.jpeg','0',3,1),(10,'jolo','dol','myImage_1569907089264.png','5',3,1),(11,'Jalebi','Circle','myImage_1570302781001.png','3',1,1),(12,'dhokla','soft','myImage_1570302864013.jpeg','2',2,1),(13,'Beer','Beer','myImage_1570306250427.jpeg','21',4,12),(14,'Milk','Milk','myImage_1570306278049.png','2',4,12),(15,'Bread','Bread','myImage_1570306323101.jpeg','1',5,12),(16,'Butter','Butter','myImage_1570306350557.jpeg','3',5,12),(17,'Undhiyu','Eat','myImage_1570306413671.png','8',5,12),(18,'Bread','Bread','myImage_1570354057236.png','1',6,6),(19,'Jam','Jambu','myImage_1570354097178.png','2',6,6),(20,'Gems','Gems','myImage_1570354114596.png','23',6,6),(21,'Undhiyu','Undhiyu','myImage_1570354187050.png','5',7,6),(24,'find','find','myImage_1570381625690.png','4',9,15),(25,'Ice cream','cold','myImage_1570416067989.jpg','7',11,16),(26,'Browny','sweet','myImage_1570416401011.jpg','8',11,16),(28,'Beer','Tuborg','myImage_1570417262429.jpg','9',10,16);
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mytable`
--

DROP TABLE IF EXISTS `mytable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mytable` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mytable`
--

LOCK TABLES `mytable` WRITE;
/*!40000 ALTER TABLE `mytable` DISABLE KEYS */;
INSERT INTO `mytable` VALUES (1,'Nishit'),(2,'Doshi');
/*!40000 ALTER TABLE `mytable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderdetails`
--

DROP TABLE IF EXISTS `orderdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orderdetails` (
  `orderdetailsid` int(11) NOT NULL AUTO_INCREMENT,
  `itemname` varchar(45) DEFAULT NULL,
  `itemquantity` varchar(45) DEFAULT NULL,
  `itemprice` varchar(45) DEFAULT NULL,
  `orderid` int(11) DEFAULT NULL,
  PRIMARY KEY (`orderdetailsid`),
  KEY `fk_orderdetails_1_idx` (`orderid`),
  CONSTRAINT `fk_orderdetails_1` FOREIGN KEY (`orderid`) REFERENCES `orders` (`orderid`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdetails`
--

LOCK TABLES `orderdetails` WRITE;
/*!40000 ALTER TABLE `orderdetails` DISABLE KEYS */;
INSERT INTO `orderdetails` VALUES (1,'aa','2','34',1),(2,'bb','4','84',1),(13,'fafda','1','15',13),(14,'Jalebi','2','20',13),(15,'ff','5','23',13),(16,'fafda','1','15',14),(17,'hi','2','465',14),(18,'Milk','2','2',15),(19,'Bread','3','1',15),(20,'Gems','2','23',17),(22,'find','2','4',19),(23,'find','2','4',19),(24,'find','4','4',19),(25,'find','3','4',19),(26,'Beer','2','8',20),(27,'Browny','1','8',20),(29,'Undhiyu','2','8',22),(30,'Undhiyu','1','5',23),(31,'Beer','3','8',24),(32,'Ice cream','2','7',24);
/*!40000 ALTER TABLE `orderdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `orderid` int(11) NOT NULL AUTO_INCREMENT,
  `personname` varchar(45) DEFAULT NULL,
  `personaddress` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `ownerid` varchar(45) DEFAULT NULL,
  `buyerid` int(11) DEFAULT NULL,
  `flag` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`orderid`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'a','b','c','1',NULL,NULL),(3,'g','h','i','2',NULL,NULL),(13,'bbbb44','','Delivered','1',2,'2'),(14,'bbbb44','','new','1',2,'2'),(15,'Nishit','San Jose','new','12',1,'2'),(16,'Nishit','aaa','new','6',1,'2'),(17,'Nishit','aa','new','6',1,'2'),(19,'poi','','new','15',9,'2'),(20,'kim','San Jose','Delivered','16',10,'2'),(22,'poi','','new','12',9,'2'),(23,'poi','','new','6',9,'2'),(24,'kim','San Jose','Delivered','16',10,'2');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `owner`
--

DROP TABLE IF EXISTS `owner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `owner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(400) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `profileimage` varchar(500) DEFAULT NULL,
  `restaurantname` varchar(45) DEFAULT NULL,
  `zipcode` varchar(45) DEFAULT NULL,
  `restaurantimage` varchar(500) DEFAULT NULL,
  `cuisine` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `owner`
--

LOCK TABLES `owner` WRITE;
/*!40000 ALTER TABLE `owner` DISABLE KEYS */;
INSERT INTO `owner` VALUES (1,'Doshi','Doshi','Doshi','555',NULL,'Restaurant1',NULL,NULL,'American'),(2,'There','Jon','Hello','222',NULL,'JinDoe','12',NULL,'klre'),(3,'aa@aa.aa','aa','aa',NULL,NULL,'aa','0',NULL,NULL),(4,'aaa','aa','aaa','aaa',NULL,'aaa',NULL,NULL,'aaa'),(5,'bb','bb','bb','1234',NULL,'bb',NULL,NULL,'bb'),(6,'wow','wow','wow','111','myImage_1570353949545.png','wow','212','myImage_1570246287892.jpeg','Thai'),(11,'qq','qq','qq','qq',NULL,'qq','11',NULL,'qq'),(12,'John','John','John',NULL,NULL,'John','112',NULL,'American'),(13,'asd','asd','asd',NULL,NULL,'asd','11',NULL,NULL),(14,'asd','$2b$10$rfQcJEtqn0szsnVm4X2IwONGfSb0sN5j1Tc.Y16IgtocEvsd4j7Zy','asd',NULL,NULL,'asd','11',NULL,NULL),(15,'ll','$2b$10$aj.PPGkIxPcOI3MxDNRqzeiASJSzfbslmquF9fuJxvUibRDekvizK','ll',NULL,NULL,'ll','11',NULL,NULL),(16,'Jong@gmail.com','$2b$10$0jvdO.PR.qMpGJdbRFURsevo8H.jQ7L9WA5UL5V44qY.N7FWuPH.a','Jong','123','myImage_1570415066862.png','Jong','111','myImage_1570415077821.jpg','Fastfood');
/*!40000 ALTER TABLE `owner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurant`
--

DROP TABLE IF EXISTS `restaurant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `restaurant` (
  `restaurantid` int(11) NOT NULL AUTO_INCREMENT,
  `restaurantname` varchar(45) DEFAULT NULL,
  `restaurantimage` varchar(45) DEFAULT NULL,
  `ownerid` int(11) DEFAULT NULL,
  `cuisine` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`restaurantid`),
  KEY `fk_restaurant_1_idx` (`ownerid`),
  CONSTRAINT `fk_restaurant_1` FOREIGN KEY (`ownerid`) REFERENCES `owner` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurant`
--

LOCK TABLES `restaurant` WRITE;
/*!40000 ALTER TABLE `restaurant` DISABLE KEYS */;
INSERT INTO `restaurant` VALUES (1,'abc','',1,'indian'),(2,'bcv','',2,'indian');
/*!40000 ALTER TABLE `restaurant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sections`
--

DROP TABLE IF EXISTS `sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sections` (
  `sectionid` int(11) NOT NULL AUTO_INCREMENT,
  `sectionname` varchar(45) DEFAULT NULL,
  `ownerid` int(11) DEFAULT NULL,
  PRIMARY KEY (`sectionid`),
  KEY `fk_sections_1_idx` (`ownerid`),
  CONSTRAINT `fk_sections_1` FOREIGN KEY (`ownerid`) REFERENCES `owner` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sections`
--

LOCK TABLES `sections` WRITE;
/*!40000 ALTER TABLE `sections` DISABLE KEYS */;
INSERT INTO `sections` VALUES (1,'Breakfast',1),(2,'Lunch',1),(3,'Dinner',1),(4,'Drinks',12),(5,'Food',12),(6,'Breakfast',6),(7,'Lunch',6),(9,'find',15),(10,'Drinks',16),(11,'Dessert',16),(13,'Breakfast',16);
/*!40000 ALTER TABLE `sections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Nishit','Nishit');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-10-07 13:58:19
