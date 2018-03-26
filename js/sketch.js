var Engine = Matter.Engine;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Composites = Matter.Composites;
var Composite = Matter.Composite;
var engine;
var bodies;
var world;

var molID;
var molarray = [];
var gcoll = 0;
var totalRows;

//Simulation Titles
var pageTitle=document.title;
var sim1="";
var sim2="Connected Chemistry - Classifying Matter";
var sim3="Connected Chemistry - Physical Changes";
var sim4="Connected Chemistry - Chemical changes";
var sim5="Connected Chemistry - Mixtures";

//store propeties of bodies
var bodynumber = [];
var bodyPositionX = [];
var bodyPositionY = [];
var bodyType = [];
var minTemp = -20;
var bodycolgrnd = [];
var Ke = 0;
var TotalKE = 0;
var test = [];
var img;
var systemtemp;
var val=0;
var randomnum;
var mol1;
var mol2;
var idealRoomTemp = 25.00;
var currRoomTemp = idealRoomTemp;
var intVal;
var OneNegUnit = 8.8;
var OnePosUnit = 47.70;
var RateOfChangeNeg = OneNegUnit / 40;
var RateOfChangePos = OnePosUnit / 40;
var currRateChange = 0;
var collisionHeight = 0;
var totalSeconds = 0;
var timerVar;
var totalMolecules=0;
var totalMolecules1=0;
var totalMolecules2=0;
var stack = [];
var stackCounter = 0;
var radius=23;
var moleculenum=28;
var moleculenum1=0
var row,column;
var compounds = database['compounds'];
var elements = database['elements'];
var freezingPoint=25;
var boilingPoint=25;
var p;
var x=320;
var y=30;

// loading IMAGE for different options
function setMolecule(ID) {

    molID=1;
    stackCounter=0;
    if (ID == 1) {
        img = loadImage('assets/Water.png');
        document.getElementById("molimg").src="assets/Water.png";
        document.getElementById("molname").innerHTML="Water";
        setFreezingBoilingPoint("Water","compounds");
        moleculenum=28;
    } else if (ID == 2) {
        img = loadImage('assets/HydrogenPeroxide.png');
        img1 = loadImage('assets/Water.png');
        img2 = loadImage('assets/Oxygen.png');
        document.getElementById("molimg").src="assets/HydrogenPeroxide.png";
        document.getElementById("molname").innerHTML="HydrogenPeroxide";
        window.myLine.data.datasets[0].label="HydrogenPeroxide";
        setFreezingBoilingPoint("Hydrogen-Peroxide","compounds");
        moleculenum=20;
    } else if (ID == 3) {
        img = loadImage('assets/Pentane.png');
        document.getElementById("molimg").src="assets/Pentane.png";
        document.getElementById("molname").innerHTML="Pentane";
        window.myLine.data.datasets[0].label="Pentane";
        setFreezingBoilingPoint("Pentane","compounds");
        moleculenum=12;
    } else if (ID == 4) {
        img = loadImage('assets/Mercury.png');
        document.getElementById("molimg").src="assets/Mercury.png";
        document.getElementById("molname").innerHTML="Mercury";
        window.myLine.data.datasets[0].label="Mercury";
        setFreezingBoilingPoint("Mercury","elements");
        moleculenum=40;
    } else if (ID == 5) {
        img = loadImage('assets/Bromine.png');
        document.getElementById("molimg").src="assets/Bromine.png";
        document.getElementById("molname").innerHTML="Bromine";
        window.myLine.data.datasets[0].label="Bromine";
        setFreezingBoilingPoint("Bromine","compounds");
        moleculenum=15;
    } else if (ID == 6) {
        img = loadImage('assets/Silver.png');
        document.getElementById("molimg").src="assets/Silver.png";
        document.getElementById("molname").innerHTML="Silver";
        window.myLine.data.datasets[0].label="Silver";
        setFreezingBoilingPoint("Silver","compounds");
        moleculenum=28;
    } else if (ID == 7) {
        img = loadImage('assets/SiliconDioxide.png');
        document.getElementById("molimg").src="assets/SiliconDioxide.png";
        document.getElementById("molname").innerHTML="SiliconDioxide";
        window.myLine.data.datasets[0].label="SiliconDioxide";
        setFreezingBoilingPoint("Silicon-Dioxide","compounds");
        moleculenum=20;
    }
    setup();
}

