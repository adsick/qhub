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

eval("\r\nconst activityOptions = document.querySelectorAll(\"[activity-option]\");\r\nconst body = document.body;\r\n\r\n\r\n// функция принимает название тега и объект с настройками\r\nconst createEl = (tag, opts) => {\r\n  const el = document.createElement(tag);\r\n  // перебираем ключи объекта и записывает соответствующие свойства в элемент\r\n  for (const key in opts) {\r\n    el[key] = opts[key];\r\n  }\r\n  // возвращаем готовый элемент\r\n  return el;\r\n};\r\n\r\n/*const button = createEl('button', {\r\n    настройками могут быть атрибуты\r\n    id: 'my_button',\r\n    className: 'btn btn-primary',\r\n    textContent: 'Click me',\r\n  \r\n    title: 'My button',\r\n    autofocus: true,\r\n  \r\n    стили\r\n    style: 'color: red; cursor: pointer;',\r\n  \r\n    обработчики и т.д.\r\n    onmouseenter: function () {\r\n      this.style.color = 'green'\r\n    },\r\n    onmouseout: function () {\r\n      this.style.color = 'blue'\r\n    },\r\n  \r\n    onclick: () => alert('Привет!')\r\n  })*/\r\n\r\n  function createPostPreviewHTML(post){\r\n    let preview = document.createElement('div')\r\n    preview.classList.add('post')\r\n    preview.innerHTML = `<div class=\"post-image\"> \r\n      <a class=\"post-image\" href=\"post.html\">\r\n          <img src=\"${post.image}\" alt=\"Image\">\r\n      </a>\r\n    </div>\r\n    <div class=\"post-content\">\r\n        <div class=\"post-header\"> \r\n            <div class=\"post-author-info\">\r\n                <a href=\"personal-page.html\" class=\"author\">\r\n                    <img src=\"${post.authorAvatar}\" alt=\"\" class=\"author-img\">\r\n                </a>\r\n                <div class=\"author-nickname\">\r\n                    <a href=\"personal-page.html\">${post.author}</a>\r\n                    <ul class=\"post-data\">\r\n                        <li class=\"post-data_item\">\r\n                            <time datetime=\"2021-04-18 14:26\">${post.time}</time>\r\n                        </li>\r\n                    </ul>\r\n                </div>\r\n            </div>               \r\n            <div>\r\n                <p>posted in</p>\r\n                <a class=\"hub-title\" href=\"hub.html\">${post.location}</a>\r\n            </div>\r\n        </div>\r\n        <div class=\"post-title\">\r\n            <a class=\"post-link\" href=\"post.html\">${post.title}</a>            \r\n        </div>      \r\n        <div class=\"post-footer\">\r\n            <p class=\"post-text\">${post.content}</p>\r\n            <div class=\"votes\">\r\n                <ul>\r\n                    <li class=\"upvotes\">\r\n                        <img src=\"assets/images/up-arrow.svg\" alt=\"\">\r\n                        <p>${post.upvotes}</p>\r\n                    </li>\r\n                    <li class=\"downvotes\">\r\n                        <img src=\"assets/images/down-arrow.svg\" alt=\"\">\r\n                        <p>${post.downvotes}</p>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>                  \r\n    </div>`\r\n    return preview\r\n  }\r\n\n\n//# sourceURL=webpack:///./frontend/assets/js/app.js?");

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

eval("function getArticle(id) {\r\n  fetch(\"http://109.86.214.54:8000/global/${id}\")\r\n    .then((response) => {\r\n      return response.json();\r\n    })\r\n    .then((article) =>{\r\n      document.getElementById(\"article-title\").textContent = article.title\r\n      document.getElementById(\"post-author\").textContent = article.author\r\n      document.getElementById(\"post-location\").textContent = \"?\"/*article.*/\r\n      document.getElementById(\"article-text\").textContent = article.content\r\n      document.getElementById(\"article-image\").setAttribute(src, image)\r\n    })\r\n}\r\n\n\n//# sourceURL=webpack:///./frontend/assets/js/post-load.js?");

/***/ }),

/***/ "./frontend/assets/js/publish-post.js":
/*!********************************************!*\
  !*** ./frontend/assets/js/publish-post.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const userName = \"Chell\" //!костыль\r\n//!document.getElementById(\"publish-post\").addEventListener('submit', publishPost)\r\n\r\n\r\nfunction publishPost(event){\r\n    event.preventDefault()\r\n\r\n    let title = document.getElementById(\"post-create_title-input\")\r\n    let image = document.getElementById(\"post-create_image-input\")\r\n    let content = document.getElementById(\"post-create_content-text\")\r\n    //TODO let tags = document.getElementById(\"post-create_title-input\")\r\n\r\n    const post = {\r\n        title: title,\r\n        author: userName,\r\n        content: content,\r\n        image: null, //! как картинки отправлять\r\n        image_title: null\r\n    }\r\n\r\n    fetch('URL',{\r\n        method: POST,\r\n        headers: {\r\n            'Content-Type': 'application/json'\r\n        },\r\n        body: JSON.stringify(post)\r\n    })\r\n        .then((response) => {\r\n            if (response.ok){\r\n                return response.json()\r\n            } else{\r\n                return Promise.reject({status: response.status, statusText: response.statusText})\r\n            }\r\n            \r\n        })\r\n        .then((data) => console.log(data))\r\n        .catch(error => console.log('Error message: ', error.statusText))\r\n\r\n}\n\n//# sourceURL=webpack:///./frontend/assets/js/publish-post.js?");

/***/ }),

