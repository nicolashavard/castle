// let axios = require('axios')
import axios from 'axios'
import { hashMap } from './lib/interfaces';



let notYetVisitedRooms: hashMap = {};
// let notYetOpenChests: hashMap = {};
let emptyChests: number = 0;
let rewardedChests: number = 0;

async function goToRoom(room: string): Promise<Boolean> {
    try {
        let response = await axios.get(`http://mediarithmics.francecentral.cloudapp.azure.com:3000${room}`);
        const rooms = response.data.rooms;
        const chests = response.data.chests;
        for (const room of rooms) {
            notYetVisitedRooms[room] = true;
        }
        
        for (const chest of chests) {
            openChest(chest)  ;  

            // notYetOpenChests[chest] = true;
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

        // while(Object.keys(notYetOpenChests).length > 0) {
        //     const index = Object.keys(notYetOpenChests)[0];
        //     delete notYetOpenChests[index];
        //     openChest(index)    
        // }

        console.log((Date.now() - start)/1000 + ' secondes')

        // False end of promise. just testing result
        setTimeout( function() {
            console.log(emptyChests);
            console.log(rewardedChests);
        }, 1000);
    } catch (error) {
        console.log(error);
    }
})();