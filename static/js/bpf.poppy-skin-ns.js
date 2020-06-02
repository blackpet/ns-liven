/**
 * BPF Poppy Body Template
 * for Nongshim User System
 *
 * @author blackpet
 * @date 20.4.29
 * @requires [ bpf.poppy ]
 * @type {string}
 */
(function () {

  var skin1Tmpl =
    // '    <i class="align_maker"></i>\n' +
    '    <div class="popup_default bp-body">\n' +
    '        <div class="pop_inner bp-main">\n' +
    '            <header class="pop_header">\n' +
    '                <h1 class="tit_s24cDGrayFB">{{>title}}</h1>\n' +
    '            </header>\n' +
    '            <article class="pop_content bp-article">\n' +
    '            </article>\n' +
    '            <footer class="pop_footer bp-footer">\n' +
    '                <ul class="items_btn_{{:buttonClass}} bp-btn-items">\n' +
    '                    <li class="item_list bp-btn-item-cancel">\n' +
    '                        <button type="button" class="btn_grayLineh50_close">\n' +
    '                            <span class="txt_s16">취소</span>\n' +
    '                        </button>\n' +
    '                    </li>\n' +
    '                    <li class="item_list bp-btn-item-ok">\n' +
    '                        <button type="button" class="btn_brownh50">\n' +
    '                            <span class="txt_s16">확인</span>\n' +
    '                        </button>\n' +
    '                    </li>\n' +
    '                </ul>\n' +
    '            </footer>\n' +
    '            <button type="button" class="btnIcon_close_gray bp-close-btn">\n' +
    '                <span class="ir">닫기</span>\n' +
    '            </button>\n' +
    '        </div>\n' +
    '    </div>';

  bpf.popup.setTemplate(skin1Tmpl);
  bpf.popup.setSkinOptions({
    title: 'NS Campus',
    skin: {
      ready: function () {
        var poppy = this;
        return new Promise(function (resolve) {
          setTimeout(function () {
            poppy.el.find('.bp-body').addClass('show');
            resolve();
          }, 50);
        });
      },
      close: function () {
        var poppy = this;
        return new Promise(function (resolve) {
          document.querySelector('#' + poppy.id + '.bpp').addEventListener(
            'transitionend', function () {
              resolve();
            }
          );

          $('#' + poppy.id + '.bpp .bp-body').removeClass('show');
        });
      }
    }
  });

})();


/**
 * !!!! nsc_ui.js / bpf.popup.js 보다 후행으로 선언되어야 한다 !!!!
 *
 * alert / confirm overwrite funcdtions
 * @author blackpet
 * @date 20.5.21
 */
function alert(message, fn) {
  var id = 'alert-' + Math.random().toString(36).substring(2, 10);
  var poppy = bpf.popup.create(id, {
    template: '<div>{{:message}}</div>',
    width: 500,
    title: '',
    closeable: true,
    buttons: ['ok'],
    data: {
      message: message
    }
  });

  if (!!fn && typeof fn === 'function') {
    poppy.ok(fn);
  }

  return poppy;
}

function confirm(message, fnOk, fnCancel) {
  var id = 'confirm-' + Math.random().toString(36).substring(2, 10);
  var poppy = bpf.popup.create(id, {
    template: '<div>{{:message}}</div>',
    width: 500,
    title: '',
    closeable: false,
    buttons: ['ok', 'cancel'],
    data: {
      message: message
    }
  });

  if (!!fnOk && typeof fnOk === 'function') {
    poppy.ok(fnOk);
  }
  if (!!fnCancel && typeof fnCancel === 'function') {
    poppy.cancel(fnCancel);
  }

  return poppy;
}