function setMoleculeSim5(ID){

    molID=1;
    stackCounter=0;
    if (ID == 1) {
        img = loadImage('assets/Water.png');
        img1 = loadImage('assets/Bromine.png');
        document.getElementById("molimg").src="assets/Water.png";
        document.getElementById("molname").innerHTML="Water";
        window.myLine.data.datasets[0].label="Water";
        moleculenum=40;
        moleculenum1=12;
        molname="Water";
        molname1="Bromine";
        if(window.myLine.data.datasets.length==3)
            removeDataset();
    } else if (ID == 2) {
        img = loadImage('assets/Water.png');
        img1 = loadImage('assets/Mercury.png');
        document.getElementById("molimg").src="assets/Water.png";
        document.getElementById("molname").innerHTML="Water";
        window.myLine.data.datasets[0].label="Water";
        window.myLine.data.datasets[1].label="Mercury";
        moleculenum=28;
        moleculenum1=20;
        molname="Water";
        molname1="Mercury";
        if(window.myLine.data.datasets.length==3)
            removeDataset();
       
    } else if (ID == 3) {
        img = loadImage('assets/Water.png');
        img1 = loadImage('assets/HydrogenPeroxide.png');
        document.getElementById("molimg").src="assets/Water.png";
        document.getElementById("molname").innerHTML="Water";
        window.myLine.data.datasets[0].label="Water";
        window.myLine.data.datasets[1].label="HydrogenPeroxide";
        moleculenum=28;
        moleculenum1=20;
        molname="Water";
        molname1="Hydrogen-Peroxide";
        if(window.myLine.data.datasets.length==3)
            removeDataset();
        
    } else if (ID == 4) {
        img = loadImage('assets/Water.png');
        img1 = loadImage('assets/Pentane.png');
        document.getElementById("molimg").src="assets/Water.png";
        document.getElementById("molname").innerHTML="Water";
        window.myLine.data.datasets[0].label="Water";
        window.myLine.data.datasets[1].label="Pentane";
        moleculenum=40;
        moleculenum1=6;
        molname="Water";
        molname1="Pentane";
        if(window.myLine.data.datasets.length==3)
            removeDataset();
        
    } else if (ID == 5) {
        img = loadImage('assets/Water.png');
        img1 = loadImage('assets/Bromine.png');
        img2 = loadImage('assets/HydrogenPeroxide.png');
        document.getElementById("molimg").src="assets/Water.png";
        document.getElementById("molname").innerHTML="Water";
        window.myLine.data.datasets[0].label="Water";
        window.myLine.data.datasets[1].label="Bromine";
        moleculenum=28;
        moleculenum1=6;
        moleculenum2=6;
        molname="Water";
        molname1="Bromine";
        molname2="Hydrogen-Peroxide";
        if(window.myLine.data.datasets.length==3)
            window.myLine.data.datasets[2].label="HydrogenPeroxide";
        else
            addDataset("HydrogenPeroxide")
        
    } else if (ID == 6) {
        img = loadImage('assets/Water.png');
        img1 = loadImage('assets/Pentane.png');
        img2 = loadImage('assets/Bromine.png');
        document.getElementById("molimg").src="assets/Water.png";
        document.getElementById("molname").innerHTML="Water";
        window.myLine.data.datasets[0].label="Water";
        window.myLine.data.datasets[1].label="Pentane";
        moleculenum=28;
        moleculenum1=6;
        moleculenum2=6;
        molname="Water";
        molname1="Pentane";
        molname2="Bromine";
        if(window.myLine.data.datasets.length==3)
            window.myLine.data.datasets[2].label="Bromine";
        else
            addDataset("Bromine")
    }
    setup();

}

