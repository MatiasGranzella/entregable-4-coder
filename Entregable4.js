const cont = require('./class_conteiner.js');
const express = require("express");
const { Router } = express;
const methodOverride = require('method-override');


const app = express();
const router = Router();
let new_conteiner = new cont.Conteiner("./src/courses.txt");
new_conteiner.readFile();

router.use(express.json());
router.use(express.urlencoded({extended: true}));
app.use('/api', router);
app.use(express.static('public'));
app.use(methodOverride('_method'));



router.get('/courses', (req, res) => {
    res.json(new_conteiner.getAll())
})


router.get('/courses/:id', (req, res) => {
    let course_id = new_conteiner.getById(req.query.id)
    
    if (course_id != null) {
        res.json(course_id)
    } else {
        res.json({error : 'Course not found'})
    }
})

router.post('/courses', (req, res) => {

    res.json(new_conteiner.save(req.query))
    new_conteiner.writeFile()
})

router.put('/courses/:id', (req, res) => {
    let modify_course_id = new_conteiner.modifyById(req.query.id, req.query)
    console.log(req.query);
    if (modify_course_id != null) {
        res.json(modify_course_id)
    } else {
        res.json({error : 'Course not found'})
    }

    new_conteiner.writeFile()
})

router.delete('/courses/:id', (req, res) => {
    console.log(req)
    let delete_course_id = new_conteiner.deleteById(req.params.id)

    if (delete_course_id != null) {
        res.json(delete_course_id)
    } else {
        res.json({error : 'Course not found'})
    }

    new_conteiner.writeFile()
})

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Server listening at port ${server.address().port}`)
})
server.on('error', error => console.log(`Server error ${error}`))