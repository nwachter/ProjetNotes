const isAdmin = (req, res, next) => {
    //console.log("IsAdmin req.user, req.id, req.isAdmin : ", req.user);
    if (!req.user) {
        return res.status(401).json({ message: "Authentication required" });
    }

    //CHECK USER IF isAdmin / Has ADMIN PRIVILEGES
    if (!req.user.isAdmin) { //Atention, avant req.user.isAdmin
        return res.status(403).json({ message: "Access denied. Admins only." });
    }

    next(); //PROCEED IF USER IS ADMIN
}

module.exports = { isAdmin }