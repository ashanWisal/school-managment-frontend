import { useNavigate, Link } from "react-router-dom";

const Navbar = ({ user, setUser }: { user: any; setUser: any }) => {

  console.log("Navbar user:", user);


  const isAdmin = user && user.role === 'admin';

  console.log("Is admin:", isAdmin);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="text-white flex justify-between p-4 px-20 bg-[#B3C8CF]">
      <div>My Logo</div>

      <div className="flex space-x-4">
        {isAdmin ? (
          <>
            <Link to="/teacher" className="hover:underline">Teacher</Link>
            <button
              onClick={handleLogout}
              className="bg-[#d62323] text-white px-4 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/student" className="hover:underline">Student</Link>
            <button
              onClick={() => navigate('/SignUpForm')}
              className="bg-[#F2F2F2] text-black px-4 rounded"
            >
              SignUp
            </button>
            <button
              onClick={() => navigate('/Login')}
              className="bg-[#d62323] text-white px-4 rounded"
            >
              Login
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;