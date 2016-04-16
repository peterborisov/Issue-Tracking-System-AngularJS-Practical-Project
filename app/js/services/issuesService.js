'use strict';

app.factory('issuesService', function ($http, BASE_URL, authenticationService) {
    return {
        addNewIssue: function (issueData, success, error) {
            var addIssueRequest = {
                method: 'POST',
                url: BASE_URL + 'issues',
                headers: authenticationService.getHeaders(),
                data: issueData
            };

            $http(addIssueRequest).success(success).error(error);
        }
    }
});