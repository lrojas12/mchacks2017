
var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
	id: String,
	username: String,
	password: String,
	email: String,
	firstName: String,
	lastName: String,
	data:
    {
        semesters:
        [
            {
                courses:
                [
                    {
                        name: String,
						code: String,
                        breakdown:
                        [
                            {
                                name: String,
                                weight: Number,
                                entries:
                                [
                                    {
                                        mark: Number,
                                        total: Number,
                                        date: String,
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
});
