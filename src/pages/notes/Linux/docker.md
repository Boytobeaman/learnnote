---
templateKey: notes-post
title: Docker
date: 2016-12-17T15:04:10.000Z
description: Docker.
tags:
---

### 基本概念
* 镜像（Image）
* 容器（Container）
* 仓库（Repository）

```
镜像（ Image ）和容器（ Container ）的关系，就像是面向对象程序设计中的
类 和 实例 一样，镜像是静态的定义，容器是镜像运行时的实体。容器可以被
创建、启动、停止、删除、暂停等。

按照 Docker 最佳实践的要求，容器不应该向其存储层内写入任何数据，容器存储
层要保持无状态化。所有的文件写入操作，都应该使用 数据卷（Volume）、或者
绑定宿主目录，在这些位置的读写会跳过容器存储层，直接对宿主（或网络存储）
发生读写，其性能和稳定性更高。

数据卷的生存周期独立于容器，容器消亡，数据卷不会消亡。因此，使用数据卷
后，容器删除或者重新运行之后，数据却不会丢失。
```

#### Docker Registry
```
Docker Registry 就是 集中的存储、分发镜像的服务

一个 Docker Registry 中可以包含多个仓库（ Repository ）；每个仓库可以包含多个标签（ Tag ）；每个标签对应一个镜像。

我们可以通过 <仓库名>:<标签> 的格式来指定具体是这个软件哪个版
本的镜像。如果不给出标签，将以 latest 作为默认标签。

最常使用的 Registry 公开服务是官方的 Docker Hub，这也是默认的 Registry，并
拥有大量的高质量的官方镜像。
```



### 安装 Docker
Docker 分为 CE 和 EE 两大版本。CE 即社区版（免费，支持周期 7 个月），EE
即企业版，强调安全，付费使用，支持周期 24 个月。

Docker CE 分为 stable, test, 和 nightly 三个更新频道。每六个月发布一个 stable
版本 (18.09, 19.03, 19.09...)。

官网安装指南： https://docs.docker.com/install/


### 运行

```
docker run -it --rm \
ubuntu:16.04 \
bash
```
我们可以通过 exit 退出了这个容器


### 获取镜像
```
docker pull [选项] [Docker Registry 地址[:端口号]/]仓库名[:标签]

docker pull ubuntu:16.04

上面的命令中没有给出 Docker 镜像仓库地址，因此将会从 Docker Hub 获取镜
像。而镜像名称是 ubuntu:16.04 ，因此将会获取官方镜像 library/ubuntu
仓库中标签为 16.04 的镜像。
```

### 查看镜像、容器、数据卷所占用的空间
```
docker system df
```

常用命令



查看docker 版本
```
docker version
```

获取image
```
docker pull
```

创建image
```
docker build

docker build [选项] <上下文路径/URL/->


```

列出image
```
docker images
```

运行 container
```
docker run
```

列出container
```
docker ps
```

删除container
```
docker rm
```

删除image
```
docker rmi
```

在host 和container之间拷贝文件
```
docker cp
```

保存改动为新的image
```
docker commit
```

Dockerfile

Command | Meaning
------------ | -------------
FROM | base image
RUN | 执行命令
ADD | 添加文件
COPY | 拷贝文件
CMD | 执行命令
EXPOSE | 暴露端口
WORKDIR | 指定路径
MAINTAINER | 维护者
ENV | 设置环境变量
ENTRYPOINT | 容器入口
USER | 指定用户
VOLUME | mount point