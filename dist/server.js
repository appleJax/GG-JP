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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

throw new Error("Module build failed: SyntaxError: /Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/src/dbOps.js: Support for the experimental syntax 'objectRestSpread' isn't currently enabled (43:7):\n\n  41 |     const oldCards = mongo.db(DB).collection('oldCards');\n  42 |     await tryCatch(liveQuestions.insert({\n> 43 |       ...record,\n     |       ^\n  44 |       mediaUrls\n  45 |     }));\n  46 |     await tryCatch(\n\nAdd @babel/plugin-proposal-object-rest-spread (https://git.io/vb4Ss) to the 'plugins' section of your Babel config to enable transformation.\n    at Parser.raise (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:842:15)\n    at Parser.expectPlugin (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:2243:18)\n    at Parser.parseObj (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:3705:14)\n    at Parser.parseExprAtom (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:3336:21)\n    at Parser.parseExprSubscripts (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:2998:21)\n    at Parser.parseMaybeUnary (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:2976:21)\n    at Parser.parseExprOps (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:2881:21)\n    at Parser.parseMaybeConditional (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:2851:21)\n    at Parser.parseMaybeAssign (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:2807:21)\n    at Parser.parseExprListItem (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:4074:18)\n    at Parser.parseCallExpressionArguments (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:3160:22)\n    at Parser.parseSubscript (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:3094:32)\n    at Parser.parseSubscripts (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:3017:19)\n    at Parser.parseExprSubscripts (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:3008:17)\n    at Parser.parseMaybeUnary (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:2976:21)\n    at Parser.parseExprOps (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:2881:21)\n    at Parser.parseMaybeConditional (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:2851:21)\n    at Parser.parseMaybeAssign (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:2807:21)\n    at Parser.parseExprListItem (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:4074:18)\n    at Parser.parseCallExpressionArguments (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:3160:22)\n    at Parser.parseSubscript (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:3094:32)\n    at Parser.parseSubscripts (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:3017:19)\n    at Parser.parseExprSubscripts (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:3008:17)\n    at Parser.parseMaybeUnary (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:2976:21)\n    at Parser.parseAwait (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:4139:26)\n    at Parser.parseExprAtom (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:3254:27)\n    at Parser.parseExprSubscripts (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:2998:21)\n    at Parser.parseMaybeUnary (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:2976:21)\n    at Parser.parseExprOps (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:2881:21)\n    at Parser.parseMaybeConditional (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:2851:21)");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
module.exports = __webpack_require__(3);


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("@babel/polyfill");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

if (true) __webpack_require__(4).config();

var express = __webpack_require__(5);

var app = express();

var path = __webpack_require__(6);

var bodyParser = __webpack_require__(7);

var twitterBot = __webpack_require__(8);

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.resolve(__dirname, '../dist')));
app.use(bodyParser.json());

__webpack_require__(12)(app); //twitterBot.start();


app.listen(app.get('port'), function () {
  return console.log('Listening on port', app.get('port'));
});
exports = module.exports = app;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

var DB = __webpack_require__(0);

var _require = __webpack_require__(9),
    HOURS = _require.HOURS,
    addQuestionLink = _require.addQuestionLink,
    calculateScore = _require.calculateScore,
    contains = _require.contains,
    extractAnswer = _require.extractAnswer,
    getFollowing = _require.getFollowing,
    getTimeUntil = _require.getTimeUntil,
    postMedia = _require.postMedia,
    tryCatch = _require.tryCatch;

var Twitter = __webpack_require__(10);

