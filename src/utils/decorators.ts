import redisClient from "../redisClient";

export const cache =
  (keyGenerator: (...args: any[]) => string, ttl: number = 3600) =>
  (target: any, propertyName: string, descriptor: PropertyDescriptor) => {
    //save original method
    const originalMethod = descriptor.value;

    descriptor.value = async (...args: any[]) => {
      //generate the cache key
      const cacheKey = keyGenerator(...args);
      //check redis for key
      const cachedResult = await redisClient.get(cacheKey);

      //return result from redis
      if (cachedResult) {
        return JSON.parse(cachedResult);
      }

      //use original method
      const result = await originalMethod.apply(this, args);

      //cache result in redis
      await redisClient.set(cacheKey, JSON.stringify(result), { EX: ttl });

      return result;
    };
    return descriptor;
  };
