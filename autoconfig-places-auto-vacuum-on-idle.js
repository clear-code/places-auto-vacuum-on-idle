{// Places Auto Vacuum on Idle, for Firefox 60 and later
  const { classes: Cc, interfaces: Ci, utils: Cu } = Components;
  const { Services } = Cu.import('resource://gre/modules/Services.jsm', {});

  const log = (aMessage) => {
    Services.console.logStringMessage(`[places-auto-vacuum-on-idle] ${aMessage}`);
  };

  Services.obs.addObserver({
    observe(aSubject, aTopic, aData) {
      try {
         const { PlacesDBUtils } = Cu.import('resource://gre/modules/PlacesDBUtils.jsm', {});
         if (!(typeof PlacesDBUtils.maintenanceOnIdle == 'function'))
            return Cu.reportError(new Error('places-auto-vacuum-on-idle: PlacesDBUtils.maintenanceOnIdle() is not available.'));
         if (!(typeof PlacesDBUtils.checkAndFixDatabase == 'function'))
            return Cu.reportError(new Error('places-auto-vacuum-on-idle: PlacesDBUtils.checkAndFixDatabase() is not available.'));

         PlacesDBUtils.maintenanceOnIdle = async function() {
            log('PlacesDBUtils.maintenanceOnIdle() is called and redirected to checkAndFixDatabase().');
            try {
              const result = await this.checkAndFixDatabase();
              log('PlacesDBUtils.checkAndFixDatabase() successfully finished.');
              const stringifiedResult = JSON.stringify([...result]);
              if (stringifiedResult.indexOf('The database has been vacuumed') < 0)
                log(`Failed to vacuum the database. ${stringifiedResult}`);
              else
                log('The database has been vacuumed.');
              return result;
            }
            catch(e) {
              Cu.reportError(e);
              throw e;
            }
         };
         log('PlacesDBUtils.maintenanceOnIdle() is successfully replaced with PlacesDBUtils.checkAndFixDatabase().');
      }
      catch(error) {
         Cu.reportError(error);
      }
    }
  }, 'profile-after-change', false);
}
