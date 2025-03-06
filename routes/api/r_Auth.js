const router = require('express').Router();

const {
    LoginUser, logOut, refreshToken
} = require('../../controllers/AuthController');

router.post("/auth/sign-in", LoginUser);
router.delete("/auth/sign-out", logOut);
router.get("/refreshtoken", refreshToken);

module.exports = router;