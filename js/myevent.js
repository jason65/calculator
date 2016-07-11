/**
 * //  window.onload的事件绑定一个普通的函数
 * @return {none]
 */
 window.onload = function(){
            var liObj, ulObj;
            ulObj = document.getElementById("parent-list");
            addEvent(ulObj, 'click', clickObjLi)

        };

/**
 * // 这个是根据吕老师的事件绑定的提示（兼容IE）做的委托到ul上的事件绑定的方法的开始
 * 公有3个参数，第一个是的元素，第二个是事件，第三个是处理的函数--处理的函数里自动有个event参数；
 * @return {none]
 */
        function addEvent(ele, event_name, func){
        	// 如果支持addEventListener，就用这种方法来添加事件的绑定
            if (ele.addEventListener) {
                ele.addEventListener(event_name, clickObjLi, false);
            }
            //ie的事件绑定方法，cilck要换成onclick;
            else if (ele.attachEvent) {
                ele.attachEvent('on' + event_name, clickObjLi);
            } 
            // 这是最原始的事件绑定方法
            else {
                ele['on' + event_name] =clickObjLi;
            }

        }

/**
 * [clickObjLi ul的事件点击处理函数]
 * @param  {[type]} event [点击事件自带的函数]
 * @return {none} 
 */
        function clickObjLi (event){
            var currTarget = event.target||event.srcElement;
            var text=currTarget.innerHTML;
            switch (text)
       		{
        		case 'C' :
        			clearAll()
        			break;
        		case '←' :
        			del();
        			break;
        		case 'Sin' :
        			trigonometric('sin');
        			break;
        		case 'Cos':
        			trigonometric('cos');
        			break;
        		case 'Tan':
        			trigonometric('tan');
        			break;
        		case '.':
        			dot();
        			break;
        		case '1':
        			command(1);
        			break;
        		case '2':
        			command(2);
        			break;
        		case '3':
        			command(3);
        			break;
        		case '4':
        			command(4);
        			break;
        		case '5':
        			command(5);
        			break;
        		case '6':
        			command(6);
        			break;
        		case '7':
        			command(7);
        			break;
        		case '8':
        			command(8);
        			break;
        		case '9':
        			command(9);
        			break;
        		case '0':
        			zero(0);
        			break;
        		case '00':
        			doubleZero('00');
        			break;
        		case '1/X' :
        			reciprocal();
        			break;
        		case 'X²':
        			square();
        			break;
        		case '+':
        			plus();
        			break;
        		case '-':
        			minus();
        			break;
        		case 'X':
        			multiple();
        			break;
        		case '÷':
        			division();
        			break;
        		case 'sqrt':
        			sqrt();
        			break;
        		case '=' :
        			equal();
        			break;
        	}
           
        }


//这个是清除一切的函数的开始
function clearAll() {
    var showCal = document.getElementById('showCal');
    showCal.innerHTML = '';
    var calOutput = document.getElementById('calOutput');
    calOutput.innerHTML = '';
}
//这个是清除一切的函数的结束

// 这个是删除一个字符的函数的开始
function del() {
    var calOutput = document.getElementById('calOutput');
    var calOutputValue = String(calOutput.innerHTML);
    calOutput.innerHTML = calOutputValue.substring(0, calOutputValue.length - 1);
}
// 这个是删除一个字符的函数的结束

//这个是输入点的函数的开始
function dot() {
    var calOutput = document.getElementById('calOutput');
    var calOutputValue = String(calOutput.innerHTML);
    if (calOutputValue.indexOf('.') == -1) {
        calOutput.innerHTML += '.';
    }
}
//这个是输入点的函数的结束

//这个是输入数字的函数的开始
function command(x) {
    var calOutput = document.getElementById('calOutput');
    var calOutputValue = calOutput.innerHTML;
    calOutput.innerHTML += x;
}
// 这个是输入数字的函数的结束

//这个是输入0的函数的开始
function zero(x) {
    var calOutput = document.getElementById('calOutput');
    var calOutputValue = String(calOutput.innerHTML);

    if (calOutputValue == '') {
        calOutput.innerHTML += x;
    } else if (calOutputValue.indexOf('.') == -1) {
        if (Number(calOutputValue) == 0) {
            calOutput.innerHTML = '0';
        } else if (Number(calOutputValue) == -0) {
            calOutput.innerHTML = '-0';
        } else {
            calOutput.innerHTML += x;
        }
    } else {
        calOutput.innerHTML += x;
    }
}
// 这个是输入0的函数的结束


