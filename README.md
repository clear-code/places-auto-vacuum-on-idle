# places-auto-vacuum-on-idle

Download Link: https://addons.mozilla.org/firefox/addon/places-auto-vacuum-on-idle/

Compacts the Places database on idle.

# How to test?

 1. Go to `aboug:config`.
 2. Create a new integer preference `idle.lastDailyNotification`, with a value `0`.
 3. Create a new integer preference `places.database.lastMaintenance`, with a value `0`.
 4. Open the browser console by Ctrl-Shift-J.
 5. Release your hands from the keyboard and the mouse, and wait for a while (over 4 minutes.)

Then you'll see following messages in the browser console:

 * `PlacesDBUtils.maintenanceOnIdle() is called and redirected to checkAndFixDatabase().`
 * `PlacesDBUtils.checkAndFixDatabase() successfully finished.`
 * `The database has been vacuumed.` (MCD version), or `Array [ ... ]` including `> vacuum` (addon version.)

