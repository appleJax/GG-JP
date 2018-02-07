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

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
              return tryCatch(liveQuestions.insert(_extends({}, record, {
                mediaUrls: mediaUrls
              })));

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
  // TODO - delete this method if not needed
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
  }(),
  getCards: function () {
    var _getCards = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee12(req, res) {
      var ids, mongo, collection, data;
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              ids = req.query.ids;
              _context12.next = 3;
              return tryCatch(MongoClient.connect(url));

            case 3:
              mongo = _context12.sent;
              collection = mongo.db(DB).collection('oldCards');
              _context12.next = 7;
              return tryCatch(collection.find({
                cardId: {
                  $in: ids
                }
              }).project({
                _id: 0,
                mediaUrls: 1
              }).toArray());

            case 7:
              data = _context12.sent;
              res.json(data);
              mongo.close();

            case 10:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, this);
    }));

    return function getCards(_x22, _x23) {
      return _getCards.apply(this, arguments);
    };
  }()
}; // module.exports

function getCollection(_x24, _x25, _x26) {
  return _getCollection.apply(this, arguments);
}

function _getCollection() {
  _getCollection = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee15(req, res, collectionName) {
    var mongo, collection, data;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return tryCatch(MongoClient.connect(url));

          case 2:
            mongo = _context15.sent;
            collection = mongo.db(DB).collection(collectionName);
            _context15.next = 6;
            return tryCatch(collection.find().project({
              _id: 0
            }).toArray());

          case 6:
            data = _context15.sent;
            res.json(data);
            mongo.close();

          case 9:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15, this);
  }));
  return _getCollection.apply(this, arguments);
}

