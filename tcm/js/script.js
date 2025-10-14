
var countdownTimer;
var Main = function () {
  // 日曆
	$.datepicker.setDefaults( $.datepicker.regional[ "zh-TW" ] );
  $(".datepicker").datepicker({
      dateFormat: 'yy/mm/dd',
      firstDay: 0
  });
  // 客製化select
  $('select').select2({
    width: '100%'
  });

  // 下拉選單
  $('.dropdown').on('click', 'a', function (e) { 
    e.preventDefault();
    e.stopPropagation();
    if ($(this).attr('href') !== '' && $(this).attr('href') != '#') {
      window.location.href = $(this).attr('href');
    } else { 
      if ($(this).parent('.dropdown').hasClass('active')) {
        $(this).parent('.dropdown').removeClass('active');
      } else {
        $(this).parent('.dropdown').addClass('active');
      }
    }
  });

  // input 密碼格式切換
  $('.input-view').on('click', '.btnView', function (e) { 
    e.preventDefault();
    var $this = $(this).parents('.input-view');
    if ($this.hasClass('active')) {
      $this.removeClass('active');
      $this.find('input').attr('type', 'password');
    } else {
      $this.addClass('active');
      $this.find('input').attr('type', 'text');
    }
  });
  

  // 手機選單
  $('.btnHam').on('click', function (e) { 
    e.preventDefault();
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
      $('#menu').removeClass('active');
      $('body').removeClass('hidden');
    } else {
      $(this).addClass('active');
      $('#menu').addClass('active');
      $('body').addClass('hidden');
    }
  });

  // 倒數計時
  if ($('.countdown').length > 0) {
    countdownReset();
  }
  $('.reCountdown').on('click', function (e) { // 重計otp時間
    e.preventDefault();
    clearInterval(countdownTimer);
    countdownReset();
  });
  
  //圖片彈窗
  $('.btnPopup').magnificPopup({
		type: 'image',
		closeOnContentClick: false,
		closeBtnInside: true,
		fixedContentPos: true,
		mainClass: 'mfp-no-margins', // class to remove default margin from left and right side
		image: {
			verticalFit: true
		}
  });
  
  // 收合
  $('.collapse-item').on('click', '.collapse', function (e) { 
    e.preventDefault();
    var $this = $(this).parents('.collapse-item');
    if ($this.hasClass('active')) {
      $this.removeClass('active');
    } else {
      $this.addClass('active');
    }
  });

  // 送出新增使用者
  $('.btnSendUser').on('click', function (e) { 
    e.preventDefault();
    var $form = $($(this).attr('href'));
    var tabName = $(this).parents('.tab-block').data('name');

    if ($(this).data('type') === 'add') { //新增使用者
      //送出使用者資料
      postUserData($(this).attr('href'),'add');
    } else if ($(this).data('type') === 'edit') { //編輯使用者
      var codename = $('[data-tab="'+tabName+'"]').find('.codename').text();
      alertDouble('請再次確認是否變更使用者'+codename+'基本資料!', 'editUser', $(this).attr('href'));
    } else if ($(this).data('type') === 'password') { //變更使用者密碼
      postUserData($(this).attr('href'),'password');
    } else if ($(this).data('type') === 'delete') { //變更使用者密碼
      alertDouble('請確認<br>是否刪除該使用者?', 'deleteUser', $(this).attr('href'));
    } else{
    }
  });
  // 送出變更基本資料 - 刪除用戶
  $('.btnSendDel').on('click', function (e) { 
    e.preventDefault();
    var $form = $($(this).attr('href'));
    alertDouble('請再次確定<br>是否刪除用戶??', 'delete', $(this).attr('href'));
  });
  
  //彈窗
	$('.btnImgPopup').magnificPopup({
		type: 'image',
		closeOnContentClick: false,
		closeBtnInside: true,
		fixedContentPos: true,
		mainClass: 'mfp-no-margins', 
		image: {
			verticalFit: true
		}
	});
	$('.btnPopup').magnificPopup({
		type: 'inline',
		preloader: false,
		modal: true
	});
  $(document).on('click', '.btnClosePopup', function (e) {
    e.preventDefault();
		$.magnificPopup.close();
	});
  $('.alert-wrap').on('click', '.btnCloseAlert', function (e) { 
    e.preventDefault();
    $.magnificPopup.close();
  });

  // select tab 切換
  $('.selectCollapse').on('change', function () {
    var type = $(this).val();
    var id = $(this).data('select');
    $('[data-name = "' + id + '"][data-type="' + type + '"]').addClass('active').siblings('tr').removeClass('active');
    if (type != '-1') {
      $(this).parents('tr').siblings('tr[data-tab]').find('.selectCollapse').each(function () {
        if ($(this).val() != '-1') {
          $(this).val('-1').change();
        }
      });
    } else { 
      $('[data-name = "' + id + '"]').removeClass('active');
    }
  });
  $('.btnCollapse').on('click', function (e) {
    e.preventDefault();
    var type = $(this).data('type');
    var id = $(this).data('select');
    $('[data-name = "' + id + '"][data-type="' + type + '"]').addClass('active').siblings('tr').removeClass('active');
  });
  $('.btnCloseCollapse').on('click', function (e) {
    e.preventDefault();
    var id = $(this).parents('.tab-block').data('name');
    $('[data-name = "' + id + '"]').removeClass('active');
    $('[data-tab = "' + id + '"]').find('.selectCollapse').val('-1').change();
  });
  
  //頁籤
  $('.tabs .tabs-nav').on('click', '.item', function (e) {
    e.preventDefault();
    var $id = $($(this).attr('href'));
    $(this).addClass('active').siblings('.item').removeClass('active');
    $id.addClass('active').siblings('.tabs-block').removeClass('active');
    $('.tabs-popup').removeClass('active');
  });
  $('.btnTabsPopup').on('click', function (e) {
    e.preventDefault();
    var $id = $($(this).attr('href'));
    $id.addClass('active');
  });
  $('.btnCloseTabsPopup').on('click', function (e) {
    e.preventDefault();
    $(this).parents('.tabs-popup').removeClass('active');
  });

  //index
  $('.btnSendPassword').on('click', function (e) {
    e.preventDefault();
    var form = $(this).attr('href');
    postPassword(form);
  });
  $('.btnSendRegister').on('click', function (e) {
    e.preventDefault();
    var form = $(this).attr('href');
    postRegister(form);
  });
  
}

