import './TrailsIndexItem.css'
function TrailsIndexItem({trail}){
    return (
        <div>
            <ul id="trailsName">
                {trail.name}
            </ul>
        </div>
    )
}

export default TrailsIndexItem