
const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index(request,response){
        const status = await connection('status').select('*');   
        return response.json(status);
    },

    async create(request,response){
        const {title} = request.body;

        const id = crypto.randomBytes(4).toString('HEX');

        await connection('status').insert({
            id,
            title,
        });

        return response.json({id});
    }
};