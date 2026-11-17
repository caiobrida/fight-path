DROP TABLE attempts;
DROP TABLE sessions;

CREATE TABLE attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(255) NOT NULL,
  exercise_id VARCHAR(100) NOT NULL,
  correct BOOLEAN NOT NULL,
  duration_ms INTEGER NOT NULL CHECK (duration_ms >= 0 AND duration_ms <= 120000),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX attempts_user_created_idx ON attempts (user_id, created_at DESC);
CREATE INDEX attempts_user_exercise_idx ON attempts (user_id, exercise_id);
CREATE INDEX attempts_created_at_idx ON attempts (created_at);
