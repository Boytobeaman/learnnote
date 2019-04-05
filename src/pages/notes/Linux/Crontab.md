---
templateKey: notes-post
title: Crontab
date: 2016-12-17T15:04:10.000Z
description: Crontab in linux.
tags:
---


### crontab 是一个用于设置周期性执行任务的工具


centos 下
```
yum clean all
//清理yum缓存，保证yum安装最新的安装包

yum updata 
//更新系统下所有的安装包到最新版本


yum install -y cronie crontabs
//安装cronie 和crontabs 一般centos已经默认安装了

```

### 验证crond服务和crontab工具
#### 检查crond服务是否安装及启动
```
yum list cronie && systemctl status crond
```

#### 检查crontab 工具是否安装
```
yum list crontabs && which crontab && crontab -l

yum list crontabs:检查crontabs是否已经安装到yum 的安装包列表中
which crontab:检查到crontab 安装到系统的哪个目录当中
crontab -l:返回当前crontab的任务列表
```
crontab 格式
```
* * * * * my command

//五个星分别代表  分 时 日 月 周
取值
分 0-59
时 0-23
日 1-31
月 1-12
周 0-6   0是星期天

* 表示所在区间所涵盖的所有数字
/ 表示每 如第一个占位符下 */20 表示每20 分钟
- 表示范围 如第一个占位符下 5-10 表示第5到第10分钟
, 表示和   如第一个占位符下 5,10 表示第5和第10分钟


时间和my command 之间必须要有空格隔开
```

#### 进入crontab 编辑
```
crontab -e
```
#### 重启crond
```
systemctl restart crond
```
#### 查看crond状态
```
systemctl status crond
```

#### crontab 配置文件
系统配置文件
```
/etc/crontab
```
系统用户crontab 配置文件保存目录(crontab -e)
```
/var/spool/cron/

如果是root用户状态下编辑的
/var/spool/cron/root

如果是其他用户如user01 状态下编辑的
/var/spool/cron/user01
```