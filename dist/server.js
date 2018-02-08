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
    regeneratorRuntime.mark(function _callee9(req, res) {
      var mongo, collection, data;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return tryCatch(MongoClient.connect(url));

            case 2:
              mongo = _context9.sent;
              collection = mongo.db(DB).collection('scoreboard');
              _context9.next = 6;
              return tryCatch(collection.find().sort('weeklyScore', -1).project({
                '_id': 0
              }).toArray());

            case 6:
              data = _context9.sent;
              res.json(data);
              mongo.close();

            case 9:
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
    regeneratorRuntime.mark(function _callee12(resetWeeklyScore, resetMonthlyScore) {
      var mongo, collection, reset;
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return tryCatch(MongoClient.connect(url));

            case 2:
              mongo = _context12.sent;
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
  regeneratorRuntime.mark(function _callee16(req, res, collectionName) {
    var mongo, collection, data;
    return regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.next = 2;
            return tryCatch(MongoClient.connect(url));

          case 2:
            mongo = _context16.sent;
            collection = mongo.db(DB).collection(collectionName);
            _context16.next = 6;
            return tryCatch(collection.find().project({
              _id: 0
            }).toArray());

          case 6:
            data = _context16.sent;
            res.json(data);
            mongo.close();

          case 9:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16, this);
  }));
  return _getCollection.apply(this, arguments);
}

function removeLiveQuestion(mongo, cardId) {
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref6 = _asyncToGenerator(
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
                    "filter": {
                      userId: userId
                    },
                    "update": {
                      $inc: {
                        score: points,
                        weeklyScore: points,
                        monthlyScore: points,
                        answerAttempts: 1
                      }
                    }
                  }
                };

                if (points > 0) {
                  op.updateOne.update.$push = {
                    correctAnswers: {
                      answerPostedAt: answerPostedAt,
                      cardId: cardId,
                      points: points
                    }
                  };
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
              resolve();

            case 12:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15, this);
    }));

    return function (_x31, _x32) {
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
              foundQuestion = liveQuestions.filter(function (questionCard) {
                return questionCard.questionId === questionId;
              })[0];

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
                score: 0,
                monthlyScore: 0,
                weeklyScore: 0,
                answerAttempts: 0,
                correctAnswers: []
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDlmNDdlMmZiYTEzZWQyN2Y2MzYiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhdGhcIiIsIndlYnBhY2s6Ly8vLi9zcmMvZGJPcHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3R3aXR0ZXJDb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3V0aWxzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXBvbHlmaWxsXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJkb3RlbnZcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYm9keS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vLi9zcmMvdHdpdHRlckJvdC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb25nb2RiXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3NBbmtpSnNvbi5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInBuZ2pzMlwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInVuemlwLXN0cmVhbVwiIiwid2VicGFjazovLy8uL3NyYy91dGlscy90d2l0dGVyVXRpbHMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidHdpdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInVybGVuY29kZVwiIiwid2VicGFjazovLy8uL3NyYy9hcGkuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibXVsdGVyXCIiXSwibmFtZXMiOlsidHdpdHRlclV0aWxzIiwicmVxdWlyZSIsInV0aWxzIiwibW9kdWxlIiwiZXhwb3J0cyIsIk1vbmdvQ2xpZW50IiwidXJsIiwicHJvY2VzcyIsImVudiIsIk1PTkdPREJfVVJJIiwiREIiLCJNT05HT19EQiIsInByb2Nlc3NVcGxvYWQiLCJ0cnlDYXRjaCIsImdldFJhbmRvbVF1ZXN0aW9uIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJjb25uZWN0IiwibW9uZ28iLCJuZXdDYXJkcyIsImRiIiwiY29sbGVjdGlvbiIsIm9sZENhcmRzIiwiZmluZE9uZSIsInJhbmRvbUNhcmQiLCJFcnJvciIsImluc2VydCIsInJlbW92ZSIsImNsb3NlIiwicmV2ZWFsQW5zd2VyV29ya2Zsb3ciLCJjYXJkSWQiLCJhbnN3ZXJDYXJkIiwicmVtb3ZlTGl2ZVF1ZXN0aW9uIiwiYWRkTGl2ZVF1ZXN0aW9uIiwicmVjb3JkIiwibWVkaWFVcmxzIiwibGl2ZVF1ZXN0aW9ucyIsInVwZGF0ZU9uZSIsIiRzZXQiLCIkdW5zZXQiLCJxdWVzdGlvbkltZyIsInF1ZXN0aW9uQWx0VGV4dCIsInByZXZMaW5lSW1nIiwicHJldkxpbmVBbHRUZXh0IiwiYWRkTWVkaWFVcmxzVG9DYXJkIiwibWVkaWFVcmwiLCIkcHVzaCIsImFuc3dlckltZyIsImFuc3dlckFsdFRleHQiLCJ1cGRhdGVMaXZlUXVlc3Rpb24iLCJxdWVzdGlvbklkIiwidXNlclBvaW50cyIsInVzZXJJZCIsInVwZGF0ZSIsImFscmVhZHlBbnN3ZXJlZCIsImNhY2hlZFBvaW50cyIsImdldExpdmVRdWVzdGlvbnMiLCJmaW5kIiwidG9BcnJheSIsInNlcnZlTGl2ZVF1ZXN0aW9ucyIsInJlcSIsInJlcyIsImpzb24iLCJhZGRPclVwZGF0ZVVzZXIiLCJuZXdVc2VyIiwic2NvcmVib2FyZCIsInVzZXIiLCJuYW1lIiwiaGFuZGxlIiwiYXZhdGFyIiwicHJvZmlsZUJhbm5lciIsImZvbGxvd2luZyIsImFkanVzdFNjb3JlIiwiZ2V0U2NvcmVzIiwic29ydCIsInByb2plY3QiLCJkYXRhIiwiZ2V0U2NvcmUiLCJwYXJhbXMiLCJhZGREZWNrIiwiZmlsZVBhdGgiLCJmaWxlIiwicGF0aCIsImJhdGNoIiwiaW5pdGlhbGl6ZVVub3JkZXJlZEJ1bGtPcCIsImkiLCJsZW5ndGgiLCJleGVjdXRlIiwicmVkaXJlY3QiLCJnZXROZXdDYXJkcyIsImdldENvbGxlY3Rpb24iLCJnZXRPbGRDYXJkcyIsIndlZWtseU1vbnRobHlSZXNldCIsInJlc2V0V2Vla2x5U2NvcmUiLCJyZXNldE1vbnRobHlTY29yZSIsInJlc2V0Iiwid2Vla2x5U2NvcmUiLCJtb250aGx5U2NvcmUiLCJtdWx0aSIsImdldENhcmRzIiwiaWRzIiwicXVlcnkiLCIkaW4iLCJfaWQiLCJxdWVzdGlvblRleHQiLCJhbnN3ZXJzIiwiY2xlYW5EYXRhIiwibWFwIiwiY2FyZCIsInNwbGl0IiwicyIsImpvaW4iLCJjb2xsZWN0aW9uTmFtZSIsImN1cnJlbnRRdWVzdGlvbiIsImFkZFBvaW50c1RvU2NvcmVib2FyZCIsImFuc3dlclBvc3RlZEF0IiwiRGF0ZSIsImdldFRpbWUiLCJvcHMiLCJwb2ludHMiLCJvcCIsIiRpbmMiLCJzY29yZSIsImFuc3dlckF0dGVtcHRzIiwiY29ycmVjdEFuc3dlcnMiLCJwdXNoIiwiYnVsa1dyaXRlIiwidHdpdCIsIlRXSVRURVJfQVBJX0tFWSIsIlRXSVRURVJfQVBJX1NFQ1JFVCIsIlRXSVRURVJfVE9LRU4iLCJUV0lUVEVSX1RPS0VOX1NFQ1JFVCIsIlRXSVRURVJfQUNDT1VOVCIsInVzZXJDb25maWciLCJjb25zdW1lcl9rZXkiLCJjb25zdW1lcl9zZWNyZXQiLCJhY2Nlc3NfdG9rZW4iLCJhY2Nlc3NfdG9rZW5fc2VjcmV0IiwidXJsZW5jb2RlIiwiV0VCTE9PS1VQX1VSTCIsIkhPVVJTIiwiZm9ybWF0UXVlc3Rpb25BbHRUZXh0IiwiZXhwcmVzc2lvbiIsImhpbnQiLCJmb3JtYXRIaW50IiwibWluTWF4Q2hhcnMiLCJtaW4iLCJtYXgiLCJtaW5NYXgiLCJzY3JlZW5SZWFkZXJIaW50IiwicmVwbGFjZSIsImZvcm1hdFF1ZXN0aW9uVGV4dCIsImVuZ01lYW5pbmciLCJub3RlcyIsImNhcmRJRCIsInR3ZWV0VGV4dCIsIm5lZWRzSGludCIsImZvcm1hdEFuc3dlckFsdFRleHQiLCJmb3JtYXRBbnN3ZXJUZXh0Iiwid2ViTG9va3VwIiwiYW5zd2VyVGV4dCIsImFkZFF1ZXN0aW9uTGluayIsInF1ZXN0aW9uTGluayIsImxpbmVzIiwic3BsaWNlIiwiZ2V0QW5zd2VycyIsImFsdEFuc3dlcnMiLCJhY2NlcHRlZEFuc3dlciIsIm1hdGNoIiwib3RoZXJBbnN3ZXJzIiwiY29uY2F0IiwiY2FsY3VsYXRlU2NvcmUiLCJxdWVzdGlvblBvc3RlZEF0IiwidGltZVRvQW5zd2VyIiwiTWF0aCIsImZsb29yIiwiZXh0cmFjdEFuc3dlciIsInRleHQiLCJ0cmltIiwic2xpY2UiLCJnZXRUaW1lVW50aWwiLCJob3VyIiwibm93IiwibWlsbGlzVW50aWxUaW1lIiwiZ2V0RnVsbFllYXIiLCJnZXRNb250aCIsImdldERhdGUiLCJwcm9taXNlIiwidGhlbiIsImNhdGNoIiwiY29uc29sZSIsImVycm9yIiwiZXJyIiwiY29udGFpbnMiLCJpdGVtIiwibGlzdCIsInZhbGlkIiwiaW5kZXhPZiIsImluZGV4IiwibWF4Q2hhcnMiLCJtaXNzaW5nQ2hhclJlZ2V4IiwibWlzc2luZ0NoYXJzIiwiZ2ltbWVDaGFycyIsIm1pbkNoYXJzIiwib3B0aW9uYWxDaGFycyIsImxlZ2VuZCIsIm5vcm1hbGl6ZWQiLCJncm91cE11bHRpWHMiLCJncm91cFhzIiwiZ3JvdXBRdWVzdGlvbk1hcmtzIiwiZmxhdHRlbiIsImdyb3VwIiwidGVzdCIsInJlc3VsdCIsIm51bUNoYXJzIiwiTnVtYmVyIiwibmVnYXRlZENoYXJzIiwic3RyaW5nIiwicDEiLCJzdHIiLCJzY2FsYXIiLCJ2IiwiQXJyYXkiLCJpc0FycmF5IiwiZGVlcCIsImZsYXQiLCJoZWFkIiwidGFpbCIsImNvbmZpZyIsImV4cHJlc3MiLCJhcHAiLCJib2R5UGFyc2VyIiwidHdpdHRlckJvdCIsInNldCIsIlBPUlQiLCJ1c2UiLCJzdGF0aWMiLCJfX2Rpcm5hbWUiLCJzdGFydCIsImxpc3RlbiIsImdldCIsImxvZyIsImdldEZvbGxvd2luZyIsInBvc3RNZWRpYSIsIlR3aXR0ZXIiLCJBTlNXRVJfSU5URVJWQUwiLCJRVUVTVElPTl9JTlRFUlZBTCIsIm9wZW5TdHJlYW0iLCJzZXRJbnRlcnZhbCIsInR3ZWV0UmFuZG9tUXVlc3Rpb24iLCJzZXRTdGFydFRpbWVzIiwidGltZVVudGlsN1BNIiwidGltZVVudGlsTWlkbmlnaHQiLCJzZXRUaW1lb3V0IiwibGl2ZVF1ZXN0aW9uIiwidHdlZXRBbnN3ZXIiLCJzdHJlYW0iLCJ0cmFjayIsIm9uIiwiaW5fcmVwbHlfdG9fc3RhdHVzX2lkX3N0ciIsImNyZWF0ZWRfYXQiLCJpZCIsInNjcmVlbl9uYW1lIiwicHJvZmlsZV9pbWFnZV91cmxfaHR0cHMiLCJwcm9maWxlX2Jhbm5lcl91cmwiLCJmb3VuZFF1ZXN0aW9uIiwiZmlsdGVyIiwicXVlc3Rpb25DYXJkIiwiYWNjZXB0ZWRBbnN3ZXJzIiwidXNlckFuc3dlciIsImRpc2Nvbm5lY3RNc2ciLCJnZXREYXkiLCJmcyIsIlBORyIsInVuemlwIiwiVVBMT0FEU19QQVRIIiwicGFyc2VBbmtpSnNvbiIsIm9wdGltaXplSW1hZ2VzIiwiemlwZmlsZVBhdGgiLCJjcmVhdGVSZWFkU3RyZWFtIiwicGlwZSIsIkV4dHJhY3QiLCJmaWxlcyIsInJlYWRkaXJTeW5jIiwiZXh0cmFjdENhcmRJbmZvIiwiY2xlYW5VcCIsImRpclBhdGgiLCJmaWxlc1Byb2Nlc3NpbmciLCJmb3JFYWNoIiwiY3VycmVudEZpbGUiLCJjb250ZW50cyIsInJlYWRGaWxlU3luYyIsIndyaXRlU3RyZWFtIiwiY3JlYXRlV3JpdGVTdHJlYW0iLCJjdXJyZW50SW1hZ2UiLCJyZWoiLCJmaWx0ZXJUeXBlIiwiZGVmbGF0ZUxldmVsIiwicGFyc2UiLCJwbmciLCJwYWNrIiwiYWxsIiwiYWxsTmV3Q2FyZHMiLCJzdGF0cyIsInN0YXRTeW5jIiwiaXNGaWxlIiwiSlNPTiIsImZpZWxkcyIsInN0cmlwSHRtbCIsImdldEJhc2U2NCIsImdldFNyYyIsImJhc2U2NCIsImVuY29kaW5nIiwiZSIsInJvb3QiLCJsc3RhdFN5bmMiLCJ1bmxpbmtTeW5jIiwiaXNEaXJlY3RvcnkiLCJkZWxldGVGb2xkZXJSZWN1cnNpdmUiLCJyb290UGF0aCIsImV4aXN0c1N5bmMiLCJjdXJQYXRoIiwicm1kaXJTeW5jIiwic3RhdHVzIiwiYjY0SW1hZ2UxIiwiYWx0VGV4dDEiLCJiNjRJbWFnZTIiLCJhbHRUZXh0MiIsInVwbG9hZE1lZGlhIiwibWVkaWFJZDEiLCJtZWRpYV9pZHMiLCJtZWRpYUlkMiIsInVuc2hpZnQiLCJ0d2VldF9tb2RlIiwiaW5jbHVkZV9leHRfYWx0X3RleHQiLCJwb3N0IiwicmVzcG9uc2UiLCJleHRlbmRlZF9lbnRpdGllcyIsIm1lZGlhIiwiaW1hZ2UiLCJvYmoiLCJtZWRpYV91cmxfaHR0cHMiLCJhbHRUZXh0IiwiZXh0X2FsdF90ZXh0IiwiaWRfc3RyIiwiYjY0SW1hZ2UiLCJtZWRpYV9kYXRhIiwibWVkaWFJZFN0ciIsIm1lZGlhX2lkX3N0cmluZyIsIm1ldGFfcGFyYW1zIiwibWVkaWFfaWQiLCJhbHRfdGV4dCIsInVwbG9hZCIsImRlc3QiLCJuZXh0IiwiaGVhZGVyIiwic2luZ2xlIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUM3REEsSUFBTUEsZUFBZSxtQkFBQUMsQ0FBUSxFQUFSLENBQXJCOztBQUNBLElBQU1DLFFBQVEsbUJBQUFELENBQVEsQ0FBUixDQUFkOztBQUVBRSxPQUFPQyxPQUFQLGdCQUNLSixZQURMLEVBRUtFLEtBRkwsRTs7Ozs7O0FDSEEsaUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQSxJQUFNRyxjQUFjLG1CQUFBSixDQUFRLEVBQVIsRUFBbUJJLFdBQXZDOztBQUNBLElBQU1DLE1BQU1DLFFBQVFDLEdBQVIsQ0FBWUMsV0FBeEI7QUFDQSxJQUFNQyxLQUFLSCxRQUFRQyxHQUFSLENBQVlHLFFBQXZCOztlQUMwQixtQkFBQVYsQ0FBUSxFQUFSLEM7SUFBbEJXLGEsWUFBQUEsYTs7Z0JBQ2EsbUJBQUFYLENBQVEsQ0FBUixDO0lBQWJZLFEsYUFBQUEsUTs7QUFFUlYsT0FBT0MsT0FBUCxHQUFpQjtBQUNmVSxtQkFEZSwrQkFDSztBQUNsQixXQUFPLElBQUlDLE9BQUo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDhCQUFZLGlCQUFPQyxPQUFQLEVBQWdCQyxNQUFoQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUNHSixTQUFTUixZQUFZYSxPQUFaLENBQW9CWixHQUFwQixDQUFULENBREg7O0FBQUE7QUFDWGEscUJBRFc7QUFFWEMsd0JBRlcsR0FFQUQsTUFBTUUsRUFBTixDQUFTWCxFQUFULEVBQWFZLFVBQWIsQ0FBd0IsVUFBeEIsQ0FGQTtBQUdYQyx3QkFIVyxHQUdBSixNQUFNRSxFQUFOLENBQVNYLEVBQVQsRUFBYVksVUFBYixDQUF3QixVQUF4QixDQUhBO0FBQUE7QUFBQSx1QkFJUVQsU0FBU08sU0FBU0ksT0FBVCxFQUFULENBSlI7O0FBQUE7QUFJWEMsMEJBSlc7O0FBQUEsc0JBS2JBLGNBQWMsSUFMRDtBQUFBO0FBQUE7QUFBQTs7QUFNZlIsdUJBQU8sSUFBSVMsS0FBSixDQUFVLDBDQUFWLENBQVA7QUFOZTs7QUFBQTtBQUFBO0FBQUEsdUJBU1hiLFNBQVNVLFNBQVNJLE1BQVQsQ0FBZ0JGLFVBQWhCLENBQVQsQ0FUVzs7QUFBQTtBQUFBO0FBQUEsdUJBVVhaLFNBQVNPLFNBQVNRLE1BQVQsQ0FBZ0JILFVBQWhCLENBQVQsQ0FWVzs7QUFBQTtBQVdqQlQsd0JBQVFTLFVBQVI7QUFDQU4sc0JBQU1VLEtBQU47O0FBWmlCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BQVo7O0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFBUDtBQWNELEdBaEJjO0FBa0JmQyxzQkFsQmUsZ0NBa0JNQyxNQWxCTixFQWtCYztBQUMzQixXQUFPLElBQUloQixPQUFKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw4QkFBWSxrQkFBT0MsT0FBUCxFQUFnQkMsTUFBaEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFDR0osU0FBU1IsWUFBWWEsT0FBWixDQUFvQlosR0FBcEIsQ0FBVCxDQURIOztBQUFBO0FBQ1hhLHFCQURXO0FBRVhJLHdCQUZXLEdBRUFKLE1BQU1FLEVBQU4sQ0FBU1gsRUFBVCxFQUFhWSxVQUFiLENBQXdCLFVBQXhCLENBRkE7QUFBQTtBQUFBLHVCQUdRVCxTQUFTVSxTQUFTQyxPQUFULENBQWlCO0FBQUVPO0FBQUYsaUJBQWpCLENBQVQsQ0FIUjs7QUFBQTtBQUdYQywwQkFIVztBQUlqQmhCLHdCQUFRZ0IsVUFBUjtBQUppQjtBQUFBLHVCQUtYbkIsU0FBU29CLG1CQUFtQmQsS0FBbkIsRUFBMEJZLE1BQTFCLENBQVQsQ0FMVzs7QUFBQTtBQU1qQlosc0JBQU1VLEtBQU47O0FBTmlCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BQVo7O0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFBUDtBQVFELEdBM0JjO0FBNkJUSyxpQkE3QlM7QUFBQTtBQUFBO0FBQUEsOENBNkJPQyxNQTdCUCxFQTZCZUMsU0E3QmY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBOEJMTCxvQkE5QkssR0E4Qk1JLE1BOUJOLENBOEJMSixNQTlCSztBQUFBO0FBQUEscUJBK0JPbEIsU0FBU1IsWUFBWWEsT0FBWixDQUFvQlosR0FBcEIsQ0FBVCxDQS9CUDs7QUFBQTtBQStCUGEsbUJBL0JPO0FBZ0NQa0IsMkJBaENPLEdBZ0NTbEIsTUFBTUUsRUFBTixDQUFTWCxFQUFULEVBQWFZLFVBQWIsQ0FBd0IsZUFBeEIsQ0FoQ1Q7QUFpQ1BDLHNCQWpDTyxHQWlDSUosTUFBTUUsRUFBTixDQUFTWCxFQUFULEVBQWFZLFVBQWIsQ0FBd0IsVUFBeEIsQ0FqQ0o7QUFBQTtBQUFBLHFCQWtDUFQsU0FBU3dCLGNBQWNWLE1BQWQsY0FDVlEsTUFEVTtBQUViQztBQUZhLGlCQUFULENBbENPOztBQUFBO0FBQUE7QUFBQSxxQkFzQ1B2QixTQUNKVSxTQUFTZSxTQUFULENBQ0U7QUFBQ1A7QUFBRCxlQURGLEVBRUU7QUFDRVEsc0JBQU07QUFBRUg7QUFBRixpQkFEUjtBQUVFSSx3QkFBUTtBQUNOQywrQkFBYSxFQURQO0FBRU5DLG1DQUFpQixFQUZYO0FBR05DLCtCQUFhLEVBSFA7QUFJTkMsbUNBQWlCO0FBSlg7QUFGVixlQUZGLENBREksQ0F0Q087O0FBQUE7QUFvRGJ6QixvQkFBTVUsS0FBTjs7QUFwRGE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUF1RFRnQixvQkF2RFM7QUFBQTtBQUFBO0FBQUEsOENBdURVZCxNQXZEVjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0RBdURtQmUsUUF2RG5CO0FBQUE7QUFBQSxxQkF3RE9qQyxTQUFTUixZQUFZYSxPQUFaLENBQW9CWixHQUFwQixDQUFULENBeERQOztBQUFBO0FBd0RQYSxtQkF4RE87QUF5RFBJLHNCQXpETyxHQXlESUosTUFBTUUsRUFBTixDQUFTWCxFQUFULEVBQWFZLFVBQWIsQ0FBd0IsVUFBeEIsQ0F6REo7QUFBQTtBQUFBLHFCQTBEUFQsU0FDSlUsU0FBU2UsU0FBVCxDQUNFO0FBQUVQO0FBQUYsZUFERixFQUNjO0FBQ1ZnQix1QkFBTztBQUFFWCw2QkFBV1U7QUFBYixpQkFERztBQUVWTix3QkFBUTtBQUFFUSw2QkFBVyxFQUFiO0FBQWlCQyxpQ0FBZTtBQUFoQztBQUZFLGVBRGQsQ0FESSxDQTFETzs7QUFBQTtBQWtFYjlCLG9CQUFNVSxLQUFOOztBQWxFYTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQXFFVHFCLG9CQXJFUztBQUFBO0FBQUE7QUFBQSw4Q0FxRVVDLFVBckVWLEVBcUVzQkMsVUFyRXRCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBc0VPdkMsU0FBU1IsWUFBWWEsT0FBWixDQUFvQlosR0FBcEIsQ0FBVCxDQXRFUDs7QUFBQTtBQXNFUGEsbUJBdEVPO0FBdUVQa0IsMkJBdkVPLEdBdUVTbEIsTUFBTUUsRUFBTixDQUFTWCxFQUFULEVBQWFZLFVBQWIsQ0FBd0IsZUFBeEIsQ0F2RVQ7QUF3RUwrQixvQkF4RUssR0F3RU1ELFVBeEVOLENBd0VMQyxNQXhFSztBQUFBO0FBQUEscUJBMEVQeEMsU0FDSndCLGNBQWNpQixNQUFkLENBQ0U7QUFBRUg7QUFBRixlQURGLEVBQ2tCO0FBQ2RKLHVCQUFPO0FBQ0xRLG1DQUFpQkYsTUFEWjtBQUVMRyxnQ0FBY0o7QUFGVDtBQURPLGVBRGxCLENBREksQ0ExRU87O0FBQUE7QUFvRmJqQyxvQkFBTVUsS0FBTjs7QUFwRmE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUF1RmY0QixrQkF2RmUsOEJBdUZJO0FBQ2pCLFdBQU8sSUFBSTFDLE9BQUo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDhCQUFZLGtCQUFPQyxPQUFQLEVBQWdCQyxNQUFoQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUNHSixTQUFTUixZQUFZYSxPQUFaLENBQW9CWixHQUFwQixDQUFULENBREg7O0FBQUE7QUFDWGEscUJBRFc7QUFFWEcsMEJBRlcsR0FFRUgsTUFBTUUsRUFBTixDQUFTWCxFQUFULEVBQWFZLFVBQWIsQ0FBd0IsZUFBeEIsQ0FGRjtBQUFBO0FBQUEsdUJBR1dULFNBQVNTLFdBQVdvQyxJQUFYLEdBQWtCQyxPQUFsQixFQUFULENBSFg7O0FBQUE7QUFHWHRCLDZCQUhXO0FBSWpCckIsd0JBQVFxQixhQUFSO0FBQ0FsQixzQkFBTVUsS0FBTjs7QUFMaUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FBWjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQUFQO0FBT0QsR0EvRmM7QUFpR1QrQixvQkFqR1M7QUFBQTtBQUFBO0FBQUEsOENBaUdVQyxHQWpHVixFQWlHZUMsR0FqR2Y7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFrR09qRCxTQUFTUixZQUFZYSxPQUFaLENBQW9CWixHQUFwQixDQUFULENBbEdQOztBQUFBO0FBa0dQYSxtQkFsR087QUFtR1BHLHdCQW5HTyxHQW1HTUgsTUFBTUUsRUFBTixDQUFTWCxFQUFULEVBQWFZLFVBQWIsQ0FBd0IsZUFBeEIsQ0FuR047QUFBQTtBQUFBLHFCQW9HZVQsU0FBU1MsV0FBV29DLElBQVgsR0FBa0JDLE9BQWxCLEVBQVQsQ0FwR2Y7O0FBQUE7QUFvR1B0QiwyQkFwR087QUFxR2J5QixrQkFBSUMsSUFBSixDQUFTMUIsYUFBVDtBQUNBbEIsb0JBQU1VLEtBQU47O0FBdEdhO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBeUdUbUMsaUJBekdTO0FBQUE7QUFBQTtBQUFBLDhDQXlHT0MsT0F6R1A7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBMEdPcEQsU0FBU1IsWUFBWWEsT0FBWixDQUFvQlosR0FBcEIsQ0FBVCxDQTFHUDs7QUFBQTtBQTBHUGEsbUJBMUdPO0FBMkdQK0Msd0JBM0dPLEdBMkdNL0MsTUFBTUUsRUFBTixDQUFTWCxFQUFULEVBQWFZLFVBQWIsQ0FBd0IsWUFBeEIsQ0EzR047QUE0R0wrQixvQkE1R0ssR0E0R01ZLE9BNUdOLENBNEdMWixNQTVHSztBQUFBO0FBQUEscUJBNkdNeEMsU0FBU3FELFdBQVcxQyxPQUFYLENBQW1CO0FBQUM2QjtBQUFELGVBQW5CLENBQVQsQ0E3R047O0FBQUE7QUE2R1BjLGtCQTdHTzs7QUFBQSxtQkE4R1RBLElBOUdTO0FBQUE7QUFBQTtBQUFBOztBQWdIVEMsa0JBaEhTLEdBcUhQSCxPQXJITyxDQWdIVEcsSUFoSFMsRUFpSFRDLE1BakhTLEdBcUhQSixPQXJITyxDQWlIVEksTUFqSFMsRUFrSFRDLE1BbEhTLEdBcUhQTCxPQXJITyxDQWtIVEssTUFsSFMsRUFtSFRDLGFBbkhTLEdBcUhQTixPQXJITyxDQW1IVE0sYUFuSFMsRUFvSFRDLFNBcEhTLEdBcUhQUCxPQXJITyxDQW9IVE8sU0FwSFM7QUFBQTtBQUFBLHFCQXVITDNELFNBQ0pxRCxXQUFXNUIsU0FBWCxDQUFxQjtBQUFFZTtBQUFGLGVBQXJCO0FBQ0lkLHNCQUFNO0FBQUU2QjtBQUFGO0FBRFYsZ0VBRVU7QUFBRUM7QUFBRixlQUZWLGtEQUdVO0FBQUVDO0FBQUYsZUFIVixrREFJVTtBQUFFQztBQUFGLGVBSlYsa0RBS1U7QUFBRUM7QUFBRixlQUxWLDBCQURJLENBdkhLOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEscUJBaUlMM0QsU0FBU3FELFdBQVd2QyxNQUFYLENBQWtCc0MsT0FBbEIsQ0FBVCxDQWpJSzs7QUFBQTtBQW1JYjlDLG9CQUFNVSxLQUFOOztBQW5JYTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQXNJZjRDLGFBdEllLHVCQXNJSFosR0F0SUcsRUFzSUVDLEdBdElGLEVBc0lPLENBQ3BCO0FBQ0QsR0F4SWM7QUEwSVRZLFdBMUlTO0FBQUE7QUFBQTtBQUFBLDhDQTBJQ2IsR0ExSUQsRUEwSU1DLEdBMUlOO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBMklPakQsU0FBU1IsWUFBWWEsT0FBWixDQUFvQlosR0FBcEIsQ0FBVCxDQTNJUDs7QUFBQTtBQTJJUGEsbUJBM0lPO0FBNElQRyx3QkE1SU8sR0E0SU1ILE1BQU1FLEVBQU4sQ0FBU1gsRUFBVCxFQUFhWSxVQUFiLENBQXdCLFlBQXhCLENBNUlOO0FBQUE7QUFBQSxxQkE2SU1ULFNBQ2pCUyxXQUFXb0MsSUFBWCxHQUNXaUIsSUFEWCxDQUNnQixhQURoQixFQUMrQixDQUFDLENBRGhDLEVBRVdDLE9BRlgsQ0FFbUI7QUFBQyx1QkFBTztBQUFSLGVBRm5CLEVBR1dqQixPQUhYLEVBRGlCLENBN0lOOztBQUFBO0FBNklQa0Isa0JBN0lPO0FBbUpiZixrQkFBSUMsSUFBSixDQUFTYyxJQUFUO0FBQ0ExRCxvQkFBTVUsS0FBTjs7QUFwSmE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUF1SmY7QUFDTWlELFVBeEpTO0FBQUE7QUFBQTtBQUFBLCtDQXdKQWpCLEdBeEpBLEVBd0pLQyxHQXhKTDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUF5SkxPLG9CQXpKSyxHQXlKTVIsSUFBSWtCLE1BekpWLENBeUpMVixNQXpKSztBQUFBO0FBQUEscUJBMEpPeEQsU0FBU1IsWUFBWWEsT0FBWixDQUFvQlosR0FBcEIsQ0FBVCxDQTFKUDs7QUFBQTtBQTBKUGEsbUJBMUpPO0FBMkpQRyx3QkEzSk8sR0EySk1ILE1BQU1FLEVBQU4sQ0FBU1gsRUFBVCxFQUFhWSxVQUFiLENBQXdCLFlBQXhCLENBM0pOO0FBQUE7QUFBQSxxQkE0Sk1ULFNBQVNTLFdBQVdFLE9BQVgsQ0FBbUI7QUFBQzZDO0FBQUQsZUFBbkIsQ0FBVCxDQTVKTjs7QUFBQTtBQTRKUEYsa0JBNUpPO0FBNkpiTCxrQkFBSUMsSUFBSixDQUFTSSxJQUFUO0FBQ0FoRCxvQkFBTVUsS0FBTjs7QUE5SmE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFpS1RtRCxTQWpLUztBQUFBO0FBQUE7QUFBQSwrQ0FpS0RuQixHQWpLQyxFQWlLSUMsR0FqS0o7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBa0tQbUIsc0JBbEtPLEdBa0tJcEIsSUFBSXFCLElBQUosQ0FBU0MsSUFsS2I7QUFBQTtBQUFBLHFCQW1LVXRFLFNBQVNELGNBQWNxRSxRQUFkLENBQVQsQ0FuS1Y7O0FBQUE7QUFtS1A3RCxzQkFuS087QUFBQTtBQUFBLHFCQW9LT1AsU0FBU1IsWUFBWWEsT0FBWixDQUFvQlosR0FBcEIsQ0FBVCxDQXBLUDs7QUFBQTtBQW9LUGEsbUJBcEtPO0FBcUtQRyx3QkFyS08sR0FxS01ILE1BQU1FLEVBQU4sQ0FBU1gsRUFBVCxFQUFhWSxVQUFiLENBQXdCLFVBQXhCLENBcktOO0FBc0tQOEQsbUJBdEtPLEdBc0tDOUQsV0FBVytELHlCQUFYLEVBdEtEOztBQXdLYixtQkFBU0MsQ0FBVCxHQUFhLENBQWIsRUFBZ0JBLElBQUlsRSxTQUFTbUUsTUFBN0IsRUFBcUMsRUFBRUQsQ0FBdkMsRUFBMEM7QUFDeENGLHNCQUFNekQsTUFBTixDQUFhUCxTQUFTa0UsQ0FBVCxDQUFiO0FBQ0Q7O0FBMUtZO0FBQUEscUJBNEtQekUsU0FBU3VFLE1BQU1JLE9BQU4sRUFBVCxDQTVLTzs7QUFBQTtBQTZLYnJFLG9CQUFNVSxLQUFOO0FBRUFpQyxrQkFBSTJCLFFBQUosQ0FBYSxHQUFiOztBQS9LYTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWtMZkMsYUFsTGUsdUJBa0xIN0IsR0FsTEcsRUFrTEVDLEdBbExGLEVBa0xPO0FBQ3BCNkIsa0JBQWM5QixHQUFkLEVBQW1CQyxHQUFuQixFQUF3QixVQUF4QjtBQUNELEdBcExjO0FBc0xmOEIsYUF0TGUsdUJBc0xIL0IsR0F0TEcsRUFzTEVDLEdBdExGLEVBc0xPO0FBQ3BCNkIsa0JBQWM5QixHQUFkLEVBQW1CQyxHQUFuQixFQUF3QixVQUF4QjtBQUNELEdBeExjO0FBMExUK0Isb0JBMUxTO0FBQUE7QUFBQTtBQUFBLCtDQTBMVUMsZ0JBMUxWLEVBMEw0QkMsaUJBMUw1QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQTJMT2xGLFNBQVNSLFlBQVlhLE9BQVosQ0FBb0JaLEdBQXBCLENBQVQsQ0EzTFA7O0FBQUE7QUEyTFBhLG1CQTNMTztBQTRMUEcsd0JBNUxPLEdBNExNSCxNQUFNRSxFQUFOLENBQVNYLEVBQVQsRUFBYVksVUFBYixDQUF3QixZQUF4QixDQTVMTjtBQStMYixrQkFBSXdFLG9CQUFvQkMsaUJBQXhCLEVBQ0VDO0FBQ0V6RCxzQkFBTTtBQUFFMEQsK0JBQWM7QUFBaEI7QUFEUix5QkFFUTtBQUFFQyw4QkFBYztBQUFoQixlQUZSLEVBREYsS0FLSyxJQUFJSixnQkFBSixFQUNIRSxRQUFRO0FBQUV6RCxzQkFBTTtBQUFFMEQsK0JBQWE7QUFBZjtBQUFSLGVBQVIsQ0FERyxLQUdIRCxRQUFRO0FBQUV6RCxzQkFBTTtBQUFFMkQsZ0NBQWM7QUFBaEI7QUFBUixlQUFSO0FBRUY1RSx5QkFBV2dDLE1BQVgsQ0FDRSxFQURGLEVBQ00wQyxLQUROLEVBQ2E7QUFBRUcsdUJBQU87QUFBVCxlQURiO0FBSUFoRixvQkFBTVUsS0FBTjs7QUE3TWE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFnTlR1RSxVQWhOUztBQUFBO0FBQUE7QUFBQSwrQ0FnTkF2QyxHQWhOQSxFQWdOS0MsR0FoTkw7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBaU5MdUMsaUJBak5LLEdBaU5HeEMsSUFBSXlDLEtBak5QLENBaU5MRCxHQWpOSztBQUFBO0FBQUEscUJBa05PeEYsU0FBU1IsWUFBWWEsT0FBWixDQUFvQlosR0FBcEIsQ0FBVCxDQWxOUDs7QUFBQTtBQWtOUGEsbUJBbE5PO0FBbU5QRyx3QkFuTk8sR0FtTk1ILE1BQU1FLEVBQU4sQ0FBU1gsRUFBVCxFQUFhWSxVQUFiLENBQXdCLFVBQXhCLENBbk5OO0FBQUE7QUFBQSxxQkFvTk1ULFNBQ2pCUyxXQUFXb0MsSUFBWCxDQUFnQjtBQUFDM0Isd0JBQVE7QUFBQ3dFLHVCQUFLRjtBQUFOO0FBQVQsZUFBaEIsRUFDV3pCLE9BRFgsQ0FDbUI7QUFBQzRCLHFCQUFLLENBQU47QUFBU3BFLDJCQUFXLENBQXBCO0FBQXVCcUUsOEJBQWMsQ0FBckM7QUFBd0NDLHlCQUFTO0FBQWpELGVBRG5CLEVBRVcvQyxPQUZYLEVBRGlCLENBcE5OOztBQUFBO0FBb05Qa0Isa0JBcE5PO0FBME5QOEIsdUJBMU5PLEdBME5LOUIsS0FBSytCLEdBQUwsQ0FBUyxnQkFBUTtBQUNqQ0MscUJBQUtKLFlBQUwsR0FBb0JJLEtBQUtKLFlBQUwsQ0FBa0JLLEtBQWxCLENBQXdCLElBQXhCLEVBQThCLENBQTlCLENBQXBCO0FBQ0Esb0JBQU1DLElBQUlGLEtBQUtILE9BQUwsQ0FBYW5CLE1BQWIsR0FBc0IsQ0FBdEIsR0FBMEIsR0FBMUIsR0FBZ0MsRUFBMUM7QUFDQXNCLHFCQUFLSCxPQUFMLG1CQUF3QkssQ0FBeEIsZUFBOEJGLEtBQUtILE9BQUwsQ0FBYU0sSUFBYixDQUFrQixJQUFsQixDQUE5QjtBQUNBSCxxQkFBSy9ELFFBQUwsR0FBaUIrRCxLQUFLekUsU0FBTCxDQUFlbUQsTUFBZixLQUEwQixDQUEzQixHQUNac0IsS0FBS3pFLFNBQUwsQ0FBZSxDQUFmLENBRFksR0FFWnlFLEtBQUt6RSxTQUFMLENBQWUsQ0FBZixDQUZKO0FBSUEsdUJBQU95RSxLQUFLekUsU0FBWjtBQUNBLHVCQUFPeUUsSUFBUDtBQUNELGVBVmlCLENBMU5MO0FBc09iL0Msa0JBQUlDLElBQUosQ0FBUzRDLFNBQVQ7QUFDQXhGLG9CQUFNVSxLQUFOOztBQXZPYTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLENBQWpCLEMsQ0EwT0U7O1NBR2E4RCxhOzs7Ozs7OzBCQUFmLG1CQUE2QjlCLEdBQTdCLEVBQWtDQyxHQUFsQyxFQUF1Q21ELGNBQXZDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQ3NCcEcsU0FBU1IsWUFBWWEsT0FBWixDQUFvQlosR0FBcEIsQ0FBVCxDQUR0Qjs7QUFBQTtBQUNRYSxpQkFEUjtBQUVRRyxzQkFGUixHQUVxQkgsTUFBTUUsRUFBTixDQUFTWCxFQUFULEVBQWFZLFVBQWIsQ0FBd0IyRixjQUF4QixDQUZyQjtBQUFBO0FBQUEsbUJBR3FCcEcsU0FDakJTLFdBQVdvQyxJQUFYLEdBQ1drQixPQURYLENBQ21CO0FBQUM0QixtQkFBSztBQUFOLGFBRG5CLEVBRVc3QyxPQUZYLEVBRGlCLENBSHJCOztBQUFBO0FBR1FrQixnQkFIUjtBQVFFZixnQkFBSUMsSUFBSixDQUFTYyxJQUFUO0FBQ0ExRCxrQkFBTVUsS0FBTjs7QUFURjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O0FBWUEsU0FBU0ksa0JBQVQsQ0FBNEJkLEtBQTVCLEVBQW1DWSxNQUFuQyxFQUEyQztBQUN6QyxTQUFPLElBQUloQixPQUFKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw0QkFBWSxtQkFBT0MsT0FBUCxFQUFnQkMsTUFBaEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ1hLLHdCQURXLEdBQ0VILE1BQU1FLEVBQU4sQ0FBU1gsRUFBVCxFQUFhWSxVQUFiLENBQXdCLGVBQXhCLENBREY7QUFBQTtBQUFBLHFCQUVhVCxTQUFTUyxXQUFXRSxPQUFYLENBQW1CO0FBQUNPO0FBQUQsZUFBbkIsQ0FBVCxDQUZiOztBQUFBO0FBRVhtRiw2QkFGVztBQUFBO0FBQUEscUJBR1hyRyxTQUFTUyxXQUFXTSxNQUFYLENBQWtCc0YsZUFBbEIsQ0FBVCxDQUhXOztBQUFBO0FBQUE7QUFBQSxxQkFJWHJHLFNBQVNzRyxzQkFBc0JoRyxLQUF0QixFQUE2QitGLGVBQTdCLENBQVQsQ0FKVzs7QUFBQTtBQUtqQmxHOztBQUxpQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFaOztBQUFBO0FBQUE7QUFBQTtBQUFBLE1BQVA7QUFPRDs7QUFFRCxTQUFTbUcscUJBQVQsQ0FBK0JoRyxLQUEvQixTQUFnRTtBQUFBLE1BQXhCcUMsWUFBd0IsU0FBeEJBLFlBQXdCO0FBQUEsTUFBVnpCLE1BQVUsU0FBVkEsTUFBVTtBQUM5RCxTQUFPLElBQUloQixPQUFKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw0QkFBWSxtQkFBT0MsT0FBUCxFQUFnQkMsTUFBaEI7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNYaUQsd0JBRFcsR0FDRS9DLE1BQU1FLEVBQU4sQ0FBU1gsRUFBVCxFQUFhWSxVQUFiLENBQXdCLFlBQXhCLENBREY7QUFFWEMsc0JBRlcsR0FFQUosTUFBTUUsRUFBTixDQUFTWCxFQUFULEVBQWFZLFVBQWIsQ0FBd0IsVUFBeEIsQ0FGQTtBQUdYOEYsNEJBSFcsR0FHTSxJQUFJQyxJQUFKLEdBQVdDLE9BQVgsRUFITjtBQUlqQi9GLHVCQUFTZSxTQUFULENBQW1CO0FBQUNQO0FBQUQsZUFBbkIsRUFBNkI7QUFBQ1Esc0JBQU07QUFBQzZFO0FBQUQ7QUFBUCxlQUE3QjtBQUVNRyxpQkFOVyxHQU1MLEVBTks7O0FBT2pCLG1CQUFTakMsQ0FBVCxHQUFhLENBQWIsRUFBZ0JBLElBQUk5QixhQUFhK0IsTUFBakMsRUFBeUMsRUFBRUQsQ0FBM0MsRUFBOEM7QUFBQSxrQ0FDakI5QixhQUFhOEIsQ0FBYixDQURpQixFQUNwQ2pDLE1BRG9DLG1CQUNwQ0EsTUFEb0MsRUFDNUJtRSxNQUQ0QixtQkFDNUJBLE1BRDRCO0FBRXRDQyxrQkFGc0MsR0FFakM7QUFDVG5GLDZCQUFZO0FBQ1YsOEJBQVc7QUFBRWU7QUFBRixxQkFERDtBQUVWLDhCQUFXO0FBQ1RxRSw0QkFBTTtBQUNKQywrQkFBT0gsTUFESDtBQUVKdkIscUNBQWF1QixNQUZUO0FBR0p0QixzQ0FBY3NCLE1BSFY7QUFJSkksd0NBQWdCO0FBSlo7QUFERztBQUZEO0FBREgsaUJBRmlDOztBQWU1QyxvQkFBSUosU0FBUyxDQUFiLEVBQWdCO0FBQ2RDLHFCQUFHbkYsU0FBSCxDQUFhZ0IsTUFBYixDQUFvQlAsS0FBcEIsR0FBNEI7QUFDMUI4RSxvQ0FBZ0I7QUFDZFQsb0RBRGM7QUFFZHJGLG9DQUZjO0FBR2R5RjtBQUhjO0FBRFUsbUJBQTVCO0FBT0Q7O0FBRURELG9CQUFJTyxJQUFKLENBQVNMLEVBQVQ7QUFDRDs7QUFqQ2dCLG9CQWtDYkYsSUFBSWhDLE1BQUosS0FBZSxDQWxDRjtBQUFBO0FBQUE7QUFBQTs7QUFtQ2Z2RTtBQW5DZTs7QUFBQTtBQUFBO0FBQUEscUJBdUNYSCxTQUFTcUQsV0FBVzZELFNBQVgsQ0FBcUJSLEdBQXJCLENBQVQsQ0F2Q1c7O0FBQUE7QUF3Q2pCdkc7O0FBeENpQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFaOztBQUFBO0FBQUE7QUFBQTtBQUFBLE1BQVA7QUEwQ0QsQzs7Ozs7O0FDcFRELElBQU1nSCxPQUFPLG1CQUFBL0gsQ0FBUSxFQUFSLENBQWI7O21CQU9JTSxRQUFRQyxHO0lBTFZ5SCxlLGdCQUFBQSxlO0lBQ0FDLGtCLGdCQUFBQSxrQjtJQUNBQyxhLGdCQUFBQSxhO0lBQ0FDLG9CLGdCQUFBQSxvQjtJQUNBQyxlLGdCQUFBQSxlLEVBR0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFNQyxhQUFhO0FBQ2pCQyxnQkFBY04sZUFERztBQUVqQk8sbUJBQWlCTixrQkFGQTtBQUdqQk8sZ0JBQWNOLGFBSEc7QUFJakJPLHVCQUFxQk47QUFKSixDQUFuQjtBQU9BakksT0FBT0MsT0FBUCxHQUFpQixJQUFJNEgsSUFBSixDQUFTTSxVQUFULENBQWpCLEM7Ozs7Ozs7Ozs7Ozs7O0FDdEJBLElBQU1LLFlBQVksbUJBQUExSSxDQUFRLEVBQVIsQ0FBbEI7O0FBQ0EsSUFBTTJJLGdCQUFnQixpQ0FBdEI7SUFDUVAsZSxHQUFvQjlILFFBQVFDLEcsQ0FBNUI2SCxlO0FBRVIsSUFBTVEsUUFBUSxPQUFkO0FBRUExSSxPQUFPQyxPQUFQLEdBQWlCO0FBRWZ5SSxjQUZlO0FBSWZDLHVCQUplLGlDQUlPQyxVQUpQLEVBSW1CO0FBQ2hDLFFBQU1DLE9BQU9DLFdBQVdGLFVBQVgsQ0FBYjs7QUFEZ0MsdUJBRWJHLFlBQVlGLElBQVosQ0FGYTtBQUFBO0FBQUEsUUFFekJHLEdBRnlCO0FBQUEsUUFFcEJDLEdBRm9COztBQUdoQyxRQUFNQyxTQUFTRixRQUFRQyxHQUFSLEdBQWNELEdBQWQsYUFBdUJBLEdBQXZCLGlCQUFpQ0MsR0FBakMsQ0FBZjtBQUNBLFFBQU1yQyxJQUFJcUMsTUFBTSxDQUFOLEdBQVUsR0FBVixHQUFnQixFQUExQjtBQUNBLFFBQU1FLDhCQUF1QkQsTUFBdkIsdUJBQTBDdEMsQ0FBMUMsTUFBTjtBQUNBLFdBQU9nQyxXQUFXUSxPQUFYLENBQW1CLGNBQW5CLEVBQW1DRCxnQkFBbkMsQ0FBUDtBQUNELEdBWGM7QUFhZkUsb0JBYmUsOEJBYUlULFVBYkosRUFhZ0JVLFVBYmhCLEVBYTRCQyxLQWI1QixFQWFtQ0MsTUFibkMsRUFhMkM7QUFDeEQsUUFBTVgsT0FBT0MsV0FBV0YsVUFBWCxDQUFiOztBQUR3RCx3QkFFckNHLFlBQVlGLElBQVosQ0FGcUM7QUFBQTtBQUFBLFFBRWpERyxHQUZpRDtBQUFBLFFBRTVDQyxHQUY0Qzs7QUFHeEQsUUFBTUMsU0FBU0YsUUFBUUMsR0FBUixHQUFjRCxHQUFkLGFBQXVCQSxHQUF2QixjQUE4QkMsR0FBOUIsQ0FBZjtBQUNBLFFBQUlRLDJCQUFvQlAsTUFBcEIsdUNBQXNESSxVQUF0RCxRQUFKO0FBQ0EsUUFBSUksVUFBVWIsSUFBVixDQUFKLEVBQ0VZLCtCQUF3QlosSUFBeEI7QUFFRixRQUFJVSxLQUFKLEVBQVdFLGdDQUF5QkYsS0FBekI7QUFFWEUsZ0NBQXFCRCxNQUFyQjtBQUNBLFdBQU9DLFNBQVA7QUFDRCxHQXpCYztBQTJCZkUscUJBM0JlLCtCQTJCS2YsVUEzQkwsRUEyQmlCO0FBQzlCLFdBQU9BLFdBQVdRLE9BQVgsQ0FBbUIsOEJBQW5CLEVBQW1ELElBQW5ELENBQVA7QUFDRCxHQTdCYztBQStCZlEsa0JBL0JlLDRCQStCRXJELE9BL0JGLEVBK0JXK0MsVUEvQlgsRUErQnVCTyxTQS9CdkIsRUErQmtDakksTUEvQmxDLEVBK0IwQztBQUN2RCxRQUFNZ0YsSUFBSUwsUUFBUW5CLE1BQVIsR0FBaUIsQ0FBakIsR0FBcUIsR0FBckIsR0FBMkIsRUFBckM7QUFDQSxRQUFJMEUsNkJBQXNCbEQsQ0FBdEIsZUFBNEJMLFFBQVFNLElBQVIsQ0FBYSxJQUFiLENBQTVCLENBQUo7QUFDQWlELGlEQUFxQ1IsVUFBckM7QUFDQVEsa0JBQWMsbUJBQW1CckIsYUFBbkIsR0FBbUNELFVBQVVxQixTQUFWLENBQWpEO0FBQ0FDLGlDQUFzQmxJLE1BQXRCO0FBQ0EsV0FBT2tJLFVBQVA7QUFDRCxHQXRDYztBQXdDZkMsaUJBeENlLDJCQXdDQ0QsVUF4Q0QsRUF3Q2E5RyxVQXhDYixFQXdDeUI7QUFDdEMsUUFBTWdILCtDQUF3QzlCLGVBQXhDLHFCQUFrRWxGLFVBQWxFLENBQU47QUFDQSxRQUFNaUgsUUFBUUgsV0FBV25ELEtBQVgsQ0FBaUIsSUFBakIsQ0FBZDtBQUNBc0QsVUFBTUMsTUFBTixDQUFhLENBQUMsQ0FBZCxFQUFpQixDQUFqQixFQUFvQkYsWUFBcEI7QUFDQSxXQUFPQyxNQUFNcEQsSUFBTixDQUFXLElBQVgsQ0FBUDtBQUNELEdBN0NjO0FBK0Nmc0QsWUEvQ2Usc0JBK0NKdkIsVUEvQ0ksRUErQ1F3QixVQS9DUixFQStDb0I7QUFDakMsUUFBTUMsaUJBQWlCekIsV0FBVzBCLEtBQVgsQ0FBaUIsZUFBakIsRUFBa0MsQ0FBbEMsQ0FBdkI7QUFDQSxRQUFJQyxlQUFlLEVBQW5CO0FBQ0EsUUFBSUgsY0FBY0EsV0FBV2hGLE1BQVgsR0FBb0IsQ0FBdEMsRUFDRW1GLGVBQWVILFdBQVd6RCxLQUFYLENBQWlCLEdBQWpCLENBQWY7QUFFRixXQUFPLENBQUMwRCxjQUFELEVBQWlCRyxNQUFqQixDQUF3QkQsWUFBeEIsQ0FBUDtBQUNELEdBdERjO0FBd0RmRSxnQkF4RGUsMEJBd0RBeEQsY0F4REEsUUF3RHFEO0FBQUEsUUFBcEN5RCxnQkFBb0MsUUFBcENBLGdCQUFvQztBQUFBLFFBQWxCdEgsZUFBa0IsUUFBbEJBLGVBQWtCO0FBQ2xFLFFBQU11SCxlQUFlQyxLQUFLQyxLQUFMLENBQ25CLENBQUMsSUFBSTNELElBQUosQ0FBU0QsY0FBVCxJQUEyQixJQUFJQyxJQUFKLENBQVN3RCxnQkFBVCxDQUE1QixJQUEwRGhDLEtBRHZDLENBQXJCO0FBR0EsUUFBTWxCLFFBQVEsS0FBS21ELFlBQW5CO0FBRUEsV0FBT0MsS0FBSzNCLEdBQUwsQ0FBU3pCLEtBQVQsRUFBZ0IsQ0FBaEIsQ0FBUDtBQUNELEdBL0RjO0FBaUVmc0QsZUFqRWUseUJBaUVEQyxJQWpFQyxFQWlFSztBQUNsQixXQUFPQSxLQUFLQyxJQUFMLEdBQVlDLEtBQVosQ0FBa0IvQyxnQkFBZ0I5QyxNQUFoQixHQUF5QixDQUEzQyxDQUFQO0FBQ0QsR0FuRWM7QUFxRWY4RixjQXJFZSx3QkFxRUZDLElBckVFLEVBcUVJO0FBQ2pCO0FBQ0EsUUFBTUMsTUFBTSxJQUFJbEUsSUFBSixFQUFaO0FBQ0EsUUFBTW1FLGtCQUFrQixJQUFJbkUsSUFBSixDQUN0QmtFLElBQUlFLFdBQUosRUFEc0IsRUFFdEJGLElBQUlHLFFBQUosRUFGc0IsRUFHdEJILElBQUlJLE9BQUosRUFIc0IsRUFJdEJMLElBSnNCLEVBSWhCLENBSmdCLEVBSWIsQ0FKYSxFQUlWLENBSlUsSUFJTEMsR0FKbkI7QUFNQSxRQUFJQyxrQkFBa0IsQ0FBdEIsRUFBeUI7QUFDdkJBLDZEQUFtQixLQUFHM0MsS0FBdEI7QUFFRixXQUFPMkMsZUFBUDtBQUNELEdBbEZjO0FBb0ZmM0ssVUFwRmUsb0JBb0ZOK0ssT0FwRk0sRUFvRkc7QUFDakIsV0FBT0EsUUFDSkMsSUFESSxDQUNDO0FBQUEsYUFBUWhILElBQVI7QUFBQSxLQURELEVBRUppSCxLQUZJLENBRUUsZUFBTztBQUNaQyxjQUFRQyxLQUFSLENBQWMsUUFBZCxFQUF1QkMsR0FBdkI7QUFDQSxhQUFPLEVBQVA7QUFDRCxLQUxJLENBQVA7QUFNQSxHQTNGYztBQTZGZkMsVUE3RmUsb0JBNkZOQyxJQTdGTSxFQTZGQUMsSUE3RkEsRUE2Rk07QUFDbkIsV0FBT0MsTUFBTUQsS0FBS0UsT0FBTCxDQUFhSCxJQUFiLENBQU4sQ0FBUDtBQUNEO0FBL0ZjLENBQWpCLEMsQ0FpR0U7O0FBR0YsU0FBU0UsS0FBVCxDQUFlRSxLQUFmLEVBQXNCO0FBQ3BCLFNBQU9BLFVBQVUsQ0FBQyxDQUFsQjtBQUNEOztBQUVELFNBQVMxQyxTQUFULENBQW1CYixJQUFuQixFQUF5QjtBQUN2QixTQUFPQSxLQUFLTyxPQUFMLENBQWEsT0FBYixFQUFzQixFQUF0QixFQUEwQjRCLElBQTFCLEdBQWlDNUYsTUFBakMsS0FBNEMsQ0FBbkQ7QUFDRDs7QUFFRCxTQUFTaUgsUUFBVCxDQUFrQnhELElBQWxCLEVBQXdCO0FBQ3RCLE1BQU15RCxtQkFBbUIsVUFBekI7QUFDQSxNQUFNQyxlQUFlLENBQUMxRCxLQUFLeUIsS0FBTCxDQUFXZ0MsZ0JBQVgsS0FBZ0MsRUFBakMsRUFBcUNsSCxNQUExRDtBQUNBLE1BQU1vSCxhQUFhM0QsS0FBS08sT0FBTCxDQUFha0QsZ0JBQWIsRUFBK0IsRUFBL0IsRUFBbUNsRCxPQUFuQyxDQUEyQyxZQUEzQyxFQUF5RCxFQUF6RCxFQUE2RGhFLE1BQWhGO0FBRUEsU0FBT21ILGVBQWVDLFVBQXRCO0FBQ0Q7O0FBRUQsU0FBU0MsUUFBVCxDQUFrQjVELElBQWxCLEVBQXdCO0FBQ3RCLE1BQU02RCxnQkFBZ0IsQ0FBQzdELEtBQUt5QixLQUFMLENBQVcsS0FBWCxLQUFxQixFQUF0QixFQUEwQmxGLE1BQWhEO0FBQ0EsU0FBT2lILFNBQVN4RCxJQUFULElBQWlCNkQsYUFBeEI7QUFDRDs7QUFFRCxTQUFTM0QsV0FBVCxDQUFxQkYsSUFBckIsRUFBMkI7QUFDekIsU0FBTyxDQUFDNEQsU0FBUzVELElBQVQsQ0FBRCxFQUFpQndELFNBQVN4RCxJQUFULENBQWpCLENBQVA7QUFDRDs7QUFFRCxTQUFTQyxVQUFULENBQW9CRixVQUFwQixFQUFnQztBQUM5QixNQUFNK0QsU0FBUy9ELFdBQVcwQixLQUFYLENBQWlCLHNCQUFqQixFQUF5QyxDQUF6QyxDQUFmO0FBQ0EsTUFBTXNDLGFBQWFDLGFBQWFDLFFBQVFDLG1CQUFtQkosTUFBbkIsQ0FBUixDQUFiLENBQW5CO0FBRUEsU0FBT0ssUUFBUXJHLE1BQU1pRyxVQUFOLENBQVIsRUFBMkJuRyxHQUEzQixDQUErQixpQkFBUztBQUM3QyxRQUFJd0csVUFBVSxHQUFkLEVBQ0UsT0FBTyxJQUFQO0FBRUYsUUFBSUEsVUFBVSxHQUFkLEVBQ0UsT0FBTyxnQkFBUDs7QUFFRixRQUFJLEtBQUtDLElBQUwsQ0FBVUQsS0FBVixDQUFKLEVBQXNCO0FBQ3BCLFVBQU1FLFNBQVMsRUFBZjtBQUNBLFVBQU1DLFdBQVdDLE9BQU9KLE1BQU0zQyxLQUFOLENBQVksS0FBWixFQUFtQixDQUFuQixDQUFQLENBQWpCOztBQUNBLFdBQUssSUFBSW5GLElBQUksQ0FBYixFQUFnQkEsSUFBSWlJLFFBQXBCLEVBQThCakksR0FBOUI7QUFDRWdJLGVBQU94RixJQUFQLENBQVksS0FBWjtBQURGOztBQUdBLFVBQUl3RixPQUFPL0gsTUFBUCxLQUFrQixDQUF0QixFQUNFLE9BQU8sS0FBUDtBQUVGLGFBQU8sTUFBTStILE9BQU90RyxJQUFQLENBQVksR0FBWixDQUFOLEdBQXlCLEdBQWhDO0FBQ0Q7O0FBRUQsUUFBSSxJQUFJcUcsSUFBSixDQUFTRCxLQUFULENBQUosRUFBcUI7QUFDbkIsVUFBTUssZUFBZUwsTUFBTTdELE9BQU4sQ0FBYyxJQUFkLEVBQW9CLEVBQXBCLENBQXJCO0FBQ0EsOEJBQVlrRSxZQUFaO0FBQ0QsS0F0QjRDLENBdUI3Qzs7O0FBQ0EsV0FBT0wsS0FBUDtBQUNELEdBekJNLEVBeUJKcEcsSUF6QkksQ0F5QkMsR0F6QkQsQ0FBUDtBQTBCRDs7QUFFRCxTQUFTa0csa0JBQVQsQ0FBNEJRLE1BQTVCLEVBQW9DO0FBQ2xDLFNBQU9BLE9BQU9uRSxPQUFQLENBQWUsUUFBZixFQUF5QixVQUFDa0IsS0FBRCxFQUFRa0QsRUFBUjtBQUFBLHNCQUFtQkEsR0FBR3BJLE1BQXRCO0FBQUEsR0FBekIsQ0FBUDtBQUNEOztBQUVELFNBQVMwSCxPQUFULENBQWlCUyxNQUFqQixFQUF5QjtBQUN2QixTQUFPQSxPQUFPbkUsT0FBUCxDQUFlLFFBQWYsRUFBeUIsTUFBekIsQ0FBUDtBQUNEOztBQUVELFNBQVN5RCxZQUFULENBQXNCVSxNQUF0QixFQUE4QjtBQUM1QixTQUFPQSxPQUFPbkUsT0FBUCxDQUFlLFlBQWYsRUFBNkIsT0FBN0IsQ0FBUDtBQUNEOztBQUVELFNBQVN6QyxLQUFULENBQWU4RyxHQUFmLEVBQW9CO0FBQ2xCLFNBQU9BLElBQUk5RyxLQUFKLENBQVUsUUFBVixFQUNJRixHQURKLENBQ1E7QUFBQSxXQUNILE9BQU95RyxJQUFQLENBQVlELEtBQVosSUFDRUEsS0FERixHQUVFQSxNQUFNdEcsS0FBTixDQUFZLEVBQVosQ0FIQztBQUFBLEdBRFIsQ0FBUDtBQU1EOztBQUVELFNBQVMrRyxNQUFULENBQWdCQyxDQUFoQixFQUFtQjtBQUNqQixTQUFPLENBQUNDLE1BQU1DLE9BQU4sQ0FBY0YsQ0FBZCxDQUFSO0FBQ0Q7O0FBRUQsU0FBU1gsT0FBVCxDQUFpQmMsSUFBakIsRUFBa0M7QUFBQSxNQUFYQyxJQUFXLHVFQUFKLEVBQUk7QUFDaEMsTUFBSUQsS0FBSzFJLE1BQUwsS0FBZ0IsQ0FBcEIsRUFDRSxPQUFPMkksSUFBUDs7QUFGOEIsdUJBSVZELElBSlU7QUFBQSxNQUkzQkUsSUFKMkI7QUFBQSxNQUlsQkMsSUFKa0I7O0FBS2hDLFNBQU9QLE9BQU9NLElBQVAsSUFDSGhCLFFBQVFpQixJQUFSLEVBQWNGLEtBQUt2RCxNQUFMLENBQVl3RCxJQUFaLENBQWQsQ0FERyxHQUVIaEIsUUFBUWlCLElBQVIsRUFBY0YsS0FBS3ZELE1BQUwsQ0FBWXdDLFFBQVFnQixJQUFSLENBQVosQ0FBZCxDQUZKO0FBR0QsQzs7Ozs7Ozs7Ozs7Ozs7QUNwTUQsMkM7Ozs7OztBQ0FBLElBQUksSUFBSixFQUNFLG1CQUFBbE8sQ0FBUSxDQUFSLEVBQWtCb08sTUFBbEI7O0FBRUYsSUFBTUMsVUFBVSxtQkFBQXJPLENBQVEsQ0FBUixDQUFoQjs7QUFDQSxJQUFNc08sTUFBTUQsU0FBWjs7QUFDQSxJQUFNbkosT0FBTyxtQkFBQWxGLENBQVEsQ0FBUixDQUFiOztBQUNBLElBQU11TyxhQUFhLG1CQUFBdk8sQ0FBUSxFQUFSLENBQW5COztBQUNBLElBQU13TyxhQUFhLG1CQUFBeE8sQ0FBUSxFQUFSLENBQW5COztBQUVBc08sSUFBSUcsR0FBSixDQUFRLE1BQVIsRUFBaUJuTyxRQUFRQyxHQUFSLENBQVltTyxJQUFaLElBQW9CLElBQXJDO0FBQ0FKLElBQUlLLEdBQUosQ0FBUU4sUUFBUU8sTUFBUixDQUFlMUosS0FBS25FLE9BQUwsQ0FBYThOLFNBQWIsRUFBd0IsU0FBeEIsQ0FBZixDQUFSO0FBQ0FQLElBQUlLLEdBQUosQ0FBUUosV0FBV3pLLElBQVgsRUFBUjs7QUFFQSxtQkFBQTlELENBQVEsRUFBUixFQUFpQnNPLEdBQWpCOztBQUVBRSxXQUFXTSxLQUFYO0FBRUFSLElBQUlTLE1BQUosQ0FBV1QsSUFBSVUsR0FBSixDQUFRLE1BQVIsQ0FBWCxFQUE0QjtBQUFBLFNBQzFCbEQsUUFBUW1ELEdBQVIsQ0FBWSxtQkFBWixFQUFpQ1gsSUFBSVUsR0FBSixDQUFRLE1BQVIsQ0FBakMsQ0FEMEI7QUFBQSxDQUE1QjtBQUlBN08sVUFBVUQsT0FBT0MsT0FBUCxHQUFpQm1PLEdBQTNCLEM7Ozs7OztBQ3JCQSxtQzs7Ozs7O0FDQUEsb0M7Ozs7OztBQ0FBLHdDOzs7Ozs7OztBQ0FBLElBQU03TixLQUFLLG1CQUFBVCxDQUFRLENBQVIsQ0FBWDs7ZUFXSSxtQkFBQUEsQ0FBUSxDQUFSLEM7SUFURjRJLEssWUFBQUEsSztJQUNBcUIsZSxZQUFBQSxlO0lBQ0FVLGMsWUFBQUEsYztJQUNBc0IsUSxZQUFBQSxRO0lBQ0FqQixhLFlBQUFBLGE7SUFDQWtFLFksWUFBQUEsWTtJQUNBOUQsWSxZQUFBQSxZO0lBQ0ErRCxTLFlBQUFBLFM7SUFDQXZPLFEsWUFBQUEsUTs7QUFFRixJQUFNd08sVUFBVSxtQkFBQXBQLENBQVEsQ0FBUixDQUFoQjs7SUFDUW9JLGUsR0FBb0I5SCxRQUFRQyxHLENBQTVCNkgsZTtBQUVSLElBQU1pSCxrQkFBa0IsS0FBeEI7QUFDQSxJQUFJQyxvQkFBb0IsS0FBeEI7QUFFQXBQLE9BQU9DLE9BQVAsR0FBaUI7QUFDZjJPLFNBQU8saUJBQU07QUFDWFM7QUFDQUMsZ0JBQVlDLG1CQUFaLEVBQWlDSCxpQkFBakM7QUFDRCxHQUpjLENBS2Y7QUFDQTtBQUNBO0FBQ0E7O0FBUmUsQ0FBakI7O0FBV0EsU0FBU0ksYUFBVCxHQUF5QjtBQUN2QixNQUFNQyxlQUFldkUsYUFBYSxFQUFiLENBQXJCO0FBQ0EsTUFBTXdFLG9CQUFvQnhFLGFBQWEsQ0FBYixDQUExQjtBQUVBeUUsYUFBVyxZQUFNO0FBQ2ZMLGdCQUFZQyxtQkFBWixFQUFpQ0gsaUJBQWpDO0FBQ0QsR0FGRCxFQUVHSyxZQUZIO0FBSUFFLGFBQVcsWUFBTTtBQUNmTCxnQkFBWTVKLGtCQUFaLEVBQWdDLEtBQUdnRCxLQUFuQztBQUNELEdBRkQsRUFFR2dILGlCQUZIO0FBR0Q7O1NBRWNILG1COzs7Ozs7OzBCQUFmO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQVNZN08sU0FBU0gsR0FBR0ksaUJBQUgsRUFBVCxDQVRaOztBQUFBO0FBQUE7QUFFSWlCLGtCQUZKLFNBRUlBLE1BRko7QUFHSTBFLHdCQUhKLFNBR0lBLFlBSEo7QUFJSWhFLHVCQUpKLFNBSUlBLFdBSko7QUFLSUMsMkJBTEosU0FLSUEsZUFMSjtBQU1JQyx1QkFOSixTQU1JQSxXQU5KO0FBT0lDLDJCQVBKLFNBT0lBLGVBUEo7QUFRSThELG1CQVJKLFNBUUlBLE9BUko7O0FBQUEsZ0JBVU8zRSxNQVZQO0FBQUE7QUFBQTtBQUFBOztBQUFBOztBQUFBO0FBQUE7QUFBQSxtQkFnQllsQixTQUNSdU8sVUFDRTNJLFlBREYsRUFFRWhFLFdBRkYsRUFHRUMsZUFIRixFQUlFQyxXQUpGLEVBS0VDLGVBTEYsQ0FEUSxDQWhCWjs7QUFBQTtBQUFBO0FBYUlPLHNCQWJKLFNBYUlBLFVBYko7QUFjSTBILDRCQWRKLFNBY0lBLGdCQWRKO0FBZUl6SSxxQkFmSixTQWVJQSxTQWZKO0FBMEJRMk4sd0JBMUJSLEdBMEJ1QjtBQUNuQmhPLDRCQURtQjtBQUVuQm9CLG9DQUZtQjtBQUduQnNELHdDQUhtQjtBQUluQkMsOEJBSm1CO0FBS25CbUUsZ0RBTG1CO0FBTW5CckgsNEJBQWMsRUFOSztBQU9uQkQsK0JBQWlCO0FBUEUsYUExQnZCO0FBbUNFN0MsZUFBR3dCLGVBQUgsQ0FBbUI2TixZQUFuQixFQUFpQzNOLFNBQWpDO0FBQ0EwTix1QkFBVztBQUFBLHFCQUFNRSxZQUFZak8sTUFBWixFQUFvQm9CLFVBQXBCLENBQU47QUFBQSxhQUFYLEVBQWtEbU0sZUFBbEQ7O0FBcENGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7U0F1Q2VVLFc7Ozs7Ozs7MEJBQWYsa0JBQTJCak8sTUFBM0IsRUFBbUNvQixVQUFuQztBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFLWXRDLFVBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FILGVBQUdvQixvQkFBSCxDQUF3QkMsTUFBeEIsQ0FQUSxDQUxaOztBQUFBO0FBQUE7QUFFSWtJLHNCQUZKLFNBRUlBLFVBRko7QUFHSWpILHFCQUhKLFNBR0lBLFNBSEo7QUFJSUMseUJBSkosU0FJSUEsYUFKSjtBQUFBO0FBQUEsbUJBZThCcEMsU0FDMUJ1TyxVQUNFbEYsZ0JBQWdCRCxVQUFoQixFQUE0QjlHLFVBQTVCLENBREYsRUFFRUgsU0FGRixFQUdFQyxhQUhGLENBRDBCLENBZjlCOztBQUFBO0FBQUE7QUFlVWIscUJBZlYsU0FlVUEsU0FmVjtBQXVCRTFCLGVBQUdtQyxrQkFBSCxDQUFzQmQsTUFBdEIsRUFBOEJLLFNBQTlCOztBQXZCRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O0FBMEJBLFNBQVNvTixVQUFULEdBQXNCO0FBQ3BCLE1BQU1TLFNBQVNaLFFBQVFZLE1BQVIsQ0FBZSxpQkFBZixFQUFrQztBQUFFQyxzQkFBVzdILGVBQVg7QUFBRixHQUFsQyxDQUFmO0FBRUE0SCxTQUFPRSxFQUFQLENBQVUsT0FBVjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsNEJBQW1CO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDVWhOLHdCQURWLFFBQ2pCaU4seUJBRGlCLEVBRUxoSixjQUZLLFFBRWpCaUosVUFGaUIsRUFHakJuRixJQUhpQixRQUdqQkEsSUFIaUIsbUJBSWpCL0csSUFKaUIsRUFLWGQsTUFMVyxhQUtmaU4sRUFMZSxFQU1mbE0sSUFOZSxhQU1mQSxJQU5lLEVBT0ZDLE1BUEUsYUFPZmtNLFdBUGUsRUFRVWpNLE1BUlYsYUFRZmtNLHVCQVJlLEVBU0tqTSxhQVRMLGFBU2ZrTSxrQkFUZTtBQUFBO0FBQUEscUJBWVc1UCxTQUFTSCxHQUFHK0MsZ0JBQUgsRUFBVCxDQVpYOztBQUFBO0FBWVhwQiwyQkFaVztBQWFYcU8sMkJBYlcsR0FhS3JPLGNBQWNzTyxNQUFkLENBQ3BCO0FBQUEsdUJBQWdCQyxhQUFhek4sVUFBYixLQUE0QkEsVUFBNUM7QUFBQSxlQURvQixFQUVwQixDQUZvQixDQWJMOztBQUFBLG1CQWlCYnVOLGFBakJhO0FBQUE7QUFBQTtBQUFBOztBQW1CYm5OLDZCQW5CYSxHQXFCWG1OLGFBckJXLENBbUJibk4sZUFuQmEsRUFvQkpzTixlQXBCSSxHQXFCWEgsYUFyQlcsQ0FvQmJoSyxPQXBCYTs7QUFBQSxtQkFzQlh3RixTQUFTN0ksTUFBVCxFQUFpQkUsZUFBakIsQ0F0Qlc7QUFBQTtBQUFBO0FBQUE7O0FBQUE7O0FBQUE7QUFBQTtBQUFBLHFCQXlCUzFDLFNBQVNzTyxhQUFhOUwsTUFBYixDQUFULENBekJUOztBQUFBO0FBeUJUbUIsdUJBekJTO0FBMEJUUCxxQkExQlMsR0EwQkM7QUFDZFosOEJBRGM7QUFFZGUsMEJBRmM7QUFHZEMsOEJBSGM7QUFJZEMsOEJBSmM7QUFLZEMsNENBTGM7QUFNZEMsb0NBTmM7QUFPZG1ELHVCQUFPLENBUE87QUFRZHpCLDhCQUFjLENBUkE7QUFTZEQsNkJBQWEsQ0FUQztBQVVkMkIsZ0NBQWdCLENBVkY7QUFXZEMsZ0NBQWdCO0FBWEYsZUExQkQ7QUF1Q2ZuSCxpQkFBR3NELGVBQUgsQ0FBbUJDLE9BQW5CO0FBRU02TSx3QkF6Q1MsR0F5Q0k3RixjQUFjQyxJQUFkLENBekNKOztBQTBDZixrQkFBSWdCLFNBQVM0RSxVQUFULEVBQXFCRCxlQUFyQixDQUFKLEVBQTJDO0FBQ25Dckosc0JBRG1DLEdBQzFCb0QsZUFBZXhELGNBQWYsRUFBK0JzSixhQUEvQixDQUQwQjtBQUV6Q2hRLG1CQUFHd0Msa0JBQUgsQ0FBc0JDLFVBQXRCLEVBQWtDO0FBQUVFLGdDQUFGO0FBQVVtRTtBQUFWLGlCQUFsQztBQUVELGVBSkQsTUFJTztBQUNMOUcsbUJBQUd3QyxrQkFBSCxDQUFzQkMsVUFBdEIsRUFBa0M7QUFBRUUsZ0NBQUY7QUFBVW1FLDBCQUFRO0FBQWxCLGlCQUFsQztBQUNEOztBQWhEYztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFuQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQW9EQXlJLFNBQU9FLEVBQVAsQ0FBVSxZQUFWLEVBQXdCLFVBQUNZLGFBQUQsRUFBbUI7QUFDekNoRixZQUFRQyxLQUFSLENBQWMsNEJBQWQsRUFBNEMrRSxhQUE1QztBQUNBakIsZUFBVztBQUFBLGFBQU1HLE9BQU9sQixLQUFQLEVBQU47QUFBQSxLQUFYLEVBQWlDLEdBQWpDO0FBQ0QsR0FIRDtBQUlEOztBQUVELFNBQVNsSixrQkFBVCxHQUE4QjtBQUM1QixNQUFNMEYsTUFBTWxFLEtBQUtrRSxHQUFMLEVBQVo7QUFDQSxNQUFNekYsbUJBQW1CeUYsSUFBSXlGLE1BQUosT0FBaUIsQ0FBMUM7QUFDQSxNQUFNakwsb0JBQW9Cd0YsSUFBSUksT0FBSixPQUFrQixDQUE1QztBQUVBLE1BQUk3RixvQkFBb0JDLGlCQUF4QixFQUNFckYsR0FBR21GLGtCQUFILENBQXNCQyxnQkFBdEIsRUFBd0NDLGlCQUF4QztBQUNILEM7Ozs7OztBQy9LRCxvQzs7Ozs7Ozs7Ozs7O0FDQUEsSUFBTWtMLEtBQUssbUJBQUFoUixDQUFRLEVBQVIsQ0FBWDs7QUFDQSxJQUFNaVIsTUFBTSxtQkFBQWpSLENBQVEsRUFBUixFQUFrQmlSLEdBQTlCOztBQUNBLElBQU0vTCxPQUFPLG1CQUFBbEYsQ0FBUSxDQUFSLENBQWI7O0FBQ0EsSUFBTWtSLFFBQVEsbUJBQUFsUixDQUFRLEVBQVIsQ0FBZDs7QUFDQSxJQUFNbVIsZUFBZWpNLEtBQUtuRSxPQUFMLENBQWE4TixTQUFiLEVBQXdCLFlBQXhCLENBQXJCOztlQVFJLG1CQUFBN08sQ0FBUSxDQUFSLEM7SUFORjZJLHFCLFlBQUFBLHFCO0lBQ0FVLGtCLFlBQUFBLGtCO0lBQ0FNLG1CLFlBQUFBLG1CO0lBQ0FDLGdCLFlBQUFBLGdCO0lBQ0FPLFUsWUFBQUEsVTtJQUNBekosUSxZQUFBQSxROztBQUlGVixPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZRLDhCQURlO0FBRWZ5USw4QkFGZTtBQUdmQztBQUhlLENBQWpCOztBQU1BLFNBQVMxUSxhQUFULENBQXVCMlEsV0FBdkIsRUFBb0M7QUFDbEMsU0FBTyxJQUFJeFEsT0FBSjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsNEJBQVksa0JBQU9DLE9BQVAsRUFBZ0JDLE1BQWhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNYZ1Asb0JBRFcsR0FDRmdCLEdBQUdPLGdCQUFILENBQW9CRCxXQUFwQixFQUNaRSxJQURZLENBQ1BOLE1BQU1PLE9BQU4sQ0FBYztBQUFFdk0sc0JBQU07QUFBUixlQUFkLENBRE8sQ0FERTtBQUlqQjhLLHFCQUFPRSxFQUFQLENBQVUsT0FBVjtBQUFBO0FBQUE7QUFBQTtBQUFBLHNDQUFtQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDWHdCLDZCQURXLEdBQ0hWLEdBQUdXLFdBQUgsQ0FBZVIsWUFBZixDQURHO0FBQUE7QUFBQSwrQkFFWHZRLFNBQVN5USxlQUFlRixlQUFlLFFBQTlCLENBQVQsQ0FGVzs7QUFBQTtBQUdqQnJGLGdDQUFRbUQsR0FBUixDQUFZLDZCQUFaO0FBQ005TixnQ0FKVyxHQUlBeVEsZ0JBQWdCRixLQUFoQixDQUpBO0FBTWpCRyxnQ0FBUUgsS0FBUjtBQUNBM1EsZ0NBQVFJLFFBQVI7O0FBUGlCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQW5COztBQUppQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFaOztBQUFBO0FBQUE7QUFBQTtBQUFBLE1BQVA7QUFjRDs7QUFFRCxTQUFTa1EsY0FBVCxDQUF3QlMsT0FBeEIsRUFBaUM7QUFDL0IsU0FBTyxJQUFJaFIsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0QyxRQUFNK1Esa0JBQWtCLEVBQXhCO0FBQ0FmLE9BQUdXLFdBQUgsQ0FBZUcsT0FBZixFQUF3QkUsT0FBeEIsQ0FBZ0MsZ0JBQVE7QUFDdEMsVUFBSSxXQUFXNUUsSUFBWCxDQUFnQm5JLElBQWhCLENBQUosRUFBMkI7QUFDekIsWUFBTWdOLGNBQWNILFVBQVUsR0FBVixHQUFnQjdNLElBQXBDO0FBQ0EsWUFBTWlOLFdBQVdsQixHQUFHbUIsWUFBSCxDQUFnQkYsV0FBaEIsQ0FBakI7QUFDQSxZQUFNRyxjQUFjcEIsR0FBR3FCLGlCQUFILENBQXFCSixXQUFyQixDQUFwQjtBQUNBLFlBQU1LLGVBQWUsSUFBSXhSLE9BQUosQ0FBWSxVQUFDK0MsR0FBRCxFQUFNME8sR0FBTjtBQUFBLGlCQUMvQkgsWUFBWWxDLEVBQVosQ0FBZSxPQUFmLEVBQXdCck0sR0FBeEIsQ0FEK0I7QUFBQSxTQUFaLENBQXJCO0FBR0FrTyx3QkFBZ0JsSyxJQUFoQixDQUFxQnlLLFlBQXJCO0FBQ0EsWUFBSXJCLEdBQUosQ0FBUTtBQUFFdUIsc0JBQVksQ0FBZDtBQUFpQkMsd0JBQWM7QUFBL0IsU0FBUixFQUNHQyxLQURILENBQ1NSLFFBRFQsRUFDbUIsVUFBQ2xHLEdBQUQsRUFBTTJHLEdBQU4sRUFBYztBQUM3QjtBQUNBO0FBQ0E7QUFDQUEsY0FBSS9OLElBQUosQ0FBUyxDQUFULEtBQWUsQ0FBZjtBQUNBK04sY0FBSUMsSUFBSixHQUFXcEIsSUFBWCxDQUFnQlksV0FBaEI7QUFDRCxTQVBIO0FBUUQ7QUFDRixLQWxCRDtBQW1CQXRSLFlBQVErUixHQUFSLENBQVlkLGVBQVosRUFBNkJuRyxJQUE3QixDQUFrQzdLLE9BQWxDO0FBQ0QsR0F0Qk0sQ0FBUDtBQXVCRDs7QUFFRCxTQUFTNlEsZUFBVCxDQUF5QkYsS0FBekIsRUFBZ0M7QUFDOUIsTUFBSW9CLGNBQWMsRUFBbEI7QUFEOEI7QUFBQTtBQUFBOztBQUFBO0FBRTlCLHlCQUFpQnBCLEtBQWpCLDhIQUF3QjtBQUFBLFVBQWZ6TSxLQUFlO0FBQ3RCLFVBQU1nTix3QkFBaUJkLFlBQWpCLGNBQWlDbE0sS0FBakMsQ0FBTjtBQUNBLFVBQU04TixRQUFRL0IsR0FBR2dDLFFBQUgsQ0FBWWYsV0FBWixDQUFkOztBQUVBLFVBQUljLE1BQU1FLE1BQU4sTUFBa0JoTyxNQUFLdUYsS0FBTCxDQUFXLFdBQVgsQ0FBdEIsRUFBK0M7QUFDN0MsWUFBTXJKLFdBQVdpUSxjQUFjYSxXQUFkLENBQWpCO0FBQ0FhLHNCQUFjQSxZQUFZcEksTUFBWixDQUFtQnZKLFFBQW5CLENBQWQ7QUFDRDtBQUNGO0FBVjZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBVzlCLFNBQU8yUixXQUFQO0FBQ0Q7O0FBRUQsU0FBUzFCLGFBQVQsQ0FBdUJwTSxRQUF2QixFQUFpQztBQUMvQixNQUFNa04sV0FBV2dCLEtBQUtSLEtBQUwsQ0FBVzFCLEdBQUdtQixZQUFILENBQWdCbk4sUUFBaEIsRUFBMEIsTUFBMUIsQ0FBWCxDQUFqQjtBQUNBLFNBQU9rTixTQUFTekksS0FBVCxDQUFlOUMsR0FBZixDQUFtQixnQkFBUTtBQUFBLHNDQWlCNUJDLEtBQUt1TSxNQWpCdUI7QUFBQSxRQUU5QnJLLFVBRjhCO0FBQUEsUUFHNUI7QUFDRDtBQUNEVSxjQUw4QjtBQUFBLFFBTTVCO0FBQ0ZoSCxlQVA4QjtBQUFBLFFBUTlCTyxTQVI4QjtBQUFBLFFBUzVCO0FBQ0ZMLGVBVjhCO0FBQUEsUUFXOUJDLGVBWDhCO0FBQUEsUUFZOUIySCxVQVo4QjtBQUFBLFFBYTlCUCxTQWI4QjtBQUFBLFFBYW5CO0FBQ0E7QUFDWE4sU0FmOEI7QUFBQSxRQWdCOUIzSCxNQWhCOEI7O0FBQUEsZUFtQkUsQ0FBQ2dILFVBQUQsRUFBYVUsVUFBYixFQUF5QkMsS0FBekIsRUFBZ0M5QyxHQUFoQyxDQUFvQ3lNLFNBQXBDLENBbkJGOztBQUFBOztBQW1CL0J0SyxjQW5CK0I7QUFtQm5CVSxjQW5CbUI7QUFtQlBDLFNBbkJPO0FBb0JoQyxRQUFNaEQsVUFBVTRELFdBQVd2QixVQUFYLEVBQXVCd0IsVUFBdkIsQ0FBaEI7QUFFQSxXQUFPO0FBQ0x4SSxvQkFESztBQUVMMEUsb0JBQWlCK0MsbUJBQW1CVCxVQUFuQixFQUErQlUsVUFBL0IsRUFBMkNDLEtBQTNDLEVBQWtEM0gsTUFBbEQsQ0FGWjtBQUdMVSxtQkFBaUI2USxVQUFVN1EsV0FBVixDQUhaO0FBSUxDLHVCQUFpQm9HLHNCQUFzQkMsVUFBdEIsQ0FKWjtBQUtMcEcsbUJBQWlCMlEsVUFBVTNRLFdBQVYsQ0FMWjtBQU1MQyxzQ0FOSztBQU9McUgsa0JBQWlCRixpQkFBaUJyRCxPQUFqQixFQUEwQitDLFVBQTFCLEVBQXNDTyxTQUF0QyxFQUFpRGpJLE1BQWpELENBUFo7QUFRTGlCLGlCQUFpQnNRLFVBQVV0USxTQUFWLENBUlo7QUFTTEMscUJBQWlCNkcsb0JBQW9CZixVQUFwQixDQVRaO0FBVUxyQyxzQkFWSztBQVdMdEUsaUJBQVc7QUFYTixLQUFQO0FBYUQsR0FuQ00sQ0FBUDtBQW9DRDs7QUFFRCxTQUFTaVIsU0FBVCxDQUFtQjNGLE1BQW5CLEVBQTJCO0FBQ3pCLFNBQU9BLE9BQU9uRSxPQUFQLENBQWUsYUFBZixFQUE4QixFQUE5QixDQUFQO0FBQ0Q7O0FBRUQsU0FBU2dLLE1BQVQsQ0FBZ0I3RixNQUFoQixFQUF3QjtBQUN0QixTQUFPLENBQUNBLE9BQU9qRCxLQUFQLENBQWEsWUFBYixLQUE4QixHQUEvQixFQUFvQyxDQUFwQyxDQUFQO0FBQ0Q7O0FBRUQsU0FBUzZJLFNBQVQsQ0FBbUI1RixNQUFuQixFQUEyQjtBQUN6QixNQUFJLENBQUNBLE1BQUQsSUFBV0EsT0FBT25JLE1BQVAsS0FBa0IsQ0FBakMsRUFBb0M7QUFFcEMsTUFBSWlPLE1BQUo7O0FBQ0EsTUFBSTtBQUNGQSxhQUFTdkMsR0FBR21CLFlBQUgsV0FDSmhCLFlBREksb0JBQ2tCbUMsT0FBTzdGLE1BQVAsQ0FEbEIsR0FFUDtBQUFFK0YsZ0JBQVU7QUFBWixLQUZPLENBQVQ7QUFJRCxHQUxELENBS0UsT0FBT0MsQ0FBUCxFQUFVLENBQ1Y7QUFDRDs7QUFDRCxTQUFPRixNQUFQO0FBQ0Q7O0FBRUQsU0FBUzFCLE9BQVQsQ0FBaUJILEtBQWpCLEVBQXdCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQ3RCLDBCQUFpQkEsS0FBakIsbUlBQXdCO0FBQUEsVUFBZnpNLE1BQWU7QUFDdEIsVUFBTXlPLGlCQUFVdkMsWUFBVixjQUEwQmxNLE1BQTFCLENBQU47QUFFQSxVQUFJK0wsR0FBRzJDLFNBQUgsQ0FBYUQsSUFBYixFQUFtQlQsTUFBbkIsRUFBSixFQUNFakMsR0FBRzRDLFVBQUgsQ0FBY0YsSUFBZCxFQURGLEtBRUssSUFBSTFDLEdBQUcyQyxTQUFILENBQWFELElBQWIsRUFBbUJHLFdBQW5CLEVBQUosRUFDSEMsc0JBQXNCSixJQUF0QjtBQUNIO0FBUnFCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFTdkI7O0FBRUQsU0FBU0kscUJBQVQsQ0FBK0JDLFFBQS9CLEVBQXlDO0FBQ3ZDLE1BQUkvQyxHQUFHZ0QsVUFBSCxDQUFjRCxRQUFkLENBQUosRUFBNkI7QUFDM0IvQyxPQUFHVyxXQUFILENBQWVvQyxRQUFmLEVBQXlCL0IsT0FBekIsQ0FBaUMsZ0JBQVE7QUFDdkMsVUFBTWlDLFVBQVVGLFdBQVcsR0FBWCxHQUFpQjlPLElBQWpDOztBQUNBLFVBQUkrTCxHQUFHMkMsU0FBSCxDQUFhTSxPQUFiLEVBQXNCSixXQUF0QixFQUFKLEVBQXlDO0FBQUU7QUFDekNDLDhCQUFzQkcsT0FBdEI7QUFDRCxPQUZELE1BRU87QUFBRTtBQUNQakQsV0FBRzRDLFVBQUgsQ0FBY0ssT0FBZDtBQUNEO0FBQ0YsS0FQRDtBQVFBakQsT0FBR2tELFNBQUgsQ0FBYUgsUUFBYjtBQUNEO0FBQ0Y7O0FBQUEsQzs7Ozs7O0FDcEtELCtCOzs7Ozs7QUNBQSxtQzs7Ozs7O0FDQUEseUM7Ozs7Ozs7O0FDQUEsSUFBTTNFLFVBQVUsbUJBQUFwUCxDQUFRLENBQVIsQ0FBaEI7O2VBQ3FCLG1CQUFBQSxDQUFRLENBQVIsQztJQUFiWSxRLFlBQUFBLFE7O0FBRVJWLE9BQU9DLE9BQVAsR0FBaUI7QUFFZjtBQUNBO0FBQ0E7QUFDQWdQLFdBTGUscUJBS0xnRixNQUxLLEVBS0dDLFNBTEgsRUFLY0MsUUFMZCxFQUt3QkMsU0FMeEIsRUFLbUNDLFFBTG5DLEVBSzZDO0FBQzFELFdBQU8sSUFBSXpULE9BQUo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDhCQUFZLGlCQUFPQyxPQUFQLEVBQWdCQyxNQUFoQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUNNSixTQUFTNFQsWUFBWUosU0FBWixFQUF1QkMsUUFBdkIsQ0FBVCxDQUROOztBQUFBO0FBQ1hJLHdCQURXO0FBRVhDLHlCQUZXLEdBRUMsQ0FBQ0QsUUFBRCxDQUZEOztBQUFBLHFCQUdiSCxTQUhhO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsdUJBSVExVCxTQUFTNFQsWUFBWUYsU0FBWixFQUF1QkMsUUFBdkIsQ0FBVCxDQUpSOztBQUFBO0FBSVRJLHdCQUpTO0FBS2ZELDBCQUFVRSxPQUFWLENBQWtCRCxRQUFsQjs7QUFMZTtBQVFYN1Asc0JBUlcsR0FRRjtBQUFFcVAsZ0NBQUY7QUFBVU8sc0NBQVY7QUFBcUJHLDhCQUFZLFVBQWpDO0FBQTZDQyx3Q0FBc0I7QUFBbkUsaUJBUkU7QUFTakIxRix3QkFBUTJGLElBQVIsQ0FBYSxpQkFBYixFQUFnQ2pRLE1BQWhDLEVBQXdDLFVBQUNrSCxHQUFELEVBQU1wSCxJQUFOLEVBQVlvUSxRQUFaLEVBQXlCO0FBQy9ELHNCQUFJaEosR0FBSixFQUFTO0FBQ1BGLDRCQUFRQyxLQUFSLENBQWNDLEdBQWQ7QUFDQWhMLDJCQUFPLElBQUlTLEtBQUosQ0FBVSx3QkFBVixDQUFQO0FBQ0Q7O0FBQUE7QUFDRCxzQkFBTVUsWUFBWXlDLEtBQUtxUSxpQkFBTCxDQUF1QkMsS0FBdkIsQ0FBNkJ2TyxHQUE3QixDQUNoQjtBQUFBLDJCQUFRO0FBQ053Tyw2QkFBT0MsSUFBSUMsZUFETDtBQUVOQywrQkFBU0YsSUFBSUc7QUFGUCxxQkFBUjtBQUFBLG1CQURnQixDQUFsQjtBQU1BLHNCQUFNbEksU0FBUztBQUNibkssZ0NBQWtCMEIsS0FBSzRRLE1BRFY7QUFFYjVLLHNDQUFrQmhHLEtBQUt3TCxVQUZWO0FBR2JqTztBQUhhLG1CQUFmO0FBS0FwQiwwQkFBUXNNLE1BQVI7QUFDRCxpQkFqQkQ7O0FBVGlCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BQVo7O0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFBUDtBQTRCRCxHQWxDYztBQW9DZjZCLGNBcENlLHdCQW9DRjlMLE1BcENFLEVBb0NNO0FBQ25CLFdBQU8sSUFBSXRDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENvTyxjQUFRSixHQUFSLENBQVksYUFBWixFQUEyQjtBQUFFNUw7QUFBRixPQUEzQixFQUF1QyxVQUFDNEksR0FBRCxFQUFNcEgsSUFBTixFQUFZb1EsUUFBWixFQUF5QjtBQUM5RCxZQUFJaEosR0FBSixFQUFTRixRQUFRQyxLQUFSLENBQWNDLEdBQWQ7QUFDVGpMLGdCQUFRNkQsS0FBS3dCLEdBQWI7QUFDRCxPQUhEO0FBSUQsS0FMTSxDQUFQO0FBTUQ7QUEzQ2MsQ0FBakIsQyxDQTZDRTtBQUdGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLFNBQVNvTyxXQUFULENBQXFCaUIsUUFBckIsRUFBK0JILE9BQS9CLEVBQXdDO0FBQ3RDLFNBQU8sSUFBSXhVLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdEM7QUFDQW9PLFlBQVEyRixJQUFSLENBQWEsY0FBYixFQUE2QjtBQUFFVyxrQkFBWUQ7QUFBZCxLQUE3QixFQUF1RCxVQUFDekosR0FBRCxFQUFNcEgsSUFBTixFQUFZb1EsUUFBWixFQUF5QjtBQUM5RSxVQUFJaEosR0FBSixFQUFTO0FBQ1BGLGdCQUFRQyxLQUFSLENBQWNDLEdBQWQ7QUFDQWhMLGVBQU8sSUFBSVMsS0FBSixDQUFVLHNCQUFWLENBQVA7QUFDQTtBQUNELE9BTDZFLENBTTlFO0FBQ0E7OztBQUNBLFVBQU1rVSxhQUFhL1EsS0FBS2dSLGVBQXhCO0FBQ0EsVUFBTUMsY0FBYztBQUFFQyxrQkFBVUgsVUFBWjtBQUF3Qkksa0JBQVU7QUFBRTlLLGdCQUFNcUs7QUFBUjtBQUFsQyxPQUFwQjtBQUVBbEcsY0FBUTJGLElBQVIsQ0FBYSx1QkFBYixFQUFzQ2MsV0FBdEMsRUFBbUQsVUFBQzdKLEdBQUQsRUFBTXBILElBQU4sRUFBWW9RLFFBQVosRUFBeUI7QUFDMUUsWUFBSWhKLEdBQUosRUFBUztBQUNQRixrQkFBUUMsS0FBUixDQUFjQyxHQUFkO0FBQ0FoTCxpQkFBTyxJQUFJUyxLQUFKLENBQVUsZ0RBQVYsQ0FBUDtBQUNELFNBSnlFLENBSzFFOzs7QUFDQVYsZ0JBQVE0VSxVQUFSO0FBQ0QsT0FQRDtBQVFELEtBbkJEO0FBb0JELEdBdEJNLENBQVA7QUF1QkQsQzs7Ozs7O0FDbEZELGlDOzs7Ozs7QUNBQSxzQzs7Ozs7O0FDQUEsSUFBTWxWLEtBQUssbUJBQUFULENBQVEsQ0FBUixDQUFYOztBQUNBLElBQU1nVyxTQUFTLG1CQUFBaFcsQ0FBUSxFQUFSLEVBQWtCO0FBQUVpVyxRQUFNO0FBQVIsQ0FBbEIsQ0FBZjs7QUFFQS9WLE9BQU9DLE9BQVAsR0FBaUIsVUFBQ21PLEdBQUQsRUFBUztBQUV4QjtBQUNBQSxNQUFJSyxHQUFKLENBQVEsVUFBQy9LLEdBQUQsRUFBTUMsR0FBTixFQUFXcVMsSUFBWCxFQUFvQjtBQUMxQnJTLFFBQUlzUyxNQUFKLENBQVcsNkJBQVgsRUFBMEMsR0FBMUM7QUFDQXRTLFFBQUlzUyxNQUFKLENBQVcsOEJBQVgsRUFBMkMsY0FBM0M7QUFDQXRTLFFBQUlzUyxNQUFKLENBQVcsd0JBQVgsRUFBcUMsT0FBckMsRUFIMEIsQ0FHcUI7O0FBQy9DdFMsUUFBSXNTLE1BQUosQ0FBVyw4QkFBWCxFQUNXLGdEQURYO0FBRUFEO0FBQ0QsR0FQRDtBQVNBNUgsTUFBSVUsR0FBSixDQUFRLFdBQVIsRUFBcUIsVUFBQ3BMLEdBQUQsRUFBTUMsR0FBTixFQUFjO0FBQ2pDcEQsT0FBR2tELGtCQUFILENBQXNCQyxHQUF0QixFQUEyQkMsR0FBM0I7QUFDRCxHQUZEO0FBSUF5SyxNQUFJVSxHQUFKLENBQVEsYUFBUixFQUF1QixVQUFDcEwsR0FBRCxFQUFNQyxHQUFOLEVBQWM7QUFDbkNwRCxPQUFHZ0UsU0FBSCxDQUFhYixHQUFiLEVBQWtCQyxHQUFsQjtBQUNELEdBRkQ7QUFJQXlLLE1BQUlVLEdBQUosQ0FBUSxZQUFSLEVBQXNCLFVBQUNwTCxHQUFELEVBQU1DLEdBQU4sRUFBYztBQUNsQ3BELE9BQUcwRixRQUFILENBQVl2QyxHQUFaLEVBQWlCQyxHQUFqQjtBQUNELEdBRkQsRUFwQndCLENBd0J4Qjs7QUFDQXlLLE1BQUlVLEdBQUosQ0FBUSxvQkFBUixFQUE4QixVQUFDcEwsR0FBRCxFQUFNQyxHQUFOLEVBQWM7QUFDMUNwRCxPQUFHb0UsUUFBSCxDQUFZakIsR0FBWixFQUFpQkMsR0FBakI7QUFDRCxHQUZEO0FBSUF5SyxNQUFJVSxHQUFKLENBQVEsZ0JBQVIsRUFBMEIsVUFBQ3BMLEdBQUQsRUFBTUMsR0FBTixFQUFjO0FBQ3RDcEQsT0FBR2tGLFdBQUgsQ0FBZS9CLEdBQWYsRUFBb0JDLEdBQXBCO0FBQ0QsR0FGRCxFQTdCd0IsQ0FrQ3hCOztBQUVBeUssTUFBSXlHLElBQUosQ0FBUyxXQUFULEVBQXNCaUIsT0FBT0ksTUFBUCxDQUFjLFNBQWQsQ0FBdEIsRUFBZ0QsVUFBQ3hTLEdBQUQsRUFBTUMsR0FBTixFQUFjO0FBQzVEcEQsT0FBR3NFLE9BQUgsQ0FBV25CLEdBQVgsRUFBZ0JDLEdBQWhCO0FBQ0QsR0FGRDtBQUlBeUssTUFBSXlHLElBQUosQ0FBUyxjQUFULEVBQXlCLFVBQUNuUixHQUFELEVBQU1DLEdBQU4sRUFBYztBQUNyQ3BELE9BQUcrRCxXQUFILENBQWVaLEdBQWYsRUFBb0JDLEdBQXBCO0FBQ0QsR0FGRDtBQUlBeUssTUFBSVUsR0FBSixDQUFRLFlBQVIsRUFBc0IsVUFBQ3BMLEdBQUQsRUFBTUMsR0FBTixFQUFjO0FBQ2xDcEQsT0FBR2dGLFdBQUgsQ0FBZTdCLEdBQWYsRUFBb0JDLEdBQXBCO0FBQ0QsR0FGRDtBQUlELENBaERELEMsQ0FnREUsaUI7Ozs7OztBQ25ERixtQyIsImZpbGUiOiJzZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA1KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBkOWY0N2UyZmJhMTNlZDI3ZjYzNiIsImNvbnN0IHR3aXR0ZXJVdGlscyA9IHJlcXVpcmUoJy4vdHdpdHRlclV0aWxzJyk7XG5jb25zdCB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC4uLnR3aXR0ZXJVdGlscyxcbiAgLi4udXRpbHNcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlscy9pbmRleC5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJwYXRoXCJcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgTW9uZ29DbGllbnQgPSByZXF1aXJlKCdtb25nb2RiJykuTW9uZ29DbGllbnQ7XG5jb25zdCB1cmwgPSBwcm9jZXNzLmVudi5NT05HT0RCX1VSSTtcbmNvbnN0IERCID0gcHJvY2Vzcy5lbnYuTU9OR09fREI7XG5jb25zdCB7IHByb2Nlc3NVcGxvYWQgfSA9IHJlcXVpcmUoJy4vcHJvY2Vzc0Fua2lKc29uJyk7XG5jb25zdCB7IHRyeUNhdGNoIH0gPSByZXF1aXJlKCdVdGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0UmFuZG9tUXVlc3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IG1vbmdvID0gYXdhaXQgdHJ5Q2F0Y2goTW9uZ29DbGllbnQuY29ubmVjdCh1cmwpKTtcbiAgICAgIGNvbnN0IG5ld0NhcmRzID0gbW9uZ28uZGIoREIpLmNvbGxlY3Rpb24oJ25ld0NhcmRzJyk7XG4gICAgICBjb25zdCBvbGRDYXJkcyA9IG1vbmdvLmRiKERCKS5jb2xsZWN0aW9uKCdvbGRDYXJkcycpO1xuICAgICAgY29uc3QgcmFuZG9tQ2FyZCA9IGF3YWl0IHRyeUNhdGNoKG5ld0NhcmRzLmZpbmRPbmUoKSk7XG4gICAgICBpZiAocmFuZG9tQ2FyZCA9PSBudWxsKSB7XG4gICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJFbXB0eSBkZWNrLiBQbGVhc2UgQWRkIE1vcmUgQ2FyZHMgdG8gREIuXCIpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXdhaXQgdHJ5Q2F0Y2gob2xkQ2FyZHMuaW5zZXJ0KHJhbmRvbUNhcmQpKTtcbiAgICAgIGF3YWl0IHRyeUNhdGNoKG5ld0NhcmRzLnJlbW92ZShyYW5kb21DYXJkKSk7XG4gICAgICByZXNvbHZlKHJhbmRvbUNhcmQpO1xuICAgICAgbW9uZ28uY2xvc2UoKTtcbiAgICB9KTtcbiAgfSxcblxuICByZXZlYWxBbnN3ZXJXb3JrZmxvdyhjYXJkSWQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgbW9uZ28gPSBhd2FpdCB0cnlDYXRjaChNb25nb0NsaWVudC5jb25uZWN0KHVybCkpO1xuICAgICAgY29uc3Qgb2xkQ2FyZHMgPSBtb25nby5kYihEQikuY29sbGVjdGlvbignb2xkQ2FyZHMnKTtcbiAgICAgIGNvbnN0IGFuc3dlckNhcmQgPSBhd2FpdCB0cnlDYXRjaChvbGRDYXJkcy5maW5kT25lKHsgY2FyZElkIH0pKTtcbiAgICAgIHJlc29sdmUoYW5zd2VyQ2FyZCk7XG4gICAgICBhd2FpdCB0cnlDYXRjaChyZW1vdmVMaXZlUXVlc3Rpb24obW9uZ28sIGNhcmRJZCkpO1xuICAgICAgbW9uZ28uY2xvc2UoKTtcbiAgICB9KTtcbiAgfSxcblxuICBhc3luYyBhZGRMaXZlUXVlc3Rpb24ocmVjb3JkLCBtZWRpYVVybHMpIHtcbiAgICBjb25zdCB7IGNhcmRJZCB9ID0gcmVjb3JkO1xuICAgIGNvbnN0IG1vbmdvID0gYXdhaXQgdHJ5Q2F0Y2goTW9uZ29DbGllbnQuY29ubmVjdCh1cmwpKTtcbiAgICBjb25zdCBsaXZlUXVlc3Rpb25zID0gbW9uZ28uZGIoREIpLmNvbGxlY3Rpb24oJ2xpdmVRdWVzdGlvbnMnKTtcbiAgICBjb25zdCBvbGRDYXJkcyA9IG1vbmdvLmRiKERCKS5jb2xsZWN0aW9uKCdvbGRDYXJkcycpO1xuICAgIGF3YWl0IHRyeUNhdGNoKGxpdmVRdWVzdGlvbnMuaW5zZXJ0KHtcbiAgICAgIC4uLnJlY29yZCxcbiAgICAgIG1lZGlhVXJsc1xuICAgIH0pKTtcbiAgICBhd2FpdCB0cnlDYXRjaChcbiAgICAgIG9sZENhcmRzLnVwZGF0ZU9uZShcbiAgICAgICAge2NhcmRJZH0sXG4gICAgICAgIHtcbiAgICAgICAgICAkc2V0OiB7IG1lZGlhVXJscyB9LFxuICAgICAgICAgICR1bnNldDoge1xuICAgICAgICAgICAgcXVlc3Rpb25JbWc6ICcnLFxuICAgICAgICAgICAgcXVlc3Rpb25BbHRUZXh0OiAnJyxcbiAgICAgICAgICAgIHByZXZMaW5lSW1nOiAnJyxcbiAgICAgICAgICAgIHByZXZMaW5lQWx0VGV4dDogJydcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApXG4gICAgbW9uZ28uY2xvc2UoKTtcbiAgfSxcblxuICBhc3luYyBhZGRNZWRpYVVybHNUb0NhcmQoY2FyZElkLCBbbWVkaWFVcmxdKSB7XG4gICAgY29uc3QgbW9uZ28gPSBhd2FpdCB0cnlDYXRjaChNb25nb0NsaWVudC5jb25uZWN0KHVybCkpO1xuICAgIGNvbnN0IG9sZENhcmRzID0gbW9uZ28uZGIoREIpLmNvbGxlY3Rpb24oJ29sZENhcmRzJyk7XG4gICAgYXdhaXQgdHJ5Q2F0Y2goXG4gICAgICBvbGRDYXJkcy51cGRhdGVPbmUoXG4gICAgICAgIHsgY2FyZElkIH0sIHtcbiAgICAgICAgICAkcHVzaDogeyBtZWRpYVVybHM6IG1lZGlhVXJsIH0sXG4gICAgICAgICAgJHVuc2V0OiB7IGFuc3dlckltZzogJycsIGFuc3dlckFsdFRleHQ6ICcnIH1cbiAgICAgICAgfVxuICAgICAgKVxuICAgIClcbiAgICBtb25nby5jbG9zZSgpO1xuICB9LFxuXG4gIGFzeW5jIHVwZGF0ZUxpdmVRdWVzdGlvbihxdWVzdGlvbklkLCB1c2VyUG9pbnRzKSB7XG4gICAgY29uc3QgbW9uZ28gPSBhd2FpdCB0cnlDYXRjaChNb25nb0NsaWVudC5jb25uZWN0KHVybCkpO1xuICAgIGNvbnN0IGxpdmVRdWVzdGlvbnMgPSBtb25nby5kYihEQikuY29sbGVjdGlvbignbGl2ZVF1ZXN0aW9ucycpO1xuICAgIGNvbnN0IHsgdXNlcklkIH0gPSB1c2VyUG9pbnRzO1xuXG4gICAgYXdhaXQgdHJ5Q2F0Y2goXG4gICAgICBsaXZlUXVlc3Rpb25zLnVwZGF0ZShcbiAgICAgICAgeyBxdWVzdGlvbklkIH0sIHtcbiAgICAgICAgICAkcHVzaDoge1xuICAgICAgICAgICAgYWxyZWFkeUFuc3dlcmVkOiB1c2VySWQsXG4gICAgICAgICAgICBjYWNoZWRQb2ludHM6IHVzZXJQb2ludHNcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuICAgIG1vbmdvLmNsb3NlKCk7XG4gIH0sXG5cbiAgZ2V0TGl2ZVF1ZXN0aW9ucygpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgbW9uZ28gPSBhd2FpdCB0cnlDYXRjaChNb25nb0NsaWVudC5jb25uZWN0KHVybCkpO1xuICAgICAgY29uc3QgY29sbGVjdGlvbiA9IG1vbmdvLmRiKERCKS5jb2xsZWN0aW9uKCdsaXZlUXVlc3Rpb25zJyk7XG4gICAgICBjb25zdCBsaXZlUXVlc3Rpb25zID0gYXdhaXQgdHJ5Q2F0Y2goY29sbGVjdGlvbi5maW5kKCkudG9BcnJheSgpKTtcbiAgICAgIHJlc29sdmUobGl2ZVF1ZXN0aW9ucyk7XG4gICAgICBtb25nby5jbG9zZSgpO1xuICAgIH0pO1xuICB9LFxuXG4gIGFzeW5jIHNlcnZlTGl2ZVF1ZXN0aW9ucyhyZXEsIHJlcykge1xuICAgIGNvbnN0IG1vbmdvID0gYXdhaXQgdHJ5Q2F0Y2goTW9uZ29DbGllbnQuY29ubmVjdCh1cmwpKTtcbiAgICBjb25zdCBjb2xsZWN0aW9uID0gbW9uZ28uZGIoREIpLmNvbGxlY3Rpb24oJ2xpdmVRdWVzdGlvbnMnKTtcbiAgICBjb25zdCBsaXZlUXVlc3Rpb25zID0gYXdhaXQgdHJ5Q2F0Y2goY29sbGVjdGlvbi5maW5kKCkudG9BcnJheSgpKTtcbiAgICByZXMuanNvbihsaXZlUXVlc3Rpb25zKTtcbiAgICBtb25nby5jbG9zZSgpO1xuICB9LFxuXG4gIGFzeW5jIGFkZE9yVXBkYXRlVXNlcihuZXdVc2VyKSB7XG4gICAgY29uc3QgbW9uZ28gPSBhd2FpdCB0cnlDYXRjaChNb25nb0NsaWVudC5jb25uZWN0KHVybCkpO1xuICAgIGNvbnN0IHNjb3JlYm9hcmQgPSBtb25nby5kYihEQikuY29sbGVjdGlvbignc2NvcmVib2FyZCcpO1xuICAgIGNvbnN0IHsgdXNlcklkIH0gPSBuZXdVc2VyO1xuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB0cnlDYXRjaChzY29yZWJvYXJkLmZpbmRPbmUoe3VzZXJJZH0pKTtcbiAgICBpZiAodXNlcikge1xuICAgICAgY29uc3Qge1xuICAgICAgICBuYW1lLFxuICAgICAgICBoYW5kbGUsXG4gICAgICAgIGF2YXRhcixcbiAgICAgICAgcHJvZmlsZUJhbm5lcixcbiAgICAgICAgZm9sbG93aW5nXG4gICAgICB9ID0gbmV3VXNlcjtcblxuICAgICAgYXdhaXQgdHJ5Q2F0Y2goXG4gICAgICAgIHNjb3JlYm9hcmQudXBkYXRlT25lKHsgdXNlcklkIH0sIHtcbiAgICAgICAgICAgICRzZXQ6IHsgbmFtZSB9LFxuICAgICAgICAgICAgJHNldDogeyBoYW5kbGUgfSxcbiAgICAgICAgICAgICRzZXQ6IHsgYXZhdGFyIH0sXG4gICAgICAgICAgICAkc2V0OiB7IHByb2ZpbGVCYW5uZXIgfSxcbiAgICAgICAgICAgICRzZXQ6IHsgZm9sbG93aW5nIH1cbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF3YWl0IHRyeUNhdGNoKHNjb3JlYm9hcmQuaW5zZXJ0KG5ld1VzZXIpKTtcbiAgICB9XG4gICAgbW9uZ28uY2xvc2UoKTtcbiAgfSxcblxuICBhZGp1c3RTY29yZShyZXEsIHJlcykge1xuICAgIC8vIFRPRE8gYWRqdXN0IGEgc2NvcmUgbWFudWFsbHlcbiAgfSxcblxuICBhc3luYyBnZXRTY29yZXMocmVxLCByZXMpIHtcbiAgICBjb25zdCBtb25nbyA9IGF3YWl0IHRyeUNhdGNoKE1vbmdvQ2xpZW50LmNvbm5lY3QodXJsKSk7XG4gICAgY29uc3QgY29sbGVjdGlvbiA9IG1vbmdvLmRiKERCKS5jb2xsZWN0aW9uKCdzY29yZWJvYXJkJyk7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHRyeUNhdGNoKFxuICAgICAgY29sbGVjdGlvbi5maW5kKClcbiAgICAgICAgICAgICAgICAuc29ydCgnd2Vla2x5U2NvcmUnLCAtMSlcbiAgICAgICAgICAgICAgICAucHJvamVjdCh7J19pZCc6IDB9KVxuICAgICAgICAgICAgICAgIC50b0FycmF5KClcbiAgICApO1xuICAgIHJlcy5qc29uKGRhdGEpO1xuICAgIG1vbmdvLmNsb3NlKCk7XG4gIH0sXG5cbiAgLy8gVE9ETyAtIGRlbGV0ZSB0aGlzIG1ldGhvZCBpZiBub3QgbmVlZGVkXG4gIGFzeW5jIGdldFNjb3JlKHJlcSwgcmVzKSB7XG4gICAgY29uc3QgeyBoYW5kbGUgfSA9IHJlcS5wYXJhbXM7XG4gICAgY29uc3QgbW9uZ28gPSBhd2FpdCB0cnlDYXRjaChNb25nb0NsaWVudC5jb25uZWN0KHVybCkpO1xuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSBtb25nby5kYihEQikuY29sbGVjdGlvbignc2NvcmVib2FyZCcpO1xuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB0cnlDYXRjaChjb2xsZWN0aW9uLmZpbmRPbmUoe2hhbmRsZX0pKTtcbiAgICByZXMuanNvbih1c2VyKTtcbiAgICBtb25nby5jbG9zZSgpO1xuICB9LFxuXG4gIGFzeW5jIGFkZERlY2socmVxLCByZXMpIHtcbiAgICBjb25zdCBmaWxlUGF0aCA9IHJlcS5maWxlLnBhdGg7XG4gICAgY29uc3QgbmV3Q2FyZHMgPSBhd2FpdCB0cnlDYXRjaChwcm9jZXNzVXBsb2FkKGZpbGVQYXRoKSk7XG4gICAgY29uc3QgbW9uZ28gPSBhd2FpdCB0cnlDYXRjaChNb25nb0NsaWVudC5jb25uZWN0KHVybCkpO1xuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSBtb25nby5kYihEQikuY29sbGVjdGlvbignbmV3Q2FyZHMnKTtcbiAgICBjb25zdCBiYXRjaCA9IGNvbGxlY3Rpb24uaW5pdGlhbGl6ZVVub3JkZXJlZEJ1bGtPcCgpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdDYXJkcy5sZW5ndGg7ICsraSkge1xuICAgICAgYmF0Y2guaW5zZXJ0KG5ld0NhcmRzW2ldKTtcbiAgICB9XG5cbiAgICBhd2FpdCB0cnlDYXRjaChiYXRjaC5leGVjdXRlKCkpO1xuICAgIG1vbmdvLmNsb3NlKCk7XG5cbiAgICByZXMucmVkaXJlY3QoJy8nKTtcbiAgfSxcblxuICBnZXROZXdDYXJkcyhyZXEsIHJlcykge1xuICAgIGdldENvbGxlY3Rpb24ocmVxLCByZXMsICduZXdDYXJkcycpO1xuICB9LFxuXG4gIGdldE9sZENhcmRzKHJlcSwgcmVzKSB7XG4gICAgZ2V0Q29sbGVjdGlvbihyZXEsIHJlcywgJ29sZENhcmRzJyk7XG4gIH0sXG5cbiAgYXN5bmMgd2Vla2x5TW9udGhseVJlc2V0KHJlc2V0V2Vla2x5U2NvcmUsIHJlc2V0TW9udGhseVNjb3JlKSB7XG4gICAgY29uc3QgbW9uZ28gPSBhd2FpdCB0cnlDYXRjaChNb25nb0NsaWVudC5jb25uZWN0KHVybCkpO1xuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSBtb25nby5kYihEQikuY29sbGVjdGlvbignc2NvcmVib2FyZCcpO1xuXG4gICAgbGV0IHJlc2V0O1xuICAgIGlmIChyZXNldFdlZWtseVNjb3JlICYmIHJlc2V0TW9udGhseVNjb3JlKVxuICAgICAgcmVzZXQgPSB7XG4gICAgICAgICRzZXQ6IHsgd2Vla2x5U2NvcmU6ICAwIH0sXG4gICAgICAgICRzZXQ6IHsgbW9udGhseVNjb3JlOiAwIH1cbiAgICAgIH07XG4gICAgZWxzZSBpZiAocmVzZXRXZWVrbHlTY29yZSlcbiAgICAgIHJlc2V0ID0geyAkc2V0OiB7IHdlZWtseVNjb3JlOiAwIH0gfTtcbiAgICBlbHNlXG4gICAgICByZXNldCA9IHsgJHNldDogeyBtb250aGx5U2NvcmU6IDAgfSB9O1xuXG4gICAgY29sbGVjdGlvbi51cGRhdGUoXG4gICAgICB7fSwgcmVzZXQsIHsgbXVsdGk6IHRydWUgfVxuICAgICk7XG5cbiAgICBtb25nby5jbG9zZSgpO1xuICB9LFxuXG4gIGFzeW5jIGdldENhcmRzKHJlcSwgcmVzKSB7XG4gICAgY29uc3QgeyBpZHMgfSA9IHJlcS5xdWVyeTtcbiAgICBjb25zdCBtb25nbyA9IGF3YWl0IHRyeUNhdGNoKE1vbmdvQ2xpZW50LmNvbm5lY3QodXJsKSk7XG4gICAgY29uc3QgY29sbGVjdGlvbiA9IG1vbmdvLmRiKERCKS5jb2xsZWN0aW9uKCdvbGRDYXJkcycpO1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0cnlDYXRjaChcbiAgICAgIGNvbGxlY3Rpb24uZmluZCh7Y2FyZElkOiB7JGluOiBpZHN9fSlcbiAgICAgICAgICAgICAgICAucHJvamVjdCh7X2lkOiAwLCBtZWRpYVVybHM6IDEsIHF1ZXN0aW9uVGV4dDogMSwgYW5zd2VyczogMX0pXG4gICAgICAgICAgICAgICAgLnRvQXJyYXkoKVxuICAgICk7XG5cbiAgICBjb25zdCBjbGVhbkRhdGEgPSBkYXRhLm1hcChjYXJkID0+IHtcbiAgICAgIGNhcmQucXVlc3Rpb25UZXh0ID0gY2FyZC5xdWVzdGlvblRleHQuc3BsaXQoJ1xcbicpWzBdO1xuICAgICAgY29uc3QgcyA9IGNhcmQuYW5zd2Vycy5sZW5ndGggPiAxID8gJ3MnIDogJyc7XG4gICAgICBjYXJkLmFuc3dlcnMgPSBgQW5zd2VyJHtzfTogJHtjYXJkLmFuc3dlcnMuam9pbignLCAnKX1gO1xuICAgICAgY2FyZC5tZWRpYVVybCA9IChjYXJkLm1lZGlhVXJscy5sZW5ndGggPT09IDMpXG4gICAgICAgID8gY2FyZC5tZWRpYVVybHNbMV1cbiAgICAgICAgOiBjYXJkLm1lZGlhVXJsc1swXTtcblxuICAgICAgZGVsZXRlIGNhcmQubWVkaWFVcmxzO1xuICAgICAgcmV0dXJuIGNhcmQ7XG4gICAgfSk7XG5cbiAgICByZXMuanNvbihjbGVhbkRhdGEpO1xuICAgIG1vbmdvLmNsb3NlKCk7XG4gIH1cblxufSAvLyBtb2R1bGUuZXhwb3J0c1xuXG5cbmFzeW5jIGZ1bmN0aW9uIGdldENvbGxlY3Rpb24ocmVxLCByZXMsIGNvbGxlY3Rpb25OYW1lKSB7XG4gIGNvbnN0IG1vbmdvID0gYXdhaXQgdHJ5Q2F0Y2goTW9uZ29DbGllbnQuY29ubmVjdCh1cmwpKTtcbiAgY29uc3QgY29sbGVjdGlvbiA9IG1vbmdvLmRiKERCKS5jb2xsZWN0aW9uKGNvbGxlY3Rpb25OYW1lKTtcbiAgY29uc3QgZGF0YSA9IGF3YWl0IHRyeUNhdGNoKFxuICAgIGNvbGxlY3Rpb24uZmluZCgpXG4gICAgICAgICAgICAgIC5wcm9qZWN0KHtfaWQ6IDB9KVxuICAgICAgICAgICAgICAudG9BcnJheSgpXG4gICk7XG4gIHJlcy5qc29uKGRhdGEpO1xuICBtb25nby5jbG9zZSgpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVMaXZlUXVlc3Rpb24obW9uZ28sIGNhcmRJZCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSBtb25nby5kYihEQikuY29sbGVjdGlvbignbGl2ZVF1ZXN0aW9ucycpO1xuICAgIGNvbnN0IGN1cnJlbnRRdWVzdGlvbiA9IGF3YWl0IHRyeUNhdGNoKGNvbGxlY3Rpb24uZmluZE9uZSh7Y2FyZElkfSkpO1xuICAgIGF3YWl0IHRyeUNhdGNoKGNvbGxlY3Rpb24ucmVtb3ZlKGN1cnJlbnRRdWVzdGlvbikpO1xuICAgIGF3YWl0IHRyeUNhdGNoKGFkZFBvaW50c1RvU2NvcmVib2FyZChtb25nbywgY3VycmVudFF1ZXN0aW9uKSk7XG4gICAgcmVzb2x2ZSgpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkUG9pbnRzVG9TY29yZWJvYXJkKG1vbmdvLCB7IGNhY2hlZFBvaW50cywgY2FyZElkIH0pIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBzY29yZWJvYXJkID0gbW9uZ28uZGIoREIpLmNvbGxlY3Rpb24oJ3Njb3JlYm9hcmQnKTtcbiAgICBjb25zdCBvbGRDYXJkcyA9IG1vbmdvLmRiKERCKS5jb2xsZWN0aW9uKCdvbGRDYXJkcycpO1xuICAgIGNvbnN0IGFuc3dlclBvc3RlZEF0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgb2xkQ2FyZHMudXBkYXRlT25lKHtjYXJkSWR9LCB7JHNldDoge2Fuc3dlclBvc3RlZEF0fX0pO1xuXG4gICAgY29uc3Qgb3BzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYWNoZWRQb2ludHMubGVuZ3RoOyArK2kpIHtcbiAgICAgIGNvbnN0IHsgdXNlcklkLCBwb2ludHMgfSA9IGNhY2hlZFBvaW50c1tpXTtcbiAgICAgIGNvbnN0IG9wID0ge1xuICAgICAgICB1cGRhdGVPbmUgOiB7XG4gICAgICAgICAgXCJmaWx0ZXJcIiA6IHsgdXNlcklkIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIiA6IHtcbiAgICAgICAgICAgICRpbmM6IHtcbiAgICAgICAgICAgICAgc2NvcmU6IHBvaW50cyxcbiAgICAgICAgICAgICAgd2Vla2x5U2NvcmU6IHBvaW50cyxcbiAgICAgICAgICAgICAgbW9udGhseVNjb3JlOiBwb2ludHMsXG4gICAgICAgICAgICAgIGFuc3dlckF0dGVtcHRzOiAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgaWYgKHBvaW50cyA+IDApIHtcbiAgICAgICAgb3AudXBkYXRlT25lLnVwZGF0ZS4kcHVzaCA9IHtcbiAgICAgICAgICBjb3JyZWN0QW5zd2Vyczoge1xuICAgICAgICAgICAgYW5zd2VyUG9zdGVkQXQsXG4gICAgICAgICAgICBjYXJkSWQsXG4gICAgICAgICAgICBwb2ludHNcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgb3BzLnB1c2gob3ApO1xuICAgIH1cbiAgICBpZiAob3BzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmVzb2x2ZSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGF3YWl0IHRyeUNhdGNoKHNjb3JlYm9hcmQuYnVsa1dyaXRlKG9wcykpO1xuICAgIHJlc29sdmUoKTtcbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZGJPcHMuanMiLCJjb25zdCB0d2l0ID0gcmVxdWlyZSgndHdpdCcpO1xuY29uc3Qge1xuICBUV0lUVEVSX0FQSV9LRVksXG4gIFRXSVRURVJfQVBJX1NFQ1JFVCxcbiAgVFdJVFRFUl9UT0tFTixcbiAgVFdJVFRFUl9UT0tFTl9TRUNSRVQsXG4gIFRXSVRURVJfQUNDT1VOVFxufSA9IHByb2Nlc3MuZW52O1xuXG4vLyBjb25zdCBhcHBDb25maWcgPSB7XG4vLyAgIGNvbnN1bWVyX2tleTogVFdJVFRFUl9BUElfS0VZLFxuLy8gICBjb25zdW1lcl9zZWNyZXQ6IFRXSVRURVJfQVBJX1NFQ1JFVCxcbi8vICAgYXBwX29ubHlfYXV0aDogdHJ1ZVxuLy8gfVxuXG5jb25zdCB1c2VyQ29uZmlnID0ge1xuICBjb25zdW1lcl9rZXk6IFRXSVRURVJfQVBJX0tFWSxcbiAgY29uc3VtZXJfc2VjcmV0OiBUV0lUVEVSX0FQSV9TRUNSRVQsXG4gIGFjY2Vzc190b2tlbjogVFdJVFRFUl9UT0tFTixcbiAgYWNjZXNzX3Rva2VuX3NlY3JldDogVFdJVFRFUl9UT0tFTl9TRUNSRVRcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IHR3aXQodXNlckNvbmZpZyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdHdpdHRlckNvbmZpZy5qcyIsImNvbnN0IHVybGVuY29kZSA9IHJlcXVpcmUoJ3VybGVuY29kZScpO1xuY29uc3QgV0VCTE9PS1VQX1VSTCA9ICdodHRwczovL2VqamUud2VibGlvLmpwL2NvbnRlbnQvJztcbmNvbnN0IHsgVFdJVFRFUl9BQ0NPVU5UIH0gPSBwcm9jZXNzLmVudjtcblxuY29uc3QgSE9VUlMgPSAzNjAwMDAwO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICBIT1VSUyxcblxuICBmb3JtYXRRdWVzdGlvbkFsdFRleHQoZXhwcmVzc2lvbikge1xuICAgIGNvbnN0IGhpbnQgPSBmb3JtYXRIaW50KGV4cHJlc3Npb24pO1xuICAgIGNvbnN0IFttaW4sIG1heF0gPSBtaW5NYXhDaGFycyhoaW50KTtcbiAgICBjb25zdCBtaW5NYXggPSBtaW4gPT09IG1heCA/IG1pbiA6IGAke21pbn0gdG8gJHttYXh9YDtcbiAgICBjb25zdCBzID0gbWF4ID4gMSA/ICdzJyA6ICcnO1xuICAgIGNvbnN0IHNjcmVlblJlYWRlckhpbnQgPSBgKCR7bWluTWF4fSBjaGFyYWN0ZXIke3N9KWA7XG4gICAgcmV0dXJuIGV4cHJlc3Npb24ucmVwbGFjZSgvXFx7XFx7Lis/XFx9XFx9L2csIHNjcmVlblJlYWRlckhpbnQpO1xuICB9LFxuXG4gIGZvcm1hdFF1ZXN0aW9uVGV4dChleHByZXNzaW9uLCBlbmdNZWFuaW5nLCBub3RlcywgY2FyZElEKSB7XG4gICAgY29uc3QgaGludCA9IGZvcm1hdEhpbnQoZXhwcmVzc2lvbik7XG4gICAgY29uc3QgW21pbiwgbWF4XSA9IG1pbk1heENoYXJzKGhpbnQpO1xuICAgIGNvbnN0IG1pbk1heCA9IG1pbiA9PT0gbWF4ID8gbWluIDogYCR7bWlufS0ke21heH1gO1xuICAgIGxldCB0d2VldFRleHQgPSBgV2hhdCAke21pbk1heH0gY2hhcmFjdGVyIGFuc3dlciBtZWFucyBcIiR7ZW5nTWVhbmluZ31cIj9gO1xuICAgIGlmIChuZWVkc0hpbnQoaGludCkpXG4gICAgICB0d2VldFRleHQgKz0gYFxcbkhpbnQ6ICR7aGludH1gO1xuXG4gICAgaWYgKG5vdGVzKSB0d2VldFRleHQgKz0gYFxcbk5vdGVzOiAke25vdGVzfWA7XG5cbiAgICB0d2VldFRleHQgKz0gYFxcblFJRCR7Y2FyZElEfWA7XG4gICAgcmV0dXJuIHR3ZWV0VGV4dDtcbiAgfSxcblxuICBmb3JtYXRBbnN3ZXJBbHRUZXh0KGV4cHJlc3Npb24pIHtcbiAgICByZXR1cm4gZXhwcmVzc2lvbi5yZXBsYWNlKC9cXHtcXHsuKj9cXDpcXDooLis/KVxcOlxcOi4qP1xcfVxcfS9nLCAnJDEnKTtcbiAgfSxcblxuICBmb3JtYXRBbnN3ZXJUZXh0KGFuc3dlcnMsIGVuZ01lYW5pbmcsIHdlYkxvb2t1cCwgY2FyZElkKSB7XG4gICAgY29uc3QgcyA9IGFuc3dlcnMubGVuZ3RoID4gMSA/ICdzJyA6ICcnO1xuICAgIGxldCBhbnN3ZXJUZXh0ID0gYEFuc3dlciR7c306ICR7YW5zd2Vycy5qb2luKCcsICcpfWA7XG4gICAgYW5zd2VyVGV4dCArPSBgXFxuRW5nbGlzaCBNZWFuaW5nOiBcIiR7ZW5nTWVhbmluZ31cImA7XG4gICAgYW5zd2VyVGV4dCArPSAnXFxuRGVmaW5pdGlvbjogJyArIFdFQkxPT0tVUF9VUkwgKyB1cmxlbmNvZGUod2ViTG9va3VwKTtcbiAgICBhbnN3ZXJUZXh0ICs9IGBcXG5RSUQke2NhcmRJZH1gO1xuICAgIHJldHVybiBhbnN3ZXJUZXh0O1xuICB9LFxuXG4gIGFkZFF1ZXN0aW9uTGluayhhbnN3ZXJUZXh0LCBxdWVzdGlvbklkKSB7XG4gICAgY29uc3QgcXVlc3Rpb25MaW5rID0gYFF1ZXN0aW9uOiB0d2l0dGVyLmNvbS8ke1RXSVRURVJfQUNDT1VOVH0vc3RhdHVzLyR7cXVlc3Rpb25JZH1gO1xuICAgIGNvbnN0IGxpbmVzID0gYW5zd2VyVGV4dC5zcGxpdCgnXFxuJyk7XG4gICAgbGluZXMuc3BsaWNlKC0xLCAwLCBxdWVzdGlvbkxpbmspO1xuICAgIHJldHVybiBsaW5lcy5qb2luKCdcXG4nKTtcbiAgfSxcblxuICBnZXRBbnN3ZXJzKGV4cHJlc3Npb24sIGFsdEFuc3dlcnMpIHtcbiAgICBjb25zdCBhY2NlcHRlZEFuc3dlciA9IGV4cHJlc3Npb24ubWF0Y2goL1xcOlxcOiguKz8pXFw6XFw6LylbMV07XG4gICAgbGV0IG90aGVyQW5zd2VycyA9IFtdO1xuICAgIGlmIChhbHRBbnN3ZXJzICYmIGFsdEFuc3dlcnMubGVuZ3RoID4gMClcbiAgICAgIG90aGVyQW5zd2VycyA9IGFsdEFuc3dlcnMuc3BsaXQoJywnKTtcblxuICAgIHJldHVybiBbYWNjZXB0ZWRBbnN3ZXJdLmNvbmNhdChvdGhlckFuc3dlcnMpO1xuICB9LFxuXG4gIGNhbGN1bGF0ZVNjb3JlKGFuc3dlclBvc3RlZEF0LCB7cXVlc3Rpb25Qb3N0ZWRBdCwgYWxyZWFkeUFuc3dlcmVkfSkge1xuICAgIGNvbnN0IHRpbWVUb0Fuc3dlciA9IE1hdGguZmxvb3IoXG4gICAgICAobmV3IERhdGUoYW5zd2VyUG9zdGVkQXQpIC0gbmV3IERhdGUocXVlc3Rpb25Qb3N0ZWRBdCkpIC8gSE9VUlNcbiAgICApO1xuICAgIGNvbnN0IHNjb3JlID0gMjQgLSB0aW1lVG9BbnN3ZXI7XG5cbiAgICByZXR1cm4gTWF0aC5tYXgoc2NvcmUsIDApO1xuICB9LFxuXG4gIGV4dHJhY3RBbnN3ZXIodGV4dCkge1xuICAgIHJldHVybiB0ZXh0LnRyaW0oKS5zbGljZShUV0lUVEVSX0FDQ09VTlQubGVuZ3RoICsgMik7XG4gIH0sXG5cbiAgZ2V0VGltZVVudGlsKGhvdXIpIHtcbiAgICAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80NDU1MjgyL2NhbGwtYS1qYXZhc2NyaXB0LWZ1bmN0aW9uLWF0LWEtc3BlY2lmaWMtdGltZS1vZi1kYXlcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IG1pbGxpc1VudGlsVGltZSA9IG5ldyBEYXRlKFxuICAgICAgbm93LmdldEZ1bGxZZWFyKCksXG4gICAgICBub3cuZ2V0TW9udGgoKSxcbiAgICAgIG5vdy5nZXREYXRlKCksXG4gICAgICBob3VyLCAwLCAwLCAwKSAtIG5vdztcblxuICAgIGlmIChtaWxsaXNVbnRpbFRpbWUgPCAwKSAvLyBhbHJlYWR5IHBhc3NlZCBmb3IgdG9kYXksIHdhaXQgdW50aWwgdG9tb3Jyb3dcbiAgICAgIG1pbGxpc1VudGlsVGltZSArPSAyNCpIT1VSUztcblxuICAgIHJldHVybiBtaWxsaXNVbnRpbFRpbWU7XG4gIH0sXG5cbiAgdHJ5Q2F0Y2gocHJvbWlzZSkge1xuICAgcmV0dXJuIHByb21pc2VcbiAgICAgLnRoZW4oZGF0YSA9PiBkYXRhKVxuICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvcjonLGVycik7XG4gICAgICAgcmV0dXJuIHt9O1xuICAgICB9KTtcbiAgfSxcblxuICBjb250YWlucyhpdGVtLCBsaXN0KSB7XG4gICAgcmV0dXJuIHZhbGlkKGxpc3QuaW5kZXhPZihpdGVtKSk7XG4gIH1cblxufSAvLyBtb2R1bGUuZXhwb3J0c1xuXG5cbmZ1bmN0aW9uIHZhbGlkKGluZGV4KSB7XG4gIHJldHVybiBpbmRleCAhPT0gLTE7XG59XG5cbmZ1bmN0aW9uIG5lZWRzSGludChoaW50KSB7XG4gIHJldHVybiBoaW50LnJlcGxhY2UoL1xcW1xcXS9nLCAnJykudHJpbSgpLmxlbmd0aCAhPT0gMDtcbn1cblxuZnVuY3Rpb24gbWF4Q2hhcnMoaGludCkge1xuICBjb25zdCBtaXNzaW5nQ2hhclJlZ2V4ID0gL1xcWy4qP1xcXS9nO1xuICBjb25zdCBtaXNzaW5nQ2hhcnMgPSAoaGludC5tYXRjaChtaXNzaW5nQ2hhclJlZ2V4KSB8fCBbXSkubGVuZ3RoXG4gIGNvbnN0IGdpbW1lQ2hhcnMgPSBoaW50LnJlcGxhY2UobWlzc2luZ0NoYXJSZWdleCwgJycpLnJlcGxhY2UoL1tcXHMrXFwoXFwpXS9nLCAnJykubGVuZ3RoO1xuXG4gIHJldHVybiBtaXNzaW5nQ2hhcnMgKyBnaW1tZUNoYXJzO1xufVxuXG5mdW5jdGlvbiBtaW5DaGFycyhoaW50KSB7XG4gIGNvbnN0IG9wdGlvbmFsQ2hhcnMgPSAoaGludC5tYXRjaCgvXFw/L2cpIHx8IFtdKS5sZW5ndGhcbiAgcmV0dXJuIG1heENoYXJzKGhpbnQpIC0gb3B0aW9uYWxDaGFycztcbn1cblxuZnVuY3Rpb24gbWluTWF4Q2hhcnMoaGludCkge1xuICByZXR1cm4gW21pbkNoYXJzKGhpbnQpLCBtYXhDaGFycyhoaW50KV07XG59XG5cbmZ1bmN0aW9uIGZvcm1hdEhpbnQoZXhwcmVzc2lvbikge1xuICBjb25zdCBsZWdlbmQgPSBleHByZXNzaW9uLm1hdGNoKC9cXDpcXDouKz9cXDpcXDooLis/KVxcfVxcfS8pWzFdO1xuICBjb25zdCBub3JtYWxpemVkID0gZ3JvdXBNdWx0aVhzKGdyb3VwWHMoZ3JvdXBRdWVzdGlvbk1hcmtzKGxlZ2VuZCkpKTtcblxuICByZXR1cm4gZmxhdHRlbihzcGxpdChub3JtYWxpemVkKSkubWFwKGdyb3VwID0+IHtcbiAgICBpZiAoZ3JvdXAgPT09ICcuJylcbiAgICAgIHJldHVybiAnW10nO1xuXG4gICAgaWYgKGdyb3VwID09PSAnLScpXG4gICAgICByZXR1cm4gJ1tdIFtdIFtdIFtdIFtdJ1xuXG4gICAgaWYgKC9cXD8vLnRlc3QoZ3JvdXApKSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICAgIGNvbnN0IG51bUNoYXJzID0gTnVtYmVyKGdyb3VwLm1hdGNoKC9cXGQrLylbMF0pXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bUNoYXJzOyBpKyspXG4gICAgICAgIHJlc3VsdC5wdXNoKCdbP10nKVxuXG4gICAgICBpZiAocmVzdWx0Lmxlbmd0aCA9PT0gMSlcbiAgICAgICAgcmV0dXJuICdbP10nO1xuXG4gICAgICByZXR1cm4gJygnICsgcmVzdWx0LmpvaW4oJyAnKSArICcpJ1xuICAgIH1cblxuICAgIGlmICgv4omgLy50ZXN0KGdyb3VwKSkge1xuICAgICAgY29uc3QgbmVnYXRlZENoYXJzID0gZ3JvdXAucmVwbGFjZSgv4omgL2csICcnKTtcbiAgICAgIHJldHVybiBgW+KJoCR7bmVnYXRlZENoYXJzfV1gXG4gICAgfVxuICAgIC8vIGVsc2UgKGNoYXJhY3RlciBnaW1tZSlcbiAgICByZXR1cm4gZ3JvdXA7XG4gIH0pLmpvaW4oJyAnKTtcbn1cblxuZnVuY3Rpb24gZ3JvdXBRdWVzdGlvbk1hcmtzKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoLyhcXD8rKS9nLCAobWF0Y2gsIHAxKSA9PiBgKCR7cDEubGVuZ3RofT8pYCk7XG59XG5cbmZ1bmN0aW9uIGdyb3VwWHMoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcucmVwbGFjZSgv4omgW14oXS9nLCAnKCQmKScpO1xufVxuXG5mdW5jdGlvbiBncm91cE11bHRpWHMoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcucmVwbGFjZSgv4omgXFwoKC4qKVxcKS9nLCAnKOKJoCQxKScpXG59XG5cbmZ1bmN0aW9uIHNwbGl0KHN0cikge1xuICByZXR1cm4gc3RyLnNwbGl0KC9bXFwoXFwpXS8pXG4gICAgICAgICAgICAubWFwKGdyb3VwID0+XG4gICAgICAgICAgICAgIC9cXD984omgLy50ZXN0KGdyb3VwKVxuICAgICAgICAgICAgICA/IGdyb3VwXG4gICAgICAgICAgICAgIDogZ3JvdXAuc3BsaXQoJycpXG4gICAgICAgICAgICApO1xufVxuXG5mdW5jdGlvbiBzY2FsYXIodikge1xuICByZXR1cm4gIUFycmF5LmlzQXJyYXkodik7XG59XG5cbmZ1bmN0aW9uIGZsYXR0ZW4oZGVlcCwgZmxhdCA9IFtdKSB7XG4gIGlmIChkZWVwLmxlbmd0aCA9PT0gMClcbiAgICByZXR1cm4gZmxhdDtcblxuICBsZXQgW2hlYWQsIC4uLnRhaWxdID0gZGVlcDtcbiAgcmV0dXJuIHNjYWxhcihoZWFkKVxuICAgID8gZmxhdHRlbih0YWlsLCBmbGF0LmNvbmNhdChoZWFkKSlcbiAgICA6IGZsYXR0ZW4odGFpbCwgZmxhdC5jb25jYXQoZmxhdHRlbihoZWFkKSkpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWxzL3V0aWxzLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcG9seWZpbGxcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJiYWJlbC1wb2x5ZmlsbFwiXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PSAnZGV2JylcbiAgcmVxdWlyZSgnZG90ZW52JykuY29uZmlnKCk7XG5cbmNvbnN0IGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XG5jb25zdCBhcHAgPSBleHByZXNzKCk7XG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuY29uc3QgYm9keVBhcnNlciA9IHJlcXVpcmUoJ2JvZHktcGFyc2VyJyk7XG5jb25zdCB0d2l0dGVyQm90ID0gcmVxdWlyZSgnLi90d2l0dGVyQm90Jyk7XG5cbmFwcC5zZXQoJ3BvcnQnLCAocHJvY2Vzcy5lbnYuUE9SVCB8fCAzMDAwKSk7XG5hcHAudXNlKGV4cHJlc3Muc3RhdGljKHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi9kaXN0JykpKTtcbmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpO1xuXG5yZXF1aXJlKCcuL2FwaScpKGFwcCk7XG5cbnR3aXR0ZXJCb3Quc3RhcnQoKTtcblxuYXBwLmxpc3RlbihhcHAuZ2V0KCdwb3J0JyksICgpID0+XG4gIGNvbnNvbGUubG9nKCdMaXN0ZW5pbmcgb24gcG9ydCcsIGFwcC5nZXQoJ3BvcnQnKSlcbik7XG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGFwcDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zZXJ2ZXIuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJkb3RlbnZcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJkb3RlbnZcIlxuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZXhwcmVzc1wiXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvZHktcGFyc2VyXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYm9keS1wYXJzZXJcIlxuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgREIgPSByZXF1aXJlKCcuL2RiT3BzJyk7XG5jb25zdCB7XG4gIEhPVVJTLFxuICBhZGRRdWVzdGlvbkxpbmssXG4gIGNhbGN1bGF0ZVNjb3JlLFxuICBjb250YWlucyxcbiAgZXh0cmFjdEFuc3dlcixcbiAgZ2V0Rm9sbG93aW5nLFxuICBnZXRUaW1lVW50aWwsXG4gIHBvc3RNZWRpYSxcbiAgdHJ5Q2F0Y2hcbn0gPSByZXF1aXJlKCdVdGlscycpO1xuY29uc3QgVHdpdHRlciA9IHJlcXVpcmUoJy4vdHdpdHRlckNvbmZpZycpO1xuY29uc3QgeyBUV0lUVEVSX0FDQ09VTlQgfSA9IHByb2Nlc3MuZW52O1xuXG5jb25zdCBBTlNXRVJfSU5URVJWQUwgPSA0MDAwMDtcbmxldCBRVUVTVElPTl9JTlRFUlZBTCA9IDEwMDAwO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc3RhcnQ6ICgpID0+IHtcbiAgICBvcGVuU3RyZWFtKCk7XG4gICAgc2V0SW50ZXJ2YWwodHdlZXRSYW5kb21RdWVzdGlvbiwgUVVFU1RJT05fSU5URVJWQUwpO1xuICB9XG4gIC8vIHN0YXJ0OiAoKSA9PiB7XG4gIC8vICAgb3BlblN0cmVhbSgpO1xuICAvLyAgIHNldFN0YXJ0VGltZXMoKTtcbiAgLy8gfVxufTtcblxuZnVuY3Rpb24gc2V0U3RhcnRUaW1lcygpIHtcbiAgY29uc3QgdGltZVVudGlsN1BNID0gZ2V0VGltZVVudGlsKDE5KTtcbiAgY29uc3QgdGltZVVudGlsTWlkbmlnaHQgPSBnZXRUaW1lVW50aWwoMCk7XG5cbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgc2V0SW50ZXJ2YWwodHdlZXRSYW5kb21RdWVzdGlvbiwgUVVFU1RJT05fSU5URVJWQUwpO1xuICB9LCB0aW1lVW50aWw3UE0pO1xuXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIHNldEludGVydmFsKHdlZWtseU1vbnRobHlSZXNldCwgMjQqSE9VUlMpO1xuICB9LCB0aW1lVW50aWxNaWRuaWdodCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHR3ZWV0UmFuZG9tUXVlc3Rpb24oKSB7XG4gIGNvbnN0IHtcbiAgICBjYXJkSWQsXG4gICAgcXVlc3Rpb25UZXh0LFxuICAgIHF1ZXN0aW9uSW1nLFxuICAgIHF1ZXN0aW9uQWx0VGV4dCxcbiAgICBwcmV2TGluZUltZyxcbiAgICBwcmV2TGluZUFsdFRleHQsXG4gICAgYW5zd2Vyc1xuICB9ID0gYXdhaXQgdHJ5Q2F0Y2goREIuZ2V0UmFuZG9tUXVlc3Rpb24oKSk7XG4gIGlmICghY2FyZElkKSByZXR1cm47XG5cbiAgY29uc3Qge1xuICAgIHF1ZXN0aW9uSWQsXG4gICAgcXVlc3Rpb25Qb3N0ZWRBdCxcbiAgICBtZWRpYVVybHNcbiAgfSA9IGF3YWl0IHRyeUNhdGNoKFxuICAgIHBvc3RNZWRpYShcbiAgICAgIHF1ZXN0aW9uVGV4dCxcbiAgICAgIHF1ZXN0aW9uSW1nLFxuICAgICAgcXVlc3Rpb25BbHRUZXh0LFxuICAgICAgcHJldkxpbmVJbWcsXG4gICAgICBwcmV2TGluZUFsdFRleHRcbiAgICApXG4gICk7XG5cbiAgY29uc3QgbGl2ZVF1ZXN0aW9uID0ge1xuICAgIGNhcmRJZCxcbiAgICBxdWVzdGlvbklkLFxuICAgIHF1ZXN0aW9uVGV4dCxcbiAgICBhbnN3ZXJzLFxuICAgIHF1ZXN0aW9uUG9zdGVkQXQsXG4gICAgY2FjaGVkUG9pbnRzOiBbXSxcbiAgICBhbHJlYWR5QW5zd2VyZWQ6IFtdXG4gIH07XG4gIERCLmFkZExpdmVRdWVzdGlvbihsaXZlUXVlc3Rpb24sIG1lZGlhVXJscyk7XG4gIHNldFRpbWVvdXQoKCkgPT4gdHdlZXRBbnN3ZXIoY2FyZElkLCBxdWVzdGlvbklkKSwgQU5TV0VSX0lOVEVSVkFMKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gdHdlZXRBbnN3ZXIoY2FyZElkLCBxdWVzdGlvbklkKSB7XG4gIGNvbnN0IHtcbiAgICBhbnN3ZXJUZXh0LFxuICAgIGFuc3dlckltZyxcbiAgICBhbnN3ZXJBbHRUZXh0XG4gIH0gPSBhd2FpdCB0cnlDYXRjaChcbiAgICAvLyBFRkZFQ1RTOlxuICAgIC8vIC0gcmVtb3ZlcyBxdWVzdGlvbiBmcm9tIGxpdmVRdWVzdGlvbnNcbiAgICAvLyAtIGFkZHMgY2FjaGVkIHBvaW50cyB0byBzY29yZWJvYXJkXG4gICAgLy9cbiAgICAvLyBSRVRVUk5TOlxuICAgIC8vIEFuc3dlckNhcmRcbiAgICBEQi5yZXZlYWxBbnN3ZXJXb3JrZmxvdyhjYXJkSWQpXG4gICk7XG5cbiAgY29uc3QgeyBtZWRpYVVybHMgfSA9IGF3YWl0IHRyeUNhdGNoKFxuICAgIHBvc3RNZWRpYShcbiAgICAgIGFkZFF1ZXN0aW9uTGluayhhbnN3ZXJUZXh0LCBxdWVzdGlvbklkKSxcbiAgICAgIGFuc3dlckltZyxcbiAgICAgIGFuc3dlckFsdFRleHRcbiAgICApXG4gICk7XG5cbiAgREIuYWRkTWVkaWFVcmxzVG9DYXJkKGNhcmRJZCwgbWVkaWFVcmxzKTtcbn1cblxuZnVuY3Rpb24gb3BlblN0cmVhbSgpIHtcbiAgY29uc3Qgc3RyZWFtID0gVHdpdHRlci5zdHJlYW0oJ3N0YXR1c2VzL2ZpbHRlcicsIHsgdHJhY2s6IGBAJHtUV0lUVEVSX0FDQ09VTlR9YCB9KTtcblxuICBzdHJlYW0ub24oJ3R3ZWV0JywgYXN5bmMgKHtcbiAgICBpbl9yZXBseV90b19zdGF0dXNfaWRfc3RyOiBxdWVzdGlvbklkLFxuICAgIGNyZWF0ZWRfYXQ6IGFuc3dlclBvc3RlZEF0LFxuICAgIHRleHQsXG4gICAgdXNlcjoge1xuICAgICAgaWQ6IHVzZXJJZCxcbiAgICAgIG5hbWUsXG4gICAgICBzY3JlZW5fbmFtZTogaGFuZGxlLFxuICAgICAgcHJvZmlsZV9pbWFnZV91cmxfaHR0cHM6IGF2YXRhcixcbiAgICAgIHByb2ZpbGVfYmFubmVyX3VybDogcHJvZmlsZUJhbm5lclxuICAgIH1cbiAgfSkgPT4ge1xuICAgIGNvbnN0IGxpdmVRdWVzdGlvbnMgPSBhd2FpdCB0cnlDYXRjaChEQi5nZXRMaXZlUXVlc3Rpb25zKCkpO1xuICAgIGNvbnN0IGZvdW5kUXVlc3Rpb24gPSBsaXZlUXVlc3Rpb25zLmZpbHRlcihcbiAgICAgIHF1ZXN0aW9uQ2FyZCA9PiBxdWVzdGlvbkNhcmQucXVlc3Rpb25JZCA9PT0gcXVlc3Rpb25JZFxuICAgIClbMF07XG5cbiAgICBpZiAoZm91bmRRdWVzdGlvbikge1xuICAgICAgY29uc3Qge1xuICAgICAgICBhbHJlYWR5QW5zd2VyZWQsXG4gICAgICAgIGFuc3dlcnM6IGFjY2VwdGVkQW5zd2Vyc1xuICAgICAgfSA9IGZvdW5kUXVlc3Rpb247XG4gICAgICBpZiAoY29udGFpbnModXNlcklkLCBhbHJlYWR5QW5zd2VyZWQpKVxuICAgICAgICByZXR1cm47XG5cbiAgICAgIGNvbnN0IGZvbGxvd2luZyA9IGF3YWl0IHRyeUNhdGNoKGdldEZvbGxvd2luZyh1c2VySWQpKTtcbiAgICAgIGNvbnN0IG5ld1VzZXIgPSB7XG4gICAgICAgIHVzZXJJZCxcbiAgICAgICAgbmFtZSxcbiAgICAgICAgaGFuZGxlLFxuICAgICAgICBhdmF0YXIsXG4gICAgICAgIHByb2ZpbGVCYW5uZXIsXG4gICAgICAgIGZvbGxvd2luZyxcbiAgICAgICAgc2NvcmU6IDAsXG4gICAgICAgIG1vbnRobHlTY29yZTogMCxcbiAgICAgICAgd2Vla2x5U2NvcmU6IDAsXG4gICAgICAgIGFuc3dlckF0dGVtcHRzOiAwLFxuICAgICAgICBjb3JyZWN0QW5zd2VyczogW11cbiAgICAgIH07XG4gICAgICBEQi5hZGRPclVwZGF0ZVVzZXIobmV3VXNlcik7XG5cbiAgICAgIGNvbnN0IHVzZXJBbnN3ZXIgPSBleHRyYWN0QW5zd2VyKHRleHQpO1xuICAgICAgaWYgKGNvbnRhaW5zKHVzZXJBbnN3ZXIsIGFjY2VwdGVkQW5zd2VycykpIHtcbiAgICAgICAgY29uc3QgcG9pbnRzID0gY2FsY3VsYXRlU2NvcmUoYW5zd2VyUG9zdGVkQXQsIGZvdW5kUXVlc3Rpb24pO1xuICAgICAgICBEQi51cGRhdGVMaXZlUXVlc3Rpb24ocXVlc3Rpb25JZCwgeyB1c2VySWQsIHBvaW50cyB9KTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgREIudXBkYXRlTGl2ZVF1ZXN0aW9uKHF1ZXN0aW9uSWQsIHsgdXNlcklkLCBwb2ludHM6IDAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBzdHJlYW0ub24oJ2Rpc2Nvbm5lY3QnLCAoZGlzY29ubmVjdE1zZykgPT4ge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1R3ZWV0IHN0cmVhbSBkaXNjb25uZWN0ZWQ6JywgZGlzY29ubmVjdE1zZyk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBzdHJlYW0uc3RhcnQoKSwgMTAwKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHdlZWtseU1vbnRobHlSZXNldCgpIHtcbiAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgY29uc3QgcmVzZXRXZWVrbHlTY29yZSA9IG5vdy5nZXREYXkoKSA9PT0gMDtcbiAgY29uc3QgcmVzZXRNb250aGx5U2NvcmUgPSBub3cuZ2V0RGF0ZSgpID09PSAxO1xuXG4gIGlmIChyZXNldFdlZWtseVNjb3JlIHx8IHJlc2V0TW9udGhseVNjb3JlKVxuICAgIERCLndlZWtseU1vbnRobHlSZXNldChyZXNldFdlZWtseVNjb3JlLCByZXNldE1vbnRobHlTY29yZSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdHdpdHRlckJvdC5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vbmdvZGJcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJtb25nb2RiXCJcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcbmNvbnN0IFBORyA9IHJlcXVpcmUoJ3BuZ2pzMicpLlBORztcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCB1bnppcCA9IHJlcXVpcmUoJ3VuemlwLXN0cmVhbScpO1xuY29uc3QgVVBMT0FEU19QQVRIID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uL3VwbG9hZHMnKTtcbmNvbnN0IHtcbiAgZm9ybWF0UXVlc3Rpb25BbHRUZXh0LFxuICBmb3JtYXRRdWVzdGlvblRleHQsXG4gIGZvcm1hdEFuc3dlckFsdFRleHQsXG4gIGZvcm1hdEFuc3dlclRleHQsXG4gIGdldEFuc3dlcnMsXG4gIHRyeUNhdGNoXG59ID0gcmVxdWlyZSgnVXRpbHMnKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcHJvY2Vzc1VwbG9hZCxcbiAgcGFyc2VBbmtpSnNvbixcbiAgb3B0aW1pemVJbWFnZXNcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc1VwbG9hZCh6aXBmaWxlUGF0aCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IHN0cmVhbSA9IGZzLmNyZWF0ZVJlYWRTdHJlYW0oemlwZmlsZVBhdGgpXG4gICAgICAucGlwZSh1bnppcC5FeHRyYWN0KHsgcGF0aDogJ3VwbG9hZHMnIH0pKTtcblxuICAgIHN0cmVhbS5vbignY2xvc2UnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBmaWxlcyA9IGZzLnJlYWRkaXJTeW5jKFVQTE9BRFNfUEFUSCk7XG4gICAgICBhd2FpdCB0cnlDYXRjaChvcHRpbWl6ZUltYWdlcyhVUExPQURTX1BBVEggKyAnL21lZGlhJykpO1xuICAgICAgY29uc29sZS5sb2coJ0ZpbmlzaGVkIG9wdGltaXppbmcgaW1hZ2VzIScpO1xuICAgICAgY29uc3QgbmV3Q2FyZHMgPSBleHRyYWN0Q2FyZEluZm8oZmlsZXMpO1xuXG4gICAgICBjbGVhblVwKGZpbGVzKTtcbiAgICAgIHJlc29sdmUobmV3Q2FyZHMpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gb3B0aW1pemVJbWFnZXMoZGlyUGF0aCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IGZpbGVzUHJvY2Vzc2luZyA9IFtdO1xuICAgIGZzLnJlYWRkaXJTeW5jKGRpclBhdGgpLmZvckVhY2goZmlsZSA9PiB7XG4gICAgICBpZiAoLy4qXFwucG5nJC8udGVzdChmaWxlKSkge1xuICAgICAgICBjb25zdCBjdXJyZW50RmlsZSA9IGRpclBhdGggKyBcIi9cIiArIGZpbGU7XG4gICAgICAgIGNvbnN0IGNvbnRlbnRzID0gZnMucmVhZEZpbGVTeW5jKGN1cnJlbnRGaWxlKTtcbiAgICAgICAgY29uc3Qgd3JpdGVTdHJlYW0gPSBmcy5jcmVhdGVXcml0ZVN0cmVhbShjdXJyZW50RmlsZSk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRJbWFnZSA9IG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT5cbiAgICAgICAgICB3cml0ZVN0cmVhbS5vbignY2xvc2UnLCByZXMpXG4gICAgICAgICk7XG4gICAgICAgIGZpbGVzUHJvY2Vzc2luZy5wdXNoKGN1cnJlbnRJbWFnZSk7XG4gICAgICAgIG5ldyBQTkcoeyBmaWx0ZXJUeXBlOiA0LCBkZWZsYXRlTGV2ZWw6IDEgfSlcbiAgICAgICAgICAucGFyc2UoY29udGVudHMsIChlcnIsIHBuZykgPT4ge1xuICAgICAgICAgICAgLy8gR2l2ZSB1cHBlciBsZWZ0IHBpeGVsIGFuIG9wYWNpdHlcbiAgICAgICAgICAgIC8vIG9mIDI1NCBzbyBUd2l0dGVyIHdvbid0IGNvbnZlcnRcbiAgICAgICAgICAgIC8vIHRvIGpwZWdcbiAgICAgICAgICAgIHBuZy5kYXRhWzNdIC09IDE7XG4gICAgICAgICAgICBwbmcucGFjaygpLnBpcGUod3JpdGVTdHJlYW0pO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIFByb21pc2UuYWxsKGZpbGVzUHJvY2Vzc2luZykudGhlbihyZXNvbHZlKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGV4dHJhY3RDYXJkSW5mbyhmaWxlcykge1xuICBsZXQgYWxsTmV3Q2FyZHMgPSBbXTtcbiAgZm9yIChsZXQgZmlsZSBvZiBmaWxlcykge1xuICAgIGNvbnN0IGN1cnJlbnRGaWxlID0gYCR7VVBMT0FEU19QQVRIfS8ke2ZpbGV9YDtcbiAgICBjb25zdCBzdGF0cyA9IGZzLnN0YXRTeW5jKGN1cnJlbnRGaWxlKTtcblxuICAgIGlmIChzdGF0cy5pc0ZpbGUoKSAmJiBmaWxlLm1hdGNoKC8uK1xcLmpzb24kLykpIHtcbiAgICAgIGNvbnN0IG5ld0NhcmRzID0gcGFyc2VBbmtpSnNvbihjdXJyZW50RmlsZSk7XG4gICAgICBhbGxOZXdDYXJkcyA9IGFsbE5ld0NhcmRzLmNvbmNhdChuZXdDYXJkcyk7XG4gICAgfVxuICB9XG4gIHJldHVybiBhbGxOZXdDYXJkcztcbn1cblxuZnVuY3Rpb24gcGFyc2VBbmtpSnNvbihmaWxlUGF0aCkge1xuICBjb25zdCBjb250ZW50cyA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKGZpbGVQYXRoLCAndXRmOCcpKTtcbiAgcmV0dXJuIGNvbnRlbnRzLm5vdGVzLm1hcChjYXJkID0+IHtcbiAgICBsZXQgW1xuICAgICAgZXhwcmVzc2lvbixcbiAgICAgICwgLy8gcmVhZGluZyxcbiAgICAgICwvLyBqYXBNZWFuaW5nLFxuICAgICAgZW5nTWVhbmluZyxcbiAgICAgICwgLy8gb2ZmaWNpYWxFbmcsXG4gICAgICBxdWVzdGlvbkltZyxcbiAgICAgIGFuc3dlckltZyxcbiAgICAgICwgLy8gYXVkaW9cbiAgICAgIHByZXZMaW5lSW1nLFxuICAgICAgcHJldkxpbmVBbHRUZXh0LFxuICAgICAgYWx0QW5zd2VycyxcbiAgICAgIHdlYkxvb2t1cCwgLy8gdXNlIGZvciBldmVyeSBhbnN3ZXIgc28gcGVvcGxlIGNhbiBsb29rIHVwIHByb251bmNpYXRpb25cbiAgICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9lamplLndlYmxpby5qcC9jb250ZW50L1t3ZWJMb29rdXAgKGUuZy4g5YiH44KK5o+b44GI44KLKV1cbiAgICAgIG5vdGVzLFxuICAgICAgY2FyZElkXG4gICAgXSA9IGNhcmQuZmllbGRzO1xuXG4gICAgW2V4cHJlc3Npb24sIGVuZ01lYW5pbmcsIG5vdGVzXSA9IFtleHByZXNzaW9uLCBlbmdNZWFuaW5nLCBub3Rlc10ubWFwKHN0cmlwSHRtbCk7XG4gICAgY29uc3QgYW5zd2VycyA9IGdldEFuc3dlcnMoZXhwcmVzc2lvbiwgYWx0QW5zd2Vycyk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgY2FyZElkLFxuICAgICAgcXVlc3Rpb25UZXh0OiAgICBmb3JtYXRRdWVzdGlvblRleHQoZXhwcmVzc2lvbiwgZW5nTWVhbmluZywgbm90ZXMsIGNhcmRJZCksXG4gICAgICBxdWVzdGlvbkltZzogICAgIGdldEJhc2U2NChxdWVzdGlvbkltZyksXG4gICAgICBxdWVzdGlvbkFsdFRleHQ6IGZvcm1hdFF1ZXN0aW9uQWx0VGV4dChleHByZXNzaW9uKSxcbiAgICAgIHByZXZMaW5lSW1nOiAgICAgZ2V0QmFzZTY0KHByZXZMaW5lSW1nKSxcbiAgICAgIHByZXZMaW5lQWx0VGV4dCxcbiAgICAgIGFuc3dlclRleHQ6ICAgICAgZm9ybWF0QW5zd2VyVGV4dChhbnN3ZXJzLCBlbmdNZWFuaW5nLCB3ZWJMb29rdXAsIGNhcmRJZCksXG4gICAgICBhbnN3ZXJJbWc6ICAgICAgIGdldEJhc2U2NChhbnN3ZXJJbWcpLFxuICAgICAgYW5zd2VyQWx0VGV4dDogICBmb3JtYXRBbnN3ZXJBbHRUZXh0KGV4cHJlc3Npb24pLFxuICAgICAgYW5zd2VycyxcbiAgICAgIG1lZGlhVXJsczogW11cbiAgICB9O1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc3RyaXBIdG1sKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoLzwuKj8+fCYuKjsvZywgJycpO1xufVxuXG5mdW5jdGlvbiBnZXRTcmMoc3RyaW5nKSB7XG4gIHJldHVybiAoc3RyaW5nLm1hdGNoKC9zcmM9XCIoLispXCIvKSB8fCBbLF0pWzFdO1xufVxuXG5mdW5jdGlvbiBnZXRCYXNlNjQoc3RyaW5nKSB7XG4gIGlmICghc3RyaW5nIHx8IHN0cmluZy5sZW5ndGggPT09IDApIHJldHVybjtcblxuICBsZXQgYmFzZTY0O1xuICB0cnkge1xuICAgIGJhc2U2NCA9IGZzLnJlYWRGaWxlU3luYyhcbiAgICAgIGAke1VQTE9BRFNfUEFUSH0vbWVkaWEvJHtnZXRTcmMoc3RyaW5nKX1gLFxuICAgICAgeyBlbmNvZGluZzogJ2Jhc2U2NCcgfVxuICAgICk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyByZXR1cm5pbmcgdW5kZWZpbmVkLi4uXG4gIH1cbiAgcmV0dXJuIGJhc2U2NDtcbn1cblxuZnVuY3Rpb24gY2xlYW5VcChmaWxlcykge1xuICBmb3IgKGxldCBmaWxlIG9mIGZpbGVzKSB7XG4gICAgY29uc3Qgcm9vdCA9IGAke1VQTE9BRFNfUEFUSH0vJHtmaWxlfWA7XG5cbiAgICBpZiAoZnMubHN0YXRTeW5jKHJvb3QpLmlzRmlsZSgpKVxuICAgICAgZnMudW5saW5rU3luYyhyb290KTtcbiAgICBlbHNlIGlmIChmcy5sc3RhdFN5bmMocm9vdCkuaXNEaXJlY3RvcnkoKSlcbiAgICAgIGRlbGV0ZUZvbGRlclJlY3Vyc2l2ZShyb290KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkZWxldGVGb2xkZXJSZWN1cnNpdmUocm9vdFBhdGgpIHtcbiAgaWYgKGZzLmV4aXN0c1N5bmMocm9vdFBhdGgpKSB7XG4gICAgZnMucmVhZGRpclN5bmMocm9vdFBhdGgpLmZvckVhY2goZmlsZSA9PiB7XG4gICAgICBjb25zdCBjdXJQYXRoID0gcm9vdFBhdGggKyBcIi9cIiArIGZpbGU7XG4gICAgICBpZiAoZnMubHN0YXRTeW5jKGN1clBhdGgpLmlzRGlyZWN0b3J5KCkpIHsgLy8gcmVjdXJzZVxuICAgICAgICBkZWxldGVGb2xkZXJSZWN1cnNpdmUoY3VyUGF0aCk7XG4gICAgICB9IGVsc2UgeyAvLyBkZWxldGUgZmlsZVxuICAgICAgICBmcy51bmxpbmtTeW5jKGN1clBhdGgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGZzLnJtZGlyU3luYyhyb290UGF0aCk7XG4gIH1cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcHJvY2Vzc0Fua2lKc29uLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJmc1wiXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwbmdqczJcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJwbmdqczJcIlxuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidW56aXAtc3RyZWFtXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwidW56aXAtc3RyZWFtXCJcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IFR3aXR0ZXIgPSByZXF1aXJlKCcuLi90d2l0dGVyQ29uZmlnJyk7XG5jb25zdCB7IHRyeUNhdGNoIH0gPSByZXF1aXJlKCdVdGlscy91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICAvL1xuICAvLyBwb3N0IGEgdHdlZXQgd2l0aCBtZWRpYVxuICAvL1xuICBwb3N0TWVkaWEoc3RhdHVzLCBiNjRJbWFnZTEsIGFsdFRleHQxLCBiNjRJbWFnZTIsIGFsdFRleHQyKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IG1lZGlhSWQxID0gYXdhaXQgdHJ5Q2F0Y2godXBsb2FkTWVkaWEoYjY0SW1hZ2UxLCBhbHRUZXh0MSkpO1xuICAgICAgY29uc3QgbWVkaWFfaWRzID0gW21lZGlhSWQxXTtcbiAgICAgIGlmIChiNjRJbWFnZTIpIHtcbiAgICAgICAgY29uc3QgbWVkaWFJZDIgPSBhd2FpdCB0cnlDYXRjaCh1cGxvYWRNZWRpYShiNjRJbWFnZTIsIGFsdFRleHQyKSk7XG4gICAgICAgIG1lZGlhX2lkcy51bnNoaWZ0KG1lZGlhSWQyKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGFyYW1zID0geyBzdGF0dXMsIG1lZGlhX2lkcywgdHdlZXRfbW9kZTogJ2V4dGVuZGVkJywgaW5jbHVkZV9leHRfYWx0X3RleHQ6IHRydWUgfTtcbiAgICAgIFR3aXR0ZXIucG9zdCgnc3RhdHVzZXMvdXBkYXRlJywgcGFyYW1zLCAoZXJyLCBkYXRhLCByZXNwb25zZSkgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpXG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIlBvc3Rpbmcgc3RhdHVzIGZhaWxlZC5cIikpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBtZWRpYVVybHMgPSBkYXRhLmV4dGVuZGVkX2VudGl0aWVzLm1lZGlhLm1hcChcbiAgICAgICAgICBvYmogPT4gKHtcbiAgICAgICAgICAgIGltYWdlOiBvYmoubWVkaWFfdXJsX2h0dHBzLFxuICAgICAgICAgICAgYWx0VGV4dDogb2JqLmV4dF9hbHRfdGV4dFxuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAgICAgICBxdWVzdGlvbklkOiAgICAgICBkYXRhLmlkX3N0cixcbiAgICAgICAgICBxdWVzdGlvblBvc3RlZEF0OiBkYXRhLmNyZWF0ZWRfYXQsXG4gICAgICAgICAgbWVkaWFVcmxzXG4gICAgICAgIH07XG4gICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuXG4gIGdldEZvbGxvd2luZyh1c2VySWQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgVHdpdHRlci5nZXQoJ2ZyaWVuZHMvaWRzJywgeyB1c2VySWQgfSwgKGVyciwgZGF0YSwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgaWYgKGVycikgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICByZXNvbHZlKGRhdGEuaWRzKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbn0gLy8gbW9kdWxlLmV4cG9ydHNcblxuXG4vLyBFRkZFQ1RTOlxuLy8gdXBsb2FkcyBhIHNpbmdsZSBpbWFnZSB3aXRoIGFsdFRleHQgdG8gVHdpdHRlclxuLy9cbi8vIFJFVFVSTlM6XG4vLyBtZWRpYV9pZCB3aGljaCBpcyBuZWNlc3NhcnkgZm9yXG4vLyBhdHRhY2hpbmcgbWVkaWEgdG8gYSB0d2VldFxuLy9cbmZ1bmN0aW9uIHVwbG9hZE1lZGlhKGI2NEltYWdlLCBhbHRUZXh0KSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgLy8gZmlyc3Qgd2UgbXVzdCBwb3N0IHRoZSBtZWRpYSB0byBUd2l0dGVyXG4gICAgVHdpdHRlci5wb3N0KCdtZWRpYS91cGxvYWQnLCB7IG1lZGlhX2RhdGE6IGI2NEltYWdlIH0sIChlcnIsIGRhdGEsIHJlc3BvbnNlKSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIk1lZGlhIHVwbG9hZCBmYWlsZWQuXCIpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gbm93IHdlIGNhbiBhc3NpZ24gYWx0IHRleHQgdG8gdGhlIG1lZGlhLCBmb3IgdXNlIGJ5IHNjcmVlbiByZWFkZXJzIGFuZFxuICAgICAgLy8gb3RoZXIgdGV4dC1iYXNlZCBwcmVzZW50YXRpb25zIGFuZCBpbnRlcnByZXRlcnNcbiAgICAgIGNvbnN0IG1lZGlhSWRTdHIgPSBkYXRhLm1lZGlhX2lkX3N0cmluZztcbiAgICAgIGNvbnN0IG1ldGFfcGFyYW1zID0geyBtZWRpYV9pZDogbWVkaWFJZFN0ciwgYWx0X3RleHQ6IHsgdGV4dDogYWx0VGV4dCB9IH1cblxuICAgICAgVHdpdHRlci5wb3N0KCdtZWRpYS9tZXRhZGF0YS9jcmVhdGUnLCBtZXRhX3BhcmFtcywgKGVyciwgZGF0YSwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiTWVkaWEgdXBsb2FkIHN1Y2NlZWRlZCwgbWVkaWEgY3JlYXRpb24gZmFpbGVkLlwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gbm93IHdlIGNhbiByZWZlcmVuY2UgdGhlIG1lZGlhIGFuZCBwb3N0IGEgdHdlZXQgKG1lZGlhIHdpbGwgYXR0YWNoIHRvIHRoZSB0d2VldClcbiAgICAgICAgcmVzb2x2ZShtZWRpYUlkU3RyKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlscy90d2l0dGVyVXRpbHMuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0d2l0XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwidHdpdFwiXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1cmxlbmNvZGVcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ1cmxlbmNvZGVcIlxuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgREIgPSByZXF1aXJlKCcuL2RiT3BzJyk7XG5jb25zdCB1cGxvYWQgPSByZXF1aXJlKCdtdWx0ZXInKSh7IGRlc3Q6ICd1cGxvYWRzLycgfSk7XG5cbm1vZHVsZS5leHBvcnRzID0gKGFwcCkgPT4ge1xuXG4gIC8vIENPUlNcbiAgYXBwLnVzZSgocmVxLCByZXMsIG5leHQpID0+IHtcbiAgICByZXMuaGVhZGVyKCdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nLCAnKicpO1xuICAgIHJlcy5oZWFkZXIoJ0FjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHMnLCAnR0VULCBPUFRJT05TJyk7XG4gICAgcmVzLmhlYWRlcignQWNjZXNzLUNvbnRyb2wtTWF4LUFnZScsICc4NjQwMCcpOyAvLyAyNCBob3Vyc1xuICAgIHJlcy5oZWFkZXIoJ0FjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnMnLFxuICAgICAgICAgICAgICAgJ09yaWdpbiwgWC1SZXF1ZXN0ZWQtV2l0aCwgQ29udGVudC1UeXBlLCBBY2NlcHQnKTtcbiAgICBuZXh0KCk7XG4gIH0pO1xuXG4gIGFwcC5nZXQoJy9hcGkvbGl2ZScsIChyZXEsIHJlcykgPT4ge1xuICAgIERCLnNlcnZlTGl2ZVF1ZXN0aW9ucyhyZXEsIHJlcyk7XG4gIH0pO1xuXG4gIGFwcC5nZXQoJy9hcGkvc2NvcmVzJywgKHJlcSwgcmVzKSA9PiB7XG4gICAgREIuZ2V0U2NvcmVzKHJlcSwgcmVzKTtcbiAgfSk7XG5cbiAgYXBwLmdldCgnL2FwaS9jYXJkcycsIChyZXEsIHJlcykgPT4ge1xuICAgIERCLmdldENhcmRzKHJlcSwgcmVzKTtcbiAgfSk7XG5cbiAgLy8gVE9ETyAtIERlbGV0ZSB0aGlzIGVuZHBvaW50IGlmIG5vdCBuZWVkZWRcbiAgYXBwLmdldCgnL2FwaS9zY29yZS86aGFuZGxlJywgKHJlcSwgcmVzKSA9PiB7XG4gICAgREIuZ2V0U2NvcmUocmVxLCByZXMpO1xuICB9KTtcblxuICBhcHAuZ2V0KCcvYXBpL2NhcmRzL29sZCcsIChyZXEsIHJlcykgPT4ge1xuICAgIERCLmdldE9sZENhcmRzKHJlcSwgcmVzKTtcbiAgfSk7XG5cblxuICAvLyBUT0RPIC0gYWRkIGF1dGhlbnRpY2F0aW9uIHRvIGZvbGxvd2luZyBlbmRwb2ludHNcblxuICBhcHAucG9zdCgnL2RlY2svbmV3JywgdXBsb2FkLnNpbmdsZSgnemlwZmlsZScpLCAocmVxLCByZXMpID0+IHtcbiAgICBEQi5hZGREZWNrKHJlcSwgcmVzKTtcbiAgfSk7XG5cbiAgYXBwLnBvc3QoJy9zY29yZXMvZWRpdCcsIChyZXEsIHJlcykgPT4ge1xuICAgIERCLmFkanVzdFNjb3JlKHJlcSwgcmVzKTtcbiAgfSk7XG5cbiAgYXBwLmdldCgnL2NhcmRzL25ldycsIChyZXEsIHJlcykgPT4ge1xuICAgIERCLmdldE5ld0NhcmRzKHJlcSwgcmVzKTtcbiAgfSk7XG5cbn0gLy8gbW9kdWxlLmV4cG9ydHNcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcGkuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtdWx0ZXJcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJtdWx0ZXJcIlxuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==