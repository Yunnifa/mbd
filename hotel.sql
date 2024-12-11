
USE reservasi_final;

-- Membuat user database
CREATE USER 'admin_hotel'@'localhost' IDENTIFIED BY 'admin123';
GRANT EXECUTE ON reservasi_final.* TO 'admin_hotel'@'localhost';
FLUSH PRIVILEGES;


-- Tabel User
CREATE TABLE user (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user'
);

-- Tabel Kamar
create TABLE kamar (
    id_kamar INT AUTO_INCREMENT PRIMARY KEY,
    tipe_kamar enum('standar', 'deluxe', 'suite'),
    harga FLOAT NOT NULL,
    ketersediaan ENUM('tersedia', 'tidak tersedia') DEFAULT 'tersedia'
);

-- Tabel Reservasi
create TABLE reservasi (
    id_reservasi INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    id_kamar INT NOT NULL,
    tanggal_checkin DATETIME NOT NULL,
    tanggal_checkout DATETIME NOT NULL,
    status_reservasi ENUM('berhasil', 'gagal') DEFAULT 'gagal',
    status_pembayaran ENUM('lunas', 'belum bayar') DEFAULT 'belum bayar',
    FOREIGN KEY (id_user) REFERENCES user(id_user) ON DELETE CASCADE,
    FOREIGN KEY (id_kamar) REFERENCES kamar(id_kamar) ON DELETE CASCADE
);

set foreign_key_checks = 1;

-- Tabel Pembayaran
CREATE TABLE pembayaran (
    id_pembayaran INT AUTO_INCREMENT PRIMARY KEY,
    id_reservasi INT NOT NULL,
    total_tagihan FLOAT NOT NULL,
    tanggal_pembayaran DATETIME NOT NULL,
    FOREIGN KEY (id_reservasi) REFERENCES reservasi(id_reservasi) ON DELETE CASCADE
);

-- Tabel Feedback
CREATE TABLE feedback (
    id_feedback INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    id_kamar INT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    komentar TEXT,
    tanggal DATETIME NOT NULL,
    FOREIGN KEY (id_user) REFERENCES user(id_user) ON DELETE CASCADE,
    FOREIGN KEY (id_kamar) REFERENCES kamar(id_kamar) ON DELETE CASCADE
);


------------------------------------------------------------------------------------------

-- Prosedur untuk menambahkan pengguna
DELIMITER //
CREATE PROCEDURE register_user(
    IN _nama VARCHAR(100),
    IN _email VARCHAR(100),
    IN _password VARCHAR(100),
    IN _role ENUM('admin', 'user')
)
BEGIN
    -- Menangani error
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    -- Validasi input
    IF (_nama IS NULL OR LENGTH(_nama) < 1) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Nama tidak boleh kosong';
    END IF;

    IF (LENGTH(_email) < 5) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Email minimal 5 karakter';
    END IF;

    IF (LENGTH(_password) < 8) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Password minimal 8 karakter';
    END IF;

    -- Insert data ke tabel user
    INSERT INTO user (nama, email, password, role)
    VALUES (_nama, _email, SHA2(_password, 256), COALESCE(_role, 'user'));

    COMMIT;
END//
DELIMITER ;

SHOW CREATE TABLE user;


