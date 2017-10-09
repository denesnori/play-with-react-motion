import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import ReactDOM from 'react-dom';
import Portal from 'react-portal';

const keyCodes = {
  left: 37,
  right: 39,
}

const COLORS = [
  '#15B371', //green
  '#DB3737', //red
  '#FF7373', //pinkish
  '#F29D49', //orange
  '#669EFF', //blue
  '#29A634',//light greenß
  '#C274C2',//pink-purple
  '#30404D',//dark grey
  '#9E2B0E',//reddish brown
  '#A82A2A',//reddish thing
  '#10161A',//black
];

const initial = 0;

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
      data: COLORS,
      initial: initial,
      list: this.getInitialList(initial),
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
    this.handleResize = this._handleResize.bind(this);
    this.toggleModal = this._toggleModal.bind(this);
    this.handleResize = this._handleResize.bind(this);
    this.getInitialList = this.getInitialList.bind(this);
    this.getNext = this._getNext.bind(this);
    this.getPrevious = this._getPrevious.bind(this);
  }

  getInitialList (initial) {
    if(COLORS.length < 3){
        //TODO
    }
    if (initial === 0){
      return [
        COLORS[0],
        COLORS[1],
        COLORS[2],
      ]
    }else if( initial === COLORS.length -1){
      return [
        COLORS[COLORS.length - 2],
        COLORS[COLORS.length - 1],
      ];
    }else{
      return [
        COLORS[initial-1],
        COLORS[initial],
        COLORS[initial+2],
      ]
    }
  }

  canGo(direction){
    if( this.state.initial === this.state.data.length -1 && direction === 'right' ){
      return false;
    }
    if ( this.state.initial === 0 && direction === 'left') {
      return false;
    }
    return true;
  }

  componentDidMount () {
    document.addEventListener('keydown', this.handleKeydown);
    window.addEventListener('handleResize',this.handleResize);
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleKeydown);
    window.removeEventListener('resize',this.handleResize);
  }

  _handleResize (e) {
    this.setState({
      screenWidth: window.innerWidth,
      screenHeight: document.body.clientWidth,
    })
  }

  _handleKeydown (e) {
    if ( e.keyCode === keyCodes.left ) {
      if (!this.canGo('left')){
        return;
      }
      if( this.state.current === 2 ){
        return this.setState({
          current: (this.state.current + 1),
          list: [COLORS[this.state.initial-3]].concat(this.state.list.slice(0,-1)),
          animate:false,
          last:37,
          again:true,
          onRest: () => {
            requestAnimationFrame(() => {
                this.handleKeydown({keyCode:37});
            }
          )},
        });
      };
      return this.setState({
        current: this.state.current - 1,
        initial: this.state.initial - 1,
        animate: true,
        again:false,
        onRest: undefined,
      });
    }

    if ( e.keyCode === keyCodes.right ){
      if(!this.canGo('right')){
        return;
      }

      if (this.state.current === 2){
        return this.setState({
          current: this.state.current - 1,
          list: this.state.list.slice(1),
          animate: false,
          last:39,
          again:true,
          onRest: () => {
          requestAnimationFrame(() => {
              this.handleKeydown({keyCode:39});
          }
        )}
        })
      }
      return this.setState({
        current:this.state.current + 1,
        initial: this.state.initial + 1,
        list: this.state.list.concat(COLORS[this.state.initial+3]),
        animate:true,
        again:false,
        onRest:undefined,
      })
    }
  }

  _getNext(next){


  }

  _getPrevious(){

  }

  _toggleModal(val){
    this.setState({
      open: val,
    })
  }

  _getStyle (animate) {
    const current = this.state.current;
    return {
      x : animate
        ? spring(current * this.state.screenWidth)
        : (current * this.state.screenWidth)
    }
  }

  _getElement (){
    return this.state.list.map((item) => {
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
        className="modal__content"
        style={{
          backgroundColor: item,
          width:'60%',
          height:'80%',
          margin:'auto'
        }}
        >
          {
            COLORS.indexOf(item)
          }
        </div>
      </div>
    );
  });
  }

  render (){
    return (
      <div className='main-container'
      >
        <button
          onClick = {(e)=>this.toggleModal(true)}
        >open</button>
        <Portal isOpened={this.state.open}>
        <div
        className="modal"
        >
        <div
          className="modal__container"
          style = {{
            height: this.state.screenHeight, // needs to be 100%
            width: this.state.screenWidth, // need to  be 100%
          }}
          >
          <div className="modal__modifiers">
            <div
              className="modal__dismiss"
              onClick = { () => this.toggleModal(false) }
            >
              X
            </div>
            <div
            className="modal__arrows"
            >
              <div
              className="modal__arrows--left"
              onClick={(e)=>{e.preventDefault();this.handleKeydown({keyCode: 37})}}
              style={{
                display:`${this.state.initial === 0 ? 'none':'inherit'}`
              }}
              >
                    ⇠
              </div>
              <div
                className="modal__arrows--right"
                onClick={(e)=>{e.preventDefault();this.handleKeydown({keyCode: 39})}}
                style={{
                  display:`${this.state.initial === this.state.data.length-1 ? 'none':'inherit'}`
                }}
              >
              ⇢
              </div>
            </div>
          </div>
          <Motion
          style = { this.getStyle(this.state.animate) }
          onRest={this.state.onRest}
          >
          {
            ({x}) => {
              return (
                <div
                className='modal__animation'
                style= {{
                   position: 'absolute',
                  width: `${5*this.state.screenWidth}px`,
                  left: -(x)
                }}
                >
                  {
                    React.Children.toArray(this.getElement(this.state.list))
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
