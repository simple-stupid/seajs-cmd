seajs-cmd
=========
[seajs](http://seajs.org/) 是一款很优秀的 Web 前端资源模块加载器，但 CMD 模块的构建则没有那么“简单”。

seajs-cmd 是业内常用 JavaScript 模块的 CMD 版本。

seajs-cmd 帮助使用者降低 seajs 的使用成本，直接使用线上的 CMD 模块，编码时只关心 `seajs.use('jquery/1.11.2/jquery')`。你可以[点击此处](https://github.com/nimojs/seajs-cmd/tree/gh-pages/cmd) 查看 seajs-cmd 上所有的模块。

> 模块的打包通过服务器实现，使用 [nginx-http-concat](https://github.com/alibaba/nginx-http-concat) 和 [seajs-combo](https://github.com/seajs/seajs-combo/issues/3)

示例
----
- [jquery](http://cmd.nimojs.com/examples/jquery.html)
- [加载本地模块（相对于 sea.js 所在目录）](http://cmd.nimojs.com/examples/local-relative.html)
- [加载本地模块（相对于网站根目录）](http://cmd.nimojs.com/examples/local-absolute.html)
- [arale/dialog](http://cmd.nimojs.com/examples/arale-dialog.html)
- [使用 seajs-combo 合并请求](http://cmd.nimojs.com/examples/arale-dialog-combo.html)
- [handlebars](http://cmd.nimojs.com/examples/handlebars.html)
- [query-string](http://cmd.nimojs.com/examples/query-string.html)
- [handlebars-helper-is](http://cmd.nimojs.com/examples/handlebars-helper-is.html)
- [zepto](http://cmd.nimojs.com/examples/zepto.html)


参与维护
-------
若你没有在此项目中找到某个 JavaScript 组件的 CMD 版本，欢迎提交 [issues](https://github.com/nimojs/rain/issues) 告诉我们。

若您熟悉 spm 可自行 [Fork](https://github.com/nimojs/seajs-cmd/fork) 此项目。
使用 spm 构建项目后提交 [Pull Requests](https://github.com/nimojs/rain/pulls) 给我们。

**构建方法：**

```shell
cd seajs-cmd 所在目录
chmod +x ./bin/cmd.sh        # 此命令只需在电脑中运行一次
./bin/cmd.sh jquery 1.11.2
```

License
-------
License (MIT)，欢迎其他团队 [Fork](https://github.com/nimojs/seajs-cmd/fork) 或 [Download ZIP](https://github.com/nimojs/seajs-cmd/archive/gh-pages.zip) 此项目，将 seajs-cmd 部署在自己的前端静态资源服务器供 seajs 使用。