function setFreezingBoilingPoint(name,type){
    
    switch(type){

        case "compounds":
        for(i = 0 ; i < compounds.length ; i++) //array to check each record
        {
            if(compounds[i].name == name)
            {
                freezingPoint=compounds[i].freezingPointCelsius;
                boilingPoint=compounds[i].boilingPointCelsius;
                radius=compounds[i].radius;
                break;
            }
        }
        break;
        case "elements":
        for(i = 0 ; i < elements.length ; i++) //array to check each record
        {
            if(elements[i].name == name)
            {
                freezingPoint=elements[i].freezingPointKelvin;
                boilingPoint=elements[i].boilingPointKelvin;
                radius=elements[i].radius;
                break;
            }
       }
       break;
    }
}

function getRadius(name,type){

    switch(type){

        case "compounds":
        for(i = 0 ; i < compounds.length ; i++) //array to check each record
        {
            if(compounds[i].name == name)
            {
                radius=compounds[i].radius;
                break;
            }
        }
        break;
        case "elements":
        for(i = 0 ; i < elements.length ; i++) //array to check each record
        {
            if(elements[i].name == name)
            {
                radius=elements[i].radius;
                break;
            }
       }
       break;
    }
}

function preload(){

    img = loadImage('assets/Water.png');
    molID = 1;
    console.log(pageTitle);
    console.log(sim5);
    setFreezingBoilingPoint("Water","compounds");
    if(pageTitle==sim2){
        sliderHeat.disable();
    }
    else if (pageTitle==sim3) {
        moleculenum=40;
    }
    else if (pageTitle==sim4) {
        img = loadImage('assets/HydrogenPeroxide.png');
        img1 = loadImage('assets/Water.png');
        img2 = loadImage('assets/Oxygen.png');
        document.getElementById("molimg").src="assets/HydrogenPeroxide.png";
        document.getElementById("molname").innerHTML="HydrogenPeroxide";
        window.myLine.data.datasets[0].label="HydrogenPeroxide";
        setFreezingBoilingPoint("Hydrogen-Peroxide","compounds");
        moleculenum=20;
        addDataset("Water");
        addDataset("Oxygen");
    }
    else if(pageTitle==sim5){
        sliderHeat.disable();
        img = loadImage('assets/Water.png');
        img1 = loadImage('assets/Bromine.png');
        document.getElementById("molimg").src="assets/Water.png";
        document.getElementById("molname").innerHTML="Water";
        window.myLine.data.datasets[0].label="Water";
        moleculenum=40;
        moleculenum1=12;
        molname="Water";
        molname1="Bromine";
        addDataset("Bromine");
    }
}

function setup() {

    imageMode(CENTER);
    frameRate(15);

    //shasaboo
    stackCounter=0;

    //Create and position the canvas
    canvasHeight = window.innerHeight*0.85;
    canvasWidth = window.innerWidth*0.7;
    
    cnv = createCanvas(canvasWidth, canvasHeight);
    cnv.position(0.3*window.innerWidth, 0.15*window.innerHeight);

    //create an engine
    engine = Engine.create();
    world = engine.world;

    //set gravity parameters
    var gravityX = world.gravity.x;
    var gravityY = world.gravity.y;

    //add rectangles/floors
    var params1 = {
        isStatic: true,
        restitution: 1.0
    }

    var params = {
        isStatic: true
    }
    var ground = Bodies.rectangle(width / 2, height, width, 0.04*height*2, params1);
    var wall1 = Bodies.rectangle(0, height / 2, 0.016*width*2, height, params);
    var wall2 = Bodies.rectangle(width, height / 2, 0.016*width*2, height, params);
    var top = Bodies.rectangle(width / 2, 0, width, 0.025*height*2, params);
    p = Bodies.rectangle(width / 2, 0, width, 0.025*height*2, params);
    World.add(world, [ground, wall1, wall2, top, p]);

    //RESET
    //slider
    document.getElementById("heatValue").innerHTML=0;
    sliderHeat.setValue(0);

    //timer
    totalSeconds=0;
    clearInterval(timerVar);
    var hour = Math.floor(totalSeconds /3600);
    var minute = Math.floor((totalSeconds - hour*3600)/60);
    seconds = totalSeconds - (hour*3600 + minute*60);
    timervalue = hour + ":" + minute + ":" + seconds;
    document.getElementById("timer").innerHTML = timervalue;

    //Graph
    removeData();

    //Room Temperature
    currRoomTemp = idealRoomTemp;
    document.getElementById("tempval").innerHTML = currRoomTemp.toFixed(3);

    //reset bodies to 0
    bodies = [];
    bodynumber = [];
    bodyType = [];

    //reset total molecules
    totalMolecules=0;
    totalMolecules1=0;
    totalMolecules2=0;

    //add circle stack
    if(sim5==pageTitle){
        getRadius(molname,"compounds");
        x=50;
        y=30;
        addMolecules(moleculenum,molID);
        if(molname1=="Mercury")
            getRadius(molname1,"elements");
        else
            getRadius(molname1,"compounds");
        x=430;
        y=30;
        addMolecules(moleculenum1,2);
        if(window.myLine.data.datasets.length==3){
            getRadius(molname2,"compounds");
            x=600;
            y=30;
            addMolecules(moleculenum2,3);
        } 
    }
    else
        addMolecules(moleculenum,molID);
    pause();

}

