import React, { Component } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

class JokeList extends Component {
  static defaultProps = {numJokesToGet : 10};
  constructor(props){
    // to gain/ extend rights of Component Class.
    super(props);
    this.state = ({jokes : []});
    this.vote =this.vote.bind(this);
    // Bind creates a new function that will force the this inside the function to be the parameter passed to bind(). You want to keep the current "this" ref.
    // https://stackoverflow.com/questions/2236747/what-is-the-use-of-the-javascript-bind-method
  }

  // these are class methods. NOT functions. to call refer to "this.methodName"

  async componentDidMount(){
    console.log("mount")
    if(this.state.jokes.length < this.props.numJokesToGet){
      this.getJokes();
    };

  };

  async componentDidUpdate() {
    console.log("updated")
    if(this.state.jokes.length < this.props.numJokesToGet){
      this.getJokes();
    }
  }

  async getJokes() {
    try {
      let jokes = this.state.jokes;

      let seenJokes = new Set(jokes.map(j => j.id));

      while (jokes.length < this.props.numJokesToGet) {
        let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" }
        });
        let { status, ...joke } = res.data;

        // if the returned ID is NOT in the array, move forward & add.
        if (!seenJokes.has(joke.id)) {
          seenJokes.add(joke.id);
          jokes.push({ ...joke, votes: 0 });
        } else {
          console.error("duplicate found!");
        }
      }
      
      // .setState() method, works similar to useState hook.
      this.setState({jokes});
    } catch (e) {
      console.log(e);
    }
  }

  // to pass in as a prop we need to refer to "this.vote". It's a class method.
  vote(id, delta) {
    console.log("vote start")
    console.log(id);
    this.setState(allJokes => {
      return(
        {jokes: allJokes.jokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j))}
      )
    })
  }

  render() {
    let sortedJokes = [...this.state.jokes].sort((a,b) => b.votes - a.votes)
    // console.log(sortedJokes);

    return(
      <div>

        <h1>CheeZJokes</h1>

        <button onClick = {() => this.setState({jokes: []})}>New Jokes</button>

        {sortedJokes.map(({id, joke, vote, votes}) => {
          return(
            <Joke id = {id} joke = {joke} votes = {votes} vote = {this.vote} key = {id} />
          )
        })}
      </div>
    )
  }
};


export default JokeList;

// reference to class components under React V6: https://btholt.github.io/complete-intro-to-react-v6/class-components