
function calculator() {
    // Get textbox values
    var correct = parseInt(document.getElementById("corrects").value);
    var incorrect = parseInt(document.getElementById("incorrects").value);
    var numofques = parseInt(document.getElementById("numofquestions").value);
    
    var correct_setting = parseInt(document.getElementById('negsettings_corrects').value);
    var incorrect_setting = parseInt(document.getElementById('negsettings_incorrects').value);

    if(document.getElementById("is_negative").checked) {
        incorrect = (correct_setting / incorrect_setting) * incorrect;
        var result = ((correct - incorrect) / numofques) * 100;
    } else {
        var result = (correct / numofques) * 100;
    }
    

    showToUser(result)
}
function showToUser(input) {
    // alert(input.toString())
    input = input.toFixed(2);
    var final = input.toString() + "%";
    final += " ";
    if(0 > input) {
        final += "🤦‍♂️";
    }
    alert(final);
    
}
if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('service worker registered'))
      .catch(err => console.log('service worker not registered', err));
}
if (
    (!("standalone" in window.navigator) && window.navigator.standalone)
    ||
    (window.matchMedia('(display-mode: standalone)').matches)
) {
    document.getElementById("offline_info").style.display = "none";
}