-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: gamevault
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `id_admin` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) DEFAULT NULL,
  `senha` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_admin`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'admin@gmail.com','123');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `avaliacao`
--

DROP TABLE IF EXISTS `avaliacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `avaliacao` (
  `id_avalia` int(11) NOT NULL AUTO_INCREMENT,
  `jogabilidade` int(11) DEFAULT NULL,
  `grafico` int(11) DEFAULT NULL,
  `historia` int(11) DEFAULT NULL,
  `comentario` varchar(500) DEFAULT NULL,
  `dt_avalia` date DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_jogo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_avalia`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_jogo` (`id_jogo`),
  CONSTRAINT `avaliacao_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  CONSTRAINT `avaliacao_ibfk_2` FOREIGN KEY (`id_jogo`) REFERENCES `jogo` (`id_jogo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avaliacao`
--

LOCK TABLES `avaliacao` WRITE;
/*!40000 ALTER TABLE `avaliacao` DISABLE KEYS */;
/*!40000 ALTER TABLE `avaliacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categoria` (
  `id_catego` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  PRIMARY KEY (`id_catego`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (2,'FPS'),(3,'Bottle Royale'),(4,'Aventura'),(5,'Luta'),(6,'RPG'),(7,'Corrida'),(8,'Puzzle'),(9,'Estratégia'),(10,'Simulação'),(11,'Esportes'),(12,'Terror'),(27,'Indie');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorito`
--

DROP TABLE IF EXISTS `favorito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `favorito` (
  `id_usuario` int(11) NOT NULL,
  `id_jogo` int(11) NOT NULL,
  PRIMARY KEY (`id_usuario`,`id_jogo`),
  KEY `id_jogo` (`id_jogo`),
  CONSTRAINT `favorito_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  CONSTRAINT `favorito_ibfk_2` FOREIGN KEY (`id_jogo`) REFERENCES `jogo` (`id_jogo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorito`
--

LOCK TABLES `favorito` WRITE;
/*!40000 ALTER TABLE `favorito` DISABLE KEYS */;
/*!40000 ALTER TABLE `favorito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jogo`
--

DROP TABLE IF EXISTS `jogo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jogo` (
  `id_jogo` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) NOT NULL,
  `descricao` varchar(1000) NOT NULL,
  `dt_lanca` date NOT NULL,
  `capa` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_jogo`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jogo`
--

LOCK TABLES `jogo` WRITE;
/*!40000 ALTER TABLE `jogo` DISABLE KEYS */;
INSERT INTO `jogo` VALUES (1,'minecraft','jogo de sobrevivencia, blocos, e tal','2003-03-20','minecraft.png');
/*!40000 ALTER TABLE `jogo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jogo_categ`
--

DROP TABLE IF EXISTS `jogo_categ`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jogo_categ` (
  `id_catego` int(11) NOT NULL,
  `id_jogo` int(11) NOT NULL,
  PRIMARY KEY (`id_catego`,`id_jogo`),
  KEY `id_jogo` (`id_jogo`),
  CONSTRAINT `jogo_categ_ibfk_1` FOREIGN KEY (`id_catego`) REFERENCES `categoria` (`id_catego`),
  CONSTRAINT `jogo_categ_ibfk_2` FOREIGN KEY (`id_jogo`) REFERENCES `jogo` (`id_jogo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jogo_categ`
--

LOCK TABLES `jogo_categ` WRITE;
/*!40000 ALTER TABLE `jogo_categ` DISABLE KEYS */;
INSERT INTO `jogo_categ` VALUES (4,1),(9,1),(10,1);
/*!40000 ALTER TABLE `jogo_categ` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usu_categ_pref`
--

DROP TABLE IF EXISTS `usu_categ_pref`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usu_categ_pref` (
  `id_catego` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  PRIMARY KEY (`id_catego`,`id_usuario`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `usu_categ_pref_ibfk_1` FOREIGN KEY (`id_catego`) REFERENCES `categoria` (`id_catego`),
  CONSTRAINT `usu_categ_pref_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usu_categ_pref`
--

LOCK TABLES `usu_categ_pref` WRITE;
/*!40000 ALTER TABLE `usu_categ_pref` DISABLE KEYS */;
INSERT INTO `usu_categ_pref` VALUES (2,1),(2,8),(2,9),(2,13),(3,1),(3,2),(3,4),(3,8),(4,4),(5,4),(5,9),(6,1),(6,3),(6,4),(7,2),(7,3),(8,1),(8,9),(9,13),(10,2),(11,8),(11,9),(12,13);
/*!40000 ALTER TABLE `usu_categ_pref` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) DEFAULT NULL,
  `nick` varchar(50) NOT NULL,
  `dt_nasc` date DEFAULT NULL,
  `email` varchar(110) NOT NULL,
  `senha` varchar(50) NOT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,NULL,'',NULL,'dani@gmail.com','123'),(2,NULL,'',NULL,'eric@gmail.com','321'),(3,'nao sei da silva','nao_sei','2003-05-06','nnsei@gmail.com','456'),(4,'fabio','fabio_02','1896-04-02','fa@gmail.com','123'),(7,'sdasd','dsaad','0000-00-00','a@gmail.com','123'),(8,'teste','teste_01','2004-05-02','teste@gmail.com','123'),(9,'daniela','dani.ela','2007-07-06','daniela@gmail.com','123'),(10,'Maria','maria123','2000-01-01','maria@email.com','123456'),(11,'Maria','maria123','2000-01-01','maria@email.com','123456'),(12,'Maria','maria123','2000-01-01','maria@email.com','123456'),(13,'teste2','teste.2','0000-00-00','teste2@gmail','123');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-31 18:22:46
