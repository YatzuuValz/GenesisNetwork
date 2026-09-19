-- Initial schema — the same tables scripts/migrate.mjs creates for the local
-- libSQL database, so both drivers see an identical structure.
--
-- Apply:  npx wrangler d1 migrations apply genesis-network --local   (or --remote)

CREATE TABLE IF NOT EXISTS users (
    id            TEXT PRIMARY KEY,
    email         TEXT NOT NULL UNIQUE,
    name          TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    created_at    TEXT NOT NULL
  );

CREATE TABLE IF NOT EXISTS sessions (
    token      TEXT PRIMARY KEY,
    user_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expires_at TEXT NOT NULL
  );

CREATE INDEX IF NOT EXISTS sessions_user ON sessions(user_id);

CREATE TABLE IF NOT EXISTS articles (
    id           TEXT PRIMARY KEY,
    slug         TEXT NOT NULL UNIQUE,
    title        TEXT NOT NULL,
    accent       TEXT,
    deck         TEXT NOT NULL DEFAULT '',
    category     TEXT NOT NULL,
    series       TEXT NOT NULL,
    cover        TEXT NOT NULL DEFAULT '',
    cover_thumb  TEXT NOT NULL DEFAULT '',
    cover_alt    TEXT NOT NULL DEFAULT '',
    aspect       TEXT NOT NULL DEFAULT '4/5',
    status       TEXT NOT NULL DEFAULT 'draft',
    featured     INTEGER NOT NULL DEFAULT 0,
    tags         TEXT NOT NULL DEFAULT '[]',   -- JSON array
    body         TEXT NOT NULL DEFAULT '[]',   -- JSON array of Block
    seo_title    TEXT,
    seo_desc     TEXT,
    author_id    TEXT REFERENCES users(id),
    author_name  TEXT NOT NULL DEFAULT '',
    published_at TEXT,
    created_at   TEXT NOT NULL,
    updated_at   TEXT NOT NULL
  );

CREATE TABLE IF NOT EXISTS leads (
    id         TEXT PRIMARY KEY,
    name       TEXT NOT NULL,
    company    TEXT NOT NULL,
    email      TEXT NOT NULL,
    phone      TEXT NOT NULL DEFAULT '',
    stream     TEXT NOT NULL DEFAULT '',
    message    TEXT NOT NULL DEFAULT '',
    status     TEXT NOT NULL DEFAULT 'new',
    source     TEXT NOT NULL DEFAULT 'partnership',
    created_at TEXT NOT NULL
  );

CREATE INDEX IF NOT EXISTS leads_created ON leads(created_at DESC);

CREATE INDEX IF NOT EXISTS articles_status ON articles(status);

CREATE INDEX IF NOT EXISTS articles_updated ON articles(updated_at DESC);
