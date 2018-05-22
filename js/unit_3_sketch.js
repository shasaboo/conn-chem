//Check for correct window size
var modal = document.getElementById('myModal');
window.onload = function() {
    if(window.innerWidth<=1278 || window.innerHeight<=700)
        modal.style.display = "block";
}
window.onresize = checksize;
function checksize() {
    if(window.innerWidth<=1278 || window.innerHeight<=700)
        modal.style.display = "block";
    else{
        modal.style.display = "none";
        location.reload();
    }
}


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
var sim1="Connected Chemistry - Scientific Observations";
var sim2="";


//store propeties of bodies
var bodynumber = [];
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
var totalMolecules3=0;
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
var xgap=0;
var ygap=0;
var mass=18.02;
var mass1=159.808;
var mass2=72.15;
var img;
var setNumber=1;
var radiusArr = [];
var massArr = [];

function getRadius(name,type){

    switch(type){

        case "compounds":
        for(i = 0 ; i < compounds.length ; i++) //array to check each record
        {
            if(compounds[i].name == name)
            {
                return compounds[i].radius;
                
            }
        }
        break;
        case "elements":
        for(i = 0 ; i < elements.length ; i++) //array to check each record
        {
            if(elements[i].name == name)
            {
                return elements[i].radius;
                
            }
       }
       break;
    }
}

function getMass(name,type){

    switch(type){

        case "compounds":
        for(i = 0 ; i < compounds.length ; i++) //array to check each record
        {
            if(compounds[i].name == name)
            {
                return compounds[i].mass;
                
            }
        }
        break;
        case "elements":
        for(i = 0 ; i < elements.length ; i++) //array to check each record
        {
            if(elements[i].name == name)
            {
                return elements[i].mass;
                
            }
       }
       break;
    }
}

