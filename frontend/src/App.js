
import React, { useEffect, useState , useRef} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Stage, Layer, Text  , Rect} from 'react-konva';
import io from "socket.io-client";

const socket = io("http://localhost:4000");

// Random id generator
const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

function App() {


  const [rects, setRects] = React.useState([]);
 

  const addNewRect = (x,y,width,height , id) => {
    const newRect = {
      x,
      y,
      width,
      height,
      id: id,
      color:"red"
    };
    setRects(prev => [...prev, newRect]);
  };

 const  handleDrawClick = () => {
    const randomX = Math.floor(Math.random() * 300);
    const randomY = Math.floor(Math.random() * 300);
    const id = generateId();
    addNewRect(randomX,randomY,101,110 , id);

    socket.emit("Draw",{x:randomX,y:randomY,width:100,height:100 , id:id});

  }


  useEffect(()=>{
    
    
    socket.on("Draw",(data)=>{

      addNewRect(data.x,data.y,data.width,data.height , data.id);
    });

    socket.on("DragEnd",(data)=>{

     setRects(prev=>
        prev.map((rect)=> rect.id === data.id ? {...rect,x:data.x,y:data.y} : rect

     )
    );


      
      // Update the rects state
      
    });

  }
  
  ,[]);  


  const  handleDragEnd = (e) => {
    const {x,y} = e.target.attrs;
    
    console.log(x,y);
    let id = e.target.id;

    rects.forEach((rect)=>{
      if(rect.id === e.target.attrs.id){
        id = rect.id;
        rect.x = x;
        rect.y = y;
        

      }
    });
    setRects(rects);


    socket.emit("DragEnd",{x:x,y:y,id:id});
    
  };

return(
  <>
  <button onClick={()=>{handleDrawClick()}}
  >Draw Rextangle</button>
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
      {rects.map((rect)=>(
        <Rect
        id={rect.id}
        key={rect.id}
        x={rect.x}
        y={rect.y}
        width={rect.width}
        height={rect.height}
        fill={rect.color}
        draggable
       onDragEnd={handleDragEnd}
        />
      ))}

      </Layer>
    </Stage>
    </> 
  );  
}

export default App;