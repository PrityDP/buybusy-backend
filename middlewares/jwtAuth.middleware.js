import jwt from "jsonwebtoken";

export const jwtAuth = (req, res, next) => {
    try {
        const token = req.cookies.token;  // getting from FROM COOKIE from browser at client side

        if (!token) {
            return res.status(401).json({ message: "No token" })
        }

        //ONLY VERIFY (NO DB CALL) - pure stateless means no storage lookup it will store all user data in token itself.
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded; // stateless verified token gets attched to req object for that particular user.
        next(); // call next middleware in the pipeline

    }
    catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
}