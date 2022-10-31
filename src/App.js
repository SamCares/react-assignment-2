import { useEffect, useState } from 'react';
import './App.css';
import Card from "./Components/card";
import PageNotFound from "./Components/errorPage";
import { Routes, Route, Link } from "react-router-dom";

// Home page
const Home = () => {
  return (
    <section className='home-container'>
      <h1 className='intro-text'>Welcome!</h1>
      <p className='copy-text'>SamCares Technolgy Solutions, a home of solutions. Click the button below to meet our amazing users all over the world</p>
      <Link to="/apicall">
        <button className='view-users-button'>Explore</button>
      </Link>
    </section>
  );
};

// Page 2 
function ApiCall() {

  // useState for profiles of users and pages
  const [profile, setProfile] = useState([]);

  const [page, setPage] = useState(1);

  // Reusable API
  const ReusableAPI = () => {
    fetch("https://randomuser.me/api/?results=10")
      .then((response) => response.json())
      .then((json) => setProfile(json.results));
  }

  useEffect(() => { ReusableAPI() }, []);

  // Pagination
  const Pagination = (val) => {
    setPage(val)
    ReusableAPI()
  }
  console.log(page)

  return (
    <section className='users-container'>

      <Link to="/">
        <button className='back-home'>Home</button>
      </Link>

      {profile.length === 0 && <h1 className='loader'>Please wait...</h1>}

      <div className='card-container'>
        {profile.map((user, i) => (
          <div key={i}>
            <Card userData={user} />
          </div>
        ))}
      </div>

      <div className='pages'>
        <button className='btn' onClick={() => Pagination(page - 1)} disabled={page === 1}>prev</button>
        <button className={`${page === 1 ? 'active' : 'btn'}`} onClick={() => Pagination(1)} disabled={page === 1}>1</button>
        <button className={`${page === 2 ? 'active' : 'btn'}`} onClick={() => Pagination(2)} disabled={page === 2}>2</button>
        <button className={`${page === 3 ? 'active' : 'btn'}`} onClick={() => Pagination(3)} disabled={page === 3}>3</button>
        <button className={`${page === 4 ? 'active' : 'btn'}`} onClick={() => Pagination(4)} disabled={page === 4}>4</button>
        <button className={`${page === 5 ? 'active' : 'btn'}`} onClick={() => Pagination(5)} disabled={page === 5}>5</button>
        <button className={`${page === 6 ? 'active' : 'btn'}`} onClick={() => Pagination(6)} disabled={page === 6}>6</button>
        <button className={`${page === 7 ? 'active' : 'btn'}`} onClick={() => Pagination(7)} disabled={page === 7}>7</button>
        <button className={`${page === 8 ? 'active' : 'btn'}`} onClick={() => Pagination(8)} disabled={page === 8}>8</button>
        <button className='btn' onClick={() => Pagination(page + 1)} disabled={page === 8}>next</button>
      </div>
    </section>
  );
};

function App() {
  return (
    <section className='parent-container'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apicall" element={<ApiCall />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </section>
  );
}

export default App;
