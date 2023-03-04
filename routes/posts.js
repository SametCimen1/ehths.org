const router = require('express').Router();
const bodyParser = require('body-parser')
const pool = require('../Pool');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();





router.post("/getmoremypost", async(req,res) => {
    const userid = getUserIndex(req)
 if(req.body.type === 'community'){
     const data = await pool.query("SELECT * FROM groupposts WHERE userid= $1 AND id < $2 ORDER BY id DESC LIMIT 5", [userid, req.body.limit]);
     return res.json(data.rows)
    }
 else if(req.body.type === 'friendposts'){
    const data = await pool.query("SELECT * FROM friendposts WHERE userid= $1 AND id < $2 ORDER BY id DESC LIMIT 5", [userid, req.body.limit]);
    return res.json(data.rows)
}
 else if (req.body.type === 'post'){

   const data = await pool.query("SELECT * FROM posts WHERE userid= $1 AND id < $2 ORDER BY id DESC LIMIT 5", [userid, req.body.limit]);
  return res.json(data.rows)
}
else{
    res.status(500).json("error")
}

})

router.post("/deletepost", async(req,res) => {
    console.log("in deletepost")
    console.log(req.body)
    const userid = getUserIndex(req)
    if(req.body.type === 'community'){
        const data = await pool.query("DELETE FROM groupposts WHERE userid= $1 AND id = $2", [userid, req.body.id]);
        return res.json(data.rows)
       }
    else if(req.body.type === 'friendposts'){
        const data = await pool.query("DELETE FROM friendposts WHERE userid= $1 AND id = $2", [userid, req.body.id]);
       return res.json(data.rows)
   }
    else if (req.body.type === 'post'){
        const data = await pool.query("DELETE FROM posts WHERE userid= $1 AND id = $2", [userid, req.body.id]);
       return res.json(data.rows)
   }
   else{
       console.log('error')
       
       res.status(500).json("error")
   }
})

router.put("/getpopuler", async(req,res) => {
    const data = await pool.query("SELECT * FROM friendposts LIMIT 5");
    const userid = getUserIndex(req)
    if(data.rowCount > 0){
        const arr = [];
        for(let i =0; i<data.rows.length; i++){
            const obj = {
                didILike:data.rows[i].likedby.includes(userid),
                comments:data.rows[i].comments,
                id:data.rows[i].id,
                likes:data.rows[i].likes,
                text:data.rows[i].text,
                title: data.rows[i].title,
                uploadtime:data.rows[i].uploadtime,
                userid:data.rows[i].userid
            }
            arr.push(obj);   
        }
        return res.status(200).json(arr)
    }
    else{
        res.json("no more post avaible")
    }
})

router.put("/getmorepopuler", async(req,res) => {
    const data = await pool.query("SELECT * FROM friendposts WHERE id < $1 ORDER BY likes DESC LIMIT 5", [req.body.smallestPopuler]);
    const userid = getUserIndex(req)
    if(data.rowCount > 0){
        const arr = [];
        for(let i =0; i<data.rows.length; i++){
            const obj = {
                didILike:data.rows[i].likedby.includes(userid),
                comments:data.rows[i].comments,
                id:data.rows[i].id,
                likes:data.rows[i].likes,
                text:data.rows[i].text,
                title: data.rows[i].title,
                uploadtime:data.rows[i].uploadtime,
                userid:data.rows[i].userid
            }
            arr.push(obj);   
        }

        return res.status(200).json(arr)
    }
    else{

        res.json("no more post avaible")
    }
})

