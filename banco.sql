-- --------------------------------------------------------
-- Servidor:                     localhost
-- Versão do servidor:           5.7.19 - MySQL Community Server (GPL)
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Copiando estrutura do banco de dados para crud
DROP DATABASE IF EXISTS `crud`;
CREATE DATABASE IF NOT EXISTS `crud` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `crud`;

-- Copiando estrutura para tabela crud.consulta
DROP TABLE IF EXISTS `consulta`;
CREATE TABLE IF NOT EXISTS `consulta` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `paciente_id` int(10) NOT NULL,
  `medico_id` int(10) NOT NULL,
  `data_consulta` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_consulta_medico` (`medico_id`),
  KEY `FK_consulta_paciente` (`paciente_id`),
  CONSTRAINT `FK_consulta_medico` FOREIGN KEY (`medico_id`) REFERENCES `medico` (`id`),
  CONSTRAINT `FK_consulta_paciente` FOREIGN KEY (`paciente_id`) REFERENCES `paciente` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela crud.consulta: ~2 rows (aproximadamente)
DELETE FROM `consulta`;
/*!40000 ALTER TABLE `consulta` DISABLE KEYS */;
INSERT INTO `consulta` (`id`, `paciente_id`, `medico_id`, `data_consulta`) VALUES
	(2, 1, 1, '2018-04-16'),
	(3, 2, 1, '2018-04-19');
/*!40000 ALTER TABLE `consulta` ENABLE KEYS */;

-- Copiando estrutura para tabela crud.medico
DROP TABLE IF EXISTS `medico`;
CREATE TABLE IF NOT EXISTS `medico` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela crud.medico: ~1 rows (aproximadamente)
DELETE FROM `medico`;
/*!40000 ALTER TABLE `medico` DISABLE KEYS */;
INSERT INTO `medico` (`id`, `name`, `email`) VALUES
	(1, 'Dr Antonello', 'teste@teste.com.br');
/*!40000 ALTER TABLE `medico` ENABLE KEYS */;

-- Copiando estrutura para tabela crud.paciente
DROP TABLE IF EXISTS `paciente`;
CREATE TABLE IF NOT EXISTS `paciente` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela crud.paciente: ~2 rows (aproximadamente)
DELETE FROM `paciente`;
/*!40000 ALTER TABLE `paciente` DISABLE KEYS */;
INSERT INTO `paciente` (`id`, `name`, `email`) VALUES
	(1, 'Michell', 'michell.rox@hotmail.com'),
	(2, 'Ricardo', 'teste@teste.com');
/*!40000 ALTER TABLE `paciente` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
