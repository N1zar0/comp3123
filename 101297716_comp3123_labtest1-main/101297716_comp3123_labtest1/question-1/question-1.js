// The function takes a mixed array and returns an array of strings that are all lowercase.
function lowerCaseWords(inputArray) {
    return new Promise((resolve, reject) => { 

        // check if input is an array
        if (!Array.isArray(inputArray)) {  
            reject("Error: Input is not an array.");
        } 
        else { // filter array for strings and convert to lowercase

            const stringArray = inputArray.filter((element) => typeof element === "string");
            const lowerCaseArray = stringArray.map((element) => element.toLowerCase());

            resolve(lowerCaseArray);

        }
    });
}

lowerCaseWords(["PIZZA", 10, true, 25, false, "Wings"])
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });