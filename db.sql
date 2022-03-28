/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 100420
 Source Host           : localhost:3306
 Source Schema         : multi_ip

 Target Server Type    : MySQL
 Target Server Version : 100420
 File Encoding         : 65001

 Date: 28/03/2022 10:12:50
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for clients
-- ----------------------------
DROP TABLE IF EXISTS `clients`;
CREATE TABLE `clients`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `server_id` int NULL DEFAULT NULL,
  `client_ip` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `con_time` datetime NULL DEFAULT NULL,
  `dis_time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of clients
-- ----------------------------

-- ----------------------------
-- Table structure for connect_status
-- ----------------------------
DROP TABLE IF EXISTS `connect_status`;
CREATE TABLE `connect_status`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `server_id` int NULL DEFAULT NULL,
  `con_time` datetime NULL DEFAULT NULL,
  `dis_time` datetime NULL DEFAULT NULL,
  `status` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of connect_status
-- ----------------------------

-- ----------------------------
-- Table structure for servers
-- ----------------------------
DROP TABLE IF EXISTS `servers`;
CREATE TABLE `servers`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `ip` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `port` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of servers
-- ----------------------------
INSERT INTO `servers` VALUES (1, '127.0.0.1', '4000');
INSERT INTO `servers` VALUES (17, '127.0.0.1', '5000');
INSERT INTO `servers` VALUES (22, '127.0.0.1', '1000');

-- ----------------------------
-- Procedure structure for newServerAdd
-- ----------------------------
DROP PROCEDURE IF EXISTS `newServerAdd`;
delimiter ;;
CREATE PROCEDURE `newServerAdd`(IN ip_address VARCHAR(255),
	IN port_number VARCHAR(255))
BEGIN
	IF( SELECT EXISTS ( SELECT * FROM servers WHERE ip=ip_address and port=port_number )) THEN
		SELECT 'EXISTS';
	ELSE
		INSERT INTO servers (ip, port)
			VALUES (ip_address, port_number);
	END IF;
END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
