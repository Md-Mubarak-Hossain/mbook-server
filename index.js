const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app=express()
const port=process.env.PORT||5002;
require('dotenv').config()

app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
res.send('mbook-2023 server is running...')
})

app.listen(port,()=>{
    console.log(`The mbook server running port no:${port}`)
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mbookcluster.b8ezfvr.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const database=client.db('mbook')
        const chatCollection=database.collection('chats')
        const userCollection=database.collection('users')
        const groupCollection=database.collection('group')

app.get('/user',async(req,res)=>{
    const query={};
    const cursor=userCollection.find(query)
    const result=await cursor.toArray();
    res.send(result);
})

app.get('/user/:id',async(req,res)=>{
    const id=req.params.id;
    const user={_id:ObjectId(id)};
    const result=await userCollection.findOne(user)
    res.send(result);
})

app.post('/user',async(req,res)=>{
    const user=req.body;
    const result=await userCollection.insertOne(user);
    res.send(result);
})

app.patch('/user/:id',async(req,res)=>{
    const id=req.params.id;
    const filter={_id:ObjectId(id)}
    const doc=req.body;
    const docDoc={
        $set:{
            name:doc.name,
            email:doc.email
        }
    }
    const result=await userCollection.updateOne(filter,docDoc)
    res.send(result)
})

app.delete('/user/:id',async(req,res)=>{
    const id=req.params.id;
    const user={_id:ObjectId(id)};
    const result=await userCollection.deleteOne(user)
    res.send(result);
})
app.get('/chat',async(req,res)=>{
    const query={};
    const cursor=chatCollection.find(query)
    const result=await cursor.toArray();
    res.send(result);
})

app.get('/chat/:id',async(req,res)=>{
    const id=req.params.id;
    const chat={_id:ObjectId(id)};
    const result=await chatCollection.findOne(chat)
    res.send(result);
})

app.post('/chat',async(req,res)=>{
    const chat=req.body;
    const result=await chatCollection.insertOne(chat);
    res.send(result);
})

app.patch('/chat/:id',async(req,res)=>{
    const id=req.params.id;
    const filter={_id:ObjectId(id)}
    const doc=req.body;
    const docDoc={
        $set:{
            name:doc.name,
            email:doc.email
        }
    }
    const result=await chatCollection.updateOne(filter,docDoc)
    res.send(result)
})

app.delete('/chat/:id',async(req,res)=>{
    const id=req.params.id;
    const chat={_id:ObjectId(id)};
    const result=await chatCollection.deleteOne(chat)
    res.send(result);
})
app.get('/group',async(req,res)=>{
    const query={};
    const cursor=groupCollection.find(query)
    const result=await cursor.toArray();
    res.send(result);
})

app.get('/group/:id',async(req,res)=>{
    const id=req.params.id;
    const group={_id:ObjectId(id)};
    const result=await groupCollection.findOne(group)
    res.send(result);
})

app.post('/group',async(req,res)=>{
    const group=req.body;
    const result=await groupCollection.insertOne(group);
    res.send(result);
})

app.patch('/group/:id',async(req,res)=>{
    const id=req.params.id;
    const filter={_id:ObjectId(id)}
    const doc=req.body;
    const docDoc={
        $set:{
            name:doc.name,
            email:doc.email
        }
    }
    const result=await groupCollection.updateOne(filter,docDoc)
    res.send(result)
})

app.delete('/group/:id',async(req,res)=>{
    const id=req.params.id;
    const group={_id:ObjectId(id)};
    const result=await groupCollection.deleteOne(group)
    res.send(result);
})

    }
    finally{
// finally code run
    }

}
run().catch(error=>console.error(error))