/***/ "./frontend/assets/js/tags.js":
/*!************************************!*\
  !*** ./frontend/assets/js/tags.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*const tagContainer = document.querySelector('.tag-input');\r\nconst tagInput = document.querySelector('.tag-input input');\r\n\r\nlet tags = [];\r\n\r\nfunction createTag(label) {\r\n  const div = document.createElement('div');\r\n  div.setAttribute('class', 'tag');\r\n  const span = document.createElement('span');\r\n  span.innerHTML = label;\r\n  const closeIcon = document.createElement('i');\r\n  closeIcon.innerHTML = 'close';\r\n  closeIcon.setAttribute('class', 'material-icons');\r\n  closeIcon.setAttribute('data-item', label);\r\n  div.appendChild(span);\r\n  div.appendChild(closeIcon);\r\n  return div;\r\n}\r\n\r\nfunction clearTags() {\r\n  document.querySelectorAll('.tag').forEach(tag => {\r\n    tag.parentElement.removeChild(tag);\r\n  });\r\n}\r\n\r\nfunction addTags() {\r\n  clearTags();\r\n  tags.slice().reverse().forEach(tag => {\r\n    tagContainer.prepend(createTag(tag));\r\n  });\r\n}\r\n\r\ntagInput.addEventListener('keyup', (e) => {\r\n    if (e.key === 'Enter') {\r\n      e.target.value.split(',').forEach(tag => {\r\n        tags.push(tag);  \r\n      });\r\n      \r\n      addTags();\r\n      tagInput.value = '';\r\n    }\r\n});\r\ndocument.addEventListener('click', (e) => {\r\n  console.log(e.target.tagName);\r\n  if (e.target.tagName === 'I') {\r\n    const tagLabel = e.target.getAttribute('data-item');\r\n    const index = tags.indexOf(tagLabel);\r\n    tags = [...tags.slice(0, index), ...tags.slice(index+1)];\r\n    addTags();    \r\n  }\r\n})\r\n\r\ntagInput.focus();*/\n\n//# sourceURL=webpack:///./frontend/assets/js/tags.js?");

/***/ }),

/***/ "./frontend/assets/js/upstream.js":
/*!****************************************!*\
  !*** ./frontend/assets/js/upstream.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function loadPosts(){\r\n    fetch('http://109.86.214.54:8000/query?')\r\n    .then((res)=>res.json())\r\n    .then((data)=>console.log(data))\r\n}\r\n\r\n\r\n$(document).ready(loadPosts())\n\n//# sourceURL=webpack:///./frontend/assets/js/upstream.js?");

/***/ }),

/***/ 0:
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** multi ./frontend/assets/js/app.js ./frontend/assets/js/personal-page.js ./frontend/assets/js/post-load.js ./frontend/assets/js/publish-post.js ./frontend/assets/js/tags.js ./frontend/assets/js/upstream.js ***!
  \********************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! D:\\Projects\\GitHub\\qhub\\frontend\\assets\\js\\app.js */\"./frontend/assets/js/app.js\");\n__webpack_require__(/*! D:\\Projects\\GitHub\\qhub\\frontend\\assets\\js\\personal-page.js */\"./frontend/assets/js/personal-page.js\");\n__webpack_require__(/*! D:\\Projects\\GitHub\\qhub\\frontend\\assets\\js\\post-load.js */\"./frontend/assets/js/post-load.js\");\n__webpack_require__(/*! D:\\Projects\\GitHub\\qhub\\frontend\\assets\\js\\publish-post.js */\"./frontend/assets/js/publish-post.js\");\n__webpack_require__(/*! D:\\Projects\\GitHub\\qhub\\frontend\\assets\\js\\tags.js */\"./frontend/assets/js/tags.js\");\nmodule.exports = __webpack_require__(/*! D:\\Projects\\GitHub\\qhub\\frontend\\assets\\js\\upstream.js */\"./frontend/assets/js/upstream.js\");\n\n\n//# sourceURL=webpack:///multi_./frontend/assets/js/app.js_./frontend/assets/js/personal-page.js_./frontend/assets/js/post-load.js_./frontend/assets/js/publish-post.js_./frontend/assets/js/tags.js_./frontend/assets/js/upstream.js?");

/***/ })

/******/ });