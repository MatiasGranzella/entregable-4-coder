const cont = require('./class_conteiner.js')
const express = require("express");
const { Router } = express

const app = express();
const router = Router()
let new_conteiner = new cont.Conteiner("./src/courses.txt")
new_conteiner.readFile();

router.use(express.json())
router.use(express.urlencoded({extended: true}))
app.use('/api', router)


router.get('/productos', (req, res) => {
    res.json(new_conteiner.getAll())
})


router.get('/productos/:id', (req, res) => {
    let product_id = new_conteiner.getById(req.params.id)

    if (product_id != null) {
        res.json(product_id)
    } else {
        res.json({error : 'Producto no encontrado'})
    }
})

router.post('/productos', (req, res) => {

    res.json(new_conteiner.save(req.body))
    new_conteiner.writeFile()
})

router.put('/productos/:id', (req, res) => {
    let modify_product_id = new_conteiner.modifyById(req.params.id, req.body)

    if (modify_product_id != null) {
        res.json(modify_product_id)
    } else {
        res.json({error : 'Producto no encontrado'})
    }

    new_conteiner.writeFile()
})

router.delete('/productos/:id', (req, res) => {
    let delete_product_id = new_conteiner.deleteById(req.params.id)

    if (delete_product_id != null) {
        res.json(delete_product_id)
    } else {
        res.json({error : 'Producto no encontrado'})
    }

    new_conteiner.writeFile()
})

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))