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

**23. 客户端的常见存储技术**

客户端的常见存储技术是cookie、localStorage和sessionStorage。它们均以键值对形式的字符串来储存数据。

cookie是记录用户状态的一种方式，它在服务端设置并在客户端储存。可以被所有同源页面所共享。它的储存大小为4k，过期时间由expires决定。

sessionStorage是HTML5中出现的储存技术。它受到服务端session的概念所启发，用于储存一次会话的数据。当浏览器关闭后被自动清除，同样它也可以被所有同源页面所共享。

localStorage也是HTML5中出现的储存技术。它所储存的数据在浏览器关闭后不会自动清除，除非手动清除。它也只能被同源页面所共享。

它们都只能储存少量的数据，如果要在客户端储存大量的数据，可以使用indexedDB，它是一种类似Nosql的数据库。

**24. iframe的缺点**

美国前十大网站都选择使用iframe来展现广告，因为用iframe展现广告十分的方便。但是，使用iframe也会带来很多缺点。

1）在中小型设备中很难展示完全

2）iframe加载过慢会阻塞load事件，解决方案是用JS动态设置src

3）搜索引擎不会爬取iframe中的内容，不利于网页seo

4）浏览器的后退按钮会发生失效

**25. 表单中Label的作用**

Label用于关联表单控件。当用户选择该标签时，该标签所关联的表单控件会被自动聚焦。

**26. Form的自动完成功能**

autocomplete是指输入字段是否启用输入自动填充功能，默认开启。通过设置autocomplete=false来关闭该功能。可以对form标签和input标签下的text、email等类型进行设置，设置后用户在输入时自动出现之前敲打记录等联想。

**27. 如何实现浏览器中多个标签页之间的通信**

1）使用localStorage。localStorage在发生增删改时都会触发storage事件，可以监听storage事件并从中取得数据

2）WebSocket，WebSocket是一种协议。http协议只能由客户端发起并由服务端回复，服务端无法主动地发起一次回复。WebSocket则可实现平等对话。可以多个标签页联通同一个服务器，服务器以WebSocket协议发送信息给多个用户

3）SharedWorker，多个标签页共享同一个线程。通过向线程来发送、接收数据。

**28. Page Visibility API**

这个API的意义在于监听网页的可见性。以便当网页不可见时可以执行：

1）停止动画播放

2）停止播放的视频或者音频

document.visibilityState会返回三种可能情况值，hidden、visible和prerender。hidden和visible很好理解，哪怕网页只要露出了一个小角，也会返回visible。prerender只会出现在存在预渲染的浏览器里，页面正在渲染处于不可见的状态。

**29. 如何在不使用border的情况下画出1px的线**

```
{
	height: 1px;
	overflow: hidden;
	background-color: red;
}
```

**30. Canvas和SVG绘图有何区别**

Canvas是使用JS来绘制2D图像，它是基于位图的。因此放大后会出现锯齿或失真。

SVG是使用XML来描述2D图像的语言，它是矢量图，放大后不会出现失真或锯齿。

**31. 渐进增强和优雅降级的定义**

渐进增强是指针对低版本的浏览器制定完整的功能，再针对高版本的浏览器进行交互、动画效果的改进。

优雅降级是指针对版本的浏览器制动完整的功能，针对低版本的浏览器，提供兼容方案。

**32. attribute和property的区别是什么？**

attribute是针对HTML的标签的；

property是针对JS对象的。

**33. 浏览器架构**

```
 * 用户界面
   * 主进程
   * 内核
       * 渲染引擎
       * JS 引擎
           * 执行栈
       * 事件触发线程
           * 消息队列
               * 微任务
               * 宏任务
       * 网络异步线程
       * 定时器线程
```

**34. reset.css和normalize.css**

两者的目的都是相同的，都是为了解决各浏览器之间默认样式不统一的问题。

reset.css是使用较早的，它重置了基本所有的默认样式，对于一些可取的有意义的默认样式显得有些画蛇添足。

normalize.css则考虑更加全面，它保留了浏览器有价值的默认样式。并修复了浏览器存在的一些bug。并且，不像reset.css那样有着复杂的继承链，使得性能得到了一定程度提升。

**35. 预格式化文本的标签**

pre标签是预格式化文本的标签，保留源码中的格式与内容，所见即所得

**36. 在head标签中，必不可少的是？**

head标签用于定义文档的头部。文档的头部主要储存文档的各类信息和属性。

head中可以包含的标签有base、link、meta、script、style以及title，其中，title必不可少。

**37. disabled和readonly的区别**

首先两者若定义在input中，均可以通过JS更改value的值。

disabled不会随着表单提交，而readonly的值会。

## CSS

**1. 介绍一下标准盒模型，与IE盒模型有什么不同**

在盒模型中，分为：content、padding、border、margin。

盒模型分为两种：W3C标准盒模型（content-box）和IE盒模型（border-box）。

两种盒模型可以通过box-sizing进行切换。

