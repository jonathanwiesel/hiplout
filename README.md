#hiplout
***
This simple application monitors a Klout user looking for changes in his and sends a notification to HipChat (API v2). Can be easily deployed to Heroku. You only need to set the following enviroment variables:

```
KLOUT_USER=klout_user_to_monitor
KLOUT_APIV2_KEY=klout_api_key
HIPCHAT_API_V2_KEY=hipchat_APIV2_key
HIPCHAT_ROOM_ID=123456-123457                       # separate multiple rooms by a dash (-)
HIPCHAT_ROOM_TOKEN=room1_token-room2_token
HIPCHAT_ROOM_MENTION=JonathanWiesel-here-all-...    # optional
```

And install dependent modules:

```sh
$ npm install
```

The server will monitor for a Klout score change every half hour.

Notice that if you want to support multiple rooms you **MUST** specify the same order for the rooms and tokens.

The `HIPCHAT_ROOM_MENTION` variable is **optional**, it will send an additional message to the channel mentioning those specified (separated by a dash). Remember `all` will mention every member on the channel and `here` will mention every available room members.
(It cannot be sent along the original message because the first one is HTML-formated and the HipChat API states that to use @mentions the message needs to be text-formated).

***

##Notes
This application was built using:
* [node_klout](https://github.com/cojohn/node_klout)
* [hipchatter](https://github.com/charltoons/hipchatter)
* [cron](https://github.com/ncb000gt/node-cron)

