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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var twitterUtils = __webpack_require__(17);

var utils = __webpack_require__(4);

module.exports = _extends({}, twitterUtils, utils);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return _sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

var MongoClient = __webpack_require__(12).MongoClient;

var url = process.env.MONGODB_URI;
var DB = process.env.MONGO_DB;

var _require = __webpack_require__(13),
    processUpload = _require.processUpload;

var _require2 = __webpack_require__(0),
    A_MONTH_AGO = _require2.A_MONTH_AGO,
    A_WEEK_AGO = _require2.A_WEEK_AGO,
    tryCatch = _require2.tryCatch;

module.exports = {
  getRandomQuestion: function getRandomQuestion() {
    return new Promise(
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(resolve, reject) {
        var mongo, newCards, oldCards, randomCard;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return tryCatch(MongoClient.connect(url));

              case 2:
                mongo = _context.sent;
                newCards = mongo.db(DB).collection('newCards');
                oldCards = mongo.db(DB).collection('oldCards');
                _context.next = 7;
                return tryCatch(newCards.findOne());

              case 7:
                randomCard = _context.sent;

                if (!(randomCard == null)) {
                  _context.next = 11;
                  break;
                }

                reject("Empty deck. Please Add More Cards to DB.");
                return _context.abrupt("return");

              case 11:
                _context.next = 13;
                return tryCatch(oldCards.insert(randomCard));

              case 13:
                _context.next = 15;
                return tryCatch(newCards.remove(randomCard));

              case 15:
                resolve(randomCard);
                mongo.close();

              case 17:
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
  revealAnswerWorkflow: function revealAnswerWorkflow(cardId) {
    return new Promise(
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(resolve, reject) {
        var mongo, oldCards, answerCard;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return tryCatch(MongoClient.connect(url));

              case 2:
                mongo = _context2.sent;
                oldCards = mongo.db(DB).collection('oldCards');
                _context2.next = 6;
                return tryCatch(oldCards.findOne({
                  cardId: cardId
                }));

              case 6:
                answerCard = _context2.sent;
                resolve(answerCard);
                _context2.next = 10;
                return tryCatch(removeLiveQuestion(mongo, cardId));

              case 10:
                mongo.close();

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    }());
  },
  addLiveQuestion: function () {
    var _addLiveQuestion = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(record, mediaUrls) {
      var cardId, mongo, liveQuestions, oldCards;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              cardId = record.cardId;
              _context3.next = 3;
              return tryCatch(MongoClient.connect(url));

            case 3:
              mongo = _context3.sent;
              liveQuestions = mongo.db(DB).collection('liveQuestions');
              oldCards = mongo.db(DB).collection('oldCards');
              _context3.next = 8;
              return tryCatch(liveQuestions.insert(record));

            case 8:
              _context3.next = 10;
              return tryCatch(oldCards.updateOne({
                cardId: cardId
              }, {
                $set: {
                  mediaUrls: mediaUrls
                },
                $unset: {
                  questionImg: '',
                  prevLineImg: ''
                }
              }));

            case 10:
              mongo.close();

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function addLiveQuestion(_x5, _x6) {
      return _addLiveQuestion.apply(this, arguments);
    };
  }(),
  addMediaUrlsToCard: function () {
    var _addMediaUrlsToCard = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(cardId, _ref3) {
      var _ref4, mediaUrl, mongo, oldCards;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _ref4 = _slicedToArray(_ref3, 1), mediaUrl = _ref4[0];
              _context4.next = 3;
              return tryCatch(MongoClient.connect(url));

            case 3:
              mongo = _context4.sent;
              oldCards = mongo.db(DB).collection('oldCards');
              _context4.next = 7;
              return tryCatch(oldCards.updateOne({
                cardId: cardId
              }, {
                $push: {
                  mediaUrls: mediaUrl
                },
                $unset: {
                  answerImg: ''
                }
              }));

            case 7:
              mongo.close();

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    return function addMediaUrlsToCard(_x7, _x8) {
      return _addMediaUrlsToCard.apply(this, arguments);
    };
  }(),
  updateLiveQuestion: function () {
    var _updateLiveQuestion = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(questionId, userPoints) {
      var mongo, liveQuestions, userId, points, update;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return tryCatch(MongoClient.connect(url));

            case 2:
              mongo = _context5.sent;
              liveQuestions = mongo.db(DB).collection('liveQuestions');
              userId = userPoints.userId, points = userPoints.points;
              update = {
                $push: {
                  alreadyAnswered: userId
                }
              };
              if (points > 0) update.$push.cachedPoints = userPoints;
              _context5.next = 9;
              return tryCatch(liveQuestions.update({
                questionId: questionId
              }, update));

            case 9:
              mongo.close();

            case 10:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    return function updateLiveQuestion(_x9, _x10) {
      return _updateLiveQuestion.apply(this, arguments);
    };
  }(),
  getLiveQuestions: function getLiveQuestions() {
    return new Promise(
    /*#__PURE__*/
    function () {
      var _ref5 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(resolve, reject) {
        var mongo, collection, liveQuestions;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return tryCatch(MongoClient.connect(url));

              case 2:
                mongo = _context6.sent;
                collection = mongo.db(DB).collection('liveQuestions');
                _context6.next = 6;
                return tryCatch(collection.find().toArray());

              case 6:
                liveQuestions = _context6.sent;
                resolve(liveQuestions);
                mongo.close();

              case 9:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function (_x11, _x12) {
        return _ref5.apply(this, arguments);
      };
    }());
  },
  addOrUpdateUser: function () {
    var _addOrUpdateUser = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7(newUser) {
      var mongo, scoreboard, userId, user, _scoreboard$updateOne, name, handle, avatar, profileBanner, following;

      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return tryCatch(MongoClient.connect(url));

            case 2:
              mongo = _context7.sent;
              scoreboard = mongo.db(DB).collection('scoreboard');
              userId = newUser.userId;
              _context7.next = 7;
              return tryCatch(scoreboard.findOne({
                userId: userId
              }));

            case 7:
              user = _context7.sent;

              if (!user) {
                _context7.next = 14;
                break;
              }

              name = newUser.name, handle = newUser.handle, avatar = newUser.avatar, profileBanner = newUser.profileBanner, following = newUser.following;
              _context7.next = 12;
              return tryCatch(scoreboard.updateOne({
                userId: userId
              }, (_scoreboard$updateOne = {
                $set: {
                  name: name
                }
              }, _defineProperty(_scoreboard$updateOne, "$set", {
                handle: handle
              }), _defineProperty(_scoreboard$updateOne, "$set", {
                avatar: avatar
              }), _defineProperty(_scoreboard$updateOne, "$set", {
                profileBanner: profileBanner
              }), _defineProperty(_scoreboard$updateOne, "$set", {
                following: following
              }), _scoreboard$updateOne)));

            case 12:
              _context7.next = 16;
              break;

            case 14:
              _context7.next = 16;
              return tryCatch(scoreboard.insert(newUser));

            case 16:
              mongo.close();

            case 17:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    return function addOrUpdateUser(_x13) {
      return _addOrUpdateUser.apply(this, arguments);
    };
  }(),
  adjustScore: function adjustScore(req, res) {// TODO adjust a score manually
  },
  getScores: function () {
    var _getScores = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8(req, res) {
      var mongo, collection, data;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return tryCatch(MongoClient.connect(url));

            case 2:
              mongo = _context8.sent;
              collection = mongo.db(DB).collection('scoreboard');
              _context8.next = 6;
              return tryCatch(collection.find().sort('score', -1).project({
                '_id': 0
              }).toArray());

            case 6:
              data = _context8.sent;
              res.json(data);
              mongo.close();

            case 9:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    return function getScores(_x14, _x15) {
      return _getScores.apply(this, arguments);
    };
  }(),
  getScore: function () {
    var _getScore = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee9(req, res) {
      var handle, mongo, collection, user;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              handle = req.params.handle;
              _context9.next = 3;
              return tryCatch(MongoClient.connect(url));

            case 3:
              mongo = _context9.sent;
              collection = mongo.db(DB).collection('scoreboard');
              _context9.next = 7;
              return tryCatch(collection.findOne({
                handle: handle
              }));

            case 7:
              user = _context9.sent;
              res.json(user);
              mongo.close();

            case 10:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    return function getScore(_x16, _x17) {
      return _getScore.apply(this, arguments);
    };
  }(),
  addDeck: function () {
    var _addDeck = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee10(req, res) {
      var filePath, newCards, mongo, collection, batch, i;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              filePath = req.file.path;
              _context10.next = 3;
              return tryCatch(processUpload(filePath));

            case 3:
              newCards = _context10.sent;
              _context10.next = 6;
              return tryCatch(MongoClient.connect(url));

            case 6:
              mongo = _context10.sent;
              collection = mongo.db(DB).collection('newCards');
              batch = collection.initializeUnorderedBulkOp();

              for (i = 0; i < newCards.length; ++i) {
                batch.insert(newCards[i]);
              }

              _context10.next = 12;
              return tryCatch(batch.execute());

            case 12:
              mongo.close();
              res.redirect('/');

            case 14:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, this);
    }));

    return function addDeck(_x18, _x19) {
      return _addDeck.apply(this, arguments);
    };
  }(),
  getNewCards: function getNewCards(req, res) {
    getCollection(req, res, 'newCards');
  },
  getOldCards: function getOldCards(req, res) {
    getCollection(req, res, 'oldCards');
  },
  weeklyMonthlyReset: function () {
    var _weeklyMonthlyReset = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee11(resetWeeklyScore, resetMonthlyScore) {
      var mongo, collection, reset;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return tryCatch(MongoClient.connect(url));

            case 2:
              mongo = _context11.sent;
              collection = mongo.db(DB).collection('scoreboard');
              if (resetWeeklyScore && resetMonthlyScore) reset = _defineProperty({
                $set: {
                  weeklyScore: 0
                }
              }, "$set", {
                monthlyScore: 0
              });else if (resetWeeklyScore) reset = {
                $set: {
                  weeklyScore: 0
                }
              };else reset = {
                $set: {
                  monthlyScore: 0
                }
              };
              collection.update({}, reset, {
                multi: true
              });
              mongo.close();

            case 7:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, this);
    }));

    return function weeklyMonthlyReset(_x20, _x21) {
      return _weeklyMonthlyReset.apply(this, arguments);
    };
  }()
}; // module.exports

function getCollection(_x22, _x23, _x24) {
  return _getCollection.apply(this, arguments);
}

function _getCollection() {
  _getCollection = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee14(req, res, collectionName) {
    var mongo, collection, data;
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return tryCatch(MongoClient.connect(url));

          case 2:
            mongo = _context14.sent;
            collection = mongo.db(DB).collection(collectionName);
            _context14.next = 6;
            return tryCatch(collection.find().project({
              _id: 0
            }).toArray());

          case 6:
            data = _context14.sent;
            res.json(data);
            mongo.close();

          case 9:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, this);
  }));
  return _getCollection.apply(this, arguments);
}

function removeLiveQuestion(mongo, cardId) {
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref6 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee12(resolve, reject) {
      var collection, currentQuestion;
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              collection = mongo.db(DB).collection('liveQuestions');
              _context12.next = 3;
              return tryCatch(collection.findOne({
                cardId: cardId
              }));

            case 3:
              currentQuestion = _context12.sent;
              _context12.next = 6;
              return tryCatch(collection.remove(currentQuestion));

            case 6:
              _context12.next = 8;
              return tryCatch(addPointsToScoreboard(mongo, currentQuestion));

            case 8:
              resolve();

            case 9:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, this);
    }));

    return function (_x25, _x26) {
      return _ref6.apply(this, arguments);
    };
  }());
}

