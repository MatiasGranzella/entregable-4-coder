const fs = require('fs');


class Conteiner {

    constructor(file_name){
        this.file_name = file_name;
        this.file_object = [];
    }

    readFile(){

        try {
            const file_content = fs.readFileSync(this.file_name, 'utf-8').split(',\r\n')
            const infoData = JSON.parse(file_content)
            this.file_object = infoData
        } catch {}

    };

    save(object){
        let last_id = 1;
        
        if (this.file_object.length > 0) {
            last_id = this.file_object[this.file_object.length-1]['id']
            last_id++
        }

        object.id = last_id;
        this.file_object.push(object)
        return last_id

    };

    getById(id_number){

        if (this.file_object[id_number-1] != undefined){
            return this.file_object[id_number-1]
        } else {
            return null
        }
    };

    getAll(){
        return this.file_object
        
    };

    modifyById(id_number, new_data){
        
        if (this.file_object[id_number-1] != undefined){
            this.file_object[id_number-1] = new_data
            this.file_object[id_number-1].id = id_number
            return this.file_object[id_number-1]
        } else {
            return null
        }
    }

    deleteById(id_number){

        let item_to_delete;

        this.file_object.forEach((element,index) => {
            
            if (element.id == id_number) {
                item_to_delete = element;
                this.file_object.splice(index);
            }
        });

        return item_to_delete
    };

    deleteAll(){
        this.file_object = [];
    };

    writeFile() {
        fs.writeFileSync(this.file_name, JSON.stringify(this.file_object))
    };
}

exports.Conteiner = Conteiner;