# **cjmm.github.io**

_cjmm.github.io_ 是[我的](http://github.io/superwoods)个人网站。同时这个项目也是一个十分方便的开源个人网站和简历模版。

欢迎您 _**Frok**_ 到自己的仓库使用。Have fun～ 😄

> 最后要特别感谢我的好朋友邓永亮，他给了我很多帮助。

## How to use?

1. 本地开发依赖`nodejs`环境。打开终端运行：

  ```
  $ node -v
  ```

  查看`nodejs`版本，`nodejs`需要版本`^4.4.x`.

2. 克隆仓库到本地，终端进入对应的文件目录，运行：

  ```
  $ npm install
  ```

  安装全部`package.json`中的npm依赖。

3. 启动本地web server：

  ```
  $ make all
  ```

  这是一个`makefile`命令的集合，它包含3个子命令：

  - 使用`postcss`和`autoprefixer`转译、合并css文件：

    ```
    $ make css
    ```

  - 使用`babel`转译js文件：

    ```
    $ make js
    ```

  - 使用`browser-sync` web server：

    ```
    $ make server
    ```

  一般情况下你不需要单独使用他们。

  请注意，运行`make all`，你的html、js和css的编辑、修改会被`browser-sync`实时监听，将生成编译合并后的（添加.min后缀的）css和js文件到 _**bundle**_ 文件夹中。

  配置你的`makefile`启动命令，可以通过修改根目录下的 _**makefile**_ 文件，请使用文本编辑器atom或vim编辑他。

  `browser-sync`监听状态下可以使用 _**command+c**_ 终止进程。

4. 打开一个新的终端进程，运行：

  ```
  $ grunt
  ```

  使用`grunt`插件`uglify`、`cssmin`压缩 _**bundle**_ 文件夹中的js和css文件。

现在你可以直接将项目部署到在线的web server发布了！

## Folder description

```
 /
 |____ gallery < 作品展示用的图片资源
 |____ img     < 一般图片资源
 |____ bundle  < 实时编译生成的js、css文件（添加.min后缀）
 |____ css     < 开发环境的css文件
 |____ js      < 开发环境的js文件和js库文件
 |
 |____ index.html
```

## License

我们遵守 _MIT_ 开源协议，保留我的署名您可以尽情享用这个项目。

## Times

- 2016-07-27-16.21 更新v2.1.2
- 2015-12-16 立项、整理并配置grunt
