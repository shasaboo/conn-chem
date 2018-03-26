function CalculateKE() {
 
 for(i = 0 ; i< 20 ; i++)
 { 
 Totalvel[i] = Math.sqrt((bodynumber[i].velocity.x)*(bodynumber[i].velocity.x) + (bodynumber[i].velocity.y)*(bodynumber[i].velocity.y));
 //Ke =  0.5*18*2*Totalvel[i]*Totalvel[i];
 Ke =  0.5*18*Totalvel[i]*Totalvel[i];
 TotalKE += Ke;
 
 }
 var averageKE = TotalKE/20;
systemtempp = ((averageKE*2*100)/(.15*1.38*6.022)) + minTemp;
systemtemp = systemtempp % 265 ;
console.log("averageKE",systemtemp,averageKE);
document.getElementById("temperature").innerHTML = systemtemp;
}


