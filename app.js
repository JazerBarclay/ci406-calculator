window.addEventListener("load", function(){

    let gammaButton = document.querySelector("#btnGamma");
    gammaButton.onclick = () => {
        let result = document.querySelector("#lblGammaResult")
        result.textContent = "Result: " + calculateGamma(document.querySelector("#gamma").value, document.querySelector("#reward").value);
    }


    let entropyButton = document.querySelector("#btnEntropy");
    entropyButton.onclick = () => {
        let result = document.querySelector("#lblEntropyResult")

        let yn = document.querySelector("#yesVno").value;
        yn = yn.replace(/\s+/g, '');

        let yes = parseInt(yn.split(",")[0]);
        let no = parseInt(yn.split(",")[1]);

        result.textContent = "Result: " + calculateEntropy(yes, no);
    }


    let gainButton = document.querySelector("#btnGain");
    gainButton.onclick = () => {
        let result = document.querySelector("#lblGainResult")

        let main = document.querySelector("#eMain").value;
        main = main.replace(/\s+/g, '');
        let m1 = parseInt(main.split(",")[0]);
        let m2 = parseInt(main.split(",")[1]);

        
        let attr = document.querySelector("#eSplit").value;
        attr = attr.replace(/\s+/g, '');
        attr = attr.split(",")

        let a = [];

        for(var i = 0; i < attr.length; i+=2) {
            a.push([ parseInt(attr[i]), parseInt(attr[i+1]) ]);
        }

        result.innerHTML = "Attribute Gain " + calculateGain([m1,m2],a);
    }
    
})

function calculateGamma(gamma, rewards) {
    // Remove white space
    rewards = rewards.replace(/\s+/g, '');
    // Split on commas
    let ar = rewards.split(",");
    ar.reverse();
    for (a in ar) a = parseInt(a);

    let result = 0;
    for (var i = 0; i < ar.length; i++) {
        if (i==0) result+=parseInt(ar[i]);
        else result += Math.pow(gamma,i)*ar[i];
    }
    return result;
}

function calculateEntropy(yes, no) {
    let tot = yes + no;
    if (yes == 0 || no == 0) return 0;
    if (yes == no) return 1;
    let res = -(yes/tot)*Math.log2(yes/tot)-(no/tot)*Math.log2(no/tot)
    return res;
}

function calculateGain(main, groups) {
    // Main is an array of 2 values [y+,n-]
    // Groups are an array of 2 value attributes [ [y+,n-], [y+,n-] ]
    // With these we can calculate the gain using the entropy thing too :D

    let mainEntropy = calculateEntropy(main[0], main[1]);

    let res = mainEntropy;
    let calcGroup = [];

    for (let i = 0; i < groups.length; i++) {
        calcGroup[i] = calculateEntropy(groups[i][0],groups[i][1]);
        res = res - ((groups[i][0]+groups[i][1])/(main[0]+main[1]))*calcGroup[i];
    }

    let ret = "";

    ret += "= mainEntropy - SUM(splitTotal/mainTotal*splitEntropy)<br>";
    ret += `<br>&nbsp;&nbsp; => ${mainEntropy.toFixed(5)}`;

    groups.forEach((item,index) => {
        ret += ` - ( (${item[0] + item[1]} / ${main[0]+main[1]}) * ${calcGroup[index].toFixed(5)} ) `;
    });

    ret += `<br>==> ${res}`;

    return ret;
}

function calculateAverage(ratings) {
    let sum = 0;
    ratings.forEach((item, index) => {sum+=item});
    return (sum/ratings.length);
}

function calculatePearsons(userRatings, altRatings) {
    userAvg = calculateAverage(userRatings);
    altAvg = calculateAverage(altRatings);

    let numerator = 0;
    let denominator = 0;

    for(let i = 0; i < userRatings.length; i++) {
        numerator += (userRatings[i] - userAvg) * (altRatings[i] - altAvg);
    }

    let tempUser = 0;
    for(let j = 0; j < userRatings.length; j++) {
        tempUser += Math.pow(userRatings[j]-userAvg,2);
    }
    tempUser = Math.sqrt(tempUser);

    let tempAlt = 0;
    for(let i = 0; i < userRatings.length; i++) {
        tempAlt += Math.pow(altRatings[i]-altAvg,2);
    }
    tempAlt = Math.sqrt(tempAlt);

    denominator = tempUser * tempAlt;

    let res = numerator/denominator;

    return res;
}