function setMolecule(ID) {

    if(ID==1){
        setNumber=1;
        document.getElementById("selectset").innerHTML="Set 1";
        img = loadImage("../../assets/Chlorine.png");
        img1 = loadImage("../../assets/Sodium.png");
        img2 = loadImage("../../assets/Sodium-Chloride.png");
        radiusArr[0] = getRadius("Sodium","compounds");
        radiusArr[1] = getRadius("Chlorine","compounds");
        radiusArr[2] = getRadius("Sodium-Chloride","compounds");
        massArr[0] = getMass("Chlorine","compounds");
        massArr[1] = getMass("Sodium","compounds");
        massArr[2] = getMass("Sodium-Chloride","compounds");
        fixedDistance=radiusArr[0]+radiusArr[1];
        document.getElementById("molimg").src="../../assets/Chlorine.png";
        document.getElementById("molimg1").src="../../assets/Sodium.png";
        document.getElementById("molname").innerHTML="Chlorine";
        document.getElementById("molname1").innerHTML="Sodium";
        window.myLine.data.datasets[0].label="Chlorine";
        window.myLine.data.datasets[1].label="Sodium";
        window.myLine.data.datasets[2].label="Sodium Chloride";
        if(window.myLine.data.datasets.length==4){
            document.getElementById("molSlider1").style.display = "none";
            document.getElementById("hr1").style.display = "none";
            removeDataset();
        }
    }
    else if(ID==2){
        setNumber=2;
        document.getElementById("selectset").innerHTML="Set 2";
        img = loadImage("../../assets/Hydrogen-Iodide.png");
        img1 = loadImage("../../assets/Hydrogen.png");
        img2 = loadImage("../../assets/Iodine.png");
        radiusArr[0] = getRadius("Hydrogen-Iodide","compounds");
        radiusArr[1] = getRadius("Hydrogen","compounds");
        radiusArr[2] = getRadius("Iodine","compounds");
        massArr[0] = getMass("Hydrogen-Iodide","compounds");
        massArr[1] = getMass("Hydrogen","compounds");
        massArr[2] = getMass("Iodine","compounds");
        fixedDistance=radiusArr[0]+radiusArr[0];
        document.getElementById("molimg").src="../../assets/Hydrogen-Iodide.png";
        document.getElementById("molname").innerHTML="Hydrogen-Iodide";
        window.myLine.data.datasets[0].label="Hydrogen-Iodide";
        window.myLine.data.datasets[1].label="Hydrogen";
        window.myLine.data.datasets[2].label="Iodine";
        if(window.myLine.data.datasets.length==4){
            document.getElementById("molSlider1").style.display = "none";
            document.getElementById("hr1").style.display = "none";
            removeDataset();
        }
    }
    else if(ID==3){
        setNumber=3;
        document.getElementById("selectset").innerHTML="Set 3";
        img = loadImage("../../assets/Ethene.png");
        img1 = loadImage("../../assets/Oxygen.png");
        img2 = loadImage("../../assets/Carbon-Dioxide.png");
        img3 = loadImage("../../assets/Water.png");
        radiusArr[0] = getRadius("Ethene","compounds");
        radiusArr[1] = getRadius("Oxygen","compounds");
        radiusArr[2] = getRadius("Carbon-Dioxide","compounds");
        radiusArr[3] = getRadius("Water","compounds");
        massArr[0] = getMass("Ethene","compounds");
        massArr[1] = getMass("Oxygen","compounds");
        massArr[2] = getMass("Carbon-Dioxide","compounds");
        massArr[3] = getMass("Water","compounds");
        fixedDistance=radiusArr[0]+radiusArr[1];
        document.getElementById("molimg").src="../../assets/Ethene.png";
        document.getElementById("molimg1").src="../../assets/Oxygen.png";
        document.getElementById("molname").innerHTML="Ethene";
        document.getElementById("molname1").innerHTML="Oxygen";
        document.getElementById("molSlider1").style.display = "block";
        document.getElementById("hr1").style.display = "block";
        window.myLine.data.datasets[0].label="Ethene";
        window.myLine.data.datasets[1].label="Oxygen";
        window.myLine.data.datasets[2].label="Carbon-Dioxide";
        if(window.myLine.data.datasets.length==4)
            window.myLine.data.datasets[2].label="Water";
        else
            addDataset("Water");
    }
    else if(ID==4){
        setNumber=4;
        document.getElementById("selectset").innerHTML="Set 4";
        img = loadImage("../../assets/Copper.png");
        img1 = loadImage("../../assets/Silver-Ion.png");
        img2 = loadImage("../../assets/Nitrate.png");
        img3 = loadImage("../../assets/Water.png");
        radiusArr[0] = getRadius("Copper","compounds");
        radiusArr[1] = getRadius("Silver-Ion","compounds");
        radiusArr[2] = getRadius("Nitrate","compounds");
        radiusArr[3] = getRadius("Water","compounds");
    }
    else if(ID==5){
        setNumber=5;
        document.getElementById("selectset").innerHTML="Set 5";
        img = loadImage("../../assets/Methane.png");
        img1 = loadImage("../../assets/Oxygen.png");
        img2 = loadImage("../../assets/Carbon-Dioxide.png");
        img3 = loadImage("../../assets/Water.png");
        radiusArr[0] = getRadius("Methane","compounds");
        radiusArr[1] = getRadius("Oxygen","compounds");
        radiusArr[2] = getRadius("Carbon-Dioxide","compounds");
        radiusArr[3] = getRadius("Water","compounds");
        massArr[0] = getMass("Methane","compounds");
        massArr[1] = getMass("Oxygen","compounds");
        massArr[2] = getMass("Carbon-Dioxide","compounds");
        massArr[3] = getMass("Water","compounds");
        fixedDistance=radiusArr[0]+radiusArr[1];
        document.getElementById("molimg").src="../../assets/Methane.png";
        document.getElementById("molimg1").src="../../assets/Oxygen.png";
        document.getElementById("molname").innerHTML="Methane";
        document.getElementById("molname1").innerHTML="Oxygen";
        document.getElementById("molSlider1").style.display = "block";
        document.getElementById("hr1").style.display = "block";
        window.myLine.data.datasets[0].label="Methane";
        window.myLine.data.datasets[1].label="Oxygen";
        window.myLine.data.datasets[2].label="Carbon-Dioxide";
        if(window.myLine.data.datasets.length==4)
            window.myLine.data.datasets[3].label="Water";
        else
            addDataset("Water");
    }
    else if(ID==8){
        setNumber=8;
        document.getElementById("selectset").innerHTML="Set 8";
        img = loadImage("../../assets/Chlorine.png");
        img1 = loadImage("../../assets/Hydrogen.png");
        img2 = loadImage("../../assets/Hydrochloric-Acid.png");
        radiusArr[0] = getRadius("Chlorine","compounds");
        radiusArr[1] = getRadius("Hydrogen","compounds");
        radiusArr[2] = getRadius("Hydrochloric-Acid","compounds");
        massArr[0] = getMass("Chlorine","compounds");
        massArr[1] = getMass("Hydrogen","compounds");
        massArr[2] = getMass("Hydrochloric-Acid","compounds");
        fixedDistance=radiusArr[0]+radiusArr[1];
        document.getElementById("molimg").src="../../assets/Chlorine.png";
        document.getElementById("molimg1").src="../../assets/Hydrogen.png";
        document.getElementById("molname").innerHTML="Chlorine";
        document.getElementById("molname1").innerHTML="Hydrogen";
        window.myLine.data.datasets[0].label="Chlorine";
        window.myLine.data.datasets[1].label="Hydrogen";
        window.myLine.data.datasets[2].label="Hydrogen Chloride";
        if(window.myLine.data.datasets.length==4){
            removeDataset();
        }
    }
    else if(ID==9){
        setNumber=9;
        document.getElementById("selectset").innerHTML="Set 9";
        img = loadImage("../../assets/HydrogenPeroxide.png");
        img1 = loadImage("../../assets/Water.png");
        img2 = loadImage("../../assets/Oxygen.png");
        radiusArr[0] = getRadius("Hydrogen-Peroxide","compounds");
        massArr[0] = getMass("Hydrogen-Peroxide","compounds");
        massArr[1] = getMass("Water","compounds");
        massArr[2] = getMass("Oxygen","compounds");
        fixedDistance=radiusArr[0]+radiusArr[0];
        document.getElementById("molimg").src="../../assets/HydrogenPeroxide.png";
        document.getElementById("molname").innerHTML="Hydrogen Peroxide";
        document.getElementById("molSlider1").style.display = "block";
        document.getElementById("hr1").style.display = "block";
        window.myLine.data.datasets[0].label="Hydrogen Peroxide";
        window.myLine.data.datasets[1].label="Water";
        window.myLine.data.datasets[2].label="Oxygen";
        if(window.myLine.data.datasets.length==4){
            removeDataset();
        }
    }
    setup();
    
}

