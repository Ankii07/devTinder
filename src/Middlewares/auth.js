const adminAuth = (req, res, next) => {
    console.log("Admin is getting checked !!");
    const token = "xyz";
    const isAdminAuthorized = token === "123";
    if(!isAdminAuthorized) {
        res.status(401).send("Unauthorized");
    } else {
        next();
    }
};

const userAuth = (req, res, next) => {
    console.log("User is getting checked !!");
    const token = "xyz";
    const isUserAuthorized = token === "123";
    if(!isUserAuthorized) {
        res.status(401).send("Unauthorized");
    } else {
        next();
    }
};

module.exports = {adminAuth, userAuth};