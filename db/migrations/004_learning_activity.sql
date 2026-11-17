CREATE TABLE learning_activity (
  user_id VARCHAR(255) NOT NULL,
  lesson_id VARCHAR(100) NOT NULL,
  revision INTEGER NOT NULL CHECK (revision > 0),
  kind VARCHAR(10) NOT NULL CHECK (kind IN ('read', 'check', 'drill')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, lesson_id, revision, kind)
);

CREATE INDEX learning_activity_created_idx ON learning_activity (created_at);
