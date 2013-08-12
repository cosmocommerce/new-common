/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-yunjiankong' : '&#x21;',
			'icon-yundun' : '&#x22;',
			'icon-yes3' : '&#x23;',
			'icon-yes2' : '&#x24;',
			'icon-yes' : '&#x25;',
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
			'icon-rds' : '&#x3b;',
			'icon-play' : '&#x3c;',
			'icon-pic' : '&#x3d;',
			'icon-phone' : '&#x3e;',
			'icon-pen' : '&#x3f;',
			'icon-ots' : '&#x40;',
			'icon-oss' : '&#x41;',
			'icon-order' : '&#x42;',
			'icon-odps' : '&#x43;',
			'icon-no3' : '&#x44;',
			'icon-mail' : '&#x45;',
			'icon-lock' : '&#x46;',
			'icon-loading' : '&#x47;',
			'icon-link' : '&#x48;',
			'icon-lessen' : '&#x49;',
			'icon-left2' : '&#x4a;',
			'icon-left' : '&#x4b;',
			'icon-untitled' : '&#x4c;',
			'icon-home' : '&#x4d;',
			'icon-heart2' : '&#x4e;',
			'icon-heart' : '&#x4f;',
			'icon-good' : '&#x50;',
			'icon-giving' : '&#x51;',
			'icon-file' : '&#x52;',
			'icon-ecs' : '&#x53;',
			'icon-earth' : '&#x54;',
			'icon-download' : '&#x55;',
			'icon-down2' : '&#x56;',
			'icon-down' : '&#x57;',
			'icon-donw3' : '&#x58;',
			'icon-dialog2' : '&#x59;',
			'icon-dialog' : '&#x5a;',
			'icon-customers' : '&#x5b;',
			'icon-customer' : '&#x5c;',
			'icon-counter' : '&#x5d;',
			'icon-cloud' : '&#x5e;',
			'icon-clock' : '&#x5f;',
			'icon-card' : '&#x60;',
			'icon-calendar' : '&#x61;',
			'icon-blow-up' : '&#x62;',
			'icon-appendix' : '&#x63;',
			'icon-ace' : '&#x64;',
			'icon-untitled-2' : '&#x65;',
			'icon-untitled-3' : '&#x66;',
			'icon-untitled-4' : '&#x67;',
			'icon-untitled-5' : '&#x68;',
			'icon-untitled-6' : '&#x69;',
			'icon-untitled-7' : '&#x6a;'
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