import logo from './logo.svg';
import React, { useState }  from "react";
import './App.css';
import { loadScript } from "./withRequirejs";

function App() {

  const [ isStart, setStart ] = useState(false)

  const [ wordList, setWordList ] = useState([])

  const appWord = function (w){
    setWordList((curr) => {
      return [
        ...curr,
        w
      ]
    })
  }

  const onstart = async function (){
    setWordList([])
    setStart(true)
    document.getElementById('draw-container').innerHTML = ''
    const jquery = await loadScript('jquery');
    appWord(`jquery loaded version: ${ jquery.fn.jquery}`)

    const react = await loadScript('react');
    const reactDom = await loadScript('react-dom');
    appWord(`react version: ${react.version}`, )
    appWord(`reactDom version: ${reactDom.version}`, )

    const echarts = await loadScript('echarts')
    appWord(`echart version: ${echarts.version}`, )
    appWord(`使用 echarts 绘制图表`, )

    jquery('#draw-container').width(400).height(400).css('background', '#fff');
    var myChart = echarts.init(document.getElementById('draw-container'));
    var option;

    option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }
      ]
    };

    option && myChart.setOption(option);

    setStart(false)
  }

  return (
    <div className="App">
      <header className="App-header">
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        <p>
          requirejs demo
        </p>
        <p>
          {
            isStart ? '加载中...' : <span>点击开始, 会加载 echarts  <button onClick={onstart}>点击开始</button></span>
          }
        </p>

        <p>
          {
            wordList.map( (w,i ) => <div key={i}>{w}</div> )
          }
        </p>

        <div id={'draw-container'}></div>

      </header>
    </div>
  );
}

export default App;
