import {
  get as getLocalStorage,
  set as setLocalStorage,
} from "simple-webstorage/lib/local";

declare global {
  interface Window {
    current_data: any;
  }
}

export interface Response {
  results: Result[];
  info: Info;
}
export interface Result {
  "3": UserData[];
  "4": UserData[];
  paging: Paging;
}

export interface UserData {
  id: string;
  row: number;
  age: number;
  gender: Gender;
}

export enum Gender {
  Female = "female",
  Male = "male",
}

export interface Paging {
  next: string;
  previous?: string;
}
export interface Info {
  results: string;
  seed: string;
  page: string;
  version: string;
  time: Time;
  user: User;
}

export interface Time {
  instruct: number;
  generate: number;
}

export interface User {
  username: string;
  tier: string;
  results: string;
  remaining: string;
}

var displayedData;
var current_url: string =
  "https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84";
var next_url: string = "";
var previous_url: string = "";
var current_page: string = "1";
var next_page: string;
var previous_page: string = "0";
// last array item of the user data
var lastItem: boolean = false;
// prev btn state
var isPrevDisabled: boolean = false;

var tabBody = <HTMLElement>document.querySelector("[data-sink]");
var nextBtn = <HTMLButtonElement>document.querySelector("[data-nextbtn]");
var prevBtn = <HTMLButtonElement>document.querySelector("[data-prevbtn]");
var pageView = <HTMLElement>document.querySelector("[data-pageview]");
prevBtn.disabled = true;
async function getData(url: string): Promise<Response> {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

const loadNext = (): void => {
  if (!lastItem) {
    previous_page = current_page;
    current_page = next_page;
    displayedData = getLocalStorage("current_data")[0][next_page];
    prevBtn.disabled = false;
    lastItem = true;

    console.log(displayedData);
    updateData();
  } else {
    current_url = next_url;
    lastItem = false;
    startApp();
  }
};
const loadPrev = (): void => {
  console.log(previous_page);
  if (current_page === "2") {
    prevBtn.disabled = true;
  }
  if (lastItem) {
    next_page = current_page;
    current_page = previous_page;
    previous_page = String(Number(previous_page) - 1);
    console.log("the previous wahala error page is " + previous_page);
    displayedData = getLocalStorage("current_data")[0][current_page];
    console.log(displayedData);
    lastItem = false;
    updateData();
  } else {
    console.log("previous page is " + previous_page);
    current_url = previous_url;

    startApp();
  }
};

nextBtn.addEventListener("click", loadNext);
prevBtn.addEventListener("click", loadPrev);

pageView.innerHTML = "";
const updateData = (): void => {
  pageView.innerHTML = "Showing Page " + current_page;
  tabBody.innerHTML = "";

  displayedData.map((x) => {
    tabBody.innerHTML +=
      "<tr " +
      "data-entryid = " +
      x.id +
      " >" +
      " <td> " +
      x.row +
      " </td> " +
      " <td> " +
      x.gender +
      " </td> " +
      "<td> " +
      x.age +
      " </td> " +
      " </tr>";
  });
};

const startApp = async (): Promise<void> => {
  var response_data = await getData(current_url);
  if (response_data) {
    setLocalStorage("current_data", response_data.results);
    current_page = response_data.info["page"];
    next_page = String(Number(response_data.info["page"]) + 1);
    previous_page = String(Number(response_data.info["page"]) - 1);
    displayedData = getLocalStorage("current_data")[0][current_page];

    next_url = response_data.results[0]["paging"]["next"];
    if (response_data.results[0]["paging"]["previous"] != undefined) {
      previous_url = response_data.results[0]["paging"]["previous"];
    }

    updateData();
  }
};

document.addEventListener("DOMContentLoaded", startApp);
