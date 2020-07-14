'use strict';

// =========== creating object constructor for shop locations ========

function Store(city, minHourlyCustomers, maxHourlyCustomers, avgCookiesPerCustomer, locationOpen, locationClose) {
  this.city = city;
  this.minHourlyCustomers = minHourlyCustomers;
  this.maxHourlyCustomers = maxHourlyCustomers;
  this.avgCookiesPerCustomer = avgCookiesPerCustomer;
  this.locationOpen = locationOpen;
  this.locationClose = locationClose;
  this.hoursOfOperation = [];
  this.simulatedCookiesPurchasedPerHour = [];
  this.generateRandomCustomerPerHour = function() {
    // used https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random for reference
    var thisCustomerCount = Math.floor(Math.random() * (this.maxHourlyCustomers + 1 - this.minHourlyCustomers)) + this.minHourlyCustomers;
    return thisCustomerCount;
  };
  this.updateHoursOfOperation = function() {
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
  };
  this.calculateCookiesPurchasedPerHour = function() {
    for (var j = this.locationOpen; j < this.locationClose; j++) {
      this.simulatedCookiesPurchasedPerHour.push(Math.round(this.avgCookiesPerCustomer * this.generateRandomCustomerPerHour()));
    }
  };
  this.displayLocationCookiePerHour = function(parentID) {
    var divForLists = document.getElementById(parentID);
    var ulCookie = document.createElement('ul');
    ulCookie.textContent = this.city;
    var liCookie;
    var totalCookies = 0;
    for (var i = 0; i < this.hoursOfOperation.length; i++) {
      liCookie = document.createElement('li');
      liCookie.textContent = this.hoursOfOperation[i] + ': ' + this.simulatedCookiesPurchasedPerHour[i] + ' cookies';
      ulCookie.appendChild(liCookie);
      totalCookies += this.simulatedCookiesPurchasedPerHour[i];
    }
    var liTotalCookie = document.createElement('li');
    liTotalCookie.textContent = 'Total: ' + totalCookies + ' cookies';
    ulCookie.appendChild(liTotalCookie);
    divForLists.appendChild(ulCookie);
  };
}

var seattleLocation = new Store('Seattle', 23, 65, 6.3, 6, 20);
var tokyoLocation = new Store('Tokyo', 3, 24, 1.2, 6, 20);
var dubaiLocation = new Store('Dubai', 11, 38, 3.7, 6, 20);
var parisLocation = new Store('Paris', 20, 38, 2.3, 6, 20);
var limaLocation = new Store('Lima', 2, 16, 4.6, 6, 20);

var allLocations = [seattleLocation, tokyoLocation, dubaiLocation, parisLocation, limaLocation];

var displayAllLocationCookies = function(locList) {
  for (var i = 0; i < locList.length; i++) {
    locList[i].calculateCookiesPurchasedPerHour();
    locList[i].updateHoursOfOperation();
    locList[i].displayLocationCookiePerHour('cookie-lists');
  }
};

displayAllLocationCookies(allLocations);








