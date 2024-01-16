import './TrailsIndexItem.css'
function TrailsIndexItem({trail}){
    return (
        <div>
            
        <div id='trailinfo'>
        
            <ul >
                <img src="hempsteadstatepark.webp" alt="trail" id="trailimag"/>
                <p id='trailname'>{trail.name}</p> <p>{trail.length} mi</p> 
            </ul>
        </div>
        <div className='splashfooter'></div>
        </div>
    )
}

export default TrailsIndexItem