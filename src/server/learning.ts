import { database } from "./db";
import type {
  LearningActivity,
  ActivityKind,
} from "@/domain/learning-progress";

export async function readLearning(userId: string) {
  const result = await database().query<LearningActivity>(
    "SELECT lesson_id, revision, kind, created_at FROM learning_activity WHERE user_id = $1 ORDER BY created_at DESC",
    [userId],
  );
  return result.rows;
}

export async function saveLearning(
  userId: string,
  activity: { lessonId: string; revision: number; kind: ActivityKind },
) {
  await database().query(
    "INSERT INTO learning_activity (user_id, lesson_id, revision, kind) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING",
    [userId, activity.lessonId, activity.revision, activity.kind],
  );
}

export async function deleteUserProgress(userId: string) {
  const client = await database().connect();
  try {
    await client.query("BEGIN");
    await client.query("DELETE FROM attempts WHERE user_id = $1", [userId]);
    await client.query("DELETE FROM learning_activity WHERE user_id = $1", [
      userId,
    ]);
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
