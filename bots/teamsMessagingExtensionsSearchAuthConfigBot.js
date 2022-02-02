// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const {
  TeamsActivityHandler,
  CardFactory,
  ActionTypes,
} = require("botbuilder");
const axios = require("axios");
const querystring = require("querystring");

class TeamsMessagingExtensionsSearchAuthConfigBot extends TeamsActivityHandler {
  /**
   *
   * @param {UserState} User state to persist configuration settings
   */
  constructor(userState) {
    super();
  }

  async handleTeamsMessagingExtensionFetchTask(context, action) {
    return {
      task: {
        type: "continue",
        value: {
          title: "SFDC Demo",
          url: `${process.env.SiteUrl}/public/index.html`,
          heigth: 200,
          width: 400,
          card: null,
        },
      },
    };
  }

  async handleTeamsMessagingExtensionConfigurationQuerySettingUrl(
    context,
    query
  ) {
    let from = "channel";
    try {
      const conversationType = context.activity.conversation.conversationType;
      if (conversationType) {
        from = conversationType;
      }
    } catch (e) {
      // ignore
    }

    return {
      composeExtension: {
        type: "config",
        suggestedActions: {
          actions: [
            {
              type: ActionTypes.OpenUrl,
              value: `${process.env.SiteUrl}/public/searchSettings.html?from=${from}`,
            },
          ],
        },
      },
    };
  }

  async handleTeamsMessagingExtensionConfigurationSetting(context, settings) {
    // When the user submits the settings page, this event is fired.
  }
}

module.exports.TeamsMessagingExtensionsSearchAuthConfigBot =
  TeamsMessagingExtensionsSearchAuthConfigBot;
