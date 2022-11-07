import Loader from "../Assets/Loader animation principle freebie.gif"

const Spinner = () => {
  return (
    <div style={{display:"flex" , justifyContent:"center" , alignItems:"center"}}>
        <img src={Loader} alt="loader" width="45%" height="45%"/>
    </div>
  )
}

export default Spinner