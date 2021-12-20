'use strict'
// 全局声明侧栏插件代号
const pluginname = 'card_artitalk'
// 全局声明依赖
const pug = require('pug')
const path = require('path')
const urlFor = require('hexo-util').url_for.bind(hexo)
const util = require('hexo-util')

// 先来编写侧栏插件，使用容器注入式开发模板

hexo.extend.filter.register('after_generate', function (locals) {
  // 首先获取整体的配置项名称
  const config = hexo.config.artitalk || hexo.theme.config.artitalk
  // 如果配置开启
  if (!(config && config.enable.card)) return
  // 集体声明配置项
    const card_data = {
      page_enable: config.enable.page ? config.enable.page : false,
      enable_page: config.enable_page ? config.enable_page : "all",
      layout_type: config.layout.type,
      layout_name: config.layout.name,
      layout_index: config.layout.index ? config.layout.index : 0,
      path: config.path ? "/" + config.path + "/" : "/artitalk/",
      exclude: config.exclude ? config.exclude : "/artitalk/",
      appId: config.appId,
      appKey: config.appKey,
      option: config.option ? JSON.stringify(config.option) : false,
      js: config.js ? urlFor(config.js) : 'https://unpkg.zhimg.com/artitalk',
      card_css: config.card_css ? urlFor(config.card_css) : 'https://unpkg.zhimg.com/hexo-butterfly-artitalk-pro/lib/card.css',
      card_visual_js: config.card_visual_js ? urlFor(config.card_visual_js) : 'https://unpkg.zhimg.com/hexo-butterfly-artitalk-pro/lib/card_visual.js'
    }
  // 渲染页面
  const temple_html_text = config.temple_html ? config.temple_html : pug.renderFile(path.join(__dirname, './lib/card.pug'),card_data)

  //cdn资源声明
    //样式资源
  const css_text = `<link rel="stylesheet" href="${card_data.card_css}" media="defer" onload="this.media='all'">`
    //脚本资源
  const js_text = `<script async src="${card_data.card_visual_js}"></script>`

  //注入容器声明
  var get_layout
  //若指定为class类型的容器
  if (card_data.layout_type === 'class') {
    //则根据class类名及序列获取容器
    get_layout = `document.getElementsByClassName('${card_data.layout_name}')[${card_data.layout_index}]`
  }
  // 若指定为id类型的容器
  else if (card_data.layout_type === 'id') {
    // 直接根据id获取容器
    get_layout = `document.getElementById('${card_data.layout_name}')`
  }
  // 若未指定容器类型，默认使用id查询
  else {
    get_layout = `document.getElementById('${card_data.layout_name}')`
  }
  // 挂载容器脚本
  // 此处在通用模板基础上，我们还需要加一条判断，保证不会在页面版再加载一个侧栏插件
  var user_info_js = `<script data-pjax>
  function ${pluginname}_injector_config(){
    var parent_div_git = ${get_layout};
    var item_html = '${temple_html_text}';
    console.log('已挂载${pluginname}');
    parent_div_git.insertAdjacentHTML("afterbegin",item_html);
    (()=>{
      const init = () => {
        new Artitalk(Object.assign({
          appId: '${card_data.appId}',
          appKey: '${card_data.appKey}',
        }, ${card_data.option} ))
      }
      if (typeof Artitalk === 'function') {
        init()
      } else {
        getScript('${card_data.js}').then(init)
      }
    })()
    }
  var elist = '${card_data.exclude}'.split(',');
  var cpage = location.pathname;
  var epage = '${card_data.enable_page}';
  var flag = 0;

  for (var i=0;i<elist.length;i++){
    if (cpage.includes(elist[i])){
      flag++;
    }
  }

  if ((epage ==='all')&&(flag == 0)){
    ${pluginname}_injector_config();
  }
  else if (epage === cpage){
    ${pluginname}_injector_config();
  }
  </script>`
  // 注入用户脚本
  // 此处利用挂载容器实现了二级注入
  hexo.extend.injector.register('body_end', user_info_js, "default");
  // 注入脚本资源
  hexo.extend.injector.register('body_end', js_text, "default");
  // 注入样式资源
  hexo.extend.injector.register('head_end', css_text, "default");
},
hexo.extend.helper.register('priority', function(){
  // 过滤器优先级，priority 值越低，过滤器会越早执行，默认priority是10
  const pre_priority = hexo.config.artitalk.priority || hexo.theme.config.artitalk.priority
  const priority = pre_priority ? pre_priority : 10
  return priority
})
)

// 再是编写页面版插件，使用页面生成式模板
// 此处直接复用hexo-butterfly-artitalk的原代码
hexo.extend.generator.register('artitalk', function (locals) {
  const config = hexo.config.artitalk || hexo.theme.config.artitalk

  if (!(config && config.enable.page)) return

  const page_data = {
    appId: config.appId,
    appKey: config.appKey,
    option: config.option ? JSON.stringify(config.option) : false,
    js: config.js ? urlFor(config.js) : 'https://unpkg.zhimg.com/artitalk'
  }

  const content = pug.renderFile(path.join(__dirname, './lib/page.pug'), page_data)

  const pathPre = config.path || 'artitalk'

  let pageDate = {
    content: content
  }

  if (config.front_matter) {
    pageDate = Object.assign(pageDate, config.front_matter)
  }

  return {
    path: pathPre + '/index.html',
    data: pageDate,
    layout: ['page', 'post']
  }
})