//这个是输入00的函数的开始
function doubleZero(x) {
    var calOutput = document.getElementById('calOutput');
    var calOutputValue = calOutput.innerHTML;
    if (calOutputValue == '') {
        calOutput.innerHTML = '';
    } else if (calOutputValue.indexOf('.') == -1) {
        if (Number(calOutputValue) == 0) {
            calOutput.innerHTML = '0';
        } else if (Number(calOutputValue) == -0) {
            calOutput.innerHTML = '-0';
        } else {
            calOutput.innerHTML += x.toString();
        }
    } else {
        calOutput.innerHTML += x.toString();
    }
}
// 这个是输入00的函数的结束

// 判断在output的div里面的字符串是否是数字；true就是数字，false就不是数字的函数的开始
// 包括-，-1234，-0. ,-0.0.0
function checkNumber() {
    var calOutput = document.getElementById('calOutput');
    var calOutputValue = String(calOutput.innerHTML);

    if (isNaN(parseFloat(calOutputValue))) {
        return false;
    } else {
        return true;
    }
}
// 判断在output的div里面的字符串是否是数字；true就是数字，false就不是数字的函数的结束




// 这里是加号的函数（不考虑3+2+3的操作，只能是3+2；出结果在+3）的开始，
//这里我主要考虑三种情况，第一是输入+；第二是本来是其他操作符，比如x,变成+；第三是已经计算过一次了，想要连续计算
//第一种showCal的div为空，calOutput的div不为空；
//第二种，showCal的div不为空，calOutput的div不为空；
//第三种两个div均不是空；
function plus() {
    var showCal = document.getElementById('showCal');
    var showCalValue = String(showCal.innerHTML);
    var calOutput = document.getElementById('calOutput');
    var calOutputValue = String(calOutput.innerHTML);
    //第一种情况第一次输入运算符
    if (showCalValue == '') {
        if (checkNumber()) {
            calOutput.innerHTML = '';
            var number1 = parseFloat(calOutputValue);
            showCal.innerHTML = number1.toString() + '+';
        }
    }
    //第二种情况，改变运算符
    else if (calOutputValue == '') {
        var newstr = showCalValue.substring(0, showCalValue.length - 1);
        showCal.innerHTML = newstr + '+';
    }
    //第三种：已经出了结果了，在接着运算；
    else {
        showCal.innerHTML = calOutputValue + '+';
        calOutput.innerHTML = '';

    }

}
//这里是加法函数的结束

//这里是乘法函数的开始
function multiple() {
    var showCal = document.getElementById('showCal');
    var showCalValue = String(showCal.innerHTML);
    var calOutput = document.getElementById('calOutput');
    var calOutputValue = String(calOutput.innerHTML);
    //第一种情况第一次输入运算符
    if (showCalValue == '') {
        if (checkNumber()) {
            calOutput.innerHTML = '';
            var number1 = parseFloat(calOutputValue);
            showCal.innerHTML = number1.toString() + 'x';
        }
    }
    //第二种情况，改变运算符
    else if (calOutputValue == '') {
        var newstr = showCalValue.substring(0, showCalValue.length - 1);
        showCal.innerHTML = newstr + 'x';
    }
    //第三种：已经出了结果了，在接着运算；
    else {
        showCal.innerHTML = calOutputValue + 'x';
        calOutput.innerHTML = '';
    }
}
//这里是乘法函数的结束

// 这里是减法函数的开始
function minus() {
    var showCal = document.getElementById('showCal');
    var showCalValue = String(showCal.innerHTML);
    var calOutput = document.getElementById('calOutput');
    var calOutputValue = String(calOutput.innerHTML);
    if (showCalValue == '') {
        if (calOutputValue == '') {
            calOutput.innerHTML = '-';
            // alert('ok');
        } else {
            if (checkNumber()) {
                calOutput.innerHTML = '';
                var number1 = parseFloat(calOutputValue);
                showCal.innerHTML = number1.toString() + '-';
            }
        }

    }
    //第二种情况，改变运算符
    else if (calOutputValue == '') {
        var newstr = showCalValue.substring(0, showCalValue.length - 1);
        showCal.innerHTML = newstr + '-';
    }
    //第三种：已经出了结果了，在接着运算；
    else {
        showCal.innerHTML = calOutputValue + '-';
        calOutput.innerHTML = '';
    }
}
// 这里是减法函数的结束

