import React, { useState, useEffect } from 'react';
import Quagga from 'quagga';
import './index.css'


const  Scaning=(props) =>{

  let [result, setResult] = useState("");
  let [load,setLoader] = useState(true);
  let [count, setCount] = useState(0);


  const {scannerFunction} = props

  useEffect(() => {
    Quagga.init({
      inputStream: {
        type : 'LiveStream',
        constraints: {
          width: 600,
          height: 380,
          
          facingMode: "environment"
        },
        target: document.querySelector('#scanner')
      },
      decoder: {
        readers : ['code_128_reader']
      }
    }, function(err) {
        if (err) {
            console.log(err);
            return
        }
        console.log("starting")
        Quagga.start();
    });


/*
    Quagga.onProcessed(function(result) {
        var drawingCtx = Quagga.canvas.ctx.overlay,
            drawingCanvas = Quagga.canvas.dom.overlay;

        if (result) {
            if (result.boxes) {
                drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
                result.boxes.filter(function (box) {
                    return box !== result.box;
                }).forEach(function (box) {
                    Quagga.ImageDebug.drawPath(box, {x: 0, y: 1}, drawingCtx, {color: "green", lineWidth: 2});
                });
            }

            if (result.box) {
                Quagga.ImageDebug.drawPath(result.box, {x: 0, y: 1}, drawingCtx, {color: "#00F", lineWidth: 2});
            }

            if (result.codeResult && result.codeResult.code) {
                Quagga.ImageDebug.drawPath(result.line, {x: 'x', y: 'y'}, drawingCtx, {color: 'red', lineWidth: 3});
            }
        }
        
    }
    ); 
*/

    Quagga.onDetected(function(result) {
      console.log(result)
        setResult(result.codeResult.code);
        Quagga.stop();
    });
    
    return () => {
        Quagga.stop();
    }
  },[]);
  
  
  let scanning_function= ()=>{

    if(result !==''){
      console.log("here--------")

      scannerFunction(result)

    }
    
    

   


  //   let interval;
  //   const intervalFunction = ()=>{

  //     scannerFunction('20MH1A4248')
  //     clearInterval(interval)
  //   }

  //  interval =setTimeout(intervalFunction(),4000)

    function paraFunction(){
      const para = props.para
      switch(para){
        case 'failure':
          return <p className="error">Scanned data is inappropriate format, scan again..</p>
        case  'invalid':
          return <p className="error">Scanned data belongs to invalid user.</p>
        case 'voted':
          return <p className="error">You have already been voted.</p>
        default :
        return ''
      }
    }

    return(

            <div className="bg-container">
              <h1 className="heading">Scan for Voting</h1>
              <p className="head">{result? `Barcode value: ${result}` :''}</p>
             {paraFunction()}
             
              <div className='chekker'>
              <div id="scanner" className="scanner" ></div>
              </div>
            </div>
          ) 
    }
  return(
  scanning_function()
  )
}

export default Scaning