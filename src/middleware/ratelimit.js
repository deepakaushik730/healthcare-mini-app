// In-memory fixed-window limiter. Per-process only; use a shared store if running multiple instances.
const ratelimit = ({ windowms, max, view, message }) => {
  const hits = new Map()

  setInterval(() => {
    const now = Date.now()
    for (const [key, entry] of hits) {
      if (entry.reset <= now) hits.delete(key)
    }
  }, windowms).unref()

  return (req, res, next) => {
    const now = Date.now()
    const key = req.ip
    let entry = hits.get(key)

    if (!entry || entry.reset <= now) {
      entry = { count: 0, reset: now + windowms }
      hits.set(key, entry)
    }

    entry.count += 1

    if (entry.count > max) {
      res.set("Retry-After", String(Math.ceil((entry.reset - now) / 1000)))
      return res.status(429).render(view, { error: message })
    }

    next()
  }
}

module.exports = ratelimit
