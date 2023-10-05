const mongoose = require('mongoose')
const dle=async()=>{
   await mongoose.connect('mongodb://127.0.0.1:27017/noteit', {
            useNewUrlParser: true,
            useUnifiedTopology: true
})
.then(res=>console.log('connected to db..'))
.catch(err=>console.log('error in connecting to db'))
const db = mongoose.connection
const modelnames = Object.keys(mongoose.models)
for (const modelname of modelnames){
    delete mongoose.models[modelname]
    delete mongoose.modelSchemas[modelname]
}
await db.close()
console.log('all models are deleted')
}
dle()
