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

**26. absolute定位的containing block与其他的包含块儿有何不同**

1）内联元素也可以作为absolute的包含块儿

2）所在的元素不是父级元素，而是最近的非static元素

3）包含块儿的盒子不是content-box，而是padding-box

**27. 元素竖向的百分比是相对于什么的？**

1）如果是height，百分比是相对于包含块儿的高度

2）如果是margin或者padding，则是相对于包含块儿的宽度

**28. 全屏滚动的原理**

父级容器置为fixed，拥有固定高度（向客户显示的一页的高度）。子容器具有多页的高度，多余的部分被父容器隐藏。通过监听滚动事件，根据pageY来设定父容器的transform或者top。

**29. 什么是响应式设计**

一套设计方案能否兼容多个终端，而不是针对每个终端都做一套方案。

**30. 如何修改chrome记住密码后表单里自动显示的黄色**

当chrome表单被自动填充后，会获得如下伪类样式：

```css
{
	background-color:rgb(250,255,189)!important;
	background-image:none!important;
	color:rgb(0,0,0)!important;
}
```

background-color因为加上了权重因此无法被覆盖。可以通过修改box-shadow

```css
-webkit-box-shadow:000px 1000px white inset;
```

**31. 如何在chrome中使用小于12px的字体**

1）将文字切成图片

2）利用transform中的scale来解决。但scale会收缩整个盒子，因此要将内联转变为块级

**32. 在webkit内核中，如何让字体变清晰变细**

调整-webkit-font-smoothing属性

**33. font-style中italic和oblique的区别**

italic是使用当前字体的斜体样式，而oblique则是单纯让文字倾斜。

建议使用italic，因为当当前字体的斜体样式不存在时，会向后兼容，自动取oblique。

**34. 前端中的像素**

在前端中，需要搞清楚三个像素的基本概念：

css像素，又叫设备独立像素、虚拟像素；

设备像素，又叫物理像素；

dpr，设备像素除以设备独立像素

物理像素是真实存在的，是设备的最小单位描绘点。比如手机的物理像素是100px*100px；说明该款手机在横纵方向上都有100个描绘点。

一般设计稿给出的都是物理像素，我们一般用该像素除以dpr得到我们需要设置的css像素。

ppi是pixel per inch即单位inch的pixel数量。肯定是越高分辨率越高，ppi在平时移动端写css的时候不会用到。

**35. 前端中三种viewport的概念**

在前端中ppk提出了三种viewport的概念：layout viewport , visual viewport, ideal viewport。

layout viewport是浏览器的一种默认值，一般为980px。原因是一些未针对移动端进行设计的网站若在移动端以移动设备宽度作为html总宽的话布局会发生错乱或者很挤。因此浏览器会将viewport的大小设置为一个较大的值（比设备宽度大），但问题就是会出现横向拖动。

visual viewport就是layout viewport中显示的那一部分。好比通过窗户看风景，窗户是visual viewport而风景是layout viewport。

ideal viewport下用户不用缩放和滚动条就能够查看到整个页面，并且页面在不同分辨率下显示的内容大小相同。ideal viewport其实就是通过修改layout viewport的大小，让它等于设备的宽度。但使用这种viewport的前提是网页是要针对ideal viewport进行设计的。

**36. 为何position为fixed在andriod下无效？**

因为默认情况下，浏览器设置的是layout viewport，会比设备宽度更宽，从而产生滚动效果。fixed的元素也跟着是针对layout viewport来设置的。所以给人的感觉像是fixed出现了无效。

解决方案是设置ideal viewport。

```html
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"></meta>
```

**37. 手写动画，最小每帧间隔多少**

16.67s

因为Event Loop为60帧/s

**38. 什么是cookie隔离？**

如果静态资源放在主域名下，那浏览器在请求它们的时候会在请求头内带上cookie，从而使请求变慢。

因此不如将静态资源隔离开放在cdn。

因为cookie有跨域限制，因此在向cdn做请求的时候就不会带cookie。

减少了Webserver解析cookie的时间。从而提高了响应速度。

**39. css的预处理和后处理**

css的预处理往往定义了一种新的语言，它与css语法较为类似，但加入了变量、循环、层级等，比css语言更具逻辑性。写好的代码会被编译为css代码。

css的后处理往往用于压缩、处理兼容性的场景。

**40. 什么是CSSSprites**

雪碧图是将网站所需要用到的所有图片合成为一张图，然后向服务端请求一次拿到这张组合好的图片。利用background-image、background-repeat以及background-position在特定的地方选择要使用到的小图。

这样做的好处：

1）大大降低了请求次数，极大地提高了页面的加载速度

2）更换图片的整体风格，只需要给一张合成图进行更换就好

这样做的缺点：

1）合成图片步骤麻烦

2）后期要更换图片麻烦

**41. rem的优缺点**

优点：在屏幕分辨率千差万别的时代，只要将分辨率与rem关联起来，变可以实现文字的缩放，在各个设备上都统一起来。

缺点：

1）在iframe中无效

2）在一些dpr奇怪的手机中有bug

3）引出问题：大屏幕到底是为了看的更多还是看的更大。如果是为了看的更多，使用rem的方法，与观念背道而驰。

**42. 常见的几种css布局**

**单列布局**

单列布局一般是header + content + footer

单列布局也分为两种，一种是三个区块儿同样宽度；第二种是content区块儿比header和footer区块儿短。

可以通过设置max-width。

第一个设置三个区块儿max-width均为960px

第二个设置header和footer区块儿为960px，content区块儿为800px

**两列自适应布局**

第一种利用float + overflow:hidden

父元素overflow设置为hidden来触发BFC，

左侧子元素向左浮动，

右侧子元素overflow设置为hidden，且zoom为1（兼容ie，触发haslayout）

第二种利用flex布局，不做赘述

**三列布局**

经典的圣杯：

1）center、left、right三个区块儿依次写，float都为left，center的width为100%，left和right的分别为200px（举例）。

效果为center在第一行占据100%父元素，left和right被挤到了第二行。

2）设置left和right的margin-left分别为-100%（这里会相对于父元素的宽度）和-200px，这样left和right区块儿会回到跟center同一行但存在重叠的部分。

