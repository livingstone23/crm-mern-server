const { ApolloServer, gql } = require('apollo-server');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolver');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variable.env'});



const conectarDB = require('./config/db');

//Conectar a la base de datos
conectarDB();

//Servidor
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => {

        //console.log('req.authorization LCANO');
        //console.log(req.headers.authorization);

        const token = req.headers['authorization'] || '';
        

        //console.log('token lcano    99');
        //console.log(token);
        if(token) {
            try {
                const usuario =  jwt.verify(token.replace('Bearer ',''), process.env.SECRETA);
                //console.log(usuario);
                return {
                    usuario
                }
            }
            catch (error) {
                console.log('Hubo un error Server');
                console.log(error);
            }
        }
    }
});


//Arrancar el servidor
server.listen().then( ({url}) => {
    console.log(`Servidor listo en la URL ${url}`);
});

