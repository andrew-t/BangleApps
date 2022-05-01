# Calendar Clock

Displays the time plus your next few calendar events.

Requires my Calendar Sync app to read calendar data, plus GadgetBridge and a Tasker profile on the phone to send the data every few hours.

While other apps are running, displays a small clock in the status bar.

## Media controls

Tap the calendar to switch to media control mode. Tap the track name to go back to calendar mode.

Requires the Android integration app and GadgetBridge on the phone to control music.

Track information doesn't always synch perfectly but the controls should work regardless. Similarly the left-hand button in the main view is always play/pause and while it'll try to show whichever specific symbol (play or pause) is going to happen if you press it, it'll send "playpause" to your phone so it should do the right thing even if it's showing the wrong symbol.

## Messages

If a message arrives while the clockface is active, it will appear fullscreen. Your options are:

* X: close this message and dismiss the notification from your phone
* Hide: close this message but leave the notification on the phone
* Done: close all messages and leave the notifications on the phone

Requires GadgetBridge on the phone to use notifications, and the Android integration app to push dismissals to the phone. You probably shouldn't use the messages app as well or you'll get double notifications.

If other apps are running, it will put an icon in the status bar.
