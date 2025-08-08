-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versi server:                 10.4.32-MariaDB - mariadb.org binary distribution
-- OS Server:                    Win64
-- HeidiSQL Versi:               12.11.0.7065
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Membuang struktur basisdata untuk db_santunan
CREATE DATABASE IF NOT EXISTS `db_santunan` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `db_santunan`;

-- membuang struktur untuk table db_santunan.data_anak
CREATE TABLE IF NOT EXISTS `data_anak` (
  `id_anak` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `id_admin` int(11) unsigned DEFAULT NULL,
  `id_relawan` int(11) unsigned DEFAULT NULL,
  `nama_lengkap` varchar(100) DEFAULT NULL,
  `tempat_tanggallahir` varchar(100) DEFAULT NULL,
  `jenis_kelamin` enum('laki - laki','perempuan') DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `asal_sekolah` varchar(255) DEFAULT NULL,
  `nama_pendamping` varchar(100) DEFAULT NULL,
  `no_pendamping` varchar(15) DEFAULT NULL,
  `nama_wali` varchar(100) DEFAULT NULL,
  `alamat_wali` text DEFAULT NULL,
  `foto_kk` varchar(255) DEFAULT NULL,
  `surat_kematian` varchar(255) DEFAULT NULL,
  `status` enum('anak yatim','anak piatu') DEFAULT NULL,
  `nama_pengaju` varchar(100) DEFAULT NULL,
  `no_pengaju` varchar(15) DEFAULT NULL,
  `no_rekening` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_anak`),
  KEY `id_admin` (`id_admin`),
  KEY `id_relawan` (`id_relawan`),
  CONSTRAINT `FK_data_anak_tabel_admin` FOREIGN KEY (`id_admin`) REFERENCES `tabel_admin` (`id_admin`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_data_anak_tabel_relawan` FOREIGN KEY (`id_relawan`) REFERENCES `tabel_relawan` (`id_relawan`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Pengeluaran data tidak dipilih.

-- membuang struktur untuk table db_santunan.dokumentasi
CREATE TABLE IF NOT EXISTS `dokumentasi` (
  `id_dokumentasi` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `id_user` int(11) unsigned DEFAULT NULL,
  `id_admin` int(11) unsigned DEFAULT NULL,
  `id_relawan` int(11) unsigned DEFAULT NULL,
  `tanggal` date DEFAULT NULL,
  `tempat` varchar(255) DEFAULT NULL,
  `nominal` decimal(20,6) DEFAULT NULL,
  `upload_foto` varchar(255) DEFAULT NULL,
  `keterangan` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_dokumentasi`),
  KEY `id_user` (`id_user`),
  KEY `id_admin` (`id_admin`),
  KEY `id_relawan` (`id_relawan`),
  CONSTRAINT `FK_dokumentasi_tabel_admin` FOREIGN KEY (`id_admin`) REFERENCES `tabel_admin` (`id_admin`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_dokumentasi_tabel_user` FOREIGN KEY (`id_user`) REFERENCES `tabel_user` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Pengeluaran data tidak dipilih.

-- membuang struktur untuk table db_santunan.komentar_artikel
CREATE TABLE IF NOT EXISTS `komentar_artikel` (
  `id_komentar` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `id_artikel` int(11) unsigned DEFAULT NULL,
  `id_user` int(11) unsigned DEFAULT NULL,
  `tanggal` date DEFAULT NULL,
  `text` text DEFAULT NULL,
  PRIMARY KEY (`id_komentar`),
  KEY `id_artikel` (`id_artikel`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `FK__tabel_user` FOREIGN KEY (`id_user`) REFERENCES `tabel_user` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK__upload_artikel` FOREIGN KEY (`id_artikel`) REFERENCES `upload_artikel` (`id_artikel`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Pengeluaran data tidak dipilih.

-- membuang struktur untuk table db_santunan.laporan_donasi
CREATE TABLE IF NOT EXISTS `laporan_donasi` (
  `id_laporan` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `id_admin` int(11) unsigned DEFAULT NULL,
  `id_relawan` int(11) unsigned DEFAULT NULL,
  `total_donasi` decimal(15,2) DEFAULT NULL,
  `jumlah_anak` int(5) DEFAULT NULL,
  `jumlah_penyalur` int(5) DEFAULT NULL,
  PRIMARY KEY (`id_laporan`),
  KEY `id_admin` (`id_admin`),
  KEY `id_relawan` (`id_relawan`),
  CONSTRAINT `FK_laporan_donasi_tabel_admin` FOREIGN KEY (`id_admin`) REFERENCES `tabel_admin` (`id_admin`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_laporan_donasi_tabel_relawan` FOREIGN KEY (`id_relawan`) REFERENCES `tabel_relawan` (`id_relawan`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Pengeluaran data tidak dipilih.

-- membuang struktur untuk table db_santunan.notifikasi
CREATE TABLE IF NOT EXISTS `notifikasi` (
  `id_notifikasi` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `id_penerima` int(11) DEFAULT NULL,
  `jenis_penerima` enum('admin','relawan','user') DEFAULT NULL,
  `judul` varchar(255) DEFAULT NULL,
  `pesan` text DEFAULT NULL,
  `tipe_notifikasi` enum('informasi','peringatan','transaksi') DEFAULT NULL,
  `status_baca` tinyint(1) DEFAULT NULL,
  `tanggal_dibuat` datetime DEFAULT NULL,
  `tanggal_dibaca` datetime DEFAULT NULL,
  PRIMARY KEY (`id_notifikasi`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Pengeluaran data tidak dipilih.

-- membuang struktur untuk table db_santunan.pengajuan_anak
CREATE TABLE IF NOT EXISTS `pengajuan_anak` (
  `id_pengaju` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `id_user` int(11) unsigned DEFAULT NULL,
  `nama_anak` varchar(100) DEFAULT NULL,
  `status` enum('anak yatim','anak piatu') DEFAULT NULL,
  `tempat_tanggallahir` varchar(100) DEFAULT NULL,
  `jenis_kelamin` enum('laki - laki','perempuan') DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `nama_pendamping` varchar(100) DEFAULT NULL,
  `no_pendamping` varchar(15) DEFAULT NULL,
  `asal_sekolah` varchar(255) DEFAULT NULL,
  `nama_wali` varchar(100) DEFAULT NULL,
  `alamat_wali` text DEFAULT NULL,
  `foto_kk` varchar(255) DEFAULT NULL,
  `surat_kematian` varchar(255) DEFAULT NULL,
  `nama_pengaju` varchar(100) DEFAULT NULL,
  `no_pengaju` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id_pengaju`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `FK_pengajuan_anak_tabel_user` FOREIGN KEY (`id_user`) REFERENCES `tabel_user` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Pengeluaran data tidak dipilih.

-- membuang struktur untuk table db_santunan.rekap_penyalur
CREATE TABLE IF NOT EXISTS `rekap_penyalur` (
  `id_penyalur` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `id_admin` int(11) unsigned DEFAULT NULL,
  `id_relawan` int(11) unsigned DEFAULT NULL,
  `id_user` int(11) unsigned DEFAULT NULL,
  `tanggal` date DEFAULT NULL,
  `nama_anak` varchar(100) DEFAULT NULL,
  `donasi_masuk` decimal(20,6) DEFAULT NULL,
  `donasi_keluar` decimal(20,6) DEFAULT NULL,
  `nama_penyalur` varchar(100) DEFAULT NULL,
  `no_rekening` varchar(30) DEFAULT NULL,
  `bukti_tasaruf` varchar(255) DEFAULT NULL,
  `status` enum('berhasil','gagal') DEFAULT NULL,
  PRIMARY KEY (`id_penyalur`),
  KEY `id_admin` (`id_admin`),
  KEY `id_relawan` (`id_relawan`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `FK_penyalur_rekap_tabel_admin` FOREIGN KEY (`id_admin`) REFERENCES `tabel_admin` (`id_admin`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_penyalur_rekap_tabel_relawan` FOREIGN KEY (`id_relawan`) REFERENCES `tabel_relawan` (`id_relawan`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_penyalur_rekap_tabel_user` FOREIGN KEY (`id_user`) REFERENCES `tabel_user` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Pengeluaran data tidak dipilih.

-- membuang struktur untuk table db_santunan.tabel_admin
CREATE TABLE IF NOT EXISTS `tabel_admin` (
  `id_admin` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `foto_profil` varchar(255) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `status` enum('aktif','tidak aktif') DEFAULT NULL,
  `terakhir_login` datetime DEFAULT NULL,
  PRIMARY KEY (`id_admin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Pengeluaran data tidak dipilih.

-- membuang struktur untuk table db_santunan.tabel_relawan
CREATE TABLE IF NOT EXISTS `tabel_relawan` (
  `id_relawan` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `foto_profil` varchar(255) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_relawan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Pengeluaran data tidak dipilih.

-- membuang struktur untuk table db_santunan.tabel_user
CREATE TABLE IF NOT EXISTS `tabel_user` (
  `id_user` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `foto_profil` varchar(255) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Pengeluaran data tidak dipilih.

-- membuang struktur untuk table db_santunan.tb_donasi
CREATE TABLE IF NOT EXISTS `tb_donasi` (
  `id_donasi` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `id_user` int(11) unsigned DEFAULT NULL,
  `nama_donasi` varchar(100) DEFAULT NULL,
  `tanggal` date DEFAULT NULL,
  `nominal` decimal(12,2) DEFAULT NULL,
  `metode` enum('Y','N') DEFAULT NULL,
  `jenis_donasi` enum('urgensi','umum') DEFAULT NULL,
  `status` enum('berhasil','gagal') DEFAULT NULL,
  `pesan` text DEFAULT NULL,
  PRIMARY KEY (`id_donasi`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `FK_tb_donasi_tabel_user` FOREIGN KEY (`id_user`) REFERENCES `tabel_user` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Pengeluaran data tidak dipilih.

-- membuang struktur untuk table db_santunan.upload_artikel
CREATE TABLE IF NOT EXISTS `upload_artikel` (
  `id_artikel` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `id_admin` int(11) unsigned DEFAULT NULL,
  `jenis` enum('umum','urgensi') DEFAULT NULL,
  `tanggal` datetime DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `text` text DEFAULT NULL,
  `dana_terkumpul` decimal(20,6) DEFAULT NULL,
  `target_dana` decimal(20,6) DEFAULT NULL,
  PRIMARY KEY (`id_artikel`),
  KEY `id_admin` (`id_admin`),
  CONSTRAINT `FK_upload_artikel_tabel_admin` FOREIGN KEY (`id_admin`) REFERENCES `tabel_admin` (`id_admin`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Pengeluaran data tidak dipilih.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
