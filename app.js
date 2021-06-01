window.addEventListener("load", function(){

    let gammaButton = document.querySelector("#btnGamma");
    gammaButton.onclick = () => {
        let result = document.querySelector("#lblGammaResult")
        result.textContent = "Result: " + calculateGamma(document.querySelector("#gamma").value, document.querySelector("#reward").value);
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