var TWITTER_ACCOUNT = process.env.TWITTER_ACCOUNT;
var ANSWER_INTERVAL = 40000;
var QUESTION_INTERVAL = 10000;
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
              questionText: questionText,
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
      var questionId, answerPostedAt, text, _ref$user, userId, name, handle, avatar, profileBanner, liveQuestions, foundQuestion, alreadyAnswered, acceptedAnswers, following, newUser, userAnswer, points;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              questionId = _ref.in_reply_to_status_id_str, answerPostedAt = _ref.created_at, text = _ref.text, _ref$user = _ref.user, userId = _ref$user.id, name = _ref$user.name, handle = _ref$user.screen_name, avatar = _ref$user.profile_image_url_https, profileBanner = _ref$user.profile_banner_url;
              _context.next = 3;
              return tryCatch(DB.getLiveQuestions());

            case 3:
              liveQuestions = _context.sent;
              foundQuestion = liveQuestions.find(function (questionCard) {
                return questionCard.questionId === questionId;
              });

              if (!foundQuestion) {
                _context.next = 16;
                break;
              }

              alreadyAnswered = foundQuestion.alreadyAnswered, acceptedAnswers = foundQuestion.answers;

              if (!contains(userId, alreadyAnswered)) {
                _context.next = 9;
                break;
              }

              return _context.abrupt("return");

            case 9:
              _context.next = 11;
              return tryCatch(getFollowing(userId));

            case 11:
              following = _context.sent;
              newUser = {
                userId: userId,
                name: name,
                handle: handle,
                avatar: avatar,
                profileBanner: profileBanner,
                following: following,
                allTimeStats: {
                  score: 0,
                  attempts: 0,
                  correct: []
                },
                monthlyStats: {
                  score: 0,
                  attempts: 0,
                  correct: 0
                },
                weeklyStats: {
                  score: 0,
                  attempts: 0,
                  correct: 0
                }
              };
              DB.addOrUpdateUser(newUser);
              userAnswer = extractAnswer(text);

              if (contains(userAnswer, acceptedAnswers)) {
                points = calculateScore(answerPostedAt, foundQuestion);
                DB.updateLiveQuestion(questionId, {
                  userId: userId,
                  points: points
                });
              } else {
                DB.updateLiveQuestion(questionId, {
                  userId: userId,
                  points: 0
                });
              }

            case 16:
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
  var resetWeeklyStats = now.getDay() === 0;
  var resetMonthlyStats = now.getDate() === 1;
  if (resetWeeklyStats || resetMonthlyStats) DB.weeklyMonthlyReset(resetWeeklyStats, resetMonthlyStats);
}