3）设置父元素的padding-left和padding-right分别为220px，这样在左右两侧分别留下220px的空白

4）设置left和right区块儿为relative，left区块儿向左偏移220px，right区块儿向右偏移220px，大功告成

经典的双飞翼：

双飞翼与圣杯类似，但区别在于，不是通过设置父元素的padding-left和padding-right来留白，而是通过为center区块内部加入一层，为内层设置margin来留白。

两种布局的好处在于，让center区块的内容能够优先的得到加载

**多列等高布局**

container设置为overflow：hidden；内部多列子区块儿（可以用圣杯或者双飞翼）设置正padding-bottom和负margin-bottom进行对冲，且值要大。

**43. 如何展现0.5px的细线**

```css
{
  height: 1px;
  transform: scale(0.5);
  transform-origin: 50% 100%
}
```

**44. 简单说说transition和animation有何区别**

transition关注的的是css property的变化，而animation关注的是元素本身的变化

**45. 什么是首选最小宽度**

一般针对font而言的。如中文的首选最小宽度是每一个字，而英文的首选最小宽度则是每个单词。

若想改变英文的首选最小宽度为字符，可以使用word-break: break-all

**46. width、max-width、min-width之间的覆盖规则**

max-width会覆盖width，即使width设置了权重也无效；

min-width会覆盖max-width。

**47. 幽灵空白节点**

出现在inline元素或inline-block元素在行框盒子中被渲染的时候。每个行框盒子的最前面，都拥有一个空白节点，无法选中它们，但它们确实存在。

**48. 什么是替换元素**

元素标签的某一个属性值发生改变后，其内容也发生了替换，这样的元素被称为替换元素。

如img、video、iframe等都是典型的替换元素。

替换元素拥有以下几个特点：

1）其内容的外观不受css所控制，也就是说在css作用域之外，某些元素可以通过appearance来修改外观。

2）vertical-align的解释规则与非替换元素不一致。非替换元素是以字符x的下边缘为baseline，而替换元素是以元素的下边缘。

3）替换元素默认是具有内联水平样式的，但默认是inline还是inline-block则因元素而异。

**49. 替换元素的尺寸计算规则**

替换元素的尺寸分三种：

1）固有尺寸，如图片身为文件时本身具备的尺寸；

2）html尺寸，即在html标签中，通过width和height设置的尺寸；

3）css尺寸，即通过css的width、height、max-width、min-width设置的尺寸。

情况如下：

1）html、css尺寸都未指明，则使用固有尺寸，

2）若仅指明了html尺寸，使用html尺寸，

3）若既指明了html尺寸，又指明了css尺寸，则使用css尺寸，

4）若拥有固定的宽高比，通过html或css指明width或height后，自动按照宽高比设置另一者

5）若都未指明，且原始文件不具备固有尺寸，使用300px * 150px

**50. 通过content生成的内容**

通过content生成的内容又被称为匿名替换元素。

其内容是无法被选中的，也无法被搜索引擎爬取。

**51. margin: auto**

margin的auto生效有一个前提，就是width或者height必须是auto。

1）若一侧固定值，一侧auto，则auto侧自动获得剩余空间

2）若两侧均为auto，则平分剩余空间

**52. margin失效的情况**

1）内联的非替换元素，替换元素（内联）垂直方向margin有效，并且没有margin合并的问题

2）绝对定位，非定位方位的margin是无效的

3）定高容器的子元素margin-bottom失效，定宽元素的子元素margin-right失效

**53. 关于border的冷知识**

1）border-width无法通过百分数来设置

2）border-style默认值为none，因此光设置border-color和border-width仍无法显示

3）border-style: double，显示双线，中间间隔1个线宽

4）border-color的默认值为color的值

5）background-color是padding-box

**54. baseline、x-height、ex**

baseline：基线，小写字母x的下边缘线

x-height：小写字母x的高度

meainline（middleline）：基线向上1/2x-height的高度，也就是小写x交叉位置

1ex：即1个x-height

**55. line-height的特殊性**

1）非替换的内联元素的高度就是由行高（line-height）来决定的。

2）行高之所以可以起作用，原因就是在于行距会根据行高和字高自动调整。

3）行距 = line-height - font-size。

4）line-height的值可以是绝对px，几点几（表示倍数）或者百分数。

5）line-height被继承时，继承的是它计算后的绝对结果，而非计算前的百分数或者倍数。

6）内联元素的外部行框元素的高度，由line-height最大的内联元素决定。

**56. vertical-align的特殊性**

1）vertical-align默认的baseline是x字母的下边缘，而替换元素中，则是以元素的下边缘为基线。

2）vertical-align为top，上边缘对齐，与内联元素的最高点对齐。

3）vertical-align为middle以baseline向上1/2个x-height对齐（即meanline）。

4）vertical-align可以为数值，即以基线向上偏移多少。

**57. overflow: hidden**

1）当同时设置了padding和border时，超出的部分是以border-box内边缘来裁剪的而非padding-box

2）默认超出后能产生滚动条的是html和textarea标签

3）其他元素超出后，滚动条虽然没有产生，但滚动仍然存在

**58. 无依赖绝对定位**

无依赖绝对定位是指没有设定left、right、top、bottom的绝对定位。

无依赖绝对定位的位置与脱离文档流之前的位置有关。

**59. relative的特殊性**

1）relative的移动是相对于自身的，但百分数计算时，是相对于包含块儿的

2）垂直方向上top和bottom是相对于height的，如果包含块儿的height没有显示地表示（auto），则top和bottom计算结果为0

3）如果对立方向被同时设置时，top和bottom，top有效；left和right，left有效。

**60. 层叠上下文**

stacking context层叠上下文和block formatting context一样是一个作用域的概念。层叠上下文会比普通元素在z轴上优先显示。

stacking level层叠水平高的元素或层叠上下文在页面中优先显示。

stacking order表示将各个元素的stacking level排列起来，形成一套显示规则。



普通元素的stacking order一般是：

1）z-index用于显示标记层叠水平，在同一个层叠上下文内，层叠水平高的先显示。

2）如果没有显示标记层叠水平，内容优先于布局优先于装饰性。所以显示的顺序往往是内联元素在上，块级元素次之，background和border在下。

3）当层叠水平一致，在层叠规则中位置又相同，则在文档处于后面的优先显示。

