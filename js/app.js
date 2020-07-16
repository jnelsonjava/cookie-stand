'use strict';



var allLocations = [];


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

  allLocations.push(this);
}




Store.prototype.generateRandomCustomerPerHour = function() {
  // used https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random for reference
  var thisCustomerCount = Math.floor(Math.random() * (this.maxHourlyCustomers + 1 - this.minHourlyCustomers)) + this.minHourlyCustomers;
  return thisCustomerCount;
};

Store.prototype.updateHoursOfOperation = function() {
  // referenced https://www.w3schools.com/jsref/jsref_push.asp for push method
  this.hoursOfOperation = [];
  for (var i = this.locationOpen; i < this.locationClose; i++) {
    if (i < 12) {
      this.hoursOfOperation.push(i + ':00am');
    } else if (i === 12) {
      this.hoursOfOperation.push(i + ':00pm');
    } else {
      this.hoursOfOperation.push((i - 12) + ':00pm');
    }
  }
};

Store.prototype.calculateCookiesPurchasedPerHour = function() {
  this.simulatedCookiesPurchasedPerHour = [];
  for (var j = this.locationOpen; j < this.locationClose; j++) {
    this.simulatedCookiesPurchasedPerHour.push(Math.round(this.avgCookiesPerCustomer * this.generateRandomCustomerPerHour()));
  }
};

Store.prototype.displayLocationCookiePerHour = function(parentID) {
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


Store.prototype.populateListProperties = function () {
  this.calculateCookiesPurchasedPerHour();
  this.updateHoursOfOperation();
};

Store.prototype.renderTableHead = function(tableID) {
  // make sure Store.populateListProperties() runs previous to building table!!!!

  // ALSO!!! This is not dynamic to different hours per store
  // so it will need to check earliest open and latest close
  // to eventually build a fully dynamic table view.
  // Add location list as a parameter or something, figure it out later

  // target table and create head, row, and first empty cell
  var tableElement = document.getElementById(tableID);
  var theadElement = document.createElement('thead');
  var trElement = document.createElement('tr');
  var thElement = document.createElement('th');
  trElement.appendChild(thElement);
  console.log('in method');

  // loop through open hours to fill head row with cells
  for (var i = 0; i < this.hoursOfOperation.length; i++) {
    console.log('in loop');
    thElement = document.createElement('th');
    thElement.textContent = this.hoursOfOperation[i];
    trElement.appendChild(thElement);
  }

  // add lasts cell for row total and append it all up to the table
  thElement = document.createElement('th');
  thElement.textContent = 'Daily Location Total';
  trElement.appendChild(thElement);
  theadElement.appendChild(trElement);
  tableElement.appendChild(theadElement);
};

Store.prototype.renderTableBody = function (tableID) {
  var tableElement = document.getElementById(tableID);
  var tbodyElement = document.createElement('tbody');
  var trElement = document.createElement('tr');
  var thElement = document.createElement('th');
  thElement.textContent = this.city;
  trElement.appendChild(thElement);

  var tdElement;
  var cookieSum = 0;
  for (var i = 0; i < this.simulatedCookiesPurchasedPerHour.length; i++) {
    tdElement = document.createElement('td');
    tdElement.textContent = this.simulatedCookiesPurchasedPerHour[i];
    trElement.appendChild(tdElement);
    cookieSum += this.simulatedCookiesPurchasedPerHour[i];
  }

  tdElement = document.createElement('td');
  tdElement.textContent = cookieSum;
  trElement.appendChild(tdElement);
  tbodyElement.appendChild(trElement);
  tableElement.appendChild(tbodyElement);
};

Store.prototype.renderTableFoot = function (tableID, allLocations) {
  var tableElement = document.getElementById(tableID);
  var tfootElement = document.createElement('tfoot');
  var trElement = document.createElement('tr');
  var thElement = document.createElement('th');
  thElement.textContent = 'Totals';
  trElement.appendChild(thElement);

  var cookieSum = 0;
  var hourlyTotalCookies;
  var tdElement;
  for (var i = 0; i < this.simulatedCookiesPurchasedPerHour.length; i++) {
    hourlyTotalCookies = 0;
    for (var j = 0; j < allLocations.length; j++) {
      hourlyTotalCookies += allLocations[j].simulatedCookiesPurchasedPerHour[i];
    }
    tdElement = document.createElement('td');
    tdElement.textContent = hourlyTotalCookies;
    trElement.appendChild(tdElement);
    cookieSum += hourlyTotalCookies;

  }
  tdElement = document.createElement('td');
  tdElement.textContent = cookieSum;
  trElement.appendChild(tdElement);
  tfootElement.appendChild(trElement);
  tableElement.appendChild(tfootElement);
};


new Store('Seattle', 23, 65, 6.3, 6, 20);
new Store('Tokyo', 3, 24, 1.2, 6, 20);
new Store('Dubai', 11, 38, 3.7, 6, 20);
new Store('Paris', 20, 38, 2.3, 6, 20);
new Store('Lima', 2, 16, 4.6, 6, 20);


for (var i = 0; i < allLocations.length; i++) {
  allLocations[i].populateListProperties();
}

// referenced for eslint disable https://eslint.org/docs/2.13.1/user-guide/configuring

allLocations[0].renderTableHead('cookie-table');

for (var j = 0; j < allLocations.length; j++) {
  allLocations[j].renderTableBody('cookie-table');
}

allLocations[0].renderTableFoot('cookie-table', allLocations);
























































