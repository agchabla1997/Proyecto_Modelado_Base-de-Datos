const express = require ('express');
const router = express.Router();

const Pacientes = require('../models/pacientes');

router.get('/', async (req, res) =>{
    const pacientes = await Pacientes.find();
    console.log(pacientes);
    res.render('index' ,{
        pacientes
    });
});

router.post('/add', async (req, res) => {
    const pacientes = new Pacientes(req.body);
    pacientes.path = '/img/uploads/' + req.file.filename;
    pacientes.originalname = req.file.originalname;
    pacientes.mimetype = req.file.mimetype;
    pacientes.size = req.file.size;
    await pacientes.save();
    console.log(req.file);
    res.redirect('/');
});

router.get('/turn/:id', async (req, res) => {
    const { id } = req.params;
    const pacientes =await Pacientes.findById(id);
    pacientes.status = !pacientes.status;
    await pacientes.save();
    res.redirect('/');
})

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const pacientes =await Pacientes.findById(id);
    res.render('edit', {
        pacientes
     });
    });

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    await Pacientes.update({_id : id}, req.body);
    res.redirect('/');
    });


router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await Pacientes.remove({_id: id});
    res.redirect('/');
})


module.exports = router;