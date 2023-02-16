CREATE TABLE device
(
    device_id VARCHAR(100) UNIQUE NOT NULL,
    device_name VARCHAR(100) NOT NULL,
    device_type VARCHAR(50) NOT NULL,
    ip_address VARCHAR(20) NOT NULL
);

CREATE TABLE session
(
    session_id VARCHAR(100) UNIQUE NOT NULL PRIMARY KEY,
    device_id VARCHAR(100) NOT NULL REFERENCES device(device_id) ON DELETE CASCADE ON UPDATE CASCADE,
    user_id UUID NOT NULL,
    sign_in DATE NOT NULL,
    expire_at DATE NOT NULL
);

CREATE TABLE recovery
(
    recovery_id VARCHAR(100) NOT NULL PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL,
    expire_at DATE NOT NULL,
    confirm_at DATE,
    create_at DATE NOT NULL
);

CREATE TABLE confirm
(
    confirm_id VARCHAR(100) UNIQUE NOT NULL PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL,
    expire_at DATE NOT NULL,
    confirm_at DATE,
    create_at DATE NOT NULL
);

