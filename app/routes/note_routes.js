var ObjectID = require('mongodb').ObjectID;

module.exports = function (app , client) {
	
	app.put('/notes/:id', (req ,res) =>{
		const id = req.params.id;
		const  details = { '_id' : new ObjectID(id) };
		const note = { 
			text: req.body.body,
			title: req.body.title 
		};
		const db = client.db('todoapp');
		db.collection('todoapp').update(details , note , (err, item) => {
			if(err){
				res.send({'error' : 'An error has occured'});
			}else {

				res.send('Note with id ' + id + ' has been updated!');    
			}
		});

	});

	app.delete('/notes/:id', (req ,res) =>{
		const id = req.params.id;
		const  details = { '_id' : new ObjectID(id) };
		const db = client.db('todoapp');
		db.collection('todoapp').remove(details,(err, item) => {
			if(err){
				res.send({'error' : 'An error has occured'});
			}else {

				res.send('Note with id ' + id + ' has been deleted!');    
			}
		});

	});

	app.get('/notes/:id', (req ,res) =>{
		const id = req.params.id;
		const  details = { '_id' : new ObjectID(id) };
		const db = client.db('todoapp');
		db.collection('todoapp').findOne(details,(err, item) => {
			if(err){
				res.send({'error' : 'An error has occured'});
			}else {

				res.send(item);    
			}
		});

	});

	app.post('/notes' , (req , res)=>{
		const note = { 
			text: req.body.body,
			title: req.body.title 
		};
		const db = client.db('todoapp');
		db.collection('todoapp').insertOne(note,(err, result) => {
			if(err){
				res.send({'error' : 'An error has occured'});
			}else {
				res.send(result.ops[0]);    
			}
		});
	});
};