4）若a和b，a的层叠水平高，a和b都形成了一个层叠上下文，其内的子元素，a的子元素跟着a享福，总比b子元素的层叠水平高，无论z-index如何设置。



如何创建层叠上下文？

往往是定位元素 + z-index

**61. font-weight特殊性**

100-900的整百数，整百。

**62. letter-spacing的特殊性**

作用于字符，如汉子作用于字之间，英文作用于单词之间

1）支持小数

2）支持负数

word-spacing作用于空格字符串，如英文作用于单词之间，换句话说，它就是增加空格的宽度。

**63. white-space**

white-space属性用于处理空白符。空白符包括空格（space）、制表符（tab）以及回车（enter）。

normal（default）：合并所有的空白符并自动换行

no-wrap：合并所有的空白符但不进行换行

pre：保留所有的原始样式，即原来有多少空格就保留多少，原来哪里回车就哪里换行

pre-wrap：在pre的基础上加入自动换行

pre-line：空格和制表符合并，回车保留不变，原来哪里回车在哪里换行，并且自动换行

**64. display设置为none，图片还会加载吗？**

1）如果是background-image，元素本身display设为none，图片仍会加载，父级元素设置为none，图片不会加载

2）如果是img标签，display为none，图片仍会加载

**65. 单行和多行文本的省略**

单行：

```css
div {
  white-space: no-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

多行： 待补充。

**66. 实现隐藏的几种形式**

1）display为none

2）visibility为hidden

3）opacity为0

4）绝对定位移出视框

5）transform：scale（0，0）

6）z-index为负

**67. 上下固定，中间自适应的布局**

对body在column方向上使用flex布局

sticky footer也可以使用这种方法

## JavaScript

**1. 基本数据类型**

Null, Undefined, Number, String, Boolean, Symbol

Symbol用于创建独一无二的标识符

**2. 数据的存放位置**

基本数据存放在栈中，

复杂数据（Object及Object的子类型）存放在堆中，

栈中存放了指向堆的指针。

**3. 内部属性[[class]]**

所有typeof返回object的对象都存在一个内部属性[[class]]，我们可以通过Object.prototype.toString()来查看，比如：

```js
Object.prototype.toString([1,2,3]) // [object Array]
Object.prototype.toString({}) // [object Object]
```

**4. undefined&undeclared&null**

声明却未赋值是undefined

未声明的是undeclared，js中并无该类型

初始化对象用null

undefined不是JS的保留字，但不建议使用

typeof null会返回object（历史遗留问题）

**5. 原型和原型链**

在js中，使用构造函数来创建一个对象。每一个构造函数（或者说每一个函数）都存在着一个prototype属性，指向该函数的原型对象。通过构造函数创造出来的实例对象都会共享这个构造函数原型对象上的属性与方法。实例对象上有一个内部属性[[prototype]]，也是一个指针用来指向构造函数的原型，一般浏览器预留的接口为__prototype\__，但不建议使用，可以使用Object.getPrototypeOf方法。每一个原型对象上都有一个constructor属性，用来指向它对应的构造函数。原型对象也存在着自己的原型，当调用某个对象的属性或者方法时，若无法在它“身上”找到则会到它的原型上去找，若原型上仍未找到，则会到原型的原型上找，最后找到Object.prototype上，若还未找到则返回undefined。这样层层上溯寻找的联系就是原型链。

**6. JS中不同进制的开头**

0x or 0X代表16进制

0o or 0O代表8进制

0b or 0B代表2进制

**7. JS中的安全整数范围**

(-2^53 - 1) ~ (2^53 - 1)

安全整数范围的定义是在这个范围内转换为2进制数进行储存不会出现精度丢失。

ES6中，有这两个常量的定义：

Number.MIN_SAFE_INTEGER

Number.MAX_SAFE_INTEGER

**8. NaN**

NaN意思为not a number。用于指出数字类型中的错误情况，一般在数字运算出错的情况下返回。

typeof NaN 会返回 number

但是 NaN === NaN会返回false（两等号也是false）

**9. isNaN和Number.isNaN的区别**

window.isNaN会先尝试将参数转换为Number类型，若无法转换，则返回true，若可以再判断是否为NaN。这样会妨碍判断的准确性。

window.Number.isNaN就会先判断是否为Number类型，若不是直接返回false，若是再做判断，这样结果会准确。

**10. Array构造函数带数字参数时的表现**

会将length属性设置为该长度。

Array可以不带new，会自动补全。

**11. 调用toString方法**

1）Null和Undefined类型分别返回'null'和'undefined'

2）Boolean返回'true'和'false'

3）Number返回数字，大的数返回指数

4）Symbol必须强制性地显示调用，返回其值

5）对象若没有自己的toString方法，则会调用Object.prototype.toString方法

**12. 假值对象**

对于那些boolean转化(Boolean())返回值为false的对象称为假值对象。

如Boolean(document.all)

**13. parseInt()和Number()有何区别**

parseInt中从左至右解析字符串，解析到非数字字符就停止，如'123zsq'解析结果就是123

Number中不允许出现非数字字符，否则结果直接返回NaN

**14. toPrimitive**

对象在进行加、减、打印等操作的时候，先会试图将对象转化为原始值（即基本类型）。

转化会调用object\[Symbol.toPrimitive](hint)函数。

hint有三种取值：'Number', 'String' 以及 'default'。

当hint取值为'String'，先后尝试toString和valueOf方法，若仍无法转化为原始值，报错。

当hint取之为'Number'或者'default'，先后尝试valueOf和toString方法，若仍无法转化为原始值，报错。

hint的取值：

1）当我们希望对象执行字符串相关操作时，如console.log或alert，hint取值'String'

2）若执行一元操作（如a += b）或者二元减法时，hint取值'Number'

3）执行二元加法使用default

以下几个场景

```javascript
[] + {} // hint为default，valueOf都无法让它们转化为原始值，调用toString，'' + '[object Object]' = '[object Object]'

{} + [] // 这个{}会被理解为包含块儿，+[].valueOf() = 0
```

可以重写转化函数如：

```javascript
object = {
  first: 'dolly',
  second: 'zhang',
  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case 'string':
      	console.log('to string')
        break
      case 'number':
        console.log('to number')
        break
      default:
        console.log('default')
    }
  }
}
```

**15. 常用的正则表达式**

```javascript
// 十六进制颜色
const color = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/g

