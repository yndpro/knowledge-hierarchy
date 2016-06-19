
## 创建版本库

创建一个空目录,pwd显示当前目录

```
$ mkdir learngit               
$ cd learngit
$ pwd
```

把这个目录变成Git可以管理的仓库,当前目录下多了一个.git的目录；因为这个目录默认是隐藏的,用ls -ah命令就可以看见

```
$ git init
```

编写一个readme.txt文件,命令行git add把文件添加到仓库

```
$ git add readme.txt
```
删除一个文件，命令行git rm把文件添加到仓库

```
$ git rm readme.txt
rm 'readme.txt'
```

命令行git commit把文件提交到仓库,-m后面输入的是本次提交的说明

```
$ git commit -m "wrote a readme file"
```

为什么Git添加文件需要add，commit一共两步呢？因为commit可以一次提交很多文件，所以你可以多次add不同的文件


```
$ git add file1.txt
$ git add file2.txt file3.txt
$ git commit -m "add 3 files."
```

用git status命令可以让我们时刻掌握仓库当前的状态,
```
$ git status
```
用git diff命令可以查看修改内容,~~工作区和版本库的区别~~

```
$ git diff
```

## 版本回退

回到过去，git log命令显示从最近到最远的提交日志,
```
$ git log
commit 17d27eb21329723542bd5d1c101e1acc67c08237
Author: Adrian <adrianyang.hk@gmail.com>
Date:   Mon Mar 28 10:17:01 2016 +0800

    append GPL

commit a259ef159eaf600ceb304aea671baa907bb40e31
Author: Adrian <adrianyang.hk@gmail.com>
Date:   Mon Mar 28 10:13:01 2016 +0800

    add distributed

commit f951cee7f35ee0650cc4d4b29a2dc9e8431355a8
Author: Adrian <adrianyang.hk@gmail.com>
Date:   Mon Mar 28 09:31:24 2016 +0800

    wrote a readme file

```
如果嫌输出信息太多，可以试试加上--pretty=oneline,一大串类似3628164...882e1e0的是commit id（版本号）


```
$ git log --pretty=oneline
17d27eb21329723542bd5d1c101e1acc67c08237 append GPL
a259ef159eaf600ceb304aea671baa907bb40e31 add distributed
f951cee7f35ee0650cc4d4b29a2dc9e8431355a8 wrote a readme file
```

在Git中，用HEAD表示当前版本，上一个版本就是HEAD^，上上一个版本就是HEAD^^，当然往上100个版本写100个^比较容易数不过来，所以写成HEAD~100。我们要把当前版本“append GPL”回退到上一个版本“add distributed”，就可以使用git reset命令

```
$ git reset --hard HEAD^
HEAD is now at a259ef1 add distributed
```

可以git reset指定版本号，版本号没必要写全，前几位就可以了


```
$ git reset --hard a259ef
```

Git的版本回退速度非常快，因为Git在内部有个指向当前版本的HEAD指针，当你回退版本的时候，Git仅仅是把HEAD从指向append GPL。所以想让HEAD指向哪个版本号，你就把当前版本定位在哪。

