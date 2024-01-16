import { useEffect, useState } from "react"
import Image from "./Image"


export default function Images(props) {

    const pic1 = props.pic1
    const pic2 = props.pic2
    const header1 = props.header1
    const header2 = props.header2
    const slope1 = props.header1['slope']
    const slope2 = props.header2['slope']
    const intercept1 =props.header1['intercept']
    const intercept2 =props.header2['intercept']
    const [windowCenter1, setWindowCenter1] = useState(header1['windowCenter'])
    const [windowWidth1, setWindowWidth1] = useState(header1['windowWidth'])
    const [windowCenter2, setWindowCenter2] = useState(header2['windowCenter'])
    const [windowWidth2, setWindowWidth2] = useState(header2['windowWidth'])
    const [alpha1, setAlpha1] = useState(0.5)
    const [alpha2, setAlpha2] = useState(0.5)
    const [firstHit1, setFirstHit1] = useState(3050)
    const [firstHit2, setFirstHit2] = useState(60)

    const handleAlpha = (event) => {
        const value = event.target.value
        const intValue = parseInt(value, 10) 
        const alpha = intValue/100
        setAlpha1(alpha)
        setAlpha2(1-alpha)
    }

    useEffect (()=>{
        setWindowCenter1(props.header1['windowCenter'])
        setWindowCenter2(props.header2['windowCenter'])
        setWindowWidth1(props.header1['windowWidth'])
        setWindowWidth2(props.header2['windowWidth'])
    },[props.header1,props.header2])

    return(<>
        {pic1.length !== 0 && pic2.length !== 0 ? 
        <div class="container"><div class="row align-items-stretch">
            <div class="row">
                <label class="form-label">Alpha</label>
                <input type="range" class="form-range" min="0" max="100" id="pic" 
            onClick={(e) => handleAlpha(e)}/></div>

            <Image
                ratioValue={props.ratioValue}
                X={header1['X']}
                Y={header1['Y']}
                rows={header1['Y']}
                cols={header1['X']}
                pics={header1['Z']}
                windowCenter1={windowCenter1}
                windowWidth1={windowWidth1}
                windowCenter2={windowCenter2}
                windowWidth2={windowWidth2}
                slope1={slope1}
                slope2={slope2}
                intercept1={intercept1}
                intercept2={intercept2}
                scale={Math.floor(header1['spaceY']/header1['spaceX'])}
                view = "top"
                pic1 = {pic1}
                pic2 = {pic2}
                alpha1 = {alpha1}
                alpha2 = {alpha2}
                firstHit1 = {firstHit1}
                firstHit2 = {firstHit2}
            />
            <Image
                ratioValue={props.ratioValue}
                X={header2['X']}
                Y={header2['Y']}
                rows={header2['Z']}
                cols={header2['Y']}
                pics={header2['X']}
                windowCenter1={windowCenter1}
                windowWidth1={windowWidth1}
                windowCenter2={windowCenter2}
                windowWidth2={windowWidth2}
                slope1={slope1}
                slope2={slope2}
                intercept1={intercept1}
                intercept2={intercept2}
                scale={Math.floor(header2['spaceZ']/header2['spaceY'])}
                view = "side"
                pic1 = {pic1}
                pic2 = {pic2}
                alpha1 = {alpha1}
                alpha2 = {alpha2}
                firstHit1 = {firstHit1}
                firstHit2 = {firstHit2}
            />
            <Image
                ratioValue={props.ratioValue}
                X={header2['X']}
                Y={header2['Y']}
                rows={header2['Z']}
                cols={header2['X']}
                pics={header2['Y']}
                windowCenter1={windowCenter1}
                windowWidth1={windowWidth1}
                windowCenter2={windowCenter2}
                windowWidth2={windowWidth2}
                slope1={slope1}
                slope2={slope2}
                intercept1={intercept1}
                intercept2={intercept2}
                scale={Math.floor(header2['spaceZ']/header2['spaceX'])}
                view = "front"
                pic1 = {pic1}
                pic2 = {pic2}
                alpha1 = {alpha1}
                alpha2 = {alpha2}
                firstHit1 = {firstHit1}
                firstHit2 = {firstHit2}
            />
            </div></div>
            :<></>}
            
    </>)
}