在content-box中，width和height只包含有content。

在border-box中，width和height包含有content+padding+border。

**2. CSS选择器有哪些？**

1）id选择器：#hello

2）类选择器：.content

3）标签选择器：div

4）后代选择器：ul li

5）子选择器：ul>li

6）兄弟选择器：h1~p

7）相邻兄弟选择器：h1+p

8）伪元素选择器：h1::after

9）伪类选择器：a:hover

10）通配符：*

后代选择器&子选择器：子选择器是仅后一代选择器。

兄弟选择器&相邻兄弟选择器：相邻兄弟选择器只选择第一个兄弟元素。

**3. 单冒号和双冒号**

在css3中，单冒号表示伪类，双冒号表示伪元素。但是在过去，也有用单冒号表示伪元素的，为了兼容，两者在大多数浏览器中都可以使用。

**4. 伪类和伪元素的区别**

首先，在css3中规定，伪类使用单冒号，伪元素使用双冒号。

伪类用来表示已存在的元素的某种状态。比如:hover表示悬停。

伪元素用来表示不在文档树中的元素。它们用来表示文档树以外的信息。如::before，::after。我们可以为它们添加文本，用户也能看见这些文本，但是，它们并不在文档树内。

**5. 继承属性和非继承属性**

css中的属性分为继承属性和非继承属性。

当未指定继承属性的值时，它将继承父属性的值。

当未指定非继承属性的值时，它将使用默认值。

无论是继承还是非继承属性，都可以显示的指定inherit来继承父属性。

**6. css的优先级**

判断css的优先级我们会先判断一条声明有无权重，即!important。如果有的话，它的优先级是最高的，前提是后面未再次出现权重的声明。如果后面还有，则需要比较声明的匹配规则特殊性。

一条声明的匹配规则特殊性，由这条声明中出现的选择器的特殊性进行次数的累加（不可进位）。内联样式的特殊性为1000，id选择器的特殊性为0100，类选择器的特殊性为0010，标签选择器或伪类选择器的特殊性为0001。比如下面这条声明：.content #hello div 的特殊性为0111。特殊性的大小比较为从左至右，同一位上1永远比0大，无论后面位置是如何。

若两条声明的匹配规则特殊性相同，则比较声明出现的位置，后出现的将覆盖之前的声明。	

**7. 标签的LVHA**

标签的伪类有四种，:linked, :visited, :hover, :active。

这四种伪类的声明位置有讲究，其实也符合逻辑顺序。

首先一个标签要么是访问过的，要么是未访问的，所以先定义的肯定是:linked、:visited，且两者可以交换顺序。

点击它先是悬浮再是激活，所以应该先是:hover再是:active。因此是LVHA的顺序。

**8. 实现居中的几种方式**

1）设置宽度，margin设置auto，实现水平居中。

2）position设置为absolute，top和left都为0，设置宽度，margin为auto实现水平、垂直居中。

3）position设置为absolute，top和left都为50%，利用transform的translate3d为-50%，置为中点。

4）父容器flex布局，justify-content和align-items设置为center。

**9. display的几种取值**

1）block

2）inline

3）inline-block：向外表示为inline，向内表示为block。理解为可以设置width、height、margin、padding的内联元素

4）list-item：带列表标记的block元素

5）none：渲染引擎不会进行渲染

6）table

7）inherit

**10. flex布局**

flex是flexible box弹性盒模型的简称。任何元素都可以通过设置display为flex成为弹性盒模型，包括内联元素。当元素被设置为flex布局之后，其内部的子元素floa、clear和vertical-align将设置无效。

容器分两个轴线，主轴（main axis）和交叉轴（cross axis）。

flex-direction: 主轴的方向，column或row，默认为row

flex-wrap：主轴排不下后的换行形式，默认为nowrap

flex-flow：flex-direction + flex-wrap

justify-content：主轴上排列方式

align-items：交叉轴上的排列方式

align-content：多根轴线的对齐方式

以下设置在项目上：

order：item的出现顺序，越小则越先出现，默认为0

flex-basis：在剩余空间被分配之前，每个item的基础空间，默认为auto，即盒模型的宽度

flex-grow：若存在剩余空间的放大比例，默认为0，不进行放大

flex-shrink：若空间不够的压缩比例，默认为1，进行压缩

flex：flex-grow + flew-shrink + flex-basis 默认 0 1 auto

align-self：允许单个项目设置不同的对齐方式，以覆盖父元素设置的align-items

**11. 纯css绘制三角形**

```css
#demo {
  width: 0;
  height: 0;
  border-width: 20px;
  border-style: solid;
  border-color: transparent transparent red transparent;
}
```

**12. inline元素间的空白间隔**

浏览器会把inline元素之间的间隔（空格、换行符等）渲染为一个空格。如在写一些li标签时，为了HTML文档书写美观，往往会每一个li标签占据一行，这就导致了空格的出现。

常用解决方案：

