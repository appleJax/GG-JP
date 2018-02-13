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

var PAGE_SIZE = 100;
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
                  questionAltText: '',
                  prevLineImg: '',
                  prevLineAltText: ''
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
                  answerImg: '',
                  answerAltText: ''
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
      var mongo, liveQuestions, userId;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return tryCatch(MongoClient.connect(url));

            case 2:
              mongo = _context5.sent;
              liveQuestions = mongo.db(DB).collection('liveQuestions');
              userId = userPoints.userId;
              _context5.next = 7;
              return tryCatch(liveQuestions.update({
                questionId: questionId
              }, {
                $push: {
                  alreadyAnswered: userId,
                  cachedPoints: userPoints
                }
              }));

            case 7:
              mongo.close();

            case 8:
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
  serveLiveQuestions: function () {
    var _serveLiveQuestions = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7(req, res) {
      var mongo, collection, liveQuestions;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return tryCatch(MongoClient.connect(url));

            case 2:
              mongo = _context7.sent;
              collection = mongo.db(DB).collection('liveQuestions');
              _context7.next = 6;
              return tryCatch(collection.find().toArray());

            case 6:
              liveQuestions = _context7.sent;
              res.json(liveQuestions);
              mongo.close();

            case 9:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    return function serveLiveQuestions(_x13, _x14) {
      return _serveLiveQuestions.apply(this, arguments);
    };
  }(),
  addOrUpdateUser: function () {
    var _addOrUpdateUser = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8(newUser) {
      var mongo, scoreboard, userId, user, _scoreboard$updateOne, name, handle, avatar, profileBanner, following;

      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return tryCatch(MongoClient.connect(url));

            case 2:
              mongo = _context8.sent;
              scoreboard = mongo.db(DB).collection('scoreboard');
              userId = newUser.userId;
              _context8.next = 7;
              return tryCatch(scoreboard.findOne({
                userId: userId
              }));

            case 7:
              user = _context8.sent;

              if (!user) {
                _context8.next = 14;
                break;
              }

              name = newUser.name, handle = newUser.handle, avatar = newUser.avatar, profileBanner = newUser.profileBanner, following = newUser.following;
              _context8.next = 12;
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
              _context8.next = 16;
              break;

            case 14:
              _context8.next = 16;
              return tryCatch(scoreboard.insert(newUser));

            case 16:
              mongo.close();

            case 17:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    return function addOrUpdateUser(_x15) {
      return _addOrUpdateUser.apply(this, arguments);
    };
  }(),
  adjustScore: function adjustScore(req, res) {// TODO adjust a score manually
  },
  getScores: function () {
    var _getScores = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee9(_ref6, res) {
      var _collection$find$sort;

      var params, mongo, collection, page, scoreView, data;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              params = _ref6.params;
              _context9.next = 3;
              return tryCatch(MongoClient.connect(url));

            case 3:
              mongo = _context9.sent;
              collection = mongo.db(DB).collection('scoreboard');
              page = params.page || 1;
              scoreView = params.view || 'weeklyStats';
              _context9.next = 9;
              return tryCatch(collection.find(_defineProperty({}, "".concat(scoreView, ".score"), {
                $gt: 0
              })).sort((_collection$find$sort = {}, _defineProperty(_collection$find$sort, "".concat(scoreView, ".score"), -1), _defineProperty(_collection$find$sort, "handle", 1), _collection$find$sort)).limit(PAGE_SIZE * page).toArray());

            case 9:
              data = _context9.sent;
              res.json(data);
              mongo.close();

            case 12:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    return function getScores(_x16, _x17) {
      return _getScores.apply(this, arguments);
    };
  }(),
  // TODO - delete this method if not needed
  getScore: function () {
    var _getScore = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee10(req, res) {
      var handle, mongo, collection, user;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              handle = req.params.handle;
              _context10.next = 3;
              return tryCatch(MongoClient.connect(url));

            case 3:
              mongo = _context10.sent;
              collection = mongo.db(DB).collection('scoreboard');
              _context10.next = 7;
              return tryCatch(collection.findOne({
                handle: handle
              }));

            case 7:
              user = _context10.sent;
              res.json(user);
              mongo.close();

            case 10:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, this);
    }));

    return function getScore(_x18, _x19) {
      return _getScore.apply(this, arguments);
    };
  }(),
  addDeck: function () {
    var _addDeck = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee11(req, res) {
      var filePath, newCards, mongo, collection, batch, i;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              filePath = req.file.path;
              _context11.next = 3;
              return tryCatch(processUpload(filePath));

            case 3:
              newCards = _context11.sent;
              _context11.next = 6;
              return tryCatch(MongoClient.connect(url));

            case 6:
              mongo = _context11.sent;
              collection = mongo.db(DB).collection('newCards');
              batch = collection.initializeUnorderedBulkOp();

              for (i = 0; i < newCards.length; ++i) {
                batch.insert(newCards[i]);
              }

              _context11.next = 12;
              return tryCatch(batch.execute());

            case 12:
              mongo.close();
              res.redirect('/');

            case 14:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, this);
    }));

    return function addDeck(_x20, _x21) {
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
    regeneratorRuntime.mark(function _callee12(resetWeeklyStats, resetMonthlyStats) {
      var mongo, collection, zero, reset;
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return tryCatch(MongoClient.connect(url));

            case 2:
              mongo = _context12.sent;
              collection = mongo.db(DB).collection('scoreboard');
              zero = {
                score: 0,
                attempts: 0,
                correct: 0
              };
              reset = {
                $set: {}
              };
              if (resetWeeklyStats) reset.$set.weeklyStats = zero;
              if (resetMonthlyStats) reset.$set.monthlyStats = zero;
              collection.update({}, reset, {
                multi: true
              });
              mongo.close();

            case 10:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, this);
    }));

    return function weeklyMonthlyReset(_x22, _x23) {
      return _weeklyMonthlyReset.apply(this, arguments);
    };
  }(),
  getCards: function () {
    var _getCards = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee13(req, res) {
      var ids, mongo, collection, data, cleanData;
      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              ids = req.query.ids;
              _context13.next = 3;
              return tryCatch(MongoClient.connect(url));

            case 3:
              mongo = _context13.sent;
              collection = mongo.db(DB).collection('oldCards');
              _context13.next = 7;
              return tryCatch(collection.find({
                cardId: {
                  $in: ids
                }
              }).project({
                _id: 0,
                mediaUrls: 1,
                questionText: 1,
                answers: 1
              }).toArray());

            case 7:
              data = _context13.sent;
              cleanData = data.map(function (card) {
                card.questionText = card.questionText.split('\n')[0];
                var s = card.answers.length > 1 ? 's' : '';
                card.answers = "Answer".concat(s, ": ").concat(card.answers.join(', '));
                card.mediaUrl = card.mediaUrls.length === 3 ? card.mediaUrls[1] : card.mediaUrls[0];
                delete card.mediaUrls;
                return card;
              });
              res.json(cleanData);
              mongo.close();

            case 11:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13, this);
    }));

    return function getCards(_x24, _x25) {
      return _getCards.apply(this, arguments);
    };
  }()
}; // module.exports

function getCollection(_x26, _x27, _x28) {
  return _getCollection.apply(this, arguments);
}

function _getCollection() {
  _getCollection = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee17(req, res, collectionName) {
    var mongo, collection, data;
    return regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.next = 2;
            return tryCatch(MongoClient.connect(url));

          case 2:
            mongo = _context17.sent;
            collection = mongo.db(DB).collection(collectionName);
            _context17.next = 6;
            return tryCatch(collection.find().project({
              _id: 0
            }).toArray());

          case 6:
            data = _context17.sent;
            res.json(data);
            mongo.close();

          case 9:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17, this);
  }));
  return _getCollection.apply(this, arguments);
}

function removeLiveQuestion(mongo, cardId) {
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref7 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee14(resolve, reject) {
      var collection, currentQuestion;
      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              collection = mongo.db(DB).collection('liveQuestions');
              _context14.next = 3;
              return tryCatch(collection.findOne({
                cardId: cardId
              }));

            case 3:
              currentQuestion = _context14.sent;
              _context14.next = 6;
              return tryCatch(collection.remove(currentQuestion));

            case 6:
              _context14.next = 8;
              return tryCatch(addPointsToScoreboard(mongo, currentQuestion));

            case 8:
              resolve();

            case 9:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14, this);
    }));

    return function (_x29, _x30) {
      return _ref7.apply(this, arguments);
    };
  }());
}

function addPointsToScoreboard(mongo, _ref8) {
  var cachedPoints = _ref8.cachedPoints,
      cardId = _ref8.cardId;
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref9 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee15(resolve, reject) {
      var scoreboard, oldCards, answerPostedAt, ops, i, _cachedPoints$i, userId, points, op;

      return regeneratorRuntime.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
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
                op = {
                  updateOne: {
                    filter: {
                      userId: userId
                    },
                    update: {
                      $inc: {
                        'allTimeStats.score': points,
                        'monthlyStats.score': points,
                        'weeklyStats.score': points,
                        'allTimeStats.attempts': 1,
                        'monthlyStats.attempts': 1,
                        'weeklyStats.attempts': 1
                      }
                    }
                  }
                };

                if (points > 0) {
                  op.updateOne.update.$push = {
                    'allTimeStats.correct': {
                      answerPostedAt: answerPostedAt,
                      cardId: cardId,
                      points: points
                    }
                  };
                  op.updateOne.update.$inc['monthlyStats.correct'] = 1;
                  op.updateOne.update.$inc['weeklyStats.correct'] = 1;
                }

                ops.push(op);
              }

              if (!(ops.length === 0)) {
                _context15.next = 9;
                break;
              }

              resolve();
              return _context15.abrupt("return");

            case 9:
              _context15.next = 11;
              return tryCatch(scoreboard.bulkWrite(ops));

            case 11:
              _context15.next = 13;
              return tryCatch(recalculateRank(scoreboard));

            case 13:
              resolve();

            case 14:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15, this);
    }));

    return function (_x31, _x32) {
      return _ref9.apply(this, arguments);
    };
  }());
}

