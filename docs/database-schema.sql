-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema lapsusVGI
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema lapsusVGI
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `lapsusVGI` DEFAULT CHARACTER SET utf8 ;
USE `lapsusVGI` ;

-- -----------------------------------------------------
-- Table `lapsusVGI`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`idUsuario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lapsusVGI`.`colaborador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`colaborador` (
  `idUsuario` INT NOT NULL,
  PRIMARY KEY (`idUsuario`),
  CONSTRAINT `fk_colaborador_usuario1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `lapsusVGI`.`usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;




-- -----------------------------------------------------
-- Table `lapsusVGI`.`instituicao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`instituicao` (
  `idInstituicao` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(50) NULL,
  `telefone` VARCHAR(20) NULL,
  `administradora` TINYINT NULL,
  `gestor` INT NULL,
  `email` VARCHAR(50) NULL,
  `endereco` VARCHAR(100) NULL,
  PRIMARY KEY (`idInstituicao`),
  CONSTRAINT `fk_instituicao_gestor1`
    FOREIGN KEY (`gestor`)
    REFERENCES `lapsusVGI`.`gestor` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;




-- -----------------------------------------------------
-- Table `lapsusVGI`.`gestor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`gestor` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `idInstituicao` INT NOT NULL,
  `Administrador` TINYINT NULL,
  `nome` VARCHAR(50) NULL,
  `login` VARCHAR(50) NULL,
  `email` VARCHAR(50) NULL,
  `senha` VARCHAR(50) NULL,
  `telefone` VARCHAR(20) NULL,
  PRIMARY KEY (`idUsuario`),
  CONSTRAINT `fk_gestor_usuario1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `lapsusVGI`.`usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_gestor_instituicao1`
    FOREIGN KEY (`idInstituicao`)
    REFERENCES `lapsusVGI`.`instituicao` (`idInstituicao`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;




-- -----------------------------------------------------
-- Table `lapsusVGI`.`registrado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`registrado` (
  `idUsuario` INT NOT NULL,
  `nome` VARCHAR(50) NULL,
  `login` VARCHAR(50) NULL,
  `email` VARCHAR(50) NULL,
  `senha` VARCHAR(50) NULL,
  `gestor` INT NULL,
  PRIMARY KEY (`idUsuario`),
  CONSTRAINT `fk_registrado_colaborador1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `lapsusVGI`.`colaborador` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_registrado_gestor1`
    FOREIGN KEY (`gestor`)
    REFERENCES `lapsusVGI`.`gestor` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;




-- -----------------------------------------------------
-- Table `lapsusVGI`.`EVENT_SOURCE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`EVENT_SOURCE` (
  `SOURCE` VARCHAR(10) NOT NULL,
  `descricao` VARCHAR(100) NULL,
  PRIMARY KEY (`SOURCE`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lapsusVGI`.`EVENT_SCALE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`EVENT_SCALE` (
  `SCALE` INT NOT NULL,
  `descricao` VARCHAR(200) NULL,
  PRIMARY KEY (`SCALE`))
ENGINE = InnoDB;




-- -----------------------------------------------------
-- Table `lapsusVGI`.`EVENT_STATUS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`EVENT_STATUS` (
  `STATUS` VARCHAR(10) NOT NULL,
  `descricao` VARCHAR(100) NULL,
  PRIMARY KEY (`STATUS`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lapsusVGI`.`EVENT_RISK_ASSESSMNT`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`EVENT_RISK_ASSESSMNT` (
  `RISK_ASSESSMNT` VARCHAR(10) NOT NULL,
  `descricao` VARCHAR(100) NULL,
  PRIMARY KEY (`RISK_ASSESSMNT`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lapsusVGI`.`EVENT_CAUSE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`EVENT_CAUSE` (
  `CAUSE` VARCHAR(10) NOT NULL,
  `descricao` VARCHAR(100) NULL,
  PRIMARY KEY (`CAUSE`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lapsusVGI`.`EVENT`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`EVENT` (
  `ID` VARCHAR(40) NOT NULL,
  `NAME` VARCHAR(40) NULL,
  `MAIN_EVENT_ID` VARCHAR(40) NULL,
  `CERTAINTY` INT NULL,
  `DECL_DATIME` DATETIME NULL,
  `OCC_DATIME` DATETIME NULL,
  `OBS_DATIME` DATETIME NULL,
  `FREETEXT` VARCHAR(500) NULL,
  `SOURCE` VARCHAR(10) NULL,
  `SCALE` INT NULL,
  `STATUS` VARCHAR(10) NULL,
  `RISK_ASSESSMNT` VARCHAR(10) NULL,
  `CAUSE` VARCHAR(10) NULL,
  PRIMARY KEY (`ID`),
  
  CONSTRAINT `fk_EVENT_SOURCE1`
    FOREIGN KEY (`SOURCE`)
    REFERENCES `lapsusVGI`.`EVENT_SOURCE` (`SOURCE`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_EVENT_SCALE1`
    FOREIGN KEY (`SCALE`)
    REFERENCES `lapsusVGI`.`EVENT_SCALE` (`SCALE`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_EVENT_STATUS1`
    FOREIGN KEY (`STATUS`)
    REFERENCES `lapsusVGI`.`EVENT_STATUS` (`STATUS`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_EVENT_RISK_ASSESSMNT1`
    FOREIGN KEY (`RISK_ASSESSMNT`)
    REFERENCES `lapsusVGI`.`EVENT_RISK_ASSESSMNT` (`RISK_ASSESSMNT`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_EVENT_CAUSE1`
    FOREIGN KEY (`CAUSE`)
    REFERENCES `lapsusVGI`.`EVENT_CAUSE` (`CAUSE`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;












-- -----------------------------------------------------
-- Table `lapsusVGI`.`CONTEXT_SECLASS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`CONTEXT_SECLASS` (
  `SECLASS` VARCHAR(10) NOT NULL,
  `descricao` VARCHAR(100) NULL,
  PRIMARY KEY (`SECLASS`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lapsusVGI`.`CONTEXT_MODE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`CONTEXT_MODE` (
  `MODE` VARCHAR(10) NOT NULL,
  `descricao` VARCHAR(100) NULL,
  PRIMARY KEY (`MODE`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lapsusVGI`.`CONTEXT_MSGTYPE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`CONTEXT_MSGTYPE` (
  `MSGTYPE` VARCHAR(10) NOT NULL,
  `descricao` VARCHAR(100) NULL,
  PRIMARY KEY (`MSGTYPE`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lapsusVGI`.`CONTEXT_LEVEL`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`CONTEXT_LEVEL` (
  `LEVEL` VARCHAR(10) NOT NULL,
  `descricao` VARCHAR(100) NULL,
  PRIMARY KEY (`LEVEL`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lapsusVGI`.`CONTEXT`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`CONTEXT` (
  `ID` VARCHAR(40) NOT NULL,
  `CREATION` DATETIME NULL,
  `FREETEXT` VARCHAR(500) NULL,
  `URGENCY` VARCHAR(15) NULL,
  `SECLASS` VARCHAR(7) NULL,
  `MODE` VARCHAR(6) NULL,
  `MSGTYPE` VARCHAR(6) NULL,
  `LEVEL` VARCHAR(6) NULL,
  PRIMARY KEY (`ID`),
  CONSTRAINT `fk_CONTEXT_SECLASS1`
    FOREIGN KEY (`SECLASS`)
    REFERENCES `lapsusVGI`.`CONTEXT_SECLASS` (`SECLASS`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_CONTEXT_MODE1`
    FOREIGN KEY (`MODE`)
    REFERENCES `lapsusVGI`.`CONTEXT_MODE` (`MODE`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_CONTEXT_MSGTYPE1`
    FOREIGN KEY (`MSGTYPE`)
    REFERENCES `lapsusVGI`.`CONTEXT_MSGTYPE` (`MSGTYPE`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_CONTEXT_LEVEL1`
    FOREIGN KEY (`LEVEL`)
    REFERENCES `lapsusVGI`.`CONTEXT_LEVEL` (`LEVEL`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;










-- -----------------------------------------------------
-- Table `lapsusVGI`.`TSO_2_0`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`TSO_2_0` (
  `EVENT_ID` VARCHAR(40) NOT NULL,
  `CONTEXT_ID` VARCHAR(40) NOT NULL,
  `idContribuicao` INT NULL,
  PRIMARY KEY (`EVENT_ID`, `CONTEXT_ID`),
  CONSTRAINT `fk_TSO_2_0_EVENT1`
    FOREIGN KEY (`EVENT_ID`)
    REFERENCES `lapsusVGI`.`EVENT` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_TSO_2_0_CONTRIBUICAO`
    FOREIGN KEY (`idContribuicao`)
    REFERENCES `lapsusVGI`.`CONTRIBUICAO` (`idContribuicao`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_TSO_2_0_CONTEXT1`
    FOREIGN KEY (`CONTEXT_ID`)
    REFERENCES `lapsusVGI`.`CONTEXT` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;






-- -----------------------------------------------------
-- Table `lapsusVGI`.`EVAC`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`EVAC` (
  `evac_id` INT NOT NULL AUTO_INCREMENT,
  `EVENT_ID` VARCHAR(40) NOT NULL,
  `DATIME` DATETIME NULL,
  `DISPLACED` INT NULL,
  `EVACUATED` INT NULL,
  PRIMARY KEY (`evac_id`),
  CONSTRAINT `fk_EVAC_EVENT1`
    FOREIGN KEY (`EVENT_ID`)
    REFERENCES `lapsusVGI`.`EVENT` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lapsusVGI`.`CASUALTIES_CONTEXT`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`CASUALTIES_CONTEXT` (
  `CONTEXT` VARCHAR(15) NOT NULL,
  `descricao` VARCHAR(100) NULL,
  PRIMARY KEY (`CONTEXT`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lapsusVGI`.`CASUALTIES`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`CASUALTIES` (
  `casualties_id` INT NOT NULL AUTO_INCREMENT,
  `EVENT_ID` VARCHAR(40) NOT NULL,
  `CONTEXT` VARCHAR(15) NOT NULL,
  `DATIME` DATETIME NULL,
  `DECONT` INT NULL,
  `TRIAGERED` INT NULL,
  `TRIAGEYELLOW` INT NULL,
  `TRIAGEGREEN` INT NULL,
  `TRIAGEBLACK` INT NULL,
  `MISSING` INT NULL,
  PRIMARY KEY (`casualties_id`),
  CONSTRAINT `fk_CASUALTIES_EVENT1`
    FOREIGN KEY (`EVENT_ID`)
    REFERENCES `lapsusVGI`.`EVENT` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_CASUALTIES_CONTEXT1`
    FOREIGN KEY (`CONTEXT`)
    REFERENCES `lapsusVGI`.`CASUALTIES_CONTEXT` (`CONTEXT`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;






-- -----------------------------------------------------
-- Table `lapsusVGI`.`REFERENCE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`REFERENCE` (
  `ORG_ID` VARCHAR(40) NOT NULL,
  `OTHER_EVENT_ID` VARCHAR(40) NOT NULL,
  `EVENT_ID` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`ORG_ID`),
  CONSTRAINT `fk_REFERENCE_EVENT1`
    FOREIGN KEY (`EVENT_ID`)
    REFERENCES `lapsusVGI`.`EVENT` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;




-- -----------------------------------------------------
-- Table `lapsusVGI`.`ORIGIN`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`ORIGIN` (
  `ORG_ID` VARCHAR(40) NOT NULL,
  `NAME` VARCHAR(80) NULL,
  `CONTEXT_ID` VARCHAR(40) NOT NULL,
  `USER_ID` INT NOT NULL,
  CONSTRAINT `fk_ORIGIN_CONTEXT1`
    FOREIGN KEY (`CONTEXT_ID`)
    REFERENCES `lapsusVGI`.`CONTEXT` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ORIGIN_gestor1`
    FOREIGN KEY (`USER_ID`)
    REFERENCES `lapsusVGI`.`gestor` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;






-- -----------------------------------------------------
-- Table `lapsusVGI`.`LINK_ROLE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`LINK_ROLE` (
  `ROLE` VARCHAR(10) NOT NULL,
  `descricao` VARCHAR(100) NULL,
  PRIMARY KEY (`ROLE`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lapsusVGI`.`LINK`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`LINK` (
  `ID` VARCHAR(40) NOT NULL,
  `CONTEXT_ID` VARCHAR(40) NOT NULL,
  `ROLE` VARCHAR(10) NULL,
  PRIMARY KEY (`ID`),
  CONSTRAINT `fk_LINK_CONTEXT1`
    FOREIGN KEY (`CONTEXT_ID`)
    REFERENCES `lapsusVGI`.`CONTEXT` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_LINK_ROLE1`
    FOREIGN KEY (`ROLE`)
    REFERENCES `lapsusVGI`.`LINK_ROLE` (`ROLE`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;






-- -----------------------------------------------------
-- Table `lapsusVGI`.`EXTERNAL_INFO_TYPE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`EXTERNAL_INFO_TYPE` (
  `TYPE` VARCHAR(10) NOT NULL,
  `descricao` VARCHAR(500) NULL,
  PRIMARY KEY (`TYPE`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lapsusVGI`.`EXTERNAL_INFO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`EXTERNAL_INFO` (
  `external_info_id` INT NOT NULL AUTO_INCREMENT,
  `CONTEXT_ID` VARCHAR(40) NOT NULL,
  `FREE_TEXT` VARCHAR(500) NULL,
  `URI` VARCHAR(200) NOT NULL,
  `TYPE` VARCHAR(10) NULL,
  PRIMARY KEY (`external_info_id`),
  CONSTRAINT `fk_EXTERNAL_INFO_CONTEXT1`
    FOREIGN KEY (`CONTEXT_ID`)
    REFERENCES `lapsusVGI`.`CONTEXT` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_EXTERNAL_INFO_TYPE1`
    FOREIGN KEY (`TYPE`)
    REFERENCES `lapsusVGI`.`EXTERNAL_INFO_TYPE` (`TYPE`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;






-- -----------------------------------------------------
-- Table `lapsusVGI`.`EGEO_STATUS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`EGEO_STATUS` (
  `STATUS` VARCHAR(10) NOT NULL,
  `descricao` VARCHAR(100) NULL,
  PRIMARY KEY (`STATUS`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lapsusVGI`.`EGEO_TYPE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`EGEO_TYPE` (
  `TYPE` VARCHAR(10) NOT NULL,
  `descricao` VARCHAR(100) NULL,
  PRIMARY KEY (`TYPE`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lapsusVGI`.`EGEO_subtype`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`EGEO_subtype` (
  `subtype` VARCHAR(10) NOT NULL,
  `descricao` VARCHAR(100) NULL,
  `TYPE` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`subtype`, `TYPE`),
  CONSTRAINT `fk_subtipo_TYPE1`
    FOREIGN KEY (`TYPE`)
    REFERENCES `lapsusVGI`.`EGEO_TYPE` (`TYPE`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;




-- -----------------------------------------------------
-- Table `lapsusVGI`.`EGEO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`EGEO` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `DATIME` DATETIME NULL,
  `FREETEXT` VARCHAR(500) NULL,
  `EVENT_ID` VARCHAR(40) NOT NULL,
  `STATUS` VARCHAR(10) NULL,
  `subtype` VARCHAR(10) NOT NULL,
  `TYPE` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`ID`),
  CONSTRAINT `fk_EGEO_EVENT1`
    FOREIGN KEY (`EVENT_ID`)
    REFERENCES `lapsusVGI`.`EVENT` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_EGEO_STATUS1`
    FOREIGN KEY (`STATUS`)
    REFERENCES `lapsusVGI`.`EGEO_STATUS` (`STATUS`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_EGEO_EGEO_subtipo1`
    FOREIGN KEY (`subtype` , `TYPE`)
    REFERENCES `lapsusVGI`.`EGEO_subtype` (`subtype` , `TYPE`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;






-- -----------------------------------------------------
-- Table `lapsusVGI`.`ETYPE_ENV`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`ETYPE_ENV` (
  `ENV` VARCHAR(45) NOT NULL,
  `descricao` VARCHAR(100) NULL,
  PRIMARY KEY (`ENV`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lapsusVGI`.`subEnv`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`subEnv` (
  `subEnv` VARCHAR(10) NOT NULL,
  `descricao` VARCHAR(100) NULL,
  `ENV` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`subEnv`, `ENV`),
  CONSTRAINT `fk_envn2_ENV1`
    FOREIGN KEY (`ENV`)
    REFERENCES `lapsusVGI`.`ETYPE_ENV` (`ENV`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;




-- -----------------------------------------------------
-- Table `lapsusVGI`.`ETYPE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`ETYPE` (
  `EVENT_ID` VARCHAR(40) NOT NULL,
  `subEnv` VARCHAR(10) NOT NULL,
  `ENV` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`EVENT_ID`),
  CONSTRAINT `fk_ETYPE_EVENT1`
    FOREIGN KEY (`EVENT_ID`)
    REFERENCES `lapsusVGI`.`EVENT` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ETYPE_subEnv1`
    FOREIGN KEY (`subEnv` , `ENV`)
    REFERENCES `lapsusVGI`.`subEnv` (`subEnv` , `ENV`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;




-- -----------------------------------------------------
-- Table `lapsusVGI`.`POSITION`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`POSITION` (
  `LOC_ID` INT NOT NULL AUTO_INCREMENT,
  `NAME` VARCHAR(80) NULL,
  `COORD` GEOMETRY NULL,
  `EGEO_ID` INT NOT NULL,
  PRIMARY KEY (`LOC_ID`),
  CONSTRAINT `fk_POS_EGEO1`
    FOREIGN KEY (`EGEO_ID`)
    REFERENCES `lapsusVGI`.`EGEO` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;




-- -----------------------------------------------------
-- Table `lapsusVGI`.`ADDRESS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`ADDRESS` (
  `address_id` INT NOT NULL AUTO_INCREMENT,
  `ADDRESS` VARCHAR(256) NOT NULL,
  `LOC_ID` INT NOT NULL,
  PRIMARY KEY (`address_id`),
  CONSTRAINT `fk_ADDRESS_POSITION1`
    FOREIGN KEY (`LOC_ID`)
    REFERENCES `lapsusVGI`.`POSITION` (`LOC_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;




-- -----------------------------------------------------
-- Table `lapsusVGI`.`EGEO_WEATHER`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`EGEO_WEATHER` (
  `WEATHER` VARCHAR(10) NOT NULL,
  `descricao` VARCHAR(100) NULL,
  PRIMARY KEY (`WEATHER`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lapsusVGI`.`REFERENCE_OTHER_EVENT_ID`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`REFERENCE_OTHER_EVENT_ID` (
  `REFERENCE_ORG_ID` VARCHAR(40) NOT NULL,
  `OTHER_EVENT_ID` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`REFERENCE_ORG_ID`, `OTHER_EVENT_ID`),
  CONSTRAINT `fk_OTHER_EVENT_ID_REFERENCE1`
    FOREIGN KEY (`REFERENCE_ORG_ID`)
    REFERENCES `lapsusVGI`.`REFERENCE` (`ORG_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;




-- -----------------------------------------------------
-- Table `lapsusVGI`.`ETYPE_CATEGORY`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`ETYPE_CATEGORY` (
  `CATEGORY` VARCHAR(10) NOT NULL,
  `descricao` VARCHAR(100) NULL,
  PRIMARY KEY (`CATEGORY`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lapsusVGI`.`ETYPE_subcategory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`ETYPE_subcategory` (
  `subcategory` VARCHAR(10) NOT NULL,
  `descricao` VARCHAR(100) NULL,
  `CATEGORY` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`subcategory`, `CATEGORY`),
  CONSTRAINT `fk_subcategory_CATEGORY1`
    FOREIGN KEY (`CATEGORY`)
    REFERENCES `lapsusVGI`.`ETYPE_CATEGORY` (`CATEGORY`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;




-- -----------------------------------------------------
-- Table `lapsusVGI`.`ETYPE_LOCTYPE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`ETYPE_LOCTYPE` (
  `LOCTYPE` VARCHAR(10) NOT NULL,
  `descricao` VARCHAR(100) NULL,
  PRIMARY KEY (`LOCTYPE`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lapsusVGI`.`ETYPE_subloctype`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`ETYPE_subloctype` (
  `subLoctype` VARCHAR(10) NOT NULL,
  `descricao` VARCHAR(100) NULL,
  `LOCTYPE` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`subLoctype`, `LOCTYPE`),
  CONSTRAINT `fk_subtipolocal_LOCADOR1`
    FOREIGN KEY (`LOCTYPE`)
    REFERENCES `lapsusVGI`.`ETYPE_LOCTYPE` (`LOCTYPE`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;




-- -----------------------------------------------------
-- Table `lapsusVGI`.`ETYPE_ACTOR`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`ETYPE_ACTOR` (
  `ACTOR` VARCHAR(10) NOT NULL,
  `descricao` VARCHAR(100) NULL,
  PRIMARY KEY (`ACTOR`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lapsusVGI`.`ETYPE_actornv2`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`ETYPE_actornv2` (
  `actornv2` VARCHAR(10) NOT NULL,
  `descricao` VARCHAR(100) NULL,
  `ACTOR` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`actornv2`, `ACTOR`),
  CONSTRAINT `fk_actornv2_ACTOR1`
    FOREIGN KEY (`ACTOR`)
    REFERENCES `lapsusVGI`.`ETYPE_ACTOR` (`ACTOR`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;




-- -----------------------------------------------------
-- Table `lapsusVGI`.`ETYPE_actornv3`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`ETYPE_actornv3` (
  `actornv3` VARCHAR(10) NOT NULL,
  `descricao` VARCHAR(100) NULL,
  `actornv2` VARCHAR(10) NOT NULL,
  `ACTOR` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`actornv3`, `actornv2`, `ACTOR`),
  CONSTRAINT `fk_ETYPE_actornv3_ETYPE_actornv21`
    FOREIGN KEY (`actornv2` , `ACTOR`)
    REFERENCES `lapsusVGI`.`ETYPE_actornv2` (`actornv2` , `ACTOR`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;




-- -----------------------------------------------------
-- Table `lapsusVGI`.`EGEO_subWeather`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`EGEO_subWeather` (
  `subWeather` VARCHAR(10) NOT NULL,
  `descricao` VARCHAR(100) NULL,
  `WEATHER` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`subWeather`, `WEATHER`),
  CONSTRAINT `fk_subTypeWeather_WEATHER1`
    FOREIGN KEY (`WEATHER`)
    REFERENCES `lapsusVGI`.`EGEO_WEATHER` (`WEATHER`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;




-- -----------------------------------------------------
-- Table `lapsusVGI`.`EGEO_has_EGEO_subWeather`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`EGEO_has_EGEO_subWeather` (
  `EGEO_ID` INT NOT NULL,
  `subWeather` VARCHAR(10) NOT NULL,
  `WEATHER` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`EGEO_ID`, `subWeather`, `WEATHER`),
  CONSTRAINT `fk_EGEO_has_EGEO_subWeather_EGEO1`
    FOREIGN KEY (`EGEO_ID`)
    REFERENCES `lapsusVGI`.`EGEO` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_EGEO_has_EGEO_subWeather_EGEO_subWeather1`
    FOREIGN KEY (`subWeather` , `WEATHER`)
    REFERENCES `lapsusVGI`.`EGEO_subWeather` (`subWeather` , `WEATHER`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;






-- -----------------------------------------------------
-- Table `lapsusVGI`.`ETYPE_has_ETYPE_actornv3`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`ETYPE_has_ETYPE_actornv3` (
  `EVENT_ID` VARCHAR(40) NOT NULL,
  `actornv3` VARCHAR(10) NOT NULL,
  `actornv2` VARCHAR(10) NOT NULL,
  `ACTOR` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`EVENT_ID`, `actornv3`, `actornv2`, `ACTOR`),
  CONSTRAINT `fk_ETYPE_has_ETYPE_actornv3_ETYPE1`
    FOREIGN KEY (`EVENT_ID`)
    REFERENCES `lapsusVGI`.`ETYPE` (`EVENT_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ETYPE_has_ETYPE_actornv3_ETYPE_actornv31`
    FOREIGN KEY (`actornv3` , `actornv2` , `ACTOR`)
    REFERENCES `lapsusVGI`.`ETYPE_actornv3` (`actornv3` , `actornv2` , `ACTOR`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;






-- -----------------------------------------------------
-- Table `lapsusVGI`.`ETYPE_has_ETYPE_subloctype`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`ETYPE_has_ETYPE_subloctype` (
  `EVENT_ID` VARCHAR(40) NOT NULL,
  `subLoctype` VARCHAR(10) NOT NULL,
  `LOCTYPE` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`EVENT_ID`, `subLoctype`, `LOCTYPE`),
  CONSTRAINT `fk_ETYPE_has_ETYPE_subloctype_ETYPE1`
    FOREIGN KEY (`EVENT_ID`)
    REFERENCES `lapsusVGI`.`ETYPE` (`EVENT_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ETYPE_has_ETYPE_subloctype_ETYPE_subloctype1`
    FOREIGN KEY (`subLoctype` , `LOCTYPE`)
    REFERENCES `lapsusVGI`.`ETYPE_subloctype` (`subLoctype` , `LOCTYPE`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;






-- -----------------------------------------------------
-- Table `lapsusVGI`.`ETYPE_has_ETYPE_subcategory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`ETYPE_has_ETYPE_subcategory` (
  `EVENT_ID` VARCHAR(40) NOT NULL,
  `subcategory` VARCHAR(10) NOT NULL,
  `CATEGORY` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`EVENT_ID`, `subcategory`, `CATEGORY`),
  CONSTRAINT `fk_ETYPE_has_ETYPE_subcategory_ETYPE1`
    FOREIGN KEY (`EVENT_ID`)
    REFERENCES `lapsusVGI`.`ETYPE` (`EVENT_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ETYPE_has_ETYPE_subcategory_ETYPE_subcategory1`
    FOREIGN KEY (`subcategory` , `CATEGORY`)
    REFERENCES `lapsusVGI`.`ETYPE_subcategory` (`subcategory` , `CATEGORY`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;






-- -----------------------------------------------------
-- Table `lapsusVGI`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`categoria` (
  `idcategoria` INT NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(500) NULL,
  PRIMARY KEY (`idcategoria`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lapsusVGI`.`contribuicao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`contribuicao` (
  `idContribuicao` INT NOT NULL AUTO_INCREMENT,
  `ocorrencia` DATETIME NULL,
  `riscoDano` TINYINT NULL,
  `vitima` TINYINT NULL,
  `descricao` VARCHAR(500) NULL,
  `publicado` TINYINT NULL,
  `local` GEOMETRY NULL,
  `categoria` INT NOT NULL,
  `colaborador` INT NULL,
  `usuario` INT NULL,
  PRIMARY KEY (`idContribuicao`),
  CONSTRAINT `fk_contribuicao_categoria1`
    FOREIGN KEY (`categoria`)
    REFERENCES `lapsusVGI`.`categoria` (`idcategoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_contribuicao_colaborador1`
    FOREIGN KEY (`colaborador`)
    REFERENCES `lapsusVGI`.`colaborador` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_contribuicao_usuario1`
    FOREIGN KEY (`usuario`)
    REFERENCES `lapsusVGI`.`usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;








-- -----------------------------------------------------
-- Table `lapsusVGI`.`contato`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`contato` (
  `idContato` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(50) NULL,
  `assunto` VARCHAR(50) NULL,
  `email` VARCHAR(50) NULL,
  `data` DATE NULL,
  `mensagem` VARCHAR(500) NULL,
  PRIMARY KEY (`idContato`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lapsusVGI`.`shapefile`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`shapefile` (
  `idShapefile` INT NOT NULL AUTO_INCREMENT,
  `uri` VARCHAR(50) NULL,
  `data` DATE NULL,
  `idUsuario` INT NOT NULL,
  `descricao` VARCHAR(100) NULL,
  PRIMARY KEY (`idShapefile`),
  CONSTRAINT `fk_shapefiles_gestor1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `lapsusVGI`.`gestor` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;




-- -----------------------------------------------------
-- Table `lapsusVGI`.`anexo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`anexo` (
  `idanexo` INT NOT NULL AUTO_INCREMENT,
  `URI` VARCHAR(200) NULL,
  `idContribuicao` INT NOT NULL,
  PRIMARY KEY (`idanexo`),
  CONSTRAINT `fk_anexo_contribuicao1`
    FOREIGN KEY (`idContribuicao`)
    REFERENCES `lapsusVGI`.`contribuicao` (`idContribuicao`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;




-- -----------------------------------------------------
-- Table `lapsusVGI`.`anonimo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lapsusVGI`.`anonimo` (
  `idUsuario` INT NOT NULL,
  PRIMARY KEY (`idUsuario`),
  CONSTRAINT `fk_anonimo_colaborador1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `lapsusVGI`.`colaborador` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Data for table `lapsusVGI`.`usuario`
-- -----------------------------------------------------
START TRANSACTION;
USE `lapsusVGI`;
INSERT INTO `lapsusVGI`.`usuario` (`idUsuario`) VALUES (1);
INSERT INTO `lapsusVGI`.`usuario` (`idUsuario`) VALUES (2);
INSERT INTO `lapsusVGI`.`usuario` (`idUsuario`) VALUES (3);
INSERT INTO `lapsusVGI`.`usuario` (`idUsuario`) VALUES (4);

COMMIT;


-- -----------------------------------------------------
-- Data for table `lapsusVGI`.`instituicao`
-- -----------------------------------------------------
START TRANSACTION;
USE `lapsusVGI`;
INSERT INTO `lapsusVGI`.`instituicao` (`idInstituicao`, `nome`, `telefone`, `administradora`, `gestor`, `email`, `endereco`) VALUES (1, 'Administradora', 'NULL', 1, 1, 'admin@admin', '....');
INSERT INTO `lapsusVGI`.`instituicao` (`idInstituicao`, `nome`, `telefone`, `administradora`, `gestor`, `email`, `endereco`) VALUES (2, 'Defesa Cívil', '32 98655478', 0, 2, 'defesacivilvicosa@gmail.com', 'Rua Joaquim Barbosa N141 Bairro Maestro Joao Salgado');
INSERT INTO `lapsusVGI`.`instituicao` (`idInstituicao`, `nome`, `telefone`, `administradora`, `gestor`, `email`, `endereco`) VALUES (3, 'Polícia Militar', '190', 0, 3, 'policia@policiamilitarmg.com', 'alksdja slkdjas dlk asjd');

COMMIT;


-- -----------------------------------------------------
-- Data for table `lapsusVGI`.`gestor`
-- -----------------------------------------------------
START TRANSACTION;
USE `lapsusVGI`;
INSERT INTO `lapsusVGI`.`gestor` (`idUsuario`, `idInstituicao`, `Administrador`, `nome`, `login`, `email`, `senha`, `telefone`) VALUES (1, 1, 1, 'Adminitrador', 'admin', NULL, '21232f297a57a5a743894a0e4a801fc3', NULL);
INSERT INTO `lapsusVGI`.`gestor` (`idUsuario`, `idInstituicao`, `Administrador`, `nome`, `login`, `email`, `senha`, `telefone`) VALUES (2, 2, 0, 'Leandro', 'leandro', NULL, '21232f297a57a5a743894a0e4a801fc3', NULL);
INSERT INTO `lapsusVGI`.`gestor` (`idUsuario`, `idInstituicao`, `Administrador`, `nome`, `login`, `email`, `senha`, `telefone`) VALUES (3, 2, 0, 'Augusto', 'augusto', NULL, '21232f297a57a5a743894a0e4a801fc3', '3265498745');
INSERT INTO `lapsusVGI`.`anonimo` (`idUsuario`) VALUES (4);
INSERT INTO `lapsusVGI`.`colaborador` (`idUsuario`) VALUES (4);

COMMIT;


-- -----------------------------------------------------
-- Data for table `lapsusVGI`.`EVENT_SOURCE`
-- -----------------------------------------------------
START TRANSACTION;
USE `lapsusVGI`;
INSERT INTO `lapsusVGI`.`EVENT_SOURCE` (`SOURCE`, `descricao`) VALUES ('HUMOBS', 'Observação Humana');

COMMIT;


-- -----------------------------------------------------
-- Data for table `lapsusVGI`.`EVENT_SCALE`
-- -----------------------------------------------------
START TRANSACTION;
USE `lapsusVGI`;
INSERT INTO `lapsusVGI`.`EVENT_SCALE` (`SCALE`, `descricao`) VALUES (1, 'Nível 1 - O Evento É Tratado Com Recursos Implantados Na Fase de Pré-planejamento');
INSERT INTO `lapsusVGI`.`EVENT_SCALE` (`SCALE`, `descricao`) VALUES (2, 'Nível 2 - O Evento É Tratado Com Recursos Implantados Somente Pela Organização Afetada');
INSERT INTO `lapsusVGI`.`EVENT_SCALE` (`SCALE`, `descricao`) VALUES (3, 'Nível 3 - O Evento É Tratado Com Recursos Implantados Pela Organização Afetada, Porém, Com Apoio de Organizações Vizinhas Sob Acordos Normais');
INSERT INTO `lapsusVGI`.`EVENT_SCALE` (`SCALE`, `descricao`) VALUES (4, 'Nível 4 - O Evento É Tratado Com Recursos Implantados Pela Organização Afetada, Porém, Com Apoio de Organização de Qualquer Lugar do País.');
INSERT INTO `lapsusVGI`.`EVENT_SCALE` (`SCALE`, `descricao`) VALUES (5, 'Nível 5 - Este Nível de Resposta Cobre a Gestão De qualquer Auxílio Recebido Para Ajudar a Organização, Usando Protocolos das Nações Unidas, União Européia ou OTAN.');

COMMIT;


-- -----------------------------------------------------
-- Data for table `lapsusVGI`.`EVENT_STATUS`
-- -----------------------------------------------------
START TRANSACTION;
USE `lapsusVGI`;
INSERT INTO `lapsusVGI`.`EVENT_STATUS` (`STATUS`, `descricao`) VALUES ('COM', 'Evento Completo');
INSERT INTO `lapsusVGI`.`EVENT_STATUS` (`STATUS`, `descricao`) VALUES ('IPR', 'Evento Em Progresso');
INSERT INTO `lapsusVGI`.`EVENT_STATUS` (`STATUS`, `descricao`) VALUES ('NST', 'Evento Não Iniciado');
INSERT INTO `lapsusVGI`.`EVENT_STATUS` (`STATUS`, `descricao`) VALUES ('STOP', 'Evento Sob Controle, Sem Necessidade de Recursos Adicionais');

COMMIT;


-- -----------------------------------------------------
-- Data for table `lapsusVGI`.`EVENT_RISK_ASSESSMNT`
-- -----------------------------------------------------
START TRANSACTION;
USE `lapsusVGI`;
INSERT INTO `lapsusVGI`.`EVENT_RISK_ASSESSMNT` (`RISK_ASSESSMNT`, `descricao`) VALUES ('INCREA', 'Aumentando');
INSERT INTO `lapsusVGI`.`EVENT_RISK_ASSESSMNT` (`RISK_ASSESSMNT`, `descricao`) VALUES ('DECREA', 'Diminuindo');
INSERT INTO `lapsusVGI`.`EVENT_RISK_ASSESSMNT` (`RISK_ASSESSMNT`, `descricao`) VALUES ('STABLE', 'Estável');

COMMIT;


-- -----------------------------------------------------
-- Data for table `lapsusVGI`.`EVENT_CAUSE`
-- -----------------------------------------------------
START TRANSACTION;
USE `lapsusVGI`;
INSERT INTO `lapsusVGI`.`EVENT_CAUSE` (`CAUSE`, `descricao`) VALUES ('ACC', 'Acidental');
INSERT INTO `lapsusVGI`.`EVENT_CAUSE` (`CAUSE`, `descricao`) VALUES ('NAT', 'Natural');
INSERT INTO `lapsusVGI`.`EVENT_CAUSE` (`CAUSE`, `descricao`) VALUES ('DEL', 'DELIBERATE???');

COMMIT;


-- -----------------------------------------------------
-- Data for table `lapsusVGI`.`CONTEXT_SECLASS`
-- -----------------------------------------------------
START TRANSACTION;
USE `lapsusVGI`;
INSERT INTO `lapsusVGI`.`CONTEXT_SECLASS` (`SECLASS`, `descricao`) VALUES ('UNCLAS', 'Não Classificado');

COMMIT;


-- -----------------------------------------------------
-- Data for table `lapsusVGI`.`CONTEXT_MODE`
-- -----------------------------------------------------
START TRANSACTION;
USE `lapsusVGI`;
INSERT INTO `lapsusVGI`.`CONTEXT_MODE` (`MODE`, `descricao`) VALUES ('ACTUAL', 'Indica Que a Mensagem EMSI Está Relacionada A Um Evento Real');

COMMIT;


-- -----------------------------------------------------
-- Data for table `lapsusVGI`.`CONTEXT_MSGTYPE`
-- -----------------------------------------------------
START TRANSACTION;
USE `lapsusVGI`;
INSERT INTO `lapsusVGI`.`CONTEXT_MSGTYPE` (`MSGTYPE`, `descricao`) VALUES ('ALERT', 'Informação Inicial Apenas Requer Atenção Pelos Destinatários Direcionados');

COMMIT;


-- -----------------------------------------------------
-- Data for table `lapsusVGI`.`CONTEXT_LEVEL`
-- -----------------------------------------------------
START TRANSACTION;
USE `lapsusVGI`;
INSERT INTO `lapsusVGI`.`CONTEXT_LEVEL` (`LEVEL`, `descricao`) VALUES ('STRTGC', 'Estratégico');

COMMIT;


-- -----------------------------------------------------
-- Data for table `lapsusVGI`.`CASUALTIES_CONTEXT`
-- -----------------------------------------------------
START TRANSACTION;
USE `lapsusVGI`;
INSERT INTO `lapsusVGI`.`CASUALTIES_CONTEXT` (`CONTEXT`, `descricao`) VALUES ('REQ_ACTION', 'Ação Requerida');
INSERT INTO `lapsusVGI`.`CASUALTIES_CONTEXT` (`CONTEXT`, `descricao`) VALUES ('ALR_TREATED', 'Já tratada');
INSERT INTO `lapsusVGI`.`CASUALTIES_CONTEXT` (`CONTEXT`, `descricao`) VALUES ('PRED_URGENT', 'Precisto Com Urgência');
INSERT INTO `lapsusVGI`.`CASUALTIES_CONTEXT` (`CONTEXT`, `descricao`) VALUES ('PRED_MEDIUM', 'Previsto Com Médio Prazo');
INSERT INTO `lapsusVGI`.`CASUALTIES_CONTEXT` (`CONTEXT`, `descricao`) VALUES ('INITIAL_STAT', 'Declaração Não Confirmada');
INSERT INTO `lapsusVGI`.`CASUALTIES_CONTEXT` (`CONTEXT`, `descricao`) VALUES ('PRELIM_STAT', 'Avaliação Preliminar');

COMMIT;


-- -----------------------------------------------------
-- Data for table `lapsusVGI`.`EXTERNAL_INFO_TYPE`
-- -----------------------------------------------------
START TRANSACTION;
USE `lapsusVGI`;
INSERT INTO `lapsusVGI`.`EXTERNAL_INFO_TYPE` (`TYPE`, `descricao`) VALUES ('MANUAL', 'A URI Fornece Um Link Para Um Arquivo Em Um dos Formatos: PDF, Open Document ou RTF.');
INSERT INTO `lapsusVGI`.`EXTERNAL_INFO_TYPE` (`TYPE`, `descricao`) VALUES ('MAP', 'A URI Fornece Um Link Para Um Arquivo Que Contem Um Mapa Em Um dos Formatos: JPEG, PNG, PDF, TIFF ou GEOTIFF.');
INSERT INTO `lapsusVGI`.`EXTERNAL_INFO_TYPE` (`TYPE`, `descricao`) VALUES ('OTHER', 'A URI Fornece Um Link Para Um Tipo De Arquivo Não Padronizado, exemplo: DOCX.');
INSERT INTO `lapsusVGI`.`EXTERNAL_INFO_TYPE` (`TYPE`, `descricao`) VALUES ('PHOTO', 'A URI Fornece Um Link Para Um Arquivo Que Contém Uma Foto Em Um Dos Formatos: JPEG, PNG, PDF ou TIFF.');
INSERT INTO `lapsusVGI`.`EXTERNAL_INFO_TYPE` (`TYPE`, `descricao`) VALUES ('WEBSIT', 'A URI Fornece Um Link Para Uma Página da Web.');

COMMIT;


-- -----------------------------------------------------
-- Data for table `lapsusVGI`.`EGEO_STATUS`
-- -----------------------------------------------------
START TRANSACTION;
USE `lapsusVGI`;
INSERT INTO `lapsusVGI`.`EGEO_STATUS` (`STATUS`, `descricao`) VALUES ('COM', 'Evento Completo');
INSERT INTO `lapsusVGI`.`EGEO_STATUS` (`STATUS`, `descricao`) VALUES ('IPR', 'Evento Em Progresso');
INSERT INTO `lapsusVGI`.`EGEO_STATUS` (`STATUS`, `descricao`) VALUES ('NST', 'Evento Não Iniciado');
INSERT INTO `lapsusVGI`.`EGEO_STATUS` (`STATUS`, `descricao`) VALUES ('STOP', 'Evento Sob Controle, Sem Necessidade de Recursos Adicionais');

COMMIT;


-- -----------------------------------------------------
-- Data for table `lapsusVGI`.`EGEO_TYPE`
-- -----------------------------------------------------
START TRANSACTION;
USE `lapsusVGI`;
INSERT INTO `lapsusVGI`.`EGEO_TYPE` (`TYPE`, `descricao`) VALUES ('AIR', 'Área Aerea');
INSERT INTO `lapsusVGI`.`EGEO_TYPE` (`TYPE`, `descricao`) VALUES ('CMB', 'Área Relacionada a Combate');
INSERT INTO `lapsusVGI`.`EGEO_TYPE` (`TYPE`, `descricao`) VALUES ('DGR', 'Área Perigosa/Poluída');
INSERT INTO `lapsusVGI`.`EGEO_TYPE` (`TYPE`, `descricao`) VALUES ('FLAME', 'Área em Combustão');
INSERT INTO `lapsusVGI`.`EGEO_TYPE` (`TYPE`, `descricao`) VALUES ('GEN', 'Área de Propósito Geral');
INSERT INTO `lapsusVGI`.`EGEO_TYPE` (`TYPE`, `descricao`) VALUES ('PLUME', 'Pluma');
INSERT INTO `lapsusVGI`.`EGEO_TYPE` (`TYPE`, `descricao`) VALUES ('SMOKE', 'Fumaça');
INSERT INTO `lapsusVGI`.`EGEO_TYPE` (`TYPE`, `descricao`) VALUES ('VULN', 'Área Vulnerável');

COMMIT;


-- -----------------------------------------------------
-- Data for table `lapsusVGI`.`EGEO_subtype`
-- -----------------------------------------------------
START TRANSACTION;
USE `lapsusVGI`;
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('COR', 'Corredor Aéreo', 'AIR');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('FLDZ', 'Zona de Aerodromo', 'AIR');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('LZ', 'Zona de Pouso', 'AIR');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('NOFLZN', 'Proibido Voar', 'AIR');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('PZ', 'Zona de Recebimento', 'AIR');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('UAVASP', 'Espaço Aéreo de Veículos Aéreos Não Tripulados', 'AIR');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('CZ', 'Zona de Combate', 'CMB');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('DNGR', 'Zona de Perigo', 'CMB');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('EXTZN', 'Zona de Extração', 'CMB');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('IMPTPT', 'Ponto de Impacto', 'CMB');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('BIO', 'Área Biológica Contaminada', 'DGR');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('BOMB', 'Área de Bomba', 'DGR');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('CBRNHZ', 'Perigo, Área de CBRN', 'DGR');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('CBRNRSD', 'Detecção ou amostra de CBRN coletada', 'DGR');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('CHM', 'Área Contaminada Quimicamente', 'DGR');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('HZD', 'Área de Risco', 'DGR');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('MIND', 'Área Minerada', 'DGR');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('NGA', 'Área Não Trafegável', 'DGR');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('NGACIV', 'Área Não Trafegável Para Civís', 'DGR');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('NUKCNL', 'Taxa de Dose Nuclear Linha de Contorno ???', 'DGR');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('OBSGEN', 'Obstáculo em Geral', 'DGR');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('PRHBAR', 'Área Proibida', 'DGR');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('RAD', 'Área Radioativa', 'DGR');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('RADCLD', 'Contorno Determinado Por Radar de Nuvem Radioativa ???', 'DGR');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('RSTR', 'Área Proibida', 'DGR');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('SGA', 'Área Com Dificuldade de Tráfego', 'DGR');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('SITKIL', 'Área Com Suposta Morte', 'DGR');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('UNXOD', 'Área a ser Explodida', 'DGR');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('AOR', 'Área de Responsabilidade', 'GEN');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('ASYGEN', 'Área de Montagem, Geral ???', 'GEN');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('ASYSPL', 'Área de Montagem, Fornecimento ???', 'GEN');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('BDYOR', 'Área de Organizações', 'GEN');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('BDYPOA', 'Área Administrativa Política', 'GEN');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('BDYPT', 'Limite Em Ponto ???', 'GEN');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('CKPGEN', 'Checkpoint ???', 'GEN');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('CNTPTL', 'Ponto de Contato (Local de Fácil Identificação)', 'GEN');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('COLDZ', 'Área Gelada', 'GEN');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('COMCKP', 'Checkpoint de Comunicação', 'GEN');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('COMLOW', 'Locais Com Produção em Excesso de Agentes Químicos ???', 'GEN');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('COMMZ', 'Zona de Comunicação', 'GEN');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('COMUP', 'Locais Com Produção em Excesso de Agentes Químicos ???', 'GEN');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('CONTAR', 'Área de Controle', 'GEN');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('CORDON', 'Perímetro de Uma Área ou Setor de Resgate', 'GEN');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('CRDPNT', 'Ponto de Cordenação', 'GEN');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('DIVRT', 'Rotas Para Evitar Áreas Problemáticas', 'GEN');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('DROPPT', 'Drop Point', 'GEN');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('ENTPT', 'Ponto de Entrada', 'GEN');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('EVENT', 'Área de Evento', 'GEN');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('EXITPT', 'Ponto de Saída ', 'GEN');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('FWCTPT', 'Forward Control Point', 'GEN');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('HOTZ', 'Hot Zone', 'GEN');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('INCGRD', 'Localização do Incidente', 'GEN');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('LA', 'Área de Pouso', 'GEN');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('LIMARE', 'Área Com Acesso Limitado', 'GEN');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('LOCAT', 'Localização do Incidente', 'GEN');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('MSR', 'Rota de Fornecimento Principal', 'GEN');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('PSSGPT', 'Ponto de Passagem', 'GEN');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('PTINT', 'Ponto de Interesse', 'GEN');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('RCNSAR', 'Reconhecimento da Área', 'GEN');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('RNDZPT', 'Local Estabelecido Para Pre Planejamento Durante a Emergência', 'GEN');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('ROUTE', 'Rota', 'GEN');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('SAFERT', 'Rota Segura', 'GEN');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('SAFZ', 'Zona de Segurança', 'GEN');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('SARPNT', 'Ponto de Busca e Resgate', 'GEN');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('SEARAR', 'Área de Procura', 'GEN');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('SPRISK', 'Área de Risco Especial', 'GEN');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('STRTPT', 'Ponto de Início de Rota de Veículos', 'GEN');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('SUPARE', 'Área de Fornecimento', 'GEN');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('SUPPT', 'Ponto de Fornecimento', 'GEN');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('TRSTRT', 'Rota Temporária', 'GEN');
INSERT INTO `lapsusVGI`.`EGEO_subtype` (`subtype`, `descricao`, `TYPE`) VALUES ('WARMZ', 'Área de Descontaminação', 'GEN');

COMMIT;


-- -----------------------------------------------------
-- Data for table `lapsusVGI`.`ETYPE_ENV`
-- -----------------------------------------------------
START TRANSACTION;
USE `lapsusVGI`;
INSERT INTO `lapsusVGI`.`ETYPE_ENV` (`ENV`, `descricao`) VALUES ('DIS', 'Natural/Feito Pelo Homem');

COMMIT;


-- -----------------------------------------------------
-- Data for table `lapsusVGI`.`subEnv`
-- -----------------------------------------------------
START TRANSACTION;
USE `lapsusVGI`;
INSERT INTO `lapsusVGI`.`subEnv` (`subEnv`, `descricao`, `ENV`) VALUES ('LNDSLD', 'Deslizamento de Terra', 'DIS');

COMMIT;


-- -----------------------------------------------------
-- Data for table `lapsusVGI`.`EGEO_WEATHER`
-- -----------------------------------------------------
START TRANSACTION;
USE `lapsusVGI`;
INSERT INTO `lapsusVGI`.`EGEO_WEATHER` (`WEATHER`, `descricao`) VALUES ('HUM', 'Condições Húmidas');
INSERT INTO `lapsusVGI`.`EGEO_WEATHER` (`WEATHER`, `descricao`) VALUES ('ICY', 'Condições Gélidas');
INSERT INTO `lapsusVGI`.`EGEO_WEATHER` (`WEATHER`, `descricao`) VALUES ('TDS', 'Condições Tempestivas');
INSERT INTO `lapsusVGI`.`EGEO_WEATHER` (`WEATHER`, `descricao`) VALUES ('TMPsxx', 'Temperatura?');
INSERT INTO `lapsusVGI`.`EGEO_WEATHER` (`WEATHER`, `descricao`) VALUES ('VIS', 'Condições de Visibilidade');
INSERT INTO `lapsusVGI`.`EGEO_WEATHER` (`WEATHER`, `descricao`) VALUES ('Wddsss', 'Direção do Vento e Velocidade');
INSERT INTO `lapsusVGI`.`EGEO_WEATHER` (`WEATHER`, `descricao`) VALUES ('WIN', 'Condições de Ventania');

COMMIT;


-- -----------------------------------------------------
-- Data for table `lapsusVGI`.`ETYPE_CATEGORY`
-- -----------------------------------------------------
START TRANSACTION;
USE `lapsusVGI`;
INSERT INTO `lapsusVGI`.`ETYPE_CATEGORY` (`CATEGORY`, `descricao`) VALUES ('GND', 'Evento Terrestre');

COMMIT;


-- -----------------------------------------------------
-- Data for table `lapsusVGI`.`ETYPE_subcategory`
-- -----------------------------------------------------
START TRANSACTION;
USE `lapsusVGI`;
INSERT INTO `lapsusVGI`.`ETYPE_subcategory` (`subcategory`, `descricao`, `CATEGORY`) VALUES ('LDS', 'Deslizamento de Terra', 'GND');

COMMIT;


-- -----------------------------------------------------
-- Data for table `lapsusVGI`.`ETYPE_LOCTYPE`
-- -----------------------------------------------------
START TRANSACTION;
USE `lapsusVGI`;
INSERT INTO `lapsusVGI`.`ETYPE_LOCTYPE` (`LOCTYPE`, `descricao`) VALUES ('COAST', 'Áreas Costal');
INSERT INTO `lapsusVGI`.`ETYPE_LOCTYPE` (`LOCTYPE`, `descricao`) VALUES ('INW', 'Corpo de Água');
INSERT INTO `lapsusVGI`.`ETYPE_LOCTYPE` (`LOCTYPE`, `descricao`) VALUES ('NAT', 'Ambiente Natural/Rural');
INSERT INTO `lapsusVGI`.`ETYPE_LOCTYPE` (`LOCTYPE`, `descricao`) VALUES ('OSEA', 'Mar Aberto');
INSERT INTO `lapsusVGI`.`ETYPE_LOCTYPE` (`LOCTYPE`, `descricao`) VALUES ('OTH', 'Outro');
INSERT INTO `lapsusVGI`.`ETYPE_LOCTYPE` (`LOCTYPE`, `descricao`) VALUES ('PRIVAT', 'Privado');
INSERT INTO `lapsusVGI`.`ETYPE_LOCTYPE` (`LOCTYPE`, `descricao`) VALUES ('RAIL', 'Trilhos Ferroviários');
INSERT INTO `lapsusVGI`.`ETYPE_LOCTYPE` (`LOCTYPE`, `descricao`) VALUES ('ROAD', 'Estradas');
INSERT INTO `lapsusVGI`.`ETYPE_LOCTYPE` (`LOCTYPE`, `descricao`) VALUES ('UDGN', 'Local Subterrâneo');
INSERT INTO `lapsusVGI`.`ETYPE_LOCTYPE` (`LOCTYPE`, `descricao`) VALUES ('URB', 'Área urbana');

COMMIT;


-- -----------------------------------------------------
-- Data for table `lapsusVGI`.`ETYPE_subloctype`
-- -----------------------------------------------------
START TRANSACTION;
USE `lapsusVGI`;
INSERT INTO `lapsusVGI`.`ETYPE_subloctype` (`subLoctype`, `descricao`, `LOCTYPE`) VALUES ('BNK', 'Área entre água e terra', 'COAST');
INSERT INTO `lapsusVGI`.`ETYPE_subloctype` (`subLoctype`, `descricao`, `LOCTYPE`) VALUES ('CLF', 'Penhasco', 'COAST');
INSERT INTO `lapsusVGI`.`ETYPE_subloctype` (`subLoctype`, `descricao`, `LOCTYPE`) VALUES ('CSTW', 'Água próximo a costa', 'COAST');
INSERT INTO `lapsusVGI`.`ETYPE_subloctype` (`subLoctype`, `descricao`, `LOCTYPE`) VALUES ('EST', 'Estuário', 'COAST');
INSERT INTO `lapsusVGI`.`ETYPE_subloctype` (`subLoctype`, `descricao`, `LOCTYPE`) VALUES ('FEN', 'FEN????', 'COAST');
INSERT INTO `lapsusVGI`.`ETYPE_subloctype` (`subLoctype`, `descricao`, `LOCTYPE`) VALUES ('BOG', 'Pântano', 'INW');
INSERT INTO `lapsusVGI`.`ETYPE_subloctype` (`subLoctype`, `descricao`, `LOCTYPE`) VALUES ('CAN', 'Canal de Água', 'INW');
INSERT INTO `lapsusVGI`.`ETYPE_subloctype` (`subLoctype`, `descricao`, `LOCTYPE`) VALUES ('ICELK', 'Lago Congelado', 'INW');
INSERT INTO `lapsusVGI`.`ETYPE_subloctype` (`subLoctype`, `descricao`, `LOCTYPE`) VALUES ('LKE', 'Lago', 'INW');
INSERT INTO `lapsusVGI`.`ETYPE_subloctype` (`subLoctype`, `descricao`, `LOCTYPE`) VALUES ('RIV', 'Rio', 'INW');
INSERT INTO `lapsusVGI`.`ETYPE_subloctype` (`subLoctype`, `descricao`, `LOCTYPE`) VALUES ('CRP', 'Colheita', 'NAT');
INSERT INTO `lapsusVGI`.`ETYPE_subloctype` (`subLoctype`, `descricao`, `LOCTYPE`) VALUES ('GRS', 'Pastagem', 'NAT');
INSERT INTO `lapsusVGI`.`ETYPE_subloctype` (`subLoctype`, `descricao`, `LOCTYPE`) VALUES ('HFR', 'Floresta Alta, Com Árvores Acima de 20 metros', 'NAT');
INSERT INTO `lapsusVGI`.`ETYPE_subloctype` (`subLoctype`, `descricao`, `LOCTYPE`) VALUES ('HLS', 'Áreas Montanhosas Com Acesso Rodoviário Limitado ??????', 'NAT');
INSERT INTO `lapsusVGI`.`ETYPE_subloctype` (`subLoctype`, `descricao`, `LOCTYPE`) VALUES ('HMT', 'Montanha acima da área acessível por veículo', 'NAT');
INSERT INTO `lapsusVGI`.`ETYPE_subloctype` (`subLoctype`, `descricao`, `LOCTYPE`) VALUES ('LMT', 'Áreas Montanhosas Com Acesso Rodoviário Limitado ?????', 'NAT');
INSERT INTO `lapsusVGI`.`ETYPE_subloctype` (`subLoctype`, `descricao`, `LOCTYPE`) VALUES ('SSSI', 'Locais de Interesse Científico', 'NAT');
INSERT INTO `lapsusVGI`.`ETYPE_subloctype` (`subLoctype`, `descricao`, `LOCTYPE`) VALUES ('OFF', 'Plataforma Marítma', 'OSEA');
INSERT INTO `lapsusVGI`.`ETYPE_subloctype` (`subLoctype`, `descricao`, `LOCTYPE`) VALUES ('CUT', '????', 'OTH');
INSERT INTO `lapsusVGI`.`ETYPE_subloctype` (`subLoctype`, `descricao`, `LOCTYPE`) VALUES ('ELV', '????', 'OTH');
INSERT INTO `lapsusVGI`.`ETYPE_subloctype` (`subLoctype`, `descricao`, `LOCTYPE`) VALUES ('EMB', '????', 'OTH');
INSERT INTO `lapsusVGI`.`ETYPE_subloctype` (`subLoctype`, `descricao`, `LOCTYPE`) VALUES ('LFR', '????', 'OTH');
INSERT INTO `lapsusVGI`.`ETYPE_subloctype` (`subLoctype`, `descricao`, `LOCTYPE`) VALUES ('SRB', '????', 'OTH');
INSERT INTO `lapsusVGI`.`ETYPE_subloctype` (`subLoctype`, `descricao`, `LOCTYPE`) VALUES ('OWNRSC', 'Local Com Time de Resgate Próprio', 'PRIVAT');
INSERT INTO `lapsusVGI`.`ETYPE_subloctype` (`subLoctype`, `descricao`, `LOCTYPE`) VALUES ('TRK', 'Ferrovia', 'RAIL');
INSERT INTO `lapsusVGI`.`ETYPE_subloctype` (`subLoctype`, `descricao`, `LOCTYPE`) VALUES ('1RD', 'Estrada de Mão Única', 'ROAD');
INSERT INTO `lapsusVGI`.`ETYPE_subloctype` (`subLoctype`, `descricao`, `LOCTYPE`) VALUES ('DCA', 'Estrada de Mão Dupla', 'ROAD');
INSERT INTO `lapsusVGI`.`ETYPE_subloctype` (`subLoctype`, `descricao`, `LOCTYPE`) VALUES ('NOR', 'Área Sem Estrada, Porém, Acessível Por Veículos', 'ROAD');
INSERT INTO `lapsusVGI`.`ETYPE_subloctype` (`subLoctype`, `descricao`, `LOCTYPE`) VALUES ('PTH', 'Trilha', 'ROAD');
INSERT INTO `lapsusVGI`.`ETYPE_subloctype` (`subLoctype`, `descricao`, `LOCTYPE`) VALUES ('RRD', 'Rua Com Restrições (Peso, Altura)', 'ROAD');
INSERT INTO `lapsusVGI`.`ETYPE_subloctype` (`subLoctype`, `descricao`, `LOCTYPE`) VALUES ('SRD', 'Via Lateral', 'ROAD');
INSERT INTO `lapsusVGI`.`ETYPE_subloctype` (`subLoctype`, `descricao`, `LOCTYPE`) VALUES ('TRK', 'Pista', 'ROAD');
INSERT INTO `lapsusVGI`.`ETYPE_subloctype` (`subLoctype`, `descricao`, `LOCTYPE`) VALUES ('MIN', 'Mina', 'UDGN');
INSERT INTO `lapsusVGI`.`ETYPE_subloctype` (`subLoctype`, `descricao`, `LOCTYPE`) VALUES ('TUN', 'Túnel', 'UDGN');
INSERT INTO `lapsusVGI`.`ETYPE_subloctype` (`subLoctype`, `descricao`, `LOCTYPE`) VALUES ('UND', 'Construção Subterrânea', 'UDGN');
INSERT INTO `lapsusVGI`.`ETYPE_subloctype` (`subLoctype`, `descricao`, `LOCTYPE`) VALUES ('ASR', '????', 'URB');
INSERT INTO `lapsusVGI`.`ETYPE_subloctype` (`subLoctype`, `descricao`, `LOCTYPE`) VALUES ('HOSP', 'Hospital', 'URB');
INSERT INTO `lapsusVGI`.`ETYPE_subloctype` (`subLoctype`, `descricao`, `LOCTYPE`) VALUES ('IND', 'Área Industrial', 'URB');
INSERT INTO `lapsusVGI`.`ETYPE_subloctype` (`subLoctype`, `descricao`, `LOCTYPE`) VALUES ('MALL', 'Shopping', 'URB');
INSERT INTO `lapsusVGI`.`ETYPE_subloctype` (`subLoctype`, `descricao`, `LOCTYPE`) VALUES ('OFF', '????', 'URB');
INSERT INTO `lapsusVGI`.`ETYPE_subloctype` (`subLoctype`, `descricao`, `LOCTYPE`) VALUES ('PRK', '???', 'URB');
INSERT INTO `lapsusVGI`.`ETYPE_subloctype` (`subLoctype`, `descricao`, `LOCTYPE`) VALUES ('RES', 'Área Residencial', 'URB');
INSERT INTO `lapsusVGI`.`ETYPE_subloctype` (`subLoctype`, `descricao`, `LOCTYPE`) VALUES ('STRT', 'Área Pública', 'URB');

COMMIT;


-- -----------------------------------------------------
-- Data for table `lapsusVGI`.`ETYPE_ACTOR`
-- -----------------------------------------------------
START TRANSACTION;
USE `lapsusVGI`;
INSERT INTO `lapsusVGI`.`ETYPE_ACTOR` (`ACTOR`, `descricao`) VALUES ('ANI', 'Animais');
INSERT INTO `lapsusVGI`.`ETYPE_ACTOR` (`ACTOR`, `descricao`) VALUES ('BEV', 'Ambiente Construído');
INSERT INTO `lapsusVGI`.`ETYPE_ACTOR` (`ACTOR`, `descricao`) VALUES ('PPL', 'Pessoas');
INSERT INTO `lapsusVGI`.`ETYPE_ACTOR` (`ACTOR`, `descricao`) VALUES ('VEH', 'Veículos');

COMMIT;


-- -----------------------------------------------------
-- Data for table `lapsusVGI`.`ETYPE_actornv2`
-- -----------------------------------------------------
START TRANSACTION;
USE `lapsusVGI`;
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('CON', 'Animal Contaminado', 'ANI');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('DEA', 'Animal Morto', 'ANI');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('DGR', 'Animal Potencialmente Perigoso', 'ANI');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('FRM', 'Animal de Fazenda', 'ANI');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('HRD', 'Grande Grupo de Animais', 'ANI');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('INJ', 'Animal Machucado', 'ANI');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('LIV', 'Animal Vivo', 'ANI');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('PET', 'Animal Doméstico', 'ANI');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('PRO', 'Animal de Espécie Protegida', 'ANI');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('SPC', 'Animal Com Expertise Necessária Para Lidar', 'ANI');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('WLD', 'Animal Selvagem', 'ANI');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('ASR', 'Ambiente para Montagem e Recreação', 'BEV');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('IND', 'Ambiente Industrial', 'BEV');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('NRES', 'Depósitos e Ambientes Não Residenciais', 'BEV');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('OFF', 'Escritório', 'BEV');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('OTH', 'Outros', 'BEV');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('RESDW', 'Residências Habitacionais ???', 'BEV');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('RESIN', 'Instituições Residênciais ???', 'BEV');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('RESINT', 'Residencial Institucional ???', 'BEV');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('RESOTH', 'Outras Residências', 'BEV');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('SHP', 'Shoppings e Comércios', 'BEV');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('1', 'Pessoa', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('ADU', 'Pessoa Adulta', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('CHD', 'Criança', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('CNT', 'Pessoa Contaminada', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('CWD', 'Grupo de Pessoas Atuando Em Conjunto', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('DED', 'Pessoa Morta', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('EVC', 'Pessoa Evacuada', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('GND', 'Gender ???', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('GRP', 'Grupo de Pessoas', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('HST', 'Protestantes', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('INT', 'Pessoas Intoxicadas', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('OTH', 'Outros', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('PRS', 'Prisioneiros', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('SNS', 'Pessoas Sensíveis Culturalmente ou Politicamente', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('VIO', 'Pessoa Com Comportamento Violento', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('VLN', 'Pessoa Vulnerável', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('WTN', 'Testemunha', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('AIR', 'Veículo Aéreo', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('ANI', 'Veículo Animal', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('BIC', 'Bicicleta', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('CAR', 'Carro', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('EMG', 'Veículo de Emergência', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('MBK', 'Motocicleta', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('MIL', 'Militar', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('OTH', 'Outros', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('TRK', 'Caminhão', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('TRN', 'Trem', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv2` (`actornv2`, `descricao`, `ACTOR`) VALUES ('VES', 'Embarcação', 'VEH');

COMMIT;


-- -----------------------------------------------------
-- Data for table `lapsusVGI`.`ETYPE_actornv3`
-- -----------------------------------------------------
START TRANSACTION;
USE `lapsusVGI`;
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('CIN', 'Cinema', 'ASR', 'BEV');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('CMP', 'Camping', 'ASR', 'BEV');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('EDU', 'Local Educacional', 'ASR', 'BEV');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('GAM', 'Jogos', 'ASR', 'BEV');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('STD', 'Área de Esporte/Estádio', 'ASR', 'BEV');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('SWM', 'Piscina', 'ASR', 'BEV');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('THE', 'Teatro', 'ASR', 'BEV');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('APT', 'Aeroporto', 'IND', 'BEV');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('FRM', 'Fazenda', 'IND', 'BEV');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('HRB', 'Porto', 'IND', 'BEV');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('MIN', 'Mina', 'IND', 'BEV');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('NUK', 'Instalação Nuclear', 'IND', 'BEV');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('QUR', 'Pedreira', 'IND', 'BEV');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('SEP', 'Plataforma Marítma', 'IND', 'BEV');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('TRN', 'Estação de Trem', 'IND', 'BEV');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('WRH', 'Armazem', 'IND', 'BEV');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('XPL', 'Depósito Explosivo/Inflamável', 'NRES', 'BEV');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('GOV', 'Prédio Governamental', 'OFF', 'BEV');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('WRK', 'Local de Trabalho/Fábrica', 'OFF', 'BEV');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('ACC', 'Propriedade Com Acesso Controlado', 'OTH', 'BEV');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('BDG', 'Ponte', 'OTH', 'BEV');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('SUB', 'Subúrbio', 'OTH', 'BEV');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('TUN', 'Túnel', 'OTH', 'BEV');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('URB', 'Urbana', 'OTH', 'BEV');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('VIL', 'Vila', 'OTH', 'BEV');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('MAL', 'Shopping Comercial', 'SHP', 'BEV');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('BAB', 'Bebê (Até 12 Meses)', 'CHD', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('CHILD', 'Criança (Entre 3 a 10 Anos)', 'CHD', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('INF', 'Infantil (Entre 1 a 3 Anos)', 'CHD', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('YOUTH', 'Jovem (13 a Idade Adulta)', 'CHD', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('FML', 'Feminino', 'GND', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('MAL', 'Masculino', 'GND', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('UND', 'Indeterminado Visualmente', 'GND', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('PCF', 'Protesto Pacífico Com Possibilidade de Agressão', 'HST', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('SUI', 'Pessoa Tentando Cometer Suicídio', 'HST', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('THT', 'Protestante Desarmado Agindo de Maneira Ameaçadora', 'HST', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('WPN', 'Protestante Armado Agindo de Maneira Ameaçadora', 'HST', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('CST', 'Prisioneiro Em Custódia', 'PRS', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('ESC', 'Prisioneiro Fugitivo', 'PRS', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('HGS', 'Prisioneiro Com Grande Risco a Segurança', 'PRS', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('ETH', 'Sensitividade Etnica', 'SNS', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('FOR', 'Nacionalidade', 'SNS', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('LAN', 'Linguagem Preferida', 'SNS', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('REL', 'Sensitividade Religiosa', 'SNS', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('VIP', 'Realeza, Chefe De Estado', 'SNS', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('BLD', 'Pessoa Cega', 'VLN', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('DEF', 'Pessa Surda', 'VLN', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('DSB', 'Pessoa Desabilitada Fisicamente', 'VLN', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('ELD', 'Pessoa Idosa (Mais Que 65 Anos)', 'VLN', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('INJ', 'Pessoa Ferida', 'VLN', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('LDF', 'Pessoa Com Dificuldade de Aprendizado', 'VLN', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('OBS', 'Obesa', 'VLN', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('PAT', 'Paciente Médico', 'VLN', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('PGN', 'Mulher Grávida', 'VLN', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('SLFPRS', 'Sel-Presenters', 'VLN', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('UNC', 'Pessoa Inconcciente', 'VLN', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('ARM', 'Aeronave Com Militar Armado', 'AIR', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('FLBA', 'Balão Flutuante', 'AIR', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('FRG', 'Aeronave Freteira', 'AIR', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('FXBA', 'Balão Fixado', 'AIR', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('GLD', 'Planador', 'AIR', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('HEL', 'Helicoptero', 'AIR', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('HVY', 'Aeronava Capaz de Suportar Cargas Pesada', 'AIR', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('JET', 'Veículo com motor Jet', 'AIR', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('LGT', 'Aeronave Leve', 'AIR', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('MIL', 'Aeronave Militar', 'AIR', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('ORD', 'Munição', 'AIR', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('OTH', 'Outro', 'AIR', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('PAS', 'Aeronave Com Passageiros', 'AIR', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('PRBA', 'Balão Com Motor', 'AIR', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('PST', 'Fonte de Energia Por Pistão', 'AIR', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('RKT', 'Fonte de Energia Por Foguete', 'AIR', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('SEA', 'Aeronave Capaz De Pousar Na Água', 'AIR', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('SNO', 'Aeronave Capaz De Pousar Na Neve', 'AIR', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('TNK', 'Aeronava Capaz De Transportar Combustível', 'AIR', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('UAV', 'Veículo Aéreo Desarmado', 'AIR', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('ULG', 'Aeronave Ultraleve', 'AIR', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('HILL', 'Veículos Para Colinas', 'OTH', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('SNO', 'Veículos Para Neve', 'OTH', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('ART', 'Caminhão Articulado', 'TRK', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('EXC', 'Carga Expecional', 'TRK', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('HZD', 'Tanque De Caminhão Com Carga Perigosa', 'TRK', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('NHZ', 'Tanque De Caminhão Com Carga Não Perigosa', 'TRK', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('NUK', 'Carga Nuclear', 'TRK', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('REF', 'Caminhão Refrigerado', 'TRK', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('UND', 'Caminhão Com Carga Não Identificada', 'TRK', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('3RL', 'Eletricity 3rd rail', 'TRN', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('DSL', 'Trem Movido a Diesel', 'TRN', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('HZD', 'Trem Com Carga Perigosa', 'TRN', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('LOC', 'Trem Do Tipo Locomotiva', 'TRN', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('NHZ', 'Trem Com Carga Não Perigosa', 'TRN', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('NUK', 'Trem Com Carga Nuclear', 'TRN', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('OVH', 'Trem Movido a Sobrecarga De Energia', 'TRN', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('PAS', 'Trem Com Passageiros', 'TRN', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('REF', 'Trem Com Carga Refrigerada', 'TRN', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('STM', 'Trem Movido a Vapor', 'TRN', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('TRM', 'Trams and light railways???', 'TRN', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('UDG', 'Trem Subterrâneo', 'TRN', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('UND', 'Trem Com Carga Não Determinada', 'TRN', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('VIP', 'Trem Com VIP???', 'TRN', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('VLT', 'Trem Longo', 'TRN', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('AMB', 'Ambulância', 'VES', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('BOT', 'Barco', 'VES', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('CNO', 'Canoa ou Kayak', 'VES', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('CRG', 'Cargo???', 'VES', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('DSL', 'Movido a Diesel', 'VES', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('FLO', 'Embarcação Flutuando', 'VES', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('FRY', 'Balsa', 'VES', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('HOV', 'Aerodeslizador', 'VES', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('HZD', 'Transportando Carga Perigosa', 'VES', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('JSK', 'Jet Ski', 'VES', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('LEI', 'Lazer???', 'VES', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('LIS', 'Inclinado Para Um Lado', 'VES', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('MIL', 'Militar', 'VES', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('MPW', 'Movido Por Força Humana', 'VES', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('NHZ', 'Transportando Carga Não Perigosa', 'VES', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('NUK', 'Movido a Reator Nuclear', 'VES', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('PAS', 'Transportando Passageiros', 'VES', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('POL', 'Usado Pela Polícia', 'VES', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('PTL', 'Movido Por Petróleo', 'VES', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('RSC', 'Usado Para Resgado', 'VES', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('SAI', 'Movido Pelo Vento', 'VES', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('SMB', 'Submarindo', 'VES', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('SINK', 'Embarcação Afundando', 'VES', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('SPC', 'Navio Prisional', 'VES', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('STE', 'Movido a Vapor', 'VES', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('SUNK', 'Embarcação Afundada', 'VES', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('UNM', 'Controlado Remotamente', 'VES', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('999', '...', 'CON', 'ANI');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('999', '...', 'DEA', 'ANI');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('999', '...', 'DGR', 'ANI');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('999', '...', 'FRM', 'ANI');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('999', '...', 'HRD', 'ANI');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('999', '...', 'INJ', 'ANI');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('999', '...', 'LIV', 'ANI');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('999', '...', 'PET', 'ANI');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('999', '...', 'PRO', 'ANI');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('999', '...', 'SPC', 'ANI');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('999', '...', 'WLD', 'ANI');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('999', '...', 'RESDW', 'BEV');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('999', '...', 'RESIN', 'BEV');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('999', '...', 'RESINT', 'BEV');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('999', '...', '1', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('999', '...', 'ADU', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('999', '...', 'CNT', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('999', '...', 'CWD', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('999', '...', 'DED', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('999', '...', 'EVC', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('999', '...', 'GRP', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('999', '...', 'INT', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('999', '...', 'OTH', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('999', '...', 'VIO', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('999', '...', 'WTN', 'PPL');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('999', '...', 'ANI', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('999', '...', 'BIC', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('999', '...', 'CAR', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('999', '...', 'EMG', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('999', '...', 'MBK', 'VEH');
INSERT INTO `lapsusVGI`.`ETYPE_actornv3` (`actornv3`, `descricao`, `actornv2`, `ACTOR`) VALUES ('999', '...', 'MIL', 'VEH');

COMMIT;


-- -----------------------------------------------------
-- Data for table `lapsusVGI`.`EGEO_subWeather`
-- -----------------------------------------------------
START TRANSACTION;
USE `lapsusVGI`;
INSERT INTO `lapsusVGI`.`EGEO_subWeather` (`subWeather`, `descricao`, `WEATHER`) VALUES ('CORECT', 'Condições Corretas de Humidade???', 'HUM');
INSERT INTO `lapsusVGI`.`EGEO_subWeather` (`subWeather`, `descricao`, `WEATHER`) VALUES ('DRZLE', 'Chuvisco', 'HUM');
INSERT INTO `lapsusVGI`.`EGEO_subWeather` (`subWeather`, `descricao`, `WEATHER`) VALUES ('FOG', 'Névoa', 'HUM');
INSERT INTO `lapsusVGI`.`EGEO_subWeather` (`subWeather`, `descricao`, `WEATHER`) VALUES ('RAIN', 'Chuva', 'HUM');
INSERT INTO `lapsusVGI`.`EGEO_subWeather` (`subWeather`, `descricao`, `WEATHER`) VALUES ('RAINSR', 'Rains Shower???', 'HUM');
INSERT INTO `lapsusVGI`.`EGEO_subWeather` (`subWeather`, `descricao`, `WEATHER`) VALUES ('THSTRN', 'Tempestade e Chuva', 'HUM');
INSERT INTO `lapsusVGI`.`EGEO_subWeather` (`subWeather`, `descricao`, `WEATHER`) VALUES ('BLWSNW', 'Soprando Neve', 'ICY');
INSERT INTO `lapsusVGI`.`EGEO_subWeather` (`subWeather`, `descricao`, `WEATHER`) VALUES ('CLRICE', 'Clear icing????', 'ICY');
INSERT INTO `lapsusVGI`.`EGEO_subWeather` (`subWeather`, `descricao`, `WEATHER`) VALUES ('CORECT', 'Sem Problemas em Relação a Gelo', 'ICY');
INSERT INTO `lapsusVGI`.`EGEO_subWeather` (`subWeather`, `descricao`, `WEATHER`) VALUES ('FDRZLE', 'Chuvisco Congelante', 'ICY');
INSERT INTO `lapsusVGI`.`EGEO_subWeather` (`subWeather`, `descricao`, `WEATHER`) VALUES ('FRAIN', 'Chuva Congelante', 'ICY');
INSERT INTO `lapsusVGI`.`EGEO_subWeather` (`subWeather`, `descricao`, `WEATHER`) VALUES ('FRZFOG', 'Névoa Congelante', 'ICY');
INSERT INTO `lapsusVGI`.`EGEO_subWeather` (`subWeather`, `descricao`, `WEATHER`) VALUES ('HAIL', 'HAIL????', 'ICY');
INSERT INTO `lapsusVGI`.`EGEO_subWeather` (`subWeather`, `descricao`, `WEATHER`) VALUES ('ICECRY', 'Cristais de Gelo', 'ICY');
INSERT INTO `lapsusVGI`.`EGEO_subWeather` (`subWeather`, `descricao`, `WEATHER`) VALUES ('ICEPLT', 'Ice Pellets ???', 'ICY');
INSERT INTO `lapsusVGI`.`EGEO_subWeather` (`subWeather`, `descricao`, `WEATHER`) VALUES ('MIXICE', 'Mixed Icing', 'ICY');
INSERT INTO `lapsusVGI`.`EGEO_subWeather` (`subWeather`, `descricao`, `WEATHER`) VALUES ('RIMICE', 'Geada de Gelo', 'ICY');
INSERT INTO `lapsusVGI`.`EGEO_subWeather` (`subWeather`, `descricao`, `WEATHER`) VALUES ('SLEET', 'Granizo', 'ICY');
INSERT INTO `lapsusVGI`.`EGEO_subWeather` (`subWeather`, `descricao`, `WEATHER`) VALUES ('SNOW', 'Preciptação de Cristais de Gelo', 'ICY');
INSERT INTO `lapsusVGI`.`EGEO_subWeather` (`subWeather`, `descricao`, `WEATHER`) VALUES ('SNWGRN', 'Snow Grains ???', 'ICY');
INSERT INTO `lapsusVGI`.`EGEO_subWeather` (`subWeather`, `descricao`, `WEATHER`) VALUES ('SNWSHR', 'Snow Shower ???', 'ICY');
INSERT INTO `lapsusVGI`.`EGEO_subWeather` (`subWeather`, `descricao`, `WEATHER`) VALUES ('CORECT', 'Sem Problemas em Relação a Tempestade', 'TDS');
INSERT INTO `lapsusVGI`.`EGEO_subWeather` (`subWeather`, `descricao`, `WEATHER`) VALUES ('LGTNNG', 'Raio', 'TDS');
INSERT INTO `lapsusVGI`.`EGEO_subWeather` (`subWeather`, `descricao`, `WEATHER`) VALUES ('THST', 'Tempestade', 'TDS');
INSERT INTO `lapsusVGI`.`EGEO_subWeather` (`subWeather`, `descricao`, `WEATHER`) VALUES ('CORECT', 'Sem Problemas em Relação a Visibilidade', 'VIS');
INSERT INTO `lapsusVGI`.`EGEO_subWeather` (`subWeather`, `descricao`, `WEATHER`) VALUES ('HAZE', 'Perigo ???', 'VIS');
INSERT INTO `lapsusVGI`.`EGEO_subWeather` (`subWeather`, `descricao`, `WEATHER`) VALUES ('SMOKE', 'Fumaça', 'VIS');
INSERT INTO `lapsusVGI`.`EGEO_subWeather` (`subWeather`, `descricao`, `WEATHER`) VALUES ('CORECT', 'Sem Problemas Com Condições de Ventania', 'WIN');
INSERT INTO `lapsusVGI`.`EGEO_subWeather` (`subWeather`, `descricao`, `WEATHER`) VALUES ('CYCL', 'Ciclone', 'WIN');
INSERT INTO `lapsusVGI`.`EGEO_subWeather` (`subWeather`, `descricao`, `WEATHER`) VALUES ('DSTDVL', 'Dust Devil???', 'WIN');
INSERT INTO `lapsusVGI`.`EGEO_subWeather` (`subWeather`, `descricao`, `WEATHER`) VALUES ('DSTSND', 'Sopro de Areai ou Poeira', 'WIN');
INSERT INTO `lapsusVGI`.`EGEO_subWeather` (`subWeather`, `descricao`, `WEATHER`) VALUES ('DSTSTR', 'Tempestade de Poeira', 'WIN');
INSERT INTO `lapsusVGI`.`EGEO_subWeather` (`subWeather`, `descricao`, `WEATHER`) VALUES ('FNLCLD', 'Nuvem de Funil', 'WIN');
INSERT INTO `lapsusVGI`.`EGEO_subWeather` (`subWeather`, `descricao`, `WEATHER`) VALUES ('HURR', 'Furacão', 'WIN');
INSERT INTO `lapsusVGI`.`EGEO_subWeather` (`subWeather`, `descricao`, `WEATHER`) VALUES ('SNDSTR', 'Tempestade de Area', 'WIN');
INSERT INTO `lapsusVGI`.`EGEO_subWeather` (`subWeather`, `descricao`, `WEATHER`) VALUES ('STORM', 'Tempestade', 'WIN');
INSERT INTO `lapsusVGI`.`EGEO_subWeather` (`subWeather`, `descricao`, `WEATHER`) VALUES ('TORN', 'Tornado', 'WIN');
INSERT INTO `lapsusVGI`.`EGEO_subWeather` (`subWeather`, `descricao`, `WEATHER`) VALUES ('TRST', 'Tempestade Tropical', 'WIN');
INSERT INTO `lapsusVGI`.`EGEO_subWeather` (`subWeather`, `descricao`, `WEATHER`) VALUES ('TYPH', 'Tufão', 'WIN');
INSERT INTO `lapsusVGI`.`EGEO_subWeather` (`subWeather`, `descricao`, `WEATHER`) VALUES ('WHIR', 'Whirlwind ???', 'WIN');
INSERT INTO `lapsusVGI`.`EGEO_subWeather` (`subWeather`, `descricao`, `WEATHER`) VALUES ('WTRSPT', 'Waterspout ???', 'WIN');

COMMIT;


-- -----------------------------------------------------
-- Data for table `lapsusVGI`.`categoria`
-- -----------------------------------------------------
START TRANSACTION;
USE `lapsusVGI`;
INSERT INTO `lapsusVGI`.`categoria` (`idcategoria`, `descricao`) VALUES (1, 'Deslizamento de Terra');
INSERT INTO `lapsusVGI`.`categoria` (`idcategoria`, `descricao`) VALUES (2, 'Deslizamento de Lama');
INSERT INTO `lapsusVGI`.`categoria` (`idcategoria`, `descricao`) VALUES (3, 'Instalações Subterrâneas Quebradas');
INSERT INTO `lapsusVGI`.`categoria` (`idcategoria`, `descricao`) VALUES (4, 'Inclinação de Objetos ou Estruturas');
INSERT INTO `lapsusVGI`.`categoria` (`idcategoria`, `descricao`) VALUES (5, 'Movimentação de objetos ou estruturas');
INSERT INTO `lapsusVGI`.`categoria` (`idcategoria`, `descricao`) VALUES (6, 'Rachaduras em construções ou calçadas');
INSERT INTO `lapsusVGI`.`categoria` (`idcategoria`, `descricao`) VALUES (7, 'Afastamento do solo de fundações');
INSERT INTO `lapsusVGI`.`categoria` (`idcategoria`, `descricao`) VALUES (8, 'Portas e Janelas tortas ou emperrados');
INSERT INTO `lapsusVGI`.`categoria` (`idcategoria`, `descricao`) VALUES (9, 'Deslizamento de Pedregulhos');
INSERT INTO `lapsusVGI`.`categoria` (`idcategoria`, `descricao`) VALUES (10, 'Deformações em estradas');
INSERT INTO `lapsusVGI`.`categoria` (`idcategoria`, `descricao`) VALUES (11, 'Aumento repentino do nível de água');
INSERT INTO `lapsusVGI`.`categoria` (`idcategoria`, `descricao`) VALUES (12, 'Diminuição repentina do nível de água');
INSERT INTO `lapsusVGI`.`categoria` (`idcategoria`, `descricao`) VALUES (13, 'Água rompe superfície do solo');
INSERT INTO `lapsusVGI`.`categoria` (`idcategoria`, `descricao`) VALUES (14, 'Nascentes');
INSERT INTO `lapsusVGI`.`categoria` (`idcategoria`, `descricao`) VALUES (15, 'Sons incomuns sem motivos aparentes (árvores se quebrando ou pedras se batendo)');
INSERT INTO `lapsusVGI`.`categoria` (`idcategoria`, `descricao`) VALUES (16, 'Pedregulhos recentes na paisagem');

COMMIT;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- Views
CREATE VIEW CONTRIBUICAO_GEOSERVER AS
  SELECT CT.IDCONTRIBUICAO, CT.OCORRENCIA, CT.RISCODANO, CT.VITIMA, CT.DESCRICAO, CT.PUBLICADO, CT.LOCAL, CA.DESCRICAO AS CATEGORIA, 
  (
      SELECT G.NOME AS NOME
      FROM GESTOR G, USUARIO U
      WHERE G.IDUSUARIO = U.IDUSUARIO
      AND U.IDUSUARIO = CT.COLABORADOR
      UNION
      SELECT R.NOME AS NOME
      FROM REGISTRADO R, USUARIO U
      WHERE U.IDUSUARIO = R.IDUSUARIO
      AND U.IDUSUARIO = CT.COLABORADOR
  ) AS COLABORADOR,
  (
      SELECT G.NOME AS NOME
      FROM GESTOR G, USUARIO U
      WHERE G.IDUSUARIO = U.IDUSUARIO
      AND U.IDUSUARIO = CT.USUARIO
      UNION
      SELECT R.NOME AS NOME
      FROM REGISTRADO R, USUARIO U
      WHERE U.IDUSUARIO = R.IDUSUARIO
      AND U.IDUSUARIO = CT.USUARIO
  ) AS MODERADOR
  FROM CONTRIBUICAO CT, CATEGORIA CA 
  WHERE
  CA.IDCATEGORIA = CT.CATEGORIA;

CREATE VIEW EMSI_GEOSERVER AS
  SELECT CON.ID CON_ID, CON.CREATION, CON.FREETEXT CON_FREE, CON.URGENCY, ORI.NAME ORI_NAME, ORI.ORG_ID, 
  GST.idUsuario, GST.nome, EXT_I.external_info_id, EXT_I.FREE_TEXT EXT_FREE, EXT_I.URI, 
  EXT_T.TYPE ext_type, EXT_T.descricao desc_ext, CON_SE.SECLASS, CON_SE.descricao desc_con, CON_MO.MODE, 
  CON_MO.descricao con_mo, CON_MSG.MSGTYPE, CON_MSG.descricao con_msg, CON_LVL.LEVEL, 
  CON_LVL.descricao con_lvl, EVT.ID, EVT.NAME EVT_NAME, EVT.MAIN_EVENT_ID, EVT.CERTAINTY, 
  EVT.DECL_DATIME, EVT.OCC_DATIME, EVT.OBS_DATIME, EVT.FREETEXT EVT_FREE, EVT_SRC.SOURCE, 
  EVT_SRC.descricao evt_src, EVT_SCL.SCALE, EVT_SCL.descricao evt_scl, EVT_STS.STATUS evtsts, 
  EVT_STS.descricao evt_sts, EVT_CAU.CAUSE, EVT_CAU.descricao evt_cau, EVT_RSK.RISK_ASSESSMNT, 
  EVT_RSK.descricao evt_rsk, EG.ID EG_ID, EG.DATIME, EG.FREETEXT EG_FREE, EG_STS.STATUS, 
  EG_STS.descricao eg_sts, EG_SBT.subtype, EG_SBT.descricao eg_sbt, EG_TP.TYPE eg_tp_type, EG_TP.descricao EG_TP,
  EG_SB.subWeather, EG_SB.descricao eg_sb, EG_W.WEATHER, EG_W.descricao EG_W, POS.LOC_ID,
  POS.NAME, ST_ASTEXT(POS.COORD), ADR.address_id, ADR.ADDRESS, SB_EV.subEnv, 
  SB_EV.descricao sb_ev, ET_EV.ENV, ET_EV.descricao et_ev, ET_SC.subcategory, ET_SC.descricao et_sc,
  ET_C.CATEGORY, ET_C.descricao et_c, ET_SL.subLoctype, ET_SL.descricao, ET_L.LOCTYPE,
  ET_L.descricao et_l, ET_A3.actornv3, ET_A3.descricao et_a3, ET_A2.actornv2, ET_A2.descricao et_a2,
  ET_A1.ACTOR, ET_A1.descricao et_a1
  FROM TSO_2_0 TSO
  LEFT JOIN CONTEXT CON ON TSO.CONTEXT_ID = CON.ID
  LEFT JOIN ORIGIN ORI ON CON.ID = ORI.CONTEXT_ID
  LEFT JOIN GESTOR GST ON ORI.USER_ID = GST.idUsuario
  LEFT JOIN EXTERNAL_INFO EXT_I ON CON.ID = EXT_I.CONTEXT_ID
  LEFT JOIN EXTERNAL_INFO_TYPE EXT_T ON EXT_I.TYPE = EXT_T.TYPE
  LEFT JOIN CONTEXT_SECLASS CON_SE ON CON.SECLASS = CON_SE.SECLASS
  LEFT JOIN CONTEXT_MODE CON_MO ON CON.MODE = CON_MO.MODE
  LEFT JOIN CONTEXT_MSGTYPE CON_MSG ON CON.MSGTYPE = CON_MSG.MSGTYPE
  LEFT JOIN CONTEXT_LEVEL CON_LVL ON CON.LEVEL = CON_LVL.LEVEL
  LEFT JOIN EVENT EVT ON TSO.EVENT_ID = EVT.ID
  LEFT JOIN EVENT_SOURCE EVT_SRC ON EVT.SOURCE = EVT_SRC.SOURCE
  LEFT JOIN EVENT_SCALE EVT_SCL ON EVT.SCALE = EVT_SCL.SCALE
  LEFT JOIN EVENT_STATUS EVT_STS ON EVT.STATUS = EVT_STS.STATUS
  LEFT JOIN EVENT_CAUSE EVT_CAU ON EVT.CAUSE = EVT_CAU.CAUSE
  LEFT JOIN EVENT_RISK_ASSESSMNT EVT_RSK ON EVT.RISK_ASSESSMNT = EVT_RSK.RISK_ASSESSMNT
  LEFT JOIN EGEO EG ON EVT.ID = EG.EVENT_ID
  LEFT JOIN EGEO_STATUS EG_STS ON EG.STATUS = EG_STS.STATUS
  LEFT JOIN EGEO_SUBTYPE EG_SBT ON EG.subtype = EG_SBT.subtype
  LEFT JOIN EGEO_TYPE EG_TP ON EG_SBT.TYPE = EG_TP.TYPE
  LEFT JOIN EGEO_HAS_EGEO_SUBWEATHER EG_H ON EG.ID = EG_H.EGEO_ID
  LEFT JOIN EGEO_SUBWEATHER EG_SB ON EG_SB.subWeather = EG_H.subWeather AND EG_SB.WEATHER = EG_H.WEATHER
  LEFT JOIN EGEO_WEATHER EG_W ON EG_W.WEATHER = EG_H.WEATHER
  LEFT JOIN POSITION POS ON POS.EGEO_ID = EG.ID
  LEFT JOIN ADDRESS ADR ON ADR.LOC_ID = POS.LOC_ID
  LEFT JOIN ETYPE ET ON ET.EVENT_ID = EVT.ID
  LEFT JOIN SUBENV SB_EV ON SB_EV.subEnv = ET.subEnv AND SB_EV.ENV = ET.ENV
  LEFT JOIN ETYPE_ENV ET_EV ON ET_EV.ENV = ET.ENV
  LEFT JOIN ETYPE_HAS_ETYPE_SUBCATEGORY ET_H_SB ON ET_H_SB.EVENT_ID = EVT.ID
  LEFT JOIN ETYPE_SUBCATEGORY ET_SC ON ET_SC.CATEGORY = ET_H_SB.CATEGORY AND ET_SC.subcategory = ET_H_SB.subcategory
  LEFT JOIN ETYPE_CATEGORY ET_C ON ET_C.CATEGORY = ET_H_SB.CATEGORY
  LEFT JOIN ETYPE_HAS_ETYPE_SUBLOCTYPE ET_H_SL ON ET_H_SL.EVENT_ID = EVT.ID
  LEFT JOIN ETYPE_SUBLOCTYPE ET_SL ON ET_H_SL.LOCTYPE = ET_SL.LOCTYPE AND ET_H_SL.subLoctype = ET_SL.subLoctype
  LEFT JOIN ETYPE_LOCTYPE ET_L ON ET_L.LOCTYPE = ET_H_SL.LOCTYPE
  LEFT JOIN ETYPE_HAS_ETYPE_ACTORNV3 ET_HA ON ET_HA.EVENT_ID = EVT.ID
  LEFT JOIN ETYPE_ACTORNV3 ET_A3 ON ET_A3.actornv3 = ET_HA.actornv3 AND ET_A3.actornv2 = ET_HA.actornv2 AND ET_A3.ACTOR = ET_HA.ACTOR
  LEFT JOIN ETYPE_ACTORNV2 ET_A2 ON ET_A2.actornv2 = ET_HA.actornv2 AND ET_A2.ACTOR = ET_HA.ACTOR
  LEFT JOIN ETYPE_ACTOR ET_A1 ON ET_A1.ACTOR = ET_HA.ACTOR