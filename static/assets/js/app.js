/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/assets/js/app.js":
/*!***********************************!*\
  !*** ./frontend/assets/js/app.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const activityOptions = document.querySelectorAll(\"[activity-option]\");\r\nconst body = document.body;\r\n\r\n\r\n// функция принимает название тега и объект с настройками\r\nconst createEl = (tag, opts) => {\r\n  const el = document.createElement(tag);\r\n  // перебираем ключи объекта и записывает соответствующие свойства в элемент\r\n  for (const key in opts) {\r\n    el[key] = opts[key];\r\n  }\r\n  // возвращаем готовый элемент\r\n  return el;\r\n};\r\n\r\n/*const button = createEl('button', {\r\n    настройками могут быть атрибуты\r\n    id: 'my_button',\r\n    className: 'btn btn-primary',\r\n    textContent: 'Click me',\r\n  \r\n    title: 'My button',\r\n    autofocus: true,\r\n  \r\n    стили\r\n    style: 'color: red; cursor: pointer;',\r\n  \r\n    обработчики и т.д.\r\n    onmouseenter: function () {\r\n      this.style.color = 'green'\r\n    },\r\n    onmouseout: function () {\r\n      this.style.color = 'blue'\r\n    },\r\n  \r\n    onclick: () => alert('Привет!')\r\n  })*/\r\n\r\n  function createPostPreviewHTML(post){\r\n    let preview = document.createElement('div')\r\n    preview.classList.add('post')\r\n    preview.innerHTML = `<div class=\"post-image\"> \r\n      <a class=\"post-image\" href=\"post.html\">\r\n          <img src=\"${post.image}\" alt=\"Image\">\r\n      </a>\r\n    </div>\r\n    <div class=\"post-content\">\r\n        <div class=\"post-header\"> \r\n            <div class=\"post-author-info\">\r\n                <a href=\"personal-page.html\" class=\"author\">\r\n                    <img src=\"${post.authorAvatar}\" alt=\"\" class=\"author-img\">\r\n                </a>\r\n                <div class=\"author-nickname\">\r\n                    <a href=\"personal-page.html\">${post.author}</a>\r\n                    <ul class=\"post-data\">\r\n                        <li class=\"post-data_item\">\r\n                            <time datetime=\"2021-04-18 14:26\">${post.time}</time>\r\n                        </li>\r\n                    </ul>\r\n                </div>\r\n            </div>               \r\n            <div>\r\n                <p>posted in</p>\r\n                <a class=\"hub-title\" href=\"hub.html\">${post.location}</a>\r\n            </div>\r\n        </div>\r\n        <div class=\"post-title\">\r\n            <a class=\"post-link\" href=\"post.html\">${post.title}</a>            \r\n        </div>      \r\n        <div class=\"post-footer\">\r\n            <p class=\"post-text\">${post.content}</p>\r\n            <div class=\"votes\">\r\n                <ul>\r\n                    <li class=\"upvotes\">\r\n                        <img src=\"assets/images/up-arrow.svg\" alt=\"\">\r\n                        <p>${post.upvotes}</p>\r\n                    </li>\r\n                    <li class=\"downvotes\">\r\n                        <img src=\"assets/images/down-arrow.svg\" alt=\"\">\r\n                        <p>${post.downvotes}</p>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>                  \r\n    </div>`\r\n    return preview\r\n  }\r\n\n\n//# sourceURL=webpack:///./frontend/assets/js/app.js?");

/***/ }),

