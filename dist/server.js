require("source-map-support").install();
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

throw new Error("Module build failed: SyntaxError: /Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/src/dbOps.js: Unexpected token, expected \",\" (209:41)\n\n  207 |     const collection = mongo.db(DB).collection('oldCards');\n  208 |     const data = await tryCatch(\n> 209 |       collection.find({cardId: {$in: ids}).toArray()\n      |                                          ^\n  210 |     );\n  211 |     res.json(data);\n  212 |     mongo.close();\n    at Parser.raise (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:842:15)\n    at Parser.unexpected (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:2238:16)\n    at Parser.expect (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:2224:28)\n    at Parser.parseObj (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:3677:14)\n    at Parser.parseExprAtom (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:3336:21)\n    at Parser.parseExprSubscripts (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:2998:21)\n    at Parser.parseMaybeUnary (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:2976:21)\n    at Parser.parseExprOps (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:2881:21)\n    at Parser.parseMaybeConditional (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:2851:21)\n    at Parser.parseMaybeAssign (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:2807:21)\n    at Parser.parseExprListItem (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:4074:18)\n    at Parser.parseCallExpressionArguments (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:3160:22)\n    at Parser.parseSubscript (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:3094:32)\n    at Parser.parseSubscripts (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:3017:19)\n    at Parser.parseExprSubscripts (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:3008:17)\n    at Parser.parseMaybeUnary (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:2976:21)\n    at Parser.parseExprOps (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:2881:21)\n    at Parser.parseMaybeConditional (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:2851:21)\n    at Parser.parseMaybeAssign (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:2807:21)\n    at Parser.parseExprListItem (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:4074:18)\n    at Parser.parseCallExpressionArguments (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:3160:22)\n    at Parser.parseSubscript (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:3094:32)\n    at Parser.parseSubscripts (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:3017:19)\n    at Parser.parseExprSubscripts (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:3008:17)\n    at Parser.parseMaybeUnary (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:2976:21)\n    at Parser.parseAwait (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:4139:26)\n    at Parser.parseExprAtom (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:3254:27)\n    at Parser.parseExprSubscripts (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:2998:21)\n    at Parser.parseMaybeUnary (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:2976:21)\n    at Parser.parseExprOps (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:2881:21)");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var twit = __webpack_require__(13);

var _process$env = process.env,
    TWITTER_API_KEY = _process$env.TWITTER_API_KEY,
    TWITTER_API_SECRET = _process$env.TWITTER_API_SECRET,
    TWITTER_TOKEN = _process$env.TWITTER_TOKEN,
    TWITTER_TOKEN_SECRET = _process$env.TWITTER_TOKEN_SECRET,
    TWITTER_ACCOUNT = _process$env.TWITTER_ACCOUNT; // const appConfig = {
//   consumer_key: TWITTER_API_KEY,
//   consumer_secret: TWITTER_API_SECRET,
//   app_only_auth: true
// }

var userConfig = {
  consumer_key: TWITTER_API_KEY,
  consumer_secret: TWITTER_API_SECRET,
  access_token: TWITTER_TOKEN,
  access_token_secret: TWITTER_TOKEN_SECRET
};
module.exports = new twit(userConfig);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

function _sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return _sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }

var urlencode = __webpack_require__(14);

var WEBLOOKUP_URL = 'https://ejje.weblio.jp/content/';
var TWITTER_ACCOUNT = process.env.TWITTER_ACCOUNT;
var HOURS = 3600000;
module.exports = {
  HOURS: HOURS,
  formatQuestionAltText: function formatQuestionAltText(expression) {
    var hint = formatHint(expression);

    var _minMaxChars = minMaxChars(hint),
        _minMaxChars2 = _slicedToArray(_minMaxChars, 2),
        min = _minMaxChars2[0],
        max = _minMaxChars2[1];

    var minMax = min === max ? min : "".concat(min, " to ").concat(max);
    var s = max > 1 ? 's' : '';
    var screenReaderHint = "(".concat(minMax, " character").concat(s, ")");
    return expression.replace(/\{\{.+?\}\}/g, screenReaderHint);
  },
  formatQuestionText: function formatQuestionText(expression, engMeaning, notes, cardID) {
    var hint = formatHint(expression);

    var _minMaxChars3 = minMaxChars(hint),
        _minMaxChars4 = _slicedToArray(_minMaxChars3, 2),
        min = _minMaxChars4[0],
        max = _minMaxChars4[1];

    var minMax = min === max ? min : "".concat(min, "-").concat(max);
    var tweetText = "What ".concat(minMax, " character answer means \"").concat(engMeaning, "\"?");
    if (needsHint(hint)) tweetText += "\nHint: ".concat(hint);
    if (notes) tweetText += "\nNotes: ".concat(notes);
    tweetText += "\nQID".concat(cardID);
    return tweetText;
  },
  formatAnswerAltText: function formatAnswerAltText(expression) {
    return expression.replace(/\{\{.*?\:\:(.+?)\:\:.*?\}\}/g, '$1');
  },
  formatAnswerText: function formatAnswerText(answers, engMeaning, webLookup, cardId) {
    var s = answers.length > 1 ? 's' : '';
    var answerText = "Answer".concat(s, ": ").concat(answers.join(', '));
    answerText += "\nEnglish Meaning: \"".concat(engMeaning, "\"");
    answerText += '\nDefinition: ' + WEBLOOKUP_URL + urlencode(webLookup);
    answerText += "\nQID".concat(cardId);
    return answerText;
  },
  addQuestionLink: function addQuestionLink(answerText, questionId) {
    var questionLink = "Question: twitter.com/".concat(TWITTER_ACCOUNT, "/status/").concat(questionId);
    var lines = answerText.split('\n');
    lines.splice(-1, 0, questionLink);
    return lines.join('\n');
  },
  getAnswers: function getAnswers(expression, altAnswers) {
    var acceptedAnswer = expression.match(/\:\:(.+?)\:\:/)[1];
    var otherAnswers = [];
    if (altAnswers && altAnswers.length > 0) otherAnswers = altAnswers.split(',');
    return [acceptedAnswer].concat(otherAnswers);
  },
  calculateScore: function calculateScore(answerPostedAt, _ref) {
    var questionPostedAt = _ref.questionPostedAt,
        alreadyAnswered = _ref.alreadyAnswered;
    var timeToAnswer = Math.floor((new Date(answerPostedAt) - new Date(questionPostedAt)) / HOURS);
    var score = 24 - timeToAnswer;
    return Math.max(score, 0);
  },
  extractAnswer: function extractAnswer(text) {
    return text.trim().slice(TWITTER_ACCOUNT.length + 2);
  },
  getTimeUntil: function getTimeUntil(hour) {
    // https://stackoverflow.com/questions/4455282/call-a-javascript-function-at-a-specific-time-of-day
    var now = new Date();
    var millisUntilTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, 0, 0, 0) - now;
    if (millisUntilTime < 0) // already passed for today, wait until tomorrow
      millisUntilTime += (_readOnlyError("millisUntilTime"), 24 * HOURS);
    return millisUntilTime;
  },
  tryCatch: function tryCatch(promise) {
    return promise.then(function (data) {
      return data;
    }).catch(function (err) {
      console.error('Error:', err);
      return {};
    });
  },
  contains: function contains(item, list) {
    return valid(list.indexOf(item));
  }
}; // module.exports

function valid(index) {
  return index !== -1;
}

function needsHint(hint) {
  return hint.replace(/\[\]/g, '').trim().length !== 0;
}

function maxChars(hint) {
  var missingCharRegex = /\[.*?\]/g;
  var missingChars = (hint.match(missingCharRegex) || []).length;
  var gimmeChars = hint.replace(missingCharRegex, '').replace(/[\s+\(\)]/g, '').length;
  return missingChars + gimmeChars;
}

function minChars(hint) {
  var optionalChars = (hint.match(/\?/g) || []).length;
  return maxChars(hint) - optionalChars;
}

function minMaxChars(hint) {
  return [minChars(hint), maxChars(hint)];
}

function formatHint(expression) {
  var legend = expression.match(/\:\:.+?\:\:(.+?)\}\}/)[1];
  var normalized = groupMultiXs(groupXs(groupQuestionMarks(legend)));
  return flatten(split(normalized)).map(function (group) {
    if (group === '.') return '[]';
    if (group === '-') return '[] [] [] [] []';

    if (/\?/.test(group)) {
      var result = [];
      var numChars = Number(group.match(/\d+/)[0]);

      for (var i = 0; i < numChars; i++) {
        result.push('[?]');
      }

      if (result.length === 1) return '[?]';
      return '(' + result.join(' ') + ')';
    }

    if (/≠/.test(group)) {
      var negatedChars = group.replace(/≠/g, '');
      return "[\u2260".concat(negatedChars, "]");
    } // else (character gimme)


    return group;
  }).join(' ');
}

function groupQuestionMarks(string) {
  return string.replace(/(\?+)/g, function (match, p1) {
    return "(".concat(p1.length, "?)");
  });
}

