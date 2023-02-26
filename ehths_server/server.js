const express = require('express');
const app = express();
const auth = require('./routes/auth');
const user = require('./routes/user');
const posts = require('./routes/posts');
const router = require('./routes/router')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./routes/groups');
const cors = require('cors');
const bodyParser = require('body-parser')
const verifyToken = require('./routes/verifyToken')
const cookieParser = require('cookie-parser')
const pool = require('./Pool')
const jwt = require('jsonwebtoken');

const fileUpload = require('express-fileupload');
// const socketio = require('socket.io');
// const http = require('http');




const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, ()=>{
    console.log("listening")
});
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});




app.use(cookieParser())
app.use(fileUpload())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
}) 

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
  }
app.use(cors(corsOptions))
app.use(bodyParser.json());


app.use(express.static('userimg'))





app.post('/userexist', async(req,res) => {
    const cookies = req.cookies;
    if(cookies._keh){
        const {_keh} = req.cookies;
        const verified = jwt.verify(_keh, process.env.TOKENSECRET);
        if(verified._id){
            try{
                const data = await pool.query('SELECT * FROM users WHERE id = $1', [verified._id]);
                const user = await data.rows[0];
                if(user){
                //   console.log('everything went ok user exist')
                  res.json(true);
                }  
            }
            catch (err){
             console.log(err)
            }
        }
    }
})

app.get("/getClubs",  async(req,res) => {
    const data = await pool.query("SELECT * FROM clubs")
    res.json(data.rows)
})
app.post("/getClubInfo",  async(req,res) => {
    const id = req.body.id;
    const data = await pool.query("SELECT * FROM clubs WHERE id = $1", [id])
    res.json(data.rows[0])
})
app.post("/joinClub",  async(req,res) => {
    const userId = await getUserIndex(req);
    const id = req.body.id;
    console.log("JOIN CLUB", userId)
    console.log("JOIN CLUB", id)
    const data = await pool.query("INSERT INTO members(userid, clubid) VALUES($1, $2)", [userId, id])
    res.json(data.rows[0])
})

app.post("/amiin",  async(req,res) => {
    const userId = await getUserIndex(req);
    const id = req.body.id;
    const data = await pool.query("SELECT * FROM members WHERE userid = $1 AND clubid = $2", [userId, id])
    res.json(data.rowCount > 0)
})

app.post("/getmyclubs",  async(req,res) => {
    const userId = await getUserIndex(req);
    const data = await pool.query("SELECT * FROM members WHERE userid = $1", [userId])
    const arr = [];
    for(let i = 0; i < data.rowCount; i++){
        const clubData = await pool.query("SELECT * FROM clubs WHERE id = $1", [data.rows[i].clubid]);
        arr.push(clubData.rows[0])
    }
    res.json(arr)
})
app.post("/getevents",  async(req,res) => {
    const data = await pool.query("SELECT * FROM events WHERE clubid = $1", [req.body.id])
    res.json(data.rows)
})

app.post("/signupEvent",  async(req,res) => {
    try {
        const userId = await getUserIndex(req);
        const data = await pool.query("INSERT INTO signups(eventid, userid, clubid, header, description) VALUES ($1, $2, $3, $4, $5)", [req.body.id, userId, req.body.clubid, req.body.header, req.body.description])
        res.json(true)        
    } catch (error) {
        res.json(false)
    }
})

app.post("/getIdofSignUps",  async(req,res) => {
    try {
        const data = await pool.query("SELECT eventid FROM signups WHERE clubid = $1", [req.body.id]);
        const arr = [];
        for(let i = 0; i < data.rowCount; i++){
            arr.push(data.rows[i].eventid)
        }
        res.json(arr)        
    } catch (error) {
        console.log("ERROR COCCURED", error)
        res.json(false)
    }
})

app.post("/getmyevents",  async(req,res) => {
    try {
        const userId = await getUserIndex(req);
        const data = await pool.query("SELECT * FROM signups WHERE userid = $1", [userId]);
        res.json(data.rows)        
    } catch (error) {
        console.log("ERROR COCCURED", error)
        res.json(false)
    }
})
app.post("/signOutEvent",  async(req,res) => {
    try {
        const userId = await getUserIndex(req);
        const data = await pool.query("DELETE FROM signups WHERE eventid = $1 AND userid = $2", [req.body.id, userId]);
        res.json('ok')  
    } catch (error) {
        console.log("ERROR COCCURED", error)
        res.json(false)
    }
})
app.post("/createClubEvent",  async(req,res) => {
    try {

        const data = await pool.query("INSERT INTO events(clubid, header, date, description) VALUES ($1, $2, $3, $4)", [req.body.clubid, req.body.eventName, req.body.eventDate ,req.body.eventDescription]);
        res.json('ok')  
    } catch (error) {
        console.log("ERROR COCCURED", error)
        res.json(false)
    }
})
app.post("/getCurrentEvents",  async(req,res) => {
    try {
        const data = await pool.query("SELECT * FROM events ORDER BY date LIMIT 10");
        res.json(data.rows)  
    } catch (error) {
        console.log("ERROR COCCURED", error)
        res.json(false)
    }
})

const getUserIndex = async(req, res) => {
    const cookies = req.cookies;
    if(cookies._keh){
        const {_keh} = req.cookies;
        const verified = jwt.verify(_keh, process.env.TOKENSECRET);
        if(verified._id){
            try{
                const data = await pool.query('SELECT * FROM users WHERE id = $1', [verified._id]);
                const user = await data.rows[0];
                if(user){
                //   console.log('everything went ok user exist')
                 return user.id
                }  
            }
            catch (err){
             return false;
            }
        }
    }return false;
}



app.use('/user', verifyToken,user);
app.use('/auth', auth);
app.use('/posts', verifyToken, posts);

io.on('connection',(socket) => {
  


   socket.on('join', ({friendName, myName, roomName}, callback) => {
    const { error, user } = addUser({ id: socket.id, name: myName, room: roomName, friendName:friendName});
 
    if(error) return callback(error);






    //  socket.broadcast() send message to everyone except who just joined
     socket.broadcast.to(roomName).emit('message', {user:"admin", text: myName + ' joined'})

     socket.join(roomName);

     socket.emit('message', {user:'admin', text:`welcome to the room`});


    //  const error =true
    //  if(error) {
    //     callback({error:"error"});
    //  }
 

    callback();
   });



   socket.on('sendMessage', (message, callback) => {
       const user = getUser(socket.id);





   
       if(typeof user === "undefined"){
      
           callback("userUndefined")
       }
       else{
        io.to(user.room).emit('message', { user: user.name, text: message });
       }

   })


   socket.on('disconnect', ()=>{
    const user = removeUser(socket.id);
   
       if(user) {
        io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
      }
   })

});


// server.listen(PORT, () => {
//     console.log(`listening on ${PORT}`)
// })