// 日期，如yyyy-mm-dd
const date = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/

// 手机号码
const mobileNumber = /^1[345678]\d{9}$/g
```

**16. 常用的随机数生成**

```javascript
// [0, 1)
Math.random()

// [n, m)
Math.random()*(m-n) + n

// [n, m]
const func1 = () => {
  let result = Math.random() * (m-n+1) + n
  if (result > m) {
    result = func1()
  }
  return result
}

// (n, m)
const func2 = () => {
  let result = Math.random() * (m-n) + n
  if (result === n) {
    result = func2()
  }
  return result
}

// (n, m]
const func3 = () => {
  let result = Math.random() * (m-n+1) + n
  if (result > m || result === n) {
    result = func3()
  }
  return result
}

// 0 or 1
Math.round(Math.random())

// [0, n) random integer
Math.floor(Math.random * n)
```

**17. eval函数**

eval函数的作用是将字符串解析为javascript代码并运行。

**18. 什么是dom和bom？**

dom是文档对象模型，是将html文档作为一个对象，对象定义了网页的一些方法。核心是document。

bom是浏览器对象模型，是将浏览器作为一个对象，其中有navigator、screen等子对象。核心是window。document也是window的子对象。

**19. 三种事件模型**

DOM0级事件模型，这种事件模型不会进行传播，只在目标对象上出发事件监听函数。

IE事件模型，分为事件处理阶段和冒泡阶段，事件会冒泡直到document，用attachEvent绑定监听函数。

DOM2级事件模型，分为捕获、事件处理以及冒泡阶段，事件从document出发到目标函数再冒泡回到document。用addEventListener，第三个参数默认为false，设置为true会在捕获阶段也出发绑定的监听函数。

**20. 什么是事件委托或事件代理？**

事件委托或事件代理是指将事件的委托函数挂载在父节点上，这样在子节点触发的事件会冒泡到父节点由父节点来统一处理。

**21. ['1', '2', '3'].map(parseInt)的值是多少？**

答案是[1, NaN, NaN]

parseInt是将字符串转换为十进制整数。接收两个参数，value和radix， value是数值，radix是按照几进制进行转换，radix取值在[2, 36]之间。

注意value要和radix对应，比如radix为2（按二进制转换），则value的值要符合2进制数的特点（各个位置上只能为0和1），若不满足会返回NaN。若未给radix赋值或给它赋值为0，则按照字符串的内容进行解析。比如字符串以'0x'开头自动按照十六进制进行解析。

map函数是定义在Array.prototype上的方法，接收两个参数。第一个参数为callback即对数组中每一个元素调用的函数，第二参数为thisArg用于指定callback方法中this的指向，不指定的话为undefined。callback函数会被依次传入三个参数item、index和array。

['1', '2', '3'].map(parseInt)中

对于'1'执行了`parseInt('1', 0, undefined) = 1`

对于'2'执行了`parseInt('2', 1, undefined) = NaN`因为radix为1不在接受范围内

对于'3'执行了`parseInt('3', 2, undefined) = NaN` 因为2进制无法转化数字3

**22. 谈谈闭包和闭包的作用**

我认为闭包是一种结构，它由闭包函数和这个函数的上下文构成。闭包函数一般是在一个函数内部返回另一个匿名函数来形成，这个闭包结构的上下文就是这个闭包函数的作用域以及已经执行完毕函数的作用域。

作用就是虽然形成闭包函数的那个函数已经执行完毕了，但闭包函数仍保留对它作用域的访问权，因此它内部的变量并未被销毁或回收。并且可以被多次调用的闭包函数所共用，形成一个公用的私有变量。

作用我认为强调私有化、共用、选择性暴露。

**23. JavaScript的strict mode**

严格模式是在ES5中定义的一种模式，目的是更严格、严谨、安全和高效地运行JavaScript代码。

可以通过全局脚本运用，在脚本的第一行添加'use strict'（其他行添加无效）。

也可以通过在函数作用域中使用，在函数作用域的第一行添加'use strict'（其他行添加无效）。

由于脚本常常被合并，因此可以在每个脚本中调用立即运行的匿名函数，如下：

```javascript
(function () {
  'use strict'
  // content
})()
```

使用了严格模式：

1）正常模式下，变量未声明赋值，自动变为全局变量（并不推荐）。但是严格模式下会报错。

2）不允许使用with，严格模式下支持静态绑定，因为动态绑定的不确定性。

3）严格模式下eval会产生自己的作用域。

4）禁止this指向全局对象。

5）禁止删除变量，可以删除configurable为true的属性。

6）禁止变量拥有同名属性。

**24. 如何判断对象是否属于某一个类？**

instanceof语句一般是object instanceof constructor

只要constructor的原型在object的原型链上就会返回true。

简单实现instanceof

```javascript
const myInstanceof = (object, construct) => {
  let proto = Object.getPrototypeof(object)
  
  const targetProto = construct.prototype
  
  while(1) {
    if (!proto) {
      return false
    }
    
    if (proto === targetProto) {
      return true
    } else {
      proto = Object.getPrototypeof(proto)
    }
  }
}
```

**25. JSON**

JSON：Javascript object notation，是一种 基于文本的、轻量化的、数据交换格式。

JS语言能很好地支持JSON数据格式，内置的JSON.stringfy实现json对象转化为字符串；

JSON.parse实现JSON字符串到json对象，但json不仅仅能在javascript中使用。

json对象不完全等于js对象，它比js对象更为严格：

1）属性名必须要双引号，而js对象就不一定需要

2）属性值不能是NaN或Infinity或任何函数，而js对象就无此限制

等

**26. 有趣的代码**

```javascript
[].forEach.call($$("*"),function(a){  
  a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16)  
})  
```

**27. JS脚本的延迟加载**

1）js脚本放在html文档的最后引入

2）async和defer，建议使用defer，两者都会异步加载，但async加载完会立马执行，容易阻塞未解析完的html文档，defer会等整个文档都解析完毕后再执行

3）动态加载，监听document的load事件，动态加载脚本

4）setTimeout，但用这个不是很靠谱

**28. 客户端的缓存策略**

浏览器的缓存策略是指在一段时间内在本地保留服务器web资源的一份副本，在资源的有效期内，浏览器再次请求服务器，将会从本地资源返回结果。

浏览器的缓存策略分为2种，强缓存策略和协商缓存策略。

强缓存策略是指，浏览器检查请求头中有效期相关的字段，若未过有效期，则直接从本地返回结果。http1.0定义了Expires字段，它是服务器的绝对时间，当发起请求时，将通过浏览器的时间来检查Expires中的时间是否超过有效期，若未超过直接从本地返回结果。因为浏览器的时间与服务器的时间不一定相同且可以人为更改，因此使用这个字段是有一定风险的。http1.1中定义了Cache-Control字段，这个字段提出了对缓存的一些更精确的控制。其中有一个max-age属性，它是一个相对时间，会根据第一次请求服务器的时间来计算是否过期。若Cache-Control中的max-age和Expires字段同时设置，前者拥有更高的优先级。

协商缓存策略是指，请求无论如何都会发出，服务器检查资源若未发生改变则返回304代码，浏览器直接从本地缓存中返回结果。控制检查的字段为Last-Modified和Etag。每次服务器返回资源时会在请求头中添加Last-Modified来标准最后一次修改资源的时间。当浏览器下一次请求时会带上If-Modified-Since来让服务器检查是否发生修改。Etag起到差不多效果。Etag具有更高的优先级。

在实际使用时，两种策略会合作使用，先进行强缓存策略的检查，若过期，进行协商策略的检查，若未发生修改返回304（直接从本地返回结果），若发生了修改，返回新的资源。

**29. 什么是浏览器的同源策略？**

一个域下的js脚本，未经许可不可以访问另一个域的内容。同源是指协议、域名和端口都相同。

1）js脚本不可以操作其他域下的dom对象

2）js脚本无法访问其他域的cookie、localStorage或sessionStorage

3）无法发送跨域的XMLHttpRequest请求

它只对js脚本做出了限制。img或着script的请求并未做出跨域限制。

**30. Express中的res.send, res.json, res.end的区别？**

概括的说一下，res.send和res.json常用于返回数据的情况。res.send可以返回的数据类型更多，也包括了对象类型，但res.json在返回对象类型时可以提供更多的控制。res.end用于无数据返回的情况，常用来终止请求，若用它来返回数据，性能相当差。

res.send可以返回Buffer、String、Array或Object，并且会自动设置相应的`Content-Type`，除非显示地指定，如`res.set('Content-Type', 'text/html')`。

res.json先调用JSON.stringfy再调用res.send。提供更多控制是指可以指定`res.set('json replacer', replacer)`和`res.set('json space', space)`供函数`JSON.stringfy(obj, replacer, space)`使用。

replacer用于指定哪些属性名进行序列化，一般为数组。只有被指定的属性名，会被JSON化

space用于指定空格数1-10，小于1没有空格。

**31. 跨域限制**

所谓的同域是指两个域的协议、域名和端口号相同。

所谓的跨域限制主要是针对Javascript脚本中的代码的。而像img、a、script、link等标签并不存在跨域限制。

跨域限制主要体现在：

1）不允许操作不同域下的DOM或JS对象

2）不允许使用不同域下的cookies、localStorage、sessionStorage或indexDB

3）不允许向不同域发送AJAX请求

常用的解决方案主要有：

1）JSONP

JSONP主要用于取代向不同域发送AJAX请求并获取数据。利用的是script标签没有跨域限制的特点。

JSONP是非官方的手段，利用给script标签设置src发送一个get请求，后端解析get请求中的callback字段取得函数名，并用函数名包裹要返回的数据以字符串的形式返回。前端加载script结束后会自动运行javascript代码，就会运行包裹了数据的函数。而真正的函数体，前端可以提前定义好。（搞不懂为何很多示例都用res.end来返回数据？）

前端实现：

```javascript
const callbackHandler = (data) => {
  console.log(data)
}

