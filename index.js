const mongoose = require('mongoose');
const express=require('express');
const app=express();
const cors=require('cors');

app.use(cors({
    origin: '*'
}))

app.use(express.json())

mongoose.connect('mongodb://localhost/populate')
.then(()=>console.log("connected..."))
.catch((err)=>{console.log(err)})

const country=new mongoose.Schema({
    name:{type:String,
        required: true}
})

const Country=mongoose.model("Country",country)

const state=new mongoose.Schema({
    name:{type:String,
        required: true},
    id_c:{type: mongoose.Schema.Types.ObjectId,
            ref: 'Country',
            required:true}
})

const State=mongoose.model("State",state)

const city=new mongoose.Schema({
    name:{type:String,
        required: true},
    id_c:{type: mongoose.Schema.Types.ObjectId,
            ref: 'State',
            required:true}
})

const City=mongoose.model("City",city)

const addCountry= async(country,res)=>{
    const same=await Country.find({name:country})
    if(same[0])return res.send("already added")
    

    const add=new Country({name:country})
    add.save()
    .then(()=>res.send(`${country} added`))
    .catch((err)=>{
        res.status(400)
        res.send(err)})
    
}

const addState= async(state,id,res)=>{
    const same=await State.find({name:state})
    if(same[0])return res.send("already added")
    

    const add=new State({name:state,id_c:id})
    add.save()
    .then(()=>res.send(`${state} added`))
    .catch((err)=>{
        res.status(400)
        res.send(err)})
    
}

const addCity= async(city,id,res)=>{
    const same=await City.find({name:city})
    if(same[0])return res.send("already added")
    
    const add=new City({name:city,id_c:id})
    add.save()
    .then(()=>res.send(`${city} added`))
    .catch((err)=>{
        res.status(400)
        res.send(err)})
    
}

app.post('/:country/:state/:city',(req,res)=>{
   
    State.find({name:req.params.state})
    .then(data=>{
       
        addCity(req.params.city,data[0]._id,res)
    })
    
})

app.post('/:country/:state',(req,res)=>{
    Country.find({name:req.params.country})
    .then(data=>{
        addState(req.params.state,data[0]._id,res)
    })
    
})

app.post('/:country',(req,res)=>{
    addCountry(req.params.country,res)
   
})

app.get('/',(req,res)=>{
    Country
    .find()
    .select('name')
    .sort({name:1})
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{res.send(err)})
    
})
app.get('/:country',(req,res)=>{
   
    Country.find({name:req.params.country})
    .then(data=>{
        State
        .find({id_c:data[0]._id})
        .select('name')
        .sort({name:1})
        .then(data=>{
           
            res.send(data)
        }).catch(err=>{res.send(err)}) 
    }).catch(err=>{res.send(err)})
    
})

app.get('/:country/:state',(req,res)=>{
   
    State.find({name:req.params.state})
    .then(data=>{
        City
        .find({id_c:data[0]._id})
        .select('name')
        .sort({name:1})
        .then(data=>{
            res.send(data)
        }).catch(err=>{res.send(err)}) 
    }).catch(err=>{res.send(err)})
    
})

app.listen(3000,()=>console.log("running at port 3000..."))