import { Link } from "react-router-dom"

const Start = () => {
  return (
    <div>
        <div className="bg-cover bg-[url(https://images.unsplash.com/photo-1651037476196-357f82c04f3e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRyYWZmaWMlMjBsaWdodHxlbnwwfDF8MHx8fDA%3D)] w-full pt-5 flex flex-col justify-between h-screen bg-red-400">
            <img className="w-20 ml-6" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
            <div className="bg-white p-5">
                <h2 className="text-2xl font-bold mb-8">Get started with Uber</h2>
                <Link to="/login" className="flex items-center justify-center w-full bg-black text-white py-3 rounded-xl text-lg">Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Start
