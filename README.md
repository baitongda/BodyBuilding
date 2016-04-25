# BodyBuiding
基于Express4.x 和 Mongodb 的健身网站<br/>
### 前期准备
安装npm [如何安装](http://jingyan.baidu.com/article/a17d528506d7f58098c8f2b0.html)
安装express<br/>
  我们安装4.0，这里有个需要注意的问题在4.x版本express 已经把命令行工具分离出来<br/>
  [express-generator]（https://github.com/expressjs/generator)
  现在全局安装只需要安装这个命令行工具就可以，指令如下：
  ```
  npm install -g express-generator
  ```
### 创建项目
生成一个express项目:,并安装一些将来要用的模块 <br/>
```
  $ express nodeApp
  $ cd nodeApp && npm install
  $ npm install mongoose underscore moment supervisor bcryptjs --save
```