function recalculateRank(scoreboard) {
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref10 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee16(resolve, reject) {
      var stats, usersToUpdate, currentRanks, bulkUpdateOps, userIdsToUpdate, end, i, _loop;

      return regeneratorRuntime.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.next = 2;
              return tryCatch(scoreboard.aggregate([{
                $project: {
                  _id: 0,
                  orderBy: {
                    $literal: ['weeklyStats', 'monthlyStats', 'allTimeStats']
                  },
                  userId: 1,
                  'allTimeStats.score': 1,
                  'allTimeStats.rank': 1,
                  'monthlyStats.score': 1,
                  'monthlyStats.rank': 1,
                  'weeklyStats.score': 1,
                  'weeklyStats.rank': 1
                }
              }, {
                $unwind: '$orderBy'
              }, {
                $group: {
                  _id: {
                    orderBy: '$orderBy',
                    score: {
                      $switch: {
                        branches: [{
                          case: {
                            $eq: ['$orderBy', 'weeklyStats']
                          },
                          then: '$weeklyStats.score'
                        }, {
                          case: {
                            $eq: ['$orderBy', 'monthlyStats']
                          },
                          then: '$monthlyStats.score'
                        }],
                        default: '$allTimeStats.score'
                      }
                    }
                  },
                  users: {
                    $push: '$$CURRENT'
                  }
                }
              }, {
                $sort: {
                  '_id.score': -1
                }
              }, {
                $group: {
                  _id: '$_id.orderBy',
                  scores: {
                    $push: {
                      score: '$_id.score',
                      users: '$users'
                    }
                  }
                }
              }]).toArray());

            case 2:
              stats = _context16.sent;
              usersToUpdate = {};
              currentRanks = {
                allTimeStats: 1,
                monthlyStats: 1,
                weeklyStats: 1
              };
              stats.forEach(function (_ref11) {
                var category = _ref11._id,
                    scores = _ref11.scores;
                var end = scores.length;
                var i = 0;

                for (; i < end; i++) {
                  var currentStat = scores[i];
                  if (currentStat.score === 0) continue;
                  currentStat.users.forEach(function (user) {
                    var previousRank = user[category].rank;
                    var currentRank = currentRanks[category];

                    if (previousRank !== currentRank) {
                      var cachedUpdate = usersToUpdate[user.userId] || {};
                      cachedUpdate[category] = currentRank;
                      usersToUpdate[user.userId] = cachedUpdate;
                    }
                  });
                  currentRanks[category] += currentStat.users.length;
                }
              });
              bulkUpdateOps = [];
              userIdsToUpdate = Object.keys(usersToUpdate);
              end = userIdsToUpdate.length;
              i = 0;

              _loop = function _loop() {
                var currentUser = userIdsToUpdate[i];
                var userId = Number(currentUser);
                var op = {
                  updateOne: {
                    filter: {
                      userId: userId
                    },
                    update: {
                      $set: {}
                    }
                  }
                };
                var userUpdates = usersToUpdate[currentUser];
                Object.keys(currentRanks).forEach(function (category) {
                  var newRank = userUpdates[category];
                  if (newRank) op.updateOne.update.$set["".concat(category, ".rank")] = newRank;
                });
                bulkUpdateOps.push(op);
              };

              for (; i < end; i++) {
                _loop();
              } // for loop


              _context16.next = 14;
              return tryCatch(scoreboard.bulkWrite(bulkUpdateOps));

            case 14:
              resolve();

            case 15:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16, this);
    }));

    return function (_x33, _x34) {
      return _ref10.apply(this, arguments);
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

module.exports = require("@babel/polyfill");

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

__webpack_require__(20)(app);

twitterBot.start();
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
/* 21 */
/***/ (function(module, exports) {

module.exports = require("multer");

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYTAzMzY3MjVmMTQxZWIxMTZmNmQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhdGhcIiIsIndlYnBhY2s6Ly8vLi9zcmMvZGJPcHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3R3aXR0ZXJDb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3V0aWxzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBiYWJlbC9wb2x5ZmlsbFwiIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZG90ZW52XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJvZHktcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3R3aXR0ZXJCb3QuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9uZ29kYlwiIiwid2VicGFjazovLy8uL3NyYy9wcm9jZXNzQW5raUpzb24uanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZnNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwbmdqczJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ1bnppcC1zdHJlYW1cIiIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvdHdpdHRlclV0aWxzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInR3aXRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ1cmxlbmNvZGVcIiIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcIm11bHRlclwiIl0sIm5hbWVzIjpbInR3aXR0ZXJVdGlscyIsInJlcXVpcmUiLCJ1dGlscyIsIm1vZHVsZSIsImV4cG9ydHMiLCJNb25nb0NsaWVudCIsInVybCIsInByb2Nlc3MiLCJlbnYiLCJNT05HT0RCX1VSSSIsIkRCIiwiTU9OR09fREIiLCJwcm9jZXNzVXBsb2FkIiwidHJ5Q2F0Y2giLCJQQUdFX1NJWkUiLCJnZXRSYW5kb21RdWVzdGlvbiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiY29ubmVjdCIsIm1vbmdvIiwibmV3Q2FyZHMiLCJkYiIsImNvbGxlY3Rpb24iLCJvbGRDYXJkcyIsImZpbmRPbmUiLCJyYW5kb21DYXJkIiwiRXJyb3IiLCJpbnNlcnQiLCJyZW1vdmUiLCJjbG9zZSIsInJldmVhbEFuc3dlcldvcmtmbG93IiwiY2FyZElkIiwiYW5zd2VyQ2FyZCIsInJlbW92ZUxpdmVRdWVzdGlvbiIsImFkZExpdmVRdWVzdGlvbiIsInJlY29yZCIsIm1lZGlhVXJscyIsImxpdmVRdWVzdGlvbnMiLCJ1cGRhdGVPbmUiLCIkc2V0IiwiJHVuc2V0IiwicXVlc3Rpb25JbWciLCJxdWVzdGlvbkFsdFRleHQiLCJwcmV2TGluZUltZyIsInByZXZMaW5lQWx0VGV4dCIsImFkZE1lZGlhVXJsc1RvQ2FyZCIsIm1lZGlhVXJsIiwiJHB1c2giLCJhbnN3ZXJJbWciLCJhbnN3ZXJBbHRUZXh0IiwidXBkYXRlTGl2ZVF1ZXN0aW9uIiwicXVlc3Rpb25JZCIsInVzZXJQb2ludHMiLCJ1c2VySWQiLCJ1cGRhdGUiLCJhbHJlYWR5QW5zd2VyZWQiLCJjYWNoZWRQb2ludHMiLCJnZXRMaXZlUXVlc3Rpb25zIiwiZmluZCIsInRvQXJyYXkiLCJzZXJ2ZUxpdmVRdWVzdGlvbnMiLCJyZXEiLCJyZXMiLCJqc29uIiwiYWRkT3JVcGRhdGVVc2VyIiwibmV3VXNlciIsInNjb3JlYm9hcmQiLCJ1c2VyIiwibmFtZSIsImhhbmRsZSIsImF2YXRhciIsInByb2ZpbGVCYW5uZXIiLCJmb2xsb3dpbmciLCJhZGp1c3RTY29yZSIsImdldFNjb3JlcyIsInBhcmFtcyIsInBhZ2UiLCJzY29yZVZpZXciLCJ2aWV3IiwiJGd0Iiwic29ydCIsImxpbWl0IiwiZGF0YSIsImdldFNjb3JlIiwiYWRkRGVjayIsImZpbGVQYXRoIiwiZmlsZSIsInBhdGgiLCJiYXRjaCIsImluaXRpYWxpemVVbm9yZGVyZWRCdWxrT3AiLCJpIiwibGVuZ3RoIiwiZXhlY3V0ZSIsInJlZGlyZWN0IiwiZ2V0TmV3Q2FyZHMiLCJnZXRDb2xsZWN0aW9uIiwiZ2V0T2xkQ2FyZHMiLCJ3ZWVrbHlNb250aGx5UmVzZXQiLCJyZXNldFdlZWtseVN0YXRzIiwicmVzZXRNb250aGx5U3RhdHMiLCJ6ZXJvIiwic2NvcmUiLCJhdHRlbXB0cyIsImNvcnJlY3QiLCJyZXNldCIsIndlZWtseVN0YXRzIiwibW9udGhseVN0YXRzIiwibXVsdGkiLCJnZXRDYXJkcyIsImlkcyIsInF1ZXJ5IiwiJGluIiwicHJvamVjdCIsIl9pZCIsInF1ZXN0aW9uVGV4dCIsImFuc3dlcnMiLCJjbGVhbkRhdGEiLCJtYXAiLCJjYXJkIiwic3BsaXQiLCJzIiwiam9pbiIsImNvbGxlY3Rpb25OYW1lIiwiY3VycmVudFF1ZXN0aW9uIiwiYWRkUG9pbnRzVG9TY29yZWJvYXJkIiwiYW5zd2VyUG9zdGVkQXQiLCJEYXRlIiwiZ2V0VGltZSIsIm9wcyIsInBvaW50cyIsIm9wIiwiZmlsdGVyIiwiJGluYyIsInB1c2giLCJidWxrV3JpdGUiLCJyZWNhbGN1bGF0ZVJhbmsiLCJhZ2dyZWdhdGUiLCIkcHJvamVjdCIsIm9yZGVyQnkiLCIkbGl0ZXJhbCIsIiR1bndpbmQiLCIkZ3JvdXAiLCIkc3dpdGNoIiwiYnJhbmNoZXMiLCJjYXNlIiwiJGVxIiwidGhlbiIsImRlZmF1bHQiLCJ1c2VycyIsIiRzb3J0Iiwic2NvcmVzIiwic3RhdHMiLCJ1c2Vyc1RvVXBkYXRlIiwiY3VycmVudFJhbmtzIiwiYWxsVGltZVN0YXRzIiwiZm9yRWFjaCIsImNhdGVnb3J5IiwiZW5kIiwiY3VycmVudFN0YXQiLCJwcmV2aW91c1JhbmsiLCJyYW5rIiwiY3VycmVudFJhbmsiLCJjYWNoZWRVcGRhdGUiLCJidWxrVXBkYXRlT3BzIiwidXNlcklkc1RvVXBkYXRlIiwiT2JqZWN0Iiwia2V5cyIsImN1cnJlbnRVc2VyIiwiTnVtYmVyIiwidXNlclVwZGF0ZXMiLCJuZXdSYW5rIiwidHdpdCIsIlRXSVRURVJfQVBJX0tFWSIsIlRXSVRURVJfQVBJX1NFQ1JFVCIsIlRXSVRURVJfVE9LRU4iLCJUV0lUVEVSX1RPS0VOX1NFQ1JFVCIsIlRXSVRURVJfQUNDT1VOVCIsInVzZXJDb25maWciLCJjb25zdW1lcl9rZXkiLCJjb25zdW1lcl9zZWNyZXQiLCJhY2Nlc3NfdG9rZW4iLCJhY2Nlc3NfdG9rZW5fc2VjcmV0IiwidXJsZW5jb2RlIiwiV0VCTE9PS1VQX1VSTCIsIkhPVVJTIiwiZm9ybWF0UXVlc3Rpb25BbHRUZXh0IiwiZXhwcmVzc2lvbiIsImhpbnQiLCJmb3JtYXRIaW50IiwibWluTWF4Q2hhcnMiLCJtaW4iLCJtYXgiLCJtaW5NYXgiLCJzY3JlZW5SZWFkZXJIaW50IiwicmVwbGFjZSIsImZvcm1hdFF1ZXN0aW9uVGV4dCIsImVuZ01lYW5pbmciLCJub3RlcyIsImNhcmRJRCIsInR3ZWV0VGV4dCIsIm5lZWRzSGludCIsImZvcm1hdEFuc3dlckFsdFRleHQiLCJmb3JtYXRBbnN3ZXJUZXh0Iiwid2ViTG9va3VwIiwiYW5zd2VyVGV4dCIsImFkZFF1ZXN0aW9uTGluayIsInF1ZXN0aW9uTGluayIsImxpbmVzIiwic3BsaWNlIiwiZ2V0QW5zd2VycyIsImFsdEFuc3dlcnMiLCJhY2NlcHRlZEFuc3dlciIsIm1hdGNoIiwib3RoZXJBbnN3ZXJzIiwiY29uY2F0IiwiY2FsY3VsYXRlU2NvcmUiLCJxdWVzdGlvblBvc3RlZEF0IiwidGltZVRvQW5zd2VyIiwiTWF0aCIsImZsb29yIiwiZXh0cmFjdEFuc3dlciIsInRleHQiLCJ0cmltIiwic2xpY2UiLCJnZXRUaW1lVW50aWwiLCJob3VyIiwibm93IiwibWlsbGlzVW50aWxUaW1lIiwiZ2V0RnVsbFllYXIiLCJnZXRNb250aCIsImdldERhdGUiLCJwcm9taXNlIiwiY2F0Y2giLCJjb25zb2xlIiwiZXJyb3IiLCJlcnIiLCJjb250YWlucyIsIml0ZW0iLCJsaXN0IiwidmFsaWQiLCJpbmRleE9mIiwiaW5kZXgiLCJtYXhDaGFycyIsIm1pc3NpbmdDaGFyUmVnZXgiLCJtaXNzaW5nQ2hhcnMiLCJnaW1tZUNoYXJzIiwibWluQ2hhcnMiLCJvcHRpb25hbENoYXJzIiwibGVnZW5kIiwibm9ybWFsaXplZCIsImdyb3VwTXVsdGlYcyIsImdyb3VwWHMiLCJncm91cFF1ZXN0aW9uTWFya3MiLCJmbGF0dGVuIiwiZ3JvdXAiLCJ0ZXN0IiwicmVzdWx0IiwibnVtQ2hhcnMiLCJuZWdhdGVkQ2hhcnMiLCJzdHJpbmciLCJwMSIsInN0ciIsInNjYWxhciIsInYiLCJBcnJheSIsImlzQXJyYXkiLCJkZWVwIiwiZmxhdCIsImhlYWQiLCJ0YWlsIiwiY29uZmlnIiwiZXhwcmVzcyIsImFwcCIsImJvZHlQYXJzZXIiLCJ0d2l0dGVyQm90Iiwic2V0IiwiUE9SVCIsInVzZSIsInN0YXRpYyIsIl9fZGlybmFtZSIsInN0YXJ0IiwibGlzdGVuIiwiZ2V0IiwibG9nIiwiZ2V0Rm9sbG93aW5nIiwicG9zdE1lZGlhIiwiVHdpdHRlciIsIkFOU1dFUl9JTlRFUlZBTCIsIlFVRVNUSU9OX0lOVEVSVkFMIiwib3BlblN0cmVhbSIsInNldEludGVydmFsIiwidHdlZXRSYW5kb21RdWVzdGlvbiIsInNldFN0YXJ0VGltZXMiLCJ0aW1lVW50aWw3UE0iLCJ0aW1lVW50aWxNaWRuaWdodCIsInNldFRpbWVvdXQiLCJsaXZlUXVlc3Rpb24iLCJ0d2VldEFuc3dlciIsInN0cmVhbSIsInRyYWNrIiwib24iLCJpbl9yZXBseV90b19zdGF0dXNfaWRfc3RyIiwiY3JlYXRlZF9hdCIsImlkIiwic2NyZWVuX25hbWUiLCJwcm9maWxlX2ltYWdlX3VybF9odHRwcyIsInByb2ZpbGVfYmFubmVyX3VybCIsImZvdW5kUXVlc3Rpb24iLCJxdWVzdGlvbkNhcmQiLCJhY2NlcHRlZEFuc3dlcnMiLCJ1c2VyQW5zd2VyIiwiZGlzY29ubmVjdE1zZyIsImdldERheSIsImZzIiwiUE5HIiwidW56aXAiLCJVUExPQURTX1BBVEgiLCJwYXJzZUFua2lKc29uIiwib3B0aW1pemVJbWFnZXMiLCJ6aXBmaWxlUGF0aCIsImNyZWF0ZVJlYWRTdHJlYW0iLCJwaXBlIiwiRXh0cmFjdCIsImZpbGVzIiwicmVhZGRpclN5bmMiLCJleHRyYWN0Q2FyZEluZm8iLCJjbGVhblVwIiwiZGlyUGF0aCIsImZpbGVzUHJvY2Vzc2luZyIsImN1cnJlbnRGaWxlIiwiY29udGVudHMiLCJyZWFkRmlsZVN5bmMiLCJ3cml0ZVN0cmVhbSIsImNyZWF0ZVdyaXRlU3RyZWFtIiwiY3VycmVudEltYWdlIiwicmVqIiwiZmlsdGVyVHlwZSIsImRlZmxhdGVMZXZlbCIsInBhcnNlIiwicG5nIiwicGFjayIsImFsbCIsImFsbE5ld0NhcmRzIiwic3RhdFN5bmMiLCJpc0ZpbGUiLCJKU09OIiwiZmllbGRzIiwic3RyaXBIdG1sIiwiZ2V0QmFzZTY0IiwiZ2V0U3JjIiwiYmFzZTY0IiwiZW5jb2RpbmciLCJlIiwicm9vdCIsImxzdGF0U3luYyIsInVubGlua1N5bmMiLCJpc0RpcmVjdG9yeSIsImRlbGV0ZUZvbGRlclJlY3Vyc2l2ZSIsInJvb3RQYXRoIiwiZXhpc3RzU3luYyIsImN1clBhdGgiLCJybWRpclN5bmMiLCJzdGF0dXMiLCJiNjRJbWFnZTEiLCJhbHRUZXh0MSIsImI2NEltYWdlMiIsImFsdFRleHQyIiwidXBsb2FkTWVkaWEiLCJtZWRpYUlkMSIsIm1lZGlhX2lkcyIsIm1lZGlhSWQyIiwidW5zaGlmdCIsInR3ZWV0X21vZGUiLCJpbmNsdWRlX2V4dF9hbHRfdGV4dCIsInBvc3QiLCJyZXNwb25zZSIsImV4dGVuZGVkX2VudGl0aWVzIiwibWVkaWEiLCJpbWFnZSIsIm9iaiIsIm1lZGlhX3VybF9odHRwcyIsImFsdFRleHQiLCJleHRfYWx0X3RleHQiLCJpZF9zdHIiLCJiNjRJbWFnZSIsIm1lZGlhX2RhdGEiLCJtZWRpYUlkU3RyIiwibWVkaWFfaWRfc3RyaW5nIiwibWV0YV9wYXJhbXMiLCJtZWRpYV9pZCIsImFsdF90ZXh0IiwidXBsb2FkIiwiZGVzdCIsIm5l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LGNBQVQsRUFBeUIsVUFBQ3pULEdBQUQsRUFBTUMsR0FBTixFQUFjO0FBQ3JDckQsT0FBR2dFLFdBQUgsQ0FBZVosR0FBZixFQUFvQkMsR0FBcEI7QUFDRCxHQUZEO0FBSUFrTixNQUFJVSxHQUFKLENBQVEsWUFBUixFQUFzQixVQUFDN04sR0FBRCxFQUFNQyxHQUFOLEVBQWM7QUFDbENyRCxPQUFHcUYsV0FBSCxDQUFlakMsR0FBZixFQUFvQkMsR0FBcEI7QUFDRCxHQUZEO0FBSUQsQ0FoREQsQyxDQWdERSxpQjs7Ozs7O0FDbkRGLG1DIiwiZmlsZSI6InNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDUpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGEwMzM2NzI1ZjE0MWViMTE2ZjZkIiwiY29uc3QgdHdpdHRlclV0aWxzID0gcmVxdWlyZSgnLi90d2l0dGVyVXRpbHMnKTtcbmNvbnN0IHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLi4udHdpdHRlclV0aWxzLFxuICAuLi51dGlsc1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWxzL2luZGV4LmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInBhdGhcIlxuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBNb25nb0NsaWVudCA9IHJlcXVpcmUoJ21vbmdvZGInKS5Nb25nb0NsaWVudDtcbmNvbnN0IHVybCA9IHByb2Nlc3MuZW52Lk1PTkdPREJfVVJJO1xuY29uc3QgREIgPSBwcm9jZXNzLmVudi5NT05HT19EQjtcbmNvbnN0IHsgcHJvY2Vzc1VwbG9hZCB9ID0gcmVxdWlyZSgnLi9wcm9jZXNzQW5raUpzb24nKTtcbmNvbnN0IHsgdHJ5Q2F0Y2ggfSA9IHJlcXVpcmUoJ1V0aWxzJyk7XG5jb25zdCBQQUdFX1NJWkUgPSAxMDA7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRSYW5kb21RdWVzdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgbW9uZ28gPSBhd2FpdCB0cnlDYXRjaChNb25nb0NsaWVudC5jb25uZWN0KHVybCkpO1xuICAgICAgY29uc3QgbmV3Q2FyZHMgPSBtb25nby5kYihEQikuY29sbGVjdGlvbignbmV3Q2FyZHMnKTtcbiAgICAgIGNvbnN0IG9sZENhcmRzID0gbW9uZ28uZGIoREIpLmNvbGxlY3Rpb24oJ29sZENhcmRzJyk7XG4gICAgICBjb25zdCByYW5kb21DYXJkID0gYXdhaXQgdHJ5Q2F0Y2gobmV3Q2FyZHMuZmluZE9uZSgpKTtcbiAgICAgIGlmIChyYW5kb21DYXJkID09IG51bGwpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIkVtcHR5IGRlY2suIFBsZWFzZSBBZGQgTW9yZSBDYXJkcyB0byBEQi5cIikpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhd2FpdCB0cnlDYXRjaChvbGRDYXJkcy5pbnNlcnQocmFuZG9tQ2FyZCkpO1xuICAgICAgYXdhaXQgdHJ5Q2F0Y2gobmV3Q2FyZHMucmVtb3ZlKHJhbmRvbUNhcmQpKTtcbiAgICAgIHJlc29sdmUocmFuZG9tQ2FyZCk7XG4gICAgICBtb25nby5jbG9zZSgpO1xuICAgIH0pO1xuICB9LFxuXG4gIHJldmVhbEFuc3dlcldvcmtmbG93KGNhcmRJZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBtb25nbyA9IGF3YWl0IHRyeUNhdGNoKE1vbmdvQ2xpZW50LmNvbm5lY3QodXJsKSk7XG4gICAgICBjb25zdCBvbGRDYXJkcyA9IG1vbmdvLmRiKERCKS5jb2xsZWN0aW9uKCdvbGRDYXJkcycpO1xuICAgICAgY29uc3QgYW5zd2VyQ2FyZCA9IGF3YWl0IHRyeUNhdGNoKG9sZENhcmRzLmZpbmRPbmUoeyBjYXJkSWQgfSkpO1xuICAgICAgcmVzb2x2ZShhbnN3ZXJDYXJkKTtcbiAgICAgIGF3YWl0IHRyeUNhdGNoKHJlbW92ZUxpdmVRdWVzdGlvbihtb25nbywgY2FyZElkKSk7XG4gICAgICBtb25nby5jbG9zZSgpO1xuICAgIH0pO1xuICB9LFxuXG4gIGFzeW5jIGFkZExpdmVRdWVzdGlvbihyZWNvcmQsIG1lZGlhVXJscykge1xuICAgIGNvbnN0IHsgY2FyZElkIH0gPSByZWNvcmQ7XG4gICAgY29uc3QgbW9uZ28gPSBhd2FpdCB0cnlDYXRjaChNb25nb0NsaWVudC5jb25uZWN0KHVybCkpO1xuICAgIGNvbnN0IGxpdmVRdWVzdGlvbnMgPSBtb25nby5kYihEQikuY29sbGVjdGlvbignbGl2ZVF1ZXN0aW9ucycpO1xuICAgIGNvbnN0IG9sZENhcmRzID0gbW9uZ28uZGIoREIpLmNvbGxlY3Rpb24oJ29sZENhcmRzJyk7XG4gICAgYXdhaXQgdHJ5Q2F0Y2gobGl2ZVF1ZXN0aW9ucy5pbnNlcnQoe1xuICAgICAgLi4ucmVjb3JkLFxuICAgICAgbWVkaWFVcmxzXG4gICAgfSkpO1xuICAgIGF3YWl0IHRyeUNhdGNoKFxuICAgICAgb2xkQ2FyZHMudXBkYXRlT25lKFxuICAgICAgICB7Y2FyZElkfSxcbiAgICAgICAge1xuICAgICAgICAgICRzZXQ6IHsgbWVkaWFVcmxzIH0sXG4gICAgICAgICAgJHVuc2V0OiB7XG4gICAgICAgICAgICBxdWVzdGlvbkltZzogJycsXG4gICAgICAgICAgICBxdWVzdGlvbkFsdFRleHQ6ICcnLFxuICAgICAgICAgICAgcHJldkxpbmVJbWc6ICcnLFxuICAgICAgICAgICAgcHJldkxpbmVBbHRUZXh0OiAnJ1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKVxuICAgIClcbiAgICBtb25nby5jbG9zZSgpO1xuICB9LFxuXG4gIGFzeW5jIGFkZE1lZGlhVXJsc1RvQ2FyZChjYXJkSWQsIFttZWRpYVVybF0pIHtcbiAgICBjb25zdCBtb25nbyA9IGF3YWl0IHRyeUNhdGNoKE1vbmdvQ2xpZW50LmNvbm5lY3QodXJsKSk7XG4gICAgY29uc3Qgb2xkQ2FyZHMgPSBtb25nby5kYihEQikuY29sbGVjdGlvbignb2xkQ2FyZHMnKTtcbiAgICBhd2FpdCB0cnlDYXRjaChcbiAgICAgIG9sZENhcmRzLnVwZGF0ZU9uZShcbiAgICAgICAgeyBjYXJkSWQgfSwge1xuICAgICAgICAgICRwdXNoOiB7IG1lZGlhVXJsczogbWVkaWFVcmwgfSxcbiAgICAgICAgICAkdW5zZXQ6IHsgYW5zd2VySW1nOiAnJywgYW5zd2VyQWx0VGV4dDogJycgfVxuICAgICAgICB9XG4gICAgICApXG4gICAgKVxuICAgIG1vbmdvLmNsb3NlKCk7XG4gIH0sXG5cbiAgYXN5bmMgdXBkYXRlTGl2ZVF1ZXN0aW9uKHF1ZXN0aW9uSWQsIHVzZXJQb2ludHMpIHtcbiAgICBjb25zdCBtb25nbyA9IGF3YWl0IHRyeUNhdGNoKE1vbmdvQ2xpZW50LmNvbm5lY3QodXJsKSk7XG4gICAgY29uc3QgbGl2ZVF1ZXN0aW9ucyA9IG1vbmdvLmRiKERCKS5jb2xsZWN0aW9uKCdsaXZlUXVlc3Rpb25zJyk7XG4gICAgY29uc3QgeyB1c2VySWQgfSA9IHVzZXJQb2ludHM7XG5cbiAgICBhd2FpdCB0cnlDYXRjaChcbiAgICAgIGxpdmVRdWVzdGlvbnMudXBkYXRlKFxuICAgICAgICB7IHF1ZXN0aW9uSWQgfSwge1xuICAgICAgICAgICRwdXNoOiB7XG4gICAgICAgICAgICBhbHJlYWR5QW5zd2VyZWQ6IHVzZXJJZCxcbiAgICAgICAgICAgIGNhY2hlZFBvaW50czogdXNlclBvaW50c1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKVxuICAgICk7XG4gICAgbW9uZ28uY2xvc2UoKTtcbiAgfSxcblxuICBnZXRMaXZlUXVlc3Rpb25zKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBtb25nbyA9IGF3YWl0IHRyeUNhdGNoKE1vbmdvQ2xpZW50LmNvbm5lY3QodXJsKSk7XG4gICAgICBjb25zdCBjb2xsZWN0aW9uID0gbW9uZ28uZGIoREIpLmNvbGxlY3Rpb24oJ2xpdmVRdWVzdGlvbnMnKTtcbiAgICAgIGNvbnN0IGxpdmVRdWVzdGlvbnMgPSBhd2FpdCB0cnlDYXRjaChjb2xsZWN0aW9uLmZpbmQoKS50b0FycmF5KCkpO1xuICAgICAgcmVzb2x2ZShsaXZlUXVlc3Rpb25zKTtcbiAgICAgIG1vbmdvLmNsb3NlKCk7XG4gICAgfSk7XG4gIH0sXG5cbiAgYXN5bmMgc2VydmVMaXZlUXVlc3Rpb25zKHJlcSwgcmVzKSB7XG4gICAgY29uc3QgbW9uZ28gPSBhd2FpdCB0cnlDYXRjaChNb25nb0NsaWVudC5jb25uZWN0KHVybCkpO1xuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSBtb25nby5kYihEQikuY29sbGVjdGlvbignbGl2ZVF1ZXN0aW9ucycpO1xuICAgIGNvbnN0IGxpdmVRdWVzdGlvbnMgPSBhd2FpdCB0cnlDYXRjaChjb2xsZWN0aW9uLmZpbmQoKS50b0FycmF5KCkpO1xuICAgIHJlcy5qc29uKGxpdmVRdWVzdGlvbnMpO1xuICAgIG1vbmdvLmNsb3NlKCk7XG4gIH0sXG5cbiAgYXN5bmMgYWRkT3JVcGRhdGVVc2VyKG5ld1VzZXIpIHtcbiAgICBjb25zdCBtb25nbyA9IGF3YWl0IHRyeUNhdGNoKE1vbmdvQ2xpZW50LmNvbm5lY3QodXJsKSk7XG4gICAgY29uc3Qgc2NvcmVib2FyZCA9IG1vbmdvLmRiKERCKS5jb2xsZWN0aW9uKCdzY29yZWJvYXJkJyk7XG4gICAgY29uc3QgeyB1c2VySWQgfSA9IG5ld1VzZXI7XG4gICAgY29uc3QgdXNlciA9IGF3YWl0IHRyeUNhdGNoKHNjb3JlYm9hcmQuZmluZE9uZSh7dXNlcklkfSkpO1xuICAgIGlmICh1c2VyKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIGhhbmRsZSxcbiAgICAgICAgYXZhdGFyLFxuICAgICAgICBwcm9maWxlQmFubmVyLFxuICAgICAgICBmb2xsb3dpbmdcbiAgICAgIH0gPSBuZXdVc2VyO1xuXG4gICAgICBhd2FpdCB0cnlDYXRjaChcbiAgICAgICAgc2NvcmVib2FyZC51cGRhdGVPbmUoeyB1c2VySWQgfSwge1xuICAgICAgICAgICAgJHNldDogeyBuYW1lIH0sXG4gICAgICAgICAgICAkc2V0OiB7IGhhbmRsZSB9LFxuICAgICAgICAgICAgJHNldDogeyBhdmF0YXIgfSxcbiAgICAgICAgICAgICRzZXQ6IHsgcHJvZmlsZUJhbm5lciB9LFxuICAgICAgICAgICAgJHNldDogeyBmb2xsb3dpbmcgfVxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXdhaXQgdHJ5Q2F0Y2goc2NvcmVib2FyZC5pbnNlcnQobmV3VXNlcikpO1xuICAgIH1cbiAgICBtb25nby5jbG9zZSgpO1xuICB9LFxuXG4gIGFkanVzdFNjb3JlKHJlcSwgcmVzKSB7XG4gICAgLy8gVE9ETyBhZGp1c3QgYSBzY29yZSBtYW51YWxseVxuICB9LFxuXG4gIGFzeW5jIGdldFNjb3Jlcyh7IHBhcmFtcyB9LCByZXMpIHtcbiAgICBjb25zdCBtb25nbyA9IGF3YWl0IHRyeUNhdGNoKE1vbmdvQ2xpZW50LmNvbm5lY3QodXJsKSk7XG4gICAgY29uc3QgY29sbGVjdGlvbiA9IG1vbmdvLmRiKERCKS5jb2xsZWN0aW9uKCdzY29yZWJvYXJkJyk7XG4gICAgY29uc3QgcGFnZSA9IHBhcmFtcy5wYWdlIHx8IDE7XG4gICAgY29uc3Qgc2NvcmVWaWV3ID0gKHBhcmFtcy52aWV3IHx8ICd3ZWVrbHlTdGF0cycpO1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0cnlDYXRjaChcbiAgICAgIGNvbGxlY3Rpb24uZmluZCh7W2Ake3Njb3JlVmlld30uc2NvcmVgXTogeyAkZ3Q6IDAgfX0pXG4gICAgICAgICAgICAgICAgLnNvcnQoe1tgJHtzY29yZVZpZXd9LnNjb3JlYF06IC0xLCBoYW5kbGU6IDF9KVxuICAgICAgICAgICAgICAgIC5saW1pdChQQUdFX1NJWkUqcGFnZSlcbiAgICAgICAgICAgICAgICAudG9BcnJheSgpXG4gICAgKTtcbiAgICByZXMuanNvbihkYXRhKTtcbiAgICBtb25nby5jbG9zZSgpO1xuICB9LFxuXG4gIC8vIFRPRE8gLSBkZWxldGUgdGhpcyBtZXRob2QgaWYgbm90IG5lZWRlZFxuICBhc3luYyBnZXRTY29yZShyZXEsIHJlcykge1xuICAgIGNvbnN0IHsgaGFuZGxlIH0gPSByZXEucGFyYW1zO1xuICAgIGNvbnN0IG1vbmdvID0gYXdhaXQgdHJ5Q2F0Y2goTW9uZ29DbGllbnQuY29ubmVjdCh1cmwpKTtcbiAgICBjb25zdCBjb2xsZWN0aW9uID0gbW9uZ28uZGIoREIpLmNvbGxlY3Rpb24oJ3Njb3JlYm9hcmQnKTtcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgdHJ5Q2F0Y2goY29sbGVjdGlvbi5maW5kT25lKHtoYW5kbGV9KSk7XG4gICAgcmVzLmpzb24odXNlcik7XG4gICAgbW9uZ28uY2xvc2UoKTtcbiAgfSxcblxuICBhc3luYyBhZGREZWNrKHJlcSwgcmVzKSB7XG4gICAgY29uc3QgZmlsZVBhdGggPSByZXEuZmlsZS5wYXRoO1xuICAgIGNvbnN0IG5ld0NhcmRzID0gYXdhaXQgdHJ5Q2F0Y2gocHJvY2Vzc1VwbG9hZChmaWxlUGF0aCkpO1xuICAgIGNvbnN0IG1vbmdvID0gYXdhaXQgdHJ5Q2F0Y2goTW9uZ29DbGllbnQuY29ubmVjdCh1cmwpKTtcbiAgICBjb25zdCBjb2xsZWN0aW9uID0gbW9uZ28uZGIoREIpLmNvbGxlY3Rpb24oJ25ld0NhcmRzJyk7XG4gICAgY29uc3QgYmF0Y2ggPSBjb2xsZWN0aW9uLmluaXRpYWxpemVVbm9yZGVyZWRCdWxrT3AoKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3Q2FyZHMubGVuZ3RoOyArK2kpIHtcbiAgICAgIGJhdGNoLmluc2VydChuZXdDYXJkc1tpXSk7XG4gICAgfVxuXG4gICAgYXdhaXQgdHJ5Q2F0Y2goYmF0Y2guZXhlY3V0ZSgpKTtcbiAgICBtb25nby5jbG9zZSgpO1xuXG4gICAgcmVzLnJlZGlyZWN0KCcvJyk7XG4gIH0sXG5cbiAgZ2V0TmV3Q2FyZHMocmVxLCByZXMpIHtcbiAgICBnZXRDb2xsZWN0aW9uKHJlcSwgcmVzLCAnbmV3Q2FyZHMnKTtcbiAgfSxcblxuICBnZXRPbGRDYXJkcyhyZXEsIHJlcykge1xuICAgIGdldENvbGxlY3Rpb24ocmVxLCByZXMsICdvbGRDYXJkcycpO1xuICB9LFxuXG4gIGFzeW5jIHdlZWtseU1vbnRobHlSZXNldChyZXNldFdlZWtseVN0YXRzLCByZXNldE1vbnRobHlTdGF0cykge1xuICAgIGNvbnN0IG1vbmdvID0gYXdhaXQgdHJ5Q2F0Y2goTW9uZ29DbGllbnQuY29ubmVjdCh1cmwpKTtcbiAgICBjb25zdCBjb2xsZWN0aW9uID0gbW9uZ28uZGIoREIpLmNvbGxlY3Rpb24oJ3Njb3JlYm9hcmQnKTtcblxuICAgIGNvbnN0IHplcm8gPSB7XG4gICAgICBzY29yZTogMCxcbiAgICAgIGF0dGVtcHRzOiAwLFxuICAgICAgY29ycmVjdDogMFxuICAgIH07XG4gICAgY29uc3QgcmVzZXQgPSB7ICRzZXQ6IHt9IH07XG4gICAgaWYgKHJlc2V0V2Vla2x5U3RhdHMpXG4gICAgICByZXNldC4kc2V0LndlZWtseVN0YXRzID0gemVybztcblxuICAgIGlmIChyZXNldE1vbnRobHlTdGF0cylcbiAgICAgIHJlc2V0LiRzZXQubW9udGhseVN0YXRzID0gemVybztcblxuICAgIGNvbGxlY3Rpb24udXBkYXRlKFxuICAgICAge30sIHJlc2V0LCB7IG11bHRpOiB0cnVlIH1cbiAgICApO1xuXG4gICAgbW9uZ28uY2xvc2UoKTtcbiAgfSxcblxuICBhc3luYyBnZXRDYXJkcyhyZXEsIHJlcykge1xuICAgIGNvbnN0IHsgaWRzIH0gPSByZXEucXVlcnk7XG4gICAgY29uc3QgbW9uZ28gPSBhd2FpdCB0cnlDYXRjaChNb25nb0NsaWVudC5jb25uZWN0KHVybCkpO1xuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSBtb25nby5kYihEQikuY29sbGVjdGlvbignb2xkQ2FyZHMnKTtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgdHJ5Q2F0Y2goXG4gICAgICBjb2xsZWN0aW9uLmZpbmQoe2NhcmRJZDogeyRpbjogaWRzfX0pXG4gICAgICAgICAgICAgICAgLnByb2plY3Qoe19pZDogMCwgbWVkaWFVcmxzOiAxLCBxdWVzdGlvblRleHQ6IDEsIGFuc3dlcnM6IDF9KVxuICAgICAgICAgICAgICAgIC50b0FycmF5KClcbiAgICApO1xuXG4gICAgY29uc3QgY2xlYW5EYXRhID0gZGF0YS5tYXAoY2FyZCA9PiB7XG4gICAgICBjYXJkLnF1ZXN0aW9uVGV4dCA9IGNhcmQucXVlc3Rpb25UZXh0LnNwbGl0KCdcXG4nKVswXTtcbiAgICAgIGNvbnN0IHMgPSBjYXJkLmFuc3dlcnMubGVuZ3RoID4gMSA/ICdzJyA6ICcnO1xuICAgICAgY2FyZC5hbnN3ZXJzID0gYEFuc3dlciR7c306ICR7Y2FyZC5hbnN3ZXJzLmpvaW4oJywgJyl9YDtcbiAgICAgIGNhcmQubWVkaWFVcmwgPSAoY2FyZC5tZWRpYVVybHMubGVuZ3RoID09PSAzKVxuICAgICAgICA/IGNhcmQubWVkaWFVcmxzWzFdXG4gICAgICAgIDogY2FyZC5tZWRpYVVybHNbMF07XG5cbiAgICAgIGRlbGV0ZSBjYXJkLm1lZGlhVXJscztcbiAgICAgIHJldHVybiBjYXJkO1xuICAgIH0pO1xuXG4gICAgcmVzLmpzb24oY2xlYW5EYXRhKTtcbiAgICBtb25nby5jbG9zZSgpO1xuICB9XG5cbn0gLy8gbW9kdWxlLmV4cG9ydHNcblxuXG5hc3luYyBmdW5jdGlvbiBnZXRDb2xsZWN0aW9uKHJlcSwgcmVzLCBjb2xsZWN0aW9uTmFtZSkge1xuICBjb25zdCBtb25nbyA9IGF3YWl0IHRyeUNhdGNoKE1vbmdvQ2xpZW50LmNvbm5lY3QodXJsKSk7XG4gIGNvbnN0IGNvbGxlY3Rpb24gPSBtb25nby5kYihEQikuY29sbGVjdGlvbihjb2xsZWN0aW9uTmFtZSk7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCB0cnlDYXRjaChcbiAgICBjb2xsZWN0aW9uLmZpbmQoKVxuICAgICAgICAgICAgICAucHJvamVjdCh7X2lkOiAwfSlcbiAgICAgICAgICAgICAgLnRvQXJyYXkoKVxuICApO1xuICByZXMuanNvbihkYXRhKTtcbiAgbW9uZ28uY2xvc2UoKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlTGl2ZVF1ZXN0aW9uKG1vbmdvLCBjYXJkSWQpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBjb2xsZWN0aW9uID0gbW9uZ28uZGIoREIpLmNvbGxlY3Rpb24oJ2xpdmVRdWVzdGlvbnMnKTtcbiAgICBjb25zdCBjdXJyZW50UXVlc3Rpb24gPSBhd2FpdCB0cnlDYXRjaChjb2xsZWN0aW9uLmZpbmRPbmUoe2NhcmRJZH0pKTtcbiAgICBhd2FpdCB0cnlDYXRjaChjb2xsZWN0aW9uLnJlbW92ZShjdXJyZW50UXVlc3Rpb24pKTtcbiAgICBhd2FpdCB0cnlDYXRjaChhZGRQb2ludHNUb1Njb3JlYm9hcmQobW9uZ28sIGN1cnJlbnRRdWVzdGlvbikpO1xuICAgIHJlc29sdmUoKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZFBvaW50c1RvU2NvcmVib2FyZChtb25nbywgeyBjYWNoZWRQb2ludHMsIGNhcmRJZCB9KSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3Qgc2NvcmVib2FyZCA9IG1vbmdvLmRiKERCKS5jb2xsZWN0aW9uKCdzY29yZWJvYXJkJyk7XG4gICAgY29uc3Qgb2xkQ2FyZHMgPSBtb25nby5kYihEQikuY29sbGVjdGlvbignb2xkQ2FyZHMnKTtcbiAgICBjb25zdCBhbnN3ZXJQb3N0ZWRBdCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIG9sZENhcmRzLnVwZGF0ZU9uZSh7Y2FyZElkfSwgeyRzZXQ6IHthbnN3ZXJQb3N0ZWRBdH19KTtcblxuICAgIGNvbnN0IG9wcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FjaGVkUG9pbnRzLmxlbmd0aDsgKytpKSB7XG4gICAgICBjb25zdCB7IHVzZXJJZCwgcG9pbnRzIH0gPSBjYWNoZWRQb2ludHNbaV07XG4gICAgICBjb25zdCBvcCA9IHtcbiAgICAgICAgdXBkYXRlT25lOiB7XG4gICAgICAgICAgZmlsdGVyOiB7IHVzZXJJZCB9LFxuICAgICAgICAgIHVwZGF0ZToge1xuICAgICAgICAgICAgJGluYzoge1xuICAgICAgICAgICAgICAnYWxsVGltZVN0YXRzLnNjb3JlJzogcG9pbnRzLFxuICAgICAgICAgICAgICAnbW9udGhseVN0YXRzLnNjb3JlJzogcG9pbnRzLFxuICAgICAgICAgICAgICAnd2Vla2x5U3RhdHMuc2NvcmUnOiAgcG9pbnRzLFxuICAgICAgICAgICAgICAnYWxsVGltZVN0YXRzLmF0dGVtcHRzJzogMSxcbiAgICAgICAgICAgICAgJ21vbnRobHlTdGF0cy5hdHRlbXB0cyc6IDEsXG4gICAgICAgICAgICAgICd3ZWVrbHlTdGF0cy5hdHRlbXB0cyc6ICAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgaWYgKHBvaW50cyA+IDApIHtcbiAgICAgICAgb3AudXBkYXRlT25lLnVwZGF0ZS4kcHVzaCA9IHtcbiAgICAgICAgICAnYWxsVGltZVN0YXRzLmNvcnJlY3QnOiB7XG4gICAgICAgICAgICBhbnN3ZXJQb3N0ZWRBdCxcbiAgICAgICAgICAgIGNhcmRJZCxcbiAgICAgICAgICAgIHBvaW50c1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBvcC51cGRhdGVPbmUudXBkYXRlLiRpbmNbJ21vbnRobHlTdGF0cy5jb3JyZWN0J10gPSAxO1xuICAgICAgICBvcC51cGRhdGVPbmUudXBkYXRlLiRpbmNbJ3dlZWtseVN0YXRzLmNvcnJlY3QnXSAgPSAxO1xuICAgICAgfVxuXG4gICAgICBvcHMucHVzaChvcCk7XG4gICAgfVxuICAgIGlmIChvcHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXNvbHZlKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYXdhaXQgdHJ5Q2F0Y2goc2NvcmVib2FyZC5idWxrV3JpdGUob3BzKSk7XG4gICAgYXdhaXQgdHJ5Q2F0Y2gocmVjYWxjdWxhdGVSYW5rKHNjb3JlYm9hcmQpKTtcbiAgICByZXNvbHZlKCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZWNhbGN1bGF0ZVJhbmsoc2NvcmVib2FyZCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IHN0YXRzID0gYXdhaXQgdHJ5Q2F0Y2goc2NvcmVib2FyZC5hZ2dyZWdhdGUoW1xuICAgICAgeyAkcHJvamVjdDoge1xuICAgICAgICAgIF9pZDogMCxcbiAgICAgICAgICBvcmRlckJ5OiB7ICRsaXRlcmFsOiBbICd3ZWVrbHlTdGF0cycsICdtb250aGx5U3RhdHMnLCAnYWxsVGltZVN0YXRzJyBdIH0sXG4gICAgICAgICAgdXNlcklkOiAxLFxuICAgICAgICAgICdhbGxUaW1lU3RhdHMuc2NvcmUnOiAxLFxuICAgICAgICAgICdhbGxUaW1lU3RhdHMucmFuayc6ICAxLFxuICAgICAgICAgICdtb250aGx5U3RhdHMuc2NvcmUnOiAxLFxuICAgICAgICAgICdtb250aGx5U3RhdHMucmFuayc6ICAxLFxuICAgICAgICAgICd3ZWVrbHlTdGF0cy5zY29yZSc6ICAxLFxuICAgICAgICAgICd3ZWVrbHlTdGF0cy5yYW5rJzogICAxXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7ICR1bndpbmQ6ICckb3JkZXJCeScgfSxcbiAgICAgIHsgJGdyb3VwOlxuICAgICAgICB7IF9pZDpcbiAgICAgICAgICB7IG9yZGVyQnk6ICckb3JkZXJCeScsXG4gICAgICAgICAgICBzY29yZTpcbiAgICAgICAgICAgIHsgJHN3aXRjaDoge1xuICAgICAgICAgICAgICAgIGJyYW5jaGVzOiBbXG4gICAgICAgICAgICAgICAgICAgeyBjYXNlOiB7ICRlcTogWyckb3JkZXJCeScsICd3ZWVrbHlTdGF0cycgXSB9LCB0aGVuOiAnJHdlZWtseVN0YXRzLnNjb3JlJyAgfSxcbiAgICAgICAgICAgICAgICAgICB7IGNhc2U6IHsgJGVxOiBbJyRvcmRlckJ5JywgJ21vbnRobHlTdGF0cyddIH0sIHRoZW46ICckbW9udGhseVN0YXRzLnNjb3JlJyB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogJyRhbGxUaW1lU3RhdHMuc2NvcmUnXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHVzZXJzOiB7ICRwdXNoOiAnJCRDVVJSRU5UJyB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7ICRzb3J0OiB7ICdfaWQuc2NvcmUnOiAtMSB9IH0sXG4gICAgICB7ICRncm91cDpcbiAgICAgICAgeyBfaWQ6ICckX2lkLm9yZGVyQnknLFxuICAgICAgICAgIHNjb3Jlczoge1xuICAgICAgICAgICAgJHB1c2g6IHtcbiAgICAgICAgICAgICAgc2NvcmU6ICckX2lkLnNjb3JlJyxcbiAgICAgICAgICAgICAgdXNlcnM6ICckdXNlcnMnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgXSkudG9BcnJheSgpKTtcblxuICAgIGNvbnN0IHVzZXJzVG9VcGRhdGUgPSB7fTtcbiAgICBjb25zdCBjdXJyZW50UmFua3MgPSB7XG4gICAgICBhbGxUaW1lU3RhdHM6IDEsXG4gICAgICBtb250aGx5U3RhdHM6IDEsXG4gICAgICB3ZWVrbHlTdGF0czogIDFcbiAgICB9O1xuICAgIHN0YXRzLmZvckVhY2goKHsgX2lkOiBjYXRlZ29yeSwgc2NvcmVzIH0pID0+IHtcbiAgICAgIGNvbnN0IGVuZCA9IHNjb3Jlcy5sZW5ndGg7XG4gICAgICBsZXQgaSA9IDA7XG4gICAgICBmb3IgKDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRTdGF0ID0gc2NvcmVzW2ldO1xuICAgICAgICBpZiAoY3VycmVudFN0YXQuc2NvcmUgPT09IDApIGNvbnRpbnVlO1xuXG4gICAgICAgIGN1cnJlbnRTdGF0LnVzZXJzLmZvckVhY2godXNlciA9PiB7XG4gICAgICAgICAgY29uc3QgcHJldmlvdXNSYW5rID0gdXNlcltjYXRlZ29yeV0ucmFuaztcbiAgICAgICAgICBjb25zdCBjdXJyZW50UmFuayA9IGN1cnJlbnRSYW5rc1tjYXRlZ29yeV07XG4gICAgICAgICAgaWYgKHByZXZpb3VzUmFuayAhPT0gY3VycmVudFJhbmspIHtcbiAgICAgICAgICAgIGNvbnN0IGNhY2hlZFVwZGF0ZSA9IHVzZXJzVG9VcGRhdGVbdXNlci51c2VySWRdIHx8IHt9O1xuICAgICAgICAgICAgY2FjaGVkVXBkYXRlW2NhdGVnb3J5XSA9IGN1cnJlbnRSYW5rO1xuICAgICAgICAgICAgdXNlcnNUb1VwZGF0ZVt1c2VyLnVzZXJJZF0gPSBjYWNoZWRVcGRhdGU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY3VycmVudFJhbmtzW2NhdGVnb3J5XSArPSBjdXJyZW50U3RhdC51c2Vycy5sZW5ndGg7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBidWxrVXBkYXRlT3BzID0gW107XG4gICAgY29uc3QgdXNlcklkc1RvVXBkYXRlID0gT2JqZWN0LmtleXModXNlcnNUb1VwZGF0ZSk7XG4gICAgY29uc3QgZW5kID0gdXNlcklkc1RvVXBkYXRlLmxlbmd0aDtcbiAgICBsZXQgaSA9IDA7XG4gICAgZm9yICg7IGkgPCBlbmQ7IGkrKykge1xuICAgICAgY29uc3QgY3VycmVudFVzZXIgPSB1c2VySWRzVG9VcGRhdGVbaV07XG4gICAgICBjb25zdCB1c2VySWQgPSBOdW1iZXIoY3VycmVudFVzZXIpO1xuICAgICAgY29uc3Qgb3AgPSB7XG4gICAgICAgIHVwZGF0ZU9uZToge1xuICAgICAgICAgIGZpbHRlcjogeyB1c2VySWQgfSxcbiAgICAgICAgICB1cGRhdGU6IHtcbiAgICAgICAgICAgICRzZXQ6IHt9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgY29uc3QgdXNlclVwZGF0ZXMgPSB1c2Vyc1RvVXBkYXRlW2N1cnJlbnRVc2VyXTtcbiAgICAgIE9iamVjdC5rZXlzKGN1cnJlbnRSYW5rcykuZm9yRWFjaChjYXRlZ29yeSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld1JhbmsgPSB1c2VyVXBkYXRlc1tjYXRlZ29yeV07XG4gICAgICAgIGlmIChuZXdSYW5rKVxuICAgICAgICAgIG9wLnVwZGF0ZU9uZS51cGRhdGUuJHNldFtgJHtjYXRlZ29yeX0ucmFua2BdID0gbmV3UmFuaztcbiAgICAgIH0pO1xuXG4gICAgICBidWxrVXBkYXRlT3BzLnB1c2gob3ApO1xuXG4gICAgfSAvLyBmb3IgbG9vcFxuXG4gICAgYXdhaXQgdHJ5Q2F0Y2goc2NvcmVib2FyZC5idWxrV3JpdGUoYnVsa1VwZGF0ZU9wcykpO1xuICAgIHJlc29sdmUoKTtcbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZGJPcHMuanMiLCJjb25zdCB0d2l0ID0gcmVxdWlyZSgndHdpdCcpO1xuY29uc3Qge1xuICBUV0lUVEVSX0FQSV9LRVksXG4gIFRXSVRURVJfQVBJX1NFQ1JFVCxcbiAgVFdJVFRFUl9UT0tFTixcbiAgVFdJVFRFUl9UT0tFTl9TRUNSRVQsXG4gIFRXSVRURVJfQUNDT1VOVFxufSA9IHByb2Nlc3MuZW52O1xuXG4vLyBjb25zdCBhcHBDb25maWcgPSB7XG4vLyAgIGNvbnN1bWVyX2tleTogVFdJVFRFUl9BUElfS0VZLFxuLy8gICBjb25zdW1lcl9zZWNyZXQ6IFRXSVRURVJfQVBJX1NFQ1JFVCxcbi8vICAgYXBwX29ubHlfYXV0aDogdHJ1ZVxuLy8gfVxuXG5jb25zdCB1c2VyQ29uZmlnID0ge1xuICBjb25zdW1lcl9rZXk6IFRXSVRURVJfQVBJX0tFWSxcbiAgY29uc3VtZXJfc2VjcmV0OiBUV0lUVEVSX0FQSV9TRUNSRVQsXG4gIGFjY2Vzc190b2tlbjogVFdJVFRFUl9UT0tFTixcbiAgYWNjZXNzX3Rva2VuX3NlY3JldDogVFdJVFRFUl9UT0tFTl9TRUNSRVRcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IHR3aXQodXNlckNvbmZpZyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdHdpdHRlckNvbmZpZy5qcyIsImNvbnN0IHVybGVuY29kZSA9IHJlcXVpcmUoJ3VybGVuY29kZScpO1xuY29uc3QgV0VCTE9PS1VQX1VSTCA9ICdodHRwczovL2VqamUud2VibGlvLmpwL2NvbnRlbnQvJztcbmNvbnN0IHsgVFdJVFRFUl9BQ0NPVU5UIH0gPSBwcm9jZXNzLmVudjtcblxuY29uc3QgSE9VUlMgPSAzNjAwMDAwO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICBIT1VSUyxcblxuICBmb3JtYXRRdWVzdGlvbkFsdFRleHQoZXhwcmVzc2lvbikge1xuICAgIGNvbnN0IGhpbnQgPSBmb3JtYXRIaW50KGV4cHJlc3Npb24pO1xuICAgIGNvbnN0IFttaW4sIG1heF0gPSBtaW5NYXhDaGFycyhoaW50KTtcbiAgICBjb25zdCBtaW5NYXggPSBtaW4gPT09IG1heCA/IG1pbiA6IGAke21pbn0gdG8gJHttYXh9YDtcbiAgICBjb25zdCBzID0gbWF4ID4gMSA/ICdzJyA6ICcnO1xuICAgIGNvbnN0IHNjcmVlblJlYWRlckhpbnQgPSBgKCR7bWluTWF4fSBjaGFyYWN0ZXIke3N9KWA7XG4gICAgcmV0dXJuIGV4cHJlc3Npb24ucmVwbGFjZSgvXFx7XFx7Lis/XFx9XFx9L2csIHNjcmVlblJlYWRlckhpbnQpO1xuICB9LFxuXG4gIGZvcm1hdFF1ZXN0aW9uVGV4dChleHByZXNzaW9uLCBlbmdNZWFuaW5nLCBub3RlcywgY2FyZElEKSB7XG4gICAgY29uc3QgaGludCA9IGZvcm1hdEhpbnQoZXhwcmVzc2lvbik7XG4gICAgY29uc3QgW21pbiwgbWF4XSA9IG1pbk1heENoYXJzKGhpbnQpO1xuICAgIGNvbnN0IG1pbk1heCA9IG1pbiA9PT0gbWF4ID8gbWluIDogYCR7bWlufS0ke21heH1gO1xuICAgIGxldCB0d2VldFRleHQgPSBgV2hhdCAke21pbk1heH0gY2hhcmFjdGVyIGFuc3dlciBtZWFucyBcIiR7ZW5nTWVhbmluZ31cIj9gO1xuICAgIGlmIChuZWVkc0hpbnQoaGludCkpXG4gICAgICB0d2VldFRleHQgKz0gYFxcbkhpbnQ6ICR7aGludH1gO1xuXG4gICAgaWYgKG5vdGVzKSB0d2VldFRleHQgKz0gYFxcbk5vdGVzOiAke25vdGVzfWA7XG5cbiAgICB0d2VldFRleHQgKz0gYFxcblFJRCR7Y2FyZElEfWA7XG4gICAgcmV0dXJuIHR3ZWV0VGV4dDtcbiAgfSxcblxuICBmb3JtYXRBbnN3ZXJBbHRUZXh0KGV4cHJlc3Npb24pIHtcbiAgICByZXR1cm4gZXhwcmVzc2lvbi5yZXBsYWNlKC9cXHtcXHsuKj9cXDpcXDooLis/KVxcOlxcOi4qP1xcfVxcfS9nLCAnJDEnKTtcbiAgfSxcblxuICBmb3JtYXRBbnN3ZXJUZXh0KGFuc3dlcnMsIGVuZ01lYW5pbmcsIHdlYkxvb2t1cCwgY2FyZElkKSB7XG4gICAgY29uc3QgcyA9IGFuc3dlcnMubGVuZ3RoID4gMSA/ICdzJyA6ICcnO1xuICAgIGxldCBhbnN3ZXJUZXh0ID0gYEFuc3dlciR7c306ICR7YW5zd2Vycy5qb2luKCcsICcpfWA7XG4gICAgYW5zd2VyVGV4dCArPSBgXFxuRW5nbGlzaCBNZWFuaW5nOiBcIiR7ZW5nTWVhbmluZ31cImA7XG4gICAgYW5zd2VyVGV4dCArPSAnXFxuRGVmaW5pdGlvbjogJyArIFdFQkxPT0tVUF9VUkwgKyB1cmxlbmNvZGUod2ViTG9va3VwKTtcbiAgICBhbnN3ZXJUZXh0ICs9IGBcXG5RSUQke2NhcmRJZH1gO1xuICAgIHJldHVybiBhbnN3ZXJUZXh0O1xuICB9LFxuXG4gIGFkZFF1ZXN0aW9uTGluayhhbnN3ZXJUZXh0LCBxdWVzdGlvbklkKSB7XG4gICAgY29uc3QgcXVlc3Rpb25MaW5rID0gYFF1ZXN0aW9uOiB0d2l0dGVyLmNvbS8ke1RXSVRURVJfQUNDT1VOVH0vc3RhdHVzLyR7cXVlc3Rpb25JZH1gO1xuICAgIGNvbnN0IGxpbmVzID0gYW5zd2VyVGV4dC5zcGxpdCgnXFxuJyk7XG4gICAgbGluZXMuc3BsaWNlKC0xLCAwLCBxdWVzdGlvbkxpbmspO1xuICAgIHJldHVybiBsaW5lcy5qb2luKCdcXG4nKTtcbiAgfSxcblxuICBnZXRBbnN3ZXJzKGV4cHJlc3Npb24sIGFsdEFuc3dlcnMpIHtcbiAgICBjb25zdCBhY2NlcHRlZEFuc3dlciA9IGV4cHJlc3Npb24ubWF0Y2goL1xcOlxcOiguKz8pXFw6XFw6LylbMV07XG4gICAgbGV0IG90aGVyQW5zd2VycyA9IFtdO1xuICAgIGlmIChhbHRBbnN3ZXJzICYmIGFsdEFuc3dlcnMubGVuZ3RoID4gMClcbiAgICAgIG90aGVyQW5zd2VycyA9IGFsdEFuc3dlcnMuc3BsaXQoJywnKTtcblxuICAgIHJldHVybiBbYWNjZXB0ZWRBbnN3ZXJdLmNvbmNhdChvdGhlckFuc3dlcnMpO1xuICB9LFxuXG4gIGNhbGN1bGF0ZVNjb3JlKGFuc3dlclBvc3RlZEF0LCB7cXVlc3Rpb25Qb3N0ZWRBdCwgYWxyZWFkeUFuc3dlcmVkfSkge1xuICAgIGNvbnN0IHRpbWVUb0Fuc3dlciA9IE1hdGguZmxvb3IoXG4gICAgICAobmV3IERhdGUoYW5zd2VyUG9zdGVkQXQpIC0gbmV3IERhdGUocXVlc3Rpb25Qb3N0ZWRBdCkpIC8gSE9VUlNcbiAgICApO1xuICAgIGNvbnN0IHNjb3JlID0gMjQgLSB0aW1lVG9BbnN3ZXI7XG5cbiAgICByZXR1cm4gTWF0aC5tYXgoc2NvcmUsIDApO1xuICB9LFxuXG4gIGV4dHJhY3RBbnN3ZXIodGV4dCkge1xuICAgIHJldHVybiB0ZXh0LnRyaW0oKS5zbGljZShUV0lUVEVSX0FDQ09VTlQubGVuZ3RoICsgMik7XG4gIH0sXG5cbiAgZ2V0VGltZVVudGlsKGhvdXIpIHtcbiAgICAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80NDU1MjgyL2NhbGwtYS1qYXZhc2NyaXB0LWZ1bmN0aW9uLWF0LWEtc3BlY2lmaWMtdGltZS1vZi1kYXlcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IG1pbGxpc1VudGlsVGltZSA9IG5ldyBEYXRlKFxuICAgICAgbm93LmdldEZ1bGxZZWFyKCksXG4gICAgICBub3cuZ2V0TW9udGgoKSxcbiAgICAgIG5vdy5nZXREYXRlKCksXG4gICAgICBob3VyLCAwLCAwLCAwKSAtIG5vdztcblxuICAgIGlmIChtaWxsaXNVbnRpbFRpbWUgPCAwKSAvLyBhbHJlYWR5IHBhc3NlZCBmb3IgdG9kYXksIHdhaXQgdW50aWwgdG9tb3Jyb3dcbiAgICAgIG1pbGxpc1VudGlsVGltZSArPSAyNCpIT1VSUztcblxuICAgIHJldHVybiBtaWxsaXNVbnRpbFRpbWU7XG4gIH0sXG5cbiAgdHJ5Q2F0Y2gocHJvbWlzZSkge1xuICAgcmV0dXJuIHByb21pc2VcbiAgICAgLnRoZW4oZGF0YSA9PiBkYXRhKVxuICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvcjonLGVycik7XG4gICAgICAgcmV0dXJuIHt9O1xuICAgICB9KTtcbiAgfSxcblxuICBjb250YWlucyhpdGVtLCBsaXN0KSB7XG4gICAgcmV0dXJuIHZhbGlkKGxpc3QuaW5kZXhPZihpdGVtKSk7XG4gIH1cblxufSAvLyBtb2R1bGUuZXhwb3J0c1xuXG5cbmZ1bmN0aW9uIHZhbGlkKGluZGV4KSB7XG4gIHJldHVybiBpbmRleCAhPT0gLTE7XG59XG5cbmZ1bmN0aW9uIG5lZWRzSGludChoaW50KSB7XG4gIHJldHVybiBoaW50LnJlcGxhY2UoL1xcW1xcXS9nLCAnJykudHJpbSgpLmxlbmd0aCAhPT0gMDtcbn1cblxuZnVuY3Rpb24gbWF4Q2hhcnMoaGludCkge1xuICBjb25zdCBtaXNzaW5nQ2hhclJlZ2V4ID0gL1xcWy4qP1xcXS9nO1xuICBjb25zdCBtaXNzaW5nQ2hhcnMgPSAoaGludC5tYXRjaChtaXNzaW5nQ2hhclJlZ2V4KSB8fCBbXSkubGVuZ3RoXG4gIGNvbnN0IGdpbW1lQ2hhcnMgPSBoaW50LnJlcGxhY2UobWlzc2luZ0NoYXJSZWdleCwgJycpLnJlcGxhY2UoL1tcXHMrXFwoXFwpXS9nLCAnJykubGVuZ3RoO1xuXG4gIHJldHVybiBtaXNzaW5nQ2hhcnMgKyBnaW1tZUNoYXJzO1xufVxuXG5mdW5jdGlvbiBtaW5DaGFycyhoaW50KSB7XG4gIGNvbnN0IG9wdGlvbmFsQ2hhcnMgPSAoaGludC5tYXRjaCgvXFw/L2cpIHx8IFtdKS5sZW5ndGhcbiAgcmV0dXJuIG1heENoYXJzKGhpbnQpIC0gb3B0aW9uYWxDaGFycztcbn1cblxuZnVuY3Rpb24gbWluTWF4Q2hhcnMoaGludCkge1xuICByZXR1cm4gW21pbkNoYXJzKGhpbnQpLCBtYXhDaGFycyhoaW50KV07XG59XG5cbmZ1bmN0aW9uIGZvcm1hdEhpbnQoZXhwcmVzc2lvbikge1xuICBjb25zdCBsZWdlbmQgPSBleHByZXNzaW9uLm1hdGNoKC9cXDpcXDouKz9cXDpcXDooLis/KVxcfVxcfS8pWzFdO1xuICBjb25zdCBub3JtYWxpemVkID0gZ3JvdXBNdWx0aVhzKGdyb3VwWHMoZ3JvdXBRdWVzdGlvbk1hcmtzKGxlZ2VuZCkpKTtcblxuICByZXR1cm4gZmxhdHRlbihzcGxpdChub3JtYWxpemVkKSkubWFwKGdyb3VwID0+IHtcbiAgICBpZiAoZ3JvdXAgPT09ICcuJylcbiAgICAgIHJldHVybiAnW10nO1xuXG4gICAgaWYgKGdyb3VwID09PSAnLScpXG4gICAgICByZXR1cm4gJ1tdIFtdIFtdIFtdIFtdJ1xuXG4gICAgaWYgKC9cXD8vLnRlc3QoZ3JvdXApKSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICAgIGNvbnN0IG51bUNoYXJzID0gTnVtYmVyKGdyb3VwLm1hdGNoKC9cXGQrLylbMF0pXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bUNoYXJzOyBpKyspXG4gICAgICAgIHJlc3VsdC5wdXNoKCdbP10nKVxuXG4gICAgICBpZiAocmVzdWx0Lmxlbmd0aCA9PT0gMSlcbiAgICAgICAgcmV0dXJuICdbP10nO1xuXG4gICAgICByZXR1cm4gJygnICsgcmVzdWx0LmpvaW4oJyAnKSArICcpJ1xuICAgIH1cblxuICAgIGlmICgv4omgLy50ZXN0KGdyb3VwKSkge1xuICAgICAgY29uc3QgbmVnYXRlZENoYXJzID0gZ3JvdXAucmVwbGFjZSgv4omgL2csICcnKTtcbiAgICAgIHJldHVybiBgW+KJoCR7bmVnYXRlZENoYXJzfV1gXG4gICAgfVxuICAgIC8vIGVsc2UgKGNoYXJhY3RlciBnaW1tZSlcbiAgICByZXR1cm4gZ3JvdXA7XG4gIH0pLmpvaW4oJyAnKTtcbn1cblxuZnVuY3Rpb24gZ3JvdXBRdWVzdGlvbk1hcmtzKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoLyhcXD8rKS9nLCAobWF0Y2gsIHAxKSA9PiBgKCR7cDEubGVuZ3RofT8pYCk7XG59XG5cbmZ1bmN0aW9uIGdyb3VwWHMoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcucmVwbGFjZSgv4omgW14oXS9nLCAnKCQmKScpO1xufVxuXG5mdW5jdGlvbiBncm91cE11bHRpWHMoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcucmVwbGFjZSgv4omgXFwoKC4qKVxcKS9nLCAnKOKJoCQxKScpXG59XG5cbmZ1bmN0aW9uIHNwbGl0KHN0cikge1xuICByZXR1cm4gc3RyLnNwbGl0KC9bXFwoXFwpXS8pXG4gICAgICAgICAgICAubWFwKGdyb3VwID0+XG4gICAgICAgICAgICAgIC9cXD984omgLy50ZXN0KGdyb3VwKVxuICAgICAgICAgICAgICA/IGdyb3VwXG4gICAgICAgICAgICAgIDogZ3JvdXAuc3BsaXQoJycpXG4gICAgICAgICAgICApO1xufVxuXG5mdW5jdGlvbiBzY2FsYXIodikge1xuICByZXR1cm4gIUFycmF5LmlzQXJyYXkodik7XG59XG5cbmZ1bmN0aW9uIGZsYXR0ZW4oZGVlcCwgZmxhdCA9IFtdKSB7XG4gIGlmIChkZWVwLmxlbmd0aCA9PT0gMClcbiAgICByZXR1cm4gZmxhdDtcblxuICBsZXQgW2hlYWQsIC4uLnRhaWxdID0gZGVlcDtcbiAgcmV0dXJuIHNjYWxhcihoZWFkKVxuICAgID8gZmxhdHRlbih0YWlsLCBmbGF0LmNvbmNhdChoZWFkKSlcbiAgICA6IGZsYXR0ZW4odGFpbCwgZmxhdC5jb25jYXQoZmxhdHRlbihoZWFkKSkpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWxzL3V0aWxzLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQGJhYmVsL3BvbHlmaWxsXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiQGJhYmVsL3BvbHlmaWxsXCJcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09ICdkZXYnKVxuICByZXF1aXJlKCdkb3RlbnYnKS5jb25maWcoKTtcblxuY29uc3QgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCBib2R5UGFyc2VyID0gcmVxdWlyZSgnYm9keS1wYXJzZXInKTtcbmNvbnN0IHR3aXR0ZXJCb3QgPSByZXF1aXJlKCcuL3R3aXR0ZXJCb3QnKTtcblxuYXBwLnNldCgncG9ydCcsIChwcm9jZXNzLmVudi5QT1JUIHx8IDMwMDApKTtcbmFwcC51c2UoZXhwcmVzcy5zdGF0aWMocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uL2Rpc3QnKSkpO1xuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XG5cbnJlcXVpcmUoJy4vYXBpJykoYXBwKTtcblxudHdpdHRlckJvdC5zdGFydCgpO1xuXG5hcHAubGlzdGVuKGFwcC5nZXQoJ3BvcnQnKSwgKCkgPT5cbiAgY29uc29sZS5sb2coJ0xpc3RlbmluZyBvbiBwb3J0JywgYXBwLmdldCgncG9ydCcpKVxuKTtcblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gYXBwO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NlcnZlci5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImRvdGVudlwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImRvdGVudlwiXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJleHByZXNzXCJcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYm9keS1wYXJzZXJcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJib2R5LXBhcnNlclwiXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBEQiA9IHJlcXVpcmUoJy4vZGJPcHMnKTtcbmNvbnN0IHtcbiAgSE9VUlMsXG4gIGFkZFF1ZXN0aW9uTGluayxcbiAgY2FsY3VsYXRlU2NvcmUsXG4gIGNvbnRhaW5zLFxuICBleHRyYWN0QW5zd2VyLFxuICBnZXRGb2xsb3dpbmcsXG4gIGdldFRpbWVVbnRpbCxcbiAgcG9zdE1lZGlhLFxuICB0cnlDYXRjaFxufSA9IHJlcXVpcmUoJ1V0aWxzJyk7XG5jb25zdCBUd2l0dGVyID0gcmVxdWlyZSgnLi90d2l0dGVyQ29uZmlnJyk7XG5jb25zdCB7IFRXSVRURVJfQUNDT1VOVCB9ID0gcHJvY2Vzcy5lbnY7XG5cbmNvbnN0IEFOU1dFUl9JTlRFUlZBTCA9IDQwMDAwO1xubGV0IFFVRVNUSU9OX0lOVEVSVkFMID0gMTAwMDA7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzdGFydDogKCkgPT4ge1xuICAgIG9wZW5TdHJlYW0oKTtcbiAgICBzZXRJbnRlcnZhbCh0d2VldFJhbmRvbVF1ZXN0aW9uLCBRVUVTVElPTl9JTlRFUlZBTCk7XG4gIH1cbiAgLy8gc3RhcnQ6ICgpID0+IHtcbiAgLy8gICBvcGVuU3RyZWFtKCk7XG4gIC8vICAgc2V0U3RhcnRUaW1lcygpO1xuICAvLyB9XG59O1xuXG5mdW5jdGlvbiBzZXRTdGFydFRpbWVzKCkge1xuICBjb25zdCB0aW1lVW50aWw3UE0gPSBnZXRUaW1lVW50aWwoMTkpO1xuICBjb25zdCB0aW1lVW50aWxNaWRuaWdodCA9IGdldFRpbWVVbnRpbCgwKTtcblxuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBzZXRJbnRlcnZhbCh0d2VldFJhbmRvbVF1ZXN0aW9uLCBRVUVTVElPTl9JTlRFUlZBTCk7XG4gIH0sIHRpbWVVbnRpbDdQTSk7XG5cbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgc2V0SW50ZXJ2YWwod2Vla2x5TW9udGhseVJlc2V0LCAyNCpIT1VSUyk7XG4gIH0sIHRpbWVVbnRpbE1pZG5pZ2h0KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gdHdlZXRSYW5kb21RdWVzdGlvbigpIHtcbiAgY29uc3Qge1xuICAgIGNhcmRJZCxcbiAgICBxdWVzdGlvblRleHQsXG4gICAgcXVlc3Rpb25JbWcsXG4gICAgcXVlc3Rpb25BbHRUZXh0LFxuICAgIHByZXZMaW5lSW1nLFxuICAgIHByZXZMaW5lQWx0VGV4dCxcbiAgICBhbnN3ZXJzXG4gIH0gPSBhd2FpdCB0cnlDYXRjaChEQi5nZXRSYW5kb21RdWVzdGlvbigpKTtcbiAgaWYgKCFjYXJkSWQpIHJldHVybjtcblxuICBjb25zdCB7XG4gICAgcXVlc3Rpb25JZCxcbiAgICBxdWVzdGlvblBvc3RlZEF0LFxuICAgIG1lZGlhVXJsc1xuICB9ID0gYXdhaXQgdHJ5Q2F0Y2goXG4gICAgcG9zdE1lZGlhKFxuICAgICAgcXVlc3Rpb25UZXh0LFxuICAgICAgcXVlc3Rpb25JbWcsXG4gICAgICBxdWVzdGlvbkFsdFRleHQsXG4gICAgICBwcmV2TGluZUltZyxcbiAgICAgIHByZXZMaW5lQWx0VGV4dFxuICAgIClcbiAgKTtcblxuICBjb25zdCBsaXZlUXVlc3Rpb24gPSB7XG4gICAgY2FyZElkLFxuICAgIHF1ZXN0aW9uSWQsXG4gICAgcXVlc3Rpb25UZXh0LFxuICAgIGFuc3dlcnMsXG4gICAgcXVlc3Rpb25Qb3N0ZWRBdCxcbiAgICBjYWNoZWRQb2ludHM6IFtdLFxuICAgIGFscmVhZHlBbnN3ZXJlZDogW11cbiAgfTtcbiAgREIuYWRkTGl2ZVF1ZXN0aW9uKGxpdmVRdWVzdGlvbiwgbWVkaWFVcmxzKTtcbiAgc2V0VGltZW91dCgoKSA9PiB0d2VldEFuc3dlcihjYXJkSWQsIHF1ZXN0aW9uSWQpLCBBTlNXRVJfSU5URVJWQUwpO1xufVxuXG5hc3luYyBmdW5jdGlvbiB0d2VldEFuc3dlcihjYXJkSWQsIHF1ZXN0aW9uSWQpIHtcbiAgY29uc3Qge1xuICAgIGFuc3dlclRleHQsXG4gICAgYW5zd2VySW1nLFxuICAgIGFuc3dlckFsdFRleHRcbiAgfSA9IGF3YWl0IHRyeUNhdGNoKFxuICAgIC8vIEVGRkVDVFM6XG4gICAgLy8gLSByZW1vdmVzIHF1ZXN0aW9uIGZyb20gbGl2ZVF1ZXN0aW9uc1xuICAgIC8vIC0gYWRkcyBjYWNoZWQgcG9pbnRzIHRvIHNjb3JlYm9hcmRcbiAgICAvL1xuICAgIC8vIFJFVFVSTlM6XG4gICAgLy8gQW5zd2VyQ2FyZFxuICAgIERCLnJldmVhbEFuc3dlcldvcmtmbG93KGNhcmRJZClcbiAgKTtcblxuICBjb25zdCB7IG1lZGlhVXJscyB9ID0gYXdhaXQgdHJ5Q2F0Y2goXG4gICAgcG9zdE1lZGlhKFxuICAgICAgYWRkUXVlc3Rpb25MaW5rKGFuc3dlclRleHQsIHF1ZXN0aW9uSWQpLFxuICAgICAgYW5zd2VySW1nLFxuICAgICAgYW5zd2VyQWx0VGV4dFxuICAgIClcbiAgKTtcblxuICBEQi5hZGRNZWRpYVVybHNUb0NhcmQoY2FyZElkLCBtZWRpYVVybHMpO1xufVxuXG5mdW5jdGlvbiBvcGVuU3RyZWFtKCkge1xuICBjb25zdCBzdHJlYW0gPSBUd2l0dGVyLnN0cmVhbSgnc3RhdHVzZXMvZmlsdGVyJywgeyB0cmFjazogYEAke1RXSVRURVJfQUNDT1VOVH1gIH0pO1xuXG4gIHN0cmVhbS5vbigndHdlZXQnLCBhc3luYyAoe1xuICAgIGluX3JlcGx5X3RvX3N0YXR1c19pZF9zdHI6IHF1ZXN0aW9uSWQsXG4gICAgY3JlYXRlZF9hdDogYW5zd2VyUG9zdGVkQXQsXG4gICAgdGV4dCxcbiAgICB1c2VyOiB7XG4gICAgICBpZDogdXNlcklkLFxuICAgICAgbmFtZSxcbiAgICAgIHNjcmVlbl9uYW1lOiBoYW5kbGUsXG4gICAgICBwcm9maWxlX2ltYWdlX3VybF9odHRwczogYXZhdGFyLFxuICAgICAgcHJvZmlsZV9iYW5uZXJfdXJsOiBwcm9maWxlQmFubmVyXG4gICAgfVxuICB9KSA9PiB7XG4gICAgY29uc3QgbGl2ZVF1ZXN0aW9ucyA9IGF3YWl0IHRyeUNhdGNoKERCLmdldExpdmVRdWVzdGlvbnMoKSk7XG4gICAgY29uc3QgZm91bmRRdWVzdGlvbiA9IGxpdmVRdWVzdGlvbnMuZmluZChcbiAgICAgIHF1ZXN0aW9uQ2FyZCA9PiBxdWVzdGlvbkNhcmQucXVlc3Rpb25JZCA9PT0gcXVlc3Rpb25JZFxuICAgICk7XG5cbiAgICBpZiAoZm91bmRRdWVzdGlvbikge1xuICAgICAgY29uc3Qge1xuICAgICAgICBhbHJlYWR5QW5zd2VyZWQsXG4gICAgICAgIGFuc3dlcnM6IGFjY2VwdGVkQW5zd2Vyc1xuICAgICAgfSA9IGZvdW5kUXVlc3Rpb247XG4gICAgICBpZiAoY29udGFpbnModXNlcklkLCBhbHJlYWR5QW5zd2VyZWQpKVxuICAgICAgICByZXR1cm47XG5cbiAgICAgIGNvbnN0IGZvbGxvd2luZyA9IGF3YWl0IHRyeUNhdGNoKGdldEZvbGxvd2luZyh1c2VySWQpKTtcbiAgICAgIGNvbnN0IG5ld1VzZXIgPSB7XG4gICAgICAgIHVzZXJJZCxcbiAgICAgICAgbmFtZSxcbiAgICAgICAgaGFuZGxlLFxuICAgICAgICBhdmF0YXIsXG4gICAgICAgIHByb2ZpbGVCYW5uZXIsXG4gICAgICAgIGZvbGxvd2luZyxcbiAgICAgICAgYWxsVGltZVN0YXRzOiB7XG4gICAgICAgICAgc2NvcmU6IDAsXG4gICAgICAgICAgYXR0ZW1wdHM6IDAsXG4gICAgICAgICAgY29ycmVjdDogW11cbiAgICAgICAgfSxcbiAgICAgICAgbW9udGhseVN0YXRzOiB7XG4gICAgICAgICAgc2NvcmU6IDAsXG4gICAgICAgICAgYXR0ZW1wdHM6IDAsXG4gICAgICAgICAgY29ycmVjdDogMFxuICAgICAgICB9LFxuICAgICAgICB3ZWVrbHlTdGF0czoge1xuICAgICAgICAgIHNjb3JlOiAwLFxuICAgICAgICAgIGF0dGVtcHRzOiAwLFxuICAgICAgICAgIGNvcnJlY3Q6IDBcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIERCLmFkZE9yVXBkYXRlVXNlcihuZXdVc2VyKTtcblxuICAgICAgY29uc3QgdXNlckFuc3dlciA9IGV4dHJhY3RBbnN3ZXIodGV4dCk7XG4gICAgICBpZiAoY29udGFpbnModXNlckFuc3dlciwgYWNjZXB0ZWRBbnN3ZXJzKSkge1xuICAgICAgICBjb25zdCBwb2ludHMgPSBjYWxjdWxhdGVTY29yZShhbnN3ZXJQb3N0ZWRBdCwgZm91bmRRdWVzdGlvbik7XG4gICAgICAgIERCLnVwZGF0ZUxpdmVRdWVzdGlvbihxdWVzdGlvbklkLCB7IHVzZXJJZCwgcG9pbnRzIH0pO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBEQi51cGRhdGVMaXZlUXVlc3Rpb24ocXVlc3Rpb25JZCwgeyB1c2VySWQsIHBvaW50czogMCB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHN0cmVhbS5vbignZGlzY29ubmVjdCcsIChkaXNjb25uZWN0TXNnKSA9PiB7XG4gICAgY29uc29sZS5lcnJvcignVHdlZXQgc3RyZWFtIGRpc2Nvbm5lY3RlZDonLCBkaXNjb25uZWN0TXNnKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHN0cmVhbS5zdGFydCgpLCAxMDApO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gd2Vla2x5TW9udGhseVJlc2V0KCkge1xuICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICBjb25zdCByZXNldFdlZWtseVN0YXRzID0gbm93LmdldERheSgpID09PSAwO1xuICBjb25zdCByZXNldE1vbnRobHlTdGF0cyA9IG5vdy5nZXREYXRlKCkgPT09IDE7XG5cbiAgaWYgKHJlc2V0V2Vla2x5U3RhdHMgfHwgcmVzZXRNb250aGx5U3RhdHMpXG4gICAgREIud2Vla2x5TW9udGhseVJlc2V0KHJlc2V0V2Vla2x5U3RhdHMsIHJlc2V0TW9udGhseVN0YXRzKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy90d2l0dGVyQm90LmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9uZ29kYlwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIm1vbmdvZGJcIlxuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuY29uc3QgUE5HID0gcmVxdWlyZSgncG5nanMyJykuUE5HO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IHVuemlwID0gcmVxdWlyZSgndW56aXAtc3RyZWFtJyk7XG5jb25zdCBVUExPQURTX1BBVEggPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vdXBsb2FkcycpO1xuY29uc3Qge1xuICBmb3JtYXRRdWVzdGlvbkFsdFRleHQsXG4gIGZvcm1hdFF1ZXN0aW9uVGV4dCxcbiAgZm9ybWF0QW5zd2VyQWx0VGV4dCxcbiAgZm9ybWF0QW5zd2VyVGV4dCxcbiAgZ2V0QW5zd2VycyxcbiAgdHJ5Q2F0Y2hcbn0gPSByZXF1aXJlKCdVdGlscycpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBwcm9jZXNzVXBsb2FkLFxuICBwYXJzZUFua2lKc29uLFxuICBvcHRpbWl6ZUltYWdlc1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzVXBsb2FkKHppcGZpbGVQYXRoKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3Qgc3RyZWFtID0gZnMuY3JlYXRlUmVhZFN0cmVhbSh6aXBmaWxlUGF0aClcbiAgICAgIC5waXBlKHVuemlwLkV4dHJhY3QoeyBwYXRoOiAndXBsb2FkcycgfSkpO1xuXG4gICAgc3RyZWFtLm9uKCdjbG9zZScsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGZpbGVzID0gZnMucmVhZGRpclN5bmMoVVBMT0FEU19QQVRIKTtcbiAgICAgIGF3YWl0IHRyeUNhdGNoKG9wdGltaXplSW1hZ2VzKFVQTE9BRFNfUEFUSCArICcvbWVkaWEnKSk7XG4gICAgICBjb25zb2xlLmxvZygnRmluaXNoZWQgb3B0aW1pemluZyBpbWFnZXMhJyk7XG4gICAgICBjb25zdCBuZXdDYXJkcyA9IGV4dHJhY3RDYXJkSW5mbyhmaWxlcyk7XG5cbiAgICAgIGNsZWFuVXAoZmlsZXMpO1xuICAgICAgcmVzb2x2ZShuZXdDYXJkcyk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBvcHRpbWl6ZUltYWdlcyhkaXJQYXRoKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgZmlsZXNQcm9jZXNzaW5nID0gW107XG4gICAgZnMucmVhZGRpclN5bmMoZGlyUGF0aCkuZm9yRWFjaChmaWxlID0+IHtcbiAgICAgIGlmICgvLipcXC5wbmckLy50ZXN0KGZpbGUpKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRGaWxlID0gZGlyUGF0aCArIFwiL1wiICsgZmlsZTtcbiAgICAgICAgY29uc3QgY29udGVudHMgPSBmcy5yZWFkRmlsZVN5bmMoY3VycmVudEZpbGUpO1xuICAgICAgICBjb25zdCB3cml0ZVN0cmVhbSA9IGZzLmNyZWF0ZVdyaXRlU3RyZWFtKGN1cnJlbnRGaWxlKTtcbiAgICAgICAgY29uc3QgY3VycmVudEltYWdlID0gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PlxuICAgICAgICAgIHdyaXRlU3RyZWFtLm9uKCdjbG9zZScsIHJlcylcbiAgICAgICAgKTtcbiAgICAgICAgZmlsZXNQcm9jZXNzaW5nLnB1c2goY3VycmVudEltYWdlKTtcbiAgICAgICAgbmV3IFBORyh7IGZpbHRlclR5cGU6IDQsIGRlZmxhdGVMZXZlbDogMSB9KVxuICAgICAgICAgIC5wYXJzZShjb250ZW50cywgKGVyciwgcG5nKSA9PiB7XG4gICAgICAgICAgICAvLyBHaXZlIHVwcGVyIGxlZnQgcGl4ZWwgYW4gb3BhY2l0eVxuICAgICAgICAgICAgLy8gb2YgMjU0IHNvIFR3aXR0ZXIgd29uJ3QgY29udmVydFxuICAgICAgICAgICAgLy8gdG8ganBlZ1xuICAgICAgICAgICAgcG5nLmRhdGFbM10gLT0gMTtcbiAgICAgICAgICAgIHBuZy5wYWNrKCkucGlwZSh3cml0ZVN0cmVhbSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgUHJvbWlzZS5hbGwoZmlsZXNQcm9jZXNzaW5nKS50aGVuKHJlc29sdmUpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZXh0cmFjdENhcmRJbmZvKGZpbGVzKSB7XG4gIGxldCBhbGxOZXdDYXJkcyA9IFtdO1xuICBmb3IgKGxldCBmaWxlIG9mIGZpbGVzKSB7XG4gICAgY29uc3QgY3VycmVudEZpbGUgPSBgJHtVUExPQURTX1BBVEh9LyR7ZmlsZX1gO1xuICAgIGNvbnN0IHN0YXRzID0gZnMuc3RhdFN5bmMoY3VycmVudEZpbGUpO1xuXG4gICAgaWYgKHN0YXRzLmlzRmlsZSgpICYmIGZpbGUubWF0Y2goLy4rXFwuanNvbiQvKSkge1xuICAgICAgY29uc3QgbmV3Q2FyZHMgPSBwYXJzZUFua2lKc29uKGN1cnJlbnRGaWxlKTtcbiAgICAgIGFsbE5ld0NhcmRzID0gYWxsTmV3Q2FyZHMuY29uY2F0KG5ld0NhcmRzKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGFsbE5ld0NhcmRzO1xufVxuXG5mdW5jdGlvbiBwYXJzZUFua2lKc29uKGZpbGVQYXRoKSB7XG4gIGNvbnN0IGNvbnRlbnRzID0gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoZmlsZVBhdGgsICd1dGY4JykpO1xuICByZXR1cm4gY29udGVudHMubm90ZXMubWFwKGNhcmQgPT4ge1xuICAgIGxldCBbXG4gICAgICBleHByZXNzaW9uLFxuICAgICAgLCAvLyByZWFkaW5nLFxuICAgICAgLC8vIGphcE1lYW5pbmcsXG4gICAgICBlbmdNZWFuaW5nLFxuICAgICAgLCAvLyBvZmZpY2lhbEVuZyxcbiAgICAgIHF1ZXN0aW9uSW1nLFxuICAgICAgYW5zd2VySW1nLFxuICAgICAgLCAvLyBhdWRpb1xuICAgICAgcHJldkxpbmVJbWcsXG4gICAgICBwcmV2TGluZUFsdFRleHQsXG4gICAgICBhbHRBbnN3ZXJzLFxuICAgICAgd2ViTG9va3VwLCAvLyB1c2UgZm9yIGV2ZXJ5IGFuc3dlciBzbyBwZW9wbGUgY2FuIGxvb2sgdXAgcHJvbnVuY2lhdGlvblxuICAgICAgICAgICAgICAgICAvLyBodHRwczovL2VqamUud2VibGlvLmpwL2NvbnRlbnQvW3dlYkxvb2t1cCAoZS5nLiDliIfjgormj5vjgYjjgospXVxuICAgICAgbm90ZXMsXG4gICAgICBjYXJkSWRcbiAgICBdID0gY2FyZC5maWVsZHM7XG5cbiAgICBbZXhwcmVzc2lvbiwgZW5nTWVhbmluZywgbm90ZXNdID0gW2V4cHJlc3Npb24sIGVuZ01lYW5pbmcsIG5vdGVzXS5tYXAoc3RyaXBIdG1sKTtcbiAgICBjb25zdCBhbnN3ZXJzID0gZ2V0QW5zd2VycyhleHByZXNzaW9uLCBhbHRBbnN3ZXJzKTtcblxuICAgIHJldHVybiB7XG4gICAgICBjYXJkSWQsXG4gICAgICBxdWVzdGlvblRleHQ6ICAgIGZvcm1hdFF1ZXN0aW9uVGV4dChleHByZXNzaW9uLCBlbmdNZWFuaW5nLCBub3RlcywgY2FyZElkKSxcbiAgICAgIHF1ZXN0aW9uSW1nOiAgICAgZ2V0QmFzZTY0KHF1ZXN0aW9uSW1nKSxcbiAgICAgIHF1ZXN0aW9uQWx0VGV4dDogZm9ybWF0UXVlc3Rpb25BbHRUZXh0KGV4cHJlc3Npb24pLFxuICAgICAgcHJldkxpbmVJbWc6ICAgICBnZXRCYXNlNjQocHJldkxpbmVJbWcpLFxuICAgICAgcHJldkxpbmVBbHRUZXh0LFxuICAgICAgYW5zd2VyVGV4dDogICAgICBmb3JtYXRBbnN3ZXJUZXh0KGFuc3dlcnMsIGVuZ01lYW5pbmcsIHdlYkxvb2t1cCwgY2FyZElkKSxcbiAgICAgIGFuc3dlckltZzogICAgICAgZ2V0QmFzZTY0KGFuc3dlckltZyksXG4gICAgICBhbnN3ZXJBbHRUZXh0OiAgIGZvcm1hdEFuc3dlckFsdFRleHQoZXhwcmVzc2lvbiksXG4gICAgICBhbnN3ZXJzLFxuICAgICAgbWVkaWFVcmxzOiBbXVxuICAgIH07XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzdHJpcEh0bWwoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcucmVwbGFjZSgvPC4qPz58Ji4qOy9nLCAnJyk7XG59XG5cbmZ1bmN0aW9uIGdldFNyYyhzdHJpbmcpIHtcbiAgcmV0dXJuIChzdHJpbmcubWF0Y2goL3NyYz1cIiguKylcIi8pIHx8IFssXSlbMV07XG59XG5cbmZ1bmN0aW9uIGdldEJhc2U2NChzdHJpbmcpIHtcbiAgaWYgKCFzdHJpbmcgfHwgc3RyaW5nLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gIGxldCBiYXNlNjQ7XG4gIHRyeSB7XG4gICAgYmFzZTY0ID0gZnMucmVhZEZpbGVTeW5jKFxuICAgICAgYCR7VVBMT0FEU19QQVRIfS9tZWRpYS8ke2dldFNyYyhzdHJpbmcpfWAsXG4gICAgICB7IGVuY29kaW5nOiAnYmFzZTY0JyB9XG4gICAgKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIHJldHVybmluZyB1bmRlZmluZWQuLi5cbiAgfVxuICByZXR1cm4gYmFzZTY0O1xufVxuXG5mdW5jdGlvbiBjbGVhblVwKGZpbGVzKSB7XG4gIGZvciAobGV0IGZpbGUgb2YgZmlsZXMpIHtcbiAgICBjb25zdCByb290ID0gYCR7VVBMT0FEU19QQVRIfS8ke2ZpbGV9YDtcblxuICAgIGlmIChmcy5sc3RhdFN5bmMocm9vdCkuaXNGaWxlKCkpXG4gICAgICBmcy51bmxpbmtTeW5jKHJvb3QpO1xuICAgIGVsc2UgaWYgKGZzLmxzdGF0U3luYyhyb290KS5pc0RpcmVjdG9yeSgpKVxuICAgICAgZGVsZXRlRm9sZGVyUmVjdXJzaXZlKHJvb3QpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZUZvbGRlclJlY3Vyc2l2ZShyb290UGF0aCkge1xuICBpZiAoZnMuZXhpc3RzU3luYyhyb290UGF0aCkpIHtcbiAgICBmcy5yZWFkZGlyU3luYyhyb290UGF0aCkuZm9yRWFjaChmaWxlID0+IHtcbiAgICAgIGNvbnN0IGN1clBhdGggPSByb290UGF0aCArIFwiL1wiICsgZmlsZTtcbiAgICAgIGlmIChmcy5sc3RhdFN5bmMoY3VyUGF0aCkuaXNEaXJlY3RvcnkoKSkgeyAvLyByZWN1cnNlXG4gICAgICAgIGRlbGV0ZUZvbGRlclJlY3Vyc2l2ZShjdXJQYXRoKTtcbiAgICAgIH0gZWxzZSB7IC8vIGRlbGV0ZSBmaWxlXG4gICAgICAgIGZzLnVubGlua1N5bmMoY3VyUGF0aCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgZnMucm1kaXJTeW5jKHJvb3RQYXRoKTtcbiAgfVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wcm9jZXNzQW5raUpzb24uanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImZzXCJcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBuZ2pzMlwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInBuZ2pzMlwiXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1bnppcC1zdHJlYW1cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ1bnppcC1zdHJlYW1cIlxuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgVHdpdHRlciA9IHJlcXVpcmUoJy4uL3R3aXR0ZXJDb25maWcnKTtcbmNvbnN0IHsgdHJ5Q2F0Y2ggfSA9IHJlcXVpcmUoJ1V0aWxzL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gIC8vXG4gIC8vIHBvc3QgYSB0d2VldCB3aXRoIG1lZGlhXG4gIC8vXG4gIHBvc3RNZWRpYShzdGF0dXMsIGI2NEltYWdlMSwgYWx0VGV4dDEsIGI2NEltYWdlMiwgYWx0VGV4dDIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgbWVkaWFJZDEgPSBhd2FpdCB0cnlDYXRjaCh1cGxvYWRNZWRpYShiNjRJbWFnZTEsIGFsdFRleHQxKSk7XG4gICAgICBjb25zdCBtZWRpYV9pZHMgPSBbbWVkaWFJZDFdO1xuICAgICAgaWYgKGI2NEltYWdlMikge1xuICAgICAgICBjb25zdCBtZWRpYUlkMiA9IGF3YWl0IHRyeUNhdGNoKHVwbG9hZE1lZGlhKGI2NEltYWdlMiwgYWx0VGV4dDIpKTtcbiAgICAgICAgbWVkaWFfaWRzLnVuc2hpZnQobWVkaWFJZDIpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwYXJhbXMgPSB7IHN0YXR1cywgbWVkaWFfaWRzLCB0d2VldF9tb2RlOiAnZXh0ZW5kZWQnLCBpbmNsdWRlX2V4dF9hbHRfdGV4dDogdHJ1ZSB9O1xuICAgICAgVHdpdHRlci5wb3N0KCdzdGF0dXNlcy91cGRhdGUnLCBwYXJhbXMsIChlcnIsIGRhdGEsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGVycilcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiUG9zdGluZyBzdGF0dXMgZmFpbGVkLlwiKSk7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IG1lZGlhVXJscyA9IGRhdGEuZXh0ZW5kZWRfZW50aXRpZXMubWVkaWEubWFwKFxuICAgICAgICAgIG9iaiA9PiAoe1xuICAgICAgICAgICAgaW1hZ2U6IG9iai5tZWRpYV91cmxfaHR0cHMsXG4gICAgICAgICAgICBhbHRUZXh0OiBvYmouZXh0X2FsdF90ZXh0XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgICAgIHF1ZXN0aW9uSWQ6ICAgICAgIGRhdGEuaWRfc3RyLFxuICAgICAgICAgIHF1ZXN0aW9uUG9zdGVkQXQ6IGRhdGEuY3JlYXRlZF9hdCxcbiAgICAgICAgICBtZWRpYVVybHNcbiAgICAgICAgfTtcbiAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG5cbiAgZ2V0Rm9sbG93aW5nKHVzZXJJZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBUd2l0dGVyLmdldCgnZnJpZW5kcy9pZHMnLCB7IHVzZXJJZCB9LCAoZXJyLCBkYXRhLCByZXNwb25zZSkgPT4ge1xuICAgICAgICBpZiAoZXJyKSBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgIHJlc29sdmUoZGF0YS5pZHMpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxufSAvLyBtb2R1bGUuZXhwb3J0c1xuXG5cbi8vIEVGRkVDVFM6XG4vLyB1cGxvYWRzIGEgc2luZ2xlIGltYWdlIHdpdGggYWx0VGV4dCB0byBUd2l0dGVyXG4vL1xuLy8gUkVUVVJOUzpcbi8vIG1lZGlhX2lkIHdoaWNoIGlzIG5lY2Vzc2FyeSBmb3Jcbi8vIGF0dGFjaGluZyBtZWRpYSB0byBhIHR3ZWV0XG4vL1xuZnVuY3Rpb24gdXBsb2FkTWVkaWEoYjY0SW1hZ2UsIGFsdFRleHQpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAvLyBmaXJzdCB3ZSBtdXN0IHBvc3QgdGhlIG1lZGlhIHRvIFR3aXR0ZXJcbiAgICBUd2l0dGVyLnBvc3QoJ21lZGlhL3VwbG9hZCcsIHsgbWVkaWFfZGF0YTogYjY0SW1hZ2UgfSwgKGVyciwgZGF0YSwgcmVzcG9uc2UpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICByZWplY3QobmV3IEVycm9yKFwiTWVkaWEgdXBsb2FkIGZhaWxlZC5cIikpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBub3cgd2UgY2FuIGFzc2lnbiBhbHQgdGV4dCB0byB0aGUgbWVkaWEsIGZvciB1c2UgYnkgc2NyZWVuIHJlYWRlcnMgYW5kXG4gICAgICAvLyBvdGhlciB0ZXh0LWJhc2VkIHByZXNlbnRhdGlvbnMgYW5kIGludGVycHJldGVyc1xuICAgICAgY29uc3QgbWVkaWFJZFN0ciA9IGRhdGEubWVkaWFfaWRfc3RyaW5nO1xuICAgICAgY29uc3QgbWV0YV9wYXJhbXMgPSB7IG1lZGlhX2lkOiBtZWRpYUlkU3RyLCBhbHRfdGV4dDogeyB0ZXh0OiBhbHRUZXh0IH0gfVxuXG4gICAgICBUd2l0dGVyLnBvc3QoJ21lZGlhL21ldGFkYXRhL2NyZWF0ZScsIG1ldGFfcGFyYW1zLCAoZXJyLCBkYXRhLCByZXNwb25zZSkgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJNZWRpYSB1cGxvYWQgc3VjY2VlZGVkLCBtZWRpYSBjcmVhdGlvbiBmYWlsZWQuXCIpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBub3cgd2UgY2FuIHJlZmVyZW5jZSB0aGUgbWVkaWEgYW5kIHBvc3QgYSB0d2VldCAobWVkaWEgd2lsbCBhdHRhY2ggdG8gdGhlIHR3ZWV0KVxuICAgICAgICByZXNvbHZlKG1lZGlhSWRTdHIpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWxzL3R3aXR0ZXJVdGlscy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInR3aXRcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ0d2l0XCJcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInVybGVuY29kZVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInVybGVuY29kZVwiXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBEQiA9IHJlcXVpcmUoJy4vZGJPcHMnKTtcbmNvbnN0IHVwbG9hZCA9IHJlcXVpcmUoJ211bHRlcicpKHsgZGVzdDogJ3VwbG9hZHMvJyB9KTtcblxubW9kdWxlLmV4cG9ydHMgPSAoYXBwKSA9PiB7XG5cbiAgLy8gQ09SU1xuICBhcHAudXNlKChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgIHJlcy5oZWFkZXIoJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbicsICcqJyk7XG4gICAgcmVzLmhlYWRlcignQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kcycsICdHRVQsIE9QVElPTlMnKTtcbiAgICByZXMuaGVhZGVyKCdBY2Nlc3MtQ29udHJvbC1NYXgtQWdlJywgJzg2NDAwJyk7IC8vIDI0IGhvdXJzXG4gICAgcmVzLmhlYWRlcignQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycycsXG4gICAgICAgICAgICAgICAnT3JpZ2luLCBYLVJlcXVlc3RlZC1XaXRoLCBDb250ZW50LVR5cGUsIEFjY2VwdCcpO1xuICAgIG5leHQoKTtcbiAgfSk7XG5cbiAgYXBwLmdldCgnL2FwaS9saXZlJywgKHJlcSwgcmVzKSA9PiB7XG4gICAgREIuc2VydmVMaXZlUXVlc3Rpb25zKHJlcSwgcmVzKTtcbiAgfSk7XG5cbiAgYXBwLmdldCgnL2FwaS9zY29yZXMnLCAocmVxLCByZXMpID0+IHtcbiAgICBEQi5nZXRTY29yZXMocmVxLCByZXMpO1xuICB9KTtcblxuICBhcHAuZ2V0KCcvYXBpL2NhcmRzJywgKHJlcSwgcmVzKSA9PiB7XG4gICAgREIuZ2V0Q2FyZHMocmVxLCByZXMpO1xuICB9KTtcblxuICAvLyBUT0RPIC0gRGVsZXRlIHRoaXMgZW5kcG9pbnQgaWYgbm90IG5lZWRlZFxuICBhcHAuZ2V0KCcvYXBpL3Njb3JlLzpoYW5kbGUnLCAocmVxLCByZXMpID0+IHtcbiAgICBEQi5nZXRTY29yZShyZXEsIHJlcyk7XG4gIH0pO1xuXG4gIGFwcC5nZXQoJy9hcGkvY2FyZHMvb2xkJywgKHJlcSwgcmVzKSA9PiB7XG4gICAgREIuZ2V0T2xkQ2FyZHMocmVxLCByZXMpO1xuICB9KTtcblxuXG4gIC8vIFRPRE8gLSBhZGQgYXV0aGVudGljYXRpb24gdG8gZm9sbG93aW5nIGVuZHBvaW50c1xuXG4gIGFwcC5wb3N0KCcvZGVjay9uZXcnLCB1cGxvYWQuc2luZ2xlKCd6aXBmaWxlJyksIChyZXEsIHJlcykgPT4ge1xuICAgIERCLmFkZERlY2socmVxLCByZXMpO1xuICB9KTtcblxuICBhcHAucG9zdCgnL3Njb3Jlcy9lZGl0JywgKHJlcSwgcmVzKSA9PiB7XG4gICAgREIuYWRqdXN0U2NvcmUocmVxLCByZXMpO1xuICB9KTtcblxuICBhcHAuZ2V0KCcvY2FyZHMvbmV3JywgKHJlcSwgcmVzKSA9PiB7XG4gICAgREIuZ2V0TmV3Q2FyZHMocmVxLCByZXMpO1xuICB9KTtcblxufSAvLyBtb2R1bGUuZXhwb3J0c1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwaS5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm11bHRlclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIm11bHRlclwiXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9