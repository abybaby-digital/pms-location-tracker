import Redis from "ioredis";
import { envs } from "../config/index.js";

const redis = new Redis(envs.redis.REDIS_URL, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
  tls: {},
});

redis.on("connect", () => console.log("Redis connected ✔️"));
redis.on("error", (err) => console.error("Redis error", err));

export default redis;
