import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Motion, spring } from 'react-motion';

const keyCodes ={
  left: 37,
  right: 39,
}

const COLORS = [
  '#15B371',
  '#DB3737',
  '#F29D49',
  '#669EFF',
  '#29A634',
  '#C274C2',
  '#30404D',
  '#9E2B0E',
  '#A82A2A',
  '#10161A',
];

const getColor = () => {
  return COLORS[Math.floor(Math.random()*COLORS.length)];
}

const randomString = (length) => {
    const chars = '01236789abcdefghijkltuvwxyzABNOPQRWXYZ';
    var result = "";
    for (let i=length; i > 0; i--){
      result += (chars[Math.floor(Math.random()*chars.length)])
    }
    return result;
}

export default class Demo extends Component{
  constructor(props){
    super(props);
    this.state = {
      list: [
        this._getElement(),
        this._getElement(),
        this._getElement(),
      ],
      current: 0,
      animate: true,
    }
    this.handleKeydown = this._handleKeydown.bind(this);
    this.getElement = this._getElement.bind(this);
    this.getStyle = this._getStyle.bind(this);
  }

  componentDidMount () {
    document.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleKeydown);
  }

  _handleKeydown (e) {
    // console.log(this.state.current)
    if ( e.keyCode === keyCodes.left ) {
      if( this.state.current === 2 ){
        // console.log(this.state.current)
        return this.setState({
          current:(this.state.current +1),
          list: this.state.list.slice(0,-1),
          animate:false,
          counter:"gree"
        }, () => {
          console.log("in cb",this.state.current)
          return this.setState({
            current: this.state.current -1,
            list: [this.getElement()].concat(this.state.list),
            animate: true,
          })
        });
      }
      return this.setState({
        current: this.state.current -1,
        list: [this.getElement()].concat(this.state.list),
        animate: true,
      });
    }

    if ( e.keyCode === keyCodes.right ){
      if (this.state.current === 2){
        // console.log(this.state.current)
        return this.setState({
          current: this.state.current - 1,
          list: this.state.list.slice(1),
          animate: false,
        }, () => {
          console.log("in cb",this.state.current)
           return this.setState({
            current:this.state.current + 1,
            list: this.state.list.concat(this.getElement()),
            animate:true,
          })
        });
      }
      // console.log("GRRR")
      return this.setState({
        current:this.state.current + 1,
        list: this.state.list.concat(this.getElement()),
        animate:true,
      })
    }

  }

  // _handleKeydown (e) {
  //   if (e.keyCode === keyCodes.right) {
  //     if (this.state.current === 2){
  //       this.setState({
  //         current: this.state.current -1,
  //         list: this.state.list.slice(1),
  //         animate:false,
  //       })
  //     }
  //     //if it is just this, it dies at the end
  //     //after right 3 it becomes emty
  //     // right 4 is empty..
  //       this.setState({
  //         current: this.state.current + 1,
  //         list: this.state.list.concat(this.getElement()), //adds a new only-dev-server
  //         animate: true,
  //       })
  //   }
  //   if (e.keyCode === keyCodes.left ) {
  //     if ( this.state.current === 2 ) {
  //        this.setState({
  //         current: this.state.current+1,
  //         list: this.state.list.slice(0,-1),
  //         animate: false,
  //        })
  //     }
  //     this.setState({
  //       current: this.state.current -1,
  //       list: [this.getElement()].concat(this.state.list),
  //       animate: true,
  //     })
  //     return;
  //   }
  // }

  _getStyle (animate) {
    const current =this.state.current;

    return {
      x: (animate
          ? spring(current *150)
          : current * 150
      )
    }

  }

  _getElement () {
    return (
      <div
        key = { randomString(10) }
        className = 'square'
        style = {{
          backgroundColor : getColor(),
          width: '150px',
          height: '150px',
          float:"left"
        }}
      >
      </div>
    );
  }


  render (){
    return (
      <div
      className = "container"
      style = {{
        position: "relative",
        width:'150px',
        height: '150px',
        overflow:'hidden',
        margin:"auto",
      }}
      >
        <Motion
          style= { this.getStyle(this.state.animate) }
        >
        {
          ({x}) => {
            return (
              <div
              style = {{
                position: 'absolute',
                width: 5*150,
                left: -(x),
              }}
              >
              {
                React.Children.toArray(this.state.list)
              }
              </div>
            );
          }
        }
        </Motion>
      </div>
    );
  }
}


ReactDOM.render(<Demo />, document.querySelector('#content'))
