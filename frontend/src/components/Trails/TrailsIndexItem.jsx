import './TrailsIndexItem.css'
function TrailsIndexItem({trail}){
    return (
        <div id="trailsName">
        <div >
            <ul >
                <p>{trail.name}</p> <p>{trail.length} mi</p>
                <br />
                <p>{trail.description}</p>
                <br />
                
            </ul>
        </div>
        </div>
    )
}

export default TrailsIndexItem