-- Prosedur untuk login pengguna
DELIMITER //
CREATE PROCEDURE login_user(
    IN _email VARCHAR(100),
    IN _password VARCHAR(100)
)
BEGIN
    -- Menangani error
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    -- Validasi input
    IF (LENGTH(COALESCE(_email, '')) < 5) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Email minimal 5 karakter';
    END IF;

    IF (LENGTH(_password) < 8) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Password minimal 8 karakter';
    END IF;

    -- Validasi Login
    IF NOT EXISTS (
        SELECT 1 FROM user 
        WHERE email = _email AND password = SHA2(_password, 256)
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Email atau password salah';
    END IF;

    -- Menampilkan data pengguna
    SELECT id_user, nama, email, role
    FROM user
    WHERE email = _email AND password = SHA2(_password, 256);

    COMMIT;
END//
DELIMITER ;

-- Prosedur untuk mengedit pengguna
DELIMITER //
CREATE PROCEDURE edit_user(
    IN _id_user INT,
    IN _nama VARCHAR(100),
    IN _email VARCHAR(100),
    IN _password VARCHAR(100),
    IN _role ENUM('admin', 'user')
)
BEGIN
    -- Menangani error
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    -- Update data pengguna
    UPDATE user
    SET 
        nama = COALESCE(_nama, nama),
        email = COALESCE(_email, email),
        password = COALESCE(SHA2(_password, 256), password),
        role = COALESCE(_role, role)
    WHERE id_user = _id_user;

    -- Menampilkan hasil update
    SELECT id_user, nama, email, role
    FROM user
    WHERE id_user = _id_user;

    COMMIT;
END//
DELIMITER ;

-- Prosedur untuk menghapus pengguna
DELIMITER //
CREATE PROCEDURE delete_user(
    IN _id_user INT
)
BEGIN
    -- Menangani error
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    -- Hapus data pengguna
    DELETE FROM user
    WHERE id_user = _id_user;

    COMMIT;
END//
DELIMITER ;

-- Prosedur untuk mendapatkan semua pengguna
DELIMITER //
CREATE PROCEDURE get_all_users()
BEGIN
    -- Menangani error
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    -- Mengambil semua data pengguna
    SELECT id_user, nama, email, role
    FROM user;

    COMMIT;
END//
DELIMITER ;

-- Prosedur untuk mendapatkan pengguna berdasarkan ID
DELIMITER //
CREATE PROCEDURE get_user_by_id(
    IN _id_user INT
)
BEGIN
    -- Menangani error
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    -- Mengambil data pengguna berdasarkan id_user
    SELECT id_user, nama, email, role
    FROM user
    WHERE id_user = _id_user;

    COMMIT;
END//
DELIMITER ;

----------------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE get_all_kamar()
BEGIN
    -- Menangani error
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    -- Mengambil semua data kamar
    SELECT id_kamar, tipe_kamar, harga, ketersediaan
    FROM kamar;

    COMMIT;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE get_kamar_by_id(IN _id_kamar INT)
BEGIN
    -- Menangani error
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    -- Mengambil data kamar berdasarkan id_kamar
    SELECT id_kamar, tipe_kamar, harga, ketersediaan
    FROM kamar
    WHERE id_kamar = _id_kamar;

    COMMIT;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE add_kamar(
    IN _tipe_kamar ENUM('standar', 'deluxe', 'suite'),
    IN _harga FLOAT,
    IN _ketersediaan ENUM('tersedia', 'tidak tersedia')
)
BEGIN
    -- Menangani error
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    -- Menambahkan kamar baru
    INSERT INTO kamar (tipe_kamar, harga, ketersediaan)
    VALUES (_tipe_kamar, _harga, COALESCE(_ketersediaan, 'tersedia'));

    COMMIT;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE edit_kamar(
    IN _id_kamar INT,
    IN _tipe_kamar ENUM('standar', 'deluxe', 'suite'),
    IN _harga FLOAT,
    IN _ketersediaan ENUM('tersedia', 'tidak tersedia')
)
BEGIN
    -- Menangani error
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    -- Mengupdate data kamar berdasarkan id_kamar
    UPDATE kamar
    SET 
        tipe_kamar = COALESCE(_tipe_kamar, tipe_kamar),
        harga = COALESCE(_harga, harga),
        ketersediaan = COALESCE(_ketersediaan, ketersediaan)
    WHERE id_kamar = _id_kamar;

    COMMIT;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE delete_kamar(IN _id_kamar INT)
BEGIN
    -- Menangani error
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    -- Menghapus kamar berdasarkan id_kamar
    DELETE FROM kamar
    WHERE id_kamar = _id_kamar;

    COMMIT;
END//
DELIMITER ;

DELIMITER //

CREATE PROCEDURE searchKamarByTipe(IN tipe ENUM('standar', 'deluxe', 'suite'))
BEGIN
    -- Handler untuk rollback jika terjadi error
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Terjadi kesalahan saat melakukan pencarian kamar.';
    END;

    -- Mulai transaksi
    START TRANSACTION;

    BEGIN
        -- Query untuk mencari kamar berdasarkan tipe_kamar
        SELECT id_kamar, tipe_kamar, harga, ketersediaan
        FROM kamar
        WHERE tipe_kamar = tipe AND ketersediaan = 'tersedia';

        -- Jika berhasil, commit transaksi
        COMMIT;
    END;
END //

DELIMITER ;

-------------------------------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE add_reservasi(
    IN _id_user INT,
    IN _id_kamar INT,
    IN _tanggal_checkin DATETIME,
    IN _tanggal_checkout DATETIME
)
BEGIN
    -- Menangani error
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    -- Menambahkan reservasi baru
    INSERT INTO reservasi (id_user, id_kamar, tanggal_checkin, tanggal_checkout)
    VALUES (_id_user, _id_kamar, _tanggal_checkin, _tanggal_checkout);

    COMMIT;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE edit_reservasi(
    IN _id_reservasi INT,
    IN _id_kamar INT,
    IN _tanggal_checkin DATETIME,
    IN _tanggal_checkout DATETIME
)
BEGIN
    -- Menangani error
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    -- Mengupdate detail reservasi berdasarkan id_reservasi
    UPDATE reservasi
    SET 
        id_kamar = COALESCE(_id_kamar, id_kamar),
        tanggal_checkin = COALESCE(_tanggal_checkin, tanggal_checkin),
        tanggal_checkout = COALESCE(_tanggal_checkout, tanggal_checkout)
    WHERE id_reservasi = _id_reservasi;

    COMMIT;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE cancel_reservasi(
    IN _id_reservasi INT
)
BEGIN
    -- Menangani error
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    -- Membatalkan reservasi dengan mengubah status ke 'gagal'
    UPDATE reservasi
    SET status_reservasi = 'gagal'
    WHERE id_reservasi = _id_reservasi;

    COMMIT;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE delete_reservasi(
    IN _id_reservasi INT
)
BEGIN
    -- Menangani error
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    -- Menghapus reservasi berdasarkan id_reservasi
    DELETE FROM reservasi
    WHERE id_reservasi = _id_reservasi;

    COMMIT;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE get_all_reservasi()
BEGIN
    -- Menangani error
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    -- Mengambil semua data reservasi
    SELECT id_reservasi, id_user, id_kamar, tanggal_checkin, tanggal_checkout, status_reservasi, status_pembayaran
    FROM reservasi;

    COMMIT;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE get_reservasi_by_id(
    IN _id_reservasi INT
)
BEGIN
    -- Menangani error
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    -- Mengambil data reservasi berdasarkan id_reservasi
    SELECT id_reservasi, id_user, id_kamar, tanggal_checkin, tanggal_checkout, status_reservasi, status_pembayaran
    FROM reservasi
    WHERE id_reservasi = _id_reservasi;

    COMMIT;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE get_reservasi_by_user(
    IN _nama_user VARCHAR(100)
)
BEGIN
    -- Menangani error
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    -- Mengambil data reservasi berdasarkan nama user
    SELECT r.id_reservasi, r.id_user, r.id_kamar, r.tanggal_checkin, r.tanggal_checkout, r.status_reservasi, r.status_pembayaran
    FROM reservasi r
    JOIN user u ON r.id_user = u.id_user
    WHERE u.nama = _nama_user;

    COMMIT;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE update_status_reservasi(
    IN _id_reservasi INT,
    IN _status_reservasi ENUM('berhasil', 'gagal')
)
BEGIN
    -- Menangani error
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    -- Mengupdate status reservasi untuk admin
    UPDATE reservasi
    SET status_reservasi = _status_reservasi
    WHERE id_reservasi = _id_reservasi;

    COMMIT;
END//
DELIMITER ;


------------------------------------------------------------------------------------------


DELIMITER //
CREATE PROCEDURE add_pembayaran(
    IN _id_reservasi INT,
    IN _total_tagihan FLOAT,
    IN _tanggal_pembayaran DATETIME
)
BEGIN
    -- Menangani error
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    -- Menambahkan pembayaran baru
    INSERT INTO pembayaran (id_reservasi, total_tagihan, tanggal_pembayaran)
    VALUES (_id_reservasi, _total_tagihan, _tanggal_pembayaran);

    COMMIT;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE get_all_pembayaran()
BEGIN
    -- Menangani error
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    -- Mengambil semua data pembayaran
    SELECT id_pembayaran, id_reservasi, total_tagihan, tanggal_pembayaran
    FROM pembayaran;

    COMMIT;
END//
DELIMITER ;


DELIMITER //
CREATE PROCEDURE get_pembayaran_by_id(
    IN _id_pembayaran INT
)
BEGIN
    -- Menangani error
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    -- Mengambil data pembayaran berdasarkan id_pembayaran
    SELECT id_pembayaran, id_reservasi, total_tagihan, tanggal_pembayaran
    FROM pembayaran
    WHERE id_pembayaran = _id_pembayaran;

    COMMIT;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE delete_pembayaran(
    IN _id_pembayaran INT
)
BEGIN
    -- Menangani error
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    -- Menghapus pembayaran berdasarkan id_pembayaran
    DELETE FROM pembayaran
    WHERE id_pembayaran = _id_pembayaran;

    COMMIT;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE edit_pembayaran(
    IN _id_pembayaran INT,
    IN _total_tagihan FLOAT,
    IN _tanggal_pembayaran DATETIME
)
BEGIN
    -- Menangani error
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    -- Mengupdate detail pembayaran berdasarkan id_pembayaran
    UPDATE pembayaran
    SET
        total_tagihan = COALESCE(_total_tagihan, total_tagihan),
        tanggal_pembayaran = COALESCE(_tanggal_pembayaran, tanggal_pembayaran)
    WHERE id_pembayaran = _id_pembayaran;

    COMMIT;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE get_pembayaran_by_name(
    IN _nama_user VARCHAR(100)
)
BEGIN
    -- Menangani error
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    -- Mengambil data pembayaran berdasarkan nama user
    SELECT p.id_pembayaran, p.id_reservasi, p.total_tagihan, p.tanggal_pembayaran
    FROM pembayaran p
    JOIN reservasi r ON p.id_reservasi = r.id_reservasi
    JOIN user u ON r.id_user = u.id_user
    WHERE u.nama = _nama_user;

    COMMIT;
END//
DELIMITER ;

-------------------------------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE add_feedback(
    IN _id_user INT,
    IN _id_kamar INT,
    IN _rating INT,
    IN _komentar TEXT,
    IN _tanggal DATETIME
)
BEGIN
    -- Menangani error
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    -- Memastikan rating valid antara 1 hingga 5
    IF _rating < 1 OR _rating > 5 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Rating harus antara 1 dan 5';
    END IF;

    -- Menambahkan feedback ke tabel feedback
    INSERT INTO feedback (id_user, id_kamar, rating, komentar, tanggal)
    VALUES (_id_user, _id_kamar, _rating, _komentar, _tanggal);

    COMMIT;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE edit_feedback(
    IN _id_feedback INT,
    IN _rating INT,
    IN _komentar TEXT
)
BEGIN
    -- Menangani error
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    -- Mengupdate feedback berdasarkan id_feedback
    UPDATE feedback
    SET
        rating = COALESCE(_rating, rating),
        komentar = COALESCE(_komentar, komentar)
    WHERE id_feedback = _id_feedback;

    COMMIT;
END//
DELIMITER ;


DELIMITER //
CREATE PROCEDURE get_all_feedback()
BEGIN
    -- Menangani error
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    -- Mengambil semua data feedback
    SELECT id_feedback, id_user, id_kamar, rating, komentar, tanggal
    FROM feedback;

    COMMIT;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE get_feedback_by_id(
    IN _id_feedback INT
)
BEGIN
    -- Menangani error
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    -- Mengambil data feedback berdasarkan id_feedback
    SELECT id_feedback, id_user, id_kamar, rating, komentar, tanggal
    FROM feedback
    WHERE id_feedback = _id_feedback;

    COMMIT;
END//
DELIMITER ;


DELIMITER //
CREATE PROCEDURE get_feedback_by_name(
    IN _nama_user VARCHAR(100)
)
BEGIN
    -- Menangani error
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    -- Mengambil data feedback berdasarkan nama pengguna
    SELECT f.id_feedback, f.id_user, f.id_kamar, f.rating, f.komentar, f.tanggal
    FROM feedback f
    JOIN user u ON f.id_user = u.id_user
    WHERE u.nama = _nama_user;

    COMMIT;
END//
DELIMITER ;


DELIMITER //
CREATE PROCEDURE delete_feedback(
    IN _id_feedback INT
)
BEGIN
    -- Menangani error
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    -- Menghapus feedback berdasarkan id_feedback
    DELETE FROM feedback
    WHERE id_feedback = _id_feedback;

    COMMIT;
END//
DELIMITER ;
-------------------------------------------------------------------------------------------------

DELIMITER //
CREATE TRIGGER trigger_update_status_pembayaran
AFTER INSERT ON pembayaran
FOR EACH ROW
BEGIN
    -- Mengupdate status_pembayaran menjadi 'lunas' di tabel reservasi
    UPDATE reservasi
    SET status_pembayaran = 'lunas'
    WHERE id_reservasi = NEW.id_reservasi;
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER trigger_update_ketersediaan_kamar
AFTER DELETE ON reservasi
FOR EACH ROW
BEGIN
    -- Mengupdate ketersediaan kamar menjadi 'tersedia' berdasarkan id_kamar
    UPDATE kamar
    SET ketersediaan = 'tersedia'
    WHERE id_kamar = OLD.id_kamar;
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER trigger_delete_feedback
AFTER DELETE ON user
FOR EACH ROW
BEGIN
    -- Menghapus data di tabel feedback yang terkait dengan user yang dihapus
    DELETE FROM feedback
    WHERE id_user = OLD.id_user;
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER trigger_delete_feedback_on_kamar
AFTER DELETE ON kamar
FOR EACH ROW
BEGIN
    -- Menghapus data di tabel feedback yang terkait dengan kamar yang dihapus
    DELETE FROM feedback
    WHERE id_kamar = OLD.id_kamar;
END;
//
DELIMITER ;

-------------------------------------------------------------------------------------------------
CREATE VIEW view_ketersediaan_kamar AS
SELECT 
    k.tipe_kamar AS tipe_kamar,
    COUNT(k.id_kamar) AS jumlah_kamar,
    SUM(CASE WHEN k.ketersediaan = 'tersedia' THEN 1 ELSE 0 END) AS jumlah_tersedia,
    SUM(CASE WHEN k.ketersediaan = 'tidak tersedia' THEN 1 ELSE 0 END) AS jumlah_terisi
FROM 
    kamar k
GROUP BY 
    k.tipe_kamar;

DELIMITER //

CREATE PROCEDURE CreateViewKetersediaanKamar()
begin
	    -- Jika terjadi error, rollback
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Terjadi kesalahan saat membuat view.';
    END;
    -- Mulai transaksi
    START TRANSACTION;

    BEGIN
		select * from view_ketersediaan_kamar;

        -- Jika sukses, lakukan commit
        COMMIT;
    END;
end//

DELIMITER ;   

CREATE VIEW view_feedback_user AS
SELECT 
    u.nama AS nama_user,
    f.id_feedback,
    f.id_kamar,
    f.rating,
    f.komentar,
    f.tanggal
FROM 
    feedback f
JOIN 
    user u ON f.id_user = u.id_user;
   
DELIMITER //

CREATE PROCEDURE CreateViewFeedbackUser()
begin
	-- Jika terjadi error, rollback
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Terjadi kesalahan saat membuat view.';
    END;
	-- Mulai transaksi
    START TRANSACTION;

    BEGIN
		select * from view_feedback_user;

        -- Jika berhasil, lakukan commit
        COMMIT;
       END;
END //

DELIMITER ;
   

CREATE VIEW view_reservasi_user AS
SELECT 
    u.id_user,
    u.nama AS nama_user,
    r.id_reservasi,
    r.id_kamar,
    r.tanggal_checkin,
    r.tanggal_checkout,
    r.status_reservasi,
    r.status_pembayaran
FROM 
    reservasi r
JOIN 
    user u ON r.id_user = u.id_user;
   
DELIMITER //

CREATE PROCEDURE CreateViewReservasiUser()
begin
	-- Jika terjadi error, rollback
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Terjadi kesalahan saat membuat view.';
    END;
    -- Mulai transaksi
    START TRANSACTION;

    BEGIN
		select * from view_reservasi_user;
        -- Jika berhasil, lakukan commit
        COMMIT;
    END;
END //

DELIMITER ;

   
CREATE VIEW view_total_pendapatan AS
SELECT 
    DATE(p.tanggal_pembayaran) AS tanggal,
    SUM(p.total_tagihan) AS total_pendapatan
FROM 
    pembayaran p
JOIN 
    reservasi r ON p.id_reservasi = r.id_reservasi
WHERE 
    r.status_reservasi = 'berhasil' -- Hanya reservasi yang berhasil
    AND r.status_pembayaran = 'lunas' -- Hanya yang sudah lunas
GROUP BY 
    DATE(p.tanggal_pembayaran);

select * from view_total_pendapatan;

CREATE OR REPLACE VIEW view_total_kamar_per_tipe AS
SELECT 
    k.tipe_kamar, 
    COUNT(k.id_kamar) AS total_kamar
FROM 
    kamar k
WHERE 
    k.ketersediaan = 'tersedia' -- Hanya kamar yang tersedia
GROUP BY 
    k.tipe_kamar;

select * from view_total_kamar_per_tipe;

   
DELIMITER //

DELIMITER //

CREATE PROCEDURE getTotalPendapatan()
BEGIN
    -- Handler untuk rollback jika terjadi error
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Terjadi kesalahan saat mengambil data dari view_total_pendapatan.';
    END;

    -- Mulai transaksi
    START TRANSACTION;

    BEGIN
        -- Ambil data dari view_total_pendapatan
        SELECT 
            tanggal, 
            total_pendapatan 
        FROM 
            view_total_pendapatan;

        -- Jika berhasil, commit transaksi
        COMMIT;
    END;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE getTotalKamarPerTipe()
BEGIN
    -- Handler untuk rollback jika terjadi error
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Terjadi kesalahan saat mengambil data dari view_total_kamar_per_tipe.';
    END;

    -- Mulai transaksi
    START TRANSACTION;

    BEGIN
        -- Ambil data dari view_total_kamar_per_tipe
		select * from view_total_kamar_per_tipe;

        -- Jika berhasil, commit transaksi
        COMMIT;
    END;
END //

DELIMITER ;



DELIMITER //

CREATE TRIGGER update_ketersediaan_kamar
AFTER INSERT ON reservasi
FOR EACH ROW
BEGIN
    -- Update ketersediaan kamar menjadi 'tidak tersedia'
    UPDATE kamar
    SET ketersediaan = 'tidak tersedia'
    WHERE id_kamar = NEW.id_kamar;
END//

DELIMITER ;

DELIMITER //
-- Fungsi untuk menghitung total pendapatan berdasarkan tanggal tertentu
CREATE FUNCTION hitung_total_pendapatan(tanggal DATE) 
RETURNS FLOAT
DETERMINISTIC
BEGIN
    DECLARE total FLOAT;
    
    -- Hitung total pendapatan
    SELECT SUM(total_tagihan) INTO total
    FROM pembayaran
    WHERE DATE(tanggal_pembayaran) = tanggal;

    -- Kembalikan nilai total pendapatan
    RETURN total;
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE getTotalPendapatanByDate(IN tanggal_pembayaran DATE)
BEGIN
    -- Handler untuk rollback jika terjadi error
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Terjadi kesalahan saat menghitung total pendapatan.';
    END;

    -- Mulai transaksi
    START TRANSACTION;

    BEGIN
        -- Panggil fungsi hitung_total_pendapatan untuk menghitung total pendapatan pada tanggal tertentu
        SELECT hitung_total_pendapatan(tanggal_pembayaran) AS total_pendapatan;

        -- Jika berhasil, commit transaksi
        COMMIT;
    END;
END //
DELIMITER ;

