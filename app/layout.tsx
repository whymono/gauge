import Navbar from "./components/Navbar"
import "./globals.css";

export default function Rootlayout({children}:{children:React.ReactNode}){
    return(
        <html>
            <body>
            <Navbar />
            </body>
        </html>
        );
}