CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token_hash CHAR(64) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_seen_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  exercise_id VARCHAR(100) NOT NULL,
  correct BOOLEAN NOT NULL,
  duration_ms INTEGER NOT NULL CHECK (duration_ms >= 0 AND duration_ms <= 120000),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX attempts_session_created_idx ON attempts (session_id, created_at DESC);
CREATE INDEX attempts_session_exercise_idx ON attempts (session_id, exercise_id);
