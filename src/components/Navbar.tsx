import { useNavigate } from "react-router-dom";

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Student', href: '/student' },
  { name: 'Teacher', href: '/teacher' },
];

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="text-white flex justify-between p-4 px-20 bg-[#B3C8CF]">
      <div>
        My Logo
      </div>
      <div className="flex space-x-4 ">
        {navigation.map((item, index) => {
          return (
            <a key={index} href={item.href}>{item.name}</a>
          )
        })}

      <button onClick={() => { navigate('/SignUpForm') }} className="bg-[#F2F2F2] text-black px-4  rounded">
        SignUp
      </button>
      <button onClick={() => { navigate('/SignUpForm') }} className="bg-[#d62323] text-white px-4  rounded">
        Login
      </button>
      </div>
    </nav>
  )
};

export default Navbar;
