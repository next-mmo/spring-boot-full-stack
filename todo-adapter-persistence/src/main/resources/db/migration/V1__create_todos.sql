CREATE TABLE todos (
    id UUID PRIMARY KEY,
    title TEXT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT todos_title_not_blank CHECK (title ~ '[^[:space:]]')
);
