import React from "react";

const WIDTH = 600; // pixels
const HEIGHT = 800; // pixels
const STACK_X = WIDTH / 4;
const STACK_Y = HEIGHT / 16;
const STACK_WIDTH = WIDTH / 2
const STACK_HEIGHT = HEIGHT - ((HEIGHT / 16) * 2);
 
const REG_SIZE = 8; // bytes

const sampleAssemblyFunction = 
`  400596:	55                   	push   %rbp
  400597:	48 89 e5             	mov    %rsp,%rbp
  40059a:	48 83 ec 30          	sub    $0x30,%rsp
  40059e:	89 7d dc             	mov    %edi,-0x24(%rbp)
  4005a1:	89 75 d8             	mov    %esi,-0x28(%rbp)
  4005a4:	89 55 d4             	mov    %edx,-0x2c(%rbp)
  4005a7:	64 48 8b 04 25 28 00 	mov    %fs:0x28,%rax
  4005ae:	00 00 
  4005b0:	48 89 45 f8          	mov    %rax,-0x8(%rbp)
  4005b4:	31 c0                	xor    %eax,%eax
  4005b6:	8b 45 dc             	mov    -0x24(%rbp),%eax
  4005b9:	89 45 e0             	mov    %eax,-0x20(%rbp)
  4005bc:	8b 45 d8             	mov    -0x28(%rbp),%eax
  4005bf:	89 45 e4             	mov    %eax,-0x1c(%rbp)
  4005c2:	8b 45 d4             	mov    -0x2c(%rbp),%eax
  4005c5:	89 45 e8             	mov    %eax,-0x18(%rbp)
  4005c8:	c7 45 ec 04 00 00 00 	movl   $0x4,-0x14(%rbp)
  4005cf:	c7 45 f0 05 00 00 00 	movl   $0x5,-0x10(%rbp)
  4005d6:	8b 45 e4             	mov    -0x1c(%rbp),%eax
  4005d9:	89 c6                	mov    %eax,%esi
  4005db:	bf d4 06 40 00       	mov    $0x4006d4,%edi
  4005e0:	b8 00 00 00 00       	mov    $0x0,%eax
  4005e5:	e8 86 fe ff ff       	callq  400470 <printf@plt>
  4005ea:	8b 45 f0             	mov    -0x10(%rbp),%eax
  4005ed:	48 8b 4d f8          	mov    -0x8(%rbp),%rcx
  4005f1:	64 48 33 0c 25 28 00 	xor    %fs:0x28,%rcx
  4005f8:	00 00 
  4005fa:	74 05                	je     400601 <helper+0x6b>
  4005fc:	e8 5f fe ff ff       	callq  400460 <__stack_chk_fail@plt>
  400601:	c9                   	leaveq 
  400602:	c3                   	retq`;

const savedReg = (name, totalBytes, index) => {
  let regHeight = (STACK_HEIGHT / totalBytes) * REG_SIZE;
  return (
    <g key={"reg" + index}>
      <rect 
        width={STACK_WIDTH}
        height={(STACK_HEIGHT / totalBytes) * REG_SIZE}
        x={STACK_X}
        y={STACK_Y + (index * regHeight)}
        stroke="#111"
        strokeWidth="2"
        fill="none"/>
        <text textAnchor="middle" x={STACK_X + STACK_WIDTH / 2} y={STACK_Y + (index * regHeight) + (regHeight * .55 )} fontFamily="Verdana" fontSize="35" fill="#555">saved {name}</text>
        <animate id={"reg" + index}
          attributeName="opacity"
          from="0" to="1" dur="1s"
          begin={index > 0 ? "reg" + (index - 1) : "0s"} />
    </g>
  );
};
// const savedReg = (name, totalBytes, index) => (
  // <rect 
    // width={STACK_WIDTH}
    // height={(STACK_HEIGHT / totalBytes) * REG_SIZE}
    // x={STACK_X}
    // y={STACK_Y + (index * ((STACK_HEIGHT / totalBytes) * REG_SIZE))}
    // stroke="#111"
    // stroke-width="2"
    // fill="none"/>
// );

class AssemblyStackFrame extends React.Component {
  constructor(props) {
    super(props);
    let [animations, totalBytes] = this.parseLines(sampleAssemblyFunction);
    this.state = {
      input: sampleAssemblyFunction,
      animations: animations,
      totalBytes: totalBytes
    };
  }

  // TODO work for x86 32-bit assembly as well
  parseLines = (input) => {
    let lines = input.split("\n");
    let animations = [];
    let totalBytes = 0;

    // TODO Lookbehind doesn't work hacks to get it to compile
    // let pushRe = /(?<=push)\s+%[a-z]+/i;
    // let subRspRe = /(?<=sub)\s+[^,]+,%rsp/i;
    let pushRe = /a/;
    let subRspRe = /a/;

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].match(pushRe)) {
        let reg = lines[i].match(pushRe)[0].trim()
        animations.push({type: "push", reg: reg})
        totalBytes += 8;
      }
      else if (lines[i].match(subRspRe)) {
        let subRsp = lines[i].match(subRspRe)[0].trim();
        console.log();
        // TODO
        // let amount = parseInt(subRsp.match(/(?<=\$0x)[0-9a-f]+/i)[0], 16);
        let amount = parseInt(subRsp.match(/a/)[0], 16);

        animations.push({type: "subRsp", amount: amount})
        totalBytes += amount;
      }
    }
    return [animations, totalBytes];
  }

  handleChange = (e) => {
    let textInput = e.target.value;
    let [animations, totalBytes] = this.parseLines(textInput);
    this.setState({
      input: textInput,
      animations: animations,
      totalBytes: totalBytes
    });
  }

  render() {
    return (
      <div>
        <h2>Assembly Stack Frame</h2>
        <div>
          Paste x86-64 assembly for entire function to visualize stack setup.
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


            {this.state.animations.map((a, ix) => (
              a.type === "push" ? 
                savedReg(a.reg, this.state.totalBytes, ix) : 
                ""
            ))}
          

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


export default AssemblyStackFrame;
