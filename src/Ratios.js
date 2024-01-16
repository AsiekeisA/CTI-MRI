
export default function Ratios(props){
    const checkValue = (e) => {
        props.setRatioValue(e.target.value)
    }
    return(<form onChange={(e)=>checkValue(e)}>
    <div class="form-check-inline">
        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="None"/>
        <label class="form-check-label" for="flexRadioDefault1"  >
            None
        </label>
    </div>
    <div class="form-check-inline">
        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="MIP" />
        <label class="form-check-label" for="flexRadioDefault2">
            MIP
        </label>
    </div>
    <div class="form-check-inline">
        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="Average"/>
        <label class="form-check-label" for="flexRadioDefault2">
            Average
        </label>
    </div>
    <div class="form-check-inline">
        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="First Hit"/>
        <label class="form-check-label" for="flexRadioDefault2">
            First Hit
        </label>
    </div>
</form>)
}