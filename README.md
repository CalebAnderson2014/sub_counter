# (WIP) sub_counter

twitch.tv is a platform for people looking to record themselves playing video games while simultaneously broadcasting to whoever wants to watch. The people broadcasting are commonly referred to as "streamers", streamers have varying ranges of success and popularity but if you reach the top ~1% of streamers there is some serious money to be made. Talking millions here. The main channel of income is a subscription based model where any viewer can sign up (aka subscribe) to a twitch channel. The current rates are $5/month $10/month $25/month. In twitch's current state, subscription data is only available to the streamer.

My goal with sub_counter is to connect to an IRC chat feed for popular streamers (whatever ones I pick) and track how many times a 'subscription' event is triggered in the IRC feed, save these records in a database, display total number of subscribers for each channel.

Stretch goals: Some analytics breaking down subscriptions per day, estimated income, and suggestions for channels you might like calculated by seeing the overlap of people subscribed to both channels.

Current state is barely functional but should show *rough* estimates for total subs to a channel since a certain date.

Deployed [here](http://159.203.103.19:4000).

TODO:
Make front-end actullay look good
Add more testing
