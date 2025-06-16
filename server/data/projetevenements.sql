-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 16 juin 2025 à 17:18
-- Version du serveur : 8.3.0
-- Version de PHP : 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `projetevenements`
--

-- --------------------------------------------------------

--
-- Structure de la table `evenement`
--

DROP TABLE IF EXISTS `evenement`;
CREATE TABLE IF NOT EXISTS `evenement` (
  `idEvenement` int NOT NULL AUTO_INCREMENT,
  `titre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `dateEvenement` datetime DEFAULT NULL,
  `nbPlaces` int NOT NULL,
  `image` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `actif` int DEFAULT NULL,
  `idLieu` int DEFAULT NULL,
  `idUtilisateur` int NOT NULL,
  PRIMARY KEY (`idEvenement`),
  KEY `fk_idLieu` (`idLieu`),
  KEY `fk_idUtilisateur` (`idUtilisateur`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `evenement`
--

INSERT INTO `evenement` (`idEvenement`, `titre`, `description`, `dateEvenement`, `nbPlaces`, `image`, `actif`, `idLieu`, `idUtilisateur`) VALUES
(1, 'Duel at Diablo', 'Découvrez une soirée jazz exceptionnelle avec des artistes de renommée mondiale. Plongez dans une ambiance feutrée où la musique vous transportera dans un univers raffiné et mélodieux.', '2024-07-11 00:00:00', 679, '/public/assets/images/events/10.jpg', 1, 1, 118),
(2, 'Deceit', 'Participez à notre conférence sur les technologies émergentes. Des experts vous présenteront les dernières innovations dans le domaine de l\'intelligence artificielle et de la blockchain.', '2025-03-04 00:00:00', 570, '/public/assets/images/events/11.jpg', 1, 2, 118),
(3, 'The Secret of Convict Lake', 'Rejoignez-nous pour une randonnée guidée au cœur des montagnes. Une expérience immersive dans la nature, idéale pour se ressourcer et admirer des paysages à couper le souffle.', '2025-01-10 00:00:00', 805, '/public/assets/images/events/12.jpg', 1, 3, 118),
(4, 'Tora-san\'s Love Call (Otoko wa tsurai yo: Torajiro koiuta)', 'Assistez à notre festival de cinéma en plein air. Profitez de projections sous les étoiles, avec une sélection des meilleurs films d\'auteur, accompagnés de débats avec les réalisateurs.', '2026-10-22 00:00:00', 106, '/public/assets/images/events/13.jpg', 1, 4, 118),
(5, 'Before the Fall (NaPolA - Elite für den Führer)', 'Venez déguster les vins les plus raffinés de notre région lors de ce salon unique. Rencontrez des vignerons passionnés et découvrez les secrets de leur savoir-faire.', '2024-02-06 00:00:00', 861, '/public/assets/images/events/14.jpg', 1, 5, 118),
(6, 'Bright Lights', 'Ne manquez pas notre marché artisanal où créateurs locaux exposeront leurs œuvres. Une opportunité de découvrir des produits uniques et de soutenir l\'artisanat de notre région.', '2024-04-03 00:00:00', 533, '/public/assets/images/events/15.jpg', 1, 6, 118),
(7, 'Turning Tide (En solitaire)', 'Participez à un atelier de cuisine avec un chef étoilé. Apprenez les techniques de la gastronomie française et réalisez des plats qui épateront vos invités.', '2024-04-22 00:00:00', 915, '/public/assets/images/events/16.jpg', 1, 7, 118),
(8, 'Ryan', 'Venez célébrer la Fête de la Musique avec nous ! Des artistes locaux joueront en live dans différents lieux de la ville. Une journée riche en découvertes musicales.', '2025-04-01 00:00:00', 327, '/public/assets/images/events/17.jpg', 1, 8, 118),
(9, 'London', 'Rejoignez notre exposition d\'art contemporain qui rassemble des œuvres audacieuses de jeunes talents. Une immersion dans des univers créatifs et originaux.', '2024-01-29 00:00:00', 265, '/public/assets/images/events/18.jpg', 1, 9, 118),
(10, 'Those Magnificent Men in Their Flying Machines', 'Participez à notre tournoi de tennis ouvert à tous les niveaux. Une compétition amicale qui se déroulera dans une ambiance conviviale, avec des prix à gagner.', '2024-08-10 00:00:00', 305, '/public/assets/images/events/19.jpg', 1, 10, 118),
(11, 'Hunger', 'Ne manquez pas notre gala de charité annuel. Une soirée élégante avec un dîner de gala et une vente aux enchères au profit d\'associations locales.', '2026-04-06 00:00:00', 918, '/public/assets/images/events/2.jpg', 1, 11, 11),
(12, 'Until Death', 'Venez assister à un spectacle de danse contemporaine qui mêle poésie et performance physique. Un événement captivant qui repousse les limites de l\'expression corporelle.', '2024-10-17 00:00:00', 194, '/public/assets/images/events/20.jpg', 1, 12, 12),
(13, 'What If ...', 'Participez à notre journée de bénévolat. Contribuez à des projets communautaires et faites la différence dans votre quartier, tout en rencontrant des personnes partageant les mêmes valeurs.', '2025-06-28 00:00:00', 462, '/public/assets/images/events/21.jpg', 1, 13, 13),
(14, 'Tiger\'s Tail, The', 'Assistez à un concert symphonique où un orchestre de renom interprétera les œuvres classiques des plus grands compositeurs. Une soirée d\'exception pour les amateurs de musique.', '2026-05-24 00:00:00', 600, '/public/assets/images/events/3.jpg', 1, 14, 118),
(15, 'Space Pirate Captain Harlock', 'Rejoignez-nous pour une conférence sur le développement durable. Des experts discuteront des enjeux environnementaux actuels et des solutions pour un avenir plus vert.', '2025-12-22 00:00:00', 928, '/public/assets/images/events/4.jpg', 1, 15, 118),
(16, 'Stage Door Canteen', 'Participez à une soirée quiz entre amis. Testez vos connaissances sur des sujets variés, dans une ambiance ludique et conviviale, avec des prix à gagner pour les meilleurs.', '2026-10-16 00:00:00', 719, '/public/assets/images/events/5.jpg', 1, 16, 1),
(17, 'Conman (Du Xia 1999)', 'Venez découvrir notre salon du livre où auteurs et éditeurs présenteront leurs dernières publications. Rencontrez vos auteurs préférés et assistez à des séances de dédicaces.', '2026-11-02 00:00:00', 415, '/public/assets/images/events/6.jpg', 1, 17, 118),
(18, 'Food of Love (Manjar de Amor)', 'Ne manquez pas notre compétition de peinture en plein air. Une journée créative où des artistes exprimeront leur talent en capturant la beauté des paysages environnants.', '2024-07-10 00:00:00', 676, '/public/assets/images/events/7.jpg', 1, 18, 5),
(19, 'Soldier in the Rain', 'Rejoignez-nous pour un atelier de méditation en plein air. Un moment de détente et de recentrage pour vous reconnecter à la nature et à vous-même, dans un cadre apaisant.', '2024-01-15 00:00:00', 608, '/public/assets/images/events/8.jpg', 1, 19, 3),
(20, 'Éclats de Scène : Quand les Classiques Rencontrent l’Audace', 'Assistez à notre soirée de théâtre amateur où des comédiens passionnés interpréteront des classiques revisités. Une occasion de découvrir des talents émergents.', '2025-03-25 18:00:00', 200, '/public/assets/images/events/event_671435a2295f63.91693886.png', 1, 20, 118),
(107, 'Marché Artisanal Nocturne', 'Dégustations, créations locales et ambiance festive au coucher du soleil.', '2024-10-19 00:14:00', 1, '/public/assets/images/events/event_67142f4936e3c6.23240771.jpg', 0, 105, 118),
(108, 'Tournoi de Jeux de Société', 'Une journée conviviale autour des meilleurs jeux de stratégie et de plateau.', '2024-10-19 00:14:00', 1, '/public/assets/images/events/event_67142f6a48b079.99108121.jpg', 0, 106, 118);

-- --------------------------------------------------------

--
-- Structure de la table `inscrire`
--

DROP TABLE IF EXISTS `inscrire`;
CREATE TABLE IF NOT EXISTS `inscrire` (
  `idEvenement` int NOT NULL,
  `idUtilisateur` int NOT NULL,
  PRIMARY KEY (`idEvenement`,`idUtilisateur`),
  KEY `Inscrire_Utilisateur0_FK` (`idUtilisateur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `inscrire`
--

INSERT INTO `inscrire` (`idEvenement`, `idUtilisateur`) VALUES
(1, 7),
(1, 16),
(8, 16),
(4, 17),
(6, 17),
(9, 17),
(6, 18),
(7, 18),
(10, 18),
(5, 19),
(11, 19),
(4, 20),
(5, 20),
(12, 20),
(3, 21),
(3, 22),
(1, 23),
(2, 23),
(2, 24),
(2, 25),
(1, 118),
(2, 118),
(3, 118),
(8, 118),
(11, 118),
(13, 118),
(18, 118);

-- --------------------------------------------------------

--
-- Structure de la table `lieu`
--

DROP TABLE IF EXISTS `lieu`;
CREATE TABLE IF NOT EXISTS `lieu` (
  `idLieu` int NOT NULL AUTO_INCREMENT,
  `nomLieu` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`idLieu`)
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `lieu`
--

INSERT INTO `lieu` (`idLieu`, `nomLieu`) VALUES
(1, '0332 Northfield Center'),
(2, '0889 Kropf Center'),
(3, '235 Pepper Wood Road'),
(4, '032 Ridgeway Way'),
(5, '6 Corry Lane'),
(6, '24993 Pennsylvania Crossing'),
(7, '7786 Pankratz Point'),
(8, '16664 Atwood Way'),
(9, '190 Esch Circle'),
(10, '520 Forest Dale Circle'),
(11, '878 Sundown Circle'),
(12, '05 Rieder Crossing'),
(13, '78408 Oakridge Trail'),
(14, '531 Moose Circle'),
(15, '35 Brentwood Lane'),
(16, '3119 Nevada Circle'),
(17, '71484 Corscot Pass'),
(18, '9543 South Street'),
(19, '380 Arizona Junction'),
(20, 'Théâtre Saragosse'),
(21, '158 Arizona Crossing'),
(22, '702 Dennis Road'),
(23, '30395 Gulseth Road'),
(24, '4297 Roth Road'),
(25, '1124 Steensland Alley'),
(26, '4057 Buena Vista Plaza'),
(27, '43629 Sage Circle'),
(28, '91 Dwight Street'),
(29, '73 Clyde Gallagher Junction'),
(30, '8587 Commercial Lane'),
(31, '279 Sunbrook Street'),
(32, '44 Mayer Crossing'),
(33, '4 Raven Drive'),
(34, '8458 Northview Crossing'),
(35, '0975 Ramsey Center'),
(36, '8 Lotheville Court'),
(37, '5 Towne Drive'),
(38, '6 Steensland Alley'),
(39, '6587 Tennyson Terrace'),
(40, '93665 Grover Point'),
(41, '664 Elmside Pass'),
(42, '5 Melody Crossing'),
(43, '7 Center Street'),
(44, '37 Northport Road'),
(45, '84 Carberry Point'),
(46, '2415 Summer Ridge Road'),
(47, '38 Coleman Terrace'),
(48, '23 Gulseth Place'),
(49, '5956 Melby Trail'),
(50, '5 Iowa Park'),
(51, '69827 Talmadge Terrace'),
(52, '79133 Merchant Crossing'),
(53, '60 Blackbird Pass'),
(54, '1025 Anniversary Hill'),
(55, '608 Grim Hill'),
(56, '3680 Dexter Way'),
(57, '34 Hovde Alley'),
(58, '72780 Butternut Alley'),
(59, '06 Meadow Vale Way'),
(60, '8822 Emmet Trail'),
(61, '93 Shasta Court'),
(62, '0417 Center Point'),
(63, '331 4th Plaza'),
(64, '0411 Kensington Road'),
(65, '9436 Russell Place'),
(66, '20867 Merchant Park'),
(67, '45615 Basil Hill'),
(68, '757 Roth Circle'),
(69, '4812 Nova Center'),
(70, '67639 Mockingbird Junction'),
(71, '2 Bunting Hill'),
(72, '7 Northport Alley'),
(73, '44 Springview Parkway'),
(74, '976 East Road'),
(75, '633 Comanche Way'),
(76, '948 Alpine Circle'),
(77, '757 Towne Pass'),
(78, '6430 Laurel Circle'),
(79, '10973 Ronald Regan Point'),
(80, '1 Mallory Crossing'),
(81, '29 Bartelt Court'),
(82, '45763 Fulton Center'),
(83, '5014 Dawn Avenue'),
(84, '1412 High Crossing Parkway'),
(85, '228 Hayes Point'),
(86, '305 Anthes Street'),
(87, '04 Mariners Cove Crossing'),
(88, '7628 Harbort Center'),
(89, '1541 Bay Parkway'),
(90, '40 Lyons Street'),
(91, '37 Gulseth Pass'),
(92, '3423 Ramsey Parkway'),
(93, '1 Anzinger Terrace'),
(94, '526 Oriole Center'),
(95, '81552 Macpherson Avenue'),
(96, '10 Hagan Avenue'),
(97, '72414 Tony Street'),
(98, '916 Pawling Street'),
(99, '3 Del Sol Pass'),
(100, '4764 West Plaza'),
(101, 'Palais des Orphelines'),
(102, 'Centre des Arts et des Métiers'),
(103, 'Square du Bonheur'),
(104, 'Parc Naturel des Pyrénées'),
(105, 'Salle des Fêtes de Lumière'),
(106, 'Vallée des Geeks');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `idUtilisateur` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `designation` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `prenom` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `motDePasse` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `roles` json NOT NULL,
  PRIMARY KEY (`idUtilisateur`)
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`idUtilisateur`, `nom`, `designation`, `prenom`, `email`, `motDePasse`, `roles`) VALUES
(1, 'Bigglestone', 'EventMaster', 'Gunner', 'gbigglestone0@patch.com', 'qZ9/7>V_', '[\"Administrateur\", \"Utilisateur\", \"Organisateur\"]'),
(2, 'Goldthorp', 'EliteEvents', 'Wyn', 'wgoldthorp1@smh.com.au', 'fK3{LwU\"y\"Q>', '[\"Organisateur\"]'),
(3, 'Gribbins', 'PrimePlanner', 'Martainn', 'mgribbins2@fotki.com', 'iH4#GN(A)i', '[\"Organisateur\"]'),
(4, 'Haeslier', 'ProOrganizers', 'Gail', 'ghaeslier3@nydailynews.com', 'hK9=I=UWDDL*I', '[\"Utilisateur\"]'),
(5, 'Moorfield', 'EpicEvents', 'Trixie', 'tmoorfield4@homestead.com', 'kJ7`BHcQ', '[\"Organisateur\"]'),
(6, 'Chattock', 'DynamicDesigns', 'Adiana', 'achattock5@meetup.com', 'pF2,o*2R/#B0Zyz', '[\"Organisateur\"]'),
(7, 'Brenstuhl', 'MasterMinds', 'Rowney', 'rbrenstuhl6@sogou.com', 'pK5!{P3~~PwH\'4', '[\"Organisateur\"]'),
(8, 'Maudson', 'EventGenius', 'Aurora', 'amaudson7@goo.ne.jp', 'oN8}KsvC<Xhpb', '[\"Organisateur\"]'),
(9, 'Drinan', 'UltimatePlanners', 'Sydney', 'sdrinan8@slashdot.org', 'yS9>b0Y(', '[\"Organisateur\"]'),
(10, 'Jossum', 'CreativeCrew', 'Erinna', 'ejossum9@webs.com', 'rY1{I&|Pe?G_K\'', '[\"Organisateur\"]'),
(11, 'Sargent', 'SuperiorEvents', 'Carlota', 'csargenta@economist.com', 'oG8?!p{kMcf0H', '[\"Organisateur\"]'),
(12, 'Olech', 'MajesticMinds', 'Leandra', 'lolechb@noaa.gov', 'yK9!~k3j=}t\"*', '[\"Organisateur\"]'),
(13, 'Dragonette', 'VisionaryEvents', 'Blanca', 'bdragonettec@webeden.co.uk', 'qW6/|g7~N~k?_b', '[\"Organisateur\"]'),
(14, 'Finicj', 'EventArchitects', 'Rhys', 'rfinicjd@surveymonkey.com', 'xW7\'aoN0hr', '[\"Organisateur\"]'),
(15, 'Ditchfield', 'GrandOrganizers', 'Godiva', 'gditchfielde@360.cn', 'bB7$aI/3XI~_5', '[\"Organisateur\"]'),
(16, 'Tinn', NULL, 'Letizia', 'ltinnf@bloglines.com', 'sM7?yMp2yO', '[\"Utilisateur\"]'),
(17, 'Thompkins', NULL, 'Sisile', 'sthompkinsg@typepad.com', 'xW3!t9{7OHH', '[\"Utilisateur\"]'),
(18, 'Mingo', NULL, 'Henrieta', 'hmingoh@posterous.com', 'hM9JGhILmt', '[\"Administrateur\"]'),
(19, 'Denkel', NULL, 'Callie', 'cdenkeli@smugmug.com', 'sM8}qR*{azBD2q', '[\"Utilisateur\"]'),
(20, 'Swalwell', NULL, 'Andros', 'aswalwellj@dailymail.co.uk', 'aF0#S?PExBg', '[\"Utilisateur\"]'),
(21, 'Sinnott', NULL, 'Adan', 'asinnottk@baidu.com', 'xP7ux(`ydzy3s', '[\"Utilisateur\"]'),
(22, 'Geering', NULL, 'Nobie', 'ngeeringl@github.com', 'nC5{jc@wI~*b>K\\%', '[\"Utilisateur\"]'),
(23, 'Behning', NULL, 'Tobias', 'tbehningm@irs.gov', 'hC4qiv/8P.e3#O6', '[\"Utilisateur\"]'),
(24, 'Yushankin', NULL, 'Davide', 'dyushankinn@fema.gov', 'yZ8\'9(wlBSkM?H', '[\"Utilisateur\"]'),
(25, 'Wayman', NULL, 'Cchaddie', 'cwaymano@arstechnica.com', 'eC0%!&dGf<%f\'ng', '[\"Utilisateur\"]'),
(26, 'Cund', NULL, 'Joey', 'jcundp@istockphoto.com', 'mG3#pcjn+w(Ze', '[\"Administrateur\"]'),
(27, 'Barrie', NULL, 'Carree', 'cbarrieq@i2i.jp', 'wW2+=Xzbuyvw3', '[\"Utilisateur\"]'),
(28, 'Brunnstein', NULL, 'Basilio', 'bbrunnsteinr@moonfruit.com', 'pP9,FMY2Q(_0_$', '[\"Utilisateur\"]'),
(29, 'Crickett', NULL, 'Gilburt', 'gcricketts@spiegel.de', 'sE1??/uE#@yJIG', '[\"Administrateur\"]'),
(30, 'Mattecot', NULL, 'Annecorinne', 'amattecott@mashable.com', 'sE4U%N?', '[\"Utilisateur\"]'),
(31, 'Winborn', NULL, 'Annabella', 'awinbornu@java.com', 'mX5*#G/xc}kMD', '[\"Administrateur\"]'),
(32, 'Stobbie', NULL, 'Ema', 'estobbiev@marriott.com', 'uM7`PSd2', '[\"Utilisateur\"]'),
(33, 'Renforth', NULL, 'Saundra', 'srenforthw@wunderground.com', 'iO0>{SghyI', '[\"Administrateur\"]'),
(34, 'Ziemecki', NULL, 'Bevon', 'bziemeckix@hostgator.com', 'pD6+%Q0Vu.xd`<jf', '[\"Administrateur\"]'),
(35, 'de Zamora', NULL, 'Wallie', 'wdezamoray@cbc.ca', 'lH5&*NxT~Me*\"|', '[\"Utilisateur\"]'),
(36, 'Romushkin', NULL, 'Kevon', 'kromushkinz@liveinternet.ru', 'bC8(?mO)3s', '[\"Organisateur\"]'),
(37, 'Okker', NULL, 'Xylia', 'xokker10@ca.gov', 'jJ8.Mtjy', '[\"Utilisateur\"]'),
(38, 'Rummings', NULL, 'Sukey', 'srummings11@nifty.com', 'aQ0{(R`cGiPz&', '[\"Administrateur\"]'),
(39, 'McGeffen', NULL, 'Minetta', 'mmcgeffen12@newsvine.com', 'vB4\"q}<i~{27', '[\"Administrateur\"]'),
(40, 'Lougheid', NULL, 'Stillman', 'slougheid13@yolasite.com', 'zX7{gqf69', '[\"Administrateur\"]'),
(41, 'Ivashkov', NULL, 'Wainwright', 'wivashkov14@mediafire.com', 'lL6?7y27dr0O%(*M', '[\"Administrateur\"]'),
(42, 'Kettley', NULL, 'Cleve', 'ckettley15@bizjournals.com', 'bF5(HQ&9', '[\"Utilisateur\"]'),
(43, 'Deguara', NULL, 'Sallyanne', 'sdeguara16@rambler.ru', 'pT3{i(V1l!', '[\"Administrateur\"]'),
(44, 'Simonitto', NULL, 'Josi', 'jsimonitto17@desdev.cn', 'fF8$t$1X/VP&', '[\"Organisateur\"]'),
(45, 'Slopier', NULL, 'Rosalinda', 'rslopier18@dailymail.co.uk', 'fS2#MW(7=Q&H\\%F', '[\"Administrateur\"]'),
(46, 'Risso', NULL, 'Brenna', 'brisso19@ameblo.jp', 'hZ7_uA$cPOug_m', '[\"Administrateur\"]'),
(47, 'Pithcock', NULL, 'Ferdinande', 'fpithcock1a@hc360.com', 'yJ4%!}=5S?P1fE8', '[\"Utilisateur\"]'),
(48, 'Rosenwasser', NULL, 'Jackie', 'jrosenwasser1b@com.com', 'nI1,GJ|VjxQhD', '[\"Organisateur\"]'),
(49, 'Rubinfajn', NULL, 'Trumaine', 'trubinfajn1c@nifty.com', 'eF6\'$A+=Pl6\"`Jh', '[\"Administrateur\"]'),
(50, 'Drogan', NULL, 'Clea', 'cdrogan1d@devhub.com', 'jO3~T}GN', '[\"Organisateur\"]'),
(51, 'Adderley', NULL, 'Yoshiko', 'yadderley1e@joomla.org', 'qK9,auuO+gmPk|Z', '[\"Organisateur\"]'),
(52, 'Sodeau', NULL, 'Edin', 'esodeau1f@t.co', 'hC4&YWRW!d10qQ>', '[\"Administrateur\"]'),
(53, 'Rudsdale', NULL, 'Jamil', 'jrudsdale1g@ning.com', 'aV5!@~03Cb.a', '[\"Organisateur\"]'),
(54, 'Readmire', NULL, 'Feliza', 'freadmire1h@bbc.co.uk', 'zC4(e+&5}R.|', '[\"Organisateur\"]'),
(55, 'Aery', NULL, 'Vergil', 'vaery1i@oakley.com', 'uO0,1vRya\"(#D', '[\"Utilisateur\"]'),
(56, 'Creeghan', NULL, 'Charlena', 'ccreeghan1j@webeden.co.uk', 'jV3\"9azwa', '[\"Utilisateur\"]'),
(57, 'Cluckie', NULL, 'Deedee', 'dcluckie1k@1und1.de', 'hY1/#pQ(AvP,K', '[\"Organisateur\"]'),
(58, 'Ridolfi', NULL, 'Christoforo', 'cridolfi1l@ucla.edu', 'oU2$PPZn+', '[\"Administrateur\"]'),
(59, 'Hansberry', NULL, 'Stephani', 'shansberry1m@cocolog-nifty.com', 'sV2\'0cgz,3Xm3', '[\"Organisateur\"]'),
(60, 'Grinnov', NULL, 'Nonie', 'ngrinnov1n@purevolume.com', 'cE5}W*H|x6&3', '[\"Administrateur\"]'),
(61, 'De Rechter', NULL, 'Nelson', 'nderechter1o@people.com.cn', 'mM5%0F2TB?TE', '[\"Organisateur\"]'),
(62, 'Zimmermanns', NULL, 'Jewel', 'jzimmermanns1p@sourceforge.net', 'xD9/=SP./Myp_j8', '[\"Organisateur\"]'),
(63, 'Foli', NULL, 'Rayna', 'rfoli1q@jalbum.net', 'tQ5?Hx(yTR6l', '[\"Organisateur\"]'),
(64, 'Spargo', NULL, 'Cornelius', 'cspargo1r@seesaa.net', 'bO9\'.j{zYNF4I', '[\"Organisateur\"]'),
(65, 'Jenner', NULL, 'Othella', 'ojenner1s@bloglines.com', 'lZ2y@pGgTR', '[\"Utilisateur\"]'),
(66, 'Daunay', NULL, 'Sammy', 'sdaunay1t@cargocollective.com', 'zE2/T2P4pS*&', '[\"Utilisateur\"]'),
(67, 'Pendlington', NULL, 'Kay', 'kpendlington1u@oaic.gov.au', 'mJ9e!s|i', '[\"Organisateur\"]'),
(68, 'Reynoollds', NULL, 'Alford', 'areynoollds1v@huffingtonpost.com', 'uA4|.6lnhD%,t', '[\"Administrateur\"]'),
(69, 'France', NULL, 'Emmanuel', 'efrance1w@mozilla.org', 'jJ1$aPp\"Akq(', '[\"Utilisateur\"]'),
(70, 'Philpott', NULL, 'Moina', 'mphilpott1x@noaa.gov', 'fS2\'ojcpW5}YfDsZ', '[\"Administrateur\"]'),
(71, 'Maciejewski', NULL, 'Hagen', 'hmaciejewski1y@wikipedia.org', 'wR7%}<,}c', '[\"Utilisateur\"]'),
(72, 'Gyppes', NULL, 'Alaric', 'agyppes1z@illinois.edu', 'jE1_o2vy+l#6eH,', '[\"Utilisateur\"]'),
(73, 'Banton', NULL, 'Leonardo', 'lbanton20@4shared.com', 'qI6T`wC7', '[\"Utilisateur\"]'),
(74, 'Coughlan', NULL, 'Annecorinne', 'acoughlan21@mtv.com', 'mL9_DM_I{T)', '[\"Utilisateur\"]'),
(75, 'Jobin', NULL, 'Gianni', 'gjobin22@ed.gov', 'jT2.zP\"=sV', '[\"Organisateur\"]'),
(76, 'Rockwell', NULL, 'Xenos', 'xrockwell23@tuttocitta.it', 'wI7)qOU8u+uZ>}+', '[\"Utilisateur\"]'),
(77, 'Marconi', NULL, 'Rudd', 'rmarconi24@youtube.com', 'oF4_86yrrrz', '[\"Utilisateur\"]'),
(78, 'Robeiro', NULL, 'Puff', 'probeiro25@army.mil', 'oT9`N(JDAV\"+mK{', '[\"Utilisateur\"]'),
(79, 'Lutzmann', NULL, 'Robby', 'rlutzmann26@amazon.com', 'nL8|1Xir{', '[\"Utilisateur\"]'),
(80, 'Eyckel', NULL, 'Cass', 'ceyckel27@opera.com', 'nU7+pp<yW+bN$3IU', '[\"Administrateur\"]'),
(81, 'Algate', NULL, 'Shandra', 'salgate28@cocolog-nifty.com', 'jN0$e+f@l', '[\"Organisateur\"]'),
(82, 'Veillard', NULL, 'Gertruda', 'gveillard29@gnu.org', 'tH9,OPbD9V', '[\"Utilisateur\"]'),
(83, 'Hickin', NULL, 'Hildagard', 'hhickin2a@economist.com', 'kV2(x|(BHV@~YSy!', '[\"Organisateur\"]'),
(84, 'Issakov', NULL, 'Janith', 'jissakov2b@guardian.co.uk', 'aH4<7ZRcT', '[\"Organisateur\"]'),
(85, 'Tedahl', NULL, 'Roze', 'rtedahl2c@oakley.com', 'aJ9`\"plW~o\'k', '[\"Utilisateur\"]'),
(86, 'Matthewes', NULL, 'Agustin', 'amatthewes2d@de.vu', 'vU5|oNl<~K,&2od\"', '[\"Administrateur\"]'),
(87, 'Quaintance', NULL, 'Elysha', 'equaintance2e@ftc.gov', 'fT2)cm_P', '[\"Organisateur\"]'),
(88, 'Cattach', NULL, 'Phylys', 'pcattach2f@homestead.com', 'bJ0>VNPV7i', '[\"Utilisateur\"]'),
(89, 'Scarsbrook', NULL, 'Laverna', 'lscarsbrook2g@slashdot.org', 'lA9)66bn', '[\"Organisateur\"]'),
(90, 'Tunnicliff', NULL, 'Nowell', 'ntunnicliff2h@cloudflare.com', 'fD7<8Y#W/HLn<>', '[\"Utilisateur\"]'),
(91, 'Joska', NULL, 'Carmela', 'cjoska2i@wikispaces.com', 'jQ6~RB$X=JB5v', '[\"Utilisateur\"]'),
(92, 'Tregian', NULL, 'Isabel', 'itregian2j@guardian.co.uk', 'mT2&KVG+P', '[\"Administrateur\"]'),
(93, 'Whitcher', NULL, 'Nathanil', 'nwhitcher2k@jalbum.net', 'dV7}_zq5', '[\"Utilisateur\"]'),
(94, 'Kells', NULL, 'Pace', 'pkells2l@hostgator.com', 'aC2<=o_K\"jxr7\'Fa', '[\"Organisateur\"]'),
(95, 'Dymock', NULL, 'Shelly', 'sdymock2m@zimbio.com', 'pP6*zU&7/g&OD', '[\"Utilisateur\"]'),
(96, 'Redholls', NULL, 'Giustina', 'gredholls2n@e-recht24.de', 'eL4,OLmGQB._C\'k%', '[\"Administrateur\"]'),
(97, 'Bradick', NULL, 'Roddy', 'rbradick2o@netscape.com', 'hT1~bkT<3*t?$Jt.', '[\"Utilisateur\"]'),
(98, 'Ateridge', NULL, 'Adrianne', 'aateridge2p@buzzfeed.com', 'oI8<P9kWJZ.{0Re>', '[\"Administrateur\"]'),
(99, 'MacCaig', NULL, 'Nessi', 'nmaccaig2q@unicef.org', 'fP4<`)\"S20iu*', '[\"Organisateur\"]'),
(100, 'Izakoff', NULL, 'Valerie', 'vizakoff2r@businessinsider.com', 'eQ1{I*5,(D<', '[\"Administrateur\"]'),
(117, 'Wachter', NULL, 'Nina', 'ninaw4c@gmail.com', '$2y$10$VSugEqnRxZ8rz4rqx6WfOuzYDUwmYRPJGCIYv9MTtJ/yDoL9Lbzx.', '[\"Administrateur\"]'),
(118, 'Admin', 'Admin', 'Admin', 'admin@gmail.com', '$2y$10$YWap0a52qwDsNpluoE0NPedjm6mOcRpl2immsRQkAXKQk4AJhJR8y', '[\"Administrateur\", \"Utilisateur\", \"Organisateur\"]'),
(119, 'UtilOrga', 'UtilOrga', 'UtilOrga', 'UtilOrga@gmail.com', '$2y$10$C1M7tJJ1kHDo4sByOIc50Od9rQIrPN3uBtLZkzJgQC8V5MGUB.cJK', '[\"Organisateur\", \"Utilisateur\"]'),
(121, 'DeuxiemeOrga', 'DeuxiemeOrga', 'DeuxiemeOrga', 'DeuxiemeOrga@gmail.com', '$2y$10$51FCyEHsVodK0QQjgPSPd.6hgPX6UkQUW0ahrStSmLoMAswFo2VU6', '[\"Organisateur\"]'),
(122, 'DeuxiemeOrga', 'DeuxiemeOrga', 'DeuxiemeOrga', 'DeuxiemeOrga@gmail.com', '$2y$10$jdg1ZEjXVPtit5e/Lr5wB.pwz/CEsHe275.0Pn8kSjx/aQGdLGa5K', '[\"Organisateur\"]'),
(123, 'SANSORGA', NULL, 'SANSORGA', 'SANSORGA@gmail.com', '$2y$10$7gxyvb06S8bMzwHSrBOGIum565Lmno3LzS7JKCXFkLpa/7QLsDXie', '[\"Organisateur\"]'),
(124, 'Admin', 'SuperOrga', 'Admin', 'admin18@gmail.com', '$2y$10$ga4negfoWcHmjbJifTRhpeVHs4mgVLz9u3aCdjdl3Y9v2hnq1qH3G', '[\"Organisateur\"]');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `evenement`
--
ALTER TABLE `evenement`
  ADD CONSTRAINT `fk_idLieu` FOREIGN KEY (`idLieu`) REFERENCES `lieu` (`idLieu`),
  ADD CONSTRAINT `fk_idUtilisateur` FOREIGN KEY (`idUtilisateur`) REFERENCES `utilisateur` (`idUtilisateur`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `inscrire`
--
ALTER TABLE `inscrire`
  ADD CONSTRAINT `Inscrire_Evenement_FK` FOREIGN KEY (`idEvenement`) REFERENCES `evenement` (`idEvenement`),
  ADD CONSTRAINT `Inscrire_Utilisateur0_FK` FOREIGN KEY (`idUtilisateur`) REFERENCES `utilisateur` (`idUtilisateur`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
