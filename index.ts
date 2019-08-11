import axios from 'axios'
import { hashMap } from './interfaces/hashmap';


// With this test I don't use it
let notYetVisitedRooms: hashMap = {};
let notYetOpenChests: hashMap = {};

let emptyChests: number = 0;
let rewardedChests: number = 0;

async function goToRoom(room: string): Promise<Object> {
    try {
        let response = await axios.get(`http://mediarithmics.francecentral.cloudapp.azure.com:3000${room}`);
        
        return response.data;
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
        const end = await theMightyQuestForEpicLoot([`/castles/1/rooms/entry`])
        console.log('This is the end')
        console.log(end)
        console.log(`emptyChests : ${emptyChests}, rewardedChests : ${rewardedChests}`);
        
        console.log((Date.now() - start)/1000 + ' secondes')
    } catch (error) {
        console.log(error);
    }
})();


async function theMightyQuestForEpicLoot(rooms: Array<string>): Promise<any> {
    try {
        if(rooms.length === 0) {
            return false;
        }
    
    
        const roomsLoot = await Promise.all(rooms.map((room): Promise<Object> => {
            const roomLoot = goToRoom(room);
    
            return roomLoot;
        }));
    
        const allRooms = await Promise.all(roomsLoot.map((roomLoot) => {
            const rooms = roomLoot['rooms'];
            const chests = roomLoot['chests'];
            if(chests !== undefined) {
                for (const chest of chests) {
                    openChest(chest);                    
                }
            }
            // console.log(rooms);
            if( rooms !== undefined) {
                const result = theMightyQuestForEpicLoot(rooms);
                return result;
            } else {
                return false;
            }
            
        }));
    
        return allRooms;
        
    } catch (error) {
        console.log(error);
    }
}