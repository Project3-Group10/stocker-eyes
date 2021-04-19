import unittest
import unittest.mock as mock
from unittest.mock import patch
import os
import sys

sys.path.append(os.path.abspath('../../'))
from app import addNewUserDB
import models

KEY_INPUT = "input"
KEY_EXPECTED = "expected"
USER_W = "UserWrong"

INITIAL_USERNAME = 'Oscar'


class AddUserTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [{
            KEY_INPUT: ['testid1','oo89@njit.edu', 'Oscar', 'hadfvisdklfvklids' ],
            KEY_EXPECTED: {'testid1':['oo89@njit.edu','Oscar','hadfvisdklfvklids']}
        }, {
            KEY_INPUT: ['testid2','oo88@njit.edu', 'Oscar2', 'hadfvisdklfvklids1' ],
            KEY_EXPECTED: {'testid2':['oo88@njit.edu', 'Oscar2', 'hadfvisdklfvklids1']}
        }]
        self.failure_test_paramus = [
           
        ]

        initial_person = models.UserG(name=INITIAL_USERNAME, email='oo89@njit.edu')
        self.initial_db_mock = [initial_person]

    #this is called in test_success
    def mocked_db_session_add(self, name):
        self.initial_db_mock.append(name)

    #to simulate commit to the db it also called in test_success
    def mocked_db_session_commit(self):
        pass

    #this is called in test_success
    def mocked_person_query_all(self):
        return self.initial_db_mock

    #this is the actual test
    def test_success(self):
        for test in self.success_test_params:
            with patch('app.db.session.add', self.mocked_db_session_add):
                with patch('app.db.session.commit',
                    self.mocked_db_session_commit):
   
                    print(self.initial_db_mock)
                    actual_userLResult = addNewUserDB(
                        test[KEY_INPUT])
                    print(actual_userLResult)
                    expected_ruserLResult = test[KEY_EXPECTED]
                    print(self.initial_db_mock)
                    print(actual_userLResult)

                    self.assertEqual(len(actual_userLResult),
                                     len(expected_ruserLResult))
                    self.assertEqual(actual_userLResult[1],
                                     expected_ruserLResult[1])
                    self.assertEqual(actual_userLResult[0],
                                     expected_ruserLResult[0])
                    if (len(expected_ruserLResult) == 3):
                        self.assertEqual(actual_userLResult[2],
                                         expected_ruserLResult[2])

    def test_failure(self):
        for test in self.failure_test_paramus:
            with patch('app.db.session.add', self.mocked_db_session_add):
                with patch('app.db.session.commit',
                           self.mocked_db_session_commit):
                    with patch('models.Person.query') as mocked_query:
                        mocked_query.all = self.mocked_person_query_all

                        print(self.initial_db_mock)
                        actual_userLResult, actual_scoresLResult = addNewUserDB(
                            test[KEY_INPUT])
                        print(actual_userLResult)
                        ruserLResult = test[USER_W]
                        print(self.initial_db_mock)
                        print(actual_userLResult)
                        self.assertNotEqual(actual_userLResult[0],
                                            ruserLResult[0])
                        self.assertNotEqual(actual_userLResult[1],
                                            ruserLResult[1])


if __name__ == '__main__':
    unittest.main()
