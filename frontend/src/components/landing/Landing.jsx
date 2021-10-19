import Map from '../map/Map';
import Navbar from '../navbar/Navbar';

const Landing = ( ) => {
    return (
        <> 
        <Navbar />
        <div style={{position: 'relative', height: '100%', width: '100%'}}>
            <Map />
        </div>
        
        </>
    )
}

export default Landing
