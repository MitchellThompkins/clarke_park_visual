import math
import sys
import traceback

class Error(Exception):
    pass

class BalanceError(Error):
        def __init__(self, transform, *inputs):
            self.vals = []
            for v in inputs:
                self.vals.append(v)

            code = "Balanced input violated, a+b+c != 0\n"
            code = code + "transform: " + transform + "\n"
            self.code = code + "Got: "

            for v in self.vals:
                self.code = self.code + " " + str(v)

        def __str__(self):
            return repr(self.code)


#Definition of clarke transform: 
#https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_transformation
class clarke:

    def __init__(self, a, b, c=None):

        self.a = a
        self.b = b
        self.c = c

        if (c is None) or clarke.checkBalance(a,b,c):
            self.bal = True
        else:
            self.bal = False

        #Assign the instance func name to the "private" definition
        self.alpha_calq = self.__alpha_calq
        self.beta_calq = self.__beta_calq
        self.zero_calq = self.__zero_calq

        #Update the member vars
        self.alpha_calq(a,b,c)
        self.beta_calq(a,b,c)
        self.zero_calq(a,b,c)

    @staticmethod
    def checkBalance(a,b,c):
        if (a + b + c) == 0:
            return True
        else:
            return False

    #Decorator to scale by the matrix multiplication
    def scale(xfrm):
        def func(*args, **kwargs):
            result = (2/3)*xfrm(*args, **kwargs)
            return result
        return func

    @staticmethod
    @scale
    def alpha_calq(a, b=None, c=None):
        def alpha_bal(a,b):
           return a

        def alpha_unbal(a,b,c):
           return a - 0.5*(b + c)

        try:
            if a is None:
                raise BalanceError("alpha",a)
            elif b is None and c is not None:
                raise BalanceError("alpha",b,c)
            elif c is None and b is not None:
                raise BalanceError("alpha",c,b)
            elif b is None and c is None:
                return a
            elif clarke.checkBalance(a,b,c):
                return alpha_bal(a,b,c)
            else:
                return alpha_unbal(a,b,c)

        except BalanceError as e:
            print(e.code)
            sys.exit(1)

    @staticmethod
    @scale
    def beta_calq(a, b, c=None):
        def beta_bal(a,b):
           return (math.sqrt(3)*(a+b)/3) + (math.sqrt(3)*b/3)

        def beta_unbal(b,c):
           return (math.sqrt(3)*0.5) * (b-c)

        try:
            if a is None or b is None:
                raise BalanceError("beta",a,b)
            elif c is None:
                return (math.sqrt(3)*(a+b)/3) + (math.sqrt(3)*b/3)
            elif clarke.checkBalance(a,b,c):
                return beta_bal(a,b)
            else:
                return beta_unbal(b,c)

        except BalanceError as e:
            #print(traceback.print_exc())
            print(e.code)
            sys.exit(1)

    @staticmethod
    @scale
    def zero_calq(a=None, b=None, c=None):
        def beta_bal():
            return 0

        def beta_unbal(a,b,c):
            return 0.5*(a+b+c)

        try:
            if all(v is None for v in [a,b,c]) and (None in (a,b,c)):
                raise BalanceError("zero",a,b,c)
            elif clarke.checkBalance(a,b,c):
                return beta_bal()
            else:
                return beta_unbal(a,b,c)

        except BalanceError as e:
            #print(traceback.print_exc())
            print(e.code)
            sys.exit(1)


    #This updates the instance methods
    def __alpha_calq(self, a=None, b=None, c=None):
        self.alpha = clarke.alpha_calq(a,b,c)
        return self.alpha

    def __beta_calq(self, a=None, b=None, c=None):
        self.beta = clarke.beta_calq(a,b,c)
        return self.beta

    def __zero_calq(self, a=None, b=None, c=None):
        self.zero = clarke.zero_calq(a,b,c)
        return self.zero

