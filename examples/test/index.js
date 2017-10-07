import React, { Component } from 'react';
import ReactDOM from 'react-dom';


export default class Demo extends Component{



  render (){
    return (
      <div>
      Helllo
      </div>
    );
  }
}


ReactDOM.render(<Demo />, document.querySelector('#content'))
