const express = require("express")
helmet = require("helmet")
const http = require("http")    
cors = require("cors")
const {Server} = require("socket.io")
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(helmet())
app.use(cors(
    {
        origin: "*"
        ,
        methods: ["GET" , "POST"]
    }
)
)


require("dotenv").config()
const serverconf = http.Server(app)
const io = new Server(serverconf , {
    cors:{
        origin: "*"
    }
    ,
    methods: ["GET" , "POST"]
});

let rectangles = [];
io.on("connection" , (socket)=>{

    socket.emit("existing_rectangles" , rectangles)

    socket.on("Draw" , (data)=>{
     
        rectangles.push(data)
        socket.broadcast.emit("Draw" , data)
    
    })

    socket.on("DragEnd" , (data)=>{

        rectangles = rectangles.map(rect => {
            if (rect.id === data.id) {
              return { ...rect, x: data.x, y: data.y };
            }
            return rect;
          });
        socket.broadcast.emit("DragEnd" , data)
    })

socket.on("disconnect" , ()=>{
    console.log("A user disconnected" , socket.id   )
})





});





app.get("/api" , (req , res)=>{
    res.send("Hello World")
});

serverconf.listen(4000, () => {
    console.log("Server is running on port 4000");
});

  
