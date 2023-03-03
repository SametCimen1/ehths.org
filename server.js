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
var path = require('path');
const fileUpload = require('express-fileupload');
const bcrypt = require('bcryptjs');
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
app.use(express.static('client/build'))



    
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
});

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

app.post("/getClubs",  async(req,res) => {
    const userId = await getUserIndex(req);
    console.log('userid', userId)
    if(userId === false){
        const data = await pool.query("SELECT * FROM clubs");
        res.json(data.rows)
    }
    else{
        const data = await pool.query("SELECT * FROM members WHERE userid != $1", [userId])
        console.log("GET CLUBS USER SIGNED IN", data)
        if(data.rowCount === 0){
            const data = await pool.query("SELECT * FROM clubs");
            res.json(data.rows)
        }else{
            const arr = [];
            for(let i = 0; i<data.rowCount; i++){
                const myData = await pool.query("SELECT * FROM clubs WHERE id = $1", [data.rows[i].clubid]);
                console.log("my data", myData)
                arr.push(myData.rows)
            }
            res.json(arr)
        }

    }

})

app.post("/getAllClubs",  async(req,res) => {
    const userId = await getUserIndex(req);
    const data = await pool.query("SELECT * FROM clubs");
    res.json(data.rows)

})
app.post("/getEverything",  async(req,res) => {
    const data = await pool.query("SELECT * FROM users")
    res.json(data.rows)
})

app.post("/getClubInfo",  async(req,res) => {
    const id = req.body.id;
    const data = await pool.query("SELECT * FROM clubs WHERE id = $1", [id])
    res.json(data.rows[0])
})
app.post("/joinClub",  async(req,res) => {
    try {
        const userId = await getUserIndex(req);
        const id = req.body.id;
        const data = await pool.query("INSERT INTO members(userid, clubid) VALUES($1, $2)", [userId, id])
        res.json('ok')        
    } catch (error) {
        res.json('err')
    }


})
app.post("/leaveClub",  async(req,res) => {
    const userId = await getUserIndex(req);
    const id = req.body.id;
    console.log("LEAVING CLUB", userId)
    const data = await pool.query("DELETE FROM members WHERE userid = $1 AND clubid = $2", [userId, id])
    res.json(data.rows[0])
})
app.post("/deleteClub",  async(req,res) => {
    const userId = await getUserIndex(req);
    const id = req.body.id;
    console.log("DELETING CLUB", userId)
    try {
        const data2 = await pool.query("DELETE FROM events WHERE clubid = $1", [id])
        const data3 = await pool.query("DELETE FROM members WHERE clubid = $1", [id])
        const data = await pool.query("DELETE FROM clubs WHERE id = $1", [id])
        console.log("SUCEESFULY DELETED")
        res.json('ok')        
    } catch (error) {
        const data2 = await pool.query("DELETE FROM events WHERE clubid = $1", [id])
        const data3 = await pool.query("DELETE FROM members WHERE clubid = $1", [id])
        const data = await pool.query("DELETE FROM clubs WHERE id = $1", [id])
        console.log("SUCEESFULY ERROR", error)
        res.json('failed')
    }

})

app.post('/createStudent', async(req,res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.studentPassword, salt);

        const data = await pool.query("INSERT INTO users(email, password, role, active, activeCode, name, friends, add_id, about, ownimg, image, friendrequests, points, grade) VALUES($1, $2, $3,$4,$5, $6, $7, $8, $9, $10, $11, $12, $13, $14)",[req.body.studentEmail, hashPassword, req.body.studentRole, true, '', req.body.studentName, [], req.body.studentEmail, '', false, req.body.studentImage, [], 0, Number(req.body.studentGrade)]);
        res.json('ok')
    } catch (error) {
        console.log('creating student error', error)
        res.json('error')
    }
})

app.post("/getamiadmin", async(req,res) => {
    const userId = await getUserIndex(req);
    if(userId === false){
        res.json(false);
    }
    else{
        const data = await pool.query("SELECT role FROM users WHERE id = $1", [userId])
        try {
            res.json(data.rows[0].role === 'admin')        
        } catch (error) {
            res.json(false)
        }
    
    }

})

app.post("/amiin",  async(req,res) => {
    const userId = await getUserIndex(req);
    if(userId === false){
        res.json(false);
    }
    else{
        const id = req.body.id;
        const data = await pool.query("SELECT * FROM members WHERE userid = $1 AND clubid = $2", [userId, id])
        res.json(data.rowCount > 0)
    }

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
    const data = await pool.query("SELECT * FROM events WHERE clubid = $1 AND checkedin = false", [req.body.id])
    res.json(data.rows)
})
app.post("/getAllEvents",  async(req,res) => {
    const data = await pool.query("SELECT * FROM events WHERE checkedin = false")
    res.json(data.rows)
})

