const swaggerAutogen = require('swagger-autogen')()



const doc = {
    info: {
        "version": "",                // by default: "1.0.0"
        "title": "",                  // by default: "REST API"
        "description": ""             // by default: ""
    },
    host: "localhost:3310",           // by default: "localhost:3000"
    basePath: "",                     // by default: "/"
    schemes: [],                      // by default: ['http']
    consumes: [],                     // by default: ['application/json']
    produces: [],                     // by default: ['application/json']
    tags: [                           // by default: empty Array
        {
            "name": "",               // Tag name
            "description": ""         // Tag description
        },
        // { ... }
    ],
    securityDefinitions: { },         // by default: empty object
    definitions: {                    // by default: empty object
        Parents: {
            father: "Simon Doe",
            mother: "Marie Doe"
        },
        User: {
            name: "Jhon Doe",
            age: 29,
            parents: {
                $ref: '#/definitions/Parents'
            },
            diplomas: [
                {
                    school: "XYZ University",
                    year: 2020,
                    completed: true,
                    internship: {
                        hours: 290,
                        location: "XYZ Company"
                    }
                }
            ]
        },
        AddUser: {
            $name: "Jhon Doe",
            $age: 29,
            about: ""
        }
    }
}

const outputFile = './swagger_output.json'
const endpointsFiles = ['./index.js']

// swaggerAutogen(outputFile, endpointsFiles); // swaggerAutogen 的方法
swaggerAutogen(outputFile, endpointsFiles, doc);
