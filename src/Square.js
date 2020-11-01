function Square(props)  {
    return (
        <button 
            className="square" 
            onClick={() => {
                props.onClick()
            }}
        >
        {props.value ? props.value : null}
        </button>
    );
}

export default Square;