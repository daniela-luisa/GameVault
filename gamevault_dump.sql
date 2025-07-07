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
  KEY `fk_avaliacao_usuario` (`id_usuario`),
  KEY `fk_avaliacao_jogo` (`id_jogo`),
  CONSTRAINT `fk_avaliacao_jogo` FOREIGN KEY (`id_jogo`) REFERENCES `jogo` (`id_jogo`) ON DELETE CASCADE,
  CONSTRAINT `fk_avaliacao_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avaliacao`
--

LOCK TABLES `avaliacao` WRITE;
/*!40000 ALTER TABLE `avaliacao` DISABLE KEYS */;
INSERT INTO `avaliacao` VALUES (4,5,5,4,NULL,'2024-09-20',1,1);
/*!40000 ALTER TABLE `avaliacao` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 trigger set_data_avaliacao
before insert on avaliacao 
for each row
if (new.dt_avalia is null) then 
set new.dt_avalia = curdate();
end if */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

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
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
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
  KEY `fk_favorito_jogo` (`id_jogo`),
  CONSTRAINT `fk_favorito_jogo` FOREIGN KEY (`id_jogo`) REFERENCES `jogo` (`id_jogo`) ON DELETE CASCADE,
  CONSTRAINT `fk_favorito_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorito`
--

