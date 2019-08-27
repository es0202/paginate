function Paging(ops) {
    this.ops = {
        container: ".dataTables_paginate",
        sumPage: 20,
        index: 10
    }

    this.ops = $.extend(this.ops, ops);
    this.box = $(this.ops.container);
    this.onPage = function () {}
    this.addEvn();
}

Paging.prototype.init = function () {
    this.box.html("");
    var index = this.ops.index;

    var arr = [{
        title: index,
        index: index,
        cls: "current"
    }];

    var index1 = index;
    var len = index - 3;
    while (--index1 > len) {
        if (index1 > 0) {
            arr.unshift({
                title: index1,
                index: index1
            });
        }
    }
    if (index1 >= 2) {
        arr.unshift({
            title: "…",
            index: ""
        });
    }
    if (index1 >= 1) {
        arr.unshift({
            title: 1,
            index: 1
        });
    }
    arr.unshift({
        title: "上一页",
        index: (index - 1) > 0 ? (index - 1) : 1
    });
    //首页
    arr.unshift({
        title: "首页",
        index: 1
    })
    //index后页数
    var sumPage = this.ops.sumPage;
    var index2 = index;
    len = index + 3;
    if (index2 > sumPage) {
        index2 = sumPage;
    }
    while (++index2 < len) {
        if (index2 <= sumPage) {
            arr.push({
                title: index2,
                index: index2
            });
        }
    }
    if (index2 <= sumPage - 1) {
        arr.push({
            title: "…",
            index: ""
        });
    }

    if (index2 <= sumPage) {
        arr.push({
            title: sumPage,
            index: sumPage
        });
    }
    arr.push({
        title: "下一页",
        index: (index + 1) > sumPage ? sumPage : (index + 1)
    });

    this.btns = arr;
}

Paging.prototype.setOps = function (ops) {
    this.ops = $.extend(this.ops, ops);
    //总页数1页也显示
    //if (this.ops.sumPage > 1) {
    this.init();
    this.create();
    //}
}

Paging.prototype.addEvn = function () {
    var that = this;
    this.box.off();
    this.box.on("click", ".paginate_button", function () {
        var index = $(this).attr("data-index");
        if (index) {
            that.onPage(index / 1);
        }

        return false
    });

    //增加go点击事件
    this.box.on("click", ".paginate_go", function () {
        var index = that.box.find(".paginate_input").val();
        if (index) {
            that.onPage(index / 1);
        }

    });

}

Paging.prototype.create = function () {
    var box = this.box;
    box.html("");

    var arr = this.btns;

    // console.log(arr);

    var paginate_page;
    for (var i = 0, len = arr.length; i < len; i++) {
        var item = arr[i];
        if (i == 0) {
            var home = $('<a class="home paginate_button">首页</a>');
            home.attr('data-index', item.index);
            box.append(home);
        } else if (i == 1) {

            var previous = $('<a class="previous paginate_button">上一页</a>')
            previous.attr("data-index", item.index);
            if (this.ops.index == 1) {
                previous.addClass("disabled")
            }
            box.append(previous);
        } else if (i == len - 1) {
            var next = $('<a class="next paginate_button">下一页</a>');
            next.attr("data-index", item.index);

            // if (item.index === this.ops.sumPage) {
            //     next.addClass("disabled")
            // }
            if (this.ops.index === this.ops.sumPage) {
                next.addClass("disabled")
            }

            box.append(next);
        } else {
            if (!paginate_page) {
                paginate_page = $("<span></span>").addClass("paginate_page");
                box.append(paginate_page);
            }
            var pbtn = $('<a class="paginate_button"></a>');
            pbtn.text(item.title);
            pbtn.attr("data-index", item.index);
            if (item.cls) {
                pbtn.addClass(item.cls);
            }

            //增加 判断若为... 设为不可点击
            if (item.title == "…") {
                pbtn.addClass("disabled")
            }

            paginate_page.append(pbtn);
        }
    }

    var html = $('<span class="paginate_of">  跳转至</span><input class="paginate_input" type="text"><a class="paginate_go">页 GO</a>');
    box.append(html);
    box.find("input").val(this.ops.index);

}