![image](http://www.liaoxuefeng.com/files/attachments/001384907584977fc9d4b96c99f4b5f8e448fbd8589d0b2000/0)
![image](http://www.liaoxuefeng.com/files/attachments/001384907594057a873c79f14184b45a1a66b1509f90b7a000/0)


重返未来，用git reflog查看命令历史，以便确定要回到未来的哪个版本

```
$ git reflog
a259ef1 HEAD@{0}: reset: moving to a259ef
17d27eb HEAD@{1}: commit: append GPL
a259ef1 HEAD@{2}: commit: add distributed
f951cee HEAD@{3}: commit (initial): wrote a readme file

```

## 工作区和暂存区
- 工作区（Working Directory）就是我电脑里的目录，比如我的learngit就是个工作区

- 版本库（Repository）是工作区中的那个.git,其中包含stage暂存区,Git自动创建的第一个master分支，指向master分支的HEAD指针

![image](http://www.liaoxuefeng.com/files/attachments/001384907702917346729e9afbf4127b6dfbae9207af016000/0)

git add 把文件添加到暂存区

git commit 把暂存区的所有内容提交到当前分支

即需要提交的文件修改通通放到暂存区，然后，一次性提交暂存区的所有修改



**Git跟踪并管理的是修改，而非文件**：修改同一个文件，git add命令后，在工作区的第一次修改被放入暂存区，提交。第二次修改并没有放入暂存区，所以，git commit只负责把暂存区的修改提交了，第二次修改没被提交。

**reset总是回到commit的点**：修改两次，并且add两次，然后commit,回不到第一次修改的内容


**撤销修改**：恢复到暂存的样子，没有暂存区恢复到和版本库的样子，就是让这个文件回到最近一次git commit或git add时的状态

```
git checkout -- readme.txt
```

## 远程仓库

添加远程仓库，远程仓库的默认名origin，origin就代表着远程仓库

```
$ git remote add origin git@github.com:adrian-yang/learngit
```
推送到远程仓库，加-u不但会推送会把本地分支和仓库的分支关联起来

```
$ git push -u origin master
```
关联后以后就可以用简化命令

```
$ git push origin master
```
克隆远程仓库，git://使用ssh（速度快），也可以使用http等其他协议

```
$ git clone git@github.com:adrian-yang/learngit
```
查看远程仓库的信息

```
$ git remote
origin
```
显示远程仓库的详细信息，没有推送权限就看不到push

```
$ git remote -v
origin  git@github.com:adrian-yang/learngit (fetch)
origin  git@github.com:adrian-yang/learngit (push)
```



## 分支
master分支是一条线，master指向最新提交，再用Head指向master，确定当前分支及当前分支的提交点，每次提交master都会向前移动

![image](http://www.liaoxuefeng.com/files/attachments/0013849087937492135fbf4bbd24dfcbc18349a8a59d36d000/0)

创建dev分支，然后切换到dev分支，-b参数表示创建并切换


```
$ git checkout -b dev
```
相当于
```
$ git branch dev
$ git checkout dev
```

![image](http://www.liaoxuefeng.com/files/attachments/001384908811773187a597e2d844eefb11f5cf5d56135ca000/0)

查看当前分支情况，*表示当前分支

```
$ git branch
* dev
  master
```
切换分支

```
$ git checkout master
```
![image](http://www.liaoxuefeng.com/files/attachments/001384908892295909f96758654469cad60dc50edfa9abd000/0)

合并分支，合并指定分支到当前分支，原理：直接把master指向dev的当前提交

```
$ git merge dev
```
![image](http://www.liaoxuefeng.com/files/attachments/00138490883510324231a837e5d4aee844d3e4692ba50f5000/0)

删除分支，原理：直接把dev指针删了

```
$ git branch -d dev
```
![image](http://www.liaoxuefeng.com/files/attachments/001384908867187c83ca970bf0f46efa19badad99c40235000/0)

如果dev分支还没被合并而想要丢弃分支，需要强行删除

```
$ git branch -D dev 
```

> Git鼓励你使用分支完成某个任务，合并后再删掉分支，这和直接在master分支上工作效果是一样的，但过程更安全

假如有两个分支master和feature1各自都分别有新的提交，git merge后会报错冲突。git status，可以看到是哪个文件冲突，打开文件如下；Git用<<<<<<<，=======，>>>>>>>标记不同分支的内容，

```
Git is a distributed version control system.
Git is free software distributed under the GPL.
Git has a mutable index called stage.
Git tracks changes of files.
<<<<<<< HEAD
Creating a new branch is quick & simple.
=======
Creating a new branch is quick AND simple.
>>>>>>> feature1
```
![image](http://www.liaoxuefeng.com/files/attachments/001384909115478645b93e2b5ae4dc78da049a0d1704a41000/0)

需手动修改后保存，提交

![image](http://www.liaoxuefeng.com/files/attachments/00138490913052149c4b2cd9702422aa387ac024943921b000/0)

查看分支合并情况可以用带参数的git log
```
$ git log --graph --pretty=oneline --abbrev-commit
*   59bc1cb conflict fixed
|\
| * 75a857c AND simple
* | 400b400 & simple
|/
* fec145a branch test
...
```
### 分支管理策略
默认merge是Fast forward模式（即改变指针指向而已）,删掉分支会删掉分支信息；no-ff强制禁用Fast forward模式，git会在merge时生成一个新的commit

```
git merge --no-ff -m "merge with no-ff" dev
```
查看历史可以看到"add ccc"用了no-ff模式,而"add bbb"是ff模式；
```
$ git log --graph --pretty=oneline --abbrev-commit
*   49e169d merge with no-ff
|\
| * 44c735f add cccc
|/
* 9b72969 add bbbb
* 0eff310 add aaaa
*   c6db7a7 conflict fixed
|\
| * adfae9f add and simple
* | c1cc232 add & simple
|/
* c042b26 branch test
* db5d3ed add readme.txt
* 63064cf dele dtext.txt
* 574ff3a dtext.txt
* 63af00d dele
```

![image](http://www.liaoxuefeng.com/files/attachments/001384909222841acf964ec9e6a4629a35a7a30588281bb000/0)


> 在实际开发中，我们应该按照几个基本原则进行分支管理：
> 
> 首先，master分支应该是非常稳定的，也就是仅用来发布新版本，平时不能在上面干活；
> 
> 那在哪干活呢？干活都在dev分支上，也就是说，dev分支是不稳定的，到某个时候，比如1.0版本发布时，再把dev分支合并到master上，在master分支发布1.0版本；
> 
> 你和你的小伙伴们每个人都在dev分支上干活，每个人都有自己的分支，时不时地往dev分支上合并就可以了。
> 
> 所以，团队合作的分支看起来就像这样：
> 
> ![image](http://www.liaoxuefeng.com/files/attachments/001384909239390d355eb07d9d64305b6322aaf4edac1e3000/0)



Git还提供了一个stash功能，可以把当前工作现场“储藏”起来，等以后恢复现场后继续工作。
藏匿工作现场

```
$ git stash
Saved working directory and index state WIP on dev: 6224937 add merge
HEAD is now at 6224937 add merge
```
查看藏匿列表

```
$ git stash list
stash@{0}: WIP on dev: 6224937 add merge
```
还原工作现场，git stash apply还原，git stash drop删除藏匿列表内容

```
$ git stash apply stash@{0}
$ git stash drop stash@{0}
```
等价于

```
$ git stash pop
```



## 图解git

### 获取文件
从仓库中取文件常用checkout，原理：通过移动HEAD指针，并把仓库复制到stage和workplace。纯粹加分支指针常用来切换分支；加~获取分支的其他父节点；加文件名，获取单个文件，HEAD指针不移动。
```
git checkout 指针（分支指针或 head指针）
```
![image](http://jbcdn2.b0.upaiyun.com/2012/06/checkout-branch.svg_.png)

![image](http://jbcdn2.b0.upaiyun.com/2012/06/checkout-detached.svg_.png)

![image](http://jbcdn2.b0.upaiyun.com/2012/06/checkout-files.svg_.png)

### 创建分支
创建分支用branch，原理：新建分支指针，移动HEAD指针。
```
$ git branch new
$ git checkout new
```
相当于

```
$ git checkout -b new
```

![image](http://jbcdn2.b0.upaiyun.com/2012/06/checkout-b-detached.svg_.png)

### 回退版本
原理：移动当前分支指针（注：HEAD指针也跟着移动），并且有选择地将仓库文件复制到stage和workplace。默认是stage更新，workplace不更新。--hard选项，两者都更新，如果用--soft选项，那么都不更新。

```
$ git reset 指针（分支指针或 head指针）
```

![image](http://jbcdn2.b0.upaiyun.com/2012/06/reset-commit.svg_.png)

### 合并分支
如果要合并分支是当前提交的父节点，什么都不做
如果当前提交是要合并分支的父节点，走fast-forward合并（只移动分支指针）。

```
$ git merge master
```
![image](http://jbcdn2.b0.upaiyun.com/2012/06/merge-ff.svg_.png)
否则，进行真正的合并。原理：先保存到workplace，修改后，再进行新的提交。如果有conflict，着先要解决冲突。
```
$ git merge other
```
![image](http://jbcdn2.b0.upaiyun.com/2012/06/merge.svg_.png)


### 衍合
(待续)
http://blog.jobbole.com/22647/