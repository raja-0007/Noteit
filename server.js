const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const bodyParser = require('body-parser')
app.use(bodyParser.json())
const connectdb = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/noteit')
        console.log('db connected..')
    }
    catch (err) {
        console.log(err)
    }
}
//connectdb()
/*const noteschema = new mongoose.Schema({
    title: String,
    content: String,
    date: String,
    bgcolor: String,
    archive: Boolean,
    trash: Boolean
})
const remainderschema = new mongoose.Schema({
    todo: String,
    editing: Boolean
})
const notes = mongoose.model('notes', noteschema)
const archives = mongoose.model('archives', noteschema)
const trash = mongoose.model('trash', noteschema)
const remainders = mongoose.model('remainders', remainderschema)*/
const corsoptions = {
    origin: '*',
    optionSuccessStatus: 200
}
app.use(cors(corsoptions))

app.post('/api/authentication', async (req, res) => {
    console.log(req.body)
    let action = req.body.action

    if (action == 'signup') {
        let username = req.body.username
        let password = req.body.password
        let repassword = req.body.repassword
        await mongoose.connect('mongodb://127.0.0.1:27017/noteit', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(console.log('connected to db..'))
            .catch(err => console.log('error in connecting to db'))
        console.log('jelloo')

        let users = ''
        if (mongoose.models && mongoose.models.users) {
            users = mongoose.models.users
        }
        else {
            const userschema = new mongoose.Schema({
                username: String,
                password: String
            })
            users = mongoose.model('users', userschema)
        }

        const newuser = new users({
            username: username,
            password: password
        })


        let userslist = await users.find({ username: username })


        console.log(userslist)
        if (userslist.length == 0) {
            await newuser.save()
            console.log('signup success')
        }
        else {
            console.log('already exists')
        }
        mongoose.connection.close()
        /*try{
            let databaselist =  db.db.admin().listDatabases()
            console.log(databaselist)
        }
        catch(error){
            console.log('error in listing databases',error)
        }
        db.close(()=>console.log('connection closed'))*/
    }
    else if (action == 'logout') {
        //mongoose.connection.close()
        console.log('loggedout')
        
    }
    else if (action == 'login') {

        let username = req.body.username
        let password = req.body.password
        await mongoose.connect('mongodb://127.0.0.1:27017/noteit', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(console.log('connected to db..'))
            .catch(err => console.log('error in connecting to db'))

        let users = ''
        if (mongoose.models && mongoose.models.users) {
            users = mongoose.models.users
        }
        else {
            const userschema = new mongoose.Schema({
                username: String,
                password: String
            })
            users = mongoose.model('users', userschema)
        }



        let userslist = await users.find({ username: username })

        console.log(username)
        console.log(userslist)
        console.log(username)
        if (userslist.length == 0) {

            console.log('please signup')
            res.send(false)
            
        }
        else {
            console.log('login success')
            res.send(true)
            /*const initialdb = mongoose.connection
            const newdb = initialdb.useDb(username)
            mongoose.connection.close()
            let dburl = 'mongodb://127.0.0.1:27017/' + username
            console.log(dburl)
            await mongoose.connect(dburl, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
                .then(console.log('connected to new db..'))
                .catch(err => console.log('error in connecting to db....', err))


            */
            console.log(username)
            const currentuser = username
            let notes = ''
            let archives = ''
            let trash = ''
            let remainders = ''
            if (mongoose.models && mongoose.models.notes && mongoose.models.archives && mongoose.models.trash && mongoose.models.remainders) {
                notes = mongoose.models.notes
                archives = mongoose.models.archives
                trash = mongoose.models.trash
                remainders = mongoose.models.remainders

            }
            else {
                
                const noteschema = new mongoose.Schema({
                    title: String,
                    content: String,
                    date: String,
                    bgcolor: String,
                    archive: Boolean,
                    trash: Boolean,
                    userid: String,
                    password: String
                })
                
                const remainderschema = new mongoose.Schema({
                    todo: String,
                    editing: Boolean,
                    userid: String,
                    password: String
                })
                notes = mongoose.model('notes', noteschema)
                archives = mongoose.model('archives', noteschema)
                trash = mongoose.model('trash', noteschema)
                remainders = mongoose.model('remainders', remainderschema)
            }



            app.get('/api/notes/:id', async (req, res) => {
                const userid = req.params.id
                console.log(userid)
                const notelist = await notes.find({ userid: userid })
                console.log(notelist)
                res.json(notelist)
            })
            app.post('/api/notes', async (req, res) => {
                const action = req.body.action
                if (action == 'addnote') {
                    const note = new notes({
                        title: req.body.title,
                        content: req.body.content,
                        date: req.body.date,
                        bgcolor: req.body.bgcolor,
                        archive: req.body.archive,
                        trash: req.body.trash,
                        userid: username,
                        password: password
                    })
                    console.log(req.body)
                    await note.save()
                    res.send(note)
                }
                else if (action == 'editnote') {
                    const updatednote = await notes.findByIdAndUpdate(req.body.id, {
                        title: req.body.title,
                        content: req.body.content,

                        bgcolor: req.body.bgcolor,


                    }, { new: true })
                    res.send(updatednote)

                }

            })
            app.get('/api/archives', async (req, res) => {
                const notelist = await archives.find({ userid: currentuser })
                res.json(notelist)
            })
            app.post('/api/archives', async (req, res) => {
                const action = req.body.action

                if (action == 'archive') {

                    const archived = await notes.findByIdAndUpdate(req.body.id, { archive: true }, { new: true })

                    console.log(archived)

                    const newarchive = new archives(archived)
                    console.log(newarchive)

                    await notes.findByIdAndDelete(req.body.id)

                    await archives.insertMany([newarchive])

                    res.send(archived)
                }
                else if (action == 'unarchive') {
                    console.log(req.body.id)
                    const archived = await archives.findByIdAndUpdate(req.body.id, { archive: false }, { new: true })
                    console.log(archived)
                    const newnote = new notes(archived)
                    console.log(newnote)


                    await archives.findByIdAndDelete(req.body.id)

                    await notes.insertMany([newnote])

                    res.send(archived)
                }
                else if (action == 'editarchive') {
                    const updatedarchive = await archives.findByIdAndUpdate(req.body.id, {
                        title: req.body.title,
                        content: req.body.content,

                        bgcolor: req.body.bgcolor,


                    }, { new: true })
                    res.send(updatedarchive)
                }

            })
            app.get('/api/trash', async (req, res) => {
                const notelist = await trash.find({ userid: currentuser })
                res.json(notelist)
            })
            app.post('/api/trash', async (req, res) => {
                const action = req.body.action

                if (action == 'delete') {

                    const trashed = await notes.findById(req.body.id)
                    console.log(trashed)
                    const newtrash = new trash(trashed)
                    console.log(newtrash)

                    console.log(req.body.id)
                    await notes.findByIdAndDelete(req.body.id)

                    await trash.insertMany([newtrash])

                    res.send(trashed)
                }
                else if (action == 'delete_archive') {

                    const trashed = await archives.findById(req.body.id)
                    console.log(trashed)
                    const newtrash = new trash(trashed)
                    console.log(newtrash)

                    console.log(req.body.id)
                    await archives.findByIdAndDelete(req.body.id)

                    await trash.insertMany([newtrash])

                    res.send(trashed)
                }
                else if (action == 'restore') {
                    console.log(req.body.id)
                    const trashed = await trash.findById(req.body.id)
                    console.log(trashed)
                    const restorenote = new notes(trashed)
                    console.log(restorenote)
                    await trash.findByIdAndDelete(req.body.id)
                    if (restorenote.archive) {
                        await archives.insertMany([restorenote])
                    }
                    else {
                        await notes.insertMany([restorenote])
                    }


                    res.send(trashed)
                }

            })
            app.get('/api/remainders', async (req, res) => {
                const todolist = await remainders.find({ userid: currentuser })
                res.json(todolist)
            })
            app.post('/api/remainders', async (req, res) => {
                const action = req.body.action
                if (action == 'addtodo') {
                    const newtodo = new remainders({
                        todo: req.body.todo,
                        editing: req.body.editing
                    })
                    await newtodo.save()
                    res.send(newtodo)
                }
                else if (action == 'deletetodo') {
                    await remainders.findByIdAndDelete(req.body.id)
                    const todolist = await remainders.find({ userid: currentuser })
                    res.send(todolist)
                }
                else if (action == 'edittodo') {
                    await remainders.findByIdAndUpdate(req.body.id, {
                        editing: true
                    }, { new: true })
                        .then(res => console.log(res))
                        .catch(err => console.log('error in updating'))

                    const todolist = await remainders.find({ userid: username })
                    res.send(todolist)
                }
                else if (action == 'saveedit') {
                    await remainders.findByIdAndUpdate(req.body.id, {
                        editing: false,
                        todo: req.body.todo
                    }, { new: true })
                        .then(res => console.log(res))
                        .catch(err => console.log('error in updating'))

                    const todolist = await remainders.find({ userid: currentuser })
                    res.send(todolist)
                }
            })
            
        }

        /*try{
            let databaselist =  db.db.admin().listDatabases()
            console.log(databaselist)
        }
        catch(error){
            console.log('error in listing databases',error)
        }
        db.close(()=>console.log('connection closed'))*/
    }

})
/*app.get('/api/notes', async (req, res) => {
    const notelist = await notes.find({})
    res.json(notelist)
})
app.post('/api/notes', async (req, res) => {
    const action = req.body.action
    if (action == 'addnote') {
        const note = new notes({
            title: req.body.title,
            content: req.body.content,
            date: req.body.date,
            bgcolor: req.body.bgcolor,
            archive: req.body.archive,
            trash: req.body.trash
        })
        console.log(req.body)
        await note.save()
        res.send(note)
    }
    else if (action == 'editnote') {
        const updatednote = await notes.findByIdAndUpdate(req.body.id, {
            title: req.body.title,
            content: req.body.content,

            bgcolor: req.body.bgcolor,


        }, { new: true })
        res.send(updatednote)

    }

})
app.get('/api/archives', async (req, res) => {
    const notelist = await archives.find({})
    res.json(notelist)
})
app.post('/api/archives', async (req, res) => {
    const action = req.body.action

    if (action == 'archive') {

        const archived = await notes.findByIdAndUpdate(req.body.id, { archive: true }, { new: true })

        console.log(archived)

        const newarchive = new archives(archived)
        console.log(newarchive)
        
        await notes.findByIdAndDelete(req.body.id)

        await archives.insertMany([newarchive])

        res.send(archived)
    }
    else if (action == 'unarchive') {
        console.log(req.body.id)
        const archived = await archives.findByIdAndUpdate(req.body.id, { archive: false }, { new: true })
        console.log(archived)
        const newnote = new notes(archived)
        console.log(newnote)
        

        await archives.findByIdAndDelete(req.body.id)

        await notes.insertMany([newnote])

        res.send(archived)
    }
    else if (action == 'editarchive') {
        const updatedarchive = await archives.findByIdAndUpdate(req.body.id, {
            title: req.body.title,
            content: req.body.content,

            bgcolor: req.body.bgcolor,


        }, { new: true })
        res.send(updatedarchive)
    }

})
app.get('/api/trash', async (req, res) => {
    const notelist = await trash.find({})
    res.json(notelist)
})
app.post('/api/trash', async (req, res) => {
    const action = req.body.action

    if (action == 'delete') {

        const trashed = await notes.findById(req.body.id)
        console.log(trashed)
        const newtrash = new trash(trashed)
        console.log(newtrash)
        
        console.log(req.body.id)
        await notes.findByIdAndDelete(req.body.id)

        await trash.insertMany([newtrash])

        res.send(trashed)
    }
    else if (action == 'delete_archive') {

        const trashed = await archives.findById(req.body.id)
        console.log(trashed)
        const newtrash = new trash(trashed)
        console.log(newtrash)
        
        console.log(req.body.id)
        await archives.findByIdAndDelete(req.body.id)

        await trash.insertMany([newtrash])

        res.send(trashed)
    }
    else if (action == 'restore') {
        console.log(req.body.id)
        const trashed = await trash.findById(req.body.id)
        console.log(trashed)
        const restorenote = new notes(trashed)
        console.log(restorenote)
        await trash.findByIdAndDelete(req.body.id)
        if (restorenote.archive) {
            await archives.insertMany([restorenote])
        }
        else {
            await notes.insertMany([restorenote])
        }


        res.send(trashed)
    }

})
app.get('/api/remainders', async (req, res) => {
    const todolist = await remainders.find({})
    res.json(todolist)
})
app.post('/api/remainders', async (req, res) => {
    const action = req.body.action
    if(action == 'addtodo'){
        const newtodo = new remainders({
            todo: req.body.todo,
            editing: req.body.editing
        })
        await newtodo.save()
        res.send(newtodo)
    }
    else if(action == 'deletetodo'){
        await remainders.findByIdAndDelete(req.body.id)
        const todolist = await remainders.find({})
        res.send(todolist)
    }
    else if(action == 'edittodo'){
        await remainders.findByIdAndUpdate(req.body.id,{
            editing:true
        },{new:true})
        .then(res=>console.log(res))
        .catch(err=>console.log('error in updating'))

        const todolist = await remainders.find({})
        res.send(todolist)
    }
    else if(action == 'saveedit'){
        await remainders.findByIdAndUpdate(req.body.id,{
            editing:false,
            todo: req.body.todo
        },{new:true})
        .then(res=>console.log(res))
        .catch(err=>console.log('error in updating'))
        
        const todolist = await remainders.find({})
        res.send(todolist)
    }
})*/
app.listen(777, console.log('server started...'))