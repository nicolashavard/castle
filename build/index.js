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
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"].get("http://mediarithmics.francecentral.cloudapp.azure.com:3000" + room)];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
                case 2:
                    error_1 = _a.sent();
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
    var end, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, theMightyQuestForEpicLoot(["/castles/1/rooms/entry"])];
            case 1:
                end = _a.sent();
                console.log('This is the end');
                console.log(end);
                console.log("emptyChests : " + emptyChests + ", rewardedChests : " + rewardedChests);
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
function theMightyQuestForEpicLoot(rooms) {
    return __awaiter(this, void 0, void 0, function () {
        var roomsLoot, allRooms, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    if (rooms.length === 0) {
                        return [2 /*return*/, false];
                    }
                    return [4 /*yield*/, Promise.all(rooms.map(function (room) {
                            var roomLoot = goToRoom(room);
                            return roomLoot;
                        }))];
                case 1:
                    roomsLoot = _a.sent();
                    return [4 /*yield*/, Promise.all(roomsLoot.map(function (roomLoot) {
                            var rooms = roomLoot['rooms'];
                            var chests = roomLoot['chests'];
                            if (chests !== undefined) {
                                for (var _i = 0, chests_1 = chests; _i < chests_1.length; _i++) {
                                    var chest = chests_1[_i];
                                    openChest(chest);
                                }
                            }
                            // console.log(rooms);
                            if (rooms !== undefined) {
                                var result = theMightyQuestForEpicLoot(rooms);
                                return result;
                            }
                            else {
                                return false;
                            }
                        }))];
                case 2:
                    allRooms = _a.sent();
                    return [2 /*return*/, allRooms];
                case 3:
                    error_4 = _a.sent();
                    console.log(error_4);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
