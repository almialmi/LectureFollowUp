
import { Injectable } from '@angular/core';
import { Universtiy } from "src/app/shared/universtiy.model";
import { State } from 'src/app/shared/state.model';
 
@Injectable()
export class DataService {
  getCountries() {
    return [
     new Universtiy(1, 'Adama Science and Technology University' ),
     new Universtiy(2, 'Addis Ababa Science and Technology University' ),
     new Universtiy(3, 'Addis Ababa University' ),
     new Universtiy(4, 'Adigrat University' ),
     new Universtiy(5, 'Aksum University' ),
     new Universtiy(6, 'Australia' ),
     new Universtiy(7, 'Ambo University' ),
     new Universtiy(8, 'Arba Minch University' ),
     new Universtiy(9, 'Assosa University' ),
     new Universtiy(10, 'Bahir Dar University' ),
     new Universtiy(11, 'Bule Hora University' ),
     new Universtiy(12, 'Debre Berhan University' ),
     new Universtiy(13, 'Debre Markos University' ),
     new Universtiy(14, 'Debre Tabor University' ),
     new Universtiy(15, 'Dilla University' ),
     new Universtiy(16, 'Dire Dawa University' ),
     new Universtiy(17, 'Haramaya University' ),
     new Universtiy(17, 'Hawassa University' ),
     new Universtiy(19, 'Jigjiga University' ),
     new Universtiy(20, 'Jimma University' ),
     new Universtiy(21, 'Madda Walabu University' ),
     new Universtiy(22, 'Mettu University' ),
     new Universtiy(23, 'Mizan Tepi University' ),
     new Universtiy(24, 'Semera University' ),
     new Universtiy(25, 'University of Gondar' ),
     new Universtiy(26, 'Wachamo University' ),
     new Universtiy(27, 'Wolaita Sodo University' ),
     new Universtiy(28, 'Woldia University' ),
     new Universtiy(29, 'Wolkite University' ),
     new Universtiy(30, 'Wollega University' ),
     new Universtiy(31, 'Wollo University' ),
    

    ];
  }
   
  getStates() {
   return [
     new State(1, 'USA', 'Arizona' ),
     new State(2, 'USA', 'Alaska' ),
     new State(3, 'USA', 'Florida'),
     new State(4, 'India', 'Hawaii'),
     new State(5, 'India', 'Gujarat' ),
     new State(6, 'India', 'Goa'),
     new State(7, 'Australia', 'Punjab' ),
     new State(8, 'Australia', 'Queensland' ),
     new State(9, 'Australia', 'South Australia' ),
     new State(10, 'Australia', 'Tasmania')
    ];
  }
}