router.put("/getmoremygroups", async(req,res) => {
    const smallest = req.body.smallestMyGroupIndex;
    const userid = getUserIndex(req)
    try {
        const data = await pool.query("SELECT * FROM groups WHERE id < $1 AND $2 = ANY (members)  ORDER BY id DESC LIMIT 5", [smallest, userid])

        const rows = data.rows
        if(rows.length === 0){
            res.json([])
        }
        else{
            
            const arr = [];
            for(let i =0; i< rows.length; i++){
                const obj = {
                    id:rows[i].id,
                    didIJoin:rows[i].members.includes(userid),
                    groupname: rows[i].groupname,
                    memberCount:rows[i].members.length,
                    groupTitle: rows[i].grouptitle,
                    groupDescription: rows[i].groupdescription,
                    groupimage: rows[i].groupimage
                }
                arr.push(obj)
            }
            res.json(arr)
        }
    } catch (error) {
        res.status(500).json(rows)

    }
})
router.put("/getmoregroups", async(req,res) => {
    const smallest = req.body.smallestGroupIndex;
    console.log("GET MORE GROUPS", smallest)
    try {
        const data = await pool.query("SELECT * FROM groups WHERE id < $1 ORDER BY id DESC LIMIT 5", [999999])

        const rows = data.rows
        console.log(rows)
        if(rows.length === 0){
            res.json([])
        }
        else{
            const arr = [];
            const userid = getUserIndex(req)
            if(userid === false){
                for(let i =0; i< rows.length; i++){
                    const obj = {
                        id:rows[i].id,
                        didIJoin:false,
                        groupname: rows[i].groupname,
                        memberCount:rows[i].members.length,
                        groupTitle: rows[i].grouptitle,
                        groupDescription: rows[i].groupdescription,
                        groupimage: rows[i].groupimage
                    }
                    arr.push(obj)
                }
            }else{
                for(let i =0; i< rows.length; i++){
                    const obj = {
                        id:rows[i].id,
                        didIJoin:rows[i].members.includes(userid),
                        groupname: rows[i].groupname,
                        memberCount:rows[i].members.length,
                        groupTitle: rows[i].grouptitle,
                        groupDescription: rows[i].groupdescription,
                        groupimage: rows[i].groupimage
                    }
                    arr.push(obj)
                }
            }

            res.json(arr)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)

    }
})

router.post("/getcomments" , async(req,res) => {
    const type = req.body.type;
   const data = await pool.query("SELECT * FROM comments WHERE postid = $1 AND posttype = $2 ORDER BY id DESC", [req.body.postid, type])
   res.json(data.rows)
});

router.put("/amigroupowner", async(req,res) => {
    const userid = getUserIndex(req)
    const groupId = req.body.groupId;
    const data = await pool.query("SELECT createdby FROM groups WHERE id = $1", [groupId]);
    res.json(userid === data.rows[0].createdby)
})


router.post("/makeComment" , async(req,res) => {
    const type = req.body.type;
    const text = req.body.cmt;
    const userid = getUserIndex(req)
    if(type === "post"){
        const data = await pool.query("INSERT INTO comments(userid, text, posttype, postid) VALUES ($1, $2, $3, $4)", [userid, req.body.cmt, type, req.body.postid])
        const increaseComment = await pool.query("UPDATE posts SET comments = comments + $1  WHERE id = $2", [1, req.body.postid])
        return res.status(200).json("ok")
    }
    else if (type === "friendposts"){
        const data = await pool.query("INSERT INTO comments(userid, text, posttype, postid) VALUES ($1, $2, $3, $4)", [userid, req.body.cmt, type, req.body.postid])
        const increaseComment = await pool.query("UPDATE friendposts SET comments = comments + $1  WHERE id = $2", [1, req.body.postid])
        return res.status(200).json("ok")
    }
    else if (type === 'community'){
        const data = await pool.query("INSERT INTO comments(userid, text, posttype, postid) VALUES ($1, $2, $3, $4)", [userid, req.body.cmt, type, req.body.postid])
        const increaseComment = await pool.query("UPDATE groupposts SET comments = comments + $1  WHERE id = $2", [1, req.body.postid])
        return res.status(200).json("ok")
    }
    else{
        res.status(500).json("not found")
    }
   

});
router.post("/deletecomment" , async(req,res) => {
    try {
     const commentTypeData = await pool.query("SELECT posttype,postid FROM comments WHERE id = $1", [req.body.id])
     const commentType = commentTypeData.rows[0].posttype
     const postId = commentTypeData.rows[0].postid;
     console.log(commentType)
     if(commentType === 'friendposts'){
         const updateLikes = await pool.query('UPDATE friendposts SET comments = comments - $1  WHERE id = $2', [1, postId])
     }
     else if (commentType === "post"){
         const updateLikes = await pool.query('UPDATE posts SET comments = comments - $1  WHERE id = $2', [1, postId])
     }
     else if(commentType === "community"){
        console.log("here")
         const updateLikes = await pool.query('UPDATE groupposts SET comments = comments - $1  WHERE id = $2', [1, postId])
     }
     const data = await pool.query("DELETE FROM comments WHERE id = $1", [req.body.id]);
        
        return res.status(200).json(true);    
    } catch (error) {
        return res.status(500).json(false);   
    } 
});

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



module.exports = router;
