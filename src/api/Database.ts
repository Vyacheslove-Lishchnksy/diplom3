import { RTTTLMelody } from "../configs/default_melodies";

class MelodiesDatabase {
    private url;

    constructor(url: string) {
        this.url = url;
    }

    public async getAllMelodies() {
        const response = await fetch(`${this.url}/melodies`, {method: "GET"});
        if (!response.ok) throw new Error('current list is not access');
            return response.json();
    }

    public async updateMelody(newMelody: RTTTLMelody) {
        let response
        response = await fetch(`${this.url}/melodies/${newMelody.id}`, {method: "PUT", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newMelody)})
        return response.json();
    }

    public async createMelody( newMelody: RTTTLMelody ) {
      let response
      if(!newMelody.id) {
        response = await fetch(`${this.url}/melodies`, {method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newMelody)})
      }
      return response;      
    }

    public async deleteMelody(id: string | undefined) {
      let response
      if(id) {
        response = await fetch(`${this.url}/melodies/${id}`, {method: "DELETE" })
        return response.json();
      } 
    }
}

export const instanceMelodiesDatabase = new MelodiesDatabase("https://pg-melody-server-2.onrender.com");