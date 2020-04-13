var devicewidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var msg_img = document.getElementById('msg_img');
msg_img.onerror = () => {
    if(!msg_img.classList.contains('not_showing')) {
        msg_img.classList.add('not_showing');
    }
}
function calculator() {
    // Check Values
    // Get textbox values
    var correct = parseInt(document.getElementById("corrects").value);
    var incorrect = parseInt(document.getElementById("incorrects").value);
    var numofques = parseInt(document.getElementById("numofquestions").value);
    
    for (var item of [correct, incorrect, numofques]) {
        if(isNaN(item)) {
            popup("لطفا فرم‌ها را پر کنید و تنها از کیبورد انگلیسی استفاده کنید. ", "", "larger");
            return;
        }
    }
    if (correct + incorrect > numofques) {
        popup("فرم را دوباره بررسی کنید. چنین چیزی امکان ندارد", "img/pokerface", "larger")
        return;
    }
    var correct_setting = parseInt(document.getElementById('negsettings_corrects').value);
    var incorrect_setting = parseInt(document.getElementById('negsettings_incorrects').value);
    if (correct_setting == "") {
        correct_setting = "1"
    }
    if (incorrect_setting == "") {
        incorrect_setting = "3"
    }
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
    if(input <= 65) {
        popup(final, "img/upper-than-50");
        return;
    }
    if(input <= 90) {
        popup(final, "img/upper-than-65");
        return;
    }
    if(input <= 100 ) {
        popup(final, "img/upper-than-90");
        return;
    }
}
function popup(msg, imgloc, size = "") {
    let popup = document.getElementById("popup");
    p = document.getElementById("msg_result");
    img = document.getElementById("msg_img");
    // img.
    p.innerHTML = msg;

    if(imgloc != "") {
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
        if(img.classList.contains("not_showing")) {
            img.classList.remove("not_showing");
        }
    } else {
        img.src = ""
        if(!img.classList.contains("not_showing")) {
            img.classList.add("not_showing")
        }
    }

    // if(window.devicewidth > 600) {
    //     imgloc += "-256.png";
    //     img.width = 256;
    //     img.height = 256;
    // } else {
    //     imgloc += "-200.png";
    //     img.width = 200;
    //     img.height = 200;
    // }
    // img.src = imgloc;
    if(size != "") {
        p.style.fontSize = size;
    } else {
        p.style.fontSize = "xx-large";
    }
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
if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('service worker registered'))
      .catch(err => console.log('service worker not registered', err));
} else {
    console.log("service worker not supported by your browser")
}

// If the site shows in all screen(add to home screen) mode
if (
    (!("standalone" in window.navigator) && window.navigator.standalone) // For IOS
    ||
    (window.matchMedia('(display-mode: standalone)').matches) // For Android
) {
    document.getElementById("offline_info").style.display = "none";
}