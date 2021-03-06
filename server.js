const cont = require('./class_conteiner.js');
const express = require("express");
const { Router } = express;

const app = express();
const router = Router();
let new_conteiner = new cont.Conteiner("./src/courses.txt");
new_conteiner.readFile();

router.use(express.json());
router.use(express.urlencoded({extended: true}));
app.use('/api', router);
app.use(express.static('public'));



router.get('/courses', (req, res) => {
    res.json(new_conteiner.getAll())
})


router.get('/courses/:id', (req, res) => {
    let course_id = (req.query.id == null) ? req.params.id : req.query.id
    let course_data = new_conteiner.getById(course_id)
    
    if (course_data != null) {
        res.json(course_data)
    } else {
        res.json({error : 'Course not found'})
    }
})

router.post('/courses', (req, res) => {
    res.json(new_conteiner.save(req.body))
    new_conteiner.writeFile()
})

router.put('/courses/:id', (req, res) => {
    let modify_course_id = new_conteiner.modifyById(req.params.id, req.body)

    if (modify_course_id != null) {
        res.json(modify_course_id)
    } else {
        res.json({error : 'Course not found'})
    }

    new_conteiner.writeFile()
})

router.delete('/courses/:id', (req, res) => {
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
