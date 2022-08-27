import router ,{ Router } from "express"
import AuthController from "../controller/AuthController"
import { checkJwt } from "../middlewares/checkJwt"

router.post("/login", AuthController.login)

router.post("change-password", [checkJwt], AuthController.changePassword)

export default router