prevSpeed=0;

function draw() {
    
    background(70);
    piston();
    var timescale=document.getElementById("speedValue").innerHTML;
    if(prevSpeed!=timescale){
        engine.timing.timeScale = timescale;
        prevSpeed = timescale;
    }
    drawinitialsetup();
    setHeatLine();
    if(prevSpeed==0)
        return;
    Engine.update(engine);

    //heat slider value
    val = document.getElementById("heatValue").innerHTML;
    var intValtemp = currRoomTemp;

    for (var i = 0; i < bodies.length; i++) {
        for (var j = 0; j < bodies.length; j++) {
           if (i != j) {
                test = intersects(bodynumber[i], bodynumber[j]);
                randomnum = Math.floor((Math.random() * 100) + 1);
                if (test == true) //that means collision occured
               {
                    if (intValtemp > boilingPoint && randomnum > 80) //randommnum is probability of conversion
                    {
                        if(bodyType[i]==1 && bodyType[j]==1 && pageTitle==sim4){
                            //Change one to Water and other to Oxygen 
                            bodyType[i] = 2;
                            bodyType[j] = 3;
                            //create a new Water Molecule
                            addWater(j);
                            //Set their positions
                            bodyPositionX[i] = bodies[j].position.x;
                            bodyPositionY[i] = bodies[j].position.y; 
                            //Increment the count of molecules
                            totalMolecules1+=2;
                            totalMolecules2++;
                            totalMolecules-=2;
                        }
                    }
                }
            }
        }
    }


    //heatslider changes with value
    if (intValtemp > boilingPoint) {
        world.gravity.y = 0;
    } else if (intValtemp < freezingPoint) {
        world.gravity.y = 0.3;
        applyforce(0.005);
    } else if (intValtemp < boilingPoint) {
        world.gravity.y = 0.3;
        applyforce(0.00005);
    }

    //Applying attrcative forces between all molecules
    function applyforce(mag) {
        for (var i = 0; i < bodies.length; i++) {
            for (var j = 0; j < bodies.length; j++) {
                var pvector = createVector((bodynumber[i].position.x), (bodynumber[i].position.y));
                var p2vector = createVector((bodynumber[j].position.x), (bodynumber[j].position.y));
                var distforce = dist(bodynumber[i].position.x, bodynumber[i].position.y, bodynumber[j].position.x, bodynumber[j].position.y);
                var diffvector = p5.Vector.sub(pvector, p2vector);
                diffvector.normalize();
                diffvector.mult(mag);
                //line(diffvector);
                if (distforce > 40) {
                    Matter.Body.applyForce(bodynumber[j], p2vector, diffvector);
                }
            }
        }
    }
    for (i = 0; i < bodies.length; i++) {
        collides(bodynumber[i]);
    }

    function collides(circlebody) { //implements ground collision

        collisionHeight = (circlebody.position.y + 20);

        if (collisionHeight >= (height - 35) && circlebody.collideFlag == -1) {

            gcoll += 1;
            circlebody.collideFlag = 1;

            intVal = document.getElementById("heatValue").innerHTML;

            if (intVal == 0) {
                intVal = idealRoomTemp;
            } else {
                intVal = intVal < 0 ? intVal * OneNegUnit + idealRoomTemp : intVal * OnePosUnit + idealRoomTemp;
            }

            //set current rate change according to currRoomTemp
            currRateChange = currRoomTemp < idealRoomTemp ? RateOfChangeNeg : RateOfChangePos;

            if (currRoomTemp > intVal) {
                currRoomTemp = currRoomTemp - currRateChange;
                if (currRoomTemp < intVal) {
                    currRoomTemp = intVal;
                }
            }
            if (currRoomTemp < intVal) {
                currRoomTemp = currRoomTemp + currRateChange;
                if (currRoomTemp > intVal) {
                    currRoomTemp = intVal;
                }
            }

            //Add temperature value onscreen
            document.getElementById("tempval").innerHTML = currRoomTemp.toFixed(3);

            bodycolgrnd.push(circlebody);
            if (val == 0) {
                circlebody.velocity.y = -abs(circlebody.velocity.x);
            } else if (val > 0) {
                circlebody.velocity.y = -2 * abs(circlebody.velocity.x);
                Ke += Ke;
            } else if (val < 0) {
                Ke -= Ke;
            }
        } else {

            if ((circlebody.position.y + 20) < (height - 35)) {
                circlebody.collideFlag = -1;
            } else // if collision not detected only due to the reason it was already in collided positon 
            {
                if (intVal < idealRoomTemp) // special case to deal for negative slider position, because molecules will remain in touch with bar
                {
                    //Probability for detection should be managed in case of negative slider position
                    if ((Math.random() * (11 - 1) + 1) < 3) // generate random num b/w 1 and 10
                    {
                        circlebody.collideFlag = -1;
                    }
                }
            }
        }
    }

    //set forces after and before separation
    if (gcoll == 0) {
        applyforce(0.0008);
        var mag = 0.0008;
    } else {
        applyforce(0);
        mag = 0;
    }

    //check circle collision
    function intersects(first, other) {
        var test=false;
        var d = dist(first.position.x, first.position.y, other.position.x, other.position.y);
        if (d <= 56) {
            first.velocity.x = -abs(first.velocity.x);
            first.velocity.y = -abs(first.velocity.y);
            other.velocity.x = -abs(other.velocity.x);
            other.velocity.y = -abs(other.velocity.y);
            test = true;
        }
        return test;
    }

    //Apply force between molecules
    for (var i = 0; i < bodies.length; i++) {
        var positionvec = createVector((bodynumber[i].position.x), (bodynumber[i].position.y));
        var v = createVector((0.02 * random(-1, 1)), (0.05 * random(-1, 1)));
        Matter.Body.applyForce(bodynumber[i], positionvec, v);
    }
}


