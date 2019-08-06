"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
// let axios = require('axios')
var axios_1 = require("axios");
// With this test I don't use it
var notYetVisitedRooms = {};
var notYetOpenChests = {};
var emptyChests = 0;
var rewardedChests = 0;
function goToRoom(room) {
    return __awaiter(this, void 0, void 0, function () {
        var response, rooms, chests, chestsPromises, _loop_1, _i, chests_1, chest, roomsPromises, _loop_2, _a, rooms_1, room_1, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"].get("http://mediarithmics.francecentral.cloudapp.azure.com:3000" + room)];
                case 1:
                    response = _b.sent();
                    rooms = response.data.rooms;
                    chests = response.data.chests;
                    // console.log(chests);
                    if (chests) {
                        chestsPromises = [];
                        _loop_1 = function (chest) {
                            // notYetOpenChests[chest] = true;
                            var promise = new Promise(function (resolve, reject) {
                                resolve(openChest(chest));
                            });
                            chestsPromises.push(promise);
                        };
                        for (_i = 0, chests_1 = chests; _i < chests_1.length; _i++) {
                            chest = chests_1[_i];
                            _loop_1(chest);
                        }
                        Promise.all(chestsPromises).then(function (promises) {
                            var nbChest = promises.length;
                            console.log("Number of new chests open : " + nbChest + " \n                    Empty chests : " + emptyChests + "\n                    Rewarded chests : " + rewardedChests);
                        });
                    }
                    // console.log(rooms)
                    if (rooms) {
                        roomsPromises = [];
                        _loop_2 = function (room_1) {
                            // notYetVisitedRooms[room] = true;
                            var promise = new Promise(function (resolve, reject) {
                                resolve(goToRoom(room_1));
                            });
                            roomsPromises.push(promise);
                        };
                        for (_a = 0, rooms_1 = rooms; _a < rooms_1.length; _a++) {
                            room_1 = rooms_1[_a];
                            _loop_2(room_1);
                        }
                        Promise.all(roomsPromises).then(function (promises) {
                            var nbRooms = promises.length;
                            console.log("Number of new rooms find : " + nbRooms);
                        });
                    }
                    return [2 /*return*/, true];
                case 2:
                    error_1 = _b.sent();
                    console.log(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function openChest(chest) {
    return __awaiter(this, void 0, void 0, function () {
        var response, status_1, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"].get("http://mediarithmics.francecentral.cloudapp.azure.com:3000" + chest)];
                case 1:
                    response = _a.sent();
                    status_1 = response.data.status;
                    if (status_1 === "This chest is empty :/ Try another one!") {
                        emptyChests++;
                    }
                    else {
                        rewardedChests++;
                    }
                    return [2 /*return*/, true];
                case 2:
                    error_2 = _a.sent();
                    console.log(error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
var start = Date.now();
(function () { return __awaiter(_this, void 0, void 0, function () {
    var error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, goToRoom("/castles/1/rooms/entry")];
            case 1:
                _a.sent();
                // const bob = await testPromiseAll([`/castles/1/rooms/entry`]);
                // console.log(bob)
                console.log((Date.now() - start) / 1000 + ' secondes');
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.log(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); })();
// async function testPromiseAll(rooms) {
//     const promisesAll = await Promise.all(rooms.map(async function(room) {
//         const response = await axios.get(`http://mediarithmics.francecentral.cloudapp.azure.com:3000${room}`);
//         const rooms = response.data.rooms;
//         const chests = response.data.chests
//         // console.log(rooms);
//         // console.log(chests);
//         if (rooms) {
//             const nextResponse = await axios.get(`http://mediarithmics.francecentral.cloudapp.azure.com:3000${room}`)
//             const nextRooms = nextResponse.data.rooms;
//             return [rooms, nextRooms];
//         } else {
//             return [rooms];
//         }
//     }));
//     var flat = [];
//     console.log(promisesAll)
//     promisesAll.forEach(function(responseArray) {
//         flat.push.apply(flat, responseArray);
//     });
//     return flat;
// }
