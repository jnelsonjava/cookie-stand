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
  var thisCustomerCount = Math.floor(Math.random() * (this.maxHourlyCustomers + 1 - this.minHourlyCustomers)) + this.minHourlyCustomers;
  return thisCustomerCount;
};

Store.prototype.updateHoursOfOperation = function() {
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

  var tableElement = document.getElementById(tableID);
  var theadElement = document.createElement('thead');
  var trElement = document.createElement('tr');
  var thElement = document.createElement('th');
  trElement.appendChild(thElement);

  for (var i = 0; i < this.hoursOfOperation.length; i++) {
    thElement = document.createElement('th');
    thElement.textContent = this.hoursOfOperation[i];
    trElement.appendChild(thElement);
  }

  thElement = document.createElement('th');
  thElement.textContent = 'Daily Total';
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
  tfootElement.id = 'cookie-footer';
  tableElement.appendChild(tfootElement);
};

function addUserSubmittedStore(event) {
  event.preventDefault();

  var city = event.target.city.value;
  var minHourlyCustomers = parseInt(event.target['min-hourly-customers'].value);
  var maxHourlyCustomers = parseInt(event.target['max-hourly-customers'].value);
  var avgCookiesPerCustomer = parseFloat(event.target['avg-cookies-per-customer'].value);
  var locationOpen = 6;
  var locationClose = 20;

  var newStore = new Store(city, minHourlyCustomers, maxHourlyCustomers, avgCookiesPerCustomer, locationOpen, locationClose);

  var tfootElement = document.getElementById('cookie-footer');
  tfootElement.parentNode.removeChild(tfootElement);

  newStore.populateListProperties();
  newStore.renderTableBody('cookie-table');
  newStore.renderTableFoot('cookie-table', allLocations);
}


new Store('Seattle', 23, 65, 6.3, 6, 20);
new Store('Tokyo', 3, 24, 1.2, 6, 20);
new Store('Dubai', 11, 38, 3.7, 6, 20);
new Store('Paris', 20, 38, 2.3, 6, 20);
new Store('Lima', 2, 16, 4.6, 6, 20);


for (var i = 0; i < allLocations.length; i++) {
  allLocations[i].populateListProperties();
}


allLocations[0].renderTableHead('cookie-table');

for (var j = 0; j < allLocations.length; j++) {
  allLocations[j].renderTableBody('cookie-table');
}

allLocations[0].renderTableFoot('cookie-table', allLocations);


var newStoreFormElement = document.getElementById('new-store');
newStoreFormElement.addEventListener('submit', addUserSubmittedStore);





















