function addPointsToScoreboard(mongo, _ref7) {
  var cachedPoints = _ref7.cachedPoints,
      cardId = _ref7.cardId;
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref8 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee13(resolve, reject) {
      var scoreboard, answerPostedAt, ops, i, _cachedPoints$i, userId, points;

      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              scoreboard = mongo.db(DB).collection('scoreboard');
              answerPostedAt = new Date().getTime();
              ops = [];

              for (i = 0; i < cachedPoints.length; ++i) {
                _cachedPoints$i = cachedPoints[i], userId = _cachedPoints$i.userId, points = _cachedPoints$i.points;
                ops.push({
                  updateOne: {
                    "filter": {
                      userId: userId
                    },
                    "update": {
                      $inc: {
                        score: points,
                        weeklyScore: points,
                        monthlyScore: points
                      },
                      $push: {
                        correctAnswers: {
                          answerPostedAt: answerPostedAt,
                          cardId: cardId,
                          points: points
                        }
                      }
                    }
                  }
                });
              }

              if (!(ops.length === 0)) {
                _context13.next = 7;
                break;
              }

              resolve();
              return _context13.abrupt("return");

            case 7:
              _context13.next = 9;
              return tryCatch(scoreboard.bulkWrite(ops));

            case 9:
              resolve();

            case 10:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13, this);
    }));

    return function (_x27, _x28) {
      return _ref8.apply(this, arguments);
    };
  }());
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var twit = __webpack_require__(18);

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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