const url = 'http://differentDomain.com/jsonp?callback=callbackHandler'

const script = document.createElement('script')

script.src = url

document.head.appendChild(script)
```

后端实现：

```javascript
const querystring = require('querystring')

router.get('/jsonp', (req, res) => {
  const params = querystring.parse(req.url.split('?')[1])
  
  let callbackFunc = params.callback
  
  const data = {
    code: 0,
    data: {
      firstName: 'Dolly',
      lastName: 'Zhang'
    }
  }
  
  callbackFunc = `${callbackFunc}(${JSON.stringfy(data)})`
  
  res.send(callbackFunc)
})
```

2）document.domain + iframe标签实现父、子域跨域

操作是在父域的html文档中插入iframe标签，iframe标签的src值为子域。这样当父、子域均设置了相同的document.domain之后，子域可以操作父域中的JS和DOM对象。

父域：http://dolly.com

```html
<iframe src="http://www.dolly.com"></iframe>
<script>
  document.domain = 'dolly.com'
  
  const name = 'dolly'
</script>	
```

子域：http://www.dolly.com

```html
<script>
  document.domain = 'dolly.com'
  console.log(name) // 'dolly'
</script>	
```

3）location.hash + iframe实现不同域跨域

如果不是父子域之间，相互想传递数据，或者使用对方的JS对象，也可以通过location.hash和iframe标签来实现。

假如有a.html和b.html，a.html属于域domain1.com；b.html属于域domain2.com。以下实现a到b的数据传递。

a.html

```html
<iframe src="http://domain2.com/b.html" id="iframe"></iframe>
<script>
  const name = 'dolly'
  
  setTimeout(() => {
    $$('#iframe').src += `#name=${name}`
  }, 1000)
</script>
```

b.html

```html
<script>
  window.onhashchange = () => {
    console.log(location.hash)
  }