1）将inline标签书写在同一行不用换行符隔开，但书写会变得不美观

2）将父元素的font-size设置为0，再在每个字元素中单独设置font-size，这是常见的解决方案

**13. visibility: collapse**

首先visibility: hidden和display: none的区别在于，display: none不在占用页面空间，而visibility: hidden仍会占用页面空间。

如果是visibility: collapse，大多数情况下它的表现与hidden相同。除了将table相关的元素进行了设置，它会表现为与display: none相似。

**14. width设置为100%与auto的区别**

width设置为100%，box的宽度会设置为父容器content的宽度。

width设置为auto，会使子元素充满整个父容器content的宽度，但是却是content、padding、border和margin自动分配空间。

**15. 绝对定位与非绝对定位width设置为100%的区别**

绝对定位的100%是相对于临近的父辈元素中position不为static的；

非绝对定位的100%是相对于父元素的。

**16. 图片base64编码**

图片的base64编码是指用base64对图片进行编码生成字符串，并在html或者css中进行储存。在浏览器解析html文档时或css时，再对图片字符串进行解码生成图片。

这样做的好处是：

1）减少图片带来的http请求

但这样的缺点是：

1）稍大点的图片编码后生成的字符串长度大，不利于css文件的阅读

2）生成后的字符串空间大，浏览器渲染时增加了渲染时间，有可能因为解析cssom时间过长而造成阻塞

因此，base64编码比较适合一些小图片的储存。比如logo，或者背景平铺图的基础图片。

**17. BFC**

BFC（Box Formatting Context）块格式化上下文。形成块格式化上下文后，意味着形成了一个相对封闭的区域。内部按照一定规则进行布局，不会影响外部的布局情况。外部的布局也不会影响内部的。

创建BFC的方法有：

1. 根元素或包含根元素的元素
2. 浮动元素 float ＝ left | right 或 inherit**（≠ none）**
3. 绝对定位元素 position ＝ absolute 或 fixed
4. display ＝ inline-block | flex | inline-flex | table-cell 或 table-caption
5. overflow ＝ hidden | auto 或 scroll **(≠ visible)**

举个例子：

若未设置父容器高度，子元素设置float会导致父容器高度塌陷。

解决的方法除了正统的clearfix外，还可以让父元素的overflow：hidden

**18. 清除浮动**

第一种：插入一个空标签clear：both

第二种（常用）：父元素的伪元素::after内容可以设为'.'，clear设为both，display设置为block。因为伪元素的display默认是内联的，清除浮动必须要对块级元素使用。

使用伪元素的原因是伪元素不占用正常的文档流，符合这里的情况，仅作为功能性使用。

**19. margin合并**

margin合并是指相邻的两个元素在垂直方向上发生margin合并的现象。

margin合并的条件是：

1）两个元素是严格相邻的，彼此没有被padding或者border所分开

2）两个元素处在同一个BFC中

合并后的value：

1）若两个margin都为正值，则取大者

2）若两个margin都为负值，则取绝对值大者

3）若连个margin一正一负，则取相加的值

合并的情形：

1）兄弟元素的margin-top和margin-bottom发生合并

避免的方法是：将一个元素放入另一个BFC

2）父子元素的margin-top

避免的方法是：父元素添加border-top或padding-top以起到分隔作用；或者子元素创建BFC

3）父子元素的margin-bottom（要求父元素的height为auto）

避免的方法是：父元素添加border-bottom或padding-bottom起分隔作用；或者子元素创建BFC

4）高度为0的元素的margin-top和margin-bottom

可以设置padding和border，以及min-height

**20. IFC**

IFC（Inline Formatting Context）行内格式上下文。

在IFC中，盒子在水平方向一个接一个的排列；

排列不下，自动换行

IFC的高度由最高的盒子高度决定

**21. 浏览器如何解析css选择器的？**

浏览器从关键选择器开始从右向左匹配，直到匹配到规则为止，或者未匹配到规则舍弃。

如果浏览器从左开始向右匹配，那很多情况下匹配到最后才发现是需要舍弃的，浪费了很多资源。

**22. 使用基数还是偶数字体？**

推荐使用偶数字体

**23. margin和padding的适用场景**

margin的目的是用来分隔不想干的元素

paddding的目的是用来分隔元素和内容

何时用margin：

1）需要用到margin合并的时候

2）希望背景不要延伸到空白部分

padding使用场景则相反

**24. css3中的all属性**

将一键设置除了unicode-bidi和direction外的所有css样式

可能值为initial、inherit以及unset

Initial: 都使用初始值

Inherit: 都继承父元素的值

unset：可继承元素继承父元素的值，不可继承元素使用初始值

**25. 为何不使用通配符进行初始化**

处于性能考虑，通配符会将所有的元素全部遍历一遍。

*{padding: 0; margin: 0}看上去很简单，但会有很大的性能开支。因为很对元素的默认样式就是未设定padding和margin的，不需要对他们进行重新地设置。



