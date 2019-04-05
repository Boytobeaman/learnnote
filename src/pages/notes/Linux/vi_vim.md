### vi/vim 的使用
基本上 vi/vim 共分为三种模式，分别是命令模式（Command mode），输入模式（Insert mode）和底线命令模式（Last line mode）。 这三种模式的作用分别是：
![vim work mode](https://raw.githubusercontent.com/Boytobeaman/learnDocs/master/documents/images/vim_work_mode.JPG "vim work mode")

常见命令 | 含义
------------ | -------------
dd | 删除游标所在的那一整行(常用)
ndd | n 为数字。删除光标所在的向下 n 行，例如 20dd 则是删除 20 行 (常用)
d1G | 删除光标所在到第一行的所有数据
dG | 删除光标所在到最后一行的所有数据
yy | 复制游标所在的那一行(常用)
nyy | n 为数字。复制光标所在的向下 n 行，例如 20yy 则是复制 20 行(常用)
gg | 移动到这个档案的第一行，相当于 1G 啊！ (常用)
G | 转到文件结尾
9G  | 转到第9行
:wq  | 储存后离开，若为 :wq! 则为强制储存后离开 (常用)
:q  | 离开 vi (常用)
:q!  | 若曾修改过档案，又不想储存，使用 ! 为强制离开不储存档案。

### 查找
按下”/“键，这时在状态栏（也就是屏幕左下脚）就出现了 “/” 然后输入你要查找的关键字敲回车就可以了。

找到相关文字以后： 
* （1）按下小写n，向下查找 
* （2）按下大写N，向上查找