CREATE TABLE role
(
    role_id SERIAL NOT NULL PRIMARY KEY UNIQUE,
    role_name VARCHAR(30) NOT NULL
);

CREATE TABLE image
(
    image_id UUID NOT NULL PRIMARY KEY UNIQUE,
    content_type VARCHAR(30) NOT NULL,
    data BYTEA NOT NULL,
    image_name VARCHAR(100) NOT NULL,
    image_size BIGINT NOT NULL
);

CREATE TABLE sd_user_info
(
    info_id SERIAL NOT NULL PRIMARY KEY,
    text TEXT DEFAULT NULL,
    contact TEXT DEFAULT NULL
);

CREATE TABLE sd_user
(
    user_id UUID NOT NULL PRIMARY KEY UNIQUE,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    email VARCHAR(100) NOT NULL,
    nickname VARCHAR(100) NOT NULL,
    is_enabled BOOLEAN NOT NULL,
    is_blocked BOOLEAN NOT NULL,
    info_id INT REFERENCES sd_user_info(info_id) ON DELETE CASCADE ON UPDATE CASCADE,
    avatar_id UUID REFERENCES image(image_id) ON DELETE CASCADE ON UPDATE CASCADE DEFAULT NULL
);

CREATE TABLE sd_role_user
(
    role_id INT NOT NULL REFERENCES role(role_id) ON DELETE CASCADE ON UPDATE CASCADE ,
    user_id UUID NOT NULL REFERENCES sd_user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT user_role_pkey PRIMARY KEY(user_id,role_id)
);