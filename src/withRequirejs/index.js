
import React from 'react';
import ReactDom from 'react-dom';

function registerConfig(){
  // you can configure loading modules from the lib directory
  window.requirejs.config ({
    "paths": {
      // 顶级依赖, 比如 jquery
      //loading jquery from CDN
      "jquery": "//cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min",
      "echarts": '//cdn.jsdelivr.net/npm/echarts@5.5.1/dist/echarts.min'
    }
  });

  // 如果本身已经有了， 例如当前是 react工程, 可以直接这样引入
  // amd 模块的名字一般就是 npm 的包名， 如果带组织的可能略有不同
  window.define('react', [], () => React)
  window.define('react-dom', [], () => ReactDom)
}

export function installRequirejs() {

  if(window.requirejs) return Promise.resolve()

  return new Promise((resolve, reject) => {
    let s = document.createElement('script');
    s.src = '//cdn.jsdelivr.net/npm/requirejs@2.3.6/require.min.js';
    s.async = true;
    s.onload = () => {
      registerConfig();

      console.log('requirejs installed')
      resolve()
    }
    s.onerror = (e) => {
      console.log('requirejs load fail')
      reject(e)
    }
    document.body.append(s);
  })
}


function loadCss(url) {
  return new Promise((resolve, reject) => {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    link.onload =resolve
    link.onerror = reject
      document.getElementsByTagName("head")[0].appendChild(link);
  })
}

/**
 *
 * @param url 脚本的地址, 建议 直接 http 地址, 也可以相对路径
 * @returns {Promise<void>}
 */
export function loadScript(url){

  // 这里判断是否加载css
  if(url.endsWith('.css')) {
    return loadCss(url);
  }

  return new Promise((resolve, reject) => {
    installRequirejs().then( () => {
      window.requirejs([url], resolve, reject)
    })
  })
}
