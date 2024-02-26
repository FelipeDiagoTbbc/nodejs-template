const { Router } = require("express");
const router = Router();



const adminRouter = require("./admin.router");
const userRouter = require("./users.router");
const authRouter = require("./auth.router");

router.use("/admin", adminRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);


module.exports = router;