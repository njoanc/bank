'use strict'
const User = use('App/Models/User');
class AuthController {
    // creating and saving a new user (sign-up)
    async register({ request, session, response }) {
        // return response.json({})

        const data = request.only(['type', 'name', 'email', 'password', 'DOB', 'isAdmin'])
        // looking for user in database
        const userExist = await User.findBy('email', data.email)
        if (userExist) return response.status(400).send({ message: { error: 'User already registered' } })
        // if user doesn't exist, proceeds with saving him in DB
        const user = await User.create(data)
        return user

    }
    async login({ request, response, auth }) {
        const { email, password } = request.all()
        let token = await auth.attempt(email, password)
        let user = await User.query().where('email', email).fetch()
        return { token } // your structured object
    }


}

module.exports = AuthController