function removeLiveQuestion(mongo, cardId) {
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref6 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee13(resolve, reject) {
      var collection, currentQuestion;
      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              collection = mongo.db(DB).collection('liveQuestions');
              _context13.next = 3;
              return tryCatch(collection.findOne({
                cardId: cardId
              }));

            case 3:
              currentQuestion = _context13.sent;
              _context13.next = 6;
              return tryCatch(collection.remove(currentQuestion));

            case 6:
              _context13.next = 8;
              return tryCatch(addPointsToScoreboard(mongo, currentQuestion));

            case 8:
              resolve();

            case 9:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13, this);
    }));

    return function (_x27, _x28) {
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
    regeneratorRuntime.mark(function _callee14(resolve, reject) {
      var scoreboard, oldCards, answerPostedAt, ops, i, _cachedPoints$i, userId, points;

      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              scoreboard = mongo.db(DB).collection('scoreboard');
              oldCards = mongo.db(DB).collection('oldCards');
              answerPostedAt = new Date().getTime();
              oldCards.updateOne({
                cardId: cardId
              }, {
                $set: {
                  answerPostedAt: answerPostedAt
                }
              });
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
                _context14.next = 9;
                break;
              }

              resolve();
              return _context14.abrupt("return");

            case 9:
              _context14.next = 11;
              return tryCatch(scoreboard.bulkWrite(ops));

            case 11:
              resolve();

            case 12:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14, this);
    }));

    return function (_x29, _x30) {
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
  app.get('/api/live', function (req, res) {
    res.json(DB.getLiveQuestions());
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
/* 21 */
/***/ (function(module, exports) {

module.exports = require("multer");

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDY1ZTEzYTAzNmY5Nzk5MjJjNzkiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhdGhcIiIsIndlYnBhY2s6Ly8vLi9zcmMvZGJPcHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3R3aXR0ZXJDb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3V0aWxzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXBvbHlmaWxsXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJkb3RlbnZcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYm9keS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vLi9zcmMvdHdpdHRlckJvdC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb25nb2RiXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3NBbmtpSnNvbi5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInBuZ2pzMlwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInVuemlwLXN0cmVhbVwiIiwid2VicGFjazovLy8uL3NyYy91dGlscy90d2l0dGVyVXRpbHMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidHdpdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInVybGVuY29kZVwiIiwid2VicGFjazovLy8uL3NyYy9hcGkuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibXVsdGVyXCIiXSwibmFtZXMiOlsidHdpdHRlclV0aWxzIiwicmVxdWlyZSIsInV0aWxzIiwibW9kdWxlIiwiZXhwb3J0cyIsIk1vbmdvQ2xpZW50IiwidXJsIiwicHJvY2VzcyIsImVudiIsIk1PTkdPREJfVVJJIiwiREIiLCJNT05HT19EQiIsInByb2Nlc3NVcGxvYWQiLCJ0cnlDYXRjaCIsImdldFJhbmRvbVF1ZXN0aW9uIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJjb25uZWN0IiwibW9uZ28iLCJuZXdDYXJkcyIsImRiIiwiY29sbGVjdGlvbiIsIm9sZENhcmRzIiwiZmluZE9uZSIsInJhbmRvbUNhcmQiLCJFcnJvciIsImluc2VydCIsInJlbW92ZSIsImNsb3NlIiwicmV2ZWFsQW5zd2VyV29ya2Zsb3ciLCJjYXJkSWQiLCJhbnN3ZXJDYXJkIiwicmVtb3ZlTGl2ZVF1ZXN0aW9uIiwiYWRkTGl2ZVF1ZXN0aW9uIiwicmVjb3JkIiwibWVkaWFVcmxzIiwibGl2ZVF1ZXN0aW9ucyIsInVwZGF0ZU9uZSIsIiRzZXQiLCIkdW5zZXQiLCJxdWVzdGlvbkltZyIsInByZXZMaW5lSW1nIiwiYWRkTWVkaWFVcmxzVG9DYXJkIiwibWVkaWFVcmwiLCIkcHVzaCIsImFuc3dlckltZyIsInVwZGF0ZUxpdmVRdWVzdGlvbiIsInF1ZXN0aW9uSWQiLCJ1c2VyUG9pbnRzIiwidXNlcklkIiwicG9pbnRzIiwidXBkYXRlIiwiYWxyZWFkeUFuc3dlcmVkIiwiY2FjaGVkUG9pbnRzIiwiZ2V0TGl2ZVF1ZXN0aW9ucyIsImZpbmQiLCJ0b0FycmF5IiwiYWRkT3JVcGRhdGVVc2VyIiwibmV3VXNlciIsInNjb3JlYm9hcmQiLCJ1c2VyIiwibmFtZSIsImhhbmRsZSIsImF2YXRhciIsInByb2ZpbGVCYW5uZXIiLCJmb2xsb3dpbmciLCJhZGp1c3RTY29yZSIsInJlcSIsInJlcyIsImdldFNjb3JlcyIsInNvcnQiLCJwcm9qZWN0IiwiZGF0YSIsImpzb24iLCJnZXRTY29yZSIsInBhcmFtcyIsImFkZERlY2siLCJmaWxlUGF0aCIsImZpbGUiLCJwYXRoIiwiYmF0Y2giLCJpbml0aWFsaXplVW5vcmRlcmVkQnVsa09wIiwiaSIsImxlbmd0aCIsImV4ZWN1dGUiLCJyZWRpcmVjdCIsImdldE5ld0NhcmRzIiwiZ2V0Q29sbGVjdGlvbiIsImdldE9sZENhcmRzIiwid2Vla2x5TW9udGhseVJlc2V0IiwicmVzZXRXZWVrbHlTY29yZSIsInJlc2V0TW9udGhseVNjb3JlIiwicmVzZXQiLCJ3ZWVrbHlTY29yZSIsIm1vbnRobHlTY29yZSIsIm11bHRpIiwiZ2V0Q2FyZHMiLCJpZHMiLCJxdWVyeSIsIiRpbiIsIl9pZCIsImNvbGxlY3Rpb25OYW1lIiwiY3VycmVudFF1ZXN0aW9uIiwiYWRkUG9pbnRzVG9TY29yZWJvYXJkIiwiYW5zd2VyUG9zdGVkQXQiLCJEYXRlIiwiZ2V0VGltZSIsIm9wcyIsInB1c2giLCIkaW5jIiwic2NvcmUiLCJjb3JyZWN0QW5zd2VycyIsImJ1bGtXcml0ZSIsInR3aXQiLCJUV0lUVEVSX0FQSV9LRVkiLCJUV0lUVEVSX0FQSV9TRUNSRVQiLCJUV0lUVEVSX1RPS0VOIiwiVFdJVFRFUl9UT0tFTl9TRUNSRVQiLCJUV0lUVEVSX0FDQ09VTlQiLCJ1c2VyQ29uZmlnIiwiY29uc3VtZXJfa2V5IiwiY29uc3VtZXJfc2VjcmV0IiwiYWNjZXNzX3Rva2VuIiwiYWNjZXNzX3Rva2VuX3NlY3JldCIsInVybGVuY29kZSIsIldFQkxPT0tVUF9VUkwiLCJIT1VSUyIsImZvcm1hdFF1ZXN0aW9uQWx0VGV4dCIsImV4cHJlc3Npb24iLCJoaW50IiwiZm9ybWF0SGludCIsIm1pbk1heENoYXJzIiwibWluIiwibWF4IiwibWluTWF4IiwicyIsInNjcmVlblJlYWRlckhpbnQiLCJyZXBsYWNlIiwiZm9ybWF0UXVlc3Rpb25UZXh0IiwiZW5nTWVhbmluZyIsIm5vdGVzIiwiY2FyZElEIiwidHdlZXRUZXh0IiwibmVlZHNIaW50IiwiZm9ybWF0QW5zd2VyQWx0VGV4dCIsImZvcm1hdEFuc3dlclRleHQiLCJhbnN3ZXJzIiwid2ViTG9va3VwIiwiYW5zd2VyVGV4dCIsImpvaW4iLCJhZGRRdWVzdGlvbkxpbmsiLCJxdWVzdGlvbkxpbmsiLCJsaW5lcyIsInNwbGl0Iiwic3BsaWNlIiwiZ2V0QW5zd2VycyIsImFsdEFuc3dlcnMiLCJhY2NlcHRlZEFuc3dlciIsIm1hdGNoIiwib3RoZXJBbnN3ZXJzIiwiY29uY2F0IiwiY2FsY3VsYXRlU2NvcmUiLCJxdWVzdGlvblBvc3RlZEF0IiwidGltZVRvQW5zd2VyIiwiTWF0aCIsImZsb29yIiwiZXh0cmFjdEFuc3dlciIsInRleHQiLCJ0cmltIiwic2xpY2UiLCJnZXRUaW1lVW50aWwiLCJob3VyIiwibm93IiwibWlsbGlzVW50aWxUaW1lIiwiZ2V0RnVsbFllYXIiLCJnZXRNb250aCIsImdldERhdGUiLCJwcm9taXNlIiwidGhlbiIsImNhdGNoIiwiY29uc29sZSIsImVycm9yIiwiZXJyIiwiY29udGFpbnMiLCJpdGVtIiwibGlzdCIsInZhbGlkIiwiaW5kZXhPZiIsImluZGV4IiwibWF4Q2hhcnMiLCJtaXNzaW5nQ2hhclJlZ2V4IiwibWlzc2luZ0NoYXJzIiwiZ2ltbWVDaGFycyIsIm1pbkNoYXJzIiwib3B0aW9uYWxDaGFycyIsImxlZ2VuZCIsIm5vcm1hbGl6ZWQiLCJncm91cE11bHRpWHMiLCJncm91cFhzIiwiZ3JvdXBRdWVzdGlvbk1hcmtzIiwiZmxhdHRlbiIsIm1hcCIsImdyb3VwIiwidGVzdCIsInJlc3VsdCIsIm51bUNoYXJzIiwiTnVtYmVyIiwibmVnYXRlZENoYXJzIiwic3RyaW5nIiwicDEiLCJzdHIiLCJzY2FsYXIiLCJ2IiwiQXJyYXkiLCJpc0FycmF5IiwiZGVlcCIsImZsYXQiLCJoZWFkIiwidGFpbCIsImNvbmZpZyIsImV4cHJlc3MiLCJhcHAiLCJib2R5UGFyc2VyIiwidHdpdHRlckJvdCIsInNldCIsIlBPUlQiLCJ1c2UiLCJzdGF0aWMiLCJfX2Rpcm5hbWUiLCJsaXN0ZW4iLCJnZXQiLCJsb2ciLCJnZXRGb2xsb3dpbmciLCJwb3N0TWVkaWEiLCJUd2l0dGVyIiwiQU5TV0VSX0lOVEVSVkFMIiwiUVVFU1RJT05fSU5URVJWQUwiLCJzdGFydCIsIm9wZW5TdHJlYW0iLCJzZXRJbnRlcnZhbCIsInR3ZWV0UmFuZG9tUXVlc3Rpb24iLCJzZXRTdGFydFRpbWVzIiwidGltZVVudGlsN1BNIiwidGltZVVudGlsTWlkbmlnaHQiLCJzZXRUaW1lb3V0IiwicXVlc3Rpb25UZXh0IiwicXVlc3Rpb25BbHRUZXh0IiwicHJldkxpbmVBbHRUZXh0IiwibGl2ZVF1ZXN0aW9uIiwidHdlZXRBbnN3ZXIiLCJhbnN3ZXJBbHRUZXh0Iiwic3RyZWFtIiwidHJhY2siLCJvbiIsImluX3JlcGx5X3RvX3N0YXR1c19pZF9zdHIiLCJjcmVhdGVkX2F0IiwiaWQiLCJzY3JlZW5fbmFtZSIsInByb2ZpbGVfaW1hZ2VfdXJsX2h0dHBzIiwicHJvZmlsZV9iYW5uZXJfdXJsIiwiZm91bmRRdWVzdGlvbiIsImZpbHRlciIsIm9iaiIsImFjY2VwdGVkQW5zd2VycyIsInVzZXJBbnN3ZXIiLCJkaXNjb25uZWN0TXNnIiwiZ2V0RGF5IiwiZnMiLCJQTkciLCJ1bnppcCIsIlVQTE9BRFNfUEFUSCIsInBhcnNlQW5raUpzb24iLCJvcHRpbWl6ZUltYWdlcyIsInppcGZpbGVQYXRoIiwiY3JlYXRlUmVhZFN0cmVhbSIsInBpcGUiLCJFeHRyYWN0IiwiZmlsZXMiLCJyZWFkZGlyU3luYyIsImV4dHJhY3RDYXJkSW5mbyIsImNsZWFuVXAiLCJkaXJQYXRoIiwiZmlsZXNQcm9jZXNzaW5nIiwiZm9yRWFjaCIsImN1cnJlbnRGaWxlIiwiY29udGVudHMiLCJyZWFkRmlsZVN5bmMiLCJ3cml0ZVN0cmVhbSIsImNyZWF0ZVdyaXRlU3RyZWFtIiwiY3VycmVudEltYWdlIiwicmVqIiwiZmlsdGVyVHlwZSIsImRlZmxhdGVMZXZlbCIsInBhcnNlIiwicG5nIiwicGFjayIsImFsbCIsImFsbE5ld0NhcmRzIiwic3RhdHMiLCJzdGF0U3luYyIsImlzRmlsZSIsIkpTT04iLCJjYXJkIiwiZmllbGRzIiwic3RyaXBIdG1sIiwiZ2V0QmFzZTY0IiwiZ2V0U3JjIiwiYmFzZTY0IiwiZW5jb2RpbmciLCJlIiwicm9vdCIsImxzdGF0U3luYyIsInVubGlua1N5bmMiLCJpc0RpcmVjdG9yeSIsImRlbGV0ZUZvbGRlclJlY3Vyc2l2ZSIsInJvb3RQYXRoIiwiZXhpc3RzU3luYyIsImN1clBhdGgiLCJybWRpclN5bmMiLCJzdGF0dXMiLCJiNjRJbWFnZTEiLCJhbHRUZXh0MSIsImI2NEltYWdlMiIsImFsdFRleHQyIiwidXBsb2FkTWVkaWEiLCJtZWRpYUlkMSIsIm1lZGlhX2lkcyIsIm1lZGlhSWQyIiwidW5zaGlmdCIsInR3ZWV0X21vZGUiLCJpbmNsdWRlX2V4dF9hbHRfdGV4dCIsInBvc3QiLCJyZXNwb25zZSIsImV4dGVuZGVkX2VudGl0aWVzIiwibWVkaWEiLCJpbWFnZSIsIm1lZGlhX3VybF9odHRwcyIsImFsdFRleHQiLCJleHRfYWx0X3RleHQiLCJpZF9zdHIiLCJiNjRJbWFnZSIsIm1lZGlhX2RhdGEiLCJtZWRpYUlkU3RyIiwibWVkaWFfaWRfc3RyaW5nIiwibWV0YV9wYXJhbXMiLCJtZWRpYV9pZCIsImFsdF90ZXh0IiwidXBsb2FkIiwiZGVzdCIsIm5leHQiLCJoZWFkZXIiLCJzaW5nbGUiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQzdEQSxJQUFNQSxlQUFlLG1CQUFBQyxDQUFRLEVBQVIsQ0FBckI7O0FBQ0EsSUFBTUMsUUFBUSxtQkFBQUQsQ0FBUSxDQUFSLENBQWQ7O0FBRUFFLE9BQU9DLE9BQVAsZ0JBQ0tKLFlBREwsRUFFS0UsS0FGTCxFOzs7Ozs7QUNIQSxpQzs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBLElBQU1HLGNBQWMsbUJBQUFKLENBQVEsRUFBUixFQUFtQkksV0FBdkM7O0FBQ0EsSUFBTUMsTUFBTUMsUUFBUUMsR0FBUixDQUFZQyxXQUF4QjtBQUNBLElBQU1DLEtBQUtILFFBQVFDLEdBQVIsQ0FBWUcsUUFBdkI7O2VBQzBCLG1CQUFBVixDQUFRLEVBQVIsQztJQUFsQlcsYSxZQUFBQSxhOztnQkFDYSxtQkFBQVgsQ0FBUSxDQUFSLEM7SUFBYlksUSxhQUFBQSxROztBQUVSVixPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZVLG1CQURlLCtCQUNLO0FBQ2xCLFdBQU8sSUFBSUMsT0FBSjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsOEJBQVksaUJBQU9DLE9BQVAsRUFBZ0JDLE1BQWhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQ0dKLFNBQVNSLFlBQVlhLE9BQVosQ0FBb0JaLEdBQXBCLENBQVQsQ0FESDs7QUFBQTtBQUNYYSxxQkFEVztBQUVYQyx3QkFGVyxHQUVBRCxNQUFNRSxFQUFOLENBQVNYLEVBQVQsRUFBYVksVUFBYixDQUF3QixVQUF4QixDQUZBO0FBR1hDLHdCQUhXLEdBR0FKLE1BQU1FLEVBQU4sQ0FBU1gsRUFBVCxFQUFhWSxVQUFiLENBQXdCLFVBQXhCLENBSEE7QUFBQTtBQUFBLHVCQUlRVCxTQUFTTyxTQUFTSSxPQUFULEVBQVQsQ0FKUjs7QUFBQTtBQUlYQywwQkFKVzs7QUFBQSxzQkFLYkEsY0FBYyxJQUxEO0FBQUE7QUFBQTtBQUFBOztBQU1mUix1QkFBTyxJQUFJUyxLQUFKLENBQVUsMENBQVYsQ0FBUDtBQU5lOztBQUFBO0FBQUE7QUFBQSx1QkFTWGIsU0FBU1UsU0FBU0ksTUFBVCxDQUFnQkYsVUFBaEIsQ0FBVCxDQVRXOztBQUFBO0FBQUE7QUFBQSx1QkFVWFosU0FBU08sU0FBU1EsTUFBVCxDQUFnQkgsVUFBaEIsQ0FBVCxDQVZXOztBQUFBO0FBV2pCVCx3QkFBUVMsVUFBUjtBQUNBTixzQkFBTVUsS0FBTjs7QUFaaUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FBWjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQUFQO0FBY0QsR0FoQmM7QUFrQmZDLHNCQWxCZSxnQ0FrQk1DLE1BbEJOLEVBa0JjO0FBQzNCLFdBQU8sSUFBSWhCLE9BQUo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDhCQUFZLGtCQUFPQyxPQUFQLEVBQWdCQyxNQUFoQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUNHSixTQUFTUixZQUFZYSxPQUFaLENBQW9CWixHQUFwQixDQUFULENBREg7O0FBQUE7QUFDWGEscUJBRFc7QUFFWEksd0JBRlcsR0FFQUosTUFBTUUsRUFBTixDQUFTWCxFQUFULEVBQWFZLFVBQWIsQ0FBd0IsVUFBeEIsQ0FGQTtBQUFBO0FBQUEsdUJBR1FULFNBQVNVLFNBQVNDLE9BQVQsQ0FBaUI7QUFBRU87QUFBRixpQkFBakIsQ0FBVCxDQUhSOztBQUFBO0FBR1hDLDBCQUhXO0FBSWpCaEIsd0JBQVFnQixVQUFSO0FBSmlCO0FBQUEsdUJBS1huQixTQUFTb0IsbUJBQW1CZCxLQUFuQixFQUEwQlksTUFBMUIsQ0FBVCxDQUxXOztBQUFBO0FBTWpCWixzQkFBTVUsS0FBTjs7QUFOaUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FBWjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQUFQO0FBUUQsR0EzQmM7QUE2QlRLLGlCQTdCUztBQUFBO0FBQUE7QUFBQSw4Q0E2Qk9DLE1BN0JQLEVBNkJlQyxTQTdCZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUE4QkxMLG9CQTlCSyxHQThCTUksTUE5Qk4sQ0E4QkxKLE1BOUJLO0FBQUE7QUFBQSxxQkErQk9sQixTQUFTUixZQUFZYSxPQUFaLENBQW9CWixHQUFwQixDQUFULENBL0JQOztBQUFBO0FBK0JQYSxtQkEvQk87QUFnQ1BrQiwyQkFoQ08sR0FnQ1NsQixNQUFNRSxFQUFOLENBQVNYLEVBQVQsRUFBYVksVUFBYixDQUF3QixlQUF4QixDQWhDVDtBQWlDUEMsc0JBakNPLEdBaUNJSixNQUFNRSxFQUFOLENBQVNYLEVBQVQsRUFBYVksVUFBYixDQUF3QixVQUF4QixDQWpDSjtBQUFBO0FBQUEscUJBa0NQVCxTQUFTd0IsY0FBY1YsTUFBZCxjQUNWUSxNQURVO0FBRWJDO0FBRmEsaUJBQVQsQ0FsQ087O0FBQUE7QUFBQTtBQUFBLHFCQXNDUHZCLFNBQ0pVLFNBQVNlLFNBQVQsQ0FDRTtBQUFDUDtBQUFELGVBREYsRUFFRTtBQUNFUSxzQkFBTTtBQUFFSDtBQUFGLGlCQURSO0FBRUVJLHdCQUFRO0FBQUVDLCtCQUFhLEVBQWY7QUFBbUJDLCtCQUFhO0FBQWhDO0FBRlYsZUFGRixDQURJLENBdENPOztBQUFBO0FBK0NidkIsb0JBQU1VLEtBQU47O0FBL0NhO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBa0RUYyxvQkFsRFM7QUFBQTtBQUFBO0FBQUEsOENBa0RVWixNQWxEVjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0RBa0RtQmEsUUFsRG5CO0FBQUE7QUFBQSxxQkFtRE8vQixTQUFTUixZQUFZYSxPQUFaLENBQW9CWixHQUFwQixDQUFULENBbkRQOztBQUFBO0FBbURQYSxtQkFuRE87QUFvRFBJLHNCQXBETyxHQW9ESUosTUFBTUUsRUFBTixDQUFTWCxFQUFULEVBQWFZLFVBQWIsQ0FBd0IsVUFBeEIsQ0FwREo7QUFBQTtBQUFBLHFCQXFEUFQsU0FDSlUsU0FBU2UsU0FBVCxDQUNFO0FBQUNQO0FBQUQsZUFERixFQUVFO0FBQ0VjLHVCQUFPO0FBQUVULDZCQUFXUTtBQUFiLGlCQURUO0FBRUVKLHdCQUFRO0FBQUVNLDZCQUFXO0FBQWI7QUFGVixlQUZGLENBREksQ0FyRE87O0FBQUE7QUE4RGIzQixvQkFBTVUsS0FBTjs7QUE5RGE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFpRVRrQixvQkFqRVM7QUFBQTtBQUFBO0FBQUEsOENBaUVVQyxVQWpFVixFQWlFc0JDLFVBakV0QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQWtFT3BDLFNBQVNSLFlBQVlhLE9BQVosQ0FBb0JaLEdBQXBCLENBQVQsQ0FsRVA7O0FBQUE7QUFrRVBhLG1CQWxFTztBQW1FUGtCLDJCQW5FTyxHQW1FU2xCLE1BQU1FLEVBQU4sQ0FBU1gsRUFBVCxFQUFhWSxVQUFiLENBQXdCLGVBQXhCLENBbkVUO0FBb0VMNEIsb0JBcEVLLEdBb0VjRCxVQXBFZCxDQW9FTEMsTUFwRUssRUFvRUdDLE1BcEVILEdBb0VjRixVQXBFZCxDQW9FR0UsTUFwRUg7QUFxRVBDLG9CQXJFTyxHQXFFRTtBQUNiUCx1QkFBTztBQUNMUSxtQ0FBaUJIO0FBRFo7QUFETSxlQXJFRjtBQTJFYixrQkFBSUMsU0FBUyxDQUFiLEVBQ0VDLE9BQU9QLEtBQVAsQ0FBYVMsWUFBYixHQUE0QkwsVUFBNUI7QUE1RVc7QUFBQSxxQkE4RVBwQyxTQUNKd0IsY0FBY2UsTUFBZCxDQUFxQjtBQUFDSjtBQUFELGVBQXJCLEVBQW1DSSxNQUFuQyxDQURJLENBOUVPOztBQUFBO0FBaUZiakMsb0JBQU1VLEtBQU47O0FBakZhO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBb0ZmMEIsa0JBcEZlLDhCQW9GSTtBQUNqQixXQUFPLElBQUl4QyxPQUFKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw4QkFBWSxrQkFBT0MsT0FBUCxFQUFnQkMsTUFBaEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFDR0osU0FBU1IsWUFBWWEsT0FBWixDQUFvQlosR0FBcEIsQ0FBVCxDQURIOztBQUFBO0FBQ1hhLHFCQURXO0FBRVhHLDBCQUZXLEdBRUVILE1BQU1FLEVBQU4sQ0FBU1gsRUFBVCxFQUFhWSxVQUFiLENBQXdCLGVBQXhCLENBRkY7QUFBQTtBQUFBLHVCQUdXVCxTQUFTUyxXQUFXa0MsSUFBWCxHQUFrQkMsT0FBbEIsRUFBVCxDQUhYOztBQUFBO0FBR1hwQiw2QkFIVztBQUlqQnJCLHdCQUFRcUIsYUFBUjtBQUNBbEIsc0JBQU1VLEtBQU47O0FBTGlCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BQVo7O0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFBUDtBQU9ELEdBNUZjO0FBOEZUNkIsaUJBOUZTO0FBQUE7QUFBQTtBQUFBLDhDQThGT0MsT0E5RlA7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBK0ZPOUMsU0FBU1IsWUFBWWEsT0FBWixDQUFvQlosR0FBcEIsQ0FBVCxDQS9GUDs7QUFBQTtBQStGUGEsbUJBL0ZPO0FBZ0dQeUMsd0JBaEdPLEdBZ0dNekMsTUFBTUUsRUFBTixDQUFTWCxFQUFULEVBQWFZLFVBQWIsQ0FBd0IsWUFBeEIsQ0FoR047QUFpR0w0QixvQkFqR0ssR0FpR01TLE9BakdOLENBaUdMVCxNQWpHSztBQUFBO0FBQUEscUJBa0dNckMsU0FBUytDLFdBQVdwQyxPQUFYLENBQW1CO0FBQUMwQjtBQUFELGVBQW5CLENBQVQsQ0FsR047O0FBQUE7QUFrR1BXLGtCQWxHTzs7QUFBQSxtQkFtR1RBLElBbkdTO0FBQUE7QUFBQTtBQUFBOztBQXFHVEMsa0JBckdTLEdBMEdQSCxPQTFHTyxDQXFHVEcsSUFyR1MsRUFzR1RDLE1BdEdTLEdBMEdQSixPQTFHTyxDQXNHVEksTUF0R1MsRUF1R1RDLE1BdkdTLEdBMEdQTCxPQTFHTyxDQXVHVEssTUF2R1MsRUF3R1RDLGFBeEdTLEdBMEdQTixPQTFHTyxDQXdHVE0sYUF4R1MsRUF5R1RDLFNBekdTLEdBMEdQUCxPQTFHTyxDQXlHVE8sU0F6R1M7QUFBQTtBQUFBLHFCQTRHTHJELFNBQ0orQyxXQUFXdEIsU0FBWCxDQUFxQjtBQUFFWTtBQUFGLGVBQXJCO0FBQ0lYLHNCQUFNO0FBQUV1QjtBQUFGO0FBRFYsZ0VBRVU7QUFBRUM7QUFBRixlQUZWLGtEQUdVO0FBQUVDO0FBQUYsZUFIVixrREFJVTtBQUFFQztBQUFGLGVBSlYsa0RBS1U7QUFBRUM7QUFBRixlQUxWLDBCQURJLENBNUdLOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEscUJBc0hMckQsU0FBUytDLFdBQVdqQyxNQUFYLENBQWtCZ0MsT0FBbEIsQ0FBVCxDQXRISzs7QUFBQTtBQXdIYnhDLG9CQUFNVSxLQUFOOztBQXhIYTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQTJIZnNDLGFBM0hlLHVCQTJISEMsR0EzSEcsRUEySEVDLEdBM0hGLEVBMkhPLENBQ3BCO0FBQ0QsR0E3SGM7QUErSFRDLFdBL0hTO0FBQUE7QUFBQTtBQUFBLDhDQStIQ0YsR0EvSEQsRUErSE1DLEdBL0hOO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBZ0lPeEQsU0FBU1IsWUFBWWEsT0FBWixDQUFvQlosR0FBcEIsQ0FBVCxDQWhJUDs7QUFBQTtBQWdJUGEsbUJBaElPO0FBaUlQRyx3QkFqSU8sR0FpSU1ILE1BQU1FLEVBQU4sQ0FBU1gsRUFBVCxFQUFhWSxVQUFiLENBQXdCLFlBQXhCLENBaklOO0FBQUE7QUFBQSxxQkFrSU1ULFNBQ2pCUyxXQUFXa0MsSUFBWCxHQUNXZSxJQURYLENBQ2dCLGFBRGhCLEVBQytCLENBQUMsQ0FEaEMsRUFFV0MsT0FGWCxDQUVtQjtBQUFDLHVCQUFPO0FBQVIsZUFGbkIsRUFHV2YsT0FIWCxFQURpQixDQWxJTjs7QUFBQTtBQWtJUGdCLGtCQWxJTztBQXdJYkosa0JBQUlLLElBQUosQ0FBU0QsSUFBVDtBQUNBdEQsb0JBQU1VLEtBQU47O0FBeklhO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBNElmO0FBQ004QyxVQTdJUztBQUFBO0FBQUE7QUFBQSw4Q0E2SUFQLEdBN0lBLEVBNklLQyxHQTdJTDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUE4SUxOLG9CQTlJSyxHQThJTUssSUFBSVEsTUE5SVYsQ0E4SUxiLE1BOUlLO0FBQUE7QUFBQSxxQkErSU9sRCxTQUFTUixZQUFZYSxPQUFaLENBQW9CWixHQUFwQixDQUFULENBL0lQOztBQUFBO0FBK0lQYSxtQkEvSU87QUFnSlBHLHdCQWhKTyxHQWdKTUgsTUFBTUUsRUFBTixDQUFTWCxFQUFULEVBQWFZLFVBQWIsQ0FBd0IsWUFBeEIsQ0FoSk47QUFBQTtBQUFBLHFCQWlKTVQsU0FBU1MsV0FBV0UsT0FBWCxDQUFtQjtBQUFDdUM7QUFBRCxlQUFuQixDQUFULENBakpOOztBQUFBO0FBaUpQRixrQkFqSk87QUFrSmJRLGtCQUFJSyxJQUFKLENBQVNiLElBQVQ7QUFDQTFDLG9CQUFNVSxLQUFOOztBQW5KYTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQXNKVGdELFNBdEpTO0FBQUE7QUFBQTtBQUFBLCtDQXNKRFQsR0F0SkMsRUFzSklDLEdBdEpKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQXVKUFMsc0JBdkpPLEdBdUpJVixJQUFJVyxJQUFKLENBQVNDLElBdkpiO0FBQUE7QUFBQSxxQkF3SlVuRSxTQUFTRCxjQUFja0UsUUFBZCxDQUFULENBeEpWOztBQUFBO0FBd0pQMUQsc0JBeEpPO0FBQUE7QUFBQSxxQkF5Sk9QLFNBQVNSLFlBQVlhLE9BQVosQ0FBb0JaLEdBQXBCLENBQVQsQ0F6SlA7O0FBQUE7QUF5SlBhLG1CQXpKTztBQTBKUEcsd0JBMUpPLEdBMEpNSCxNQUFNRSxFQUFOLENBQVNYLEVBQVQsRUFBYVksVUFBYixDQUF3QixVQUF4QixDQTFKTjtBQTJKUDJELG1CQTNKTyxHQTJKQzNELFdBQVc0RCx5QkFBWCxFQTNKRDs7QUE2SmIsbUJBQVNDLENBQVQsR0FBYSxDQUFiLEVBQWdCQSxJQUFJL0QsU0FBU2dFLE1BQTdCLEVBQXFDLEVBQUVELENBQXZDLEVBQTBDO0FBQ3hDRixzQkFBTXRELE1BQU4sQ0FBYVAsU0FBUytELENBQVQsQ0FBYjtBQUNEOztBQS9KWTtBQUFBLHFCQWlLUHRFLFNBQVNvRSxNQUFNSSxPQUFOLEVBQVQsQ0FqS087O0FBQUE7QUFrS2JsRSxvQkFBTVUsS0FBTjtBQUVBd0Msa0JBQUlpQixRQUFKLENBQWEsR0FBYjs7QUFwS2E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUF1S2ZDLGFBdktlLHVCQXVLSG5CLEdBdktHLEVBdUtFQyxHQXZLRixFQXVLTztBQUNwQm1CLGtCQUFjcEIsR0FBZCxFQUFtQkMsR0FBbkIsRUFBd0IsVUFBeEI7QUFDRCxHQXpLYztBQTJLZm9CLGFBM0tlLHVCQTJLSHJCLEdBM0tHLEVBMktFQyxHQTNLRixFQTJLTztBQUNwQm1CLGtCQUFjcEIsR0FBZCxFQUFtQkMsR0FBbkIsRUFBd0IsVUFBeEI7QUFDRCxHQTdLYztBQStLVHFCLG9CQS9LUztBQUFBO0FBQUE7QUFBQSwrQ0ErS1VDLGdCQS9LVixFQStLNEJDLGlCQS9LNUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFnTE8vRSxTQUFTUixZQUFZYSxPQUFaLENBQW9CWixHQUFwQixDQUFULENBaExQOztBQUFBO0FBZ0xQYSxtQkFoTE87QUFpTFBHLHdCQWpMTyxHQWlMTUgsTUFBTUUsRUFBTixDQUFTWCxFQUFULEVBQWFZLFVBQWIsQ0FBd0IsWUFBeEIsQ0FqTE47QUFvTGIsa0JBQUlxRSxvQkFBb0JDLGlCQUF4QixFQUNFQztBQUNFdEQsc0JBQU07QUFBRXVELCtCQUFjO0FBQWhCO0FBRFIseUJBRVE7QUFBRUMsOEJBQWM7QUFBaEIsZUFGUixFQURGLEtBS0ssSUFBSUosZ0JBQUosRUFDSEUsUUFBUTtBQUFFdEQsc0JBQU07QUFBRXVELCtCQUFhO0FBQWY7QUFBUixlQUFSLENBREcsS0FHSEQsUUFBUTtBQUFFdEQsc0JBQU07QUFBRXdELGdDQUFjO0FBQWhCO0FBQVIsZUFBUjtBQUVGekUseUJBQVc4QixNQUFYLENBQ0UsRUFERixFQUNNeUMsS0FETixFQUNhO0FBQUVHLHVCQUFPO0FBQVQsZUFEYjtBQUlBN0Usb0JBQU1VLEtBQU47O0FBbE1hO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBcU1Ub0UsVUFyTVM7QUFBQTtBQUFBO0FBQUEsK0NBcU1BN0IsR0FyTUEsRUFxTUtDLEdBck1MO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQXNNTDZCLGlCQXRNSyxHQXNNRzlCLElBQUkrQixLQXRNUCxDQXNNTEQsR0F0TUs7QUFBQTtBQUFBLHFCQXVNT3JGLFNBQVNSLFlBQVlhLE9BQVosQ0FBb0JaLEdBQXBCLENBQVQsQ0F2TVA7O0FBQUE7QUF1TVBhLG1CQXZNTztBQXdNUEcsd0JBeE1PLEdBd01NSCxNQUFNRSxFQUFOLENBQVNYLEVBQVQsRUFBYVksVUFBYixDQUF3QixVQUF4QixDQXhNTjtBQUFBO0FBQUEscUJBeU1NVCxTQUNqQlMsV0FBV2tDLElBQVgsQ0FBZ0I7QUFBQ3pCLHdCQUFRO0FBQUNxRSx1QkFBS0Y7QUFBTjtBQUFULGVBQWhCLEVBQ1cxQixPQURYLENBQ21CO0FBQUM2QixxQkFBSyxDQUFOO0FBQVNqRSwyQkFBVztBQUFwQixlQURuQixFQUVXcUIsT0FGWCxFQURpQixDQXpNTjs7QUFBQTtBQXlNUGdCLGtCQXpNTztBQThNYkosa0JBQUlLLElBQUosQ0FBU0QsSUFBVDtBQUNBdEQsb0JBQU1VLEtBQU47O0FBL01hO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsQ0FBakIsQyxDQWtORTs7U0FHYTJELGE7Ozs7Ozs7MEJBQWYsbUJBQTZCcEIsR0FBN0IsRUFBa0NDLEdBQWxDLEVBQXVDaUMsY0FBdkM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFDc0J6RixTQUFTUixZQUFZYSxPQUFaLENBQW9CWixHQUFwQixDQUFULENBRHRCOztBQUFBO0FBQ1FhLGlCQURSO0FBRVFHLHNCQUZSLEdBRXFCSCxNQUFNRSxFQUFOLENBQVNYLEVBQVQsRUFBYVksVUFBYixDQUF3QmdGLGNBQXhCLENBRnJCO0FBQUE7QUFBQSxtQkFHcUJ6RixTQUNqQlMsV0FBV2tDLElBQVgsR0FDV2dCLE9BRFgsQ0FDbUI7QUFBQzZCLG1CQUFLO0FBQU4sYUFEbkIsRUFFVzVDLE9BRlgsRUFEaUIsQ0FIckI7O0FBQUE7QUFHUWdCLGdCQUhSO0FBUUVKLGdCQUFJSyxJQUFKLENBQVNELElBQVQ7QUFDQXRELGtCQUFNVSxLQUFOOztBQVRGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7QUFZQSxTQUFTSSxrQkFBVCxDQUE0QmQsS0FBNUIsRUFBbUNZLE1BQW5DLEVBQTJDO0FBQ3pDLFNBQU8sSUFBSWhCLE9BQUo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDRCQUFZLG1CQUFPQyxPQUFQLEVBQWdCQyxNQUFoQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDWEssd0JBRFcsR0FDRUgsTUFBTUUsRUFBTixDQUFTWCxFQUFULEVBQWFZLFVBQWIsQ0FBd0IsZUFBeEIsQ0FERjtBQUFBO0FBQUEscUJBRWFULFNBQVNTLFdBQVdFLE9BQVgsQ0FBbUI7QUFBQ087QUFBRCxlQUFuQixDQUFULENBRmI7O0FBQUE7QUFFWHdFLDZCQUZXO0FBQUE7QUFBQSxxQkFHWDFGLFNBQVNTLFdBQVdNLE1BQVgsQ0FBa0IyRSxlQUFsQixDQUFULENBSFc7O0FBQUE7QUFBQTtBQUFBLHFCQUlYMUYsU0FBUzJGLHNCQUFzQnJGLEtBQXRCLEVBQTZCb0YsZUFBN0IsQ0FBVCxDQUpXOztBQUFBO0FBS2pCdkY7O0FBTGlCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQVo7O0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFBUDtBQU9EOztBQUVELFNBQVN3RixxQkFBVCxDQUErQnJGLEtBQS9CLFNBQWdFO0FBQUEsTUFBeEJtQyxZQUF3QixTQUF4QkEsWUFBd0I7QUFBQSxNQUFWdkIsTUFBVSxTQUFWQSxNQUFVO0FBQzlELFNBQU8sSUFBSWhCLE9BQUo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDRCQUFZLG1CQUFPQyxPQUFQLEVBQWdCQyxNQUFoQjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ1gyQyx3QkFEVyxHQUNFekMsTUFBTUUsRUFBTixDQUFTWCxFQUFULEVBQWFZLFVBQWIsQ0FBd0IsWUFBeEIsQ0FERjtBQUVYQyxzQkFGVyxHQUVBSixNQUFNRSxFQUFOLENBQVNYLEVBQVQsRUFBYVksVUFBYixDQUF3QixVQUF4QixDQUZBO0FBR1htRiw0QkFIVyxHQUdNLElBQUlDLElBQUosR0FBV0MsT0FBWCxFQUhOO0FBSWpCcEYsdUJBQVNlLFNBQVQsQ0FBbUI7QUFBQ1A7QUFBRCxlQUFuQixFQUE2QjtBQUFDUSxzQkFBTTtBQUFDa0U7QUFBRDtBQUFQLGVBQTdCO0FBQ01HLGlCQUxXLEdBS0wsRUFMSzs7QUFPakIsbUJBQVN6QixDQUFULEdBQWEsQ0FBYixFQUFnQkEsSUFBSTdCLGFBQWE4QixNQUFqQyxFQUF5QyxFQUFFRCxDQUEzQyxFQUE4QztBQUFBLGtDQUNqQjdCLGFBQWE2QixDQUFiLENBRGlCLEVBQ3BDakMsTUFEb0MsbUJBQ3BDQSxNQURvQyxFQUM1QkMsTUFENEIsbUJBQzVCQSxNQUQ0QjtBQUU1Q3lELG9CQUFJQyxJQUFKLENBQVM7QUFDUHZFLDZCQUFZO0FBQ1YsOEJBQVc7QUFBRVk7QUFBRixxQkFERDtBQUVWLDhCQUFXO0FBQ1Q0RCw0QkFBTTtBQUNKQywrQkFBTzVELE1BREg7QUFFSjJDLHFDQUFhM0MsTUFGVDtBQUdKNEMsc0NBQWM1QztBQUhWLHVCQURHO0FBTVROLDZCQUFPO0FBQ0xtRSx3Q0FBZ0I7QUFDZFAsd0RBRGM7QUFFZDFFLHdDQUZjO0FBR2RvQjtBQUhjO0FBRFg7QUFORTtBQUZEO0FBREwsaUJBQVQ7QUFtQkQ7O0FBNUJnQixvQkE2QmJ5RCxJQUFJeEIsTUFBSixLQUFlLENBN0JGO0FBQUE7QUFBQTtBQUFBOztBQThCZnBFO0FBOUJlOztBQUFBO0FBQUE7QUFBQSxxQkFrQ1hILFNBQVMrQyxXQUFXcUQsU0FBWCxDQUFxQkwsR0FBckIsQ0FBVCxDQWxDVzs7QUFBQTtBQW1DakI1Rjs7QUFuQ2lCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQVo7O0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFBUDtBQXFDRCxDOzs7Ozs7QUN2UkQsSUFBTWtHLE9BQU8sbUJBQUFqSCxDQUFRLEVBQVIsQ0FBYjs7bUJBT0lNLFFBQVFDLEc7SUFMVjJHLGUsZ0JBQUFBLGU7SUFDQUMsa0IsZ0JBQUFBLGtCO0lBQ0FDLGEsZ0JBQUFBLGE7SUFDQUMsb0IsZ0JBQUFBLG9CO0lBQ0FDLGUsZ0JBQUFBLGUsRUFHRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQU1DLGFBQWE7QUFDakJDLGdCQUFjTixlQURHO0FBRWpCTyxtQkFBaUJOLGtCQUZBO0FBR2pCTyxnQkFBY04sYUFIRztBQUlqQk8sdUJBQXFCTjtBQUpKLENBQW5CO0FBT0FuSCxPQUFPQyxPQUFQLEdBQWlCLElBQUk4RyxJQUFKLENBQVNNLFVBQVQsQ0FBakIsQzs7Ozs7Ozs7Ozs7Ozs7QUN0QkEsSUFBTUssWUFBWSxtQkFBQTVILENBQVEsRUFBUixDQUFsQjs7QUFDQSxJQUFNNkgsZ0JBQWdCLGlDQUF0QjtJQUNRUCxlLEdBQW9CaEgsUUFBUUMsRyxDQUE1QitHLGU7QUFFUixJQUFNUSxRQUFRLE9BQWQ7QUFFQTVILE9BQU9DLE9BQVAsR0FBaUI7QUFFZjJILGNBRmU7QUFJZkMsdUJBSmUsaUNBSU9DLFVBSlAsRUFJbUI7QUFDaEMsUUFBTUMsT0FBT0MsV0FBV0YsVUFBWCxDQUFiOztBQURnQyx1QkFFYkcsWUFBWUYsSUFBWixDQUZhO0FBQUE7QUFBQSxRQUV6QkcsR0FGeUI7QUFBQSxRQUVwQkMsR0FGb0I7O0FBR2hDLFFBQU1DLFNBQVNGLFFBQVFDLEdBQVIsR0FBY0QsR0FBZCxhQUF1QkEsR0FBdkIsaUJBQWlDQyxHQUFqQyxDQUFmO0FBQ0EsUUFBTUUsSUFBSUYsTUFBTSxDQUFOLEdBQVUsR0FBVixHQUFnQixFQUExQjtBQUNBLFFBQU1HLDhCQUF1QkYsTUFBdkIsdUJBQTBDQyxDQUExQyxNQUFOO0FBQ0EsV0FBT1AsV0FBV1MsT0FBWCxDQUFtQixjQUFuQixFQUFtQ0QsZ0JBQW5DLENBQVA7QUFDRCxHQVhjO0FBYWZFLG9CQWJlLDhCQWFJVixVQWJKLEVBYWdCVyxVQWJoQixFQWE0QkMsS0FiNUIsRUFhbUNDLE1BYm5DLEVBYTJDO0FBQ3hELFFBQU1aLE9BQU9DLFdBQVdGLFVBQVgsQ0FBYjs7QUFEd0Qsd0JBRXJDRyxZQUFZRixJQUFaLENBRnFDO0FBQUE7QUFBQSxRQUVqREcsR0FGaUQ7QUFBQSxRQUU1Q0MsR0FGNEM7O0FBR3hELFFBQU1DLFNBQVNGLFFBQVFDLEdBQVIsR0FBY0QsR0FBZCxhQUF1QkEsR0FBdkIsY0FBOEJDLEdBQTlCLENBQWY7QUFDQSxRQUFJUywyQkFBb0JSLE1BQXBCLHVDQUFzREssVUFBdEQsUUFBSjtBQUNBLFFBQUlJLFVBQVVkLElBQVYsQ0FBSixFQUNFYSwrQkFBd0JiLElBQXhCO0FBRUYsUUFBSVcsS0FBSixFQUFXRSxnQ0FBeUJGLEtBQXpCO0FBRVhFLGdDQUFxQkQsTUFBckI7QUFDQSxXQUFPQyxTQUFQO0FBQ0QsR0F6QmM7QUEyQmZFLHFCQTNCZSwrQkEyQktoQixVQTNCTCxFQTJCaUI7QUFDOUIsV0FBT0EsV0FBV1MsT0FBWCxDQUFtQiw4QkFBbkIsRUFBbUQsSUFBbkQsQ0FBUDtBQUNELEdBN0JjO0FBK0JmUSxrQkEvQmUsNEJBK0JFQyxPQS9CRixFQStCV1AsVUEvQlgsRUErQnVCUSxTQS9CdkIsRUErQmtDckgsTUEvQmxDLEVBK0IwQztBQUN2RCxRQUFNeUcsSUFBSVcsUUFBUS9ELE1BQVIsR0FBaUIsQ0FBakIsR0FBcUIsR0FBckIsR0FBMkIsRUFBckM7QUFDQSxRQUFJaUUsNkJBQXNCYixDQUF0QixlQUE0QlcsUUFBUUcsSUFBUixDQUFhLElBQWIsQ0FBNUIsQ0FBSjtBQUNBRCxpREFBcUNULFVBQXJDO0FBQ0FTLGtCQUFjLG1CQUFtQnZCLGFBQW5CLEdBQW1DRCxVQUFVdUIsU0FBVixDQUFqRDtBQUNBQyxpQ0FBc0J0SCxNQUF0QjtBQUNBLFdBQU9zSCxVQUFQO0FBQ0QsR0F0Q2M7QUF3Q2ZFLGlCQXhDZSwyQkF3Q0NGLFVBeENELEVBd0NhckcsVUF4Q2IsRUF3Q3lCO0FBQ3RDLFFBQU13RywrQ0FBd0NqQyxlQUF4QyxxQkFBa0V2RSxVQUFsRSxDQUFOO0FBQ0EsUUFBTXlHLFFBQVFKLFdBQVdLLEtBQVgsQ0FBaUIsSUFBakIsQ0FBZDtBQUNBRCxVQUFNRSxNQUFOLENBQWEsQ0FBQyxDQUFkLEVBQWlCLENBQWpCLEVBQW9CSCxZQUFwQjtBQUNBLFdBQU9DLE1BQU1ILElBQU4sQ0FBVyxJQUFYLENBQVA7QUFDRCxHQTdDYztBQStDZk0sWUEvQ2Usc0JBK0NKM0IsVUEvQ0ksRUErQ1E0QixVQS9DUixFQStDb0I7QUFDakMsUUFBTUMsaUJBQWlCN0IsV0FBVzhCLEtBQVgsQ0FBaUIsZUFBakIsRUFBa0MsQ0FBbEMsQ0FBdkI7QUFDQSxRQUFJQyxlQUFlLEVBQW5CO0FBQ0EsUUFBSUgsY0FBY0EsV0FBV3pFLE1BQVgsR0FBb0IsQ0FBdEMsRUFDRTRFLGVBQWVILFdBQVdILEtBQVgsQ0FBaUIsR0FBakIsQ0FBZjtBQUVGLFdBQU8sQ0FBQ0ksY0FBRCxFQUFpQkcsTUFBakIsQ0FBd0JELFlBQXhCLENBQVA7QUFDRCxHQXREYztBQXdEZkUsZ0JBeERlLDBCQXdEQXpELGNBeERBLFFBd0RxRDtBQUFBLFFBQXBDMEQsZ0JBQW9DLFFBQXBDQSxnQkFBb0M7QUFBQSxRQUFsQjlHLGVBQWtCLFFBQWxCQSxlQUFrQjtBQUNsRSxRQUFNK0csZUFBZUMsS0FBS0MsS0FBTCxDQUNuQixDQUFDLElBQUk1RCxJQUFKLENBQVNELGNBQVQsSUFBMkIsSUFBSUMsSUFBSixDQUFTeUQsZ0JBQVQsQ0FBNUIsSUFBMERwQyxLQUR2QyxDQUFyQjtBQUdBLFFBQU1oQixRQUFRLEtBQUtxRCxZQUFuQjtBQUVBLFdBQU9DLEtBQUsvQixHQUFMLENBQVN2QixLQUFULEVBQWdCLENBQWhCLENBQVA7QUFDRCxHQS9EYztBQWlFZndELGVBakVlLHlCQWlFREMsSUFqRUMsRUFpRUs7QUFDbEIsV0FBT0EsS0FBS0MsSUFBTCxHQUFZQyxLQUFaLENBQWtCbkQsZ0JBQWdCbkMsTUFBaEIsR0FBeUIsQ0FBM0MsQ0FBUDtBQUNELEdBbkVjO0FBcUVmdUYsY0FyRWUsd0JBcUVGQyxJQXJFRSxFQXFFSTtBQUNqQjtBQUNBLFFBQU1DLE1BQU0sSUFBSW5FLElBQUosRUFBWjtBQUNBLFFBQU1vRSxrQkFBa0IsSUFBSXBFLElBQUosQ0FDdEJtRSxJQUFJRSxXQUFKLEVBRHNCLEVBRXRCRixJQUFJRyxRQUFKLEVBRnNCLEVBR3RCSCxJQUFJSSxPQUFKLEVBSHNCLEVBSXRCTCxJQUpzQixFQUloQixDQUpnQixFQUliLENBSmEsRUFJVixDQUpVLElBSUxDLEdBSm5CO0FBTUEsUUFBSUMsa0JBQWtCLENBQXRCLEVBQXlCO0FBQ3ZCQSw2REFBbUIsS0FBRy9DLEtBQXRCO0FBRUYsV0FBTytDLGVBQVA7QUFDRCxHQWxGYztBQW9GZmpLLFVBcEZlLG9CQW9GTnFLLE9BcEZNLEVBb0ZHO0FBQ2pCLFdBQU9BLFFBQ0pDLElBREksQ0FDQztBQUFBLGFBQVExRyxJQUFSO0FBQUEsS0FERCxFQUVKMkcsS0FGSSxDQUVFLGVBQU87QUFDWkMsY0FBUUMsS0FBUixDQUFjLFFBQWQsRUFBdUJDLEdBQXZCO0FBQ0EsYUFBTyxFQUFQO0FBQ0QsS0FMSSxDQUFQO0FBTUEsR0EzRmM7QUE2RmZDLFVBN0ZlLG9CQTZGTkMsSUE3Rk0sRUE2RkFDLElBN0ZBLEVBNkZNO0FBQ25CLFdBQU9DLE1BQU1ELEtBQUtFLE9BQUwsQ0FBYUgsSUFBYixDQUFOLENBQVA7QUFDRDtBQS9GYyxDQUFqQixDLENBaUdFOztBQUdGLFNBQVNFLEtBQVQsQ0FBZUUsS0FBZixFQUFzQjtBQUNwQixTQUFPQSxVQUFVLENBQUMsQ0FBbEI7QUFDRDs7QUFFRCxTQUFTN0MsU0FBVCxDQUFtQmQsSUFBbkIsRUFBeUI7QUFDdkIsU0FBT0EsS0FBS1EsT0FBTCxDQUFhLE9BQWIsRUFBc0IsRUFBdEIsRUFBMEIrQixJQUExQixHQUFpQ3JGLE1BQWpDLEtBQTRDLENBQW5EO0FBQ0Q7O0FBRUQsU0FBUzBHLFFBQVQsQ0FBa0I1RCxJQUFsQixFQUF3QjtBQUN0QixNQUFNNkQsbUJBQW1CLFVBQXpCO0FBQ0EsTUFBTUMsZUFBZSxDQUFDOUQsS0FBSzZCLEtBQUwsQ0FBV2dDLGdCQUFYLEtBQWdDLEVBQWpDLEVBQXFDM0csTUFBMUQ7QUFDQSxNQUFNNkcsYUFBYS9ELEtBQUtRLE9BQUwsQ0FBYXFELGdCQUFiLEVBQStCLEVBQS9CLEVBQW1DckQsT0FBbkMsQ0FBMkMsWUFBM0MsRUFBeUQsRUFBekQsRUFBNkR0RCxNQUFoRjtBQUVBLFNBQU80RyxlQUFlQyxVQUF0QjtBQUNEOztBQUVELFNBQVNDLFFBQVQsQ0FBa0JoRSxJQUFsQixFQUF3QjtBQUN0QixNQUFNaUUsZ0JBQWdCLENBQUNqRSxLQUFLNkIsS0FBTCxDQUFXLEtBQVgsS0FBcUIsRUFBdEIsRUFBMEIzRSxNQUFoRDtBQUNBLFNBQU8wRyxTQUFTNUQsSUFBVCxJQUFpQmlFLGFBQXhCO0FBQ0Q7O0FBRUQsU0FBUy9ELFdBQVQsQ0FBcUJGLElBQXJCLEVBQTJCO0FBQ3pCLFNBQU8sQ0FBQ2dFLFNBQVNoRSxJQUFULENBQUQsRUFBaUI0RCxTQUFTNUQsSUFBVCxDQUFqQixDQUFQO0FBQ0Q7O0FBRUQsU0FBU0MsVUFBVCxDQUFvQkYsVUFBcEIsRUFBZ0M7QUFDOUIsTUFBTW1FLFNBQVNuRSxXQUFXOEIsS0FBWCxDQUFpQixzQkFBakIsRUFBeUMsQ0FBekMsQ0FBZjtBQUNBLE1BQU1zQyxhQUFhQyxhQUFhQyxRQUFRQyxtQkFBbUJKLE1BQW5CLENBQVIsQ0FBYixDQUFuQjtBQUVBLFNBQU9LLFFBQVEvQyxNQUFNMkMsVUFBTixDQUFSLEVBQTJCSyxHQUEzQixDQUErQixpQkFBUztBQUM3QyxRQUFJQyxVQUFVLEdBQWQsRUFDRSxPQUFPLElBQVA7QUFFRixRQUFJQSxVQUFVLEdBQWQsRUFDRSxPQUFPLGdCQUFQOztBQUVGLFFBQUksS0FBS0MsSUFBTCxDQUFVRCxLQUFWLENBQUosRUFBc0I7QUFDcEIsVUFBTUUsU0FBUyxFQUFmO0FBQ0EsVUFBTUMsV0FBV0MsT0FBT0osTUFBTTVDLEtBQU4sQ0FBWSxLQUFaLEVBQW1CLENBQW5CLENBQVAsQ0FBakI7O0FBQ0EsV0FBSyxJQUFJNUUsSUFBSSxDQUFiLEVBQWdCQSxJQUFJMkgsUUFBcEIsRUFBOEIzSCxHQUE5QjtBQUNFMEgsZUFBT2hHLElBQVAsQ0FBWSxLQUFaO0FBREY7O0FBR0EsVUFBSWdHLE9BQU96SCxNQUFQLEtBQWtCLENBQXRCLEVBQ0UsT0FBTyxLQUFQO0FBRUYsYUFBTyxNQUFNeUgsT0FBT3ZELElBQVAsQ0FBWSxHQUFaLENBQU4sR0FBeUIsR0FBaEM7QUFDRDs7QUFFRCxRQUFJLElBQUlzRCxJQUFKLENBQVNELEtBQVQsQ0FBSixFQUFxQjtBQUNuQixVQUFNSyxlQUFlTCxNQUFNakUsT0FBTixDQUFjLElBQWQsRUFBb0IsRUFBcEIsQ0FBckI7QUFDQSw4QkFBWXNFLFlBQVo7QUFDRCxLQXRCNEMsQ0F1QjdDOzs7QUFDQSxXQUFPTCxLQUFQO0FBQ0QsR0F6Qk0sRUF5QkpyRCxJQXpCSSxDQXlCQyxHQXpCRCxDQUFQO0FBMEJEOztBQUVELFNBQVNrRCxrQkFBVCxDQUE0QlMsTUFBNUIsRUFBb0M7QUFDbEMsU0FBT0EsT0FBT3ZFLE9BQVAsQ0FBZSxRQUFmLEVBQXlCLFVBQUNxQixLQUFELEVBQVFtRCxFQUFSO0FBQUEsc0JBQW1CQSxHQUFHOUgsTUFBdEI7QUFBQSxHQUF6QixDQUFQO0FBQ0Q7O0FBRUQsU0FBU21ILE9BQVQsQ0FBaUJVLE1BQWpCLEVBQXlCO0FBQ3ZCLFNBQU9BLE9BQU92RSxPQUFQLENBQWUsUUFBZixFQUF5QixNQUF6QixDQUFQO0FBQ0Q7O0FBRUQsU0FBUzRELFlBQVQsQ0FBc0JXLE1BQXRCLEVBQThCO0FBQzVCLFNBQU9BLE9BQU92RSxPQUFQLENBQWUsWUFBZixFQUE2QixPQUE3QixDQUFQO0FBQ0Q7O0FBRUQsU0FBU2dCLEtBQVQsQ0FBZXlELEdBQWYsRUFBb0I7QUFDbEIsU0FBT0EsSUFBSXpELEtBQUosQ0FBVSxRQUFWLEVBQ0lnRCxHQURKLENBQ1E7QUFBQSxXQUNILE9BQU9FLElBQVAsQ0FBWUQsS0FBWixJQUNFQSxLQURGLEdBRUVBLE1BQU1qRCxLQUFOLENBQVksRUFBWixDQUhDO0FBQUEsR0FEUixDQUFQO0FBTUQ7O0FBRUQsU0FBUzBELE1BQVQsQ0FBZ0JDLENBQWhCLEVBQW1CO0FBQ2pCLFNBQU8sQ0FBQ0MsTUFBTUMsT0FBTixDQUFjRixDQUFkLENBQVI7QUFDRDs7QUFFRCxTQUFTWixPQUFULENBQWlCZSxJQUFqQixFQUFrQztBQUFBLE1BQVhDLElBQVcsdUVBQUosRUFBSTtBQUNoQyxNQUFJRCxLQUFLcEksTUFBTCxLQUFnQixDQUFwQixFQUNFLE9BQU9xSSxJQUFQOztBQUY4Qix1QkFJVkQsSUFKVTtBQUFBLE1BSTNCRSxJQUoyQjtBQUFBLE1BSWxCQyxJQUprQjs7QUFLaEMsU0FBT1AsT0FBT00sSUFBUCxJQUNIakIsUUFBUWtCLElBQVIsRUFBY0YsS0FBS3hELE1BQUwsQ0FBWXlELElBQVosQ0FBZCxDQURHLEdBRUhqQixRQUFRa0IsSUFBUixFQUFjRixLQUFLeEQsTUFBTCxDQUFZd0MsUUFBUWlCLElBQVIsQ0FBWixDQUFkLENBRko7QUFHRCxDOzs7Ozs7Ozs7Ozs7OztBQ3BNRCwyQzs7Ozs7O0FDQUEsSUFBSSxJQUFKLEVBQ0UsbUJBQUF6TixDQUFRLENBQVIsRUFBa0IyTixNQUFsQjs7QUFFRixJQUFNQyxVQUFVLG1CQUFBNU4sQ0FBUSxDQUFSLENBQWhCOztBQUNBLElBQU02TixNQUFNRCxTQUFaOztBQUNBLElBQU03SSxPQUFPLG1CQUFBL0UsQ0FBUSxDQUFSLENBQWI7O0FBQ0EsSUFBTThOLGFBQWEsbUJBQUE5TixDQUFRLEVBQVIsQ0FBbkI7O0FBQ0EsSUFBTStOLGFBQWEsbUJBQUEvTixDQUFRLEVBQVIsQ0FBbkI7O0FBRUE2TixJQUFJRyxHQUFKLENBQVEsTUFBUixFQUFpQjFOLFFBQVFDLEdBQVIsQ0FBWTBOLElBQVosSUFBb0IsSUFBckM7QUFDQUosSUFBSUssR0FBSixDQUFRTixRQUFRTyxNQUFSLENBQWVwSixLQUFLaEUsT0FBTCxDQUFhcU4sU0FBYixFQUF3QixTQUF4QixDQUFmLENBQVI7QUFDQVAsSUFBSUssR0FBSixDQUFRSixXQUFXckosSUFBWCxFQUFSOztBQUVBLG1CQUFBekUsQ0FBUSxFQUFSLEVBQWlCNk4sR0FBakIsRSxDQUVBOzs7QUFFQUEsSUFBSVEsTUFBSixDQUFXUixJQUFJUyxHQUFKLENBQVEsTUFBUixDQUFYLEVBQTRCO0FBQUEsU0FDMUJsRCxRQUFRbUQsR0FBUixDQUFZLG1CQUFaLEVBQWlDVixJQUFJUyxHQUFKLENBQVEsTUFBUixDQUFqQyxDQUQwQjtBQUFBLENBQTVCO0FBSUFuTyxVQUFVRCxPQUFPQyxPQUFQLEdBQWlCME4sR0FBM0IsQzs7Ozs7O0FDckJBLG1DOzs7Ozs7QUNBQSxvQzs7Ozs7O0FDQUEsd0M7Ozs7Ozs7O0FDQUEsSUFBTXBOLEtBQUssbUJBQUFULENBQVEsQ0FBUixDQUFYOztlQVdJLG1CQUFBQSxDQUFRLENBQVIsQztJQVRGOEgsSyxZQUFBQSxLO0lBQ0F3QixlLFlBQUFBLGU7SUFDQVcsYyxZQUFBQSxjO0lBQ0FzQixRLFlBQUFBLFE7SUFDQWpCLGEsWUFBQUEsYTtJQUNBa0UsWSxZQUFBQSxZO0lBQ0E5RCxZLFlBQUFBLFk7SUFDQStELFMsWUFBQUEsUztJQUNBN04sUSxZQUFBQSxROztBQUVGLElBQU04TixVQUFVLG1CQUFBMU8sQ0FBUSxDQUFSLENBQWhCOztJQUNRc0gsZSxHQUFvQmhILFFBQVFDLEcsQ0FBNUIrRyxlO0FBRVIsSUFBTXFILGtCQUFrQixJQUF4QjtBQUNBLElBQUlDLG9CQUFvQixJQUF4QjtBQUVBMU8sT0FBT0MsT0FBUCxHQUFpQjtBQUNmME8sU0FBTyxpQkFBTTtBQUNYQztBQUNBQyxnQkFBWUMsbUJBQVosRUFBaUNKLGlCQUFqQztBQUNELEdBSmMsQ0FLZjtBQUNBO0FBQ0E7QUFDQTs7QUFSZSxDQUFqQjs7QUFXQSxTQUFTSyxhQUFULEdBQXlCO0FBQ3ZCLE1BQU1DLGVBQWV4RSxhQUFhLEVBQWIsQ0FBckI7QUFDQSxNQUFNeUUsb0JBQW9CekUsYUFBYSxDQUFiLENBQTFCO0FBRUEwRSxhQUFXLFlBQU07QUFDZkwsZ0JBQVlDLG1CQUFaLEVBQWlDSixpQkFBakM7QUFDRCxHQUZELEVBRUdNLFlBRkg7QUFJQUUsYUFBVyxZQUFNO0FBQ2ZMLGdCQUFZdEosa0JBQVosRUFBZ0MsS0FBR3FDLEtBQW5DO0FBQ0QsR0FGRCxFQUVHcUgsaUJBRkg7QUFHRDs7U0FFY0gsbUI7Ozs7Ozs7MEJBQWY7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBU1lwTyxTQUFTSCxHQUFHSSxpQkFBSCxFQUFULENBVFo7O0FBQUE7QUFBQTtBQUVJaUIsa0JBRkosU0FFSUEsTUFGSjtBQUdJdU4sd0JBSEosU0FHSUEsWUFISjtBQUlJN00sdUJBSkosU0FJSUEsV0FKSjtBQUtJOE0sMkJBTEosU0FLSUEsZUFMSjtBQU1JN00sdUJBTkosU0FNSUEsV0FOSjtBQU9JOE0sMkJBUEosU0FPSUEsZUFQSjtBQVFJckcsbUJBUkosU0FRSUEsT0FSSjs7QUFBQSxnQkFVT3BILE1BVlA7QUFBQTtBQUFBO0FBQUE7O0FBQUE7O0FBQUE7QUFBQTtBQUFBLG1CQWdCWWxCLFNBQ1I2TixVQUNFWSxZQURGLEVBRUU3TSxXQUZGLEVBR0U4TSxlQUhGLEVBSUU3TSxXQUpGLEVBS0U4TSxlQUxGLENBRFEsQ0FoQlo7O0FBQUE7QUFBQTtBQWFJeE0sc0JBYkosU0FhSUEsVUFiSjtBQWNJbUgsNEJBZEosU0FjSUEsZ0JBZEo7QUFlSS9ILHFCQWZKLFNBZUlBLFNBZko7QUEwQlFxTix3QkExQlIsR0EwQnVCO0FBQ25CMU4sNEJBRG1CO0FBRW5CaUIsb0NBRm1CO0FBR25CbUcsOEJBSG1CO0FBSW5CZ0IsZ0RBSm1CO0FBS25CN0csNEJBQWMsRUFMSztBQU1uQkQsK0JBQWlCO0FBTkUsYUExQnZCO0FBa0NFM0MsZUFBR3dCLGVBQUgsQ0FBbUJ1TixZQUFuQixFQUFpQ3JOLFNBQWpDO0FBQ0FpTix1QkFBVztBQUFBLHFCQUFNSyxZQUFZM04sTUFBWixFQUFvQmlCLFVBQXBCLENBQU47QUFBQSxhQUFYLEVBQWtENEwsZUFBbEQ7O0FBbkNGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7U0FzQ2VjLFc7Ozs7Ozs7MEJBQWYsa0JBQTJCM04sTUFBM0IsRUFBbUNpQixVQUFuQztBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFLWW5DLFVBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FILGVBQUdvQixvQkFBSCxDQUF3QkMsTUFBeEIsQ0FQUSxDQUxaOztBQUFBO0FBQUE7QUFFSXNILHNCQUZKLFNBRUlBLFVBRko7QUFHSXZHLHFCQUhKLFNBR0lBLFNBSEo7QUFJSTZNLHlCQUpKLFNBSUlBLGFBSko7QUFBQTtBQUFBLG1CQWU4QjlPLFNBQzFCNk4sVUFDRW5GLGdCQUFnQkYsVUFBaEIsRUFBNEJyRyxVQUE1QixDQURGLEVBRUVGLFNBRkYsRUFHRTZNLGFBSEYsQ0FEMEIsQ0FmOUI7O0FBQUE7QUFBQTtBQWVVdk4scUJBZlYsU0FlVUEsU0FmVjtBQXVCRTFCLGVBQUdpQyxrQkFBSCxDQUFzQlosTUFBdEIsRUFBOEJLLFNBQTlCOztBQXZCRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O0FBMEJBLFNBQVMyTSxVQUFULEdBQXNCO0FBQ3BCLE1BQU1hLFNBQVNqQixRQUFRaUIsTUFBUixDQUFlLGlCQUFmLEVBQWtDO0FBQUVDLHNCQUFXdEksZUFBWDtBQUFGLEdBQWxDLENBQWY7QUFFQXFJLFNBQU9FLEVBQVAsQ0FBVSxPQUFWO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw0QkFBbUI7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNVOU0sd0JBRFYsUUFDakIrTSx5QkFEaUIsRUFFTHRKLGNBRkssUUFFakJ1SixVQUZpQixFQUdqQnhGLElBSGlCLFFBR2pCQSxJQUhpQixtQkFJakIzRyxJQUppQixFQUtYWCxNQUxXLGFBS2YrTSxFQUxlLEVBTWZuTSxJQU5lLGFBTWZBLElBTmUsRUFPRkMsTUFQRSxhQU9mbU0sV0FQZSxFQVFVbE0sTUFSVixhQVFmbU0sdUJBUmUsRUFTS2xNLGFBVEwsYUFTZm1NLGtCQVRlO0FBQUE7QUFBQSxxQkFZV3ZQLFNBQVNILEdBQUc2QyxnQkFBSCxFQUFULENBWlg7O0FBQUE7QUFZWGxCLDJCQVpXO0FBYVhnTywyQkFiVyxHQWFLaE8sY0FBY2lPLE1BQWQsQ0FDcEI7QUFBQSx1QkFBT0MsSUFBSXZOLFVBQUosS0FBbUJBLFVBQTFCO0FBQUEsZUFEb0IsRUFFcEIsQ0FGb0IsQ0FiTDs7QUFBQSxtQkFpQmJxTixhQWpCYTtBQUFBO0FBQUE7QUFBQTs7QUFtQmJoTiw2QkFuQmEsR0FxQlhnTixhQXJCVyxDQW1CYmhOLGVBbkJhLEVBb0JKbU4sZUFwQkksR0FxQlhILGFBckJXLENBb0JibEgsT0FwQmE7O0FBQUEsbUJBc0JYcUMsU0FBU3RJLE1BQVQsRUFBaUJHLGVBQWpCLENBdEJXO0FBQUE7QUFBQTtBQUFBOztBQUFBOztBQUFBO0FBeUJUb04sd0JBekJTLEdBeUJJbEcsY0FBY0MsSUFBZCxDQXpCSjs7QUFBQSxtQkEwQlhnQixTQUFTaUYsVUFBVCxFQUFxQkQsZUFBckIsQ0ExQlc7QUFBQTtBQUFBO0FBQUE7O0FBMkJQck4sb0JBM0JPLEdBMkJFK0csZUFBZXpELGNBQWYsRUFBK0I0SixhQUEvQixDQTNCRjtBQUFBO0FBQUEscUJBNEJXeFAsU0FBUzROLGFBQWF2TCxNQUFiLENBQVQsQ0E1Qlg7O0FBQUE7QUE0QlBnQix1QkE1Qk87QUE2QlBQLHFCQTdCTyxHQTZCRztBQUNkVCw4QkFEYztBQUVkWSwwQkFGYztBQUdkQyw4QkFIYztBQUlkQyw4QkFKYztBQUtkQyw0Q0FMYztBQU1kQyxvQ0FOYztBQU9kNkMsdUJBQU8sQ0FQTztBQVFkaEIsOEJBQWMsQ0FSQTtBQVNkRCw2QkFBYSxDQVRDO0FBVWRrQixnQ0FBZ0I7QUFWRixlQTdCSDtBQXlDYnRHLGlCQUFHZ0QsZUFBSCxDQUFtQkMsT0FBbkI7QUFDQWpELGlCQUFHcUMsa0JBQUgsQ0FBc0JDLFVBQXRCLEVBQWtDO0FBQUVFLDhCQUFGO0FBQVVDO0FBQVYsZUFBbEM7QUExQ2E7QUFBQTs7QUFBQTtBQTZDYnpDLGlCQUFHcUMsa0JBQUgsQ0FBc0JDLFVBQXRCLEVBQWtDO0FBQUVFLDhCQUFGO0FBQVVDLHdCQUFRO0FBQWxCLGVBQWxDOztBQTdDYTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFuQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWtEQXlNLFNBQU9FLEVBQVAsQ0FBVSxZQUFWLEVBQXdCLFVBQUNZLGFBQUQsRUFBbUI7QUFDekNyRixZQUFRQyxLQUFSLENBQWMsNEJBQWQsRUFBNENvRixhQUE1QztBQUNBckIsZUFBVztBQUFBLGFBQU1PLE9BQU9kLEtBQVAsRUFBTjtBQUFBLEtBQVgsRUFBaUMsR0FBakM7QUFDRCxHQUhEO0FBSUQ7O0FBRUQsU0FBU3BKLGtCQUFULEdBQThCO0FBQzVCLE1BQU1tRixNQUFNbkUsS0FBS21FLEdBQUwsRUFBWjtBQUNBLE1BQU1sRixtQkFBbUJrRixJQUFJOEYsTUFBSixPQUFpQixDQUExQztBQUNBLE1BQU0vSyxvQkFBb0JpRixJQUFJSSxPQUFKLE9BQWtCLENBQTVDO0FBRUEsTUFBSXRGLG9CQUFvQkMsaUJBQXhCLEVBQ0VsRixHQUFHZ0Ysa0JBQUgsQ0FBc0JDLGdCQUF0QixFQUF3Q0MsaUJBQXhDO0FBQ0gsQzs7Ozs7O0FDNUtELG9DOzs7Ozs7Ozs7Ozs7QUNBQSxJQUFNZ0wsS0FBSyxtQkFBQTNRLENBQVEsRUFBUixDQUFYOztBQUNBLElBQU00USxNQUFNLG1CQUFBNVEsQ0FBUSxFQUFSLEVBQWtCNFEsR0FBOUI7O0FBQ0EsSUFBTTdMLE9BQU8sbUJBQUEvRSxDQUFRLENBQVIsQ0FBYjs7QUFDQSxJQUFNNlEsUUFBUSxtQkFBQTdRLENBQVEsRUFBUixDQUFkOztBQUNBLElBQU04USxlQUFlL0wsS0FBS2hFLE9BQUwsQ0FBYXFOLFNBQWIsRUFBd0IsWUFBeEIsQ0FBckI7O2VBUUksbUJBQUFwTyxDQUFRLENBQVIsQztJQU5GK0gscUIsWUFBQUEscUI7SUFDQVcsa0IsWUFBQUEsa0I7SUFDQU0sbUIsWUFBQUEsbUI7SUFDQUMsZ0IsWUFBQUEsZ0I7SUFDQVUsVSxZQUFBQSxVO0lBQ0EvSSxRLFlBQUFBLFE7O0FBSUZWLE9BQU9DLE9BQVAsR0FBaUI7QUFDZlEsOEJBRGU7QUFFZm9RLDhCQUZlO0FBR2ZDO0FBSGUsQ0FBakI7O0FBTUEsU0FBU3JRLGFBQVQsQ0FBdUJzUSxXQUF2QixFQUFvQztBQUNsQyxTQUFPLElBQUluUSxPQUFKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw0QkFBWSxrQkFBT0MsT0FBUCxFQUFnQkMsTUFBaEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ1gyTyxvQkFEVyxHQUNGZ0IsR0FBR08sZ0JBQUgsQ0FBb0JELFdBQXBCLEVBQ1pFLElBRFksQ0FDUE4sTUFBTU8sT0FBTixDQUFjO0FBQUVyTSxzQkFBTTtBQUFSLGVBQWQsQ0FETyxDQURFO0FBSWpCNEsscUJBQU9FLEVBQVAsQ0FBVSxPQUFWO0FBQUE7QUFBQTtBQUFBO0FBQUEsc0NBQW1CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNYd0IsNkJBRFcsR0FDSFYsR0FBR1csV0FBSCxDQUFlUixZQUFmLENBREc7QUFBQTtBQUFBLCtCQUVYbFEsU0FBU29RLGVBQWVGLGVBQWUsUUFBOUIsQ0FBVCxDQUZXOztBQUFBO0FBR2pCMUYsZ0NBQVFtRCxHQUFSLENBQVksNkJBQVo7QUFDTXBOLGdDQUpXLEdBSUFvUSxnQkFBZ0JGLEtBQWhCLENBSkE7QUFNakJHLGdDQUFRSCxLQUFSO0FBQ0F0USxnQ0FBUUksUUFBUjs7QUFQaUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBbkI7O0FBSmlCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQVo7O0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFBUDtBQWNEOztBQUVELFNBQVM2UCxjQUFULENBQXdCUyxPQUF4QixFQUFpQztBQUMvQixTQUFPLElBQUkzUSxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDLFFBQU0wUSxrQkFBa0IsRUFBeEI7QUFDQWYsT0FBR1csV0FBSCxDQUFlRyxPQUFmLEVBQXdCRSxPQUF4QixDQUFnQyxnQkFBUTtBQUN0QyxVQUFJLFdBQVdoRixJQUFYLENBQWdCN0gsSUFBaEIsQ0FBSixFQUEyQjtBQUN6QixZQUFNOE0sY0FBY0gsVUFBVSxHQUFWLEdBQWdCM00sSUFBcEM7QUFDQSxZQUFNK00sV0FBV2xCLEdBQUdtQixZQUFILENBQWdCRixXQUFoQixDQUFqQjtBQUNBLFlBQU1HLGNBQWNwQixHQUFHcUIsaUJBQUgsQ0FBcUJKLFdBQXJCLENBQXBCO0FBQ0EsWUFBTUssZUFBZSxJQUFJblIsT0FBSixDQUFZLFVBQUNzRCxHQUFELEVBQU04TixHQUFOO0FBQUEsaUJBQy9CSCxZQUFZbEMsRUFBWixDQUFlLE9BQWYsRUFBd0J6TCxHQUF4QixDQUQrQjtBQUFBLFNBQVosQ0FBckI7QUFHQXNOLHdCQUFnQjlLLElBQWhCLENBQXFCcUwsWUFBckI7QUFDQSxZQUFJckIsR0FBSixDQUFRO0FBQUV1QixzQkFBWSxDQUFkO0FBQWlCQyx3QkFBYztBQUEvQixTQUFSLEVBQ0dDLEtBREgsQ0FDU1IsUUFEVCxFQUNtQixVQUFDdkcsR0FBRCxFQUFNZ0gsR0FBTixFQUFjO0FBQzdCO0FBQ0E7QUFDQTtBQUNBQSxjQUFJOU4sSUFBSixDQUFTLENBQVQsS0FBZSxDQUFmO0FBQ0E4TixjQUFJQyxJQUFKLEdBQVdwQixJQUFYLENBQWdCWSxXQUFoQjtBQUNELFNBUEg7QUFRRDtBQUNGLEtBbEJEO0FBbUJBalIsWUFBUTBSLEdBQVIsQ0FBWWQsZUFBWixFQUE2QnhHLElBQTdCLENBQWtDbkssT0FBbEM7QUFDRCxHQXRCTSxDQUFQO0FBdUJEOztBQUVELFNBQVN3USxlQUFULENBQXlCRixLQUF6QixFQUFnQztBQUM5QixNQUFJb0IsY0FBYyxFQUFsQjtBQUQ4QjtBQUFBO0FBQUE7O0FBQUE7QUFFOUIseUJBQWlCcEIsS0FBakIsOEhBQXdCO0FBQUEsVUFBZnZNLEtBQWU7QUFDdEIsVUFBTThNLHdCQUFpQmQsWUFBakIsY0FBaUNoTSxLQUFqQyxDQUFOO0FBQ0EsVUFBTTROLFFBQVEvQixHQUFHZ0MsUUFBSCxDQUFZZixXQUFaLENBQWQ7O0FBRUEsVUFBSWMsTUFBTUUsTUFBTixNQUFrQjlOLE1BQUtnRixLQUFMLENBQVcsV0FBWCxDQUF0QixFQUErQztBQUM3QyxZQUFNM0ksV0FBVzRQLGNBQWNhLFdBQWQsQ0FBakI7QUFDQWEsc0JBQWNBLFlBQVl6SSxNQUFaLENBQW1CN0ksUUFBbkIsQ0FBZDtBQUNEO0FBQ0Y7QUFWNkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFXOUIsU0FBT3NSLFdBQVA7QUFDRDs7QUFFRCxTQUFTMUIsYUFBVCxDQUF1QmxNLFFBQXZCLEVBQWlDO0FBQy9CLE1BQU1nTixXQUFXZ0IsS0FBS1IsS0FBTCxDQUFXMUIsR0FBR21CLFlBQUgsQ0FBZ0JqTixRQUFoQixFQUEwQixNQUExQixDQUFYLENBQWpCO0FBQ0EsU0FBT2dOLFNBQVNqSixLQUFULENBQWU2RCxHQUFmLENBQW1CLGdCQUFRO0FBQUEsc0NBaUI1QnFHLEtBQUtDLE1BakJ1QjtBQUFBLFFBRTlCL0ssVUFGOEI7QUFBQSxRQUc1QjtBQUNEO0FBQ0RXLGNBTDhCO0FBQUEsUUFNNUI7QUFDRm5HLGVBUDhCO0FBQUEsUUFROUJLLFNBUjhCO0FBQUEsUUFTNUI7QUFDRkosZUFWOEI7QUFBQSxRQVc5QjhNLGVBWDhCO0FBQUEsUUFZOUIzRixVQVo4QjtBQUFBLFFBYTlCVCxTQWI4QjtBQUFBLFFBYW5CO0FBQ0E7QUFDWFAsU0FmOEI7QUFBQSxRQWdCOUI5RyxNQWhCOEI7O0FBQUEsZUFtQkUsQ0FBQ2tHLFVBQUQsRUFBYVcsVUFBYixFQUF5QkMsS0FBekIsRUFBZ0M2RCxHQUFoQyxDQUFvQ3VHLFNBQXBDLENBbkJGOztBQUFBOztBQW1CL0JoTCxjQW5CK0I7QUFtQm5CVyxjQW5CbUI7QUFtQlBDLFNBbkJPO0FBb0JoQyxRQUFNTSxVQUFVUyxXQUFXM0IsVUFBWCxFQUF1QjRCLFVBQXZCLENBQWhCO0FBRUEsV0FBTztBQUNMOUgsb0JBREs7QUFFTHVOLG9CQUFpQjNHLG1CQUFtQlYsVUFBbkIsRUFBK0JXLFVBQS9CLEVBQTJDQyxLQUEzQyxFQUFrRDlHLE1BQWxELENBRlo7QUFHTFUsbUJBQWlCeVEsVUFBVXpRLFdBQVYsQ0FIWjtBQUlMOE0sdUJBQWlCdkgsc0JBQXNCQyxVQUF0QixDQUpaO0FBS0x2RixtQkFBaUJ3USxVQUFVeFEsV0FBVixDQUxaO0FBTUw4TSxzQ0FOSztBQU9Mbkcsa0JBQWlCSCxpQkFBaUJDLE9BQWpCLEVBQTBCUCxVQUExQixFQUFzQ1EsU0FBdEMsRUFBaURySCxNQUFqRCxDQVBaO0FBUUxlLGlCQUFpQm9RLFVBQVVwUSxTQUFWLENBUlo7QUFTTDZNLHFCQUFpQjFHLG9CQUFvQmhCLFVBQXBCLENBVFo7QUFVTGtCLHNCQVZLO0FBV0wvRyxpQkFBVztBQVhOLEtBQVA7QUFhRCxHQW5DTSxDQUFQO0FBb0NEOztBQUVELFNBQVM2USxTQUFULENBQW1CaEcsTUFBbkIsRUFBMkI7QUFDekIsU0FBT0EsT0FBT3ZFLE9BQVAsQ0FBZSxhQUFmLEVBQThCLEVBQTlCLENBQVA7QUFDRDs7QUFFRCxTQUFTeUssTUFBVCxDQUFnQmxHLE1BQWhCLEVBQXdCO0FBQ3RCLFNBQU8sQ0FBQ0EsT0FBT2xELEtBQVAsQ0FBYSxZQUFiLEtBQThCLEdBQS9CLEVBQW9DLENBQXBDLENBQVA7QUFDRDs7QUFFRCxTQUFTbUosU0FBVCxDQUFtQmpHLE1BQW5CLEVBQTJCO0FBQ3pCLE1BQUksQ0FBQ0EsTUFBRCxJQUFXQSxPQUFPN0gsTUFBUCxLQUFrQixDQUFqQyxFQUFvQztBQUVwQyxNQUFJZ08sTUFBSjs7QUFDQSxNQUFJO0FBQ0ZBLGFBQVN4QyxHQUFHbUIsWUFBSCxXQUNKaEIsWUFESSxvQkFDa0JvQyxPQUFPbEcsTUFBUCxDQURsQixHQUVQO0FBQUVvRyxnQkFBVTtBQUFaLEtBRk8sQ0FBVDtBQUlELEdBTEQsQ0FLRSxPQUFPQyxDQUFQLEVBQVUsQ0FDVjtBQUNEOztBQUNELFNBQU9GLE1BQVA7QUFDRDs7QUFFRCxTQUFTM0IsT0FBVCxDQUFpQkgsS0FBakIsRUFBd0I7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFDdEIsMEJBQWlCQSxLQUFqQixtSUFBd0I7QUFBQSxVQUFmdk0sTUFBZTtBQUN0QixVQUFNd08saUJBQVV4QyxZQUFWLGNBQTBCaE0sTUFBMUIsQ0FBTjtBQUVBLFVBQUk2TCxHQUFHNEMsU0FBSCxDQUFhRCxJQUFiLEVBQW1CVixNQUFuQixFQUFKLEVBQ0VqQyxHQUFHNkMsVUFBSCxDQUFjRixJQUFkLEVBREYsS0FFSyxJQUFJM0MsR0FBRzRDLFNBQUgsQ0FBYUQsSUFBYixFQUFtQkcsV0FBbkIsRUFBSixFQUNIQyxzQkFBc0JKLElBQXRCO0FBQ0g7QUFScUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVN2Qjs7QUFFRCxTQUFTSSxxQkFBVCxDQUErQkMsUUFBL0IsRUFBeUM7QUFDdkMsTUFBSWhELEdBQUdpRCxVQUFILENBQWNELFFBQWQsQ0FBSixFQUE2QjtBQUMzQmhELE9BQUdXLFdBQUgsQ0FBZXFDLFFBQWYsRUFBeUJoQyxPQUF6QixDQUFpQyxnQkFBUTtBQUN2QyxVQUFNa0MsVUFBVUYsV0FBVyxHQUFYLEdBQWlCN08sSUFBakM7O0FBQ0EsVUFBSTZMLEdBQUc0QyxTQUFILENBQWFNLE9BQWIsRUFBc0JKLFdBQXRCLEVBQUosRUFBeUM7QUFBRTtBQUN6Q0MsOEJBQXNCRyxPQUF0QjtBQUNELE9BRkQsTUFFTztBQUFFO0FBQ1BsRCxXQUFHNkMsVUFBSCxDQUFjSyxPQUFkO0FBQ0Q7QUFDRixLQVBEO0FBUUFsRCxPQUFHbUQsU0FBSCxDQUFhSCxRQUFiO0FBQ0Q7QUFDRjs7QUFBQSxDOzs7Ozs7QUNwS0QsK0I7Ozs7OztBQ0FBLG1DOzs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7QUNBQSxJQUFNakYsVUFBVSxtQkFBQTFPLENBQVEsQ0FBUixDQUFoQjs7ZUFDcUIsbUJBQUFBLENBQVEsQ0FBUixDO0lBQWJZLFEsWUFBQUEsUTs7QUFFUlYsT0FBT0MsT0FBUCxHQUFpQjtBQUVmO0FBQ0E7QUFDQTtBQUNBc08sV0FMZSxxQkFLTHNGLE1BTEssRUFLR0MsU0FMSCxFQUtjQyxRQUxkLEVBS3dCQyxTQUx4QixFQUttQ0MsUUFMbkMsRUFLNkM7QUFDMUQsV0FBTyxJQUFJclQsT0FBSjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsOEJBQVksaUJBQU9DLE9BQVAsRUFBZ0JDLE1BQWhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQ01KLFNBQVN3VCxZQUFZSixTQUFaLEVBQXVCQyxRQUF2QixDQUFULENBRE47O0FBQUE7QUFDWEksd0JBRFc7QUFFWEMseUJBRlcsR0FFQyxDQUFDRCxRQUFELENBRkQ7O0FBQUEscUJBR2JILFNBSGE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSx1QkFJUXRULFNBQVN3VCxZQUFZRixTQUFaLEVBQXVCQyxRQUF2QixDQUFULENBSlI7O0FBQUE7QUFJVEksd0JBSlM7QUFLZkQsMEJBQVVFLE9BQVYsQ0FBa0JELFFBQWxCOztBQUxlO0FBUVg1UCxzQkFSVyxHQVFGO0FBQUVvUCxnQ0FBRjtBQUFVTyxzQ0FBVjtBQUFxQkcsOEJBQVksVUFBakM7QUFBNkNDLHdDQUFzQjtBQUFuRSxpQkFSRTtBQVNqQmhHLHdCQUFRaUcsSUFBUixDQUFhLGlCQUFiLEVBQWdDaFEsTUFBaEMsRUFBd0MsVUFBQzJHLEdBQUQsRUFBTTlHLElBQU4sRUFBWW9RLFFBQVosRUFBeUI7QUFDL0Qsc0JBQUl0SixHQUFKLEVBQVM7QUFDUEYsNEJBQVFDLEtBQVIsQ0FBY0MsR0FBZDtBQUNBdEssMkJBQU8sSUFBSVMsS0FBSixDQUFVLHdCQUFWLENBQVA7QUFDRDs7QUFBQTtBQUNEMkosMEJBQVFtRCxHQUFSLENBQVksZUFBWixFQUE2Qi9KLEtBQUtxUSxpQkFBTCxDQUF1QkMsS0FBcEQ7QUFDQSxzQkFBTTNTLFlBQVlxQyxLQUFLcVEsaUJBQUwsQ0FBdUJDLEtBQXZCLENBQTZCckksR0FBN0IsQ0FDaEI7QUFBQSwyQkFBUTtBQUNOc0ksNkJBQU96RSxJQUFJMEUsZUFETDtBQUVOQywrQkFBUzNFLElBQUk0RTtBQUZQLHFCQUFSO0FBQUEsbUJBRGdCLENBQWxCO0FBTUEsc0JBQU10SSxTQUFTO0FBQ2I3SixnQ0FBa0J5QixLQUFLMlEsTUFEVjtBQUViakwsc0NBQWtCMUYsS0FBS3VMLFVBRlY7QUFHYjVOO0FBSGEsbUJBQWY7QUFLQXBCLDBCQUFRNkwsTUFBUjtBQUNELGlCQWxCRDs7QUFUaUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FBWjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQUFQO0FBNkJELEdBbkNjO0FBcUNmNEIsY0FyQ2Usd0JBcUNGdkwsTUFyQ0UsRUFxQ007QUFDbkIsV0FBTyxJQUFJbkMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0QzBOLGNBQVFKLEdBQVIsQ0FBWSxhQUFaLEVBQTJCO0FBQUVyTDtBQUFGLE9BQTNCLEVBQXVDLFVBQUNxSSxHQUFELEVBQU05RyxJQUFOLEVBQVlvUSxRQUFaLEVBQXlCO0FBQzlELFlBQUl0SixHQUFKLEVBQVNGLFFBQVFDLEtBQVIsQ0FBY0MsR0FBZDtBQUNUdkssZ0JBQVF5RCxLQUFLeUIsR0FBYjtBQUNELE9BSEQ7QUFJRCxLQUxNLENBQVA7QUFNRDtBQTVDYyxDQUFqQixDLENBOENFO0FBR0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsU0FBU21PLFdBQVQsQ0FBcUJnQixRQUFyQixFQUErQkgsT0FBL0IsRUFBd0M7QUFDdEMsU0FBTyxJQUFJblUsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0QztBQUNBME4sWUFBUWlHLElBQVIsQ0FBYSxjQUFiLEVBQTZCO0FBQUVVLGtCQUFZRDtBQUFkLEtBQTdCLEVBQXVELFVBQUM5SixHQUFELEVBQU05RyxJQUFOLEVBQVlvUSxRQUFaLEVBQXlCO0FBQzlFLFVBQUl0SixHQUFKLEVBQVM7QUFDUEYsZ0JBQVFDLEtBQVIsQ0FBY0MsR0FBZDtBQUNBdEssZUFBTyxJQUFJUyxLQUFKLENBQVUsc0JBQVYsQ0FBUDtBQUNBO0FBQ0QsT0FMNkUsQ0FNOUU7QUFDQTs7O0FBQ0EsVUFBTTZULGFBQWE5USxLQUFLK1EsZUFBeEI7QUFDQSxVQUFNQyxjQUFjO0FBQUVDLGtCQUFVSCxVQUFaO0FBQXdCSSxrQkFBVTtBQUFFbkwsZ0JBQU0wSztBQUFSO0FBQWxDLE9BQXBCO0FBRUF2RyxjQUFRaUcsSUFBUixDQUFhLHVCQUFiLEVBQXNDYSxXQUF0QyxFQUFtRCxVQUFDbEssR0FBRCxFQUFNOUcsSUFBTixFQUFZb1EsUUFBWixFQUF5QjtBQUMxRSxZQUFJdEosR0FBSixFQUFTO0FBQ1BGLGtCQUFRQyxLQUFSLENBQWNDLEdBQWQ7QUFDQXRLLGlCQUFPLElBQUlTLEtBQUosQ0FBVSxnREFBVixDQUFQO0FBQ0QsU0FKeUUsQ0FLMUU7OztBQUNBVixnQkFBUXVVLFVBQVI7QUFDRCxPQVBEO0FBUUQsS0FuQkQ7QUFvQkQsR0F0Qk0sQ0FBUDtBQXVCRCxDOzs7Ozs7QUNuRkQsaUM7Ozs7OztBQ0FBLHNDOzs7Ozs7QUNBQSxJQUFNN1UsS0FBSyxtQkFBQVQsQ0FBUSxDQUFSLENBQVg7O0FBQ0EsSUFBTTJWLFNBQVMsbUJBQUEzVixDQUFRLEVBQVIsRUFBa0I7QUFBRTRWLFFBQU07QUFBUixDQUFsQixDQUFmOztBQUVBMVYsT0FBT0MsT0FBUCxHQUFpQixVQUFDME4sR0FBRCxFQUFTO0FBRXhCO0FBQ0FBLE1BQUlLLEdBQUosQ0FBUSxVQUFDL0osR0FBRCxFQUFNQyxHQUFOLEVBQVd5UixJQUFYLEVBQW9CO0FBQzFCelIsUUFBSTBSLE1BQUosQ0FBVyw2QkFBWCxFQUEwQyxHQUExQztBQUNBMVIsUUFBSTBSLE1BQUosQ0FBVyw4QkFBWCxFQUEyQyxjQUEzQztBQUNBMVIsUUFBSTBSLE1BQUosQ0FBVyx3QkFBWCxFQUFxQyxPQUFyQyxFQUgwQixDQUdxQjs7QUFDL0MxUixRQUFJMFIsTUFBSixDQUFXLDhCQUFYLEVBQ1csZ0RBRFg7QUFFQUQ7QUFDRCxHQVBEO0FBU0FoSSxNQUFJUyxHQUFKLENBQVEsV0FBUixFQUFxQixVQUFDbkssR0FBRCxFQUFNQyxHQUFOLEVBQWM7QUFDakNBLFFBQUlLLElBQUosQ0FBU2hFLEdBQUc2QyxnQkFBSCxFQUFUO0FBQ0QsR0FGRDtBQUlBdUssTUFBSVMsR0FBSixDQUFRLGFBQVIsRUFBdUIsVUFBQ25LLEdBQUQsRUFBTUMsR0FBTixFQUFjO0FBQ25DM0QsT0FBRzRELFNBQUgsQ0FBYUYsR0FBYixFQUFrQkMsR0FBbEI7QUFDRCxHQUZEO0FBSUF5SixNQUFJUyxHQUFKLENBQVEsWUFBUixFQUFzQixVQUFDbkssR0FBRCxFQUFNQyxHQUFOLEVBQWM7QUFDbEMzRCxPQUFHdUYsUUFBSCxDQUFZN0IsR0FBWixFQUFpQkMsR0FBakI7QUFDRCxHQUZELEVBcEJ3QixDQXdCeEI7O0FBQ0F5SixNQUFJUyxHQUFKLENBQVEsb0JBQVIsRUFBOEIsVUFBQ25LLEdBQUQsRUFBTUMsR0FBTixFQUFjO0FBQzFDM0QsT0FBR2lFLFFBQUgsQ0FBWVAsR0FBWixFQUFpQkMsR0FBakI7QUFDRCxHQUZEO0FBSUF5SixNQUFJUyxHQUFKLENBQVEsZ0JBQVIsRUFBMEIsVUFBQ25LLEdBQUQsRUFBTUMsR0FBTixFQUFjO0FBQ3RDM0QsT0FBRytFLFdBQUgsQ0FBZXJCLEdBQWYsRUFBb0JDLEdBQXBCO0FBQ0QsR0FGRCxFQTdCd0IsQ0FrQ3hCOztBQUVBeUosTUFBSThHLElBQUosQ0FBUyxXQUFULEVBQXNCZ0IsT0FBT0ksTUFBUCxDQUFjLFNBQWQsQ0FBdEIsRUFBZ0QsVUFBQzVSLEdBQUQsRUFBTUMsR0FBTixFQUFjO0FBQzVEM0QsT0FBR21FLE9BQUgsQ0FBV1QsR0FBWCxFQUFnQkMsR0FBaEI7QUFDRCxHQUZEO0FBSUF5SixNQUFJOEcsSUFBSixDQUFTLGNBQVQsRUFBeUIsVUFBQ3hRLEdBQUQsRUFBTUMsR0FBTixFQUFjO0FBQ3JDM0QsT0FBR3lELFdBQUgsQ0FBZUMsR0FBZixFQUFvQkMsR0FBcEI7QUFDRCxHQUZEO0FBSUF5SixNQUFJUyxHQUFKLENBQVEsWUFBUixFQUFzQixVQUFDbkssR0FBRCxFQUFNQyxHQUFOLEVBQWM7QUFDbEMzRCxPQUFHNkUsV0FBSCxDQUFlbkIsR0FBZixFQUFvQkMsR0FBcEI7QUFDRCxHQUZEO0FBSUQsQ0FoREQsQyxDQWdERSxpQjs7Ozs7O0FDbkRGLG1DIiwiZmlsZSI6InNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDUpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGQ2NWUxM2EwMzZmOTc5OTIyYzc5IiwiY29uc3QgdHdpdHRlclV0aWxzID0gcmVxdWlyZSgnLi90d2l0dGVyVXRpbHMnKTtcbmNvbnN0IHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLi4udHdpdHRlclV0aWxzLFxuICAuLi51dGlsc1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWxzL2luZGV4LmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInBhdGhcIlxuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBNb25nb0NsaWVudCA9IHJlcXVpcmUoJ21vbmdvZGInKS5Nb25nb0NsaWVudDtcbmNvbnN0IHVybCA9IHByb2Nlc3MuZW52Lk1PTkdPREJfVVJJO1xuY29uc3QgREIgPSBwcm9jZXNzLmVudi5NT05HT19EQjtcbmNvbnN0IHsgcHJvY2Vzc1VwbG9hZCB9ID0gcmVxdWlyZSgnLi9wcm9jZXNzQW5raUpzb24nKTtcbmNvbnN0IHsgdHJ5Q2F0Y2ggfSA9IHJlcXVpcmUoJ1V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRSYW5kb21RdWVzdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgbW9uZ28gPSBhd2FpdCB0cnlDYXRjaChNb25nb0NsaWVudC5jb25uZWN0KHVybCkpO1xuICAgICAgY29uc3QgbmV3Q2FyZHMgPSBtb25nby5kYihEQikuY29sbGVjdGlvbignbmV3Q2FyZHMnKTtcbiAgICAgIGNvbnN0IG9sZENhcmRzID0gbW9uZ28uZGIoREIpLmNvbGxlY3Rpb24oJ29sZENhcmRzJyk7XG4gICAgICBjb25zdCByYW5kb21DYXJkID0gYXdhaXQgdHJ5Q2F0Y2gobmV3Q2FyZHMuZmluZE9uZSgpKTtcbiAgICAgIGlmIChyYW5kb21DYXJkID09IG51bGwpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIkVtcHR5IGRlY2suIFBsZWFzZSBBZGQgTW9yZSBDYXJkcyB0byBEQi5cIikpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhd2FpdCB0cnlDYXRjaChvbGRDYXJkcy5pbnNlcnQocmFuZG9tQ2FyZCkpO1xuICAgICAgYXdhaXQgdHJ5Q2F0Y2gobmV3Q2FyZHMucmVtb3ZlKHJhbmRvbUNhcmQpKTtcbiAgICAgIHJlc29sdmUocmFuZG9tQ2FyZCk7XG4gICAgICBtb25nby5jbG9zZSgpO1xuICAgIH0pO1xuICB9LFxuXG4gIHJldmVhbEFuc3dlcldvcmtmbG93KGNhcmRJZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBtb25nbyA9IGF3YWl0IHRyeUNhdGNoKE1vbmdvQ2xpZW50LmNvbm5lY3QodXJsKSk7XG4gICAgICBjb25zdCBvbGRDYXJkcyA9IG1vbmdvLmRiKERCKS5jb2xsZWN0aW9uKCdvbGRDYXJkcycpO1xuICAgICAgY29uc3QgYW5zd2VyQ2FyZCA9IGF3YWl0IHRyeUNhdGNoKG9sZENhcmRzLmZpbmRPbmUoeyBjYXJkSWQgfSkpO1xuICAgICAgcmVzb2x2ZShhbnN3ZXJDYXJkKTtcbiAgICAgIGF3YWl0IHRyeUNhdGNoKHJlbW92ZUxpdmVRdWVzdGlvbihtb25nbywgY2FyZElkKSk7XG4gICAgICBtb25nby5jbG9zZSgpO1xuICAgIH0pO1xuICB9LFxuXG4gIGFzeW5jIGFkZExpdmVRdWVzdGlvbihyZWNvcmQsIG1lZGlhVXJscykge1xuICAgIGNvbnN0IHsgY2FyZElkIH0gPSByZWNvcmQ7XG4gICAgY29uc3QgbW9uZ28gPSBhd2FpdCB0cnlDYXRjaChNb25nb0NsaWVudC5jb25uZWN0KHVybCkpO1xuICAgIGNvbnN0IGxpdmVRdWVzdGlvbnMgPSBtb25nby5kYihEQikuY29sbGVjdGlvbignbGl2ZVF1ZXN0aW9ucycpO1xuICAgIGNvbnN0IG9sZENhcmRzID0gbW9uZ28uZGIoREIpLmNvbGxlY3Rpb24oJ29sZENhcmRzJyk7XG4gICAgYXdhaXQgdHJ5Q2F0Y2gobGl2ZVF1ZXN0aW9ucy5pbnNlcnQoe1xuICAgICAgLi4ucmVjb3JkLFxuICAgICAgbWVkaWFVcmxzXG4gICAgfSkpO1xuICAgIGF3YWl0IHRyeUNhdGNoKFxuICAgICAgb2xkQ2FyZHMudXBkYXRlT25lKFxuICAgICAgICB7Y2FyZElkfSxcbiAgICAgICAge1xuICAgICAgICAgICRzZXQ6IHsgbWVkaWFVcmxzIH0sXG4gICAgICAgICAgJHVuc2V0OiB7IHF1ZXN0aW9uSW1nOiAnJywgcHJldkxpbmVJbWc6ICcnIH1cbiAgICAgICAgfVxuICAgICAgKVxuICAgIClcbiAgICBtb25nby5jbG9zZSgpO1xuICB9LFxuXG4gIGFzeW5jIGFkZE1lZGlhVXJsc1RvQ2FyZChjYXJkSWQsIFttZWRpYVVybF0pIHtcbiAgICBjb25zdCBtb25nbyA9IGF3YWl0IHRyeUNhdGNoKE1vbmdvQ2xpZW50LmNvbm5lY3QodXJsKSk7XG4gICAgY29uc3Qgb2xkQ2FyZHMgPSBtb25nby5kYihEQikuY29sbGVjdGlvbignb2xkQ2FyZHMnKTtcbiAgICBhd2FpdCB0cnlDYXRjaChcbiAgICAgIG9sZENhcmRzLnVwZGF0ZU9uZShcbiAgICAgICAge2NhcmRJZH0sXG4gICAgICAgIHtcbiAgICAgICAgICAkcHVzaDogeyBtZWRpYVVybHM6IG1lZGlhVXJsIH0sXG4gICAgICAgICAgJHVuc2V0OiB7IGFuc3dlckltZzogJycgfVxuICAgICAgICB9XG4gICAgICApXG4gICAgKVxuICAgIG1vbmdvLmNsb3NlKCk7XG4gIH0sXG5cbiAgYXN5bmMgdXBkYXRlTGl2ZVF1ZXN0aW9uKHF1ZXN0aW9uSWQsIHVzZXJQb2ludHMpIHtcbiAgICBjb25zdCBtb25nbyA9IGF3YWl0IHRyeUNhdGNoKE1vbmdvQ2xpZW50LmNvbm5lY3QodXJsKSk7XG4gICAgY29uc3QgbGl2ZVF1ZXN0aW9ucyA9IG1vbmdvLmRiKERCKS5jb2xsZWN0aW9uKCdsaXZlUXVlc3Rpb25zJyk7XG4gICAgY29uc3QgeyB1c2VySWQsIHBvaW50cyB9ID0gdXNlclBvaW50cztcbiAgICBjb25zdCB1cGRhdGUgPSB7XG4gICAgICAkcHVzaDoge1xuICAgICAgICBhbHJlYWR5QW5zd2VyZWQ6IHVzZXJJZCxcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKHBvaW50cyA+IDApXG4gICAgICB1cGRhdGUuJHB1c2guY2FjaGVkUG9pbnRzID0gdXNlclBvaW50cztcblxuICAgIGF3YWl0IHRyeUNhdGNoKFxuICAgICAgbGl2ZVF1ZXN0aW9ucy51cGRhdGUoe3F1ZXN0aW9uSWR9LCB1cGRhdGUpXG4gICAgKTtcbiAgICBtb25nby5jbG9zZSgpO1xuICB9LFxuXG4gIGdldExpdmVRdWVzdGlvbnMoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IG1vbmdvID0gYXdhaXQgdHJ5Q2F0Y2goTW9uZ29DbGllbnQuY29ubmVjdCh1cmwpKTtcbiAgICAgIGNvbnN0IGNvbGxlY3Rpb24gPSBtb25nby5kYihEQikuY29sbGVjdGlvbignbGl2ZVF1ZXN0aW9ucycpO1xuICAgICAgY29uc3QgbGl2ZVF1ZXN0aW9ucyA9IGF3YWl0IHRyeUNhdGNoKGNvbGxlY3Rpb24uZmluZCgpLnRvQXJyYXkoKSk7XG4gICAgICByZXNvbHZlKGxpdmVRdWVzdGlvbnMpO1xuICAgICAgbW9uZ28uY2xvc2UoKTtcbiAgICB9KTtcbiAgfSxcblxuICBhc3luYyBhZGRPclVwZGF0ZVVzZXIobmV3VXNlcikge1xuICAgIGNvbnN0IG1vbmdvID0gYXdhaXQgdHJ5Q2F0Y2goTW9uZ29DbGllbnQuY29ubmVjdCh1cmwpKTtcbiAgICBjb25zdCBzY29yZWJvYXJkID0gbW9uZ28uZGIoREIpLmNvbGxlY3Rpb24oJ3Njb3JlYm9hcmQnKTtcbiAgICBjb25zdCB7IHVzZXJJZCB9ID0gbmV3VXNlcjtcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgdHJ5Q2F0Y2goc2NvcmVib2FyZC5maW5kT25lKHt1c2VySWR9KSk7XG4gICAgaWYgKHVzZXIpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgaGFuZGxlLFxuICAgICAgICBhdmF0YXIsXG4gICAgICAgIHByb2ZpbGVCYW5uZXIsXG4gICAgICAgIGZvbGxvd2luZ1xuICAgICAgfSA9IG5ld1VzZXI7XG5cbiAgICAgIGF3YWl0IHRyeUNhdGNoKFxuICAgICAgICBzY29yZWJvYXJkLnVwZGF0ZU9uZSh7IHVzZXJJZCB9LCB7XG4gICAgICAgICAgICAkc2V0OiB7IG5hbWUgfSxcbiAgICAgICAgICAgICRzZXQ6IHsgaGFuZGxlIH0sXG4gICAgICAgICAgICAkc2V0OiB7IGF2YXRhciB9LFxuICAgICAgICAgICAgJHNldDogeyBwcm9maWxlQmFubmVyIH0sXG4gICAgICAgICAgICAkc2V0OiB7IGZvbGxvd2luZyB9XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBhd2FpdCB0cnlDYXRjaChzY29yZWJvYXJkLmluc2VydChuZXdVc2VyKSk7XG4gICAgfVxuICAgIG1vbmdvLmNsb3NlKCk7XG4gIH0sXG5cbiAgYWRqdXN0U2NvcmUocmVxLCByZXMpIHtcbiAgICAvLyBUT0RPIGFkanVzdCBhIHNjb3JlIG1hbnVhbGx5XG4gIH0sXG5cbiAgYXN5bmMgZ2V0U2NvcmVzKHJlcSwgcmVzKSB7XG4gICAgY29uc3QgbW9uZ28gPSBhd2FpdCB0cnlDYXRjaChNb25nb0NsaWVudC5jb25uZWN0KHVybCkpO1xuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSBtb25nby5kYihEQikuY29sbGVjdGlvbignc2NvcmVib2FyZCcpO1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0cnlDYXRjaChcbiAgICAgIGNvbGxlY3Rpb24uZmluZCgpXG4gICAgICAgICAgICAgICAgLnNvcnQoJ3dlZWtseVNjb3JlJywgLTEpXG4gICAgICAgICAgICAgICAgLnByb2plY3QoeydfaWQnOiAwfSlcbiAgICAgICAgICAgICAgICAudG9BcnJheSgpXG4gICAgKTtcbiAgICByZXMuanNvbihkYXRhKTtcbiAgICBtb25nby5jbG9zZSgpO1xuICB9LFxuXG4gIC8vIFRPRE8gLSBkZWxldGUgdGhpcyBtZXRob2QgaWYgbm90IG5lZWRlZFxuICBhc3luYyBnZXRTY29yZShyZXEsIHJlcykge1xuICAgIGNvbnN0IHsgaGFuZGxlIH0gPSByZXEucGFyYW1zO1xuICAgIGNvbnN0IG1vbmdvID0gYXdhaXQgdHJ5Q2F0Y2goTW9uZ29DbGllbnQuY29ubmVjdCh1cmwpKTtcbiAgICBjb25zdCBjb2xsZWN0aW9uID0gbW9uZ28uZGIoREIpLmNvbGxlY3Rpb24oJ3Njb3JlYm9hcmQnKTtcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgdHJ5Q2F0Y2goY29sbGVjdGlvbi5maW5kT25lKHtoYW5kbGV9KSk7XG4gICAgcmVzLmpzb24odXNlcik7XG4gICAgbW9uZ28uY2xvc2UoKTtcbiAgfSxcblxuICBhc3luYyBhZGREZWNrKHJlcSwgcmVzKSB7XG4gICAgY29uc3QgZmlsZVBhdGggPSByZXEuZmlsZS5wYXRoO1xuICAgIGNvbnN0IG5ld0NhcmRzID0gYXdhaXQgdHJ5Q2F0Y2gocHJvY2Vzc1VwbG9hZChmaWxlUGF0aCkpO1xuICAgIGNvbnN0IG1vbmdvID0gYXdhaXQgdHJ5Q2F0Y2goTW9uZ29DbGllbnQuY29ubmVjdCh1cmwpKTtcbiAgICBjb25zdCBjb2xsZWN0aW9uID0gbW9uZ28uZGIoREIpLmNvbGxlY3Rpb24oJ25ld0NhcmRzJyk7XG4gICAgY29uc3QgYmF0Y2ggPSBjb2xsZWN0aW9uLmluaXRpYWxpemVVbm9yZGVyZWRCdWxrT3AoKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3Q2FyZHMubGVuZ3RoOyArK2kpIHtcbiAgICAgIGJhdGNoLmluc2VydChuZXdDYXJkc1tpXSk7XG4gICAgfVxuXG4gICAgYXdhaXQgdHJ5Q2F0Y2goYmF0Y2guZXhlY3V0ZSgpKTtcbiAgICBtb25nby5jbG9zZSgpO1xuXG4gICAgcmVzLnJlZGlyZWN0KCcvJyk7XG4gIH0sXG5cbiAgZ2V0TmV3Q2FyZHMocmVxLCByZXMpIHtcbiAgICBnZXRDb2xsZWN0aW9uKHJlcSwgcmVzLCAnbmV3Q2FyZHMnKTtcbiAgfSxcblxuICBnZXRPbGRDYXJkcyhyZXEsIHJlcykge1xuICAgIGdldENvbGxlY3Rpb24ocmVxLCByZXMsICdvbGRDYXJkcycpO1xuICB9LFxuXG4gIGFzeW5jIHdlZWtseU1vbnRobHlSZXNldChyZXNldFdlZWtseVNjb3JlLCByZXNldE1vbnRobHlTY29yZSkge1xuICAgIGNvbnN0IG1vbmdvID0gYXdhaXQgdHJ5Q2F0Y2goTW9uZ29DbGllbnQuY29ubmVjdCh1cmwpKTtcbiAgICBjb25zdCBjb2xsZWN0aW9uID0gbW9uZ28uZGIoREIpLmNvbGxlY3Rpb24oJ3Njb3JlYm9hcmQnKTtcblxuICAgIGxldCByZXNldDtcbiAgICBpZiAocmVzZXRXZWVrbHlTY29yZSAmJiByZXNldE1vbnRobHlTY29yZSlcbiAgICAgIHJlc2V0ID0ge1xuICAgICAgICAkc2V0OiB7IHdlZWtseVNjb3JlOiAgMCB9LFxuICAgICAgICAkc2V0OiB7IG1vbnRobHlTY29yZTogMCB9XG4gICAgICB9O1xuICAgIGVsc2UgaWYgKHJlc2V0V2Vla2x5U2NvcmUpXG4gICAgICByZXNldCA9IHsgJHNldDogeyB3ZWVrbHlTY29yZTogMCB9IH07XG4gICAgZWxzZVxuICAgICAgcmVzZXQgPSB7ICRzZXQ6IHsgbW9udGhseVNjb3JlOiAwIH0gfTtcblxuICAgIGNvbGxlY3Rpb24udXBkYXRlKFxuICAgICAge30sIHJlc2V0LCB7IG11bHRpOiB0cnVlIH1cbiAgICApO1xuXG4gICAgbW9uZ28uY2xvc2UoKTtcbiAgfSxcblxuICBhc3luYyBnZXRDYXJkcyhyZXEsIHJlcykge1xuICAgIGNvbnN0IHsgaWRzIH0gPSByZXEucXVlcnk7XG4gICAgY29uc3QgbW9uZ28gPSBhd2FpdCB0cnlDYXRjaChNb25nb0NsaWVudC5jb25uZWN0KHVybCkpO1xuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSBtb25nby5kYihEQikuY29sbGVjdGlvbignb2xkQ2FyZHMnKTtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgdHJ5Q2F0Y2goXG4gICAgICBjb2xsZWN0aW9uLmZpbmQoe2NhcmRJZDogeyRpbjogaWRzfX0pXG4gICAgICAgICAgICAgICAgLnByb2plY3Qoe19pZDogMCwgbWVkaWFVcmxzOiAxfSlcbiAgICAgICAgICAgICAgICAudG9BcnJheSgpXG4gICAgKTtcbiAgICByZXMuanNvbihkYXRhKTtcbiAgICBtb25nby5jbG9zZSgpO1xuICB9XG5cbn0gLy8gbW9kdWxlLmV4cG9ydHNcblxuXG5hc3luYyBmdW5jdGlvbiBnZXRDb2xsZWN0aW9uKHJlcSwgcmVzLCBjb2xsZWN0aW9uTmFtZSkge1xuICBjb25zdCBtb25nbyA9IGF3YWl0IHRyeUNhdGNoKE1vbmdvQ2xpZW50LmNvbm5lY3QodXJsKSk7XG4gIGNvbnN0IGNvbGxlY3Rpb24gPSBtb25nby5kYihEQikuY29sbGVjdGlvbihjb2xsZWN0aW9uTmFtZSk7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCB0cnlDYXRjaChcbiAgICBjb2xsZWN0aW9uLmZpbmQoKVxuICAgICAgICAgICAgICAucHJvamVjdCh7X2lkOiAwfSlcbiAgICAgICAgICAgICAgLnRvQXJyYXkoKVxuICApO1xuICByZXMuanNvbihkYXRhKTtcbiAgbW9uZ28uY2xvc2UoKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlTGl2ZVF1ZXN0aW9uKG1vbmdvLCBjYXJkSWQpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBjb2xsZWN0aW9uID0gbW9uZ28uZGIoREIpLmNvbGxlY3Rpb24oJ2xpdmVRdWVzdGlvbnMnKTtcbiAgICBjb25zdCBjdXJyZW50UXVlc3Rpb24gPSBhd2FpdCB0cnlDYXRjaChjb2xsZWN0aW9uLmZpbmRPbmUoe2NhcmRJZH0pKTtcbiAgICBhd2FpdCB0cnlDYXRjaChjb2xsZWN0aW9uLnJlbW92ZShjdXJyZW50UXVlc3Rpb24pKTtcbiAgICBhd2FpdCB0cnlDYXRjaChhZGRQb2ludHNUb1Njb3JlYm9hcmQobW9uZ28sIGN1cnJlbnRRdWVzdGlvbikpO1xuICAgIHJlc29sdmUoKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZFBvaW50c1RvU2NvcmVib2FyZChtb25nbywgeyBjYWNoZWRQb2ludHMsIGNhcmRJZCB9KSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3Qgc2NvcmVib2FyZCA9IG1vbmdvLmRiKERCKS5jb2xsZWN0aW9uKCdzY29yZWJvYXJkJyk7XG4gICAgY29uc3Qgb2xkQ2FyZHMgPSBtb25nby5kYihEQikuY29sbGVjdGlvbignb2xkQ2FyZHMnKTtcbiAgICBjb25zdCBhbnN3ZXJQb3N0ZWRBdCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIG9sZENhcmRzLnVwZGF0ZU9uZSh7Y2FyZElkfSwgeyRzZXQ6IHthbnN3ZXJQb3N0ZWRBdH19KTtcbiAgICBjb25zdCBvcHMgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FjaGVkUG9pbnRzLmxlbmd0aDsgKytpKSB7XG4gICAgICBjb25zdCB7IHVzZXJJZCwgcG9pbnRzIH0gPSBjYWNoZWRQb2ludHNbaV07XG4gICAgICBvcHMucHVzaCh7XG4gICAgICAgIHVwZGF0ZU9uZSA6IHtcbiAgICAgICAgICBcImZpbHRlclwiIDogeyB1c2VySWQgfSxcbiAgICAgICAgICBcInVwZGF0ZVwiIDoge1xuICAgICAgICAgICAgJGluYzoge1xuICAgICAgICAgICAgICBzY29yZTogcG9pbnRzLFxuICAgICAgICAgICAgICB3ZWVrbHlTY29yZTogcG9pbnRzLFxuICAgICAgICAgICAgICBtb250aGx5U2NvcmU6IHBvaW50c1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICRwdXNoOiB7XG4gICAgICAgICAgICAgIGNvcnJlY3RBbnN3ZXJzOiB7XG4gICAgICAgICAgICAgICAgYW5zd2VyUG9zdGVkQXQsXG4gICAgICAgICAgICAgICAgY2FyZElkLFxuICAgICAgICAgICAgICAgIHBvaW50c1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKG9wcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJlc29sdmUoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhd2FpdCB0cnlDYXRjaChzY29yZWJvYXJkLmJ1bGtXcml0ZShvcHMpKTtcbiAgICByZXNvbHZlKCk7XG4gIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2RiT3BzLmpzIiwiY29uc3QgdHdpdCA9IHJlcXVpcmUoJ3R3aXQnKTtcbmNvbnN0IHtcbiAgVFdJVFRFUl9BUElfS0VZLFxuICBUV0lUVEVSX0FQSV9TRUNSRVQsXG4gIFRXSVRURVJfVE9LRU4sXG4gIFRXSVRURVJfVE9LRU5fU0VDUkVULFxuICBUV0lUVEVSX0FDQ09VTlRcbn0gPSBwcm9jZXNzLmVudjtcblxuLy8gY29uc3QgYXBwQ29uZmlnID0ge1xuLy8gICBjb25zdW1lcl9rZXk6IFRXSVRURVJfQVBJX0tFWSxcbi8vICAgY29uc3VtZXJfc2VjcmV0OiBUV0lUVEVSX0FQSV9TRUNSRVQsXG4vLyAgIGFwcF9vbmx5X2F1dGg6IHRydWVcbi8vIH1cblxuY29uc3QgdXNlckNvbmZpZyA9IHtcbiAgY29uc3VtZXJfa2V5OiBUV0lUVEVSX0FQSV9LRVksXG4gIGNvbnN1bWVyX3NlY3JldDogVFdJVFRFUl9BUElfU0VDUkVULFxuICBhY2Nlc3NfdG9rZW46IFRXSVRURVJfVE9LRU4sXG4gIGFjY2Vzc190b2tlbl9zZWNyZXQ6IFRXSVRURVJfVE9LRU5fU0VDUkVUXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyB0d2l0KHVzZXJDb25maWcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3R3aXR0ZXJDb25maWcuanMiLCJjb25zdCB1cmxlbmNvZGUgPSByZXF1aXJlKCd1cmxlbmNvZGUnKTtcbmNvbnN0IFdFQkxPT0tVUF9VUkwgPSAnaHR0cHM6Ly9lamplLndlYmxpby5qcC9jb250ZW50Lyc7XG5jb25zdCB7IFRXSVRURVJfQUNDT1VOVCB9ID0gcHJvY2Vzcy5lbnY7XG5cbmNvbnN0IEhPVVJTID0gMzYwMDAwMDtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgSE9VUlMsXG5cbiAgZm9ybWF0UXVlc3Rpb25BbHRUZXh0KGV4cHJlc3Npb24pIHtcbiAgICBjb25zdCBoaW50ID0gZm9ybWF0SGludChleHByZXNzaW9uKTtcbiAgICBjb25zdCBbbWluLCBtYXhdID0gbWluTWF4Q2hhcnMoaGludCk7XG4gICAgY29uc3QgbWluTWF4ID0gbWluID09PSBtYXggPyBtaW4gOiBgJHttaW59IHRvICR7bWF4fWA7XG4gICAgY29uc3QgcyA9IG1heCA+IDEgPyAncycgOiAnJztcbiAgICBjb25zdCBzY3JlZW5SZWFkZXJIaW50ID0gYCgke21pbk1heH0gY2hhcmFjdGVyJHtzfSlgO1xuICAgIHJldHVybiBleHByZXNzaW9uLnJlcGxhY2UoL1xce1xcey4rP1xcfVxcfS9nLCBzY3JlZW5SZWFkZXJIaW50KTtcbiAgfSxcblxuICBmb3JtYXRRdWVzdGlvblRleHQoZXhwcmVzc2lvbiwgZW5nTWVhbmluZywgbm90ZXMsIGNhcmRJRCkge1xuICAgIGNvbnN0IGhpbnQgPSBmb3JtYXRIaW50KGV4cHJlc3Npb24pO1xuICAgIGNvbnN0IFttaW4sIG1heF0gPSBtaW5NYXhDaGFycyhoaW50KTtcbiAgICBjb25zdCBtaW5NYXggPSBtaW4gPT09IG1heCA/IG1pbiA6IGAke21pbn0tJHttYXh9YDtcbiAgICBsZXQgdHdlZXRUZXh0ID0gYFdoYXQgJHttaW5NYXh9IGNoYXJhY3RlciBhbnN3ZXIgbWVhbnMgXCIke2VuZ01lYW5pbmd9XCI/YDtcbiAgICBpZiAobmVlZHNIaW50KGhpbnQpKVxuICAgICAgdHdlZXRUZXh0ICs9IGBcXG5IaW50OiAke2hpbnR9YDtcblxuICAgIGlmIChub3RlcykgdHdlZXRUZXh0ICs9IGBcXG5Ob3RlczogJHtub3Rlc31gO1xuXG4gICAgdHdlZXRUZXh0ICs9IGBcXG5RSUQke2NhcmRJRH1gO1xuICAgIHJldHVybiB0d2VldFRleHQ7XG4gIH0sXG5cbiAgZm9ybWF0QW5zd2VyQWx0VGV4dChleHByZXNzaW9uKSB7XG4gICAgcmV0dXJuIGV4cHJlc3Npb24ucmVwbGFjZSgvXFx7XFx7Lio/XFw6XFw6KC4rPylcXDpcXDouKj9cXH1cXH0vZywgJyQxJyk7XG4gIH0sXG5cbiAgZm9ybWF0QW5zd2VyVGV4dChhbnN3ZXJzLCBlbmdNZWFuaW5nLCB3ZWJMb29rdXAsIGNhcmRJZCkge1xuICAgIGNvbnN0IHMgPSBhbnN3ZXJzLmxlbmd0aCA+IDEgPyAncycgOiAnJztcbiAgICBsZXQgYW5zd2VyVGV4dCA9IGBBbnN3ZXIke3N9OiAke2Fuc3dlcnMuam9pbignLCAnKX1gO1xuICAgIGFuc3dlclRleHQgKz0gYFxcbkVuZ2xpc2ggTWVhbmluZzogXCIke2VuZ01lYW5pbmd9XCJgO1xuICAgIGFuc3dlclRleHQgKz0gJ1xcbkRlZmluaXRpb246ICcgKyBXRUJMT09LVVBfVVJMICsgdXJsZW5jb2RlKHdlYkxvb2t1cCk7XG4gICAgYW5zd2VyVGV4dCArPSBgXFxuUUlEJHtjYXJkSWR9YDtcbiAgICByZXR1cm4gYW5zd2VyVGV4dDtcbiAgfSxcblxuICBhZGRRdWVzdGlvbkxpbmsoYW5zd2VyVGV4dCwgcXVlc3Rpb25JZCkge1xuICAgIGNvbnN0IHF1ZXN0aW9uTGluayA9IGBRdWVzdGlvbjogdHdpdHRlci5jb20vJHtUV0lUVEVSX0FDQ09VTlR9L3N0YXR1cy8ke3F1ZXN0aW9uSWR9YDtcbiAgICBjb25zdCBsaW5lcyA9IGFuc3dlclRleHQuc3BsaXQoJ1xcbicpO1xuICAgIGxpbmVzLnNwbGljZSgtMSwgMCwgcXVlc3Rpb25MaW5rKTtcbiAgICByZXR1cm4gbGluZXMuam9pbignXFxuJyk7XG4gIH0sXG5cbiAgZ2V0QW5zd2VycyhleHByZXNzaW9uLCBhbHRBbnN3ZXJzKSB7XG4gICAgY29uc3QgYWNjZXB0ZWRBbnN3ZXIgPSBleHByZXNzaW9uLm1hdGNoKC9cXDpcXDooLis/KVxcOlxcOi8pWzFdO1xuICAgIGxldCBvdGhlckFuc3dlcnMgPSBbXTtcbiAgICBpZiAoYWx0QW5zd2VycyAmJiBhbHRBbnN3ZXJzLmxlbmd0aCA+IDApXG4gICAgICBvdGhlckFuc3dlcnMgPSBhbHRBbnN3ZXJzLnNwbGl0KCcsJyk7XG5cbiAgICByZXR1cm4gW2FjY2VwdGVkQW5zd2VyXS5jb25jYXQob3RoZXJBbnN3ZXJzKTtcbiAgfSxcblxuICBjYWxjdWxhdGVTY29yZShhbnN3ZXJQb3N0ZWRBdCwge3F1ZXN0aW9uUG9zdGVkQXQsIGFscmVhZHlBbnN3ZXJlZH0pIHtcbiAgICBjb25zdCB0aW1lVG9BbnN3ZXIgPSBNYXRoLmZsb29yKFxuICAgICAgKG5ldyBEYXRlKGFuc3dlclBvc3RlZEF0KSAtIG5ldyBEYXRlKHF1ZXN0aW9uUG9zdGVkQXQpKSAvIEhPVVJTXG4gICAgKTtcbiAgICBjb25zdCBzY29yZSA9IDI0IC0gdGltZVRvQW5zd2VyO1xuXG4gICAgcmV0dXJuIE1hdGgubWF4KHNjb3JlLCAwKTtcbiAgfSxcblxuICBleHRyYWN0QW5zd2VyKHRleHQpIHtcbiAgICByZXR1cm4gdGV4dC50cmltKCkuc2xpY2UoVFdJVFRFUl9BQ0NPVU5ULmxlbmd0aCArIDIpO1xuICB9LFxuXG4gIGdldFRpbWVVbnRpbChob3VyKSB7XG4gICAgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDQ1NTI4Mi9jYWxsLWEtamF2YXNjcmlwdC1mdW5jdGlvbi1hdC1hLXNwZWNpZmljLXRpbWUtb2YtZGF5XG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICBjb25zdCBtaWxsaXNVbnRpbFRpbWUgPSBuZXcgRGF0ZShcbiAgICAgIG5vdy5nZXRGdWxsWWVhcigpLFxuICAgICAgbm93LmdldE1vbnRoKCksXG4gICAgICBub3cuZ2V0RGF0ZSgpLFxuICAgICAgaG91ciwgMCwgMCwgMCkgLSBub3c7XG5cbiAgICBpZiAobWlsbGlzVW50aWxUaW1lIDwgMCkgLy8gYWxyZWFkeSBwYXNzZWQgZm9yIHRvZGF5LCB3YWl0IHVudGlsIHRvbW9ycm93XG4gICAgICBtaWxsaXNVbnRpbFRpbWUgKz0gMjQqSE9VUlM7XG5cbiAgICByZXR1cm4gbWlsbGlzVW50aWxUaW1lO1xuICB9LFxuXG4gIHRyeUNhdGNoKHByb21pc2UpIHtcbiAgIHJldHVybiBwcm9taXNlXG4gICAgIC50aGVuKGRhdGEgPT4gZGF0YSlcbiAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgY29uc29sZS5lcnJvcignRXJyb3I6JyxlcnIpO1xuICAgICAgIHJldHVybiB7fTtcbiAgICAgfSk7XG4gIH0sXG5cbiAgY29udGFpbnMoaXRlbSwgbGlzdCkge1xuICAgIHJldHVybiB2YWxpZChsaXN0LmluZGV4T2YoaXRlbSkpO1xuICB9XG5cbn0gLy8gbW9kdWxlLmV4cG9ydHNcblxuXG5mdW5jdGlvbiB2YWxpZChpbmRleCkge1xuICByZXR1cm4gaW5kZXggIT09IC0xO1xufVxuXG5mdW5jdGlvbiBuZWVkc0hpbnQoaGludCkge1xuICByZXR1cm4gaGludC5yZXBsYWNlKC9cXFtcXF0vZywgJycpLnRyaW0oKS5sZW5ndGggIT09IDA7XG59XG5cbmZ1bmN0aW9uIG1heENoYXJzKGhpbnQpIHtcbiAgY29uc3QgbWlzc2luZ0NoYXJSZWdleCA9IC9cXFsuKj9cXF0vZztcbiAgY29uc3QgbWlzc2luZ0NoYXJzID0gKGhpbnQubWF0Y2gobWlzc2luZ0NoYXJSZWdleCkgfHwgW10pLmxlbmd0aFxuICBjb25zdCBnaW1tZUNoYXJzID0gaGludC5yZXBsYWNlKG1pc3NpbmdDaGFyUmVnZXgsICcnKS5yZXBsYWNlKC9bXFxzK1xcKFxcKV0vZywgJycpLmxlbmd0aDtcblxuICByZXR1cm4gbWlzc2luZ0NoYXJzICsgZ2ltbWVDaGFycztcbn1cblxuZnVuY3Rpb24gbWluQ2hhcnMoaGludCkge1xuICBjb25zdCBvcHRpb25hbENoYXJzID0gKGhpbnQubWF0Y2goL1xcPy9nKSB8fCBbXSkubGVuZ3RoXG4gIHJldHVybiBtYXhDaGFycyhoaW50KSAtIG9wdGlvbmFsQ2hhcnM7XG59XG5cbmZ1bmN0aW9uIG1pbk1heENoYXJzKGhpbnQpIHtcbiAgcmV0dXJuIFttaW5DaGFycyhoaW50KSwgbWF4Q2hhcnMoaGludCldO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRIaW50KGV4cHJlc3Npb24pIHtcbiAgY29uc3QgbGVnZW5kID0gZXhwcmVzc2lvbi5tYXRjaCgvXFw6XFw6Lis/XFw6XFw6KC4rPylcXH1cXH0vKVsxXTtcbiAgY29uc3Qgbm9ybWFsaXplZCA9IGdyb3VwTXVsdGlYcyhncm91cFhzKGdyb3VwUXVlc3Rpb25NYXJrcyhsZWdlbmQpKSk7XG5cbiAgcmV0dXJuIGZsYXR0ZW4oc3BsaXQobm9ybWFsaXplZCkpLm1hcChncm91cCA9PiB7XG4gICAgaWYgKGdyb3VwID09PSAnLicpXG4gICAgICByZXR1cm4gJ1tdJztcblxuICAgIGlmIChncm91cCA9PT0gJy0nKVxuICAgICAgcmV0dXJuICdbXSBbXSBbXSBbXSBbXSdcblxuICAgIGlmICgvXFw/Ly50ZXN0KGdyb3VwKSkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgICBjb25zdCBudW1DaGFycyA9IE51bWJlcihncm91cC5tYXRjaCgvXFxkKy8pWzBdKVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1DaGFyczsgaSsrKVxuICAgICAgICByZXN1bHQucHVzaCgnWz9dJylcblxuICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPT09IDEpXG4gICAgICAgIHJldHVybiAnWz9dJztcblxuICAgICAgcmV0dXJuICcoJyArIHJlc3VsdC5qb2luKCcgJykgKyAnKSdcbiAgICB9XG5cbiAgICBpZiAoL+KJoC8udGVzdChncm91cCkpIHtcbiAgICAgIGNvbnN0IG5lZ2F0ZWRDaGFycyA9IGdyb3VwLnJlcGxhY2UoL+KJoC9nLCAnJyk7XG4gICAgICByZXR1cm4gYFviiaAke25lZ2F0ZWRDaGFyc31dYFxuICAgIH1cbiAgICAvLyBlbHNlIChjaGFyYWN0ZXIgZ2ltbWUpXG4gICAgcmV0dXJuIGdyb3VwO1xuICB9KS5qb2luKCcgJyk7XG59XG5cbmZ1bmN0aW9uIGdyb3VwUXVlc3Rpb25NYXJrcyhzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC8oXFw/KykvZywgKG1hdGNoLCBwMSkgPT4gYCgke3AxLmxlbmd0aH0/KWApO1xufVxuXG5mdW5jdGlvbiBncm91cFhzKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoL+KJoFteKF0vZywgJygkJiknKTtcbn1cblxuZnVuY3Rpb24gZ3JvdXBNdWx0aVhzKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoL+KJoFxcKCguKilcXCkvZywgJyjiiaAkMSknKVxufVxuXG5mdW5jdGlvbiBzcGxpdChzdHIpIHtcbiAgcmV0dXJuIHN0ci5zcGxpdCgvW1xcKFxcKV0vKVxuICAgICAgICAgICAgLm1hcChncm91cCA9PlxuICAgICAgICAgICAgICAvXFw/fOKJoC8udGVzdChncm91cClcbiAgICAgICAgICAgICAgPyBncm91cFxuICAgICAgICAgICAgICA6IGdyb3VwLnNwbGl0KCcnKVxuICAgICAgICAgICAgKTtcbn1cblxuZnVuY3Rpb24gc2NhbGFyKHYpIHtcbiAgcmV0dXJuICFBcnJheS5pc0FycmF5KHYpO1xufVxuXG5mdW5jdGlvbiBmbGF0dGVuKGRlZXAsIGZsYXQgPSBbXSkge1xuICBpZiAoZGVlcC5sZW5ndGggPT09IDApXG4gICAgcmV0dXJuIGZsYXQ7XG5cbiAgbGV0IFtoZWFkLCAuLi50YWlsXSA9IGRlZXA7XG4gIHJldHVybiBzY2FsYXIoaGVhZClcbiAgICA/IGZsYXR0ZW4odGFpbCwgZmxhdC5jb25jYXQoaGVhZCkpXG4gICAgOiBmbGF0dGVuKHRhaWwsIGZsYXQuY29uY2F0KGZsYXR0ZW4oaGVhZCkpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlscy91dGlscy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXBvbHlmaWxsXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYmFiZWwtcG9seWZpbGxcIlxuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT0gJ2RldicpXG4gIHJlcXVpcmUoJ2RvdGVudicpLmNvbmZpZygpO1xuXG5jb25zdCBleHByZXNzID0gcmVxdWlyZSgnZXhwcmVzcycpO1xuY29uc3QgYXBwID0gZXhwcmVzcygpO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IGJvZHlQYXJzZXIgPSByZXF1aXJlKCdib2R5LXBhcnNlcicpO1xuY29uc3QgdHdpdHRlckJvdCA9IHJlcXVpcmUoJy4vdHdpdHRlckJvdCcpO1xuXG5hcHAuc2V0KCdwb3J0JywgKHByb2Nlc3MuZW52LlBPUlQgfHwgMzAwMCkpO1xuYXBwLnVzZShleHByZXNzLnN0YXRpYyhwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vZGlzdCcpKSk7XG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcblxucmVxdWlyZSgnLi9hcGknKShhcHApO1xuXG4vL3R3aXR0ZXJCb3Quc3RhcnQoKTtcblxuYXBwLmxpc3RlbihhcHAuZ2V0KCdwb3J0JyksICgpID0+XG4gIGNvbnNvbGUubG9nKCdMaXN0ZW5pbmcgb24gcG9ydCcsIGFwcC5nZXQoJ3BvcnQnKSlcbik7XG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGFwcDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zZXJ2ZXIuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJkb3RlbnZcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJkb3RlbnZcIlxuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZXhwcmVzc1wiXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvZHktcGFyc2VyXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYm9keS1wYXJzZXJcIlxuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgREIgPSByZXF1aXJlKCcuL2RiT3BzJyk7XG5jb25zdCB7XG4gIEhPVVJTLFxuICBhZGRRdWVzdGlvbkxpbmssXG4gIGNhbGN1bGF0ZVNjb3JlLFxuICBjb250YWlucyxcbiAgZXh0cmFjdEFuc3dlcixcbiAgZ2V0Rm9sbG93aW5nLFxuICBnZXRUaW1lVW50aWwsXG4gIHBvc3RNZWRpYSxcbiAgdHJ5Q2F0Y2hcbn0gPSByZXF1aXJlKCdVdGlscycpO1xuY29uc3QgVHdpdHRlciA9IHJlcXVpcmUoJy4vdHdpdHRlckNvbmZpZycpO1xuY29uc3QgeyBUV0lUVEVSX0FDQ09VTlQgfSA9IHByb2Nlc3MuZW52O1xuXG5jb25zdCBBTlNXRVJfSU5URVJWQUwgPSAyMDAwO1xubGV0IFFVRVNUSU9OX0lOVEVSVkFMID0gNTAwMDtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHN0YXJ0OiAoKSA9PiB7XG4gICAgb3BlblN0cmVhbSgpO1xuICAgIHNldEludGVydmFsKHR3ZWV0UmFuZG9tUXVlc3Rpb24sIFFVRVNUSU9OX0lOVEVSVkFMKVxuICB9XG4gIC8vIHN0YXJ0OiAoKSA9PiB7XG4gIC8vICAgb3BlblN0cmVhbSgpO1xuICAvLyAgIHNldFN0YXJ0VGltZXMoKTtcbiAgLy8gfVxufTtcblxuZnVuY3Rpb24gc2V0U3RhcnRUaW1lcygpIHtcbiAgY29uc3QgdGltZVVudGlsN1BNID0gZ2V0VGltZVVudGlsKDE5KTtcbiAgY29uc3QgdGltZVVudGlsTWlkbmlnaHQgPSBnZXRUaW1lVW50aWwoMCk7XG5cbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgc2V0SW50ZXJ2YWwodHdlZXRSYW5kb21RdWVzdGlvbiwgUVVFU1RJT05fSU5URVJWQUwpO1xuICB9LCB0aW1lVW50aWw3UE0pO1xuXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIHNldEludGVydmFsKHdlZWtseU1vbnRobHlSZXNldCwgMjQqSE9VUlMpO1xuICB9LCB0aW1lVW50aWxNaWRuaWdodCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHR3ZWV0UmFuZG9tUXVlc3Rpb24oKSB7XG4gIGNvbnN0IHtcbiAgICBjYXJkSWQsXG4gICAgcXVlc3Rpb25UZXh0LFxuICAgIHF1ZXN0aW9uSW1nLFxuICAgIHF1ZXN0aW9uQWx0VGV4dCxcbiAgICBwcmV2TGluZUltZyxcbiAgICBwcmV2TGluZUFsdFRleHQsXG4gICAgYW5zd2Vyc1xuICB9ID0gYXdhaXQgdHJ5Q2F0Y2goREIuZ2V0UmFuZG9tUXVlc3Rpb24oKSk7XG4gIGlmICghY2FyZElkKSByZXR1cm47XG5cbiAgY29uc3Qge1xuICAgIHF1ZXN0aW9uSWQsXG4gICAgcXVlc3Rpb25Qb3N0ZWRBdCxcbiAgICBtZWRpYVVybHNcbiAgfSA9IGF3YWl0IHRyeUNhdGNoKFxuICAgIHBvc3RNZWRpYShcbiAgICAgIHF1ZXN0aW9uVGV4dCxcbiAgICAgIHF1ZXN0aW9uSW1nLFxuICAgICAgcXVlc3Rpb25BbHRUZXh0LFxuICAgICAgcHJldkxpbmVJbWcsXG4gICAgICBwcmV2TGluZUFsdFRleHRcbiAgICApXG4gICk7XG5cbiAgY29uc3QgbGl2ZVF1ZXN0aW9uID0ge1xuICAgIGNhcmRJZCxcbiAgICBxdWVzdGlvbklkLFxuICAgIGFuc3dlcnMsXG4gICAgcXVlc3Rpb25Qb3N0ZWRBdCxcbiAgICBjYWNoZWRQb2ludHM6IFtdLFxuICAgIGFscmVhZHlBbnN3ZXJlZDogW11cbiAgfTtcbiAgREIuYWRkTGl2ZVF1ZXN0aW9uKGxpdmVRdWVzdGlvbiwgbWVkaWFVcmxzKTtcbiAgc2V0VGltZW91dCgoKSA9PiB0d2VldEFuc3dlcihjYXJkSWQsIHF1ZXN0aW9uSWQpLCBBTlNXRVJfSU5URVJWQUwpO1xufVxuXG5hc3luYyBmdW5jdGlvbiB0d2VldEFuc3dlcihjYXJkSWQsIHF1ZXN0aW9uSWQpIHtcbiAgY29uc3Qge1xuICAgIGFuc3dlclRleHQsXG4gICAgYW5zd2VySW1nLFxuICAgIGFuc3dlckFsdFRleHRcbiAgfSA9IGF3YWl0IHRyeUNhdGNoKFxuICAgIC8vIEVGRkVDVFM6XG4gICAgLy8gLSByZW1vdmVzIHF1ZXN0aW9uIGZyb20gbGl2ZVF1ZXN0aW9uc1xuICAgIC8vIC0gYWRkcyBjYWNoZWQgcG9pbnRzIHRvIHNjb3JlYm9hcmRcbiAgICAvL1xuICAgIC8vIFJFVFVSTlM6XG4gICAgLy8gQW5zd2VyQ2FyZFxuICAgIERCLnJldmVhbEFuc3dlcldvcmtmbG93KGNhcmRJZClcbiAgKTtcblxuICBjb25zdCB7IG1lZGlhVXJscyB9ID0gYXdhaXQgdHJ5Q2F0Y2goXG4gICAgcG9zdE1lZGlhKFxuICAgICAgYWRkUXVlc3Rpb25MaW5rKGFuc3dlclRleHQsIHF1ZXN0aW9uSWQpLFxuICAgICAgYW5zd2VySW1nLFxuICAgICAgYW5zd2VyQWx0VGV4dFxuICAgIClcbiAgKTtcblxuICBEQi5hZGRNZWRpYVVybHNUb0NhcmQoY2FyZElkLCBtZWRpYVVybHMpO1xufVxuXG5mdW5jdGlvbiBvcGVuU3RyZWFtKCkge1xuICBjb25zdCBzdHJlYW0gPSBUd2l0dGVyLnN0cmVhbSgnc3RhdHVzZXMvZmlsdGVyJywgeyB0cmFjazogYEAke1RXSVRURVJfQUNDT1VOVH1gIH0pO1xuXG4gIHN0cmVhbS5vbigndHdlZXQnLCBhc3luYyAoe1xuICAgIGluX3JlcGx5X3RvX3N0YXR1c19pZF9zdHI6IHF1ZXN0aW9uSWQsXG4gICAgY3JlYXRlZF9hdDogYW5zd2VyUG9zdGVkQXQsXG4gICAgdGV4dCxcbiAgICB1c2VyOiB7XG4gICAgICBpZDogdXNlcklkLFxuICAgICAgbmFtZSxcbiAgICAgIHNjcmVlbl9uYW1lOiBoYW5kbGUsXG4gICAgICBwcm9maWxlX2ltYWdlX3VybF9odHRwczogYXZhdGFyLFxuICAgICAgcHJvZmlsZV9iYW5uZXJfdXJsOiBwcm9maWxlQmFubmVyXG4gICAgfVxuICB9KSA9PiB7XG4gICAgY29uc3QgbGl2ZVF1ZXN0aW9ucyA9IGF3YWl0IHRyeUNhdGNoKERCLmdldExpdmVRdWVzdGlvbnMoKSk7XG4gICAgY29uc3QgZm91bmRRdWVzdGlvbiA9IGxpdmVRdWVzdGlvbnMuZmlsdGVyKFxuICAgICAgb2JqID0+IG9iai5xdWVzdGlvbklkID09PSBxdWVzdGlvbklkXG4gICAgKVswXTtcblxuICAgIGlmIChmb3VuZFF1ZXN0aW9uKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGFscmVhZHlBbnN3ZXJlZCxcbiAgICAgICAgYW5zd2VyczogYWNjZXB0ZWRBbnN3ZXJzXG4gICAgICB9ID0gZm91bmRRdWVzdGlvbjtcbiAgICAgIGlmIChjb250YWlucyh1c2VySWQsIGFscmVhZHlBbnN3ZXJlZCkpXG4gICAgICAgIHJldHVybjtcblxuICAgICAgY29uc3QgdXNlckFuc3dlciA9IGV4dHJhY3RBbnN3ZXIodGV4dCk7XG4gICAgICBpZiAoY29udGFpbnModXNlckFuc3dlciwgYWNjZXB0ZWRBbnN3ZXJzKSkge1xuICAgICAgICBjb25zdCBwb2ludHMgPSBjYWxjdWxhdGVTY29yZShhbnN3ZXJQb3N0ZWRBdCwgZm91bmRRdWVzdGlvbik7XG4gICAgICAgIGNvbnN0IGZvbGxvd2luZyA9IGF3YWl0IHRyeUNhdGNoKGdldEZvbGxvd2luZyh1c2VySWQpKTtcbiAgICAgICAgY29uc3QgbmV3VXNlciA9IHtcbiAgICAgICAgICB1c2VySWQsXG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICBoYW5kbGUsXG4gICAgICAgICAgYXZhdGFyLFxuICAgICAgICAgIHByb2ZpbGVCYW5uZXIsXG4gICAgICAgICAgZm9sbG93aW5nLFxuICAgICAgICAgIHNjb3JlOiAwLFxuICAgICAgICAgIG1vbnRobHlTY29yZTogMCxcbiAgICAgICAgICB3ZWVrbHlTY29yZTogMCxcbiAgICAgICAgICBjb3JyZWN0QW5zd2VyczogW11cbiAgICAgICAgfTtcbiAgICAgICAgREIuYWRkT3JVcGRhdGVVc2VyKG5ld1VzZXIpO1xuICAgICAgICBEQi51cGRhdGVMaXZlUXVlc3Rpb24ocXVlc3Rpb25JZCwgeyB1c2VySWQsIHBvaW50cyB9KTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgREIudXBkYXRlTGl2ZVF1ZXN0aW9uKHF1ZXN0aW9uSWQsIHsgdXNlcklkLCBwb2ludHM6IDAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBzdHJlYW0ub24oJ2Rpc2Nvbm5lY3QnLCAoZGlzY29ubmVjdE1zZykgPT4ge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1R3ZWV0IHN0cmVhbSBkaXNjb25uZWN0ZWQ6JywgZGlzY29ubmVjdE1zZyk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBzdHJlYW0uc3RhcnQoKSwgMTAwKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHdlZWtseU1vbnRobHlSZXNldCgpIHtcbiAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgY29uc3QgcmVzZXRXZWVrbHlTY29yZSA9IG5vdy5nZXREYXkoKSA9PT0gMDtcbiAgY29uc3QgcmVzZXRNb250aGx5U2NvcmUgPSBub3cuZ2V0RGF0ZSgpID09PSAxO1xuXG4gIGlmIChyZXNldFdlZWtseVNjb3JlIHx8IHJlc2V0TW9udGhseVNjb3JlKVxuICAgIERCLndlZWtseU1vbnRobHlSZXNldChyZXNldFdlZWtseVNjb3JlLCByZXNldE1vbnRobHlTY29yZSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdHdpdHRlckJvdC5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vbmdvZGJcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJtb25nb2RiXCJcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcbmNvbnN0IFBORyA9IHJlcXVpcmUoJ3BuZ2pzMicpLlBORztcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCB1bnppcCA9IHJlcXVpcmUoJ3VuemlwLXN0cmVhbScpO1xuY29uc3QgVVBMT0FEU19QQVRIID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uL3VwbG9hZHMnKTtcbmNvbnN0IHtcbiAgZm9ybWF0UXVlc3Rpb25BbHRUZXh0LFxuICBmb3JtYXRRdWVzdGlvblRleHQsXG4gIGZvcm1hdEFuc3dlckFsdFRleHQsXG4gIGZvcm1hdEFuc3dlclRleHQsXG4gIGdldEFuc3dlcnMsXG4gIHRyeUNhdGNoXG59ID0gcmVxdWlyZSgnVXRpbHMnKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcHJvY2Vzc1VwbG9hZCxcbiAgcGFyc2VBbmtpSnNvbixcbiAgb3B0aW1pemVJbWFnZXNcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc1VwbG9hZCh6aXBmaWxlUGF0aCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IHN0cmVhbSA9IGZzLmNyZWF0ZVJlYWRTdHJlYW0oemlwZmlsZVBhdGgpXG4gICAgICAucGlwZSh1bnppcC5FeHRyYWN0KHsgcGF0aDogJ3VwbG9hZHMnIH0pKTtcblxuICAgIHN0cmVhbS5vbignY2xvc2UnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBmaWxlcyA9IGZzLnJlYWRkaXJTeW5jKFVQTE9BRFNfUEFUSCk7XG4gICAgICBhd2FpdCB0cnlDYXRjaChvcHRpbWl6ZUltYWdlcyhVUExPQURTX1BBVEggKyAnL21lZGlhJykpO1xuICAgICAgY29uc29sZS5sb2coJ0ZpbmlzaGVkIG9wdGltaXppbmcgaW1hZ2VzIScpO1xuICAgICAgY29uc3QgbmV3Q2FyZHMgPSBleHRyYWN0Q2FyZEluZm8oZmlsZXMpO1xuXG4gICAgICBjbGVhblVwKGZpbGVzKTtcbiAgICAgIHJlc29sdmUobmV3Q2FyZHMpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gb3B0aW1pemVJbWFnZXMoZGlyUGF0aCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IGZpbGVzUHJvY2Vzc2luZyA9IFtdO1xuICAgIGZzLnJlYWRkaXJTeW5jKGRpclBhdGgpLmZvckVhY2goZmlsZSA9PiB7XG4gICAgICBpZiAoLy4qXFwucG5nJC8udGVzdChmaWxlKSkge1xuICAgICAgICBjb25zdCBjdXJyZW50RmlsZSA9IGRpclBhdGggKyBcIi9cIiArIGZpbGU7XG4gICAgICAgIGNvbnN0IGNvbnRlbnRzID0gZnMucmVhZEZpbGVTeW5jKGN1cnJlbnRGaWxlKTtcbiAgICAgICAgY29uc3Qgd3JpdGVTdHJlYW0gPSBmcy5jcmVhdGVXcml0ZVN0cmVhbShjdXJyZW50RmlsZSk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRJbWFnZSA9IG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT5cbiAgICAgICAgICB3cml0ZVN0cmVhbS5vbignY2xvc2UnLCByZXMpXG4gICAgICAgICk7XG4gICAgICAgIGZpbGVzUHJvY2Vzc2luZy5wdXNoKGN1cnJlbnRJbWFnZSk7XG4gICAgICAgIG5ldyBQTkcoeyBmaWx0ZXJUeXBlOiA0LCBkZWZsYXRlTGV2ZWw6IDEgfSlcbiAgICAgICAgICAucGFyc2UoY29udGVudHMsIChlcnIsIHBuZykgPT4ge1xuICAgICAgICAgICAgLy8gR2l2ZSB1cHBlciBsZWZ0IHBpeGVsIGFuIG9wYWNpdHlcbiAgICAgICAgICAgIC8vIG9mIDI1NCBzbyBUd2l0dGVyIHdvbid0IGNvbnZlcnRcbiAgICAgICAgICAgIC8vIHRvIGpwZWdcbiAgICAgICAgICAgIHBuZy5kYXRhWzNdIC09IDE7XG4gICAgICAgICAgICBwbmcucGFjaygpLnBpcGUod3JpdGVTdHJlYW0pO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIFByb21pc2UuYWxsKGZpbGVzUHJvY2Vzc2luZykudGhlbihyZXNvbHZlKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGV4dHJhY3RDYXJkSW5mbyhmaWxlcykge1xuICBsZXQgYWxsTmV3Q2FyZHMgPSBbXTtcbiAgZm9yIChsZXQgZmlsZSBvZiBmaWxlcykge1xuICAgIGNvbnN0IGN1cnJlbnRGaWxlID0gYCR7VVBMT0FEU19QQVRIfS8ke2ZpbGV9YDtcbiAgICBjb25zdCBzdGF0cyA9IGZzLnN0YXRTeW5jKGN1cnJlbnRGaWxlKTtcblxuICAgIGlmIChzdGF0cy5pc0ZpbGUoKSAmJiBmaWxlLm1hdGNoKC8uK1xcLmpzb24kLykpIHtcbiAgICAgIGNvbnN0IG5ld0NhcmRzID0gcGFyc2VBbmtpSnNvbihjdXJyZW50RmlsZSk7XG4gICAgICBhbGxOZXdDYXJkcyA9IGFsbE5ld0NhcmRzLmNvbmNhdChuZXdDYXJkcyk7XG4gICAgfVxuICB9XG4gIHJldHVybiBhbGxOZXdDYXJkcztcbn1cblxuZnVuY3Rpb24gcGFyc2VBbmtpSnNvbihmaWxlUGF0aCkge1xuICBjb25zdCBjb250ZW50cyA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKGZpbGVQYXRoLCAndXRmOCcpKTtcbiAgcmV0dXJuIGNvbnRlbnRzLm5vdGVzLm1hcChjYXJkID0+IHtcbiAgICBsZXQgW1xuICAgICAgZXhwcmVzc2lvbixcbiAgICAgICwgLy8gcmVhZGluZyxcbiAgICAgICwvLyBqYXBNZWFuaW5nLFxuICAgICAgZW5nTWVhbmluZyxcbiAgICAgICwgLy8gb2ZmaWNpYWxFbmcsXG4gICAgICBxdWVzdGlvbkltZyxcbiAgICAgIGFuc3dlckltZyxcbiAgICAgICwgLy8gYXVkaW9cbiAgICAgIHByZXZMaW5lSW1nLFxuICAgICAgcHJldkxpbmVBbHRUZXh0LFxuICAgICAgYWx0QW5zd2VycyxcbiAgICAgIHdlYkxvb2t1cCwgLy8gdXNlIGZvciBldmVyeSBhbnN3ZXIgc28gcGVvcGxlIGNhbiBsb29rIHVwIHByb251bmNpYXRpb25cbiAgICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9lamplLndlYmxpby5qcC9jb250ZW50L1t3ZWJMb29rdXAgKGUuZy4g5YiH44KK5o+b44GI44KLKV1cbiAgICAgIG5vdGVzLFxuICAgICAgY2FyZElkXG4gICAgXSA9IGNhcmQuZmllbGRzO1xuXG4gICAgW2V4cHJlc3Npb24sIGVuZ01lYW5pbmcsIG5vdGVzXSA9IFtleHByZXNzaW9uLCBlbmdNZWFuaW5nLCBub3Rlc10ubWFwKHN0cmlwSHRtbCk7XG4gICAgY29uc3QgYW5zd2VycyA9IGdldEFuc3dlcnMoZXhwcmVzc2lvbiwgYWx0QW5zd2Vycyk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgY2FyZElkLFxuICAgICAgcXVlc3Rpb25UZXh0OiAgICBmb3JtYXRRdWVzdGlvblRleHQoZXhwcmVzc2lvbiwgZW5nTWVhbmluZywgbm90ZXMsIGNhcmRJZCksXG4gICAgICBxdWVzdGlvbkltZzogICAgIGdldEJhc2U2NChxdWVzdGlvbkltZyksXG4gICAgICBxdWVzdGlvbkFsdFRleHQ6IGZvcm1hdFF1ZXN0aW9uQWx0VGV4dChleHByZXNzaW9uKSxcbiAgICAgIHByZXZMaW5lSW1nOiAgICAgZ2V0QmFzZTY0KHByZXZMaW5lSW1nKSxcbiAgICAgIHByZXZMaW5lQWx0VGV4dCxcbiAgICAgIGFuc3dlclRleHQ6ICAgICAgZm9ybWF0QW5zd2VyVGV4dChhbnN3ZXJzLCBlbmdNZWFuaW5nLCB3ZWJMb29rdXAsIGNhcmRJZCksXG4gICAgICBhbnN3ZXJJbWc6ICAgICAgIGdldEJhc2U2NChhbnN3ZXJJbWcpLFxuICAgICAgYW5zd2VyQWx0VGV4dDogICBmb3JtYXRBbnN3ZXJBbHRUZXh0KGV4cHJlc3Npb24pLFxuICAgICAgYW5zd2VycyxcbiAgICAgIG1lZGlhVXJsczogW11cbiAgICB9O1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc3RyaXBIdG1sKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoLzwuKj8+fCYuKjsvZywgJycpO1xufVxuXG5mdW5jdGlvbiBnZXRTcmMoc3RyaW5nKSB7XG4gIHJldHVybiAoc3RyaW5nLm1hdGNoKC9zcmM9XCIoLispXCIvKSB8fCBbLF0pWzFdO1xufVxuXG5mdW5jdGlvbiBnZXRCYXNlNjQoc3RyaW5nKSB7XG4gIGlmICghc3RyaW5nIHx8IHN0cmluZy5sZW5ndGggPT09IDApIHJldHVybjtcblxuICBsZXQgYmFzZTY0O1xuICB0cnkge1xuICAgIGJhc2U2NCA9IGZzLnJlYWRGaWxlU3luYyhcbiAgICAgIGAke1VQTE9BRFNfUEFUSH0vbWVkaWEvJHtnZXRTcmMoc3RyaW5nKX1gLFxuICAgICAgeyBlbmNvZGluZzogJ2Jhc2U2NCcgfVxuICAgICk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyByZXR1cm5pbmcgdW5kZWZpbmVkLi4uXG4gIH1cbiAgcmV0dXJuIGJhc2U2NDtcbn1cblxuZnVuY3Rpb24gY2xlYW5VcChmaWxlcykge1xuICBmb3IgKGxldCBmaWxlIG9mIGZpbGVzKSB7XG4gICAgY29uc3Qgcm9vdCA9IGAke1VQTE9BRFNfUEFUSH0vJHtmaWxlfWA7XG5cbiAgICBpZiAoZnMubHN0YXRTeW5jKHJvb3QpLmlzRmlsZSgpKVxuICAgICAgZnMudW5saW5rU3luYyhyb290KTtcbiAgICBlbHNlIGlmIChmcy5sc3RhdFN5bmMocm9vdCkuaXNEaXJlY3RvcnkoKSlcbiAgICAgIGRlbGV0ZUZvbGRlclJlY3Vyc2l2ZShyb290KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkZWxldGVGb2xkZXJSZWN1cnNpdmUocm9vdFBhdGgpIHtcbiAgaWYgKGZzLmV4aXN0c1N5bmMocm9vdFBhdGgpKSB7XG4gICAgZnMucmVhZGRpclN5bmMocm9vdFBhdGgpLmZvckVhY2goZmlsZSA9PiB7XG4gICAgICBjb25zdCBjdXJQYXRoID0gcm9vdFBhdGggKyBcIi9cIiArIGZpbGU7XG4gICAgICBpZiAoZnMubHN0YXRTeW5jKGN1clBhdGgpLmlzRGlyZWN0b3J5KCkpIHsgLy8gcmVjdXJzZVxuICAgICAgICBkZWxldGVGb2xkZXJSZWN1cnNpdmUoY3VyUGF0aCk7XG4gICAgICB9IGVsc2UgeyAvLyBkZWxldGUgZmlsZVxuICAgICAgICBmcy51bmxpbmtTeW5jKGN1clBhdGgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGZzLnJtZGlyU3luYyhyb290UGF0aCk7XG4gIH1cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcHJvY2Vzc0Fua2lKc29uLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJmc1wiXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwbmdqczJcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJwbmdqczJcIlxuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidW56aXAtc3RyZWFtXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwidW56aXAtc3RyZWFtXCJcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IFR3aXR0ZXIgPSByZXF1aXJlKCcuLi90d2l0dGVyQ29uZmlnJyk7XG5jb25zdCB7IHRyeUNhdGNoIH0gPSByZXF1aXJlKCdVdGlscy91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICAvL1xuICAvLyBwb3N0IGEgdHdlZXQgd2l0aCBtZWRpYVxuICAvL1xuICBwb3N0TWVkaWEoc3RhdHVzLCBiNjRJbWFnZTEsIGFsdFRleHQxLCBiNjRJbWFnZTIsIGFsdFRleHQyKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IG1lZGlhSWQxID0gYXdhaXQgdHJ5Q2F0Y2godXBsb2FkTWVkaWEoYjY0SW1hZ2UxLCBhbHRUZXh0MSkpO1xuICAgICAgY29uc3QgbWVkaWFfaWRzID0gW21lZGlhSWQxXTtcbiAgICAgIGlmIChiNjRJbWFnZTIpIHtcbiAgICAgICAgY29uc3QgbWVkaWFJZDIgPSBhd2FpdCB0cnlDYXRjaCh1cGxvYWRNZWRpYShiNjRJbWFnZTIsIGFsdFRleHQyKSk7XG4gICAgICAgIG1lZGlhX2lkcy51bnNoaWZ0KG1lZGlhSWQyKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGFyYW1zID0geyBzdGF0dXMsIG1lZGlhX2lkcywgdHdlZXRfbW9kZTogJ2V4dGVuZGVkJywgaW5jbHVkZV9leHRfYWx0X3RleHQ6IHRydWUgfTtcbiAgICAgIFR3aXR0ZXIucG9zdCgnc3RhdHVzZXMvdXBkYXRlJywgcGFyYW1zLCAoZXJyLCBkYXRhLCByZXNwb25zZSkgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpXG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIlBvc3Rpbmcgc3RhdHVzIGZhaWxlZC5cIikpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zb2xlLmxvZygnRXh0IGVudGl0aWVzOicsIGRhdGEuZXh0ZW5kZWRfZW50aXRpZXMubWVkaWEpO1xuICAgICAgICBjb25zdCBtZWRpYVVybHMgPSBkYXRhLmV4dGVuZGVkX2VudGl0aWVzLm1lZGlhLm1hcChcbiAgICAgICAgICBvYmogPT4gKHtcbiAgICAgICAgICAgIGltYWdlOiBvYmoubWVkaWFfdXJsX2h0dHBzLFxuICAgICAgICAgICAgYWx0VGV4dDogb2JqLmV4dF9hbHRfdGV4dFxuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAgICAgICBxdWVzdGlvbklkOiAgICAgICBkYXRhLmlkX3N0cixcbiAgICAgICAgICBxdWVzdGlvblBvc3RlZEF0OiBkYXRhLmNyZWF0ZWRfYXQsXG4gICAgICAgICAgbWVkaWFVcmxzXG4gICAgICAgIH07XG4gICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuXG4gIGdldEZvbGxvd2luZyh1c2VySWQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgVHdpdHRlci5nZXQoJ2ZyaWVuZHMvaWRzJywgeyB1c2VySWQgfSwgKGVyciwgZGF0YSwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgaWYgKGVycikgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICByZXNvbHZlKGRhdGEuaWRzKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbn0gLy8gbW9kdWxlLmV4cG9ydHNcblxuXG4vLyBFRkZFQ1RTOlxuLy8gdXBsb2FkcyBhIHNpbmdsZSBpbWFnZSB3aXRoIGFsdFRleHQgdG8gVHdpdHRlclxuLy9cbi8vIFJFVFVSTlM6XG4vLyBtZWRpYV9pZCB3aGljaCBpcyBuZWNlc3NhcnkgZm9yXG4vLyBhdHRhY2hpbmcgbWVkaWEgdG8gYSB0d2VldFxuLy9cbmZ1bmN0aW9uIHVwbG9hZE1lZGlhKGI2NEltYWdlLCBhbHRUZXh0KSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgLy8gZmlyc3Qgd2UgbXVzdCBwb3N0IHRoZSBtZWRpYSB0byBUd2l0dGVyXG4gICAgVHdpdHRlci5wb3N0KCdtZWRpYS91cGxvYWQnLCB7IG1lZGlhX2RhdGE6IGI2NEltYWdlIH0sIChlcnIsIGRhdGEsIHJlc3BvbnNlKSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIk1lZGlhIHVwbG9hZCBmYWlsZWQuXCIpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gbm93IHdlIGNhbiBhc3NpZ24gYWx0IHRleHQgdG8gdGhlIG1lZGlhLCBmb3IgdXNlIGJ5IHNjcmVlbiByZWFkZXJzIGFuZFxuICAgICAgLy8gb3RoZXIgdGV4dC1iYXNlZCBwcmVzZW50YXRpb25zIGFuZCBpbnRlcnByZXRlcnNcbiAgICAgIGNvbnN0IG1lZGlhSWRTdHIgPSBkYXRhLm1lZGlhX2lkX3N0cmluZztcbiAgICAgIGNvbnN0IG1ldGFfcGFyYW1zID0geyBtZWRpYV9pZDogbWVkaWFJZFN0ciwgYWx0X3RleHQ6IHsgdGV4dDogYWx0VGV4dCB9IH1cblxuICAgICAgVHdpdHRlci5wb3N0KCdtZWRpYS9tZXRhZGF0YS9jcmVhdGUnLCBtZXRhX3BhcmFtcywgKGVyciwgZGF0YSwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiTWVkaWEgdXBsb2FkIHN1Y2NlZWRlZCwgbWVkaWEgY3JlYXRpb24gZmFpbGVkLlwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gbm93IHdlIGNhbiByZWZlcmVuY2UgdGhlIG1lZGlhIGFuZCBwb3N0IGEgdHdlZXQgKG1lZGlhIHdpbGwgYXR0YWNoIHRvIHRoZSB0d2VldClcbiAgICAgICAgcmVzb2x2ZShtZWRpYUlkU3RyKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlscy90d2l0dGVyVXRpbHMuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0d2l0XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwidHdpdFwiXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1cmxlbmNvZGVcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ1cmxlbmNvZGVcIlxuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgREIgPSByZXF1aXJlKCcuL2RiT3BzJyk7XG5jb25zdCB1cGxvYWQgPSByZXF1aXJlKCdtdWx0ZXInKSh7IGRlc3Q6ICd1cGxvYWRzLycgfSk7XG5cbm1vZHVsZS5leHBvcnRzID0gKGFwcCkgPT4ge1xuXG4gIC8vIENPUlNcbiAgYXBwLnVzZSgocmVxLCByZXMsIG5leHQpID0+IHtcbiAgICByZXMuaGVhZGVyKCdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nLCAnKicpO1xuICAgIHJlcy5oZWFkZXIoJ0FjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHMnLCAnR0VULCBPUFRJT05TJyk7XG4gICAgcmVzLmhlYWRlcignQWNjZXNzLUNvbnRyb2wtTWF4LUFnZScsICc4NjQwMCcpOyAvLyAyNCBob3Vyc1xuICAgIHJlcy5oZWFkZXIoJ0FjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnMnLFxuICAgICAgICAgICAgICAgJ09yaWdpbiwgWC1SZXF1ZXN0ZWQtV2l0aCwgQ29udGVudC1UeXBlLCBBY2NlcHQnKTtcbiAgICBuZXh0KCk7XG4gIH0pO1xuXG4gIGFwcC5nZXQoJy9hcGkvbGl2ZScsIChyZXEsIHJlcykgPT4ge1xuICAgIHJlcy5qc29uKERCLmdldExpdmVRdWVzdGlvbnMoKSk7XG4gIH0pO1xuXG4gIGFwcC5nZXQoJy9hcGkvc2NvcmVzJywgKHJlcSwgcmVzKSA9PiB7XG4gICAgREIuZ2V0U2NvcmVzKHJlcSwgcmVzKTtcbiAgfSk7XG5cbiAgYXBwLmdldCgnL2FwaS9jYXJkcycsIChyZXEsIHJlcykgPT4ge1xuICAgIERCLmdldENhcmRzKHJlcSwgcmVzKTtcbiAgfSk7XG5cbiAgLy8gVE9ETyAtIERlbGV0ZSB0aGlzIGVuZHBvaW50IGlmIG5vdCBuZWVkZWRcbiAgYXBwLmdldCgnL2FwaS9zY29yZS86aGFuZGxlJywgKHJlcSwgcmVzKSA9PiB7XG4gICAgREIuZ2V0U2NvcmUocmVxLCByZXMpO1xuICB9KTtcblxuICBhcHAuZ2V0KCcvYXBpL2NhcmRzL29sZCcsIChyZXEsIHJlcykgPT4ge1xuICAgIERCLmdldE9sZENhcmRzKHJlcSwgcmVzKTtcbiAgfSk7XG5cblxuICAvLyBUT0RPIC0gYWRkIGF1dGhlbnRpY2F0aW9uIHRvIGZvbGxvd2luZyBlbmRwb2ludHNcblxuICBhcHAucG9zdCgnL2RlY2svbmV3JywgdXBsb2FkLnNpbmdsZSgnemlwZmlsZScpLCAocmVxLCByZXMpID0+IHtcbiAgICBEQi5hZGREZWNrKHJlcSwgcmVzKTtcbiAgfSk7XG5cbiAgYXBwLnBvc3QoJy9zY29yZXMvZWRpdCcsIChyZXEsIHJlcykgPT4ge1xuICAgIERCLmFkanVzdFNjb3JlKHJlcSwgcmVzKTtcbiAgfSk7XG5cbiAgYXBwLmdldCgnL2NhcmRzL25ldycsIChyZXEsIHJlcykgPT4ge1xuICAgIERCLmdldE5ld0NhcmRzKHJlcSwgcmVzKTtcbiAgfSk7XG5cbn0gLy8gbW9kdWxlLmV4cG9ydHNcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcGkuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtdWx0ZXJcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJtdWx0ZXJcIlxuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==