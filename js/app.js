'use strict';

// =========== creating object literals for all shop locations ========

var seattleLocation = {
  minHourlyCustomers : 23,
  maxHourlyCustomers : 65,
  avgCookiesPerCustomer : 6.3,
  locationOpen : 6, // opens at 6am
  locationClose : 20, // closes at 8pm
  hoursOfOperation : [],
  simulatedCookiesPurchasedPerHour : [], // stores amount of cookies purchased each hour location is open
  generateRandomCustomerPerHour : function() {
    // used https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random for reference
    var thisCustomerCount = Math.floor(Math.random() * (this.maxHourlyCustomers + 1 - this.minHourlyCustomers)) + this.minHourlyCustomers;
    return thisCustomerCount;
  },
  updateHoursOfOperation : function() {
    // referenced https://www.w3schools.com/jsref/jsref_push.asp for push method
    this.hoursOfOperation = [];
    for (var i = this.locationOpen; i < this.locationClose; i++) {
      if (i < 12) {
        this.hoursOfOperation.push(i + 'am');
      } else if (i === 12) {
        this.hoursOfOperation.push(i + 'pm');
      } else {
        this.hoursOfOperation.push((i - 12) + 'pm');
      }
    }
  },
  calculateCookiesPurchasedPerHour : function() {
    for (var j = this.locationOpen; j < this.locationClose; j++) {
      this.simulatedCookiesPurchasedPerHour.push(Math.round(this.avgCookiesPerCustomer * this.generateRandomCustomerPerHour()));
    }
  }
};

// seattleLocation.calculateCookiesPurchasedPerHour();
// console.log(seattleLocation.simulatedCookiesPurchasedPerHour);
// seattleLocation.updateHoursOfOperation();
console.log(seattleLocation.hoursOfOperation);