</script>
```

4）window.name + iframe实现不同域的跨域

window.name属性有一个特点，即当src发生改变后，哪怕是不同域的改变，其name值仍维持不变。但是从iframe中读取这个name值，存在同域限制，所以要进行一层简单的代理。

a.html中的script，其地址为http://domain1.com/a.html

```javascript
const request = (() => {
  const proxy = 'http://domain1.com/proxy.html'
  
  const createIframe = (url) => {
  	const iframe = document.createElement('iframe')
  
  	iframe.src = url
  
  	document.body.appendChild(iframe)
    
  	return iframe
  }
  
  const destroyIframe = (iframe) => {
  	iframe.contentWindow.document.write('')
    
  	iframe.contentWindow.close()
    
  	document.body.removeChild(iframe)
  }
  
  return function(url, callback) {
    let state = 0
    
    const iframe = createIframe(url)
    
    iframe.onload = () => {
      if (state === 0) {
        iframe.contentWindow.location = proxy
        state = 1
      }
      
      if (state === 1) {
        callback(iframe.contentWindow.name)
        
        destroyIframe(iframe)
      }
    }
  }
})()

(() => {
  const url = 'http://domain2.com/b.html'
  
  request(url, (name) => {
    console.log(name)
  })
})()
```

proxy.html主要是用于解除跨域限制的，所以其为空就行。

b.html

```javascript
window.name = 'dolly'
```

5）postMessage跨域

首先，postMessage是HTML5中XMLHttpRequest level 2的API。它的参数为（data, origin)。data建议使用用JSON.stringfy后的JSON字符串，origin为调用postMessage方法的源。

postMessage开始看的时候容易产生误解，以为是a.html调用方法，然后在b.html中监听message事件。实际上并不是这样的。a.html中的window上调用这个方法，也只能在a.html中的window上监听到。那这个方法还有啥用呢？事实上我们可以在a.html的js代码里获得b.html的window的引用（通过iframe或新建窗口来实现）。

通过iframe：

a.html(http://doamain1.com)

```html
<iframe src="http://domain2.com/b.html" id="iframe"></iframe>

<script>
  const iframe = $$('#iframe')
  
  const data = JSON.stringfy({
    name: 'Dolly'
  })
  
  const domain = 'http://domain2.com'
  
  iframe.contentWindow.postMessage(data, domain)
  
  window.addEventListener('message', (event) => {
      console.log(JSON.parse(event.data)) // {name: 'Vera'}
  		
    	console.log(event.origin) // 'http://domain2.com'
  })
</script>
```

b.html(http://domain2.com)

```javascript
window.addEventListener('message', (event) => {
  console.log(JSON.parse(event.data)) // {name: 'Dolly'}
  
  console.log(event.origin) // 'http://domain1.com'
  
  const data = JSON.stringfy({
    name: 'Vera'
  })
  
  event.source.postMessage(data, event.origin)
})
```

通过新建窗口，只需要将iframe改成`popup = window.open('http://domain2.com')`

感觉还不如locaiton.hash方便。。。

但安全性肯定是更好的，hash传递的数据会暴露。

6）跨域资源共享CORS

跨域资源共享是W3C的一个标准。

实现CORS主要是在后端实现的，前端只是做配合。

若只是发起跨域资源，前端无需做设置；若发起带cookies的跨域资源，前端需要设置withCredentials字段。

```javascript
const xhr = new XMLHttpRequest()

xhr.withCredentials = true
```

后端需要设置的几个Header的字段

Access-Control-Allow-Origin: 可以为通配符*表示允许所有网站发起跨域访问；也可以为特定的域，只有该设置值与来源的域相同时，返回请求后浏览器才不会报跨域限制的错误。

Access-Control-Allow-Credentials: 设置为true，表示允许请求中带cookies。同时必须1）Access-Control-Allow-Origin不能为通配符必须为指定的域；2）前端配合设置了withCredentials为true。

7）nginx解决跨域限制

img、js或css允许跨域请求资源，但是iconfont字体文件却不允许。可以通过设置nginx的config来解决。

```javascript
location / {
  add_header Access-Control-Allow-Origin *
}
```

**32. Cookies**

cookies是以字符串形式储存在客户端的数据。它是由服务端通过响应头设置的（客户端也可以通过js代码进行设置），由浏览器自动储存在客户端的，并且在每次请求服务器的时候浏览器都会根据一定规则决定是否要将它加入响应头。

cookies是有跨域限制的，打开chrome开发者工具，找到cookies，可以发现cookies是分域名进行记录的。每个域名下都有多条的cookie。为了方便理解，可以把每条cookie理解为一个经过JSON.stringfy的对象。每个对象有可能有以下这些key，value：

value：在cookie中表现为`NAME=Dolly`。

Domain & Path：用于标识哪些url会自动加上此条cookie，domain限制了协议、域名和端口，而path限制了路径。假如我有一条cookie是`NAME=Dolly;domain=dollylosingweight.today;path=/`这意味着向dollylosingweight.today下的子域名以及任何路径发送请求时，这条cookie都会被加上。

Expires：过期时间，是绝对的GMT时间。常见为`NAME=Dolly;expires=Thu, 25 Feb 2020 04:18:00 GMT`。当浏览器时间超过该时间后，这条cookie就会失效（自动被浏览器删除）。因为expires这个过期时间常常是在服务端被设置的，根据的时间是服务端时间，而客户端时间与服务端时间可能存在不同（或者客户端时间被篡改）。因此使用Expires作为过期时间并不是非常合适。max-age是替代方案，它使用的是创建时间+一个时间段。max-age有三种可能取值，负数表示它是一个session即会话cookie，浏览器关闭后就删除；为0表示立马删除，正数就是一般情况。

secure：默认字符串中不带，若设置比如`NAME=Dolly;secure`，则表示只有以https之类的加密协议发送请求时，这条cookie才会被加上。

httpOnly：默认字符串中不带，若设置比如`NAME=Dolly;httpOnly`，则该cookie只能被服务端访问到，通过document.cookie取不到该条，

sameSite：可能值为Strict、Lax或None。三种值的严格性依次递减。默认为Lax。若为Strict，若页面有个导向Github的链接，不会发送带有Github的cookie。Lax稍微宽松，大多数情况也不发送第三方cookie到导航到该网站的get请求除外。若为None，则是同域或跨域都会发，要求secure必须设置，该字段才有效。

如何设置cookie？在服务端或客户端皆可：

1）服务端：

用过指定请求头中的Set-Cookie，每个Set-Cookie指定一个cookie。在express中一般使用cookieParser。

2）客户端

document.cookie = 'key=value'这样一条条设置。

比如我设置两条cookie

```javascript
document.cookie = 'name=dolly'
document.cookie = 'hobby=swimming'
```

修改第一条cookie，将它由session修改为一条永久cookie

```javascript
document.cookie = 'name=dolly;max-age=200000'
```

删除第一条cookie

```javascript
document.cookie = 'name=dolly;max-age=0'
```

Cookie的跨域：

我理解的是，如果发送的是XMLHttpRequest，遵循的就是CORS。

如果发送的是Http或Https请求，遵循的是sameSite。

**33. Javascript中的几种模块化规范**

1）CommonJS，用在后端，同步加载模块。require加载模块，module.exports输出模块。

2）ES6， 前后端的通用解决方案。import 加载，export输出。

3）AMD（Asyncnormous Module Defination）由require.js实现。

4）CMD（Common Module Defination）由sea.js实现。

AMD和CMD的主要区别在于AMD集中模块的导入，而CMD在需要时导入。两者都用于前端，实现异步加载。

**34. document.write和innerHTML的区别**

document.write会重写整个页面的内容，重写页面。

而innerHTML可以针对某一个元素，重写某个元素的内容，做到更为精确的控制。

**35. call和apply**

功能是一模一样的，都是借用其他对象的方法。比如A对象上有个方法，B对象跟A对象的结构比较类似，也想调用这个方法，就可以使用call和apply进行借用。两个函数第一个参数都是借用的对象，也将是函数内this指向的对象。区别在于apply以数组形式传入函数的参数，call是一个个传入。

**36. javascript中的类数组**

一个对象具有length属性，并且具有多个索引属性，这个对象称为类数组。将类数组转换为数组的方法有：

```javascript
const array1 = Array.prototype.slice.call(object)