/***/ "./frontend/assets/js/login.js":
/*!*************************************!*\
  !*** ./frontend/assets/js/login.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function backOn(){\ndocument.getElementById('u78_div').style.backgroundColor=\"rgba(0, 0, 0, 1)\";\n  document.getElementById('u78_text').style.color=\"rgba(255, 255, 255, 0.996078431372549)\";\n}\nfunction backOut(){\n  document.getElementById('u78_div').style.backgroundColor=\"rgba(255, 255, 255, 0.996078431372549)\";\n  document.getElementById('u78_text').style.color=\"#7F7F7F\";\n}\nfunction getOn(){\n  if(b.hasAttribute('onclick')==false){\ndocument.getElementById('u76_div').style.backgroundColor=\"rgba(0, 0, 0, 1)\";\n  document.getElementById('u76_text').style.color=\"rgba(255, 255, 255, 0.996078431372549)\";\n  }\n}\nfunction getOut(){\n  if(b.hasAttribute('onclick')==false){\n  document.getElementById('u76_div').style.backgroundColor=\"rgba(127, 127, 127, 0.996078431372549)\";\n  document.getElementById('u76_text').style.color=\"gba(255, 255, 255, 0.996078431372549)\";\n  }\n}\njQuery(document).ready(function($) {\n  $(function() {\n    $('.btn').click(function() {\n      $('.switch-form').toggleClass('start-anim');\n\n    });\n  });\n});\n\nvar email = document.getElementById('u47_input');\nvar email1 = document.getElementById('u71_input');\nvar pass = document.getElementById('u53_input');\nvar b = document.getElementById('get');\nemail.addEventListener(\"input\", function (event) {\n  if (email.validity.valid && pass.validity.valid) { document.getElementById('u56').style.display=\"none\";\n  } else{document.getElementById('u56').style.display=\"block\"}\n}, false);\npass.addEventListener(\"input\", function (event) {\n  if (email.validity.valid && pass.validity.valid) { document.getElementById('u56').style.display=\"none\";\n  } else{document.getElementById('u56').style.display=\"block\"}\n}, false);\nemail1.addEventListener(\"input\", function (event) {\n  if (email1.validity.valid) {\n    b.removeAttribute(\"onclick\");\n    document.getElementById('u76_div').style.backgroundColor=\"rgba(127, 127, 127, 0.996078431372549)\";\n  } else{\n    b.setAttribute(\"onclick\", \"return false\");\n    document.getElementById('u76_div').style.backgroundColor=\"rgba(215, 215, 215, 1)\";\n  }\n}, false);\n\n//# sourceURL=webpack:///./frontend/assets/js/login.js?");

/***/ }),

/***/ "./frontend/assets/js/personal-page.js":
/*!*********************************************!*\
  !*** ./frontend/assets/js/personal-page.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const activityOptions = document.querySelectorAll(\"[activity-option]\");\r\n\r\n\r\n// анимация на личной странице: выбор блоги/посты/комменты\r\nactivityOptions.forEach((item) => {\r\n    item.addEventListener(\"click\", (event) => {\r\n      let $this = event.target;\r\n      let optionId = $this.getAttribute(\"activity-option\");\r\n  \r\n      //? нах мне это let clickedOption = document.getElementById(optionId)\r\n  \r\n      activityOptions.forEach((item) => {\r\n        if (item.getAttribute(\"activity-option\") == optionId){\r\n            item.classList.add(\"--activity-block-chosen\");\r\n\r\n        }\r\n          \r\n        else item.classList.remove(\"--activity-block-chosen\");\r\n      });\r\n\r\n\r\n    });\r\n  });\r\n\r\n\r\n  function loadMyBlogs(){\r\n\r\n  }\r\n\r\n  function loadMyPosts(){\r\n\r\n  }\r\n\r\n  function loadMyComments(){\r\n      \r\n  }\n\n//# sourceURL=webpack:///./frontend/assets/js/personal-page.js?");

/***/ }),

/***/ "./frontend/assets/js/post-load.js":
/*!*****************************************!*\
  !*** ./frontend/assets/js/post-load.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module parse failed: Unexpected token (13:0)\\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\\n|       document.getElementById(\\\"article-image\\\").setAttribute(src, image)\\n|     }\\n> }\\n| \");\n\n//# sourceURL=webpack:///./frontend/assets/js/post-load.js?");

/***/ }),

/***/ "./frontend/assets/js/publish-post.js":
/*!********************************************!*\
  !*** ./frontend/assets/js/publish-post.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const userName = \"Chell\" //!костыль\r\ndocument.getElementById(\"publish-post\").addEventListener('submit', publishPost)\r\n\r\n\r\nfunction publishPost(event){\r\n    event.preventDefault()\r\n\r\n    let title = document.getElementById(\"post-create_title-input\")\r\n    let image = document.getElementById(\"post-create_image-input\")\r\n    let content = document.getElementById(\"post-create_content-text\")\r\n    //TODO let tags = document.getElementById(\"post-create_title-input\")\r\n\r\n    const post = {\r\n        title: title,\r\n        author: userName,\r\n        content: content,\r\n        image: null, //! как картинки отправлять\r\n        image_title: null\r\n    }\r\n\r\n    fetch('URL',{\r\n        method: POST,\r\n        headers: {\r\n            'Content-Type': 'application/json'\r\n        },\r\n        body: JSON.stringify(post)\r\n    })\r\n        .then((response) => {\r\n            if (response.ok){\r\n                return response.json()\r\n            } else{\r\n                return Promise.reject({status: response.status, statusText: response.statusText})\r\n            }\r\n            \r\n        })\r\n        .then((data) => console.log(data))\r\n        .catch(error => console.log('Error message: ', error.statusText))\r\n\r\n}\n\n//# sourceURL=webpack:///./frontend/assets/js/publish-post.js?");

/***/ }),

