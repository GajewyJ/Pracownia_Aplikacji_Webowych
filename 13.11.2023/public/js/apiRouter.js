const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()

//USUNĄĆ HASŁO!
const url = "mongodb+srv://jakubgajewy:0vGUP3Xb7hUp4Ghu@bazadanych-13-11-2023.zvcpvyh.mongodb.net/?retryWrites=true&w=majority";

const router = express.Router()
router.use((req, res, next) => {
    next()
})
const links = {
    "api/students":"Lista studentów",
    "api/students/id":"Student o podanym ID",
    "api/subjects":"Lista przedmiotów",
    "api/subjects/id":"Przedmiot o podanym ID",
    "api/contact":"Lista wiadomości"
}

router.get('/', (req, res) => {
    res.json(links)
});
router.get('/students', async (req, res) => {
    const client = new MongoClient(url, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
    });
    async function run() {
        try {
            const db = await client.connect();
            const dbo = db.db('nodestudentssubjects')

            try{
                const result = await dbo.collection('students').find().toArray()
                if(result != null){
                    res.json(result)
                }
                else{
                    res.json({'Error':'404'})
                }
            }
            catch (e){
                throw e
            }

            await db.close()
        }
        finally {
            await client.close();
        }
    }
    run().catch(console.dir);
});
router.get('/students/:id', async (req, res) => {
    const studentId = Number(req.params.id);
    
    const client = new MongoClient(url, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
        });
        async function run() {
            try {
                const db = await client.connect();
                const dbo = db.db('nodestudentssubjects')
    
                try{
                    const result = await dbo.collection('students').find({'id':studentId}).toArray()
                    if(result != null){
                        res.json(result)
                    }
                    else{
                        res.json({'Error':'404'})
                    }
                }
                catch (e){
                    throw e
                }
    
                await db.close()
            }
            finally {
                await client.close();
            }
        }
        run().catch(console.dir);

});
router.get('/subjects', async (req, res) => {

    const client = new MongoClient(url, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
        });
        async function run() {
            try {
                const db = await client.connect();
                const dbo = db.db('nodestudentssubjects')
    
                try{
                    const result = await dbo.collection('subjects').find().toArray()
                    if(result != null){
                        res.json(result)
                    }
                    else{
                        res.json({'Error':'404'})
                    }
                }
                catch (e){
                    throw e
                }
    
                await db.close()
            }
            finally {
                await client.close();
            }
        }
        run().catch(console.dir);
});
router.get('/subjects/:id', async (req, res) => {
    const subjectId = Number(req.params.id);

    const client = new MongoClient(url, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
        });
        async function run() {
            try {
                const db = await client.connect();
                const dbo = db.db('nodestudentssubjects')
    
                try{
                    const result = await dbo.collection('subjects').find({'id':subjectId}).toArray()
                    if(result != null){
                        res.json(result)
                    }
                    else{
                        res.json({'Error':'404'})
                    }
                }
                catch (e){
                    throw e
                }
    
                await db.close()
            }
            finally {
                await client.close();
            }
        }
        run().catch(console.dir);
})
router.get('/contact', async (req, res) => {

    const client = new MongoClient(url, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
        });
        async function run() {
            try {
                const db = await client.connect();
                const dbo = db.db('nodestudentssubjects')
    
                try{
                    const result = await dbo.collection('contact').find().toArray()
                    if(result != null){
                        res.json(result)
                    }
                    else{
                        res.json({'Error':'404'})
                    }
                }
                catch (e){
                    throw e
                }
    
                await db.close()
            }
            finally {
                await client.close();
            }
        }
        run().catch(console.dir);
});

module.exports = router