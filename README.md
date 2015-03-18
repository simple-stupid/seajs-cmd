SPM-CMD
=======

spm-cmd 是 [spmjs.io](http://spmjs.io/) 上常用模块构建后的 CMD 版本。

若你不熟悉 **seajs** ，请[点击此处](http://seajs.org/docs/#docs)。它是一款很优秀的 Web前端资源模块加载器。

若你不熟悉 **spm** ，只熟悉 **seajs** 。则将此项目当做前端常用组件的 CMD 版本集合即可。此项目下所有文件均支持 `seajs.use("文件路径")` 直接加载。 

使用 seajs 加载 CMD 模块实例
-------------------------
- [加载 spm 上的 jquery](http://cmd.nimojs.com/demo/jquery.html)
- [加载自己创建的 log 模块](http://cmd.nimojs.com/demo/log.html)

参与维护
-------
若你没有在此项目中找到 [spmjs.io](http://spmjs.io/) 上某一个模块的 CMD 版本，欢迎提交 [issues](https://github.com/nimojs/rain/issues) 告诉我们。

若您熟悉 spm 可自行 [Fork](https://github.com/nimojs/spm-cmd/fork) 此项目。
使用 spm 构建项目后提交 [Pull Requests](https://github.com/nimojs/rain/pulls) 给我们。

**构建方法：**

1. cd 切换到 spm-cmd 目录下
2. 使用 spm 安装模块
3. 切换模块目录
4. 构建 CMD 模块和模块所有依赖项至 spm 目录

```
$ cd /Users/nimojs/Documents/code/spm-cmd
$ spm install jquery@1.11.2
$ cd spm_modules/jquery/1.11.2/
$ spm build --with-deps -O ../../../spm

finish: build jquery@1.11.2 (1889ms)
```

License
-------
License (MIT)，欢迎其他团队 [Fork](https://github.com/nimojs/spm-cmd/fork) 或 [Download ZIP](https://github.com/nimojs/spm-cmd/archive/master.zip) 此项目，将 spm-cmd 部署在自己的前端静态资源服务器供 seajs 使用。