/***/ "./frontend/assets/js/registration.js":
/*!********************************************!*\
  !*** ./frontend/assets/js/registration.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function backOn0(){\ndocument.getElementById('u30_div').style.backgroundColor=\"rgba(0, 0, 0, 1)\";\n  document.getElementById('u30_text').style.color=\"rgba(255, 255, 255, 0.996078431372549)\";\n}\nfunction backOut0(){\n  document.getElementById('u30_div').style.backgroundColor=\"rgba(255, 255, 255, 0.996078431372549)\";\n  document.getElementById('u30_text').style.color=\"#7F7F7F\";\n}\nvar email0 = document.getElementById('u7_input');\nvar name0 = document.getElementById('u3_input');\nvar aa = document.getElementById('aa');\nvar pass0 = document.getElementById('u32_input');\nvar pass00 = document.getElementById('u35_input');\npass0.addEventListener(\"input\", function (event) {\n  if (pass00.value!=pass0.value) {\n    pass00.setCustomValidity(\"invalid\");\n  } else{\n    pass00.setCustomValidity(\"\");\n  }\n}, false);\npass00.addEventListener(\"input\", function (event) {\n  if (pass00.value!=pass0.value) {\n    pass00.setCustomValidity(\"invalid\");\n  } else{\n    pass00.setCustomValidity(\"\");\n  }\n}, false);\nemail0.addEventListener(\"input\", function (event) {\n  if (email0.validity.valid && name0.validity.valid) { \n    aa.removeAttribute(\"onclick\");\n    document.getElementById('u21_div').style.backgroundColor=\"rgba(0, 0, 0, 1)\";\n  } else{\n    aa.setAttribute(\"onclick\", \"return false\");\n    document.getElementById('u21_div').style.backgroundColor=\"rgba(215, 215, 215, 1)\";\n  }\n}, false);\nname0.addEventListener(\"input\", function (event) {\n  if (email0.validity.valid && name0.validity.valid) { \n    aa.removeAttribute(\"onclick\");\n    document.getElementById('u21_div').style.backgroundColor=\"rgba(0, 0, 0, 1)\";\n  } else{\n    aa.setAttribute(\"onclick\", \"return false\");\n    document.getElementById('u21_div').style.backgroundColor=\"rgba(215, 215, 215, 1)\";\n  }\n}, false);\nvar sign = document.getElementById('sign');\nvar check = document.getElementById('check');\npass0.addEventListener(\"input\", function (event) {\n  if (pass0.validity.valid && pass00.validity.valid && check.checked) { \n    sign.removeAttribute(\"onclick\");\n    document.getElementById('u42_div').style.backgroundColor=\"rgba(0, 0, 0, 1)\";\n  } else{\n    sign.setAttribute(\"onclick\", \"return false\");\n    document.getElementById('u42_div').style.backgroundColor=\"rgba(215, 215, 215, 1)\";\n  }\n}, false);\npass00.addEventListener(\"input\", function (event) {\n  if (pass0.validity.valid && pass00.validity.valid && check.checked) { \n    sign.removeAttribute(\"onclick\");\n    document.getElementById('u42_div').style.backgroundColor=\"rgba(0, 0, 0, 1)\";\n  } else{\n    sign.setAttribute(\"onclick\", \"return false\");\n    document.getElementById('u42_div').style.backgroundColor=\"rgba(215, 215, 215, 1)\";\n  }\n}, false);\n$('#check').change(function()\n{\n  if(this.checked&& pass0.validity.valid && pass00.validity.valid)\n  {\n  sign.removeAttribute(\"onclick\");\n    document.getElementById('u42_div').style.backgroundColor=\"rgba(0, 0, 0, 1)\";\n  } else{\n    sign.setAttribute(\"onclick\", \"return false\");\n    document.getElementById('u42_div').style.backgroundColor=\"rgba(215, 215, 215, 1)\";\n  };\n})\njQuery(document).ready(function($) {\n  $(function() {\n    $('.but').click(function() {\n      if(aa.hasAttribute('onclick')==false)\n      $('.sw').toggleClass('strt');\n\n    });\n  });\n});\n\n//# sourceURL=webpack:///./frontend/assets/js/registration.js?");

/***/ }),

