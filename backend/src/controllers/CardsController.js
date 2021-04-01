const connection = require('../database/connection')

module.exports = {
    async index(request, response) {
      const { page = 1 } = request.query;

      const [count] = await connection('cards').count();

      const cards = await connection('cards')
        .join('status','status.id','=','cards.status_id')
        .select([
          'cards.*',
          'status.description',
        ]);

      response.header('X-Total-Count',count['count(*)'])
        
      return response.json(cards);
    },
    async create(request, response) {
        const { description } = request.body;
        const {status_id} = request.headers;
    
        const [id] = await connection('cards').insert({
          description,
          status_id,
        });
    
        return response.json({ id });
      },

      async delete(request,response){
        const { id } = request.params;
        const {status_id} = request.headers;

        const card = await connection('cards')
          .where('id',id)
          .select('status_id')
          .first();

        if (card.status_id != status_id){
          return response.status(401).json({error:'Operation not permitted.'});
        }

        await connection('cards').where('id',id).delete();

        return response.status(204).send();
      }
}