// 这里是处法函数的开始
function division() {
    var showCal = document.getElementById('showCal');
    var showCalValue = String(showCal.innerHTML);
    var calOutput = document.getElementById('calOutput');
    var calOutputValue = String(calOutput.innerHTML);
    //第一种情况第一次输入运算符
    if (showCalValue == '') {
        if (checkNumber()) {
            calOutput.innerHTML = '';
            var number1 = parseFloat(calOutputValue);
            showCal.innerHTML = number1.toString() + '÷';
        }
    }
    //第二种情况，改变运算符
    else if (calOutputValue == '') {
        var newstr = showCalValue.substring(0, showCalValue.length - 1);
        showCal.innerHTML = newstr + '÷';
    }
    //第三种：已经出了结果了，在接着运算；
    else {
        showCal.innerHTML = calOutputValue + '÷';
        calOutput.innerHTML = '';
    }
}
// 这里是处法函数的结束



// 这个是点击等号的函数的开始
// 
function equal() {
    var showCal = document.getElementById('showCal');
    var showCalValue = String(showCal.innerHTML);
    var calOutput = document.getElementById('calOutput');
    var calOutputValue = String(calOutput.innerHTML);
    if (showCalValue != '' && calOutputValue != '') {
        if (checkNumber()) {
            var number1 = parseFloat(showCalValue.substr(0, showCalValue.length - 1));
            var operator = showCalValue.substr(showCalValue.length - 1, showCalValue.length);
            var number2 = parseFloat(calOutputValue);
            // console.log(operator);
            // console.log(number1);
            // console.log(number2);
            switch (operator) {
                case '+':
                    var ouput = accAdd(number1, number2);
                    showCal.innerHTML = showCalValue + number2.toString();
                    calOutput.innerHTML = ouput.toString();
                    break;
                case '-':
                    var ouput = accSubtr(number1, number2);
                    showCal.innerHTML = showCalValue + number2.toString();
                    calOutput.innerHTML = ouput.toString();
                    break;
                case 'x':
                    var ouput = accMul(number1, number2);
                    showCal.innerHTML = showCalValue + number2.toString();
                    calOutput.innerHTML = ouput.toString();
                    break;
                case '÷':
                    if(number2==0)
                    {
                    	alert('被除数不能为0;');
                    	showCal.innerHTML = '';
    					calOutput.innerHTML = '';
                    }
                    else
                    {
                    	var ouput = accDiv(number1, number2);
                    	showCal.innerHTML = showCalValue + number2.toString();
                    	calOutput.innerHTML = ouput.toString();
                    }
                    break;
            }
        }

    }

}
//这里是点击等号函数的结束
//
//加法的函数
function accAdd(arg1,arg2){
    var t1 = 0, t2 = 0, m;
    try
    {
        t1 = arg1.toString().split(".")[1].length;
    }
    catch(e)
    {t1 = 0;}
    try
    {
        t2 = arg2.toString().split(".")[1].length;
    }
    catch(e)
    {t2 = 0;}
    with(Math)
    {
        m=Math.pow(10,Math.max(t1,t2));
        return (arg1  * m + arg2 * m) / m;
    }
}

//减法函数
function accSubtr(arg1,arg2){
    var t1 = 0, t2 = 0, m, n;
    try
    {
        t1 = arg1.toString().split(".")[1].length;
    }
    catch(e)
    {t1 = 0;}
    try
    {
        t2 = arg2.toString().split(".")[1].length;
    }
    catch(e)
    {t2 = 0;}
    with(Math)
    {
        //动态控制精度长度
        n = Math.max(t1,t2);
        m = Math.pow(10, n);
        //return (arg1  * m - arg2 * m) / m;
        return ((arg1  * m - arg2 * m) / m).toFixed(n);
    }
}


