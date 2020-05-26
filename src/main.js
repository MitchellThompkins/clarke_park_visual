canvasWidth =640;
canvasLength = 640;
optionsWindowWidth = 200;

class axisPlot
{
    constructor(x, y, l, h, weight, color)
    {
        this.l = l;
        this.h = h;

        this.x = x;
        this.y = y;

        this.weight = weight;
        this.color = color;
    }

    plot()
    {
        strokeWeight(this.weight);
        stroke(this.color);

        line(this.x-this.l, this.y, this.x + this.l, this.y); // Plot the x axis
        line(this.x, this.y - this.h, this.x, this.y + this.h); // Plot the y axis
    }
}

function plotClarke(a,b,c="undefined")
{
    //TODO: Pull out axis to plot clarke, dq0 separately

    //Clarke Transform
    clarke = new ClarkeTransform(a,b,c);

    //Scale the vector as a ratio of 1
    maxVector = Math.max(Math.abs(clarke.alpha), Math.abs(clarke.beta), Math.abs(clarke.zero) );
    clarke.update( a*(1/maxVector), b*(1/maxVector), c*(1/maxVector) );

    //Plotting info
    weight = 3;
    originX = 300;
    originY = canvasLength/2;
    origin = createVector( originX, originY );

    axisDim = 200;

    axisColor = 'grey';

    clarkeAxis = new axisPlot( origin.x, origin.y, axisDim, axisDim, weight, axisColor );
    clarkeAxis.plot();

    //alphaVec = createVector( (((axisDim*3/4)+origin.x)*clarke.alpha)+origin.x, origin.y );
    //betaVec = createVector( origin.x, (((axisDim*3/4)+origin.y)*clarke.beta)+origin.y );
    //clarkeZero = createVector();
    maxVecLen = (axisDim*3/4);

    alphaVec = createVector( maxVecLen*clarke.alpha + origin.x, origin.y );
    betaVec = createVector( origin.x, maxVecLen*clarke.beta + origin.y );

    stroke('red');
    line(origin.x, origin.y, alphaVec.x, alphaVec.y ); // Plot alpha vector
    stroke('blue');
    line(origin.x, origin.y, betaVec.x, betaVec.y ); // Plot beta vector
}

function setup()
{
    let cnv = createCanvas( canvasWidth, canvasLength );
    cnv.position( optionsWindowWidth, 0 );
}

function draw()
{
    a = 1;
    b = 1;
    c = -2;


    plotClarke(a,b,c);
}
