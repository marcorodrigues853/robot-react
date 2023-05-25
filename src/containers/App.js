import { Component } from 'react';
import './App.css';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchField: '',
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => this.setState({ robots: users }));
  }

  onSearchChange = (event) => {
    this.setState({ searchField: event.target.value });
  };

  render() {
    const { robots, searchField } = this.state;

    const filteredRobots = this.state.robots.filter((robot) =>
      robot.name.toLocaleLowerCase().includes(searchField.toLocaleLowerCase()),
    );
    console.log(filteredRobots);

    return !robots.length ? (
      <h1 className='f1 tc'>Loading...</h1>
    ) : (
      <div className='tc'>
        <h1 className='f1'>RobotFriends</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <Scroll>
          <CardList robots={filteredRobots} />
        </Scroll>
      </div>
    );
  }
}

export default App;
