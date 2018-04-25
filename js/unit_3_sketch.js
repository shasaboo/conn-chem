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
var setNum=1;
var radiusArr = [];

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

function setMolecule(ID) {

    if(ID==1){
        setNum=1;
        img = loadImage("../../assets/Chlorine.png");
        img1 = loadImage("../../assets/Sodium.png");
        img2 = loadImage("../../assets/Sodium-Chloride.png");
        radiusArr[0] = getRadius("Sodium","compounds");
        radiusArr[1] = getRadius("Chlorine","compounds");
        radiusArr[2] = getRadius("Sodium-Chloride","compounds");
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
        setNum=2;
        img = loadImage("../../assets/Hydrogen-Iodide.png");
        img1 = loadImage("../../assets/Hydrogen.png");
        img2 = loadImage("../../assets/Iodine.png");
        radiusArr[0] = getRadius("Hydrogen-Iodide","compounds");
        radiusArr[1] = getRadius("Hydrogen","compounds");
        radiusArr[2] = getRadius("Iodine","compounds");
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
        setNum=3;
        img = loadImage("../../assets/Ethene.png");
        img1 = loadImage("../../assets/Oxygen.png");
        img2 = loadImage("../../assets/Carbon-Dioxide.png");
        img3 = loadImage("../../assets/Water.png");
        radiusArr[0] = getRadius("Ethene","compounds");
        radiusArr[1] = getRadius("Oxygen","compounds");
        radiusArr[2] = getRadius("Carbon-Dioxide","compounds");
        radiusArr[3] = getRadius("Water","compounds");
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
    else if(ID==5){
        setNum=5;
        img = loadImage("../../assets/Methane.png");
        img1 = loadImage("../../assets/Oxygen.png");
        img2 = loadImage("../../assets/Carbon-Dioxide.png");
        img3 = loadImage("../../assets/Water.png");
        radiusArr[0] = getRadius("Methane","compounds");
        radiusArr[1] = getRadius("Oxygen","compounds");
        radiusArr[2] = getRadius("Carbon-Dioxide","compounds");
        radiusArr[3] = getRadius("Water","compounds");
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
            window.myLine.data.datasets[2].label="Water";
        else
            addDataset("Water");
    }
    else if(ID==8){
        setNum=8;
        img = loadImage("../../assets/Chlorine.png");
        img1 = loadImage("../../assets/Hydrogen.png");
        img2 = loadImage("../../assets/Hydrochloric-Acid.png");
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
        setNum=9;
        img = loadImage("../../assets/HydrogenPeroxide.png");
        img1 = loadImage("../../assets/Water.png");
        img2 = loadImage("../../assets/Oxygen.png");
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
    fixedDistance=radiusArr[0]+radiusArr[1];
    console.log(radiusArr);
    document.getElementById("molimg").src="../../assets/Chlorine.png";
    document.getElementById("molimg1").src="../../assets/Sodium.png";
    document.getElementById("molname").innerHTML="Chlorine";
    document.getElementById("molname1").innerHTML="Sodium";
    window.myLine.data.datasets[0].label="Chlorine";
    addDataset("Sodium");
    addDataset("Sodium Chloride");

}

function setup() {

    imageMode(CENTER);
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

    if(setNum==1){
        x=80;
        y=480;
        xgap=65;
        ygap=10;

        //Sodium
        radius=radiusArr[0];
        addMolecules(7,2);
        x=130;
        y=515;
        addMolecules(7,2);  

        //Chlorine  
        radius=radiusArr[1];
        addScatteredMolecules(12,1);


    }
    else if(setNum==2){
        radius=radiusArr[0];
        addScatteredMolecules(15,1);
    }
    else if(setNum==3 || setNum==5 || setNum==8){
        radius=radiusArr[0];
        addScatteredMolecules(5,1);
        radius=radiusArr[1];
        addScatteredMolecules(15,2);
    }
    else if(setNum==9){
        getRadius("Hydrogen-Peroxide","compounds");
        addScatteredMolecules(12,1);
    }
    pause();

}

prevSpeed=0;

function draw() {

    console.log(world.gravity.y);
    
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

    if(totalSeconds<2){
        for (var i = 0; i < bodies.length; i++) {
            // if(bodyType[i]==1)
            randomnum = Math.floor((Math.random() * 4) + 1);
            if(randomnum==1)
                Matter.Body.applyForce( bodies[i], {x: bodies[i].position.x, y: bodies[i].position.y}, {x: 0.005, y: 0});
            else if(randomnum==2)
                Matter.Body.applyForce( bodies[i], {x: bodies[i].position.x, y: bodies[i].position.y}, {x: 0, y: 0.005});
            else if(randomnum==3)
                Matter.Body.applyForce( bodies[i], {x: bodies[i].position.x, y: bodies[i].position.y}, {x: -0.005, y: 0});
            else if(randomnum==4)
                Matter.Body.applyForce( bodies[i], {x: bodies[i].position.x, y: bodies[i].position.y}, {x: 0, y: -0.005});
        }
    }

    //heat slider value
    val = document.getElementById("heatValue").innerHTML;
    var intValtemp = currRoomTemp;

    for (var i = 0; i < bodies.length; i++) {
        for (var j = 0; j < bodies.length; j++) {
            if(setNum==1){
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
            else if (setNum==2) {
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
            else if (setNum==3) {
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
                            addWater(j);
                            addWater(j);
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
            else if (setNum==5) {
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
                            addWater(j);
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
        }
    }

    // applyforceID(0.05,1);
    
    // function applyforceID(mag, ID) {
    //     for (var i = 0; i < bodies.length; i++) {
    //         for (var j = 0; j < bodies.length; j++) {
    //             if(bodyType[i]==ID && bodyType[j]==ID){
    //                 var pvector = createVector((bodynumber[i].position.x), (bodynumber[i].position.y));
    //                 var p2vector = createVector((bodynumber[j].position.x), (bodynumber[j].position.y));
    //                 var distforce = dist(bodynumber[i].position.x, bodynumber[i].position.y, bodynumber[j].position.x, bodynumber[j].position.y);
    //                 var diffvector = p5.Vector.sub(pvector, p2vector);
    //                 diffvector.normalize();
    //                 diffvector.mult(mag);
    //                 //line(diffvector);
    //                 if (distforce > 40) {
    //                     Matter.Body.applyForce(bodynumber[j], p2vector, diffvector);
    //                     console.log("applied");
    //                 }
    //             }
    //         }   
    //     }
    // }

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
        var r = 20;
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
    if(number==7){
        row=7;
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
        //density: 0.001,
        inertia: Infinity,
        frictionStatic: 0
        //mass: 1
    }
    return Bodies.circle(x, y, radius, params);
}

function addWater(j){
    stack[stackCounter]=Composites.stack(bodies[j].position.x, bodies[j].position.y, 1, 1, 0, 0, makeCircle);
    World.add(world, stack[stackCounter]);
    bodies[bodies.length] = stack[stackCounter].bodies[0];
    bodynumber[bodynumber.length] = stack[stackCounter].bodies[0];
    bodyType[bodyType.length] = 4;
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
        Matter.Body.setInertia(bodies[i], Infinity);
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
        if(setNum==1){
            if(bodyType[i]==1){
                bodynumber[i].isSleeping = false;
            }    
        }
        else
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
    else if(window.myLine.data.datasets.length==4){
        addData(1, totalMolecules1);
        addData(2, totalMolecules2);
        addData(3, totalMolecules3);
    }    
}
