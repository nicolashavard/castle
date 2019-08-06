// let axios = require('axios')
import axios from 'axios'
import { hashMap } from './interfaces/hashmap';


// With this test I don't use it
let notYetVisitedRooms: hashMap = {};
let notYetOpenChests: hashMap = {};

let emptyChests: number = 0;
let rewardedChests: number = 0;

async function goToRoom(room: string): Promise<Boolean> {
    try {
        let response = await axios.get(`http://mediarithmics.francecentral.cloudapp.azure.com:3000${room}`);
        const rooms: Array<string> = response.data.rooms;
        const chests: Array<string> = response.data.chests;
        
        // console.log(chests);
        if (chests) {
            let chestsPromises: Array<Promise<any>> = []
            for (const chest of chests) {
                // notYetOpenChests[chest] = true;
                 
                let promise = new Promise(function(resolve, reject) {
                    resolve(openChest(chest));
                });
                chestsPromises.push(promise)
            }
            Promise.all(chestsPromises).then(function(promises) {
                const nbChest: number = promises.length;
                console.log(`Number of new chests open : ${nbChest} 
                    Empty chests : ${emptyChests}
                    Rewarded chests : ${rewardedChests}`);

            }); 
        }

        // console.log(rooms)
        if(rooms) {
            let roomsPromises: Array<Promise<any>> = []
            for (const room of rooms) {
                // notYetVisitedRooms[room] = true;
                let promise = new Promise(function(resolve, reject) {
                    resolve(goToRoom(room));
                });
                roomsPromises.push(promise)
            }
            Promise.all(roomsPromises).then(function(promises) {
                const nbRooms: number = promises.length;
                console.log(`Number of new rooms find : ${nbRooms}`);
            });
        }
        
        return true;
    } catch (error) {
        console.log(error);
    }
}

async function openChest(chest: string): Promise<Boolean> {
    try {
        const response: any = await axios.get(`http://mediarithmics.francecentral.cloudapp.azure.com:3000${chest}`)
        const status: string = response.data.status;
        if (status === "This chest is empty :/ Try another one!") {
            emptyChests++
        } else {
            rewardedChests++
        }

        return true;
    } catch (error) {
        console.log(error);
    }
}

const start = Date.now();
(async (): Promise<void> => {
    try {
        await goToRoom(`/castles/1/rooms/entry`);
        // const bob = await testPromiseAll([`/castles/1/rooms/entry`]);
        // console.log(bob)
        console.log((Date.now() - start)/1000 + ' secondes')

        // False end of promise. just testing result
        // setTimeout( function() {
        //     console.log(notYetVisitedRooms);
        //     console.log(notYetOpenChests);

        // }, 10000);
    } catch (error) {
        console.log(error);
    }
})();



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
