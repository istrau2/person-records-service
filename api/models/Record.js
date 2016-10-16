/**
 * Created by istrauss on 10/14/2016.
 */

module.exports = {
    attributes: {
        id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: 'string'
        },
        lastName: {
            type: 'string'
        },
        gender: {
            type: 'string',
            enum: ['Male', 'Female']
        },
        favoriteColor: {
            type: 'string'
        },
        dateOfBirth: {
            type: 'date'
        }
    }
};
