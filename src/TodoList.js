import React, {Component} from "react";
import TodoItems from "./TodoItems";
import axios from 'axios';

class TodoList extends Component {
    constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.query = 'https://us-central1-test-todo-app-69fad.cloudfunctions.net/webApi/api/v1/subjects';
    this.state = {
      items: []
    };
  }

  getSubjects = () =>{
    axios.get(this.query)
    .then(res => {
      console.log(res.data);
      const data = res.data.subjects;
      let subjects = Object.keys(data).map(function(key, index) {
        return { key, text:data[key].text, date:data[key].date }
      });

      subjects.sort(function(a, b) {
        a = new Date(a.date);
        b = new Date(b.date);
        return a>b ? -1 : a<b ? 1 : 0;
      });

      this.setState({items:subjects});
     
    })
  }

  componentDidMount() {
    this.getSubjects();
  }

  addItem(e) {
    if (this._inputElement.value !== "") {
      var newItem = {
        text: this._inputElement.value,
        date: new Date()
      };
   
      axios.post(this.query, newItem).then( (response) =>{
        this._inputElement.value = "";
        this.getSubjects();
      })
     
    }
            
    e.preventDefault();
  }
    
  render() {
    return (
      <div className="todoListMain">
        <div className="header">
          <form onSubmit={this.addItem}>
            <input ref={(a) => this._inputElement = a} 
                    placeholder="enter task">
            </input>
            <button type="submit">add</button>
          </form>
        </div>
        <TodoItems entries={this.state.items}/>
      </div>
    );
  }
}

export default TodoList;