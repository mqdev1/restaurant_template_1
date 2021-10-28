class elementjs {
    static do() {
        window.get = this.get;
        window.set = this.set;
    }
    static set(parent, elementName) {
        if (undefined !== elementName || elementName != null) {
            var el = document.createElement(elementName);
            delete el.text;
            el.child =  {
                add : function(child) {
                    el.appendChild(child);
                },
                remove : function(child) {
                    el.removeChild(child);
                }
            }
            el.addHtml = function(html) {
                let h = el.innerHTML;
                el.innerHTML = h + '&nbsp;' + html;
            }
            el.addText = function(text) {
                let t = el.innerText;
                el.innerText = t + '' + text;
            }
            el.content = function(__text) {
                if(undefined != __text && null != __text)
                {
                    el.innerHTML = __text;
                }
                else
                {
                    return el.innerHTML;
                }
            }
            el.attr = {
                get : function(attrname) {
                    return el.getAttribute(attrname);
                },
                add : function(attrname, attrvalue) {
                    el.setAttribute(attrname, attrvalue);
                },
                remove : function(attrname) {
                    el.removeAttribute(attrname);
                },
                has : function(attrname) {
                    if (null !== el.getAttribute(attrname)) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            el.class = {
                add : function(... args) {
                    let i = 0;
                    for(i = 0; i < args.length; i++)
                    {
                        el.classList.add(args[i]);
                    }
                },
                remove : function(classname) {
                    el.classList.remove(classname);
                },
                toggle : function(classname) {
                    el.classList.toggle(classname);
                },
                has : function(classname) {
                    let having = false;
                    el.classList.forEach((className, i) => {
                        if (className == classname) {
                            having = true;
                        }
                    });
                    return having;
                }
            },
            el.css = {
                add : function(propName, propValue) {
                    if (typeof propName === 'object') {
                        let cssCode = '';
                        propName.forEach(element => {
                            if (cssCode === '') {
                                cssCode = element;
                            } else {
                                cssCode = cssCode + ';' + element;
                            }
                        });
                        el.setAttribute('style', cssCode);
                    } else {
                        el.style[propName.toString().toLowerCase()] = propValue;
                    }
                },
                remove : function(propName) {
                    let i = 0;
                    let cssText = el.style.cssText.toString().split(';');
                    let cssResult = '';
                    cssText.forEach(element => {
                        let elm = element.toString().replace(' ', '');
                        if (elm.toString().substring(0, propName.toString().toLowerCase().length).toLowerCase() !== propName.toLowerCase()) {
                            if (cssResult === '') {
                                cssResult = element;
                            } else {
                                cssResult = cssResult + ';' + element;
                            }
                        }
                    });
                    if (cssResult.substring(cssResult.length, cssResult.length - 1) == ',') {
                        cssResult = cssResult.substring(0, cssResult.length - 1);
                    }
                    el.setAttribute('style', cssResult);
                },
                has : function(propName) {
                    let i = 0;
                    let cssText = el.style.cssText.toString().split(';');
                    let hav = false;
                    cssText.forEach(element => {
                        if (!hav) {
                            let elm = element.toString().replace(' ', '');
                            if (elm.toString().substring(0, propName.toString().toLowerCase().length).toLowerCase() === propName.toLowerCase()) {
                                hav = true;
                            }
                        }
                    });
                    return hav;
                }
            }
            el.on = function(name, method) {
                el.addEventListener(name, function(e) {
                    method.prototype = Element.get(this);
                    new method(e);
                })
            }
            el.each = function(fun) {
                let i = 0;
                let selectors = el.childNodes;
                for (i = 0; i < selectors.length; i++) {
                    new fun(get(selectors[i]), i);
                }
            }
            el.childs = function(name){
                var chlds = [];
                var clds = (undefined === name || null === name) ? el.childNodes : el.querySelectorAll(name);
                clds.forEach((item)=>{
                    chlds.push(get(item));
                });
                return chlds;
            }
            el.val = function(value){
                if(undefined !== value && null !== value)
                {
                    el.value = value;
                }
                else
                {
                    return el.value;
                }
            },
            el.data = {
                add : function(name, value) {
                    if (undefined !== name) {
                        el.dataset[name] = value;
                    }
                }
            },
            el.del = function(){
                el.remove();
            }
            el.checked = function(value = null){
                if(null == value)
                {
                    return el.checked;
                }
                else
                {
                    el.checked = value;
                }
            },
            el.selected = function(value = null)
            {
                if(null == value)
                {
                    return el.selected;
                }
                else
                {
                    el.selected = value;
                }
            }
            if (undefined !== parent && null !== parent) {
                parent.appendChild(el);
            }
            return el;
        }
        return el;
    }
    static get(element) {
        try
        {
            if (undefined != element && null != element) {
                var el = typeof element !== 'object' ? document.querySelector(element) : element;
                if(undefined == el || null == el)return;
                el.child = {
                    add : function(child_node) {
                        el.appendChild(child_node);
                    },
                    remove : function(child_node) {
                        el.removeChild(child_node);
                    }
                }
                el.all = function(){
                    let items = [];
                    if(typeof element !== 'object')
                    {
                        document.querySelectorAll(element).forEach(item=>{
                            items.push(Element.get(item));
                        });
                    }
                    return items;
                }
                el.addHtml= function(html) {
                    let h = el.innerHTML;
                    el.innerHTML = h + '&nbsp;' + html;
                }
                el.addText= function(text) {
                    el.innerText += text;
                }
                el.content = function(__text) {
                    if(undefined != __text && null != __text)
                    {
                        el.innerHTML = __text;
                    }
                    else
                    {
                        return el.innerHTML;
                    }
                }
                el.attr= {
                    get : function(attrname) {
                        return el.getAttribute(attrname);
                    },
                    add : function(attrname, attrvalue) {
                        el.setAttribute(attrname, attrvalue);
                    },
                    remove : function(attrname) {
                        el.removeAttribute(attrname);
                    }
                }
                el.class= {
                    add : function(... args) {
                        let i = 0;
                        for(i = 0; i < args.length; i++)
                        {
                            el.classList.add(args[i]);
                        }
                    }, remove : function(classname) {
                        el.classList.remove(classname);
                    }, toggle : function(classname) {
                        el.classList.toggle(classname);
                    }, has : function(classname) {
                        let having = false;
                        el.classList.forEach((className, i) => {
                            if (className == classname) {
                                having = true;
                            }
                        });
                        return having;
                    }
                }
                el.css= {
                    add : function(propName, propValue) {
                        if (typeof propName === 'object') {
                            let cssCode = '';
                            propName.forEach(element => {
                                if (cssCode === '') {
                                    cssCode = element;
                                } else {
                                    cssCode = cssCode + ';' + element;
                                }
                            });
                            el.setAttribute('style', cssCode);
                        } else {
                            el.style[propName.toString().toLowerCase()] = propValue;
                        }
                    },
                    remove : function(propName) {
                        let i = 0;
                        let cssText = el.style.cssText.toString().split(';');
                        let cssResult = '';
                        cssText.forEach(element => {
                            let elm = element.toString().replace(' ', '');
                            if (elm.toString().substring(0, propName.toString().toLowerCase().length).toLowerCase() !== propName.toLowerCase()) {
                                if (cssResult === '') {
                                    cssResult = element;
                                } else {
                                    cssResult = cssResult + ';' + element;
                                }
                            }
                        });
                        if (cssResult.substring(cssResult.length, cssResult.length - 1) == ',') {
                            cssResult = cssResult.substring(0, cssResult.length - 1);
                        }
                        el.setAttribute('style', cssResult);
                    },
                    has : function(propName) {
                        let i = 0;
                        let cssText = el.style.cssText.toString().split(';');
                        let hav = false;
                        cssText.forEach(element => {
                            if (!hav) {
                                let elm = element.toString().replace(' ', '');
                                if (elm.toString().substring(0, propName.toString().toLowerCase().length).toLowerCase() === propName.toLowerCase()) {
                                    hav = true;
                                }
                            }
                        });
                        return hav;
                    }
                }
                el.on= function(name, method) {
                    let clds = document.querySelectorAll(element);
                    clds.forEach((item)=>{
                        item.addEventListener(name, function(e) {
                            method.prototype = Element.get(this);
                            new method(e);
                        });
                    });
                }
                el.each= function(fun) {
                    let i = 0;
                    let selectors = el.childNodes;
                    for (i = 0; i < selectors.length; i++) {
                        new fun(selectors[i], i);
                    }
                }
                el.childs= function(name){
                    var chlds = [];
                    var clds = (undefined === name || null === name) ? el.childNodes : el.querySelectorAll(name);
                    clds.forEach((item)=>{
                        chlds.push(get(item));
                    });
                    return chlds;
                }
                el.val = function(value){
                    if(undefined !== value && null !== value)
                    {
                        el.value = value;
                    }
                    else
                    {
                        return el.value;
                    }
                }
                el.data= {
                    add : function(name, value) {
                        if (undefined !== name) {
                            el.dataset[name] = value;
                        }
                    },
                    get :  function(name){
                        return el.getAttribute('data-' + name);
                    }
                }
                el.del = function(){
                    el.remove();
                }
                el.checked = function(value = null){
                    if(null == value)
                    {
                        return el.checked;
                    }
                    else
                    {
                        el.checked = value;
                    }
                }
                el.selected = function(value = null)
                {
                    if(null == value)
                    {
                        return el.selected;
                    }
                    else
                    {
                        el.selected = value;
                    }
                }
                return el;
            }
        }
        catch
        {
            return el;
        }
    }
}