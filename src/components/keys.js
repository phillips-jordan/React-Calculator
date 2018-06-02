import React, { Component } from "react";
import logo from "../logo.svg";
import "../App.css";

class Keys extends Component {
  constructor() {
    super();
    this.state = {
      equation: ""
    };
  }

  componentDidMount = () => {
    window.addEventListener("keydown", x => {
      if (
        !x.shiftKey &&
        [48, 49, 50, 51, 52, 53, 54, 55, 56, 57].some(y => {
          return y === x.keyCode;
        })
      ) {
        this.handleButton(null, x.key);
      }
      if (x.keyCode === 13) {
        this.handleResolve();
      }
      if (x.shiftKey && x.keyCode === 56) {
        //mult
        this.handleButton(null, x.key);
      }
      if (x.shiftKey && x.keyCode === 187) {
        //add
        this.handleButton(null, x.key);
      }
      if (!x.shiftKey && x.keyCode === 189) {
        //sub
        this.handleButton(null, x.key);
      }
      if (!x.shiftKey && x.keyCode === 191) {
        //div
        this.handleButton(null, x.key);
      }
      if (!x.shiftKey && x.keyCode === 190) {
        //decimal
        this.handleButton(null, x.key);
      }
      if (x.shiftKey && [48, 57].some(y => y === x.keyCode)) {
        this.handleButton(null, x.key);
      }
      if (x.keyCode === 8) {
        let current = this.state.equation;
        let del = current.split("");
        del.splice(current.length - 1);
        del = del.join("");
        this.setState({ equation: del });
      }
    });
  };
  handleButton = (event, key) => {
    if (this.state.result){
        this.setState({result:null})
    }
    if (!key) {
      let current = this.state.equation;
      let newEqu = current + event.target.innerText;
      this.setState({ equation: newEqu });
    } else {
      let current = this.state.equation;
      let newEqu = current + key;
      this.setState({ equation: newEqu });
    }
  };

  handleResolve = () => {
    let current = this.state.equation;

    current = current.split("");
    for (let i = 0; i < current.length; i++) {
      if (
        typeof parseInt(current[i]) === "number" &&
        !["*", "/", "+", "-", "(", ")"].some(x => x === current[i])
      ) {
        if (
          current[i - 1] &&
          typeof parseInt(current[i - 1]) === "number" &&
          !["*", "/", "+", "-", "(", ")"].some(x => x === current[i - 1])
        ) {
          current[i] = current[i - 1] + current[i];
          delete current[i - 1];
        }
      }
    }

    

    let equationArray = current.filter(x => x);
    let parensTest = this.parensEval(equationArray);
    equationArray = this.evaluateEquation(equationArray);
    let result = equationArray[0]
    this.setState({ equation: '', result });
  };
  multiply = arr => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === "*") {
        arr[i + 1] = arr[i + 1] * arr[i - 1];
        delete arr[i];
        delete arr[i - 1];
      }
    }
    return arr.filter(x => x);
  };
  divide = arr => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === "/") {
        arr[i + 1] = arr[i - 1] / arr[i + 1];
        delete arr[i];
        delete arr[i - 1];
      }
    }
    return arr.filter(x => x);
  };

  subtract = arr => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === "-") {
        arr[i + 1] = parseInt(arr[i - 1]) - parseInt(arr[i + 1]);
        delete arr[i];
        delete arr[i - 1];
      }
    }
    return arr.filter(x => x);
  };

  sum = arr => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === "+") {
        arr[i + 1] = parseInt(arr[i - 1]) + parseInt(arr[i + 1]);
        delete arr[i];
        delete arr[i - 1];
      }
    }
    return arr.filter(x => x);
  };

parensEval = arr =>{
    for(let i=arr.length-1;i>=0;i--){
        if(arr[i]==='('){
            let evalu = [...arr]
            evalu = evalu.splice(i)
            let rightBracket = evalu.indexOf(')')
            evalu.splice(rightBracket)
            let evLen = evalu.length
            evalu = evalu.splice(1,evalu.length-1)
            let result = this.evaluateEquation(evalu)
            arr.splice(i+1,evLen)
            arr[i]=result[0]
        }
    }
    return arr
}

evaluateEquation = arr =>{
    return this.sum(this.subtract(this.divide(this.multiply(arr))))
}

  handleClear = () => {
      this.setState({equation: ''})
  }

  render() {
    return <div className="calc">
        <div className="display">
          {this.state.result ? this.state.result : this.state.equation}
        </div>
        <div className="inputPad">
          <div className="numericalPad">
            <div>
              <button className="numberButton topLeft" onClick={this.handleButton}>
                1
              </button>
              <button className="numberButton" onClick={this.handleButton}>
                2
              </button>
              <button className="numberButton" onClick={this.handleButton}>
                3
              </button>
            </div>
            <div>
              <button className="numberButton" onClick={this.handleButton}>
                4
              </button>
              <button className="numberButton" onClick={this.handleButton}>
                5
              </button>
              <button className="numberButton" onClick={this.handleButton}>
                6
              </button>
            </div>
            <div>
              <button className="numberButton" onClick={this.handleButton}>
                7
              </button>
              <button className="numberButton" onClick={this.handleButton}>
                8
              </button>
              <button className="numberButton" onClick={this.handleButton}>
                9
              </button>
            </div>
            <div>
              <button className="clear numberButton" onClick={this.handleClear}>
                C
              </button>
              <button className="numberButton" onClick={this.handleButton}>
                0
              </button>
              <button className="numberButton" onClick={this.handleResolve}>
                {" "}
                ={" "}
              </button>
            </div>
            <div style={{}}>
              <button className="numberButton parensButton bottomLeft" onClick={this.handleButton}>
                (
              </button>
              <button className="numberButton parensButton" onClick={this.handleButton}>
                )
              </button>
            </div>
          </div>
          <div className="operatorsPad">
            <button className="opButton topRight" onClick={this.handleButton}>
              *
            </button>
            <button className="opButton" onClick={this.handleButton}>
              +
            </button>

            <button className="opButton" onClick={this.handleButton}>
              {" "}
              -
            </button>
            <button className="opButton" onClick={this.handleButton}>
              {" "}
              /
            </button>
            <button className="opButton bottomRight" onClick={this.handleButton}>
              .
            </button>
          </div>
        </div>
      </div>;
  }
}

export default Keys;
