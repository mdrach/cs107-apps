import React from "react";

const WIDTH = 600;
const HEIGHT = 800;

const sampleProgram = 
`#include<stdio.h>

int helper(int a, int b, int c) {
  int array[] = {a,b,c, 4, 5};
  printf("second element: %d\n", array[1]);
  return array[4];
}

int main() {
  int a = 1;
  int b = 2;
  int c = 3;
  int ret = helper(a, b, c);
  printf("ret: %d\n", ret);
  return 0;
}`;

class StackAndHeap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: sampleProgram,
      functions: [],
    };
  }

  checkBalancedParensBracesBrackets = (str) => {
    let stack = [];
    for (let i = 0; i < str.length; i++) {
      let curChar = str.charAt(i);
      if (curChar === "{" || 
          curChar === "(" ||
          curChar === "[") {
        stack.push(curChar);
      }
      if (curChar === "}" ||
          curChar === ")" ||
          curChar === "]") {
        if (stack.length === 0 ||
            stack[stack.length - 1] !== curChar) {
          return false;
        }
        stack.pop();
      }
    }
  }

  parseLines = (input) => {
    // if (!input.includes("int main") || 
        // !checkBalancedParensBracesBrackets(input)) {  // TODO delete this function if not necessary
      // return; // TODO throw error
    // }
    
    let functions = [];

    // Not foolproof but good enough
    // variable has name, size, pointsTo
    // let currentFunction = {variables: [], };
    let lines = input.split("\n");
    let functionStartRe = /[*\w]+ +[*\w]+ *\([\w* ,]*\)[^;]*(?!=;)/i;
    let functionNameRe = / +[*\w]+ *(?=\()/i;
    for (let i = 0; i < lines.length; i++) {
      let match = lines[i].match(functionStartRe);
      if (match) {
        if (!lines[i].match(functionNameRe)) {
          throw Error("C program parser having trouble parsing function names");
        }
        let functionName = lines[i].match(functionNameRe)[0].trim();
        if (functionName.indexOf("*") === 0) {
          functionName = functionName.substring(1);
        }

        functions.push({name: functionName, line: i});
      }
    }
    return functions;
  }

  handleChange = (e) => {
    let textInput = e.target.value;
    this.setState({
      input: textInput,
    });
  }

  render() {
    console.log(this.parseLines(this.state.input));
    this.buildAnimation
    return (
      <div>
        <h2>Stack and Heap</h2>
        <div>
          Paste entire C program to visualize the stack and heap throughout the runtime of the program.
        </div>
        <textarea 
          name="textarea"
          rows="40" 
          cols="100"
          value={this.state.input}
          onChange={this.handleChange}
        />


        <div>
          <svg width={WIDTH} height={HEIGHT}
              xmlns="http://www.w3.org/2000/svg">


          <text textAnchor="middle" x={100} y={100} fontFamily="Verdana" fontSize="35" fill="#123">3</text>


            <path d="M10,110 V10"
                stroke="lightgrey" strokeWidth="2" 
                fill="none" id="rspPath1"/>

            <path d="M25,110 V30"
                stroke="lightgrey" strokeWidth="2" 
                fill="none" id="rspPath2"/>

            <circle cx="10" cy="110" r="3" fill="lightgrey" />

            <circle cx="110" cy="10" r="3" fill="lightgrey" />

            <circle r="5" fill="red">

              <animateMotion dur="3s" repeatCount="1" fill="freeze" >
                <mpath href="#rspPath1"/>
              </animateMotion>

              <animateMotion dur="3s" repeatCount="1" fill="freeze">
                <mpath href="#rspPath2"/>
              </animateMotion>

            </circle>

          </svg>
        </div>
      </div>


    );
  }
}


export default StackAndHeap;
