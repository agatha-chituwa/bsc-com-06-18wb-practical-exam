import React ,{useState,useEffect, lazy, Suspense} from "react"
 import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
 //import usersService from "./components/users/users.service";

import UserService from "./components/users/users.service";
 import About from "./components/about";
 import Footer from "./components/footer";
 import Header from"./components/header";
 import Home from "./components/main/home.main";


 const App =()=> {
    const[searcheableList, setSearcheableList] = useState([])
    const[search, setSearch] = useState({})

    useEffect(() =>{
            UserService.getUsers().then(response =>{
            setSearcheableList(response)
        }).catch(error => {console.log(error)})
    })

    const setSearchList = resp => this.setSearchableList({ searcheable: resp })

    const searching = term => setSearch({ search: term })

    const handleSearchTextChange = e => setSearch({ [e.target.name]: e.target.value })

    return (
        <Router>
            <Suspense fallback={<div>Loading, Please wait...</div>}>
                {/* Header Section */}
                <Header searcheable={searcheableList} onChange={handleSearchTextChange} />
                {/* Main Content */}
                <Switch>
                    <Route exact path='/' render={props => <Home {...props} searchTerm={search || null} />} />
                    <Route exact path='/about' render={(props) => <About {...props} />} />
                </Switch>
                {/* Footer Section */}
                <Footer />
            </Suspense>
        </Router>
        );
    
}

export default App;




















//const About = lazy(() => import("./components/about"))
//const Footer = lazy(() => import("./components/footer"))
//const Header = lazy(() => import("./components/header"))
//const Home = lazy(() => import("./components/main/home.main"))

// class App extends React.Component {
//     constructor() {
//         super()
//         this.state = {
//             search: {},
//             searcheable: []
//         }
//     }

//     setSearcheableList = resp => this.setState({ searcheable: resp })

//     setSearch = term => this.setState({ search: term })

//     handleSearchTextChange = e => this.setSearch({ [e.target.name]: e.target.value })

//     componentDidMount() {
//         UserService.getUsers()
//             .then(response => this.setSearcheableList(response))
//             .catch(error => console.log(error))
//     }

//     render() {
//         const { searcheable, search } = this.state;

//         return (<Router>
//             <Suspense fallback={<div>Loading, Please wait...</div>}>
//                 {/* Header Section */}
//                 <Header searcheable={searcheable} onChange={this.handleSearchTextChange} />
//                 {/* Main Content */}
//                 <Switch>
//                     <Route exact path='/' render={props => <Home {...props} searchTerm={search || null} />} />
//                     <Route exact path='/about' render={(props) => <About {...props} />} />
//                 </Switch>
//                 {/* Footer Section */}
//                 <Footer />
//             </Suspense>
//         </Router>)
//     }
// }

// export default App;