function drawinitialsetup() {
    
    drawcircle();

    //draw floor
    stroke(108, 108, 108);
    strokeWeight(10);
    
    //bottom wall
    fill(108, 108, 108);
    rect(0, height - 0.04*height, width, 0.04*height);

    //left wall
     fill(108, 108, 108);
     rect(0, 0, 0.016*width, height);

     //right wall
     fill(108, 108, 108);
     rect(width - 15, 0, 0.016*width, height);

     //top wall
     fill(108, 108, 108);
     rect(0, 0, width, 0.025*height);
}

function setHeatLine(){

    var heat=document.getElementById("heatValue").innerHTML;
    if(heat>0)
        stroke(255*(heat/5), 0, 0);
    else if(heat<0)
        stroke(0, 0, 255*(-heat/5));
    strokeWeight(10);
    line(25, height - 0.04*height, width-25, height - 0.04*height);
}

function piston(){

     var params = {
        isStatic: true
    }
    var h= document.getElementById("volumeValue").innerHTML;

    World.remove(world,p);
    p = Bodies.rectangle(width / 2, 0+Number(h), width, 0.025*height*2, params);
    World.add(world, p);

    //piston wall
    fill(108, 108, 108);
    rect(0, 0+Number(h), width, 0.025*height);
}

function drawcircle() {
    stroke(255);
    strokeWeight(2);
    fill(255, 50);
    for (var i = 0; i < bodies.length; i++) {

        var circle = bodies[i];
        var pos = circle.position;
        var r = 20;
        var angle = circle.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);

        if(bodyType[i]==2)
            image(img1, 0, 0);
        else if(bodyType[i]==3)
            image(img2, 0, 0);
        else
            image(img, 0, 0);
        pop();
    }
}
function setHeatSliderVal(){
    document.getElementById("heatValue").innerHTML=document.getElementById("ex4").value;
}
function setSpeedSliderVal(){
    document.getElementById("speedValue").innerHTML=document.getElementById("ex2").value;
}
function setVolumeSliderVal(){
    document.getElementById("volumeValue").innerHTML=document.getElementById("ex3").value;
}
function setAddMoleculeLabel(){
    document.getElementById("moleculeval").innerHTML=document.getElementById("ex1").value;
}