function groupXs(string) {
  return string.replace(/≠[^(]/g, '($&)');
}

function groupMultiXs(string) {
  return string.replace(/≠\((.*)\)/g, '(≠$1)');
}

function split(str) {
  return str.split(/[\(\)]/).map(function (group) {
    return /\?|≠/.test(group) ? group : group.split('');
  });
}

function scalar(v) {
  return !Array.isArray(v);
}

function flatten(deep) {
  var flat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (deep.length === 0) return flat;

  var _deep = _toArray(deep),
      head = _deep[0],
      tail = _deep.slice(1);

  return scalar(head) ? flatten(tail, flat.concat(head)) : flatten(tail, flat.concat(flatten(head)));
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(4);
module.exports = __webpack_require__(5);


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

if (true) __webpack_require__(6).config();

var express = __webpack_require__(7);

var app = express();

var path = __webpack_require__(8);

var bodyParser = __webpack_require__(9);

var twitterBot = __webpack_require__(10);

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.resolve(__dirname, '../dist')));
app.use(bodyParser.json());

__webpack_require__(15)(app); //twitterBot.start();


app.listen(app.get('port'), function () {
  return console.log('Listening on port', app.get('port'));
});
exports = module.exports = app;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

var DB = __webpack_require__(0);

var _require = __webpack_require__(11),
    HOURS = _require.HOURS,
    addQuestionLink = _require.addQuestionLink,
    calculateScore = _require.calculateScore,
    contains = _require.contains,
    extractAnswer = _require.extractAnswer,
    getFollowing = _require.getFollowing,
    getTimeUntil = _require.getTimeUntil,
    postMedia = _require.postMedia,
    tryCatch = _require.tryCatch;

var Twitter = __webpack_require__(1);

var TWITTER_ACCOUNT = process.env.TWITTER_ACCOUNT;
var ANSWER_INTERVAL = 2000;
var QUESTION_INTERVAL = 5000;
module.exports = {
  start: function start() {
    openStream();
    setInterval(tweetRandomQuestion, QUESTION_INTERVAL);
  } // start: () => {
  //   openStream();
  //   setStartTimes();
  // }

};

function setStartTimes() {
  var timeUntil7PM = getTimeUntil(19);
  var timeUntilMidnight = getTimeUntil(0);
  setTimeout(function () {
    setInterval(tweetRandomQuestion, QUESTION_INTERVAL);
  }, timeUntil7PM);
  setTimeout(function () {
    setInterval(weeklyMonthlyReset, 24 * HOURS);
  }, timeUntilMidnight);
}

function tweetRandomQuestion() {
  return _tweetRandomQuestion.apply(this, arguments);
}

function _tweetRandomQuestion() {
  _tweetRandomQuestion = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var _ref3, cardId, questionText, questionImg, questionAltText, prevLineImg, prevLineAltText, answers, _ref4, questionId, questionPostedAt, mediaUrls, liveQuestion;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return tryCatch(DB.getRandomQuestion());

          case 2:
            _ref3 = _context2.sent;
            cardId = _ref3.cardId;
            questionText = _ref3.questionText;
            questionImg = _ref3.questionImg;
            questionAltText = _ref3.questionAltText;
            prevLineImg = _ref3.prevLineImg;
            prevLineAltText = _ref3.prevLineAltText;
            answers = _ref3.answers;

            if (cardId) {
              _context2.next = 12;
              break;
            }

            return _context2.abrupt("return");

          case 12:
            _context2.next = 14;
            return tryCatch(postMedia(questionText, questionImg, questionAltText, prevLineImg, prevLineAltText));

          case 14:
            _ref4 = _context2.sent;
            questionId = _ref4.questionId;
            questionPostedAt = _ref4.questionPostedAt;
            mediaUrls = _ref4.mediaUrls;
            liveQuestion = {
              cardId: cardId,
              questionId: questionId,
              answers: answers,
              questionPostedAt: questionPostedAt,
              cachedPoints: [],
              alreadyAnswered: []
            };
            DB.addLiveQuestion(liveQuestion, mediaUrls);
            setTimeout(function () {
              return tweetAnswer(cardId, questionId);
            }, ANSWER_INTERVAL);

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _tweetRandomQuestion.apply(this, arguments);
}

function tweetAnswer(_x, _x2) {
  return _tweetAnswer.apply(this, arguments);
}

function _tweetAnswer() {
  _tweetAnswer = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(cardId, questionId) {
    var _ref5, answerText, answerImg, answerAltText, _ref6, mediaUrls;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return tryCatch( // EFFECTS:
            // - removes question from liveQuestions
            // - adds cached points to scoreboard
            //
            // RETURNS:
            // AnswerCard
            DB.revealAnswerWorkflow(cardId));

          case 2:
            _ref5 = _context3.sent;
            answerText = _ref5.answerText;
            answerImg = _ref5.answerImg;
            answerAltText = _ref5.answerAltText;
            _context3.next = 8;
            return tryCatch(postMedia(addQuestionLink(answerText, questionId), answerImg, answerAltText));

          case 8:
            _ref6 = _context3.sent;
            mediaUrls = _ref6.mediaUrls;
            DB.addMediaUrlsToCard(cardId, mediaUrls);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));
  return _tweetAnswer.apply(this, arguments);
}

function openStream() {
  var stream = Twitter.stream('statuses/filter', {
    track: "@".concat(TWITTER_ACCOUNT)
  });
  stream.on('tweet',
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(_ref) {
      var questionId, answerPostedAt, text, _ref$user, userId, name, handle, avatar, profileBanner, liveQuestions, foundQuestion, alreadyAnswered, acceptedAnswers, userAnswer, points, following, newUser;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              questionId = _ref.in_reply_to_status_id_str, answerPostedAt = _ref.created_at, text = _ref.text, _ref$user = _ref.user, userId = _ref$user.id, name = _ref$user.name, handle = _ref$user.screen_name, avatar = _ref$user.profile_image_url_https, profileBanner = _ref$user.profile_banner_url;
              _context.next = 3;
              return tryCatch(DB.getLiveQuestions());

            case 3:
              liveQuestions = _context.sent;
              foundQuestion = liveQuestions.filter(function (obj) {
                return obj.questionId === questionId;
              })[0];

              if (!foundQuestion) {
                _context.next = 21;
                break;
              }

              alreadyAnswered = foundQuestion.alreadyAnswered, acceptedAnswers = foundQuestion.answers;

              if (!contains(userId, alreadyAnswered)) {
                _context.next = 9;
                break;
              }

              return _context.abrupt("return");

            case 9:
              userAnswer = extractAnswer(text);

              if (!contains(userAnswer, acceptedAnswers)) {
                _context.next = 20;
                break;
              }

              points = calculateScore(answerPostedAt, foundQuestion);
              _context.next = 14;
              return tryCatch(getFollowing(userId));

            case 14:
              following = _context.sent;
              newUser = {
                userId: userId,
                name: name,
                handle: handle,
                avatar: avatar,
                profileBanner: profileBanner,
                following: following,
                score: 0,
                monthlyScore: 0,
                weeklyScore: 0,
                correctAnswers: []
              };
              DB.addOrUpdateUser(newUser);
              DB.updateLiveQuestion(questionId, {
                userId: userId,
                points: points
              });
              _context.next = 21;
              break;

            case 20:
              DB.updateLiveQuestion(questionId, {
                userId: userId,
                points: 0
              });

            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x3) {
      return _ref2.apply(this, arguments);
    };
  }());
  stream.on('disconnect', function (disconnectMsg) {
    console.error('Tweet stream disconnected:', disconnectMsg);
    setTimeout(function () {
      return stream.start();
    }, 100);
  });
}