//乘法函数
function accMul(arg1,arg2)
{
    var t1 = 0, t2 = 0, r1, r2;
    try
    {
        t1 = arg1.toString().split(".")[1].length;
    }
    catch(e)
    {t1 = 0;}
    try
    {
        t2 = arg2.toString().split(".")[1].length;
    }
    catch(e)
    {t2 = 0;}
    with(Math)
    {
        r1 = Number(arg1.toString().replace(".",""));
        r2 = Number(arg2.toString().replace(".",""));
        return (r1*r2)/pow(10, t2+t1);
    }
}
//除法函数
function accDiv(arg1,arg2){
    var t1 = 0, t2 = 0, r1, r2, n;
    try
    {
        t1 = arg1.toString().split(".")[1].length;
    }
    catch(e)
    {t1 = 0;}
    try
    {
        t2 = arg2.toString().split(".")[1].length;
    }
    catch(e)
    {t2 = 0;}
    with(Math)
    {
        r1 = Number(arg1.toString().replace(".",""));
        // console.log(r1);
        r2 = Number(arg2.toString().replace(".",""));
        // console.log(r2);
        n = Math.max(t1,t2);
        return (r1/r2)*pow(10, t2-t1);
    }
}

//这个是倒数的函数,判断showCal。和calOutput，
//	判断calOutput如果为空，那么什么也不显示，调用clearAll()方法；
//	如果不为空，判断是否是数字，若是数字，判断是否等于0；如果等于0，提示错误，调用clearAll()方法；
//	判断不是0的其他数字，那就计算倒数，同时把计算的过程显示在
function reciprocal()
{
	var showCal = document.getElementById('showCal');
    var showCalValue = String(showCal.innerHTML);
    var calOutput = document.getElementById('calOutput');
    var calOutputValue = String(calOutput.innerHTML);
    if (calOutputValue != '')
    {
    	if (checkNumber())
    	{
    		var number1 = parseFloat(calOutputValue);
    		if(number1==0)
    		{
    			alert('倒数的分母不能为0');
    			clearAll();
    		}
    		else
    		{
    			showCal.innerHTML='1/'+number1.toString();
    			calOutput.innerHTML=String(1/number1);
    		}
    	}
    	else
    	{
    		clearAll();
    	}
    }
    else
    {
    	clearAll();
    }
}
//这个是平方的函数
function square()
{
	var showCal = document.getElementById('showCal');
    var showCalValue = String(showCal.innerHTML);
    var calOutput = document.getElementById('calOutput');
    var calOutputValue = String(calOutput.innerHTML);
    if (calOutputValue != '')
    {
    	if (checkNumber())
    	{
    		var number1 = parseFloat(calOutputValue);
    		showCal.innerHTML='square('+number1.toString()+')';
    		calOutput.innerHTML=String(number1*number1);
    		
    	}
    	else
    	{
    		clearAll();
    	}
    }
    else
    {
    	clearAll();
    }
}
// 这个是平方根的函数,负数没有平方根
function sqrt()
{
	var showCal = document.getElementById('showCal');
    var showCalValue = String(showCal.innerHTML);
    var calOutput = document.getElementById('calOutput');
    var calOutputValue = String(calOutput.innerHTML);
    if (calOutputValue != '')
    {
    	if (checkNumber())
    	{
    		var number1 = parseFloat(calOutputValue);
    		if(number1<0)
    		{
    			alert('被平方根不能小于0');
    			clearAll();
    		}
    		else
    		{
    			showCal.innerHTML='sqrt('+number1.toString()+')';
    			calOutput.innerHTML=String(Math.sqrt(number1));
    		}
    	}
    	else
    	{
    		clearAll();
    	}
    }
    else
    {
    	clearAll();
    }
}

// // 这个是sin的函数
// function sin()
// {

// }
// // 这个是cos的函数
// function cos()
// {

// }
// // 这个是tan的函数
// function cos()
// {
	
// }
// 这个是正弦，余弦和正切的函数
function  trigonometric(arg1)
{
	var showCal = document.getElementById('showCal');
    var showCalValue = String(showCal.innerHTML);
    var calOutput = document.getElementById('calOutput');
    var calOutputValue = String(calOutput.innerHTML);
    if (calOutputValue != '')
    {
    	if (checkNumber())
    	{
    		var number1 = parseFloat(calOutputValue);
    		showCal.innerHTML=arg1+'('+number1.toString()+')';
    		switch (arg1)
    		{
    			case 'sin':
    				calOutput.innerHTML=String(Math.sin(number1));
    				break;
    			case 'cos':
    				calOutput.innerHTML=String(Math.cos(number1));
    				break;
    			case 'tan':
    				calOutput.innerHTML=String(Math.tan(number1));
    				break;
    		}
    		
    	}
    	else
    	{
    		clearAll();
    	}
    }
    else
    {
    	clearAll();
    }
}