/***/ }),
/* 9 */
/***/ (function(module, exports) {

throw new Error("Module build failed: SyntaxError: /Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/src/utils/index.js: Support for the experimental syntax 'objectRestSpread' isn't currently enabled (5:3):\n\n  3 | \n  4 | module.exports = {\n> 5 |   ...twitterUtils,\n    |   ^\n  6 |   ...utils\n  7 | }\n  8 | \n\nAdd @babel/plugin-proposal-object-rest-spread (https://git.io/vb4Ss) to the 'plugins' section of your Babel config to enable transformation.\n    at Parser.raise (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:842:15)\n    at Parser.expectPlugin (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:2243:18)\n    at Parser.parseObj (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:3705:14)\n    at Parser.parseExprAtom (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:3336:21)\n    at Parser.parseExprSubscripts (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:2998:21)\n    at Parser.parseMaybeUnary (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:2976:21)\n    at Parser.parseExprOps (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:2881:21)\n    at Parser.parseMaybeConditional (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:2851:21)\n    at Parser.parseMaybeAssign (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:2807:21)\n    at Parser.parseMaybeAssign (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:2837:27)\n    at Parser.parseExpression (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:2758:21)\n    at Parser.parseStatementContent (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:4348:21)\n    at Parser.parseStatement (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:4232:17)\n    at Parser.parseBlockOrModuleBlockBody (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:4790:23)\n    at Parser.parseBlockBody (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:4776:10)\n    at Parser.parseTopLevel (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:4200:10)\n    at Parser.parse (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:5642:17)\n    at parse (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/node_modules/babylon/lib/index.js:10702:38)\n    at parser (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/lib/transformation/normalize-file.js:106:33)\n    at normalizeFile (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/lib/transformation/normalize-file.js:53:11)\n    at runSync (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/lib/transformation/index.js:34:41)\n    at transformSync (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/lib/transform-sync.js:15:38)\n    at Object.transform (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/@babel/core/lib/transform.js:20:65)\n    at transpile (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/babel-loader/lib/index.js:55:20)\n    at Object.module.exports (/Users/admin/Dev/JavaScript/GameGogakuen/GG-JP/node_modules/babel-loader/lib/index.js:179:20)");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var twit = __webpack_require__(11);

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
/* 11 */
/***/ (function(module, exports) {

module.exports = require("twit");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var DB = __webpack_require__(0);

var upload = __webpack_require__(13)({
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
    DB.serveLiveQuestions(req, res);
  });
  app.get('/api/scores', function (req, res) {
    DB.getScores(req, res);
  });
  app.get('/api/cards', function (req, res) {
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
/* 13 */
/***/ (function(module, exports) {

module.exports = require("multer");

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYWQ5ZjEzMDhlY2U5OWQzYjYyZDkiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQGJhYmVsL3BvbHlmaWxsXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJkb3RlbnZcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJvZHktcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3R3aXR0ZXJCb3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3R3aXR0ZXJDb25maWcuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidHdpdFwiIiwid2VicGFjazovLy8uL3NyYy9hcGkuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibXVsdGVyXCIiXSwibmFtZXMiOlsicmVxdWlyZSIsImNvbmZpZyIsImV4cHJlc3MiLCJhcHAiLCJwYXRoIiwiYm9keVBhcnNlciIsInR3aXR0ZXJCb3QiLCJzZXQiLCJwcm9jZXNzIiwiZW52IiwiUE9SVCIsInVzZSIsInN0YXRpYyIsInJlc29sdmUiLCJfX2Rpcm5hbWUiLCJqc29uIiwibGlzdGVuIiwiZ2V0IiwiY29uc29sZSIsImxvZyIsImV4cG9ydHMiLCJtb2R1bGUiLCJEQiIsIkhPVVJTIiwiYWRkUXVlc3Rpb25MaW5rIiwiY2FsY3VsYXRlU2NvcmUiLCJjb250YWlucyIsImV4dHJhY3RBbnN3ZXIiLCJnZXRGb2xsb3dpbmciLCJnZXRUaW1lVW50aWwiLCJwb3N0TWVkaWEiLCJ0cnlDYXRjaCIsIlR3aXR0ZXIiLCJUV0lUVEVSX0FDQ09VTlQiLCJBTlNXRVJfSU5URVJWQUwiLCJRVUVTVElPTl9JTlRFUlZBTCIsInN0YXJ0Iiwib3BlblN0cmVhbSIsInNldEludGVydmFsIiwidHdlZXRSYW5kb21RdWVzdGlvbiIsInNldFN0YXJ0VGltZXMiLCJ0aW1lVW50aWw3UE0iLCJ0aW1lVW50aWxNaWRuaWdodCIsInNldFRpbWVvdXQiLCJ3ZWVrbHlNb250aGx5UmVzZXQiLCJnZXRSYW5kb21RdWVzdGlvbiIsImNhcmRJZCIsInF1ZXN0aW9uVGV4dCIsInF1ZXN0aW9uSW1nIiwicXVlc3Rpb25BbHRUZXh0IiwicHJldkxpbmVJbWciLCJwcmV2TGluZUFsdFRleHQiLCJhbnN3ZXJzIiwicXVlc3Rpb25JZCIsInF1ZXN0aW9uUG9zdGVkQXQiLCJtZWRpYVVybHMiLCJsaXZlUXVlc3Rpb24iLCJjYWNoZWRQb2ludHMiLCJhbHJlYWR5QW5zd2VyZWQiLCJhZGRMaXZlUXVlc3Rpb24iLCJ0d2VldEFuc3dlciIsInJldmVhbEFuc3dlcldvcmtmbG93IiwiYW5zd2VyVGV4dCIsImFuc3dlckltZyIsImFuc3dlckFsdFRleHQiLCJhZGRNZWRpYVVybHNUb0NhcmQiLCJzdHJlYW0iLCJ0cmFjayIsIm9uIiwiaW5fcmVwbHlfdG9fc3RhdHVzX2lkX3N0ciIsImFuc3dlclBvc3RlZEF0IiwiY3JlYXRlZF9hdCIsInRleHQiLCJ1c2VyIiwidXNlcklkIiwiaWQiLCJuYW1lIiwiaGFuZGxlIiwic2NyZWVuX25hbWUiLCJhdmF0YXIiLCJwcm9maWxlX2ltYWdlX3VybF9odHRwcyIsInByb2ZpbGVCYW5uZXIiLCJwcm9maWxlX2Jhbm5lcl91cmwiLCJnZXRMaXZlUXVlc3Rpb25zIiwibGl2ZVF1ZXN0aW9ucyIsImZvdW5kUXVlc3Rpb24iLCJmaW5kIiwicXVlc3Rpb25DYXJkIiwiYWNjZXB0ZWRBbnN3ZXJzIiwiZm9sbG93aW5nIiwibmV3VXNlciIsImFsbFRpbWVTdGF0cyIsInNjb3JlIiwiYXR0ZW1wdHMiLCJjb3JyZWN0IiwibW9udGhseVN0YXRzIiwid2Vla2x5U3RhdHMiLCJhZGRPclVwZGF0ZVVzZXIiLCJ1c2VyQW5zd2VyIiwicG9pbnRzIiwidXBkYXRlTGl2ZVF1ZXN0aW9uIiwiZGlzY29ubmVjdE1zZyIsImVycm9yIiwibm93IiwiRGF0ZSIsInJlc2V0V2Vla2x5U3RhdHMiLCJnZXREYXkiLCJyZXNldE1vbnRobHlTdGF0cyIsImdldERhdGUiLCJ0d2l0IiwiVFdJVFRFUl9BUElfS0VZIiwiVFdJVFRFUl9BUElfU0VDUkVUIiwiVFdJVFRFUl9UT0tFTiIsIlRXSVRURVJfVE9LRU5fU0VDUkVUIiwidXNlckNvbmZpZyIsImNvbnN1bWVyX2tleSIsImNvbnN1bWVyX3NlY3JldCIsImFjY2Vzc190b2tlbiIsImFjY2Vzc190b2tlbl9zZWNyZXQiLCJ1cGxvYWQiLCJkZXN0IiwicmVxIiwicmVzIiwibmV4dCIsImhlYWRlciIsInNlcnZlTGl2ZVF1ZXN0aW9ucyIsImdldFNjb3JlcyIsImdldENhcmRzIiwiZ2V0U2NvcmUiLCJnZXRPbGRDYXJkcyIsInBvc3QiLCJzaW5nbGUiLCJhZGREZWNrIiwiYWRqdXN0U2NvcmUiLCJnZXROZXdDYXJkcyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0RBLDRDOzs7Ozs7QUNBQSxJQUFJLElBQUosRUFDRSxtQkFBQUEsQ0FBUSxDQUFSLEVBQWtCQyxNQUFsQjs7QUFFRixJQUFNQyxVQUFVLG1CQUFBRixDQUFRLENBQVIsQ0FBaEI7O0FBQ0EsSUFBTUcsTUFBTUQsU0FBWjs7QUFDQSxJQUFNRSxPQUFPLG1CQUFBSixDQUFRLENBQVIs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VGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYWQ5ZjEzMDhlY2U5OWQzYjYyZDkiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAYmFiZWwvcG9seWZpbGxcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJAYmFiZWwvcG9seWZpbGxcIlxuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT0gJ2RldicpXG4gIHJlcXVpcmUoJ2RvdGVudicpLmNvbmZpZygpO1xuXG5jb25zdCBleHByZXNzID0gcmVxdWlyZSgnZXhwcmVzcycpO1xuY29uc3QgYXBwID0gZXhwcmVzcygpO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IGJvZHlQYXJzZXIgPSByZXF1aXJlKCdib2R5LXBhcnNlcicpO1xuY29uc3QgdHdpdHRlckJvdCA9IHJlcXVpcmUoJy4vdHdpdHRlckJvdCcpO1xuXG5hcHAuc2V0KCdwb3J0JywgKHByb2Nlc3MuZW52LlBPUlQgfHwgMzAwMCkpO1xuYXBwLnVzZShleHByZXNzLnN0YXRpYyhwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vZGlzdCcpKSk7XG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcblxucmVxdWlyZSgnLi9hcGknKShhcHApO1xuXG4vL3R3aXR0ZXJCb3Quc3RhcnQoKTtcblxuYXBwLmxpc3RlbihhcHAuZ2V0KCdwb3J0JyksICgpID0+XG4gIGNvbnNvbGUubG9nKCdMaXN0ZW5pbmcgb24gcG9ydCcsIGFwcC5nZXQoJ3BvcnQnKSlcbik7XG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGFwcDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zZXJ2ZXIuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJkb3RlbnZcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJkb3RlbnZcIlxuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZXhwcmVzc1wiXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJwYXRoXCJcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYm9keS1wYXJzZXJcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJib2R5LXBhcnNlclwiXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IERCID0gcmVxdWlyZSgnLi9kYk9wcycpO1xuY29uc3Qge1xuICBIT1VSUyxcbiAgYWRkUXVlc3Rpb25MaW5rLFxuICBjYWxjdWxhdGVTY29yZSxcbiAgY29udGFpbnMsXG4gIGV4dHJhY3RBbnN3ZXIsXG4gIGdldEZvbGxvd2luZyxcbiAgZ2V0VGltZVVudGlsLFxuICBwb3N0TWVkaWEsXG4gIHRyeUNhdGNoXG59ID0gcmVxdWlyZSgnVXRpbHMnKTtcbmNvbnN0IFR3aXR0ZXIgPSByZXF1aXJlKCcuL3R3aXR0ZXJDb25maWcnKTtcbmNvbnN0IHsgVFdJVFRFUl9BQ0NPVU5UIH0gPSBwcm9jZXNzLmVudjtcblxuY29uc3QgQU5TV0VSX0lOVEVSVkFMID0gNDAwMDA7XG5sZXQgUVVFU1RJT05fSU5URVJWQUwgPSAxMDAwMDtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHN0YXJ0OiAoKSA9PiB7XG4gICAgb3BlblN0cmVhbSgpO1xuICAgIHNldEludGVydmFsKHR3ZWV0UmFuZG9tUXVlc3Rpb24sIFFVRVNUSU9OX0lOVEVSVkFMKTtcbiAgfVxuICAvLyBzdGFydDogKCkgPT4ge1xuICAvLyAgIG9wZW5TdHJlYW0oKTtcbiAgLy8gICBzZXRTdGFydFRpbWVzKCk7XG4gIC8vIH1cbn07XG5cbmZ1bmN0aW9uIHNldFN0YXJ0VGltZXMoKSB7XG4gIGNvbnN0IHRpbWVVbnRpbDdQTSA9IGdldFRpbWVVbnRpbCgxOSk7XG4gIGNvbnN0IHRpbWVVbnRpbE1pZG5pZ2h0ID0gZ2V0VGltZVVudGlsKDApO1xuXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIHNldEludGVydmFsKHR3ZWV0UmFuZG9tUXVlc3Rpb24sIFFVRVNUSU9OX0lOVEVSVkFMKTtcbiAgfSwgdGltZVVudGlsN1BNKTtcblxuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBzZXRJbnRlcnZhbCh3ZWVrbHlNb250aGx5UmVzZXQsIDI0KkhPVVJTKTtcbiAgfSwgdGltZVVudGlsTWlkbmlnaHQpO1xufVxuXG5hc3luYyBmdW5jdGlvbiB0d2VldFJhbmRvbVF1ZXN0aW9uKCkge1xuICBjb25zdCB7XG4gICAgY2FyZElkLFxuICAgIHF1ZXN0aW9uVGV4dCxcbiAgICBxdWVzdGlvbkltZyxcbiAgICBxdWVzdGlvbkFsdFRleHQsXG4gICAgcHJldkxpbmVJbWcsXG4gICAgcHJldkxpbmVBbHRUZXh0LFxuICAgIGFuc3dlcnNcbiAgfSA9IGF3YWl0IHRyeUNhdGNoKERCLmdldFJhbmRvbVF1ZXN0aW9uKCkpO1xuICBpZiAoIWNhcmRJZCkgcmV0dXJuO1xuXG4gIGNvbnN0IHtcbiAgICBxdWVzdGlvbklkLFxuICAgIHF1ZXN0aW9uUG9zdGVkQXQsXG4gICAgbWVkaWFVcmxzXG4gIH0gPSBhd2FpdCB0cnlDYXRjaChcbiAgICBwb3N0TWVkaWEoXG4gICAgICBxdWVzdGlvblRleHQsXG4gICAgICBxdWVzdGlvbkltZyxcbiAgICAgIHF1ZXN0aW9uQWx0VGV4dCxcbiAgICAgIHByZXZMaW5lSW1nLFxuICAgICAgcHJldkxpbmVBbHRUZXh0XG4gICAgKVxuICApO1xuXG4gIGNvbnN0IGxpdmVRdWVzdGlvbiA9IHtcbiAgICBjYXJkSWQsXG4gICAgcXVlc3Rpb25JZCxcbiAgICBxdWVzdGlvblRleHQsXG4gICAgYW5zd2VycyxcbiAgICBxdWVzdGlvblBvc3RlZEF0LFxuICAgIGNhY2hlZFBvaW50czogW10sXG4gICAgYWxyZWFkeUFuc3dlcmVkOiBbXVxuICB9O1xuICBEQi5hZGRMaXZlUXVlc3Rpb24obGl2ZVF1ZXN0aW9uLCBtZWRpYVVybHMpO1xuICBzZXRUaW1lb3V0KCgpID0+IHR3ZWV0QW5zd2VyKGNhcmRJZCwgcXVlc3Rpb25JZCksIEFOU1dFUl9JTlRFUlZBTCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHR3ZWV0QW5zd2VyKGNhcmRJZCwgcXVlc3Rpb25JZCkge1xuICBjb25zdCB7XG4gICAgYW5zd2VyVGV4dCxcbiAgICBhbnN3ZXJJbWcsXG4gICAgYW5zd2VyQWx0VGV4dFxuICB9ID0gYXdhaXQgdHJ5Q2F0Y2goXG4gICAgLy8gRUZGRUNUUzpcbiAgICAvLyAtIHJlbW92ZXMgcXVlc3Rpb24gZnJvbSBsaXZlUXVlc3Rpb25zXG4gICAgLy8gLSBhZGRzIGNhY2hlZCBwb2ludHMgdG8gc2NvcmVib2FyZFxuICAgIC8vXG4gICAgLy8gUkVUVVJOUzpcbiAgICAvLyBBbnN3ZXJDYXJkXG4gICAgREIucmV2ZWFsQW5zd2VyV29ya2Zsb3coY2FyZElkKVxuICApO1xuXG4gIGNvbnN0IHsgbWVkaWFVcmxzIH0gPSBhd2FpdCB0cnlDYXRjaChcbiAgICBwb3N0TWVkaWEoXG4gICAgICBhZGRRdWVzdGlvbkxpbmsoYW5zd2VyVGV4dCwgcXVlc3Rpb25JZCksXG4gICAgICBhbnN3ZXJJbWcsXG4gICAgICBhbnN3ZXJBbHRUZXh0XG4gICAgKVxuICApO1xuXG4gIERCLmFkZE1lZGlhVXJsc1RvQ2FyZChjYXJkSWQsIG1lZGlhVXJscyk7XG59XG5cbmZ1bmN0aW9uIG9wZW5TdHJlYW0oKSB7XG4gIGNvbnN0IHN0cmVhbSA9IFR3aXR0ZXIuc3RyZWFtKCdzdGF0dXNlcy9maWx0ZXInLCB7IHRyYWNrOiBgQCR7VFdJVFRFUl9BQ0NPVU5UfWAgfSk7XG5cbiAgc3RyZWFtLm9uKCd0d2VldCcsIGFzeW5jICh7XG4gICAgaW5fcmVwbHlfdG9fc3RhdHVzX2lkX3N0cjogcXVlc3Rpb25JZCxcbiAgICBjcmVhdGVkX2F0OiBhbnN3ZXJQb3N0ZWRBdCxcbiAgICB0ZXh0LFxuICAgIHVzZXI6IHtcbiAgICAgIGlkOiB1c2VySWQsXG4gICAgICBuYW1lLFxuICAgICAgc2NyZWVuX25hbWU6IGhhbmRsZSxcbiAgICAgIHByb2ZpbGVfaW1hZ2VfdXJsX2h0dHBzOiBhdmF0YXIsXG4gICAgICBwcm9maWxlX2Jhbm5lcl91cmw6IHByb2ZpbGVCYW5uZXJcbiAgICB9XG4gIH0pID0+IHtcbiAgICBjb25zdCBsaXZlUXVlc3Rpb25zID0gYXdhaXQgdHJ5Q2F0Y2goREIuZ2V0TGl2ZVF1ZXN0aW9ucygpKTtcbiAgICBjb25zdCBmb3VuZFF1ZXN0aW9uID0gbGl2ZVF1ZXN0aW9ucy5maW5kKFxuICAgICAgcXVlc3Rpb25DYXJkID0+IHF1ZXN0aW9uQ2FyZC5xdWVzdGlvbklkID09PSBxdWVzdGlvbklkXG4gICAgKTtcblxuICAgIGlmIChmb3VuZFF1ZXN0aW9uKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGFscmVhZHlBbnN3ZXJlZCxcbiAgICAgICAgYW5zd2VyczogYWNjZXB0ZWRBbnN3ZXJzXG4gICAgICB9ID0gZm91bmRRdWVzdGlvbjtcbiAgICAgIGlmIChjb250YWlucyh1c2VySWQsIGFscmVhZHlBbnN3ZXJlZCkpXG4gICAgICAgIHJldHVybjtcblxuICAgICAgY29uc3QgZm9sbG93aW5nID0gYXdhaXQgdHJ5Q2F0Y2goZ2V0Rm9sbG93aW5nKHVzZXJJZCkpO1xuICAgICAgY29uc3QgbmV3VXNlciA9IHtcbiAgICAgICAgdXNlcklkLFxuICAgICAgICBuYW1lLFxuICAgICAgICBoYW5kbGUsXG4gICAgICAgIGF2YXRhcixcbiAgICAgICAgcHJvZmlsZUJhbm5lcixcbiAgICAgICAgZm9sbG93aW5nLFxuICAgICAgICBhbGxUaW1lU3RhdHM6IHtcbiAgICAgICAgICBzY29yZTogMCxcbiAgICAgICAgICBhdHRlbXB0czogMCxcbiAgICAgICAgICBjb3JyZWN0OiBbXVxuICAgICAgICB9LFxuICAgICAgICBtb250aGx5U3RhdHM6IHtcbiAgICAgICAgICBzY29yZTogMCxcbiAgICAgICAgICBhdHRlbXB0czogMCxcbiAgICAgICAgICBjb3JyZWN0OiAwXG4gICAgICAgIH0sXG4gICAgICAgIHdlZWtseVN0YXRzOiB7XG4gICAgICAgICAgc2NvcmU6IDAsXG4gICAgICAgICAgYXR0ZW1wdHM6IDAsXG4gICAgICAgICAgY29ycmVjdDogMFxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgREIuYWRkT3JVcGRhdGVVc2VyKG5ld1VzZXIpO1xuXG4gICAgICBjb25zdCB1c2VyQW5zd2VyID0gZXh0cmFjdEFuc3dlcih0ZXh0KTtcbiAgICAgIGlmIChjb250YWlucyh1c2VyQW5zd2VyLCBhY2NlcHRlZEFuc3dlcnMpKSB7XG4gICAgICAgIGNvbnN0IHBvaW50cyA9IGNhbGN1bGF0ZVNjb3JlKGFuc3dlclBvc3RlZEF0LCBmb3VuZFF1ZXN0aW9uKTtcbiAgICAgICAgREIudXBkYXRlTGl2ZVF1ZXN0aW9uKHF1ZXN0aW9uSWQsIHsgdXNlcklkLCBwb2ludHMgfSk7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIERCLnVwZGF0ZUxpdmVRdWVzdGlvbihxdWVzdGlvbklkLCB7IHVzZXJJZCwgcG9pbnRzOiAwIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgc3RyZWFtLm9uKCdkaXNjb25uZWN0JywgKGRpc2Nvbm5lY3RNc2cpID0+IHtcbiAgICBjb25zb2xlLmVycm9yKCdUd2VldCBzdHJlYW0gZGlzY29ubmVjdGVkOicsIGRpc2Nvbm5lY3RNc2cpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gc3RyZWFtLnN0YXJ0KCksIDEwMCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiB3ZWVrbHlNb250aGx5UmVzZXQoKSB7XG4gIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gIGNvbnN0IHJlc2V0V2Vla2x5U3RhdHMgPSBub3cuZ2V0RGF5KCkgPT09IDA7XG4gIGNvbnN0IHJlc2V0TW9udGhseVN0YXRzID0gbm93LmdldERhdGUoKSA9PT0gMTtcblxuICBpZiAocmVzZXRXZWVrbHlTdGF0cyB8fCByZXNldE1vbnRobHlTdGF0cylcbiAgICBEQi53ZWVrbHlNb250aGx5UmVzZXQocmVzZXRXZWVrbHlTdGF0cywgcmVzZXRNb250aGx5U3RhdHMpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3R3aXR0ZXJCb3QuanMiLCJjb25zdCB0d2l0ID0gcmVxdWlyZSgndHdpdCcpO1xuY29uc3Qge1xuICBUV0lUVEVSX0FQSV9LRVksXG4gIFRXSVRURVJfQVBJX1NFQ1JFVCxcbiAgVFdJVFRFUl9UT0tFTixcbiAgVFdJVFRFUl9UT0tFTl9TRUNSRVQsXG4gIFRXSVRURVJfQUNDT1VOVFxufSA9IHByb2Nlc3MuZW52O1xuXG4vLyBjb25zdCBhcHBDb25maWcgPSB7XG4vLyAgIGNvbnN1bWVyX2tleTogVFdJVFRFUl9BUElfS0VZLFxuLy8gICBjb25zdW1lcl9zZWNyZXQ6IFRXSVRURVJfQVBJX1NFQ1JFVCxcbi8vICAgYXBwX29ubHlfYXV0aDogdHJ1ZVxuLy8gfVxuXG5jb25zdCB1c2VyQ29uZmlnID0ge1xuICBjb25zdW1lcl9rZXk6IFRXSVRURVJfQVBJX0tFWSxcbiAgY29uc3VtZXJfc2VjcmV0OiBUV0lUVEVSX0FQSV9TRUNSRVQsXG4gIGFjY2Vzc190b2tlbjogVFdJVFRFUl9UT0tFTixcbiAgYWNjZXNzX3Rva2VuX3NlY3JldDogVFdJVFRFUl9UT0tFTl9TRUNSRVRcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IHR3aXQodXNlckNvbmZpZyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdHdpdHRlckNvbmZpZy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInR3aXRcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ0d2l0XCJcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IERCID0gcmVxdWlyZSgnLi9kYk9wcycpO1xuY29uc3QgdXBsb2FkID0gcmVxdWlyZSgnbXVsdGVyJykoeyBkZXN0OiAndXBsb2Fkcy8nIH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChhcHApID0+IHtcblxuICAvLyBDT1JTXG4gIGFwcC51c2UoKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gICAgcmVzLmhlYWRlcignQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJywgJyonKTtcbiAgICByZXMuaGVhZGVyKCdBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzJywgJ0dFVCwgT1BUSU9OUycpO1xuICAgIHJlcy5oZWFkZXIoJ0FjY2Vzcy1Db250cm9sLU1heC1BZ2UnLCAnODY0MDAnKTsgLy8gMjQgaG91cnNcbiAgICByZXMuaGVhZGVyKCdBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzJyxcbiAgICAgICAgICAgICAgICdPcmlnaW4sIFgtUmVxdWVzdGVkLVdpdGgsIENvbnRlbnQtVHlwZSwgQWNjZXB0Jyk7XG4gICAgbmV4dCgpO1xuICB9KTtcblxuICBhcHAuZ2V0KCcvYXBpL2xpdmUnLCAocmVxLCByZXMpID0+IHtcbiAgICBEQi5zZXJ2ZUxpdmVRdWVzdGlvbnMocmVxLCByZXMpO1xuICB9KTtcblxuICBhcHAuZ2V0KCcvYXBpL3Njb3JlcycsIChyZXEsIHJlcykgPT4ge1xuICAgIERCLmdldFNjb3JlcyhyZXEsIHJlcyk7XG4gIH0pO1xuXG4gIGFwcC5nZXQoJy9hcGkvY2FyZHMnLCAocmVxLCByZXMpID0+IHtcbiAgICBEQi5nZXRDYXJkcyhyZXEsIHJlcyk7XG4gIH0pO1xuXG4gIC8vIFRPRE8gLSBEZWxldGUgdGhpcyBlbmRwb2ludCBpZiBub3QgbmVlZGVkXG4gIGFwcC5nZXQoJy9hcGkvc2NvcmUvOmhhbmRsZScsIChyZXEsIHJlcykgPT4ge1xuICAgIERCLmdldFNjb3JlKHJlcSwgcmVzKTtcbiAgfSk7XG5cbiAgYXBwLmdldCgnL2FwaS9jYXJkcy9vbGQnLCAocmVxLCByZXMpID0+IHtcbiAgICBEQi5nZXRPbGRDYXJkcyhyZXEsIHJlcyk7XG4gIH0pO1xuXG5cbiAgLy8gVE9ETyAtIGFkZCBhdXRoZW50aWNhdGlvbiB0byBmb2xsb3dpbmcgZW5kcG9pbnRzXG5cbiAgYXBwLnBvc3QoJy9kZWNrL25ldycsIHVwbG9hZC5zaW5nbGUoJ3ppcGZpbGUnKSwgKHJlcSwgcmVzKSA9PiB7XG4gICAgREIuYWRkRGVjayhyZXEsIHJlcyk7XG4gIH0pO1xuXG4gIGFwcC5wb3N0KCcvc2NvcmVzL2VkaXQnLCAocmVxLCByZXMpID0+IHtcbiAgICBEQi5hZGp1c3RTY29yZShyZXEsIHJlcyk7XG4gIH0pO1xuXG4gIGFwcC5nZXQoJy9jYXJkcy9uZXcnLCAocmVxLCByZXMpID0+IHtcbiAgICBEQi5nZXROZXdDYXJkcyhyZXEsIHJlcyk7XG4gIH0pO1xuXG59IC8vIG1vZHVsZS5leHBvcnRzXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBpLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibXVsdGVyXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwibXVsdGVyXCJcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=