
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import BlogPostList from './pages/BlogPostList';
import BlogPostDetails from './pages/BlogPostDetails';
import Navbar from './components/Navbar';



function App() {
  return (
   
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" Component={BlogPostList} />
        <Route path="/post/:title" Component={BlogPostDetails} />
      </Routes>
    </Router>
   
  );
}

export default App;
