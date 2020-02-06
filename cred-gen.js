const fs = require("fs");

const numToGenerate = 1024;
const numCases = 7;
const minBirthYear = 1940;
const maxBirthYear = new Date().getFullYear() - 15;

const domainList = [
    {value: "gmail.com", weight: 40},
    {value: "outlook.com", weight: 40},
    {value: "yahoo.com", weight: 10},
    {value: "live.com", weight: 5},
    {value: "hotmail.com", weight: 5}
];

const rawFirstNameList = fs.readFileSync("names.json");
const firstNameList = JSON.parse(rawFirstNameList);

const rawLastNameList = fs.readFileSync("surnames.json");
const lastNameList = JSON.parse(rawLastNameList);

const weightedRandom = function(arr) {
    let count = 100;
    const randomVal = Math.floor(Math.random() * count);
    for(let i = 0; i < arr.length; i++){
        count -= arr[i].weight;
        if(randomVal >= count){
            return arr[i].value;
        }
    }
}

const generateCredential = function(){
    const chosenCase = Math.floor(Math.random() * numCases);
    const domain = weightedRandom(domainList);
    const firstName = firstNameList[Math.floor(Math.random() * firstNameList.length)].toLowerCase();
    const lastName = lastNameList[Math.floor(Math.random() * lastNameList.length)].toLowerCase();
    const birthYear = Math.floor(Math.random() * (maxBirthYear - minBirthYear + 1)) + minBirthYear;

    const makeIdentifier = function(){
        switch(chosenCase){
            case 0:
                return(firstName + lastName);
            case 1:
                return(firstName + "." + lastName);
            case 2:
                return(firstName + "_" + lastName);
            case 3:
                return(firstName + birthYear);
            case 4:
                return(firstName + (birthYear % 100));
            case 5:
                return(firstName + lastName + Math.floor(Math.random() * 3));
            case 6:
                return(firstName + Math.floor(Math.random() * 8));
        }
    }
    return makeIdentifier() + "@" + domain;
}

for(let i = 0; i < numToGenerate; i++){
    const cred = generateCredential();
    console.log(cred);
}