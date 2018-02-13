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

      var _ref6$query, _ref6$query$page, page, _ref6$query$view, view, _ref6$query$search, search, mongo, collection, data;

      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _ref6$query = _ref6.query, _ref6$query$page = _ref6$query.page, page = _ref6$query$page === void 0 ? 1 : _ref6$query$page, _ref6$query$view = _ref6$query.view, view = _ref6$query$view === void 0 ? 'weeklyStats' : _ref6$query$view, _ref6$query$search = _ref6$query.search, search = _ref6$query$search === void 0 ? '' : _ref6$query$search;
              _context9.next = 3;
              return tryCatch(MongoClient.connect(url));

            case 3:
              mongo = _context9.sent;
              collection = mongo.db(DB).collection('scoreboard');
              _context9.next = 7;
              return tryCatch(collection.find(_defineProperty({
                handle: {
                  $regex: search,
                  $options: 'i'
                }
              }, "".concat(view, ".score"), {
                $gt: 0
              })).sort((_collection$find$sort = {}, _defineProperty(_collection$find$sort, "".concat(view, ".score"), -1), _defineProperty(_collection$find$sort, "handle", 1), _collection$find$sort)).limit(PAGE_SIZE * page).toArray());

            case 7:
              data = _context9.sent;
              console.log('data:', data);
              res.json(data);
              mongo.close();

            case 11:
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
  getUserStats: function () {
    var _getUserStats = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee10(_ref7, res) {
      var handle, mongo, scoreboard, oldCards, user, cardIds, earnedCards;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              handle = _ref7.query.handle;
              _context10.next = 3;
              return tryCatch(MongoClient.connect(url));

            case 3:
              mongo = _context10.sent;
              scoreboard = mongo.db(DB).collection('scoreboard');
              oldCards = mongo.db(DB).collection('oldCards');
              _context10.next = 8;
              return tryCatch(scoreboard.findOne({
                handle: handle
              }));

            case 8:
              user = _context10.sent;

              if (user) {
                _context10.next = 12;
                break;
              }

              res.json(null);
              return _context10.abrupt("return");

            case 12:
              cardIds = user.allTimeStats.correct.map(function (record) {
                return record.cardId;
              });
              _context10.next = 15;
              return tryCatch(getCards(cardIds, oldCards));

            case 15:
              earnedCards = _context10.sent;
              user.earnedCards = earnedCards;
              res.json(user);

            case 18:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, this);
    }));

    return function getUserStats(_x18, _x19) {
      return _getUserStats.apply(this, arguments);
    };
  }(),
  // TODO - delete this method if not needed
  getScore: function () {
    var _getScore = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee11(req, res) {
      var handle, mongo, collection, user;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              handle = req.params.handle;
              _context11.next = 3;
              return tryCatch(MongoClient.connect(url));

            case 3:
              mongo = _context11.sent;
              collection = mongo.db(DB).collection('scoreboard');
              _context11.next = 7;
              return tryCatch(collection.findOne({
                handle: handle
              }));

            case 7:
              user = _context11.sent;
              res.json(user);
              mongo.close();

            case 10:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, this);
    }));

    return function getScore(_x20, _x21) {
      return _getScore.apply(this, arguments);
    };
  }(),
  addDeck: function () {
    var _addDeck = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee12(req, res) {
      var filePath, newCards, mongo, collection, batch, i;
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              filePath = req.file.path;
              _context12.next = 3;
              return tryCatch(processUpload(filePath));

            case 3:
              newCards = _context12.sent;
              _context12.next = 6;
              return tryCatch(MongoClient.connect(url));

            case 6:
              mongo = _context12.sent;
              collection = mongo.db(DB).collection('newCards');
              batch = collection.initializeUnorderedBulkOp();

              for (i = 0; i < newCards.length; ++i) {
                batch.insert(newCards[i]);
              }

              _context12.next = 12;
              return tryCatch(batch.execute());

            case 12:
              mongo.close();
              res.redirect('/');

            case 14:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, this);
    }));

    return function addDeck(_x22, _x23) {
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
    regeneratorRuntime.mark(function _callee13(resetWeeklyStats, resetMonthlyStats) {
      var mongo, collection, zero, reset;
      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return tryCatch(MongoClient.connect(url));

            case 2:
              mongo = _context13.sent;
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
              return _context13.stop();
          }
        }
      }, _callee13, this);
    }));

    return function weeklyMonthlyReset(_x24, _x25) {
      return _weeklyMonthlyReset.apply(this, arguments);
    };
  }()
}; // module.exports

function getCards(ids, collection) {
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref8 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee14(resolve, reject) {
      var data, cards;
      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.next = 2;
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

            case 2:
              data = _context14.sent;
              cards = data.map(function (card) {
                card.questionText = card.questionText.split('\n')[0];
                var s = card.answers.length > 1 ? 's' : '';
                card.answers = "Answer".concat(s, ": ").concat(card.answers.join(', '));
                card.mediaUrl = card.mediaUrls.length === 3 ? card.mediaUrls[1] : card.mediaUrls[0];
                delete card.mediaUrls;
                return card;
              });
              resolve(cards);

            case 5:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14, this);
    }));

    return function (_x26, _x27) {
      return _ref8.apply(this, arguments);
    };
  }());
}

function getCollection(_x28, _x29, _x30) {
  return _getCollection.apply(this, arguments);
}

function _getCollection() {
  _getCollection = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee18(req, res, collectionName) {
    var mongo, collection, data;
    return regeneratorRuntime.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.next = 2;
            return tryCatch(MongoClient.connect(url));

          case 2:
            mongo = _context18.sent;
            collection = mongo.db(DB).collection(collectionName);
            _context18.next = 6;
            return tryCatch(collection.find().project({
              _id: 0
            }).toArray());

          case 6:
            data = _context18.sent;
            res.json(data);
            mongo.close();

          case 9:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18, this);
  }));
  return _getCollection.apply(this, arguments);
}

function removeLiveQuestion(mongo, cardId) {
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref9 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee15(resolve, reject) {
      var collection, currentQuestion;
      return regeneratorRuntime.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              collection = mongo.db(DB).collection('liveQuestions');
              _context15.next = 3;
              return tryCatch(collection.findOne({
                cardId: cardId
              }));

            case 3:
              currentQuestion = _context15.sent;
              _context15.next = 6;
              return tryCatch(collection.remove(currentQuestion));

            case 6:
              _context15.next = 8;
              return tryCatch(addPointsToScoreboard(mongo, currentQuestion));

            case 8:
              resolve();

            case 9:
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

function addPointsToScoreboard(mongo, _ref10) {
  var cachedPoints = _ref10.cachedPoints,
      cardId = _ref10.cardId;
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref11 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee16(resolve, reject) {
      var scoreboard, oldCards, answerPostedAt, ops, i, _cachedPoints$i, userId, points, op;

      return regeneratorRuntime.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
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
                _context16.next = 9;
                break;
              }

              resolve();
              return _context16.abrupt("return");

            case 9:
              _context16.next = 11;
              return tryCatch(scoreboard.bulkWrite(ops));

            case 11:
              _context16.next = 13;
              return tryCatch(recalculateRank(scoreboard));

            case 13:
              resolve();

            case 14:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16, this);
    }));

    return function (_x33, _x34) {
      return _ref11.apply(this, arguments);
    };
  }());
}

