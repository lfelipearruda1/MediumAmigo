const user =  require('../models/user')

module.exports = {
    async index(req, res){
        const users = await user.findAll();

        return res.json(users);
    },

    async store(req, res){
        const { name, email} = req.body;

        const user = await user.create({name, email});

        return res.json(user);
    }
};