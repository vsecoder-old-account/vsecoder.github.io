var rngnmb = 0;
console.log('%c%s', 'color: yellow; font: 2.2rem/1 Tahoma;', '$lib');
globalThis.$ = {
  find: function (dom) {
    try{
      return document.querySelector(dom);
    } catch(ex){
      console.error(ex);
    }
  },
  rem: function (dom) {
    this.find(dom).remove();
  },
  popup: function (dom) {
    let d = this.find(dom);
    if (d.style.display == "none") {
        d.style.display = "block";
    } else if (d.style.display == "block") {
        d.style.display = "none";
    } else {
        console.warn('Не заданно display: block или none');
        d.style.display = "block";
    }
  },
  hide: function (dom) {
    this.find(dom).style.display = "none";
  },
  show: function (dom) {
    let d = this.find(dom);
    if (d.style.display == "none") {
      d.style.display = "block";
    } else {
      console.warn('Как я тебе это отображу? Поставь display: none; хоть!!!');
    }
  },
  log: function (text) {
    console.log('%c%s', 'color: black; font: 1.2rem/1 Tahoma;', text);
  },
  info: function (dom) {
    console.log('%O', this.find(dom));
  },
  logimg: function (i,s,c) {
  const r = new FileReader();
  if(s==undefined){s=100};
  r.addEventListener('load', function () {
    const o ='background: url(\'' + r.result + '\') left top no-repeat; font-size: '+s+'px; background-size: contain; background-color:'+c;
    console.log('%c     ',o);
  },false);
  fetch(i)
    .then(r=>r.blob())
    .then(b=>{
    if(b.type.indexOf('image')===0){
      if(b.size>8192&& navigator.userAgent.indexOf('Firefox')>0){
      throw new Error('Изображение СЛИШКОМ большое.');
      }
      return b;
    }else{
      throw new Error('Хм... Неправильный адрес.');
    }
    })
    .then(i=>r.readAsDataURL(i))
    .catch(e=>console.warn(e.message));
	},
  click: function (dom) {
    this.find(dom).click();
  },
  text: function (dom, text) {
    this.find(dom).textContent = text;
  },
  add: function (dom, cl) {
    this.find(dom).classList.add(cl);
  },
  rnd: function (data) {
    var template = document.body.innerHTML;
    for (var property in data) {
      if (data.hasOwnProperty(property)) {
        var search = new RegExp('{' + property + '}', 'gi');
        template = template.replace(search, data[property]);
      }
    }
    return template;
  },
  js: function (src) {
    let script = document.createElement('script');
    script.src = src;
    script.async = false;
    if (document.head) {
      document.head.appendChild(script);
    } else if (document.body) {
      document.body.appendChild(script);
    } else {
      console.warn('А куда скрипт добавить? не head, не  body...');
    }
  },
  css: function (src) {
    let link = document.createElement('link');
    link.href = src;
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    if (document.head) {
      document.head.appendChild(link);
    } else if (document.body) {
      document.body.appendChild(link);
    } else {
      console.warn('А куда css добавить? не head, не  body...');
    }
  },
  addR: function (min, max, step, def, pos, css, el) {
    let x = document.createElement("input");
    if(typeof(el) == 'string') {elm = this.find(el);} else {elm = document.body;}
    elm.appendChild(x);
    x.setAttribute("type", "range");
    if (typeof(min) == 'number') {} else {min = 0;}
    x.setAttribute("min", min);
    if (typeof(max) == 'number') {} else {max = 100;}
    x.setAttribute("max", max);
    if (typeof(step) == 'number') {} else {step = 1;}
    x.setAttribute("step", step);
    if (typeof(def) == 'number') {} else {def = min + (max-min)/2;}
    x.setAttribute("value", def);
    if (typeof(css) == 'string') {} else {css = 'rng';}
    x.setAttribute("class", css);
    if (pos) {x.style.transform = 'rotate(90deg)';}
    elm.appendChild(x);
    let p = document.createElement("p");
    p.style.display = 'inline-block';
    elm.appendChild(p);
    p.innerHTML = x.value;
    let c = document.createElement('style');
    c.setAttribute('id', 'cssrange');
    document.body.appendChild(c);
    x.oninput = function() {
      p.innerHTML = this.value;
      let size = min+(max-min)*this.value/100;
      c.innerHTML = '/*RANGE*/'+'.'+css+'::-webkit-slider-runnable-track{background-size: '+size+'%;}';
    }
    let link = document.createElement('link');
    link.href = '../range.css';
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    document.head.appendChild(link);
  }
};
//$ https://htmlcssphpjs.github.io/lib/
