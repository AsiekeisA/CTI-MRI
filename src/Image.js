import { useEffect, useRef, useState } from "react"
import styles from './image.css'

export default function Image(props){
    const pic1 = props.pic1
    const pic2 = props.pic2
    const firstHit1 = props.firstHit1
    const firstHit2 = props.firstHit2
    const ratioValue = props.ratioValue
    const X=parseInt(props.X)
    const Y=parseInt(props.Y)
    const rows=props.rows
    const cols=props.cols
    const pics=props.pics
    const windowCenter1 = parseInt(props.windowCenter1)
    const windowCenter2 = parseInt(props.windowCenter2)
    const windowWidth1 = parseInt(props.windowWidth1)
    const windowWidth2 = parseInt(props.windowWidth2)
    const scale=props.scale
    const slope1=parseInt(props.slope1)
    const slope2=parseInt(props.slope2)
    const intercept1=parseInt(props.intercept1)
    const intercept2=parseInt(props.intercept2)
    const view=props.view
    const [pic, setPic] = useState(Math.round(pics/2))
    
    const handleChangePic = (event) => {
        const value = event.target.value
        const intValue = parseInt(value, 10) 
        setPic(intValue)
    }

    const whichImg = (x,y,z,pict) =>{
        switch (view) {
            case "top":
                return pict[x+y*Y+Y*X*z]
            case "side":
                return pict[z+x*Y+Y*X*y]
            case "front":
                return pict[x+z*Y+Y*X*y]
        }
    }

    const changePic=(v) =>{
        if(v){
            if (pic === pics-1){
                setPic(0)
            } else {
                setPic(pic+1)
            }
        } else {
            if (pic === 0){
                setPic(pics-1)
            } else {
                setPic(pic-1)
            }
        }
    }

    const makePixel = (pix, wc,ww,s,i) => {
        const pixel = s*pix+i
        if (pixel <= (wc - ww)){
            return 0
        } else if (pixel >= (wc + ww)){
            return 255
        } else {
             return Math.round((pixel-(wc - ww))/(2*ww)*255)
        }
    }

    const MIP = (x, y,pict) => {
        var temp = 0
        for (var i=0; i<pics; i++){
            const pixel = whichImg(x,y,i,pict)
            if (temp<pixel) {   
                temp = pixel   
            }
        }
        return temp
    }

    const average = (x, y,pict) => {
        var temp = 0
        for (var i=0; i<pics; i++){
            temp += whichImg(x,y,i,pict)
        }
        return Math.round(temp/pics)
    }

    const firstHit = (x, y, pict, fh,wc,ww,s,i) => {
        for (var i=0; i<pics; i++){
            const px = whichImg(x,y,i,pict)
            if (px >= fh)
                return makePixel(px,wc,ww,s,i)
        }
        return 0
    }

    const canvasRef1 = useRef(null)
    const canvasRef2 = useRef(null)
    useEffect(() =>{
        const canvas1 = canvasRef1.current
        const canvas2 = canvasRef2.current
        const context1 = canvas1.getContext('2d')
        const context2 = canvas2.getContext('2d')
        canvas1.width = cols
        canvas1.height = rows*scale
        canvas2.width = cols
        canvas2.height = rows*scale
            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    var pixel1 = 0
                    var pixel2 = 0
                    var value1 = 0
                    var value2 = 0
                    switch(props.ratioValue){
                        case 'None':
                            pixel1 = whichImg(x,y,pic,pic1)
                            pixel2 = whichImg(x,y,pic,pic2)
                            value1 = makePixel(pixel1,windowCenter1,windowWidth1,slope1, intercept1)
                            value2 = makePixel(pixel2,windowCenter2,windowWidth2,slope2, intercept2)
                            break
                        case 'MIP':
                            pixel1 = MIP(x,y,pic1)
                            pixel2 = MIP(x,y,pic2)
                            value1 = makePixel(pixel1,windowCenter1,windowWidth1,slope1, intercept1)
                            value2 = makePixel(pixel2,windowCenter2,windowWidth2,slope2, intercept2)
                            break
                        case 'Average':
                            pixel1 = average(x,y,pic1)
                            pixel2 = average(x,y,pic2)
                            value1 = makePixel(pixel1,windowCenter1,windowWidth1,slope1, intercept1)
                            value2 = makePixel(pixel2,windowCenter2,windowWidth2,slope2, intercept2)
                            break
                        case 'First Hit':
                            value1 = firstHit(x,y,pic1,firstHit1,windowCenter1,windowWidth1,slope1,intercept1)
                            value2 = firstHit(x,y,pic2,firstHit2,windowCenter2,windowWidth2,slope2,intercept2)
                            break
                        default:
                            pixel1 = whichImg(x,y,pic,pic1)
                            pixel2 = whichImg(x,y,pic,pic2)
                            break
                    }
                    // const pixel1 = MIP(x,y,pic1)
                    // const pixel2 = MIP(x,y,pic2)
                    // const value1 = makePixel(pixel1,windowCenter1,windowWidth1,slope1, intercept1)
                    // const value2 = makePixel(pixel2,windowCenter2,windowWidth2,slope2, intercept2)
                    context1.fillStyle = `rgba(${value1}, ${value1}, ${value1}, ${props.alpha1})`
                    context1.fillRect((cols-x), (rows-y)*scale, 1, scale)
                    context2.fillStyle = `rgba(${value2}, ${value2}, ${value2}, ${props.alpha2})`
                    context2.fillRect((cols-x), (rows-y)*scale, 1, scale)
                }
            }
    }, [pic1,pic2,rows,cols,pic,ratioValue, props.alpha1,firstHit1])
    return <div class="col" style={{ width: 1000 }}><div class={`${styles.row-pic} row`}>
             <div class="row align-items-center" style={{ position: 'relative' }}>
                <canvas width={cols} height={rows} style={{ position: 'absolute', top: 100, backgroundColor: 'black'}} />
                <canvas ref={canvasRef1} style={{ position: 'absolute', top: 100 }} />
                <canvas ref={canvasRef2} style={{ position: 'absolute', top: 100}}/>
            </div></div>
            {ratioValue === 'None' ? <>
            <div class="row">
                <label class="form-label">Picture</label>
                <input type="range" class="form-range" min="0" max={pics-1} id="pic" 
            onClick={(e) => handleChangePic(e)}/></div>
            <div class="row">
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-primary" onClick={() => changePic(0)}>preview</button>
                    <button type="button" class="btn btn-primary" onClick={() => changePic(1)}>next</button>
                </div>
            </div> 
            </>:<></>}
            <label>{view}</label>
            </div>     
}