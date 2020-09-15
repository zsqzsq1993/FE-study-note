# Front End Study Note for Interview

前端通用知识点梳理。

## HTML

**1. DOCTYPE**

<!DOCTYPE> 声明在<HTML>标签之前，用于指定以什么样的方式来解析文档。若以标准模式来进行解析，解析规则会以最新的标准；而在兼容模式下，则会向后兼容，以模拟老式浏览器的行为。<!DOCTYPE>不存在或者是模式不正确，都会自动采用兼容模式。

**2. SGML、HTML、XML、XHTML的区别**

1）SGML是标准通用标记语言，是所有电子文档标记语言的起源。

2）HTML是网页标记语言。

3）XML是网页标记语言未来的发展方向，与HTML标签不同的是，XML标签可以自定义，且数量不受限制。

4）XHTML是更加规范化的HTML，限定了包括全部使用小写，标签必须闭合等。

**3. DTD**

Document Type Definition跟DOCTYPE比较相似，用于定义解析文档的规则。HTML5以前，网页页面基于SGML，因此必须指定DTD，现在指定DOCTYPE就好。

**4. 内联元素及块级元素**

在HTML4中，元素主要被分为块级元素及内联元素（行内元素）。

块级元素是指元素宽度会占据父级元素的整个宽度；而行内元素指延伸到边框。

行内元素设置width、height、margin、padding都无效（line-height有效）。

**5. 空元素**

标签内没有内容的元素称为空元素。如img、input、br、hr。

**6. link标签**

link标签定义文档与外部资源的关系。

它是一个空元素，仅包含属性。只能存在于head之中，不过可以出现多次。

**7. link和@import引入css有何区别？**

1）link标签从属于HTML的引入方式，@import是css的引入方式。

2）link标签引入stylesheet在网页加载的同时进行加载，而@import在网页加载完成后进行加载。

3）link标签不存在兼容性；@import标签是css2.1之后的语法，存在兼容性。

**8. 对浏览器的理解**

浏览器是展现web资源的一种载体。用户通过输入uri地址向服务段请求资源，请求的资源在浏览器段进行展示。

浏览器分为两部分。shell和内核。shell就是操作界面，内核是标记语言显示内容的模块。

**9. 对浏览器内核的理解**

浏览器的内核分渲染引擎和JS引擎。渲染引擎就是将各种资源如HTML、XML等渲染成页面在浏览器段呈现。而JS引擎则是解析和执行JS代码。开始两者之前没有明确的划分，但随着JS引擎逐渐强大，两者被慢慢地分开。

**10. 浏览器渲染的原理**

1）客户端请求HTML后渲染引擎对返回的HTML进行解析；

2）接收到的HTML会解析为DOM树；

3）CSS会以类似的形式解析为CSSOM树；

4）CSS应该保证层级扁平，少用特定的选择器，这样在解析CSSOM树时的性能会更好；

5）在解析DOM树的过程中如果遇到了JS script会阻塞渲染，交由JS引擎接手，当JS执行完毕后再交回渲染器。

6）DOM树和CSSOM树会合并成渲染树；

7）生成渲染树后，变会进行布局（回流），交由GPU进行图层的绘制。

**11. 为何操作DOM的代价大**

首先，操作DOM一般是在JS中操作。DOM的渲染和JS的执行分别由渲染引擎和JS引擎执行，频繁地用JS操作DOM会增加两个线程之间的通信，势必造成性能上的损耗。

操作DOM又分为重绘（Repaint）和回流（Reflow）。重绘不会带来布局上的改变比如改变color；而回流需要重新布局，操作的代价更大。

**12. 在script标签中，async和defer有何区别**

首先script标签中的JS代码分为加载和执行两个阶段。

async和defer都会使HTML文档解析到script标签时，异步加载JS代码，从而不阻塞HTML文档的进一步解析。

但区别是，使用async，当资源加载完后会立即执行JS代码，阻塞HTML文档的解析；

而defer则是加载完成后要等待整个HTML文档解析完毕后再执行。

在实际使用的过程中，defer更有意义。

**13. 什么是预加载**

webkit和Gecko内核都进行了预加载的优化。当文档解析到script时，渲染引擎线程并行加载后面需要网络的资源比如图片等，却不对DOM树进行改变。等JS执行完毕后，剩下的解析再由主解析过程完成。

**14. CSS如何阻塞文档的解析**

在执行JS时，若遇到某些JS代码对DOM节点的样式进行改变，而此时CSSOM却未构建完成的话，这显然存在着各种不确定性。因此，JS代码会等到下载并构建完CSSOM树后再执行JS代码，进而继续执行文档的解析。

**15. FOUC和白屏**

