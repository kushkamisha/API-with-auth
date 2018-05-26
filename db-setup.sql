DROP DATABASE IF EXISTS crypto;
CREATE DATABASE crypto;

\c crypto;

CREATE TABLE users (
    "UserId"   SERIAL PRIMARY KEY,
    "Username" VARCHAR(40) NOT NULL,
    "Email"    VARCHAR(60) NOT NULL,
    "Password" VARCHAR(60) NOT NULL
);

CREATE TABLE wallets (
    "WalletId"   SERIAL PRIMARY KEY,
    "UserId"     INT4 NOT NULL,
    "PrivateKey" VARCHAR(65) NOT NULL
);