LOCK TABLES `favorito` WRITE;
/*!40000 ALTER TABLE `favorito` DISABLE KEYS */;
INSERT INTO `favorito` VALUES (1,1),(1,8),(1,12),(1,15),(4,1),(38,8),(38,9),(38,15);
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jogo`
--

LOCK TABLES `jogo` WRITE;
/*!40000 ALTER TABLE `jogo` DISABLE KEYS */;
INSERT INTO `jogo` VALUES (1,'Minecraft','Minecraft é um jogo de sobrevivência, construção e aventura em mundo aberto onde os jogadores exploram um vasto ambiente gerado proceduralmente. Nele, é possível minerar recursos, construir estruturas, criar ferramentas e enfrentar criaturas perigosas, além de permitir a criação de mundos personalizados e jogar com amigos em servidores online.','2013-11-18','1751843246475-216209206.png'),(8,'Hollow Knight','Hollow Knight é um jogo de ação e aventura em estilo Metroidvania, onde os jogadores exploram um vasto e misterioso mundo subterrâneo chamado Hallownest. Com foco em exploração, combate desafiador e atmosfera sombria, o jogo apresenta uma narrativa profunda e trilha sonora envolvente enquanto o protagonista enfrenta inimigos e descobre segredos antigos.','2017-02-24','1751845395266-624318458.webp'),(9,'GRIS','GRIS é um jogo de plataforma e aventura focado em narrativa e arte, desenvolvido pela Nomada Studio. Ele conta a história de uma jovem que enfrenta uma dolorosa experiência emocional em um mundo surreal e belíssimo. Com mecânicas simples, música envolvente e uma estética única, GRIS explora temas como perda, superação e esperança.','2018-12-13','1751845748725-844166808.webp'),(10,'It Takes Two','It Takes Two é um jogo de aventura e plataforma cooperativo desenvolvido pela Hazelight Studios. Os jogadores controlam Cody e May, um casal prestes a se separar, que é magicamente transformado em bonecos e precisa trabalhar junto para superar desafios criativos e variados em um mundo fantástico. O jogo é exclusivamente cooperativo, online ou local, com foco em colaboração, narrativa emocionante e mecânicas','2021-03-26','1751845860869-606195314.webp'),(11,'The Legend of Zelda','The Legend of Zelda: Breath of the Wild é um jogo de ação e aventura em mundo aberto desenvolvido pela Nintendo. Os jogadores controlam Link, que acorda de um sono de cem anos para enfrentar Calamity Ganon e salvar o reino de Hyrule. Com liberdade total para explorar, resolver quebra-cabeças, combater inimigos e descobrir segredos, o jogo revolucionou a série com sua abordagem não linear e sistemas interativos.','2017-03-03','1751846026268-135760353.png'),(12,'Overcooked!','Overcooked! é um jogo cooperativo de simulação e estratégia onde os jogadores assumem o papel de chefs de cozinha que precisam preparar, cozinhar e servir pedidos em ambientes caóticos e desafiadores. O trabalho em equipe e a coordenação são essenciais para atender aos pedidos dentro do tempo limite e superar obstáculos variados.','2016-08-03','1751846114138-298050995.avif'),(13,'Fortnite','Fortnite é um jogo online multiplayer desenvolvido pela Epic Games, que combina elementos de tiro em terceira pessoa, construção e sobrevivência. Seu modo mais famoso, Battle Royale, coloca 100 jogadores em um mapa para lutar até que reste apenas um sobrevivente ou equipe vencedora. Com constantes atualizações, eventos e colaborações, Fortnite se tornou um fenômeno cultural e um dos jogos mais populares do mundo.','2017-07-25','1751846190017-862950766.webp'),(14,'The Last of Us','The Last of Us é um jogo de ação e aventura com elementos de survival horror desenvolvido pela Naughty Dog. Situado em um mundo pós-apocalíptico devastado por uma infecção fúngica, o jogo acompanha Joel e Ellie em uma jornada emocional e perigosa através dos Estados Unidos. Combinando combate tenso, furtividade, narrativa profunda e personagens marcantes, The Last of Us é amplamente aclamado por sua história e ambientação imersiva.','2013-06-14','1751846327732-305868133.jpeg'),(15,'Fall Guys','Fall Guys: Ultimate Knockout é um jogo multiplayer online em estilo party game, desenvolvido pela Mediatonic. Nele, dezenas de jogadores competem em rodadas eliminatórias cheias de obstáculos e minigames caóticos até que reste apenas um vencedor. Com visual colorido, humor leve e foco em diversão, Fall Guys se tornou um sucesso mundial e é constantemente atualizado com novas temporadas e eventos.','2020-08-04','1751846431645-653653885.jpeg');
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
INSERT INTO `jogo_categ` VALUES (2,13),(2,14),(3,13),(3,15),(4,1),(4,8),(4,9),(4,10),(4,11),(4,13),(4,14),(5,8),(6,1),(6,8),(6,11),(7,15),(8,9),(8,10),(8,11),(8,12),(8,15),(9,11),(9,12),(9,13),(9,14),(10,1),(10,10),(10,11),(10,12),(10,13),(12,14),(27,1),(27,8),(27,9),(27,10),(27,12);
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
INSERT INTO `usu_categ_pref` VALUES (2,38),(3,4),(4,35),(6,4),(6,35),(6,38),(7,1),(7,39),(8,1),(8,35),(8,39),(9,38),(10,1),(10,35),(11,35),(12,1),(12,39),(27,38);
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
  `foto` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Daniela','dani_luisa_','1899-11-09','dani@gmail.com','123','1749584602896-819057212.jpg'),(4,'fabio','fabio_02','1896-04-02','fa@gmail.com','123','1749584652659-735863181.jpg'),(35,'Emily Poltronieri','emilly_123','2005-08-26','emily@gmail.com','123',NULL),(38,'Eric','eric.123','2005-07-18','e@gmail.com','123','1751849133470-717126652.webp'),(39,'Usuario','usu.123','2002-02-02','usuario@gmail.com','123',NULL);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `vw_avaliacoes`
--

DROP TABLE IF EXISTS `vw_avaliacoes`;
/*!50001 DROP VIEW IF EXISTS `vw_avaliacoes`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `vw_avaliacoes` AS SELECT
 1 AS `ID`,
  1 AS `Usuario`,
  1 AS `Jogo`,
  1 AS `nota_Jogabilidade`,
  1 AS `nota_grafico`,
  1 AS `nota_historia`,
  1 AS `Data_da_Avaliacao` */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `vw_perfil_usuario`
--

DROP TABLE IF EXISTS `vw_perfil_usuario`;
/*!50001 DROP VIEW IF EXISTS `vw_perfil_usuario`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `vw_perfil_usuario` AS SELECT
 1 AS `ID`,
  1 AS `Nome`,
  1 AS `Nome_de_Usuario`,
  1 AS `Email`,
  1 AS `Preferencias` */;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `vw_avaliacoes`
--

/*!50001 DROP VIEW IF EXISTS `vw_avaliacoes`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_avaliacoes` AS select `a`.`id_avalia` AS `ID`,`u`.`nome` AS `Usuario`,`j`.`nome` AS `Jogo`,`a`.`jogabilidade` AS `nota_Jogabilidade`,`a`.`grafico` AS `nota_grafico`,`a`.`historia` AS `nota_historia`,`a`.`dt_avalia` AS `Data_da_Avaliacao` from ((`avaliacao` `a` join `usuario` `u` on(`u`.`id_usuario` = `a`.`id_usuario`)) join `jogo` `j` on(`j`.`id_jogo` = `a`.`id_jogo`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vw_perfil_usuario`
--

/*!50001 DROP VIEW IF EXISTS `vw_perfil_usuario`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_perfil_usuario` AS select `u`.`id_usuario` AS `ID`,`u`.`nome` AS `Nome`,`u`.`nick` AS `Nome_de_Usuario`,`u`.`email` AS `Email`,group_concat(`c`.`nome` separator ', ') AS `Preferencias` from ((`usuario` `u` left join `usu_categ_pref` `p` on(`u`.`id_usuario` = `p`.`id_usuario`)) left join `categoria` `c` on(`c`.`id_catego` = `p`.`id_catego`)) group by `u`.`id_usuario` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-06 22:12:45
