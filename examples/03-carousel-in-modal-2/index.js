import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import ReactDOM from 'react-dom';
import Portal from 'react-portal';

const keyCodes = {
  left: 37,
  right: 39,
}

const COLORS = [
  '#15B371',
  '#DB3737',
  '#FF7373',
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
  let result = '';
  for (let i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};

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
      open:false,
      screenHeight: window.innerHeight,
      screenWidth: document.body.clientWidth,
      again:false,
      last:"",
      onRest:undefined,
    }
    this.getStyle = this._getStyle.bind(this);
    this.getElement = this._getElement.bind(this);
    this.handleKeydown = this._handleKeydown.bind(this);
    this.toggleModal = this._toggleModal.bind(this);
    this.handleResize = this._handleResize.bind(this);
  }

  componentDidMount () {
    document.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleKeydown)
  }

  _handleResize (e) {
    this.setState({
      screenWidth: window.innerWidth,
      screenHeight: document.body.clientWidth,
    })
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
          // console.log("in cb",this.state.current)
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
          last:39,
          again:true,
          onRest: () => {
          requestAnimationFrame(() => {
            this.setState({
              onRest: undefined
            });
            this.handleKeydown({keyCode:39});
          }
        )}
        })

        // () => {
        //   // console.log("in cb",this.state.current)
        //    return this.setState({
        //     current:this.state.current + 1,
        //     list: this.state.list.concat(this.getElement()),
        //     animate:true,
        //   })
        // });
      // )
      }
      //  console.log("GRRR")
      // setTimeout(
      // ()=>{
      return this.setState({
        current:this.state.current + 1,
        list: this.state.list.concat(this.getElement()),
        animate:true,
        again:false,
      })

    //  },0)
    }

  }

  _toggleModal(val){
    this.setState({
      open: val,
    })
  }

  _getStyle (animate) {
    console.log(animate, this.state.current)
    const current = this.state.current;
    return {
      x : animate
        ? spring(current * this.state.screenWidth)
        : (current * this.state.screenWidth)
    }
  }

  _getElement (){
    return (
      <div
      key={ randomString(10)}
      className = 'square'
      style= {{
        width: window.innerWidth,
        height: document.body.clientWidth,
        float: 'left'
      }}
      >
        <div
        style={{
          // backgroundColor: 'white',
          backgroundColor: getColor(),
          width:'60%',
          height:'80%',
          margin:'auto'
        }}
        >

        </div>
      </div>
    );
  }

  render (){
    return (
      <div className='main-container'
      style={{
        width:"100px",
        margin:"auto",
      }}
      >
        <button
          style={{
            backgroundColor:'red',
            width:"100px",
          }}
          onClick = {(e)=>this.toggleModal(true)}
        >open</button>
        <Portal isOpened={this.state.open}>
        <div
        style={{
          zIndex:230,
          height:"100%",
          width:"100%",
          position:'fixed',
          top:0,
          right:0,
          backgroundColor:'rgba(0, 0, 0, 0.7)',
        }}>
        <div
          className="container"
          style = {{
            position:'relative',
            height: this.state.screenHeight, // needs to be 100%
            width: this.state.screenWidth, // need to  be 100%
            margin: 'auto',
            // overflow: 'auto',
            overflow: 'hidden',
          }}
          >
          <div className="modal__modifiers">
            <div
              className="modal__dismiss"
              style={{
                position:'fixed',
                top: "12px",
                right: "12px",
                cursor:"pointer",
                zIndex:231,
              }}
              onClick = { () => this.toggleModal(false) }
            >
              X
            </div>
            <div
            className="modal__arrows"
            style={{
              position:'relative'
            }}
            >
              <div
              className="modal__arrows--left"
              style={{
                position:'absolute',
                marginTop:'30%',
                left: '120px',
                cursor:'pointer',
                zIndex:231,
              }}
              onClick={(e)=>{e.preventDefault();this.handleKeydown({keyCode: 37})}}
              >
                    ⇠
              </div>
              <div
                className="modal__arrows--right"
                style={{
                  position:"absolute",
                  marginTop:'30%',
                  right:'120px',
                  cursor: 'pointer',
                  zIndex:231,
                }}
                onClick={(e)=>{e.preventDefault();this.handleKeydown({keyCode: 39})}}
              >
              ⇢
              </div>
            </div>
          </div>
          <Motion
          style = { this.getStyle(this.state.animate) }
          onRest={this.state.onRest}
          // onRest={()=>{
          //
          //   if(this.state.again===true){
          //    console.log("here",this.state.again)
          //     this.handleKeydown({keyCode: this.state.last})
          //   }
          // }}
          >
          {
            ({x}) => {
              // console.log(x)
              return (
                <div
                className='animation-container'
                style= {{
                  position: 'absolute',
                  width: `${5*this.state.screenWidth}px`,
                  left: -(x)
                }}
                >
                  {
                    React.Children.toArray(this.state.list)
                  }
                </div>
              )
            }
          }
          </Motion>
        </div>
        </div>
        </Portal>
      </div>
    );
  }
}


ReactDOM.render(<Demo/>, document.querySelector('#content'));
