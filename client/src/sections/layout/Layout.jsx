import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

const Layout = ({children}) => {return(
    <div className="min-h-screen flex flex-col overflow-hidden">
        <Navbar/>
        <main className="flex-1 flex items-center justify-center overflow-hidden">
            <div className='w-full'>
                {children}
            </div>
        </main>
        <Footer/>
    </div>
)}

export default Layout
