import { authRepository } from "../../data/repositories/auth_repository"

export const signUpUser = async (
    name: string,
    email: string,
    password: string
) => {

    if (!name || !email || !password) {
        throw new Error("All fields are required")
    }

    const response = await authRepository.signUp(name, email, password)

    return response
}