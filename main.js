// variables
var list = [0];
var tries = 0
var count = 1;
var minwait = 1;
var maxwait = 4;
// getting classes
var averageText = document.getElementsByClassName("average");
var triesText = document.getElementsByClassName("tries");
// Due to the stacking effect of the boxes, z-index can be changed to display which box should be in front.
// When pushing a particular box to the front, other 2 boxes will be pushed back.
function start() {
    var time = Math.floor(Math.random() * (maxwait - minwait) + minwait) * 1000;
    document.getElementsByClassName("container")[1].style.zIndex = 2;
    var timerId = setTimeout(green, time);
    document.getElementsByClassName("container")[1].onmousedown = function () {
        // var test = performance.now();
        early(), clearTimeout(timerId);
    };
}

function early() {
    // var testend = performance.now();
    // console.log(testend - test);
    document.getElementsByClassName("container")[1].style.zIndex = 0;
    document.getElementsByClassName("container")[0].style.zIndex = 2;
    document.getElementsByClassName("mainText")[0].innerHTML = "还没变绿呢弟弟";
    document.getElementsByClassName("smallText")[0].innerHTML = "单击重来.";
    document.getElementsByClassName("container")[0].onmousedown = function () {
        start();
    };
}

function green() {
    var start = performance.now();
    document.getElementsByClassName("container")[1].style.zIndex = 0;
    document.getElementsByClassName("container")[2].style.zIndex = 2;
    document.getElementsByClassName("container")[2].onmousedown = function () {
        var elapsed = Math.round(performance.now() - start);
        result(elapsed), count += 1;
    };
}

function result(e) {
    elapsed = e;
    document.getElementsByClassName("container")[2].style.zIndex = 1;
    list.push(elapsed + list[count - 1]);
    var average = Math.round(list[count] / count) + "ms";
    tries += 1;
    document.getElementsByClassName("mainText")[0].innerHTML = elapsed + "ms";
    if (elapsed <= 100) {
        document.getElementsByClassName("smallText")[0].innerHTML = "🐮🍺！";
    } else {
        document.getElementsByClassName("smallText")[0].innerHTML = "单击继续";
    }
    for (let i = 0; i < averageText.length; i++) {
        averageText[i].innerHTML = average;
        triesText[i].innerHTML = tries;
    }
    document.getElementsByClassName("container")[0].style.zIndex = 2;
}