/***/ "./frontend/assets/js/tags.js":
/*!************************************!*\
  !*** ./frontend/assets/js/tags.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const tagContainer = document.querySelector('.tag-input');\r\nconst tagInput = document.querySelector('.tag-input input');\r\n\r\nlet tags = [];\r\n\r\nfunction createTag(label) {\r\n  const div = document.createElement('div');\r\n  div.setAttribute('class', 'tag');\r\n  const span = document.createElement('span');\r\n  span.innerHTML = label;\r\n  const closeIcon = document.createElement('i');\r\n  closeIcon.innerHTML = 'close';\r\n  closeIcon.setAttribute('class', 'material-icons');\r\n  closeIcon.setAttribute('data-item', label);\r\n  div.appendChild(span);\r\n  div.appendChild(closeIcon);\r\n  return div;\r\n}\r\n\r\nfunction clearTags() {\r\n  document.querySelectorAll('.tag').forEach(tag => {\r\n    tag.parentElement.removeChild(tag);\r\n  });\r\n}\r\n\r\nfunction addTags() {\r\n  clearTags();\r\n  tags.slice().reverse().forEach(tag => {\r\n    tagContainer.prepend(createTag(tag));\r\n  });\r\n}\r\n\r\ntagInput.addEventListener('keyup', (e) => {\r\n    if (e.key === 'Enter') {\r\n      e.target.value.split(',').forEach(tag => {\r\n        tags.push(tag);  \r\n      });\r\n      \r\n      addTags();\r\n      tagInput.value = '';\r\n    }\r\n});\r\ndocument.addEventListener('click', (e) => {\r\n  console.log(e.target.tagName);\r\n  if (e.target.tagName === 'I') {\r\n    const tagLabel = e.target.getAttribute('data-item');\r\n    const index = tags.indexOf(tagLabel);\r\n    tags = [...tags.slice(0, index), ...tags.slice(index+1)];\r\n    addTags();    \r\n  }\r\n})\r\n\r\ntagInput.focus();\n\n//# sourceURL=webpack:///./frontend/assets/js/tags.js?");

/***/ }),

/***/ "./frontend/assets/js/upstream.js":
/*!****************************************!*\
  !*** ./frontend/assets/js/upstream.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\n//# sourceURL=webpack:///./frontend/assets/js/upstream.js?");

/***/ }),

/***/ 0:
/*!***************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** multi ./frontend/assets/js/app.js ./frontend/assets/js/login.js ./frontend/assets/js/personal-page.js ./frontend/assets/js/post-load.js ./frontend/assets/js/publish-post.js ./frontend/assets/js/registration.js ./frontend/assets/js/tags.js ./frontend/assets/js/upstream.js ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! D:\\Projects\\GitHub\\qhub\\frontend\\assets\\js\\app.js */\"./frontend/assets/js/app.js\");\n__webpack_require__(/*! D:\\Projects\\GitHub\\qhub\\frontend\\assets\\js\\login.js */\"./frontend/assets/js/login.js\");\n__webpack_require__(/*! D:\\Projects\\GitHub\\qhub\\frontend\\assets\\js\\personal-page.js */\"./frontend/assets/js/personal-page.js\");\n__webpack_require__(/*! D:\\Projects\\GitHub\\qhub\\frontend\\assets\\js\\post-load.js */\"./frontend/assets/js/post-load.js\");\n__webpack_require__(/*! D:\\Projects\\GitHub\\qhub\\frontend\\assets\\js\\publish-post.js */\"./frontend/assets/js/publish-post.js\");\n__webpack_require__(/*! D:\\Projects\\GitHub\\qhub\\frontend\\assets\\js\\registration.js */\"./frontend/assets/js/registration.js\");\n__webpack_require__(/*! D:\\Projects\\GitHub\\qhub\\frontend\\assets\\js\\tags.js */\"./frontend/assets/js/tags.js\");\nmodule.exports = __webpack_require__(/*! D:\\Projects\\GitHub\\qhub\\frontend\\assets\\js\\upstream.js */\"./frontend/assets/js/upstream.js\");\n\n\n//# sourceURL=webpack:///multi_./frontend/assets/js/app.js_./frontend/assets/js/login.js_./frontend/assets/js/personal-page.js_./frontend/assets/js/post-load.js_./frontend/assets/js/publish-post.js_./frontend/assets/js/registration.js_./frontend/assets/js/tags.js_./frontend/assets/js/upstream.js?");

/***/ })

/******/ });