app.post("/getPeopleSignedUp",  async(req,res) => {
    const data = await pool.query("SELECT userid FROM signups WHERE clubid = $1 AND eventid = $2", [req.body.clubID, req.body.eventID ])
    const newArr = []
    for(let i = 0; i<data.rows.length; i++){
        const user = await pool.query("SELECT id, name, image FROM users WHERE id = $1", [data.rows[i].userid])
        console.log("LOGGING user", user.rows[0])
        newArr.push(user.rows[0]);
    }
    res.json(newArr)
})
app.post("/givepoints",  async(req,res) => {
    console.log("GIVE POINT", req.body.givePoint)
    const givePoint = Number(req.body.givePoint)
    console.log("GIVE POINT", typeof(givePoint))
    console.log("GIVE POINT", givePoint)
    for(let i = 0; i<givePoint.length; i++){
        const getUser =  await pool.query("SELECT * FROM users WHERE id = $1 ", [givePoint[i]])
        let point = getUser.rows[0].points + req.body.eventPoint;
        const data = await pool.query("UPDATE users SET points = $1 WHERE id = $2 ", [point, givePoint[i]])
    }

    res.json('ok')
})




app.post("/signupEvent",  async(req,res) => {
    try {
        const userId = await getUserIndex(req);
        const data = await pool.query("INSERT INTO signups(eventid, userid, clubid, header, description) VALUES ($1, $2, $3, $4, $5)", [req.body.id, userId, req.body.clubid, req.body.header, req.body.description])
        res.json(true)        
    } catch (error) {
        console.log("ERROR COCRUERD", error)
        res.json(false)
    }
})

app.post('/getnine', async(req,res) => {
    try {
        const data = await pool.query("SELECT id FROM users WHERE grade = 9");
        const studentIDS = data.rows; 
        const randomID = Math.random() * studentIDS.length
        console.log('students ids', studentIDS)

        const winner = await pool.query("SELECT * FROM users WHERE id = $1", [studentIDS[randomID].id])
        console.log('winner', winner)
        res.json(winner.rows[0])        

    } catch (error) {
        console.log("ERROR COCRUERD", error)
        res.json(false)
    }
})

app.post('/getten', async(req,res) => {
    try {
        const data = await pool.query("SELECT id FROM users WHERE grade = 9");
        const studentIDS = data.rows; 
        const randomID = Math.random() * studentIDS.length
        console.log('students ids', studentIDS)

        const winner = await pool.query("SELECT * FROM users WHERE id = $1", [studentIDS[randomID].id])
        console.log('winner', winner)
        res.json(winner.rows[0])        

    } catch (error) {
        console.log("ERROR COCRUERD", error)
        res.json(false)
    }
})

app.post('/geteleven', async(req,res) => {
    try {
        const data = await pool.query("SELECT id FROM users WHERE grade = 9");
        const studentIDS = data.rows; 
        const randomID = Math.random() * studentIDS.length
        console.log('students ids', studentIDS)

        const winner = await pool.query("SELECT * FROM users WHERE id = $1", [studentIDS[randomID].id])
        console.log('winner', winner)
        res.json(winner.rows[0])        

    } catch (error) {
        console.log("ERROR COCRUERD", error)
        res.json(false)
    }
})

app.post('/gettwelve', async(req,res) => {
    try {
        const data = await pool.query("SELECT id FROM users WHERE grade = 9");
        const studentIDS = data.rows; 
        const randomID = Math.random() * studentIDS.length
        console.log('students ids', studentIDS)

        const winner = await pool.query("SELECT * FROM users WHERE id = $1", [studentIDS[randomID].id])
        console.log('winner', winner)
        res.json(winner.rows[0])        

    } catch (error) {
        console.log("ERROR COCRUERD", error)
        res.json(false)
    }
})

app.post("/makepastevent",  async(req,res) => {
    try {
        const eventid = req.body.id
        const data = await pool.query("INSERT INTO pastevent(eventid) VALUES($1)", [eventid])
        const data2 = await pool.query("UPDATE events SET checkedin = true WHERE id = $1", [eventid])
        const data3 = await pool.query("DELETE FROM signups WHERE eventid = $1", [eventid])
        console.log('everyting is ok')
        res.json(true)        
    } catch (error) {
        console.log('make past even error', error)
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
app.post("/createClub",  async(req,res) => {
    try {

        const data = await pool.query("INSERT INTO clubs(name, description, picture, memberCount) VALUES ($1, $2, $3, $4)", [req.body.clubName, req.body.clubDescription, req.body.IMGurl , 0]);
        res.json('ok')  
    } catch (error) {
        console.log("ERROR COCCURED", error)
        res.json(false)
    }
})

app.post("/createClubEvent",  async(req,res) => {
    try {

        const data = await pool.query("INSERT INTO events(clubid, header, date, description, checkedin) VALUES ($1, $2, $3, $4, $5)", [req.body.clubid, req.body.eventName, req.body.eventDate ,req.body.eventDescription, false]);
        res.json('ok')  
    } catch (error) {
        console.log("ERROR COCCURED", error)
        res.json(false)
    }
})
app.post("/getCurrentEvents",  async(req,res) => {
    try {
        const data = await pool.query("SELECT * FROM events ORDER BY date LIMIT 5");
        res.json(data.rows)  
    } catch (error) {
        console.log("ERROR COCCURED", error)
        res.json(false)
    }
})

app.post("/getEvent",  async(req,res) => {
    try {
        const data = await pool.query("SELECT * FROM events WHERE id = $1", [req.body.id]);
        if(data.rows[0].checkedin === true){
            res.json(undefined)
        }
        else{
            res.json(data.rows[0])  
        }

    } catch (error) {
        console.log("ERROR COCCURED", error)
        res.json(false)
    }
})

app.post("/getPORT",  async(req,res) => {
    try {
        res.json(`localhost:${process.env.PORT}`)
    } catch (error) {
        res.json('localhost:5000')
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
