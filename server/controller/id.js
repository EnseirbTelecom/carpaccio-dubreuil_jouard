/*
/id (requête GET) doit retourner l’id de votre API qui est 
le nom de votre dépôt GitHub sour la forme { "id" : "it340-foo" }
*/

// curl -X GET 'http://localhost:3000/id'

class Id {
    constructor () {
        this.response = {id: 'carpaccio-dubreuil_jouard'}
    }
    getId (req, res, next) {
        console.log(this.response.id)
        res.send("toto")
        //res.send(this.response)
    }
    testId () {
        return this.response
    }
}
  
module.exports = Id