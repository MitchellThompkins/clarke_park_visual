class Rectangle
{
    constructor(height, width)
    {
        this.height = height;
        this.width = width;
    }

}

class ClarkeTransform
{
    constructor(a, b, c="undefined")
    {
        this.a = a;
        this.b = b;
        this.c = c;
        this.update(a,b,c);

    }

    static checkBalance(a,b,c)
    {
        if (a+b+c == 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    update(a, b, c="undefined")
    {
        if( c == "undefined" || ClarkeTransform.checkBalance(a,b,c) )
        {
            this.bal = true;
        }
        else
        {
            this.bal = false;
        }

        if( this.bal == true )
        {
            this.alpha = ClarkeTransform.alpha(a)
            this.beta = ClarkeTransform.beta(a,b)
            this.zero = ClarkeTransform.zero()
        }
        else
        {
            this.alpha = ClarkeTransform.alpha(a,b,c)
            this.beta = ClarkeTransform.beta(a,b,c)
            this.zero = ClarkeTransform.zero(a,b,c)
        }
    }

    static alpha(a, b="undefined", c="undefined")
    {
        function bal(a)
        {
            return a;
        }

        function unbal(a,b,c)
        {
            return (2/3)*(a - 0.5*(b + c));
        }

        function balanceAssumptionGood(a,b,c)
        {
            var assumptionGood = false;
            if (a == "undefined")
            {
                assumptionGood = false;
            }
            else if (b == "undefined" && c != "undefined")
            {
                assumptionGood = false;
            }
            else if (c == "undefined" && b != "undefined")
            {
                assumptionGood = false;
            }
            else
            {
                assumptionGood = true;
            }

            return assumptionGood;
        }

        if (a == "undefined" || b == "undefined" || c == "undefined")
        {
            if (balanceAssumptionGood(a,b,c) == false)
            {
                //TODO(mthompkins): Some error handling
            }
            else
            {
                return bal(a);
            }
        }
        else if (ClarkeTransform.checkBalance(a,b,c))
        {
            return bal(a);
        }
        else
        {
            return unbal(a,b,c);
        }
    }

    static beta(a, b, c="undefined")
    {
        function bal(a,b)
        {
            return (Math.sqrt(3)*(a+b)/3) + (Math.sqrt(3)*b/3);
        }

        function unbal(b,c)
        {
            return (2/3) * (Math.sqrt(3)*0.5) * (b-c);
        }

        function balanceAssumptionGood(a,b,c)
        {
            var assumptionGood = false;
            if (a == "undefined" || b == "undefined")
            {
                assumptionGood = false;
            }
            else
            {
                assumptionGood = true;
            }

            return assumptionGood;
        }

        if (a == "undefined" || b == "undefined" || c == "undefined")
        {
            if (balanceAssumptionGood(a,b,c) == false)
            {
                //TODO(mthompkins): Some error handling
            }
            else
            {
                return bal(a,b);
            }
        }
        else if (ClarkeTransform.checkBalance(a,b,c))
        {
            return bal(a,b);
        }
        else
        {
            return unbal(b,c);
        }
    }

    static zero(a="undefined", b="undefined", c="undefined")
    {
        function bal()
        {
            return 0;
        }

        function unbal(a,b,c)
        {
            return (2/3)*0.5*(a+b+c);
        }

        function balanceAssumptionGood(a,b,c)
        {
            var assumptionGood = false;

            var vals = [a,b,c];
            var undefinedCount = 0;
            for( let i = 0; i < vals.length; i++ )
            {
                if( vals[i] == "undefined")
                {
                    undefinedCount++;
                }
            }

            if( undefinedCount !=0 && undefinedCount != 3 )
            {
                assumptionGood = false;
            }
            else
            {
                assumptionGood = true;
            }

            return assumptionGood;
        }

        if (a == "undefined" || b == "undefined" || c == "undefined")
        {
            if (balanceAssumptionGood(a,b,c) == false)
            {
                //TODO(mthompkins): Some error handling
            }
            else
            {
                return bal();
            }
        }
        else if (ClarkeTransform.checkBalance(a,b,c))
        {
            return bal();
        }
        else
        {
            return unbal(a,b,c);
        }
    }

}
