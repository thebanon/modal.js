window.modal = {
  card: (h, ppp = document.createElement('aside')) => {
    ppp.setAttribute('class', 'aside body-aside card popup');
    ppp.innerHTML = `<section><card class="card">`+h+`</card></section>`;
    ppp.onclick = event => { //console.log(event);
      event.target.classList.contains('aside') ? event.target.remove() : null
    };
    dom.body.insertBefore(ppp,byId('boot').nextElementSibling);
    modal.zIndex(document.querySelectorAll('aside:not(#body-ppp)'));
    //dom.body.onclick = () => on.touch.tap(event,'tap');
    return new Promise((resolve, reject) => resolve(byId('boot').nextElementSibling));
  },
  panel: (h, style) => { console.log(style);
    var ppp = document.createElement('aside');
    ppp.style = style;
    ppp.style["max-width"] = style["max-width"];
    ppp.style["width"] = style["width"];
    ppp.style["left"] = style["left"];
    ppp.style["bottom"] = style["bottom"];
    ppp.style["top"] = style["top"];
    ppp.style["right"] = style["right"];
    ppp.style["border-radius"] = style["border-radius"];
    ppp.setAttribute('class', 'aside body-aside panel');
    ppp.innerHTML = `<card class="card">`+h+`</card>`;
    ppp.onclick = event => { //console.log(event);
      event.target.classList.contains('aside') ? event.target.remove() : null
    };
    dom.body.insertBefore(ppp,byId('boot').nextElementSibling);
    modal.zIndex(document.querySelectorAll('aside'));
    //dom.body.onclick = () => on.touch.tap(event,'tap');
    return new Promise((resolve, reject) => resolve(byId('boot').nextElementSibling));
  },
  confirm: (h, opt, callBack, ppp = document.createElement('aside')) => {
    ppp.setAttribute('class', 'aside body-aside card');
    ppp.innerHTML = `<section class="card-confirm"><card class="card"><section>`+h+`</section><footer><div class="confirm">`+opt[0]+`</div><div class="cancel">`+opt[1]+`</div></footer></card></section>`;
    ppp.onclick = event => {
      if(event.target.classList.contains('aside')) {
        event.target.remove();
      } else {
        var target = event.target;
        var confirm = target.classList.contains('confirm');
        var cancel = target.classList.contains('cancel');
        if(confirm || cancel) {
          confirm ? callBack(confirm) : null;
          modal.exit(target);
        }
      }
      return confirm;
    };
    dom.body.insertBefore(ppp,byId('boot').nextElementSibling);
    modal.zIndex(document.querySelectorAll('aside:not(#body-ppp)'));
  },
  counter: 0,
  exit: target => target.closest('aside').remove(),
  popup: (h, ppp = document.createElement('aside')) => {
    byId('boot').insertAdjacentHTML('afterend',`<aside class="aside body-aside popup"">`+h+`</aside>`);
    modal.zIndex(document.querySelectorAll('aside'));
    return new Promise((resolve, reject) => resolve(byId('boot').nextElementSibling));
  },
  await: (h, callBack, ppp = document.createElement('aside')) => {
    byId('boot').insertAdjacentHTML('afterend',`<aside class="aside body-aside popup"">`+h+`</aside>`);
    modal.zIndex(document.querySelectorAll('aside'));
    return new Promise((resolve, reject) => resolve({ppp:byId('boot').nextElementSibling,callBack}));
  },
  zIndex: elem => elem.forEach((v,k) => { v.style.zIndex = 123456789 + (elem.length - k); })
};
