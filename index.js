var devicewidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
function calculator() {
    // Check Values
    // Get textbox values
    var correct = parseInt(document.getElementById("corrects").value);
    var incorrect = parseInt(document.getElementById("incorrects").value);
    var numofques = parseInt(document.getElementById("numofquestions").value);
    
    for (var item of [correct, incorrect, numofques]) {
        if(isNaN(item)) {
            alert("لطفا فرم‌ها را پر کنید و تنها از عداد انگیلیسی استفاده کنید. ");
            return;
        }
    }
    if (correct + incorrect > numofques) {
        alert("فرم را دوباره بررسی کنید. چنین چیزی امکان ندارد :)")
        return;
    }
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
    // var final = "نتیجه: "
    var final = "";
    input = input.toFixed(2);
    final += input.toString() + "%";
    final += " ";
    if(input <= 0) {
        final += " 👍";
        popup(final, "")
        return;
    }
    if(input <= 15) {
        final += " 🤦‍♂️";
        popup(final, "img/downer-than-15");
        return;
    }
    if(input <= 25){
        popup(final, "img/downer-than-25");
        return;
    }
    if(input <= 35){
        popup(final, "img/downer-than-35");
        return;
    }
    if(input < 50) {
        popup(final, "img/downer-than-50");
        return;
    }
    if(input >= 50) {
        popup(final, "img/upper-than-50");
        return;
    }
    if(input >= 65) {
        popup(final, "img/upper-than-65");
        return;
    }
    if(input >= 90 ) {
        popup(final, "img/upper-than-90");
        return;
    }
}
function popup(msg, imgloc) {
    let popup = document.getElementById("popup");
    p = document.getElementById("msg_result");
    img = document.getElementById("msg_img");
    p.innerHTML = msg;
    if(window.devicewidth > 600) {
        imgloc += "-256.png";
        img.width = 256;
        img.height = 256;
    } else {
        imgloc += "-200.png";
        img.width = 200;
        img.height = 200;
    }
    img.src = imgloc;
    // console.log(popup.classList)
    if(popup.classList == "not_showing") {
        popup.classList = "";
    }
}


function closepopup() {
    let popup = document.getElementById("popup");
    if(popup.classList == "") {
        popup.classList = "not_showing";
    }
}
// if('serviceWorker' in navigator){
//     navigator.serviceWorker.register('/sw.js')
//       .then(reg => console.log('service worker registered'))
//       .catch(err => console.log('service worker not registered', err));
// } else {
//     console.log("service worker not supported by your browser")
// }

// If the site shows in all screen(add to home screen) mode
if (
    (!("standalone" in window.navigator) && window.navigator.standalone) // For IOS
    ||
    (window.matchMedia('(display-mode: standalone)').matches) // For Android
) {
    document.getElementById("offline_info").style.display = "none";
}