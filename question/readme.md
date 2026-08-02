Have a question for the community? Our **Category Resource Guide** may have the answer that you’re looking for, or may be able to point you in the right direction! 

## 🌟 Getting Started with GitHub’s API
New to GitHub’s API? These resources will help you get started:
### REST API Resources
REST is commonly regarded as the standard for designing web APIs. To learn more about creating integrations, retrieving data, automating your workflows, and building with the GitHub REST API, [click here](https://docs.github.com/en/rest?apiVersion=2022-11-28). 
- [Quickstart Guide for using GitHub’s REST API](https://docs.github.com/en/rest/quickstart?apiVersion=2022-11-28)
- [REST API Guides](https://docs.github.com/en/rest/guides) - This guide will go over everything you need to know, from authentication to results manipulation to integrating results with other apps. Every tutorial will include a project, and each project will be saved and documented in our public [platform-samples](https://github.com/github/platform-samples) repository.
- [Best practices for using the REST API](https://docs.github.com/en/rest/guides/best-practices-for-using-the-rest-api?apiVersion=2022-11-28)
- [Authenticating to the REST API](https://docs.github.com/en/rest/overview/authenticating-to-the-rest-api?apiVersion=2022-11-28)
- [Learn how to resolve the most common problems people encounter in the REST API here.](https://docs.github.com/en/rest/overview/troubleshooting?apiVersion=2022-11-28)

#### Personal Access Tokens (PATs)
Personal access tokens are an alternative to using passwords for authentication to GitHub when using the [GitHub API](https://docs.github.com/en/rest/overview/authenticating-to-the-rest-api) or the [command line](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#using-a-personal-access-token-on-the-command-line).
- [Learn more about how you can use the REST API to manage fine-grained personal access tokens here.](https://docs.github.com/en/rest/orgs/personal-access-tokens?apiVersion=2022-11-28)
- [Managing your personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)
- [Endpoints available for fine-grained personal access tokens](https://docs.github.com/en/rest/overview/endpoints-available-for-fine-grained-personal-access-tokens?apiVersion=2022-11-28)
- [Permissions required for fine-grained personal access tokens](https://docs.github.com/en/rest/overview/permissions-required-for-fine-grained-personal-access-tokens?apiVersion=2022-11-28)

**Note 1:** Personal access tokens are intended to access GitHub resources on behalf of yourself. To access resources on behalf of an organization, or for long-lived integrations, you should use a GitHub App instead. For more information, see our resources on Using GitHub apps below. 

**Note 2:** Fine-grained PATs are in public beta. Related APIs, events, and functionality are subject to change.

### GraphQL API Resources
The GitHub GraphQL API offers more precise and flexible queries than the GitHub REST API. To learn more about creating integrations, retrieving data, and automating your workflows using the GitHub GraphQL API, [click here](https://docs.github.com/en/graphql) or check out the resources below:
- [Introduction to GraphQL](https://docs.github.com/en/graphql/guides/introduction-to-graphql)
- [Forming calls with GraphQL](https://docs.github.com/en/graphql/guides/forming-calls-with-graphql)
- GraphQL Global Node IDs
  - [Using global node IDs](https://docs.github.com/en/graphql/guides/using-global-node-ids)
  - [Migrating GraphQL global node IDs](https://docs.github.com/en/graphql/guides/migrating-graphql-global-node-ids)
- [Migrating from REST to GraphQL](https://docs.github.com/en/graphql/guides/migrating-from-rest-to-graphql)
- [Resource Limitations](https://docs.github.com/en/graphql/overview/resource-limitations)
- [Changelog](https://docs.github.com/en/graphql/overview/changelog)

### Webhooks Resources
Webhooks can let your integrations take an action in response to events that occur on GitHub. You can set up, test, and secure webhooks so your integrations can subscribe and react to webhook events on GitHub. Learn where to start, what’s new and what’s popular here. 
- [Creating Webhooks](https://docs.github.com/en/webhooks/using-webhooks/creating-webhooks)
- [Webhook events and payloads](https://docs.github.com/en/webhooks/webhook-events-and-payloads)
- Webhook Deliveries
  - [Viewing webhook deliveries](https://docs.github.com/en/webhooks/testing-and-troubleshooting-webhooks/viewing-webhook-deliveries)
  - [Handling webhook deliveries](https://docs.github.com/en/webhooks/using-webhooks/handling-webhook-deliveries)
  - [Handling failed webhook deliveries](https://docs.github.com/en/webhooks/using-webhooks/handling-failed-webhook-deliveries)
- [Best practices for using webhooks](https://docs.github.com/en/webhooks/using-webhooks/best-practices-for-using-webhooks)
- [Testing your Webhooks](https://docs.github.com/en/webhooks/testing-and-troubleshooting-webhooks/testing-webhooks)
- [Testing and troubleshooting webhooks](https://docs.github.com/en/webhooks/testing-and-troubleshooting-webhooks)
- [Disabling Webhooks](https://docs.github.com/en/webhooks/using-webhooks/disabling-webhooks)

### Integrating with Jira, ZenDesk and other external apps
- [Featured GitHub integrations: Use GitHub extensions to work seamlessly in repositories on GitHub.com within third-party applications.](https://docs.github.com/en/get-started/exploring-integrations/featured-github-integrations)
- [The Jira and GitHub integration synchronizes development across tools and uses automation to remove manual steps and shorten delivery time.](https://github.com/marketplace/jira-software-github)
- [Click here to learn more about how to add autolinks to external resources like JIRA issues and Zendesk tickets to help bring data from those apps into your GH PRs ad issues, and help streamline your workflow.](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/configuring-autolinks-to-reference-external-resources)
- [Integrate Jira Software with GitHub Cloud](https://support.atlassian.com/jira-cloud-administration/docs/integrate-with-github/)
- [Integrating Jira with GitHub Enterprise Server](https://support.atlassian.com/jira-cloud-administration/docs/connect-a-github-enterprise-server-account-to-jira-software/)

### How Do I Check My Rate Limit?
- Read up on the feature and find any associated endpoints
  - [Overview - Rate limiting](https://docs.github.com/en/rest/guides/best-practices-for-integrators#dealing-with-rate-limits) will explain rate limits at a high-level
- If the endpoint exists, create an example `curl` request to perform that action
  - The [Rate Limit API](https://docs.github.com/en/rest/reference/rate-limit) doc documents the endpoint for checking the authenticated user's current rate limit status
- The GraphQL API also has a custom rate limit that is separate from and calculated differently than rate limits in the REST API. For more information, see  our [Resource limitations](https://docs.github.com/en/graphql/overview/resource-limitations#rate-limit) doc.
- Consider using conditional requests to help you stay within the rate limit. For more information about conditional requests, see our [Resources in the REST API](https://docs.github.com/en/rest/overview/resources-in-the-rest-api#conditional-requests) doc.
- If possible, consider using consolidated GraphQL queries instead of REST API requests to help you stay within rate limits. For more information, see "[About GitHub's APIs](https://docs.github.com/en/rest/overview/about-githubs-apis)" and "[GitHub GraphQL API documentation](https://docs.github.com/en/graphql)."

**Note:** If you hit a rate limit, you should stop making requests until after the time specified by the `x-ratelimit-reset` header. Failure to do so may result in the banning of your integration.

## 🗣️ Authenticating with OAuth apps and GitHub Apps

### Using OAuth Apps
- [Creating an OAuth app](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)
  - [Best practices for creating an OAuth app](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/best-practices-for-creating-an-oauth-app)
- [Building OAuth apps](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps)
  - [Authorizing OAuth apps](https://docs.github.com/en/apps/oauth-apps/using-oauth-apps/authorizing-oauth-apps)
- [Deleting an OAuth app](https://docs.github.com/en/apps/oauth-apps/maintaining-oauth-apps/deleting-an-oauth-app)
- [Rate limits for OAuth apps](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/rate-limits-for-oauth-apps)

When obtaining an OAuth token for a user, some errors may occur during the initial authorization request phase. You can learn more about troubleshooting common OAuth app errors here:
- [Troubleshooting authorization request errors](https://docs.github.com/en/apps/oauth-apps/maintaining-oauth-apps/troubleshooting-authorization-request-errors)
- [Troubleshooting OAuth app access token request errors](https://docs.github.com/en/apps/oauth-apps/maintaining-oauth-apps/troubleshooting-oauth-app-access-token-request-errors)

**GitHub Apps** are preferred to OAuth apps because they use fine-grained permissions, give more control over which repositories the app can access, and use short-lived tokens. These properties can harden the security of your app by limiting the damage that could be done if your app's credentials were leaked. They can also act independently of a user so the app will continue to work even if the person who installed the app on an organization leaves the organization. Check out these resources for more information:
- [Differences between GitHub Apps and OAuth apps](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/differences-between-github-apps-and-oauth-apps)
- [Migrating OAuth apps to GitHub Apps](https://docs.github.com/en/apps/creating-github-apps/about-creating-github-apps/migrating-oauth-apps-to-github-apps)

### Using GitHub Apps
- [Using GitHub Apps](https://github.com/orgs/community/discussions/61290)
  - [About creating GitHub Apps](https://docs.github.com/en/apps/creating-github-apps/about-creating-github-apps/about-creating-github-apps)
  - [Authorizing GitHub Apps](https://docs.github.com/en/apps/using-github-apps/authorizing-github-apps)
  - [About authentication with a GitHub App](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/about-authentication-with-a-github-app)
  - [Authenticating as a GitHub App installation](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-as-a-github-app-installation)


- REST API resources for GitHub Apps
  - [Permissions required for GitHub Apps to use each REST API endpoint that works with GitHub Apps](https://docs.github.com/en/rest/overview/permissions-required-for-github-apps?apiVersion=2022-11-28)
  - [Endpoints available for GitHub App installation access tokens](https://docs.github.com/en/rest/overview/endpoints-available-for-github-app-installation-access-tokens?apiVersion=2022-11-28)


## 💼 GitHub Enterprise Server (GES) Resources
- [How to Solve: x509: certificate signed by unknown authority on GitHub Enterprise Server](https://github.com/orgs/community/discussions/65483)
- [GitHub Enterprise Server: Geo-replication overview and implementation](https://github.com/orgs/community/discussions/34222)
- [Making your GitHub App available for GitHub Enterprise Server](https://docs.github.com/en/apps/sharing-github-apps/making-your-github-app-available-for-github-enterprise-server)

## 📖 Open Source Resources
**New to open source?** Here are some resources to help you get started:
- **Want to start contributing to open source projects?** [Here’s how to find projects that need help so you can start making impactful contributions today](https://github.com/collections/choosing-projects)
  - **Programming Help Category:** For programming questions beyond APIs, Webhooks, and Rate Limits - join the conversation on all things software development in [this category](https://github.com/orgs/community/discussions/categories/programming-help). 
  - **Programming Resources:** Check out [this post in Programming Help](https://github.com/orgs/community/discussions/51394) for getting started resources and language-specific hubs. 
- **Did you know that [GitHub’s Docs](https://docs.github.com/en) are open source?** 📖Interested in contributing to GitHub’s Docs? Here are a handful of article updates that you can tackle:
  - [GraphQL errors, and especially rate limit errors, are not documented](https://github.com/github/docs/issues/22607)
  - [Transferring ownership article(s) should contain pointers to how/where transfer request can be approved](https://github.com/github/docs/issues/22565)
- **Are you or do you know a college student interested in open source?** [All In for Students](https://allinopensource.org/access/) is an online program for college students from underrepresented backgrounds that provides open source education, training, and internship opportunities. They’re doing really cool things, check it out!
- **Public APIs:** Ever needed to find a free API for your next project, website, or app? Check out the [Public APIs Repository](https://github.com/public-apis-dev/public-apis)