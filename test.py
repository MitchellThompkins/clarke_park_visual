import unittest
from clarke import clarke

class TestClarkeTransform(unittest.TestCase):
    
    def testCheckUnbalancedObject(self):
        a = 11
        b = 27
        c = 30

        transform = clarke(a,b,c)

        transform.alpha
        transform.beta
        transform.zero

        expectedAlpha = -11.6666666667
        expectedBeta = -1.7320508076
        expectedZero = 22.6666666667

        self.assertAlmostEqual(expectedAlpha, transform.alpha)
        self.assertAlmostEqual(expectedBeta, transform.beta)
        self.assertAlmostEqual(expectedZero, transform.zero)

    def testCheckUnbalancedStatic(self):
        a = 51
        b = -10
        c = -50

        alpha = clarke.alpha_calq(a, b, c)
        beta = clarke.beta_calq(a, b, c)
        zero = clarke.zero_calq(a, b, c)

        expectedAlpha = 54
        expectedBeta = 23.0940107676
        expectedZero = -3

        self.assertAlmostEqual(expectedAlpha, alpha)
        self.assertAlmostEqual(expectedBeta, beta)
        self.assertAlmostEqual(expectedZero, zero)

    def testVerifyObjectIsIndependent(self):
        aObj = 51
        bObj = -10
        cObj = -50

        transform = clarke(aObj, bObj, cObj)

        aStatic = 11
        bStatic = 27
        cStatic = 30

        alphaStatic = clarke.alpha_calq(aStatic, bStatic, cStatic)
        betaStatic = clarke.beta_calq(aStatic, bStatic, cStatic)
        zeroStatic = clarke.zero_calq(aStatic, bStatic, cStatic)

        expectedAlphaObj = 54
        expectedBetaObj = 23.0940107676
        expectedZeroObj = -3

        expectedAlphaStatic = -11.6666666667
        expectedBetaStatic = -1.7320508076
        expectedZeroStatic = 22.6666666667

        self.assertAlmostEqual(alphaStatic, expectedAlphaStatic)
        self.assertAlmostEqual(betaStatic, expectedBetaStatic)
        self.assertAlmostEqual(zeroStatic, expectedZeroStatic)

        self.assertAlmostEqual(transform.alpha, expectedAlphaObj)
        self.assertAlmostEqual(transform.beta, expectedBetaObj)
        self.assertAlmostEqual(transform.zero, expectedZeroObj)

        transform.alpha_calq(aStatic, bStatic, cStatic)
        transform.beta_calq(aStatic, bStatic, cStatic)
        transform.zero_calq(aStatic, bStatic, cStatic)

        self.assertAlmostEqual(transform.alpha, expectedAlphaStatic)
        self.assertAlmostEqual(transform.beta, expectedBetaStatic)
        self.assertAlmostEqual(transform.zero, expectedZeroStatic)


if __name__ == '__main__':
    unittest.main()
