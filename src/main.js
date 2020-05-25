var xOffset = 100;
var yOffset = 100;
var scaling = 2;

function plotClarke()
{

    strokeWeight(4);
    stroke(51);

    a = 1;
    b = -0.5;
    c = -0.5;

    clarke = new ClarkeTransform(a,b,c);

    origin = createVector( xOffset, yOffset );
    clarkeVec = createVector( clarke.alpha, clarke.alpha );

    line(origin.x, origin.y, scaling*(origin.x+clarkeVec.x), scaling*(origin.y+clarkeVec.y));
}

function setup()
{
    createCanvas(500,500);
}

function draw()
{
    plotClarke()
}