function preload(){

    pistonImg = loadImage("../../assets/base.png");
    img = loadImage("../../assets/Chlorine.png");
    img1 = loadImage("../../assets/Sodium.png");
    img2 = loadImage("../../assets/Sodium-Chloride.png");
    radiusArr[0] = getRadius("Sodium","compounds");
    radiusArr[1] = getRadius("Chlorine","compounds");
    radiusArr[2] = getRadius("Sodium-Chloride","compounds");
    massArr[0] = getMass("Chlorine","compounds");
    massArr[1] = getMass("Sodium","compounds");
    massArr[2] = getMass("Sodium-Chloride","compounds");
    fixedDistance=radiusArr[0]+radiusArr[1];
    document.getElementById("molimg").src="../../assets/Chlorine.png";
    document.getElementById("molimg1").src="../../assets/Sodium.png";
    document.getElementById("molname").innerHTML="Chlorine";
    document.getElementById("molname1").innerHTML="Sodium";
    window.myLine.data.datasets[0].label="Chlorine";
    addDataset("Sodium");
    addDataset("Sodium Chloride");
    document.getElementById("selectset").innerHTML="Set 1";
}

function setup() {
    //imageMode(CENTER);
    frameRate(15);

    //Reset stack counter
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
        isStatic: true,
        restitution: 1.0
    }
    var ground = Bodies.rectangle(width / 2, height, width, 0.04*height*2, params1);
    var wall1 = Bodies.rectangle(0, height / 2, 0.016*width*2, height, params);
    var wall2 = Bodies.rectangle(width, height / 2, 0.016*width*2, height, params);
    var top = Bodies.rectangle(width / 2, 0, width, 0.025*height*2, params);
    World.add(world, [ground, wall1, wall2, top]);

    //RESET
    //slider
    document.getElementById("heatValue").innerHTML=0;
    sliderHeat.setValue(0);
    document.getElementById("volumeValue").innerHTML=0;
    sliderVolume.setValue(0);
    document.getElementById("speedValue").innerHTML=1;
    sliderSpeed.setValue(1);
    document.getElementById("moleculeval").innerHTML=2;
    sliderAddMolecule.setValue(2);
    document.getElementById("moleculeval1").innerHTML=2;
    sliderAddMolecule1.setValue(2);
    sliderVolume.disable();
    sliderHeat.disable();

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

    //reset bodies to 0
    bodies = [];
    bodynumber = [];
    bodyType = [];

    //set gravity to 0
    world.gravity.y = 0;

    //reset total molecules
    totalMolecules=0;
    totalMolecules1=0;
    totalMolecules2=0;
    totalMolecules3=0;

    if(setNumber==1){
        x=80;
        y=height-140;
        xgap=65;
        ygap=10;

        //Sodium
        radius=radiusArr[0];
        addMolecules(7,2);
        x=130;
        y=height-105;
        addMolecules(7,2);  
        //Chlorine  
        radius=radiusArr[1];
        addScatteredMolecules(12,1);

        for (var i = 0; i < bodies.length; i++) {
            if (bodyType[i]==2) {
                bodynumber[i].isStatic = true;
                bodies[i].isStatic = true;
            }   
        }
    }
    else if(setNumber==2){
        radius=radiusArr[0];
        addScatteredMolecules(4,1);
    }
    else if(setNumber==3 || setNumber==5){
        radius=radiusArr[0];
        addScatteredMolecules(5,1);
        radius=radiusArr[1];
        addScatteredMolecules(15,2);
    }
    else if(setNumber==4){
        x=580;
        y=height-70
        xgap=10;
        ygap=0;
        radius=radiusArr[0];
        addMolecules(4,1);
        radius=radiusArr[1];
        addScatteredMolecules(8,2);
        radius=radiusArr[2];
        addScatteredMolecules(8,3);
        radius=radiusArr[3];
        addScatteredMolecules(16,4);
        world.gravity.y=0.3;
    }
    else if(setNumber==8){
        radius=radiusArr[0];
        addScatteredMolecules(10,1);
        radius=radiusArr[1];
        addScatteredMolecules(15,2);
    }
    else if(setNumber==9){
        radius=radiusArr[0];
        addScatteredMolecules(12,1);
    }
    pause();
}