const array2 = Array.prototype.splice.call(object, 0)

const array3 = Array.prototype.concat.call(object, [])

const array4 = Array.from(object)
```

**37. Array的fill方法**

```javascript
let array = [1,2,3,4]

array.fill(0) // [0,0,0,0]

array.fill(1,2,3) // [0,0,1,0]

array.fill(2,2) // [0,0,2,2]
```

**38. V8引擎的GC**

GC（Garbage Collection）基于分代回收理论，而分代回收理论又是基于世代理论。世代理论的观点是：新生的对象总是趋于“早死”，而那些“未死”的对象往往能“活得”更久。基于这个理论，v8引擎将内存分为新生代（new space）以及旧生代（old space）。旧生代的空间大于新生代的空间。

1）新生代分为两个semispace，From和to空间。一般是From空间负责储存而to空间闲置。每当From空间满了之后会执行一次Scavenge算法。该算法检查空间中存活的对象（如何检查？标记清除吗？），若对象不再存活则之间释放空间，若对象存活，判断该对象是否已经进行过一次Scavenge算法，若进行过将其移入old space（世代理论），若未进行过尝试将其移入to semispace，若to的占有率已达25%，还是需要移入old space。

2）老生代执行的检查就是我们熟悉的引用计数、标记清除或标记整理。引用计数是监听每个变量的引用数，若引用数为0则进行清除，bug是循环引用会引起内存泄露，已被现代浏览器所遗弃。标记清除是每隔一段时间从window对象开始遍历一次下方的所有属性和方法，并把遍历到的进行标记。对那些未被标记的变量进行清除。这个算法的问题在于释放的那些空间并不联系，不利于之后需要大容量的储存。因此标记整理出现了，在原有基础上对释放空间进行整理合并。但这也会增加时间开支，造成更长的停顿。

**39. 如何不刷新页面实现前进、后退？**

AJAX技术有一个问题，就是它跟前进后退无法很好的兼容。比如网站的1-10页换页是用AJAX实现的，每次点击页码会发送一次请求，更改数据从而响应式地渲染页面。但当我们点击后退时，页面并不会回退到开始的内容，因为AJAX并未改变页面的url也并没有在history上留下任何记录。解决的方案有两种，一是利用location.hash，二是利用pushState这个API。

1）利用location.hash

假设我们使用的是vue框架，页面的内容都是根据pageData渲染的，而pageData是通过ajax获取的：

```javascript
import requestPageData from './requestPageData'

export default {
  data() {
    return {
      pageData: {}
    }
  },
  
  getPageData(page) {
    requestPageData(page).then(data => {
      this.pageData = data
    })
  },
  
  created() {
    this.getPageData(1)
  }
}
```

现在我们要在getPageData中加入location.hash的逻辑：

```javascript
getPageData(page) {
  requestPageData(page).then(data => {
      this.pageData = data
  })
  
  this.location.hash = `#page${page}`
}
```

但用这种方法我想了一下，好像没法让页面内容也恢复，除非重新发起请求，或开始就缓存了数据。

2）history.pushState就比较好了，因为它能够修改url、添加历史记录、还能缓存数据并且监听前进、后退、history.go等事件。它支持三个参数，第一个是state，这个参数是做缓存用的。第二个参数是title，听说没有被全部浏览器支持，所以设为空字符串。第三个参数是url，即页面将要改变的url（不进行跳转，要求必须要同源）。

```javascript
getPageData(page) {
  const state = { pageData: this.pageData }
  
  requestPageData(page).then(data => {
      this.pageData = data
  })
  
  history.pushState(state, '', '/test')
}

restoreState(event) {
  this.pageData = event.state.pageData
} 

mounted() {
  window.addEventListener('popstate', restoreState, false)
}
```

相应的history.replaceState则不是添加一条历史记录而是对当前的历史记录做替换，参数相同。

**39. 如何判断当前环境是在浏览器还是node？**

this === window ? 'browswer' : 'window'

**40. 如何理解script标签出现在body闭合标签之后**

这样是不符合规范的，之所以能够解析是因为将会忽略body闭合标签。

**41. 移动端的300ms延迟**

存在的原因是双击缩放，浏览器需要等待300ms观察用户是点击还是缩放。

解决方案：

1）fastclick

2）meta标签禁用缩放

3）设置viewport为ideal viewport（即为device-width，这样浏览器看到这个meta，会认为网站针对移动端做了页面优化也就会禁用双击缩放行为，因为双击缩放本就是方便一些没有多移动端做优化的网站设计的）

4）touch-action：none

**42. 前端路由**

路由就是指的url与页面之间的映射关系。过去路由都是借助后端实现的，每改变一次url都向后端发送一次请求，请求不同的页面。前端路由是指改变url不请求后端，仅改变路径并用ajax技术更新数据实现。vue-router实现的两种方式也就是前端路由的两种实现方式。vue-router默认是用hash来实现的，history mode用了新的api，pushState和onpopstate事件。

hash路由：

```html
<div class="container">
  <div class="tab">
    <a class="tab-item" href="#/">Home</a>
    <a class="tab-item" href="#/User">User</a>
  </div>
  <div class="content"></div>
