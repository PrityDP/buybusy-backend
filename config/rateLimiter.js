import rateLimit from "express-rate-limit";

//Global limiter
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,// 15 minutes
    max:1000, // per IP address or userId
    message:"Too many requests, try later"
});

//(auth API) Limiter
export const authLimiter = rateLimit({
   windowMs: 15 * 60 * 1000,// 15 minutes
    max:1000, // per IP address or userId
    message:"Too many login attempts"
})

