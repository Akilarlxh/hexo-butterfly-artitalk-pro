# hexo-butterfly-artitalk-pro

给`hexo-theme-butterfly`添加 [侧边栏artitalk说说和页面版说说](https://akilar.top/posts/f1004b1d/)

# 安装

1. 安装插件,在博客根目录`[Blogroot]`下打开终端，运行以下指令：
  ```bash
  npm uninstall hexo-butterfly-artitalk --save
  npm install hexo-butterfly-artitalk-pro --save
  ```

2. 添加配置信息，以下为写法示例
  在站点配置文件`_config.yml`或者主题配置文件`_config.butterfly.yml`中添加

  ```yaml
    # artitalk see https://artitalk.js.org/
    # hexo-butterfly-artitalk-pro
    # see https://akilar.top/posts/f1004b1d/
    artitalk:
      enable:
        card: true # 侧边栏开关
        page: true #页面开关
      # 侧栏相关配置项
      priority: 5 #过滤器优先权
      enable_page: all # 应用页面
      layout: # 挂载容器类型
        type: class
        name: sticky_layout
        index: 0
      # 页面相关配置项
      path: artitalk
      front_matter:
        title: 碎碎念
      # 公共配置项
      appId: ***************************
      appKey: ****************************
      exclude:
        - /artitalk/
        - /posts/ #需要abbrlink插件支持
      js: https://unpkg.zhimg.com/artitalk
      card_css: https://unpkg.zhimg.com/hexo-butterfly-artitalk-pro/lib/card.css
      card_visual_js: https://unpkg.zhimg.com/hexo-butterfly-artitalk-pro/lib/card_visual.js
      option:
        serverURL: https://********.api.lncldglobal.com #********替换成你的appID前八位
        lang: zh
        pageSize: 1
        color1: '#49b1f5'
        color2: '#00c4b6'
        atEmoji: {
          'Mafumafu1':'https://cdn.jsdelivr.net/gh/GamerNoTitle/ValineCDN@master/Mafumafu/199749454.png',
          'Mafumafu2':'https://cdn.jsdelivr.net/gh/GamerNoTitle/ValineCDN@master/Mafumafu/199749455.png'}
  ```
3. 参数释义

  |参数|备选值/类型|释义|
  |:--|:--|:--|
  |enable.card|true/false|【必选】侧边栏控制开关|
  |enable.page|true/false|【必选】页面插件控制开关|
  |priority|number|【可选】过滤器优先级，数值越小，执行越早，默认为10，选填|
  |enable_page|path/all|【可选】填写想要应用的页面的相对路径（即路由地址）,如根目录就填'/',分类页面就填'/categories/'。若要应用于所有页面，就填'all'，默认为all|
  |layout.type|id/class|【可选】挂载容器类型，填写id或class，不填则默认为id|
  |layout.name|string|【必选】挂载容器名称|
  |layout.index|0和正整数|【可选】前提是layout.type为class，因为同一页面可能有多个class，此项用来确认究竟排在第几个顺位|
  |path|string|【可选】Artitalk的路径名称（默认为artitalk，生成的页面为artitalk/index.html）|
  |front_matter|json|【可选】Artitalk 頁面的 front_matter 配置|
  |appId|string|【必选】LeanCloud创建的应用中的 AppID|
  |appKey|string|【必选】LeanCloud创建的应用中的AppKEY|
  |exclude|URL|【可选】若同时开启了页面版和侧栏版插件，则需要手动填写页面版的相对链接。以保证在页面版不会加载侧栏版插件。可以多个。写法见示例。原理是将屏蔽项的内容逐个放到当前路径去匹配，若当前路径包含任一屏蔽项，则不会挂载。|
  |js|URL|【可选】Artitalk的CDN链接,默认为`https://unpkg.zhimg.com/artitalk`|
  |card_css|URL|【可选】卡片样式的CDN链接,默认为`https://unpkg.zhimg.com/hexo-butterfly-artitalk-pro/lib/card.css`|
  |card_visual_js|URL|【可选】卡片样式控制版块显隐的CDN链接,默认为`https://unpkg.zhimg.com/hexo-butterfly-artitalk-pro/lib/card_visual.js`|
  |option|json|【可选】Artitalk需要的额外配置，详情可以参考[Artitalk官方文档](https://artitalk.js.org/settings.html#%F0%9F%98%9C-artitalk%E6%94%AF%E6%8C%81%E4%B8%A4%E7%A7%8D%E5%88%9D%E5%A7%8B%E5%8C%96%E6%96%B9%E5%BC%8F)|

# 截图
## 侧栏插件预览
![](https://unpkg.zhimg.com/akilar-candyassets/image/fbece72e.png)
## 页面生成预览
![](https://user-images.githubusercontent.com/16351105/107762957-c4c1e580-6d68-11eb-984f-74c9bf6325e9.png)