prevSpeed=0;
angularSpeed=0;
speed=0;

function draw() {

    angularSpeed=0;
    speed=0;
    angularVelocity=0;

    background(70);
    var timescale=document.getElementById("speedValue").innerHTML;
    if(prevSpeed!=timescale){
        engine.timing.timeScale = timescale;
        prevSpeed = timescale;
    }
    drawinitialsetup();
    if(prevSpeed==0)
        return;
    if(bodies[0].isSleeping && setNumber!=1)
        return;
    Engine.update(engine);

    if(totalSeconds<1 && setNumber!=4){
        for (var i = 0; i < bodies.length; i++) {
            randomnum = Math.floor((Math.random() * 4) + 1);
            if(randomnum==1)
                Matter.Body.applyForce( bodies[i], {x: bodies[i].position.x, y: bodies[i].position.y}, {x: 0.009, y: 0});
            else if(randomnum==2)
                Matter.Body.applyForce( bodies[i], {x: bodies[i].position.x, y: bodies[i].position.y}, {x: 0, y: 0.009});
            else if(randomnum==3)
                Matter.Body.applyForce( bodies[i], {x: bodies[i].position.x, y: bodies[i].position.y}, {x: -0.009, y: 0});
            else if(randomnum==4)
                Matter.Body.applyForce( bodies[i], {x: bodies[i].position.x, y: bodies[i].position.y}, {x: 0, y: -0.009});
        }
    }

    for (var i = 0; i < bodies.length; i++) {
        for (var j = 0; j < bodies.length; j++) {
            if(setNumber==1){
                if (i != j && (bodyType[i]==1 && bodyType[j]==2) && j<7) {
                    test = intersects(bodynumber[i], bodynumber[j]);
                    randomnum = Math.floor((Math.random() * 100) + 1);
                    if (test == true) //that means collision occured
                    {
                        if (randomnum > 75) //randommnum is probability of conversion
                        {
                            bodyType[j] = 3;
                            bodyType[j+7] = 3;

                            bodies[j].radius = radiusArr[2];
                            bodies[j+7].radius = radiusArr[2];

                            bodies[j].position.y=bodies[j].position.y-50;
                            bodies[j+7].position.y=bodies[j+7].position.y-50;

                            bodyType.splice(i, 1);
                            bodies.splice(i, 1);
                            bodynumber.splice(i, 1);

                            totalMolecules--;
                            totalMolecules1-=2;
                            totalMolecules2+=2;
                        }
                    }
                }
            }
            else if (setNumber==2) {
                if (i != j && (bodyType[i]==1 && bodyType[j]==1)) {
                    test = intersects(bodynumber[i], bodynumber[j]);
                    randomnum = Math.floor((Math.random() * 100) + 1);
                    if (test == true) //that means collision occured
                    {
                        if (randomnum > 75) //randommnum is probability of conversion
                        {
                            //Change one to Hydrogen and other to Iodine 
                            bodyType[i] = 2;
                            bodyType[j] = 3;

                            bodies[i].radius = radiusArr[1];
                            bodies[j].radius = radiusArr[2];

                            totalMolecules-=2;
                            totalMolecules1++;
                            totalMolecules2++;
                        }
                    }
                }
            }
            else if (setNumber==3) {
                if (i != j && (bodyType[i]==1 && bodyType[j]==2)) {
                    test = intersects(bodynumber[i], bodynumber[j]);
                    randomnum = Math.floor((Math.random() * 100) + 1);
                    if (test == true) //that means collision occured
                    {
                        if (randomnum > 75) //randommnum is probability of conversion
                        {
                            //Change one to Hydrogen and other to Iodine 
                            bodyType[i] = 3;
                            bodyType[j] = 3;
                            radius=radiusArr[3];
                            addWater(j,4);
                            addWater(j,4);
                            removeMolecule(2);
                            removeMolecule(2);

                            bodies[i].radius = radiusArr[2];
                            bodies[j].radius = radiusArr[2];

                            totalMolecules--;
                            totalMolecules1-=3;
                            totalMolecules2+=2;
                            totalMolecules3+=2;
                        }
                    }
                }
            }
            else if (setNumber==5) {
                if (i != j && (bodyType[i]==1 && bodyType[j]==2)) {
                    test = intersects(bodynumber[i], bodynumber[j]);
                    randomnum = Math.floor((Math.random() * 100) + 1);
                    if (test == true) //that means collision occured
                    {
                        if (randomnum > 75) //randommnum is probability of conversion
                        {
                            //Change one to Hydrogen and other to Iodine 
                            bodyType[i] = 3;
                            bodyType[j] = 4;
                            radius=radiusArr[3];
                            addWater(j,4);
                            removeMolecule(2);

                            bodies[i].radius = radiusArr[2];
                            bodies[j].radius = radiusArr[3];

                            totalMolecules--;
                            totalMolecules1-=2;
                            totalMolecules2+=1;
                            totalMolecules3+=2;
                        }
                    }
                }
            }
            else if (setNumber==8) {
                if (i != j && (bodyType[i]==1 && bodyType[j]==2)) {
                    test = intersects(bodynumber[i], bodynumber[j]);
                    randomnum = Math.floor((Math.random() * 100) + 1);
                    if (test == true) //that means collision occured
                    {
                        if (randomnum > 75) //randommnum is probability of conversion
                        {
                            //Change one to Hydrogen and other to Iodine 
                            bodyType[i] = 3;
                            bodyType[j] = 3;

                            bodies[i].radius = radiusArr[2];
                            bodies[j].radius = radiusArr[2];

                            totalMolecules--;
                            totalMolecules1--;
                            totalMolecules2+=2;
                        }
                    }
                }
            }
            else if (setNumber==9) {
                if (i != j && (bodyType[i]==1 && bodyType[j]==1)) {
                    test = intersects(bodynumber[i], bodynumber[j]);
                    randomnum = Math.floor((Math.random() * 100) + 1);
                    if (test == true) //that means collision occured
                    {
                        if (randomnum > 75) //randommnum is probability of conversion
                        {
                                //Change one to Water and other to Oxygen 
                                bodyType[i] = 2;
                                bodyType[j] = 3;
                                //create a new Water Molecule
                                addWater(j,3);
                                //Increment the count of molecules
                                totalMolecules-=2;
                                totalMolecules1++;
                                totalMolecules2+=2;
                        }
                    }
                }
            }
        }
    }

    if(setNumber==4){
        applyforce(0.000002);
    }

    function applyforce(mag) {
        for (var i = 0; i < bodies.length; i++) {
            for (var j = 0; j < bodies.length; j++) {
                var pvector = createVector((bodynumber[i].position.x), (bodynumber[i].position.y));
                var p2vector = createVector((bodynumber[j].position.x), (bodynumber[j].position.y));
                var distforce = dist(bodynumber[i].position.x, bodynumber[i].position.y, bodynumber[j].position.x, bodynumber[j].position.y);
                var diffvector = p5.Vector.sub(pvector, p2vector);
                diffvector.normalize();
                diffvector.mult(mag);
                if (distforce > 40) {
                    Matter.Body.applyForce(bodynumber[j], p2vector, diffvector);
                }
            }
        }
    }

    //check circle collision
    function intersects(first, other) {
        var test=false;
        var d = dist(first.position.x, first.position.y, other.position.x, other.position.y);
        if (d <= fixedDistance) {
            first.velocity.x = -abs(first.velocity.x);
            first.velocity.y = -abs(first.velocity.y);
            other.velocity.x = -abs(other.velocity.x);
            other.velocity.y = -abs(other.velocity.y);
            test = true;
        }
        return test;
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

//Not needed in Unit 3
function piston(){

     var params = {
        isStatic: true
    }
    var h= document.getElementById("volumeValue").innerHTML;

    World.remove(world,p);
    p = Bodies.rectangle(width / 2, 0+Number(h), width, 0.025*height*2, params);
    World.add(world, p);

    //piston wall
    fill(70, 70, 70);
    stroke(70);
    strokeWeight(0.025*height);
    rect(0, 0+Number(h), width, 0.025*height);
    image(pistonImg, width/2, 0+Number(h),width-40, 30);
}

function drawcircle() {
    stroke(255);
    strokeWeight(2);
    fill(255, 50);
    for (var i = 0; i < bodies.length; i++) {

        var circle = bodies[i];
        var pos = circle.position;
        var r = circle.radius;
        var angle = circle.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);

        if(bodyType[i]==2)
            image(img1, 0, 0);
        else if(bodyType[i]==3)
            image(img2, 0, 0);
        else if(bodyType[i]==1)
            image(img, 0, 0);
        else
            image(img3, 0, 0);
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
function setAddMoleculeLabel1(){
    document.getElementById("moleculeval1").innerHTML=document.getElementById("ex5").value;
}
function setAddMoleculeLabel2(){
    document.getElementById("moleculeval2").innerHTML=document.getElementById("ex6").value;
}

function addMoleculesBtn(){
    x=320;
    y=30;
    addMolecules(document.getElementById("moleculeval").innerHTML,molID);
}
function addMoleculesBtn1(ID){
    x=320;
    y=30;
    if(ID==2)
        addMolecules(document.getElementById("moleculeval1").innerHTML,ID);
    else
        addMolecules(document.getElementById("moleculeval2").innerHTML,ID);
}

function setrowcolumn(number){

    if(number==14){
        row=7;
        column=2;
    }
    else if(number==7){
        row=7;
        column=1;
    }
    else if(number==4){
        row=4;
        column=1;   
    }
}

function makeCircle(x, y) {
    var params = {
        restitution: 1.0,
        friction: 0,
        offset: 0,
        mass: 0,
        collideFlag: -1,
        frictionAir: 0,
        frictionStatic: 0,
        inertia: Infinity
    }
    var params1 = {
        restitution: 1.0,
        friction: 0,
        offset: 0,
        mass: 0,
        collideFlag: -1,
        frictionAir: 0,
        //inertia: Infinity,
        frictionStatic: 0
    }
    if(setNumber==4)
        return Bodies.circle(x, y, radius, params1);
    else
        //return Bodies.circle(x, y, radius, params);
        return Bodies.polygon(x, y, 50, radius, params);
    
}

function addWater(j,type){
    stack[stackCounter]=Composites.stack(bodies[j].position.x, bodies[j].position.y, 1, 1, 0, 0, makeCircle);
    World.add(world, stack[stackCounter]);
    bodies[bodies.length] = stack[stackCounter].bodies[0];
    bodynumber[bodynumber.length] = stack[stackCounter].bodies[0];
    bodyType[bodyType.length] = type;
    stackCounter++;
}
function removeMolecule(type){
    
    for (var i = 0; i < bodies.length; i++) {
        if(bodyType[i]==type){
            bodyType.splice(i, 1);
            bodies.splice(i, 1);
            bodynumber.splice(i, 1);
            break;
        }
    }
}

function addMolecules(number,ID){

    setrowcolumn(number);

    // x, y, columns, rows, column gap, row gap
    stack[stackCounter] = Composites.stack(x, y, row, column, xgap, ygap, makeCircle);
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
        if(bodyType[i]==undefined)
            bodyType[i] = ID;
    }
    stackCounter++;
}

function addScatteredMolecules(molNum,ID){

    for (var i = 0; i < molNum; i++) {

        var randomx = (Math.random() * 800) + 10;
        var randomy = (Math.random() * 400) + 10;
        stack[stackCounter]=Composites.stack(randomx, randomy, 1, 1, 0, 0, makeCircle);
        World.add(world, stack[stackCounter]);
        bodies[bodies.length] = stack[stackCounter].bodies[0];
        bodynumber[bodynumber.length] = stack[stackCounter].bodies[0];
        bodyType[bodyType.length] = ID;
        stackCounter++;
    }
    if(ID==1)
        totalMolecules+=molNum;
    else if(ID==2)
        totalMolecules1+=molNum;
    else
        totalMolecules2+=molNum;

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
    angularSpeed=0;
    speed=0;
    for (var i = 0; i < bodies.length; i++) {
        angularSpeed+=bodies[i].angularSpeed;
        speed+=bodies[i].speed;
        //console.log("Body: ("+i+") :"+bodies[i].speed);
    }
    // console.log("AS ("+totalSeconds+") :"+angularSpeed);
    // console.log("S: ("+totalSeconds+") :"+speed);

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
    m=totalMolecules*massArr[0];
    m1=totalMolecules1*massArr[1];
    m2=totalMolecules2*massArr[2];
    m3=totalMolecules3*massArr[3];
    addData(0, m);
    if(window.myLine.data.datasets.length==2){
        addData(1, m1);
    }
    else if(window.myLine.data.datasets.length==3){
        addData(1, m1);
        addData(2, m2);
    }
    else if(window.myLine.data.datasets.length==4){
        addData(1, m1);
        addData(2, m2);
        addData(3, m3);
    }    
}
