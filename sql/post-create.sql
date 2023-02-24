CREATE TABLE fandom
(
    fandom_id UUID UNIQUE NOT NULL PRIMARY KEY,
    fandom_name VARCHAR(100) UNIQUE  NOT NULL
);

CREATE TABLE collection
(
    collection_id UUID UNIQUE NOT NULL PRIMARY KEY,
    user_id UUID NOT NULL,
    collection_name VARCHAR(100) NOT NULL,
    is_hidden BOOLEAN NOT NULL
);

CREATE TABLE paring
(
    paring_id UUID UNIQUE NOT NULL PRIMARY KEY,
    paring_name VARCHAR(100) NOT NULL
);

CREATE TABLE character
(
    character_id UUID UNIQUE NOT NULL PRIMARY KEY,
    character_name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE status
(
    status_id UUID UNIQUE NOT NULL PRIMARY KEY,
    status_name VARCHAR(100) UNIQUE  NOT NULL
);

CREATE TABLE genre
(
    genre_id UUID UNIQUE NOT NULL PRIMARY KEY,
    genre_name VARCHAR(100) UNIQUE  NOT NULL
);

CREATE TABLE post
(
    post_id UUID UNIQUE NOT NULL PRIMARY KEY,
    user_id UUID NOT NULL,
    post_name VARCHAR(100) NOT NULL,
    description TEXT,
    dedication VARCHAR(255),
    date_of_creation TIMESTAMP NOT NULL,
    is_hidden BOOLEAN NOT NULL,
    is_hidden_admin BOOLEAN NOT NULL,
    status_id UUID NOT NULL REFERENCES status(status_id) ON DELETE CASCADE
);

CREATE TABLE chapter
(
    chapter_id UUID NOT NULL PRIMARY KEY,
    post_id UUID NOT NULL REFERENCES post(post_id) ON DELETE CASCADE,
    notes TEXT,
    text TEXT NOT NULL,
    number INT NOT NULL,
    date_of_creation TIMESTAMP NOT NULL
);

CREATE TABLE fandom_post
(
    fandom_id UUID NOT NULL REFERENCES fandom(fandom_id) ON DELETE CASCADE ON UPDATE CASCADE ,
    post_id UUID NOT NULL REFERENCES post(post_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fandom_post_pkey PRIMARY KEY(fandom_id, post_id)
);

CREATE TABLE collection_post
(
    collection_id UUID NOT NULL REFERENCES collection(collection_id) ON DELETE CASCADE ON UPDATE CASCADE ,
    post_id UUID NOT NULL REFERENCES post(post_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT post_collection_pkey PRIMARY KEY(collection_id, post_id)
);

CREATE TABLE paring_post
(
    post_id UUID NOT NULL REFERENCES post(post_id) ON DELETE CASCADE ON UPDATE CASCADE ,
    paring_id UUID NOT NULL REFERENCES paring(paring_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT post_paring_pkey PRIMARY KEY(post_id, paring_id)
);

CREATE TABLE character_paring
(
    character_id UUID NOT NULL REFERENCES character(character_id) ON DELETE CASCADE ON UPDATE CASCADE,
    paring_id UUID NOT NULL REFERENCES paring(paring_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT character_paring_pkey PRIMARY KEY(character_id, paring_id)
);

CREATE TABLE character_post
(
    character_id UUID NOT NULL REFERENCES character(character_id) ON DELETE CASCADE ON UPDATE CASCADE,
    post_id UUID NOT NULL REFERENCES post(post_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT character_post_pkey PRIMARY KEY(character_id, post_id)
);

CREATE TABLE age
(
    age_id UUID UNIQUE NOT NULL PRIMARY KEY,
    age_name VARCHAR(100) UNIQUE NOT NULL,
    color VARCHAR(20) NOT NULL
);

CREATE TABLE tag
(
    tag_id UUID NOT NULL PRIMARY KEY,
    tag_name VARCHAR(50) UNIQUE NOT NULL,
    age_id UUID NOT NULL REFERENCES age(age_id)
);

CREATE TABLE post_tag
(
    tag_id UUID NOT NULL REFERENCES tag(tag_id) ON DELETE CASCADE ON UPDATE CASCADE,
    post_id UUID NOT NULL REFERENCES post(post_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT tag_post_pkey PRIMARY KEY(tag_id, post_id)
);

CREATE TABLE read_post
(
    reader_id UUID NOT NULL,
    post_id UUID NOT NULL REFERENCES post(post_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT read_post_pkey PRIMARY KEY(reader_id, post_id)
);

CREATE TABLE read_chapter
(
    reader_id UUID NOT NULL,
    chapter_id UUID NOT NULL REFERENCES chapter(chapter_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT read_chapter_pkey PRIMARY KEY(reader_id, chapter_id)
);

CREATE TABLE likes
(
    user_id UUID NOT NULL,
    post_id UUID NOT NULL REFERENCES post(post_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT user_post_pkey PRIMARY KEY(user_id, post_id)
);

CREATE TABLE post_genre
(
    genre_id UUID NOT NULL REFERENCES genre(genre_id) ON DELETE CASCADE ON UPDATE CASCADE,
    post_id UUID NOT NULL REFERENCES post(post_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT genre_post_pkey PRIMARY KEY(genre_id, post_id)
);

CREATE TABLE fandom_character
(
    fandom_id UUID NOT NULL REFERENCES fandom(fandom_id) ON DELETE CASCADE ON UPDATE CASCADE,
    character_id UUID NOT NULL REFERENCES character(character_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fandom_character_pkey PRIMARY KEY(fandom_id, character_id)
);