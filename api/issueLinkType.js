"use strict";

module.exports = IssueLinkTypeClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/issueLinkType'
 * @param {JiraClient} jiraClient
 * @constructor IssueLinkTypeClient
 */
function IssueLinkTypeClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Get a list of available issue link types, if issue linking is enabled. Each issue link type has an id, a name
     * and a label for the outward and inward link relationship.
     *
     * @method getAvailableTypes
     * @memberOf IssueLinkTypeClient#
     * @param opts The request options for the API.  Ignored in this function.
     * @param callback Called when the available IssueLink types are retrieved.
     */
    this.getAvailableTypes = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/issueLinkType'),
            method: 'GET',
            json: true,
            followAllRedirects: true
        };

        this.makeRequest(options, callback);
    };

    /**
     * Create a new issue link type.
     *
     * @method createIssueLinkType
     * @memberOf IssueLinkTypeClient#
     * @param opts The request options sent to the Jira API
     * @param opts.linkType See {@link https://docs.atlassian.com/jira/REST/latest/#d2e2018}
     * @param callback Called when the IssueLink type has been created.
     */
    this.createIssueLinkType = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/issueLinkType'),
            method: 'POST',
            json: true,
            followAllRedirects: true,
            body: opts.linkType
        };

        this.makeRequest(options, callback);
    };

    /**
     * Helper method to reduce duplicated code.  Uses the JiraClient to make a request, calling back with either
     * the response, or the supplied error string if it exists.
     *
     * @method makeRequest
     * @memberOf IssueLinkClient#
     * @param {Object} options The request options
     * @param {Function} callback Called with the Jira APIs response.
     * @param {string} [successString] If supplied, this is reported instead of the response body.
     */
    this.makeRequest = function (options, callback, successString) {
        this.jiraClient.makeRequest(options, function (err, response, body) {
            if (err || response.statusCode.toString()[0] != 2) {
                return callback(err ? err : body);
            }

            return callback(null, successString ? successString : body);
        });
    };
}