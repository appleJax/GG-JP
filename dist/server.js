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

                reject(new Error("Empty deck. Please Add More Cards to DB."));
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
              return tryCatch(collection.find().sort('weeklyScore', -1).project({
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

if (true) __webpack_require__(8).config();

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
                    reject(new Error("Posting status failed."));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2M5YWI2YTA3YjBhMDhhMGNkZjUiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhdGhcIiIsIndlYnBhY2s6Ly8vLi9zcmMvZGJPcHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3R3aXR0ZXJDb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3V0aWxzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXBvbHlmaWxsXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJkb3RlbnZcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYm9keS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vLi9zcmMvdHdpdHRlckJvdC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb25nb2RiXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3NBbmtpSnNvbi5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInBuZ2pzMlwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInVuemlwLXN0cmVhbVwiIiwid2VicGFjazovLy8uL3NyYy91dGlscy90d2l0dGVyVXRpbHMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidHdpdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInVybGVuY29kZVwiIiwid2VicGFjazovLy8uL3NyYy9hcGkuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibXVsdGVyXCIiXSwibmFtZXMiOlsidHdpdHRlclV0aWxzIiwicmVxdWlyZSIsInV0aWxzIiwibW9kdWxlIiwiZXhwb3J0cyIsIk1vbmdvQ2xpZW50IiwidXJsIiwicHJvY2VzcyIsImVudiIsIk1PTkdPREJfVVJJIiwiREIiLCJNT05HT19EQiIsInByb2Nlc3NVcGxvYWQiLCJ0cnlDYXRjaCIsImdldFJhbmRvbVF1ZXN0aW9uIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJjb25uZWN0IiwibW9uZ28iLCJuZXdDYXJkcyIsImRiIiwiY29sbGVjdGlvbiIsIm9sZENhcmRzIiwiZmluZE9uZSIsInJhbmRvbUNhcmQiLCJFcnJvciIsImluc2VydCIsInJlbW92ZSIsImNsb3NlIiwicmV2ZWFsQW5zd2VyV29ya2Zsb3ciLCJjYXJkSWQiLCJhbnN3ZXJDYXJkIiwicmVtb3ZlTGl2ZVF1ZXN0aW9uIiwiYWRkTGl2ZVF1ZXN0aW9uIiwicmVjb3JkIiwibWVkaWFVcmxzIiwibGl2ZVF1ZXN0aW9ucyIsInVwZGF0ZU9uZSIsIiRzZXQiLCIkdW5zZXQiLCJxdWVzdGlvbkltZyIsInByZXZMaW5lSW1nIiwiYWRkTWVkaWFVcmxzVG9DYXJkIiwibWVkaWFVcmwiLCIkcHVzaCIsImFuc3dlckltZyIsInVwZGF0ZUxpdmVRdWVzdGlvbiIsInF1ZXN0aW9uSWQiLCJ1c2VyUG9pbnRzIiwidXNlcklkIiwicG9pbnRzIiwidXBkYXRlIiwiYWxyZWFkeUFuc3dlcmVkIiwiY2FjaGVkUG9pbnRzIiwiZ2V0TGl2ZVF1ZXN0aW9ucyIsImZpbmQiLCJ0b0FycmF5IiwiYWRkT3JVcGRhdGVVc2VyIiwibmV3VXNlciIsInNjb3JlYm9hcmQiLCJ1c2VyIiwibmFtZSIsImhhbmRsZSIsImF2YXRhciIsInByb2ZpbGVCYW5uZXIiLCJmb2xsb3dpbmciLCJhZGp1c3RTY29yZSIsInJlcSIsInJlcyIsImdldFNjb3JlcyIsInNvcnQiLCJwcm9qZWN0IiwiZGF0YSIsImpzb24iLCJnZXRTY29yZSIsInBhcmFtcyIsImFkZERlY2siLCJmaWxlUGF0aCIsImZpbGUiLCJwYXRoIiwiYmF0Y2giLCJpbml0aWFsaXplVW5vcmRlcmVkQnVsa09wIiwiaSIsImxlbmd0aCIsImV4ZWN1dGUiLCJyZWRpcmVjdCIsImdldE5ld0NhcmRzIiwiZ2V0Q29sbGVjdGlvbiIsImdldE9sZENhcmRzIiwid2Vla2x5TW9udGhseVJlc2V0IiwicmVzZXRXZWVrbHlTY29yZSIsInJlc2V0TW9udGhseVNjb3JlIiwicmVzZXQiLCJ3ZWVrbHlTY29yZSIsIm1vbnRobHlTY29yZSIsIm11bHRpIiwiY29sbGVjdGlvbk5hbWUiLCJfaWQiLCJjdXJyZW50UXVlc3Rpb24iLCJhZGRQb2ludHNUb1Njb3JlYm9hcmQiLCJhbnN3ZXJQb3N0ZWRBdCIsIkRhdGUiLCJnZXRUaW1lIiwib3BzIiwicHVzaCIsIiRpbmMiLCJzY29yZSIsImNvcnJlY3RBbnN3ZXJzIiwiYnVsa1dyaXRlIiwidHdpdCIsIlRXSVRURVJfQVBJX0tFWSIsIlRXSVRURVJfQVBJX1NFQ1JFVCIsIlRXSVRURVJfVE9LRU4iLCJUV0lUVEVSX1RPS0VOX1NFQ1JFVCIsIlRXSVRURVJfQUNDT1VOVCIsInVzZXJDb25maWciLCJjb25zdW1lcl9rZXkiLCJjb25zdW1lcl9zZWNyZXQiLCJhY2Nlc3NfdG9rZW4iLCJhY2Nlc3NfdG9rZW5fc2VjcmV0IiwidXJsZW5jb2RlIiwiV0VCTE9PS1VQX1VSTCIsIkhPVVJTIiwiZm9ybWF0UXVlc3Rpb25BbHRUZXh0IiwiZXhwcmVzc2lvbiIsImhpbnQiLCJmb3JtYXRIaW50IiwibWluTWF4Q2hhcnMiLCJtaW4iLCJtYXgiLCJtaW5NYXgiLCJzIiwic2NyZWVuUmVhZGVySGludCIsInJlcGxhY2UiLCJmb3JtYXRRdWVzdGlvblRleHQiLCJlbmdNZWFuaW5nIiwibm90ZXMiLCJjYXJkSUQiLCJ0d2VldFRleHQiLCJuZWVkc0hpbnQiLCJmb3JtYXRBbnN3ZXJBbHRUZXh0IiwiZm9ybWF0QW5zd2VyVGV4dCIsImFuc3dlcnMiLCJ3ZWJMb29rdXAiLCJhbnN3ZXJUZXh0Iiwiam9pbiIsImFkZFF1ZXN0aW9uTGluayIsInF1ZXN0aW9uTGluayIsImxpbmVzIiwic3BsaXQiLCJzcGxpY2UiLCJnZXRBbnN3ZXJzIiwiYWx0QW5zd2VycyIsImFjY2VwdGVkQW5zd2VyIiwibWF0Y2giLCJvdGhlckFuc3dlcnMiLCJjb25jYXQiLCJjYWxjdWxhdGVTY29yZSIsInF1ZXN0aW9uUG9zdGVkQXQiLCJ0aW1lVG9BbnN3ZXIiLCJNYXRoIiwiZmxvb3IiLCJleHRyYWN0QW5zd2VyIiwidGV4dCIsInRyaW0iLCJzbGljZSIsImdldFRpbWVVbnRpbCIsImhvdXIiLCJub3ciLCJtaWxsaXNVbnRpbFRpbWUiLCJnZXRGdWxsWWVhciIsImdldE1vbnRoIiwiZ2V0RGF0ZSIsInByb21pc2UiLCJ0aGVuIiwiY2F0Y2giLCJjb25zb2xlIiwiZXJyb3IiLCJlcnIiLCJjb250YWlucyIsIml0ZW0iLCJsaXN0IiwidmFsaWQiLCJpbmRleE9mIiwiaW5kZXgiLCJtYXhDaGFycyIsIm1pc3NpbmdDaGFyUmVnZXgiLCJtaXNzaW5nQ2hhcnMiLCJnaW1tZUNoYXJzIiwibWluQ2hhcnMiLCJvcHRpb25hbENoYXJzIiwibGVnZW5kIiwibm9ybWFsaXplZCIsImdyb3VwTXVsdGlYcyIsImdyb3VwWHMiLCJncm91cFF1ZXN0aW9uTWFya3MiLCJmbGF0dGVuIiwibWFwIiwiZ3JvdXAiLCJ0ZXN0IiwicmVzdWx0IiwibnVtQ2hhcnMiLCJOdW1iZXIiLCJuZWdhdGVkQ2hhcnMiLCJzdHJpbmciLCJwMSIsInN0ciIsInNjYWxhciIsInYiLCJBcnJheSIsImlzQXJyYXkiLCJkZWVwIiwiZmxhdCIsImhlYWQiLCJ0YWlsIiwiY29uZmlnIiwiZXhwcmVzcyIsImFwcCIsImJvZHlQYXJzZXIiLCJ0d2l0dGVyQm90Iiwic2V0IiwiUE9SVCIsInVzZSIsInN0YXRpYyIsIl9fZGlybmFtZSIsImxpc3RlbiIsImdldCIsImxvZyIsImdldEZvbGxvd2luZyIsInBvc3RNZWRpYSIsIlR3aXR0ZXIiLCJBTlNXRVJfSU5URVJWQUwiLCJRVUVTVElPTl9JTlRFUlZBTCIsInN0YXJ0Iiwib3BlblN0cmVhbSIsInNldEludGVydmFsIiwidHdlZXRSYW5kb21RdWVzdGlvbiIsInNldFN0YXJ0VGltZXMiLCJ0aW1lVW50aWw3UE0iLCJ0aW1lVW50aWxNaWRuaWdodCIsInNldFRpbWVvdXQiLCJxdWVzdGlvblRleHQiLCJxdWVzdGlvbkFsdFRleHQiLCJwcmV2TGluZUFsdFRleHQiLCJsaXZlUXVlc3Rpb24iLCJ0d2VldEFuc3dlciIsImFuc3dlckFsdFRleHQiLCJzdHJlYW0iLCJ0cmFjayIsIm9uIiwiaW5fcmVwbHlfdG9fc3RhdHVzX2lkX3N0ciIsImNyZWF0ZWRfYXQiLCJpZCIsInNjcmVlbl9uYW1lIiwicHJvZmlsZV9pbWFnZV91cmxfaHR0cHMiLCJwcm9maWxlX2Jhbm5lcl91cmwiLCJmb3VuZFF1ZXN0aW9uIiwiZmlsdGVyIiwib2JqIiwiYWNjZXB0ZWRBbnN3ZXJzIiwidXNlckFuc3dlciIsImRpc2Nvbm5lY3RNc2ciLCJnZXREYXkiLCJmcyIsIlBORyIsInVuemlwIiwiVVBMT0FEU19QQVRIIiwicGFyc2VBbmtpSnNvbiIsIm9wdGltaXplSW1hZ2VzIiwiemlwZmlsZVBhdGgiLCJjcmVhdGVSZWFkU3RyZWFtIiwicGlwZSIsIkV4dHJhY3QiLCJmaWxlcyIsInJlYWRkaXJTeW5jIiwiZXh0cmFjdENhcmRJbmZvIiwiY2xlYW5VcCIsImRpclBhdGgiLCJmaWxlc1Byb2Nlc3NpbmciLCJmb3JFYWNoIiwiY3VycmVudEZpbGUiLCJjb250ZW50cyIsInJlYWRGaWxlU3luYyIsIndyaXRlU3RyZWFtIiwiY3JlYXRlV3JpdGVTdHJlYW0iLCJjdXJyZW50SW1hZ2UiLCJyZWoiLCJmaWx0ZXJUeXBlIiwiZGVmbGF0ZUxldmVsIiwicGFyc2UiLCJwbmciLCJwYWNrIiwiYWxsIiwiYWxsTmV3Q2FyZHMiLCJzdGF0cyIsInN0YXRTeW5jIiwiaXNGaWxlIiwiSlNPTiIsImNhcmQiLCJmaWVsZHMiLCJzdHJpcEh0bWwiLCJnZXRCYXNlNjQiLCJnZXRTcmMiLCJiYXNlNjQiLCJlbmNvZGluZyIsImUiLCJyb290IiwibHN0YXRTeW5jIiwidW5saW5rU3luYyIsImlzRGlyZWN0b3J5IiwiZGVsZXRlRm9sZGVyUmVjdXJzaXZlIiwicm9vdFBhdGgiLCJleGlzdHNTeW5jIiwiY3VyUGF0aCIsInJtZGlyU3luYyIsInN0YXR1cyIsImI2NEltYWdlMSIsImFsdFRleHQxIiwiYjY0SW1hZ2UyIiwiYWx0VGV4dDIiLCJ1cGxvYWRNZWRpYSIsIm1lZGlhSWQxIiwibWVkaWFfaWRzIiwibWVkaWFJZDIiLCJ1bnNoaWZ0IiwidHdlZXRfbW9kZSIsInBvc3QiLCJyZXNwb25zZSIsImV4dGVuZGVkX2VudGl0aWVzIiwibWVkaWEiLCJtZWRpYV91cmxfaHR0cHMiLCJpZF9zdHIiLCJpZHMiLCJiNjRJbWFnZSIsImFsdFRleHQiLCJtZWRpYV9kYXRhIiwibWVkaWFJZFN0ciIsIm1lZGlhX2lkX3N0cmluZyIsIm1ldGFfcGFyYW1zIiwibWVkaWFfaWQiLCJhbHRfdGV4dCIsInVwbG9hZCIsImRlc3QiLCJuZXh0IiwiaGVhZGVyIiwic2luZ2xlIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUM3REEsSUFBTUEsZUFBZSxtQkFBQUMsQ0FBUSxFQUFSLENBQXJCOztBQUNBLElBQU1DLFFBQVEsbUJBQUFELENBQVEsQ0FBUixDQUFkOztBQUVBRSxPQUFPQyxPQUFQLGdCQUNLSixZQURMLEVBRUtFLEtBRkwsRTs7Ozs7O0FDSEEsaUM7Ozs7Ozs7Ozs7Ozs7O0FDQUEsSUFBTUcsY0FBYyxtQkFBQUosQ0FBUSxFQUFSLEVBQW1CSSxXQUF2Qzs7QUFD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R0FBRCxFQUFNQyxHQUFOLEVBQWM7QUFDbkMzRCxPQUFHNEQsU0FBSCxDQUFhRixHQUFiLEVBQWtCQyxHQUFsQjtBQUNELEdBRkQ7QUFJQXFKLE1BQUlTLEdBQUosQ0FBUSxvQkFBUixFQUE4QixVQUFDL0osR0FBRCxFQUFNQyxHQUFOLEVBQWM7QUFDMUMzRCxPQUFHaUUsUUFBSCxDQUFZUCxHQUFaLEVBQWlCQyxHQUFqQjtBQUNELEdBRkQ7QUFJQXFKLE1BQUlTLEdBQUosQ0FBUSxnQkFBUixFQUEwQixVQUFDL0osR0FBRCxFQUFNQyxHQUFOLEVBQWM7QUFDdEMzRCxPQUFHK0UsV0FBSCxDQUFlckIsR0FBZixFQUFvQkMsR0FBcEI7QUFDRCxHQUZELEVBcEJ3QixDQXlCeEI7O0FBRUFxSixNQUFJNkcsSUFBSixDQUFTLFdBQVQsRUFBc0JlLE9BQU9JLE1BQVAsQ0FBYyxTQUFkLENBQXRCLEVBQWdELFVBQUN0UixHQUFELEVBQU1DLEdBQU4sRUFBYztBQUM1RDNELE9BQUdtRSxPQUFILENBQVdULEdBQVgsRUFBZ0JDLEdBQWhCO0FBQ0QsR0FGRDtBQUlBcUosTUFBSTZHLElBQUosQ0FBUyxjQUFULEVBQXlCLFVBQUNuUSxHQUFELEVBQU1DLEdBQU4sRUFBYztBQUNyQzNELE9BQUd5RCxXQUFILENBQWVDLEdBQWYsRUFBb0JDLEdBQXBCO0FBQ0QsR0FGRDtBQUlBcUosTUFBSVMsR0FBSixDQUFRLFlBQVIsRUFBc0IsVUFBQy9KLEdBQUQsRUFBTUMsR0FBTixFQUFjO0FBQ2xDM0QsT0FBRzZFLFdBQUgsQ0FBZW5CLEdBQWYsRUFBb0JDLEdBQXBCO0FBQ0QsR0FGRDtBQUlELENBdkNELEMsQ0F1Q0UsaUI7Ozs7OztBQzFDRixtQyIsImZpbGUiOiJzZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA1KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAzYzlhYjZhMDdiMGEwOGEwY2RmNSIsImNvbnN0IHR3aXR0ZXJVdGlscyA9IHJlcXVpcmUoJy4vdHdpdHRlclV0aWxzJyk7XG5jb25zdCB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC4uLnR3aXR0ZXJVdGlscyxcbiAgLi4udXRpbHNcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlscy9pbmRleC5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJwYXRoXCJcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgTW9uZ29DbGllbnQgPSByZXF1aXJlKCdtb25nb2RiJykuTW9uZ29DbGllbnQ7XG5jb25zdCB1cmwgPSBwcm9jZXNzLmVudi5NT05HT0RCX1VSSTtcbmNvbnN0IERCID0gcHJvY2Vzcy5lbnYuTU9OR09fREI7XG5jb25zdCB7IHByb2Nlc3NVcGxvYWQgfSA9IHJlcXVpcmUoJy4vcHJvY2Vzc0Fua2lKc29uJyk7XG5jb25zdCB7IHRyeUNhdGNoIH0gPSByZXF1aXJlKCdVdGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0UmFuZG9tUXVlc3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IG1vbmdvID0gYXdhaXQgdHJ5Q2F0Y2goTW9uZ29DbGllbnQuY29ubmVjdCh1cmwpKTtcbiAgICAgIGNvbnN0IG5ld0NhcmRzID0gbW9uZ28uZGIoREIpLmNvbGxlY3Rpb24oJ25ld0NhcmRzJyk7XG4gICAgICBjb25zdCBvbGRDYXJkcyA9IG1vbmdvLmRiKERCKS5jb2xsZWN0aW9uKCdvbGRDYXJkcycpO1xuICAgICAgY29uc3QgcmFuZG9tQ2FyZCA9IGF3YWl0IHRyeUNhdGNoKG5ld0NhcmRzLmZpbmRPbmUoKSk7XG4gICAgICBpZiAocmFuZG9tQ2FyZCA9PSBudWxsKSB7XG4gICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJFbXB0eSBkZWNrLiBQbGVhc2UgQWRkIE1vcmUgQ2FyZHMgdG8gREIuXCIpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXdhaXQgdHJ5Q2F0Y2gob2xkQ2FyZHMuaW5zZXJ0KHJhbmRvbUNhcmQpKTtcbiAgICAgIGF3YWl0IHRyeUNhdGNoKG5ld0NhcmRzLnJlbW92ZShyYW5kb21DYXJkKSk7XG4gICAgICByZXNvbHZlKHJhbmRvbUNhcmQpO1xuICAgICAgbW9uZ28uY2xvc2UoKTtcbiAgICB9KTtcbiAgfSxcblxuICByZXZlYWxBbnN3ZXJXb3JrZmxvdyhjYXJkSWQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgbW9uZ28gPSBhd2FpdCB0cnlDYXRjaChNb25nb0NsaWVudC5jb25uZWN0KHVybCkpO1xuICAgICAgY29uc3Qgb2xkQ2FyZHMgPSBtb25nby5kYihEQikuY29sbGVjdGlvbignb2xkQ2FyZHMnKTtcbiAgICAgIGNvbnN0IGFuc3dlckNhcmQgPSBhd2FpdCB0cnlDYXRjaChvbGRDYXJkcy5maW5kT25lKHsgY2FyZElkIH0pKTtcbiAgICAgIHJlc29sdmUoYW5zd2VyQ2FyZCk7XG4gICAgICBhd2FpdCB0cnlDYXRjaChyZW1vdmVMaXZlUXVlc3Rpb24obW9uZ28sIGNhcmRJZCkpO1xuICAgICAgbW9uZ28uY2xvc2UoKTtcbiAgICB9KTtcbiAgfSxcblxuICBhc3luYyBhZGRMaXZlUXVlc3Rpb24ocmVjb3JkLCBtZWRpYVVybHMpIHtcbiAgICBjb25zdCB7IGNhcmRJZCB9ID0gcmVjb3JkO1xuICAgIGNvbnN0IG1vbmdvID0gYXdhaXQgdHJ5Q2F0Y2goTW9uZ29DbGllbnQuY29ubmVjdCh1cmwpKTtcbiAgICBjb25zdCBsaXZlUXVlc3Rpb25zID0gbW9uZ28uZGIoREIpLmNvbGxlY3Rpb24oJ2xpdmVRdWVzdGlvbnMnKTtcbiAgICBjb25zdCBvbGRDYXJkcyA9IG1vbmdvLmRiKERCKS5jb2xsZWN0aW9uKCdvbGRDYXJkcycpO1xuICAgIGF3YWl0IHRyeUNhdGNoKGxpdmVRdWVzdGlvbnMuaW5zZXJ0KHJlY29yZCkpO1xuICAgIGF3YWl0IHRyeUNhdGNoKFxuICAgICAgb2xkQ2FyZHMudXBkYXRlT25lKFxuICAgICAgICB7Y2FyZElkfSxcbiAgICAgICAge1xuICAgICAgICAgICRzZXQ6IHsgbWVkaWFVcmxzIH0sXG4gICAgICAgICAgJHVuc2V0OiB7IHF1ZXN0aW9uSW1nOiAnJywgcHJldkxpbmVJbWc6ICcnIH1cbiAgICAgICAgfVxuICAgICAgKVxuICAgIClcbiAgICBtb25nby5jbG9zZSgpO1xuICB9LFxuXG4gIGFzeW5jIGFkZE1lZGlhVXJsc1RvQ2FyZChjYXJkSWQsIFttZWRpYVVybF0pIHtcbiAgICBjb25zdCBtb25nbyA9IGF3YWl0IHRyeUNhdGNoKE1vbmdvQ2xpZW50LmNvbm5lY3QodXJsKSk7XG4gICAgY29uc3Qgb2xkQ2FyZHMgPSBtb25nby5kYihEQikuY29sbGVjdGlvbignb2xkQ2FyZHMnKTtcbiAgICBhd2FpdCB0cnlDYXRjaChcbiAgICAgIG9sZENhcmRzLnVwZGF0ZU9uZShcbiAgICAgICAge2NhcmRJZH0sXG4gICAgICAgIHtcbiAgICAgICAgICAkcHVzaDogeyBtZWRpYVVybHM6IG1lZGlhVXJsIH0sXG4gICAgICAgICAgJHVuc2V0OiB7IGFuc3dlckltZzogJycgfVxuICAgICAgICB9XG4gICAgICApXG4gICAgKVxuICAgIG1vbmdvLmNsb3NlKCk7XG4gIH0sXG5cbiAgYXN5bmMgdXBkYXRlTGl2ZVF1ZXN0aW9uKHF1ZXN0aW9uSWQsIHVzZXJQb2ludHMpIHtcbiAgICBjb25zdCBtb25nbyA9IGF3YWl0IHRyeUNhdGNoKE1vbmdvQ2xpZW50LmNvbm5lY3QodXJsKSk7XG4gICAgY29uc3QgbGl2ZVF1ZXN0aW9ucyA9IG1vbmdvLmRiKERCKS5jb2xsZWN0aW9uKCdsaXZlUXVlc3Rpb25zJyk7XG4gICAgY29uc3QgeyB1c2VySWQsIHBvaW50cyB9ID0gdXNlclBvaW50cztcbiAgICBjb25zdCB1cGRhdGUgPSB7XG4gICAgICAkcHVzaDoge1xuICAgICAgICBhbHJlYWR5QW5zd2VyZWQ6IHVzZXJJZCxcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKHBvaW50cyA+IDApXG4gICAgICB1cGRhdGUuJHB1c2guY2FjaGVkUG9pbnRzID0gdXNlclBvaW50cztcblxuICAgIGF3YWl0IHRyeUNhdGNoKFxuICAgICAgbGl2ZVF1ZXN0aW9ucy51cGRhdGUoe3F1ZXN0aW9uSWR9LCB1cGRhdGUpXG4gICAgKTtcbiAgICBtb25nby5jbG9zZSgpO1xuICB9LFxuXG4gIGdldExpdmVRdWVzdGlvbnMoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IG1vbmdvID0gYXdhaXQgdHJ5Q2F0Y2goTW9uZ29DbGllbnQuY29ubmVjdCh1cmwpKTtcbiAgICAgIGNvbnN0IGNvbGxlY3Rpb24gPSBtb25nby5kYihEQikuY29sbGVjdGlvbignbGl2ZVF1ZXN0aW9ucycpO1xuICAgICAgY29uc3QgbGl2ZVF1ZXN0aW9ucyA9IGF3YWl0IHRyeUNhdGNoKGNvbGxlY3Rpb24uZmluZCgpLnRvQXJyYXkoKSk7XG4gICAgICByZXNvbHZlKGxpdmVRdWVzdGlvbnMpO1xuICAgICAgbW9uZ28uY2xvc2UoKTtcbiAgICB9KTtcbiAgfSxcblxuICBhc3luYyBhZGRPclVwZGF0ZVVzZXIobmV3VXNlcikge1xuICAgIGNvbnN0IG1vbmdvID0gYXdhaXQgdHJ5Q2F0Y2goTW9uZ29DbGllbnQuY29ubmVjdCh1cmwpKTtcbiAgICBjb25zdCBzY29yZWJvYXJkID0gbW9uZ28uZGIoREIpLmNvbGxlY3Rpb24oJ3Njb3JlYm9hcmQnKTtcbiAgICBjb25zdCB7IHVzZXJJZCB9ID0gbmV3VXNlcjtcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgdHJ5Q2F0Y2goc2NvcmVib2FyZC5maW5kT25lKHt1c2VySWR9KSk7XG4gICAgaWYgKHVzZXIpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgaGFuZGxlLFxuICAgICAgICBhdmF0YXIsXG4gICAgICAgIHByb2ZpbGVCYW5uZXIsXG4gICAgICAgIGZvbGxvd2luZ1xuICAgICAgfSA9IG5ld1VzZXI7XG5cbiAgICAgIGF3YWl0IHRyeUNhdGNoKFxuICAgICAgICBzY29yZWJvYXJkLnVwZGF0ZU9uZSh7IHVzZXJJZCB9LCB7XG4gICAgICAgICAgICAkc2V0OiB7IG5hbWUgfSxcbiAgICAgICAgICAgICRzZXQ6IHsgaGFuZGxlIH0sXG4gICAgICAgICAgICAkc2V0OiB7IGF2YXRhciB9LFxuICAgICAgICAgICAgJHNldDogeyBwcm9maWxlQmFubmVyIH0sXG4gICAgICAgICAgICAkc2V0OiB7IGZvbGxvd2luZyB9XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBhd2FpdCB0cnlDYXRjaChzY29yZWJvYXJkLmluc2VydChuZXdVc2VyKSk7XG4gICAgfVxuICAgIG1vbmdvLmNsb3NlKCk7XG4gIH0sXG5cbiAgYWRqdXN0U2NvcmUocmVxLCByZXMpIHtcbiAgICAvLyBUT0RPIGFkanVzdCBhIHNjb3JlIG1hbnVhbGx5XG4gIH0sXG5cbiAgYXN5bmMgZ2V0U2NvcmVzKHJlcSwgcmVzKSB7XG4gICAgY29uc3QgbW9uZ28gPSBhd2FpdCB0cnlDYXRjaChNb25nb0NsaWVudC5jb25uZWN0KHVybCkpO1xuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSBtb25nby5kYihEQikuY29sbGVjdGlvbignc2NvcmVib2FyZCcpO1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0cnlDYXRjaChcbiAgICAgIGNvbGxlY3Rpb24uZmluZCgpXG4gICAgICAgICAgICAgICAgLnNvcnQoJ3dlZWtseVNjb3JlJywgLTEpXG4gICAgICAgICAgICAgICAgLnByb2plY3QoeydfaWQnOiAwfSlcbiAgICAgICAgICAgICAgICAudG9BcnJheSgpXG4gICAgKTtcbiAgICByZXMuanNvbihkYXRhKTtcbiAgICBtb25nby5jbG9zZSgpO1xuICB9LFxuXG4gIGFzeW5jIGdldFNjb3JlKHJlcSwgcmVzKSB7XG4gICAgY29uc3QgeyBoYW5kbGUgfSA9IHJlcS5wYXJhbXM7XG4gICAgY29uc3QgbW9uZ28gPSBhd2FpdCB0cnlDYXRjaChNb25nb0NsaWVudC5jb25uZWN0KHVybCkpO1xuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSBtb25nby5kYihEQikuY29sbGVjdGlvbignc2NvcmVib2FyZCcpO1xuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB0cnlDYXRjaChjb2xsZWN0aW9uLmZpbmRPbmUoe2hhbmRsZX0pKTtcbiAgICByZXMuanNvbih1c2VyKTtcbiAgICBtb25nby5jbG9zZSgpO1xuICB9LFxuXG4gIGFzeW5jIGFkZERlY2socmVxLCByZXMpIHtcbiAgICBjb25zdCBmaWxlUGF0aCA9IHJlcS5maWxlLnBhdGg7XG4gICAgY29uc3QgbmV3Q2FyZHMgPSBhd2FpdCB0cnlDYXRjaChwcm9jZXNzVXBsb2FkKGZpbGVQYXRoKSk7XG4gICAgY29uc3QgbW9uZ28gPSBhd2FpdCB0cnlDYXRjaChNb25nb0NsaWVudC5jb25uZWN0KHVybCkpO1xuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSBtb25nby5kYihEQikuY29sbGVjdGlvbignbmV3Q2FyZHMnKTtcbiAgICBjb25zdCBiYXRjaCA9IGNvbGxlY3Rpb24uaW5pdGlhbGl6ZVVub3JkZXJlZEJ1bGtPcCgpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdDYXJkcy5sZW5ndGg7ICsraSkge1xuICAgICAgYmF0Y2guaW5zZXJ0KG5ld0NhcmRzW2ldKTtcbiAgICB9XG5cbiAgICBhd2FpdCB0cnlDYXRjaChiYXRjaC5leGVjdXRlKCkpO1xuICAgIG1vbmdvLmNsb3NlKCk7XG5cbiAgICByZXMucmVkaXJlY3QoJy8nKTtcbiAgfSxcblxuICBnZXROZXdDYXJkcyhyZXEsIHJlcykge1xuICAgIGdldENvbGxlY3Rpb24ocmVxLCByZXMsICduZXdDYXJkcycpO1xuICB9LFxuXG4gIGdldE9sZENhcmRzKHJlcSwgcmVzKSB7XG4gICAgZ2V0Q29sbGVjdGlvbihyZXEsIHJlcywgJ29sZENhcmRzJyk7XG4gIH0sXG5cbiAgYXN5bmMgd2Vla2x5TW9udGhseVJlc2V0KHJlc2V0V2Vla2x5U2NvcmUsIHJlc2V0TW9udGhseVNjb3JlKSB7XG4gICAgY29uc3QgbW9uZ28gPSBhd2FpdCB0cnlDYXRjaChNb25nb0NsaWVudC5jb25uZWN0KHVybCkpO1xuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSBtb25nby5kYihEQikuY29sbGVjdGlvbignc2NvcmVib2FyZCcpO1xuXG4gICAgbGV0IHJlc2V0O1xuICAgIGlmIChyZXNldFdlZWtseVNjb3JlICYmIHJlc2V0TW9udGhseVNjb3JlKVxuICAgICAgcmVzZXQgPSB7XG4gICAgICAgICRzZXQ6IHsgd2Vla2x5U2NvcmU6ICAwIH0sXG4gICAgICAgICRzZXQ6IHsgbW9udGhseVNjb3JlOiAwIH1cbiAgICAgIH07XG4gICAgZWxzZSBpZiAocmVzZXRXZWVrbHlTY29yZSlcbiAgICAgIHJlc2V0ID0geyAkc2V0OiB7IHdlZWtseVNjb3JlOiAwIH0gfTtcbiAgICBlbHNlXG4gICAgICByZXNldCA9IHsgJHNldDogeyBtb250aGx5U2NvcmU6IDAgfSB9O1xuXG4gICAgY29sbGVjdGlvbi51cGRhdGUoXG4gICAgICB7fSwgcmVzZXQsIHsgbXVsdGk6IHRydWUgfVxuICAgICk7XG5cbiAgICBtb25nby5jbG9zZSgpO1xuICB9XG5cbn0gLy8gbW9kdWxlLmV4cG9ydHNcblxuXG5hc3luYyBmdW5jdGlvbiBnZXRDb2xsZWN0aW9uKHJlcSwgcmVzLCBjb2xsZWN0aW9uTmFtZSkge1xuICBjb25zdCBtb25nbyA9IGF3YWl0IHRyeUNhdGNoKE1vbmdvQ2xpZW50LmNvbm5lY3QodXJsKSk7XG4gIGNvbnN0IGNvbGxlY3Rpb24gPSBtb25nby5kYihEQikuY29sbGVjdGlvbihjb2xsZWN0aW9uTmFtZSk7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCB0cnlDYXRjaChcbiAgICBjb2xsZWN0aW9uLmZpbmQoKVxuICAgICAgICAgICAgICAucHJvamVjdCh7X2lkOiAwfSlcbiAgICAgICAgICAgICAgLnRvQXJyYXkoKVxuICApO1xuICByZXMuanNvbihkYXRhKTtcbiAgbW9uZ28uY2xvc2UoKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlTGl2ZVF1ZXN0aW9uKG1vbmdvLCBjYXJkSWQpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBjb2xsZWN0aW9uID0gbW9uZ28uZGIoREIpLmNvbGxlY3Rpb24oJ2xpdmVRdWVzdGlvbnMnKTtcbiAgICBjb25zdCBjdXJyZW50UXVlc3Rpb24gPSBhd2FpdCB0cnlDYXRjaChjb2xsZWN0aW9uLmZpbmRPbmUoe2NhcmRJZH0pKTtcbiAgICBhd2FpdCB0cnlDYXRjaChjb2xsZWN0aW9uLnJlbW92ZShjdXJyZW50UXVlc3Rpb24pKTtcbiAgICBhd2FpdCB0cnlDYXRjaChhZGRQb2ludHNUb1Njb3JlYm9hcmQobW9uZ28sIGN1cnJlbnRRdWVzdGlvbikpO1xuICAgIHJlc29sdmUoKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZFBvaW50c1RvU2NvcmVib2FyZChtb25nbywgeyBjYWNoZWRQb2ludHMsIGNhcmRJZCB9KSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3Qgc2NvcmVib2FyZCA9IG1vbmdvLmRiKERCKS5jb2xsZWN0aW9uKCdzY29yZWJvYXJkJyk7XG4gICAgY29uc3QgYW5zd2VyUG9zdGVkQXQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICBjb25zdCBvcHMgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FjaGVkUG9pbnRzLmxlbmd0aDsgKytpKSB7XG4gICAgICBjb25zdCB7IHVzZXJJZCwgcG9pbnRzIH0gPSBjYWNoZWRQb2ludHNbaV07XG4gICAgICBvcHMucHVzaCh7XG4gICAgICAgIHVwZGF0ZU9uZSA6IHtcbiAgICAgICAgICBcImZpbHRlclwiIDogeyB1c2VySWQgfSxcbiAgICAgICAgICBcInVwZGF0ZVwiIDoge1xuICAgICAgICAgICAgJGluYzoge1xuICAgICAgICAgICAgICBzY29yZTogcG9pbnRzLFxuICAgICAgICAgICAgICB3ZWVrbHlTY29yZTogcG9pbnRzLFxuICAgICAgICAgICAgICBtb250aGx5U2NvcmU6IHBvaW50c1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICRwdXNoOiB7XG4gICAgICAgICAgICAgIGNvcnJlY3RBbnN3ZXJzOiB7XG4gICAgICAgICAgICAgICAgYW5zd2VyUG9zdGVkQXQsXG4gICAgICAgICAgICAgICAgY2FyZElkLFxuICAgICAgICAgICAgICAgIHBvaW50c1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKG9wcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJlc29sdmUoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhd2FpdCB0cnlDYXRjaChzY29yZWJvYXJkLmJ1bGtXcml0ZShvcHMpKTtcbiAgICByZXNvbHZlKCk7XG4gIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2RiT3BzLmpzIiwiY29uc3QgdHdpdCA9IHJlcXVpcmUoJ3R3aXQnKTtcbmNvbnN0IHtcbiAgVFdJVFRFUl9BUElfS0VZLFxuICBUV0lUVEVSX0FQSV9TRUNSRVQsXG4gIFRXSVRURVJfVE9LRU4sXG4gIFRXSVRURVJfVE9LRU5fU0VDUkVULFxuICBUV0lUVEVSX0FDQ09VTlRcbn0gPSBwcm9jZXNzLmVudjtcblxuLy8gY29uc3QgYXBwQ29uZmlnID0ge1xuLy8gICBjb25zdW1lcl9rZXk6IFRXSVRURVJfQVBJX0tFWSxcbi8vICAgY29uc3VtZXJfc2VjcmV0OiBUV0lUVEVSX0FQSV9TRUNSRVQsXG4vLyAgIGFwcF9vbmx5X2F1dGg6IHRydWVcbi8vIH1cblxuY29uc3QgdXNlckNvbmZpZyA9IHtcbiAgY29uc3VtZXJfa2V5OiBUV0lUVEVSX0FQSV9LRVksXG4gIGNvbnN1bWVyX3NlY3JldDogVFdJVFRFUl9BUElfU0VDUkVULFxuICBhY2Nlc3NfdG9rZW46IFRXSVRURVJfVE9LRU4sXG4gIGFjY2Vzc190b2tlbl9zZWNyZXQ6IFRXSVRURVJfVE9LRU5fU0VDUkVUXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyB0d2l0KHVzZXJDb25maWcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3R3aXR0ZXJDb25maWcuanMiLCJjb25zdCB1cmxlbmNvZGUgPSByZXF1aXJlKCd1cmxlbmNvZGUnKTtcbmNvbnN0IFdFQkxPT0tVUF9VUkwgPSAnaHR0cHM6Ly9lamplLndlYmxpby5qcC9jb250ZW50Lyc7XG5jb25zdCB7IFRXSVRURVJfQUNDT1VOVCB9ID0gcHJvY2Vzcy5lbnY7XG5cbmNvbnN0IEhPVVJTID0gMzYwMDAwMDtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgSE9VUlMsXG5cbiAgZm9ybWF0UXVlc3Rpb25BbHRUZXh0KGV4cHJlc3Npb24pIHtcbiAgICBjb25zdCBoaW50ID0gZm9ybWF0SGludChleHByZXNzaW9uKTtcbiAgICBjb25zdCBbbWluLCBtYXhdID0gbWluTWF4Q2hhcnMoaGludCk7XG4gICAgY29uc3QgbWluTWF4ID0gbWluID09PSBtYXggPyBtaW4gOiBgJHttaW59IHRvICR7bWF4fWA7XG4gICAgY29uc3QgcyA9IG1heCA+IDEgPyAncycgOiAnJztcbiAgICBjb25zdCBzY3JlZW5SZWFkZXJIaW50ID0gYCgke21pbk1heH0gY2hhcmFjdGVyJHtzfSlgO1xuICAgIHJldHVybiBleHByZXNzaW9uLnJlcGxhY2UoL1xce1xcey4rP1xcfVxcfS9nLCBzY3JlZW5SZWFkZXJIaW50KTtcbiAgfSxcblxuICBmb3JtYXRRdWVzdGlvblRleHQoZXhwcmVzc2lvbiwgZW5nTWVhbmluZywgbm90ZXMsIGNhcmRJRCkge1xuICAgIGNvbnN0IGhpbnQgPSBmb3JtYXRIaW50KGV4cHJlc3Npb24pO1xuICAgIGNvbnN0IFttaW4sIG1heF0gPSBtaW5NYXhDaGFycyhoaW50KTtcbiAgICBjb25zdCBtaW5NYXggPSBtaW4gPT09IG1heCA/IG1pbiA6IGAke21pbn0tJHttYXh9YDtcbiAgICBsZXQgdHdlZXRUZXh0ID0gYFdoYXQgJHttaW5NYXh9IGNoYXJhY3RlciBhbnN3ZXIgbWVhbnMgXCIke2VuZ01lYW5pbmd9XCI/YDtcbiAgICBpZiAobmVlZHNIaW50KGhpbnQpKVxuICAgICAgdHdlZXRUZXh0ICs9IGBcXG5IaW50OiAke2hpbnR9YDtcblxuICAgIGlmIChub3RlcykgdHdlZXRUZXh0ICs9IGBcXG5Ob3RlczogJHtub3Rlc31gO1xuXG4gICAgdHdlZXRUZXh0ICs9IGBcXG5RSUQke2NhcmRJRH1gO1xuICAgIHJldHVybiB0d2VldFRleHQ7XG4gIH0sXG5cbiAgZm9ybWF0QW5zd2VyQWx0VGV4dChleHByZXNzaW9uKSB7XG4gICAgcmV0dXJuIGV4cHJlc3Npb24ucmVwbGFjZSgvXFx7XFx7Lio/XFw6XFw6KC4rPylcXDpcXDouKj9cXH1cXH0vZywgJyQxJyk7XG4gIH0sXG5cbiAgZm9ybWF0QW5zd2VyVGV4dChhbnN3ZXJzLCBlbmdNZWFuaW5nLCB3ZWJMb29rdXAsIGNhcmRJZCkge1xuICAgIGNvbnN0IHMgPSBhbnN3ZXJzLmxlbmd0aCA+IDEgPyAncycgOiAnJztcbiAgICBsZXQgYW5zd2VyVGV4dCA9IGBBbnN3ZXIke3N9OiAke2Fuc3dlcnMuam9pbignLCAnKX1gO1xuICAgIGFuc3dlclRleHQgKz0gYFxcbkVuZ2xpc2ggTWVhbmluZzogXCIke2VuZ01lYW5pbmd9XCJgO1xuICAgIGFuc3dlclRleHQgKz0gJ1xcbkRlZmluaXRpb246ICcgKyBXRUJMT09LVVBfVVJMICsgdXJsZW5jb2RlKHdlYkxvb2t1cCk7XG4gICAgYW5zd2VyVGV4dCArPSBgXFxuUUlEJHtjYXJkSWR9YDtcbiAgICByZXR1cm4gYW5zd2VyVGV4dDtcbiAgfSxcblxuICBhZGRRdWVzdGlvbkxpbmsoYW5zd2VyVGV4dCwgcXVlc3Rpb25JZCkge1xuICAgIGNvbnN0IHF1ZXN0aW9uTGluayA9IGBRdWVzdGlvbjogdHdpdHRlci5jb20vJHtUV0lUVEVSX0FDQ09VTlR9L3N0YXR1cy8ke3F1ZXN0aW9uSWR9YDtcbiAgICBjb25zdCBsaW5lcyA9IGFuc3dlclRleHQuc3BsaXQoJ1xcbicpO1xuICAgIGxpbmVzLnNwbGljZSgtMSwgMCwgcXVlc3Rpb25MaW5rKTtcbiAgICByZXR1cm4gbGluZXMuam9pbignXFxuJyk7XG4gIH0sXG5cbiAgZ2V0QW5zd2VycyhleHByZXNzaW9uLCBhbHRBbnN3ZXJzKSB7XG4gICAgY29uc3QgYWNjZXB0ZWRBbnN3ZXIgPSBleHByZXNzaW9uLm1hdGNoKC9cXDpcXDooLis/KVxcOlxcOi8pWzFdO1xuICAgIGxldCBvdGhlckFuc3dlcnMgPSBbXTtcbiAgICBpZiAoYWx0QW5zd2VycyAmJiBhbHRBbnN3ZXJzLmxlbmd0aCA+IDApXG4gICAgICBvdGhlckFuc3dlcnMgPSBhbHRBbnN3ZXJzLnNwbGl0KCcsJyk7XG5cbiAgICByZXR1cm4gW2FjY2VwdGVkQW5zd2VyXS5jb25jYXQob3RoZXJBbnN3ZXJzKTtcbiAgfSxcblxuICBjYWxjdWxhdGVTY29yZShhbnN3ZXJQb3N0ZWRBdCwge3F1ZXN0aW9uUG9zdGVkQXQsIGFscmVhZHlBbnN3ZXJlZH0pIHtcbiAgICBjb25zdCB0aW1lVG9BbnN3ZXIgPSBNYXRoLmZsb29yKFxuICAgICAgKG5ldyBEYXRlKGFuc3dlclBvc3RlZEF0KSAtIG5ldyBEYXRlKHF1ZXN0aW9uUG9zdGVkQXQpKSAvIEhPVVJTXG4gICAgKTtcbiAgICBjb25zdCBzY29yZSA9IDI0IC0gdGltZVRvQW5zd2VyO1xuXG4gICAgcmV0dXJuIE1hdGgubWF4KHNjb3JlLCAwKTtcbiAgfSxcblxuICBleHRyYWN0QW5zd2VyKHRleHQpIHtcbiAgICByZXR1cm4gdGV4dC50cmltKCkuc2xpY2UoVFdJVFRFUl9BQ0NPVU5ULmxlbmd0aCArIDIpO1xuICB9LFxuXG4gIGdldFRpbWVVbnRpbChob3VyKSB7XG4gICAgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDQ1NTI4Mi9jYWxsLWEtamF2YXNjcmlwdC1mdW5jdGlvbi1hdC1hLXNwZWNpZmljLXRpbWUtb2YtZGF5XG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICBjb25zdCBtaWxsaXNVbnRpbFRpbWUgPSBuZXcgRGF0ZShcbiAgICAgIG5vdy5nZXRGdWxsWWVhcigpLFxuICAgICAgbm93LmdldE1vbnRoKCksXG4gICAgICBub3cuZ2V0RGF0ZSgpLFxuICAgICAgaG91ciwgMCwgMCwgMCkgLSBub3c7XG5cbiAgICBpZiAobWlsbGlzVW50aWxUaW1lIDwgMCkgLy8gYWxyZWFkeSBwYXNzZWQgZm9yIHRvZGF5LCB3YWl0IHVudGlsIHRvbW9ycm93XG4gICAgICBtaWxsaXNVbnRpbFRpbWUgKz0gMjQqSE9VUlM7XG5cbiAgICByZXR1cm4gbWlsbGlzVW50aWxUaW1lO1xuICB9LFxuXG4gIHRyeUNhdGNoKHByb21pc2UpIHtcbiAgIHJldHVybiBwcm9taXNlXG4gICAgIC50aGVuKGRhdGEgPT4gZGF0YSlcbiAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgY29uc29sZS5lcnJvcignRXJyb3I6JyxlcnIpO1xuICAgICAgIHJldHVybiB7fTtcbiAgICAgfSk7XG4gIH0sXG5cbiAgY29udGFpbnMoaXRlbSwgbGlzdCkge1xuICAgIHJldHVybiB2YWxpZChsaXN0LmluZGV4T2YoaXRlbSkpO1xuICB9XG5cbn0gLy8gbW9kdWxlLmV4cG9ydHNcblxuXG5mdW5jdGlvbiB2YWxpZChpbmRleCkge1xuICByZXR1cm4gaW5kZXggIT09IC0xO1xufVxuXG5mdW5jdGlvbiBuZWVkc0hpbnQoaGludCkge1xuICByZXR1cm4gaGludC5yZXBsYWNlKC9cXFtcXF0vZywgJycpLnRyaW0oKS5sZW5ndGggIT09IDA7XG59XG5cbmZ1bmN0aW9uIG1heENoYXJzKGhpbnQpIHtcbiAgY29uc3QgbWlzc2luZ0NoYXJSZWdleCA9IC9cXFsuKj9cXF0vZztcbiAgY29uc3QgbWlzc2luZ0NoYXJzID0gKGhpbnQubWF0Y2gobWlzc2luZ0NoYXJSZWdleCkgfHwgW10pLmxlbmd0aFxuICBjb25zdCBnaW1tZUNoYXJzID0gaGludC5yZXBsYWNlKG1pc3NpbmdDaGFyUmVnZXgsICcnKS5yZXBsYWNlKC9bXFxzK1xcKFxcKV0vZywgJycpLmxlbmd0aDtcblxuICByZXR1cm4gbWlzc2luZ0NoYXJzICsgZ2ltbWVDaGFycztcbn1cblxuZnVuY3Rpb24gbWluQ2hhcnMoaGludCkge1xuICBjb25zdCBvcHRpb25hbENoYXJzID0gKGhpbnQubWF0Y2goL1xcPy9nKSB8fCBbXSkubGVuZ3RoXG4gIHJldHVybiBtYXhDaGFycyhoaW50KSAtIG9wdGlvbmFsQ2hhcnM7XG59XG5cbmZ1bmN0aW9uIG1pbk1heENoYXJzKGhpbnQpIHtcbiAgcmV0dXJuIFttaW5DaGFycyhoaW50KSwgbWF4Q2hhcnMoaGludCldO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRIaW50KGV4cHJlc3Npb24pIHtcbiAgY29uc3QgbGVnZW5kID0gZXhwcmVzc2lvbi5tYXRjaCgvXFw6XFw6Lis/XFw6XFw6KC4rPylcXH1cXH0vKVsxXTtcbiAgY29uc3Qgbm9ybWFsaXplZCA9IGdyb3VwTXVsdGlYcyhncm91cFhzKGdyb3VwUXVlc3Rpb25NYXJrcyhsZWdlbmQpKSk7XG5cbiAgcmV0dXJuIGZsYXR0ZW4oc3BsaXQobm9ybWFsaXplZCkpLm1hcChncm91cCA9PiB7XG4gICAgaWYgKGdyb3VwID09PSAnLicpXG4gICAgICByZXR1cm4gJ1tdJztcblxuICAgIGlmIChncm91cCA9PT0gJy0nKVxuICAgICAgcmV0dXJuICdbXSBbXSBbXSBbXSBbXSdcblxuICAgIGlmICgvXFw/Ly50ZXN0KGdyb3VwKSkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgICBjb25zdCBudW1DaGFycyA9IE51bWJlcihncm91cC5tYXRjaCgvXFxkKy8pWzBdKVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1DaGFyczsgaSsrKVxuICAgICAgICByZXN1bHQucHVzaCgnWz9dJylcblxuICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPT09IDEpXG4gICAgICAgIHJldHVybiAnWz9dJztcblxuICAgICAgcmV0dXJuICcoJyArIHJlc3VsdC5qb2luKCcgJykgKyAnKSdcbiAgICB9XG5cbiAgICBpZiAoL+KJoC8udGVzdChncm91cCkpIHtcbiAgICAgIGNvbnN0IG5lZ2F0ZWRDaGFycyA9IGdyb3VwLnJlcGxhY2UoL+KJoC9nLCAnJyk7XG4gICAgICByZXR1cm4gYFviiaAke25lZ2F0ZWRDaGFyc31dYFxuICAgIH1cbiAgICAvLyBlbHNlIChjaGFyYWN0ZXIgZ2ltbWUpXG4gICAgcmV0dXJuIGdyb3VwO1xuICB9KS5qb2luKCcgJyk7XG59XG5cbmZ1bmN0aW9uIGdyb3VwUXVlc3Rpb25NYXJrcyhzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC8oXFw/KykvZywgKG1hdGNoLCBwMSkgPT4gYCgke3AxLmxlbmd0aH0/KWApO1xufVxuXG5mdW5jdGlvbiBncm91cFhzKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoL+KJoFteKF0vZywgJygkJiknKTtcbn1cblxuZnVuY3Rpb24gZ3JvdXBNdWx0aVhzKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoL+KJoFxcKCguKilcXCkvZywgJyjiiaAkMSknKVxufVxuXG5mdW5jdGlvbiBzcGxpdChzdHIpIHtcbiAgcmV0dXJuIHN0ci5zcGxpdCgvW1xcKFxcKV0vKVxuICAgICAgICAgICAgLm1hcChncm91cCA9PlxuICAgICAgICAgICAgICAvXFw/fOKJoC8udGVzdChncm91cClcbiAgICAgICAgICAgICAgPyBncm91cFxuICAgICAgICAgICAgICA6IGdyb3VwLnNwbGl0KCcnKVxuICAgICAgICAgICAgKTtcbn1cblxuZnVuY3Rpb24gc2NhbGFyKHYpIHtcbiAgcmV0dXJuICFBcnJheS5pc0FycmF5KHYpO1xufVxuXG5mdW5jdGlvbiBmbGF0dGVuKGRlZXAsIGZsYXQgPSBbXSkge1xuICBpZiAoZGVlcC5sZW5ndGggPT09IDApXG4gICAgcmV0dXJuIGZsYXQ7XG5cbiAgbGV0IFtoZWFkLCAuLi50YWlsXSA9IGRlZXA7XG4gIHJldHVybiBzY2FsYXIoaGVhZClcbiAgICA/IGZsYXR0ZW4odGFpbCwgZmxhdC5jb25jYXQoaGVhZCkpXG4gICAgOiBmbGF0dGVuKHRhaWwsIGZsYXQuY29uY2F0KGZsYXR0ZW4oaGVhZCkpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlscy91dGlscy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXBvbHlmaWxsXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYmFiZWwtcG9seWZpbGxcIlxuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT0gJ2RldicpXG4gIHJlcXVpcmUoJ2RvdGVudicpLmNvbmZpZygpO1xuXG5jb25zdCBleHByZXNzID0gcmVxdWlyZSgnZXhwcmVzcycpO1xuY29uc3QgYXBwID0gZXhwcmVzcygpO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IGJvZHlQYXJzZXIgPSByZXF1aXJlKCdib2R5LXBhcnNlcicpO1xuY29uc3QgdHdpdHRlckJvdCA9IHJlcXVpcmUoJy4vdHdpdHRlckJvdCcpO1xuXG5hcHAuc2V0KCdwb3J0JywgKHByb2Nlc3MuZW52LlBPUlQgfHwgMzAwMCkpO1xuYXBwLnVzZShleHByZXNzLnN0YXRpYyhwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vZGlzdCcpKSk7XG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcblxucmVxdWlyZSgnLi9hcGknKShhcHApO1xuXG4vL3R3aXR0ZXJCb3Quc3RhcnQoKTtcblxuYXBwLmxpc3RlbihhcHAuZ2V0KCdwb3J0JyksICgpID0+XG4gIGNvbnNvbGUubG9nKCdMaXN0ZW5pbmcgb24gcG9ydCcsIGFwcC5nZXQoJ3BvcnQnKSlcbik7XG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGFwcDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zZXJ2ZXIuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJkb3RlbnZcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJkb3RlbnZcIlxuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZXhwcmVzc1wiXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvZHktcGFyc2VyXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYm9keS1wYXJzZXJcIlxuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgREIgPSByZXF1aXJlKCcuL2RiT3BzJyk7XG5jb25zdCB7XG4gIEhPVVJTLFxuICBhZGRRdWVzdGlvbkxpbmssXG4gIGNhbGN1bGF0ZVNjb3JlLFxuICBjb250YWlucyxcbiAgZXh0cmFjdEFuc3dlcixcbiAgZ2V0Rm9sbG93aW5nLFxuICBnZXRUaW1lVW50aWwsXG4gIHBvc3RNZWRpYSxcbiAgdHJ5Q2F0Y2hcbn0gPSByZXF1aXJlKCdVdGlscycpO1xuY29uc3QgVHdpdHRlciA9IHJlcXVpcmUoJy4vdHdpdHRlckNvbmZpZycpO1xuY29uc3QgeyBUV0lUVEVSX0FDQ09VTlQgfSA9IHByb2Nlc3MuZW52O1xuXG5jb25zdCBBTlNXRVJfSU5URVJWQUwgPSA0MDAwMDtcbmxldCBRVUVTVElPTl9JTlRFUlZBTCA9IDEwMDAwO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc3RhcnQ6ICgpID0+IHtcbiAgICBvcGVuU3RyZWFtKCk7XG4gICAgc2V0SW50ZXJ2YWwodHdlZXRSYW5kb21RdWVzdGlvbiwgUVVFU1RJT05fSU5URVJWQUwpXG4gIH1cbiAgLy8gc3RhcnQ6ICgpID0+IHtcbiAgLy8gICBvcGVuU3RyZWFtKCk7XG4gIC8vICAgc2V0U3RhcnRUaW1lcygpO1xuICAvLyB9XG59O1xuXG5mdW5jdGlvbiBzZXRTdGFydFRpbWVzKCkge1xuICBjb25zdCB0aW1lVW50aWw3UE0gPSBnZXRUaW1lVW50aWwoMTkpO1xuICBjb25zdCB0aW1lVW50aWxNaWRuaWdodCA9IGdldFRpbWVVbnRpbCgwKTtcblxuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBzZXRJbnRlcnZhbCh0d2VldFJhbmRvbVF1ZXN0aW9uLCBRVUVTVElPTl9JTlRFUlZBTCk7XG4gIH0sIHRpbWVVbnRpbDdQTSk7XG5cbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgc2V0SW50ZXJ2YWwod2Vla2x5TW9udGhseVJlc2V0LCAyNCpIT1VSUyk7XG4gIH0sIHRpbWVVbnRpbE1pZG5pZ2h0KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gdHdlZXRSYW5kb21RdWVzdGlvbigpIHtcbiAgY29uc3Qge1xuICAgIGNhcmRJZCxcbiAgICBxdWVzdGlvblRleHQsXG4gICAgcXVlc3Rpb25JbWcsXG4gICAgcXVlc3Rpb25BbHRUZXh0LFxuICAgIHByZXZMaW5lSW1nLFxuICAgIHByZXZMaW5lQWx0VGV4dCxcbiAgICBhbnN3ZXJzXG4gIH0gPSBhd2FpdCB0cnlDYXRjaChEQi5nZXRSYW5kb21RdWVzdGlvbigpKTtcbiAgaWYgKCFjYXJkSWQpIHJldHVybjtcblxuICBjb25zdCB7XG4gICAgcXVlc3Rpb25JZCxcbiAgICBxdWVzdGlvblBvc3RlZEF0LFxuICAgIG1lZGlhVXJsc1xuICB9ID0gYXdhaXQgdHJ5Q2F0Y2goXG4gICAgcG9zdE1lZGlhKFxuICAgICAgcXVlc3Rpb25UZXh0LFxuICAgICAgcXVlc3Rpb25JbWcsXG4gICAgICBxdWVzdGlvbkFsdFRleHQsXG4gICAgICBwcmV2TGluZUltZyxcbiAgICAgIHByZXZMaW5lQWx0VGV4dFxuICAgIClcbiAgKTtcblxuICBjb25zdCBsaXZlUXVlc3Rpb24gPSB7XG4gICAgY2FyZElkLFxuICAgIHF1ZXN0aW9uSWQsXG4gICAgYW5zd2VycyxcbiAgICBxdWVzdGlvblBvc3RlZEF0LFxuICAgIGNhY2hlZFBvaW50czogW10sXG4gICAgYWxyZWFkeUFuc3dlcmVkOiBbXVxuICB9O1xuICBEQi5hZGRMaXZlUXVlc3Rpb24obGl2ZVF1ZXN0aW9uLCBtZWRpYVVybHMpO1xuICBzZXRUaW1lb3V0KCgpID0+IHR3ZWV0QW5zd2VyKGNhcmRJZCwgcXVlc3Rpb25JZCksIEFOU1dFUl9JTlRFUlZBTCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHR3ZWV0QW5zd2VyKGNhcmRJZCwgcXVlc3Rpb25JZCkge1xuICBjb25zdCB7XG4gICAgYW5zd2VyVGV4dCxcbiAgICBhbnN3ZXJJbWcsXG4gICAgYW5zd2VyQWx0VGV4dFxuICB9ID0gYXdhaXQgdHJ5Q2F0Y2goXG4gICAgLy8gRUZGRUNUUzpcbiAgICAvLyAtIHJlbW92ZXMgcXVlc3Rpb24gZnJvbSBsaXZlUXVlc3Rpb25zXG4gICAgLy8gLSBhZGRzIGNhY2hlZCBwb2ludHMgdG8gc2NvcmVib2FyZFxuICAgIC8vXG4gICAgLy8gUkVUVVJOUzpcbiAgICAvLyBBbnN3ZXJDYXJkXG4gICAgREIucmV2ZWFsQW5zd2VyV29ya2Zsb3coY2FyZElkKVxuICApO1xuXG4gIGNvbnN0IHsgbWVkaWFVcmxzIH0gPSBhd2FpdCB0cnlDYXRjaChcbiAgICBwb3N0TWVkaWEoXG4gICAgICBhZGRRdWVzdGlvbkxpbmsoYW5zd2VyVGV4dCwgcXVlc3Rpb25JZCksXG4gICAgICBhbnN3ZXJJbWcsXG4gICAgICBhbnN3ZXJBbHRUZXh0XG4gICAgKVxuICApO1xuXG4gIERCLmFkZE1lZGlhVXJsc1RvQ2FyZChjYXJkSWQsIG1lZGlhVXJscyk7XG59XG5cbmZ1bmN0aW9uIG9wZW5TdHJlYW0oKSB7XG4gIGNvbnN0IHN0cmVhbSA9IFR3aXR0ZXIuc3RyZWFtKCdzdGF0dXNlcy9maWx0ZXInLCB7IHRyYWNrOiBgQCR7VFdJVFRFUl9BQ0NPVU5UfWAgfSk7XG5cbiAgc3RyZWFtLm9uKCd0d2VldCcsIGFzeW5jICh7XG4gICAgaW5fcmVwbHlfdG9fc3RhdHVzX2lkX3N0cjogcXVlc3Rpb25JZCxcbiAgICBjcmVhdGVkX2F0OiBhbnN3ZXJQb3N0ZWRBdCxcbiAgICB0ZXh0LFxuICAgIHVzZXI6IHtcbiAgICAgIGlkOiB1c2VySWQsXG4gICAgICBuYW1lLFxuICAgICAgc2NyZWVuX25hbWU6IGhhbmRsZSxcbiAgICAgIHByb2ZpbGVfaW1hZ2VfdXJsX2h0dHBzOiBhdmF0YXIsXG4gICAgICBwcm9maWxlX2Jhbm5lcl91cmw6IHByb2ZpbGVCYW5uZXJcbiAgICB9XG4gIH0pID0+IHtcbiAgICBjb25zdCBsaXZlUXVlc3Rpb25zID0gYXdhaXQgdHJ5Q2F0Y2goREIuZ2V0TGl2ZVF1ZXN0aW9ucygpKTtcbiAgICBjb25zdCBmb3VuZFF1ZXN0aW9uID0gbGl2ZVF1ZXN0aW9ucy5maWx0ZXIoXG4gICAgICBvYmogPT4gb2JqLnF1ZXN0aW9uSWQgPT09IHF1ZXN0aW9uSWRcbiAgICApWzBdO1xuXG4gICAgaWYgKGZvdW5kUXVlc3Rpb24pIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgYWxyZWFkeUFuc3dlcmVkLFxuICAgICAgICBhbnN3ZXJzOiBhY2NlcHRlZEFuc3dlcnNcbiAgICAgIH0gPSBmb3VuZFF1ZXN0aW9uO1xuICAgICAgaWYgKGNvbnRhaW5zKHVzZXJJZCwgYWxyZWFkeUFuc3dlcmVkKSlcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgICBjb25zdCB1c2VyQW5zd2VyID0gZXh0cmFjdEFuc3dlcih0ZXh0KTtcbiAgICAgIGlmIChjb250YWlucyh1c2VyQW5zd2VyLCBhY2NlcHRlZEFuc3dlcnMpKSB7XG4gICAgICAgIGNvbnN0IHBvaW50cyA9IGNhbGN1bGF0ZVNjb3JlKGFuc3dlclBvc3RlZEF0LCBmb3VuZFF1ZXN0aW9uKTtcbiAgICAgICAgY29uc3QgZm9sbG93aW5nID0gYXdhaXQgdHJ5Q2F0Y2goZ2V0Rm9sbG93aW5nKHVzZXJJZCkpO1xuICAgICAgICBjb25zdCBuZXdVc2VyID0ge1xuICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIGhhbmRsZSxcbiAgICAgICAgICBhdmF0YXIsXG4gICAgICAgICAgcHJvZmlsZUJhbm5lcixcbiAgICAgICAgICBmb2xsb3dpbmcsXG4gICAgICAgICAgc2NvcmU6IDAsXG4gICAgICAgICAgbW9udGhseVNjb3JlOiAwLFxuICAgICAgICAgIHdlZWtseVNjb3JlOiAwLFxuICAgICAgICAgIGNvcnJlY3RBbnN3ZXJzOiBbXVxuICAgICAgICB9O1xuICAgICAgICBEQi5hZGRPclVwZGF0ZVVzZXIobmV3VXNlcik7XG4gICAgICAgIERCLnVwZGF0ZUxpdmVRdWVzdGlvbihxdWVzdGlvbklkLCB7IHVzZXJJZCwgcG9pbnRzIH0pO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBEQi51cGRhdGVMaXZlUXVlc3Rpb24ocXVlc3Rpb25JZCwgeyB1c2VySWQsIHBvaW50czogMCB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHN0cmVhbS5vbignZGlzY29ubmVjdCcsIChkaXNjb25uZWN0TXNnKSA9PiB7XG4gICAgY29uc29sZS5lcnJvcignVHdlZXQgc3RyZWFtIGRpc2Nvbm5lY3RlZDonLCBkaXNjb25uZWN0TXNnKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHN0cmVhbS5zdGFydCgpLCAxMDApO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gd2Vla2x5TW9udGhseVJlc2V0KCkge1xuICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICBjb25zdCByZXNldFdlZWtseVNjb3JlID0gbm93LmdldERheSgpID09PSAwO1xuICBjb25zdCByZXNldE1vbnRobHlTY29yZSA9IG5vdy5nZXREYXRlKCkgPT09IDE7XG5cbiAgaWYgKHJlc2V0V2Vla2x5U2NvcmUgfHwgcmVzZXRNb250aGx5U2NvcmUpXG4gICAgREIud2Vla2x5TW9udGhseVJlc2V0KHJlc2V0V2Vla2x5U2NvcmUsIHJlc2V0TW9udGhseVNjb3JlKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy90d2l0dGVyQm90LmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9uZ29kYlwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIm1vbmdvZGJcIlxuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuY29uc3QgUE5HID0gcmVxdWlyZSgncG5nanMyJykuUE5HO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IHVuemlwID0gcmVxdWlyZSgndW56aXAtc3RyZWFtJyk7XG5jb25zdCBVUExPQURTX1BBVEggPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vdXBsb2FkcycpO1xuY29uc3Qge1xuICBmb3JtYXRRdWVzdGlvbkFsdFRleHQsXG4gIGZvcm1hdFF1ZXN0aW9uVGV4dCxcbiAgZm9ybWF0QW5zd2VyQWx0VGV4dCxcbiAgZm9ybWF0QW5zd2VyVGV4dCxcbiAgZ2V0QW5zd2VycyxcbiAgdHJ5Q2F0Y2hcbn0gPSByZXF1aXJlKCdVdGlscycpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBwcm9jZXNzVXBsb2FkLFxuICBwYXJzZUFua2lKc29uLFxuICBvcHRpbWl6ZUltYWdlc1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzVXBsb2FkKHppcGZpbGVQYXRoKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3Qgc3RyZWFtID0gZnMuY3JlYXRlUmVhZFN0cmVhbSh6aXBmaWxlUGF0aClcbiAgICAgIC5waXBlKHVuemlwLkV4dHJhY3QoeyBwYXRoOiAndXBsb2FkcycgfSkpO1xuXG4gICAgc3RyZWFtLm9uKCdjbG9zZScsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGZpbGVzID0gZnMucmVhZGRpclN5bmMoVVBMT0FEU19QQVRIKTtcbiAgICAgIGF3YWl0IHRyeUNhdGNoKG9wdGltaXplSW1hZ2VzKFVQTE9BRFNfUEFUSCArICcvbWVkaWEnKSk7XG4gICAgICBjb25zb2xlLmxvZygnRmluaXNoZWQgb3B0aW1pemluZyBpbWFnZXMhJyk7XG4gICAgICBjb25zdCBuZXdDYXJkcyA9IGV4dHJhY3RDYXJkSW5mbyhmaWxlcyk7XG5cbiAgICAgIGNsZWFuVXAoZmlsZXMpO1xuICAgICAgcmVzb2x2ZShuZXdDYXJkcyk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBvcHRpbWl6ZUltYWdlcyhkaXJQYXRoKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgZmlsZXNQcm9jZXNzaW5nID0gW107XG4gICAgZnMucmVhZGRpclN5bmMoZGlyUGF0aCkuZm9yRWFjaChmaWxlID0+IHtcbiAgICAgIGlmICgvLipcXC5wbmckLy50ZXN0KGZpbGUpKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRGaWxlID0gZGlyUGF0aCArIFwiL1wiICsgZmlsZTtcbiAgICAgICAgY29uc3QgY29udGVudHMgPSBmcy5yZWFkRmlsZVN5bmMoY3VycmVudEZpbGUpO1xuICAgICAgICBjb25zdCB3cml0ZVN0cmVhbSA9IGZzLmNyZWF0ZVdyaXRlU3RyZWFtKGN1cnJlbnRGaWxlKTtcbiAgICAgICAgY29uc3QgY3VycmVudEltYWdlID0gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PlxuICAgICAgICAgIHdyaXRlU3RyZWFtLm9uKCdjbG9zZScsIHJlcylcbiAgICAgICAgKTtcbiAgICAgICAgZmlsZXNQcm9jZXNzaW5nLnB1c2goY3VycmVudEltYWdlKTtcbiAgICAgICAgbmV3IFBORyh7IGZpbHRlclR5cGU6IDQsIGRlZmxhdGVMZXZlbDogMSB9KVxuICAgICAgICAgIC5wYXJzZShjb250ZW50cywgKGVyciwgcG5nKSA9PiB7XG4gICAgICAgICAgICAvLyBHaXZlIHVwcGVyIGxlZnQgcGl4ZWwgYW4gb3BhY2l0eVxuICAgICAgICAgICAgLy8gb2YgMjU0IHNvIFR3aXR0ZXIgd29uJ3QgY29udmVydFxuICAgICAgICAgICAgLy8gdG8ganBlZ1xuICAgICAgICAgICAgcG5nLmRhdGFbM10gLT0gMTtcbiAgICAgICAgICAgIHBuZy5wYWNrKCkucGlwZSh3cml0ZVN0cmVhbSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgUHJvbWlzZS5hbGwoZmlsZXNQcm9jZXNzaW5nKS50aGVuKHJlc29sdmUpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZXh0cmFjdENhcmRJbmZvKGZpbGVzKSB7XG4gIGxldCBhbGxOZXdDYXJkcyA9IFtdO1xuICBmb3IgKGxldCBmaWxlIG9mIGZpbGVzKSB7XG4gICAgY29uc3QgY3VycmVudEZpbGUgPSBgJHtVUExPQURTX1BBVEh9LyR7ZmlsZX1gO1xuICAgIGNvbnN0IHN0YXRzID0gZnMuc3RhdFN5bmMoY3VycmVudEZpbGUpO1xuXG4gICAgaWYgKHN0YXRzLmlzRmlsZSgpICYmIGZpbGUubWF0Y2goLy4rXFwuanNvbiQvKSkge1xuICAgICAgY29uc3QgbmV3Q2FyZHMgPSBwYXJzZUFua2lKc29uKGN1cnJlbnRGaWxlKTtcbiAgICAgIGFsbE5ld0NhcmRzID0gYWxsTmV3Q2FyZHMuY29uY2F0KG5ld0NhcmRzKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGFsbE5ld0NhcmRzO1xufVxuXG5mdW5jdGlvbiBwYXJzZUFua2lKc29uKGZpbGVQYXRoKSB7XG4gIGNvbnN0IGNvbnRlbnRzID0gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoZmlsZVBhdGgsICd1dGY4JykpO1xuICByZXR1cm4gY29udGVudHMubm90ZXMubWFwKGNhcmQgPT4ge1xuICAgIGxldCBbXG4gICAgICBleHByZXNzaW9uLFxuICAgICAgLCAvLyByZWFkaW5nLFxuICAgICAgLC8vIGphcE1lYW5pbmcsXG4gICAgICBlbmdNZWFuaW5nLFxuICAgICAgLCAvLyBvZmZpY2lhbEVuZyxcbiAgICAgIHF1ZXN0aW9uSW1nLFxuICAgICAgYW5zd2VySW1nLFxuICAgICAgLCAvLyBhdWRpb1xuICAgICAgcHJldkxpbmVJbWcsXG4gICAgICBwcmV2TGluZUFsdFRleHQsXG4gICAgICBhbHRBbnN3ZXJzLFxuICAgICAgd2ViTG9va3VwLCAvLyB1c2UgZm9yIGV2ZXJ5IGFuc3dlciBzbyBwZW9wbGUgY2FuIGxvb2sgdXAgcHJvbnVuY2lhdGlvblxuICAgICAgICAgICAgICAgICAvLyBodHRwczovL2VqamUud2VibGlvLmpwL2NvbnRlbnQvW3dlYkxvb2t1cCAoZS5nLiDliIfjgormj5vjgYjjgospXVxuICAgICAgbm90ZXMsXG4gICAgICBjYXJkSWRcbiAgICBdID0gY2FyZC5maWVsZHM7XG5cbiAgICBbZXhwcmVzc2lvbiwgZW5nTWVhbmluZywgbm90ZXNdID0gW2V4cHJlc3Npb24sIGVuZ01lYW5pbmcsIG5vdGVzXS5tYXAoc3RyaXBIdG1sKTtcbiAgICBjb25zdCBhbnN3ZXJzID0gZ2V0QW5zd2VycyhleHByZXNzaW9uLCBhbHRBbnN3ZXJzKTtcblxuICAgIHJldHVybiB7XG4gICAgICBjYXJkSWQsXG4gICAgICBxdWVzdGlvblRleHQ6ICAgIGZvcm1hdFF1ZXN0aW9uVGV4dChleHByZXNzaW9uLCBlbmdNZWFuaW5nLCBub3RlcywgY2FyZElkKSxcbiAgICAgIHF1ZXN0aW9uSW1nOiAgICAgZ2V0QmFzZTY0KHF1ZXN0aW9uSW1nKSxcbiAgICAgIHF1ZXN0aW9uQWx0VGV4dDogZm9ybWF0UXVlc3Rpb25BbHRUZXh0KGV4cHJlc3Npb24pLFxuICAgICAgcHJldkxpbmVJbWc6ICAgICBnZXRCYXNlNjQocHJldkxpbmVJbWcpLFxuICAgICAgcHJldkxpbmVBbHRUZXh0LFxuICAgICAgYW5zd2VyVGV4dDogICAgICBmb3JtYXRBbnN3ZXJUZXh0KGFuc3dlcnMsIGVuZ01lYW5pbmcsIHdlYkxvb2t1cCwgY2FyZElkKSxcbiAgICAgIGFuc3dlckltZzogICAgICAgZ2V0QmFzZTY0KGFuc3dlckltZyksXG4gICAgICBhbnN3ZXJBbHRUZXh0OiAgIGZvcm1hdEFuc3dlckFsdFRleHQoZXhwcmVzc2lvbiksXG4gICAgICBhbnN3ZXJzLFxuICAgICAgbWVkaWFVcmxzOiBbXVxuICAgIH07XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzdHJpcEh0bWwoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcucmVwbGFjZSgvPC4qPz58Ji4qOy9nLCAnJyk7XG59XG5cbmZ1bmN0aW9uIGdldFNyYyhzdHJpbmcpIHtcbiAgcmV0dXJuIChzdHJpbmcubWF0Y2goL3NyYz1cIiguKylcIi8pIHx8IFssXSlbMV07XG59XG5cbmZ1bmN0aW9uIGdldEJhc2U2NChzdHJpbmcpIHtcbiAgaWYgKCFzdHJpbmcgfHwgc3RyaW5nLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gIGxldCBiYXNlNjQ7XG4gIHRyeSB7XG4gICAgYmFzZTY0ID0gZnMucmVhZEZpbGVTeW5jKFxuICAgICAgYCR7VVBMT0FEU19QQVRIfS9tZWRpYS8ke2dldFNyYyhzdHJpbmcpfWAsXG4gICAgICB7IGVuY29kaW5nOiAnYmFzZTY0JyB9XG4gICAgKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIHJldHVybmluZyB1bmRlZmluZWQuLi5cbiAgfVxuICByZXR1cm4gYmFzZTY0O1xufVxuXG5mdW5jdGlvbiBjbGVhblVwKGZpbGVzKSB7XG4gIGZvciAobGV0IGZpbGUgb2YgZmlsZXMpIHtcbiAgICBjb25zdCByb290ID0gYCR7VVBMT0FEU19QQVRIfS8ke2ZpbGV9YDtcblxuICAgIGlmIChmcy5sc3RhdFN5bmMocm9vdCkuaXNGaWxlKCkpXG4gICAgICBmcy51bmxpbmtTeW5jKHJvb3QpO1xuICAgIGVsc2UgaWYgKGZzLmxzdGF0U3luYyhyb290KS5pc0RpcmVjdG9yeSgpKVxuICAgICAgZGVsZXRlRm9sZGVyUmVjdXJzaXZlKHJvb3QpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZUZvbGRlclJlY3Vyc2l2ZShyb290UGF0aCkge1xuICBpZiAoZnMuZXhpc3RzU3luYyhyb290UGF0aCkpIHtcbiAgICBmcy5yZWFkZGlyU3luYyhyb290UGF0aCkuZm9yRWFjaChmaWxlID0+IHtcbiAgICAgIGNvbnN0IGN1clBhdGggPSByb290UGF0aCArIFwiL1wiICsgZmlsZTtcbiAgICAgIGlmIChmcy5sc3RhdFN5bmMoY3VyUGF0aCkuaXNEaXJlY3RvcnkoKSkgeyAvLyByZWN1cnNlXG4gICAgICAgIGRlbGV0ZUZvbGRlclJlY3Vyc2l2ZShjdXJQYXRoKTtcbiAgICAgIH0gZWxzZSB7IC8vIGRlbGV0ZSBmaWxlXG4gICAgICAgIGZzLnVubGlua1N5bmMoY3VyUGF0aCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgZnMucm1kaXJTeW5jKHJvb3RQYXRoKTtcbiAgfVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wcm9jZXNzQW5raUpzb24uanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImZzXCJcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBuZ2pzMlwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInBuZ2pzMlwiXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1bnppcC1zdHJlYW1cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ1bnppcC1zdHJlYW1cIlxuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgVHdpdHRlciA9IHJlcXVpcmUoJy4uL3R3aXR0ZXJDb25maWcnKTtcbmNvbnN0IHsgdHJ5Q2F0Y2ggfSA9IHJlcXVpcmUoJ1V0aWxzL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gIC8vXG4gIC8vIHBvc3QgYSB0d2VldCB3aXRoIG1lZGlhXG4gIC8vXG4gIHBvc3RNZWRpYShzdGF0dXMsIGI2NEltYWdlMSwgYWx0VGV4dDEsIGI2NEltYWdlMiwgYWx0VGV4dDIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgbWVkaWFJZDEgPSBhd2FpdCB0cnlDYXRjaCh1cGxvYWRNZWRpYShiNjRJbWFnZTEsIGFsdFRleHQxKSk7XG4gICAgICBjb25zdCBtZWRpYV9pZHMgPSBbbWVkaWFJZDFdO1xuICAgICAgaWYgKGI2NEltYWdlMikge1xuICAgICAgICBjb25zdCBtZWRpYUlkMiA9IGF3YWl0IHRyeUNhdGNoKHVwbG9hZE1lZGlhKGI2NEltYWdlMiwgYWx0VGV4dDIpKTtcbiAgICAgICAgbWVkaWFfaWRzLnVuc2hpZnQobWVkaWFJZDIpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwYXJhbXMgPSB7IHN0YXR1cywgbWVkaWFfaWRzLCB0d2VldF9tb2RlOiAnZXh0ZW5kZWQnIH07XG4gICAgICBUd2l0dGVyLnBvc3QoJ3N0YXR1c2VzL3VwZGF0ZScsIHBhcmFtcywgKGVyciwgZGF0YSwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKVxuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJQb3N0aW5nIHN0YXR1cyBmYWlsZWQuXCIpKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgbWVkaWFVcmxzID0gZGF0YS5leHRlbmRlZF9lbnRpdGllcy5tZWRpYS5tYXAoXG4gICAgICAgICAgb2JqID0+IG9iai5tZWRpYV91cmxfaHR0cHNcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgICAgIHF1ZXN0aW9uSWQ6ICAgICAgIGRhdGEuaWRfc3RyLFxuICAgICAgICAgIHF1ZXN0aW9uUG9zdGVkQXQ6IGRhdGEuY3JlYXRlZF9hdCxcbiAgICAgICAgICBtZWRpYVVybHNcbiAgICAgICAgfTtcbiAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG5cbiAgZ2V0Rm9sbG93aW5nKHVzZXJJZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBUd2l0dGVyLmdldCgnZnJpZW5kcy9pZHMnLCB7IHVzZXJJZCB9LCAoZXJyLCBkYXRhLCByZXNwb25zZSkgPT4ge1xuICAgICAgICBpZiAoZXJyKSBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgIHJlc29sdmUoZGF0YS5pZHMpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxufSAvLyBtb2R1bGUuZXhwb3J0c1xuXG5cbi8vIEVGRkVDVFM6XG4vLyB1cGxvYWRzIGEgc2luZ2xlIGltYWdlIHdpdGggYWx0VGV4dCB0byBUd2l0dGVyXG4vL1xuLy8gUkVUVVJOUzpcbi8vIG1lZGlhX2lkIHdoaWNoIGlzIG5lY2Vzc2FyeSBmb3Jcbi8vIGF0dGFjaGluZyBtZWRpYSB0byBhIHR3ZWV0XG4vL1xuZnVuY3Rpb24gdXBsb2FkTWVkaWEoYjY0SW1hZ2UsIGFsdFRleHQpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAvLyBmaXJzdCB3ZSBtdXN0IHBvc3QgdGhlIG1lZGlhIHRvIFR3aXR0ZXJcbiAgICBUd2l0dGVyLnBvc3QoJ21lZGlhL3VwbG9hZCcsIHsgbWVkaWFfZGF0YTogYjY0SW1hZ2UgfSwgKGVyciwgZGF0YSwgcmVzcG9uc2UpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICByZWplY3QobmV3IEVycm9yKFwiTWVkaWEgdXBsb2FkIGZhaWxlZC5cIikpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBub3cgd2UgY2FuIGFzc2lnbiBhbHQgdGV4dCB0byB0aGUgbWVkaWEsIGZvciB1c2UgYnkgc2NyZWVuIHJlYWRlcnMgYW5kXG4gICAgICAvLyBvdGhlciB0ZXh0LWJhc2VkIHByZXNlbnRhdGlvbnMgYW5kIGludGVycHJldGVyc1xuICAgICAgY29uc3QgbWVkaWFJZFN0ciA9IGRhdGEubWVkaWFfaWRfc3RyaW5nO1xuICAgICAgY29uc3QgbWV0YV9wYXJhbXMgPSB7IG1lZGlhX2lkOiBtZWRpYUlkU3RyLCBhbHRfdGV4dDogeyB0ZXh0OiBhbHRUZXh0IH0gfVxuXG4gICAgICBUd2l0dGVyLnBvc3QoJ21lZGlhL21ldGFkYXRhL2NyZWF0ZScsIG1ldGFfcGFyYW1zLCAoZXJyLCBkYXRhLCByZXNwb25zZSkgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJNZWRpYSB1cGxvYWQgc3VjY2VlZGVkLCBtZWRpYSBjcmVhdGlvbiBmYWlsZWQuXCIpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBub3cgd2UgY2FuIHJlZmVyZW5jZSB0aGUgbWVkaWEgYW5kIHBvc3QgYSB0d2VldCAobWVkaWEgd2lsbCBhdHRhY2ggdG8gdGhlIHR3ZWV0KVxuICAgICAgICByZXNvbHZlKG1lZGlhSWRTdHIpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWxzL3R3aXR0ZXJVdGlscy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInR3aXRcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ0d2l0XCJcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInVybGVuY29kZVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInVybGVuY29kZVwiXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBEQiA9IHJlcXVpcmUoJy4vZGJPcHMnKTtcbmNvbnN0IHVwbG9hZCA9IHJlcXVpcmUoJ211bHRlcicpKHsgZGVzdDogJ3VwbG9hZHMvJyB9KTtcblxubW9kdWxlLmV4cG9ydHMgPSAoYXBwKSA9PiB7XG5cbiAgLy8gQ09SU1xuICBhcHAudXNlKChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgIHJlcy5oZWFkZXIoJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbicsICcqJyk7XG4gICAgcmVzLmhlYWRlcignQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kcycsICdHRVQsIE9QVElPTlMnKTtcbiAgICByZXMuaGVhZGVyKCdBY2Nlc3MtQ29udHJvbC1NYXgtQWdlJywgJzg2NDAwJyk7IC8vIDI0IGhvdXJzXG4gICAgcmVzLmhlYWRlcignQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycycsXG4gICAgICAgICAgICAgICAnT3JpZ2luLCBYLVJlcXVlc3RlZC1XaXRoLCBDb250ZW50LVR5cGUsIEFjY2VwdCcpO1xuICAgIG5leHQoKTtcbiAgfSk7XG5cbiAgYXBwLmdldCgnL2FwaS9zY29yZXMnLCAocmVxLCByZXMpID0+IHtcbiAgICBEQi5nZXRTY29yZXMocmVxLCByZXMpO1xuICB9KTtcblxuICBhcHAuZ2V0KCcvYXBpL3Njb3JlLzpoYW5kbGUnLCAocmVxLCByZXMpID0+IHtcbiAgICBEQi5nZXRTY29yZShyZXEsIHJlcyk7XG4gIH0pO1xuXG4gIGFwcC5nZXQoJy9hcGkvY2FyZHMvb2xkJywgKHJlcSwgcmVzKSA9PiB7XG4gICAgREIuZ2V0T2xkQ2FyZHMocmVxLCByZXMpO1xuICB9KTtcblxuXG4gIC8vIFRPRE8gLSBhZGQgYXV0aGVudGljYXRpb24gdG8gZm9sbG93aW5nIGVuZHBvaW50c1xuXG4gIGFwcC5wb3N0KCcvZGVjay9uZXcnLCB1cGxvYWQuc2luZ2xlKCd6aXBmaWxlJyksIChyZXEsIHJlcykgPT4ge1xuICAgIERCLmFkZERlY2socmVxLCByZXMpO1xuICB9KTtcblxuICBhcHAucG9zdCgnL3Njb3Jlcy9lZGl0JywgKHJlcSwgcmVzKSA9PiB7XG4gICAgREIuYWRqdXN0U2NvcmUocmVxLCByZXMpO1xuICB9KTtcblxuICBhcHAuZ2V0KCcvY2FyZHMvbmV3JywgKHJlcSwgcmVzKSA9PiB7XG4gICAgREIuZ2V0TmV3Q2FyZHMocmVxLCByZXMpO1xuICB9KTtcblxufSAvLyBtb2R1bGUuZXhwb3J0c1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwaS5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm11bHRlclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIm11bHRlclwiXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9