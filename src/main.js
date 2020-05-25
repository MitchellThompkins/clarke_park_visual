function setup()
{
    createCanvas(640, 480);
}

function draw()
{
    strokeWeight(4);
    stroke(51);

    rec = new Rectangle(10,40);

    rect(30, 20, rec.width, rec.height);
    line(30, 40, 30, 75);

    //xfrm = new ClarkeTransform(11,27,30);
    xfrm = new ClarkeTransform(51,-10,-41);
    xfrm = new ClarkeTransform(51,-10);

    print(xfrm.alpha);
    print(xfrm.beta);
    print(xfrm.zero);
    //print(ClarkeTransform.alpha(11,27,30));
    //print(xfrm.alpha);
    xfrm.update(8,4,-2);

    print(xfrm.alpha);
    print(xfrm.beta);
    print(xfrm.zero);

    
}
