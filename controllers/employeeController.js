const express = require('express');
const { json } = require('express/lib/response');
const { Employee } = require('../models/employee');
const ObjectId = require('mongoose').Types.ObjectId;

const router = express.Router();


//* www.domain.com/employees
router.get('/', (req, res, next) => {
    Employee.find((err, docs) => {
        if (!err) { res.status(200).send(docs) }
        else { console.log('Failed retrieving list of employees' + JSON.stringify(err, undefined, 2)) }
    })
});

//* www.domain.com/employees/:id
router.get('/:id', (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).send(`No records with id: ${req.params.id}`);

    Employee.findById(req.params.id, (err, docs) => {
        if (!err) { res.status(200).send(docs) }
        else { console.log('Failed retrieving the employee' + JSON.stringify(err, undefined, 2)) }
    })
})

router.post('/', (req, res, next) => {
    const emp = new Employee({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
    });

    emp.save((err, docs) => {
        if (!err) { res.status(200).send(docs) }
        else { console.log('Failed saving documents' + JSON.stringify(err, undefined, 2)) }
    })
})

router.put('/:id', (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).send(`No records with id: ${req.params.id}`);

    const emp = ({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
    });

    Employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, docs) => {
        if (!err) { res.status(200).send(docs) }
        else { console.log('Failed editing employee data' + JSON.stringify(err, undefined, 2)) }
    })
})

router.delete('/:id', (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).send(`No records with id: ${req.params.id}`);

    Employee.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err) { res.status(200).send(docs) }
        else { console.log('Failed removing employee data' + JSON.stringify(err, undefined, 2)) }
    })
})











module.exports = router;