function weeklyMonthlyReset() {
  var now = Date.now();
  var resetWeeklyScore = now.getDay() === 0;
  var resetMonthlyScore = now.getDate() === 1;
  if (resetWeeklyScore || resetMonthlyScore) DB.weeklyMonthlyReset(resetWeeklyScore, resetMonthlyScore);
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var twitterUtils = __webpack_require__(12);

var utils = __webpack_require__(2);

module.exports = _extends({}, twitterUtils, utils);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

var Twitter = __webpack_require__(1);

var _require = __webpack_require__(2),
    tryCatch = _require.tryCatch;

module.exports = {
  //
  // post a tweet with media
  //
  postMedia: function postMedia(status, b64Image1, altText1, b64Image2, altText2) {
    return new Promise(
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(resolve, reject) {
        var mediaId1, media_ids, mediaId2, params;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return tryCatch(uploadMedia(b64Image1, altText1));

              case 2:
                mediaId1 = _context.sent;
                media_ids = [mediaId1];

                if (!b64Image2) {
                  _context.next = 9;
                  break;
                }

                _context.next = 7;
                return tryCatch(uploadMedia(b64Image2, altText2));

              case 7:
                mediaId2 = _context.sent;
                media_ids.unshift(mediaId2);

              case 9:
                params = {
                  status: status,
                  media_ids: media_ids,
                  tweet_mode: 'extended',
                  include_ext_alt_text: true
                };
                Twitter.post('statuses/update', params, function (err, data, response) {
                  if (err) {
                    console.error(err);
                    reject(new Error("Posting status failed."));
                  }

                  ;
                  console.log('Ext entities:', data.extended_entities.media);
                  var mediaUrls = data.extended_entities.media.map(function (obj) {
                    return {
                      image: obj.media_url_https,
                      altText: obj.ext_alt_text
                    };
                  });
                  var result = {
                    questionId: data.id_str,
                    questionPostedAt: data.created_at,
                    mediaUrls: mediaUrls
                  };
                  resolve(result);
                });

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  },
  getFollowing: function getFollowing(userId) {
    return new Promise(function (resolve, reject) {
      Twitter.get('friends/ids', {
        userId: userId
      }, function (err, data, response) {
        if (err) console.error(err);
        resolve(data.ids);
      });
    });
  }
}; // module.exports
// EFFECTS:
// uploads a single image with altText to Twitter
//
// RETURNS:
// media_id which is necessary for
// attaching media to a tweet
//

function uploadMedia(b64Image, altText) {
  return new Promise(function (resolve, reject) {
    // first we must post the media to Twitter
    Twitter.post('media/upload', {
      media_data: b64Image
    }, function (err, data, response) {
      if (err) {
        console.error(err);
        reject(new Error("Media upload failed."));
        return;
      } // now we can assign alt text to the media, for use by screen readers and
      // other text-based presentations and interpreters


      var mediaIdStr = data.media_id_string;
      var meta_params = {
        media_id: mediaIdStr,
        alt_text: {
          text: altText
        }
      };
      Twitter.post('media/metadata/create', meta_params, function (err, data, response) {
        if (err) {
          console.error(err);
          reject(new Error("Media upload succeeded, media creation failed."));
        } // now we can reference the media and post a tweet (media will attach to the tweet)


        resolve(mediaIdStr);
      });
    });
  });
}

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("twit");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("urlencode");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var DB = __webpack_require__(0);

var upload = __webpack_require__(16)({
  dest: 'uploads/'
});

module.exports = function (app) {
  // CORS
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Max-Age', '86400'); // 24 hours

    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  app.get('/api/live', function (req, res) {
    res.json(DB.getLiveQuestions());
  });
  app.get('/api/scores', function (req, res) {
    DB.getScores(req, res);
  });
  app.get('/api/cards/:ids', function (req, res) {
    DB.getCards(req, res);
  }); // TODO - Delete this endpoint if not needed

  app.get('/api/score/:handle', function (req, res) {
    DB.getScore(req, res);
  });
  app.get('/api/cards/old', function (req, res) {
    DB.getOldCards(req, res);
  }); // TODO - add authentication to following endpoints

  app.post('/deck/new', upload.single('zipfile'), function (req, res) {
    DB.addDeck(req, res);
  });
  app.post('/scores/edit', function (req, res) {
    DB.adjustScore(req, res);
  });
  app.get('/cards/new', function (req, res) {
    DB.getNewCards(req, res);
  });
}; // module.exports

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("multer");

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTg1ZjVkN2I0NTQ4MDE4M2RjYWEiLCJ3ZWJwYWNrOi8vLy4vc3JjL3R3aXR0ZXJDb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3V0aWxzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXBvbHlmaWxsXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJkb3RlbnZcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJvZHktcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3R3aXR0ZXJCb3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy90d2l0dGVyVXRpbHMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidHdpdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInVybGVuY29kZVwiIiwid2VicGFjazovLy8uL3NyYy9hcGkuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibXVsdGVyXCIiXSwibmFtZXMiOlsidHdpdCIsInJlcXVpcmUiLCJwcm9jZXNzIiwiZW52IiwiVFdJVFRFUl9BUElfS0VZIiwiVFdJVFRFUl9BUElfU0VDUkVUIiwiVFdJVFRFUl9UT0tFTiIsIlRXSVRURVJfVE9LRU5fU0VDUkVUIiwiVFdJVFRFUl9BQ0NPVU5UIiwidXNlckNvbmZpZyIsImNvbnN1bWVyX2tleSIsImNvbnN1bWVyX3NlY3JldCIsImFjY2Vzc190b2tlbiIsImFjY2Vzc190b2tlbl9zZWNyZXQiLCJtb2R1bGUiLCJleHBvcnRzIiwidXJsZW5jb2RlIiwiV0VCTE9PS1VQX1VSTCIsIkhPVVJTIiwiZm9ybWF0UXVlc3Rpb25BbHRUZXh0IiwiZXhwcmVzc2lvbiIsImhpbnQiLCJmb3JtYXRIaW50IiwibWluTWF4Q2hhcnMiLCJtaW4iLCJtYXgiLCJtaW5NYXgiLCJzIiwic2NyZWVuUmVhZGVySGludCIsInJlcGxhY2UiLCJmb3JtYXRRdWVzdGlvblRleHQiLCJlbmdNZWFuaW5nIiwibm90ZXMiLCJjYXJkSUQiLCJ0d2VldFRleHQiLCJuZWVkc0hpbnQiLCJmb3JtYXRBbnN3ZXJBbHRUZXh0IiwiZm9ybWF0QW5zd2VyVGV4dCIsImFuc3dlcnMiLCJ3ZWJMb29rdXAiLCJjYXJkSWQiLCJsZW5ndGgiLCJhbnN3ZXJUZXh0Iiwiam9pbiIsImFkZFF1ZXN0aW9uTGluayIsInF1ZXN0aW9uSWQiLCJxdWVzdGlvbkxpbmsiLCJsaW5lcyIsInNwbGl0Iiwic3BsaWNlIiwiZ2V0QW5zd2VycyIsImFsdEFuc3dlcnMiLCJhY2NlcHRlZEFuc3dlciIsIm1hdGNoIiwib3RoZXJBbnN3ZXJzIiwiY29uY2F0IiwiY2FsY3VsYXRlU2NvcmUiLCJhbnN3ZXJQb3N0ZWRBdCIsInF1ZXN0aW9uUG9zdGVkQXQiLCJhbHJlYWR5QW5zd2VyZWQiLCJ0aW1lVG9BbnN3ZXIiLCJNYXRoIiwiZmxvb3IiLCJEYXRlIiwic2NvcmUiLCJleHRyYWN0QW5zd2VyIiwidGV4dCIsInRyaW0iLCJzbGljZSIsImdldFRpbWVVbnRpbCIsImhvdXIiLCJub3ciLCJtaWxsaXNVbnRpbFRpbWUiLCJnZXRGdWxsWWVhciIsImdldE1vbnRoIiwiZ2V0RGF0ZSIsInRyeUNhdGNoIiwicHJvbWlzZSIsInRoZW4iLCJkYXRhIiwiY2F0Y2giLCJjb25zb2xlIiwiZXJyb3IiLCJlcnIiLCJjb250YWlucyIsIml0ZW0iLCJsaXN0IiwidmFsaWQiLCJpbmRleE9mIiwiaW5kZXgiLCJtYXhDaGFycyIsIm1pc3NpbmdDaGFyUmVnZXgiLCJtaXNzaW5nQ2hhcnMiLCJnaW1tZUNoYXJzIiwibWluQ2hhcnMiLCJvcHRpb25hbENoYXJzIiwibGVnZW5kIiwibm9ybWFsaXplZCIsImdyb3VwTXVsdGlYcyIsImdyb3VwWHMiLCJncm91cFF1ZXN0aW9uTWFya3MiLCJmbGF0dGVuIiwibWFwIiwiZ3JvdXAiLCJ0ZXN0IiwicmVzdWx0IiwibnVtQ2hhcnMiLCJOdW1iZXIiLCJpIiwicHVzaCIsIm5lZ2F0ZWRDaGFycyIsInN0cmluZyIsInAxIiwic3RyIiwic2NhbGFyIiwidiIsIkFycmF5IiwiaXNBcnJheSIsImRlZXAiLCJmbGF0IiwiaGVhZCIsInRhaWwiLCJjb25maWciLCJleHByZXNzIiwiYXBwIiwicGF0aCIsImJvZHlQYXJzZXIiLCJ0d2l0dGVyQm90Iiwic2V0IiwiUE9SVCIsInVzZSIsInN0YXRpYyIsInJlc29sdmUiLCJfX2Rpcm5hbWUiLCJqc29uIiwibGlzdGVuIiwiZ2V0IiwibG9nIiwiREIiLCJnZXRGb2xsb3dpbmciLCJwb3N0TWVkaWEiLCJUd2l0dGVyIiwiQU5TV0VSX0lOVEVSVkFMIiwiUVVFU1RJT05fSU5URVJWQUwiLCJzdGFydCIsIm9wZW5TdHJlYW0iLCJzZXRJbnRlcnZhbCIsInR3ZWV0UmFuZG9tUXVlc3Rpb24iLCJzZXRTdGFydFRpbWVzIiwidGltZVVudGlsN1BNIiwidGltZVVudGlsTWlkbmlnaHQiLCJzZXRUaW1lb3V0Iiwid2Vla2x5TW9udGhseVJlc2V0IiwiZ2V0UmFuZG9tUXVlc3Rpb24iLCJxdWVzdGlvblRleHQiLCJxdWVzdGlvbkltZyIsInF1ZXN0aW9uQWx0VGV4dCIsInByZXZMaW5lSW1nIiwicHJldkxpbmVBbHRUZXh0IiwibWVkaWFVcmxzIiwibGl2ZVF1ZXN0aW9uIiwiY2FjaGVkUG9pbnRzIiwiYWRkTGl2ZVF1ZXN0aW9uIiwidHdlZXRBbnN3ZXIiLCJyZXZlYWxBbnN3ZXJXb3JrZmxvdyIsImFuc3dlckltZyIsImFuc3dlckFsdFRleHQiLCJhZGRNZWRpYVVybHNUb0NhcmQiLCJzdHJlYW0iLCJ0cmFjayIsIm9uIiwiaW5fcmVwbHlfdG9fc3RhdHVzX2lkX3N0ciIsImNyZWF0ZWRfYXQiLCJ1c2VyIiwidXNlcklkIiwiaWQiLCJuYW1lIiwiaGFuZGxlIiwic2NyZWVuX25hbWUiLCJhdmF0YXIiLCJwcm9maWxlX2ltYWdlX3VybF9odHRwcyIsInByb2ZpbGVCYW5uZXIiLCJwcm9maWxlX2Jhbm5lcl91cmwiLCJnZXRMaXZlUXVlc3Rpb25zIiwibGl2ZVF1ZXN0aW9ucyIsImZvdW5kUXVlc3Rpb24iLCJmaWx0ZXIiLCJvYmoiLCJhY2NlcHRlZEFuc3dlcnMiLCJ1c2VyQW5zd2VyIiwicG9pbnRzIiwiZm9sbG93aW5nIiwibmV3VXNlciIsIm1vbnRobHlTY29yZSIsIndlZWtseVNjb3JlIiwiY29ycmVjdEFuc3dlcnMiLCJhZGRPclVwZGF0ZVVzZXIiLCJ1cGRhdGVMaXZlUXVlc3Rpb24iLCJkaXNjb25uZWN0TXNnIiwicmVzZXRXZWVrbHlTY29yZSIsImdldERheSIsInJlc2V0TW9udGhseVNjb3JlIiwidHdpdHRlclV0aWxzIiwidXRpbHMiLCJzdGF0dXMiLCJiNjRJbWFnZTEiLCJhbHRUZXh0MSIsImI2NEltYWdlMiIsImFsdFRleHQyIiwiUHJvbWlzZSIsInJlamVjdCIsInVwbG9hZE1lZGlhIiwibWVkaWFJZDEiLCJtZWRpYV9pZHMiLCJtZWRpYUlkMiIsInVuc2hpZnQiLCJwYXJhbXMiLCJ0d2VldF9tb2RlIiwiaW5jbHVkZV9leHRfYWx0X3RleHQiLCJwb3N0IiwicmVzcG9uc2UiLCJFcnJvciIsImV4dGVuZGVkX2VudGl0aWVzIiwibWVkaWEiLCJpbWFnZSIsIm1lZGlhX3VybF9odHRwcyIsImFsdFRleHQiLCJleHRfYWx0X3RleHQiLCJpZF9zdHIiLCJpZHMiLCJiNjRJbWFnZSIsIm1lZGlhX2RhdGEiLCJtZWRpYUlkU3RyIiwibWVkaWFfaWRfc3RyaW5nIiwibWV0YV9wYXJhbXMiLCJtZWRpYV9pZCIsImFsdF90ZXh0IiwidXBsb2FkIiwiZGVzdCIsInJlcSIsInJlcyIsIm5leHQiLCJoZWFkZXIiLCJnZXRTY29yZXMiLCJnZXRDYXJkcyIsImdldFNjb3JlIiwiZ2V0T2xkQ2FyZHMiLCJzaW5nbGUiLCJhZGREZWNrIiwiYWRqdXN0U2NvcmUiLCJnZXROZXdDYXJkcyJdLCJt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LEVBQWM7QUFDckN0RyxPQUFHK0csV0FBSCxDQUFlVixHQUFmLEVBQW9CQyxHQUFwQjtBQUNELEdBRkQ7QUFJQXBILE1BQUlZLEdBQUosQ0FBUSxZQUFSLEVBQXNCLFVBQUN1RyxHQUFELEVBQU1DLEdBQU4sRUFBYztBQUNsQ3RHLE9BQUdnSCxXQUFILENBQWVYLEdBQWYsRUFBb0JDLEdBQXBCO0FBQ0QsR0FGRDtBQUlELENBaERELEMsQ0FnREUsaUI7Ozs7OztBQ25ERixtQyIsImZpbGUiOiJzZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBlODVmNWQ3YjQ1NDgwMTgzZGNhYSIsImNvbnN0IHR3aXQgPSByZXF1aXJlKCd0d2l0Jyk7XG5jb25zdCB7XG4gIFRXSVRURVJfQVBJX0tFWSxcbiAgVFdJVFRFUl9BUElfU0VDUkVULFxuICBUV0lUVEVSX1RPS0VOLFxuICBUV0lUVEVSX1RPS0VOX1NFQ1JFVCxcbiAgVFdJVFRFUl9BQ0NPVU5UXG59ID0gcHJvY2Vzcy5lbnY7XG5cbi8vIGNvbnN0IGFwcENvbmZpZyA9IHtcbi8vICAgY29uc3VtZXJfa2V5OiBUV0lUVEVSX0FQSV9LRVksXG4vLyAgIGNvbnN1bWVyX3NlY3JldDogVFdJVFRFUl9BUElfU0VDUkVULFxuLy8gICBhcHBfb25seV9hdXRoOiB0cnVlXG4vLyB9XG5cbmNvbnN0IHVzZXJDb25maWcgPSB7XG4gIGNvbnN1bWVyX2tleTogVFdJVFRFUl9BUElfS0VZLFxuICBjb25zdW1lcl9zZWNyZXQ6IFRXSVRURVJfQVBJX1NFQ1JFVCxcbiAgYWNjZXNzX3Rva2VuOiBUV0lUVEVSX1RPS0VOLFxuICBhY2Nlc3NfdG9rZW5fc2VjcmV0OiBUV0lUVEVSX1RPS0VOX1NFQ1JFVFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgdHdpdCh1c2VyQ29uZmlnKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy90d2l0dGVyQ29uZmlnLmpzIiwiY29uc3QgdXJsZW5jb2RlID0gcmVxdWlyZSgndXJsZW5jb2RlJyk7XG5jb25zdCBXRUJMT09LVVBfVVJMID0gJ2h0dHBzOi8vZWpqZS53ZWJsaW8uanAvY29udGVudC8nO1xuY29uc3QgeyBUV0lUVEVSX0FDQ09VTlQgfSA9IHByb2Nlc3MuZW52O1xuXG5jb25zdCBIT1VSUyA9IDM2MDAwMDA7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gIEhPVVJTLFxuXG4gIGZvcm1hdFF1ZXN0aW9uQWx0VGV4dChleHByZXNzaW9uKSB7XG4gICAgY29uc3QgaGludCA9IGZvcm1hdEhpbnQoZXhwcmVzc2lvbik7XG4gICAgY29uc3QgW21pbiwgbWF4XSA9IG1pbk1heENoYXJzKGhpbnQpO1xuICAgIGNvbnN0IG1pbk1heCA9IG1pbiA9PT0gbWF4ID8gbWluIDogYCR7bWlufSB0byAke21heH1gO1xuICAgIGNvbnN0IHMgPSBtYXggPiAxID8gJ3MnIDogJyc7XG4gICAgY29uc3Qgc2NyZWVuUmVhZGVySGludCA9IGAoJHttaW5NYXh9IGNoYXJhY3RlciR7c30pYDtcbiAgICByZXR1cm4gZXhwcmVzc2lvbi5yZXBsYWNlKC9cXHtcXHsuKz9cXH1cXH0vZywgc2NyZWVuUmVhZGVySGludCk7XG4gIH0sXG5cbiAgZm9ybWF0UXVlc3Rpb25UZXh0KGV4cHJlc3Npb24sIGVuZ01lYW5pbmcsIG5vdGVzLCBjYXJkSUQpIHtcbiAgICBjb25zdCBoaW50ID0gZm9ybWF0SGludChleHByZXNzaW9uKTtcbiAgICBjb25zdCBbbWluLCBtYXhdID0gbWluTWF4Q2hhcnMoaGludCk7XG4gICAgY29uc3QgbWluTWF4ID0gbWluID09PSBtYXggPyBtaW4gOiBgJHttaW59LSR7bWF4fWA7XG4gICAgbGV0IHR3ZWV0VGV4dCA9IGBXaGF0ICR7bWluTWF4fSBjaGFyYWN0ZXIgYW5zd2VyIG1lYW5zIFwiJHtlbmdNZWFuaW5nfVwiP2A7XG4gICAgaWYgKG5lZWRzSGludChoaW50KSlcbiAgICAgIHR3ZWV0VGV4dCArPSBgXFxuSGludDogJHtoaW50fWA7XG5cbiAgICBpZiAobm90ZXMpIHR3ZWV0VGV4dCArPSBgXFxuTm90ZXM6ICR7bm90ZXN9YDtcblxuICAgIHR3ZWV0VGV4dCArPSBgXFxuUUlEJHtjYXJkSUR9YDtcbiAgICByZXR1cm4gdHdlZXRUZXh0O1xuICB9LFxuXG4gIGZvcm1hdEFuc3dlckFsdFRleHQoZXhwcmVzc2lvbikge1xuICAgIHJldHVybiBleHByZXNzaW9uLnJlcGxhY2UoL1xce1xcey4qP1xcOlxcOiguKz8pXFw6XFw6Lio/XFx9XFx9L2csICckMScpO1xuICB9LFxuXG4gIGZvcm1hdEFuc3dlclRleHQoYW5zd2VycywgZW5nTWVhbmluZywgd2ViTG9va3VwLCBjYXJkSWQpIHtcbiAgICBjb25zdCBzID0gYW5zd2Vycy5sZW5ndGggPiAxID8gJ3MnIDogJyc7XG4gICAgbGV0IGFuc3dlclRleHQgPSBgQW5zd2VyJHtzfTogJHthbnN3ZXJzLmpvaW4oJywgJyl9YDtcbiAgICBhbnN3ZXJUZXh0ICs9IGBcXG5FbmdsaXNoIE1lYW5pbmc6IFwiJHtlbmdNZWFuaW5nfVwiYDtcbiAgICBhbnN3ZXJUZXh0ICs9ICdcXG5EZWZpbml0aW9uOiAnICsgV0VCTE9PS1VQX1VSTCArIHVybGVuY29kZSh3ZWJMb29rdXApO1xuICAgIGFuc3dlclRleHQgKz0gYFxcblFJRCR7Y2FyZElkfWA7XG4gICAgcmV0dXJuIGFuc3dlclRleHQ7XG4gIH0sXG5cbiAgYWRkUXVlc3Rpb25MaW5rKGFuc3dlclRleHQsIHF1ZXN0aW9uSWQpIHtcbiAgICBjb25zdCBxdWVzdGlvbkxpbmsgPSBgUXVlc3Rpb246IHR3aXR0ZXIuY29tLyR7VFdJVFRFUl9BQ0NPVU5UfS9zdGF0dXMvJHtxdWVzdGlvbklkfWA7XG4gICAgY29uc3QgbGluZXMgPSBhbnN3ZXJUZXh0LnNwbGl0KCdcXG4nKTtcbiAgICBsaW5lcy5zcGxpY2UoLTEsIDAsIHF1ZXN0aW9uTGluayk7XG4gICAgcmV0dXJuIGxpbmVzLmpvaW4oJ1xcbicpO1xuICB9LFxuXG4gIGdldEFuc3dlcnMoZXhwcmVzc2lvbiwgYWx0QW5zd2Vycykge1xuICAgIGNvbnN0IGFjY2VwdGVkQW5zd2VyID0gZXhwcmVzc2lvbi5tYXRjaCgvXFw6XFw6KC4rPylcXDpcXDovKVsxXTtcbiAgICBsZXQgb3RoZXJBbnN3ZXJzID0gW107XG4gICAgaWYgKGFsdEFuc3dlcnMgJiYgYWx0QW5zd2Vycy5sZW5ndGggPiAwKVxuICAgICAgb3RoZXJBbnN3ZXJzID0gYWx0QW5zd2Vycy5zcGxpdCgnLCcpO1xuXG4gICAgcmV0dXJuIFthY2NlcHRlZEFuc3dlcl0uY29uY2F0KG90aGVyQW5zd2Vycyk7XG4gIH0sXG5cbiAgY2FsY3VsYXRlU2NvcmUoYW5zd2VyUG9zdGVkQXQsIHtxdWVzdGlvblBvc3RlZEF0LCBhbHJlYWR5QW5zd2VyZWR9KSB7XG4gICAgY29uc3QgdGltZVRvQW5zd2VyID0gTWF0aC5mbG9vcihcbiAgICAgIChuZXcgRGF0ZShhbnN3ZXJQb3N0ZWRBdCkgLSBuZXcgRGF0ZShxdWVzdGlvblBvc3RlZEF0KSkgLyBIT1VSU1xuICAgICk7XG4gICAgY29uc3Qgc2NvcmUgPSAyNCAtIHRpbWVUb0Fuc3dlcjtcblxuICAgIHJldHVybiBNYXRoLm1heChzY29yZSwgMCk7XG4gIH0sXG5cbiAgZXh0cmFjdEFuc3dlcih0ZXh0KSB7XG4gICAgcmV0dXJuIHRleHQudHJpbSgpLnNsaWNlKFRXSVRURVJfQUNDT1VOVC5sZW5ndGggKyAyKTtcbiAgfSxcblxuICBnZXRUaW1lVW50aWwoaG91cikge1xuICAgIC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQ0NTUyODIvY2FsbC1hLWphdmFzY3JpcHQtZnVuY3Rpb24tYXQtYS1zcGVjaWZpYy10aW1lLW9mLWRheVxuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgbWlsbGlzVW50aWxUaW1lID0gbmV3IERhdGUoXG4gICAgICBub3cuZ2V0RnVsbFllYXIoKSxcbiAgICAgIG5vdy5nZXRNb250aCgpLFxuICAgICAgbm93LmdldERhdGUoKSxcbiAgICAgIGhvdXIsIDAsIDAsIDApIC0gbm93O1xuXG4gICAgaWYgKG1pbGxpc1VudGlsVGltZSA8IDApIC8vIGFscmVhZHkgcGFzc2VkIGZvciB0b2RheSwgd2FpdCB1bnRpbCB0b21vcnJvd1xuICAgICAgbWlsbGlzVW50aWxUaW1lICs9IDI0KkhPVVJTO1xuXG4gICAgcmV0dXJuIG1pbGxpc1VudGlsVGltZTtcbiAgfSxcblxuICB0cnlDYXRjaChwcm9taXNlKSB7XG4gICByZXR1cm4gcHJvbWlzZVxuICAgICAudGhlbihkYXRhID0+IGRhdGEpXG4gICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yOicsZXJyKTtcbiAgICAgICByZXR1cm4ge307XG4gICAgIH0pO1xuICB9LFxuXG4gIGNvbnRhaW5zKGl0ZW0sIGxpc3QpIHtcbiAgICByZXR1cm4gdmFsaWQobGlzdC5pbmRleE9mKGl0ZW0pKTtcbiAgfVxuXG59IC8vIG1vZHVsZS5leHBvcnRzXG5cblxuZnVuY3Rpb24gdmFsaWQoaW5kZXgpIHtcbiAgcmV0dXJuIGluZGV4ICE9PSAtMTtcbn1cblxuZnVuY3Rpb24gbmVlZHNIaW50KGhpbnQpIHtcbiAgcmV0dXJuIGhpbnQucmVwbGFjZSgvXFxbXFxdL2csICcnKS50cmltKCkubGVuZ3RoICE9PSAwO1xufVxuXG5mdW5jdGlvbiBtYXhDaGFycyhoaW50KSB7XG4gIGNvbnN0IG1pc3NpbmdDaGFyUmVnZXggPSAvXFxbLio/XFxdL2c7XG4gIGNvbnN0IG1pc3NpbmdDaGFycyA9IChoaW50Lm1hdGNoKG1pc3NpbmdDaGFyUmVnZXgpIHx8IFtdKS5sZW5ndGhcbiAgY29uc3QgZ2ltbWVDaGFycyA9IGhpbnQucmVwbGFjZShtaXNzaW5nQ2hhclJlZ2V4LCAnJykucmVwbGFjZSgvW1xccytcXChcXCldL2csICcnKS5sZW5ndGg7XG5cbiAgcmV0dXJuIG1pc3NpbmdDaGFycyArIGdpbW1lQ2hhcnM7XG59XG5cbmZ1bmN0aW9uIG1pbkNoYXJzKGhpbnQpIHtcbiAgY29uc3Qgb3B0aW9uYWxDaGFycyA9IChoaW50Lm1hdGNoKC9cXD8vZykgfHwgW10pLmxlbmd0aFxuICByZXR1cm4gbWF4Q2hhcnMoaGludCkgLSBvcHRpb25hbENoYXJzO1xufVxuXG5mdW5jdGlvbiBtaW5NYXhDaGFycyhoaW50KSB7XG4gIHJldHVybiBbbWluQ2hhcnMoaGludCksIG1heENoYXJzKGhpbnQpXTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0SGludChleHByZXNzaW9uKSB7XG4gIGNvbnN0IGxlZ2VuZCA9IGV4cHJlc3Npb24ubWF0Y2goL1xcOlxcOi4rP1xcOlxcOiguKz8pXFx9XFx9LylbMV07XG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBncm91cE11bHRpWHMoZ3JvdXBYcyhncm91cFF1ZXN0aW9uTWFya3MobGVnZW5kKSkpO1xuXG4gIHJldHVybiBmbGF0dGVuKHNwbGl0KG5vcm1hbGl6ZWQpKS5tYXAoZ3JvdXAgPT4ge1xuICAgIGlmIChncm91cCA9PT0gJy4nKVxuICAgICAgcmV0dXJuICdbXSc7XG5cbiAgICBpZiAoZ3JvdXAgPT09ICctJylcbiAgICAgIHJldHVybiAnW10gW10gW10gW10gW10nXG5cbiAgICBpZiAoL1xcPy8udGVzdChncm91cCkpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgICAgY29uc3QgbnVtQ2hhcnMgPSBOdW1iZXIoZ3JvdXAubWF0Y2goL1xcZCsvKVswXSlcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtQ2hhcnM7IGkrKylcbiAgICAgICAgcmVzdWx0LnB1c2goJ1s/XScpXG5cbiAgICAgIGlmIChyZXN1bHQubGVuZ3RoID09PSAxKVxuICAgICAgICByZXR1cm4gJ1s/XSc7XG5cbiAgICAgIHJldHVybiAnKCcgKyByZXN1bHQuam9pbignICcpICsgJyknXG4gICAgfVxuXG4gICAgaWYgKC/iiaAvLnRlc3QoZ3JvdXApKSB7XG4gICAgICBjb25zdCBuZWdhdGVkQ2hhcnMgPSBncm91cC5yZXBsYWNlKC/iiaAvZywgJycpO1xuICAgICAgcmV0dXJuIGBb4omgJHtuZWdhdGVkQ2hhcnN9XWBcbiAgICB9XG4gICAgLy8gZWxzZSAoY2hhcmFjdGVyIGdpbW1lKVxuICAgIHJldHVybiBncm91cDtcbiAgfSkuam9pbignICcpO1xufVxuXG5mdW5jdGlvbiBncm91cFF1ZXN0aW9uTWFya3Moc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcucmVwbGFjZSgvKFxcPyspL2csIChtYXRjaCwgcDEpID0+IGAoJHtwMS5sZW5ndGh9PylgKTtcbn1cblxuZnVuY3Rpb24gZ3JvdXBYcyhzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC/iiaBbXihdL2csICcoJCYpJyk7XG59XG5cbmZ1bmN0aW9uIGdyb3VwTXVsdGlYcyhzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC/iiaBcXCgoLiopXFwpL2csICco4omgJDEpJylcbn1cblxuZnVuY3Rpb24gc3BsaXQoc3RyKSB7XG4gIHJldHVybiBzdHIuc3BsaXQoL1tcXChcXCldLylcbiAgICAgICAgICAgIC5tYXAoZ3JvdXAgPT5cbiAgICAgICAgICAgICAgL1xcP3ziiaAvLnRlc3QoZ3JvdXApXG4gICAgICAgICAgICAgID8gZ3JvdXBcbiAgICAgICAgICAgICAgOiBncm91cC5zcGxpdCgnJylcbiAgICAgICAgICAgICk7XG59XG5cbmZ1bmN0aW9uIHNjYWxhcih2KSB7XG4gIHJldHVybiAhQXJyYXkuaXNBcnJheSh2KTtcbn1cblxuZnVuY3Rpb24gZmxhdHRlbihkZWVwLCBmbGF0ID0gW10pIHtcbiAgaWYgKGRlZXAubGVuZ3RoID09PSAwKVxuICAgIHJldHVybiBmbGF0O1xuXG4gIGxldCBbaGVhZCwgLi4udGFpbF0gPSBkZWVwO1xuICByZXR1cm4gc2NhbGFyKGhlYWQpXG4gICAgPyBmbGF0dGVuKHRhaWwsIGZsYXQuY29uY2F0KGhlYWQpKVxuICAgIDogZmxhdHRlbih0YWlsLCBmbGF0LmNvbmNhdChmbGF0dGVuKGhlYWQpKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbHMvdXRpbHMuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1wb2x5ZmlsbFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImJhYmVsLXBvbHlmaWxsXCJcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09ICdkZXYnKVxuICByZXF1aXJlKCdkb3RlbnYnKS5jb25maWcoKTtcblxuY29uc3QgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCBib2R5UGFyc2VyID0gcmVxdWlyZSgnYm9keS1wYXJzZXInKTtcbmNvbnN0IHR3aXR0ZXJCb3QgPSByZXF1aXJlKCcuL3R3aXR0ZXJCb3QnKTtcblxuYXBwLnNldCgncG9ydCcsIChwcm9jZXNzLmVudi5QT1JUIHx8IDMwMDApKTtcbmFwcC51c2UoZXhwcmVzcy5zdGF0aWMocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uL2Rpc3QnKSkpO1xuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XG5cbnJlcXVpcmUoJy4vYXBpJykoYXBwKTtcblxuLy90d2l0dGVyQm90LnN0YXJ0KCk7XG5cbmFwcC5saXN0ZW4oYXBwLmdldCgncG9ydCcpLCAoKSA9PlxuICBjb25zb2xlLmxvZygnTGlzdGVuaW5nIG9uIHBvcnQnLCBhcHAuZ2V0KCdwb3J0JykpXG4pO1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBhcHA7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VydmVyLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZG90ZW52XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZG90ZW52XCJcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImV4cHJlc3NcIlxuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicGF0aFwiXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvZHktcGFyc2VyXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYm9keS1wYXJzZXJcIlxuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBEQiA9IHJlcXVpcmUoJy4vZGJPcHMnKTtcbmNvbnN0IHtcbiAgSE9VUlMsXG4gIGFkZFF1ZXN0aW9uTGluayxcbiAgY2FsY3VsYXRlU2NvcmUsXG4gIGNvbnRhaW5zLFxuICBleHRyYWN0QW5zd2VyLFxuICBnZXRGb2xsb3dpbmcsXG4gIGdldFRpbWVVbnRpbCxcbiAgcG9zdE1lZGlhLFxuICB0cnlDYXRjaFxufSA9IHJlcXVpcmUoJ1V0aWxzJyk7XG5jb25zdCBUd2l0dGVyID0gcmVxdWlyZSgnLi90d2l0dGVyQ29uZmlnJyk7XG5jb25zdCB7IFRXSVRURVJfQUNDT1VOVCB9ID0gcHJvY2Vzcy5lbnY7XG5cbmNvbnN0IEFOU1dFUl9JTlRFUlZBTCA9IDIwMDA7XG5sZXQgUVVFU1RJT05fSU5URVJWQUwgPSA1MDAwO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc3RhcnQ6ICgpID0+IHtcbiAgICBvcGVuU3RyZWFtKCk7XG4gICAgc2V0SW50ZXJ2YWwodHdlZXRSYW5kb21RdWVzdGlvbiwgUVVFU1RJT05fSU5URVJWQUwpXG4gIH1cbiAgLy8gc3RhcnQ6ICgpID0+IHtcbiAgLy8gICBvcGVuU3RyZWFtKCk7XG4gIC8vICAgc2V0U3RhcnRUaW1lcygpO1xuICAvLyB9XG59O1xuXG5mdW5jdGlvbiBzZXRTdGFydFRpbWVzKCkge1xuICBjb25zdCB0aW1lVW50aWw3UE0gPSBnZXRUaW1lVW50aWwoMTkpO1xuICBjb25zdCB0aW1lVW50aWxNaWRuaWdodCA9IGdldFRpbWVVbnRpbCgwKTtcblxuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBzZXRJbnRlcnZhbCh0d2VldFJhbmRvbVF1ZXN0aW9uLCBRVUVTVElPTl9JTlRFUlZBTCk7XG4gIH0sIHRpbWVVbnRpbDdQTSk7XG5cbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgc2V0SW50ZXJ2YWwod2Vla2x5TW9udGhseVJlc2V0LCAyNCpIT1VSUyk7XG4gIH0sIHRpbWVVbnRpbE1pZG5pZ2h0KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gdHdlZXRSYW5kb21RdWVzdGlvbigpIHtcbiAgY29uc3Qge1xuICAgIGNhcmRJZCxcbiAgICBxdWVzdGlvblRleHQsXG4gICAgcXVlc3Rpb25JbWcsXG4gICAgcXVlc3Rpb25BbHRUZXh0LFxuICAgIHByZXZMaW5lSW1nLFxuICAgIHByZXZMaW5lQWx0VGV4dCxcbiAgICBhbnN3ZXJzXG4gIH0gPSBhd2FpdCB0cnlDYXRjaChEQi5nZXRSYW5kb21RdWVzdGlvbigpKTtcbiAgaWYgKCFjYXJkSWQpIHJldHVybjtcblxuICBjb25zdCB7XG4gICAgcXVlc3Rpb25JZCxcbiAgICBxdWVzdGlvblBvc3RlZEF0LFxuICAgIG1lZGlhVXJsc1xuICB9ID0gYXdhaXQgdHJ5Q2F0Y2goXG4gICAgcG9zdE1lZGlhKFxuICAgICAgcXVlc3Rpb25UZXh0LFxuICAgICAgcXVlc3Rpb25JbWcsXG4gICAgICBxdWVzdGlvbkFsdFRleHQsXG4gICAgICBwcmV2TGluZUltZyxcbiAgICAgIHByZXZMaW5lQWx0VGV4dFxuICAgIClcbiAgKTtcblxuICBjb25zdCBsaXZlUXVlc3Rpb24gPSB7XG4gICAgY2FyZElkLFxuICAgIHF1ZXN0aW9uSWQsXG4gICAgYW5zd2VycyxcbiAgICBxdWVzdGlvblBvc3RlZEF0LFxuICAgIGNhY2hlZFBvaW50czogW10sXG4gICAgYWxyZWFkeUFuc3dlcmVkOiBbXVxuICB9O1xuICBEQi5hZGRMaXZlUXVlc3Rpb24obGl2ZVF1ZXN0aW9uLCBtZWRpYVVybHMpO1xuICBzZXRUaW1lb3V0KCgpID0+IHR3ZWV0QW5zd2VyKGNhcmRJZCwgcXVlc3Rpb25JZCksIEFOU1dFUl9JTlRFUlZBTCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHR3ZWV0QW5zd2VyKGNhcmRJZCwgcXVlc3Rpb25JZCkge1xuICBjb25zdCB7XG4gICAgYW5zd2VyVGV4dCxcbiAgICBhbnN3ZXJJbWcsXG4gICAgYW5zd2VyQWx0VGV4dFxuICB9ID0gYXdhaXQgdHJ5Q2F0Y2goXG4gICAgLy8gRUZGRUNUUzpcbiAgICAvLyAtIHJlbW92ZXMgcXVlc3Rpb24gZnJvbSBsaXZlUXVlc3Rpb25zXG4gICAgLy8gLSBhZGRzIGNhY2hlZCBwb2ludHMgdG8gc2NvcmVib2FyZFxuICAgIC8vXG4gICAgLy8gUkVUVVJOUzpcbiAgICAvLyBBbnN3ZXJDYXJkXG4gICAgREIucmV2ZWFsQW5zd2VyV29ya2Zsb3coY2FyZElkKVxuICApO1xuXG4gIGNvbnN0IHsgbWVkaWFVcmxzIH0gPSBhd2FpdCB0cnlDYXRjaChcbiAgICBwb3N0TWVkaWEoXG4gICAgICBhZGRRdWVzdGlvbkxpbmsoYW5zd2VyVGV4dCwgcXVlc3Rpb25JZCksXG4gICAgICBhbnN3ZXJJbWcsXG4gICAgICBhbnN3ZXJBbHRUZXh0XG4gICAgKVxuICApO1xuXG4gIERCLmFkZE1lZGlhVXJsc1RvQ2FyZChjYXJkSWQsIG1lZGlhVXJscyk7XG59XG5cbmZ1bmN0aW9uIG9wZW5TdHJlYW0oKSB7XG4gIGNvbnN0IHN0cmVhbSA9IFR3aXR0ZXIuc3RyZWFtKCdzdGF0dXNlcy9maWx0ZXInLCB7IHRyYWNrOiBgQCR7VFdJVFRFUl9BQ0NPVU5UfWAgfSk7XG5cbiAgc3RyZWFtLm9uKCd0d2VldCcsIGFzeW5jICh7XG4gICAgaW5fcmVwbHlfdG9fc3RhdHVzX2lkX3N0cjogcXVlc3Rpb25JZCxcbiAgICBjcmVhdGVkX2F0OiBhbnN3ZXJQb3N0ZWRBdCxcbiAgICB0ZXh0LFxuICAgIHVzZXI6IHtcbiAgICAgIGlkOiB1c2VySWQsXG4gICAgICBuYW1lLFxuICAgICAgc2NyZWVuX25hbWU6IGhhbmRsZSxcbiAgICAgIHByb2ZpbGVfaW1hZ2VfdXJsX2h0dHBzOiBhdmF0YXIsXG4gICAgICBwcm9maWxlX2Jhbm5lcl91cmw6IHByb2ZpbGVCYW5uZXJcbiAgICB9XG4gIH0pID0+IHtcbiAgICBjb25zdCBsaXZlUXVlc3Rpb25zID0gYXdhaXQgdHJ5Q2F0Y2goREIuZ2V0TGl2ZVF1ZXN0aW9ucygpKTtcbiAgICBjb25zdCBmb3VuZFF1ZXN0aW9uID0gbGl2ZVF1ZXN0aW9ucy5maWx0ZXIoXG4gICAgICBvYmogPT4gb2JqLnF1ZXN0aW9uSWQgPT09IHF1ZXN0aW9uSWRcbiAgICApWzBdO1xuXG4gICAgaWYgKGZvdW5kUXVlc3Rpb24pIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgYWxyZWFkeUFuc3dlcmVkLFxuICAgICAgICBhbnN3ZXJzOiBhY2NlcHRlZEFuc3dlcnNcbiAgICAgIH0gPSBmb3VuZFF1ZXN0aW9uO1xuICAgICAgaWYgKGNvbnRhaW5zKHVzZXJJZCwgYWxyZWFkeUFuc3dlcmVkKSlcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgICBjb25zdCB1c2VyQW5zd2VyID0gZXh0cmFjdEFuc3dlcih0ZXh0KTtcbiAgICAgIGlmIChjb250YWlucyh1c2VyQW5zd2VyLCBhY2NlcHRlZEFuc3dlcnMpKSB7XG4gICAgICAgIGNvbnN0IHBvaW50cyA9IGNhbGN1bGF0ZVNjb3JlKGFuc3dlclBvc3RlZEF0LCBmb3VuZFF1ZXN0aW9uKTtcbiAgICAgICAgY29uc3QgZm9sbG93aW5nID0gYXdhaXQgdHJ5Q2F0Y2goZ2V0Rm9sbG93aW5nKHVzZXJJZCkpO1xuICAgICAgICBjb25zdCBuZXdVc2VyID0ge1xuICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIGhhbmRsZSxcbiAgICAgICAgICBhdmF0YXIsXG4gICAgICAgICAgcHJvZmlsZUJhbm5lcixcbiAgICAgICAgICBmb2xsb3dpbmcsXG4gICAgICAgICAgc2NvcmU6IDAsXG4gICAgICAgICAgbW9udGhseVNjb3JlOiAwLFxuICAgICAgICAgIHdlZWtseVNjb3JlOiAwLFxuICAgICAgICAgIGNvcnJlY3RBbnN3ZXJzOiBbXVxuICAgICAgICB9O1xuICAgICAgICBEQi5hZGRPclVwZGF0ZVVzZXIobmV3VXNlcik7XG4gICAgICAgIERCLnVwZGF0ZUxpdmVRdWVzdGlvbihxdWVzdGlvbklkLCB7IHVzZXJJZCwgcG9pbnRzIH0pO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBEQi51cGRhdGVMaXZlUXVlc3Rpb24ocXVlc3Rpb25JZCwgeyB1c2VySWQsIHBvaW50czogMCB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHN0cmVhbS5vbignZGlzY29ubmVjdCcsIChkaXNjb25uZWN0TXNnKSA9PiB7XG4gICAgY29uc29sZS5lcnJvcignVHdlZXQgc3RyZWFtIGRpc2Nvbm5lY3RlZDonLCBkaXNjb25uZWN0TXNnKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHN0cmVhbS5zdGFydCgpLCAxMDApO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gd2Vla2x5TW9udGhseVJlc2V0KCkge1xuICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICBjb25zdCByZXNldFdlZWtseVNjb3JlID0gbm93LmdldERheSgpID09PSAwO1xuICBjb25zdCByZXNldE1vbnRobHlTY29yZSA9IG5vdy5nZXREYXRlKCkgPT09IDE7XG5cbiAgaWYgKHJlc2V0V2Vla2x5U2NvcmUgfHwgcmVzZXRNb250aGx5U2NvcmUpXG4gICAgREIud2Vla2x5TW9udGhseVJlc2V0KHJlc2V0V2Vla2x5U2NvcmUsIHJlc2V0TW9udGhseVNjb3JlKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy90d2l0dGVyQm90LmpzIiwiY29uc3QgdHdpdHRlclV0aWxzID0gcmVxdWlyZSgnLi90d2l0dGVyVXRpbHMnKTtcbmNvbnN0IHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLi4udHdpdHRlclV0aWxzLFxuICAuLi51dGlsc1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWxzL2luZGV4LmpzIiwiY29uc3QgVHdpdHRlciA9IHJlcXVpcmUoJy4uL3R3aXR0ZXJDb25maWcnKTtcbmNvbnN0IHsgdHJ5Q2F0Y2ggfSA9IHJlcXVpcmUoJ1V0aWxzL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gIC8vXG4gIC8vIHBvc3QgYSB0d2VldCB3aXRoIG1lZGlhXG4gIC8vXG4gIHBvc3RNZWRpYShzdGF0dXMsIGI2NEltYWdlMSwgYWx0VGV4dDEsIGI2NEltYWdlMiwgYWx0VGV4dDIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgbWVkaWFJZDEgPSBhd2FpdCB0cnlDYXRjaCh1cGxvYWRNZWRpYShiNjRJbWFnZTEsIGFsdFRleHQxKSk7XG4gICAgICBjb25zdCBtZWRpYV9pZHMgPSBbbWVkaWFJZDFdO1xuICAgICAgaWYgKGI2NEltYWdlMikge1xuICAgICAgICBjb25zdCBtZWRpYUlkMiA9IGF3YWl0IHRyeUNhdGNoKHVwbG9hZE1lZGlhKGI2NEltYWdlMiwgYWx0VGV4dDIpKTtcbiAgICAgICAgbWVkaWFfaWRzLnVuc2hpZnQobWVkaWFJZDIpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwYXJhbXMgPSB7IHN0YXR1cywgbWVkaWFfaWRzLCB0d2VldF9tb2RlOiAnZXh0ZW5kZWQnLCBpbmNsdWRlX2V4dF9hbHRfdGV4dDogdHJ1ZSB9O1xuICAgICAgVHdpdHRlci5wb3N0KCdzdGF0dXNlcy91cGRhdGUnLCBwYXJhbXMsIChlcnIsIGRhdGEsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGVycilcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiUG9zdGluZyBzdGF0dXMgZmFpbGVkLlwiKSk7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnNvbGUubG9nKCdFeHQgZW50aXRpZXM6JywgZGF0YS5leHRlbmRlZF9lbnRpdGllcy5tZWRpYSk7XG4gICAgICAgIGNvbnN0IG1lZGlhVXJscyA9IGRhdGEuZXh0ZW5kZWRfZW50aXRpZXMubWVkaWEubWFwKFxuICAgICAgICAgIG9iaiA9PiAoe1xuICAgICAgICAgICAgaW1hZ2U6IG9iai5tZWRpYV91cmxfaHR0cHMsXG4gICAgICAgICAgICBhbHRUZXh0OiBvYmouZXh0X2FsdF90ZXh0XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgICAgIHF1ZXN0aW9uSWQ6ICAgICAgIGRhdGEuaWRfc3RyLFxuICAgICAgICAgIHF1ZXN0aW9uUG9zdGVkQXQ6IGRhdGEuY3JlYXRlZF9hdCxcbiAgICAgICAgICBtZWRpYVVybHNcbiAgICAgICAgfTtcbiAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG5cbiAgZ2V0Rm9sbG93aW5nKHVzZXJJZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBUd2l0dGVyLmdldCgnZnJpZW5kcy9pZHMnLCB7IHVzZXJJZCB9LCAoZXJyLCBkYXRhLCByZXNwb25zZSkgPT4ge1xuICAgICAgICBpZiAoZXJyKSBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgIHJlc29sdmUoZGF0YS5pZHMpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxufSAvLyBtb2R1bGUuZXhwb3J0c1xuXG5cbi8vIEVGRkVDVFM6XG4vLyB1cGxvYWRzIGEgc2luZ2xlIGltYWdlIHdpdGggYWx0VGV4dCB0byBUd2l0dGVyXG4vL1xuLy8gUkVUVVJOUzpcbi8vIG1lZGlhX2lkIHdoaWNoIGlzIG5lY2Vzc2FyeSBmb3Jcbi8vIGF0dGFjaGluZyBtZWRpYSB0byBhIHR3ZWV0XG4vL1xuZnVuY3Rpb24gdXBsb2FkTWVkaWEoYjY0SW1hZ2UsIGFsdFRleHQpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAvLyBmaXJzdCB3ZSBtdXN0IHBvc3QgdGhlIG1lZGlhIHRvIFR3aXR0ZXJcbiAgICBUd2l0dGVyLnBvc3QoJ21lZGlhL3VwbG9hZCcsIHsgbWVkaWFfZGF0YTogYjY0SW1hZ2UgfSwgKGVyciwgZGF0YSwgcmVzcG9uc2UpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICByZWplY3QobmV3IEVycm9yKFwiTWVkaWEgdXBsb2FkIGZhaWxlZC5cIikpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBub3cgd2UgY2FuIGFzc2lnbiBhbHQgdGV4dCB0byB0aGUgbWVkaWEsIGZvciB1c2UgYnkgc2NyZWVuIHJlYWRlcnMgYW5kXG4gICAgICAvLyBvdGhlciB0ZXh0LWJhc2VkIHByZXNlbnRhdGlvbnMgYW5kIGludGVycHJldGVyc1xuICAgICAgY29uc3QgbWVkaWFJZFN0ciA9IGRhdGEubWVkaWFfaWRfc3RyaW5nO1xuICAgICAgY29uc3QgbWV0YV9wYXJhbXMgPSB7IG1lZGlhX2lkOiBtZWRpYUlkU3RyLCBhbHRfdGV4dDogeyB0ZXh0OiBhbHRUZXh0IH0gfVxuXG4gICAgICBUd2l0dGVyLnBvc3QoJ21lZGlhL21ldGFkYXRhL2NyZWF0ZScsIG1ldGFfcGFyYW1zLCAoZXJyLCBkYXRhLCByZXNwb25zZSkgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJNZWRpYSB1cGxvYWQgc3VjY2VlZGVkLCBtZWRpYSBjcmVhdGlvbiBmYWlsZWQuXCIpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBub3cgd2UgY2FuIHJlZmVyZW5jZSB0aGUgbWVkaWEgYW5kIHBvc3QgYSB0d2VldCAobWVkaWEgd2lsbCBhdHRhY2ggdG8gdGhlIHR3ZWV0KVxuICAgICAgICByZXNvbHZlKG1lZGlhSWRTdHIpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWxzL3R3aXR0ZXJVdGlscy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInR3aXRcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ0d2l0XCJcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInVybGVuY29kZVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInVybGVuY29kZVwiXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBEQiA9IHJlcXVpcmUoJy4vZGJPcHMnKTtcbmNvbnN0IHVwbG9hZCA9IHJlcXVpcmUoJ211bHRlcicpKHsgZGVzdDogJ3VwbG9hZHMvJyB9KTtcblxubW9kdWxlLmV4cG9ydHMgPSAoYXBwKSA9PiB7XG5cbiAgLy8gQ09SU1xuICBhcHAudXNlKChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgIHJlcy5oZWFkZXIoJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbicsICcqJyk7XG4gICAgcmVzLmhlYWRlcignQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kcycsICdHRVQsIE9QVElPTlMnKTtcbiAgICByZXMuaGVhZGVyKCdBY2Nlc3MtQ29udHJvbC1NYXgtQWdlJywgJzg2NDAwJyk7IC8vIDI0IGhvdXJzXG4gICAgcmVzLmhlYWRlcignQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycycsXG4gICAgICAgICAgICAgICAnT3JpZ2luLCBYLVJlcXVlc3RlZC1XaXRoLCBDb250ZW50LVR5cGUsIEFjY2VwdCcpO1xuICAgIG5leHQoKTtcbiAgfSk7XG5cbiAgYXBwLmdldCgnL2FwaS9saXZlJywgKHJlcSwgcmVzKSA9PiB7XG4gICAgcmVzLmpzb24oREIuZ2V0TGl2ZVF1ZXN0aW9ucygpKTtcbiAgfSk7XG5cbiAgYXBwLmdldCgnL2FwaS9zY29yZXMnLCAocmVxLCByZXMpID0+IHtcbiAgICBEQi5nZXRTY29yZXMocmVxLCByZXMpO1xuICB9KTtcblxuICBhcHAuZ2V0KCcvYXBpL2NhcmRzLzppZHMnLCAocmVxLCByZXMpID0+IHtcbiAgICBEQi5nZXRDYXJkcyhyZXEsIHJlcyk7XG4gIH0pO1xuXG4gIC8vIFRPRE8gLSBEZWxldGUgdGhpcyBlbmRwb2ludCBpZiBub3QgbmVlZGVkXG4gIGFwcC5nZXQoJy9hcGkvc2NvcmUvOmhhbmRsZScsIChyZXEsIHJlcykgPT4ge1xuICAgIERCLmdldFNjb3JlKHJlcSwgcmVzKTtcbiAgfSk7XG5cbiAgYXBwLmdldCgnL2FwaS9jYXJkcy9vbGQnLCAocmVxLCByZXMpID0+IHtcbiAgICBEQi5nZXRPbGRDYXJkcyhyZXEsIHJlcyk7XG4gIH0pO1xuXG5cbiAgLy8gVE9ETyAtIGFkZCBhdXRoZW50aWNhdGlvbiB0byBmb2xsb3dpbmcgZW5kcG9pbnRzXG5cbiAgYXBwLnBvc3QoJy9kZWNrL25ldycsIHVwbG9hZC5zaW5nbGUoJ3ppcGZpbGUnKSwgKHJlcSwgcmVzKSA9PiB7XG4gICAgREIuYWRkRGVjayhyZXEsIHJlcyk7XG4gIH0pO1xuXG4gIGFwcC5wb3N0KCcvc2NvcmVzL2VkaXQnLCAocmVxLCByZXMpID0+IHtcbiAgICBEQi5hZGp1c3RTY29yZShyZXEsIHJlcyk7XG4gIH0pO1xuXG4gIGFwcC5nZXQoJy9jYXJkcy9uZXcnLCAocmVxLCByZXMpID0+IHtcbiAgICBEQi5nZXROZXdDYXJkcyhyZXEsIHJlcyk7XG4gIH0pO1xuXG59IC8vIG1vZHVsZS5leHBvcnRzXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBpLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibXVsdGVyXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwibXVsdGVyXCJcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=