// 秒轉分:秒
var s_to_hs = function (s) {
  var h;
  h = Math.floor(s / 60);
  s = s % 60;
  h += '';
  s += '';
  s = (s.length == 1) ? '0' + s : s;
  return [h, s];
}

var countdownReset = function () {
  var timer = 0;
  $('.countdown').each(function () {
    $(this).find('.countdown-min').text('0');
    $(this).find('.countdown-sec').text('0');
  });
  timer = 60 * 5; // 5分鐘
  countdownTimer = setInterval(function () {
    timer--;
    if (timer === 0) {
      clearInterval(countdownTimer);
    }
    var timeShow = s_to_hs(timer);
    $('.countdown').each(function () {
      $(this).find('.countdown-min').text(timeShow[0]);
      $(this).find('.countdown-sec').text(timeShow[1]);
    });
  }, 1000);
}

// 回饋視窗-2按鈕
var alertDouble = function (content, type, form) {
  var $this = $('#alertDouble'); 
  $this.find('p').html(content);
  if (type === 'editUser') {
    $this.find('.btnSend').attr('href', 'javascript:postUserData("' + form + '", "edit");');
  } else if(type === 'deleteUser') {
    $this.find('.btnSend').attr('href', 'javascript:postUserData("' + form + '", "delete");');
  } else if(type === 'delete') {
    $this.find('.btnSend').attr('href', 'javascript:postDelUser("' + form + '");');
  }  else { 
    $this.find('.btnSend').attr('href', '');
  }
  $.magnificPopup.open({
    items: {
      src: '#alertDouble',
      type: 'inline'
    },
    showCloseBtn: false
  });
}

// 回饋視窗-1按鈕 content:回饋內容
var alertSingle = function (content) {
  var $this = $('#alertSingle'); 
  $this.find('p').html(content);
  $.magnificPopup.open({
    items: {
      src: '#alertSingle',
      type: 'inline'
    },
    showCloseBtn: false
  });
}

var postUserData = function (form, type) {
  console.log(form);
  var $form = $(form);
  var tabName = $form.parents('.tab-block').data('name');
  var codename = $('[data-tab="'+tabName+'"]').find('.codename').text();
  if (type === 'add') {
    alertSingle('新增使用者<br>已完成!');
  } else if (type === 'edit') { 
    alertSingle('使用者'+codename+'基本資料<br>已變更完成!');
  } else if (type === 'password') { 
    alertSingle('使用者'+codename+'的密碼<br>已變更完成!');
  } else if (type === 'delete') { 
    alertSingle('使用者'+codename+'<br>資料已刪除!!');
  }
}

var postDelUser = function (form) {
  console.log(form);
  var $form = $(form);
  alertSingle('您已刪除該用戶');
}
var postPassword = function (form) { 
  console.log(form);
  var $form = $(form);
  alertSingle('您的密碼修改完成，<br>歡迎登入集保i查詢平台');
}
var postRegister = function (form) { 
  console.log(form);
  var $form = $(form);
  alertSingle('平台註冊完成，<br>歡迎登入集保i查詢平台');
}
