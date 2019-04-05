

### 查看系统版本

```
lsb_release -a
```




## 服务管理

#### 服务与端口
```
/etc/services
//这个文件记录了端口与服务的映射关系
```
### netstat -tlunp
查看所有的服务

* -t 列出tcp 数据
* -u 列出udp 数据
* -l 列出正在监听的网络服务（不包含已经连接的网络服务）
* -n 用端口号来显示服务，而不是用服务名
* -p 列出该服务的进程ID(PID)

查看80端口的使用的情况
```
lsof -i tcp:80
```

### netstat -an
查看已经连接的服务

### Linux 服务
![Linux 服务](https://raw.githubusercontent.com/Boytobeaman/learnDocs/master/documents/images/linuxServiceType.PNG "optional title")
RPM包安装服务的默认位置
文件位置 | 服务
------------ | -------------
/etc/init.d/ | 启动脚本位置
/etc/sysconfig/|初始化环境配置文件位置
/etc/|配置文件位置
/etc/xinetd.conf|xinetd配置文件
/etc/xinetd.d/|基于xinetd服务的
/var/lib/|服务产生的数据
/var/log/|日志

![Linux 服务](https://raw.githubusercontent.com/Boytobeaman/learnDocs/master/documents/images/linuxServiceManage.PNG "optional title")
#### 独立服务的启动 （RPM包）
```
/etc/init.d/独立服务名
start| stop|status|restart

service 独立服务名
start| stop|status|restart

独立服务的自启动 设置
chkconfig --level 2345 httpd on
将 httpd(apache)服务 在2345运行级别时，设为自启动

或者修改文件 /etc/rc.local 文件，加上想启动的服务，如
/etc/init.d/httpd start
这样httpd 服务开机时就会自启动

```
#### 基于xinetd服务 （RPM包）
```
yum -y install xinetd
//先安装xinetd 服务

修改某个服务如rsync的启动
vi /etc/xinetd.d/rsync
把里面设置为 disable = no 就启动
      设置为 disable = yes 就不启动

然后重启 xinted 服务
service xinted restart

xinetd 服务启动和自启动是一体的，也就是说你把它启动了，他同时也会变成自启动
你把他设为自启动，他同时也启动了

xinetd 服务已越来越少了
```
### 源码包安装服务的启动
使用绝对路径，调用启动脚本来启动，如：
```
/usr/local/apache2/bin/apachectl start|stop
```
### 源码包安装服务的自启动
一般装在 /usr/local/下
```
修改 /etc/rc.d/rc.local （软连接同/etc/rc.local）
如 vi /etc/rc.d/rc.local
然后加入某个服务的启动脚本如：
/usr/local/apache2/bin/apachectl start
```
#### 让源码包服务被服务管理命令识别
方法建立软连接，如让源码包的apache服务能被service命令管理启动
```
ln -s /usr/local/apache2/bin/apachectl /etc/init.d/apache
```

```
chkconfig --list
//查看所有服务在不同运行级别下的自启动状态

chkconfig --list | grep httpd
只查看httpd 的自启动状态

chkconfig --level 2345 httpd off
将httpd的2345 级别的自启动关闭

grep rsync /etc/services
在services 里查看rsync
```
缩写 | 含义
------------ | -------------
usr | Unix System Resource（Unix 系统资源）
Content column 1 | Content column 2
Content column 1 | Content column 2
Content column 1 | Content column 2

### 查看磁盘还剩多少空间
```
df -h 
```


### 常用查看系统、资源、服务、用户等命令

#### 进程
```
ps -ef   # 查看所有进程 
top    # 实时显示进程状态
```

```
1.CPU占用最多的前10个进程
ps auxw|head -1;ps auxw|sort -rn -k3|head -10

2.内存消耗最多的前10个进程 
ps auxw|head -1;ps auxw|sort -rn -k4|head -10 

3.虚拟内存使用最多的前10个进程 
ps auxw|head -1;ps auxw|sort -rn -k5|head -10
```

#### free命令是一个快速查看内存使用情况的方法
```
free -h
```


### rpm(Redhat Linux Packet Manager)
rpm包的安装：
1.安装一个包
```
rpm -ivh rpm包名
如：
rpm -ivh apache-1.3.6.i386.rpm 
```
2.升级一个包，没安装过的不能使用升级命令
```
rpm -Uvh
```
3.移走一个包
```
rpm -e
```

### 运行级别
运行级别 | 含义
------------ | -------------
0 | 关机
1 | 单用户模式，可以想象为windows的安全模式，主要用于系统修复
2 | 不完全的命令行模式，不含NFS服务
3 | 完全的命令行模式，就是标准的字符界面
4 | 系统保留
5 | 图形模式
6 | 重启动

#### 查看运行级别 runlevel
```
runlevel
N 5
//表示现在级别是5，也就是图形模式，N表示进入5级别之前的级别,N表示没有，也就是开机后就到了5级别，图形模式
```


### Linux 文件基本属性
Linux系统是一种典型的多用户系统，不同的用户处于不同的地位，拥有不同的权限。为了保护系统的安全性，Linux系统对不同的用户访问同一文件（包括目录文件）的权限做了不同的规定。

### ls –l
命令来显示一个文件的属性以及文件所属的用户和组
```
[root@www /]# ls -l
total 64
dr-xr-xr-x   2 root root 4096 Dec 14  2012 bin
dr-xr-xr-x   4 root root 4096 Apr 19  2012 boot
```

Linux中第一个字符代表这个文件是目录、文件或链接文件等等。

当为[ d ]则是目录;
当为[ - ]则是文件

接下来的字符中，以三个为一组，且均为『rwx』 的三个参数的组合。其中，[ r ]代表可读(read)、[ w ]代表可写(write)、[ x ]代表可执行(execute)。 要注意的是，这三个权限的位置不会改变，如果没有权限，就会出现减号[ - ]而已。
![Linux document property permission](https://raw.githubusercontent.com/Boytobeaman/learnDocs/master/documents/images/linux_directory_property.png "Linux document property permission")

### 更改文件属性
#### chgrp：更改文件属组
```
chgrp [-R] 属组名 文件名

-R：递归更改文件属组，就是在更改某个目录文件的属组时，如果加上-R的参数，那么该目录下的所有文件的属组都会更改。
```

#### chown：更改文件属主，也可以同时更改文件属组
```
chown [–R] 属主名 文件名
chown [-R] 属主名：属组名 文件名
```

#### chmod：更改文件9个属性
```
每种身份(owner/group/others)各自的三个权限(r/w/x)分数是需要累加的，例如当权限为： [-rwxrwx---] 分数则是：

owner = rwx = 4+2+1 = 7
group = rwx = 4+2+1 = 7
others= --- = 0+0+0 = 0
所以等一下我们设定权限的变更时，该文件的权限数字就是770啦！变更权限的指令chmod的语法是这样的

 chmod [-R] xyz 文件或目录

 xyz : 就是刚刚提到的数字类型的权限属性，为 rwx 属性数值的相加。

eg:要将.bashrc这个文件所有的权限都设定启用
chmod 777 .bashrc
```
##### 符号类型改变文件权限
```
还有一个改变权限的方法呦！从之前的介绍中我们可以发现，基本上就九个权限分别是(1)user (2)group (3)others三种身份啦！ 那么我们就可以藉由u, g, o来代表三种身份的权限！

此外， a 则代表 all 亦即全部的身份！那么读写的权限就可以写成r, w, x！也就是可以使用底下的方式来看：

```
![linux_chmod](https://raw.githubusercontent.com/Boytobeaman/learnDocs/master/documents/images/linux_chmod.PNG "linux_chmod")

#### 如果我们需要将文件权限设置为 -rwxr-xr-- ，可以使用 chmod u=rwx,g=rx,o=r 文件名 来设定:
```
#  touch test1    // 创建 test1 文件
# ls -al test1    // 查看 test1 默认权限
-rw-r--r-- 1 root root 0 Nov 15 10:32 test1
# chmod u=rwx,g=rx,o=r  test1    // 修改 test1 权限
# ls -al test1
-rwxr-xr-- 1 root root 0 Nov 15 10:32 test1
```
##### 而如果是要将权限去掉而不改变其他已存在的权限呢？例如要拿掉全部人的可执行权限，则：
```
#  chmod  a-x test1
# ls -al test1
-rw-r--r-- 1 root root 0 Nov 15 10:32 test1

a 表示所有用户，-表示减去什么权限，x表示执行权限
```


### lets encript 

#### nginx
```
 location ~ /.well-known {
      allow all;
}

# Pass requests for / to localhost:5000:
location / {
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-NginX-Proxy true;
      proxy_pass http://localhost:5000/;
      proxy_ssl_session_reuse off;
      proxy_set_header Host $http_host;
      proxy_cache_bypass $http_upgrade;
      proxy_redirect off;
}
```
#### apache
```
//在相应站点的配置文件里，如 autopostapi.ahotech.xyz.conf
的80 和 443 配置里面都加上
<Directory /.well-known/acme-challenge/ >
     Order Deny,Allow
     Allow from All
</Directory>

//配置(node.js)代理
<Location />
  ProxyPass http://127.0.0.1:1340/
  ProxyPassReverse http://127.0.0.1:1340/
</Location>
```