FOUC（Flash of Unstyled Content）和 白屏是在浏览器渲染时出现的两种现象。

FOUC是指CSS未被加载完时，渲染引擎对已解析好的DOM进行了渲染并加上了默认样式，当CSS被加载完成后出现的样式改变而导致的闪屏。

白屏是由于某些浏览器的内核要等待DOM和CSSOM树都解析完毕后才进行页面的渲染，而加载CSS的时间过长或是CSS被放在了body的最后引入，从而导致页面长时间未渲染出新白屏。

**16. 重绘与回流**

重绘是指渲染树中的元素要更新属性，而这些属性仅仅会影响其风格，外观，而对布局不造成影响，如color、background-color等属性的改变。

回流是指渲染树中的元素要改变尺寸、布局或隐藏特性而引起的重新构建。回流的代价比重绘要大的多。任何引起元素几何信息的改变（如margin, padding, width等）都会引起回流。改变父节点中的子节点可能会导致一系列父节点的回流。回流必定导致重绘，而重绘不一定会产生回流。

**17. 如何减少回流**

CSS：

1）避免table布局

2）在渲染树的末端改变class

3）将动画效果运用到position为fixed或absolute的元素上

4）避免使用过多CSS表达式

JS：

1）预设class并更改className而不是一条条样式更改

2）可以先把元素的display设为none再进行更改，display为none的元素不会发生回流

**18. DOMContentLoaded和Load事件**

DOMContentLoaded事件比Load事件发生的更早，当DOM树构建完成后DOMContentLoaded事件便会触发。这时，可能还有一些异步加载的图片资源还未加载完成。当整个页面加载完成后，Load事件触发。

**19. 对HTML语义化的理解**

HTML语义化是指使用合适的标签来划分网页的结构。这样做不仅利于人的阅读也利于机器的阅读。

1）便于开发者阅读源码时抛开CSS布局直接分析网页的机构；

2）便于盲人在使用屏幕阅读器时更好的阅读体验；

3）便于搜索引擎在做网页爬虫时更好地对网页进行分析，提高网页的seo；

**20. em和i的区别，以及strong和b的区别**

em和i标签都表示斜体，strong和b标签都表示加粗。但是i和b都是自然标签不具备语义化，而strong和em标签是语义化更强的标签，不仅利于人类阅读，也利于机器在爬虫时进行阅读。

**21. 前端seo需要注意什么？**

1）合理的title、description和keywords。这三者权重依次递减。title要有总结性，且同一个title关键词不可出现多次，不同页面最好要有不同的title。description是页面内容的高度概括，要精炼，不可过分堆砌关键词。

2）语义化的代码方便搜索引擎更好的理解网页结构，利于爬虫爬取。

3）不要用JS代码来引入重要的内容，搜索引擎不会运行JS代码。

4）少用iframe，搜索引擎不会爬取iframe中的内容。

5）所有的图片都要加上alt。

6）重要的内容要放在HTML文档的前面，因为爬虫的顺序是从上至下的，而有些搜索引擎有搜索的长度限制。

**22. HTML5的离线缓存**

当用户没有网络连接时，用户将使用本地缓存的资源来加载网页。

mainfest是一种文件名（以mainfest为后缀），用来规定以什么样的规则在本地缓存资源。

mainfest文件有三个title，分别是CACEHE、NETWORK和FALLBACK。必填字段是CACHE。如：

```
CACHE MANIFEST
#v0.11

CACHE:
lib/ionic/js/ionic.bundle.js
lib/angular-ui-router.js
js/app.js
lib/ionic/css/ionic.css
css/style.css
views/login_header.html
views/login.html
lib/ionic/fonts/ionicons.ttf?v=1.5.2
lib/ionic/fonts/ionicons.woff?v=1.5.2

NETWORK:
lib/ionic/fonts/ionicons.ttf?v=1.5.2
lib/ionic/fonts/ionicons.woff?v=1.5.2
css/style.css

FALLBACK:
/ /offline.html
```

CACHE表示离线缓存的资源列表

NETWORK表示仅在有网络下加载的资源列表，若CACHE和NETWORK设置了相同资源，CACHE具有更高的优先级

FALLBACK表示第一个资源加载失败后用第二个资源来替代它，如/加载失败后用/offline.html来进行替代

>  在线的情况下，浏览器发现html头部有manifest属性，它会请求manifest文件，如果是第一次访问app，那么浏览器就会根据manifest文件的内容下载相应的资源并且进行离线存储。如果已经访问过app并且资源已经离线存储了，那么浏览器就会使用离线的资源加载页面，然后浏览器会对比新的manifest文件与旧的manifest文件，如果文件没有发生改变，就不做任何操作，如果文件改变了，那么就会重新下载文件中的资源并进行离线存储。

