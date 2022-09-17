import { validate } from "class-validator"
import { Request, Response } from "express"
import { AppDataSource } from "../data-source"

import { User } from "../entity/User"

export class UserController {
    static listAll = async (req: Request, res: Response) => {
        const userRepository = AppDataSource.getRepository(User)
        const users = await userRepository.find({
            select:["id", "username", "role"]
        })

        return res.send(users)
    }

    static getOneById = async (req: Request, res: Response) => {
        const id = req.params.id

        const userRepository = AppDataSource.getRepository(User)
        let user: User
        try {
            user = await userRepository.findOneOrFail({
                select: {
                    id: true,
                    username: true,
                    password: false,
                    role: true,
                    createdAt: true,
                    updatedAt: true
                },
                where: {
                    id: id
                }
            })
        } catch (error) {
            return res.status(404).send("User not found")
        }

        return res.send(user)
    }

    static newUser = async (req: Request, res: Response) => {
        let {username, password, role} = req.body
        
        let user: User = new User()
        user.username = username
        user.password = password
        user.role = role

        const errors = await validate(user)
        if(errors.length > 0) {
            return res.status(400).send(errors)
        }

        user.hashPassword()

        const userRepository = AppDataSource.getRepository(User)
        try {
            await userRepository.save(user)
        } catch (error) {
            return res.status(400).send(error)
        }

        return res.status(201).send("User created")
    }

    static editUser = async (req: Request, res: Response) => {
        const id = req.params.id

        const {username, role} = req.body

        const userRepository = AppDataSource.getRepository(User)
        let user: User
        try {
            user = await userRepository.findOneOrFail({
                where: {
                    id: id
                }
            })
        } catch (error) {
            return res.status(404).send("User not found")
        }

        if(username) {
            user.username = username
        }

        if(role) {
            user.role = role
        }

        const errors = await validate(user)
        if(errors.length > 0) {
            return res.status(400).send(errors)
        }

        try {
            await userRepository.save(user)
        } catch(error) {
            return res.status(409).send("Username already in use")
        }

        return res.status(204).send()
    }

    static deleteUser = async (req: Request, res: Response) => {
        const id = req.params.id

        const userRepository = AppDataSource.getRepository(User)
        let user: User
        try {
            user = await userRepository.findOneOrFail({
                where: {
                    id: id
                }
            })
        } catch(error) {
            return res.status(404).send("User not found")
        }

        userRepository.delete(id)

        return res.status(204).send()
    }
}
