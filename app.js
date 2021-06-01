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