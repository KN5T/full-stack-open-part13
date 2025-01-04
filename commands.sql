CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes)
VALUES ('Dan Abramov', 'http://example.com/blog1', 'Writing Resilient Components', 9);

INSERT INTO blogs (author, url, title, likes)
VALUES ('Martin Fowler', 'http://example.com/blog2', 'Is High Quality Software Worth the Cost?', 0);

INSERT INTO blogs (author, url, title, likes)
VALUES ('Robert C. Martin', 'http://example.com/blog3', 'FP vs. OO List Processing', 3);

INSERT INTO blogs (author, url, title, likes)
VALUES ('Dan Abramov', 'http://example.com/blog4', 'Building Maintainable React Apps', 3);

INSERT INTO blogs (author, url, title, likes)
VALUES ('Dan Abramov', 'http://example.com/blog5', 'Understanding React Hooks in Depth', 4);

INSERT INTO users (username, name, created_at, updated_at)
VALUES ('kjoki', 'Konsta Jokinen', NOW(), NOW());