function addMoleculesBtn(){
    addMolecules(document.getElementById("moleculeval").innerHTML,molID);
}

function setrowcolumn(number){

    if(number==28){
        row=7;
        column=4;
    }
    if(number==20){
        row=5;
        column=4;
    }
    if(number==12){
        row=4;
        column=3;
    }
    if(number==15){
        row=5;
        column=3;
    }
    if(number==40){
        row=8;
        column=5;
    }
    if (number<=10) {
        column=number/2;
        row=number/column;
    }

}

function makeCircle(x, y) {
    var params = {
        restitution: 1.0,
        friction: 0,
        offset: 0,
        mass: 18,
        collideFlag: -1

    }
    return Bodies.circle(x, y, radius, params);
}

function addMolecules(number,ID){

    setrowcolumn(number);

    // x, y, columns, rows, column gap, row gap
    stack[stackCounter] = Composites.stack(x, y, row, column, 0, 0, makeCircle);
    if(ID==1)
        totalMolecules+=row*column;
    else if(ID==2)
        totalMolecules1+=row*column;
    else
        totalMolecules2+=row*column;
    World.add(world, stack[stackCounter]);
    var bodynum=bodynumber.length;
    if(bodies != undefined){
        var oldbodies=bodies;
        var newbodies= stack[stackCounter].bodies;
        bodies=oldbodies.concat(newbodies);
    }
    else{
        bodies = stack[stackCounter].bodies;
    }

    for (var i = 0; i < bodies.length; i++) {
        bodynumber[i] = bodies[i];
        // if (number>10) {
        //     bodynumber[i].isSleeping = true;
        // }
        bodyPositionX[i] = bodies[i].position.x;
        bodyPositionY[i] = bodies[i].position.y;
        if(bodyType[i]==undefined)
            bodyType[i] = ID;
    }
    stackCounter++;
}

//addWater Molecules
function addWater(j){
    stack[stackCounter]=Composites.stack(bodies[j].position.x, bodies[j].position.y, 1, 1, 0, 0, makeCircle);
    World.add(world, stack[stackCounter]);
    bodies[bodies.length] = stack[stackCounter].bodies[0];
    bodynumber[bodynumber.length] = stack[stackCounter].bodies[0];
    bodyType[bodyType.length] = 10;
    stackCounter++;
}

//start simulation
function start(){
    for (var i = 0; i < bodynumber.length ; i++){
        bodynumber[i].isSleeping = false;
    }
    timerVar = setInterval(countTimer, 1000);
}
//pause the simulation
function pause(){
    for (var i = 0; i < bodynumber.length ; i++){
        bodynumber[i].isSleeping = true;
    }
    clearInterval(timerVar);
}

//Timer
function countTimer() {
    ++totalSeconds;
    var hour = Math.floor(totalSeconds /3600);
    var minute = Math.floor((totalSeconds - hour*3600)/60);
    seconds = totalSeconds - (hour*3600 + minute*60);
    timervalue = hour + ":" + minute + ":" + seconds;
    document.getElementById("timer").innerHTML = timervalue;
    //document.getElementById("timer").style.color = "black";
    document.getElementById("timer").style.font = " bold 20px arial,serif";

    //Setting the graph
    addLabel(timervalue);
    addData(0, totalMolecules);
    if(window.myLine.data.datasets.length==2){
        addData(1, totalMolecules1);
    }
    else if(window.myLine.data.datasets.length==3){
        addData(1, totalMolecules1);
        addData(2, totalMolecules2);
    }
}