</div>

<script>
  (() => {
    const Router = {
      this.routes = {}
    	this.currentUrl = ''
    }
   	
   	Router.prototype.route = (url, callback) => {
    	this.routes[url] = callback
  	}
  
  	Router.prototype.refresh = () => {
      const url = this.currentUrl = location.hash.slice(1) || '/'
      this.routes[url]()
    }
    
    Router.prototype.init = () => {
      window.addEventListener('load', this.refresh, false)
      window.addEventListener('hashchange', this.refresh, false)
    }
    
    const router = new Router()
    router.init()
  
  	router.route('/', () => {
      console.log('home page')
    })
  
  	router.route('/User', () => {
      console.log('user page')
    })
  }) ()
</script>
```

history路由，由pushState来实现，并监听popstate事件。详见38。

**43. polyfill和polyfiller**

指的都是某个库实现了浏览器原生的api。比如querySelector这个API，很多老旧浏览器是不支持的，那一些人重新实现这个API使得该库也能在老旧的浏览器上使用，这就是polyfill或polyfiller。

**44. 函数节流和函数防抖**

函数防抖（debounce）是指：回调函数延n秒进行，若在n秒内再次触发则刷新n秒。

函数节流（throttle）是指：回调函数延迟n秒进行，若在n秒内多次触发，被视为无效。

```javascript
const callback = () => {
  console.log('I am callback')
}

const throttling = (callback, interval) => {
  let timer = null
  
  interval = interval || 200
  
  return () => {
    if (timer) return 
    
    timer = setTimeout(() => {
      callback()
      timer = null
    }, interval)
  }
}

const debouncing = (callback, interval) => {
  let timer = null
  
  interval = interval || 200

  return () => {
    if (timer) {
      clearTimeout(timer)
    }
    
    timer = setTimeout(() => {
      callback()
      timer = null
    }, interval)
  }
}

const throttledCallback = throttling(callback)
const debouncedCallback = debouncing(callback)
```

**45. Object.is和===**

Object.is在三等号的基础上处理了一些异常情况，如-0和+0会判为false，NaN和NaN会判为true。注意历史遗留问题NaN === NaN会判为false。

**46. escape & encodeURI & encodeURIComponent的区别**

escape用于编码字符串，跟url的编码没有半毛钱关系。

encodeURI的编码范围较encodeURIComponent较小，比如'/'就不会被编码。常用来编码整段完整的url。

encodeURIComponent的编码范围较encodeURI较大，常用来编码拼接的字符串。

**47. ASCII、unicode和utf-8**

任何信息在计算机中最后都会转为0或1的二进制编码。

ASCII编码是最初出现的编码方式，它只用一个字节（一个字节最多能组合出256种不同的编码方式）来表示编码与字符的对应关系，最初英语只用了前128（0～127）种，只占用了一个字节的后面7位，而最高位（第八位至为0），而其他语言则使用了后（128～256）的组合来进行编码，且不同语言实现的不同。

Unicode则规定了100多万种符号的编码形式，它使用的编码字节数不再拘泥于一个字节。但这出现了一个问题，就是比如有三个字节长的编码，在解析的时候是单个字节解析成3个符号，还是三个字节一起解析成一个符号呢？utf-8就是unicode实现的一种方式。以下是unicode和utf-8的对应关系。

```
Unicode符号范围     |        UTF-8编码方式
(十六进制)        |              （二进制）
----------------------+---------------------------------------------
0000 0000-0000 007F | 0xxxxxxx
0000 0080-0000 07FF | 110xxxxx 10xxxxxx
0000 0800-0000 FFFF | 1110xxxx 10xxxxxx 10xxxxxx
0001 0000-0010 FFFF | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
```

**48. Event Loop**

JS引擎是单线程，意味着只有一个主线程按顺序一个一个任务执行。

除了JS引擎，还有事件触发线程，很多异步任务需要它配合完成。

在JS引擎中，堆是内存被分配的地方，栈是一个执行栈，每个函数被执行时，这个函数的上下文会被推入这个执行栈，当该函数执行完后，会推出执行栈。若该函数在执行过程中，遇到内部函数，则会再推入一个执行栈，等内部函数执行完（将内部函数的上下文推出后）继续执行外部函数。当遇到异步函数时，会交给事件触发线程去执行，js引擎继续执行执行栈中的同步代码不受阻塞。

当事件触发线程那边完成后，会将回调函数推入任务队列。微任务（如promise）推入微任务队列，宏任务（如setTimeout）推入宏任务队列。当执行栈为空的时候，主线程会先从微任务队列中依次拿出每个回调函数执行。当微任务队列为空后再去宏任务队列中取。完成一个Event Loop。

**49. 深浅拷贝**

浅拷贝是指对于那些属性值为对象的，拷贝后共用一份引用。

而深拷贝对于那些属性值为对象的，拷贝后生成一份全新的对象。

深拷贝的思想是，若属性值为对象，递归调用深拷贝函数，直到遇上基础类型，进行值的拷贝。

```javascript
const shallowCopy = (object) => {
  if (typeof object !== 'object') return 
  
  const copy = Object.prototype.toString(object) === '[object Object]' ? {} : []
  
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      copy[key] = object[key]
    }
  }
  
  return copy
}

const deepCopy = (object) => {
  if (typeof object !== 'object') return 
  
  const copy = Object.prototype.toString(object) === '[object Object]' ? {} : []
  
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      copy[key] = typeof object[key] === 'object' ? deepcopy(object[key]) : object[key]
    }
  }
  
  return copy
}
```

**50. 手写bind、apply和call**

```javascript
Function.prototype.myApply = () => {
  const context = ...args
}
```



