import React from 'react';
import Form from './component/Form';
import ResList from './component/ResList';
import './App.css';
import Header from './component/Header';
import Loading from './component/Loading';

export default class App extends React.Component {
  state = {
    resList: [],

    query: '',
    filter: 'people',
    displayType: 'people',

    loading: false,
    error: null
  }

  // Updaters to wire form inputs
  searchChanged = query => {
		this.setState({
			query
		});
  }
  
  filterChanged = filter => {
		this.setState({
			filter
		});
	}

  // Searches API with search term and filter type
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true // activate loading indicator
    });
    const term = this.state.query;
    const filter = this.state.filter;

    const req = `https://swapi.co/api/${filter}/?search=${term}`;
    // console.log(req);
    fetch(req).then(res => res.json()).then(data => this.setState({
        resList: data.results,
        displayType: this.state.filter,
        loading: false
    }));
  }

  render() {
    return (
      <div className="App">
          <Header />
        <main>
          <Form
            handleSubmit={this.handleSubmit}
            query={this.query}
            filter={this.filter}
            searchChanged={this.searchChanged}
            filterChanged={this.filterChanged}
          />
          {this.state.loading && <Loading />}
          {/* TODO: Conditional render for error readout */}
          <ResList
            list={this.state.resList}
            displayType={this.state.displayType}
            loading={this.state.loading}  
          />
        </main>
      </div>
    );
  }
}
