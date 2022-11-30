import React, {Component} from "react";
import "./Joke.css";

class Joke extends Component {

  // props include id, joke, vote(), votes
  constructor(props){
    super(props);

    // two "this" uses in nested function. Bind "this"
    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
    // console.log(props)
  }

  // vote function / target function is bound to new method this.upVote
  upVote(){
    console.log("count +1")
    this.props.vote(this.props.id, +1);
  };

  downVote(){
    console.log("count -1")
    this.props.vote(this.props.id, -1);
  }

  render() {
    return(
    <div className="Joke">
      <div className="Joke-votearea">
        <button onClick={this.upVote}>
          <i className="fas fa-thumbs-up" />
        </button>

        <button onClick={this.downVote}>
          <i className="fas fa-thumbs-down" />
        </button>

        {this.props.votes}
      </div>

      <div className="Joke-text">{this.props.joke}</div>
    </div>
  )}}

export default Joke;
