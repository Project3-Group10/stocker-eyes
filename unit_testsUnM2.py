'''
    unit_testsUnM2.py 
    here is the fist UnMock test 

'''
import unittest
import os
import sys
import models

sys.path.append(os.path.abspath('../../'))
from app import getBestPriceS

KEY_INPUT = "input"
KEY_EXPECTED = "expected"

class getBestPriceStock(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [{
               KEY_INPUT:{1: ['OVV', '04-18-2021', '4.2', '6.8', '3.5', '5', '3.1', '5000'],2: ['OVV', '04-17-2021', '4.2', '6.8', '3.5', '4.1', '3.1', '5000'],3: ['OVV', '04-16-2021', '4.2', '6.8', '3.5', '5.6', '3.1', '5000'],4: ['OVV', '04-15-2021', '4.2', '6.8', '3.5', '6.8', '3.1', '5000'],5: ['OVV', '04-14-2021', '4.2', '6.8', '3.5', '5.3', '3.1', '5000']}
            ,
               KEY_EXPECTED:{4: 6.8, 3: 5.6, 5: 5.3, 1: 5.0, 2: 4.1}
        }]
        self.failure_test_paramus = [{
               KEY_INPUT:{1: ['OVV', '04-18-2021', '4.2', '6.8', '3.5', '5', '3.1', '5000'],2: ['OVV', '04-17-2021', '4.2', '6.8', '3.5', '4.1', '3.1', '5000'],3: ['OVV', '04-16-2021', '4.2', '6.8', '3.5', '5.6', '3.1', '5000'],4: ['OVV', '04-15-2021', '4.2', '6.8', '3.5', '6.8', '3.1', '5000'],5: ['OVV', '04-14-2021', '4.2', '6.8', '3.5', '5.3', '3.1', '5000']}
            ,
               KEY_EXPECTED:{4: 6, 3: 5.6, 5: 5.3, 1: 5.0, 2: 4.1}
        }]
    def tearDown(self):
        pass

    def test_sortDic(self):
        for test in self.success_test_params:
            actual_tuple = getBestPriceS(test[KEY_INPUT])
            expected_tuple = test[KEY_EXPECTED]
            self.assertEqual(actual_tuple, expected_tuple)

    #Failure tests
    def test_failure1(self):
        for test in self.failure_test_paramus:
            actual_dic = getBestPriceS(test[KEY_INPUT])
            expected_dic = test[KEY_EXPECTED]
            self.assertNotEqual(actual_dic, expected_dic)


if __name__ == '__main__':
    unittest.main()