function _sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return _sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }

var urlencode = __webpack_require__(19);

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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(6);
module.exports = __webpack_require__(7);


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

if (process.env.NODE_ENV == 'dev') __webpack_require__(8).config();

var express = __webpack_require__(9);

var app = express();

var path = __webpack_require__(1);

var bodyParser = __webpack_require__(10);

var twitterBot = __webpack_require__(11);

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.resolve(__dirname, '../dist')));
app.use(bodyParser.json());

__webpack_require__(20)(app); //twitterBot.start();


app.listen(app.get('port'), function () {
  return console.log('Listening on port', app.get('port'));
});
exports = module.exports = app;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

var DB = __webpack_require__(2);

var _require = __webpack_require__(0),
    HOURS = _require.HOURS,
    addQuestionLink = _require.addQuestionLink,
    calculateScore = _require.calculateScore,
    contains = _require.contains,
    extractAnswer = _require.extractAnswer,
    getFollowing = _require.getFollowing,
    getTimeUntil = _require.getTimeUntil,
    postMedia = _require.postMedia,
    tryCatch = _require.tryCatch;

var Twitter = __webpack_require__(3);

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
/* 12 */
/***/ (function(module, exports) {

module.exports = require("mongodb");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

function _sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return _sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

var fs = __webpack_require__(14);

var PNG = __webpack_require__(15).PNG;

var path = __webpack_require__(1);

var unzip = __webpack_require__(16);

var UPLOADS_PATH = path.resolve(__dirname, '../uploads');

var _require = __webpack_require__(0),
    formatQuestionAltText = _require.formatQuestionAltText,
    formatQuestionText = _require.formatQuestionText,
    formatAnswerAltText = _require.formatAnswerAltText,
    formatAnswerText = _require.formatAnswerText,
    getAnswers = _require.getAnswers,
    tryCatch = _require.tryCatch;

module.exports = {
  processUpload: processUpload,
  parseAnkiJson: parseAnkiJson,
  optimizeImages: optimizeImages
};

function processUpload(zipfilePath) {
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(resolve, reject) {
      var stream;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              stream = fs.createReadStream(zipfilePath).pipe(unzip.Extract({
                path: 'uploads'
              }));
              stream.on('close',
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee() {
                var files, newCards;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        files = fs.readdirSync(UPLOADS_PATH);
                        _context.next = 3;
                        return tryCatch(optimizeImages(UPLOADS_PATH + '/media'));

                      case 3:
                        console.log('Finished optimizing images!');
                        newCards = extractCardInfo(files);
                        cleanUp(files);
                        resolve(newCards);

                      case 7:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              })));

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
}

function optimizeImages(dirPath) {
  return new Promise(function (resolve, reject) {
    var filesProcessing = [];
    fs.readdirSync(dirPath).forEach(function (file) {
      if (/.*\.png$/.test(file)) {
        var currentFile = dirPath + "/" + file;
        var contents = fs.readFileSync(currentFile);
        var writeStream = fs.createWriteStream(currentFile);
        var currentImage = new Promise(function (res, rej) {
          return writeStream.on('close', res);
        });
        filesProcessing.push(currentImage);
        new PNG({
          filterType: 4,
          deflateLevel: 1
        }).parse(contents, function (err, png) {
          // Give upper left pixel an opacity
          // of 254 so Twitter won't convert
          // to jpeg
          png.data[3] -= 1;
          png.pack().pipe(writeStream);
        });
      }
    });
    Promise.all(filesProcessing).then(resolve);
  });
}

function extractCardInfo(files) {
  var allNewCards = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _file = _step.value;
      var currentFile = "".concat(UPLOADS_PATH, "/").concat(_file);
      var stats = fs.statSync(currentFile);

      if (stats.isFile() && _file.match(/.+\.json$/)) {
        var newCards = parseAnkiJson(currentFile);
        allNewCards = allNewCards.concat(newCards);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return allNewCards;
}

function parseAnkiJson(filePath) {
  var contents = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return contents.notes.map(function (card) {
    var _card$fields = _slicedToArray(card.fields, 14),
        expression = _card$fields[0],
        // reading,
    // japMeaning,
    engMeaning = _card$fields[3],
        // officialEng,
    questionImg = _card$fields[5],
        answerImg = _card$fields[6],
        // audio
    prevLineImg = _card$fields[8],
        prevLineAltText = _card$fields[9],
        altAnswers = _card$fields[10],
        webLookup = _card$fields[11],
        // use for every answer so people can look up pronunciation
    // https://ejje.weblio.jp/content/[webLookup (e.g. 切り換える)]
    notes = _card$fields[12],
        cardId = _card$fields[13];

    var _map = [expression, engMeaning, notes].map(stripHtml);

    var _map2 = _slicedToArray(_map, 3);

    expression = _map2[0];
    engMeaning = _map2[1];
    notes = _map2[2];
    var answers = getAnswers(expression, altAnswers);
    return {
      cardId: cardId,
      questionText: formatQuestionText(expression, engMeaning, notes, cardId),
      questionImg: getBase64(questionImg),
      questionAltText: formatQuestionAltText(expression),
      prevLineImg: getBase64(prevLineImg),
      prevLineAltText: prevLineAltText,
      answerText: formatAnswerText(answers, engMeaning, webLookup, cardId),
      answerImg: getBase64(answerImg),
      answerAltText: formatAnswerAltText(expression),
      answers: answers,
      mediaUrls: []
    };
  });
}

function stripHtml(string) {
  return string.replace(/<.*?>|&.*;/g, '');
}

function getSrc(string) {
  return (string.match(/src="(.+)"/) || [,])[1];
}

function getBase64(string) {
  if (!string || string.length === 0) return;
  var base64;

  try {
    base64 = fs.readFileSync("".concat(UPLOADS_PATH, "/media/").concat(getSrc(string)), {
      encoding: 'base64'
    });
  } catch (e) {// returning undefined...
  }

  return base64;
}

function cleanUp(files) {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = files[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _file2 = _step2.value;
      var root = "".concat(UPLOADS_PATH, "/").concat(_file2);
      if (fs.lstatSync(root).isFile()) fs.unlinkSync(root);else if (fs.lstatSync(root).isDirectory()) deleteFolderRecursive(root);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
}

function deleteFolderRecursive(rootPath) {
  if (fs.existsSync(rootPath)) {
    fs.readdirSync(rootPath).forEach(function (file) {
      var curPath = rootPath + "/" + file;

      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(rootPath);
  }
}

;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("pngjs2");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("unzip-stream");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

var Twitter = __webpack_require__(3);

var _require = __webpack_require__(4),
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
                  tweet_mode: 'extended'
                };
                Twitter.post('statuses/update', params, function (err, data, response) {
                  if (err) {
                    console.error(err);
                    reject("Posting status failed.");
                  }

                  ;
                  var mediaUrls = data.extended_entities.media.map(function (obj) {
                    return obj.media_url_https;
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
        reject("Media upload failed.");
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
          reject("Media upload succeeded, media creation failed.");
        } // now we can reference the media and post a tweet (media will attach to the tweet)


        resolve(mediaIdStr);
      });
    });
  });
}

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("twit");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("urlencode");

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var DB = __webpack_require__(2);

var upload = __webpack_require__(21)({
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
  app.get('/api/scores', function (req, res) {
    DB.getScores(req, res);
  });
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
/* 21 */
/***/ (function(module, exports) {

module.exports = require("multer");

/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map