/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
  function addIcon(el, entity) {
    var html = el.innerHTML;
    el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
  }
  var icons = {
      'icon-oss' : '&#x21;',
      'icon-yunjiankong' : '&#x22;',
      'icon-yundun' : '&#x23;',
      'icon-yes3' : '&#x24;',
      'icon-yes2' : '&#x25;',
      'icon-wrong' : '&#x26;',
      'icon-video' : '&#x27;',
      'icon-upload' : '&#x28;',
      'icon-up2' : '&#x29;',
      'icon-up' : '&#x2a;',
      'icon-unlock' : '&#x2b;',
      'icon-tel' : '&#x2c;',
      'icon-strap' : '&#x2d;',
      'icon-stop' : '&#x2e;',
      'icon-star2' : '&#x2f;',
      'icon-star' : '&#x30;',
      'icon-slb' : '&#x31;',
      'icon-shopping-cart' : '&#x32;',
      'icon-set2' : '&#x33;',
      'icon-set' : '&#x34;',
      'icon-Search' : '&#x35;',
      'icon-sale' : '&#x36;',
      'icon-rubbish' : '&#x37;',
      'icon-right2' : '&#x38;',
      'icon-right' : '&#x39;',
      'icon-reload' : '&#x3a;',
      'icon-reduce' : '&#x3b;',
      'icon-rds' : '&#x3c;',
      'icon-play' : '&#x3d;',
      'icon-pic' : '&#x3e;',
      'icon-phone' : '&#x3f;',
      'icon-pen' : '&#x40;',
      'icon-ots' : '&#x41;',
      'icon-order' : '&#x42;',
      'icon-odps' : '&#x43;',
      'icon-ocs' : '&#x44;',
      'icon-no3' : '&#x45;',
      'icon-money' : '&#x46;',
      'icon-mail' : '&#x47;',
      'icon-lock' : '&#x48;',
      'icon-loading' : '&#x49;',
      'icon-link' : '&#x4a;',
      'icon-lessen' : '&#x4b;',
      'icon-left2' : '&#x4c;',
      'icon-left' : '&#x4d;',
      'icon-home' : '&#x4e;',
      'icon-help' : '&#x4f;',
      'icon-heart2' : '&#x50;',
      'icon-heart' : '&#x51;',
      'icon-good' : '&#x52;',
      'icon-giving' : '&#x53;',
      'icon-file' : '&#x54;',
      'icon-ecs' : '&#x55;',
      'icon-earth' : '&#x56;',
      'icon-download' : '&#x57;',
      'icon-down3' : '&#x58;',
      'icon-down2' : '&#x59;',
      'icon-down' : '&#x5a;',
      'icon-dialog2' : '&#x5b;',
      'icon-customers' : '&#x5c;',
      'icon-customer' : '&#x5d;',
      'icon-counter' : '&#x5e;',
      'icon-cloud' : '&#x5f;',
      'icon-clock' : '&#x60;',
      'icon-card' : '&#x61;',
      'icon-calendar' : '&#x62;',
      'icon-blow-up' : '&#x63;',
      'icon-bang2' : '&#x64;',
      'icon-bang' : '&#x65;',
      'icon-appendix' : '&#x66;',
      'icon-add' : '&#x67;',
      'icon-ace' : '&#x68;',
      'icon-info' : '&#x69;',
      'icon-cdn' : '&#x6a;'
    },
    els = document.getElementsByTagName('*'),
    i, attr, html, c, el;
  for (i = 0; ; i += 1) {
    el = els[i];
    if(!el) {
      break;
    }
    attr = el.getAttribute('data-icon');
    if (attr) {
      addIcon(el, attr);
    }
    c = el.className;
    c = c.match(/icon-[^\s'"]+/);
    if (c && icons[c[0]]) {
      addIcon(el, icons[c[0]]);
    }
  }
};
