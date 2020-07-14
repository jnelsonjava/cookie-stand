'use strict';

// =========== creating object literals for all shop locations ========

var seattleLocation = {
  city : 'Seattle',
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
  },
  displayLocationCookiePerHour : function(parentID) {
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
  }
};

var tokyoLocation = {
  city : 'Tokyo',
  minHourlyCustomers : 3,
  maxHourlyCustomers : 24,
  avgCookiesPerCustomer : 1.2,
  locationOpen : 6,
  locationClose : 20,
  hoursOfOperation : [],
  simulatedCookiesPurchasedPerHour : [],
  generateRandomCustomerPerHour : function() {
    var thisCustomerCount = Math.floor(Math.random() * (this.maxHourlyCustomers + 1 - this.minHourlyCustomers)) + this.minHourlyCustomers;
    return thisCustomerCount;
  },
  updateHoursOfOperation : function() {
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
  },
  displayLocationCookiePerHour : function(parentID) {
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
  }
};

var dubaiLocation = {
  city : 'Dubai',
  minHourlyCustomers : 11,
  maxHourlyCustomers : 38,
  avgCookiesPerCustomer : 3.7,
  locationOpen : 6,
  locationClose : 20,
  hoursOfOperation : [],
  simulatedCookiesPurchasedPerHour : [],
  generateRandomCustomerPerHour : function() {
    var thisCustomerCount = Math.floor(Math.random() * (this.maxHourlyCustomers + 1 - this.minHourlyCustomers)) + this.minHourlyCustomers;
    return thisCustomerCount;
  },
  updateHoursOfOperation : function() {
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
  },
  displayLocationCookiePerHour : function(parentID) {
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
  }
};


var parisLocation = {
  city : 'Paris',
  minHourlyCustomers : 20,
  maxHourlyCustomers : 38,
  avgCookiesPerCustomer : 2.3,
  locationOpen : 6,
  locationClose : 20,
  hoursOfOperation : [],
  simulatedCookiesPurchasedPerHour : [],
  generateRandomCustomerPerHour : function() {
    var thisCustomerCount = Math.floor(Math.random() * (this.maxHourlyCustomers + 1 - this.minHourlyCustomers)) + this.minHourlyCustomers;
    return thisCustomerCount;
  },
  updateHoursOfOperation : function() {
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
  },
  displayLocationCookiePerHour : function(parentID) {
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
  }
};


var limaLocation = {
  city : 'Lima',
  minHourlyCustomers : 2,
  maxHourlyCustomers : 16,
  avgCookiesPerCustomer : 4.6,
  locationOpen : 6,
  locationClose : 20,
  hoursOfOperation : [],
  simulatedCookiesPurchasedPerHour : [],
  generateRandomCustomerPerHour : function() {
    var thisCustomerCount = Math.floor(Math.random() * (this.maxHourlyCustomers + 1 - this.minHourlyCustomers)) + this.minHourlyCustomers;
    return thisCustomerCount;
  },
  updateHoursOfOperation : function() {
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
  },
  displayLocationCookiePerHour : function(parentID) {
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
  }
};




var allLocations = [seattleLocation, tokyoLocation, dubaiLocation, parisLocation, limaLocation];

var displayAllLocationCookies = function(locList) {
  for (var i = 0; i < locList.length; i++) {
    locList[i].calculateCookiesPurchasedPerHour();
    locList[i].updateHoursOfOperation();
    locList[i].displayLocationCookiePerHour('cookie-lists');
  }
};

displayAllLocationCookies(allLocations);

