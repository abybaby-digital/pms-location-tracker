import { redis } from "../../config/index.js";

export const setLocationIntoRedis = async (redisKey, locationsFromDB) => {
  const pipeline = redis.pipeline();

  for (const loc of locationsFromDB) {
    pipeline.geoadd(redisKey, loc.longitude, loc.latitude, `location:${loc.id}`);
  }

  pipeline.expire(redisKey, 6 * 60 * 60);
  await pipeline.exec();
};
