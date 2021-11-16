import { textAlign } from "@mui/system";
import img from "./../../img/Ajux_loader.gif"


function Splash() {

    return (
        <>
            <div>

                 <img style={{
                    width: "65%",
                    top : "10%",
                    left : "20%",
                    position: "fixed",
                    
                    
                }}
                    src={img} alt="" /> 
                    
            </div>
        </>
    );
}

export default Splash;