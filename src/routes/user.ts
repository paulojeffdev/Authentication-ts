import router, {Router} from "express"
import { UserController } from "../controller/UserController"
import {checkJwt} from "../middlewares/checkJwt"
import {checkRole} from "../middlewares/checkRole"

//Get All users
router.get("/", [checkJwt, checkRole["ADMIN"]], UserController.listAll)

//Get One user
router.get(
    "/:id([0-9]+)", [checkJwt, checkRole["ADMIN"]],
    UserController.getOneById
)

//Create a new user
router.post("/", [checkJwt, checkRole["ADMIN"]], UserController.newUser)

//Edit one user
router.put(
    "/:id([0-9]+)",
    [checkJwt, checkRole["ADMIN"]],
    UserController.editUser
)

router.delete(
    "/:id([0-9]+)",
    [checkJwt, checkRole["ADMIN"]],
    UserController.deleteUser
)

export default router