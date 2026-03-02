const urlInput = document.getElementById("urlInput");
const result = document.getElementById("result");

// Real-time validation as user types
urlInput.addEventListener("input", () => {
    const url = urlInput.value.trim();
    if(url.length === 0){
        result.innerText = "";
        result.style.background = "transparent";
        return;
    }
    checkURL(url);
});

// Phishing detection logic (weighted rules)
function checkURL(url){
    let score = 0;

    // Rule 1: HTTPS presence
    if(!url.startsWith("https://")) score += 2;

    // Rule 2: IP address instead of domain
    const ipRegex = /^(https?:\/\/)?(\d{1,3}\.){3}\d{1,3}/;
    if(ipRegex.test(url)) score += 3;

    // Rule 3: Suspicious keywords
    const suspiciousWords = ["login", "secure", "update", "verify", "bank", "account", "confirm"];
    suspiciousWords.forEach(word => {
        if(url.toLowerCase().includes(word)) score += 1;
    });

    // Rule 4: Long URL
    if(url.length > 75) score += 1;

    // Rule 5: Multiple dots (subdomain trick)
    const dotCount = (url.match(/\./g) || []).length;
    if(dotCount > 3) score += 1;

    // Weighted scoring logic
    if(score >= 5){
        result.style.background = "#f8d7da";
        result.style.color = "#721c24";
        result.innerText = "⚠️ High Risk! This URL might be phishing!";
    } else if(score >= 3){
        result.style.background = "#fff3cd";
        result.style.color = "#856404";
        result.innerText = "⚠️ Suspicious URL! Be cautious!";
    } else{
        result.style.background = "#d4edda";
        result.style.color = "#155724";
        result.innerText = "✅ URL seems safe!";
    }
}

function clearInput(){
    urlInput.value = "";
    result.innerText = "";
    result.style.background = "transparent";
}