function recalculateRank(scoreboard) {
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref12 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee17(resolve, reject) {
      var stats, usersToUpdate, currentRanks, bulkUpdateOps, userIdsToUpdate, end, i, _loop;

      return regeneratorRuntime.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              _context17.next = 2;
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
              stats = _context17.sent;
              usersToUpdate = {};
              currentRanks = {
                allTimeStats: 1,
                monthlyStats: 1,
                weeklyStats: 1
              };
              stats.forEach(function (_ref13) {
                var category = _ref13._id,
                    scores = _ref13.scores;
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


              _context17.next = 14;
              return tryCatch(scoreboard.bulkWrite(bulkUpdateOps));

            case 14:
              resolve();

            case 15:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17, this);
    }));

    return function (_x35, _x36) {
      return _ref12.apply(this, arguments);
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
  app.get('/api/userStats', function (req, res) {
    DB.getUserStats(req, res);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjkxOGY4NmNhZjljMWU3MDI4OTciLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhdGhcIiIsIndlYnBhY2s6Ly8vLi9zcmMvZGJPcHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3R3aXR0ZXJDb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3V0aWxzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBiYWJlbC9wb2x5ZmlsbFwiIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZG90ZW52XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJvZHktcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3R3aXR0ZXJCb3QuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9uZ29kYlwiIiwid2VicGFjazovLy8uL3NyYy9wcm9jZXNzQW5raUpzb24uanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZnNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwbmdqczJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ1bnppcC1zdHJlYW1cIiIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvdHdpdHRlclV0aWxzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInR3aXRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ1cmxlbmNvZGVcIiIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcIm11bHRlclwiIl0sIm5hbWVzIjpbInR3aXR0ZXJVdGlscyIsInJlcXVpcmUiLCJ1dGlscyIsIm1vZHVsZSIsImV4cG9ydHMiLCJNb25nb0NsaWVudCIsInVybCIsInByb2Nlc3MiLCJlbnYiLCJNT05HT0RCX1VSSSIsIkRCIiwiTU9OR09fREIiLCJwcm9jZXNzVXBsb2FkIiwidHJ5Q2F0Y2giLCJQQUdFX1NJWkUiLCJnZXRSYW5kb21RdWVzdGlvbiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiY29ubmVjdCIsIm1vbmdvIiwibmV3Q2FyZHMiLCJkYiIsImNvbGxlY3Rpb24iLCJvbGRDYXJkcyIsImZpbmRPbmUiLCJyYW5kb21DYXJkIiwiRXJyb3IiLCJpbnNlcnQiLCJyZW1vdmUiLCJjbG9zZSIsInJldmVhbEFuc3dlcldvcmtmbG93IiwiY2FyZElkIiwiYW5zd2VyQ2FyZCIsInJlbW92ZUxpdmVRdWVzdGlvbiIsImFkZExpdmVRdWVzdGlvbiIsInJlY29yZCIsIm1lZGlhVXJscyIsImxpdmVRdWVzdGlvbnMiLCJ1cGRhdGVPbmUiLCIkc2V0IiwiJHVuc2V0IiwicXVlc3Rpb25JbWciLCJxdWVzdGlvbkFsdFRleHQiLCJwcmV2TGluZUltZyIsInByZXZMaW5lQWx0VGV4dCIsImFkZE1lZGlhVXJsc1RvQ2FyZCIsIm1lZGlhVXJsIiwiJHB1c2giLCJhbnN3ZXJJbWciLCJhbnN3ZXJBbHRUZXh0IiwidXBkYXRlTGl2ZVF1ZXN0aW9uIiwicXVlc3Rpb25JZCIsInVzZXJQb2ludHMiLCJ1c2VySWQiLCJ1cGRhdGUiLCJhbHJlYWR5QW5zd2VyZWQiLCJjYWNoZWRQb2ludHMiLCJnZXRMaXZlUXVlc3Rpb25zIiwiZmluZCIsInRvQXJyYXkiLCJzZXJ2ZUxpdmVRdWVzdGlvbnMiLCJyZXEiLCJyZXMiLCJqc29uIiwiYWRkT3JVcGRhdGVVc2VyIiwibmV3VXNlciIsInNjb3JlYm9hcmQiLCJ1c2VyIiwibmFtZSIsImhhbmRsZSIsImF2YXRhciIsInByb2ZpbGVCYW5uZXIiLCJmb2xsb3dpbmciLCJhZGp1c3RTY29yZSIsImdldFNjb3JlcyIsInF1ZXJ5IiwicGFnZSIsInZpZXciLCJzZWFyY2giLCIkcmVnZXgiLCIkb3B0aW9ucyIsIiRndCIsInNvcnQiLCJsaW1pdCIsImRhdGEiLCJjb25zb2xlIiwibG9nIiwiZ2V0VXNlclN0YXRzIiwiY2FyZElkcyIsImFsbFRpbWVTdGF0cyIsImNvcnJlY3QiLCJtYXAiLCJnZXRDYXJkcyIsImVhcm5lZENhcmRzIiwiZ2V0U2NvcmUiLCJwYXJhbXMiLCJhZGREZWNrIiwiZmlsZVBhdGgiLCJmaWxlIiwicGF0aCIsImJhdGNoIiwiaW5pdGlhbGl6ZVVub3JkZXJlZEJ1bGtPcCIsImkiLCJsZW5ndGgiLCJleGVjdXRlIiwicmVkaXJlY3QiLCJnZXROZXdDYXJkcyIsImdldENvbGxlY3Rpb24iLCJnZXRPbGRDYXJkcyIsIndlZWtseU1vbnRobHlSZXNldCIsInJlc2V0V2Vla2x5U3RhdHMiLCJyZXNldE1vbnRobHlTdGF0cyIsInplcm8iLCJzY29yZSIsImF0dGVtcHRzIiwicmVzZXQiLCJ3ZWVrbHlTdGF0cyIsIm1vbnRobHlTdGF0cyIsIm11bHRpIiwiaWRzIiwiJGluIiwicHJvamVjdCIsIl9pZCIsInF1ZXN0aW9uVGV4dCIsImFuc3dlcnMiLCJjYXJkcyIsImNhcmQiLCJzcGxpdCIsInMiLCJqb2luIiwiY29sbGVjdGlvbk5hbWUiLCJjdXJyZW50UXVlc3Rpb24iLCJhZGRQb2ludHNUb1Njb3JlYm9hcmQiLCJhbnN3ZXJQb3N0ZWRBdCIsIkRhdGUiLCJnZXRUaW1lIiwib3BzIiwicG9pbnRzIiwib3AiLCJmaWx0ZXIiLCIkaW5jIiwicHVzaCIsImJ1bGtXcml0ZSIsInJlY2FsY3VsYXRlUmFuayIsImFnZ3JlZ2F0ZSIsIiRwcm9qZWN0Iiwib3JkZXJCeSIsIiRsaXRlcmFsIiwiJHVud2luZCIsIiRncm91cCIsIiRzd2l0Y2giLCJicmFuY2hlcyIsImNhc2UiLCIkZXEiLCJ0aGVuIiwiZGVmYXVsdCIsInVzZXJzIiwiJHNvcnQiLCJzY29yZXMiLCJzdGF0cyIsInVzZXJzVG9VcGRhdGUiLCJjdXJyZW50UmFua3MiLCJmb3JFYWNoIiwiY2F0ZWdvcnkiLCJlbmQiLCJjdXJyZW50U3RhdCIsInByZXZpb3VzUmFuayIsInJhbmsiLCJjdXJyZW50UmFuayIsImNhY2hlZFVwZGF0ZSIsImJ1bGtVcGRhdGVPcHMiLCJ1c2VySWRzVG9VcGRhdGUiLCJPYmplY3QiLCJrZXlzIiwiY3VycmVudFVzZXIiLCJOdW1iZXIiLCJ1c2VyVXBkYXRlcyIsIm5ld1JhbmsiLCJ0d2l0IiwiVFdJVFRFUl9BUElfS0VZIiwiVFdJVFRFUl9BUElfU0VDUkVUIiwiVFdJVFRFUl9UT0tFTiIsIlRXSVRURVJfVE9LRU5fU0VDUkVUIiwiVFdJVFRFUl9BQ0NPVU5UIiwidXNlckNvbmZpZyIsImNvbnN1bWVyX2tleSIsImNvbnN1bWVyX3NlY3JldCIsImFjY2Vzc190b2tlbiIsImFjY2Vzc190b2tlbl9zZWNyZXQiLCJ1cmxlbmNvZGUiLCJXRUJMT09LVVBfVVJMIiwiSE9VUlMiLCJmb3JtYXRRdWVzdGlvbkFsdFRleHQiLCJleHByZXNzaW9uIiwiaGludCIsImZvcm1hdEhpbnQiLCJtaW5NYXhDaGFycyIsIm1pbiIsIm1heCIsIm1pbk1heCIsInNjcmVlblJlYWRlckhpbnQiLCJyZXBsYWNlIiwiZm9ybWF0UXVlc3Rpb25UZXh0IiwiZW5nTWVhbmluZyIsIm5vdGVzIiwiY2FyZElEIiwidHdlZXRUZXh0IiwibmVlZHNIaW50IiwiZm9ybWF0QW5zd2VyQWx0VGV4dCIsImZvcm1hdEFuc3dlclRleHQiLCJ3ZWJMb29rdXAiLCJhbnN3ZXJUZXh0IiwiYWRkUXVlc3Rpb25MaW5rIiwicXVlc3Rpb25MaW5rIiwibGluZXMiLCJzcGxpY2UiLCJnZXRBbnN3ZXJzIiwiYWx0QW5zd2VycyIsImFjY2VwdGVkQW5zd2VyIiwibWF0Y2giLCJvdGhlckFuc3dlcnMiLCJjb25jYXQiLCJjYWxjdWxhdGVTY29yZSIsInF1ZXN0aW9uUG9zdGVkQXQiLCJ0aW1lVG9BbnN3ZXIiLCJNYXRoIiwiZmxvb3IiLCJleHRyYWN0QW5zd2VyIiwidGV4dCIsInRyaW0iLCJzbGljZSIsImdldFRpbWVVbnRpbCIsImhvdXIiLCJub3ciLCJtaWxsaXNVbnRpbFRpbWUiLCJnZXRGdWxsWWVhciIsImdldE1vbnRoIiwiZ2V0RGF0ZSIsInByb21pc2UiLCJjYXRjaCIsImVycm9yIiwiZXJyIiwiY29udGFpbnMiLCJpdGVtIiwibGlzdCIsInZhbGlkIiwiaW5kZXhPZiIsImluZGV4IiwibWF4Q2hhcnMiLCJtaXNzaW5nQ2hhclJlZ2V4IiwibWlzc2luZ0NoYXJzIiwiZ2ltbWVDaGFycyIsIm1pbkNoYXJzIiwib3B0aW9uYWxDaGFycyIsImxlZ2VuZCIsIm5vcm1hbGl6ZWQiLCJncm91cE11bHRpWHMiLCJncm91cFhzIiwiZ3JvdXBRdWVzdGlvbk1hcmtzIiwiZmxhdHRlbiIsImdyb3VwIiwidGVzdCIsInJlc3VsdCIsIm51bUNoYXJzIiwibmVnYXRlZENoYXJzIiwic3RyaW5nIiwicDEiLCJzdHIiLCJzY2FsYXIiLCJ2IiwiQXJyYXkiLCJpc0FycmF5IiwiZGVlcCIsImZsYXQiLCJoZWFkIiwidGFpbCIsImNvbmZpZyIsImV4cHJlc3MiLCJhcHAiLCJib2R5UGFyc2VyIiwidHdpdHRlckJvdCIsInNldCIsIlBPUlQiLCJ1c2UiLCJzdGF0aWMiLCJfX2Rpcm5hbWUiLCJsaXN0ZW4iLCJnZXQiLCJnZXRGb2xsb3dpbmciLCJwb3N0TWVkaWEiLCJUd2l0dGVyIiwiQU5TV0VSX0lOVEVSVkFMIiwiUVVFU1RJT05fSU5URVJWQUwiLCJzdGFydCIsIm9wZW5TdHJlYW0iLCJzZXRJbnRlcnZhbCIsInR3ZWV0UmFuZG9tUXVlc3Rpb24iLCJzZXRTdGFydFRpbWVzIiwidGltZVVudGlsN1BNIiwidGltZVVudGlsTWlkbmlnaHQiLCJzZXRUaW1lb3V0IiwibGl2ZVF1ZXN0aW9uIiwidHdlZXRBbnN3ZXIiLCJzdHJlYW0iLCJ0cmFjayIsIm9uIiwiaW5fcmVwbHlfdG9fc3RhdHVzX2lkX3N0ciIsImNyZWF0ZWRfYXQiLCJpZCIsInNjcmVlbl9uYW1lIiwicHJvZmlsZV9pbWFnZV91cmxfaHR0cHMiLCJwcm9maWxlX2Jhbm5lcl91cmwiLCJmb3VuZFF1ZXN0aW9uIiwicXVlc3Rpb25DYXJkIiwiYWNjZXB0ZWRBbnN3ZXJzIiwidXNlckFuc3dlciIsImRpc2Nvbm5lY3RNc2ciLCJnZXREYXkiLCJmcyIsIlBORyIsInVuemlwIiwiVVBMT0FEU19QQVRIIiwicGFyc2VBbmtpSnNvbiIsIm9wdGltaXplSW1hZ2VzIiwiemlwZmlsZVBhdGgiLCJjcmVhdGVSZWFkU3RyZWFtIiwicGlwZSIsIkV4dHJhY3QiLCJmaWxlcyIsInJlYWRkaXJTeW5jIiwiZXh0cmFjdENhcmRJbmZvIiwiY2xlYW5VcCIsImRpclBhdGgiLCJmaWxlc1Byb2Nlc3NpbmciLCJjdXJyZW50RmlsZSIsImNvbnRlbnRzIiwicmVhZEZpbGVTeW5jIiwid3JpdGVTdHJlYW0iLCJjcmVhdGVXcml0ZVN0cmVhbSIsImN1cnJlbnRJbWFnZSIsInJlaiIsImZpbHRlclR5cGUiLCJkZWZsYXRlTGV2ZWwiLCJwYXJzZSIsInBuZyIsInBhY2siLCJhbGwiLCJhbGxOZXdDYXJkcyIsInN0YXRTeW5jIiwiaXNGaWxlIiwiSlNPTiIsImZpZWxkcyIsInN0cmlwSHRtbCIsImdldEJhc2U2NCIsImdldFNyYyIsImJhc2U2NCIsImVuY29kaW5nIiwiZSIsInJvb3QiLCJsc3RhdFN5bmMiLCJ1bmxpbmtTeW5jIiwiaXNEaXJlY3RvcnkiLCJkZWxldGVGb2xkZXJSZWN1cnNpdmUiLCJyb290UGF0aCIsImV4aXN0c1N5bmMiLCJjdXJQYXRoIiwicm1kaXJTeW5jIiwic3RhdHVzIiwiYjY0SW1hZ2UxIiwiYWx0VGV4dDEiLCJiNjRJbWFnZTIiLCJhbHRUZXh0MiIsInVwbG9hZE1lZGlhIiwibWVkaWFJZDEiLCJtZWRpYV9pZHMiLCJtZWRpYUlkMiIsInVuc2hpZnQiLCJ0d2VldF9tb2RlIiwiaW5jbHVkZV9leHRfYWx0X3RleHQiLCJwb3N0IiwicmVzcG9uc2UiLCJleHRlbmRlZF9lbnRpdGllcyIsIm1lZGlhIiwiaW1hZ2UiLCJvYmoiLCJtZWRpYV91cmxfaHR0cHMiLCJhbHRUZXh0IiwiZXh0X2FsdF90ZXh0IiwiaWRfc3RyIiwiYjY0SW1hZ2UiLCJtZWRpYV9kYXRhIiwibWVkaWFJZFN0ciIsIm1lZGlhX2lkX3N0cmluZyIsIm1ldGFfcGFyYW1zIiwibWVkaWFfaWQiLCJhbHRfdGV4dCIsInVwbG9hZCIsImRlc3QiLCJuZXh0IiwiaGVhZGVyIiwic2luZ2xlIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUM3REEsSUFBTUEsZUFBZSxtQkFBQUMsQ0FBUSxFQUFSLENBQXJCOztBQUNBLElBQU1DLFFBQVEsbUJBQUFELENBQVEsQ0FBUixDQUFkOztBQUVBRSxPQUFPQyxPQUFQLGdCQUNLSixZQURMLEVBRUtFLEtBRkwsRTs7Ozs7O0FDSEEsaUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQSxJQUFNRyxjQUFjLG1CQUFBSixDQUFRLEVBQVIsRUFBbUJJLFdBQXZDOztBQUNBLElBQU1DLE1BQU1DLFFBQVFDLEdBQVIsQ0FBWUMsV0FBeEI7QUFDQSxJQUFNQyxLQUFLSCxRQUFRQyxHQUFSLENBQVlHLFFBQXZCOztlQUMwQixtQkFBQVYsQ0FBUSxFQUFSLEM7SUFBbEJXLGEsWUFBQUEsYTs7Z0JBQ2EsbUJBQUFYLENBQVEsQ0FBUixDO0lBQWJZLFEsYUFBQUEsUTs7QUFDUixJQUFNQyxZQUFZLEdBQWxCO0FBRUFYLE9BQU9DLE9BQVAsR0FBaUI7QUFDZlcsbUJBRGUsK0JBQ0s7QUFDbEIsV0FBTyxJQUFJQyxPQUFKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw4QkFBWSxpQkFBT0MsT0FBUCxF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QUFHaUcsV0FBSCxDQUFlN0MsR0FBZixFQUFvQkMsR0FBcEI7QUFDRCxHQUZEO0FBSUQsQ0EzQ0QsQyxDQTJDRSxpQjs7Ozs7O0FDOUNGLG1DIiwiZmlsZSI6InNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDUpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDI5MThmODZjYWY5YzFlNzAyODk3IiwiY29uc3QgdHdpdHRlclV0aWxzID0gcmVxdWlyZSgnLi90d2l0dGVyVXRpbHMnKTtcbmNvbnN0IHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLi4udHdpdHRlclV0aWxzLFxuICAuLi51dGlsc1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWxzL2luZGV4LmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInBhdGhcIlxuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBNb25nb0NsaWVudCA9IHJlcXVpcmUoJ21vbmdvZGInKS5Nb25nb0NsaWVudDtcbmNvbnN0IHVybCA9IHByb2Nlc3MuZW52Lk1PTkdPREJfVVJJO1xuY29uc3QgREIgPSBwcm9jZXNzLmVudi5NT05HT19EQjtcbmNvbnN0IHsgcHJvY2Vzc1VwbG9hZCB9ID0gcmVxdWlyZSgnLi9wcm9jZXNzQW5raUpzb24nKTtcbmNvbnN0IHsgdHJ5Q2F0Y2ggfSA9IHJlcXVpcmUoJ1V0aWxzJyk7XG5jb25zdCBQQUdFX1NJWkUgPSAxMDA7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRSYW5kb21RdWVzdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgbW9uZ28gPSBhd2FpdCB0cnlDYXRjaChNb25nb0NsaWVudC5jb25uZWN0KHVybCkpO1xuICAgICAgY29uc3QgbmV3Q2FyZHMgPSBtb25nby5kYihEQikuY29sbGVjdGlvbignbmV3Q2FyZHMnKTtcbiAgICAgIGNvbnN0IG9sZENhcmRzID0gbW9uZ28uZGIoREIpLmNvbGxlY3Rpb24oJ29sZENhcmRzJyk7XG4gICAgICBjb25zdCByYW5kb21DYXJkID0gYXdhaXQgdHJ5Q2F0Y2gobmV3Q2FyZHMuZmluZE9uZSgpKTtcbiAgICAgIGlmIChyYW5kb21DYXJkID09IG51bGwpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIkVtcHR5IGRlY2suIFBsZWFzZSBBZGQgTW9yZSBDYXJkcyB0byBEQi5cIikpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhd2FpdCB0cnlDYXRjaChvbGRDYXJkcy5pbnNlcnQocmFuZG9tQ2FyZCkpO1xuICAgICAgYXdhaXQgdHJ5Q2F0Y2gobmV3Q2FyZHMucmVtb3ZlKHJhbmRvbUNhcmQpKTtcbiAgICAgIHJlc29sdmUocmFuZG9tQ2FyZCk7XG4gICAgICBtb25nby5jbG9zZSgpO1xuICAgIH0pO1xuICB9LFxuXG4gIHJldmVhbEFuc3dlcldvcmtmbG93KGNhcmRJZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBtb25nbyA9IGF3YWl0IHRyeUNhdGNoKE1vbmdvQ2xpZW50LmNvbm5lY3QodXJsKSk7XG4gICAgICBjb25zdCBvbGRDYXJkcyA9IG1vbmdvLmRiKERCKS5jb2xsZWN0aW9uKCdvbGRDYXJkcycpO1xuICAgICAgY29uc3QgYW5zd2VyQ2FyZCA9IGF3YWl0IHRyeUNhdGNoKG9sZENhcmRzLmZpbmRPbmUoeyBjYXJkSWQgfSkpO1xuICAgICAgcmVzb2x2ZShhbnN3ZXJDYXJkKTtcbiAgICAgIGF3YWl0IHRyeUNhdGNoKHJlbW92ZUxpdmVRdWVzdGlvbihtb25nbywgY2FyZElkKSk7XG4gICAgICBtb25nby5jbG9zZSgpO1xuICAgIH0pO1xuICB9LFxuXG4gIGFzeW5jIGFkZExpdmVRdWVzdGlvbihyZWNvcmQsIG1lZGlhVXJscykge1xuICAgIGNvbnN0IHsgY2FyZElkIH0gPSByZWNvcmQ7XG4gICAgY29uc3QgbW9uZ28gPSBhd2FpdCB0cnlDYXRjaChNb25nb0NsaWVudC5jb25uZWN0KHVybCkpO1xuICAgIGNvbnN0IGxpdmVRdWVzdGlvbnMgPSBtb25nby5kYihEQikuY29sbGVjdGlvbignbGl2ZVF1ZXN0aW9ucycpO1xuICAgIGNvbnN0IG9sZENhcmRzID0gbW9uZ28uZGIoREIpLmNvbGxlY3Rpb24oJ29sZENhcmRzJyk7XG4gICAgYXdhaXQgdHJ5Q2F0Y2gobGl2ZVF1ZXN0aW9ucy5pbnNlcnQoe1xuICAgICAgLi4ucmVjb3JkLFxuICAgICAgbWVkaWFVcmxzXG4gICAgfSkpO1xuICAgIGF3YWl0IHRyeUNhdGNoKFxuICAgICAgb2xkQ2FyZHMudXBkYXRlT25lKFxuICAgICAgICB7Y2FyZElkfSxcbiAgICAgICAge1xuICAgICAgICAgICRzZXQ6IHsgbWVkaWFVcmxzIH0sXG4gICAgICAgICAgJHVuc2V0OiB7XG4gICAgICAgICAgICBxdWVzdGlvbkltZzogJycsXG4gICAgICAgICAgICBxdWVzdGlvbkFsdFRleHQ6ICcnLFxuICAgICAgICAgICAgcHJldkxpbmVJbWc6ICcnLFxuICAgICAgICAgICAgcHJldkxpbmVBbHRUZXh0OiAnJ1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKVxuICAgIClcbiAgICBtb25nby5jbG9zZSgpO1xuICB9LFxuXG4gIGFzeW5jIGFkZE1lZGlhVXJsc1RvQ2FyZChjYXJkSWQsIFttZWRpYVVybF0pIHtcbiAgICBjb25zdCBtb25nbyA9IGF3YWl0IHRyeUNhdGNoKE1vbmdvQ2xpZW50LmNvbm5lY3QodXJsKSk7XG4gICAgY29uc3Qgb2xkQ2FyZHMgPSBtb25nby5kYihEQikuY29sbGVjdGlvbignb2xkQ2FyZHMnKTtcbiAgICBhd2FpdCB0cnlDYXRjaChcbiAgICAgIG9sZENhcmRzLnVwZGF0ZU9uZShcbiAgICAgICAgeyBjYXJkSWQgfSwge1xuICAgICAgICAgICRwdXNoOiB7IG1lZGlhVXJsczogbWVkaWFVcmwgfSxcbiAgICAgICAgICAkdW5zZXQ6IHsgYW5zd2VySW1nOiAnJywgYW5zd2VyQWx0VGV4dDogJycgfVxuICAgICAgICB9XG4gICAgICApXG4gICAgKVxuICAgIG1vbmdvLmNsb3NlKCk7XG4gIH0sXG5cbiAgYXN5bmMgdXBkYXRlTGl2ZVF1ZXN0aW9uKHF1ZXN0aW9uSWQsIHVzZXJQb2ludHMpIHtcbiAgICBjb25zdCBtb25nbyA9IGF3YWl0IHRyeUNhdGNoKE1vbmdvQ2xpZW50LmNvbm5lY3QodXJsKSk7XG4gICAgY29uc3QgbGl2ZVF1ZXN0aW9ucyA9IG1vbmdvLmRiKERCKS5jb2xsZWN0aW9uKCdsaXZlUXVlc3Rpb25zJyk7XG4gICAgY29uc3QgeyB1c2VySWQgfSA9IHVzZXJQb2ludHM7XG5cbiAgICBhd2FpdCB0cnlDYXRjaChcbiAgICAgIGxpdmVRdWVzdGlvbnMudXBkYXRlKFxuICAgICAgICB7IHF1ZXN0aW9uSWQgfSwge1xuICAgICAgICAgICRwdXNoOiB7XG4gICAgICAgICAgICBhbHJlYWR5QW5zd2VyZWQ6IHVzZXJJZCxcbiAgICAgICAgICAgIGNhY2hlZFBvaW50czogdXNlclBvaW50c1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKVxuICAgICk7XG4gICAgbW9uZ28uY2xvc2UoKTtcbiAgfSxcblxuICBnZXRMaXZlUXVlc3Rpb25zKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBtb25nbyA9IGF3YWl0IHRyeUNhdGNoKE1vbmdvQ2xpZW50LmNvbm5lY3QodXJsKSk7XG4gICAgICBjb25zdCBjb2xsZWN0aW9uID0gbW9uZ28uZGIoREIpLmNvbGxlY3Rpb24oJ2xpdmVRdWVzdGlvbnMnKTtcbiAgICAgIGNvbnN0IGxpdmVRdWVzdGlvbnMgPSBhd2FpdCB0cnlDYXRjaChjb2xsZWN0aW9uLmZpbmQoKS50b0FycmF5KCkpO1xuICAgICAgcmVzb2x2ZShsaXZlUXVlc3Rpb25zKTtcbiAgICAgIG1vbmdvLmNsb3NlKCk7XG4gICAgfSk7XG4gIH0sXG5cbiAgYXN5bmMgc2VydmVMaXZlUXVlc3Rpb25zKHJlcSwgcmVzKSB7XG4gICAgY29uc3QgbW9uZ28gPSBhd2FpdCB0cnlDYXRjaChNb25nb0NsaWVudC5jb25uZWN0KHVybCkpO1xuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSBtb25nby5kYihEQikuY29sbGVjdGlvbignbGl2ZVF1ZXN0aW9ucycpO1xuICAgIGNvbnN0IGxpdmVRdWVzdGlvbnMgPSBhd2FpdCB0cnlDYXRjaChjb2xsZWN0aW9uLmZpbmQoKS50b0FycmF5KCkpO1xuICAgIHJlcy5qc29uKGxpdmVRdWVzdGlvbnMpO1xuICAgIG1vbmdvLmNsb3NlKCk7XG4gIH0sXG5cbiAgYXN5bmMgYWRkT3JVcGRhdGVVc2VyKG5ld1VzZXIpIHtcbiAgICBjb25zdCBtb25nbyA9IGF3YWl0IHRyeUNhdGNoKE1vbmdvQ2xpZW50LmNvbm5lY3QodXJsKSk7XG4gICAgY29uc3Qgc2NvcmVib2FyZCA9IG1vbmdvLmRiKERCKS5jb2xsZWN0aW9uKCdzY29yZWJvYXJkJyk7XG4gICAgY29uc3QgeyB1c2VySWQgfSA9IG5ld1VzZXI7XG4gICAgY29uc3QgdXNlciA9IGF3YWl0IHRyeUNhdGNoKHNjb3JlYm9hcmQuZmluZE9uZSh7dXNlcklkfSkpO1xuICAgIGlmICh1c2VyKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIGhhbmRsZSxcbiAgICAgICAgYXZhdGFyLFxuICAgICAgICBwcm9maWxlQmFubmVyLFxuICAgICAgICBmb2xsb3dpbmdcbiAgICAgIH0gPSBuZXdVc2VyO1xuXG4gICAgICBhd2FpdCB0cnlDYXRjaChcbiAgICAgICAgc2NvcmVib2FyZC51cGRhdGVPbmUoeyB1c2VySWQgfSwge1xuICAgICAgICAgICAgJHNldDogeyBuYW1lIH0sXG4gICAgICAgICAgICAkc2V0OiB7IGhhbmRsZSB9LFxuICAgICAgICAgICAgJHNldDogeyBhdmF0YXIgfSxcbiAgICAgICAgICAgICRzZXQ6IHsgcHJvZmlsZUJhbm5lciB9LFxuICAgICAgICAgICAgJHNldDogeyBmb2xsb3dpbmcgfVxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXdhaXQgdHJ5Q2F0Y2goc2NvcmVib2FyZC5pbnNlcnQobmV3VXNlcikpO1xuICAgIH1cbiAgICBtb25nby5jbG9zZSgpO1xuICB9LFxuXG4gIGFkanVzdFNjb3JlKHJlcSwgcmVzKSB7XG4gICAgLy8gVE9ETyBhZGp1c3QgYSBzY29yZSBtYW51YWxseVxuICB9LFxuXG4gIGFzeW5jIGdldFNjb3Jlcyh7cXVlcnk6IHtwYWdlID0gMSwgdmlldyA9ICd3ZWVrbHlTdGF0cycsIHNlYXJjaCA9ICcnfX0sIHJlcykge1xuICAgIGNvbnN0IG1vbmdvID0gYXdhaXQgdHJ5Q2F0Y2goTW9uZ29DbGllbnQuY29ubmVjdCh1cmwpKTtcbiAgICBjb25zdCBjb2xsZWN0aW9uID0gbW9uZ28uZGIoREIpLmNvbGxlY3Rpb24oJ3Njb3JlYm9hcmQnKTtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgdHJ5Q2F0Y2goXG4gICAgICBjb2xsZWN0aW9uLmZpbmQoe1xuICAgICAgICBoYW5kbGU6IHsgJHJlZ2V4OiBzZWFyY2gsICRvcHRpb25zOiAnaScgfSxcbiAgICAgICAgW2Ake3ZpZXd9LnNjb3JlYF06IHsgJGd0OiAwIH1cbiAgICAgIH0pXG4gICAgICAuc29ydCh7W2Ake3ZpZXd9LnNjb3JlYF06IC0xLCBoYW5kbGU6IDF9KVxuICAgICAgLmxpbWl0KFBBR0VfU0laRSpwYWdlKVxuICAgICAgLnRvQXJyYXkoKVxuICAgICk7XG4gICAgY29uc29sZS5sb2coJ2RhdGE6JywgZGF0YSlcbiAgICByZXMuanNvbihkYXRhKTtcbiAgICBtb25nby5jbG9zZSgpO1xuICB9LFxuXG4gIGFzeW5jIGdldFVzZXJTdGF0cyh7IHF1ZXJ5OiB7IGhhbmRsZSB9IH0sIHJlcykge1xuICAgIGNvbnN0IG1vbmdvID0gYXdhaXQgdHJ5Q2F0Y2goTW9uZ29DbGllbnQuY29ubmVjdCh1cmwpKTtcbiAgICBjb25zdCBzY29yZWJvYXJkID0gbW9uZ28uZGIoREIpLmNvbGxlY3Rpb24oJ3Njb3JlYm9hcmQnKTtcbiAgICBjb25zdCBvbGRDYXJkcyA9IG1vbmdvLmRiKERCKS5jb2xsZWN0aW9uKCdvbGRDYXJkcycpO1xuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB0cnlDYXRjaChzY29yZWJvYXJkLmZpbmRPbmUoe2hhbmRsZX0pKTtcblxuICAgIGlmICghdXNlcikge1xuICAgICAgcmVzLmpzb24obnVsbCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY2FyZElkcyA9IHVzZXIuYWxsVGltZVN0YXRzLmNvcnJlY3QubWFwKHJlY29yZCA9PiByZWNvcmQuY2FyZElkKTtcbiAgICBjb25zdCBlYXJuZWRDYXJkcyA9IGF3YWl0IHRyeUNhdGNoKFxuICAgICAgZ2V0Q2FyZHMoY2FyZElkcywgb2xkQ2FyZHMpXG4gICAgKTtcbiAgICB1c2VyLmVhcm5lZENhcmRzID0gZWFybmVkQ2FyZHM7XG4gICAgcmVzLmpzb24odXNlcik7XG4gIH0sXG5cbiAgLy8gVE9ETyAtIGRlbGV0ZSB0aGlzIG1ldGhvZCBpZiBub3QgbmVlZGVkXG4gIGFzeW5jIGdldFNjb3JlKHJlcSwgcmVzKSB7XG4gICAgY29uc3QgeyBoYW5kbGUgfSA9IHJlcS5wYXJhbXM7XG4gICAgY29uc3QgbW9uZ28gPSBhd2FpdCB0cnlDYXRjaChNb25nb0NsaWVudC5jb25uZWN0KHVybCkpO1xuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSBtb25nby5kYihEQikuY29sbGVjdGlvbignc2NvcmVib2FyZCcpO1xuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB0cnlDYXRjaChjb2xsZWN0aW9uLmZpbmRPbmUoe2hhbmRsZX0pKTtcbiAgICByZXMuanNvbih1c2VyKTtcbiAgICBtb25nby5jbG9zZSgpO1xuICB9LFxuXG4gIGFzeW5jIGFkZERlY2socmVxLCByZXMpIHtcbiAgICBjb25zdCBmaWxlUGF0aCA9IHJlcS5maWxlLnBhdGg7XG4gICAgY29uc3QgbmV3Q2FyZHMgPSBhd2FpdCB0cnlDYXRjaChwcm9jZXNzVXBsb2FkKGZpbGVQYXRoKSk7XG4gICAgY29uc3QgbW9uZ28gPSBhd2FpdCB0cnlDYXRjaChNb25nb0NsaWVudC5jb25uZWN0KHVybCkpO1xuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSBtb25nby5kYihEQikuY29sbGVjdGlvbignbmV3Q2FyZHMnKTtcbiAgICBjb25zdCBiYXRjaCA9IGNvbGxlY3Rpb24uaW5pdGlhbGl6ZVVub3JkZXJlZEJ1bGtPcCgpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdDYXJkcy5sZW5ndGg7ICsraSkge1xuICAgICAgYmF0Y2guaW5zZXJ0KG5ld0NhcmRzW2ldKTtcbiAgICB9XG5cbiAgICBhd2FpdCB0cnlDYXRjaChiYXRjaC5leGVjdXRlKCkpO1xuICAgIG1vbmdvLmNsb3NlKCk7XG5cbiAgICByZXMucmVkaXJlY3QoJy8nKTtcbiAgfSxcblxuICBnZXROZXdDYXJkcyhyZXEsIHJlcykge1xuICAgIGdldENvbGxlY3Rpb24ocmVxLCByZXMsICduZXdDYXJkcycpO1xuICB9LFxuXG4gIGdldE9sZENhcmRzKHJlcSwgcmVzKSB7XG4gICAgZ2V0Q29sbGVjdGlvbihyZXEsIHJlcywgJ29sZENhcmRzJyk7XG4gIH0sXG5cbiAgYXN5bmMgd2Vla2x5TW9udGhseVJlc2V0KHJlc2V0V2Vla2x5U3RhdHMsIHJlc2V0TW9udGhseVN0YXRzKSB7XG4gICAgY29uc3QgbW9uZ28gPSBhd2FpdCB0cnlDYXRjaChNb25nb0NsaWVudC5jb25uZWN0KHVybCkpO1xuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSBtb25nby5kYihEQikuY29sbGVjdGlvbignc2NvcmVib2FyZCcpO1xuXG4gICAgY29uc3QgemVybyA9IHtcbiAgICAgIHNjb3JlOiAwLFxuICAgICAgYXR0ZW1wdHM6IDAsXG4gICAgICBjb3JyZWN0OiAwXG4gICAgfTtcbiAgICBjb25zdCByZXNldCA9IHsgJHNldDoge30gfTtcbiAgICBpZiAocmVzZXRXZWVrbHlTdGF0cylcbiAgICAgIHJlc2V0LiRzZXQud2Vla2x5U3RhdHMgPSB6ZXJvO1xuXG4gICAgaWYgKHJlc2V0TW9udGhseVN0YXRzKVxuICAgICAgcmVzZXQuJHNldC5tb250aGx5U3RhdHMgPSB6ZXJvO1xuXG4gICAgY29sbGVjdGlvbi51cGRhdGUoXG4gICAgICB7fSwgcmVzZXQsIHsgbXVsdGk6IHRydWUgfVxuICAgICk7XG5cbiAgICBtb25nby5jbG9zZSgpO1xuICB9XG5cbn0gLy8gbW9kdWxlLmV4cG9ydHNcblxuZnVuY3Rpb24gZ2V0Q2FyZHMoaWRzLCBjb2xsZWN0aW9uKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHRyeUNhdGNoKFxuICAgICAgY29sbGVjdGlvbi5maW5kKHtjYXJkSWQ6IHskaW46IGlkc319KVxuICAgICAgICAgICAgICAgIC5wcm9qZWN0KHtfaWQ6IDAsIG1lZGlhVXJsczogMSwgcXVlc3Rpb25UZXh0OiAxLCBhbnN3ZXJzOiAxfSlcbiAgICAgICAgICAgICAgICAudG9BcnJheSgpXG4gICAgKTtcblxuICAgIGNvbnN0IGNhcmRzID0gZGF0YS5tYXAoY2FyZCA9PiB7XG4gICAgICBjYXJkLnF1ZXN0aW9uVGV4dCA9IGNhcmQucXVlc3Rpb25UZXh0LnNwbGl0KCdcXG4nKVswXTtcbiAgICAgIGNvbnN0IHMgPSBjYXJkLmFuc3dlcnMubGVuZ3RoID4gMSA/ICdzJyA6ICcnO1xuICAgICAgY2FyZC5hbnN3ZXJzID0gYEFuc3dlciR7c306ICR7Y2FyZC5hbnN3ZXJzLmpvaW4oJywgJyl9YDtcbiAgICAgIGNhcmQubWVkaWFVcmwgPSAoY2FyZC5tZWRpYVVybHMubGVuZ3RoID09PSAzKVxuICAgICAgICA/IGNhcmQubWVkaWFVcmxzWzFdXG4gICAgICAgIDogY2FyZC5tZWRpYVVybHNbMF07XG5cbiAgICAgIGRlbGV0ZSBjYXJkLm1lZGlhVXJscztcbiAgICAgIHJldHVybiBjYXJkO1xuICAgIH0pO1xuXG4gICAgcmVzb2x2ZShjYXJkcyk7XG4gIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRDb2xsZWN0aW9uKHJlcSwgcmVzLCBjb2xsZWN0aW9uTmFtZSkge1xuICBjb25zdCBtb25nbyA9IGF3YWl0IHRyeUNhdGNoKE1vbmdvQ2xpZW50LmNvbm5lY3QodXJsKSk7XG4gIGNvbnN0IGNvbGxlY3Rpb24gPSBtb25nby5kYihEQikuY29sbGVjdGlvbihjb2xsZWN0aW9uTmFtZSk7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCB0cnlDYXRjaChcbiAgICBjb2xsZWN0aW9uLmZpbmQoKVxuICAgICAgICAgICAgICAucHJvamVjdCh7X2lkOiAwfSlcbiAgICAgICAgICAgICAgLnRvQXJyYXkoKVxuICApO1xuICByZXMuanNvbihkYXRhKTtcbiAgbW9uZ28uY2xvc2UoKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlTGl2ZVF1ZXN0aW9uKG1vbmdvLCBjYXJkSWQpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBjb2xsZWN0aW9uID0gbW9uZ28uZGIoREIpLmNvbGxlY3Rpb24oJ2xpdmVRdWVzdGlvbnMnKTtcbiAgICBjb25zdCBjdXJyZW50UXVlc3Rpb24gPSBhd2FpdCB0cnlDYXRjaChjb2xsZWN0aW9uLmZpbmRPbmUoe2NhcmRJZH0pKTtcbiAgICBhd2FpdCB0cnlDYXRjaChjb2xsZWN0aW9uLnJlbW92ZShjdXJyZW50UXVlc3Rpb24pKTtcbiAgICBhd2FpdCB0cnlDYXRjaChhZGRQb2ludHNUb1Njb3JlYm9hcmQobW9uZ28sIGN1cnJlbnRRdWVzdGlvbikpO1xuICAgIHJlc29sdmUoKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZFBvaW50c1RvU2NvcmVib2FyZChtb25nbywgeyBjYWNoZWRQb2ludHMsIGNhcmRJZCB9KSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3Qgc2NvcmVib2FyZCA9IG1vbmdvLmRiKERCKS5jb2xsZWN0aW9uKCdzY29yZWJvYXJkJyk7XG4gICAgY29uc3Qgb2xkQ2FyZHMgPSBtb25nby5kYihEQikuY29sbGVjdGlvbignb2xkQ2FyZHMnKTtcbiAgICBjb25zdCBhbnN3ZXJQb3N0ZWRBdCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIG9sZENhcmRzLnVwZGF0ZU9uZSh7Y2FyZElkfSwgeyRzZXQ6IHthbnN3ZXJQb3N0ZWRBdH19KTtcblxuICAgIGNvbnN0IG9wcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FjaGVkUG9pbnRzLmxlbmd0aDsgKytpKSB7XG4gICAgICBjb25zdCB7IHVzZXJJZCwgcG9pbnRzIH0gPSBjYWNoZWRQb2ludHNbaV07XG4gICAgICBjb25zdCBvcCA9IHtcbiAgICAgICAgdXBkYXRlT25lOiB7XG4gICAgICAgICAgZmlsdGVyOiB7IHVzZXJJZCB9LFxuICAgICAgICAgIHVwZGF0ZToge1xuICAgICAgICAgICAgJGluYzoge1xuICAgICAgICAgICAgICAnYWxsVGltZVN0YXRzLnNjb3JlJzogcG9pbnRzLFxuICAgICAgICAgICAgICAnbW9udGhseVN0YXRzLnNjb3JlJzogcG9pbnRzLFxuICAgICAgICAgICAgICAnd2Vla2x5U3RhdHMuc2NvcmUnOiAgcG9pbnRzLFxuICAgICAgICAgICAgICAnYWxsVGltZVN0YXRzLmF0dGVtcHRzJzogMSxcbiAgICAgICAgICAgICAgJ21vbnRobHlTdGF0cy5hdHRlbXB0cyc6IDEsXG4gICAgICAgICAgICAgICd3ZWVrbHlTdGF0cy5hdHRlbXB0cyc6ICAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgaWYgKHBvaW50cyA+IDApIHtcbiAgICAgICAgb3AudXBkYXRlT25lLnVwZGF0ZS4kcHVzaCA9IHtcbiAgICAgICAgICAnYWxsVGltZVN0YXRzLmNvcnJlY3QnOiB7XG4gICAgICAgICAgICBhbnN3ZXJQb3N0ZWRBdCxcbiAgICAgICAgICAgIGNhcmRJZCxcbiAgICAgICAgICAgIHBvaW50c1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBvcC51cGRhdGVPbmUudXBkYXRlLiRpbmNbJ21vbnRobHlTdGF0cy5jb3JyZWN0J10gPSAxO1xuICAgICAgICBvcC51cGRhdGVPbmUudXBkYXRlLiRpbmNbJ3dlZWtseVN0YXRzLmNvcnJlY3QnXSAgPSAxO1xuICAgICAgfVxuXG4gICAgICBvcHMucHVzaChvcCk7XG4gICAgfVxuICAgIGlmIChvcHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXNvbHZlKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYXdhaXQgdHJ5Q2F0Y2goc2NvcmVib2FyZC5idWxrV3JpdGUob3BzKSk7XG4gICAgYXdhaXQgdHJ5Q2F0Y2gocmVjYWxjdWxhdGVSYW5rKHNjb3JlYm9hcmQpKTtcbiAgICByZXNvbHZlKCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZWNhbGN1bGF0ZVJhbmsoc2NvcmVib2FyZCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IHN0YXRzID0gYXdhaXQgdHJ5Q2F0Y2goc2NvcmVib2FyZC5hZ2dyZWdhdGUoW1xuICAgICAgeyAkcHJvamVjdDoge1xuICAgICAgICAgIF9pZDogMCxcbiAgICAgICAgICBvcmRlckJ5OiB7ICRsaXRlcmFsOiBbICd3ZWVrbHlTdGF0cycsICdtb250aGx5U3RhdHMnLCAnYWxsVGltZVN0YXRzJyBdIH0sXG4gICAgICAgICAgdXNlcklkOiAxLFxuICAgICAgICAgICdhbGxUaW1lU3RhdHMuc2NvcmUnOiAxLFxuICAgICAgICAgICdhbGxUaW1lU3RhdHMucmFuayc6ICAxLFxuICAgICAgICAgICdtb250aGx5U3RhdHMuc2NvcmUnOiAxLFxuICAgICAgICAgICdtb250aGx5U3RhdHMucmFuayc6ICAxLFxuICAgICAgICAgICd3ZWVrbHlTdGF0cy5zY29yZSc6ICAxLFxuICAgICAgICAgICd3ZWVrbHlTdGF0cy5yYW5rJzogICAxXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7ICR1bndpbmQ6ICckb3JkZXJCeScgfSxcbiAgICAgIHsgJGdyb3VwOlxuICAgICAgICB7IF9pZDpcbiAgICAgICAgICB7IG9yZGVyQnk6ICckb3JkZXJCeScsXG4gICAgICAgICAgICBzY29yZTpcbiAgICAgICAgICAgIHsgJHN3aXRjaDoge1xuICAgICAgICAgICAgICAgIGJyYW5jaGVzOiBbXG4gICAgICAgICAgICAgICAgICAgeyBjYXNlOiB7ICRlcTogWyckb3JkZXJCeScsICd3ZWVrbHlTdGF0cycgXSB9LCB0aGVuOiAnJHdlZWtseVN0YXRzLnNjb3JlJyAgfSxcbiAgICAgICAgICAgICAgICAgICB7IGNhc2U6IHsgJGVxOiBbJyRvcmRlckJ5JywgJ21vbnRobHlTdGF0cyddIH0sIHRoZW46ICckbW9udGhseVN0YXRzLnNjb3JlJyB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogJyRhbGxUaW1lU3RhdHMuc2NvcmUnXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHVzZXJzOiB7ICRwdXNoOiAnJCRDVVJSRU5UJyB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7ICRzb3J0OiB7ICdfaWQuc2NvcmUnOiAtMSB9IH0sXG4gICAgICB7ICRncm91cDpcbiAgICAgICAgeyBfaWQ6ICckX2lkLm9yZGVyQnknLFxuICAgICAgICAgIHNjb3Jlczoge1xuICAgICAgICAgICAgJHB1c2g6IHtcbiAgICAgICAgICAgICAgc2NvcmU6ICckX2lkLnNjb3JlJyxcbiAgICAgICAgICAgICAgdXNlcnM6ICckdXNlcnMnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgXSkudG9BcnJheSgpKTtcblxuICAgIGNvbnN0IHVzZXJzVG9VcGRhdGUgPSB7fTtcbiAgICBjb25zdCBjdXJyZW50UmFua3MgPSB7XG4gICAgICBhbGxUaW1lU3RhdHM6IDEsXG4gICAgICBtb250aGx5U3RhdHM6IDEsXG4gICAgICB3ZWVrbHlTdGF0czogIDFcbiAgICB9O1xuICAgIHN0YXRzLmZvckVhY2goKHsgX2lkOiBjYXRlZ29yeSwgc2NvcmVzIH0pID0+IHtcbiAgICAgIGNvbnN0IGVuZCA9IHNjb3Jlcy5sZW5ndGg7XG4gICAgICBsZXQgaSA9IDA7XG4gICAgICBmb3IgKDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRTdGF0ID0gc2NvcmVzW2ldO1xuICAgICAgICBpZiAoY3VycmVudFN0YXQuc2NvcmUgPT09IDApIGNvbnRpbnVlO1xuXG4gICAgICAgIGN1cnJlbnRTdGF0LnVzZXJzLmZvckVhY2godXNlciA9PiB7XG4gICAgICAgICAgY29uc3QgcHJldmlvdXNSYW5rID0gdXNlcltjYXRlZ29yeV0ucmFuaztcbiAgICAgICAgICBjb25zdCBjdXJyZW50UmFuayA9IGN1cnJlbnRSYW5rc1tjYXRlZ29yeV07XG4gICAgICAgICAgaWYgKHByZXZpb3VzUmFuayAhPT0gY3VycmVudFJhbmspIHtcbiAgICAgICAgICAgIGNvbnN0IGNhY2hlZFVwZGF0ZSA9IHVzZXJzVG9VcGRhdGVbdXNlci51c2VySWRdIHx8IHt9O1xuICAgICAgICAgICAgY2FjaGVkVXBkYXRlW2NhdGVnb3J5XSA9IGN1cnJlbnRSYW5rO1xuICAgICAgICAgICAgdXNlcnNUb1VwZGF0ZVt1c2VyLnVzZXJJZF0gPSBjYWNoZWRVcGRhdGU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY3VycmVudFJhbmtzW2NhdGVnb3J5XSArPSBjdXJyZW50U3RhdC51c2Vycy5sZW5ndGg7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBidWxrVXBkYXRlT3BzID0gW107XG4gICAgY29uc3QgdXNlcklkc1RvVXBkYXRlID0gT2JqZWN0LmtleXModXNlcnNUb1VwZGF0ZSk7XG4gICAgY29uc3QgZW5kID0gdXNlcklkc1RvVXBkYXRlLmxlbmd0aDtcbiAgICBsZXQgaSA9IDA7XG4gICAgZm9yICg7IGkgPCBlbmQ7IGkrKykge1xuICAgICAgY29uc3QgY3VycmVudFVzZXIgPSB1c2VySWRzVG9VcGRhdGVbaV07XG4gICAgICBjb25zdCB1c2VySWQgPSBOdW1iZXIoY3VycmVudFVzZXIpO1xuICAgICAgY29uc3Qgb3AgPSB7XG4gICAgICAgIHVwZGF0ZU9uZToge1xuICAgICAgICAgIGZpbHRlcjogeyB1c2VySWQgfSxcbiAgICAgICAgICB1cGRhdGU6IHtcbiAgICAgICAgICAgICRzZXQ6IHt9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgY29uc3QgdXNlclVwZGF0ZXMgPSB1c2Vyc1RvVXBkYXRlW2N1cnJlbnRVc2VyXTtcbiAgICAgIE9iamVjdC5rZXlzKGN1cnJlbnRSYW5rcykuZm9yRWFjaChjYXRlZ29yeSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld1JhbmsgPSB1c2VyVXBkYXRlc1tjYXRlZ29yeV07XG4gICAgICAgIGlmIChuZXdSYW5rKVxuICAgICAgICAgIG9wLnVwZGF0ZU9uZS51cGRhdGUuJHNldFtgJHtjYXRlZ29yeX0ucmFua2BdID0gbmV3UmFuaztcbiAgICAgIH0pO1xuXG4gICAgICBidWxrVXBkYXRlT3BzLnB1c2gob3ApO1xuXG4gICAgfSAvLyBmb3IgbG9vcFxuXG4gICAgYXdhaXQgdHJ5Q2F0Y2goc2NvcmVib2FyZC5idWxrV3JpdGUoYnVsa1VwZGF0ZU9wcykpO1xuICAgIHJlc29sdmUoKTtcbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZGJPcHMuanMiLCJjb25zdCB0d2l0ID0gcmVxdWlyZSgndHdpdCcpO1xuY29uc3Qge1xuICBUV0lUVEVSX0FQSV9LRVksXG4gIFRXSVRURVJfQVBJX1NFQ1JFVCxcbiAgVFdJVFRFUl9UT0tFTixcbiAgVFdJVFRFUl9UT0tFTl9TRUNSRVQsXG4gIFRXSVRURVJfQUNDT1VOVFxufSA9IHByb2Nlc3MuZW52O1xuXG4vLyBjb25zdCBhcHBDb25maWcgPSB7XG4vLyAgIGNvbnN1bWVyX2tleTogVFdJVFRFUl9BUElfS0VZLFxuLy8gICBjb25zdW1lcl9zZWNyZXQ6IFRXSVRURVJfQVBJX1NFQ1JFVCxcbi8vICAgYXBwX29ubHlfYXV0aDogdHJ1ZVxuLy8gfVxuXG5jb25zdCB1c2VyQ29uZmlnID0ge1xuICBjb25zdW1lcl9rZXk6IFRXSVRURVJfQVBJX0tFWSxcbiAgY29uc3VtZXJfc2VjcmV0OiBUV0lUVEVSX0FQSV9TRUNSRVQsXG4gIGFjY2Vzc190b2tlbjogVFdJVFRFUl9UT0tFTixcbiAgYWNjZXNzX3Rva2VuX3NlY3JldDogVFdJVFRFUl9UT0tFTl9TRUNSRVRcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IHR3aXQodXNlckNvbmZpZyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdHdpdHRlckNvbmZpZy5qcyIsImNvbnN0IHVybGVuY29kZSA9IHJlcXVpcmUoJ3VybGVuY29kZScpO1xuY29uc3QgV0VCTE9PS1VQX1VSTCA9ICdodHRwczovL2VqamUud2VibGlvLmpwL2NvbnRlbnQvJztcbmNvbnN0IHsgVFdJVFRFUl9BQ0NPVU5UIH0gPSBwcm9jZXNzLmVudjtcblxuY29uc3QgSE9VUlMgPSAzNjAwMDAwO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICBIT1VSUyxcblxuICBmb3JtYXRRdWVzdGlvbkFsdFRleHQoZXhwcmVzc2lvbikge1xuICAgIGNvbnN0IGhpbnQgPSBmb3JtYXRIaW50KGV4cHJlc3Npb24pO1xuICAgIGNvbnN0IFttaW4sIG1heF0gPSBtaW5NYXhDaGFycyhoaW50KTtcbiAgICBjb25zdCBtaW5NYXggPSBtaW4gPT09IG1heCA/IG1pbiA6IGAke21pbn0gdG8gJHttYXh9YDtcbiAgICBjb25zdCBzID0gbWF4ID4gMSA/ICdzJyA6ICcnO1xuICAgIGNvbnN0IHNjcmVlblJlYWRlckhpbnQgPSBgKCR7bWluTWF4fSBjaGFyYWN0ZXIke3N9KWA7XG4gICAgcmV0dXJuIGV4cHJlc3Npb24ucmVwbGFjZSgvXFx7XFx7Lis/XFx9XFx9L2csIHNjcmVlblJlYWRlckhpbnQpO1xuICB9LFxuXG4gIGZvcm1hdFF1ZXN0aW9uVGV4dChleHByZXNzaW9uLCBlbmdNZWFuaW5nLCBub3RlcywgY2FyZElEKSB7XG4gICAgY29uc3QgaGludCA9IGZvcm1hdEhpbnQoZXhwcmVzc2lvbik7XG4gICAgY29uc3QgW21pbiwgbWF4XSA9IG1pbk1heENoYXJzKGhpbnQpO1xuICAgIGNvbnN0IG1pbk1heCA9IG1pbiA9PT0gbWF4ID8gbWluIDogYCR7bWlufS0ke21heH1gO1xuICAgIGxldCB0d2VldFRleHQgPSBgV2hhdCAke21pbk1heH0gY2hhcmFjdGVyIGFuc3dlciBtZWFucyBcIiR7ZW5nTWVhbmluZ31cIj9gO1xuICAgIGlmIChuZWVkc0hpbnQoaGludCkpXG4gICAgICB0d2VldFRleHQgKz0gYFxcbkhpbnQ6ICR7aGludH1gO1xuXG4gICAgaWYgKG5vdGVzKSB0d2VldFRleHQgKz0gYFxcbk5vdGVzOiAke25vdGVzfWA7XG5cbiAgICB0d2VldFRleHQgKz0gYFxcblFJRCR7Y2FyZElEfWA7XG4gICAgcmV0dXJuIHR3ZWV0VGV4dDtcbiAgfSxcblxuICBmb3JtYXRBbnN3ZXJBbHRUZXh0KGV4cHJlc3Npb24pIHtcbiAgICByZXR1cm4gZXhwcmVzc2lvbi5yZXBsYWNlKC9cXHtcXHsuKj9cXDpcXDooLis/KVxcOlxcOi4qP1xcfVxcfS9nLCAnJDEnKTtcbiAgfSxcblxuICBmb3JtYXRBbnN3ZXJUZXh0KGFuc3dlcnMsIGVuZ01lYW5pbmcsIHdlYkxvb2t1cCwgY2FyZElkKSB7XG4gICAgY29uc3QgcyA9IGFuc3dlcnMubGVuZ3RoID4gMSA/ICdzJyA6ICcnO1xuICAgIGxldCBhbnN3ZXJUZXh0ID0gYEFuc3dlciR7c306ICR7YW5zd2Vycy5qb2luKCcsICcpfWA7XG4gICAgYW5zd2VyVGV4dCArPSBgXFxuRW5nbGlzaCBNZWFuaW5nOiBcIiR7ZW5nTWVhbmluZ31cImA7XG4gICAgYW5zd2VyVGV4dCArPSAnXFxuRGVmaW5pdGlvbjogJyArIFdFQkxPT0tVUF9VUkwgKyB1cmxlbmNvZGUod2ViTG9va3VwKTtcbiAgICBhbnN3ZXJUZXh0ICs9IGBcXG5RSUQke2NhcmRJZH1gO1xuICAgIHJldHVybiBhbnN3ZXJUZXh0O1xuICB9LFxuXG4gIGFkZFF1ZXN0aW9uTGluayhhbnN3ZXJUZXh0LCBxdWVzdGlvbklkKSB7XG4gICAgY29uc3QgcXVlc3Rpb25MaW5rID0gYFF1ZXN0aW9uOiB0d2l0dGVyLmNvbS8ke1RXSVRURVJfQUNDT1VOVH0vc3RhdHVzLyR7cXVlc3Rpb25JZH1gO1xuICAgIGNvbnN0IGxpbmVzID0gYW5zd2VyVGV4dC5zcGxpdCgnXFxuJyk7XG4gICAgbGluZXMuc3BsaWNlKC0xLCAwLCBxdWVzdGlvbkxpbmspO1xuICAgIHJldHVybiBsaW5lcy5qb2luKCdcXG4nKTtcbiAgfSxcblxuICBnZXRBbnN3ZXJzKGV4cHJlc3Npb24sIGFsdEFuc3dlcnMpIHtcbiAgICBjb25zdCBhY2NlcHRlZEFuc3dlciA9IGV4cHJlc3Npb24ubWF0Y2goL1xcOlxcOiguKz8pXFw6XFw6LylbMV07XG4gICAgbGV0IG90aGVyQW5zd2VycyA9IFtdO1xuICAgIGlmIChhbHRBbnN3ZXJzICYmIGFsdEFuc3dlcnMubGVuZ3RoID4gMClcbiAgICAgIG90aGVyQW5zd2VycyA9IGFsdEFuc3dlcnMuc3BsaXQoJywnKTtcblxuICAgIHJldHVybiBbYWNjZXB0ZWRBbnN3ZXJdLmNvbmNhdChvdGhlckFuc3dlcnMpO1xuICB9LFxuXG4gIGNhbGN1bGF0ZVNjb3JlKGFuc3dlclBvc3RlZEF0LCB7cXVlc3Rpb25Qb3N0ZWRBdCwgYWxyZWFkeUFuc3dlcmVkfSkge1xuICAgIGNvbnN0IHRpbWVUb0Fuc3dlciA9IE1hdGguZmxvb3IoXG4gICAgICAobmV3IERhdGUoYW5zd2VyUG9zdGVkQXQpIC0gbmV3IERhdGUocXVlc3Rpb25Qb3N0ZWRBdCkpIC8gSE9VUlNcbiAgICApO1xuICAgIGNvbnN0IHNjb3JlID0gMjQgLSB0aW1lVG9BbnN3ZXI7XG5cbiAgICByZXR1cm4gTWF0aC5tYXgoc2NvcmUsIDApO1xuICB9LFxuXG4gIGV4dHJhY3RBbnN3ZXIodGV4dCkge1xuICAgIHJldHVybiB0ZXh0LnRyaW0oKS5zbGljZShUV0lUVEVSX0FDQ09VTlQubGVuZ3RoICsgMik7XG4gIH0sXG5cbiAgZ2V0VGltZVVudGlsKGhvdXIpIHtcbiAgICAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80NDU1MjgyL2NhbGwtYS1qYXZhc2NyaXB0LWZ1bmN0aW9uLWF0LWEtc3BlY2lmaWMtdGltZS1vZi1kYXlcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IG1pbGxpc1VudGlsVGltZSA9IG5ldyBEYXRlKFxuICAgICAgbm93LmdldEZ1bGxZZWFyKCksXG4gICAgICBub3cuZ2V0TW9udGgoKSxcbiAgICAgIG5vdy5nZXREYXRlKCksXG4gICAgICBob3VyLCAwLCAwLCAwKSAtIG5vdztcblxuICAgIGlmIChtaWxsaXNVbnRpbFRpbWUgPCAwKSAvLyBhbHJlYWR5IHBhc3NlZCBmb3IgdG9kYXksIHdhaXQgdW50aWwgdG9tb3Jyb3dcbiAgICAgIG1pbGxpc1VudGlsVGltZSArPSAyNCpIT1VSUztcblxuICAgIHJldHVybiBtaWxsaXNVbnRpbFRpbWU7XG4gIH0sXG5cbiAgdHJ5Q2F0Y2gocHJvbWlzZSkge1xuICAgcmV0dXJuIHByb21pc2VcbiAgICAgLnRoZW4oZGF0YSA9PiBkYXRhKVxuICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvcjonLGVycik7XG4gICAgICAgcmV0dXJuIHt9O1xuICAgICB9KTtcbiAgfSxcblxuICBjb250YWlucyhpdGVtLCBsaXN0KSB7XG4gICAgcmV0dXJuIHZhbGlkKGxpc3QuaW5kZXhPZihpdGVtKSk7XG4gIH1cblxufSAvLyBtb2R1bGUuZXhwb3J0c1xuXG5cbmZ1bmN0aW9uIHZhbGlkKGluZGV4KSB7XG4gIHJldHVybiBpbmRleCAhPT0gLTE7XG59XG5cbmZ1bmN0aW9uIG5lZWRzSGludChoaW50KSB7XG4gIHJldHVybiBoaW50LnJlcGxhY2UoL1xcW1xcXS9nLCAnJykudHJpbSgpLmxlbmd0aCAhPT0gMDtcbn1cblxuZnVuY3Rpb24gbWF4Q2hhcnMoaGludCkge1xuICBjb25zdCBtaXNzaW5nQ2hhclJlZ2V4ID0gL1xcWy4qP1xcXS9nO1xuICBjb25zdCBtaXNzaW5nQ2hhcnMgPSAoaGludC5tYXRjaChtaXNzaW5nQ2hhclJlZ2V4KSB8fCBbXSkubGVuZ3RoXG4gIGNvbnN0IGdpbW1lQ2hhcnMgPSBoaW50LnJlcGxhY2UobWlzc2luZ0NoYXJSZWdleCwgJycpLnJlcGxhY2UoL1tcXHMrXFwoXFwpXS9nLCAnJykubGVuZ3RoO1xuXG4gIHJldHVybiBtaXNzaW5nQ2hhcnMgKyBnaW1tZUNoYXJzO1xufVxuXG5mdW5jdGlvbiBtaW5DaGFycyhoaW50KSB7XG4gIGNvbnN0IG9wdGlvbmFsQ2hhcnMgPSAoaGludC5tYXRjaCgvXFw/L2cpIHx8IFtdKS5sZW5ndGhcbiAgcmV0dXJuIG1heENoYXJzKGhpbnQpIC0gb3B0aW9uYWxDaGFycztcbn1cblxuZnVuY3Rpb24gbWluTWF4Q2hhcnMoaGludCkge1xuICByZXR1cm4gW21pbkNoYXJzKGhpbnQpLCBtYXhDaGFycyhoaW50KV07XG59XG5cbmZ1bmN0aW9uIGZvcm1hdEhpbnQoZXhwcmVzc2lvbikge1xuICBjb25zdCBsZWdlbmQgPSBleHByZXNzaW9uLm1hdGNoKC9cXDpcXDouKz9cXDpcXDooLis/KVxcfVxcfS8pWzFdO1xuICBjb25zdCBub3JtYWxpemVkID0gZ3JvdXBNdWx0aVhzKGdyb3VwWHMoZ3JvdXBRdWVzdGlvbk1hcmtzKGxlZ2VuZCkpKTtcblxuICByZXR1cm4gZmxhdHRlbihzcGxpdChub3JtYWxpemVkKSkubWFwKGdyb3VwID0+IHtcbiAgICBpZiAoZ3JvdXAgPT09ICcuJylcbiAgICAgIHJldHVybiAnW10nO1xuXG4gICAgaWYgKGdyb3VwID09PSAnLScpXG4gICAgICByZXR1cm4gJ1tdIFtdIFtdIFtdIFtdJ1xuXG4gICAgaWYgKC9cXD8vLnRlc3QoZ3JvdXApKSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICAgIGNvbnN0IG51bUNoYXJzID0gTnVtYmVyKGdyb3VwLm1hdGNoKC9cXGQrLylbMF0pXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bUNoYXJzOyBpKyspXG4gICAgICAgIHJlc3VsdC5wdXNoKCdbP10nKVxuXG4gICAgICBpZiAocmVzdWx0Lmxlbmd0aCA9PT0gMSlcbiAgICAgICAgcmV0dXJuICdbP10nO1xuXG4gICAgICByZXR1cm4gJygnICsgcmVzdWx0LmpvaW4oJyAnKSArICcpJ1xuICAgIH1cblxuICAgIGlmICgv4omgLy50ZXN0KGdyb3VwKSkge1xuICAgICAgY29uc3QgbmVnYXRlZENoYXJzID0gZ3JvdXAucmVwbGFjZSgv4omgL2csICcnKTtcbiAgICAgIHJldHVybiBgW+KJoCR7bmVnYXRlZENoYXJzfV1gXG4gICAgfVxuICAgIC8vIGVsc2UgKGNoYXJhY3RlciBnaW1tZSlcbiAgICByZXR1cm4gZ3JvdXA7XG4gIH0pLmpvaW4oJyAnKTtcbn1cblxuZnVuY3Rpb24gZ3JvdXBRdWVzdGlvbk1hcmtzKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoLyhcXD8rKS9nLCAobWF0Y2gsIHAxKSA9PiBgKCR7cDEubGVuZ3RofT8pYCk7XG59XG5cbmZ1bmN0aW9uIGdyb3VwWHMoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcucmVwbGFjZSgv4omgW14oXS9nLCAnKCQmKScpO1xufVxuXG5mdW5jdGlvbiBncm91cE11bHRpWHMoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcucmVwbGFjZSgv4omgXFwoKC4qKVxcKS9nLCAnKOKJoCQxKScpXG59XG5cbmZ1bmN0aW9uIHNwbGl0KHN0cikge1xuICByZXR1cm4gc3RyLnNwbGl0KC9bXFwoXFwpXS8pXG4gICAgICAgICAgICAubWFwKGdyb3VwID0+XG4gICAgICAgICAgICAgIC9cXD984omgLy50ZXN0KGdyb3VwKVxuICAgICAgICAgICAgICA/IGdyb3VwXG4gICAgICAgICAgICAgIDogZ3JvdXAuc3BsaXQoJycpXG4gICAgICAgICAgICApO1xufVxuXG5mdW5jdGlvbiBzY2FsYXIodikge1xuICByZXR1cm4gIUFycmF5LmlzQXJyYXkodik7XG59XG5cbmZ1bmN0aW9uIGZsYXR0ZW4oZGVlcCwgZmxhdCA9IFtdKSB7XG4gIGlmIChkZWVwLmxlbmd0aCA9PT0gMClcbiAgICByZXR1cm4gZmxhdDtcblxuICBsZXQgW2hlYWQsIC4uLnRhaWxdID0gZGVlcDtcbiAgcmV0dXJuIHNjYWxhcihoZWFkKVxuICAgID8gZmxhdHRlbih0YWlsLCBmbGF0LmNvbmNhdChoZWFkKSlcbiAgICA6IGZsYXR0ZW4odGFpbCwgZmxhdC5jb25jYXQoZmxhdHRlbihoZWFkKSkpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWxzL3V0aWxzLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQGJhYmVsL3BvbHlmaWxsXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiQGJhYmVsL3BvbHlmaWxsXCJcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09ICdkZXYnKVxuICByZXF1aXJlKCdkb3RlbnYnKS5jb25maWcoKTtcblxuY29uc3QgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCBib2R5UGFyc2VyID0gcmVxdWlyZSgnYm9keS1wYXJzZXInKTtcbmNvbnN0IHR3aXR0ZXJCb3QgPSByZXF1aXJlKCcuL3R3aXR0ZXJCb3QnKTtcblxuYXBwLnNldCgncG9ydCcsIChwcm9jZXNzLmVudi5QT1JUIHx8IDMwMDApKTtcbmFwcC51c2UoZXhwcmVzcy5zdGF0aWMocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uL2Rpc3QnKSkpO1xuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XG5cbnJlcXVpcmUoJy4vYXBpJykoYXBwKTtcblxuLy90d2l0dGVyQm90LnN0YXJ0KCk7XG5cbmFwcC5saXN0ZW4oYXBwLmdldCgncG9ydCcpLCAoKSA9PlxuICBjb25zb2xlLmxvZygnTGlzdGVuaW5nIG9uIHBvcnQnLCBhcHAuZ2V0KCdwb3J0JykpXG4pO1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBhcHA7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VydmVyLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZG90ZW52XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZG90ZW52XCJcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImV4cHJlc3NcIlxuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImJvZHktcGFyc2VyXCJcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IERCID0gcmVxdWlyZSgnLi9kYk9wcycpO1xuY29uc3Qge1xuICBIT1VSUyxcbiAgYWRkUXVlc3Rpb25MaW5rLFxuICBjYWxjdWxhdGVTY29yZSxcbiAgY29udGFpbnMsXG4gIGV4dHJhY3RBbnN3ZXIsXG4gIGdldEZvbGxvd2luZyxcbiAgZ2V0VGltZVVudGlsLFxuICBwb3N0TWVkaWEsXG4gIHRyeUNhdGNoXG59ID0gcmVxdWlyZSgnVXRpbHMnKTtcbmNvbnN0IFR3aXR0ZXIgPSByZXF1aXJlKCcuL3R3aXR0ZXJDb25maWcnKTtcbmNvbnN0IHsgVFdJVFRFUl9BQ0NPVU5UIH0gPSBwcm9jZXNzLmVudjtcblxuY29uc3QgQU5TV0VSX0lOVEVSVkFMID0gNDAwMDA7XG5sZXQgUVVFU1RJT05fSU5URVJWQUwgPSAxMDAwMDtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHN0YXJ0OiAoKSA9PiB7XG4gICAgb3BlblN0cmVhbSgpO1xuICAgIHNldEludGVydmFsKHR3ZWV0UmFuZG9tUXVlc3Rpb24sIFFVRVNUSU9OX0lOVEVSVkFMKTtcbiAgfVxuICAvLyBzdGFydDogKCkgPT4ge1xuICAvLyAgIG9wZW5TdHJlYW0oKTtcbiAgLy8gICBzZXRTdGFydFRpbWVzKCk7XG4gIC8vIH1cbn07XG5cbmZ1bmN0aW9uIHNldFN0YXJ0VGltZXMoKSB7XG4gIGNvbnN0IHRpbWVVbnRpbDdQTSA9IGdldFRpbWVVbnRpbCgxOSk7XG4gIGNvbnN0IHRpbWVVbnRpbE1pZG5pZ2h0ID0gZ2V0VGltZVVudGlsKDApO1xuXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIHNldEludGVydmFsKHR3ZWV0UmFuZG9tUXVlc3Rpb24sIFFVRVNUSU9OX0lOVEVSVkFMKTtcbiAgfSwgdGltZVVudGlsN1BNKTtcblxuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBzZXRJbnRlcnZhbCh3ZWVrbHlNb250aGx5UmVzZXQsIDI0KkhPVVJTKTtcbiAgfSwgdGltZVVudGlsTWlkbmlnaHQpO1xufVxuXG5hc3luYyBmdW5jdGlvbiB0d2VldFJhbmRvbVF1ZXN0aW9uKCkge1xuICBjb25zdCB7XG4gICAgY2FyZElkLFxuICAgIHF1ZXN0aW9uVGV4dCxcbiAgICBxdWVzdGlvbkltZyxcbiAgICBxdWVzdGlvbkFsdFRleHQsXG4gICAgcHJldkxpbmVJbWcsXG4gICAgcHJldkxpbmVBbHRUZXh0LFxuICAgIGFuc3dlcnNcbiAgfSA9IGF3YWl0IHRyeUNhdGNoKERCLmdldFJhbmRvbVF1ZXN0aW9uKCkpO1xuICBpZiAoIWNhcmRJZCkgcmV0dXJuO1xuXG4gIGNvbnN0IHtcbiAgICBxdWVzdGlvbklkLFxuICAgIHF1ZXN0aW9uUG9zdGVkQXQsXG4gICAgbWVkaWFVcmxzXG4gIH0gPSBhd2FpdCB0cnlDYXRjaChcbiAgICBwb3N0TWVkaWEoXG4gICAgICBxdWVzdGlvblRleHQsXG4gICAgICBxdWVzdGlvbkltZyxcbiAgICAgIHF1ZXN0aW9uQWx0VGV4dCxcbiAgICAgIHByZXZMaW5lSW1nLFxuICAgICAgcHJldkxpbmVBbHRUZXh0XG4gICAgKVxuICApO1xuXG4gIGNvbnN0IGxpdmVRdWVzdGlvbiA9IHtcbiAgICBjYXJkSWQsXG4gICAgcXVlc3Rpb25JZCxcbiAgICBxdWVzdGlvblRleHQsXG4gICAgYW5zd2VycyxcbiAgICBxdWVzdGlvblBvc3RlZEF0LFxuICAgIGNhY2hlZFBvaW50czogW10sXG4gICAgYWxyZWFkeUFuc3dlcmVkOiBbXVxuICB9O1xuICBEQi5hZGRMaXZlUXVlc3Rpb24obGl2ZVF1ZXN0aW9uLCBtZWRpYVVybHMpO1xuICBzZXRUaW1lb3V0KCgpID0+IHR3ZWV0QW5zd2VyKGNhcmRJZCwgcXVlc3Rpb25JZCksIEFOU1dFUl9JTlRFUlZBTCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHR3ZWV0QW5zd2VyKGNhcmRJZCwgcXVlc3Rpb25JZCkge1xuICBjb25zdCB7XG4gICAgYW5zd2VyVGV4dCxcbiAgICBhbnN3ZXJJbWcsXG4gICAgYW5zd2VyQWx0VGV4dFxuICB9ID0gYXdhaXQgdHJ5Q2F0Y2goXG4gICAgLy8gRUZGRUNUUzpcbiAgICAvLyAtIHJlbW92ZXMgcXVlc3Rpb24gZnJvbSBsaXZlUXVlc3Rpb25zXG4gICAgLy8gLSBhZGRzIGNhY2hlZCBwb2ludHMgdG8gc2NvcmVib2FyZFxuICAgIC8vXG4gICAgLy8gUkVUVVJOUzpcbiAgICAvLyBBbnN3ZXJDYXJkXG4gICAgREIucmV2ZWFsQW5zd2VyV29ya2Zsb3coY2FyZElkKVxuICApO1xuXG4gIGNvbnN0IHsgbWVkaWFVcmxzIH0gPSBhd2FpdCB0cnlDYXRjaChcbiAgICBwb3N0TWVkaWEoXG4gICAgICBhZGRRdWVzdGlvbkxpbmsoYW5zd2VyVGV4dCwgcXVlc3Rpb25JZCksXG4gICAgICBhbnN3ZXJJbWcsXG4gICAgICBhbnN3ZXJBbHRUZXh0XG4gICAgKVxuICApO1xuXG4gIERCLmFkZE1lZGlhVXJsc1RvQ2FyZChjYXJkSWQsIG1lZGlhVXJscyk7XG59XG5cbmZ1bmN0aW9uIG9wZW5TdHJlYW0oKSB7XG4gIGNvbnN0IHN0cmVhbSA9IFR3aXR0ZXIuc3RyZWFtKCdzdGF0dXNlcy9maWx0ZXInLCB7IHRyYWNrOiBgQCR7VFdJVFRFUl9BQ0NPVU5UfWAgfSk7XG5cbiAgc3RyZWFtLm9uKCd0d2VldCcsIGFzeW5jICh7XG4gICAgaW5fcmVwbHlfdG9fc3RhdHVzX2lkX3N0cjogcXVlc3Rpb25JZCxcbiAgICBjcmVhdGVkX2F0OiBhbnN3ZXJQb3N0ZWRBdCxcbiAgICB0ZXh0LFxuICAgIHVzZXI6IHtcbiAgICAgIGlkOiB1c2VySWQsXG4gICAgICBuYW1lLFxuICAgICAgc2NyZWVuX25hbWU6IGhhbmRsZSxcbiAgICAgIHByb2ZpbGVfaW1hZ2VfdXJsX2h0dHBzOiBhdmF0YXIsXG4gICAgICBwcm9maWxlX2Jhbm5lcl91cmw6IHByb2ZpbGVCYW5uZXJcbiAgICB9XG4gIH0pID0+IHtcbiAgICBjb25zdCBsaXZlUXVlc3Rpb25zID0gYXdhaXQgdHJ5Q2F0Y2goREIuZ2V0TGl2ZVF1ZXN0aW9ucygpKTtcbiAgICBjb25zdCBmb3VuZFF1ZXN0aW9uID0gbGl2ZVF1ZXN0aW9ucy5maW5kKFxuICAgICAgcXVlc3Rpb25DYXJkID0+IHF1ZXN0aW9uQ2FyZC5xdWVzdGlvbklkID09PSBxdWVzdGlvbklkXG4gICAgKTtcblxuICAgIGlmIChmb3VuZFF1ZXN0aW9uKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGFscmVhZHlBbnN3ZXJlZCxcbiAgICAgICAgYW5zd2VyczogYWNjZXB0ZWRBbnN3ZXJzXG4gICAgICB9ID0gZm91bmRRdWVzdGlvbjtcbiAgICAgIGlmIChjb250YWlucyh1c2VySWQsIGFscmVhZHlBbnN3ZXJlZCkpXG4gICAgICAgIHJldHVybjtcblxuICAgICAgY29uc3QgZm9sbG93aW5nID0gYXdhaXQgdHJ5Q2F0Y2goZ2V0Rm9sbG93aW5nKHVzZXJJZCkpO1xuICAgICAgY29uc3QgbmV3VXNlciA9IHtcbiAgICAgICAgdXNlcklkLFxuICAgICAgICBuYW1lLFxuICAgICAgICBoYW5kbGUsXG4gICAgICAgIGF2YXRhcixcbiAgICAgICAgcHJvZmlsZUJhbm5lcixcbiAgICAgICAgZm9sbG93aW5nLFxuICAgICAgICBhbGxUaW1lU3RhdHM6IHtcbiAgICAgICAgICBzY29yZTogMCxcbiAgICAgICAgICBhdHRlbXB0czogMCxcbiAgICAgICAgICBjb3JyZWN0OiBbXVxuICAgICAgICB9LFxuICAgICAgICBtb250aGx5U3RhdHM6IHtcbiAgICAgICAgICBzY29yZTogMCxcbiAgICAgICAgICBhdHRlbXB0czogMCxcbiAgICAgICAgICBjb3JyZWN0OiAwXG4gICAgICAgIH0sXG4gICAgICAgIHdlZWtseVN0YXRzOiB7XG4gICAgICAgICAgc2NvcmU6IDAsXG4gICAgICAgICAgYXR0ZW1wdHM6IDAsXG4gICAgICAgICAgY29ycmVjdDogMFxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgREIuYWRkT3JVcGRhdGVVc2VyKG5ld1VzZXIpO1xuXG4gICAgICBjb25zdCB1c2VyQW5zd2VyID0gZXh0cmFjdEFuc3dlcih0ZXh0KTtcbiAgICAgIGlmIChjb250YWlucyh1c2VyQW5zd2VyLCBhY2NlcHRlZEFuc3dlcnMpKSB7XG4gICAgICAgIGNvbnN0IHBvaW50cyA9IGNhbGN1bGF0ZVNjb3JlKGFuc3dlclBvc3RlZEF0LCBmb3VuZFF1ZXN0aW9uKTtcbiAgICAgICAgREIudXBkYXRlTGl2ZVF1ZXN0aW9uKHF1ZXN0aW9uSWQsIHsgdXNlcklkLCBwb2ludHMgfSk7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIERCLnVwZGF0ZUxpdmVRdWVzdGlvbihxdWVzdGlvbklkLCB7IHVzZXJJZCwgcG9pbnRzOiAwIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgc3RyZWFtLm9uKCdkaXNjb25uZWN0JywgKGRpc2Nvbm5lY3RNc2cpID0+IHtcbiAgICBjb25zb2xlLmVycm9yKCdUd2VldCBzdHJlYW0gZGlzY29ubmVjdGVkOicsIGRpc2Nvbm5lY3RNc2cpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gc3RyZWFtLnN0YXJ0KCksIDEwMCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiB3ZWVrbHlNb250aGx5UmVzZXQoKSB7XG4gIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gIGNvbnN0IHJlc2V0V2Vla2x5U3RhdHMgPSBub3cuZ2V0RGF5KCkgPT09IDA7XG4gIGNvbnN0IHJlc2V0TW9udGhseVN0YXRzID0gbm93LmdldERhdGUoKSA9PT0gMTtcblxuICBpZiAocmVzZXRXZWVrbHlTdGF0cyB8fCByZXNldE1vbnRobHlTdGF0cylcbiAgICBEQi53ZWVrbHlNb250aGx5UmVzZXQocmVzZXRXZWVrbHlTdGF0cywgcmVzZXRNb250aGx5U3RhdHMpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3R3aXR0ZXJCb3QuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb25nb2RiXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwibW9uZ29kYlwiXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5jb25zdCBQTkcgPSByZXF1aXJlKCdwbmdqczInKS5QTkc7XG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuY29uc3QgdW56aXAgPSByZXF1aXJlKCd1bnppcC1zdHJlYW0nKTtcbmNvbnN0IFVQTE9BRFNfUEFUSCA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi91cGxvYWRzJyk7XG5jb25zdCB7XG4gIGZvcm1hdFF1ZXN0aW9uQWx0VGV4dCxcbiAgZm9ybWF0UXVlc3Rpb25UZXh0LFxuICBmb3JtYXRBbnN3ZXJBbHRUZXh0LFxuICBmb3JtYXRBbnN3ZXJUZXh0LFxuICBnZXRBbnN3ZXJzLFxuICB0cnlDYXRjaFxufSA9IHJlcXVpcmUoJ1V0aWxzJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHByb2Nlc3NVcGxvYWQsXG4gIHBhcnNlQW5raUpzb24sXG4gIG9wdGltaXplSW1hZ2VzXG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NVcGxvYWQoemlwZmlsZVBhdGgpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBzdHJlYW0gPSBmcy5jcmVhdGVSZWFkU3RyZWFtKHppcGZpbGVQYXRoKVxuICAgICAgLnBpcGUodW56aXAuRXh0cmFjdCh7IHBhdGg6ICd1cGxvYWRzJyB9KSk7XG5cbiAgICBzdHJlYW0ub24oJ2Nsb3NlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgZmlsZXMgPSBmcy5yZWFkZGlyU3luYyhVUExPQURTX1BBVEgpO1xuICAgICAgYXdhaXQgdHJ5Q2F0Y2gob3B0aW1pemVJbWFnZXMoVVBMT0FEU19QQVRIICsgJy9tZWRpYScpKTtcbiAgICAgIGNvbnNvbGUubG9nKCdGaW5pc2hlZCBvcHRpbWl6aW5nIGltYWdlcyEnKTtcbiAgICAgIGNvbnN0IG5ld0NhcmRzID0gZXh0cmFjdENhcmRJbmZvKGZpbGVzKTtcblxuICAgICAgY2xlYW5VcChmaWxlcyk7XG4gICAgICByZXNvbHZlKG5ld0NhcmRzKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG9wdGltaXplSW1hZ2VzKGRpclBhdGgpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBmaWxlc1Byb2Nlc3NpbmcgPSBbXTtcbiAgICBmcy5yZWFkZGlyU3luYyhkaXJQYXRoKS5mb3JFYWNoKGZpbGUgPT4ge1xuICAgICAgaWYgKC8uKlxcLnBuZyQvLnRlc3QoZmlsZSkpIHtcbiAgICAgICAgY29uc3QgY3VycmVudEZpbGUgPSBkaXJQYXRoICsgXCIvXCIgKyBmaWxlO1xuICAgICAgICBjb25zdCBjb250ZW50cyA9IGZzLnJlYWRGaWxlU3luYyhjdXJyZW50RmlsZSk7XG4gICAgICAgIGNvbnN0IHdyaXRlU3RyZWFtID0gZnMuY3JlYXRlV3JpdGVTdHJlYW0oY3VycmVudEZpbGUpO1xuICAgICAgICBjb25zdCBjdXJyZW50SW1hZ2UgPSBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+XG4gICAgICAgICAgd3JpdGVTdHJlYW0ub24oJ2Nsb3NlJywgcmVzKVxuICAgICAgICApO1xuICAgICAgICBmaWxlc1Byb2Nlc3NpbmcucHVzaChjdXJyZW50SW1hZ2UpO1xuICAgICAgICBuZXcgUE5HKHsgZmlsdGVyVHlwZTogNCwgZGVmbGF0ZUxldmVsOiAxIH0pXG4gICAgICAgICAgLnBhcnNlKGNvbnRlbnRzLCAoZXJyLCBwbmcpID0+IHtcbiAgICAgICAgICAgIC8vIEdpdmUgdXBwZXIgbGVmdCBwaXhlbCBhbiBvcGFjaXR5XG4gICAgICAgICAgICAvLyBvZiAyNTQgc28gVHdpdHRlciB3b24ndCBjb252ZXJ0XG4gICAgICAgICAgICAvLyB0byBqcGVnXG4gICAgICAgICAgICBwbmcuZGF0YVszXSAtPSAxO1xuICAgICAgICAgICAgcG5nLnBhY2soKS5waXBlKHdyaXRlU3RyZWFtKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBQcm9taXNlLmFsbChmaWxlc1Byb2Nlc3NpbmcpLnRoZW4ocmVzb2x2ZSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBleHRyYWN0Q2FyZEluZm8oZmlsZXMpIHtcbiAgbGV0IGFsbE5ld0NhcmRzID0gW107XG4gIGZvciAobGV0IGZpbGUgb2YgZmlsZXMpIHtcbiAgICBjb25zdCBjdXJyZW50RmlsZSA9IGAke1VQTE9BRFNfUEFUSH0vJHtmaWxlfWA7XG4gICAgY29uc3Qgc3RhdHMgPSBmcy5zdGF0U3luYyhjdXJyZW50RmlsZSk7XG5cbiAgICBpZiAoc3RhdHMuaXNGaWxlKCkgJiYgZmlsZS5tYXRjaCgvLitcXC5qc29uJC8pKSB7XG4gICAgICBjb25zdCBuZXdDYXJkcyA9IHBhcnNlQW5raUpzb24oY3VycmVudEZpbGUpO1xuICAgICAgYWxsTmV3Q2FyZHMgPSBhbGxOZXdDYXJkcy5jb25jYXQobmV3Q2FyZHMpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYWxsTmV3Q2FyZHM7XG59XG5cbmZ1bmN0aW9uIHBhcnNlQW5raUpzb24oZmlsZVBhdGgpIHtcbiAgY29uc3QgY29udGVudHMgPSBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhmaWxlUGF0aCwgJ3V0ZjgnKSk7XG4gIHJldHVybiBjb250ZW50cy5ub3Rlcy5tYXAoY2FyZCA9PiB7XG4gICAgbGV0IFtcbiAgICAgIGV4cHJlc3Npb24sXG4gICAgICAsIC8vIHJlYWRpbmcsXG4gICAgICAsLy8gamFwTWVhbmluZyxcbiAgICAgIGVuZ01lYW5pbmcsXG4gICAgICAsIC8vIG9mZmljaWFsRW5nLFxuICAgICAgcXVlc3Rpb25JbWcsXG4gICAgICBhbnN3ZXJJbWcsXG4gICAgICAsIC8vIGF1ZGlvXG4gICAgICBwcmV2TGluZUltZyxcbiAgICAgIHByZXZMaW5lQWx0VGV4dCxcbiAgICAgIGFsdEFuc3dlcnMsXG4gICAgICB3ZWJMb29rdXAsIC8vIHVzZSBmb3IgZXZlcnkgYW5zd2VyIHNvIHBlb3BsZSBjYW4gbG9vayB1cCBwcm9udW5jaWF0aW9uXG4gICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vZWpqZS53ZWJsaW8uanAvY29udGVudC9bd2ViTG9va3VwIChlLmcuIOWIh+OCiuaPm+OBiOOCiyldXG4gICAgICBub3RlcyxcbiAgICAgIGNhcmRJZFxuICAgIF0gPSBjYXJkLmZpZWxkcztcblxuICAgIFtleHByZXNzaW9uLCBlbmdNZWFuaW5nLCBub3Rlc10gPSBbZXhwcmVzc2lvbiwgZW5nTWVhbmluZywgbm90ZXNdLm1hcChzdHJpcEh0bWwpO1xuICAgIGNvbnN0IGFuc3dlcnMgPSBnZXRBbnN3ZXJzKGV4cHJlc3Npb24sIGFsdEFuc3dlcnMpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGNhcmRJZCxcbiAgICAgIHF1ZXN0aW9uVGV4dDogICAgZm9ybWF0UXVlc3Rpb25UZXh0KGV4cHJlc3Npb24sIGVuZ01lYW5pbmcsIG5vdGVzLCBjYXJkSWQpLFxuICAgICAgcXVlc3Rpb25JbWc6ICAgICBnZXRCYXNlNjQocXVlc3Rpb25JbWcpLFxuICAgICAgcXVlc3Rpb25BbHRUZXh0OiBmb3JtYXRRdWVzdGlvbkFsdFRleHQoZXhwcmVzc2lvbiksXG4gICAgICBwcmV2TGluZUltZzogICAgIGdldEJhc2U2NChwcmV2TGluZUltZyksXG4gICAgICBwcmV2TGluZUFsdFRleHQsXG4gICAgICBhbnN3ZXJUZXh0OiAgICAgIGZvcm1hdEFuc3dlclRleHQoYW5zd2VycywgZW5nTWVhbmluZywgd2ViTG9va3VwLCBjYXJkSWQpLFxuICAgICAgYW5zd2VySW1nOiAgICAgICBnZXRCYXNlNjQoYW5zd2VySW1nKSxcbiAgICAgIGFuc3dlckFsdFRleHQ6ICAgZm9ybWF0QW5zd2VyQWx0VGV4dChleHByZXNzaW9uKSxcbiAgICAgIGFuc3dlcnMsXG4gICAgICBtZWRpYVVybHM6IFtdXG4gICAgfTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHN0cmlwSHRtbChzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC88Lio/PnwmLio7L2csICcnKTtcbn1cblxuZnVuY3Rpb24gZ2V0U3JjKHN0cmluZykge1xuICByZXR1cm4gKHN0cmluZy5tYXRjaCgvc3JjPVwiKC4rKVwiLykgfHwgWyxdKVsxXTtcbn1cblxuZnVuY3Rpb24gZ2V0QmFzZTY0KHN0cmluZykge1xuICBpZiAoIXN0cmluZyB8fCBzdHJpbmcubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgbGV0IGJhc2U2NDtcbiAgdHJ5IHtcbiAgICBiYXNlNjQgPSBmcy5yZWFkRmlsZVN5bmMoXG4gICAgICBgJHtVUExPQURTX1BBVEh9L21lZGlhLyR7Z2V0U3JjKHN0cmluZyl9YCxcbiAgICAgIHsgZW5jb2Rpbmc6ICdiYXNlNjQnIH1cbiAgICApO1xuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gcmV0dXJuaW5nIHVuZGVmaW5lZC4uLlxuICB9XG4gIHJldHVybiBiYXNlNjQ7XG59XG5cbmZ1bmN0aW9uIGNsZWFuVXAoZmlsZXMpIHtcbiAgZm9yIChsZXQgZmlsZSBvZiBmaWxlcykge1xuICAgIGNvbnN0IHJvb3QgPSBgJHtVUExPQURTX1BBVEh9LyR7ZmlsZX1gO1xuXG4gICAgaWYgKGZzLmxzdGF0U3luYyhyb290KS5pc0ZpbGUoKSlcbiAgICAgIGZzLnVubGlua1N5bmMocm9vdCk7XG4gICAgZWxzZSBpZiAoZnMubHN0YXRTeW5jKHJvb3QpLmlzRGlyZWN0b3J5KCkpXG4gICAgICBkZWxldGVGb2xkZXJSZWN1cnNpdmUocm9vdCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZGVsZXRlRm9sZGVyUmVjdXJzaXZlKHJvb3RQYXRoKSB7XG4gIGlmIChmcy5leGlzdHNTeW5jKHJvb3RQYXRoKSkge1xuICAgIGZzLnJlYWRkaXJTeW5jKHJvb3RQYXRoKS5mb3JFYWNoKGZpbGUgPT4ge1xuICAgICAgY29uc3QgY3VyUGF0aCA9IHJvb3RQYXRoICsgXCIvXCIgKyBmaWxlO1xuICAgICAgaWYgKGZzLmxzdGF0U3luYyhjdXJQYXRoKS5pc0RpcmVjdG9yeSgpKSB7IC8vIHJlY3Vyc2VcbiAgICAgICAgZGVsZXRlRm9sZGVyUmVjdXJzaXZlKGN1clBhdGgpO1xuICAgICAgfSBlbHNlIHsgLy8gZGVsZXRlIGZpbGVcbiAgICAgICAgZnMudW5saW5rU3luYyhjdXJQYXRoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBmcy5ybWRpclN5bmMocm9vdFBhdGgpO1xuICB9XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3Byb2Nlc3NBbmtpSnNvbi5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZnNcIlxuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicG5nanMyXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicG5nanMyXCJcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInVuemlwLXN0cmVhbVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInVuemlwLXN0cmVhbVwiXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBUd2l0dGVyID0gcmVxdWlyZSgnLi4vdHdpdHRlckNvbmZpZycpO1xuY29uc3QgeyB0cnlDYXRjaCB9ID0gcmVxdWlyZSgnVXRpbHMvdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgLy9cbiAgLy8gcG9zdCBhIHR3ZWV0IHdpdGggbWVkaWFcbiAgLy9cbiAgcG9zdE1lZGlhKHN0YXR1cywgYjY0SW1hZ2UxLCBhbHRUZXh0MSwgYjY0SW1hZ2UyLCBhbHRUZXh0Mikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBtZWRpYUlkMSA9IGF3YWl0IHRyeUNhdGNoKHVwbG9hZE1lZGlhKGI2NEltYWdlMSwgYWx0VGV4dDEpKTtcbiAgICAgIGNvbnN0IG1lZGlhX2lkcyA9IFttZWRpYUlkMV07XG4gICAgICBpZiAoYjY0SW1hZ2UyKSB7XG4gICAgICAgIGNvbnN0IG1lZGlhSWQyID0gYXdhaXQgdHJ5Q2F0Y2godXBsb2FkTWVkaWEoYjY0SW1hZ2UyLCBhbHRUZXh0MikpO1xuICAgICAgICBtZWRpYV9pZHMudW5zaGlmdChtZWRpYUlkMik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBhcmFtcyA9IHsgc3RhdHVzLCBtZWRpYV9pZHMsIHR3ZWV0X21vZGU6ICdleHRlbmRlZCcsIGluY2x1ZGVfZXh0X2FsdF90ZXh0OiB0cnVlIH07XG4gICAgICBUd2l0dGVyLnBvc3QoJ3N0YXR1c2VzL3VwZGF0ZScsIHBhcmFtcywgKGVyciwgZGF0YSwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKVxuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJQb3N0aW5nIHN0YXR1cyBmYWlsZWQuXCIpKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgbWVkaWFVcmxzID0gZGF0YS5leHRlbmRlZF9lbnRpdGllcy5tZWRpYS5tYXAoXG4gICAgICAgICAgb2JqID0+ICh7XG4gICAgICAgICAgICBpbWFnZTogb2JqLm1lZGlhX3VybF9odHRwcyxcbiAgICAgICAgICAgIGFsdFRleHQ6IG9iai5leHRfYWx0X3RleHRcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICAgICAgcXVlc3Rpb25JZDogICAgICAgZGF0YS5pZF9zdHIsXG4gICAgICAgICAgcXVlc3Rpb25Qb3N0ZWRBdDogZGF0YS5jcmVhdGVkX2F0LFxuICAgICAgICAgIG1lZGlhVXJsc1xuICAgICAgICB9O1xuICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSxcblxuICBnZXRGb2xsb3dpbmcodXNlcklkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIFR3aXR0ZXIuZ2V0KCdmcmllbmRzL2lkcycsIHsgdXNlcklkIH0sIChlcnIsIGRhdGEsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGlmIChlcnIpIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgcmVzb2x2ZShkYXRhLmlkcyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG59IC8vIG1vZHVsZS5leHBvcnRzXG5cblxuLy8gRUZGRUNUUzpcbi8vIHVwbG9hZHMgYSBzaW5nbGUgaW1hZ2Ugd2l0aCBhbHRUZXh0IHRvIFR3aXR0ZXJcbi8vXG4vLyBSRVRVUk5TOlxuLy8gbWVkaWFfaWQgd2hpY2ggaXMgbmVjZXNzYXJ5IGZvclxuLy8gYXR0YWNoaW5nIG1lZGlhIHRvIGEgdHdlZXRcbi8vXG5mdW5jdGlvbiB1cGxvYWRNZWRpYShiNjRJbWFnZSwgYWx0VGV4dCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIC8vIGZpcnN0IHdlIG11c3QgcG9zdCB0aGUgbWVkaWEgdG8gVHdpdHRlclxuICAgIFR3aXR0ZXIucG9zdCgnbWVkaWEvdXBsb2FkJywgeyBtZWRpYV9kYXRhOiBiNjRJbWFnZSB9LCAoZXJyLCBkYXRhLCByZXNwb25zZSkgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJNZWRpYSB1cGxvYWQgZmFpbGVkLlwiKSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIG5vdyB3ZSBjYW4gYXNzaWduIGFsdCB0ZXh0IHRvIHRoZSBtZWRpYSwgZm9yIHVzZSBieSBzY3JlZW4gcmVhZGVycyBhbmRcbiAgICAgIC8vIG90aGVyIHRleHQtYmFzZWQgcHJlc2VudGF0aW9ucyBhbmQgaW50ZXJwcmV0ZXJzXG4gICAgICBjb25zdCBtZWRpYUlkU3RyID0gZGF0YS5tZWRpYV9pZF9zdHJpbmc7XG4gICAgICBjb25zdCBtZXRhX3BhcmFtcyA9IHsgbWVkaWFfaWQ6IG1lZGlhSWRTdHIsIGFsdF90ZXh0OiB7IHRleHQ6IGFsdFRleHQgfSB9XG5cbiAgICAgIFR3aXR0ZXIucG9zdCgnbWVkaWEvbWV0YWRhdGEvY3JlYXRlJywgbWV0YV9wYXJhbXMsIChlcnIsIGRhdGEsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIk1lZGlhIHVwbG9hZCBzdWNjZWVkZWQsIG1lZGlhIGNyZWF0aW9uIGZhaWxlZC5cIikpO1xuICAgICAgICB9XG4gICAgICAgIC8vIG5vdyB3ZSBjYW4gcmVmZXJlbmNlIHRoZSBtZWRpYSBhbmQgcG9zdCBhIHR3ZWV0IChtZWRpYSB3aWxsIGF0dGFjaCB0byB0aGUgdHdlZXQpXG4gICAgICAgIHJlc29sdmUobWVkaWFJZFN0cik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbHMvdHdpdHRlclV0aWxzLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidHdpdFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInR3aXRcIlxuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXJsZW5jb2RlXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwidXJsZW5jb2RlXCJcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IERCID0gcmVxdWlyZSgnLi9kYk9wcycpO1xuY29uc3QgdXBsb2FkID0gcmVxdWlyZSgnbXVsdGVyJykoeyBkZXN0OiAndXBsb2Fkcy8nIH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChhcHApID0+IHtcblxuICAvLyBDT1JTXG4gIGFwcC51c2UoKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gICAgcmVzLmhlYWRlcignQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJywgJyonKTtcbiAgICByZXMuaGVhZGVyKCdBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzJywgJ0dFVCwgT1BUSU9OUycpO1xuICAgIHJlcy5oZWFkZXIoJ0FjY2Vzcy1Db250cm9sLU1heC1BZ2UnLCAnODY0MDAnKTsgLy8gMjQgaG91cnNcbiAgICByZXMuaGVhZGVyKCdBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzJyxcbiAgICAgICAgICAgICAgICdPcmlnaW4sIFgtUmVxdWVzdGVkLVdpdGgsIENvbnRlbnQtVHlwZSwgQWNjZXB0Jyk7XG4gICAgbmV4dCgpO1xuICB9KTtcblxuICBhcHAuZ2V0KCcvYXBpL2xpdmUnLCAocmVxLCByZXMpID0+IHtcbiAgICBEQi5zZXJ2ZUxpdmVRdWVzdGlvbnMocmVxLCByZXMpO1xuICB9KTtcblxuICBhcHAuZ2V0KCcvYXBpL3Njb3JlcycsIChyZXEsIHJlcykgPT4ge1xuICAgIERCLmdldFNjb3JlcyhyZXEsIHJlcyk7XG4gIH0pO1xuXG4gIGFwcC5nZXQoJy9hcGkvdXNlclN0YXRzJywgKHJlcSwgcmVzKSA9PiB7XG4gICAgREIuZ2V0VXNlclN0YXRzKHJlcSwgcmVzKTtcbiAgfSk7XG5cbiAgYXBwLmdldCgnL2FwaS9jYXJkcy9vbGQnLCAocmVxLCByZXMpID0+IHtcbiAgICBEQi5nZXRPbGRDYXJkcyhyZXEsIHJlcyk7XG4gIH0pO1xuXG5cbiAgLy8gVE9ETyAtIGFkZCBhdXRoZW50aWNhdGlvbiB0byBmb2xsb3dpbmcgZW5kcG9pbnRzXG5cbiAgYXBwLnBvc3QoJy9kZWNrL25ldycsIHVwbG9hZC5zaW5nbGUoJ3ppcGZpbGUnKSwgKHJlcSwgcmVzKSA9PiB7XG4gICAgREIuYWRkRGVjayhyZXEsIHJlcyk7XG4gIH0pO1xuXG4gIGFwcC5wb3N0KCcvc2NvcmVzL2VkaXQnLCAocmVxLCByZXMpID0+IHtcbiAgICBEQi5hZGp1c3RTY29yZShyZXEsIHJlcyk7XG4gIH0pO1xuXG4gIGFwcC5nZXQoJy9jYXJkcy9uZXcnLCAocmVxLCByZXMpID0+IHtcbiAgICBEQi5nZXROZXdDYXJkcyhyZXEsIHJlcyk7XG4gIH0pO1xuXG59IC8vIG1vZHVsZS5leHBvcnRzXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBpLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibXVsdGVyXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwibXVsdGVyXCJcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=