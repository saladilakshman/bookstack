import exclamation from "./assets/exclamation.png";
import "./App.css";
const Error=()=>{
    return(
        <div style={{display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        gap:'2rem',
        marginBlockStart:'1rem',
        marginBlockEnd:'1rem'
        }} className="error-component">
        <img src={exclamation}alt=""/>
        <h2 style={{
            color:'#F40000',
            fontFamily:'helvetica',
            fontWeight:'lighter'
        }}
        >Oops! no information found</h2>
        </div>
    )
}
export default Error