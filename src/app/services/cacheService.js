const NodeCache = require("node-cache");

class CacheService {
    constructor(ttlSeconds = 3600) {
        this.cache = new NodeCache({ stdTTL: ttlSeconds });
    }

    get(key) {
        return this.cache.get(key);
    }

    set(key, value, ttlSeconds) {
        this.cache.set(key, value, ttlSeconds);
    }

    delete(key) {
        this.cache.del(key);
    }

    flush() {
        this.cache.flushAll();
    }
}

module.exports = CacheService;