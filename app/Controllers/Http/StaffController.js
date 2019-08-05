'use strict'
const Account = use('App/Models/Account')
const Transaction = use('App/Models/Transaction')
const User = use('App/Models/User')

class StaffController {

    async signup({ request, response }) {
        const staff = request.only(['name', 'email', 'password', "DOB"])
        const users = await User.findBy('email', staff.email)
        if (users) return response.status(400).send({ message: { error: 'User already registered' } })
        const user = await User.create({
            name: staff.name,
            email: staff.email,
            password: staff.password,
            DOB: staff.DOB,
            type: 'Staff',
        });
        await user.save()
        return response.json(user)
    }
    async login({ request, response, auth }) {
        const { email, password } = request.all()
        let token = await auth.attempt(email, password)
        let user = await User.query().where('email', email).fetch()
        return { token } // your structured object
    }

    async index({ request, params, response }) {
        let user = await User.findBy('id', params.id);
        if (!user) return response.status(404).json({ message: 'No users available' });
        return response.send(user);
    }

    async show({ request, response }) {
        const user = await User.all()
        return response.json(user)
    }

    async showAccounts({ request, response }) {
        const account = await Account.all()
        return response.json(account)

    }

    async indexAccount({ request, params, response }) {
        const account = await Account.findBy('id', params.id);
        return response.send(account);
    }

    async credit({ response, request, params }) {
        const account = await Account.findBy('accountNumber', params.accountNumber)
        if (!account) return response.status(400).json({ Error: 'Invalid Account' })

        const transaction = await Transaction.findBy('id', params.id)
        if (!account) return response.status(400).json({ Error: 'Invalid transaction.' })
        if (transaction.type !== 'Deposit') return response.status(401).json({ Alert: 'Not allowed' });

        account.balance = parseInt(account.balance) + parseInt(transaction.amount)
        account.status = 'Active';
        await account.save();

        return response.json({
            success: 'Account credited successfully',
            amount: account.balance
        })
    }
    async debit({ response, request, params }) {
        try {
            let account = await Account.findBy('accountNumber', params.accountNumber)
            if (!account) response.status(400).send('Account does not exist')

            const transaction = await Transaction.findBy('id', params.id)
            if (!transaction) return response.status(400).send('Invalid transaction')
            if (transaction.type !== 'Withdraw' && transaction.amount > account.balance) return response.status(401).json({ Alert: 'Not allowed' })
            account.balance = parseInt(account.balance) - parseInt(transaction.amount)
            await account.save();

            return response.json({
                success: 'Account debited successfully',
                amount: account.balance
            })
        } catch (ex) { console.log(ex) }

    }
    async activate({ response, request, params }) {
        const account = await Account.findBy('id', params.id)
        if (!account) return response.status(400).send('the account is not registered')
        account.status = 'active'
        await account.save()
        response.json({ message: 'account activate' })
    }
    async deactivate({ response, request, params }) {
        const account = await Account.findBy('id', params.id)
        if (!account) return response.status(400).send('the account is not registered')
        account.status = 'dormant'
        await account.save()
        response.json({ message: 'account deactivate' })
    }

    async delete({ response, request, params }) {
        const account = await Account.findBy('id', params.id)
        if (!account) return response.status(400).send('the account is not registered')
        await account.delete()
        response.json({ message: 'the account is deleted successful' })

    }
}

module.exports = StaffController
