type Title = {
    title: string
}

function Header({title}:Title) {
    
    return (
        <div className="flex justify-center p-4">
            <h1 className="text-white text-3xl">
                {title}
            </h1>
        </div>
    )
}

export default Header