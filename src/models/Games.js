const { Schema, model } = require('mongoose');

const gameSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    
    otherTiltles: [String],
    developers: [String],
    publishers: [String],
    genrers: [String],
    firstReleased: Date,
    japanReleased: Date,
    usaReleased: Date,
    euroReleased: Date,
}, { collection: 'games', strict: false});

const Game = model('Game', gameSchema);

module.exports = {
   
    find: (criteria) => {
        const { limit, page, fields, orderBy, sortBy = 1, q } = criteria;
        const skip = page > 1 ? (page - 1) * limit : 0;

        
        const query = Game.find();
        if(q){
            const regex = new RegExp(`.*${q}.*`, 'i');
            const searchQuery = { $or: [
                  {title: regex},
                  {otherTiltles: regex},
                  {publishers: regex},
                  {developers: regex} 
            ]} 
            query.find(searchQuery)
        }
        if(limit) query.limit(limit);
        if(skip) query.skip(skip)
        if(fields) query.select(fields.split(','))
        if(orderBy) query.sort({[orderBy]: sortBy});
        
        return query.exec(); 

    }
}